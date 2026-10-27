/* =========================================================
   PENAWARAN — tarot gratis mengarahkan ke halaman order Blueprint.
   Harga dibaca dari /api/products (src/lib/products.js) agar satu sumber.
   ========================================================= */
(function () {
  'use strict';

  const rupiah = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  let catalog = null;
  const ready = fetch('/api/products', { cache: 'no-store' })
    .then((r) => (r.ok ? r.json() : null))
    .then((d) => { catalog = d; return d; })
    .catch(() => null);

  function cards(d) {
    if (!d) {
      return '<a class="btn btn-primary btn-big promo-cta shop-cta" href="/#pilihan">Lihat pilihan Blueprint</a>';
    }
    const b = d.bundle;
    return '' +
      '<a class="shop-bundle" href="/order?items=' + b.id + '">' +
      '<span class="shop-badge">Hemat ' + rupiah(d.singlesTotal - b.price) + '</span>' +
      '<span class="shop-bundle-title">' + esc(b.title) + '</span>' +
      '<span class="shop-blurb">' + esc(b.body) + '</span>' +
      '<span class="shop-price"><s>' + rupiah(d.singlesTotal) + '</s> <strong>' + rupiah(b.price) + '</strong></span>' +
      '</a>' +
      '<p class="shop-or">atau pilih satuan</p>' +
      '<div class="shop-grid">' +
      d.products.map((p) =>
        '<a class="shop-item" href="/order?items=' + p.id + '">' +
        '<span class="pp-ico" aria-hidden="true">' + p.icon + '</span>' +
        '<span class="shop-item-title">' + esc(p.title) + '</span>' +
        '<span class="shop-blurb">' + esc(p.body) + '</span>' +
        '<span class="shop-price"><strong>' + rupiah(p.price) + '</strong></span>' +
        '</a>').join('') +
      '</div>';
  }

  function html() {
    return '' +
      '<section class="promo shop" data-shop aria-labelledby="shopTitle">' +
      '<div class="promo-glow" aria-hidden="true"></div>' +
      '<p class="promo-eyebrow">Laporan pribadi · The Higher Soul</p>' +
      '<h3 id="shopTitle">Kenali dirimu lebih dalam.<br><span>Life Path, Destiny, Numerologi, dan Human Design.</span></h3>' +
      '<div data-shop-cards>' + cards(catalog) + '</div>' +
      '</section>';
  }

  function bind(root) {
    if (catalog) return;
    ready.then((d) => {
      if (!d) return;
      root.querySelectorAll('[data-shop-cards]').forEach((el) => { el.innerHTML = cards(d); });
    });
  }

  window.Shop = { html: html, bind: bind, tarotFree: true };
})();
