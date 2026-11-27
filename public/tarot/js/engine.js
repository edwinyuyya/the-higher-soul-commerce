/* =========================================================
   OTAK INTI — mesin penyambung topik pertanyaan & kartu
   ========================================================= */
(function () {
  'use strict';

  const { SUITS, RANKS } = window.TAROT;

  /* ---------------- TOPIK ---------------- */
  const TOPICS = {
    cinta: {
      label: 'Cinta & Hubungan', icon: '♡', noun: 'kisah cintamu', primarySuit: 'cups',
      words: ['cinta', 'pacar', 'pacaran', 'gebetan', 'pasangan', 'jodoh', 'nikah', 'menikah', 'pernikahan', 'suami', 'istri', 'mantan', 'crush', 'hubungan', 'perasaan', 'kekasih', 'ldr', 'tunangan', 'lamaran nikah', 'selingkuh', 'putus', 'balikan', 'naksir', 'sayang', 'romantis', 'kencan', 'pdkt', 'lajang', 'jomblo', 'single', 'suka sama', 'dia suka', 'cowok', 'cewek', 'move on', 'patah hati'],
      frames: {
        lalu: 'Apa yang membentuk kisah cintamu hingga sekarang — pengalaman, luka, atau pola lama yang masih terbawa.',
        kini: 'Inti dari situasi hatimu saat ini.',
        depan: 'Ke mana hubungan atau perasaan ini bergerak bila energinya terus berjalan.',
        kunci: 'Pesan kunci yang membuka jalan cintamu.'
      },
      revHint: 'Dalam urusan hati, ini sering menandakan perasaan atau hambatan yang belum diakui dengan jujur.',
      actions: {
        open: ['Ungkapkan perasaanmu dengan jujur dan hangat — jangan menunggu dia menebak.', 'Ciptakan momen berkualitas: waktu berdua tanpa gawai, obrolan dari hati ke hati.', 'Tetap jadi dirimu sendiri; daya tarik terbesarmu adalah ketulusan.'],
        hold: ['Beri jeda sebelum mengambil keputusan besar tentang hubungan ini.', 'Perhatikan pola yang berulang — apa yang terus kamu toleransi padahal menyakitkan?', 'Rawat dirimu dulu; cinta yang sehat dimulai dari hati yang tidak kosong.']
      },
      reflections: ['Apa yang sebenarnya paling kamu butuhkan dari sebuah hubungan?', 'Bagian mana dari dirimu yang masih takut untuk sepenuhnya dicintai?', 'Jika kamu tidak takut kehilangan, apa yang akan kamu katakan atau lakukan?']
    },
    karir: {
      label: 'Karier & Pekerjaan', icon: '✦', noun: 'perjalanan kariermu', primarySuit: 'wands',
      words: ['kerja', 'kerjaan', 'pekerjaan', 'karir', 'karier', 'kantor', 'bos', 'atasan', 'rekan kerja', 'promosi', 'jabatan', 'lamar kerja', 'melamar', 'interview', 'wawancara', 'resign', 'phk', 'bisnis', 'usaha', 'proyek', 'project', 'klien', 'kuliah', 'sekolah', 'ujian', 'beasiswa', 'skripsi', 'tesis', 'magang', 'cpns', 'kontrak', 'startup', 'freelance', 'pindah kerja', 'naik jabatan', 'lowongan', 'profesi'],
      frames: {
        lalu: 'Fondasi dan pengalaman kerja yang membawamu ke titik ini.',
        kini: 'Kondisi nyata pekerjaan atau kariermu saat ini.',
        depan: 'Arah karier yang sedang terbentuk.',
        kunci: 'Strategi kunci untuk langkah kariermu berikutnya.'
      },
      revHint: 'Dalam dunia kerja, ini sering berarti ada hambatan, penundaan, atau potensi yang belum kamu pakai sepenuhnya.',
      actions: {
        open: ['Ambil inisiatif: ajukan ide, lamar posisi itu, atau mulai proyekmu sekarang.', 'Tunjukkan karyamu — orang yang tepat perlu melihat kemampuanmu.', 'Bangun jejaring dengan orang-orang yang selangkah di depanmu.'],
        hold: ['Evaluasi ulang strategimu sebelum mengambil langkah besar.', 'Perkuat keterampilan inti dan dokumentasikan pencapaianmu.', 'Jaga energi — batasi beban kerja yang tidak sejalan dengan tujuanmu.']
      },
      reflections: ['Pekerjaan seperti apa yang membuatmu merasa hidup, bukan sekadar sibuk?', 'Apa yang akan kamu kejar jika kamu yakin tidak akan gagal?', 'Keterampilan apa yang sedang diminta semesta untuk kamu asah?']
    },
    keuangan: {
      label: 'Keuangan & Rezeki', icon: '◈', noun: 'kondisi keuanganmu', primarySuit: 'pentacles',
      words: ['uang', 'keuangan', 'finansial', 'gaji', 'utang', 'hutang', 'cicilan', 'kredit', 'investasi', 'saham', 'kripto', 'crypto', 'tabungan', 'menabung', 'rezeki', 'rejeki', 'modal', 'pinjaman', 'kaya', 'pemasukan', 'penghasilan', 'pendapatan', 'bayar', 'beli rumah', 'aset', 'omzet', 'profit', 'untung', 'rugi', 'dana', 'warisan', 'bonus', 'jualan', 'dagangan'],
      frames: {
        lalu: 'Kebiasaan dan keputusan finansial yang membentuk kondisimu sekarang.',
        kini: 'Gambaran keuanganmu saat ini.',
        depan: 'Arah aliran rezekimu ke depan.',
        kunci: 'Kunci untuk mengelola dan membuka rezeki.'
      },
      revHint: 'Dalam urusan uang, ini sering menandakan kebocoran, penundaan, atau keputusan yang perlu ditinjau ulang.',
      actions: {
        open: ['Wujudkan peluang pemasukan yang sudah kamu lihat — mulai dari langkah kecil yang terukur.', 'Alokasikan sebagian hasil untuk tabungan dan dana darurat sebelum dibelanjakan.', 'Investasikan pada keterampilan yang meningkatkan nilai dirimu.'],
        hold: ['Catat semua pengeluaran selama 30 hari untuk menemukan kebocoran.', 'Tunda pembelian besar dan hindari utang konsumtif baru.', 'Konsultasikan rencana besar dengan orang yang paham keuangan.']
      },
      reflections: ['Apa arti "cukup" bagimu?', 'Keyakinan apa tentang uang yang kamu warisi dari keluargamu?', 'Pengeluaran mana yang benar-benar membuatmu bahagia, dan mana yang hanya pelarian?'],
      disclaimer: 'Bacaan tarot adalah sarana refleksi, bukan nasihat keuangan profesional. Untuk keputusan investasi atau utang, pertimbangkan saran ahli.'
    },
    kesehatan: {
      label: 'Kesehatan & Vitalitas', icon: '❋', noun: 'kesehatan dan vitalitasmu', primarySuit: 'pentacles',
      words: ['sehat', 'kesehatan', 'sakit', 'penyakit', 'operasi', 'diet', 'berat badan', 'olahraga', 'stres', 'stress', 'cemas', 'kecemasan', 'mental', 'tidur', 'insomnia', 'hamil', 'kehamilan', 'pemulihan', 'sembuh', 'dokter', 'rumah sakit', 'badan', 'tubuh', 'capek', 'lelah', 'burnout', 'depresi', 'energi', 'imun', 'program hamil'],
      frames: {
        lalu: 'Pola dan kebiasaan yang memengaruhi kondisi tubuh dan pikiranmu.',
        kini: 'Keadaan energi dan kesehatanmu saat ini.',
        depan: 'Arah pemulihan dan vitalitasmu.',
        kunci: 'Kunci untuk menjaga keseimbangan tubuh dan pikiran.'
      },
      revHint: 'Untuk kesehatan, ini sering berarti tubuh atau pikiran sedang meminta perhatian lebih — jangan diabaikan.',
      actions: {
        open: ['Pertahankan rutinitas yang sudah berjalan baik dan tambahkan satu kebiasaan sehat baru.', 'Bergeraklah setiap hari — jalan pagi di bawah sinar matahari sangat dianjurkan.', 'Rayakan kemajuan kecilmu; tubuh merespons rasa syukur.'],
        hold: ['Prioritaskan tidur dan istirahat; kurangi begadang dan layar di malam hari.', 'Periksakan keluhan yang mengganggu ke tenaga medis — jangan ditunda.', 'Kelola stres: bernapas dalam, menulis jurnal, atau bicara dengan orang tepercaya.']
      },
      reflections: ['Apa yang sedang coba disampaikan tubuhmu akhir-akhir ini?', 'Kebiasaan kecil apa yang paling berdampak pada energimu?', 'Kapan terakhir kali kamu benar-benar beristirahat tanpa rasa bersalah?'],
      disclaimer: 'Bacaan tarot bukan diagnosis atau pengganti saran medis. Jika ada keluhan kesehatan, konsultasikan dengan dokter atau tenaga kesehatan profesional.'
    },
    diri: {
      label: 'Diri & Spiritual', icon: '☾', noun: 'perjalanan batinmu', primarySuit: 'cups',
      words: ['diri', 'diriku', 'jati diri', 'spiritual', 'tujuan hidup', 'makna', 'jiwa', 'batin', 'healing', 'berkembang', 'pengembangan diri', 'percaya diri', 'bahagia', 'kebahagiaan', 'takdir', 'panggilan', 'meditasi', 'ibadah', 'karma', 'arah hidup', 'bingung', 'potensi', 'passion', 'insecure', 'self love', 'mencintai diri', 'masa depanku', 'hidupku'],
      frames: {
        lalu: 'Pelajaran jiwa yang sudah kamu lalui.',
        kini: 'Tahap perjalanan batinmu saat ini.',
        depan: 'Versi dirimu yang sedang tumbuh.',
        kunci: 'Pesan jiwa yang perlu kamu dengar.'
      },
      revHint: 'Dalam perjalanan batin, ini sering menandakan pelajaran yang belum selesai atau bagian diri yang belum diterima.',
      actions: {
        open: ['Luangkan 10 menit setiap hari untuk hening — meditasi, doa, atau sekadar duduk diam.', 'Ikuti rasa ingin tahumu; pelajari hal yang memanggil jiwamu.', 'Ekspresikan dirimu lewat karya — menulis, menggambar, atau bergerak.'],
        hold: ['Tulis jurnal tentang pola yang terus berulang dalam hidupmu.', 'Maafkan dirimu atas versi lama yang belum tahu apa yang kamu tahu sekarang.', 'Kurangi kebisingan luar — media sosial, opini orang — agar suaramu sendiri terdengar.']
      },
      reflections: ['Siapa dirimu ketika tidak sedang berusaha memenuhi ekspektasi siapa pun?', 'Pelajaran apa yang terus kembali sampai kamu benar-benar memahaminya?', 'Apa yang akan kamu lepaskan jika kamu percaya hidup sedang menuntunmu?']
    },
    keluarga: {
      label: 'Keluarga & Pertemanan', icon: '❂', noun: 'hubunganmu dengan keluarga dan sahabat', primarySuit: 'cups',
      words: ['keluarga', 'orang tua', 'orangtua', 'ortu', 'ayah', 'ibu', 'bapak', 'mama', 'papa', 'anak', 'adik', 'kakak', 'saudara', 'mertua', 'teman', 'sahabat', 'pertemanan', 'geng', 'tetangga', 'rumah tangga', 'keponakan', 'sepupu', 'nenek', 'kakek', 'circle', 'bestie', 'rekan'],
      frames: {
        lalu: 'Sejarah dan dinamika yang membentuk hubunganmu dengan mereka.',
        kini: 'Suasana hubungan keluarga atau pertemanan saat ini.',
        depan: 'Arah hubungan ini ke depan.',
        kunci: 'Kunci untuk merawat ikatan ini.'
      },
      revHint: 'Dalam keluarga dan pertemanan, ini sering berarti ada hal yang tidak terucap atau batasan yang belum jelas.',
      actions: {
        open: ['Ambil inisiatif untuk berkumpul atau menghubungi lebih dulu.', 'Ucapkan terima kasih dan apresiasi secara langsung — jangan hanya dipendam.', 'Ciptakan tradisi kecil bersama yang menghangatkan.'],
        hold: ['Dengarkan untuk memahami, bukan untuk membalas.', 'Pasang batasan yang sehat dengan lembut namun tegas.', 'Beri waktu; tidak semua luka keluarga sembuh dalam satu percakapan.']
      },
      reflections: ['Peran apa yang selama ini kamu mainkan dalam keluargamu — dan apakah kamu masih ingin memainkannya?', 'Siapa yang benar-benar ada untukmu, dan sudahkah kamu menunjukkannya kepada mereka?', 'Batasan apa yang perlu kamu buat agar bisa mencintai tanpa kehilangan diri?']
    }
  };

  const POSITIONS = [
    { key: 'lalu', label: 'Masa Lalu', sub: 'Akar situasi', weight: 0.5 },
    { key: 'kini', label: 'Masa Kini', sub: 'Inti persoalan', weight: 1 },
    { key: 'depan', label: 'Masa Depan', sub: 'Arah energi', weight: 1.3 },
    { key: 'kunci', label: 'Kartu Kunci', sub: '+1 Pesan penuntun', weight: 0.8 }
  ];

  /* ---------------- UTIL ---------------- */
  const lowerFirst = (s) => s.charAt(0).toLowerCase() + s.slice(1);
  const upperFirst = (s) => s.charAt(0).toUpperCase() + s.slice(1);
  const stripRevPrefix = (s) => upperFirst(s.replace(/^Terbalik,\s*/i, ''));
  const kw = (d, n = 2) => (d.reversed ? d.card.kwRev : d.card.kwUp).slice(0, n);
  const kwText = (d, n = 2) => {
    const k = kw(d, n);
    return k.length > 1 ? k.slice(0, -1).join(', ') + ' dan ' + k[k.length - 1] : k[0];
  };
  const pol = (d) => (d.reversed ? d.card.revPol : d.card.pol);
  const fullName = (d) => d.card.name + ' (' + d.card.nameId + ')' + (d.reversed ? ' terbalik' : '');
  const shortName = (d) => d.card.nameId + (d.reversed ? ' (terbalik)' : '');

  /* ---------------- DETEKSI TOPIK & JENIS PERTANYAAN ---------------- */
  function detectTopic(text) {
    const t = ' ' + (text || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ') + ' ';
    const scores = {};
    let best = null;
    let bestScore = 0;
    Object.keys(TOPICS).forEach((k) => {
      let s = 0;
      TOPICS[k].words.forEach((w) => {
        if (t.indexOf(' ' + w + ' ') !== -1 || (w.length > 4 && t.indexOf(' ' + w) !== -1)) {
          s += w.indexOf(' ') !== -1 ? 2 : 1;
        }
      });
      // "rumah sakit" jangan dihitung sebagai "rumah tangga" dsb.
      scores[k] = s;
      if (s > bestScore) { bestScore = s; best = k; }
    });
    return { topic: best, scores: scores };
  }

  function detectQuestionType(text) {
    const t = ' ' + (text || '').toLowerCase() + ' ';
    if (/\bkapan\b/.test(t)) return 'kapan';
    if (/\bsiapa\b/.test(t)) return 'siapa';
    if (/\b(kenapa|mengapa)\b/.test(t)) return 'kenapa';
    if (/\b(bagaimana|gimana|harus apa|apa yang (harus|perlu|sebaiknya)|sebaiknya apa)\b/.test(t)) return 'bagaimana';
    if (/\b(apakah|akankah|bisakah|haruskah|mungkinkah|apa (aku|saya|dia|kami|kita|hubungan|usaha|bisnis)|jadi (gak|nggak|tidak)|bakal)\b/.test(t)) return 'yesno';
    if (/\?\s*$/.test(t.trim())) return 'yesno';
    return 'umum';
  }

  /* ---------------- TEKS KARTU × TOPIK ---------------- */
  function cardTopicText(d, topic) {
    const c = d.card;
    const T = TOPICS[topic];
    if (c.arcana === 'major') {
      const base = c.topics[topic];
      if (!d.reversed) return base;
      return 'Dalam posisi tegak, kartu ini berarti: “' + base + '” Namun karena muncul terbalik, energinya berbalik arah — ' +
        lowerFirst(stripRevPrefix(c.rev)) + ' ' + T.revHint;
    }
    const suit = SUITS[c.suit];
    const rank = RANKS[c.rank];
    const lens = suit.lens[topic];
    const rt = rank.topics[topic];
    if (!d.reversed) {
      return lens + ' ' + rt + ' Inti energinya: ' + c.kwUp.join(', ') + '.';
    }
    return lens + ' Tema dasarnya adalah ' + rank.theme + ' — ' + lowerFirst(rt) + ' Namun karena muncul terbalik, ' + rank.rev + ' ' + c.rev + ' ' + T.revHint;
  }

  function relevance(d, topic) {
    const c = d.card;
    if (c.arcana === 'major') {
      return { score: topic === 'diri' ? 1 : 0.85, label: 'Arcana Mayor — pesan takdir', level: 'high' };
    }
    const a = SUITS[c.suit].affinity[topic];
    if (a >= 0.85) return { score: a, label: 'Sangat terhubung dengan topikmu', level: 'high' };
    if (a >= 0.6) return { score: a, label: 'Terhubung dengan topikmu', level: 'mid' };
    return { score: a, label: 'Pesan dari sudut lain', level: 'low' };
  }

  function positionOpening(d, posKey, T) {
    const name = '<b>' + shortName(d) + '</b>';
    switch (posKey) {
      case 'lalu': return 'Di posisi Masa Lalu, ' + name + ' menunjukkan bahwa ' + T.noun + ' berakar pada ' + kwText(d) + '.';
      case 'kini': return 'Saat ini, ' + name + ' menempatkan ' + kwText(d) + ' sebagai inti ' + T.noun + '.';
      case 'depan': return 'Ke depan, ' + name + ' memperlihatkan energi yang bergerak menuju ' + kwText(d) + '.';
      default: return 'Sebagai Kartu Kunci, ' + name + ' berbisik: “' + keyAdvice(d) + '”';
    }
  }

  function keyAdvice(d) {
    if (!d.reversed) return d.card.advice;
    return d.card.advice + ' Namun, bereskan dulu ' + d.card.kwRev[0] + ' yang mungkin menghalangi.';
  }

  function lowRelevanceNote(d, topic) {
    const c = d.card;
    if (c.arcana === 'major') return '';
    const suit = SUITS[c.suit];
    if (suit.affinity[topic] >= 0.6) return '';
    return 'Menariknya, kartu ini datang dari wilayah ' + suit.domain + ' — bukan wilayah utama ' + TOPICS[topic].label.toLowerCase() +
      '. Ini isyarat bahwa ' + T_noun(topic) + ' sedang dipengaruhi oleh hal-hal ' + suit.hidden + '.';
  }
  const T_noun = (topic) => TOPICS[topic].noun;

  /* ---------------- KOMBINASI KHUSUS ---------------- */
  const has = (ids, id) => ids.indexOf(id) !== -1;
  const COMBOS = [
    { test: (ids) => has(ids, 'M6') && has(ids, 'cups-2'), text: 'The Lovers bersama Dua Piala adalah salah satu kombinasi cinta terkuat dalam tarot: ikatan jiwa yang timbal balik dan tulus.' },
    { test: (ids) => has(ids, 'M16') && has(ids, 'M17'), text: 'Menara dan Bintang muncul bersama: setelah keruntuhan datang penyembuhan. Apa yang runtuh sedang memberi ruang bagi harapan baru.' },
    { test: (ids) => has(ids, 'M13') && ids.some((i) => /-1$/.test(i)), text: 'Kematian (Transformasi) bertemu kartu As: satu pintu tertutup, pintu baru langsung terbuka. Akhir dan awal terjadi hampir bersamaan.' },
    { test: (ids) => has(ids, 'M15') && has(ids, 'M6'), text: 'The Devil dan The Lovers bersama: tanyakan pada dirimu, apakah ini cinta yang membebaskan atau keterikatan yang memenjarakan?' },
    { test: (ids) => has(ids, 'M19') && has(ids, 'M21'), text: 'Matahari dan Dunia: kombinasi keberhasilan yang gemilang dan tuntas — salah satu pertanda paling cerah dalam tarot.' },
    { test: (ids) => has(ids, 'M3') && (has(ids, 'pentacles-10') || has(ids, 'cups-10')), text: 'Sang Permaisuri bersama kartu Sepuluh: kelimpahan yang mengalir ke rumah dan keluarga — kesuburan dalam arti luas.' },
    { test: (ids) => has(ids, 'swords-3') && (has(ids, 'M6') || has(ids, 'cups-2')), text: 'Tiga Pedang di dekat kartu cinta: ada luka hati yang perlu diakui sebelum ikatan bisa benar-benar utuh.' },
    { test: (ids) => has(ids, 'M10') && has(ids, 'M21'), text: 'Roda Keberuntungan dan Dunia: sebuah siklus besar selesai dan roda berputar membawamu ke babak berikutnya.' },
    { test: (ids) => has(ids, 'M18') && has(ids, 'M2'), text: 'Bulan dan Pendeta Wanita: intuisimu sangat tajam saat ini — perhatikan mimpi, firasat, dan kebetulan yang bermakna.' },
    { test: (ids) => has(ids, 'M1') && has(ids, 'pentacles-1'), text: 'Penyihir dan As Pentakel: kemampuan mewujudkan ide menjadi hasil nyata dan uang. Saatnya eksekusi.' },
    { test: (ids) => has(ids, 'M0') && has(ids, 'M21'), text: 'Sang Pengelana dan Dunia — awal dan akhir perjalanan jiwa: satu siklus besar selesai, petualangan baru menanti.' },
    { test: (ids) => has(ids, 'M9') && has(ids, 'M2'), text: 'Pertapa dan Pendeta Wanita: masa sunyi yang penuh kebijaksanaan. Jawaban datang lewat keheningan, bukan keramaian.' },
    { test: (ids) => has(ids, 'swords-10') && (has(ids, 'M17') || has(ids, 'M19')), text: 'Sepuluh Pedang bertemu cahaya (Bintang/Matahari): titik terendah sudah lewat — fajar sedang datang.' },
    { test: (ids) => has(ids, 'cups-9') && has(ids, 'M17'), text: 'Sembilan Piala dan Bintang: "kartu permohonan" bertemu harapan — doa dan keinginanmu sedang didengar.' },
    { test: (ids) => has(ids, 'M5') && (has(ids, 'M6') || has(ids, 'cups-10')), text: 'Sang Guru Agung dengan kartu cinta/keluarga: hubungan yang mengarah pada komitmen resmi dan restu.' },
    { test: (ids) => has(ids, 'M4') && has(ids, 'M3'), text: 'Sang Kaisar dan Sang Permaisuri: keseimbangan sempurna antara struktur dan kasih — fondasi yang kuat untuk membangun sesuatu bersama.' }
  ];

  /* ---------------- VERDICT ---------------- */
  function verdictFor(score, T) {
    const N = upperFirst(T.noun);
    if (score >= 1.1) return { tone: 'sangat-positif', label: 'Energi sangat mendukung', yes: 'Ya — energinya sangat mendukung.',
      text: 'Kartu-kartu yang keluar memancarkan energi yang kuat dan terang untuk ' + T.noun + '. Peluangnya terbuka lebar — selama kamu tetap terlibat aktif dan tidak menunggu saja.' };
    if (score >= 0.4) return { tone: 'positif', label: 'Cenderung positif', yes: 'Cenderung ya, dengan usaha dan kesabaran.',
      text: 'Secara keseluruhan, arah ' + T.noun + ' positif. Ada hal yang perlu dirawat, tetapi angin sedang berembus ke arahmu.' };
    if (score >= -0.3) return { tone: 'netral', label: 'Seimbang — bergantung pada pilihanmu', yes: 'Belum pasti — jawabannya masih dibentuk oleh pilihan dan sikapmu.',
      text: N + ' sedang berada di persimpangan. Kartu tidak menunjukkan hasil yang sudah pasti — pilihan dan sikapmu sekarang yang akan menjadi penentu.' };
    if (score >= -1) return { tone: 'tantangan', label: 'Ada tantangan yang perlu dilalui', yes: 'Cenderung belum untuk saat ini — ada yang perlu dibenahi lebih dulu.',
      text: 'Ada hambatan nyata dalam ' + T.noun + '. Ini bukan berarti gagal, melainkan ada pelajaran yang perlu diselesaikan sebelum jalan terbuka.' };
    return { tone: 'berat', label: 'Masa ujian & pemulihan', yes: 'Untuk saat ini belum — energinya meminta kamu memulihkan diri atau mengubah arah dulu.',
      text: 'Kartu menunjukkan masa yang berat untuk ' + T.noun + '. Fokuslah pada pemulihan, kejujuran, dan langkah-langkah kecil — fase ini sedang membentukmu menjadi lebih kuat.' };
  }

  function timingFor(d) {
    const c = d.card;
    let t;
    if (c.arcana === 'major') t = 'terkait momen penting yang tidak bisa dipaksa — terjadi ketika takdir dan kesiapanmu bertemu. Perhatikan pertanda dan titik balik dalam hidupmu.';
    else if (c.suit === 'wands') t = 'relatif cepat — dalam hitungan hari hingga beberapa minggu (energi api bergerak cepat).';
    else if (c.suit === 'swords') t = 'cepat, namun bergantung pada keputusan yang kamu ambil — dalam hitungan hari hingga minggu setelah kamu memutuskan.';
    else if (c.suit === 'cups') t = 'mengikuti kesiapan hati — dalam beberapa minggu hingga beberapa bulan.';
    else t = 'bertahap — dalam hitungan bulan, bahkan lebih, karena energi tanah tumbuh perlahan namun pasti.';
    if (d.reversed) t += ' Karena kartunya terbalik, ada kemungkinan tertunda sampai hambatannya dibereskan.';
    return 'Kartu Masa Depan (' + shortName(d) + ') mengisyaratkan waktunya ' + t;
  }

  const band = (p) => (p >= 1 ? 'pos' : p <= -1 ? 'neg' : 'mid');

  /* ---------------- MESIN UTAMA ---------------- */
  function interpret(opts) {
    const draws = opts.draws; // [{card, reversed}] urut: lalu, kini, depan, kunci
    const topic = opts.topic;
    const question = (opts.question || '').trim();
    const qType = detectQuestionType(question);
    const T = TOPICS[topic];
    const D = {};
    POSITIONS.forEach((p, i) => { D[p.key] = Object.assign({ pos: p }, draws[i]); });
    const all = POSITIONS.map((p) => D[p.key]);
    const ids = all.map((d) => d.card.id);

    /* --- skenario: apa yang sebenarnya ditanyakan --- */
    const SC = window.TarotScenarios;
    const sc = SC ? SC.detectScenario(question, topic) : null;
    const who = sc ? sc.who : 'dia';
    const focus = sc ? sc.focus.replace('{who}', who) : (SC ? SC.DEFAULT_FOCUS[topic] : T.noun);
    const fill = (tpl, d) => tpl.replace(/\{card\}/g, '<b>' + shortName(d) + '</b>').replace(/\{kw\}/g, kwText(d)).replace(/\{who\}/g, who);

    /* --- pembuka --- */
    let intro = '';
    if (question) {
      intro = 'Kamu bertanya: <q>' + escapeHtml(question) + '</q>. Master Tarot menangkap inti pertanyaanmu: <b>' + focus + '</b>' +
        (sc ? '' : ' (dalam ranah ' + T.label + ')') + '. Setiap kartu di bawah dibaca untuk menjawab hal itu.';
    } else {
      intro = 'Pertanyaanmu berada di ranah <b>' + T.label + '</b>. Master Tarot menyambungkan setiap kartu yang kamu pilih dengan ' + T.noun + '. Tulis pertanyaanmu untuk jawaban yang lebih spesifik.';
    }

    /* --- kalimat penghubung kartu ↔ pertanyaan --- */
    function linkFor(d) {
      const b = band(pol(d));
      const k = d.pos.key;
      if (sc && (k === 'kini' || k === 'depan')) return fill(sc[k][b], d);
      if (k === 'lalu') {
        return 'Akar dari ' + focus + ' ada pada <b>' + kwText(d) + '</b> (' + shortName(d) + '). ' +
          (b === 'neg' ? 'Pengalaman ini meninggalkan bekas dan masih memengaruhi caramu melihat situasi sekarang.'
            : b === 'pos' ? 'Ini fondasi yang baik, modal yang bisa kamu andalkan.'
              : 'Pola inilah yang membentuk situasimu sekarang.');
      }
      if (k === 'kunci') {
        return 'Untuk ' + focus + ', kuncinya: “' + keyAdvice(d) + '”' + (sc ? ' ' + sc.tip : '');
      }
      // tanpa skenario: kini/depan
      return (k === 'kini' ? 'Untuk ' + focus + ' saat ini, ' : 'Ke depan, ' + focus + ' ') +
        (k === 'kini' ? 'yang paling menonjol adalah <b>' + kwText(d) + '</b>.' : 'bergerak menuju <b>' + kwText(d) + '</b>.') +
        (b === 'pos' ? ' Ini pertanda yang mendukung.' : b === 'neg' ? ' Ini area yang perlu kamu waspadai dan benahi.' : ' Hasilnya masih bisa kamu bentuk.');
    }

    /* --- per posisi --- */
    const positions = all.map((d) => {
      const rel = relevance(d, topic);
      return {
        key: d.pos.key,
        label: d.pos.label,
        sub: d.pos.sub,
        frame: T.frames[d.pos.key],
        card: d.card,
        reversed: d.reversed,
        relevance: rel,
        opening: positionOpening(d, d.pos.key, T),
        text: cardTopicText(d, topic),
        note: lowRelevanceNote(d, topic),
        link: linkFor(d)
      };
    });

    /* --- skor & verdict --- */
    let sum = 0, wsum = 0;
    all.forEach((d) => { sum += pol(d) * d.pos.weight; wsum += d.pos.weight; });
    const score = sum / wsum;
    const verdict = verdictFor(score, T);
    verdict.score = score;
    // posisi 0..100 untuk meter
    verdict.meter = Math.round(((score + 2) / 4) * 100);

    /* --- lintasan --- */
    const diff = pol(D.depan) - pol(D.lalu);
    let trajectory;
    if (diff >= 1.5) trajectory = 'Lintasan energinya <b>menanjak</b>: dari masa lalu yang lebih berat menuju masa depan yang lebih terang. Kamu sedang keluar dari sebuah fase sulit.';
    else if (diff <= -1.5) trajectory = 'Lintasan energinya <b>menurun</b>: masa depan meminta kewaspadaan lebih dibanding masa lalu. Ingat, kartu masa depan bukan vonis — ia adalah arah bila tidak ada yang diubah. Kartu Kunci menunjukkan apa yang bisa kamu ubah.';
    else trajectory = 'Lintasan energinya relatif <b>stabil</b>: pola yang sama cenderung berlanjut. Perubahan besar baru terjadi bila kamu sengaja mengubah cara bertindak.';

    /* --- pola --- */
    const patterns = [];
    const majors = all.filter((d) => d.card.arcana === 'major');
    if (majors.length === 0) {
      patterns.push({ title: 'Tanpa Arcana Mayor', text: 'Tidak ada satu pun Arcana Mayor yang keluar. Artinya ' + T.noun + ' saat ini lebih banyak ditentukan oleh keputusan dan tindakan sehari-harimu — situasinya ada dalam kendalimu.' });
    } else if (majors.length === 1) {
      patterns.push({ title: 'Satu Arcana Mayor', text: '<b>' + majors[0].card.nameId + '</b> adalah satu-satunya Arcana Mayor, menjadikannya “jangkar” dari bacaan ini. Pelajaran utama ' + T.noun + ' berpusat pada ' + kwText(majors[0]) + '.' });
    } else if (majors.length === 2) {
      patterns.push({ title: 'Dua Arcana Mayor', text: 'Dua Arcana Mayor (' + majors.map((d) => d.card.nameId).join(' & ') + ') menandakan bahwa ' + T.noun + ' sedang melibatkan peristiwa penting — bukan sekadar urusan sehari-hari. Ada pelajaran jiwa di baliknya.' });
    } else {
      patterns.push({ title: majors.length + ' Arcana Mayor — momen takdir', text: 'Sebanyak ' + majors.length + ' Arcana Mayor muncul. Ini sangat kuat: ' + T.noun + ' sedang berada di titik balik besar yang digerakkan oleh kekuatan di luar kendali biasa. Hadapi dengan sadar; ini adalah babak yang akan kamu kenang.' });
    }

    const minors = all.filter((d) => d.card.arcana === 'minor');
    const suitCount = {};
    minors.forEach((d) => { suitCount[d.card.suit] = (suitCount[d.card.suit] || 0) + 1; });
    const dominant = Object.keys(suitCount).sort((a, b) => suitCount[b] - suitCount[a])[0];
    if (dominant && suitCount[dominant] >= 2) {
      const s = SUITS[dominant];
      const aff = s.affinity[topic];
      if (aff >= 0.8) {
        patterns.push({ title: 'Dominasi ' + s.nameId + ' (' + s.element + ') — selaras', text: 'Kartu ' + s.nameId + ' mendominasi, dan ini sangat selaras dengan pertanyaanmu tentang ' + T.label.toLowerCase() + '. Kartu-kartu ini menjawab langsung inti persoalanmu: ' + s.hidden + '.' });
      } else {
        patterns.push({ title: 'Dominasi ' + s.nameId + ' (' + s.element + ') — pesan tersembunyi', text: 'Kamu bertanya tentang ' + T.label.toLowerCase() + ', tetapi yang mendominasi justru kartu ' + s.nameId + ' (' + s.domain + '). Ini isyarat penting: kunci persoalanmu mungkin bukan di permukaan, melainkan ' + s.hidden + '.' });
      }
    } else if (minors.length >= 3) {
      patterns.push({ title: 'Elemen beragam', text: 'Kartu-kartu Arcana Minor datang dari elemen yang berbeda-beda. ' + upperFirst(T.noun) + ' menuntut keseimbangan di banyak sisi sekaligus — pikiran, perasaan, tindakan, dan hal praktis.' });
    }
    if (minors.length >= 2 && !suitCount[T.primarySuit]) {
      const ps = SUITS[T.primarySuit];
      patterns.push({ title: 'Absennya ' + ps.nameId, text: 'Tidak ada kartu ' + ps.nameId + ' (' + ps.domain + ') — padahal itulah elemen utama ' + T.label.toLowerCase() + '. Mungkin saat ini ' + T.noun + ' lebih digerakkan oleh faktor lain daripada ' + ps.domain.split(',')[0] + ' itu sendiri. Perhatikan apakah bagian ini perlu kamu beri ruang lebih.' });
    }

    const revs = all.filter((d) => d.reversed);
    if (revs.length === 0) {
      patterns.push({ title: 'Semua kartu tegak', text: 'Tidak ada kartu terbalik — energinya mengalir lancar dan pesannya jelas. Yang dibutuhkan sekarang adalah tindakan, bukan keraguan.' });
    } else if (revs.length <= 2) {
      patterns.push({ title: revs.length + ' kartu terbalik', text: 'Kartu terbalik di posisi ' + revs.map((d) => d.pos.label).join(' & ') + ' menunjukkan titik di mana energinya tersendat. Di situlah fokus perbaikanmu.' });
    } else {
      patterns.push({ title: 'Banyak kartu terbalik', text: 'Sebagian besar kartu muncul terbalik. Ini masa untuk refleksi ke dalam, bukan aksi besar ke luar. Banyak energi yang tertahan dan perlu dilepaskan dulu.' });
    }

    const courts = all.filter((d) => d.card.court);
    if (courts.length) {
      patterns.push({ title: 'Kehadiran sosok', text: 'Kartu istana ' + courts.map((d) => '<b>' + d.card.nameId + '</b> (' + RANKS[d.card.rank].person + ')').join(', ') +
        ' bisa mewakili orang nyata yang berperan dalam ' + T.noun + ' — atau sisi dirimu sendiri yang perlu tampil.' });
    }

    const rankCount = {};
    minors.forEach((d) => { rankCount[d.card.rank] = (rankCount[d.card.rank] || 0) + 1; });
    Object.keys(rankCount).forEach((r) => {
      if (rankCount[r] >= 2) {
        patterns.push({ title: 'Angka ' + RANKS[r].label + ' berulang', text: 'Kartu ' + RANKS[r].label + ' muncul ' + rankCount[r] + ' kali. Tema ' + RANKS[r].theme + ' sangat kuat dalam ' + T.noun + ' saat ini.' });
      }
    });

    COMBOS.forEach((c) => { if (c.test(ids)) patterns.push({ title: 'Kombinasi khusus', text: c.text }); });

    /* --- benang merah --- */
    const flow = 'Untuk ' + focus + ': dari ' + kwText(D.lalu) + ' di masa lalu, kini kamu berada pada ' + kwText(D.kini) + '. Bila energi ini terus berjalan, semuanya' +
      ' bergerak menuju ' + kwText(D.depan) + '. ' + trajectory + ' Kartu Kunci <b>' + shortName(D.kunci) + '</b> menjadi jembatannya: “' + keyAdvice(D.kunci) + '”';

    /* --- jawaban sesuai jenis pertanyaan --- */
    const answer = { type: qType, text: '' };
    const vBand = score >= 0.4 ? 'pos' : score >= -0.3 ? 'mid' : 'neg';
    const scAnswer = sc ? fill(sc.answer[vBand], D.depan) : '';
    if (qType === 'yesno') {
      answer.title = 'Jawaban untuk pertanyaanmu';
      const isChoice = /\batau\b/i.test(question);
      const lead = isChoice ? '' : !scAnswer ? verdict.yes
        : /^ya\b/i.test(scAnswer) ? '' : ({ pos: score >= 1.1 ? 'Ya.' : 'Cenderung ya.', mid: 'Belum pasti.', neg: 'Untuk saat ini, cenderung belum.' })[vBand];
      answer.text = (lead ? '<b>' + lead + '</b> ' : '') + (scAnswer ? scAnswer + ' ' : '') + (pol(D.depan) >= 1 && score < 0.4 ? 'Meski begitu, kartu Masa Depan menunjukkan arah yang membaik — jangan menyerah terlalu cepat. ' : '') +
        (pol(D.depan) <= -1 && score >= 0.4 ? 'Namun kartu Masa Depan mengingatkan untuk tetap waspada pada ' + kwText(D.depan, 1) + '. ' : '') +
        'Tarot tidak menetapkan nasib; ia menunjukkan arah energi saat ini.';
    } else if (qType === 'kapan') {
      answer.title = 'Soal waktu';
      answer.text = (scAnswer ? scAnswer + ' ' : '') + timingFor(D.depan) + ' Waktu dalam tarot selalu lentur — tindakanmu bisa mempercepat atau memperlambatnya.';
    } else if (qType === 'siapa') {
      answer.title = 'Soal “siapa”';
      answer.text = (scAnswer ? scAnswer + ' ' : '') + (courts.length
        ? 'Sosok yang dimaksud kemungkinan tercermin dalam ' + courts.map((d) => '<b>' + d.card.nameId + '</b>: ' + RANKS[d.card.rank].person).join('; ') + '.'
        : 'Tidak ada kartu istana yang muncul, jadi kartu tidak menunjuk sosok tertentu. Fokus bacaan ini ada pada situasi dan pilihanmu sendiri, bukan pada orang lain.');
    } else if (qType === 'kenapa') {
      answer.title = 'Soal “mengapa”';
      answer.text = (scAnswer ? scAnswer + ' ' : '') + 'Akar persoalannya terlihat pada kartu Masa Lalu (<b>' + shortName(D.lalu) + '</b>: ' + kwText(D.lalu) + ') yang kini terwujud sebagai ' + kwText(D.kini) + ' (<b>' + shortName(D.kini) + '</b>). Dengan kata lain, apa yang kamu alami sekarang adalah kelanjutan dari pola itu — dan bisa diubah mulai dari sekarang.';
    } else if (qType === 'bagaimana') {
      answer.title = 'Soal “bagaimana”';
      answer.text = (scAnswer ? scAnswer + ' ' : '') + 'Jalan yang ditunjukkan kartu: mulai dari menyadari ' + kwText(D.kini, 1) + ' (Masa Kini), lalu jalankan pesan Kartu Kunci — “' + keyAdvice(D.kunci) + '” — sambil menyiapkan diri untuk ' + kwText(D.depan, 1) + '.';
    }

    if (!answer.text && question) {
      answer.title = 'Jawaban untuk pertanyaanmu';
      answer.text = scAnswer || ('Untuk ' + focus + ', kartu menunjukkan: <b>' + verdict.label.toLowerCase() + '</b>. ' + verdict.text);
    }
    if (answer.text && question) answer.quote = question;

    /* --- langkah praktis --- */
    const steps = [];
    const actions = verdict.tone === 'sangat-positif' || verdict.tone === 'positif' ? T.actions.open : T.actions.hold;
    steps.push(D.kini.reversed
      ? 'Akui dan bereskan ' + D.kini.card.kwRev[0] + ' yang sedang menghambat ' + T.noun + '.'
      : 'Manfaatkan energi ' + D.kini.card.kwUp[0] + ' yang sedang hadir dalam ' + T.noun + '.');
    if (sc) steps.push(sc.tip);
    steps.push(actions[0]);
    steps.push(actions[1]);
    if (!sc) steps.push(actions[2]);

    /* --- jawaban singkat --- */
    const essence = 'Untuk ' + focus + ': ' + verdict.label.toLowerCase() + '. Inti pesannya: dari <i>' + kw(D.kini, 1)[0] + '</i> menuju <i>' + kw(D.depan, 1)[0] + '</i>, dengan kunci “' + D.kunci.card.advice + '”';

    return {
      topic: topic,
      topicLabel: T.label,
      topicIcon: T.icon,
      question: question,
      qType: qType,
      focus: focus,
      scenario: sc ? sc.key : null,
      intro: intro,
      essence: essence,
      verdict: verdict,
      answer: answer,
      positions: positions,
      patterns: patterns,
      flow: flow,
      steps: steps,
      reflections: T.reflections,
      disclaimer: T.disclaimer || null
    };
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
  }

  window.TarotEngine = {
    TOPICS: TOPICS,
    POSITIONS: POSITIONS,
    detectTopic: detectTopic,
    detectQuestionType: detectQuestionType,
    interpret: interpret,
    escapeHtml: escapeHtml,
    fullName: fullName
  };
})();
