/* POST /api/create-payment — membuat transaksi Snap.
   Body: { items: ['lifepath','year'], method: 'Q'|'E'|'V', customer: {name,email,phone}, birthdate }
   (bentuk lama { product: 'tarot' } tetap diterima). Harga & biaya dihitung di server. */
'use strict';
const M = require('../lib/midtrans');
const Meta = require('../lib/meta');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

module.exports = async (req, res) => {
  if (req.method !== 'POST') return M.send(res, 405, { error: 'Gunakan POST.' });
  const cfg = M.config();
  if (!cfg.configured) return M.send(res, 503, { error: 'Pembayaran belum dikonfigurasi.' });

  const body = await M.readJson(req);
  const cart = M.catalog.normalizeCart(Array.isArray(body.items) ? body.items : [body.product], body.method);
  if (cart.error) return M.send(res, 400, { error: cart.error });
  const { items, method } = cart;

  const c = body.customer || {};
  const customer = {
    name: String(c.name || '').trim().slice(0, 80),
    email: String(c.email || '').trim().slice(0, 120),
    phone: String(c.phone || '').replace(/[^\d+]/g, '').slice(0, 20)
  };
  let notes = null;

  if (items.some((k) => M.PRODUCTS[k].report)) {
    const birthdate = String(body.birthdate || '');
    if (customer.name.length < 2) return M.send(res, 400, { error: 'Nama lengkap wajib diisi.' });
    if (!EMAIL_RE.test(customer.email)) return M.send(res, 400, { error: 'Alamat email tidak valid.' });
    if (!DATE_RE.test(birthdate)) return M.send(res, 400, { error: 'Tanggal lahir tidak valid.' });
    // Data untuk menyusun laporan, terlihat di dasbor Midtrans pada detail transaksi.
    notes = 'Nama: ' + customer.name + ' | Lahir: ' + birthdate + ' | WA: ' + (customer.phone || '-');
  } else if (customer.email && !EMAIL_RE.test(customer.email)) {
    customer.email = '';
  }

  const orderId = M.newOrderId(items, method);
  try {
    const snap = await M.createSnap({
      items,
      method,
      orderId,
      customer,
      notes,
      tracking: Meta.packTracking(req, customer),
      finishUrl: M.baseUrl(req) + '/'
    });
    const q = M.catalog.quote(items, method);
    M.send(res, 200, { orderId, token: snap.token, redirectUrl: snap.redirectUrl, items, method, subtotal: q.subtotal, fee: q.fee, amount: q.total });
  } catch (err) {
    console.error('[create-payment]', orderId, err.message);
    M.send(res, err.statusCode || 502, { error: 'Gagal membuat transaksi. Silakan coba lagi sebentar lagi.' });
  }
};
