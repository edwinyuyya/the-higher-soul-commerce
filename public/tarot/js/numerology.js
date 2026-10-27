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

  /* Bacaan gratis per angka, ditulis dengan bahasa sehari-hari.
     Laporan PDF berisi penjelasan lengkap. */
  const MEANING = {
    1: { name: 'Sang Pemimpin',
      about: 'Kamu orang yang suka memulai duluan. Kalau ada yang macet, biasanya kamu yang maju dan bilang "ayo, kita coba".',
      strengths: ['Berani ambil keputusan', 'Mandiri', 'Penuh ide baru'],
      watch: 'Kamu sering merasa harus mengurus semuanya sendiri, jadi cepat lelah dan gampang kesal kalau orang lain lambat.',
      tip: 'Minta bantuan untuk satu hal kecil. Itu bukan tanda lemah.',
      shine: 'memimpin dan membuka jalan baru', tool: 'keberanianmu untuk memulai' },
    2: { name: 'Sang Pendamai',
      about: 'Kamu peka dengan perasaan orang lain. Kamu cepat sadar kalau suasana sedang tidak enak, dan sering jadi penengah.',
      strengths: ['Pendengar yang baik', 'Sabar', 'Pandai menjaga hubungan'],
      watch: 'Kamu susah bilang "tidak" karena takut orang kecewa. Lama-lama kebutuhanmu sendiri terlupakan.',
      tip: 'Tolak dengan sopan satu permintaan yang sebenarnya memberatkanmu.',
      shine: 'menyatukan orang dan menciptakan suasana damai', tool: 'kepekaan dan kesabaranmu' },
    3: { name: 'Sang Ekspresif',
      about: 'Kamu orangnya ekspresif. Kamu gampang membuat orang tertawa, pandai bercerita, dan punya banyak ide kreatif.',
      strengths: ['Pandai berkomunikasi', 'Kreatif', 'Ceria dan menular'],
      watch: 'Kamu cepat semangat di awal tapi juga cepat bosan, jadi banyak rencana berhenti di tengah jalan.',
      tip: 'Pilih satu ide saja, lalu selesaikan sampai tuntas.',
      shine: 'berbagi ide dan menghibur orang', tool: 'kata-kata dan kreativitasmu' },
    4: { name: 'Sang Pembangun',
      about: 'Kamu orang yang bisa diandalkan. Kamu suka hal yang jelas, rapi, dan bertahap, dan tidak gampang menyerah.',
      strengths: ['Tekun', 'Disiplin', 'Jujur dan bisa dipercaya'],
      watch: 'Kamu bisa terlalu kaku, dan jadi cemas kalau rencana berubah mendadak.',
      tip: 'Sisakan satu hari tanpa jadwal. Biarkan sesuatu berjalan tanpa rencana.',
      shine: 'membangun sesuatu yang kokoh, pelan tapi pasti', tool: 'ketekunan dan kerapianmu' },
    5: { name: 'Sang Petualang',
      about: 'Kamu butuh kebebasan dan suka hal baru. Kamu mudah menyesuaikan diri dan berani mencoba hal yang ditakuti orang lain.',
      strengths: ['Luwes', 'Berani mencoba', 'Mudah bergaul'],
      watch: 'Kamu cepat gelisah kalau terlalu lama di satu tempat, jadi kadang sudah pindah sebelum hasilnya kelihatan.',
      tip: 'Sebelum mulai hal baru, tanyakan dulu: "Apa yang belum selesai di sini?"',
      shine: 'menjelajah, bergerak, dan bertemu banyak orang', tool: 'rasa ingin tahu dan keluwesanmu' },
    6: { name: 'Sang Pengasuh',
      about: 'Kamu penyayang dan bertanggung jawab. Keluarga dan teman dekat sering datang padamu saat butuh tempat bersandar.',
      strengths: ['Penuh perhatian', 'Setia', 'Pandai merawat'],
      watch: 'Kamu sering mengurus semua orang sampai lupa mengurus diri sendiri, lalu diam-diam merasa kurang dihargai.',
      tip: 'Luangkan 30 menit untuk dirimu sendiri, tanpa rasa bersalah.',
      shine: 'merawat, mengajar, dan membuat orang merasa di rumah', tool: 'kasih sayang dan rasa tanggung jawabmu' },
    7: { name: 'Sang Pencari',
      about: 'Kamu pemikir yang dalam. Kamu tidak puas dengan jawaban yang dangkal dan selalu ingin tahu "kenapa".',
      strengths: ['Analitis', 'Intuitif', 'Tenang dan teliti'],
      watch: 'Kamu cenderung memendam perasaan dan sulit percaya orang, jadi kadang merasa kesepian.',
      tip: 'Ceritakan satu hal yang sedang kamu pikirkan ke orang yang kamu percaya.',
      shine: 'belajar, meneliti, dan menemukan jawaban', tool: 'pikiran tajam dan intuisimu' },
    8: { name: 'Sang Penguasa',
      about: 'Kamu punya mental pengusaha. Kamu fokus pada hasil, kuat menghadapi tekanan, dan berbakat mengatur uang serta orang.',
      strengths: ['Ambisius', 'Tegas', 'Pandai mengatur'],
      watch: 'Kamu bisa terlalu fokus pada kerja dan uang sampai lupa istirahat dan orang-orang terdekat.',
      tip: 'Jadwalkan waktu santai, seperti kamu menjadwalkan rapat penting.',
      shine: 'membangun usaha dan memimpin tim', tool: 'ketegasan dan kemampuan mengaturmu' },
    9: { name: 'Sang Humanis',
      about: 'Kamu berhati besar. Kamu mudah iba, senang menolong, dan ingin hidupmu berguna bagi banyak orang.',
      strengths: ['Murah hati', 'Bijak', 'Berwawasan luas'],
      watch: 'Kamu sulit melepaskan masa lalu, dan sering kecewa karena orang lain tidak sebaik harapanmu.',
      tip: 'Tulis satu hal yang ingin kamu lepaskan, lalu robek kertasnya.',
      shine: 'menolong dan memberi dampak bagi banyak orang', tool: 'empati dan kebijaksanaanmu' },
    11: { name: 'Sang Pemberi Cahaya',
      about: 'Kamu sangat intuitif. Kamu sering sudah "merasa" sesuatu sebelum terjadi, dan kata-katamu bisa menyemangati banyak orang.',
      strengths: ['Intuisi kuat', 'Menginspirasi', 'Sangat peka'],
      watch: 'Karena sangat peka, kamu gampang cemas dan kewalahan di tempat ramai atau suasana tegang.',
      tip: 'Ambil 10 menit hening setiap hari: tanpa HP, cukup bernapas.',
      shine: 'menginspirasi dan membimbing orang lain', tool: 'intuisi dan kepekaanmu' },
    22: { name: 'Sang Arsitek Agung',
      about: 'Kamu punya mimpi besar sekaligus kemampuan untuk mewujudkannya. Kamu bisa melihat gambaran besar dan menyusun langkah-langkahnya.',
      strengths: ['Visioner', 'Praktis', 'Pekerja keras'],
      watch: 'Standarmu untuk diri sendiri sangat tinggi, jadi kamu mudah merasa "belum cukup".',
      tip: 'Pecah mimpi besarmu jadi satu langkah kecil yang bisa dikerjakan hari ini.',
      shine: 'mewujudkan proyek besar yang berguna bagi banyak orang', tool: 'visi besar dan ketekunanmu' },
    33: { name: 'Sang Guru Kasih',
      about: 'Kamu terlahir sebagai penyembuh dan pengajar. Kehadiranmu menenangkan, dan orang merasa diterima saat di dekatmu.',
      strengths: ['Welas asih', 'Mengayomi', 'Bijak'],
      watch: 'Kamu cenderung memikul beban orang lain sampai tenagamu sendiri habis.',
      tip: 'Ingat: kamu boleh menolong tanpa harus menyelamatkan semua orang.',
      shine: 'mengajar, menyembuhkan, dan mengangkat orang lain', tool: 'kasih dan kesabaranmu' }
  };
  const MASTER = { 11: 2, 22: 4, 33: 6 };

  const isMaster = (n) => n === 11 || n === 22 || n === 33;
  const sumDigits = (n) => String(n).split('').reduce((a, d) => a + Number(d), 0);
  /** Reduksi angka sambil mencatat langkahnya, mis. [1992, 21, 3]. */
  const chain = (n) => {
    const out = [n];
    while (n > 9 && !isMaster(n)) { n = sumDigits(n); out.push(n); }
    return out;
  };
  const reduce = (n) => { const c = chain(n); return c[c.length - 1]; };
  const digitSum = (s) => sumDigits(String(s).replace(/\D/g, '') || '0');
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function parseDate(iso) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
    return m ? { y: Number(m[1]), mo: Number(m[2]), d: Number(m[3]) } : null;
  }

  /** Life Path: tanggal, bulan, tahun dijumlah terpisah lalu direduksi. */
  function lifePath(iso) {
    const t = parseDate(iso);
    if (!t) return null;
    return reduce(reduce(digitSum(t.d)) + reduce(digitSum(t.mo)) + reduce(digitSum(t.y)));
  }

  function nameLetters(name) {
    return (name || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
  }

  /** Destiny (Expression): nilai huruf nama lengkap, sistem Pythagoras (A=1 … I=9, J=1 …). */
  function destiny(name) {
    const letters = nameLetters(name);
    if (letters.length < 2) return null;
    const total = letters.split('').reduce((a, ch) => a + ((ch.charCodeAt(0) - 65) % 9) + 1, 0);
    return reduce(total);
  }

  /* ---------- penjelasan cara hitung, dalam bahasa sederhana ---------- */
  const arrow = (c) => c.join(' → ');
  function lifePathSteps(iso) {
    const t = parseDate(iso);
    const parts = [['Tanggal', t.d], ['Bulan', t.mo], ['Tahun', t.y]].map(([l, v]) => {
      const c = chain(digitSum(v));
      const first = String(v).length > 1 ? String(v).split('').join(' + ') + ' = ' : '';
      return { label: l, raw: v, text: first + arrow(c), val: c[c.length - 1] };
    });
    const total = parts.reduce((a, p) => a + p.val, 0);
    return '<ul class="nr-calc">' +
      parts.map((p) => '<li><span>' + p.label + ' ' + (p.label === 'Tahun' ? p.raw : String(p.raw).padStart(2, '0')) + '</span><b>' + p.text + '</b></li>').join('') +
      '<li class="nr-calc-sum"><span>Dijumlah</span><b>' + parts.map((p) => p.val).join(' + ') + ' = ' + arrow(chain(total)) + '</b></li>' +
      '</ul>';
  }
  function destinySteps(name) {
    const letters = nameLetters(name);
    const total = letters.split('').reduce((a, ch) => a + ((ch.charCodeAt(0) - 65) % 9) + 1, 0);
    return '<p class="nr-calc-note">Setiap huruf namamu diubah jadi angka (A=1, B=2, … I=9, lalu J=1 lagi). ' +
      'Semua angka dari <b>' + letters.length + ' huruf</b> dijumlah: <b>' + arrow(chain(total)) + '</b>.</p>';
  }

  function medal(n, label) {
    return '<div class="nr-medal" aria-hidden="true"><svg viewBox="0 0 120 120">' +
      '<circle cx="60" cy="60" r="56" class="nr-ring-a"/><circle cx="60" cy="60" r="47" class="nr-ring-b"/>' +
      [0, 45, 90, 135, 180, 225, 270, 315].map((a) => '<circle class="nr-dot" r="2.2" cx="' + (60 + 56 * Math.cos(a * Math.PI / 180)).toFixed(1) + '" cy="' + (60 + 56 * Math.sin(a * Math.PI / 180)).toFixed(1) + '"/>').join('') +
      '</svg><span>' + n + '</span></div>' +
      '<span class="sr-only">' + label + ': ' + n + '</span>';
  }

  function readingCard(n, kind, how) {
    const m = MEANING[n];
    const isLp = kind === 'lp';
    const title = isLp ? 'Angka Jalan Hidup' : 'Angka Bakat';
    const from = isLp ? 'dari tanggal lahirmu' : 'dari nama lengkapmu';
    const means = isLp ? 'Menunjukkan arah dan pelajaran utama dalam hidupmu.' : 'Menunjukkan kelebihan alami yang kamu bawa sejak lahir.';
    return '<article class="nr-card">' +
      '<header class="nr-head">' + medal(n, title) +
      '<div><p class="nr-kind">' + title + ' <small>' + from + '</small></p>' +
      '<h4>' + m.name + '</h4>' +
      (isMaster(n) ? '<p class="nr-master">✦ Angka Master: angka istimewa yang jarang muncul. Energinya seperti angka ' + MASTER[n] + ', tapi lebih kuat.</p>' : '') +
      '<p class="nr-means">' + means + '</p></div></header>' +
      '<p class="nr-about">' + m.about + '</p>' +
      '<p class="nr-sub">Kelebihanmu</p>' +
      '<ul class="nr-chips">' + m.strengths.map((s) => '<li>' + s + '</li>').join('') + '</ul>' +
      '<div class="nr-two">' +
      '<div class="nr-box nr-watch"><p class="nr-sub">Yang perlu kamu jaga</p><p>' + m.watch + '</p></div>' +
      '<div class="nr-box nr-tip"><p class="nr-sub">Coba minggu ini</p><p>' + m.tip + '</p></div>' +
      '</div>' +
      '<details class="nr-how"><summary>Dari mana angka ' + n + ' ini?</summary>' + how + '</details>' +
      '</article>';
  }

  function comboText(lp, ds) {
    const a = MEANING[lp], b = MEANING[ds];
    if (lp === ds) {
      return 'Kedua angkamu sama, yaitu <b>' + lp + '</b>. Ini cukup jarang. Artinya, tujuan hidupmu dan bakat alamimu searah. ' +
        'Kamu akan cepat berkembang kalau berani jadi dirimu sendiri dan fokus pada ' + a.shine + '.';
    }
    return 'Hidupmu mengarah untuk <b>' + a.shine + '</b> (angka ' + lp + '). ' +
      'Bekal terbesarmu untuk sampai ke sana adalah <b>' + b.tool + '</b> (angka ' + ds + '). ' +
      'Jadi, kamu paling bersinar saat memakai ' + b.tool + ' untuk ' + a.shine + '.';
  }

  function resultHTML(d) {
    const first = esc(d.name.split(/\s+/)[0] || '');
    return '<div class="nr">' +
      '<p class="nr-hello">Peta angka pribadi' + (first ? ' untuk <b>' + first + '</b>' : '') + '</p>' +
      readingCard(d.lp, 'lp', lifePathSteps(d.date)) +
      readingCard(d.ds, 'ds', destinySteps(d.name)) +
      '<div class="nr-combo"><p class="nr-sub">Kalau digabung, artinya…</p><p>' + comboText(d.lp, d.ds) + '</p></div>' +
      '<p class="promo-tease">Ini baru gambaran singkatnya. Di laporan Paket Lengkap-mu, kombinasi <b>' + d.lp + '</b> dan <b>' + d.ds + '</b> dibahas khusus untuk pekerjaan, cinta, dan keuangan kamu.</p>' +
      '</div>';
  }

  function html() {
    return '' +
      '<section class="promo" id="numerologi" aria-labelledby="promoTitle">' +
      '<div class="promo-glow" aria-hidden="true"></div>' +
      '<p class="promo-eyebrow">Bonus gratis · Numerologi</p>' +
      '<h3 id="promoTitle">Kartu menjawab pertanyaanmu hari ini.<br><span>Angka kelahiranmu bercerita tentang siapa dirimu.</span></h3>' +
      '<p>Cukup dengan nama lengkap dan tanggal lahir, kamu bisa tahu dua angka pribadimu:</p>' +
      '<div class="promo-paths">' +
      '<div><span class="pp-ico" aria-hidden="true">☉</span><b>Angka Jalan Hidup</b><p>Dihitung dari <u>tanggal lahir</u>. Menunjukkan arah dan tujuan hidupmu.</p></div>' +
      '<div><span class="pp-ico" aria-hidden="true">✧</span><b>Angka Bakat</b><p>Dihitung dari <u>nama lengkap</u>. Menunjukkan kelebihan alami yang kamu bawa.</p></div>' +
      '</div>' +

      '<div class="promo-try">' +
      '<p class="promo-try-title">Hitung angkamu sekarang, gratis</p>' +
      '<div class="promo-fields">' +
      '<label for="numName">Nama lengkap (sesuai akta lahir)<input id="numName" type="text" autocomplete="name" placeholder="Contoh: Ayu Kartika Sari"></label>' +
      '<label for="numDate">Tanggal lahir<input id="numDate" type="date" min="1900-01-01" max="2030-12-31"></label>' +
      '</div>' +
      '<button class="btn btn-primary promo-calc" type="button" id="numCalc">✦ Lihat angkaku</button>' +
      '</div>' +
      '<div class="promo-result" id="numResult" hidden aria-live="polite"></div>' +

      '</section>' +
      (window.Shop ? window.Shop.html() : '');
  }

  function bind(root, toast) {
    const nameEl = root.querySelector('#numName');
    const dateEl = root.querySelector('#numDate');
    const out = root.querySelector('#numResult');
    let last = null;

    function calc(show, scroll) {
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
        out.hidden = false;
        out.innerHTML = resultHTML(last);
        if (scroll) out.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return last;
    }

    root.querySelector('#numCalc').addEventListener('click', () => calc(true, true));

    if (window.Shop) window.Shop.bind(root);
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
