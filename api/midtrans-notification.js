/* POST /api/midtrans-notification — webhook "Payment Notification URL" Midtrans.
   Tanda tangan diverifikasi, lalu status dicek ulang langsung ke Midtrans.
   Bila lunas, event Purchase dikirim ke Meta (Conversions API). Ini jalur utama
   pelacakan: tetap jalan walau pembeli sudah menutup browser setelah membayar. */
'use strict';
const M = require('../lib/midtrans');
const Meta = require('../lib/meta');

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
      console.log('[notification]', body.order_id, st.items.join('+'), st.status, st.paymentType);
      if (st.status === 'paid') {
        const fields = {
          custom_field1: st._fields.custom_field1 || body.custom_field1 || '',
          custom_field3: st._fields.custom_field3 || body.custom_field3 || ''
        };
        await Meta.sendPurchase({ orderId: body.order_id, items: st.items, value: st.value, fields, sourceUrl: M.baseUrl(req) + '/' });
      }
    }
  } catch (err) {
    console.error('[notification]', body.order_id, err.message);
  }
  M.send(res, 200, { ok: true });
};
