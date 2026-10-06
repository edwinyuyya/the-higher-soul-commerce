/* POST /api/midtrans-notification — webhook "Payment Notification URL" Midtrans.
   Tanda tangan diverifikasi, lalu status dicek ulang langsung ke Midtrans.
   Aplikasi tidak bergantung pada webhook ini untuk membuka bacaan (browser selalu
   menanyakan status langsung), jadi pembayaran tetap terdeteksi walau webhook terlambat. */
'use strict';
const M = require('../lib/midtrans');

module.exports = async (req, res) => {
  if (req.method !== 'POST') return M.send(res, 405, { error: 'Gunakan POST.' });
  const body = await M.readJson(req);
  if (!M.verifyNotification(body)) {
    console.warn('[notification] tanda tangan tidak valid', body && body.order_id);
    return M.send(res, 401, { error: 'invalid signature' });
  }
  try {
    if (M.ORDER_RE.test(body.order_id)) {
      const st = await M.getStatus(body.order_id);
      console.log('[notification]', body.order_id, st.product, st.status, st.paymentType);
    }
  } catch (err) {
    console.error('[notification]', body.order_id, err.message);
  }
  M.send(res, 200, { ok: true });
};
