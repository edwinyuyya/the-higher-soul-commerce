/* =========================================================
   ISI LAPORAN NUMEROLOGI LENGKAP
   Ditulis dengan bahasa sehari-hari. Setiap angka (1–9, 11, 22, 33)
   punya teks untuk semua bab laporan.
   ========================================================= */
'use strict';

const NUMBERS = {
  1: {
    title: 'Sang Pemimpin',
    short: 'berani memulai dan membuka jalan',
    about: [
      'Kamu orang yang suka memulai duluan. Saat orang lain masih ragu, kamu sudah melangkah. Kamu punya dorongan kuat untuk berdiri di atas kaki sendiri dan membuktikan bahwa kamu mampu.',
      'Hidupmu mengajarkan satu hal: percaya pada diri sendiri. Semakin kamu berani mengambil keputusan sendiri, semakin hidupmu terasa "pas".'
    ],
    strengths: ['Berani mengambil keputusan', 'Mandiri', 'Penuh ide baru', 'Tidak gampang menyerah', 'Bisa menggerakkan orang lain'],
    challenges: ['Merasa harus mengurus semuanya sendiri', 'Kurang sabar dengan orang yang lambat', 'Gengsi meminta bantuan'],
    career: {
      fields: ['Wirausaha / pemilik usaha', 'Manajer atau kepala tim', 'Penjualan dan pemasaran', 'Konsultan', 'Bidang kreatif yang mandiri', 'Pekerjaan perintis (proyek baru)'],
      style: 'Kamu paling semangat saat diberi kebebasan dan tanggung jawab penuh. Pekerjaan yang terlalu banyak diatur akan cepat membuatmu bosan.',
      money: 'Rezekimu terbuka saat kamu berani memulai sesuatu atas namamu sendiri. Hati-hati dengan keputusan uang yang terburu-buru karena gengsi.'
    },
    love: {
      pattern: 'Dalam hubungan kamu cenderung memimpin dan melindungi. Kamu tertarik pada orang yang punya pendirian, tapi bisa bentrok kalau sama-sama keras kepala.',
      needs: 'Pasangan yang menghargai kemandirianmu dan tidak mengekang.',
      advice: 'Belajar mendengar sebelum memutuskan. Tunjukkan sisi lembutmu. Itu tidak membuatmu lemah.'
    },
    match: [3, 5, 6],
    soul: 'Jauh di dalam hati, kamu ingin diakui sebagai orang yang mampu dan mandiri. Kamu ingin hidup dengan caramu sendiri, bukan mengikuti aturan orang lain.',
    persona: 'Orang melihatmu sebagai sosok yang percaya diri, tegas, dan tahu apa yang diinginkan. Kadang kamu terlihat sulit didekati, padahal kamu hanya sedang fokus.',
    birthday: 'Tanggal lahirmu memberi bakat untuk memulai hal baru dan bertahan sendiri saat keadaan sulit.'
  },
  2: {
    title: 'Sang Pendamai',
    short: 'peka, sabar, dan pandai menyatukan',
    about: [
      'Kamu peka terhadap perasaan orang lain. Kamu cepat menangkap kalau suasana tidak enak, dan secara alami berusaha menenangkan. Banyak orang merasa nyaman bercerita padamu.',
      'Hidupmu mengajarkan keseimbangan: menjaga perasaan orang lain tanpa melupakan perasaanmu sendiri.'
    ],
    strengths: ['Pendengar yang baik', 'Sabar', 'Pandai menjaga hubungan', 'Teliti pada detail', 'Bisa bekerja sama dengan siapa saja'],
    challenges: ['Susah berkata "tidak"', 'Mudah tersinggung', 'Terlalu lama ragu sebelum memutuskan'],
    career: {
      fields: ['Konselor atau psikolog', 'HRD / personalia', 'Asisten atau sekretaris eksekutif', 'Pelayanan pelanggan', 'Mediator / negosiator', 'Seni, musik, dan desain'],
      style: 'Kamu bekerja paling baik dalam tim yang akur dan suasana yang tenang. Kamu adalah "lem" yang membuat tim tetap utuh.',
      money: 'Rezekimu datang lewat kerja sama dan kemitraan. Hindari meminjamkan uang hanya karena tidak enak menolak.'
    },
    love: {
      pattern: 'Kamu romantis dan sangat setia. Kamu rela banyak mengalah demi hubungan, kadang sampai kebutuhanmu sendiri terabaikan.',
      needs: 'Pasangan yang lembut, memberi rasa aman, dan mau mengungkapkan perasaan.',
      advice: 'Sampaikan apa yang kamu butuhkan dengan jelas. Pasangan yang baik ingin tahu, bukan menebak-nebak.'
    },
    match: [4, 6, 8],
    soul: 'Jauh di dalam hati, kamu ingin dicintai dan hidup damai bersama orang-orang yang kamu sayangi. Rasa diterima lebih penting bagimu daripada harta.',
    persona: 'Orang melihatmu sebagai pribadi yang ramah, lembut, dan mudah diajak bicara. Kamu terlihat tidak mengancam, sehingga orang cepat percaya.',
    birthday: 'Tanggal lahirmu memberi kepekaan tinggi dan bakat sebagai penengah.'
  },
  3: {
    title: 'Sang Ekspresif',
    short: 'kreatif, ceria, dan pandai berkomunikasi',
    about: [
      'Kamu orangnya ekspresif. Kamu pandai bercerita, gampang membuat orang tertawa, dan kepalamu penuh ide. Di mana pun kamu berada, suasana jadi lebih hidup.',
      'Hidupmu mengajarkan cara menyalurkan bakat dengan tekun. Ide yang bagus baru bermakna kalau diselesaikan.'
    ],
    strengths: ['Pandai berkomunikasi', 'Kreatif', 'Ceria dan menular', 'Mudah bergaul', 'Optimis'],
    challenges: ['Cepat bosan', 'Banyak rencana berhenti di tengah jalan', 'Kurang teratur mengatur uang dan waktu'],
    career: {
      fields: ['Penulis, konten kreator, atau MC', 'Guru dan pelatih', 'Desain, fotografi, dan seni', 'Marketing dan media sosial', 'Kuliner dan acara (event)', 'Hubungan masyarakat (PR)'],
      style: 'Kamu bersinar di pekerjaan yang memberi ruang untuk berekspresi dan bertemu orang. Pekerjaan yang monoton akan memadamkan semangatmu.',
      money: 'Rezekimu datang dari bakat bicara dan berkarya. Tantangannya: uang cepat masuk, cepat keluar. Biasakan menyisihkan di awal, bukan di akhir.'
    },
    love: {
      pattern: 'Kamu menyenangkan sebagai pasangan: hangat, lucu, dan penuh kejutan. Tapi kamu bisa cepat bosan kalau hubungan terasa datar.',
      needs: 'Pasangan yang bisa diajak tertawa, mendukung kreativitasmu, dan tidak terlalu mengekang.',
      advice: 'Saat hubungan terasa biasa saja, jangan langsung menjauh. Ciptakan suasana baru bersama-sama.'
    },
    match: [1, 5, 9],
    soul: 'Jauh di dalam hati, kamu ingin didengar dan dihargai karena karyamu. Kamu ingin hidup yang penuh warna, bukan hanya rutinitas.',
    persona: 'Orang melihatmu sebagai pribadi yang ceria, menarik, dan menyenangkan diajak ngobrol.',
    birthday: 'Tanggal lahirmu memberi bakat bicara dan berkarya yang menyenangkan hati orang.'
  },
  4: {
    title: 'Sang Pembangun',
    short: 'tekun, teratur, dan bisa diandalkan',
    about: [
      'Kamu orang yang bisa diandalkan. Kamu suka hal yang jelas, rapi, dan bertahap. Kalau sudah berjanji, kamu tepati. Kalau sudah mulai, kamu selesaikan.',
      'Hidupmu mengajarkan bahwa hasil besar datang dari langkah kecil yang konsisten, dan bahwa sesekali kamu boleh santai.'
    ],
    strengths: ['Tekun', 'Disiplin', 'Jujur dan bisa dipercaya', 'Praktis', 'Teratur'],
    challenges: ['Terlalu kaku', 'Cemas kalau rencana berubah', 'Sulit menikmati waktu santai'],
    career: {
      fields: ['Akuntansi dan keuangan', 'Teknik, bangunan, atau properti', 'Administrasi dan manajemen', 'IT dan sistem', 'Hukum', 'Usaha yang butuh ketelitian (produksi, logistik)'],
      style: 'Kamu paling nyaman di pekerjaan dengan aturan dan target yang jelas. Kamu adalah orang yang membuat sistem berjalan.',
      money: 'Rezekimu tumbuh pelan tapi pasti. Kamu cocok menabung dan berinvestasi jangka panjang. Jangan tergiur cara cepat kaya.'
    },
    love: {
      pattern: 'Kamu setia dan serius. Kamu menunjukkan cinta lewat tindakan nyata, bukan kata-kata manis.',
      needs: 'Pasangan yang stabil, jujur, dan bisa diajak membangun masa depan.',
      advice: 'Sesekali ungkapkan perasaanmu dengan kata-kata. Pasanganmu juga butuh mendengarnya.'
    },
    match: [2, 6, 8],
    soul: 'Jauh di dalam hati, kamu ingin rasa aman: rumah yang tenang, keuangan yang stabil, dan hidup yang tertata.',
    persona: 'Orang melihatmu sebagai pribadi yang serius, rapi, dan dapat dipercaya.',
    birthday: 'Tanggal lahirmu memberi ketekunan dan kemampuan mengatur hal-hal rumit menjadi rapi.'
  },
  5: {
    title: 'Sang Petualang',
    short: 'bebas, luwes, dan suka hal baru',
    about: [
      'Kamu butuh kebebasan dan suka hal baru. Kamu cepat menyesuaikan diri, berani mencoba, dan punya banyak pengalaman dibanding orang seusiamu.',
      'Hidupmu mengajarkan cara memakai kebebasan dengan bijak, supaya perubahan membawamu maju, bukan sekadar berpindah-pindah.'
    ],
    strengths: ['Luwes', 'Berani mencoba', 'Mudah bergaul', 'Cepat belajar', 'Pandai membujuk'],
    challenges: ['Mudah gelisah', 'Kurang sabar menunggu hasil', 'Tergoda kesenangan sesaat'],
    career: {
      fields: ['Penjualan dan pemasaran', 'Pariwisata dan perjalanan', 'Media, jurnalisme, dan konten', 'Usaha dagang / online shop', 'Event dan hiburan', 'Pekerjaan lapangan yang dinamis'],
      style: 'Kamu bersinar di pekerjaan yang bervariasi dan banyak bertemu orang. Kantor yang kaku dan rutin akan membuatmu cepat jenuh.',
      money: 'Rezekimu datang dari banyak pintu, tapi juga mudah keluar. Pisahkan rekening untuk tabungan supaya tidak terpakai.'
    },
    love: {
      pattern: 'Kamu menarik dan penuh semangat. Kamu butuh hubungan yang terasa hidup, dan bisa merasa terkekang kalau pasangan terlalu posesif.',
      needs: 'Pasangan yang memberi ruang, suka diajak jalan-jalan, dan bisa dipercaya.',
      advice: 'Kebebasan dan komitmen bisa berjalan bersama. Bicarakan kebutuhan ruangmu dengan terbuka.'
    },
    match: [1, 3, 7],
    soul: 'Jauh di dalam hati, kamu ingin merasakan hidup sepenuhnya: tempat baru, orang baru, pengalaman baru.',
    persona: 'Orang melihatmu sebagai pribadi yang seru, energik, dan mudah akrab.',
    birthday: 'Tanggal lahirmu memberi keluwesan dan keberanian menghadapi perubahan.'
  },
  6: {
    title: 'Sang Pengasuh',
    short: 'penyayang, setia, dan bertanggung jawab',
    about: [
      'Kamu penyayang dan bertanggung jawab. Keluarga dan teman dekat sering datang padamu saat butuh tempat bersandar. Kamu senang membuat orang lain merasa diperhatikan.',
      'Hidupmu mengajarkan cara mencintai dengan seimbang: merawat orang lain tanpa melupakan dirimu sendiri.'
    ],
    strengths: ['Penuh perhatian', 'Setia', 'Pandai merawat', 'Bertanggung jawab', 'Punya selera yang indah'],
    challenges: ['Lupa mengurus diri sendiri', 'Ikut campur karena terlalu peduli', 'Diam-diam merasa kurang dihargai'],
    career: {
      fields: ['Guru dan pendidik', 'Kesehatan dan perawatan', 'Kuliner, katering, atau kafe', 'Kecantikan, desain interior, atau fesyen', 'Konseling dan sosial', 'Usaha keluarga'],
      style: 'Kamu bekerja paling baik saat merasa pekerjaanmu berguna bagi orang lain. Lingkungan kerja yang hangat seperti keluarga sangat cocok untukmu.',
      money: 'Rezekimu datang lewat pelayanan yang tulus. Tantangannya: kamu sering memberi harga terlalu murah atau menggratiskan. Hargai keahlianmu.'
    },
    love: {
      pattern: 'Kamu pasangan yang setia dan sangat peduli. Kamu senang merawat, tapi bisa kecewa kalau perhatianmu tidak dibalas.',
      needs: 'Pasangan yang menghargai perhatianmu dan mau ikut bertanggung jawab atas rumah tangga.',
      advice: 'Biarkan dirimu juga dirawat. Menerima itu sama pentingnya dengan memberi.'
    },
    match: [2, 4, 9],
    soul: 'Jauh di dalam hati, kamu ingin keluarga yang rukun dan rumah yang penuh kasih.',
    persona: 'Orang melihatmu sebagai pribadi yang hangat, keibuan atau kebapakan, dan bisa diandalkan.',
    birthday: 'Tanggal lahirmu memberi bakat merawat dan menciptakan suasana yang nyaman.'
  },
  7: {
    title: 'Sang Pencari',
    short: 'pemikir dalam yang mencari kebenaran',
    about: [
      'Kamu pemikir yang dalam. Kamu tidak puas dengan jawaban yang dangkal dan selalu ingin tahu "kenapa". Kamu butuh waktu sendiri untuk mengisi ulang tenaga.',
      'Hidupmu mengajarkan cara memadukan pikiran dan iman: percaya pada intuisimu sendiri, sambil tetap membuka diri pada orang lain.'
    ],
    strengths: ['Analitis', 'Intuitif', 'Tenang dan teliti', 'Bijak', 'Suka belajar'],
    challenges: ['Memendam perasaan', 'Sulit percaya orang', 'Terlalu banyak berpikir'],
    career: {
      fields: ['Peneliti dan analis', 'IT dan data', 'Penulis dan editor', 'Dosen atau pengajar ahli', 'Bidang spiritual dan konseling', 'Spesialis (dokter, apoteker, teknisi ahli)'],
      style: 'Kamu bekerja paling baik dengan ketenangan dan waktu untuk berpikir. Kamu dihargai karena keahlianmu yang dalam.',
      money: 'Rezekimu datang dari keahlian khusus. Semakin dalam ilmumu, semakin tinggi nilaimu. Jangan ragu memasang harga sesuai keahlian.'
    },
    love: {
      pattern: 'Kamu butuh waktu untuk membuka hati. Setelah percaya, kamu sangat setia dan dalam.',
      needs: 'Pasangan yang menghargai waktu sendirimu dan bisa diajak bicara hal-hal yang dalam.',
      advice: 'Ceritakan apa yang kamu pikirkan. Pasanganmu tidak bisa membaca pikiranmu.'
    },
    match: [4, 5, 9],
    soul: 'Jauh di dalam hati, kamu ingin memahami makna hidup dan menemukan kedamaian batin.',
    persona: 'Orang melihatmu sebagai pribadi yang tenang, misterius, dan agak sulit didekati di awal. Setelah akrab, mereka baru tahu kamu hangat dan lucu.',
    birthday: 'Tanggal lahirmu memberi intuisi tajam dan kemampuan melihat yang tersembunyi.'
  },
  8: {
    title: 'Sang Penguasa',
    short: 'tegas, ambisius, dan pandai mengatur',
    about: [
      'Kamu punya mental pengusaha. Kamu fokus pada hasil, kuat menghadapi tekanan, dan berbakat mengatur uang serta orang.',
      'Hidupmu mengajarkan cara memakai kekuatan dan uang dengan bijak, supaya keberhasilanmu juga membawa kebaikan bagi orang lain.'
    ],
    strengths: ['Ambisius', 'Tegas', 'Pandai mengatur', 'Tahan banting', 'Berpikir besar'],
    challenges: ['Terlalu fokus pada kerja dan uang', 'Sulit menunjukkan kelembutan', 'Ingin mengendalikan segalanya'],
    career: {
      fields: ['Pengusaha dan pemilik bisnis', 'Manajer dan direktur', 'Keuangan, perbankan, dan investasi', 'Properti', 'Hukum', 'Konsultan bisnis'],
      style: 'Kamu cocok memegang posisi pengambil keputusan. Kamu bersinar saat diberi target besar dan wewenang penuh.',
      money: 'Kamu punya bakat mendatangkan uang dalam jumlah besar. Kuncinya: jujur dan adil. Rezeki 8 yang diperoleh dengan curang cepat hilang.'
    },
    love: {
      pattern: 'Kamu pelindung dan penyedia. Kamu menunjukkan cinta dengan memastikan pasanganmu tercukupi, tapi bisa lupa memberi waktu dan perhatian.',
      needs: 'Pasangan yang kuat, mendukung ambisimu, dan bisa mengingatkanmu untuk istirahat.',
      advice: 'Kehadiranmu lebih berharga daripada hadiah. Sisihkan waktu khusus untuk pasangan.'
    },
    match: [2, 4, 6],
    soul: 'Jauh di dalam hati, kamu ingin mandiri secara keuangan, dihormati, dan dihargai atas hasil kerjamu.',
    persona: 'Orang melihatmu sebagai pribadi yang berwibawa, sukses, dan kuat.',
    birthday: 'Tanggal lahirmu memberi bakat bisnis dan kemampuan mengelola sumber daya.'
  },
  9: {
    title: 'Sang Humanis',
    short: 'berhati besar dan suka menolong',
    about: [
      'Kamu berhati besar. Kamu mudah iba, suka menolong, dan ingin hidupmu berguna bagi banyak orang. Wawasanmu luas dan kamu mudah memahami orang dari latar belakang apa pun.',
      'Hidupmu mengajarkan cara melepaskan: memaafkan masa lalu dan memberi tanpa berharap balasan.'
    ],
    strengths: ['Murah hati', 'Bijak', 'Berwawasan luas', 'Penuh empati', 'Kreatif'],
    challenges: ['Sulit melepaskan masa lalu', 'Mudah kecewa pada orang lain', 'Lupa batas diri'],
    career: {
      fields: ['Bidang sosial dan yayasan', 'Kesehatan', 'Pendidikan', 'Seni dan budaya', 'Hukum dan advokasi', 'Bisnis yang membawa dampak sosial'],
      style: 'Kamu paling semangat saat pekerjaanmu punya tujuan yang lebih besar dari sekadar uang.',
      money: 'Rezekimu mengalir saat kamu memberi. Tapi tetap pisahkan antara menolong dan menanggung hidup orang lain.'
    },
    love: {
      pattern: 'Kamu pasangan yang pengertian dan romantis. Tapi kamu bisa terjebak menunggu orang berubah.',
      needs: 'Pasangan yang punya nilai hidup sama dan mau tumbuh bersama.',
      advice: 'Cintai orang apa adanya hari ini, bukan versi yang kamu harapkan nanti.'
    },
    match: [3, 6, 7],
    soul: 'Jauh di dalam hati, kamu ingin dunia menjadi tempat yang lebih baik, dan ingin ikut berperan di dalamnya.',
    persona: 'Orang melihatmu sebagai pribadi yang anggun, bijak, dan mudah didekati.',
    birthday: 'Tanggal lahirmu memberi empati besar dan bakat menyentuh hati banyak orang.'
  },
  11: {
    title: 'Sang Pemberi Cahaya',
    short: 'intuitif dan menginspirasi',
    about: [
      'Kamu sangat intuitif. Kamu sering sudah "merasa" sesuatu sebelum terjadi. Kata-katamu bisa menyemangati banyak orang. Ini adalah Angka Master: angka istimewa dengan energi seperti angka 2, tapi lebih kuat.',
      'Hidupmu mengajarkan cara memercayai suara hatimu dan berani berbagi cahayamu, walaupun kadang kamu merasa berbeda dari orang lain.'
    ],
    strengths: ['Intuisi kuat', 'Menginspirasi', 'Sangat peka', 'Visioner', 'Spiritual'],
    challenges: ['Mudah cemas dan kewalahan', 'Ragu pada diri sendiri', 'Ekspektasi terlalu tinggi'],
    career: {
      fields: ['Pembicara dan motivator', 'Konselor dan terapis', 'Seni dan musik', 'Pendidikan', 'Bidang spiritual', 'Penulis'],
      style: 'Kamu bersinar saat bisa membimbing dan menyemangati orang lain.',
      money: 'Rezekimu datang saat kamu berani tampil dan berbagi. Jangan menunda karena merasa "belum siap".'
    },
    love: {
      pattern: 'Kamu mencari hubungan jiwa yang dalam, bukan sekadar status. Kamu sangat peka pada suasana hati pasangan.',
      needs: 'Pasangan yang tenang, sabar, dan menghargai sisi spiritualmu.',
      advice: 'Jangan menyerap semua emosi pasangan. Jaga energimu sendiri.'
    },
    match: [2, 4, 22],
    soul: 'Jauh di dalam hati, kamu ingin hidup yang bermakna dan menjadi cahaya bagi orang lain.',
    persona: 'Orang melihatmu sebagai pribadi yang lembut tapi berkarisma, dan berbeda dari kebanyakan orang.',
    birthday: 'Tanggal lahirmu (Angka Master 11) memberi intuisi tajam dan kemampuan menginspirasi.'
  },
  22: {
    title: 'Sang Arsitek Agung',
    short: 'visioner yang mampu mewujudkan mimpi besar',
    about: [
      'Kamu punya mimpi besar sekaligus kemampuan untuk mewujudkannya. Kamu bisa melihat gambaran besar dan menyusun langkah-langkahnya. Ini adalah Angka Master: angka istimewa dengan energi seperti angka 4, tapi lebih kuat.',
      'Hidupmu mengajarkan cara membangun sesuatu yang bertahan lama dan berguna bagi banyak orang, satu langkah demi satu langkah.'
    ],
    strengths: ['Visioner', 'Praktis', 'Pekerja keras', 'Pandai memimpin proyek besar', 'Bisa dipercaya'],
    challenges: ['Standar terlalu tinggi', 'Mudah merasa "belum cukup"', 'Memikul beban sendirian'],
    career: {
      fields: ['Pengusaha skala besar', 'Arsitek dan teknik', 'Manajemen proyek', 'Pemerintahan dan organisasi', 'Properti', 'Pendiri lembaga atau yayasan'],
      style: 'Kamu bersinar saat memimpin proyek besar yang punya dampak nyata.',
      money: 'Kamu bisa membangun kekayaan yang bertahan lintas generasi asal sabar dan terencana.'
    },
    love: {
      pattern: 'Kamu pasangan yang setia dan serius membangun masa depan, tapi bisa terlalu sibuk dengan tanggung jawab.',
      needs: 'Pasangan yang mendukung visimu dan mengingatkanmu untuk menikmati hidup.',
      advice: 'Libatkan pasangan dalam mimpimu, jangan hanya dalam hasilnya.'
    },
    match: [4, 6, 11],
    soul: 'Jauh di dalam hati, kamu ingin meninggalkan warisan: sesuatu yang tetap berguna setelah kamu tiada.',
    persona: 'Orang melihatmu sebagai pribadi yang matang, kuat, dan bisa diandalkan.',
    birthday: 'Tanggal lahirmu (Angka Master 22) memberi kemampuan mewujudkan hal besar asal dikerjakan bertahap. Tantangannya ada di standar diri yang sangat tinggi.'
  },
  33: {
    title: 'Sang Guru Kasih',
    short: 'penyembuh dan pengajar yang penuh kasih',
    about: [
      'Kamu terlahir sebagai penyembuh dan pengajar. Kehadiranmu menenangkan, dan orang merasa diterima saat di dekatmu. Ini adalah Angka Master: angka istimewa dengan energi seperti angka 6, tapi lebih kuat.',
      'Hidupmu mengajarkan cara mengasihi tanpa kehilangan diri sendiri.'
    ],
    strengths: ['Welas asih', 'Mengayomi', 'Bijak', 'Kreatif', 'Menyembuhkan'],
    challenges: ['Memikul beban orang lain', 'Sulit menerima bantuan', 'Merasa bertanggung jawab atas semua orang'],
    career: {
      fields: ['Guru dan dosen', 'Kesehatan dan terapi', 'Konseling', 'Seni', 'Pelayanan sosial dan keagamaan', 'Pengasuhan anak'],
      style: 'Kamu bersinar saat bisa mengajar dan menyembuhkan.',
      money: 'Rezekimu datang lewat ketulusan. Tetap pasang harga yang layak untuk ilmumu.'
    },
    love: {
      pattern: 'Kamu memberi cinta tanpa syarat, tapi bisa terjebak menjadi "penyelamat" bagi pasangan.',
      needs: 'Pasangan yang dewasa dan bisa saling merawat.',
      advice: 'Pilih pasangan untuk berjalan bersama, bukan untuk diselamatkan.'
    },
    match: [6, 9, 22],
    soul: 'Jauh di dalam hati, kamu ingin semua orang yang kamu sayangi bahagia dan utuh.',
    persona: 'Orang melihatmu sebagai pribadi yang hangat, bijak, dan penuh kasih.',
    birthday: 'Tanggal lahirmu memberi bakat menyembuhkan dan mengajar.'
  }
};

