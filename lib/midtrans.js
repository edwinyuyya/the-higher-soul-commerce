/* =========================================================
   Midtrans (Snap) — pembayaran QRIS, e-wallet, dan Virtual Account.
   Dipakai oleh fungsi serverless di /api. Tanpa dependensi npm.

   Variabel lingkungan:
     MIDTRANS_SERVER_KEY      (wajib, rahasia — jangan pernah dikirim ke browser)
     MIDTRANS_CLIENT_KEY      (wajib, boleh publik)
     MIDTRANS_IS_PRODUCTION   "true" untuk transaksi sungguhan, selain itu sandbox
     PUBLIC_BASE_URL          (opsional) mis. https://tarot.highersoul.id
   ========================================================= */
'use strict';

const crypto = require('crypto');

/* Harga, produk, dan biaya layanan ada di lib/catalog.js. */
const C = require('./catalog');
const PRODUCTS = C.PRODUCTS;
const ORDER_RE = C.ORDER_RE;
const ENABLED_PAYMENTS = C.METHODS.A.enabled;

function config() {
  const serverKey = process.env.MIDTRANS_SERVER_KEY || '';
  const clientKey = process.env.MIDTRANS_CLIENT_KEY || '';
  const isProduction = String(process.env.MIDTRANS_IS_PRODUCTION || '').toLowerCase() === 'true';
  return {
    serverKey,
    clientKey,
    isProduction,
    configured: Boolean(serverKey && clientKey),
    // Bisa ditimpa hanya untuk pengujian lokal.
    snapBase: process.env.MIDTRANS_SNAP_BASE || (isProduction ? 'https://app.midtrans.com' : 'https://app.sandbox.midtrans.com'),
    apiBase: process.env.MIDTRANS_API_BASE || (isProduction ? 'https://api.midtrans.com' : 'https://api.sandbox.midtrans.com')
  };
}

function newOrderId(items, method) {
  const codes = items.map((k) => PRODUCTS[k].code).join('.');
  return 'HS-' + codes + '-' + method + '-' + Date.now().toString(36).toUpperCase() + '-' + crypto.randomBytes(3).toString('hex').toUpperCase();
}

function authHeader(serverKey) {
  return 'Basic ' + Buffer.from(serverKey + ':').toString('base64');
}

/**
 * fetch dengan batas waktu dan percobaan ulang untuk gangguan jaringan / 5xx.
 * Hanya dipakai untuk permintaan yang aman diulang (GET status) atau yang
 * idempoten karena order_id unik (Midtrans menolak order_id ganda, bukan menagih dua kali).
 */
async function request(url, opts, { retries = 2, timeoutMs = 15000 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt++) {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), timeoutMs);
    try {
      const res = await fetch(url, Object.assign({}, opts, { signal: ctl.signal }));
      clearTimeout(timer);
      const text = await res.text();
      let body = null;
      try { body = text ? JSON.parse(text) : null; } catch (e) { body = { raw: text }; }
      if (res.status >= 500 && attempt < retries) {
        lastErr = new Error('Midtrans ' + res.status);
      } else {
        return { status: res.status, body };
      }
    } catch (err) {
      clearTimeout(timer);
      lastErr = err;
    }
    await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
  }
  throw lastErr;
}

