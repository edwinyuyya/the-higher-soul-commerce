/* Uji logika pembayaran terhadap Midtrans tiruan: npm test */
'use strict';
const assert = require('assert');
const crypto = require('crypto');
const mock = require('./mock-midtrans');

const PORT = 4011;
process.env.MIDTRANS_SERVER_KEY = 'SB-Mid-server-TEST';
process.env.MIDTRANS_CLIENT_KEY = 'SB-Mid-client-TEST';
process.env.MIDTRANS_SNAP_BASE = 'http://localhost:' + PORT;
process.env.MIDTRANS_API_BASE = 'http://localhost:' + PORT;

const M = require('../lib/midtrans');

function call(handler, { method = 'GET', url = '/', body } = {}) {
  return new Promise((resolve) => {
    const req = { method, url, body, headers: { host: 'localhost:3000', 'x-forwarded-proto': 'http' } };
    const res = {
      statusCode: 200, headers: {},
      setHeader(k, v) { this.headers[k] = v; },
      end(s) { resolve({ status: this.statusCode, body: JSON.parse(s) }); }
    };
    handler(req, res);
  });
}

(async () => {
  const { server, orders } = await mock.start(PORT);
  const create = require('../api/create-payment');
  const status = require('../api/payment-status');
  const notify = require('../api/midtrans-notification');
  const config = require('../api/config');
  let ok = 0;
  const t = async (name, fn) => { await fn(); ok++; console.log('  ✓', name); };

  await t('config tidak membocorkan server key', async () => {
    const r = await call(config);
    assert.strictEqual(r.body.mode, 'midtrans');
    assert.ok(!JSON.stringify(r.body).includes('server'));
  });

  let tarotId;
  await t('tarot: harga Rp 15.000 ditetapkan server, bukan dari browser', async () => {
    const r = await call(create, { method: 'POST', body: { product: 'tarot', price: 1 } });
    assert.strictEqual(r.status, 200);
    tarotId = r.body.orderId;
    assert.ok(M.ORDER_RE.test(tarotId), tarotId);
    assert.strictEqual(orders[tarotId].amount, 15000);
    assert.deepStrictEqual(orders[tarotId].body.enabled_payments.slice(0, 3), ['other_qris', 'gopay', 'shopeepay']);
    assert.strictEqual(orders[tarotId].body.callbacks.finish, 'http://localhost:3000/');
  });

  await t('status: belum pilih metode → waiting', async () => {
    const r = await call(status, { url: '/api/payment-status?order_id=' + tarotId });
    assert.strictEqual(r.body.status, 'waiting');
  });
  await t('status: pending → pending', async () => {
    orders[tarotId].status = 'pending';
    const r = await call(status, { url: '/api/payment-status?order_id=' + tarotId });
    assert.strictEqual(r.body.status, 'pending');
  });
  await t('status: settlement → paid', async () => {
    orders[tarotId].status = 'settlement';
    const r = await call(status, { url: '/api/payment-status?order_id=' + tarotId });
    assert.strictEqual(r.body.status, 'paid');
    assert.strictEqual(r.body.product, 'tarot');
  });
  await t('status: jumlah bayar tidak sesuai → tidak dianggap lunas', async () => {
    orders[tarotId].paid = 1000;
    const r = await call(status, { url: '/api/payment-status?order_id=' + tarotId });
    assert.strictEqual(r.body.status, 'amount_mismatch');
    delete orders[tarotId].paid;
  });
  await t('status: expire → expired', async () => {
    orders[tarotId].status = 'expire';
    const r = await call(status, { url: '/api/payment-status?order_id=' + tarotId });
    assert.strictEqual(r.body.status, 'expired');
  });
  await t('status: order_id asing ditolak', async () => {
    const r = await call(status, { url: '/api/payment-status?order_id=../../etc' });
    assert.strictEqual(r.status, 400);
  });

  await t('numerologi: Rp 199.000 dan wajib email valid', async () => {
    let r = await call(create, { method: 'POST', body: { product: 'numerology', customer: { name: 'Ayu', email: 'salah' }, birthdate: '1990-05-17' } });
    assert.strictEqual(r.status, 400);
    r = await call(create, { method: 'POST', body: { product: 'numerology', customer: { name: 'Ayu Kartika', email: 'ayu@mail.com', phone: '0812-345' }, birthdate: '1990-05-17' } });
    assert.strictEqual(r.status, 200);
    const o = orders[r.body.orderId];
    assert.strictEqual(o.amount, 199000);
    assert.ok(/Lahir: 1990-05-17/.test(o.body.custom_field2));
    assert.strictEqual(o.body.customer_details.email, 'ayu@mail.com');
  });

  await t('webhook: tanda tangan salah ditolak, benar diterima', async () => {
    const body = { order_id: tarotId, status_code: '200', gross_amount: '15000.00', signature_key: 'x' };
    let r = await call(notify, { method: 'POST', body });
    assert.strictEqual(r.status, 401);
    body.signature_key = crypto.createHash('sha512').update(tarotId + '200' + '15000.00' + process.env.MIDTRANS_SERVER_KEY).digest('hex');
    r = await call(notify, { method: 'POST', body });
    assert.strictEqual(r.status, 200);
  });

  await t('produk tidak dikenal ditolak', async () => {
    const r = await call(create, { method: 'POST', body: { product: 'gratis' } });
    assert.strictEqual(r.status, 400);
  });

  server.close();
  console.log('\n' + ok + ' uji lulus');
})().catch((e) => { console.error('GAGAL:', e); process.exit(1); });