/* Tahun Pribadi 1–9: tema satu tahun. */
const YEARS = {
  1: { theme: 'Awal Baru', text: 'Tahun untuk memulai. Pintu baru terbuka, dan apa yang kamu tanam tahun ini akan tumbuh selama 9 tahun ke depan.', do: ['Mulai proyek atau kebiasaan baru', 'Ambil keputusan yang selama ini ditunda', 'Percaya pada dirimu sendiri'], avoid: 'Menunggu terlalu lama sampai semuanya "sempurna".' },
  2: { theme: 'Kesabaran dan Kerja Sama', text: 'Tahun yang lebih pelan. Benih dari tahun lalu sedang tumbuh di bawah tanah. Fokus pada hubungan dan kerja sama.', do: ['Perkuat hubungan dan kemitraan', 'Bersabar dengan hasil', 'Dengarkan perasaanmu'], avoid: 'Memaksakan sesuatu terjadi lebih cepat.' },
  3: { theme: 'Berekspresi dan Bersosialisasi', text: 'Tahun yang lebih ringan dan menyenangkan. Waktunya tampil, berkarya, dan memperluas pergaulan.', do: ['Tunjukkan karyamu', 'Perluas pertemanan', 'Nikmati hidup'], avoid: 'Menghamburkan energi dan uang ke terlalu banyak hal.' },
  4: { theme: 'Membangun Fondasi', text: 'Tahun kerja keras. Waktunya merapikan keuangan, kesehatan, dan rencana. Hasilnya akan terasa beberapa tahun lagi.', do: ['Rapikan keuangan', 'Bangun rutinitas sehat', 'Selesaikan yang tertunda'], avoid: 'Mencari jalan pintas.' },
  5: { theme: 'Perubahan dan Kebebasan', text: 'Tahun yang dinamis. Akan ada perubahan, perjalanan, atau kesempatan tak terduga.', do: ['Terbuka pada perubahan', 'Coba hal baru', 'Bepergian'], avoid: 'Keputusan impulsif yang belum dipikirkan matang.' },
  6: { theme: 'Keluarga dan Tanggung Jawab', text: 'Tahun yang berpusat pada rumah, keluarga, dan hubungan. Cocok untuk menikah, pindah rumah, atau memperbaiki hubungan.', do: ['Perhatikan keluarga', 'Perbaiki hubungan yang renggang', 'Rawat rumah dan dirimu'], avoid: 'Memikul tanggung jawab orang lain sendirian.' },
  7: { theme: 'Menepi dan Mendalami', text: 'Tahun untuk mengendapkan diri, bukan ngebut. Cocok untuk belajar, memperdalam keahlian, merawat kesehatan, dan merenungkan arah hidup.', do: ['Belajar atau ambil kursus', 'Jaga kesehatan dan istirahat', 'Luangkan waktu hening'], avoid: 'Keputusan besar yang terburu-buru. Siapkan matang dulu.' },
  8: { theme: 'Panen dan Rezeki', text: 'Tahun hasil. Kerja keras beberapa tahun terakhir mulai berbuah, terutama soal karier dan keuangan.', do: ['Ambil peluang karier dan bisnis', 'Minta kenaikan atau pasang harga yang layak', 'Kelola uang dengan bijak'], avoid: 'Sombong atau boros saat rezeki datang.' },
  9: { theme: 'Menutup dan Melepaskan', text: 'Tahun penutup siklus. Waktunya membereskan dan melepaskan yang sudah tidak cocok, supaya siap untuk awal baru.', do: ['Selesaikan urusan lama', 'Maafkan dan lepaskan', 'Bersihkan barang dan kebiasaan lama'], avoid: 'Memulai komitmen besar yang baru.' }
};

