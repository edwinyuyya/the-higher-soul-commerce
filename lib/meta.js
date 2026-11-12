/* =========================================================
   META CONVERSIONS API — event "Purchase" dikirim dari SERVER,
   hanya setelah Midtrans mengonfirmasi pembayaran lunas.

   Browser tidak pernah mengirim Purchase. Checkout hanya tercatat sebagai
   InitiateCheckout, jadi Meta tidak menghitung (dan tidak mengoptimasi ke)
   orang yang checkout lalu tidak membayar.

   Variabel lingkungan:
     META_PIXEL_ID            ID Pixel / Dataset (boleh publik)
     META_CAPI_TOKEN          Access token Conversions API (RAHASIA)
     META_TEST_EVENT_CODE     opsional, kode "Test events" di Events Manager
     META_GRAPH_VERSION       opsional, default v23.0
   ========================================================= */
'use strict';

const crypto = require('crypto');

function config() {
  const pixelId = (process.env.META_PIXEL_ID || '').trim();
  const token = (process.env.META_CAPI_TOKEN || '').trim();
  return {
    pixelId,
    token,
    enabled: Boolean(pixelId && token),
    testCode: (process.env.META_TEST_EVENT_CODE || '').trim(),
    version: (process.env.META_GRAPH_VERSION || 'v23.0').trim(),
    // Bisa ditimpa hanya untuk pengujian lokal.
    base: process.env.META_GRAPH_BASE || 'https://graph.facebook.com'
  };
}

const sha = (s) => crypto.createHash('sha256').update(s).digest('hex');

function normEmail(e) {
  e = String(e || '').trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) ? e : '';
}

/** Nomor Indonesia ke format internasional tanpa +, mis. 0812… → 62812… */
function normPhone(p) {
  let d = String(p || '').replace(/\D/g, '');
  if (d.startsWith('0')) d = '62' + d.slice(1);
  else if (d.startsWith('8')) d = '62' + d;
  return d.length >= 9 ? d : '';
}

function cookie(req, name) {
  const m = new RegExp('(?:^|;\\s*)' + name + '=([^;]+)').exec((req && req.headers && req.headers.cookie) || '');
  return m ? decodeURIComponent(m[1]) : '';
}

function clientIp(req) {
  const h = (req && req.headers) || {};
  return String(h['x-forwarded-for'] || h['x-real-ip'] || (req.socket && req.socket.remoteAddress) || '').split(',')[0].trim();
}

/* Data pencocokan disimpan di custom field Midtrans (maks. 255 karakter per field),
   karena server ini tidak memakai database. Email & no. HP disimpan dalam bentuk hash. */
function packTracking(req, customer) {
  const em = normEmail(customer && customer.email);
  const ph = normPhone(customer && customer.phone);
  const ua = String((req.headers && req.headers['user-agent']) || '').replace(/[;|]/g, ' ').slice(0, 140);
  const f1 = ['i=' + clientIp(req), 'p=' + cookie(req, '_fbp'), 'c=' + cookie(req, '_fbc')].join(';').slice(0, 255);
  const f3 = ['e=' + (em ? sha(em) : ''), 'h=' + (ph ? sha(ph).slice(0, 64) : ''), 'u=' + ua].join(';').slice(0, 255);
  return { field1: f1, field3: f3 };
}

function unpack(s) {
  const out = {};
  String(s || '').split(';').forEach((kv) => { const i = kv.indexOf('='); if (i > 0) out[kv.slice(0, i)] = kv.slice(i + 1); });
  return out;
}

/**
 * Kirim Purchase. event_id = nomor pesanan, jadi kalau terkirim dua kali
 * (dari webhook dan dari pengecekan status), Meta menghitungnya satu kali.
 * Tidak pernah melempar error: pelacakan tidak boleh mengganggu pembayaran.
 */
async function sendPurchase({ orderId, items, value, fields, req, sourceUrl }) {
  const cfg = config();
  if (!cfg.enabled) return { sent: false, reason: 'disabled' };
  const a = unpack(fields && fields.custom_field1);
  const b = unpack(fields && fields.custom_field3);
  const user = {};
  if (b.e) user.em = [b.e];
  if (b.h) user.ph = [b.h];
  const ip = a.i || (req ? clientIp(req) : '');
  const ua = b.u || (req && req.headers ? String(req.headers['user-agent'] || '') : '');
  if (ip) user.client_ip_address = ip;
  if (ua) user.client_user_agent = ua;
  const fbp = a.p || (req ? cookie(req, '_fbp') : '');
  const fbc = a.c || (req ? cookie(req, '_fbc') : '');
  if (fbp) user.fbp = fbp;
  if (fbc) user.fbc = fbc;

  const payload = {
    data: [{
      event_name: 'Purchase',
      event_time: Math.floor(Date.now() / 1000),
      event_id: orderId,
      action_source: 'website',
      event_source_url: sourceUrl || undefined,
      user_data: user,
      custom_data: {
        currency: 'IDR',
        value,
        order_id: orderId,
        content_type: 'product',
        content_ids: items,
        contents: items.map((id) => ({ id, quantity: 1 }))
      }
    }]
  };
  if (cfg.testCode) payload.test_event_code = cfg.testCode;

  try {
    const ctl = new AbortController();
    const timer = setTimeout(() => ctl.abort(), 8000);
    const res = await fetch(cfg.base + '/' + cfg.version + '/' + encodeURIComponent(cfg.pixelId) + '/events?access_token=' + encodeURIComponent(cfg.token), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: ctl.signal
    });
    clearTimeout(timer);
    if (!res.ok) {
      console.warn('[meta] Purchase ditolak', orderId, res.status, (await res.text()).slice(0, 300));
      return { sent: false, reason: 'http ' + res.status };
    }
    return { sent: true };
  } catch (err) {
    console.warn('[meta] Purchase gagal dikirim', orderId, err.message);
    return { sent: false, reason: err.message };
  }
}

module.exports = { config, packTracking, sendPurchase, normEmail, normPhone };
