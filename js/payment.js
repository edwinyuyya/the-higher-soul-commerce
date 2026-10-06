/* =========================================================
   PEMBAYARAN — Midtrans Snap (QRIS, e-wallet, Virtual Account)

   Prinsip agar pembayaran tidak "hilang" atau gagal terbaca:
   1. Harga & transaksi dibuat di server (/api/create-payment).
   2. Status SELALU dicek ke server (/api/payment-status), yang bertanya
      langsung ke Midtrans. Callback di browser hanya pemicu pengecekan.
   3. Pesanan yang belum selesai disimpan di browser, jadi bila pembeli
      pindah ke aplikasi e-wallet / bank lalu kembali, pengecekan berlanjut
      dan tidak perlu membayar dua kali.
   4. Bila popup Snap gagal dimuat, pembeli dialihkan ke halaman bayar Midtrans.
   ========================================================= */
(function () {
  'use strict';

  const PENDING_KEY = 'hs_pending_payment';
  const POLL_MS = 3000;
  const POLL_LIMIT_MS = 30 * 60 * 1000;

  const LABEL = {
    tarot: { title: 'Buka Bacaan Tarot', price: 15000 },
    numerology: { title: 'Laporan Numerologi Lengkap (PDF)', price: 199000 }
  };

  const store = {
    get(k) { try { return JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { return null; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* abaikan */ } },
    del(k) { try { localStorage.removeItem(k); } catch (e) { /* abaikan */ } }
  };

  const PAY_NAMES = { qris: 'QRIS', gopay: 'GoPay', shopeepay: 'ShopeePay', bank_transfer: 'Virtual Account', echannel: 'Mandiri Bill', permata: 'Permata VA', cstore: 'gerai' };
  const rupiah = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  let cfgPromise = null;
  function getConfig() {
    if (cfgPromise) return cfgPromise;
    if (window.HS_PAYMENT_MODE === 'demo') {
      cfgPromise = Promise.resolve({ mode: 'demo', prices: { tarot: 15000, numerology: 199000 } });
      return cfgPromise;
    }
    cfgPromise = fetch('/api/config', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : { mode: 'unconfigured' }))
      .catch(() => ({ mode: 'unconfigured' }));
    return cfgPromise;
  }

  async function api(path, opts) {
    const res = await fetch(path, Object.assign({ cache: 'no-store' }, opts));
    let body = {};
    try { body = await res.json(); } catch (e) { /* kosong */ }
    if (!res.ok) {
      const err = new Error(body.error || ('Gagal (' + res.status + ')'));
      err.retry = res.status >= 500;
      throw err;
    }
    return body;
  }

  /* ---------------- Snap.js ---------------- */
  let snapPromise = null;
  function loadSnap(cfg) {
    if (window.snap && window.snap.pay) return Promise.resolve(window.snap);
    if (snapPromise) return snapPromise;
    snapPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = cfg.snapJs;
      s.setAttribute('data-client-key', cfg.clientKey);
      const t = setTimeout(() => reject(new Error('timeout')), 12000);
      s.onload = () => { clearTimeout(t); window.snap ? resolve(window.snap) : reject(new Error('snap')); };
      s.onerror = () => { clearTimeout(t); reject(new Error('load')); };
      document.head.appendChild(s);
    }).catch((e) => { snapPromise = null; throw e; });
    return snapPromise;
  }

  /* ---------------- Dialog ---------------- */
  let dlg = null;
  function dialog() {
    if (dlg) return dlg;
    dlg = document.createElement('dialog');
    dlg.className = 'pay-dialog';
    dlg.setAttribute('aria-labelledby', 'payTitle');
    dlg.addEventListener('cancel', (e) => e.preventDefault());
    document.body.appendChild(dlg);
    return dlg;
  }
  function show(html) {
    const d = dialog();
    d.innerHTML = html;
    if (!d.open) { if (d.showModal) d.showModal(); else d.setAttribute('open', ''); }
    return d;
  }
  function hide() {
    if (dlg && dlg.open) { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }
  }

  const METHODS = '<ul class="pay-methods" aria-label="Metode pembayaran">' +
    '<li>QRIS</li><li>GoPay</li><li>ShopeePay</li><li>OVO · DANA · LinkAja <small>(via QRIS)</small></li>' +
    '<li>VA BCA</li><li>VA BNI</li><li>VA BRI</li><li>Mandiri</li><li>Permata</li><li>CIMB</li></ul>';

  function head(product, extra) {
    const L = LABEL[product];
    return '<div class="pay-head"><span class="pay-lock" aria-hidden="true">🔒</span><div><h2 id="payTitle">' + L.title + '</h2>' +
      '<p class="pay-amount">' + rupiah(L.price) + '</p></div></div>' + (extra || '');
  }

  /* ---------------- Polling status ---------------- */
  function waitForPaid(orderId, product, ui) {
    let stop = false;
    const started = Date.now();
    const promise = (async () => {
      let delay = POLL_MS;
      while (!stop && Date.now() - started < POLL_LIMIT_MS) {
        try {
          const st = await api('/api/payment-status?order_id=' + encodeURIComponent(orderId));
          ui && ui(st);
          if (st.status === 'paid') return st;
          if (st.status === 'expired' || st.status === 'failed' || st.status === 'refunded' || st.status === 'amount_mismatch') return st;
          delay = POLL_MS;
        } catch (e) {
          delay = Math.min(delay * 1.5, 10000); // gangguan sementara: coba lagi, jangan menyerah
        }
        await sleep(delay);
      }
      return { status: stop ? 'stopped' : 'timeout' };
    })();
    return { promise, cancel: () => { stop = true; } };
  }

  /* ---------------- Alur utama ---------------- */
  /**
   * checkout({product, customer, birthdate, beforePay}) → Promise<{orderId}>
   * Selesai HANYA bila server mengonfirmasi pembayaran lunas.
   * Ditolak dengan {cancelled:true} bila pembeli menutup dialog.
   */
  function checkout(opts) {
    return new Promise((resolve, reject) => {
      run(opts, resolve, reject).catch((err) => {
        showError(opts, err && err.message, resolve, reject);
      });
    });
  }

  async function run(opts, resolve, reject) {
    const product = opts.product;
    const cfg = await getConfig();

    if (cfg.mode === 'demo') return demoFlow(opts, resolve, reject);
    if (cfg.mode !== 'midtrans') {
      show(head(product) + '<p class="pay-msg">Pembayaran online belum aktif di situs ini. Silakan hubungi admin Higher Soul.</p>' +
        '<div class="pay-actions"><button class="btn" type="button" data-x>Tutup</button></div>');
      dlg.querySelector('[data-x]').onclick = () => { hide(); reject({ cancelled: true }); };
      return;
    }

    show(head(product, '<p class="pay-msg"><span class="pay-spin"></span>Menyiapkan pembayaran aman…</p>' + METHODS));

    // Pakai ulang pesanan yang belum dibayar agar tidak membuat tagihan ganda.
    let order = store.get(PENDING_KEY);
    if (order && order.product === product && opts.reuseKey && order.reuseKey === opts.reuseKey && Date.now() - order.createdAt < 50 * 60 * 1000) {
      try {
        const st = await api('/api/payment-status?order_id=' + encodeURIComponent(order.orderId));
        if (st.status === 'paid') return finish(order, resolve);
        if (st.status !== 'pending' && st.status !== 'waiting') order = null;
      } catch (e) { /* tetap pakai pesanan lama */ }
    } else {
      order = null;
    }

    if (!order) {
      const created = await api('/api/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product, customer: opts.customer || {}, birthdate: opts.birthdate || '' })
      });
      order = { orderId: created.orderId, token: created.token, redirectUrl: created.redirectUrl, product, reuseKey: opts.reuseKey || null, createdAt: Date.now() };
      store.set(PENDING_KEY, order);
    }
    if (opts.beforePay) opts.beforePay(order.orderId);

    openSnap(cfg, order, opts, resolve, reject);
  }

  async function openSnap(cfg, order, opts, resolve, reject) {
    let snap;
    try {
      snap = await loadSnap(cfg);
    } catch (e) {
      // Popup tidak bisa dimuat (jaringan/pemblokir iklan): pakai halaman bayar Midtrans.
      show(head(order.product) + '<p class="pay-msg">Jendela pembayaran tidak bisa dimuat di peramban ini. Lanjutkan di halaman pembayaran resmi Midtrans; setelah selesai kamu akan diarahkan kembali ke sini.</p>' +
        '<div class="pay-actions"><button class="btn btn-ghost" type="button" data-x>Batal</button><a class="btn btn-primary" href="' + esc(order.redirectUrl) + '">Buka halaman pembayaran</a></div>');
      dlg.querySelector('[data-x]').onclick = () => { hide(); reject({ cancelled: true }); };
      return;
    }
    hide(); // Snap memakai lapisan sendiri; dialog kita ditutup agar tidak menutupinya.
    let settled = false;
    const after = (hint) => { if (!settled) { settled = true; waiting(order, opts, resolve, reject, hint); } };
    try {
      snap.pay(order.token, {
        onSuccess: () => after('checking'),
        onPending: () => after('pending'),
        onError: () => after('error'),
        onClose: () => after('closed')
      });
    } catch (e) {
      after('error');
    }
  }

  function waiting(order, opts, resolve, reject, hint) {
    const msg = {
      checking: 'Pembayaran diterima. Memastikan ke payment gateway…',
      pending: 'Menunggu pembayaranmu. Selesaikan pembayaran di aplikasi e-wallet atau m-banking; halaman ini akan terbuka otomatis setelah lunas.',
      closed: 'Pembayaran belum selesai. Jika kamu sudah membayar, tunggu sebentar — kami sedang mengecek.',
      error: 'Ada kendala di jendela pembayaran. Kamu bisa mencoba lagi; tagihan yang sama tetap berlaku.'
    }[hint] || 'Mengecek status pembayaran…';

    show(head(order.product) +
      '<p class="pay-msg" id="payMsg"><span class="pay-spin"></span>' + msg + '</p>' +
      '<p class="pay-order">No. pesanan: <b>' + esc(order.orderId) + '</b></p>' +
      '<div class="pay-actions">' +
      '<button class="btn btn-ghost" type="button" data-x>Batal</button>' +
      '<button class="btn" type="button" data-check>Saya sudah bayar, cek status</button>' +
      '<button class="btn btn-primary" type="button" data-again>Lanjutkan pembayaran</button>' +
      '</div>');

    const msgEl = dlg.querySelector('#payMsg');
    const poll = waitForPaid(order.orderId, order.product, (st) => {
      if (st.status === 'pending' && msgEl) msgEl.innerHTML = '<span class="pay-spin"></span>Menunggu pembayaranmu' + (st.paymentType ? ' via ' + esc(PAY_NAMES[st.paymentType] || st.paymentType.replace(/_/g, ' ')) : '') + '. Halaman ini terbuka otomatis setelah lunas.';
    });

    dlg.querySelector('[data-x]').onclick = () => { poll.cancel(); hide(); reject({ cancelled: true, orderId: order.orderId }); };
    dlg.querySelector('[data-again]').onclick = () => { poll.cancel(); getConfig().then((cfg) => openSnap(cfg, order, opts, resolve, reject)); };
    dlg.querySelector('[data-check]').onclick = async (e) => {
      e.target.disabled = true;
      try {
        const st = await api('/api/payment-status?order_id=' + encodeURIComponent(order.orderId));
        if (st.status !== 'paid' && msgEl) msgEl.innerHTML = '<span class="pay-spin"></span>Pembayaran belum kami terima. Untuk QRIS & e-wallet biasanya masuk dalam hitungan detik, untuk Virtual Account hingga beberapa menit.';
      } catch (err) { /* polling tetap berjalan */ }
      e.target.disabled = false;
    };

    poll.promise.then((st) => {
      if (st.status === 'paid') return finish(order, resolve);
      if (st.status === 'stopped') return;
      const text = st.status === 'expired' ? 'Waktu pembayaran habis. Silakan buat pembayaran baru.'
        : st.status === 'failed' ? 'Pembayaran dibatalkan atau ditolak. Kamu tidak dikenai biaya; silakan coba lagi.'
          : st.status === 'timeout' ? 'Pembayaran belum terdeteksi. Jika kamu sudah membayar, tekan "Cek status" atau hubungi admin dengan nomor pesanan di atas.'
            : 'Status pembayaran tidak sesuai. Hubungi admin dengan nomor pesanan di atas.';
      if (st.status === 'expired' || st.status === 'failed') store.del(PENDING_KEY);
      if (st.status === 'timeout' && msgEl) { msgEl.textContent = text; return; }
      show(head(order.product) + '<p class="pay-msg">' + text + '</p><p class="pay-order">No. pesanan: <b>' + esc(order.orderId) + '</b></p>' +
        '<div class="pay-actions"><button class="btn btn-ghost" type="button" data-x>Tutup</button><button class="btn btn-primary" type="button" data-new>Bayar ulang</button></div>');
      dlg.querySelector('[data-x]').onclick = () => { hide(); reject({ cancelled: true }); };
      dlg.querySelector('[data-new]').onclick = () => { store.del(PENDING_KEY); run(Object.assign({}, opts, { reuseKey: null }), resolve, reject).catch((err) => showError(opts, err.message, resolve, reject)); };
    });
  }

  function finish(order, resolve) {
    store.del(PENDING_KEY);
    show(head(order.product) + '<p class="pay-msg pay-ok">✓ Pembayaran berhasil. Terima kasih!</p><p class="pay-order">No. pesanan: <b>' + esc(order.orderId) + '</b></p>');
    setTimeout(hide, 1400);
    resolve({ orderId: order.orderId, product: order.product });
  }

  function showError(opts, message, resolve, reject) {
    show(head(opts.product) + '<p class="pay-msg pay-err">' + esc(message || 'Terjadi kendala.') + '</p>' +
      '<div class="pay-actions"><button class="btn btn-ghost" type="button" data-x>Tutup</button><button class="btn btn-primary" type="button" data-retry>Coba lagi</button></div>');
    dlg.querySelector('[data-x]').onclick = () => { hide(); reject({ cancelled: true }); };
    dlg.querySelector('[data-retry]').onclick = () => run(opts, resolve, reject).catch((err) => showError(opts, err.message, resolve, reject));
  }

  /* ---------------- Mode demo (tanpa uang sungguhan) ---------------- */
  function demoFlow(opts, resolve, reject) {
    show(head(opts.product, '<p class="pay-demo">MODE DEMO: tidak ada pembayaran sungguhan. Di situs asli, di sini muncul jendela pembayaran Midtrans.</p>' + METHODS) +
      '<div class="pay-actions"><button class="btn btn-ghost" type="button" data-x>Batal</button><button class="btn btn-primary" type="button" data-ok>Simulasikan pembayaran berhasil</button></div>');
    dlg.querySelector('[data-x]').onclick = () => { hide(); reject({ cancelled: true }); };
    dlg.querySelector('[data-ok]').onclick = () => {
      const order = { orderId: 'DEMO-' + Date.now().toString(36).toUpperCase(), product: opts.product };
      if (opts.beforePay) opts.beforePay(order.orderId);
      finish(order, resolve);
    };
  }

  /* ---------------- Melanjutkan setelah kembali dari e-wallet / bank ---------------- */
  /** Dipanggil saat halaman dimuat. Mengembalikan {orderId, product} bila ada pesanan yang lunas. */
  async function resume() {
    const url = new URL(window.location.href);
    const fromUrl = url.searchParams.get('order_id');
    if (fromUrl) {
      ['order_id', 'status_code', 'transaction_status'].forEach((k) => url.searchParams.delete(k));
      window.history.replaceState(null, '', url.pathname + (url.search ? url.search : '') + url.hash);
    }
    const pending = store.get(PENDING_KEY);
    if (!pending || (fromUrl && fromUrl !== pending.orderId)) return null;
    const cfg = await getConfig();
    if (cfg.mode !== 'midtrans') return null;

    return new Promise((resolve) => {
      show(head(pending.product) + '<p class="pay-msg"><span class="pay-spin"></span>Mengecek pembayaranmu…</p><p class="pay-order">No. pesanan: <b>' + esc(pending.orderId) + '</b></p>');
      api('/api/payment-status?order_id=' + encodeURIComponent(pending.orderId)).then((st) => {
        if (st.status === 'paid') return finish(pending, resolve);
        if (st.status === 'pending' || (st.status === 'waiting' && fromUrl)) {
          return waiting(pending, { product: pending.product }, resolve, () => resolve(null), 'pending');
        }
        if (st.status !== 'pending' && st.status !== 'waiting') store.del(PENDING_KEY);
        hide();
        resolve(null);
      }).catch(() => waiting(pending, { product: pending.product }, resolve, () => resolve(null), 'checking'));
    });
  }

  window.Payment = { checkout: checkout, resume: resume, getConfig: getConfig, rupiah: rupiah, LABEL: LABEL };
})();
