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
process.env.META_PIXEL_ID = '123456';
process.env.META_CAPI_TOKEN = 'TEST-TOKEN';
process.env.META_GRAPH_BASE = 'http://localhost:' + PORT;

const M = require('../lib/midtrans');

function call(handler, { method = 'GET', url = '/', body, headers } = {}) {
  return new Promise((resolve) => {
    const req = { method, url, body, headers: Object.assign({ host: 'localhost:3000', 'x-forwarded-proto': 'http', 'user-agent': 'TestBrowser/1.0', 'x-forwarded-for': '36.80.1.2', cookie: '_fbp=fb.1.111.222; _fbc=fb.1.333.abc' }, headers || {}) };
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

  const meta = () => mock.start.metaEvents || [];

  await t('tarot lunas → tepat satu Purchase (Rp 15.000); pending/mismatch/expired tidak', async () => {
    assert.strictEqual(meta().length, 1);
    assert.strictEqual(meta()[0].body.data[0].custom_data.value, 15000);
    assert.strictEqual(meta()[0].body.data[0].event_id, tarotId);
  });

  let lpId;
  await t('laporan: wajib nama, email, tanggal lahir', async () => {
    const r = await call(create, { method: 'POST', body: { items: ['lifepath'], method: 'Q', customer: { name: 'Ayu', email: 'salah' }, birthdate: '1990-05-17' } });
    assert.strictEqual(r.status, 400);
  });

  await t('QRIS: tanpa biaya tambahan, hanya QRIS yang aktif', async () => {
    const r = await call(create, { method: 'POST', body: { items: ['lifepath', 'year'], method: 'Q', customer: { name: 'Ayu Kartika', email: 'Ayu@Mail.com', phone: '0812-3456-789' }, birthdate: '1990-05-17' } });
    assert.strictEqual(r.status, 200, JSON.stringify(r.body));
    lpId = r.body.orderId;
    assert.ok(/^HS-LPT\.THN-Q-/.test(lpId), lpId);
    const o = orders[lpId];
    assert.strictEqual(o.amount, 79000 + 29000);
    assert.deepStrictEqual(o.body.enabled_payments, ['other_qris']);
    assert.strictEqual(o.body.item_details.length, 2);
    assert.ok(/Lahir: 1990-05-17/.test(o.body.custom_field2));
    assert.strictEqual(o.body.customer_details.email, 'Ayu@Mail.com');
    // email & HP tidak disimpan polos di field pelacakan
    assert.ok(!/ayu@mail\.com/i.test(o.body.custom_field3) && !/0812/.test(o.body.custom_field3));
    assert.ok(/p=fb\.1\.111\.222/.test(o.body.custom_field1));
  });

  await t('Virtual Account: + Rp 4.000 biaya layanan, hanya VA yang aktif', async () => {
    const r = await call(create, { method: 'POST', body: { items: ['numerology'], method: 'V', customer: { name: 'Ayu Kartika', email: 'ayu@mail.com' }, birthdate: '1990-05-17' } });
    const o = orders[r.body.orderId];
    assert.strictEqual(o.amount, 249000 + 4000);
    assert.strictEqual(r.body.fee, 4000);
    assert.ok(o.body.enabled_payments.every((x) => /_va$|echannel/.test(x)));
    assert.strictEqual(o.body.item_details.reduce((a, i) => a + i.price, 0), o.amount);
  });

  await t('e-wallet: biaya 2% gross-up, dibulatkan per Rp 100', async () => {
    const r = await call(create, { method: 'POST', body: { items: ['selfpack'], method: 'E', customer: { name: 'Ayu Kartika', email: 'ayu@mail.com' }, birthdate: '1990-05-17' } });
    // 149000 / 0.98 - 149000 = 3040.8 → 3100
    assert.strictEqual(r.body.fee, 3100);
    assert.strictEqual(orders[r.body.orderId].amount, 152100);
    assert.deepStrictEqual(orders[r.body.orderId].body.enabled_payments, ['gopay', 'shopeepay']);
  });

  await t('keranjang: tambahan tanpa produk utama ditolak, tambahan yang sudah termasuk dibuang', async () => {
    let r = await call(create, { method: 'POST', body: { items: ['year'], method: 'Q', customer: { name: 'Ayu Kartika', email: 'ayu@mail.com' }, birthdate: '1990-05-17' } });
    assert.strictEqual(r.status, 400);
    r = await call(create, { method: 'POST', body: { items: ['numerology', 'year', 'soul'], method: 'Q', customer: { name: 'Ayu Kartika', email: 'ayu@mail.com' }, birthdate: '1990-05-17' } });
    assert.strictEqual(r.status, 200);
    assert.deepStrictEqual(r.body.items, ['numerology']);
    assert.strictEqual(r.body.amount, 249000);
    r = await call(create, { method: 'POST', body: { items: ['lifepath'], method: 'A', customer: { name: 'Ayu Kartika', email: 'ayu@mail.com' }, birthdate: '1990-05-17' } });
    assert.strictEqual(r.status, 400, 'metode tanpa biaya hanya untuk tarot');
  });

  await t('lunas: Purchase dikirim dari server dengan event_id = nomor pesanan', async () => {
    orders[lpId].status = 'settlement';
    const r = await call(status, { url: '/api/payment-status?order_id=' + lpId });
    assert.strictEqual(r.body.status, 'paid');
    assert.deepStrictEqual(r.body.items, ['lifepath', 'year']);
    assert.ok(!('_fields' in r.body), 'data pelacakan tidak bocor ke browser');
    const ev = meta()[meta().length - 1];
    assert.strictEqual(ev.pixel, '123456');
    const d = ev.body.data[0];
    assert.strictEqual(d.event_name, 'Purchase');
    assert.strictEqual(d.event_id, lpId);
    assert.strictEqual(d.custom_data.value, 108000);
    assert.strictEqual(d.custom_data.currency, 'IDR');
    assert.strictEqual(d.user_data.em[0], crypto.createHash('sha256').update('ayu@mail.com').digest('hex'));
    assert.strictEqual(d.user_data.ph[0], crypto.createHash('sha256').update('628123456789').digest('hex'));
    assert.strictEqual(d.user_data.fbp, 'fb.1.111.222');
    assert.strictEqual(d.user_data.client_ip_address, '36.80.1.2');
  });

  await t('jumlah bayar tidak sesuai → tidak lunas, tidak ada Purchase', async () => {
    const before = meta().length;
    orders[lpId].paid = 79000;
    const r = await call(status, { url: '/api/payment-status?order_id=' + lpId });
    assert.strictEqual(r.body.status, 'amount_mismatch');
    assert.strictEqual(meta().length, before);
    delete orders[lpId].paid;
  });

  await t('config: katalog & Pixel ID publik, token Meta tidak bocor', async () => {
    const r = await call(config);
    assert.strictEqual(r.body.meta.pixelId, '123456');
    assert.strictEqual(r.body.products.lifepath.price, 79000);
    assert.ok(!JSON.stringify(r.body).includes('TEST-TOKEN'));
  });

  await t('webhook: tanda tangan salah ditolak, benar diterima', async () => {
    const body = { order_id: tarotId, status_code: '200', gross_amount: '15000.00', signature_key: 'x' };
    let r = await call(notify, { method: 'POST', body });
    assert.strictEqual(r.status, 401);
    body.signature_key = crypto.createHash('sha512').update(tarotId + '200' + '15000.00' + process.env.MIDTRANS_SERVER_KEY).digest('hex');
    r = await call(notify, { method: 'POST', body });
    assert.strictEqual(r.status, 200);
  });

  await t('webhook lunas: Purchase terkirim walau browser sudah ditutup', async () => {
    const r0 = await call(create, { method: 'POST', body: { items: ['destiny'], method: 'Q', customer: { name: 'Budi Santoso', email: 'budi@mail.com' }, birthdate: '1985-01-02' } });
    const id = r0.body.orderId;
    orders[id].status = 'settlement';
    const before = meta().length;
    const body = { order_id: id, status_code: '200', gross_amount: '79000.00' };
    body.signature_key = crypto.createHash('sha512').update(id + '200' + '79000.00' + process.env.MIDTRANS_SERVER_KEY).digest('hex');
    const r = await call(notify, { method: 'POST', body, headers: { cookie: '' } });
    assert.strictEqual(r.status, 200);
    assert.strictEqual(meta().length, before + 1);
    const d = meta()[meta().length - 1].body.data[0];
    assert.strictEqual(d.event_id, id);
    assert.strictEqual(d.user_data.fbp, 'fb.1.111.222', 'data pelacakan dari custom field');
  });

  await t('produk tidak dikenal ditolak', async () => {
    const r = await call(create, { method: 'POST', body: { product: 'gratis' } });
    assert.strictEqual(r.status, 400);
  });

  server.close();
  console.log('\n' + ok + ' uji lulus');
})().catch((e) => { console.error('GAGAL:', e); process.exit(1); });
