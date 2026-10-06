/* =========================================================
   PROMO LAPORAN NUMEROLOGI
   Ubah PROMO di bawah untuk harga dan tautan pemesanan.
   ========================================================= */
(function () {
  'use strict';

  const PROMO = {
    price: 'Rp 199rb',
    // Harga yang ditagih ditetapkan di server (lib/midtrans.js), bukan di sini.
    // Janji pengiriman laporan yang ditampilkan setelah pembayaran berhasil.
    delivery: 'Laporan PDF-mu akan dikirim ke email yang kamu isi.',
    // Opsional: nomor WhatsApp admin untuk konfirmasi, mis. '6281234567890'.
    adminWhatsApp: ''
  };

  /* Arti singkat angka (cuplikan gratis). Laporan PDF berisi penjelasan lengkap. */
  const ARCHETYPE = {
    1: ['Sang Pemimpin', 'mandiri, perintis, lahir untuk memulai hal baru'],
    2: ['Sang Pendamai', 'peka, diplomatis, kuat dalam kerja sama dan hubungan'],
    3: ['Sang Ekspresif', 'kreatif, komunikatif, membawa sukacita lewat kata dan karya'],
    4: ['Sang Pembangun', 'tekun, teratur, membangun fondasi yang kokoh dan tahan lama'],
    5: ['Sang Petualang', 'bebas, mudah beradaptasi, tumbuh lewat pengalaman dan perubahan'],
    6: ['Sang Pengasuh', 'penuh kasih, bertanggung jawab, menjadi tempat pulang bagi orang lain'],
    7: ['Sang Pencari', 'analitis dan spiritual, mencari kebenaran di balik permukaan'],
    8: ['Sang Penguasa', 'ambisius, berorientasi hasil, berbakat mengelola kekuasaan dan materi'],
    9: ['Sang Humanis', 'bijak, murah hati, terpanggil untuk melayani hal yang lebih besar'],
    11: ['Sang Pemberi Cahaya (Angka Master)', 'intuitif dan inspiratif, membawa pesan bagi banyak orang'],
    22: ['Sang Arsitek Agung (Angka Master)', 'visioner yang mampu mewujudkan mimpi besar menjadi nyata'],
    33: ['Sang Guru Kasih (Angka Master)', 'penyembuh dan pengajar, mengangkat orang lain lewat kasih']
  };

  const reduce = (n) => {
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
      n = String(n).split('').reduce((a, d) => a + Number(d), 0);
    }
    return n;
  };
  const digitSum = (s) => String(s).replace(/\D/g, '').split('').reduce((a, d) => a + Number(d), 0);

  /** Life Path: tanggal, bulan, tahun dijumlah terpisah lalu direduksi. */
  function lifePath(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    if (!m) return null;
    return reduce(reduce(digitSum(m[3])) + reduce(digitSum(m[2])) + reduce(digitSum(m[1])));
  }

  /** Destiny (Expression): nilai huruf nama lengkap, sistem Pythagoras (A=1 … I=9, J=1 …). */
  function destiny(name) {
    const letters = (name || '').toUpperCase().replace(/[^A-Z]/g, '');
    if (letters.length < 2) return null;
    const total = letters.split('').reduce((a, ch) => a + ((ch.charCodeAt(0) - 65) % 9) + 1, 0);
    return reduce(total);
  }

  function html() {
    return '' +
      '<section class="promo" id="numerologi" aria-labelledby="promoTitle">' +
      '<div class="promo-glow" aria-hidden="true"></div>' +
      '<p class="promo-eyebrow">Selanjutnya, kenali dirimu lebih dalam</p>' +
      '<h3 id="promoTitle">Kartu menjawab pertanyaanmu hari ini.<br><span>Angka kelahiranmu menjawab pertanyaan seumur hidupmu.</span></h3>' +
      '<p>Setiap manusia lahir membawa dua angka penting dalam numerologi:</p>' +
      '<div class="promo-paths">' +
      '<div><b>Life Path</b><i>Jalur Hidup</i><p>Misi dan pelajaran utama jiwamu, dihitung dari tanggal lahirmu. Inilah alasan kamu dilahirkan.</p></div>' +
      '<div><b>Destiny Path</b><i>Jalur Takdir</i><p>Bakat dan potensi yang ditakdirkan untuk kamu wujudkan, dihitung dari nama lengkapmu.</p></div>' +
      '</div>' +
      '<p>Sayangnya, kebanyakan orang menjalani hidup tanpa pernah mengenal kedua angka ini. Mereka bekerja keras di jalur yang terasa "bukan aku", jatuh cinta dengan pola yang sama berulang kali, dan merasa ada potensi besar dalam dirinya yang belum juga terbuka. Padahal petunjuknya sudah ada sejak hari kamu lahir.</p>' +

      '<div class="promo-try">' +
      '<p class="promo-try-title">✦ Coba gratis: lihat angka jalur hidupmu sekarang</p>' +
      '<div class="promo-fields">' +
      '<label for="numName">Nama lengkap (sesuai akta lahir)<input id="numName" type="text" autocomplete="name" placeholder="Contoh: Ayu Kartika Sari"></label>' +
      '<label for="numDate">Tanggal lahir<input id="numDate" type="date" min="1900-01-01" max="2030-12-31"></label>' +
      '</div>' +
      '<button class="btn" type="button" id="numCalc">Hitung angkaku</button>' +
      '<div class="promo-result" id="numResult" hidden></div>' +
      '</div>' +

      '<div class="promo-contact">' +
      '<p class="promo-try-title">Kirim laporannya ke mana?</p>' +
      '<div class="promo-fields">' +
      '<label for="numEmail">Email (laporan PDF dikirim ke sini)<input id="numEmail" type="email" autocomplete="email" placeholder="nama@email.com"></label>' +
      '<label for="numPhone">No. WhatsApp (opsional)<input id="numPhone" type="tel" autocomplete="tel" placeholder="08xxxxxxxxxx"></label>' +
      '</div></div>' +

      '<p class="promo-list-title">Dalam <b>Laporan Numerologi Lengkap (PDF)</b> kamu akan menemukan:</p>' +
      '<ul class="promo-list">' +
      '<li><b>Karier panggilan hidupmu.</b> Bidang kerja yang paling selaras dengan jiwamu, dan cara mendatangkan rezeki lewat bakat alamimu.</li>' +
      '<li><b>Cinta dan jodoh.</b> Pola hubunganmu, tipe pasangan yang paling cocok, dan alasan kisah yang sama terus berulang.</li>' +
      '<li><b>Kekuatan tersembunyi.</b> Potensi diri yang belum kamu maksimalkan dan cara mengasahnya.</li>' +
      '<li><b>Tantangan dan pelajaran jiwa.</b> Hal yang sering menghambatmu, dan cara melewatinya.</li>' +
      '<li><b>Arah tahun ini.</b> Tema energi pribadimu dan waktu yang tepat untuk melangkah.</li>' +
      '</ul>' +

      '<div class="promo-buy">' +
      '<div class="promo-price"><span>Harga promo</span><strong>' + PROMO.price + '</strong><small>Laporan pribadi dalam bentuk PDF</small></div>' +
      '<button class="btn btn-primary btn-big promo-cta" type="button" id="numOrder">Dapatkan Laporan Numerologiku</button>' +
      '</div>' +
      '<p class="promo-fine" id="numFine">Bayar dengan QRIS, GoPay, ShopeePay, OVO, DANA, atau Virtual Account bank. Diproses aman oleh Midtrans.</p>' +
      '</section>';
  }

  function bind(root, toast) {
    const nameEl = root.querySelector('#numName');
    const dateEl = root.querySelector('#numDate');
    const out = root.querySelector('#numResult');
    let last = null;

    function calc(show) {
      const lp = lifePath(dateEl.value);
      const ds = destiny(nameEl.value);
      if (!lp || !ds) {
        if (show) {
          out.hidden = false;
          out.innerHTML = '<p class="promo-warn">Isi nama lengkap dan tanggal lahir dulu, ya.</p>';
        }
        return null;
      }
      last = { lp: lp, ds: ds, name: nameEl.value.trim(), date: dateEl.value };
      if (show) {
        const a = ARCHETYPE[lp], b = ARCHETYPE[ds];
        out.hidden = false;
        out.innerHTML =
          '<div class="num-cards">' +
          '<div class="num-card"><span class="num">' + lp + '</span><span class="lbl">Life Path · Jalur Hidup</span><b>' + a[0] + '</b><p>' + a[1] + '.</p></div>' +
          '<div class="num-card"><span class="num">' + ds + '</span><span class="lbl">Destiny · Jalur Takdir</span><b>' + b[0] + '</b><p>' + b[1] + '.</p></div>' +
          '</div>' +
          '<p class="promo-tease">Ini baru permukaannya. Kombinasi <b>' + lp + '</b> dan <b>' + ds + '</b> menyimpan cerita yang jauh lebih spesifik tentang karier, cinta, dan potensimu. Semuanya dibahas di laporan lengkap.</p>';
      }
      return last;
    }

    root.querySelector('#numCalc').addEventListener('click', () => calc(true));

    const fine = root.querySelector('#numFine');
    const orderBtn = root.querySelector('#numOrder');
    orderBtn.addEventListener('click', async () => {
      const emailEl = root.querySelector('#numEmail');
      const phoneEl = root.querySelector('#numPhone');
      const d = calc(true);
      const email = emailEl.value.trim();
      if (!d) { nameEl.focus(); return warn('Isi nama lengkap dan tanggal lahirmu dulu, lalu tekan tombol ini lagi.'); }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { emailEl.focus(); return warn('Isi alamat email yang valid agar laporan PDF bisa dikirim.'); }
      if (!window.Payment) return warn('Pembayaran belum tersedia. Silakan muat ulang halaman.');
      orderBtn.disabled = true;
      try {
        const res = await window.Payment.checkout({
          product: 'numerology',
          customer: { name: d.name, email: email, phone: phoneEl.value.trim() },
          birthdate: d.date
        });
        showPaid(res.orderId, toast, { email: email, root: root });
      } catch (e) {
        /* dibatalkan pembeli */
      }
      orderBtn.disabled = false;
    });

    function warn(text) {
      fine.textContent = text;
      fine.classList.add('promo-warn');
    }
  }

  /** Ucapan terima kasih setelah laporan numerologi lunas. */
  function showPaid(orderId, toast, opts) {
    opts = opts || {};
    const wa = PROMO.adminWhatsApp
      ? '<a class="btn" href="https://wa.me/' + PROMO.adminWhatsApp + '?text=' + encodeURIComponent('Halo, saya sudah membayar Laporan Numerologi. No. pesanan: ' + orderId) + '" target="_blank" rel="noopener">Konfirmasi ke WhatsApp admin</a>'
      : '';
    const html = '<div class="promo-paid"><p class="promo-paid-title">✓ Pembayaran berhasil</p>' +
      '<p>' + PROMO.delivery + (opts.email ? ' (<b>' + opts.email.replace(/[<>&"]/g, '') + '</b>)' : '') + '</p>' +
      '<p>No. pesanan: <b>' + orderId + '</b>. Simpan nomor ini untuk menanyakan laporanmu.</p>' + wa + '</div>';
    const buy = opts.root && opts.root.querySelector('.promo-buy');
    if (buy) {
      buy.outerHTML = html;
      const fine = opts.root.querySelector('#numFine');
      if (fine) fine.hidden = true;
    } else {
      const banner = document.createElement('div');
      banner.className = 'promo paid-banner';
      banner.innerHTML = html + '<button class="btn btn-ghost" type="button">Tutup</button>';
      banner.querySelector('button').onclick = () => banner.remove();
      document.querySelector('main').prepend(banner);
      window.scrollTo({ top: 0 });
    }
  }

  window.Numerology = { PROMO: PROMO, html: html, bind: bind, showPaid: showPaid, lifePath: lifePath, destiny: destiny };
})();
