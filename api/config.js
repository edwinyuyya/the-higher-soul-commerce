/* GET /api/config — pengaturan publik untuk browser (tanpa kunci rahasia). */
'use strict';
const M = require('../lib/midtrans');

module.exports = (req, res) => {
  const cfg = M.config();
  if (!cfg.configured) return M.send(res, 200, { mode: 'unconfigured' });
  M.send(res, 200, {
    mode: 'midtrans',
    clientKey: cfg.clientKey,
    isProduction: cfg.isProduction,
    snapJs: cfg.snapBase + '/snap/snap.js',
    prices: { tarot: M.PRODUCTS.tarot.price, numerology: M.PRODUCTS.numerology.price }
  });
};
