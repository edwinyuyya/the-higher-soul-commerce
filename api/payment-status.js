/* GET /api/payment-status?order_id=... — cek status langsung ke Midtrans. */
'use strict';
const M = require('../lib/midtrans');

module.exports = async (req, res) => {
  if (req.method !== 'GET') return M.send(res, 405, { error: 'Gunakan GET.' });
  if (!M.config().configured) return M.send(res, 503, { error: 'Pembayaran belum dikonfigurasi.' });
  const url = new URL(req.url, 'http://x');
  const orderId = url.searchParams.get('order_id') || '';
  if (!M.ORDER_RE.test(orderId)) return M.send(res, 400, { error: 'Nomor pesanan tidak valid.' });
  try {
    const st = await M.getStatus(orderId);
    M.send(res, 200, Object.assign({ orderId }, st));
  } catch (err) {
    console.error('[payment-status]', orderId, err.message);
    // 503 = sementara; browser akan mencoba lagi, pembayaran tidak hilang.
    M.send(res, 503, { error: 'Tidak bisa menghubungi payment gateway. Mencoba lagi…', retry: true });
  }
};