async function createSnap({ items, method, orderId, customer, finishUrl, notes, tracking }) {
  const cfg = config();
  const q = C.quote(items, method);
  const itemDetails = items.map((k) => ({ id: k, price: PRODUCTS[k].price, quantity: 1, name: PRODUCTS[k].name.slice(0, 50) }));
  if (q.fee) itemDetails.push({ id: 'fee', price: q.fee, quantity: 1, name: ('Biaya layanan ' + C.METHODS[method].label).slice(0, 50) });
  const expiry = items.includes('tarot') ? PRODUCTS.tarot.expiryMinutes : C.REPORT_EXPIRY_MIN;
  const payload = {
    transaction_details: { order_id: orderId, gross_amount: q.total },
    item_details: itemDetails,
    enabled_payments: C.METHODS[method].enabled,
    expiry: { unit: 'minutes', duration: expiry }
  };
  if (customer && (customer.name || customer.email || customer.phone)) {
    payload.customer_details = {
      first_name: (customer.name || '').slice(0, 50) || undefined,
      email: customer.email || undefined,
      phone: customer.phone || undefined
    };
  }
  // custom_field1 & 3: data pencocokan Meta (lib/meta.js). custom_field2: data untuk menyusun laporan.
  if (tracking) {
    if (tracking.field1) payload.custom_field1 = tracking.field1.slice(0, 255);
    if (tracking.field3) payload.custom_field3 = tracking.field3.slice(0, 255);
  }
  if (notes) payload.custom_field2 = String(notes).slice(0, 255);
  if (finishUrl) payload.callbacks = { finish: finishUrl };

  // Permintaan pembuatan transaksi: satu percobaan ulang saja untuk gangguan jaringan.
  const res = await request(cfg.snapBase + '/snap/v1/transactions', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', Authorization: authHeader(cfg.serverKey) },
    body: JSON.stringify(payload)
  }, { retries: 1 });

  if (res.status !== 201 && res.status !== 200) {
    const msg = res.body && (res.body.error_messages || res.body.status_message);
    const err = new Error('Midtrans menolak transaksi: ' + (Array.isArray(msg) ? msg.join('; ') : msg || res.status));
    err.statusCode = 502;
    throw err;
  }
  return { token: res.body.token, redirectUrl: res.body.redirect_url, amount: q.total };
}

/** Status pembayaran langsung dari Midtrans — satu-satunya sumber kebenaran. */
async function getStatus(orderId) {
  const cfg = config();
  const res = await request(cfg.apiBase + '/v2/' + encodeURIComponent(orderId) + '/status', {
    method: 'GET',
    headers: { Accept: 'application/json', Authorization: authHeader(cfg.serverKey) }
  });
  const b = res.body || {};
  const code = String(b.status_code || res.status);
  const order = C.parseOrder(orderId);
  const items = order ? order.items : [];
  const base = { items, product: items[0] || null, method: order ? order.method : null, amount: order ? order.quote.total : null, value: order ? order.quote.subtotal : null };

  // 404: transaksi dibuat tetapi pembeli belum memilih metode pembayaran.
  if (code === '404') return Object.assign({ status: 'waiting' }, base);

  const ts = b.transaction_status;
  let status;
  if (ts === 'settlement') status = 'paid';
  else if (ts === 'capture') status = b.fraud_status === 'accept' || !b.fraud_status ? 'paid' : 'pending';
  else if (ts === 'pending' || ts === 'authorize') status = 'pending';
  else if (ts === 'expire') status = 'expired';
  else if (ts === 'deny' || ts === 'cancel' || ts === 'failure') status = 'failed';
  else if (ts === 'refund' || ts === 'partial_refund' || ts === 'chargeback' || ts === 'partial_chargeback') status = 'refunded';
  else status = 'unknown';

  // Pastikan jumlah yang dibayar sama dengan total yang dihitung ulang dari nomor pesanan.
  if (status === 'paid' && (!order || Math.round(Number(b.gross_amount)) !== order.quote.total)) status = 'amount_mismatch';

  return Object.assign({
    status,
    paymentType: b.payment_type || null,
    transactionStatus: ts || null,
    expiryTime: b.expiry_time || null,
    // Hanya untuk server (pelacakan); tidak dikirim ke browser.
    _fields: { custom_field1: b.custom_field1 || '', custom_field3: b.custom_field3 || '' }
  }, base);
}

/** Verifikasi tanda tangan notifikasi (webhook) dari Midtrans. */
function verifyNotification(body) {
  const cfg = config();
  if (!body || !body.order_id || !body.signature_key) return false;
  const expected = crypto.createHash('sha512')
    .update(String(body.order_id) + String(body.status_code) + String(body.gross_amount) + cfg.serverKey)
    .digest('hex');
  const a = Buffer.from(expected);
  const b = Buffer.from(String(body.signature_key));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function baseUrl(req) {
  if (process.env.PUBLIC_BASE_URL) return process.env.PUBLIC_BASE_URL.replace(/\/+$/, '');
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  const proto = (req.headers['x-forwarded-proto'] || 'https').split(',')[0];
  return proto + '://' + host;
}

function send(res, status, data) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}

async function readJson(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  try { return JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}'); } catch (e) { return {}; }
}

module.exports = {
  PRODUCTS, ENABLED_PAYMENTS, ORDER_RE, catalog: C,
  config, newOrderId, createSnap, getStatus, verifyNotification, baseUrl, send, readJson
};
