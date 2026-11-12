/* =========================================================
   META PIXEL (browser)
   Hanya event "atas corong": PageView, ViewContent, InitiateCheckout,
   AddPaymentInfo. Event Purchase SENGAJA tidak dikirim dari browser —
   server yang mengirimnya lewat Conversions API setelah Midtrans
   mengonfirmasi uang masuk (lib/meta.js).
   Pixel hanya dimuat bila META_PIXEL_ID diisi di server (/api/config).
   ========================================================= */
(function () {
  'use strict';

  let ready = null;

  function load(pixelId) {
    /* Kode dasar Meta Pixel (resmi), dimuat tanpa noscript. */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0'; n.queue = [];
      t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }

  function init() {
    if (ready) return ready;
    ready = (window.Payment ? window.Payment.getConfig() : fetch('/api/config').then((r) => r.json()))
      .then((cfg) => {
        const id = cfg && cfg.meta && cfg.meta.pixelId;
        if (id && /^\d{5,20}$/.test(String(id))) { load(String(id)); return true; }
        return false;
      })
      .catch(() => false);
    return ready;
  }

  /** track('InitiateCheckout', {value, currency, content_ids}, eventId) */
  function track(name, params, eventId) {
    if (name === 'Purchase') return; // lihat catatan di atas
    init().then((on) => {
      if (!on || !window.fbq) return;
      const p = Object.assign({ currency: 'IDR' }, params || {});
      if (eventId) window.fbq('track', name, p, { eventID: eventId });
      else window.fbq('track', name, p);
    });
  }

  window.Track = { init: init, track: track };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
