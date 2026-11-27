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
        pos: 'Pintu untuk kembali bersama masih terbuka. Kartu menunjukkan masih ada ikatan dan kesempatan kedua, asalkan masalah lama benar-benar dibicarakan, bukan sekadar dilupakan.',
        mid: 'Kembali bersama mungkin terjadi, tetapi belum pasti. Hasilnya bergantung pada apakah kalian berdua sudah berubah, bukan hanya rindu.',
        neg: 'Kartu tidak mendukung kembali ke hubungan lama saat ini. Ada luka atau pola yang belum selesai, dan kembali sekarang berisiko mengulang cerita yang sama.'
      },
      kini: {
        pos: 'Saat ini energi di antara kalian masih hangat. {card} ({kw}) menandakan perasaan itu belum benar-benar padam.',
        mid: 'Saat ini situasinya menggantung. {card} ({kw}) menunjukkan kamu masih menimbang antara rindu dan logika.',
        neg: 'Saat ini yang paling terasa justru {kw}. {card} menandakan luka perpisahan masih aktif dan belum sembuh.'
      },
      depan: {
        pos: 'Ke depan, {card} membuka kemungkinan rekonsiliasi atau komunikasi yang membaik.',
        mid: 'Ke depan, {card} menunjukkan proses yang lambat; kalau ada jalan kembali, itu butuh waktu dan pembuktian.',
        neg: 'Ke depan, {card} mengarah pada {kw}, tanda bahwa jalan terbaik mungkin melepaskan dan memulai yang baru.'
      },
      tip: 'Sebelum memutuskan kembali, tanyakan: apa yang berbeda sekarang dibanding saat kalian berpisah?'
    },
    {
      key: 'perasaan', topic: 'cinta',
      re: /(dia|doi|gebetan|crush|cowok|cewek|pacar)[^.?!]{0,25}(suka|sayang|cinta|perasaan|mikirin|naksir|tertarik|kangen)|perasaan(nya| dia)|suka (sama|ke|dengan) (aku|saya|ku)|isi hati/,
      focus: 'perasaan {who} kepadamu',
      answer: {
        pos: 'Ya, kartu menunjukkan ada ketertarikan atau perasaan yang tulus dari {who}. Perasaannya nyata, meski mungkin belum diungkapkan sepenuhnya.',
        mid: 'Perasaan {who} ada, tetapi masih bercampur ragu atau belum jelas arahnya. Dia sendiri mungkin belum yakin.',
        neg: 'Kartu menunjukkan perasaan {who} saat ini belum sejalan dengan harapanmu. Ada jarak, keraguan, atau hal lain yang sedang mengisi pikirannya.'
      },
      kini: {
        pos: '{card} ({kw}) menggambarkan isi hati {who} saat ini: ada kehangatan dan ketertarikan kepadamu.',
        mid: '{card} ({kw}) menggambarkan isi hati {who} saat ini: tertarik tapi menahan diri, atau sedang bingung dengan perasaannya.',
        neg: '{card} ({kw}) menggambarkan isi hati {who} saat ini: ada tembok, luka lama, atau fokus yang sedang di tempat lain.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan perasaan ini berpeluang tumbuh dan lebih terbuka.',
        mid: 'Ke depan, {card} menunjukkan semuanya bergantung pada keberanian salah satu dari kalian untuk jujur lebih dulu.',
        neg: 'Ke depan, {card} mengisyaratkan {kw}; jangan menggantungkan hatimu sepenuhnya pada orang ini.'
      },
      tip: 'Perhatikan tindakannya, bukan hanya kata-katanya, karena di situlah perasaan yang sebenarnya terlihat.'
    },
    {
      key: 'komitmen', topic: 'cinta',
      re: /nikah|menikah|pernikahan|serius|tunangan|lamar(an)? (dia|aku|nikah)|dilamar|jenjang|komitmen|berlanjut|langgeng|bertahan lama|masa depan (hubungan|kami|kita)/,
      focus: 'kelanjutan hubungan ini ke jenjang yang lebih serius',
      answer: {
        pos: 'Kartu mendukung hubungan ini melangkah ke jenjang yang lebih serius. Fondasinya ada, dan arah energinya menuju komitmen.',
        mid: 'Hubungan ini bisa berlanjut ke jenjang serius, tetapi masih ada hal penting yang perlu disepakati dulu, seperti nilai, rencana, atau restu.',
        neg: 'Untuk saat ini kartu belum menunjukkan kesiapan menuju komitmen serius. Ada masalah mendasar yang perlu dibereskan sebelum melangkah.'
      },
      kini: {
        pos: 'Saat ini hubungan kalian ditandai {kw} ({card}), modal yang kuat untuk melangkah lebih jauh.',
        mid: 'Saat ini hubungan kalian berada di fase {kw} ({card}); belum ada yang salah, tapi juga belum ada keputusan yang jelas.',
        neg: 'Saat ini hubungan kalian sedang diuji oleh {kw} ({card}); inilah yang menghambat langkah ke jenjang berikutnya.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan langkah menuju komitmen: pembicaraan serius, rencana bersama, atau momen penting.',
        mid: 'Ke depan, {card} menunjukkan proses yang butuh waktu; komitmen datang setelah kalian lebih selaras.',
        neg: 'Ke depan, {card} mengarah pada {kw}; tanpa perubahan, hubungan ini bisa berjalan di tempat atau renggang.'
      },
      tip: 'Bicarakan rencana masa depan secara terbuka: tempat tinggal, keuangan, keluarga, dan keyakinan.'
    },
    {
      key: 'jodoh', topic: 'cinta',
      re: /jodoh|ketemu (pasangan|cinta|jodoh)|dapat pacar|punya pacar|single|jomblo|lajang|cinta baru|orang baru|kapan .*(pacar|pasangan|menikah)/,
      focus: 'kedatangan cinta atau jodohmu',
      answer: {
        pos: 'Energi cinta sedang mendekat. Kartu menunjukkan peluang bertemu seseorang yang berarti cukup terbuka dalam waktu dekat.',
        mid: 'Cinta bisa datang, tetapi kartu meminta kamu bersiap dulu: terbuka, bergerak, dan berhenti menunggu secara pasif.',
        neg: 'Saat ini kartu lebih menekankan penyembuhan diri daripada kedatangan pasangan baru. Pertemuan yang tepat datang setelah hatimu siap.'
      },
      kini: {
        pos: 'Saat ini kamu memancarkan {kw} ({card}), energi yang menarik orang yang tepat.',
        mid: 'Saat ini kamu sedang berada di fase {kw} ({card}); hatimu setengah terbuka.',
        neg: 'Saat ini {kw} ({card}) masih menutup pintu hatimu, mungkin karena luka lama atau rasa takut.'
      },
      depan: {
        pos: 'Ke depan, {card} menandakan pertemuan atau awal kisah baru.',
        mid: 'Ke depan, {card} menunjukkan cinta datang lewat proses: lingkungan baru, teman, atau kegiatan yang kamu sukai.',
        neg: 'Ke depan, {card} meminta kamu fokus pada dirimu dulu; jodoh tidak datang lewat rasa terburu-buru.'
      },
      tip: 'Perluas lingkaranmu: datangi tempat dan kegiatan baru tempat orang dengan nilai yang sama berkumpul.'
    },
    {
      key: 'setia', topic: 'cinta',
      re: /selingkuh|setia|kesetiaan|bohong|membohongi|curiga|orang ketiga|pihak ketiga|main belakang|jujur (gak|nggak|tidak)/,
      focus: 'kejujuran dan kesetiaan dalam hubungan',
      answer: {
        pos: 'Kartu tidak menunjukkan tanda pengkhianatan yang kuat. Kecurigaanmu mungkin lebih datang dari rasa cemas daripada kenyataan.',
        mid: 'Ada hal yang belum terbuka sepenuhnya, belum tentu perselingkuhan, tapi ada komunikasi yang tersembunyi. Perlu percakapan yang jujur.',
        neg: 'Kartu menunjukkan adanya ketidakjujuran atau hal yang disembunyikan. Percayai instingmu, namun cari bukti dan kejelasan sebelum bertindak.'
      },
      kini: {
        pos: 'Saat ini {card} ({kw}) menunjukkan hubungan yang pada dasarnya tulus.',
        mid: 'Saat ini {card} ({kw}) menunjukkan ada kabut: sesuatu yang belum diucapkan.',
        neg: 'Saat ini {card} ({kw}) menguatkan adanya ketidakjujuran atau keterikatan lain.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan kepercayaan bisa dipulihkan.',
        mid: 'Ke depan, {card} menunjukkan kebenaran akan muncul perlahan.',
        neg: 'Ke depan, {card} mengisyaratkan kebenaran yang mungkin menyakitkan akan terungkap.'
      },
      tip: 'Tanyakan langsung dengan tenang, lalu perhatikan konsistensi jawabannya dari waktu ke waktu.'
    },
    {
      key: 'lepas', topic: 'cinta',
      re: /putus|bertengkar|berantem|ribut|pisah|cerai|toxic|move on|melupakan|lepas(kan)?|pertahankan|dipertahankan/,
      focus: 'apakah hubungan ini perlu dipertahankan atau dilepaskan',
      answer: {
        pos: 'Kartu menunjukkan hubungan ini masih layak diperjuangkan. Masalahnya nyata, tapi bisa diperbaiki bila kalian berdua mau.',
        mid: 'Kartu tidak memberi jawaban hitam-putih. Keputusannya ada pada apakah kalian berdua sama-sama mau berubah, bukan hanya kamu.',
        neg: 'Kartu condong ke arah melepaskan. Bertahan dalam kondisi seperti ini lebih banyak menguras dirimu daripada membangunmu.'
      },
      kini: {
        pos: 'Saat ini, di balik konflik, masih ada {kw} ({card}) yang menjadi alasan untuk bertahan.',
        mid: 'Saat ini kamu berada di persimpangan: {card} ({kw}).',
        neg: 'Saat ini {card} ({kw}) menunjukkan seberapa berat hubungan ini bagimu.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan pemulihan bila kalian mau bekerja sama.',
        mid: 'Ke depan, {card} menunjukkan kejelasan datang setelah percakapan yang jujur.',
        neg: 'Ke depan, {card} menunjukkan bahwa melepaskan justru membuka ruang untuk kedamaian.'
      },
      tip: 'Bedakan antara "aku masih sayang" dan "hubungan ini sehat untukku". Keduanya pertanyaan yang berbeda.'
    },

    /* ---------- KARIER ---------- */
    {
      key: 'kerja-baru', topic: 'karir',
      re: /dapat kerja|dapet kerja|diterima|lamar(an)? kerja|melamar|interview|wawancara|lowongan|kerja baru|cari kerja|panggilan kerja|lolos|rekrut|tes kerja|psikotes/,
      focus: 'peluangmu diterima di pekerjaan yang kamu incar',
      answer: {
        pos: 'Peluangnya bagus. Kartu menunjukkan kemampuanmu terlihat dan pintu sedang terbuka. Tetap siapkan dirimu sebaik mungkin.',
        mid: 'Peluangnya ada, tetapi persaingannya nyata. Hasilnya sangat bergantung pada cara kamu menampilkan diri dan tindak lanjutmu.',
        neg: 'Untuk yang satu ini kartu belum menunjukkan hasil yang kamu harapkan. Itu bukan berarti kamu tidak layak; bisa jadi ada tempat yang lebih tepat.'
      },
      kini: {
        pos: 'Saat ini kamu membawa {kw} ({card}), dan itu nilai jual terbesarmu.',
        mid: 'Saat ini posisimu ditandai {kw} ({card}); kamu siap, tapi belum menonjol.',
        neg: 'Saat ini {kw} ({card}) sedang menghambatmu, mungkin rasa ragu, kurang persiapan, atau kelelahan mencari.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjuk kabar baik, tawaran, atau langkah maju.',
        mid: 'Ke depan, {card} menunjukkan prosesnya mungkin lebih lama atau ada tahap tambahan.',
        neg: 'Ke depan, {card} mengisyaratkan {kw}; siapkan rencana cadangan dan terus melamar di tempat lain.'
      },
      tip: 'Kirim ucapan terima kasih setelah wawancara dan siapkan contoh nyata hasil kerjamu.'
    },
    {
      key: 'resign', topic: 'karir',
      re: /resign|keluar dari (kantor|kerja|perusahaan)|pindah kerja|berhenti kerja|ganti kerja|bertahan di (kantor|kerja|perusahaan)|cabut dari/,
      focus: 'keputusan bertahan atau pindah dari pekerjaanmu',
      answer: {
        pos: 'Kartu mendukung langkah perubahan. Energinya menunjukkan kamu siap untuk babak karier berikutnya, asal persiapannya matang.',
        mid: 'Belum waktunya memutuskan dengan tergesa. Kumpulkan informasi dan siapkan pegangan sebelum melangkah keluar.',
        neg: 'Kartu menyarankan untuk tidak keluar dalam keadaan emosi atau tanpa rencana. Bereskan dulu situasinya, atau pastikan ada tempat tujuan.'
      },
      kini: {
        pos: 'Saat ini {card} ({kw}) menunjukkan kamu punya modal untuk bergerak.',
        mid: 'Saat ini {card} ({kw}) menunjukkan kamu masih menimbang untung-rugi.',
        neg: 'Saat ini {card} ({kw}) menunjukkan kamu sedang tertekan di tempat kerja.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan perubahan ini membawa pertumbuhan.',
        mid: 'Ke depan, {card} menunjukkan jawabannya akan semakin jelas dalam beberapa waktu.',
        neg: 'Ke depan, {card} mengingatkan risiko {kw} bila melangkah tanpa persiapan.'
      },
      tip: 'Siapkan dana cadangan minimal 3–6 bulan dan amankan tawaran baru sebelum mengajukan resign.'
    },
    {
      key: 'promosi', topic: 'karir',
      re: /promosi|naik jabatan|naik gaji|kenaikan|jabatan baru|dipromosikan|naik level/,
      focus: 'peluang promosi atau kenaikanmu',
      answer: {
        pos: 'Kartu mendukung kenaikan. Kerja kerasmu terlihat, dan peluang promosi atau pengakuan sedang mendekat.',
        mid: 'Peluangnya ada, namun belum matang. Kamu perlu lebih terlihat dan menyampaikan keinginanmu secara jelas.',
        neg: 'Untuk saat ini kartu belum menunjukkan promosi. Ada hambatan, entah dari situasi kantor atau hal yang perlu kamu perkuat dulu.'
      },
      kini: {
        pos: 'Saat ini kinerjamu memancarkan {kw} ({card}).',
        mid: 'Saat ini posisimu stabil namun belum menonjol: {card} ({kw}).',
        neg: 'Saat ini {card} ({kw}) menunjukkan hambatan di lingkungan kerja.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan pengakuan dan langkah naik.',
        mid: 'Ke depan, {card} menunjukkan kenaikan datang bertahap.',
        neg: 'Ke depan, {card} mengisyaratkan {kw}; mungkin peluang terbaikmu justru di tempat lain.'
      },
      tip: 'Catat pencapaianmu dalam angka dan minta waktu bicara dengan atasan tentang jalur kariermu.'
    },
    {
      key: 'bisnis', topic: 'karir',
      re: /bisnis|usaha|jualan|dagang|toko|startup|buka usaha|omzet|klien|pelanggan|brand|produk/,
      focus: 'perkembangan bisnis atau usahamu',
      answer: {
        pos: 'Kartu mendukung usahamu. Ada peluang tumbuh, dan langkah yang kamu ambil sekarang bisa membuahkan hasil.',
        mid: 'Usahamu bisa berkembang, tetapi perlu strategi yang lebih tajam. Jangan hanya mengandalkan semangat.',
        neg: 'Kartu memperingatkan adanya hambatan di usahamu. Evaluasi dulu sebelum menambah modal atau memperluas usaha.'
      },
      kini: {
        pos: 'Saat ini usahamu bergerak dengan energi {kw} ({card}).',
        mid: 'Saat ini usahamu berada di fase {kw} ({card}): stabil, tapi butuh dorongan.',
        neg: 'Saat ini usahamu menghadapi {kw} ({card}).'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan pertumbuhan dan peluang baru.',
        mid: 'Ke depan, {card} menunjukkan hasil yang naik-turun; konsistensi adalah kunci.',
        neg: 'Ke depan, {card} mengisyaratkan {kw}; siapkan langkah penyesuaian.'
      },
      tip: 'Fokus pada satu produk atau layanan yang paling laku, lalu perkuat itu dulu.'
    },
    {
      key: 'studi', topic: 'karir',
      re: /ujian|lulus|kuliah|sekolah|skripsi|tesis|beasiswa|sidang|cpns|snbt|utbk|seleksi|wisuda/,
      focus: 'keberhasilan ujian atau studimu',
      answer: {
        pos: 'Kartu mendukung keberhasilanmu. Usahamu sejalan dengan hasil yang kamu harapkan; tetap jaga ritme belajarmu.',
        mid: 'Hasilnya masih sangat ditentukan oleh persiapanmu dari sekarang. Kamu bisa, asal konsisten.',
        neg: 'Kartu menunjukkan kamu perlu usaha ekstra atau strategi berbeda. Jangan panik; ubah cara belajarmu dan minta bantuan.'
      },
      kini: {
        pos: 'Saat ini kamu membawa {kw} ({card}) dalam belajarmu.',
        mid: 'Saat ini persiapanmu berada di fase {kw} ({card}).',
        neg: 'Saat ini {kw} ({card}) mengganggu fokus belajarmu.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan hasil yang membanggakan.',
        mid: 'Ke depan, {card} menunjukkan hasil yang sepadan dengan usahamu.',
        neg: 'Ke depan, {card} mengingatkan risiko {kw} bila kamu tidak mengubah cara.'
      },
      tip: 'Buat jadwal belajar kecil tapi rutin, dan latih soal seperti saat ujian sungguhan.'
    },

    /* ---------- KEUANGAN ---------- */
    {
      key: 'utang', topic: 'keuangan',
      re: /utang|hutang|cicilan|pinjaman|pinjol|kredit|tagihan|paylater|lunas/,
      focus: 'jalan keluar dari utang atau cicilanmu',
      answer: {
        pos: 'Kartu menunjukkan jalan keluar yang nyata. Dengan disiplin, beban ini bisa berkurang lebih cepat dari dugaanmu.',
        mid: 'Utang ini bisa diselesaikan, tetapi butuh rencana yang jelas dan kesabaran. Tidak ada jalan pintas.',
        neg: 'Kartu memperingatkan agar tidak menambah utang baru. Situasinya perlu ditangani serius sekarang sebelum membesar.'
      },
      kini: {
        pos: 'Saat ini {card} ({kw}) menunjukkan kamu punya sumber daya untuk mulai melunasi.',
        mid: 'Saat ini {card} ({kw}) menunjukkan kondisi yang masih bisa dikendalikan.',
        neg: 'Saat ini {card} ({kw}) menunjukkan tekanan finansial yang berat.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan beban yang mulai ringan.',
        mid: 'Ke depan, {card} menunjukkan pelunasan bertahap.',
        neg: 'Ke depan, {card} mengingatkan risiko {kw} bila pola pengeluaran tidak berubah.'
      },
      tip: 'Daftar semua utang, lunasi yang bunganya paling tinggi lebih dulu, dan hentikan pinjaman baru.'
    },
    {
      key: 'investasi', topic: 'keuangan',
      re: /investasi|saham|kripto|crypto|reksa|trading|emas|properti|beli rumah|beli tanah|jual rumah|jual tanah|beli mobil/,
      focus: 'keputusan investasi atau jual-beli yang kamu pertimbangkan',
      answer: {
        pos: 'Kartu cenderung mendukung langkah ini, dengan catatan kamu sudah memahami risikonya dan tidak memakai uang yang kamu butuhkan.',
        mid: 'Kartu meminta kamu menunggu dan mempelajari lebih dalam. Keputusan ini belum matang.',
        neg: 'Kartu memperingatkan risiko yang tinggi. Tahan dulu, dan waspadai informasi yang terlalu menjanjikan.'
      },
      kini: {
        pos: 'Saat ini {card} ({kw}) menunjukkan peluang yang nyata.',
        mid: 'Saat ini {card} ({kw}) menunjukkan informasi yang belum lengkap.',
        neg: 'Saat ini {card} ({kw}) menunjukkan ada hal yang tidak beres atau terlalu berisiko.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan hasil yang bisa tumbuh.',
        mid: 'Ke depan, {card} menunjukkan hasil yang naik-turun.',
        neg: 'Ke depan, {card} mengisyaratkan {kw}; lindungi modalmu.'
      },
      tip: 'Jangan menaruh lebih dari yang sanggup kamu relakan hilang, dan cek legalitasnya.'
    },
    {
      key: 'rezeki', topic: 'keuangan',
      re: /rezeki|rejeki|uang|penghasilan|pemasukan|pendapatan|gaji|keuangan|finansial|kaya|bonus|tabungan|menabung/,
      focus: 'aliran rezeki dan kondisi keuanganmu',
      answer: {
        pos: 'Arus rezekimu sedang membaik. Kartu menunjukkan pemasukan bertambah atau peluang finansial datang.',
        mid: 'Keuanganmu stabil namun belum berlimpah. Kenaikannya bergantung pada cara kamu mengelola dan mencari peluang.',
        neg: 'Kartu menunjukkan masa yang perlu berhemat. Rezeki tidak tertutup, tetapi saat ini fokusnya adalah menjaga, bukan membelanjakan.'
      },
      kini: {
        pos: 'Saat ini {card} ({kw}) menunjukkan keuangan yang mengalir.',
        mid: 'Saat ini {card} ({kw}) menunjukkan keuangan yang pas-pasan namun terkendali.',
        neg: 'Saat ini {card} ({kw}) menunjukkan kebocoran atau tekanan keuangan.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan rezeki yang bertambah.',
        mid: 'Ke depan, {card} menunjukkan kemajuan perlahan.',
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
        mid: 'Kartu meminta kesabaran. Kondisi tubuh dan pikiran perlu dirawat; prosesnya mungkin butuh waktu.',
        neg: 'Kartu menunjukkan tubuh atau pikiranmu sedang butuh pemulihan dulu. Konsultasikan dengan dokter, dan kurangi tekanan pada dirimu.'
      },
      kini: {
        pos: 'Saat ini {card} ({kw}) menunjukkan energi yang subur dan mendukung.',
        mid: 'Saat ini {card} ({kw}) menunjukkan masa menunggu.',
        neg: 'Saat ini {card} ({kw}) menunjukkan stres atau kelelahan yang perlu diperhatikan.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan kabar yang membahagiakan.',
        mid: 'Ke depan, {card} menunjukkan proses yang perlu dijalani dengan sabar.',
        neg: 'Ke depan, {card} meminta kamu fokus pada kesehatan menyeluruh lebih dulu.'
      },
      tip: 'Jaga pola tidur dan stres, dan ikuti saran dokter kandungan.'
    },
    {
      key: 'mental', topic: 'kesehatan',
      re: /stres|stress|cemas|kecemasan|depresi|mental|burnout|overthinking|insomnia|susah tidur|capek|lelah|panik/,
      focus: 'kesehatan mental dan ketenanganmu',
      answer: {
        pos: 'Kartu menunjukkan kamu sedang menuju kondisi yang lebih tenang. Langkah-langkah kecilmu mulai berdampak.',
        mid: 'Kondisimu naik-turun. Kartu meminta kamu memberi ruang istirahat yang sungguh-sungguh, bukan hanya bertahan.',
        neg: 'Kartu menunjukkan beban pikiranmu sedang berat. Jangan dipikul sendiri; bicara dengan orang tepercaya atau tenaga profesional.'
      },
      kini: {
        pos: 'Saat ini {card} ({kw}) menunjukkan ada sumber kekuatan dalam dirimu.',
        mid: 'Saat ini {card} ({kw}) menunjukkan pikiranmu sedang mencari keseimbangan.',
        neg: 'Saat ini {card} ({kw}) menggambarkan tekanan yang kamu rasakan.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan pemulihan dan ketenangan.',
        mid: 'Ke depan, {card} menunjukkan pemulihan bertahap.',
        neg: 'Ke depan, {card} mengingatkan agar tidak mengabaikan sinyal kelelahanmu.'
      },
      tip: 'Mulai dari hal kecil: tidur cukup, kurangi layar di malam hari, dan ceritakan bebanmu kepada seseorang.'
    },
    {
      key: 'sembuh', topic: 'kesehatan',
      re: /sembuh|sakit|penyakit|operasi|pulih|pemulihan|berobat|kondisi (badan|tubuh|kesehatan)|diet|berat badan/,
      focus: 'proses pemulihan dan kondisi tubuhmu',
      answer: {
        pos: 'Kartu menunjukkan arah pemulihan yang baik. Tubuhmu merespons perawatan dan perubahan yang kamu lakukan.',
        mid: 'Pemulihan berjalan, tetapi butuh kesabaran dan konsistensi. Jangan berhenti di tengah jalan.',
        neg: 'Kartu meminta kamu lebih serius memperhatikan kesehatanmu. Periksakan ke tenaga medis dan jangan menunda.'
      },
      kini: {
        pos: 'Saat ini {card} ({kw}) menunjukkan vitalitas yang mendukung.',
        mid: 'Saat ini {card} ({kw}) menunjukkan tubuh yang sedang beradaptasi.',
        neg: 'Saat ini {card} ({kw}) menunjukkan tubuh yang sedang lelah atau tertekan.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan kondisi yang membaik.',
        mid: 'Ke depan, {card} menunjukkan pemulihan bertahap.',
        neg: 'Ke depan, {card} mengingatkan agar waspada pada {kw}.'
      },
      tip: 'Ikuti anjuran tenaga medis dan catat perkembangan kondisimu setiap hari.'
    },

    /* ---------- KELUARGA & PERTEMANAN ---------- */
    {
      key: 'teman', topic: 'keluarga',
      re: /teman|sahabat|bestie|circle|pertemanan|geng|rekan/,
      focus: 'hubungan pertemananmu',
      answer: {
        pos: 'Kartu menunjukkan pertemanan ini tulus dan layak dirawat. Hubungannya bisa semakin erat.',
        mid: 'Pertemanan ini sedang diuji. Kejujuran dan obrolan terbuka akan menentukan arahnya.',
        neg: 'Kartu menunjukkan ada ketidakseimbangan atau ketidakjujuran dalam pertemanan ini. Jaga batasanmu.'
      },
      kini: {
        pos: 'Saat ini {card} ({kw}) menggambarkan ikatan yang hangat.',
        mid: 'Saat ini {card} ({kw}) menggambarkan jarak atau salah paham kecil.',
        neg: 'Saat ini {card} ({kw}) menggambarkan gesekan yang nyata.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan pertemanan yang semakin kuat.',
        mid: 'Ke depan, {card} menunjukkan semuanya bergantung pada siapa yang mau membuka obrolan lebih dulu.',
        neg: 'Ke depan, {card} menunjukkan mungkin saatnya memberi jarak.'
      },
      tip: 'Sampaikan perasaanmu dengan kalimat "aku merasa…", bukan tuduhan.'
    },
    {
      key: 'keluarga', topic: 'keluarga',
      re: /orang ?tua|ortu|ayah|ibu\b|mama|papa|bapak|mertua|keluarga|saudara|kakak|adik|anak(ku)?\b|suami|istri/,
      focus: 'hubunganmu dengan keluarga',
      answer: {
        pos: 'Kartu menunjukkan hubungan keluarga yang bisa membaik dan menghangat. Ada niat baik dari kedua sisi.',
        mid: 'Hubungan keluarga ini butuh kesabaran. Perubahan datang perlahan lewat komunikasi yang konsisten.',
        neg: 'Kartu menunjukkan luka atau konflik yang cukup dalam. Lindungi dirimu dengan batasan sehat sambil tetap membuka pintu dialog.'
      },
      kini: {
        pos: 'Saat ini {card} ({kw}) menggambarkan suasana keluarga yang mendukung.',
        mid: 'Saat ini {card} ({kw}) menggambarkan hal-hal yang belum terucap di rumah.',
        neg: 'Saat ini {card} ({kw}) menggambarkan ketegangan dalam keluarga.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan rekonsiliasi atau kebersamaan.',
        mid: 'Ke depan, {card} menunjukkan perubahan pelan tapi nyata.',
        neg: 'Ke depan, {card} mengingatkan risiko {kw} bila semuanya terus dipendam.'
      },
      tip: 'Pilih waktu yang tenang untuk bicara, dan dengarkan dulu sebelum menyampaikan pendapatmu.'
    },

    /* ---------- DIRI ---------- */
    {
      key: 'tujuan', topic: 'diri',
      re: /tujuan|arah hidup|passion|panggilan|jalan hidup|bingung|masa depanku|hidupku|potensi|jati diri/,
      focus: 'arah dan tujuan hidupmu',
      answer: {
        pos: 'Kartu menunjukkan kamu sebenarnya sudah dekat dengan jawabannya. Arahmu mulai jelas; percayai langkahmu.',
        mid: 'Arahmu belum sepenuhnya jelas, dan itu wajar. Kartu memintamu bereksperimen dan memperhatikan apa yang membuatmu hidup.',
        neg: 'Kartu menunjukkan kamu sedang di masa kabut. Ini fase pembersihan, bukan kegagalan; jawabannya datang setelah kamu melepas ekspektasi lama.'
      },
      kini: {
        pos: 'Saat ini {card} ({kw}) menunjukkan kamu memegang petunjuk penting.',
        mid: 'Saat ini {card} ({kw}) menunjukkan kamu sedang mencari.',
        neg: 'Saat ini {card} ({kw}) menunjukkan kebingungan yang sedang kamu lalui.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan kejelasan dan langkah yang bermakna.',
        mid: 'Ke depan, {card} menunjukkan jawaban datang sedikit demi sedikit.',
        neg: 'Ke depan, {card} meminta kamu melepaskan {kw} agar jalan baru terlihat.'
      },
      tip: 'Tulis tiga hal yang membuatmu lupa waktu; di situlah petunjuk arahmu.'
    },
    {
      key: 'keputusan', topic: null,
      re: /\batau\b|pilih|memilih|keputusan|haruskah|sebaiknya|lebih baik/,
      focus: 'keputusan yang sedang kamu timbang',
      answer: {
        pos: 'Kartu mendukung kamu untuk melangkah. Pilihan yang paling selaras dengan hatimu dan paling berani adalah jawabannya.',
        mid: 'Kedua pilihan punya harga. Kartu memintamu memilih berdasarkan nilai yang paling penting bagimu, bukan rasa takut.',
        neg: 'Kartu meminta kamu jangan memutuskan sekarang. Ada informasi atau emosi yang perlu tenang dulu.'
      },
      kini: {
        pos: 'Saat ini {card} ({kw}) menunjukkan kamu cukup jernih untuk memilih.',
        mid: 'Saat ini {card} ({kw}) menunjukkan kamu masih menimbang.',
        neg: 'Saat ini {card} ({kw}) menunjukkan kebimbangan yang kuat.'
      },
      depan: {
        pos: 'Ke depan, {card} menunjukkan hasil yang baik dari keputusan yang berani.',
        mid: 'Ke depan, {card} menunjukkan hasil yang sepadan dengan kesungguhanmu.',
        neg: 'Ke depan, {card} mengingatkan risiko {kw} bila keputusan diambil tergesa-gesa.'
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
