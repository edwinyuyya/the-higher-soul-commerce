/* =========================================================
   TOKO — produk satuan + paket, bayar transfer manual.
   Pembeli transfer, lalu tombol WhatsApp membuka chat ke admin
   dengan isi pesanan yang sudah terisi; pembeli tinggal
   melampirkan foto bukti transfer.

   UBAH DI SINI: nomor WhatsApp, rekening, dan harga.
   ========================================================= */
(function () {
  'use strict';

  const SHOP = {
    // Nomor WhatsApp admin, format internasional tanpa + atau spasi, mis. '6281234567890'.
    whatsapp: '6281916416688',
    // Rekening / e-wallet tujuan transfer. Tambah baris bila perlu.
    accounts: [
      { bank: 'BCA', number: '015 2800 914', name: 'Edwin Adrian Pranoto' }
    ],
    // true: bacaan tarot gratis (tanpa paywall). Produk berbayar dijual di toko ini.
    tarotFree: true,
    products: [
      { id: 'lifepath', icon: '☉', title: 'Life Path', price: 29000,
        blurb: 'Arah dan pelajaran utama hidupmu dari tanggal lahir: kekuatan, tantangan, dan jalan karier yang paling pas.' },
      { id: 'destiny', icon: '✧', title: 'Destiny', price: 29000,
        blurb: 'Bakat alami dari nama lengkapmu: cara terbaikmu bekerja, berkarya, dan menghasilkan.' },
      { id: 'numerology', icon: '✦', title: 'Numerologi Lengkap', price: 59000,
        blurb: 'Soul Urge, Personality, angka hari lahir, cinta, keuangan, dan tema Tahun Pribadimu bulan demi bulan.' },
      { id: 'humandesign', icon: '◈', title: 'Human Design', price: 79000, needsBirthTime: true,
        blurb: 'Tipe, strategi, otoritas pengambilan keputusan, profil, dan pusat energimu. Butuh jam dan kota lahir.' }
    ],
    bundle: { id: 'complete', title: 'Paket Lengkap Higher Soul', price: 150000,
      blurb: 'Life Path + Destiny + Numerologi Lengkap + Human Design dalam satu laporan.' },
    delivery: 'Laporan dikirim lewat WhatsApp dalam 1×24 jam setelah transfer dicek.'
  };

  const rupiah = (n) => 'Rp ' + Number(n).toLocaleString('id-ID');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const byId = (id) => SHOP.products.find((p) => p.id === id);
  const sumSingles = () => SHOP.products.reduce((a, p) => a + p.price, 0);
  const accounts = () => SHOP.accounts.filter((a) => a.number);

  let seq = 0;

  function html() {
    const k = 'shop' + (++seq);
    const full = sumSingles();
    const save = full - SHOP.bundle.price;
    return '' +
      '<section class="promo shop" data-shop="' + k + '" aria-labelledby="' + k + 'Title">' +
      '<div class="promo-glow" aria-hidden="true"></div>' +
      '<p class="promo-eyebrow">Laporan pribadi · Higher Soul</p>' +
      '<h3 id="' + k + 'Title">Kenali dirimu lebih dalam.<br><span>Pilih yang kamu butuhkan, mulai Rp ' + (Math.min.apply(null, SHOP.products.map((p) => p.price)) / 1000) + 'rb.</span></h3>' +

      '<button type="button" class="shop-bundle" data-pick="' + SHOP.bundle.id + '" aria-pressed="false">' +
      '<span class="shop-badge">Hemat ' + rupiah(save) + '</span>' +
      '<span class="shop-bundle-title">' + SHOP.bundle.title + '</span>' +
      '<span class="shop-blurb">' + SHOP.bundle.blurb + '</span>' +
      '<span class="shop-price"><s>' + rupiah(full) + '</s> <strong>' + rupiah(SHOP.bundle.price) + '</strong></span>' +
      '<span class="shop-check" aria-hidden="true"></span>' +
      '</button>' +

      '<p class="shop-or">atau pilih satuan</p>' +
      '<div class="shop-grid">' +
      SHOP.products.map((p) =>
        '<button type="button" class="shop-item" data-pick="' + p.id + '" aria-pressed="false">' +
        '<span class="pp-ico" aria-hidden="true">' + p.icon + '</span>' +
        '<span class="shop-item-title">' + p.title + '</span>' +
        '<span class="shop-blurb">' + p.blurb + '</span>' +
        '<span class="shop-price"><strong>' + rupiah(p.price) + '</strong></span>' +
        '<span class="shop-check" aria-hidden="true"></span>' +
        '</button>').join('') +
      '</div>' +

      '<div class="shop-form" hidden>' +
      '<p class="promo-try-title">Data untuk laporanmu</p>' +
      '<div class="promo-fields">' +
      '<label for="' + k + 'Name">Nama lengkap (sesuai akta lahir)<input id="' + k + 'Name" data-f="name" type="text" autocomplete="name" placeholder="Contoh: Ayu Kartika Sari"></label>' +
      '<label for="' + k + 'Date">Tanggal lahir<input id="' + k + 'Date" data-f="date" type="date" min="1900-01-01" max="2030-12-31"></label>' +
      '</div>' +
      '<div class="promo-fields shop-hd" hidden>' +
      '<label for="' + k + 'Place">Kota lahir<input id="' + k + 'Place" data-f="place" type="text" placeholder="Contoh: Surabaya"></label>' +
      '<label for="' + k + 'Time">Jam lahir<input id="' + k + 'Time" data-f="time" type="time"></label>' +
      '</div>' +
      '<p class="shop-note shop-hd" hidden>Human Design butuh jam lahir. Kalau tidak tahu pasti, isi perkiraan terdekat dan tulis "perkiraan" di chat WhatsApp.</p>' +
      '<div class="promo-buy">' +
      '<div class="promo-price"><span>Total</span><strong data-total>Rp 0</strong><small data-summary></small></div>' +
      '<button class="btn btn-primary btn-big promo-cta" type="button" data-order>Pesan sekarang</button>' +
      '</div>' +
      '<p class="promo-fine" data-fine>Bayar dengan transfer bank atau e-wallet. ' + SHOP.delivery + '</p>' +
      '</div>' +
      '</section>';
  }

  function bind(root) {
    root.querySelectorAll('[data-shop]').forEach(bindOne);
  }

  function bindOne(sec) {
    if (sec.dataset.bound) return;
    sec.dataset.bound = '1';
    const picked = new Set();
    const form = sec.querySelector('.shop-form');
    const fine = sec.querySelector('[data-fine]');
    const field = (f) => sec.querySelector('[data-f="' + f + '"]');

    function selection() {
      if (picked.has(SHOP.bundle.id)) return { items: [SHOP.bundle], total: SHOP.bundle.price, hd: true };
      const items = SHOP.products.filter((p) => picked.has(p.id));
      return { items: items, total: items.reduce((a, p) => a + p.price, 0), hd: items.some((p) => p.needsBirthTime) };
    }

    function refresh() {
      sec.querySelectorAll('[data-pick]').forEach((b) => b.setAttribute('aria-pressed', String(picked.has(b.dataset.pick))));
      const s = selection();
      form.hidden = !s.items.length;
      sec.querySelectorAll('.shop-hd').forEach((el) => { el.hidden = !s.hd; });
      sec.querySelector('[data-total]').textContent = rupiah(s.total);
      // Bila total satuan sudah mendekati harga paket, tawarkan paket.
      const nudge = !picked.has(SHOP.bundle.id) && s.total >= SHOP.bundle.price * 0.75;
      sec.querySelector('[data-summary]').innerHTML = nudge
        ? (s.total >= SHOP.bundle.price
          ? 'Lebih hemat ambil <button type="button" class="shop-link" data-upgrade>Paket Lengkap ' + rupiah(SHOP.bundle.price) + '</button>'
          : 'Tambah ' + rupiah(SHOP.bundle.price - s.total) + ' saja untuk <button type="button" class="shop-link" data-upgrade>Paket Lengkap</button>')
        : esc(s.items.map((p) => p.title).join(' + '));
      const up = sec.querySelector('[data-upgrade]');
      if (up) up.onclick = () => { picked.clear(); picked.add(SHOP.bundle.id); refresh(); };
      fine.classList.remove('promo-warn');
      fine.textContent = 'Bayar dengan transfer bank atau e-wallet. ' + SHOP.delivery;
    }

    sec.querySelectorAll('[data-pick]').forEach((b) => b.addEventListener('click', () => {
      const id = b.dataset.pick;
      const first = !picked.size;
      if (picked.has(id)) picked.delete(id);
      else {
        if (id === SHOP.bundle.id) picked.clear();
        else picked.delete(SHOP.bundle.id);
        picked.add(id);
      }
      // Isi otomatis dari kalkulator numerologi gratis bila sudah diisi.
      const nn = document.getElementById('numName'), nd = document.getElementById('numDate');
      if (nn && nn.value && !field('name').value) field('name').value = nn.value;
      if (nd && nd.value && !field('date').value) field('date').value = nd.value;
      refresh();
      if (first && picked.size) form.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }));

    sec.querySelector('[data-order]').addEventListener('click', () => {
      const s = selection();
      const d = { name: field('name').value.trim(), date: field('date').value, place: field('place').value.trim(), time: field('time').value };
      const warn = (text, el) => { fine.textContent = text; fine.classList.add('promo-warn'); if (el) el.focus(); };
      if (!s.items.length) return warn('Pilih minimal satu laporan dulu.');
      if (d.name.replace(/[^A-Za-z]/g, '').length < 2) return warn('Isi nama lengkapmu dulu.', field('name'));
      if (!d.date) return warn('Isi tanggal lahirmu dulu.', field('date'));
      if (s.hd && !d.place) return warn('Human Design butuh kota lahir.', field('place'));
      if (s.hd && !d.time) return warn('Human Design butuh jam lahir.', field('time'));
      openPay(s, d);
    });
  }

  /* ---------------- dialog cara bayar ---------------- */
  let dlg = null;
  function dialog() {
    if (dlg) return dlg;
    dlg = document.createElement('dialog');
    dlg.className = 'pay-dialog';
    dlg.setAttribute('aria-labelledby', 'shopPayTitle');
    document.body.appendChild(dlg);
    return dlg;
  }

  const fmtDate = (iso) => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || ''); return m ? m[3] + '-' + m[2] + '-' + m[1] : iso; };

  function orderCode() {
    const t = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return 'HS' + pad(t.getDate()) + pad(t.getMonth() + 1) + '-' + Math.random().toString(36).slice(2, 6).toUpperCase();
  }

  function waText(code, s, d) {
    return [
      'Halo Higher Soul, saya sudah transfer. Bukti transfer saya lampirkan.',
      '',
      'No. pesanan: ' + code,
      'Pesanan: ' + s.items.map((p) => p.title).join(' + '),
      'Total: ' + rupiah(s.total),
      '',
      'Nama lengkap: ' + d.name,
      'Tanggal lahir: ' + fmtDate(d.date)
    ].concat(s.hd ? ['Kota lahir: ' + d.place, 'Jam lahir: ' + d.time] : []).join('\n');
  }

  function openPay(s, d) {
    const code = orderCode();
    const accs = accounts();
    const ready = SHOP.whatsapp && accs.length;
    const box = dialog();
    box.innerHTML =
      '<div class="pay-head"><span class="pay-lock" aria-hidden="true">✦</span><div><h2 id="shopPayTitle">' + esc(s.items.map((p) => p.title).join(' + ')) + '</h2>' +
      '<p class="pay-amount">' + rupiah(s.total) + '</p></div></div>' +
      (ready ? '' : '<p class="pay-demo">Nomor WhatsApp atau rekening admin belum diatur. Hubungi Higher Soul lewat Instagram.</p>') +
      '<ol class="shop-steps">' +
      '<li>Transfer tepat <b>' + rupiah(s.total) + '</b> ke salah satu rekening ini:' +
      '<ul class="shop-accs">' + accs.map((a) =>
        '<li><span><b>' + esc(a.bank) + '</b> ' + esc(a.number) + (a.name ? '<small>a.n. ' + esc(a.name) + '</small>' : '') + '</span>' +
        '<button type="button" class="btn shop-copy" data-copy="' + esc(a.number.replace(/\s/g, '')) + '">Salin</button></li>').join('') +
      '</ul></li>' +
      '<li>Screenshot atau foto bukti transfernya.</li>' +
      '<li>Tekan tombol di bawah. WhatsApp terbuka dengan pesananmu sudah terisi, lalu <b>lampirkan foto bukti transfer</b> dan kirim.</li>' +
      '</ol>' +
      '<p class="pay-order">No. pesanan: <b>' + code + '</b></p>' +
      '<div class="pay-actions">' +
      '<button class="btn btn-ghost" type="button" data-x>Tutup</button>' +
      (ready
        ? '<a class="btn btn-primary" target="_blank" rel="noopener" href="https://wa.me/' + SHOP.whatsapp + '?text=' + encodeURIComponent(waText(code, s, d)) + '">Kirim bukti via WhatsApp</a>'
        : '') +
      '</div>';
    if (!box.open) { if (box.showModal) box.showModal(); else box.setAttribute('open', ''); }
    box.querySelector('[data-x]').onclick = () => { if (box.close) box.close(); else box.removeAttribute('open'); };
    box.querySelectorAll('[data-copy]').forEach((b) => b.addEventListener('click', () => {
      const done = () => { b.textContent = 'Tersalin ✓'; setTimeout(() => { b.textContent = 'Salin'; }, 1600); };
      const fail = () => { b.textContent = b.dataset.copy; };
      if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy).then(done, fail); else fail();
    }));
  }

  window.Shop = { SHOP: SHOP, html: html, bind: bind, tarotFree: SHOP.tarotFree };
})();
