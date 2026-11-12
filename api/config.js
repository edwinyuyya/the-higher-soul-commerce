/* GET /api/config — pengaturan publik untuk browser (tanpa kunci rahasia). */
'use strict';
const M = require('../lib/midtrans');
const Meta = require('../lib/meta');

module.exports = (req, res) => {
  const cfg = M.config();
  // Pixel ID boleh publik; token Conversions API tidak pernah dikirim ke browser.
  const meta = { pixelId: Meta.config().pixelId || null };
  if (!cfg.configured) return M.send(res, 200, Object.assign({ mode: 'unconfigured', meta }, M.catalog.publicCatalog()));
  M.send(res, 200, Object.assign({
    mode: 'midtrans',
    clientKey: cfg.clientKey,
    isProduction: cfg.isProduction,
    snapJs: cfg.snapBase + '/snap/snap.js',
    meta
  }, M.catalog.publicCatalog()));
};
