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
        lalu: 'Yang bikin kisah cintamu jadi kayak sekarang: pengalaman, luka, atau pola lama yang masih kamu bawa-bawa.',
        kini: 'Kondisi hatimu yang sebenarnya, sekarang.',
        depan: 'Ke mana hubungan atau perasaan ini bakal jalan kalau nggak ada yang berubah.',
        kunci: 'Kunci yang ngebuka jalan cintamu.'
      },
      revHint: 'Di urusan hati, ini sering tanda ada perasaan atau hambatan yang belum kamu akui jujur-jujuran.',
      actions: {
        open: ['Bilang perasaanmu, jujur dan hangat. Jangan nunggu dia nebak-nebak.', 'Bikin waktu berdua yang beneran: HP disimpen, ngobrol dari hati ke hati.', 'Tetap jadi dirimu sendiri. Daya tarik terbesarmu itu ketulusan, bukan pencitraan.'],
        hold: ['Kasih jeda dulu sebelum ambil keputusan besar soal hubungan ini.', 'Perhatiin pola yang keulang: apa yang terus kamu maklumin padahal nyakitin?', 'Urus dirimu dulu. Cinta yang sehat mulainya dari hati yang nggak kosong.']
      },
      reflections: ['Jujur deh, sebenarnya kamu butuh apa dari sebuah hubungan?', 'Bagian mana dari dirimu yang masih takut disayang sepenuhnya?', 'Kalau kamu nggak takut kehilangan, apa yang bakal kamu omongin atau lakuin?']
    },
    karir: {
      label: 'Karier & Pekerjaan', icon: '✦', noun: 'perjalanan kariermu', primarySuit: 'wands',
      words: ['kerja', 'kerjaan', 'pekerjaan', 'karir', 'karier', 'kantor', 'bos', 'atasan', 'rekan kerja', 'promosi', 'jabatan', 'lamar kerja', 'melamar', 'interview', 'wawancara', 'resign', 'phk', 'bisnis', 'usaha', 'proyek', 'project', 'klien', 'kuliah', 'sekolah', 'ujian', 'beasiswa', 'skripsi', 'tesis', 'magang', 'cpns', 'kontrak', 'startup', 'freelance', 'pindah kerja', 'naik jabatan', 'lowongan', 'profesi'],
      frames: {
        lalu: 'Pengalaman kerja yang bawa kamu sampai titik ini.',
        kini: 'Kondisi kerjaan atau kariermu yang sebenarnya, sekarang.',
        depan: 'Arah karier yang lagi kebentuk.',
        kunci: 'Jurus buat langkah kariermu berikutnya.'
      },
      revHint: 'Di dunia kerja, ini sering artinya ada hambatan, molor, atau potensi yang belum kamu pakai maksimal.',
      actions: {
        open: ['Gerak duluan: ajuin ide itu, lamar posisi itu, atau mulai proyekmu sekarang.', 'Pamerin karyamu. Orang yang tepat perlu lihat kemampuanmu, mereka nggak bisa nebak.', 'Deketin orang-orang yang selangkah di depanmu.'],
        hold: ['Cek ulang strategimu sebelum ambil langkah besar.', 'Asah skill utamamu dan catat semua pencapaianmu.', 'Jaga tenaga. Kurangi kerjaan yang nggak nyambung sama tujuanmu.']
      },
      reflections: ['Kerjaan kayak apa yang bikin kamu ngerasa hidup, bukan cuma sibuk?', 'Kalau kamu yakin nggak bakal gagal, apa yang bakal kamu kejar?', 'Skill apa yang lagi "diminta" hidup buat kamu asah?']
    },
    keuangan: {
      label: 'Keuangan & Rezeki', icon: '◈', noun: 'kondisi keuanganmu', primarySuit: 'pentacles',
      words: ['uang', 'keuangan', 'finansial', 'gaji', 'utang', 'hutang', 'cicilan', 'kredit', 'investasi', 'saham', 'kripto', 'crypto', 'tabungan', 'menabung', 'rezeki', 'rejeki', 'modal', 'pinjaman', 'kaya', 'pemasukan', 'penghasilan', 'pendapatan', 'bayar', 'beli rumah', 'aset', 'omzet', 'profit', 'untung', 'rugi', 'dana', 'warisan', 'bonus', 'jualan', 'dagangan'],
      frames: {
        lalu: 'Kebiasaan dan keputusan duit yang bikin kondisimu kayak sekarang.',
        kini: 'Kondisi keuanganmu yang sebenarnya, sekarang.',
        depan: 'Ke mana arah rezekimu.',
        kunci: 'Kunci buat ngatur dan ngebuka rezeki.'
      },
      revHint: 'Di urusan duit, ini sering tanda ada yang bocor, molor, atau keputusan yang perlu dicek ulang.',
      actions: {
        open: ['Peluang pemasukan yang udah kamu lihat? Eksekusi, mulai dari langkah kecil yang keukur.', 'Sisihin buat tabungan dan dana darurat duluan, baru belanja.', 'Investasi ke skill yang bikin harga dirimu naik.'],
        hold: ['Catat semua pengeluaran 30 hari. Kamu bakal kaget bocornya di mana.', 'Tahan dulu belanja besar dan jangan nambah utang konsumtif.', 'Rencana besar? Obrolin dulu sama orang yang paham keuangan.']
      },
      reflections: ['"Cukup" buatmu itu sebenarnya berapa?', 'Keyakinan soal duit apa yang kamu warisin dari keluarga?', 'Pengeluaran mana yang beneran bikin bahagia, dan mana yang cuma pelarian?'],
      disclaimer: 'Tarot itu buat ngaca, bukan nasihat keuangan profesional. Buat keputusan investasi atau utang, tanya juga ke ahlinya.'
    },
    kesehatan: {
      label: 'Kesehatan & Vitalitas', icon: '❋', noun: 'kesehatan dan vitalitasmu', primarySuit: 'pentacles',
      words: ['sehat', 'kesehatan', 'sakit', 'penyakit', 'operasi', 'diet', 'berat badan', 'olahraga', 'stres', 'stress', 'cemas', 'kecemasan', 'mental', 'tidur', 'insomnia', 'hamil', 'kehamilan', 'pemulihan', 'sembuh', 'dokter', 'rumah sakit', 'badan', 'tubuh', 'capek', 'lelah', 'burnout', 'depresi', 'energi', 'imun', 'program hamil'],
      frames: {
        lalu: 'Kebiasaan yang ngaruh ke badan dan pikiranmu.',
        kini: 'Kondisi tenaga dan kesehatanmu sekarang.',
        depan: 'Arah pemulihan dan tenagamu.',
        kunci: 'Kunci biar badan dan pikiran tetap seimbang.'
      },
      revHint: 'Soal kesehatan, ini sering artinya badan atau pikiranmu lagi minta diperhatiin. Jangan dicuekin.',
      actions: {
        open: ['Rutinitas yang udah bagus, terusin. Tambah satu kebiasaan sehat baru.', 'Gerak tiap hari. Jalan pagi kena matahari itu murah dan ampuh.', 'Rayain kemajuan kecilmu. Badan ngerespons rasa syukur.'],
        hold: ['Tidur dulu yang bener. Kurangi begadang dan scroll HP malam-malam.', 'Ada keluhan yang ganggu? Periksain ke tenaga medis, jangan ditunda.', 'Kelola stres: tarik napas dalam, nulis jurnal, atau cerita ke orang yang kamu percaya.']
      },
      reflections: ['Badanmu akhir-akhir ini lagi coba ngomong apa?', 'Kebiasaan kecil apa yang paling ngaruh ke tenagamu?', 'Kapan terakhir kamu istirahat beneran tanpa ngerasa bersalah?'],
      disclaimer: 'Tarot bukan diagnosis dan bukan pengganti dokter. Kalau ada keluhan kesehatan, periksain ke dokter atau tenaga kesehatan, ya.'
    },
    diri: {
      label: 'Diri & Spiritual', icon: '☾', noun: 'perjalanan batinmu', primarySuit: 'cups',
      words: ['diri', 'diriku', 'jati diri', 'spiritual', 'tujuan hidup', 'makna', 'jiwa', 'batin', 'healing', 'berkembang', 'pengembangan diri', 'percaya diri', 'bahagia', 'kebahagiaan', 'takdir', 'panggilan', 'meditasi', 'ibadah', 'karma', 'arah hidup', 'bingung', 'potensi', 'passion', 'insecure', 'self love', 'mencintai diri', 'masa depanku', 'hidupku'],
      frames: {
        lalu: 'Pelajaran hidup yang udah kamu lewatin.',
        kini: 'Posisi batinmu sekarang.',
        depan: 'Versi dirimu yang lagi tumbuh.',
        kunci: 'Pesan yang perlu banget kamu denger.'
      },
      revHint: 'Di urusan batin, ini sering tanda ada pelajaran yang belum kelar, atau bagian dirimu yang belum kamu terima.',
      actions: {
        open: ['Sisihin 10 menit sehari buat hening: meditasi, doa, atau duduk diam aja.', 'Ikutin rasa penasaranmu. Pelajarin hal yang bikin kamu "nyala".', 'Keluarin isi kepalamu lewat karya: nulis, gambar, atau gerak.'],
        hold: ['Tulis jurnal soal pola yang terus keulang di hidupmu.', 'Maafin dirimu yang dulu. Dia belum tahu apa yang kamu tahu sekarang.', 'Kurangi berisik dari luar (medsos, omongan orang) biar suaramu sendiri kedengeran.']
      },
      reflections: ['Kamu itu siapa, kalau lagi nggak berusaha nyenengin siapa-siapa?', 'Pelajaran apa yang terus balik lagi sampai kamu beneran ngerti?', 'Kalau kamu percaya hidup lagi nuntun kamu, apa yang bakal kamu lepasin?']
    },
    keluarga: {
      label: 'Keluarga & Pertemanan', icon: '❂', noun: 'hubunganmu dengan keluarga dan sahabat', primarySuit: 'cups',
      words: ['keluarga', 'orang tua', 'orangtua', 'ortu', 'ayah', 'ibu', 'bapak', 'mama', 'papa', 'anak', 'adik', 'kakak', 'saudara', 'mertua', 'teman', 'sahabat', 'pertemanan', 'geng', 'tetangga', 'rumah tangga', 'keponakan', 'sepupu', 'nenek', 'kakek', 'circle', 'bestie', 'rekan'],
      frames: {
        lalu: 'Sejarah dan drama yang ngebentuk hubunganmu sama mereka.',
        kini: 'Suasana hubungan keluarga atau pertemananmu sekarang.',
        depan: 'Arah hubungan ini ke depannya.',
        kunci: 'Kunci buat ngerawat ikatan ini.'
      },
      revHint: 'Di keluarga dan pertemanan, ini sering artinya ada yang nggak keomong, atau batasan yang belum jelas.',
      actions: {
        open: ['Ngajak ketemu atau chat duluan. Nggak usah gengsi.', 'Bilang makasih langsung. Jangan cuma dipendem.', 'Bikin tradisi kecil bareng yang bikin hangat.'],
        hold: ['Dengerin buat ngerti, bukan buat ngebales.', 'Pasang batasan yang sehat: halus, tapi tegas.', 'Kasih waktu. Luka keluarga nggak sembuh dalam satu obrolan.']
      },
      reflections: ['Peran apa yang selama ini kamu mainin di keluarga, dan kamu masih mau mainin itu?', 'Siapa yang beneran ada buat kamu, dan udah kamu tunjukin belum kalau kamu sadar?', 'Batasan apa yang perlu kamu pasang biar bisa sayang tanpa kehilangan diri?']
    }
  };

  const POSITIONS = [
    { key: 'lalu', label: 'Masa Lalu', sub: 'Akar situasi', weight: 0.5 },
    { key: 'kini', label: 'Masa Kini', sub: 'Inti persoalan', weight: 1 },
    { key: 'depan', label: 'Masa Depan', sub: 'Arah energi', weight: 1.3 },
    { key: 'kunci', label: 'Kartu Kunci', sub: '+1 Pesan buat kamu', weight: 0.8 }
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
      return 'Kalau tegak, artinya: “' + base + '” Tapi kartunya keluar terbalik, jadi energinya kebalik: ' +
        lowerFirst(stripRevPrefix(c.rev)) + ' ' + T.revHint;
    }
    const suit = SUITS[c.suit];
    const rank = RANKS[c.rank];
    const lens = suit.lens[topic];
    const rt = rank.topics[topic];
    if (!d.reversed) {
      return lens + ' ' + rt + ' Intinya: ' + c.kwUp.join(', ') + '.';
    }
    return lens + ' Tema dasarnya ' + rank.theme + ': ' + lowerFirst(rt) + ' Tapi karena keluar terbalik, ' + rank.rev + ' ' + c.rev + ' ' + T.revHint;
  }

  function relevance(d, topic) {
    const c = d.card;
    if (c.arcana === 'major') {
      return { score: topic === 'diri' ? 1 : 0.85, label: 'Arcana Mayor: ini pesan besar', level: 'high' };
    }
    const a = SUITS[c.suit].affinity[topic];
    if (a >= 0.85) return { score: a, label: 'Nyambung banget sama pertanyaanmu', level: 'high' };
    if (a >= 0.6) return { score: a, label: 'Nyambung sama pertanyaanmu', level: 'mid' };
    return { score: a, label: 'Pesan dari arah yang nggak kamu duga', level: 'low' };
  }

  function positionOpening(d, posKey, T) {
    const name = '<b>' + shortName(d) + '</b>';
    switch (posKey) {
      case 'lalu': return 'Di Masa Lalu ada ' + name + '. Artinya ' + T.noun + ' berakar dari ' + kwText(d) + '.';
      case 'kini': return 'Sekarang, ' + name + ' bilang intinya ' + T.noun + ' itu ' + kwText(d) + '.';
      case 'depan': return 'Ke depan, ' + name + ' nunjukin energinya lagi jalan ke arah ' + kwText(d) + '.';
      default: return 'Kartu Kuncimu, ' + name + ', bilang: “' + keyAdvice(d) + '”';
    }
  }

  function keyAdvice(d) {
    if (!d.reversed) return d.card.advice;
    return d.card.advice + ' Tapi beresin dulu ' + d.card.kwRev[0] + ' yang mungkin lagi ngeganjel.';
  }

  function lowRelevanceNote(d, topic) {
    const c = d.card;
    if (c.arcana === 'major') return '';
    const suit = SUITS[c.suit];
    if (suit.affinity[topic] >= 0.6) return '';
    return 'Nah, ini menarik. Kartu ini datang dari urusan ' + suit.domain + ', bukan urusan ' + TOPICS[topic].label.toLowerCase() +
      '. Kode keras: ' + T_noun(topic) + ' lagi dipengaruhi hal-hal ' + suit.hidden + '.';
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
    if (score >= 1.1) return { tone: 'sangat-positif', label: 'Lampu hijau terang', yes: 'Ya. Energinya dukung banget.',
      text: 'Kartunya terang benderang buat ' + T.noun + '. Peluangnya kebuka lebar, asal kamu ikut gerak, bukan cuma nunggu.' };
    if (score >= 0.4) return { tone: 'positif', label: 'Cenderung lampu hijau', yes: 'Cenderung ya, asal kamu usaha dan sabar.',
      text: 'Overall, arah ' + T.noun + ' positif. Ada yang perlu dirawat, tapi anginnya lagi ke arahmu.' };
    if (score >= -0.3) return { tone: 'netral', label: 'Lampu kuning: tergantung kamu', yes: 'Belum pasti. Jawabannya masih ditentuin pilihan dan sikapmu.',
      text: N + ' lagi di persimpangan. Kartunya nggak nunjukin hasil yang udah pasti. Yang nentuin justru pilihan dan sikapmu sekarang.' };
    if (score >= -1) return { tone: 'tantangan', label: 'Lampu kuning ke merah: ada PR', yes: 'Cenderung belum, untuk sekarang. Ada yang perlu dibenerin dulu.',
      text: 'Ada hambatan nyata di ' + T.noun + '. Bukan berarti gagal, tapi ada PR yang harus kelar dulu sebelum jalannya kebuka.' };
    return { tone: 'berat', label: 'Lampu merah: waktunya pulih dulu', yes: 'Untuk sekarang belum. Energinya minta kamu pulih atau ganti arah dulu.',
      text: 'Jujur aja, kartunya nunjukin masa yang berat buat ' + T.noun + '. Fokus ke pulih, jujur sama diri sendiri, dan langkah kecil. Fase ini lagi nempa kamu jadi lebih kuat.' };
  }

  function timingFor(d) {
    const c = d.card;
    let t;
    if (c.arcana === 'major') t = 'nyangkut ke momen penting yang nggak bisa dipaksa. Kejadiannya pas takdir dan kesiapanmu ketemu. Perhatiin pertanda dan titik balik di hidupmu.';
    else if (c.suit === 'wands') t = 'lumayan cepet: hitungan hari sampai beberapa minggu (energi api geraknya cepet).';
    else if (c.suit === 'swords') t = 'cepet, tapi tergantung keputusanmu: hitungan hari sampai minggu setelah kamu mutusin.';
    else if (c.suit === 'cups') t = 'ngikutin kesiapan hati: beberapa minggu sampai beberapa bulan.';
    else t = 'bertahap: hitungan bulan, bisa lebih, karena energi tanah tumbuhnya pelan tapi pasti.';
    if (d.reversed) t += ' Kartunya terbalik, jadi bisa molor sampai hambatannya kamu beresin.';
    return 'Kartu Masa Depan (' + shortName(d) + ') ngasih kode waktunya ' + t;
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
      intro = 'Pertanyaanmu: <q>' + escapeHtml(question) + '</q>. Yang sebenarnya kamu pengin tahu: <b>' + focus + '</b>' +
        (sc ? '' : ' (urusan ' + T.label + ')') + '. Semua kartu di bawah dibaca buat jawab itu. Siap?';
    } else {
      intro = 'Pertanyaanmu soal <b>' + T.label + '</b>. Semua kartu pilihanmu disambungin ke ' + T.noun + '. Mau jawaban yang lebih nembak? Tulis pertanyaanmu.';
    }

    /* --- kalimat penghubung kartu ↔ pertanyaan --- */
    function linkFor(d) {
      const b = band(pol(d));
      const k = d.pos.key;
      if (sc && (k === 'kini' || k === 'depan')) return fill(sc[k][b], d);
      if (k === 'lalu') {
        return 'Akar dari ' + focus + ' ada di <b>' + kwText(d) + '</b> (' + shortName(d) + '). ' +
          (b === 'neg' ? 'Pengalaman ini ninggalin bekas, dan masih ngaruh ke caramu ngeliat situasi sekarang.'
            : b === 'pos' ? 'Ini modal bagus yang bisa kamu andelin.'
              : 'Pola inilah yang bikin situasimu kayak sekarang.');
      }
      if (k === 'kunci') {
        return 'Buat ' + focus + ', kuncinya: “' + keyAdvice(d) + '”' + (sc ? ' ' + sc.tip : '');
      }
      // tanpa skenario: kini/depan
      return (k === 'kini' ? 'Buat ' + focus + ' sekarang, ' : 'Ke depan, ' + focus + ' ') +
        (k === 'kini' ? 'yang paling kerasa itu <b>' + kwText(d) + '</b>.' : 'jalan ke arah <b>' + kwText(d) + '</b>.') +
        (b === 'pos' ? ' Ini tanda bagus.' : b === 'neg' ? ' Ini bagian yang perlu kamu waspadai dan benerin.' : ' Hasilnya masih bisa kamu bentuk.');
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
    if (diff >= 1.5) trajectory = 'Arahnya <b>naik</b>: dari masa lalu yang berat ke masa depan yang lebih terang. Kamu lagi keluar dari fase sulit. Tahan sebentar lagi.';
    else if (diff <= -1.5) trajectory = 'Arahnya <b>turun</b>: masa depan minta kamu lebih waspada daripada dulu. Tapi santai, kartu masa depan itu bukan vonis. Itu arah kalau nggak ada yang diubah, dan Kartu Kunci nunjukin apa yang bisa kamu ubah.';
    else trajectory = 'Arahnya <b>datar</b>: pola yang sama cenderung keulang. Mau beda? Caramu bertindak yang harus beda dulu.';

    /* --- pola --- */
    const patterns = [];
    const majors = all.filter((d) => d.card.arcana === 'major');
    if (majors.length === 0) {
      patterns.push({ title: 'Nol Arcana Mayor', text: 'Nggak ada satu pun Arcana Mayor. Artinya ' + T.noun + ' sekarang lebih banyak ditentuin sama keputusan dan tindakanmu sehari-hari. Kabar baiknya: kendalinya ada di tanganmu.' });
    } else if (majors.length === 1) {
      patterns.push({ title: 'Satu Arcana Mayor', text: '<b>' + majors[0].card.nameId + '</b> satu-satunya Arcana Mayor, jadi dia “bos” di bacaan ini. Pelajaran utama ' + T.noun + ' ada di ' + kwText(majors[0]) + '.' });
    } else if (majors.length === 2) {
      patterns.push({ title: 'Dua Arcana Mayor', text: 'Dua Arcana Mayor (' + majors.map((d) => d.card.nameId).join(' & ') + ') tandanya ' + T.noun + ' lagi nyangkut ke kejadian penting, bukan urusan receh. Ada pelajaran besar di baliknya.' });
    } else {
      patterns.push({ title: majors.length + ' Arcana Mayor: ini momen besar', text: majors.length + ' Arcana Mayor sekaligus. Ini jarang dan kuat banget: ' + T.noun + ' lagi di titik balik besar yang digerakin kekuatan di luar kendali biasa. Hadapi dengan sadar. Ini babak yang bakal kamu inget.' });
    }

    const minors = all.filter((d) => d.card.arcana === 'minor');
    const suitCount = {};
    minors.forEach((d) => { suitCount[d.card.suit] = (suitCount[d.card.suit] || 0) + 1; });
    const dominant = Object.keys(suitCount).sort((a, b) => suitCount[b] - suitCount[a])[0];
    if (dominant && suitCount[dominant] >= 2) {
      const s = SUITS[dominant];
      const aff = s.affinity[topic];
      if (aff >= 0.8) {
        patterns.push({ title: 'Didominasi ' + s.nameId + ' (' + s.element + '): nyambung', text: 'Kartu ' + s.nameId + ' paling banyak keluar, dan itu nyambung banget sama pertanyaanmu soal ' + T.label.toLowerCase() + '. Kartunya langsung nembak inti masalahmu: ' + s.hidden + '.' });
      } else {
        patterns.push({ title: 'Didominasi ' + s.nameId + ' (' + s.element + '): plot twist', text: 'Kamu nanya soal ' + T.label.toLowerCase() + ', tapi yang paling banyak keluar malah kartu ' + s.nameId + ' (' + s.domain + '). Kode penting: kunci masalahmu mungkin bukan yang keliatan, tapi ' + s.hidden + '.' });
      }
    } else if (minors.length >= 3) {
      patterns.push({ title: 'Elemen campur aduk', text: 'Kartu Arcana Minor-mu datang dari elemen yang beda-beda. ' + upperFirst(T.noun) + ' minta kamu seimbang di banyak sisi sekaligus: pikiran, perasaan, tindakan, dan hal praktis.' });
    }
    if (minors.length >= 2 && !suitCount[T.primarySuit]) {
      const ps = SUITS[T.primarySuit];
      patterns.push({ title: 'Kartu ' + ps.nameId + ' absen', text: 'Nggak ada kartu ' + ps.nameId + ' (' + ps.domain + '), padahal itu elemen utama ' + T.label.toLowerCase() + '. Bisa jadi ' + T.noun + ' sekarang lebih digerakin faktor lain, bukan ' + ps.domain.split(',')[0] + ' itu sendiri. Coba cek, bagian ini perlu kamu kasih ruang lebih nggak?' });
    }

    const revs = all.filter((d) => d.reversed);
    if (revs.length === 0) {
      patterns.push({ title: 'Semua kartu tegak', text: 'Nggak ada yang terbalik. Energinya lancar, pesannya jelas. Yang kamu butuhin sekarang: gerak, bukan ragu.' });
    } else if (revs.length <= 2) {
      patterns.push({ title: revs.length + ' kartu terbalik', text: 'Kartu terbalik di ' + revs.map((d) => d.pos.label).join(' & ') + ' nunjukin di mana energinya mampet. Di situ PR-mu.' });
    } else {
      patterns.push({ title: 'Banyak kartu terbalik', text: 'Kebanyakan kartunya terbalik. Ini waktunya ngaca ke dalam, bukan aksi besar ke luar. Banyak energi yang ketahan dan perlu dilepas dulu.' });
    }

    const courts = all.filter((d) => d.card.court);
    if (courts.length) {
      patterns.push({ title: 'Ada "orang" di bacaanmu', text: 'Kartu istana ' + courts.map((d) => '<b>' + d.card.nameId + '</b> (' + RANKS[d.card.rank].person + ')').join(', ') +
        ' bisa jadi orang nyata yang punya peran di ' + T.noun + ', atau sisi dirimu sendiri yang perlu keluar.' });
    }

    const rankCount = {};
    minors.forEach((d) => { rankCount[d.card.rank] = (rankCount[d.card.rank] || 0) + 1; });
    Object.keys(rankCount).forEach((r) => {
      if (rankCount[r] >= 2) {
        patterns.push({ title: 'Angka ' + RANKS[r].label + ' keluar berkali-kali', text: 'Kartu ' + RANKS[r].label + ' keluar ' + rankCount[r] + ' kali. Bukan kebetulan: tema ' + RANKS[r].theme + ' lagi kuat banget di ' + T.noun + '.' });
      }
    });

    COMBOS.forEach((c) => { if (c.test(ids)) patterns.push({ title: 'Kombinasi langka', text: c.text }); });

    /* --- benang merah --- */
    const flow = 'Buat ' + focus + ': dulu ' + kwText(D.lalu) + ', sekarang kamu di ' + kwText(D.kini) + '. Kalau dibiarin jalan terus, semuanya' +
      ' bakal ngarah ke ' + kwText(D.depan) + '. ' + trajectory + ' Kartu Kunci <b>' + shortName(D.kunci) + '</b> jadi jembatannya: “' + keyAdvice(D.kunci) + '”';

    /* --- jawaban sesuai jenis pertanyaan --- */
    const answer = { type: qType, text: '' };
    const vBand = score >= 0.4 ? 'pos' : score >= -0.3 ? 'mid' : 'neg';
    const scAnswer = sc ? fill(sc.answer[vBand], D.depan) : '';
    if (qType === 'yesno') {
      answer.title = 'Jawaban buat pertanyaanmu';
      const isChoice = /\batau\b/i.test(question);
      const lead = isChoice ? '' : !scAnswer ? verdict.yes
        : /^ya\b/i.test(scAnswer) ? '' : ({ pos: score >= 1.1 ? 'Ya.' : 'Cenderung ya.', mid: 'Belum pasti.', neg: 'Untuk sekarang, cenderung belum.' })[vBand];
      answer.text = (lead ? '<b>' + lead + '</b> ' : '') + (scAnswer ? scAnswer + ' ' : '') + (pol(D.depan) >= 1 && score < 0.4 ? 'Tapi kartu Masa Depan nunjukin arah yang membaik. Jangan nyerah kecepetan. ' : '') +
        (pol(D.depan) <= -1 && score >= 0.4 ? 'Tapi kartu Masa Depan ngingetin buat tetap waspada sama ' + kwText(D.depan, 1) + '. ' : '') +
        'Tarot nggak nentuin nasib. Dia cuma nunjukin arah energi saat ini. Sisanya, kamu yang pegang setir.';
    } else if (qType === 'kapan') {
      answer.title = 'Kapan?';
      answer.text = (scAnswer ? scAnswer + ' ' : '') + timingFor(D.depan) + ' Waktu di tarot itu lentur. Tindakanmu bisa bikin lebih cepet, atau malah molor.';
    } else if (qType === 'siapa') {
      answer.title = 'Siapa?';
      answer.text = (scAnswer ? scAnswer + ' ' : '') + (courts.length
        ? 'Sosoknya kemungkinan kecermin di ' + courts.map((d) => '<b>' + d.card.nameId + '</b>: ' + RANKS[d.card.rank].person).join('; ') + '.'
        : 'Nggak ada kartu istana yang keluar, jadi kartunya nggak nunjuk orang tertentu. Fokus bacaan ini di situasi dan pilihanmu sendiri, bukan orang lain.');
    } else if (qType === 'kenapa') {
      answer.title = 'Kenapa?';
      answer.text = (scAnswer ? scAnswer + ' ' : '') + 'Akar masalahnya keliatan di kartu Masa Lalu (<b>' + shortName(D.lalu) + '</b>: ' + kwText(D.lalu) + '), yang sekarang muncul jadi ' + kwText(D.kini) + ' (<b>' + shortName(D.kini) + '</b>). Singkatnya, yang kamu alami sekarang itu lanjutan pola lama. Dan pola bisa diputus, mulai hari ini.';
    } else if (qType === 'bagaimana') {
      answer.title = 'Terus gimana?';
      answer.text = (scAnswer ? scAnswer + ' ' : '') + 'Caranya menurut kartu: sadari dulu ' + kwText(D.kini, 1) + ' (Masa Kini), terus jalanin pesan Kartu Kunci, “' + keyAdvice(D.kunci) + '”, sambil siap-siap buat ' + kwText(D.depan, 1) + '.';
    }

    if (!answer.text && question) {
      answer.title = 'Jawaban buat pertanyaanmu';
      answer.text = scAnswer || ('Buat ' + focus + ', kartunya bilang: <b>' + verdict.label.toLowerCase() + '</b>. ' + verdict.text);
    }
    if (answer.text && question) answer.quote = question;

    /* --- langkah praktis --- */
    const steps = [];
    const actions = verdict.tone === 'sangat-positif' || verdict.tone === 'positif' ? T.actions.open : T.actions.hold;
    steps.push(D.kini.reversed
      ? 'Akui dan beresin ' + D.kini.card.kwRev[0] + ' yang lagi ngeganjel ' + T.noun + '.'
      : 'Manfaatin energi ' + D.kini.card.kwUp[0] + ' yang lagi ada di ' + T.noun + '. Jangan disia-siain.');
    if (sc) steps.push(sc.tip);
    steps.push(actions[0]);
    steps.push(actions[1]);
    if (!sc) steps.push(actions[2]);

    /* --- jawaban singkat --- */
    const essence = 'Buat ' + focus + ': ' + verdict.label.toLowerCase() + '. Intinya: dari <i>' + kw(D.kini, 1)[0] + '</i> ke <i>' + kw(D.depan, 1)[0] + '</i>, kuncinya “' + D.kunci.card.advice + '”';

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
