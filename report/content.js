/* =========================================================
   ISI LAPORAN NUMEROLOGI
   Nada: ngobrol santai, blak-blakan, tapi tetap berguna dan hangat.
   Setiap angka (1–9, 11, 22, 33) punya teks untuk semua bab laporan.

   Catatan untuk scripts/make-report.js (jangan diubah bentuknya):
   - soul selalu diawali "Jauh di dalam hati, kamu …"
   - short dipakai setelah "Aku …" dan "Kamu adalah sang X (…)"
   - strengths & challenges dipakai di tengah kalimat (huruf kecil)
   ========================================================= */
'use strict';

const NUMBERS = {
  1: {
    title: 'Sang Pemimpin',
    short: 'berani mulai duluan dan buka jalan',
    about: [
      'Kamu tipe yang nggak betah nunggu. Orang lain masih mikir, kamu udah jalan. Kamu pengin berdiri di kaki sendiri dan buktiin kalau kamu bisa, tanpa harus disuruh-suruh.',
      'Pelajaran hidupmu cuma satu, tapi berat: percaya sama diri sendiri. Makin sering kamu ambil keputusan sendiri, makin hidupmu terasa "ini gue banget".'
    ],
    strengths: ['Berani ambil keputusan', 'Mandiri', 'Banyak ide baru', 'Nggak gampang nyerah', 'Bisa ngegerakin orang lain'],
    challenges: ['Ngerasa harus ngurus semuanya sendiri', 'Gampang kesel sama orang yang lelet', 'Gengsi minta tolong'],
    career: {
      fields: ['Punya usaha sendiri', 'Manajer atau kepala tim', 'Sales dan marketing', 'Konsultan', 'Kerja kreatif yang bebas', 'Pembuka proyek baru'],
      style: 'Kasih kamu kebebasan dan tanggung jawab penuh, kamu bakal ngebut. Diatur-atur terus? Cepet bosen, cepet cabut.',
      money: 'Rezekimu kebuka pas kamu berani bikin sesuatu atas namamu sendiri. Yang perlu diwaspadai: keputusan duit yang diambil karena gengsi.'
    },
    love: {
      pattern: 'Di hubungan, kamu suka jadi yang mimpin dan ngelindungin. Kamu kepincut orang yang punya pendirian, tapi siap-siap ribut kalau dua-duanya sama-sama keras kepala.',
      needs: 'Pasangan yang ngehargain kemandirianmu dan nggak ngekang.',
      advice: 'Dengerin dulu, baru putusin. Tunjukin sisi lembutmu. Itu bukan tanda lemah, justru itu yang bikin orang betah.'
    },
    match: [3, 5, 6],
    soul: 'Jauh di dalam hati, kamu pengin diakui sebagai orang yang mampu dan mandiri. Kamu pengin hidup pakai caramu sendiri, bukan aturan orang.',
    persona: 'Orang ngeliat kamu pede, tegas, dan tahu maunya apa. Kadang kamu keliatan susah didekati, padahal kamu cuma lagi fokus.',
    birthday: 'Tanggal lahirmu ngasih bakat buat mulai hal baru dan tetap berdiri walau lagi sendirian.'
  },
  2: {
    title: 'Sang Pendamai',
    short: 'peka, sabar, dan jago nyatuin orang',
    about: [
      'Kamu peka banget. Suasana lagi nggak enak dikit, kamu langsung ngerasa, dan otomatis berusaha nenangin. Banyak orang nyaman curhat ke kamu, kadang sampai kamu sendiri capek.',
      'Pelajaran hidupmu: jagain perasaan orang boleh, tapi jangan sampai perasaanmu sendiri dilupain.'
    ],
    strengths: ['Pendengar yang enak', 'Sabar', 'Jago jaga hubungan', 'Teliti sama detail', 'Bisa kerja bareng siapa aja'],
    challenges: ['Susah bilang "nggak"', 'Gampang baper', 'Kelamaan ragu sebelum mutusin sesuatu'],
    career: {
      fields: ['Konselor atau psikolog', 'HRD', 'Asisten atau sekretaris eksekutif', 'Customer service', 'Mediator atau negosiator', 'Seni, musik, dan desain'],
      style: 'Kamu paling jalan di tim yang akur dan suasana yang adem. Kamu itu "lem" yang bikin tim nggak bubar.',
      money: 'Rezekimu datang lewat kerja sama dan partner. Tapi stop minjemin duit cuma karena nggak enak nolak.'
    },
    love: {
      pattern: 'Kamu romantis dan setia banget. Rela ngalah demi hubungan, kadang kebablasan sampai kebutuhanmu sendiri nggak keurus.',
      needs: 'Pasangan yang lembut, bikin kamu ngerasa aman, dan mau ngomongin perasaan.',
      advice: 'Bilang aja apa yang kamu butuhin. Pasangan yang baik pengin tahu, bukan main tebak-tebakan.'
    },
    match: [4, 6, 8],
    soul: 'Jauh di dalam hati, kamu pengin disayang dan hidup damai bareng orang-orang yang kamu sayangi. Buatmu, diterima apa adanya lebih penting daripada harta.',
    persona: 'Orang ngeliat kamu ramah, kalem, dan enak diajak ngobrol. Kamu nggak keliatan "mengancam", makanya orang cepet percaya.',
    birthday: 'Tanggal lahirmu ngasih kepekaan tinggi dan bakat jadi penengah.'
  },
  3: {
    title: 'Sang Ekspresif',
    short: 'kreatif, ceria, dan jago ngomong',
    about: [
      'Kamu tipe yang hidupin suasana. Jago cerita, gampang bikin orang ketawa, dan kepalamu nggak pernah kehabisan ide. Ada kamu, tongkrongan jadi rame.',
      'Pelajaran hidupmu: bakat doang nggak cukup. Ide sebagus apa pun nggak ada artinya kalau nggak diselesaiin.'
    ],
    strengths: ['Jago komunikasi', 'Kreatif', 'Ceria dan nular', 'Gampang bergaul', 'Optimis'],
    challenges: ['Cepet bosen', 'Banyak rencana mandek di tengah jalan', 'Kurang rapi ngatur duit dan waktu'],
    career: {
      fields: ['Penulis, konten kreator, atau MC', 'Guru dan trainer', 'Desain, fotografi, dan seni', 'Marketing dan media sosial', 'Kuliner dan event', 'Public relations (PR)'],
      style: 'Kamu bersinar di kerjaan yang ngasih ruang buat berekspresi dan ketemu orang. Kerjaan monoton? Semangatmu langsung padam.',
      money: 'Rezekimu datang dari mulut dan karya. Masalahnya: cepet masuk, cepet keluar. Sisihin di awal, jangan nunggu sisa.'
    },
    love: {
      pattern: 'Kamu pasangan yang seru: hangat, lucu, penuh kejutan. Tapi kalau hubungannya mulai datar, kamu gampang bosen.',
      needs: 'Pasangan yang bisa diajak ketawa, dukung kreativitasmu, dan nggak ngekang.',
      advice: 'Lagi berasa hambar? Jangan langsung kabur. Bikin suasana baru bareng-bareng.'
    },
    match: [1, 5, 9],
    soul: 'Jauh di dalam hati, kamu pengin didengar dan dihargai karena karyamu. Kamu pengin hidup yang berwarna, bukan cuma rutinitas.',
    persona: 'Orang ngeliat kamu ceria, menarik, dan asyik diajak ngobrol.',
    birthday: 'Tanggal lahirmu ngasih bakat ngomong dan berkarya yang bikin orang seneng.'
  },
  4: {
    title: 'Sang Pembangun',
    short: 'tekun, rapi, dan bisa diandelin',
    about: [
      'Kamu orang yang bisa diandelin. Kamu suka yang jelas, rapi, dan step by step. Kalau udah janji, ditepati. Kalau udah mulai, diselesaiin.',
      'Pelajaran hidupmu: hasil besar datang dari langkah kecil yang konsisten. Dan sesekali, kamu boleh kok santai.'
    ],
    strengths: ['Tekun', 'Disiplin', 'Jujur dan bisa dipercaya', 'Praktis', 'Rapi'],
    challenges: ['Terlalu kaku', 'Panik kalau rencana berubah', 'Susah nikmatin waktu santai'],
    career: {
      fields: ['Akuntansi dan keuangan', 'Teknik, bangunan, atau properti', 'Administrasi dan manajemen', 'IT dan sistem', 'Hukum', 'Usaha yang butuh ketelitian (produksi, logistik)'],
      style: 'Kamu paling nyaman di kerjaan yang aturan dan targetnya jelas. Kamu orang yang bikin sistem jalan.',
      money: 'Rezekimu tumbuh pelan tapi pasti. Cocok nabung dan investasi jangka panjang. Skema cepet kaya? Skip.'
    },
    love: {
      pattern: 'Kamu setia dan serius. Kamu nunjukin sayang lewat tindakan nyata, bukan gombalan.',
      needs: 'Pasangan yang stabil, jujur, dan bisa diajak bangun masa depan.',
      advice: 'Sesekali ngomong juga perasaanmu. Pasanganmu juga butuh denger, bukan cuma ngerasain.'
    },
    match: [2, 6, 8],
    soul: 'Jauh di dalam hati, kamu pengin rasa aman: rumah yang tenang, duit yang stabil, hidup yang tertata.',
    persona: 'Orang ngeliat kamu serius, rapi, dan bisa dipercaya.',
    birthday: 'Tanggal lahirmu ngasih ketekunan dan kemampuan bikin hal ribet jadi rapi.'
  },
  5: {
    title: 'Sang Petualang',
    short: 'bebas, luwes, dan doyan hal baru',
    about: [
      'Kamu butuh kebebasan dan doyan hal baru. Cepet adaptasi, berani nyoba, dan pengalamanmu biasanya lebih banyak dari teman seumuran.',
      'Pelajaran hidupmu: kebebasan itu harus dipakai dengan bijak, biar perubahan bikin kamu maju, bukan cuma pindah-pindah.'
    ],
    strengths: ['Luwes', 'Berani nyoba', 'Gampang bergaul', 'Cepet belajar', 'Jago ngebujuk'],
    challenges: ['Gampang gelisah', 'Nggak sabar nunggu hasil', 'Gampang kegoda kesenangan sesaat'],
    career: {
      fields: ['Sales dan marketing', 'Pariwisata dan travel', 'Media, jurnalistik, dan konten', 'Dagang atau online shop', 'Event dan hiburan', 'Kerja lapangan yang dinamis'],
      style: 'Kamu hidup di kerjaan yang variatif dan banyak ketemu orang. Kantor kaku dan rutin? Cepet jenuh.',
      money: 'Rezekimu datang dari banyak pintu, tapi juga gampang bocor. Pisahin rekening tabungan biar nggak kepake.'
    },
    love: {
      pattern: 'Kamu menarik dan penuh semangat. Kamu butuh hubungan yang hidup, dan bisa ngerasa sesak kalau pasangan terlalu posesif.',
      needs: 'Pasangan yang ngasih ruang, doyan diajak jalan, dan bisa dipercaya.',
      advice: 'Bebas dan komitmen itu bisa jalan bareng kok. Omongin kebutuhan ruangmu terang-terangan.'
    },
    match: [1, 3, 7],
    soul: 'Jauh di dalam hati, kamu pengin ngerasain hidup sepenuhnya: tempat baru, orang baru, pengalaman baru.',
    persona: 'Orang ngeliat kamu seru, energik, dan gampang akrab.',
    birthday: 'Tanggal lahirmu ngasih keluwesan dan keberanian ngadepin perubahan.'
  },
  6: {
    title: 'Sang Pengasuh',
    short: 'penyayang, setia, dan bertanggung jawab',
    about: [
      'Kamu penyayang dan bertanggung jawab. Keluarga dan teman dekat sering lari ke kamu pas butuh sandaran. Kamu seneng bikin orang ngerasa diperhatiin.',
      'Pelajaran hidupmu: sayang sama orang lain boleh banget, asal kamu nggak lupa sayang sama diri sendiri.'
    ],
    strengths: ['Perhatian', 'Setia', 'Jago ngerawat', 'Bertanggung jawab', 'Punya selera bagus'],
    challenges: ['Lupa ngurus diri sendiri', 'Ikut campur karena terlalu peduli', 'Diam-diam ngerasa nggak dihargai'],
    career: {
      fields: ['Guru dan pendidik', 'Kesehatan dan perawatan', 'Kuliner, katering, atau kafe', 'Kecantikan, desain interior, atau fesyen', 'Konseling dan sosial', 'Usaha keluarga'],
      style: 'Kamu paling semangat kalau kerjaanmu kerasa berguna buat orang. Lingkungan kerja yang hangat kayak keluarga itu kamu banget.',
      money: 'Rezekimu datang lewat pelayanan yang tulus. Masalahnya: kamu sering pasang harga kemurahan, atau malah ngegratisin. Hargai keahlianmu.'
    },
    love: {
      pattern: 'Kamu pasangan yang setia dan peduli banget. Kamu seneng ngerawat, tapi bisa kecewa berat kalau perhatianmu nggak dibales.',
      needs: 'Pasangan yang ngehargain perhatianmu dan mau ikut tanggung jawab di rumah.',
      advice: 'Biarin dirimu juga dirawat. Nerima itu sama pentingnya dengan ngasih.'
    },
    match: [2, 4, 9],
    soul: 'Jauh di dalam hati, kamu pengin keluarga yang rukun dan rumah yang penuh sayang.',
    persona: 'Orang ngeliat kamu hangat, ngemong, dan bisa diandelin.',
    birthday: 'Tanggal lahirmu ngasih bakat ngerawat dan bikin suasana jadi nyaman.'
  },
  7: {
    title: 'Sang Pencari',
    short: 'pemikir dalam yang nyari kebenaran',
    about: [
      'Kamu pemikir yang dalem. Jawaban dangkal nggak bikin kamu puas, kamu selalu pengin tahu "kenapa". Dan kamu butuh waktu sendiri buat ngecas ulang.',
      'Pelajaran hidupmu: percaya sama intuisimu sendiri, tapi jangan sampai nutup diri dari orang lain.'
    ],
    strengths: ['Analitis', 'Intuitif', 'Tenang dan teliti', 'Bijak', 'Doyan belajar'],
    challenges: ['Mendem perasaan', 'Susah percaya orang', 'Overthinking'],
    career: {
      fields: ['Peneliti dan analis', 'IT dan data', 'Penulis dan editor', 'Dosen atau pengajar ahli', 'Bidang spiritual dan konseling', 'Spesialis (dokter, apoteker, teknisi ahli)'],
      style: 'Kamu kerja paling bagus kalau dikasih ketenangan dan waktu buat mikir. Kamu dihargai karena keahlianmu yang dalem.',
      money: 'Rezekimu datang dari keahlian khusus. Makin dalem ilmumu, makin mahal nilaimu. Jangan malu pasang harga sesuai keahlian.'
    },
    love: {
      pattern: 'Kamu butuh waktu buat buka hati. Tapi sekali percaya, kamu setia dan dalem banget.',
      needs: 'Pasangan yang ngehargain waktu sendirimu dan bisa diajak ngobrol hal-hal yang dalem.',
      advice: 'Ceritain apa yang lagi kamu pikirin. Pasanganmu bukan cenayang.'
    },
    match: [4, 5, 9],
    soul: 'Jauh di dalam hati, kamu pengin ngerti makna hidup dan nemu ketenangan batin.',
    persona: 'Orang ngeliat kamu tenang, misterius, dan agak susah didekati di awal. Setelah akrab, mereka baru sadar kamu hangat dan lucu.',
    birthday: 'Tanggal lahirmu ngasih intuisi tajam dan kemampuan ngeliat yang tersembunyi.'
  },
  8: {
    title: 'Sang Penguasa',
    short: 'tegas, ambisius, dan jago ngatur',
    about: [
      'Kamu punya mental pengusaha. Fokus ke hasil, kuat ditekan, dan berbakat ngatur duit dan orang.',
      'Pelajaran hidupmu: pakai kekuatan dan duit dengan bijak, biar suksesmu juga bawa kebaikan buat orang lain.'
    ],
    strengths: ['Ambisius', 'Tegas', 'Jago ngatur', 'Tahan banting', 'Mikir besar'],
    challenges: ['Terlalu fokus ke kerjaan dan duit', 'Susah nunjukin sisi lembut', 'Pengin ngontrol semuanya'],
    career: {
      fields: ['Pengusaha dan pemilik bisnis', 'Manajer dan direktur', 'Keuangan, perbankan, dan investasi', 'Properti', 'Hukum', 'Konsultan bisnis'],
      style: 'Kamu cocok pegang posisi pengambil keputusan. Kasih target besar dan wewenang penuh, kamu bakal bersinar.',
      money: 'Kamu punya bakat ngedatengin duit dalam jumlah besar. Kuncinya: jujur dan adil. Rezeki yang didapet dengan curang cepet ilangnya.'
    },
    love: {
      pattern: 'Kamu pelindung dan penyedia. Kamu nunjukin sayang dengan mastiin pasanganmu kecukupan, tapi sering lupa ngasih waktu dan perhatian.',
      needs: 'Pasangan yang kuat, dukung ambisimu, dan berani ngingetin kamu buat istirahat.',
      advice: 'Kehadiranmu lebih berharga daripada hadiah. Sisihin waktu khusus buat pasangan.'
    },
    match: [2, 4, 6],
    soul: 'Jauh di dalam hati, kamu pengin mandiri secara finansial, dihormati, dan dihargai atas hasil kerjamu.',
    persona: 'Orang ngeliat kamu berwibawa, sukses, dan kuat.',
    birthday: 'Tanggal lahirmu ngasih bakat bisnis dan kemampuan ngelola sumber daya.'
  },
  9: {
    title: 'Sang Humanis',
    short: 'berhati besar dan doyan nolong',
    about: [
      'Kamu berhati besar. Gampang iba, doyan nolong, dan pengin hidupmu berguna buat banyak orang. Wawasanmu luas, dan kamu gampang ngerti orang dari latar belakang apa pun.',
      'Pelajaran hidupmu: belajar ngelepasin. Maafin masa lalu, dan ngasih tanpa ngarep balesan.'
    ],
    strengths: ['Murah hati', 'Bijak', 'Wawasan luas', 'Empati tinggi', 'Kreatif'],
    challenges: ['Susah move on dari masa lalu', 'Gampang kecewa sama orang', 'Lupa batas diri'],
    career: {
      fields: ['Bidang sosial dan yayasan', 'Kesehatan', 'Pendidikan', 'Seni dan budaya', 'Hukum dan advokasi', 'Bisnis yang punya dampak sosial'],
      style: 'Kamu paling semangat kalau kerjaanmu punya tujuan yang lebih besar dari sekadar duit.',
      money: 'Rezekimu ngalir pas kamu ngasih. Tapi bedain antara nolong sama nanggung hidup orang.'
    },
    love: {
      pattern: 'Kamu pasangan yang pengertian dan romantis. Tapi kamu bisa kejebak nungguin orang berubah.',
      needs: 'Pasangan yang punya nilai hidup sama dan mau tumbuh bareng.',
      advice: 'Sayangi orang apa adanya hari ini, bukan versi yang kamu harapin nanti.'
    },
    match: [3, 6, 7],
    soul: 'Jauh di dalam hati, kamu pengin dunia jadi tempat yang lebih baik, dan pengin ikut andil di dalamnya.',
    persona: 'Orang ngeliat kamu anggun, bijak, dan gampang didekati.',
    birthday: 'Tanggal lahirmu ngasih empati besar dan bakat nyentuh hati banyak orang.'
  },
  11: {
    title: 'Sang Pemberi Cahaya',
    short: 'intuitif dan bikin orang semangat',
    about: [
      'Intuisimu tajem banget. Kamu sering udah "ngerasa" sesuatu sebelum kejadian, dan omonganmu bisa bikin banyak orang semangat lagi. Ini Angka Master: angka istimewa dengan energi kayak angka 2, tapi jauh lebih kuat.',
      'Pelajaran hidupmu: percaya sama suara hatimu dan berani berbagi cahayamu, walau kadang kamu ngerasa beda sendiri.'
    ],
    strengths: ['Intuisi kuat', 'Inspiratif', 'Peka banget', 'Visioner', 'Spiritual'],
    challenges: ['Gampang cemas dan kewalahan', 'Ragu sama diri sendiri', 'Ekspektasi ketinggian'],
    career: {
      fields: ['Pembicara dan motivator', 'Konselor dan terapis', 'Seni dan musik', 'Pendidikan', 'Bidang spiritual', 'Penulis'],
      style: 'Kamu bersinar kalau bisa ngebimbing dan nyemangatin orang lain.',
      money: 'Rezekimu datang pas kamu berani tampil dan berbagi. Jangan nunda cuma karena ngerasa "belum siap".'
    },
    love: {
      pattern: 'Kamu nyari hubungan yang nyambung sampai ke jiwa, bukan sekadar status. Kamu peka banget sama mood pasangan.',
      needs: 'Pasangan yang tenang, sabar, dan ngehargain sisi spiritualmu.',
      advice: 'Jangan nyerap semua emosi pasangan. Jaga energimu sendiri.'
    },
    match: [2, 4, 22],
    soul: 'Jauh di dalam hati, kamu pengin hidup yang bermakna dan jadi cahaya buat orang lain.',
    persona: 'Orang ngeliat kamu lembut tapi berkarisma, dan beda dari kebanyakan orang.',
    birthday: 'Tanggal lahirmu (Angka Master 11) ngasih intuisi tajam dan kemampuan menginspirasi.'
  },
  22: {
    title: 'Sang Arsitek Agung',
    short: 'visioner yang sanggup wujudin mimpi besar',
    about: [
      'Kamu punya mimpi besar, dan anehnya, juga punya kemampuan buat wujudinnya. Kamu bisa ngeliat gambaran besar sekaligus nyusun langkah-langkahnya. Ini Angka Master: angka istimewa dengan energi kayak angka 4, tapi jauh lebih kuat.',
      'Pelajaran hidupmu: bangun sesuatu yang awet dan berguna buat banyak orang, satu langkah demi satu langkah.'
    ],
    strengths: ['Visioner', 'Praktis', 'Pekerja keras', 'Jago mimpin proyek besar', 'Bisa dipercaya'],
    challenges: ['Standar ketinggian', 'Gampang ngerasa "belum cukup"', 'Mikul beban sendirian'],
    career: {
      fields: ['Pengusaha skala besar', 'Arsitek dan teknik', 'Manajemen proyek', 'Pemerintahan dan organisasi', 'Properti', 'Pendiri lembaga atau yayasan'],
      style: 'Kamu bersinar pas mimpin proyek besar yang dampaknya nyata.',
      money: 'Kamu bisa bangun kekayaan yang awet sampai anak cucu, asal sabar dan terencana.'
    },
    love: {
      pattern: 'Kamu pasangan yang setia dan serius bangun masa depan, tapi bisa kelewat sibuk sama tanggung jawab.',
      needs: 'Pasangan yang dukung visimu dan ngingetin kamu buat nikmatin hidup.',
      advice: 'Libatin pasangan di mimpimu, jangan cuma di hasilnya.'
    },
    match: [4, 6, 11],
    soul: 'Jauh di dalam hati, kamu pengin ninggalin warisan: sesuatu yang tetap berguna bahkan setelah kamu nggak ada.',
    persona: 'Orang ngeliat kamu matang, kuat, dan bisa diandelin.',
    birthday: 'Tanggal lahirmu (Angka Master 22) ngasih kemampuan wujudin hal besar asal dikerjain bertahap. Tantangannya: standar dirimu yang tinggi banget.'
  },
  33: {
    title: 'Sang Guru Kasih',
    short: 'penyembuh dan pengajar yang penuh kasih',
    about: [
      'Kamu lahir buat nyembuhin dan ngajarin. Kehadiranmu bikin tenang, dan orang ngerasa diterima pas deket kamu. Ini Angka Master: angka istimewa dengan energi kayak angka 6, tapi jauh lebih kuat.',
      'Pelajaran hidupmu: sayang sama orang tanpa kehilangan dirimu sendiri.'
    ],
    strengths: ['Welas asih', 'Ngemong', 'Bijak', 'Kreatif', 'Nyembuhin'],
    challenges: ['Mikul beban orang lain', 'Susah nerima bantuan', 'Ngerasa harus nanggung semua orang'],
    career: {
      fields: ['Guru dan dosen', 'Kesehatan dan terapi', 'Konseling', 'Seni', 'Pelayanan sosial dan keagamaan', 'Pengasuhan anak'],
      style: 'Kamu bersinar pas bisa ngajar dan nyembuhin.',
      money: 'Rezekimu datang lewat ketulusan. Tapi tetap pasang harga yang layak buat ilmumu.'
    },
    love: {
      pattern: 'Kamu ngasih cinta tanpa syarat, tapi bisa kejebak jadi "penyelamat" buat pasangan.',
      needs: 'Pasangan yang dewasa dan bisa saling ngerawat.',
      advice: 'Pilih pasangan buat jalan bareng, bukan buat diselamatin.'
    },
    match: [6, 9, 22],
    soul: 'Jauh di dalam hati, kamu pengin semua orang yang kamu sayangi bahagia dan utuh.',
    persona: 'Orang ngeliat kamu hangat, bijak, dan penuh kasih.',
    birthday: 'Tanggal lahirmu ngasih bakat nyembuhin dan ngajar.'
  }
};

