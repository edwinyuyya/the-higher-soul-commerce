/* =========================================================
   DATA 78 KARTU TAROT (Rider–Waite–Smith) — Bahasa Indonesia
   ========================================================= */
(function () {
  'use strict';

  const TOPIC_KEYS = ['cinta', 'karir', 'keuangan', 'kesehatan', 'diri', 'keluarga'];

  /* ---------------- MAJOR ARCANA ---------------- */
  const MAJORS = [
    {
      n: 0, name: 'The Fool', nameId: 'Sang Pengelana', glyph: '♅', astro: 'Uranus · Udara',
      kwUp: ['awal baru', 'spontanitas', 'kebebasan', 'lompatan iman'],
      kwRev: ['kecerobohan', 'ragu melangkah', 'risiko tanpa perhitungan'],
      up: 'The Fool adalah awal dari perjalanan jiwa. Ia melangkah ke tepi jurang dengan hati ringan, percaya bahwa semesta akan menopangnya. Kartu ini menandakan babak baru yang belum tertulis — kesempatan untuk memulai tanpa beban masa lalu, dengan rasa ingin tahu dan keberanian yang polos.',
      rev: 'Terbalik, The Fool memperingatkan tentang langkah yang diambil tanpa melihat ke bawah: keputusan impulsif, naif, atau justru rasa takut yang membuatmu tidak berani memulai sama sekali. Ada lompatan yang perlu dipertimbangkan lebih matang.',
      symbol: 'Seorang pemuda membawa buntelan kecil dan setangkai mawar putih, seekor anjing setia di kakinya, berdiri di tepi tebing di bawah matahari pagi. Mawar putih melambangkan kemurnian niat; anjing adalah naluri yang melindungi.',
      topics: {
        cinta: 'Cinta yang datang tak terduga atau hubungan yang memasuki fase baru yang segar. Bagi yang lajang, bukalah diri pada pertemuan spontan; bagi yang berpasangan, ajak pasangan berpetualang dan keluar dari rutinitas.',
        karir: 'Peluang baru — pekerjaan baru, bidang baru, atau usaha rintisan. Kamu mungkin belum punya semua jawabannya, tapi antusiasme dan keberanian mencoba adalah modal utamamu saat ini.',
        keuangan: 'Awal baru dalam keuangan, namun waspadai pengeluaran impulsif. Bagus untuk mulai belajar investasi atau menabung dari nol, asalkan tidak berspekulasi buta.',
        kesehatan: 'Energi segar dan semangat memulai kebiasaan sehat baru. Hati-hati dengan kecerobohan fisik — cedera kecil karena terburu-buru.',
        diri: 'Jiwa memanggilmu untuk percaya pada perjalanan. Lepaskan kebutuhan untuk mengendalikan segalanya; pertumbuhan datang ketika kamu berani menjadi pemula lagi.',
        keluarga: 'Suasana baru di rumah atau dalam pertemanan — mungkin pindahan, anggota keluarga baru, atau teman baru yang membawa keceriaan. Bawa sikap terbuka dan ringan.'
      },
      advice: 'Beranilah melangkah, meski belum melihat seluruh jalan.', pol: 1
    },
    {
      n: 1, name: 'The Magician', nameId: 'Sang Penyihir', glyph: '☿', astro: 'Merkurius',
      kwUp: ['kehendak', 'keterampilan', 'manifestasi', 'sumber daya'],
      kwRev: ['manipulasi', 'potensi terbuang', 'tipu daya'],
      up: 'The Magician berdiri dengan satu tangan menunjuk langit dan satu ke bumi: "seperti di atas, begitu pula di bawah". Di mejanya ada keempat simbol suit — tongkat, piala, pedang, pentakel — artinya kamu memiliki semua alat yang dibutuhkan. Ini kartu manifestasi: niat yang jelas ditambah tindakan terfokus akan mewujudkan apa yang kamu inginkan.',
      rev: 'Terbalik, kekuatan The Magician bisa disalahgunakan atau tidak digunakan. Waspadai manipulasi — dari orang lain maupun dari dirimu sendiri — serta bakat yang terbengkalai karena kurang fokus dan rasa tidak percaya diri.',
      symbol: 'Penyihir berjubah merah di atas jubah putih, lambang tak hingga melayang di atas kepalanya, dikelilingi mawar dan lili di taman.',
      topics: {
        cinta: 'Kamu memiliki daya tarik dan kemampuan untuk menciptakan hubungan yang kamu inginkan. Ungkapkan perasaan dengan jelas — komunikasi adalah sihirmu. Bisa juga menandakan seseorang yang pandai memikat.',
        karir: 'Saat yang tepat untuk menunjukkan kemampuan: presentasi, wawancara, peluncuran proyek. Keterampilanmu sudah cukup — sekarang soal eksekusi dan percaya diri.',
        keuangan: 'Kemampuan menciptakan penghasilan dari keterampilanmu sendiri. Ide bisnis atau sumber pemasukan baru bisa diwujudkan jika direncanakan dan dijalankan dengan fokus.',
        kesehatan: 'Pikiran berpengaruh kuat pada tubuh. Kamu punya kendali besar atas pemulihan dan kebugaranmu — mulai dengan niat yang jelas dan rutinitas yang disiplin.',
        diri: 'Kamu adalah pencipta realitasmu. Selaraskan pikiran, perasaan, kata, dan tindakan; ketika keempatnya searah, perubahan terjadi.',
        keluarga: 'Kamu bisa menjadi penengah atau penggerak dalam keluarga/pertemanan. Kata-katamu punya pengaruh — gunakan untuk menyatukan, bukan mengatur.'
      },
      advice: 'Gunakan apa yang sudah ada di tanganmu — kamu lebih siap dari yang kamu kira.', pol: 2
    },
    {
      n: 2, name: 'The High Priestess', nameId: 'Sang Pendeta Wanita', glyph: '☽', astro: 'Bulan',
      kwUp: ['intuisi', 'misteri', 'pengetahuan batin', 'ketenangan'],
      kwRev: ['rahasia', 'mengabaikan intuisi', 'kebingungan batin'],
      up: 'The High Priestess duduk di antara dua pilar — terang dan gelap — menjaga tirai menuju alam bawah sadar. Ia mengajakmu diam dan mendengar suara batin. Tidak semua jawaban datang dari logika; sebagian sudah kamu ketahui jauh di dalam diri.',
      rev: 'Terbalik, ada suara batin yang kamu abaikan, atau rahasia yang mulai muncul ke permukaan. Kamu mungkin terlalu sibuk mencari jawaban di luar sehingga kehilangan koneksi dengan intuisimu sendiri.',
      symbol: 'Seorang perempuan berjubah biru duduk di antara pilar hitam (Boaz) dan putih (Jachin), memegang gulungan kitab, dengan bulan sabit di kakinya dan tirai bergambar delima di belakangnya.',
      topics: {
        cinta: 'Ada perasaan yang belum diungkapkan — dari dirimu atau dari dia. Ketertarikan yang dalam dan misterius. Percayai firasatmu tentang orang ini, dan jangan terburu-buru; biarkan semuanya terungkap perlahan.',
        karir: 'Jangan membuka semua kartu dulu. Amati, kumpulkan informasi, dan percayai instingmu dalam membaca situasi kantor. Ada hal di balik layar yang belum terlihat.',
        keuangan: 'Belum saatnya keputusan besar. Ada informasi yang belum lengkap — tunggu dan pelajari dulu. Instingmu tentang suatu tawaran perlu didengarkan.',
        kesehatan: 'Dengarkan sinyal halus dari tubuhmu. Berkaitan juga dengan siklus hormonal, tidur, dan kesehatan batin. Istirahat dan meditasi akan membantu.',
        diri: 'Masa yang sangat baik untuk meditasi, menulis jurnal, dan memperdalam spiritualitas. Jawabanmu ada di dalam, bukan di luar.',
        keluarga: 'Ada hal yang tidak dikatakan dalam keluarga atau lingkar pertemanan. Jadilah pendengar yang peka; kadang dukungan terbaik adalah kehadiran yang tenang.'
      },
      advice: 'Diamlah sejenak dan dengarkan intuisimu — ia sudah tahu jawabannya.', pol: 1
    },
    {
      n: 3, name: 'The Empress', nameId: 'Sang Permaisuri', glyph: '♀', astro: 'Venus',
      kwUp: ['kelimpahan', 'kesuburan', 'kasih sayang', 'kreativitas'],
      kwRev: ['ketergantungan', 'mengabaikan diri', 'kreativitas mandek'],
      up: 'The Empress adalah ibu bumi — lambang kelimpahan, keindahan, dan kasih yang memelihara. Segala yang kamu rawat dengan sabar akan bertumbuh. Kartu ini mengundangmu menikmati hidup lewat panca indra, berkarya, serta merawat diri dan orang lain.',
      rev: 'Terbalik, energi pemeliharaan menjadi tidak seimbang: terlalu mengurus orang lain hingga lupa diri, atau sebaliknya merasa kering dan tidak dirawat. Bisa juga tanda kreativitas tersumbat atau ketergantungan emosional.',
      symbol: 'Perempuan bermahkota dua belas bintang bersandar di bantal di tengah ladang gandum matang dan hutan rimbun, dengan perisai berlambang Venus.',
      topics: {
        cinta: 'Hubungan yang hangat, penuh kasih, dan memelihara. Bisa menandakan komitmen yang lebih dalam, keharmonisan, bahkan kehamilan. Kamu memancarkan daya tarik alami saat ini.',
        karir: 'Proyek yang kamu rawat mulai berbuah. Sangat baik untuk bidang kreatif, desain, perawatan, dan pekerjaan yang melibatkan kepedulian. Kepemimpinanmu yang mengayomi dihargai.',
        keuangan: 'Kelimpahan dan kenyamanan materi. Uang mengalir ketika kamu bekerja dengan hal yang kamu cintai. Nikmati hasilmu, tapi tetap bijak.',
        kesehatan: 'Vitalitas, kesuburan, dan pemulihan. Tubuh minta dirawat dengan makanan bergizi, alam, dan istirahat yang cukup.',
        diri: 'Saatnya mencintai diri sendiri secara nyata — bukan sekadar konsep. Terhubung dengan alam dan kreativitas akan memulihkan jiwamu.',
        keluarga: 'Rumah yang hangat dan keluarga yang harmonis. Sosok ibu atau pengasuh memegang peran penting. Kabar kelahiran atau berkumpulnya keluarga.'
      },
      advice: 'Rawatlah — dirimu, mimpimu, dan orang-orangmu — dengan sabar dan kasih.', pol: 2
    },
    {
      n: 4, name: 'The Emperor', nameId: 'Sang Kaisar', glyph: '♈', astro: 'Aries',
      kwUp: ['struktur', 'otoritas', 'stabilitas', 'kepemimpinan'],
      kwRev: ['kekakuan', 'dominasi', 'kehilangan kendali'],
      up: 'The Emperor membangun kerajaan lewat disiplin, aturan, dan tanggung jawab. Ia mewakili struktur yang membuat hidup stabil dan aman. Kartu ini mengajakmu mengambil kendali, membuat rencana yang jelas, dan bertindak sebagai pemimpin hidupmu sendiri.',
      rev: 'Terbalik, struktur berubah menjadi kekakuan atau tirani: terlalu mengontrol, keras kepala, atau berhadapan dengan figur otoritas yang menekan. Bisa juga sebaliknya — hidup tanpa arah dan disiplin.',
      symbol: 'Seorang raja tua berbaju zirah di bawah jubah merah duduk di singgasana batu berhias kepala domba jantan, dengan gunung tandus di belakangnya.',
      topics: {
        cinta: 'Hubungan yang stabil dan dapat diandalkan, mungkin dengan sosok yang protektif dan dewasa. Komitmen serius. Namun pastikan rasa aman tidak berubah menjadi kontrol.',
        karir: 'Kepemimpinan, promosi, atau bekerja dengan atasan yang tegas. Saatnya menyusun strategi dan sistem kerja yang rapi. Kamu dihormati karena konsistensi.',
        keuangan: 'Kelola uang dengan disiplin: anggaran, dana darurat, investasi jangka panjang. Stabilitas datang dari aturan yang kamu tepati.',
        kesehatan: 'Rutinitas dan disiplin adalah obat. Perhatikan kepala, stres karena beban tanggung jawab, dan pola tidur.',
        diri: 'Menjadi otoritas atas hidupmu sendiri: membuat batasan, menepati janji pada diri, dan bertanggung jawab atas pilihan.',
        keluarga: 'Sosok ayah atau kepala keluarga berperan besar. Aturan rumah, tanggung jawab, dan perlindungan. Seimbangkan ketegasan dengan kehangatan.'
      },
      advice: 'Buat rencana, pasang batasan, dan pimpin hidupmu dengan tegas.', pol: 1
    },
    {
      n: 5, name: 'The Hierophant', nameId: 'Sang Guru Agung', glyph: '♉', astro: 'Taurus',
      kwUp: ['tradisi', 'bimbingan', 'nilai', 'institusi'],
      kwRev: ['memberontak', 'dogma', 'jalan sendiri'],
      up: 'The Hierophant adalah penjaga tradisi dan kebijaksanaan yang diwariskan. Ia mewakili guru, mentor, lembaga, dan nilai-nilai bersama. Kartu ini menyarankan belajar dari yang berpengalaman, mengikuti jalur yang sudah teruji, atau menemukan makna dalam komunitas dan keyakinan.',
      rev: 'Terbalik, kamu mungkin merasa terkekang oleh aturan, tradisi, atau ekspektasi. Ini bisa menjadi panggilan untuk mempertanyakan dogma dan menemukan kebenaranmu sendiri — atau peringatan tentang sikap memberontak tanpa arah.',
      symbol: 'Seorang pemuka agama bermahkota tiga tingkat mengangkat tangan memberkati dua murid, dengan dua kunci bersilang di kakinya.',
      topics: {
        cinta: 'Hubungan yang mengarah pada komitmen formal — tunangan, pernikahan, restu keluarga. Nilai dan keyakinan bersama menjadi fondasi.',
        karir: 'Bekerja dalam institusi atau struktur yang mapan, mencari mentor, pendidikan, sertifikasi. Ikuti prosedur; jalur konvensional menguntungkan saat ini.',
        keuangan: 'Pendekatan konservatif dan terbukti lebih aman: bank, asuransi, nasihat profesional. Hindari skema yang terlalu menjanjikan.',
        kesehatan: 'Ikuti saran tenaga medis dan pengobatan yang teruji. Rutinitas sehat yang diwariskan (pola makan, ibadah, olahraga teratur) membawa manfaat.',
        diri: 'Mencari guru, komunitas, atau tradisi spiritual yang membimbing. Belajar dengan rendah hati dari yang lebih dahulu berjalan.',
        keluarga: 'Tradisi keluarga, acara adat, perkumpulan, atau peranmu sebagai pembimbing bagi yang lebih muda. Nilai keluarga sangat menonjol.'
      },
      advice: 'Carilah bimbingan dari yang lebih berpengalaman, dan pegang nilai-nilai yang kamu yakini.', pol: 1
    },
    {
      n: 6, name: 'The Lovers', nameId: 'Sang Kekasih', glyph: '♊', astro: 'Gemini',
      kwUp: ['cinta', 'keselarasan', 'pilihan dari hati', 'nilai'],
      kwRev: ['ketidakselarasan', 'pilihan sulit', 'godaan'],
      up: 'The Lovers berbicara tentang cinta, tetapi lebih dalam lagi tentang pilihan yang selaras dengan nilai sejatimu. Dua jiwa yang saling melengkapi di bawah berkat malaikat — kartu ini menandakan hubungan yang bermakna dan keputusan penting yang datang dari hati.',
      rev: 'Terbalik, ada ketidakselarasan: nilai yang berbeda, komunikasi yang terputus, atau godaan yang menjauhkan dari komitmen. Bisa juga keraguan dalam memilih karena takut kehilangan salah satunya.',
      symbol: 'Dua manusia berdiri di bawah malaikat Raphael; di belakang sang perempuan ada pohon pengetahuan dengan ular, di belakang sang lelaki pohon berapi.',
      topics: {
        cinta: 'Salah satu kartu terkuat untuk cinta: ketertarikan mendalam, belahan jiwa, hubungan yang naik ke level komitmen. Ada pilihan dari hati yang perlu diambil dengan jujur.',
        karir: 'Pilihan penting dalam karier — pilih yang selaras dengan nilaimu, bukan hanya gaji. Kemitraan atau kolaborasi yang harmonis.',
        keuangan: 'Keputusan finansial yang melibatkan pasangan atau mitra. Selaraskan prioritas keuangan bersama sebelum melangkah.',
        kesehatan: 'Keseimbangan antara pikiran dan hati. Kesehatan membaik ketika kamu hidup selaras dengan nilai-nilaimu dan menjaga hubungan yang sehat.',
        diri: 'Mengenal nilai-nilai terdalammu dan hidup sesuai dengannya. Menyatukan sisi-sisi yang berlawanan dalam diri.',
        keluarga: 'Ikatan yang erat, rekonsiliasi, atau keputusan keluarga yang perlu diambil bersama. Pertemanan yang terasa seperti keluarga.'
      },
      advice: 'Pilihlah dengan hati yang jujur — apa yang sungguh selaras dengan dirimu?', pol: 2
    },
    {
      n: 7, name: 'The Chariot', nameId: 'Sang Kereta Perang', glyph: '♋', astro: 'Cancer',
      kwUp: ['tekad', 'kemenangan', 'kendali', 'gerak maju'],
      kwRev: ['kehilangan arah', 'agresif', 'terhambat'],
      up: 'The Chariot adalah kemenangan melalui tekad. Dua sphinx — hitam dan putih — menarik kereta ke arah berbeda, namun sang kesatria mengendalikannya dengan kekuatan kehendak. Kartu ini berkata: fokus, disiplin, dan percaya diri akan membawamu melewati rintangan.',
      rev: 'Terbalik, kereta kehilangan kendali: tujuan yang kabur, energi tercerai-berai, atau memaksakan kehendak secara agresif. Berhenti sejenak dan tentukan lagi ke mana kamu sebenarnya ingin pergi.',
      symbol: 'Seorang kesatria bermahkota bintang berdiri di kereta di bawah kanopi bintang, ditarik dua sphinx hitam dan putih, tanpa tali kekang.',
      topics: {
        cinta: 'Kamu perlu aktif memperjuangkan apa yang kamu inginkan. Hubungan bergerak maju — atau butuh keberanian untuk mengambil kendali atas dinamika yang ada. Perbedaan diatasi dengan tekad bersama.',
        karir: 'Kemenangan dan kemajuan: target tercapai, persaingan dimenangkan, ambisi terwujud. Bisa juga perjalanan dinas atau pindah kerja.',
        keuangan: 'Kemajuan finansial melalui kerja keras dan disiplin. Tetap fokus pada tujuan, jangan tergoda pengeluaran yang membelokkan arah.',
        kesehatan: 'Tekad kuat membantu pemulihan. Baik untuk target kebugaran. Jaga keseimbangan agar tidak memaksakan tubuh.',
        diri: 'Menyatukan dorongan-dorongan yang saling bertentangan dalam dirimu menjadi satu arah. Kehendak yang terarah adalah kekuatan spiritual.',
        keluarga: 'Memimpin keluarga melewati masa sulit, atau perjalanan bersama. Kamu bisa menjadi penggerak yang menyatukan kepentingan berbeda.'
      },
      advice: 'Tetapkan arah, pegang kendali, dan majulah dengan yakin.', pol: 2
    },
    {
      n: 8, name: 'Strength', nameId: 'Kekuatan', glyph: '♌', astro: 'Leo',
      kwUp: ['keberanian', 'kesabaran', 'kelembutan', 'kendali diri'],
      kwRev: ['keraguan diri', 'emosi meledak', 'rapuh'],
      up: 'Strength menunjukkan seorang perempuan yang menjinakkan singa bukan dengan paksaan, melainkan dengan kelembutan. Kekuatan sejati adalah kesabaran, welas asih, dan keberanian menghadapi sisi liar dalam dirimu. Kamu lebih tangguh dari yang kamu sadari.',
      rev: 'Terbalik, kamu mungkin sedang meragukan diri sendiri, kewalahan oleh emosi, atau membiarkan rasa takut dan amarah mengambil alih. Saatnya membangun kembali kepercayaan diri dari dalam.',
      symbol: 'Perempuan berjubah putih dengan mahkota bunga dan lambang tak hingga di atas kepala, dengan lembut menutup mulut seekor singa.',
      topics: {
        cinta: 'Hubungan yang membutuhkan kesabaran dan kelembutan. Kasih yang sabar mampu meluluhkan hati yang keras. Percaya diri adalah daya tarikmu.',
        karir: 'Kamu mampu menghadapi tekanan dan orang sulit dengan kepala dingin. Pengaruh yang lembut lebih efektif daripada konfrontasi.',
        keuangan: 'Kendalikan dorongan belanja dan emosi dalam keputusan uang. Kesabaran akan membuahkan stabilitas.',
        kesehatan: 'Vitalitas dan daya tahan yang kuat; pemulihan berjalan baik. Perhatikan jantung dan punggung, serta kelola stres.',
        diri: 'Menerima dan menjinakkan sisi bayangan diri dengan welas asih. Keberanian lembut untuk menjadi diri sendiri.',
        keluarga: 'Kesabaran menghadapi anggota keluarga atau teman yang sulit. Kamu menjadi sumber kekuatan dan ketenangan bagi mereka.'
      },
      advice: 'Hadapi dengan kelembutan yang berani — kesabaran adalah kekuatanmu.', pol: 2
    },
    {
      n: 9, name: 'The Hermit', nameId: 'Sang Pertapa', glyph: '♍', astro: 'Virgo',
      kwUp: ['perenungan', 'kesendirian', 'kebijaksanaan', 'pencarian batin'],
      kwRev: ['isolasi', 'kesepian', 'menutup diri'],
      up: 'The Hermit mundur dari keramaian untuk menemukan cahaya batin. Lentera di tangannya berisi bintang — kebijaksanaan yang hanya ditemukan dalam keheningan. Ini saat yang tepat untuk menyendiri, merenung, dan mencari makna yang lebih dalam.',
      rev: 'Terbalik, kesendirian berubah menjadi isolasi atau kesepian. Kamu mungkin menarik diri terlalu jauh — atau sebaliknya, takut sendirian dengan pikiranmu sendiri.',
      symbol: 'Seorang tua berjubah abu-abu berdiri di puncak gunung bersalju, memegang lentera berisi bintang enam sudut dan tongkat panjang.',
      topics: {
        cinta: 'Butuh waktu untuk diri sendiri sebelum bisa mencintai dengan utuh. Bagi pasangan: beri ruang. Bagi lajang: masa refleksi tentang apa yang sebenarnya kamu cari.',
        karir: 'Fokus pada pekerjaan mendalam, riset, atau mencari panggilan karier yang lebih bermakna. Bisa juga hadirnya mentor yang bijak.',
        keuangan: 'Tinjau ulang keuanganmu dengan tenang. Hidup sederhana dan hemat; bukan saatnya pengeluaran besar.',
        kesehatan: 'Istirahat, retret, dan pemulihan. Kesehatan mental perlu perhatian — kurangi kebisingan dan stimulasi.',
        diri: 'Waktu emas untuk pertumbuhan spiritual: meditasi, retret, membaca, mencari guru batin. Kamu sedang menemukan cahayamu sendiri.',
        keluarga: 'Kebutuhan akan ruang pribadi. Mungkin ada anggota keluarga/teman yang menarik diri — dekati dengan pengertian, bukan tuntutan.'
      },
      advice: 'Menepilah sejenak dari keramaian; jawabanmu ada dalam keheningan.', pol: 0
    },
    {
      n: 10, name: 'Wheel of Fortune', nameId: 'Roda Keberuntungan', glyph: '♃', astro: 'Jupiter',
      kwUp: ['siklus', 'takdir', 'titik balik', 'keberuntungan'],
      kwRev: ['kemunduran', 'melawan perubahan', 'pola berulang'],
      up: 'Roda selalu berputar — yang di bawah akan naik, yang di atas akan turun. Wheel of Fortune menandakan titik balik, kejadian tak terduga, dan keberuntungan yang berpihak. Semesta sedang menggerakkan sesuatu; ikutlah dalam alirannya.',
      rev: 'Terbalik, roda terasa berputar melawanmu: kemunduran, pola lama yang berulang, atau upaya mempertahankan sesuatu yang memang harus berubah. Ingat, fase sulit pun akan berlalu.',
      symbol: 'Roda besar bertuliskan TARO dan huruf Ibrani, dengan sphinx di puncak, ular turun di satu sisi dan Anubis naik di sisi lain; empat makhluk bersayap di sudut-sudut awan.',
      topics: {
        cinta: 'Pertemuan yang terasa seperti takdir, atau perubahan besar dalam hubungan. Waktu yang tepat sedang bekerja untukmu.',
        karir: 'Peluang tak terduga, perubahan posisi, atau keberuntungan. Bersiaplah menangkap momentum ketika ia datang.',
        keuangan: 'Rezeki tak terduga dan siklus naik. Ingat roda berputar — sisihkan saat sedang di atas.',
        kesehatan: 'Perubahan kondisi — biasanya ke arah membaik. Perhatikan pola dan siklus tubuhmu.',
        diri: 'Memahami bahwa hidup bergerak dalam siklus. Pelajaran karma: apa yang kamu tanam akan kembali kepadamu.',
        keluarga: 'Perubahan dalam dinamika keluarga, momen reuni, atau kejadian yang mengubah arah keluarga.'
      },
      advice: 'Ikuti arus perubahan — jangan melawan roda yang sedang berputar untukmu.', pol: 1
    },
    {
      n: 11, name: 'Justice', nameId: 'Keadilan', glyph: '♎', astro: 'Libra',
      kwUp: ['kebenaran', 'keadilan', 'sebab-akibat', 'keputusan'],
      kwRev: ['ketidakadilan', 'ketidakjujuran', 'lari dari tanggung jawab'],
      up: 'Justice memegang pedang kebenaran dan timbangan keseimbangan. Setiap tindakan memiliki konsekuensi, dan kini saatnya hasil yang adil muncul. Kartu ini meminta kejujuran, objektivitas, dan keberanian menanggung tanggung jawab atas pilihanmu.',
      rev: 'Terbalik, ada ketidakadilan, ketidakjujuran, atau penghindaran tanggung jawab. Mungkin kamu merasa diperlakukan tidak adil — atau perlu jujur pada diri sendiri tentang peranmu dalam situasi ini.',
      symbol: 'Sosok bermahkota duduk di antara dua pilar, tangan kanan memegang pedang tegak, tangan kiri memegang timbangan.',
      topics: {
        cinta: 'Hubungan yang setara dan jujur. Keputusan penting tentang hubungan perlu diambil dengan adil. Apa yang kamu beri akan kembali.',
        karir: 'Kontrak, urusan hukum, negosiasi, atau evaluasi kinerja. Hasil sesuai dengan usaha yang kamu tanam. Bertindaklah dengan integritas.',
        keuangan: 'Urusan legal, pajak, pembagian harta, atau perjanjian. Pastikan semuanya tertulis dan adil.',
        kesehatan: 'Keseimbangan adalah kunci — pola makan, kerja, istirahat. Tubuh merespons secara adil terhadap kebiasaanmu.',
        diri: 'Hukum sebab-akibat. Bersikap jujur sepenuhnya pada diri sendiri adalah langkah pertama menuju kebebasan.',
        keluarga: 'Menyelesaikan konflik dengan adil, urusan warisan, atau pembagian peran yang seimbang di rumah.'
      },
      advice: 'Bersikaplah jujur dan adil — terutama kepada dirimu sendiri.', pol: 0
    },
    {
      n: 12, name: 'The Hanged Man', nameId: 'Sang Tergantung', glyph: '♆', astro: 'Neptunus · Air',
      kwUp: ['berserah', 'jeda', 'sudut pandang baru', 'pengorbanan'],
      kwRev: ['menunda-nunda', 'stagnasi', 'pengorbanan sia-sia'],
      up: 'The Hanged Man tergantung terbalik dengan wajah tenang dan lingkaran cahaya di kepala. Ia memilih berhenti — dan dari posisi itu melihat dunia dengan cara yang sama sekali baru. Kartu ini mengajak berserah, menunda tindakan, dan melepaskan cara pandang lama.',
      rev: 'Terbalik, jeda telah berubah menjadi stagnasi. Kamu mungkin menunda keputusan, berkorban tanpa hasil, atau menolak melihat situasi dari sudut yang berbeda.',
      symbol: 'Seorang pria tergantung terbalik dari pohon berbentuk T dengan satu kaki, kaki lainnya bersilang membentuk angka 4, kepalanya bercahaya.',
      topics: {
        cinta: 'Hubungan dalam fase menggantung atau menunggu. Lihat dari sudut pandang pasangan. Jangan memaksakan; kadang melepaskan justru memberi jawaban.',
        karir: 'Proyek tertunda atau masa menunggu. Gunakan jeda ini untuk meninjau ulang strategi — ide terobosan sering lahir dari berhenti sejenak.',
        keuangan: 'Tahan keputusan finansial besar. Mungkin perlu mengorbankan kesenangan jangka pendek demi tujuan jangka panjang.',
        kesehatan: 'Tubuh meminta berhenti dan beristirahat. Pemulihan butuh kesabaran; jangan dipaksakan.',
        diri: 'Berserah dan percaya. Pencerahan datang ketika kamu melepaskan kebutuhan untuk mengontrol hasil.',
        keluarga: 'Melihat konflik dari sudut pandang anggota keluarga lain. Pengorbanan kecil demi keharmonisan.'
      },
      advice: 'Berhentilah sejenak dan lihat dari sudut yang berbeda.', pol: 0
    },
    {
      n: 13, name: 'Death', nameId: 'Kematian (Transformasi)', glyph: '♏', astro: 'Scorpio',
      kwUp: ['akhir', 'transformasi', 'transisi', 'pelepasan'],
      kwRev: ['menolak perubahan', 'terjebak', 'takut melepas'],
      up: 'Death jarang berarti kematian fisik. Ia adalah akhir sebuah babak agar babak baru bisa dimulai. Matahari terbit di antara dua menara di kejauhan — setelah setiap akhir ada kelahiran kembali. Lepaskan apa yang sudah selesai; transformasi sedang terjadi.',
      rev: 'Terbalik, kamu menahan sesuatu yang sudah waktunya berakhir. Penolakan terhadap perubahan membuat prosesnya lebih menyakitkan dan lebih lama.',
      symbol: 'Kerangka berbaju zirah menunggang kuda putih membawa panji bermawar putih; raja tumbang, sementara anak dan pendeta menyambutnya; matahari terbit di kejauhan.',
      topics: {
        cinta: 'Akhir dari satu fase hubungan — bisa berarti perpisahan, atau berubahnya hubungan lama menjadi sesuatu yang baru dan lebih dalam. Lepaskan pola lama agar cinta bisa terlahir kembali.',
        karir: 'Pekerjaan atau peran lama berakhir untuk membuka jalan baru. Restrukturisasi, perubahan karier, menutup satu bab.',
        keuangan: 'Akhir dari kebiasaan finansial lama. Bereskan utang, tutup yang tidak perlu, dan mulai lembaran baru.',
        kesehatan: 'Transformasi gaya hidup: meninggalkan kebiasaan tidak sehat. (Bukan pertanda kematian fisik.) Fase regenerasi dan pemulihan.',
        diri: 'Kelahiran kembali secara spiritual. Identitas lama luruh agar dirimu yang lebih sejati bisa muncul.',
        keluarga: 'Perubahan besar dalam struktur keluarga atau pertemanan — ada yang pergi, ada yang berubah, membuka ruang bagi hubungan yang lebih jujur.'
      },
      advice: 'Lepaskan apa yang sudah selesai — ruang kosong itu untuk sesuatu yang baru.', pol: 0
    },
    {
      n: 14, name: 'Temperance', nameId: 'Keseimbangan', glyph: '♐', astro: 'Sagitarius',
      kwUp: ['keseimbangan', 'kesabaran', 'moderasi', 'penyembuhan'],
      kwRev: ['berlebihan', 'ketidakseimbangan', 'tergesa-gesa'],
      up: 'Temperance menuangkan air dari satu piala ke piala lain dengan sabar — memadukan unsur yang berbeda menjadi harmoni. Kartu ini tentang jalan tengah, kesabaran, dan penyembuhan. Hal baik datang dari proses yang perlahan dan seimbang.',
      rev: 'Terbalik, ada ketidakseimbangan: berlebihan dalam sesuatu, terburu-buru, atau konflik antara bagian-bagian hidupmu. Kembalilah ke tengah.',
      symbol: 'Malaikat bersayap dengan satu kaki di air dan satu di darat, menuangkan air di antara dua piala; jalan setapak menuju gunung bermahkota cahaya.',
      topics: {
        cinta: 'Hubungan yang seimbang dan saling melengkapi. Kompromi dan kesabaran membuat cinta matang. Penyembuhan setelah konflik.',
        karir: 'Kerja sama, menyeimbangkan beban kerja, menemukan jalan tengah. Kesabaran dalam proses akan dihargai.',
        keuangan: 'Moderasi: tidak terlalu boros, tidak terlalu pelit. Diversifikasi dan konsistensi.',
        kesehatan: 'Kartu penyembuhan. Seimbangkan pola makan, asupan cairan, dan istirahat. Hindari yang berlebihan.',
        diri: 'Alkimia batin — memadukan sisi-sisi diri yang berbeda. Jalan tengah adalah jalan spiritual.',
        keluarga: 'Menjadi penengah, mendamaikan, dan menciptakan harmoni di rumah atau lingkar pertemanan.'
      },
      advice: 'Cari jalan tengah dan bersabarlah dengan prosesnya.', pol: 1
    },
    {
      n: 15, name: 'The Devil', nameId: 'Sang Iblis', glyph: '♑', astro: 'Capricorn',
      kwUp: ['keterikatan', 'godaan', 'kecanduan', 'sisi bayangan'],
      kwRev: ['pembebasan', 'memutus rantai', 'kesadaran baru'],
      up: 'The Devil menunjukkan dua sosok yang dirantai — namun rantainya longgar; mereka bisa melepaskannya kapan saja. Kartu ini menyoroti keterikatan: kecanduan, hubungan tidak sehat, materialisme, atau pola pikir yang memenjarakan. Kesadaran adalah langkah pertama menuju kebebasan.',
      rev: 'Terbalik, kamu mulai menyadari dan melepaskan rantai. Ini tanda pembebasan dari kebiasaan buruk, hubungan toksik, atau ketakutan yang selama ini mengikat.',
      symbol: 'Sosok bertanduk duduk di atas tumpuan, dengan dua manusia bertanduk dan berekor dirantai di lehernya — rantai yang longgar.',
      topics: {
        cinta: 'Ketertarikan fisik yang kuat, tetapi waspadai obsesi, kecemburuan, atau hubungan yang tidak sehat. Apakah ini cinta, atau keterikatan?',
        karir: 'Merasa terjebak dalam pekerjaan demi uang, atau lingkungan kerja yang toksik. Ingat: pilihanmu lebih banyak dari yang kamu kira.',
        keuangan: 'Waspadai utang, belanja impulsif, judi, atau obsesi materi. Periksa apa yang sebenarnya mengendalikan keuanganmu.',
        kesehatan: 'Kecanduan dan kebiasaan buruk (gula, rokok, gawai, begadang). Saatnya jujur dan mencari bantuan bila perlu.',
        diri: 'Menghadapi sisi bayangan: ketakutan, nafsu, dan pola yang tidak kamu akui. Mengenalinya adalah awal kebebasan.',
        keluarga: 'Dinamika tidak sehat, ketergantungan, atau manipulasi dalam keluarga/pertemanan. Pasang batasan yang sehat.'
      },
      advice: 'Kenali apa yang mengikatmu — rantainya lebih longgar dari yang kamu kira.', pol: -2, revPol: 1
    },
    {
      n: 16, name: 'The Tower', nameId: 'Menara', glyph: '♂', astro: 'Mars',
      kwUp: ['guncangan', 'perubahan mendadak', 'kebenaran terungkap', 'pembebasan'],
      kwRev: ['menghindari krisis', 'takut berubah', 'guncangan tertunda'],
      up: 'The Tower adalah petir yang menghancurkan struktur yang dibangun di atas fondasi palsu. Perubahan mendadak ini mengejutkan, bahkan menyakitkan — namun ia membebaskanmu dari ilusi. Setelah reruntuhan, kamu bisa membangun dengan kebenaran.',
      rev: 'Terbalik, kamu mungkin berhasil menghindari krisis, atau sedang menunda perubahan yang tak terelakkan. Perubahan bisa terjadi lebih perlahan, dari dalam.',
      symbol: 'Menara tinggi di puncak bukit tersambar petir, mahkotanya terlempar, dua orang jatuh di antara api dan percikan cahaya.',
      topics: {
        cinta: 'Guncangan dalam hubungan: rahasia terungkap, pertengkaran besar, atau runtuhnya ilusi. Menyakitkan, tapi membuka jalan bagi hubungan yang jujur.',
        karir: 'Perubahan tiba-tiba: restrukturisasi, kehilangan pekerjaan, atau proyek gagal. Dari sinilah kamu bisa membangun ulang dengan lebih kokoh.',
        keuangan: 'Pengeluaran mendadak atau kerugian tak terduga. Siapkan dana darurat dan hindari investasi berisiko tinggi saat ini.',
        kesehatan: 'Waspadai kejadian mendadak dan stres akut. Jangan abaikan sinyal tubuh — periksakan diri ke tenaga medis bila ada keluhan.',
        diri: 'Kebangkitan kesadaran yang tiba-tiba. Keyakinan lama runtuh — memberi tempat bagi kebenaran yang lebih luas.',
        keluarga: 'Konflik atau perubahan mendadak dalam keluarga/pertemanan. Kejujuran yang menyakitkan bisa memulihkan hubungan dalam jangka panjang.'
      },
      advice: 'Biarkan yang rapuh runtuh — kebenaran adalah fondasi yang lebih kuat.', pol: -2, revPol: -0.5
    },
    {
      n: 17, name: 'The Star', nameId: 'Bintang', glyph: '♒', astro: 'Aquarius',
      kwUp: ['harapan', 'penyembuhan', 'inspirasi', 'ketenangan'],
      kwRev: ['putus asa', 'kehilangan iman', 'kurang percaya diri'],
      up: 'Setelah badai The Tower, The Star hadir membawa harapan. Seorang perempuan menuangkan air kehidupan ke tanah dan kolam di bawah bintang-bintang yang bersinar. Ini kartu penyembuhan, pembaruan, dan keyakinan bahwa masa depan cerah. Semesta mendukungmu.',
      rev: 'Terbalik, harapan meredup. Kamu mungkin merasa putus asa, lelah, atau kehilangan kepercayaan. Cahaya bintang masih ada — kamu hanya perlu mengangkat kepala lagi.',
      symbol: 'Perempuan berlutut di tepi kolam, menuangkan air dari dua kendi ke tanah dan ke air, di bawah satu bintang besar dan tujuh bintang kecil.',
      topics: {
        cinta: 'Harapan baru dalam cinta, penyembuhan dari luka lama, hubungan yang tulus dan penuh inspirasi. Izinkan dirimu dicintai apa adanya.',
        karir: 'Inspirasi, pengakuan, dan masa depan yang menjanjikan. Ikuti visi dan bakatmu; kamu berada di jalur yang benar.',
        keuangan: 'Pemulihan finansial dan prospek yang membaik. Optimis, namun tetap realistis dalam rencana.',
        kesehatan: 'Penyembuhan dan pemulihan yang kuat. Air, alam, dan ketenangan pikiran sangat membantu.',
        diri: 'Terhubung kembali dengan harapan dan tujuan jiwa. Kamu sedang dipulihkan dan dibimbing.',
        keluarga: 'Rekonsiliasi dan kedamaian setelah masa sulit. Dukungan tulus dari orang-orang terdekat.'
      },
      advice: 'Tetaplah berharap — kamu sedang dalam proses dipulihkan.', pol: 2
    },
    {
      n: 18, name: 'The Moon', nameId: 'Bulan', glyph: '♓', astro: 'Pisces',
      kwUp: ['ilusi', 'kecemasan', 'intuisi', 'ketidakpastian'],
      kwRev: ['kejelasan muncul', 'ketakutan mereda', 'kebenaran terungkap'],
      up: 'The Moon menerangi jalan dengan cahaya samar — segala sesuatu tampak tidak sebagaimana adanya. Kartu ini berbicara tentang ketidakpastian, ilusi, kecemasan, dan alam bawah sadar. Jangan percaya begitu saja pada penampakan; andalkan intuisimu untuk menembus kabut.',
      rev: 'Terbalik, kabut mulai tersingkap. Ketakutan berkurang, kebohongan terungkap, dan kamu mulai melihat lebih jernih.',
      symbol: 'Bulan berwajah di antara dua menara, anjing dan serigala melolong, seekor udang karang merangkak keluar dari kolam menuju jalan berliku.',
      topics: {
        cinta: 'Ada ketidakjelasan, kecurigaan, atau hal yang disembunyikan. Jangan membuat keputusan berdasarkan kecemasan; cari kejelasan dengan sabar.',
        karir: 'Situasi kerja belum jelas; informasi bisa menyesatkan. Waspadai gosip dan janji yang terlalu indah. Periksa fakta.',
        keuangan: 'Hati-hati dengan penipuan dan informasi yang kabur. Baca detail sebelum menandatangani apa pun.',
        kesehatan: 'Kecemasan, gangguan tidur, atau gejala yang sulit dipastikan. Konsultasikan ke profesional; jaga kesehatan mental.',
        diri: 'Menyelami alam bawah sadar: mimpi, ketakutan, dan intuisi. Masa yang kuat untuk kerja batin, asalkan kamu tetap membumi.',
        keluarga: 'Kesalahpahaman atau hal yang belum diucapkan. Hindari asumsi — tanyakan langsung dengan lembut.'
      },
      advice: 'Jangan biarkan ketakutan menipumu; berjalanlah perlahan dengan intuisi sebagai pelita.', pol: -1, revPol: 0.5
    },
    {
      n: 19, name: 'The Sun', nameId: 'Matahari', glyph: '☉', astro: 'Matahari',
      kwUp: ['kebahagiaan', 'kesuksesan', 'vitalitas', 'kejelasan'],
      kwRev: ['kebahagiaan tertunda', 'optimisme berlebih', 'kurang semangat'],
      up: 'The Sun adalah salah satu kartu paling positif. Seorang anak menunggang kuda putih di bawah matahari yang bersinar terang — sukacita yang murni, kesuksesan, dan kehangatan. Segalanya menjadi jelas dan terang; kamu boleh merayakan.',
      rev: 'Terbalik, sinar matahari tertutup awan sementara — kebahagiaan masih ada namun tertunda atau kurang dirasakan. Bisa juga optimisme yang tidak realistis.',
      symbol: 'Anak kecil menunggang kuda putih membawa panji merah, di depan tembok berhias bunga matahari, di bawah matahari besar yang tersenyum.',
      topics: {
        cinta: 'Kebahagiaan, kehangatan, dan hubungan yang penuh keceriaan. Sangat positif untuk pernikahan, komitmen, dan keluarga.',
        karir: 'Sukses, pengakuan, dan pencapaian. Kamu bersinar — saatnya tampil dan menunjukkan karyamu.',
        keuangan: 'Kemakmuran dan stabilitas. Usahamu membuahkan hasil yang menggembirakan.',
        kesehatan: 'Vitalitas tinggi dan pemulihan yang baik. Sinar matahari pagi dan aktivitas luar ruangan sangat bermanfaat.',
        diri: 'Kejernihan, kegembiraan, dan menjadi diri sendiri sepenuhnya. Anak batinmu bahagia.',
        keluarga: 'Keluarga yang bahagia, kabar gembira tentang anak, momen kebersamaan yang hangat.'
      },
      advice: 'Bersinarlah apa adanya — dan izinkan dirimu bahagia.', pol: 2
    },
    {
      n: 20, name: 'Judgement', nameId: 'Kebangkitan', glyph: '♇', astro: 'Pluto · Api',
      kwUp: ['kebangkitan', 'panggilan jiwa', 'evaluasi', 'pengampunan'],
      kwRev: ['menghakimi diri', 'menolak panggilan', 'rasa bersalah'],
      up: 'Judgement menggambarkan malaikat yang meniup sangkakala, membangunkan jiwa-jiwa untuk bangkit. Ini momen kebangkitan dan evaluasi hidup: memaafkan masa lalu, mendengar panggilan jiwa, dan bangkit menjadi versi dirimu yang lebih utuh.',
      rev: 'Terbalik, kamu mungkin terlalu keras menghakimi diri sendiri atau menolak panggilan untuk berubah. Rasa bersalah lama menahan langkahmu.',
      symbol: 'Malaikat Gabriel meniup sangkakala dari balik awan; orang-orang bangkit dari peti dengan tangan terbuka menyambut panggilan.',
      topics: {
        cinta: 'Kesempatan kedua, rekonsiliasi, atau keputusan besar tentang masa depan hubungan. Belajar dari masa lalu untuk mencintai dengan lebih bijak.',
        karir: 'Panggilan untuk karier yang lebih bermakna. Evaluasi, keputusan penting, atau kebangkitan setelah masa sulit.',
        keuangan: 'Evaluasi menyeluruh atas keuangan. Hasil keputusan masa lalu mulai terlihat — saatnya memperbaiki arah.',
        kesehatan: 'Kebangkitan vitalitas dan pemulihan. Keputusan sadar untuk hidup lebih sehat.',
        diri: 'Kebangkitan spiritual. Mendengar dan menjawab panggilan jiwa; memaafkan diri sendiri.',
        keluarga: 'Memaafkan, berdamai, dan berkumpul kembali. Bab lama keluarga ditutup dengan pemahaman.'
      },
      advice: 'Dengarkan panggilan jiwamu dan maafkan masa lalu — saatnya bangkit.', pol: 1
    },
    {
      n: 21, name: 'The World', nameId: 'Dunia', glyph: '♄', astro: 'Saturnus · Tanah',
      kwUp: ['penyelesaian', 'keutuhan', 'pencapaian', 'perjalanan'],
      kwRev: ['belum tuntas', 'tertunda', 'kurang penutupan'],
      up: 'The World adalah akhir dari perjalanan The Fool — siklus yang lengkap, tujuan tercapai, dan rasa utuh. Penari di dalam karangan bunga merayakan keharmonisan dengan semesta. Kamu telah sampai; nikmati pencapaianmu sebelum memulai siklus baru.',
      rev: 'Terbalik, ada yang belum tuntas — tujuan hampir tercapai namun tertunda, atau kamu belum menutup satu bab dengan baik. Selesaikan dulu urusan yang menggantung.',
      symbol: 'Penari berselendang ungu di dalam karangan daun laurel, memegang dua tongkat; di keempat sudut ada malaikat, elang, singa, dan banteng.',
      topics: {
        cinta: 'Hubungan yang utuh dan matang; komitmen jangka panjang, pernikahan, atau perasaan "pulang". Bagi lajang: kamu utuh dengan dirimu sendiri dan siap menarik cinta yang setara.',
        karir: 'Pencapaian besar, proyek selesai, kelulusan, atau peluang internasional. Kerja kerasmu diakui.',
        keuangan: 'Tujuan finansial tercapai. Stabilitas dan rasa cukup. Waktu yang baik untuk merayakan lalu menyusun target berikutnya.',
        kesehatan: 'Kesehatan menyeluruh — tubuh, pikiran, dan jiwa selaras. Pemulihan yang tuntas.',
        diri: 'Rasa menyatu dengan semesta. Satu siklus pembelajaran jiwa telah selesai.',
        keluarga: 'Keluarga yang utuh dan harmonis, perayaan besar, atau berkumpul dari berbagai tempat.'
      },
      advice: 'Selesaikan dengan utuh dan rayakan perjalananmu.', pol: 2
    }
  ];

  const ROMAN = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX', 'XXI'];

  /* ---------------- SUIT (MINOR ARCANA) ---------------- */
  const SUITS = {
    wands: {
      key: 'wands', name: 'Wands', nameId: 'Tongkat', element: 'Api',
      domain: 'semangat, ambisi, kreativitas, dan tindakan',
      hidden: 'soal semangat, motivasi, dan keberanian untuk bertindak',
      adviceDomain: 'dengan semangat dan keberanian bertindak',
      affinity: { cinta: 0.6, karir: 1, keuangan: 0.55, kesehatan: 0.75, diri: 0.75, keluarga: 0.5 },
      lens: {
        cinta: 'Sebagai kartu Tongkat (api), ia berbicara tentang gairah, ketertarikan, dan semangat dalam hubungan.',
        karir: 'Sebagai kartu Tongkat (api), ia menyala tepat di wilayah ambisi, inisiatif, dan semangat kerja — sangat relevan dengan kariermu.',
        keuangan: 'Sebagai kartu Tongkat (api), ia membawa energi usaha dan keberanian mengambil inisiatif untuk menghasilkan uang.',
        kesehatan: 'Sebagai kartu Tongkat (api), ia menyentuh vitalitas, stamina, dan semangat hidupmu.',
        diri: 'Sebagai kartu Tongkat (api), ia menyalakan api tujuan hidup dan gairah jiwamu.',
        keluarga: 'Sebagai kartu Tongkat (api), ia membawa energi aktivitas, semangat, dan kadang gesekan ego di rumah atau pertemanan.'
      }
    },
    cups: {
      key: 'cups', name: 'Cups', nameId: 'Piala', element: 'Air',
      domain: 'perasaan, cinta, intuisi, dan hubungan',
      hidden: 'soal perasaan, kepuasan batin, dan ikatan emosional',
      adviceDomain: 'dengan mendengarkan hatimu',
      affinity: { cinta: 1, karir: 0.4, keuangan: 0.3, kesehatan: 0.6, diri: 0.85, keluarga: 1 },
      lens: {
        cinta: 'Sebagai kartu Piala (air), ia berbicara langsung ke hatimu — perasaan, kedekatan, dan kejujuran rasa. Sangat selaras dengan pertanyaan cinta.',
        karir: 'Sebagai kartu Piala (air), ia membawa sisi emosional pekerjaan: kepuasan batin, hubungan dengan rekan, dan apakah hatimu benar-benar ada di sana.',
        keuangan: 'Sebagai kartu Piala (air), ia mengingatkan bahwa keputusan uangmu dipengaruhi perasaan — rasa aman, puas, atau cemas.',
        kesehatan: 'Sebagai kartu Piala (air), ia menyentuh kesehatan emosional dan keseimbangan cairan tubuh.',
        diri: 'Sebagai kartu Piala (air), ia membuka dunia batin: perasaan, intuisi, dan kepekaan spiritual.',
        keluarga: 'Sebagai kartu Piala (air) — suit keluarga dan persahabatan — ia berbicara tentang ikatan emosional, kehangatan, dan rasa memiliki.'
      }
    },
    swords: {
      key: 'swords', name: 'Swords', nameId: 'Pedang', element: 'Udara',
      domain: 'pikiran, komunikasi, kebenaran, dan konflik',
      hidden: 'soal pikiran, kecemasan, komunikasi, dan keputusan yang belum diambil',
      adviceDomain: 'dengan pikiran yang jernih dan kata-kata yang jujur',
      affinity: { cinta: 0.45, karir: 0.7, keuangan: 0.45, kesehatan: 0.65, diri: 0.7, keluarga: 0.5 },
      lens: {
        cinta: 'Sebagai kartu Pedang (udara), ia menyoroti pikiran dan komunikasi dalam hubungan — kejujuran, keputusan, juga luka karena kata-kata.',
        karir: 'Sebagai kartu Pedang (udara), ia menyoroti strategi, keputusan, komunikasi, dan konflik di tempat kerja.',
        keuangan: 'Sebagai kartu Pedang (udara), ia menuntut kejernihan berpikir dan keputusan rasional tentang uang.',
        kesehatan: 'Sebagai kartu Pedang (udara), ia menyentuh kesehatan mental: stres, pikiran berlebih, dan pola tidur.',
        diri: 'Sebagai kartu Pedang (udara), ia mengajak mengurai keyakinan dan pikiran yang membentuk realitasmu.',
        keluarga: 'Sebagai kartu Pedang (udara), ia menyoroti komunikasi, perbedaan pendapat, dan keputusan sulit dalam keluarga/pertemanan.'
      }
    },
    pentacles: {
      key: 'pentacles', name: 'Pentacles', nameId: 'Pentakel', element: 'Tanah',
      domain: 'materi, uang, pekerjaan, tubuh, dan rumah',
      hidden: 'soal hal-hal praktis: uang, waktu, tubuh, dan rasa aman',
      adviceDomain: 'dengan langkah nyata yang praktis dan konsisten',
      affinity: { cinta: 0.5, karir: 0.9, keuangan: 1, kesehatan: 0.9, diri: 0.5, keluarga: 0.8 },
      lens: {
        cinta: 'Sebagai kartu Pentakel (tanah), ia membawa sisi nyata cinta: komitmen, rasa aman, dan rencana hidup bersama.',
        karir: 'Sebagai kartu Pentakel (tanah), ia berbicara tentang hasil konkret: pekerjaan, keterampilan, dan stabilitas karier.',
        keuangan: 'Sebagai kartu Pentakel (tanah), ia berada tepat di jantung urusan uang, aset, dan kemakmuran — sangat relevan dengan pertanyaanmu.',
        kesehatan: 'Sebagai kartu Pentakel (tanah) — suit tubuh fisik — ia menyentuh pola makan, rutinitas, dan kesehatan jasmani.',
        diri: 'Sebagai kartu Pentakel (tanah), ia mengajak membumikan spiritualitas dalam tindakan sehari-hari.',
        keluarga: 'Sebagai kartu Pentakel (tanah), ia menyentuh rumah, warisan, dan kesejahteraan keluarga.'
      }
    }
  };

  /* ---------------- RANK (angka & kartu istana) ---------------- */
  const RANKS = {
    1: { label: 'As', short: 'A', theme: 'awal baru dan benih potensi', advice: 'Mulailah — tanam benihnya sekarang.',
      rev: 'energi awalnya masih tertahan — peluang tertunda atau belum dimanfaatkan.',
      topics: {
        cinta: 'Benih cinta baru atau babak segar dalam hubungan — momen yang tepat untuk membuka hati.',
        karir: 'Peluang baru sedang ditawarkan: tawaran kerja, proyek, atau ide yang layak dikejar.',
        keuangan: 'Pintu rezeki baru terbuka — sumber pemasukan atau kesempatan finansial yang bisa ditumbuhkan.',
        kesehatan: 'Awal yang baik untuk memulai kebiasaan sehat; energi pemulihan sedang naik.',
        diri: 'Percikan kesadaran baru — undangan untuk memulai perjalanan batin dari titik nol.',
        keluarga: 'Awal baru dalam hubungan keluarga atau pertemanan — kabar baik, anggota baru, atau ikatan yang diperbarui.' } },
    2: { label: 'Dua', short: 'II', theme: 'pilihan, keseimbangan, dan kemitraan', advice: 'Timbang dengan seimbang sebelum memilih.',
      rev: 'keseimbangannya goyah — keputusan tertunda atau kemitraan yang timpang.',
      topics: {
        cinta: 'Dua hati, dua pilihan — tentang keselarasan, keseimbangan memberi dan menerima, atau keputusan di antara dua jalan.',
        karir: 'Menimbang dua opsi atau menjalin kemitraan; menyeimbangkan tuntutan yang berbeda.',
        keuangan: 'Menyeimbangkan pemasukan dan pengeluaran, atau memilih di antara dua keputusan finansial.',
        kesehatan: 'Tubuh meminta keseimbangan — antara aktivitas dan istirahat, antara pikiran dan perasaan.',
        diri: 'Mendamaikan dua sisi dalam diri yang tampak bertentangan.',
        keluarga: 'Hubungan satu-lawan-satu yang penting; perlu saling memahami dan berkompromi.' } },
    3: { label: 'Tiga', short: 'III', theme: 'pertumbuhan dan kolaborasi', advice: 'Bertumbuhlah bersama orang lain.',
      rev: 'pertumbuhannya tersendat — kerja sama kurang selaras.',
      topics: {
        cinta: 'Hubungan tumbuh dan melibatkan lingkungan sosial — tetapi waspadai pihak ketiga atau campur tangan orang lain.',
        karir: 'Pertumbuhan awal dan kerja tim; hasil pertama mulai terlihat ketika kamu berkolaborasi.',
        keuangan: 'Uang mulai berkembang dari usaha awal; kerja sama membawa hasil.',
        kesehatan: 'Perkembangan yang baik; dukungan orang lain mempercepat pemulihan.',
        diri: 'Bertumbuh melalui ekspresi diri dan komunitas.',
        keluarga: 'Berkumpul, merayakan, atau dinamika tiga pihak dalam keluarga/pertemanan.' } },
    4: { label: 'Empat', short: 'IV', theme: 'stabilitas dan fondasi', advice: 'Kokohkan fondasi dan beri dirimu jeda.',
      rev: 'stabilitasnya berubah menjadi stagnasi atau kelekatan berlebih.',
      topics: {
        cinta: 'Fase stabil — bisa berarti rasa aman, tetapi juga kebosanan bila tidak dirawat.',
        karir: 'Fondasi karier yang stabil; saatnya mengonsolidasi, bukan melompat.',
        keuangan: 'Stabilitas dan keamanan finansial; menabung dan menjaga apa yang sudah ada.',
        kesehatan: 'Waktu istirahat dan pemulihan; tubuh butuh jeda dan rutinitas yang menenangkan.',
        diri: 'Menemukan ketenangan dan pijakan yang kokoh di dalam diri.',
        keluarga: 'Rumah sebagai tempat aman; stabilitas dan rasa memiliki.' } },
    5: { label: 'Lima', short: 'V', theme: 'konflik, tantangan, dan kehilangan', advice: 'Hadapi konflik dengan jujur, lalu lepaskan ego.',
      rev: 'konfliknya mulai mereda — fase pemulihan dan belajar dari kehilangan.',
      topics: {
        cinta: 'Ada gesekan, kekecewaan, atau ego yang berbenturan — hadapi dengan jujur agar tidak berlarut.',
        karir: 'Persaingan, konflik, atau kemunduran sementara di tempat kerja.',
        keuangan: 'Kesulitan atau kehilangan finansial; perlu berhemat dan mencari dukungan.',
        kesehatan: 'Tubuh atau pikiran sedang dalam tekanan; jangan abaikan keluhan kecil.',
        diri: 'Krisis kecil yang memaksa pertumbuhan — rasa sakit sebagai guru.',
        keluarga: 'Perselisihan atau jarak emosional dalam keluarga/pertemanan.' } },
    6: { label: 'Enam', short: 'VI', theme: 'pemulihan dan harmoni', advice: 'Beri dan terima dengan tulus.',
      rev: 'harmoninya timpang — terjebak masa lalu atau memberi dengan pamrih.',
      topics: {
        cinta: 'Pemulihan dan keharmonisan; kebaikan yang berbalas, kenangan manis, atau hubungan yang membaik.',
        karir: 'Kemajuan setelah kesulitan; pengakuan, bantuan, atau situasi kerja yang lebih ringan.',
        keuangan: 'Arus memberi dan menerima — bantuan datang, atau kamu bisa membantu orang lain.',
        kesehatan: 'Fase pemulihan; kondisi berangsur membaik.',
        diri: 'Kedamaian setelah badai; berdamai dengan masa lalu.',
        keluarga: 'Kehangatan, nostalgia, dan saling membantu.' } },
    7: { label: 'Tujuh', short: 'VII', theme: 'ujian, evaluasi, dan ketekunan', advice: 'Bertahanlah dan evaluasi dengan jernih.',
      rev: 'ketekunannya melemah — mudah menyerah atau kurang jujur pada diri sendiri.',
      topics: {
        cinta: 'Hubungan sedang diuji — kesetiaan, kejujuran, atau kesabaran. Lihat dengan jernih apa yang nyata.',
        karir: 'Ujian ketekunan; mempertahankan posisi atau mengevaluasi strategi jangka panjang.',
        keuangan: 'Investasi butuh kesabaran; evaluasi dulu sebelum menambah komitmen.',
        kesehatan: 'Pemulihan butuh konsistensi; jangan mudah menyerah pada program sehatmu.',
        diri: 'Menguji keyakinan dan memilah ilusi dari kebenaran.',
        keluarga: 'Menghadapi tantangan dalam hubungan dan mempertahankan batasan yang sehat.' } },
    8: { label: 'Delapan', short: 'VIII', theme: 'gerak, perubahan, dan penguasaan', advice: 'Bergeraklah dan terus asah dirimu.',
      rev: 'geraknya terhambat — tertunda, kehilangan arah, atau terjebak.',
      topics: {
        cinta: 'Pergerakan dan perubahan dalam hubungan — sesuatu bergerak cepat, atau ada yang perlu ditinggalkan.',
        karir: 'Momentum, keahlian yang terus diasah, atau perubahan arah pekerjaan.',
        keuangan: 'Kerja tekun membangun keuangan; atau perubahan arus uang yang perlu diawasi.',
        kesehatan: 'Energi bergerak — olahraga dan aktivitas membantu, namun hindari kelelahan.',
        diri: 'Melepaskan yang lama dan bergerak menuju makna yang lebih dalam.',
        keluarga: 'Perubahan ritme keluarga — kesibukan, kepergian, atau kabar yang datang cepat.' } },
    9: { label: 'Sembilan', short: 'IX', theme: 'puncak dan hampir selesai', advice: 'Bertahan sedikit lagi — kamu hampir sampai.',
      rev: 'puncaknya terasa berat — kecemasan atau kepuasan yang semu.',
      topics: {
        cinta: 'Perasaan yang memuncak atau kepuasan yang hampir tercapai — kamu nyaris tiba di tujuan hati.',
        karir: 'Hampir tiba di garis akhir; bertahanlah sedikit lagi.',
        keuangan: 'Kemandirian dan hasil yang hampir penuh dari kerja kerasmu.',
        kesehatan: 'Perhatikan kelelahan menjelang akhir; pertahankan disiplin sampai tuntas.',
        diri: 'Kepuasan batin, atau ujian terakhir sebelum sebuah siklus selesai.',
        keluarga: 'Rasa syukur atas apa yang sudah dibangun bersama — atau kewaspadaan berlebih yang perlu dilepas.' } },
    10: { label: 'Sepuluh', short: 'X', theme: 'penyelesaian siklus', advice: 'Tuntaskan siklus ini dan lepaskan bebannya.',
      rev: 'penyelesaiannya tertunda — beban berlebih atau akhir yang belum diterima.',
      topics: {
        cinta: 'Siklus emosional mencapai puncaknya — kebahagiaan penuh, atau akhir yang membuka babak baru.',
        karir: 'Penyelesaian besar; beban penuh atau hasil penuh dari sebuah siklus kerja.',
        keuangan: 'Hasil jangka panjang — warisan, kekayaan, atau tanggung jawab finansial yang besar.',
        kesehatan: 'Puncak sebuah siklus; perhatikan beban yang menumpuk dan rayakan kemajuan.',
        diri: 'Satu pelajaran jiwa tuntas; bersiap untuk siklus berikutnya.',
        keluarga: 'Keluarga sebagai satu kesatuan — kebahagiaan bersama atau beban yang dipikul bersama.' } },
    11: { label: 'Page', short: 'P', court: true, person: 'sosok muda, pelajar, atau pembawa kabar', theme: 'pesan, belajar, dan rasa ingin tahu', advice: 'Tetaplah menjadi murid yang penasaran.',
      rev: 'pesannya kabur — ketidakmatangan atau kabar yang tertunda.',
      topics: {
        cinta: 'Pesan atau sinyal ketertarikan, perasaan yang masih muda dan polos; bisa juga sosok yang lebih muda.',
        karir: 'Kabar, kesempatan belajar, magang, atau posisi pemula yang menjanjikan.',
        keuangan: 'Belajar mengelola uang; peluang kecil yang bisa tumbuh.',
        kesehatan: 'Mulai mempelajari tubuhmu sendiri; kabar hasil pemeriksaan.',
        diri: 'Rasa ingin tahu yang murni; menjadi murid kehidupan.',
        keluarga: 'Anak atau anggota keluarga yang lebih muda, atau kabar dari seorang teman.' } },
    12: { label: 'Ksatria', short: 'Kn', court: true, person: 'sosok yang bergerak cepat dan sedang mengejar sesuatu', theme: 'aksi dan pengejaran', advice: 'Bertindaklah — namun dengan arah yang jelas.',
      rev: 'geraknya tergesa atau tak terarah — semangat tanpa kendali.',
      topics: {
        cinta: 'Seseorang yang mendekat atau mengejar dengan cepat; hubungan yang bergerak dan bergairah.',
        karir: 'Aksi cepat, pengejaran target, perjalanan, atau proyek yang sedang melaju.',
        keuangan: 'Mengejar peluang finansial — pastikan semangatnya diimbangi perhitungan.',
        kesehatan: 'Energi tinggi; jaga agar tidak memaksakan diri.',
        diri: 'Mengejar misi jiwa dengan penuh semangat.',
        keluarga: 'Sosok yang datang atau pergi, atau anggota keluarga yang sedang berjuang.' } },
    13: { label: 'Ratu', short: 'Q', court: true, person: 'sosok yang matang, mengayomi, dan peka (sering perempuan, tapi tidak selalu)', theme: 'kematangan batin dan kepedulian', advice: 'Pimpin dari kematangan batin dan kepedulian.',
      rev: 'kematangannya terganggu — emosi tak terkendali atau mengabaikan diri.',
      topics: {
        cinta: 'Sosok yang matang secara emosional, mengayomi, dan setia; kasih yang dewasa.',
        karir: 'Kepemimpinan yang empatik dan cerdas; kamu dihargai karena kematanganmu.',
        keuangan: 'Mengelola keuangan dengan bijak dan penuh perhatian.',
        kesehatan: 'Merawat diri dengan penuh kasih dan kesadaran.',
        diri: 'Menguasai dunia batin — intuisi dan kebijaksanaan yang tenang.',
        keluarga: 'Sosok ibu/pengasuh, atau teman yang menjadi tempat bersandar.' } },
    14: { label: 'Raja', short: 'K', court: true, person: 'sosok berwibawa, mapan, dan bertanggung jawab (sering laki-laki, tapi tidak selalu)', theme: 'penguasaan dan kepemimpinan', advice: 'Ambil tanggung jawab dengan bijak dan tegas.',
      rev: 'kekuasaannya disalahgunakan — terlalu mengontrol atau kurang bijak.',
      topics: {
        cinta: 'Sosok yang stabil, bertanggung jawab, dan berkomitmen; cinta yang dipimpin dengan bijak.',
        karir: 'Otoritas, keahlian puncak, atau atasan yang berpengaruh; kamu siap memimpin.',
        keuangan: 'Penguasaan finansial — keputusan besar dibuat dengan kepala dingin.',
        kesehatan: 'Kendali penuh atas kesehatanmu melalui disiplin yang matang.',
        diri: 'Kepemimpinan atas dirimu sendiri; kebijaksanaan yang diterapkan.',
        keluarga: 'Sosok ayah/pemimpin keluarga, atau teman yang menjadi pelindung.' } }
  };

  const RANK_EN = { 1: 'Ace', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten', 11: 'Page', 12: 'Knight', 13: 'Queen', 14: 'King' };

  /* [rank, kwUp, kwRev, makna tegak, makna terbalik, polaritas, polaritas terbalik(opsional)] */
  const MINOR_DATA = {
    wands: [
      [1, 'inspirasi, gairah baru, potensi kreatif', 'tertunda, kurang semangat, ide mandek',
        'Sebuah tangan muncul dari awan menggenggam tongkat yang bertunas. As Tongkat adalah percikan api inspirasi: ide baru, gairah, dan dorongan untuk memulai sesuatu dengan berani.',
        'Percikan semangat padam sebelum menyala — ide tertunda, kurang motivasi, atau energi yang belum menemukan arah.', 2],
      [2, 'perencanaan, keputusan, visi ke depan', 'takut melangkah, rencana mandek, ragu',
        'Seorang tokoh memegang bola dunia sambil memandang jauh dari benteng. Dua Tongkat adalah tentang merencanakan masa depan dan memutuskan apakah tetap di zona nyaman atau menjelajah dunia yang lebih luas.',
        'Takut keluar dari zona aman membuat rencana hanya tinggal rencana; kurang persiapan atau bingung memilih arah.', 1],
      [3, 'ekspansi, pandangan jauh, kemajuan', 'hambatan, keterlambatan, kecewa pada hasil',
        'Tokoh berdiri di tebing memandang kapal-kapal berlayar. Usaha awalmu mulai membuahkan hasil; saatnya memperluas cakrawala dan menanti kapal-kapalmu kembali membawa hasil.',
        'Rencana tertunda atau hasil tidak sesuai harapan; ekspansi terhambat karena kurang persiapan.', 1],
      [4, 'perayaan, rumah, harmoni, pencapaian', 'ketegangan di rumah, transisi, kurang dukungan',
        'Empat tongkat berhias untaian bunga, orang-orang merayakan di depan kastil. Momen sukacita, perayaan, pulang ke rumah, dan stabilitas yang patut disyukuri.',
        'Perayaan tertunda atau suasana rumah yang kurang harmonis; transisi yang belum mulus.', 2],
      [5, 'persaingan, konflik, perbedaan pendapat', 'menghindari konflik, berdamai, kompromi',
        'Lima orang mengacungkan tongkat seperti sedang bertarung — atau berlatih. Ada persaingan, gesekan ego, dan perbedaan pendapat yang menuntutmu mempertahankan posisi.',
        'Konflik mereda atau dihindari; bisa berarti mencari jalan damai — atau memendam ketegangan.', -1, 0.5],
      [6, 'kemenangan, pengakuan, kepercayaan diri', 'ego, kurang pengakuan, jatuh dari puncak',
        'Penunggang kuda bermahkota daun laurel diarak oleh orang banyak. Enam Tongkat adalah kemenangan di depan umum, pengakuan, dan kepercayaan diri setelah usaha keras.',
        'Pengakuan yang tak kunjung datang atau kesombongan yang menjatuhkan; ragu akan pencapaian sendiri.', 2],
      [7, 'bertahan, mempertahankan posisi, keberanian', 'kewalahan, menyerah, terlalu defensif',
        'Seseorang di atas bukit menangkis enam tongkat dari bawah. Kamu berada di posisi unggul, namun harus mempertahankannya dengan berani dan teguh pada pendirian.',
        'Merasa kewalahan dan ingin menyerah, atau terlalu defensif hingga melawan semua orang.', 0],
      [8, 'kecepatan, kabar cepat, gerak maju', 'tertunda, terburu-buru, frustrasi',
        'Delapan tongkat melesat di udara menuju sasaran. Segalanya bergerak cepat: kabar datang, perjalanan, perkembangan yang pesat.',
        'Hambatan dan penundaan, atau tindakan terburu-buru yang membuat kacau.', 1],
      [9, 'ketahanan, kegigihan, waspada', 'kelelahan, curiga berlebihan, hampir menyerah',
        'Seorang yang terluka berjaga dengan tongkat di tangan. Kamu sudah melewati banyak pertempuran; sedikit lagi — kegigihanmu akan membawamu ke garis akhir.',
        'Kelelahan dan sikap defensif yang berlebihan; kamu butuh istirahat dan dukungan.', 0],
      [10, 'beban, tanggung jawab berlebih, kerja keras', 'melepaskan beban, delegasi, kelelahan total',
        'Seseorang memanggul sepuluh tongkat dengan susah payah. Kamu menanggung terlalu banyak; kesuksesan datang bersama beban tanggung jawab yang berat.',
        'Saatnya melepaskan sebagian beban dan mendelegasikan — atau kamu akan kelelahan total.', -1, 0],
      [11, 'semangat, eksplorasi, kabar baik', 'kurang arah, tidak sabar, ide mentah',
        'Pemuda memandang tongkat bertunas dengan kagum. Page Tongkat membawa antusiasme, rasa ingin tahu, dan kabar menggembirakan tentang hal baru.',
        'Semangat yang cepat padam, ide yang belum matang, atau kabar yang tertunda.', 1],
      [12, 'petualangan, gairah, aksi berani', 'impulsif, tergesa-gesa, tidak konsisten',
        'Kesatria di atas kuda yang mengangkat kaki depannya, siap melesat. Penuh energi, berani mengambil risiko, dan mengejar petualangan.',
        'Gegabah, mudah bosan, atau memulai banyak hal tanpa menyelesaikannya.', 1],
      [13, 'percaya diri, karisma, kehangatan', 'cemburu, egois, kurang percaya diri',
        'Ratu duduk dengan bunga matahari di tangan dan kucing hitam di kakinya. Ia percaya diri, hangat, mandiri, dan memikat — inspirasi bagi orang-orang di sekitarnya.',
        'Rasa tidak aman yang muncul sebagai cemburu atau sikap menuntut; kehilangan kepercayaan diri.', 2],
      [14, 'visi, kepemimpinan, jiwa wirausaha', 'otoriter, impulsif, ekspektasi terlalu tinggi',
        'Raja berjubah motif salamander memegang tongkat bertunas. Pemimpin visioner yang berani mengambil keputusan dan menginspirasi orang lain untuk mengikutinya.',
        'Kepemimpinan yang otoriter atau gegabah; menuntut terlalu banyak dari diri sendiri dan orang lain.', 2]
    ],
    cups: [
      [1, 'cinta baru, luapan perasaan, welas asih', 'emosi tertahan, kekosongan, kurang mencintai diri',
        'Piala meluap dengan lima aliran air, seekor merpati membawa roti suci. As Piala adalah awal emosional yang indah: cinta baru, kasih, dan hati yang terbuka.',
        'Perasaan dipendam atau hati yang tertutup; kamu perlu mengisi pialamu sendiri lebih dulu.', 2],
      [2, 'kemitraan, saling tertarik, persatuan', 'hubungan timpang, komunikasi putus, renggang',
        'Dua orang saling bertukar piala di bawah lambang caduceus berkepala singa. Kartu cinta dan kemitraan yang setara — ketertarikan timbal balik dan ikatan yang tulus.',
        'Hubungan yang timpang, salah paham, atau rasa yang mulai terputus antara dua pihak.', 2],
      [3, 'persahabatan, perayaan, komunitas', 'gosip, pihak ketiga, berlebihan',
        'Tiga perempuan mengangkat piala sambil menari. Persahabatan, perayaan, dan kegembiraan bersama komunitas.',
        'Pesta berlebihan, gosip, atau kehadiran pihak ketiga yang mengganggu.', 2],
      [4, 'apatis, perenungan, kurang puas', 'kesadaran baru, menerima tawaran, bangkit',
        'Seseorang duduk di bawah pohon dengan tangan bersilang, mengabaikan piala yang ditawarkan dari awan. Bosan, tidak puas, atau terlalu tenggelam dalam diri hingga melewatkan kesempatan.',
        'Bangun dari kebosanan; kamu mulai melihat peluang yang selama ini terabaikan.', -1, 0.5],
      [5, 'kehilangan, penyesalan, duka', 'menerima, memaafkan, bangkit',
        'Sosok berjubah hitam menunduk menatap tiga piala tumpah, tanpa melihat dua piala yang masih berdiri di belakangnya. Duka dan penyesalan — namun masih ada yang tersisa untuk disyukuri.',
        'Mulai menerima kehilangan dan bangkit; berdamai dengan masa lalu.', -1, 0.5],
      [6, 'nostalgia, kenangan manis, kebaikan', 'terjebak masa lalu, naif, tidak realistis',
        'Seorang anak memberikan piala berisi bunga kepada anak lain. Kenangan manis, kepolosan, kebaikan, dan mungkin pertemuan kembali dengan seseorang dari masa lalu.',
        'Terlalu terikat pada masa lalu sehingga sulit bergerak maju.', 1],
      [7, 'banyak pilihan, khayalan, ilusi', 'kejelasan, keputusan, realistis',
        'Tujuh piala melayang di awan berisi berbagai godaan. Banyak pilihan dan angan-angan, namun tidak semuanya nyata. Bedakan mimpi dari ilusi.',
        'Kabut mulai terang; kamu siap memilih dengan realistis.', -1, 0.5],
      [8, 'meninggalkan, mencari makna, melepas', 'takut pergi, ragu, kembali ke yang lama',
        'Sosok berjalan pergi meninggalkan delapan piala yang tersusun rapi, menuju gunung di bawah bulan. Meninggalkan sesuatu yang tak lagi memuaskan jiwa demi pencarian yang lebih bermakna.',
        'Ragu untuk pergi, atau bertahan di situasi yang sebenarnya sudah tidak membahagiakan.', 0],
      [9, 'harapan terkabul, puas, bahagia', 'kepuasan semu, serakah, kecewa',
        'Seorang pria duduk puas dengan sembilan piala berjajar di belakangnya. Disebut "kartu permohonan" — keinginanmu cenderung terkabul.',
        'Kepuasan yang dangkal, atau keinginan yang terkabul namun tidak membahagiakan seperti yang dibayangkan.', 2],
      [10, 'kebahagiaan keluarga, harmoni, cinta yang langgeng', 'keluarga kurang harmonis, ekspektasi, keretakan',
        'Keluarga bahagia di bawah pelangi sepuluh piala. Kebahagiaan emosional yang utuh, keharmonisan rumah tangga, dan cinta yang bertahan.',
        'Ketidakharmonisan di rumah, atau ekspektasi "keluarga sempurna" yang membebani.', 2],
      [11, 'pesan cinta, kreativitas, intuisi', 'emosi belum dewasa, kecewa, kreativitas tersumbat',
        'Pemuda memegang piala berisi ikan yang muncul tiba-tiba. Kabar yang menyentuh hati, ide kreatif, atau ungkapan perasaan yang manis dan polos.',
        'Perasaan yang belum matang, terlalu sensitif, atau kreativitas yang tersumbat.', 1],
      [12, 'romantis, tawaran, mengikuti hati', 'suasana hati berubah-ubah, janji kosong, cemburu',
        'Kesatria berkuda pelan membawa piala dengan anggun. Pembawa tawaran romantis, undangan, atau seseorang yang mengikuti kata hatinya.',
        'Janji manis yang tidak ditepati, suasana hati yang berubah-ubah, atau idealisme yang tidak realistis.', 1],
      [13, 'empati, kasih sayang, intuisi', 'terlalu sensitif, ketergantungan, lelah emosional',
        'Ratu duduk di tepi laut menatap piala berhias yang tertutup. Penuh empati, intuitif, dan pengasih — ia memahami perasaan orang lain dengan dalam.',
        'Kelelahan emosional karena menyerap perasaan orang lain; lupa merawat diri sendiri.', 2],
      [14, 'emosi seimbang, bijak, diplomatis', 'manipulatif, emosi tertekan, dingin',
        'Raja duduk di singgasana yang mengapung di tengah laut bergelora, namun tetap tenang. Kematangan emosional — mampu tetap tenang dan bijak di tengah gejolak.',
        'Emosi yang dipendam atau dipakai untuk memanipulasi; tampak tenang di luar tapi bergolak di dalam.', 1]
    ],
    swords: [
      [1, 'kejernihan, kebenaran, terobosan', 'kebingungan, salah komunikasi, kata-kata tajam',
        'Tangan dari awan menggenggam pedang bermahkota. Kejernihan pikiran, kebenaran, dan terobosan — kamu melihat situasi dengan tajam.',
        'Pikiran kacau, keputusan yang keliru, atau kata-kata yang melukai.', 1],
      [2, 'jalan buntu, menghindar, keputusan sulit', 'kebimbangan memuncak, informasi berlebih, terpaksa memilih',
        'Perempuan dengan mata tertutup menyilangkan dua pedang di dada, di tepi laut. Keputusan sulit yang terus ditunda; menutup mata agar tidak perlu memilih.',
        'Kebimbangan memuncak; informasi baru memaksamu untuk memutuskan.', -1, 0],
      [3, 'patah hati, duka, luka emosional', 'pemulihan, memaafkan, melepas duka',
        'Tiga pedang menembus hati merah di bawah awan hujan. Patah hati, kesedihan, atau kebenaran yang menyakitkan. Rasa sakit ini nyata dan perlu dirasakan agar bisa sembuh.',
        'Luka mulai pulih; kamu belajar melepaskan dan memaafkan.', -2, 0],
      [4, 'istirahat, pemulihan, kontemplasi', 'gelisah, kelelahan, kembali beraktivitas',
        'Seorang kesatria berbaring di atas makam dengan tangan dalam posisi berdoa. Waktu untuk beristirahat, memulihkan diri, dan menenangkan pikiran sebelum melangkah lagi.',
        'Gelisah dan tidak bisa beristirahat, atau terpaksa kembali beraktivitas sebelum pulih.', 0],
      [5, 'konflik, kemenangan pahit, ego', 'berdamai, menyesal, melepas dendam',
        'Seorang pria tersenyum mengumpulkan pedang sementara dua orang pergi dengan kecewa. Kemenangan yang merusak hubungan — apakah menang lebih penting daripada damai?',
        'Keinginan untuk berdamai dan memperbaiki hubungan setelah konflik.', -2, 0],
      [6, 'transisi, meninggalkan masalah, perjalanan', 'sulit pergi, beban terbawa, tertahan',
        'Tukang perahu membawa seorang perempuan dan anak menyeberang menuju perairan yang tenang. Bergerak menjauh dari masa sulit menuju tempat yang lebih damai.',
        'Sulit meninggalkan masalah, atau membawa beban lama ke tempat yang baru.', 1],
      [7, 'strategi, siasat, ketidakjujuran', 'ketahuan, pengakuan, mengubah cara',
        'Seseorang mengendap-endap membawa lima pedang dari perkemahan. Siasat dan strategi diam-diam — atau ketidakjujuran. Waspadai siapa yang bermain curang.',
        'Rahasia terungkap, atau kamu memutuskan berhenti menipu diri sendiri.', -1, 0],
      [8, 'terjebak, membatasi diri, merasa tak berdaya', 'membebaskan diri, perspektif baru, jalan keluar',
        'Perempuan terikat dan tertutup matanya di antara delapan pedang — padahal jalannya sebenarnya terbuka. Penjara ini sebagian besar dibangun oleh pikiranmu sendiri.',
        'Mulai membebaskan diri dari pikiran yang membatasi; kamu melihat jalan keluar.', -1, 1],
      [9, 'kecemasan, mimpi buruk, overthinking', 'harapan, mulai pulih, kecemasan mereda',
        'Seseorang terbangun di tengah malam, menutup wajah, dengan sembilan pedang di dinding. Kecemasan dan pikiran berlebih yang membuat masalah tampak lebih besar dari aslinya.',
        'Kecemasan mereda; kamu mulai melihat bahwa tidak semuanya seburuk yang dibayangkan.', -2, 0],
      [10, 'titik terendah, akhir yang menyakitkan, selesai', 'bangkit, pemulihan, enggan melepas',
        'Seseorang terbaring dengan sepuluh pedang di punggung, namun fajar mulai menyingsing. Titik terendah — akhir yang menyakitkan, tetapi tidak ada lagi yang lebih buruk; dari sini hanya ada jalan naik.',
        'Bangkit dari keterpurukan, meski bekas lukanya masih terasa.', -2, 0.5],
      [11, 'rasa ingin tahu, ide baru, waspada', 'gosip, bicara tanpa pikir, defensif',
        'Pemuda memegang pedang dengan angin berembus di sekitarnya. Pikiran tajam, haus pengetahuan, dan siap menghadapi tantangan intelektual.',
        'Bicara tanpa berpikir, gosip, atau sikap defensif.', 0],
      [12, 'ambisius, cepat bertindak, tegas', 'tergesa-gesa, kasar, tanpa rencana',
        'Kesatria menyerbu dengan pedang terhunus menantang angin. Bertindak cepat dan tegas, langsung ke inti persoalan.',
        'Gegabah dan kasar; menyerbu tanpa memikirkan akibat.', 0],
      [13, 'jernih, mandiri, jujur', 'dingin, kejam, pahit',
        'Ratu duduk tegak, pedang terangkat, tangan terulur. Jernih, jujur, dan mandiri — ia melihat kebenaran tanpa ilusi, ditempa oleh pengalaman.',
        'Kepahitan masa lalu membuatnya dingin dan terlalu kritis.', 1],
      [14, 'otoritas intelektual, kebenaran, adil', 'manipulatif, tirani, kejam',
        'Raja duduk dengan pedang tegak lurus, penuh wibawa. Pemikir yang adil dan tegas, mengambil keputusan berdasarkan logika dan prinsip.',
        'Kecerdasan dipakai untuk memanipulasi; keputusan dingin tanpa empati.', 1]
    ],
    pentacles: [
      [1, 'peluang materi, kemakmuran, manifestasi', 'peluang hilang, perencanaan buruk, boros',
        'Tangan dari awan menyodorkan koin emas di atas taman yang subur. Peluang nyata untuk kemakmuran: pekerjaan baru, sumber uang baru, atau awal yang kokoh.',
        'Peluang terlewat atau rencana keuangan yang buruk.', 2],
      [2, 'mengatur prioritas, adaptasi, luwes', 'kewalahan, tidak teratur, berantakan',
        'Pemuda menari sambil memainkan dua koin dalam lingkaran tak hingga, kapal terombang-ambing di belakangnya. Menyeimbangkan banyak hal dengan luwes.',
        'Kewalahan mengatur waktu dan uang; terlalu banyak hal yang dipegang.', 0],
      [3, 'kerja tim, keahlian, pembelajaran', 'kurang kerja sama, kualitas buruk',
        'Tukang batu bekerja di katedral sambil berdiskusi dengan dua perancang. Keahlian yang dihargai dan kerja sama yang membangun sesuatu yang bernilai.',
        'Kerja tim yang tidak kompak, atau kualitas yang dikorbankan.', 1],
      [4, 'menabung, keamanan, kontrol', 'pelit, takut kehilangan, boros',
        'Seseorang memeluk koin erat-erat, satu di atas kepala dan dua di bawah kaki. Keamanan finansial dan menabung — namun hati-hati menjadi terlalu menggenggam.',
        'Terlalu pelit, atau sebaliknya melepas kendali hingga boros.', 0],
      [5, 'kesulitan, kehilangan, merasa terabaikan', 'pemulihan, bantuan datang, keluar dari krisis',
        'Dua orang miskin berjalan di salju melewati jendela gereja yang terang. Kesulitan materi atau rasa terasing — padahal bantuan mungkin ada di dekatmu.',
        'Masa sulit mulai berakhir; bantuan dan pemulihan datang.', -2, 0.5],
      [6, 'memberi, menerima, kedermawanan', 'utang, pamrih, ketimpangan',
        'Pedagang kaya menimbang dan memberikan koin kepada yang membutuhkan. Keseimbangan memberi dan menerima; kedermawanan atau bantuan yang datang.',
        'Bantuan dengan pamrih, utang yang membebani, atau ketidakseimbangan.', 1],
      [7, 'kesabaran, investasi jangka panjang, evaluasi', 'hasil kurang, tidak sabar, usaha sia-sia',
        'Petani bersandar pada cangkulnya memandang tanaman berbuah koin. Investasi jangka panjang yang mulai tumbuh — bersabarlah dan evaluasi hasilnya.',
        'Tidak sabar menunggu hasil, atau usaha yang tidak sebanding dengan hasilnya.', 0],
      [8, 'ketekunan, keahlian, dedikasi', 'perfeksionis, kurang fokus, asal-asalan',
        'Pengrajin tekun memahat koin satu per satu. Dedikasi, belajar keterampilan, dan kerja tekun yang membangun keahlian.',
        'Perfeksionisme berlebihan atau kerja asal-asalan tanpa semangat.', 1],
      [9, 'kemandirian, kemewahan, hasil kerja keras', 'bergantung, pamer, kerja berlebihan',
        'Perempuan anggun di kebun anggur dengan burung di tangannya. Kemandirian finansial dan menikmati hasil kerja kerasmu.',
        'Bergantung secara finansial, atau gaya hidup yang dibangun di atas penampilan.', 2],
      [10, 'kekayaan, warisan, keluarga, stabilitas', 'masalah warisan, ketidakstabilan keluarga',
        'Keluarga tiga generasi di bawah gerbang, dengan anjing dan sepuluh koin. Kekayaan jangka panjang, warisan, dan keamanan keluarga.',
        'Konflik soal warisan atau ketidakstabilan finansial keluarga.', 2],
      [11, 'belajar, ambisi, peluang awal', 'kurang progres, menunda, tidak fokus',
        'Pemuda menatap koin di tangannya dengan penuh perhatian. Kesempatan belajar, keterampilan baru, dan langkah awal yang praktis menuju tujuan.',
        'Menunda-nunda atau kurang disiplin mewujudkan rencana.', 1],
      [12, 'tekun, dapat diandalkan, metodis', 'membosankan, malas, terlalu kaku',
        'Kesatria duduk tenang di atas kuda yang diam, memandang koin. Lambat tapi pasti — kerja keras yang konsisten dan dapat diandalkan.',
        'Stagnasi, terlalu kaku, atau kemalasan.', 1],
      [13, 'mengayomi, praktis, sejahtera', 'terlalu sibuk, mengabaikan diri, materialistis',
        'Ratu memangku koin di taman yang subur, seekor kelinci di dekatnya. Praktis, hangat, dan mampu menciptakan rumah serta kehidupan yang nyaman.',
        'Terlalu sibuk bekerja atau mengurus orang lain hingga mengabaikan diri sendiri.', 2],
      [14, 'kemakmuran, keamanan, pengusaha sukses', 'serakah, keras kepala, materialistis',
        'Raja berjubah motif anggur duduk di singgasana berhias kepala banteng. Kesuksesan materi, kestabilan, dan kepemimpinan yang membumi.',
        'Terobsesi pada status dan uang; kaku dan keras kepala.', 2]
    ]
  };

  /* ---------------- BANGUN DECK ---------------- */
  const split = (s) => s.split(',').map((x) => x.trim());
  const defaultRevPol = (pol) => (pol >= 0 ? -1 : pol + 1);

  const DECK = [];

  MAJORS.forEach((m) => {
    DECK.push({
      id: 'M' + m.n,
      arcana: 'major',
      number: m.n,
      numeral: ROMAN[m.n],
      name: m.name,
      nameId: m.nameId,
      glyph: m.glyph,
      astro: m.astro,
      element: null,
      suit: null,
      rank: null,
      kwUp: m.kwUp,
      kwRev: m.kwRev,
      up: m.up,
      rev: m.rev,
      symbol: m.symbol,
      topics: m.topics,
      advice: m.advice,
      pol: m.pol,
      revPol: m.revPol !== undefined ? m.revPol : defaultRevPol(m.pol)
    });
  });

  Object.keys(MINOR_DATA).forEach((suitKey) => {
    const suit = SUITS[suitKey];
    MINOR_DATA[suitKey].forEach((row) => {
      const [rank, kwUp, kwRev, up, rev, pol, revPol] = row;
      const r = RANKS[rank];
      DECK.push({
        id: suitKey + '-' + rank,
        arcana: 'minor',
        number: rank,
        numeral: r.short,
        name: RANK_EN[rank] + ' of ' + suit.name,
        nameId: r.label + ' ' + suit.nameId,
        glyph: null,
        astro: null,
        element: suit.element,
        suit: suitKey,
        rank: rank,
        court: !!r.court,
        kwUp: split(kwUp),
        kwRev: split(kwRev),
        up: up,
        rev: rev,
        symbol: null,
        topics: null,
        advice: r.advice + ' Lakukan ' + suit.adviceDomain + '.',
        pol: pol,
        revPol: revPol !== undefined ? revPol : defaultRevPol(pol)
      });
    });
  });

  window.TAROT = {
    DECK: DECK,
    SUITS: SUITS,
    RANKS: RANKS,
    TOPIC_KEYS: TOPIC_KEYS,
    byId: (id) => DECK.find((c) => c.id === id)
  };
})();