/* Zodiak (rasi matahari). [nama, bulan akhir, tanggal akhir, sifat] */
const ZODIAC = [
  ['Capricorn', 1, 19, 'tekun, ambisius, dan bertanggung jawab'],
  ['Aquarius', 2, 18, 'mandiri, unik, dan berpikiran maju'],
  ['Pisces', 3, 20, 'lembut, intuitif, penuh empati, dan imajinatif'],
  ['Aries', 4, 19, 'berani, bersemangat, dan suka memimpin'],
  ['Taurus', 5, 20, 'setia, sabar, dan menyukai kenyamanan'],
  ['Gemini', 6, 20, 'cerdas, komunikatif, dan serba bisa'],
  ['Cancer', 7, 22, 'penyayang, protektif, dan setia pada keluarga'],
  ['Leo', 8, 22, 'percaya diri, murah hati, dan berkarisma'],
  ['Virgo', 9, 22, 'teliti, rapi, dan senang membantu'],
  ['Libra', 10, 22, 'adil, ramah, dan mencintai keindahan'],
  ['Scorpio', 11, 21, 'tekun, dalam, dan penuh gairah'],
  ['Sagittarius', 12, 21, 'optimis, suka petualangan, dan jujur'],
  ['Capricorn', 12, 31, 'tekun, ambisius, dan bertanggung jawab']
];

/* Weton Jawa */
const HARI = [['Minggu', 5], ['Senin', 4], ['Selasa', 3], ['Rabu', 7], ['Kamis', 8], ['Jumat', 6], ['Sabtu', 9]];
const PASARAN = [['Legi', 5], ['Pahing', 9], ['Pon', 7], ['Wage', 4], ['Kliwon', 8]];

module.exports = { NUMBERS, YEARS, ZODIAC, HARI, PASARAN };
