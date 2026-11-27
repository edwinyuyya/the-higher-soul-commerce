/* Tarot ini hanya dibuka pembeli (Tarot Master atau Paket Lengkap), jadi tidak ada penawaran produk di dalamnya.
   app.js dan numerology.js tetap memanggil Shop.html()/bind(), jadi keduanya dibiarkan kosong. */
(function () {
  'use strict';
  window.Shop = { html: function () { return ''; }, bind: function () {}, tarotFree: true };
})();