/* Tahun Pribadi 1–9: tema satu tahun. */
const YEARS = {
  1: { theme: 'Awal Baru', text: 'Tahun buat mulai. Pintu baru kebuka, dan apa yang kamu tanam tahun ini bakal tumbuh 9 tahun ke depan. Jangan cuma nonton.', do: ['Mulai proyek atau kebiasaan baru', 'Ambil keputusan yang selama ini kamu tunda', 'Percaya sama dirimu sendiri'], avoid: 'Nunggu semuanya "sempurna" dulu baru gerak.' },
  2: { theme: 'Sabar dan Kerja Sama', text: 'Tahun yang lebih pelan. Benih dari tahun lalu lagi tumbuh di bawah tanah, belum keliatan. Fokus ke hubungan dan kerja sama.', do: ['Perkuat hubungan dan partner', 'Sabar sama hasil', 'Dengerin perasaanmu'], avoid: 'Maksa sesuatu kejadian lebih cepet.' },
  3: { theme: 'Tampil dan Bergaul', text: 'Tahun yang lebih ringan dan seru. Waktunya tampil, berkarya, dan nambah circle.', do: ['Pamerin karyamu', 'Perluas pertemanan', 'Nikmatin hidup'], avoid: 'Ngabisin tenaga dan duit ke terlalu banyak hal sekaligus.' },
  4: { theme: 'Bangun Fondasi', text: 'Tahun kerja keras. Waktunya beresin keuangan, kesehatan, dan rencana. Hasilnya baru kerasa beberapa tahun lagi, tapi kerasa banget.', do: ['Beresin keuangan', 'Bangun rutinitas sehat', 'Selesaiin yang tertunda'], avoid: 'Nyari jalan pintas.' },
  5: { theme: 'Perubahan dan Kebebasan', text: 'Tahun yang dinamis. Bakal ada perubahan, perjalanan, atau kesempatan yang nggak disangka-sangka.', do: ['Terbuka sama perubahan', 'Coba hal baru', 'Jalan-jalan'], avoid: 'Keputusan impulsif yang belum dipikir mateng.' },
  6: { theme: 'Keluarga dan Tanggung Jawab', text: 'Tahun yang berpusat di rumah, keluarga, dan hubungan. Cocok buat nikah, pindah rumah, atau baikan sama orang yang renggang.', do: ['Perhatiin keluarga', 'Baikan sama yang renggang', 'Rawat rumah dan dirimu'], avoid: 'Mikul tanggung jawab orang lain sendirian.' },
  7: { theme: 'Menepi dan Mendalami', text: 'Tahun buat ngendap, bukan ngebut. Cocok buat belajar, ngasah keahlian, jaga kesehatan, dan mikirin arah hidup.', do: ['Belajar atau ambil kursus', 'Jaga kesehatan dan istirahat', 'Sisihin waktu hening'], avoid: 'Keputusan besar yang buru-buru. Siapin mateng dulu.' },
  8: { theme: 'Panen dan Rezeki', text: 'Tahun panen. Kerja keras beberapa tahun terakhir mulai kebayar, terutama soal karier dan duit.', do: ['Sikat peluang karier dan bisnis', 'Minta naik gaji atau pasang harga yang layak', 'Kelola duit dengan bijak'], avoid: 'Sombong atau boros pas rezeki dateng.' },
  9: { theme: 'Menutup dan Melepas', text: 'Tahun penutup siklus. Waktunya beres-beres dan ngelepas yang udah nggak cocok, biar siap buat awal baru.', do: ['Selesaiin urusan lama', 'Maafin dan lepasin', 'Buang barang dan kebiasaan lama'], avoid: 'Mulai komitmen besar yang baru.' }
};

