/* =========================================================
   SKENARIO PERTANYAAN — membaca ISI pertanyaan, bukan hanya topiknya.
   Setiap skenario punya fokus dan kalimat jawaban untuk kartu
   yang positif (pos), seimbang (mid), atau menantang (neg).
   {card} = nama kartu, {kw} = kata kunci kartu, {who} = orang yang ditanyakan.
   ========================================================= */
(function () {
  'use strict';

  const SCENARIOS = [
    /* ---------- CINTA ---------- */
    {
      key: 'balikan', topic: 'cinta',
      re: /balikan|mantan|\bex\b|kembali (lagi )?(sama|dengan|bersama|ke)|rujuk|cbkl/,
      focus: 'kemungkinan kembali bersama mantan',
      answer: {
        pos: 'Pintu untuk kembali bersama masih terbuka. Kartunya nunjukin masih ada ikatan dan kesempatan kedua, asalkan masalah lama beneran diomongin, bukan sekadar dilupakan.',
        mid: 'Kembali bersama mungkin terjadi, tapi belum pasti. Hasilnya tergantung apakah kalian berdua udah berubah, bukan cuma rindu.',
        neg: 'Kartunya nggak dukung kembali ke hubungan lama sekarang. Ada luka atau pola yang belum selesai, dan kembali sekarang berisiko ngulang cerita yang sama.'
      },
      kini: {
        pos: 'Sekarang energi di antara kalian masih hangat. {card} ({kw}) nandain perasaan itu belum beneran padam.',
        mid: 'Sekarang situasinya menggantung. {card} ({kw}) nunjukin kamu masih menimbang antara rindu dan logika.',
        neg: 'Sekarang yang paling kerasa justru {kw}. {card} nandain luka perpisahan masih aktif dan belum sembuh.'
      },
      depan: {
        pos: 'Ke depan, {card} membuka kemungkinan rekonsiliasi atau komunikasi yang membaik.',
        mid: 'Ke depan, {card} nunjukin proses yang lambat; kalau ada jalan kembali, itu butuh waktu dan pembuktian.',
        neg: 'Ke depan, {card} mengarah pada {kw}, tanda bahwa jalan terbaik mungkin ngelepasin dan mulai yang baru.'
      },
      tip: 'Sebelum mutusin kembali, tanyain: apa yang berbeda sekarang dibanding saat kalian berpisah?'
    },
    {
      key: 'perasaan', topic: 'cinta',
      re: /(dia|doi|gebetan|crush|cowok|cewek|pacar)[^.?!]{0,25}(suka|sayang|cinta|perasaan|mikirin|naksir|tertarik|kangen)|perasaan(nya| dia)|suka (sama|ke|dengan) (aku|saya|ku)|isi hati/,
      focus: 'perasaan {who} ke kamu',
      answer: {
        pos: 'Ya, kartunya nunjukin ada ketertarikan atau perasaan yang tulus dari {who}. Perasaannya nyata, meski mungkin belum diungkapkan sepenuhnya.',
        mid: 'Perasaan {who} ada, tapi masih bercampur ragu atau belum jelas arahnya. Dia sendiri mungkin belum yakin.',
        neg: 'Kartunya nunjukin perasaan {who} sekarang belum sejalan dengan harapanmu. Ada jarak, keraguan, atau hal lain yang lagi mengisi pikirannya.'
      },
      kini: {
        pos: '{card} ({kw}) ngegambarin isi hati {who} sekarang: ada kehangatan dan ketertarikan ke kamu.',
        mid: '{card} ({kw}) ngegambarin isi hati {who} sekarang: tertarik tapi nahan diri, atau lagi bingung dengan perasaannya.',
        neg: '{card} ({kw}) ngegambarin isi hati {who} sekarang: ada tembok, luka lama, atau fokus yang lagi di tempat lain.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin perasaan ini berpeluang tumbuh dan lebih terbuka.',
        mid: 'Ke depan, {card} nunjukin semuanya tergantung keberanian salah satu dari kalian untuk jujur lebih dulu.',
        neg: 'Ke depan, {card} ngasih kode {kw}; jangan ngegantungin hatimu sepenuhnya pada orang ini.'
      },
      tip: 'Perhatiin tindakannya, bukan cuma kata-katanya, karena di situlah perasaan yang sebenarnya keliatan.'
    },
    {
      key: 'komitmen', topic: 'cinta',
      re: /nikah|menikah|pernikahan|serius|tunangan|lamar(an)? (dia|aku|nikah)|dilamar|jenjang|komitmen|berlanjut|langgeng|bertahan lama|masa depan (hubungan|kami|kita)/,
      focus: 'kelanjutan hubungan ini ke jenjang yang lebih serius',
      answer: {
        pos: 'Kartunya dukung hubungan ini melangkah ke jenjang yang lebih serius. Fondasinya ada, dan arah energinya menuju komitmen.',
        mid: 'Hubungan ini bisa berlanjut ke jenjang serius, tapi masih ada hal penting yang perlu disepakati dulu, kayak nilai, rencana, atau restu.',
        neg: 'Untuk sekarang kartu belum nunjukin kesiapan menuju komitmen serius. Ada masalah mendasar yang perlu dibereskan sebelum melangkah.'
      },
      kini: {
        pos: 'Sekarang hubungan kalian ditandai {kw} ({card}), modal yang kuat untuk melangkah lebih jauh.',
        mid: 'Sekarang hubungan kalian berada di fase {kw} ({card}); belum ada yang salah, tapi juga belum ada keputusan yang jelas.',
        neg: 'Sekarang hubungan kalian lagi diuji oleh {kw} ({card}); inilah yang menghambat langkah ke jenjang berikutnya.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin langkah menuju komitmen: pembicaraan serius, rencana bersama, atau momen penting.',
        mid: 'Ke depan, {card} nunjukin proses yang butuh waktu; komitmen datang setelah kalian lebih selaras.',
        neg: 'Ke depan, {card} mengarah pada {kw}; tanpa perubahan, hubungan ini bisa berjalan di tempat atau renggang.'
      },
      tip: 'Bicarakan rencana masa depan secara terbuka: tempat tinggal, keuangan, keluarga, dan keyakinan.'
    },
    {
      key: 'jodoh', topic: 'cinta',
      re: /jodoh|ketemu (pasangan|cinta|jodoh)|dapat pacar|punya pacar|single|jomblo|lajang|cinta baru|orang baru|kapan .*(pacar|pasangan|menikah)/,
      focus: 'kedatangan cinta atau jodohmu',
      answer: {
        pos: 'Energi cinta lagi mendekat. Kartunya nunjukin peluang bertemu seseorang yang berarti cukup terbuka dalam waktu dekat.',
        mid: 'Cinta bisa datang, tapi kartu minta kamu bersiap dulu: terbuka, bergerak, dan berhenti nunggu secara pasif.',
        neg: 'Sekarang kartu lebih menekankan penyembuhan diri daripada kedatangan pasangan baru. Pertemuan yang tepat datang setelah hatimu siap.'
      },
      kini: {
        pos: 'Sekarang kamu memancarkan {kw} ({card}), energi yang menarik orang yang tepat.',
        mid: 'Sekarang kamu lagi berada di fase {kw} ({card}); hatimu setengah terbuka.',
        neg: 'Sekarang {kw} ({card}) masih menutup pintu hatimu, mungkin karena luka lama atau rasa takut.'
      },
      depan: {
        pos: 'Ke depan, {card} nandain pertemuan atau awal kisah baru.',
        mid: 'Ke depan, {card} nunjukin cinta datang lewat proses: lingkungan baru, teman, atau kegiatan yang kamu sukai.',
        neg: 'Ke depan, {card} minta kamu fokus pada dirimu dulu; jodoh nggak datang lewat rasa buru-buru.'
      },
      tip: 'Perluas lingkaranmu: datangi tempat dan kegiatan baru tempat orang dengan nilai yang sama berkumpul.'
    },
    {
      key: 'setia', topic: 'cinta',
      re: /selingkuh|setia|kesetiaan|bohong|membohongi|curiga|orang ketiga|pihak ketiga|main belakang|jujur (gak|nggak|tidak)/,
      focus: 'kejujuran dan kesetiaan dalam hubungan',
      answer: {
        pos: 'Kartunya nggak nunjukin tanda pengkhianatan yang kuat. Kecurigaanmu mungkin lebih datang dari rasa cemas daripada kenyataan.',
        mid: 'Ada hal yang belum terbuka sepenuhnya, belum tentu perselingkuhan, tapi ada komunikasi yang tersembunyi. Perlu percakapan yang jujur.',
        neg: 'Kartunya nunjukin adanya ketidakjujuran atau hal yang disembunyikan. Percayai instingmu, tapi cari bukti dan kejelasan sebelum bertindak.'
      },
      kini: {
        pos: 'Sekarang {card} ({kw}) nunjukin hubungan yang pada dasarnya tulus.',
        mid: 'Sekarang {card} ({kw}) nunjukin ada kabut: sesuatu yang belum diucapkan.',
        neg: 'Sekarang {card} ({kw}) menguatkan adanya ketidakjujuran atau keterikatan lain.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin kepercayaan bisa dipulihkan.',
        mid: 'Ke depan, {card} nunjukin kebenaran akan muncul perlahan.',
        neg: 'Ke depan, {card} ngasih kode kebenaran yang mungkin menyakitkan akan terungkap.'
      },
      tip: 'Tanyain langsung dengan tenang, lalu perhatiin konsistensi jawabannya dari waktu ke waktu.'
    },
    {
      key: 'lepas', topic: 'cinta',
      re: /putus|bertengkar|berantem|ribut|pisah|cerai|toxic|move on|melupakan|lepas(kan)?|pertahankan|dipertahankan/,
      focus: 'apakah hubungan ini perlu dipertahankan atau dilepaskan',
      answer: {
        pos: 'Kartunya nunjukin hubungan ini masih layak diperjuangkan. Masalahnya nyata, tapi bisa dibenerin kalau kalian berdua mau.',
        mid: 'Kartunya nggak memberi jawaban hitam-putih. Keputusannya ada pada apakah kalian berdua sama-sama mau berubah, bukan cuma kamu.',
        neg: 'Kartu condong ke arah ngelepasin. Bertahan dalam kondisi kayak ini lebih banyak menguras dirimu daripada membangunmu.'
      },
      kini: {
        pos: 'Sekarang, di balik konflik, masih ada {kw} ({card}) yang menjadi alasan untuk bertahan.',
        mid: 'Sekarang kamu berada di persimpangan: {card} ({kw}).',
        neg: 'Sekarang {card} ({kw}) nunjukin seberapa berat hubungan ini bagimu.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin pemulihan kalau kalian mau bekerja sama.',
        mid: 'Ke depan, {card} nunjukin kejelasan datang setelah percakapan yang jujur.',
        neg: 'Ke depan, {card} nunjukin bahwa ngelepasin justru membuka ruang untuk kedamaian.'
      },
      tip: 'Bedakan antara "aku masih sayang" dan "hubungan ini sehat untukku". Keduanya pertanyaan yang berbeda.'
    },

    /* ---------- KARIER ---------- */
    {
      key: 'kerja-baru', topic: 'karir',
      re: /dapat kerja|dapet kerja|diterima|lamar(an)? kerja|melamar|interview|wawancara|lowongan|kerja baru|cari kerja|panggilan kerja|lolos|rekrut|tes kerja|psikotes/,
      focus: 'peluangmu diterima di pekerjaan yang kamu incar',
      answer: {
        pos: 'Peluangnya bagus. Kartunya nunjukin kemampuanmu keliatan dan pintu lagi terbuka. Tetap siapkan dirimu sebaik mungkin.',
        mid: 'Peluangnya ada, tapi persaingannya nyata. Hasilnya sangat tergantung cara kamu menampilkan diri dan tindak lanjutmu.',
        neg: 'Untuk yang satu ini kartu belum nunjukin hasil yang kamu harapkan. Itu bukan berarti kamu nggak layak; bisa jadi ada tempat yang lebih tepat.'
      },
      kini: {
        pos: 'Sekarang kamu membawa {kw} ({card}), dan itu nilai jual terbesarmu.',
        mid: 'Sekarang posisimu ditandai {kw} ({card}); kamu siap, tapi belum menonjol.',
        neg: 'Sekarang {kw} ({card}) lagi menghambatmu, mungkin rasa ragu, kurang persiapan, atau kelelahan mencari.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjuk kabar baik, tawaran, atau langkah maju.',
        mid: 'Ke depan, {card} nunjukin prosesnya mungkin lebih lama atau ada tahap tambahan.',
        neg: 'Ke depan, {card} ngasih kode {kw}; siapkan rencana cadangan dan terus melamar di tempat lain.'
      },
      tip: 'Kirim ucapan terima kasih setelah wawancara dan siapkan contoh nyata hasil kerjamu.'
    },
    {
      key: 'resign', topic: 'karir',
      re: /resign|keluar dari (kantor|kerja|perusahaan)|pindah kerja|berhenti kerja|ganti kerja|bertahan di (kantor|kerja|perusahaan)|cabut dari/,
      focus: 'keputusan bertahan atau pindah dari pekerjaanmu',
      answer: {
        pos: 'Kartunya dukung langkah perubahan. Energinya nunjukin kamu siap untuk babak karier berikutnya, asal persiapannya matang.',
        mid: 'Belum waktunya mutusin dengan tergesa. Kumpulkan informasi dan siapkan pegangan sebelum melangkah keluar.',
        neg: 'Kartu menyarankan untuk nggak keluar dalam keadaan emosi atau tanpa rencana. Bereskan dulu situasinya, atau pastiin ada tempat tujuan.'
      },
      kini: {
        pos: 'Sekarang {card} ({kw}) nunjukin kamu punya modal untuk bergerak.',
        mid: 'Sekarang {card} ({kw}) nunjukin kamu masih menimbang untung-rugi.',
        neg: 'Sekarang {card} ({kw}) nunjukin kamu lagi tertekan di tempat kerja.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin perubahan ini membawa pertumbuhan.',
        mid: 'Ke depan, {card} nunjukin jawabannya akan semakin jelas dalam beberapa waktu.',
        neg: 'Ke depan, {card} mengingatkan risiko {kw} kalau melangkah tanpa persiapan.'
      },
      tip: 'Siapkan dana cadangan minimal 3–6 bulan dan amankan tawaran baru sebelum mengajukan resign.'
    },
    {
      key: 'promosi', topic: 'karir',
      re: /promosi|naik jabatan|naik gaji|kenaikan|jabatan baru|dipromosikan|naik level/,
      focus: 'peluang promosi atau kenaikanmu',
      answer: {
        pos: 'Kartunya dukung kenaikan. Kerja kerasmu keliatan, dan peluang promosi atau pengakuan lagi mendekat.',
        mid: 'Peluangnya ada, tapi belum matang. Kamu perlu lebih keliatan dan menyampaikan keinginanmu secara jelas.',
        neg: 'Untuk sekarang kartu belum nunjukin promosi. Ada hambatan, entah dari situasi kantor atau hal yang perlu kamu perkuat dulu.'
      },
      kini: {
        pos: 'Sekarang kinerjamu memancarkan {kw} ({card}).',
        mid: 'Sekarang posisimu stabil tapi belum menonjol: {card} ({kw}).',
        neg: 'Sekarang {card} ({kw}) nunjukin hambatan di lingkungan kerja.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin pengakuan dan langkah naik.',
        mid: 'Ke depan, {card} nunjukin kenaikan datang bertahap.',
        neg: 'Ke depan, {card} ngasih kode {kw}; mungkin peluang terbaikmu justru di tempat lain.'
      },
      tip: 'Catat pencapaianmu dalam angka dan minta waktu bicara dengan atasan tentang jalur kariermu.'
    },
    {
      key: 'bisnis', topic: 'karir',
      re: /bisnis|usaha|jualan|dagang|toko|startup|buka usaha|omzet|klien|pelanggan|brand|produk/,
      focus: 'perkembangan bisnis atau usahamu',
      answer: {
        pos: 'Kartunya dukung usahamu. Ada peluang tumbuh, dan langkah yang kamu ambil sekarang bisa membuahkan hasil.',
        mid: 'Usahamu bisa berkembang, tapi perlu strategi yang lebih tajam. Jangan cuma mengandalkan semangat.',
        neg: 'Kartu memperingatkan adanya hambatan di usahamu. Evaluasi dulu sebelum menambah modal atau memperluas usaha.'
      },
      kini: {
        pos: 'Sekarang usahamu bergerak dengan energi {kw} ({card}).',
        mid: 'Sekarang usahamu berada di fase {kw} ({card}): stabil, tapi butuh dorongan.',
        neg: 'Sekarang usahamu menghadapi {kw} ({card}).'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin pertumbuhan dan peluang baru.',
        mid: 'Ke depan, {card} nunjukin hasil yang naik-turun; konsistensi adalah kunci.',
        neg: 'Ke depan, {card} ngasih kode {kw}; siapkan langkah penyesuaian.'
      },
      tip: 'Fokus pada satu produk atau layanan yang paling laku, lalu perkuat itu dulu.'
    },
    {
      key: 'studi', topic: 'karir',
      re: /ujian|lulus|kuliah|sekolah|skripsi|tesis|beasiswa|sidang|cpns|snbt|utbk|seleksi|wisuda/,
      focus: 'keberhasilan ujian atau studimu',
      answer: {
        pos: 'Kartunya dukung keberhasilanmu. Usahamu sejalan dengan hasil yang kamu harapkan; tetap jaga ritme belajarmu.',
        mid: 'Hasilnya masih sangat ditentukan oleh persiapanmu dari sekarang. Kamu bisa, asal konsisten.',
        neg: 'Kartunya nunjukin kamu perlu usaha ekstra atau strategi berbeda. Jangan panik; ubah cara belajarmu dan minta bantuan.'
      },
      kini: {
        pos: 'Sekarang kamu membawa {kw} ({card}) dalam belajarmu.',
        mid: 'Sekarang persiapanmu berada di fase {kw} ({card}).',
        neg: 'Sekarang {kw} ({card}) mengganggu fokus belajarmu.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin hasil yang membanggakan.',
        mid: 'Ke depan, {card} nunjukin hasil yang sepadan dengan usahamu.',
        neg: 'Ke depan, {card} mengingatkan risiko {kw} kalau kamu nggak mengubah cara.'
      },
      tip: 'Buat jadwal belajar kecil tapi rutin, dan latih soal kayak saat ujian sungguhan.'
    },

    /* ---------- KEUANGAN ---------- */
    {
      key: 'utang', topic: 'keuangan',
      re: /utang|hutang|cicilan|pinjaman|pinjol|kredit|tagihan|paylater|lunas/,
      focus: 'jalan keluar dari utang atau cicilanmu',
      answer: {
        pos: 'Kartunya nunjukin jalan keluar yang nyata. Dengan disiplin, beban ini bisa berkurang lebih cepat dari dugaanmu.',
        mid: 'Utang ini bisa diselesaiin, tapi butuh rencana yang jelas dan kesabaran. Nggak ada jalan pintas.',
        neg: 'Kartu memperingatkan biar nggak menambah utang baru. Situasinya perlu ditangani serius sekarang sebelum membesar.'
      },
      kini: {
        pos: 'Sekarang {card} ({kw}) nunjukin kamu punya sumber daya untuk mulai melunasi.',
        mid: 'Sekarang {card} ({kw}) nunjukin kondisi yang masih bisa dikendalikan.',
        neg: 'Sekarang {card} ({kw}) nunjukin tekanan finansial yang berat.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin beban yang mulai ringan.',
        mid: 'Ke depan, {card} nunjukin pelunasan bertahap.',
        neg: 'Ke depan, {card} mengingatkan risiko {kw} kalau pola pengeluaran nggak berubah.'
      },
      tip: 'Daftar semua utang, lunasi yang bunganya paling tinggi lebih dulu, dan hentikan pinjaman baru.'
    },
    {
      key: 'investasi', topic: 'keuangan',
      re: /investasi|saham|kripto|crypto|reksa|trading|emas|properti|beli rumah|beli tanah|jual rumah|jual tanah|beli mobil/,
      focus: 'keputusan investasi atau jual-beli yang kamu pertimbangkan',
      answer: {
        pos: 'Kartu cenderung dukung langkah ini, dengan catatan kamu udah memahami risikonya dan nggak memakai uang yang kamu butuhkan.',
        mid: 'Kartu minta kamu nunggu dan mempelajari lebih dalam. Keputusan ini belum matang.',
        neg: 'Kartu memperingatkan risiko yang tinggi. Tahan dulu, dan waspadai informasi yang terlalu menjanjikan.'
      },
      kini: {
        pos: 'Sekarang {card} ({kw}) nunjukin peluang yang nyata.',
        mid: 'Sekarang {card} ({kw}) nunjukin informasi yang belum lengkap.',
        neg: 'Sekarang {card} ({kw}) nunjukin ada hal yang nggak beres atau terlalu berisiko.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin hasil yang bisa tumbuh.',
        mid: 'Ke depan, {card} nunjukin hasil yang naik-turun.',
        neg: 'Ke depan, {card} ngasih kode {kw}; lindungi modalmu.'
      },
      tip: 'Jangan menaruh lebih dari yang sanggup kamu relakan hilang, dan cek legalitasnya.'
    },
    {
      key: 'rezeki', topic: 'keuangan',
      re: /rezeki|rejeki|uang|penghasilan|pemasukan|pendapatan|gaji|keuangan|finansial|kaya|bonus|tabungan|menabung/,
      focus: 'aliran rezeki dan kondisi keuanganmu',
      answer: {
        pos: 'Arus rezekimu lagi membaik. Kartunya nunjukin pemasukan bertambah atau peluang finansial datang.',
        mid: 'Keuanganmu stabil tapi belum berlimpah. Kenaikannya tergantung cara kamu mengelola dan mencari peluang.',
        neg: 'Kartunya nunjukin masa yang perlu berhemat. Rezeki nggak tertutup, tapi sekarang fokusnya adalah menjaga, bukan membelanjakan.'
      },
      kini: {
        pos: 'Sekarang {card} ({kw}) nunjukin keuangan yang mengalir.',
        mid: 'Sekarang {card} ({kw}) nunjukin keuangan yang pas-pasan tapi terkendali.',
        neg: 'Sekarang {card} ({kw}) nunjukin kebocoran atau tekanan keuangan.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin rezeki yang bertambah.',
        mid: 'Ke depan, {card} nunjukin kemajuan perlahan.',
        neg: 'Ke depan, {card} mengingatkan risiko {kw}; siapkan dana darurat.'
      },
      tip: 'Sisihkan dulu untuk tabungan di awal bulan, baru belanjakan sisanya.'
    },

    /* ---------- KESEHATAN ---------- */
    {
      key: 'hamil', topic: 'kesehatan',
      re: /hamil|kehamilan|promil|program hamil|keturunan|punya anak|momongan/,
      focus: 'harapanmu akan kehamilan atau momongan',
      answer: {
        pos: 'Kartu memancarkan energi kesuburan dan harapan. Tetap dampingi harapan ini dengan pemeriksaan medis yang tepat.',
        mid: 'Kartu minta kesabaran. Kondisi tubuh dan pikiran perlu dirawat; prosesnya mungkin butuh waktu.',
        neg: 'Kartunya nunjukin tubuh atau pikiranmu lagi butuh pemulihan dulu. Konsultasikan dengan dokter, dan kurangi tekanan pada dirimu.'
      },
      kini: {
        pos: 'Sekarang {card} ({kw}) nunjukin energi yang subur dan dukung.',
        mid: 'Sekarang {card} ({kw}) nunjukin masa nunggu.',
        neg: 'Sekarang {card} ({kw}) nunjukin stres atau kelelahan yang perlu diperhatikan.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin kabar yang membahagiakan.',
        mid: 'Ke depan, {card} nunjukin proses yang perlu dijalani dengan sabar.',
        neg: 'Ke depan, {card} minta kamu fokus pada kesehatan menyeluruh lebih dulu.'
      },
      tip: 'Jaga pola tidur dan stres, dan ikuti saran dokter kandungan.'
    },
    {
      key: 'mental', topic: 'kesehatan',
      re: /stres|stress|cemas|kecemasan|depresi|mental|burnout|overthinking|insomnia|susah tidur|capek|lelah|panik/,
      focus: 'kesehatan mental dan ketenanganmu',
      answer: {
        pos: 'Kartunya nunjukin kamu lagi menuju kondisi yang lebih tenang. Langkah-langkah kecilmu mulai berdampak.',
        mid: 'Kondisimu naik-turun. Kartu minta kamu memberi ruang istirahat yang sungguh-sungguh, bukan cuma bertahan.',
        neg: 'Kartunya nunjukin beban pikiranmu lagi berat. Jangan dipikul sendiri; bicara dengan orang tepercaya atau tenaga profesional.'
      },
      kini: {
        pos: 'Sekarang {card} ({kw}) nunjukin ada sumber kekuatan dalam dirimu.',
        mid: 'Sekarang {card} ({kw}) nunjukin pikiranmu lagi mencari keseimbangan.',
        neg: 'Sekarang {card} ({kw}) ngegambarin tekanan yang kamu rasakan.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin pemulihan dan ketenangan.',
        mid: 'Ke depan, {card} nunjukin pemulihan bertahap.',
        neg: 'Ke depan, {card} mengingatkan biar nggak mengabaikan sinyal kelelahanmu.'
      },
      tip: 'Mulai dari hal kecil: tidur cukup, kurangi layar di malam hari, dan ceritakan bebanmu ke seseorang.'
    },
    {
      key: 'sembuh', topic: 'kesehatan',
      re: /sembuh|sakit|penyakit|operasi|pulih|pemulihan|berobat|kondisi (badan|tubuh|kesehatan)|diet|berat badan/,
      focus: 'proses pemulihan dan kondisi tubuhmu',
      answer: {
        pos: 'Kartunya nunjukin arah pemulihan yang baik. Tubuhmu merespons perawatan dan perubahan yang kamu lakukan.',
        mid: 'Pemulihan berjalan, tapi butuh kesabaran dan konsistensi. Jangan berhenti di tengah jalan.',
        neg: 'Kartu minta kamu lebih serius memperhatikan kesehatanmu. Periksakan ke tenaga medis dan jangan menunda.'
      },
      kini: {
        pos: 'Sekarang {card} ({kw}) nunjukin vitalitas yang dukung.',
        mid: 'Sekarang {card} ({kw}) nunjukin tubuh yang lagi beradaptasi.',
        neg: 'Sekarang {card} ({kw}) nunjukin tubuh yang lagi lelah atau tertekan.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin kondisi yang membaik.',
        mid: 'Ke depan, {card} nunjukin pemulihan bertahap.',
        neg: 'Ke depan, {card} mengingatkan biar waspada pada {kw}.'
      },
      tip: 'Ikuti anjuran tenaga medis dan catat perkembangan kondisimu setiap hari.'
    },

    /* ---------- KELUARGA & PERTEMANAN ---------- */
    {
      key: 'teman', topic: 'keluarga',
      re: /teman|sahabat|bestie|circle|pertemanan|geng|rekan/,
      focus: 'hubungan pertemananmu',
      answer: {
        pos: 'Kartunya nunjukin pertemanan ini tulus dan layak dirawat. Hubungannya bisa semakin erat.',
        mid: 'Pertemanan ini lagi diuji. Kejujuran dan obrolan terbuka akan menentukan arahnya.',
        neg: 'Kartunya nunjukin ada ketidakseimbangan atau ketidakjujuran dalam pertemanan ini. Jaga batasanmu.'
      },
      kini: {
        pos: 'Sekarang {card} ({kw}) ngegambarin ikatan yang hangat.',
        mid: 'Sekarang {card} ({kw}) ngegambarin jarak atau salah paham kecil.',
        neg: 'Sekarang {card} ({kw}) ngegambarin gesekan yang nyata.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin pertemanan yang semakin kuat.',
        mid: 'Ke depan, {card} nunjukin semuanya tergantung siapa yang mau membuka obrolan lebih dulu.',
        neg: 'Ke depan, {card} nunjukin mungkin saatnya memberi jarak.'
      },
      tip: 'Sampaikan perasaanmu dengan kalimat "aku merasa…", bukan tuduhan.'
    },
    {
      key: 'keluarga', topic: 'keluarga',
      re: /orang ?tua|ortu|ayah|ibu\b|mama|papa|bapak|mertua|keluarga|saudara|kakak|adik|anak(ku)?\b|suami|istri/,
      focus: 'hubunganmu dengan keluarga',
      answer: {
        pos: 'Kartunya nunjukin hubungan keluarga yang bisa membaik dan menghangat. Ada niat baik dari kedua sisi.',
        mid: 'Hubungan keluarga ini butuh kesabaran. Perubahan datang perlahan lewat komunikasi yang konsisten.',
        neg: 'Kartunya nunjukin luka atau konflik yang cukup dalam. Lindungi dirimu dengan batasan sehat sambil tetap membuka pintu dialog.'
      },
      kini: {
        pos: 'Sekarang {card} ({kw}) ngegambarin suasana keluarga yang dukung.',
        mid: 'Sekarang {card} ({kw}) ngegambarin hal-hal yang belum terucap di rumah.',
        neg: 'Sekarang {card} ({kw}) ngegambarin ketegangan dalam keluarga.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin rekonsiliasi atau kebersamaan.',
        mid: 'Ke depan, {card} nunjukin perubahan pelan tapi nyata.',
        neg: 'Ke depan, {card} mengingatkan risiko {kw} kalau semuanya terus dipendam.'
      },
      tip: 'Pilih waktu yang tenang untuk bicara, dan dengarkan dulu sebelum menyampaikan pendapatmu.'
    },

    /* ---------- DIRI ---------- */
    {
      key: 'tujuan', topic: 'diri',
      re: /tujuan|arah hidup|passion|panggilan|jalan hidup|bingung|masa depanku|hidupku|potensi|jati diri/,
      focus: 'arah dan tujuan hidupmu',
      answer: {
        pos: 'Kartunya nunjukin kamu sebenarnya udah dekat dengan jawabannya. Arahmu mulai jelas; percayai langkahmu.',
        mid: 'Arahmu belum sepenuhnya jelas, dan itu wajar. Kartu memintamu bereksperimen dan memperhatikan apa yang membuatmu hidup.',
        neg: 'Kartunya nunjukin kamu lagi di masa kabut. Ini fase pembersihan, bukan kegagalan; jawabannya datang setelah kamu melepas ekspektasi lama.'
      },
      kini: {
        pos: 'Sekarang {card} ({kw}) nunjukin kamu memegang petunjuk penting.',
        mid: 'Sekarang {card} ({kw}) nunjukin kamu lagi mencari.',
        neg: 'Sekarang {card} ({kw}) nunjukin kebingungan yang lagi kamu lalui.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin kejelasan dan langkah yang bermakna.',
        mid: 'Ke depan, {card} nunjukin jawaban datang sedikit demi sedikit.',
        neg: 'Ke depan, {card} minta kamu ngelepasin {kw} biar jalan baru keliatan.'
      },
      tip: 'Tulis tiga hal yang membuatmu lupa waktu; di situlah petunjuk arahmu.'
    },
    {
      key: 'keputusan', topic: null,
      re: /\batau\b|pilih|memilih|keputusan|haruskah|sebaiknya|lebih baik/,
      focus: 'keputusan yang lagi kamu timbang',
      answer: {
        pos: 'Kartunya dukung kamu untuk melangkah. Pilihan yang paling selaras dengan hatimu dan paling berani adalah jawabannya.',
        mid: 'Kedua pilihan punya harga. Kartu memintamu memilih berdasarkan nilai yang paling penting bagimu, bukan rasa takut.',
        neg: 'Kartu minta kamu jangan mutusin sekarang. Ada informasi atau emosi yang perlu tenang dulu.'
      },
      kini: {
        pos: 'Sekarang {card} ({kw}) nunjukin kamu cukup jernih untuk memilih.',
        mid: 'Sekarang {card} ({kw}) nunjukin kamu masih menimbang.',
        neg: 'Sekarang {card} ({kw}) nunjukin kebimbangan yang kuat.'
      },
      depan: {
        pos: 'Ke depan, {card} nunjukin hasil yang baik dari keputusan yang berani.',
        mid: 'Ke depan, {card} nunjukin hasil yang sepadan dengan kesungguhanmu.',
        neg: 'Ke depan, {card} mengingatkan risiko {kw} kalau keputusan diambil tergesa-gesa.'
      },
      tip: 'Bayangkan dirimu setahun lagi setelah memilih masing-masing opsi. Mana yang membuatmu lega?'
    }
  ];

  /* fokus bawaan bila tak ada skenario yang cocok */
  const DEFAULT_FOCUS = {
    cinta: 'kisah cintamu', karir: 'perjalanan kariermu', keuangan: 'kondisi keuanganmu',
    kesehatan: 'kesehatanmu', diri: 'perjalanan batinmu', keluarga: 'hubunganmu dengan orang-orang terdekat'
  };

  const WHO = [
    [/\bmantan\b/, 'mantanmu'], [/\bgebetan\b|\bcrush\b/, 'gebetanmu'], [/\bpacar(ku)?\b/, 'pacarmu'],
    [/\bsuami(ku)?\b/, 'suamimu'], [/\bistri(ku)?\b/, 'istrimu'], [/\btunangan(ku)?\b/, 'tunanganmu'],
    [/\b(bos|atasan)(ku)?\b/, 'atasanmu'], [/\b(orang ?tua|ortu)(ku)?\b/, 'orang tuamu'], [/\b(ibu|mama)(ku)?\b/, 'ibumu'],
    [/\b(ayah|papa|bapak)(ku)?\b/, 'ayahmu'], [/\bsahabat(ku)?\b/, 'sahabatmu'], [/\bteman(ku)?\b/, 'temanmu'],
    [/\bdoi\b|\bdia\b/, 'dia']
  ];

  function detectWho(q) {
    for (const [re, name] of WHO) if (re.test(q)) return name;
    return 'dia';
  }

  /** Cari skenario untuk pertanyaan. Skenario dengan topik yang sama didahulukan. */
  function detectScenario(question, topic) {
    const q = ' ' + (question || '').toLowerCase() + ' ';
    if (!question || !question.trim()) return null;
    const same = SCENARIOS.filter((s) => s.topic === topic && s.re.test(q));
    const generic = SCENARIOS.filter((s) => s.topic === null && s.re.test(q));
    const other = SCENARIOS.filter((s) => s.topic && s.topic !== topic && s.re.test(q));
    const sc = same[0] || other[0] || generic[0] || null;
    if (!sc) return null;
    return Object.assign({}, sc, { who: detectWho(q) });
  }

  window.TarotScenarios = { SCENARIOS: SCENARIOS, DEFAULT_FOCUS: DEFAULT_FOCUS, detectScenario: detectScenario, detectWho: detectWho };
})();