/* Zodiak (rasi matahari). [nama, bulan akhir, tanggal akhir, sifat] */
const ZODIAC = [
  ['Capricorn', 1, 19, 'tekun, ambisius, dan bertanggung jawab'],
  ['Aquarius', 2, 18, 'mandiri, unik, dan berpikiran maju'],
  ['Pisces', 3, 20, 'lembut, intuitif, penuh empati, dan imajinatif'],
  ['Aries', 4, 19, 'berani, bersemangat, dan suka memimpin'],
  ['Taurus', 5, 20, 'setia, sabar, dan doyan kenyamanan'],
  ['Gemini', 6, 20, 'cerdas, komunikatif, dan serba bisa'],
  ['Cancer', 7, 22, 'penyayang, protektif, dan setia sama keluarga'],
  ['Leo', 8, 22, 'pede, murah hati, dan berkarisma'],
  ['Virgo', 9, 22, 'teliti, rapi, dan seneng bantu'],
  ['Libra', 10, 22, 'adil, ramah, dan cinta keindahan'],
  ['Scorpio', 11, 21, 'tekun, dalem, dan penuh gairah'],
  ['Sagittarius', 12, 21, 'optimis, doyan petualangan, dan jujur'],
  ['Capricorn', 12, 31, 'tekun, ambisius, dan bertanggung jawab']
];

/* Weton Jawa */
const HARI = [['Minggu', 5], ['Senin', 4], ['Selasa', 3], ['Rabu', 7], ['Kamis', 8], ['Jumat', 6], ['Sabtu', 9]];
const PASARAN = [['Legi', 5], ['Pahing', 9], ['Pon', 7], ['Wage', 4], ['Kliwon', 8]];

module.exports = { NUMBERS, YEARS, ZODIAC, HARI, PASARAN };
