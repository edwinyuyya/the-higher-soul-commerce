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
      up: 'The Fool adalah awal dari perjalanan jiwa. Dia melangkah ke tepi jurang dengan hati ringan, percaya bahwa semesta bakal menopangnya. Kartu ini nandain babak baru yang belum tertulis, kesempatan buat mulai tanpa beban masa lalu, dengan rasa penasaran dan keberanian yang polos.',
      rev: 'Terbalik, The Fool memperingatkan tentang langkah yang diambil tanpa ngeliat ke bawah: keputusan impulsif, naif, atau justru rasa takut yang bikin kamu nggak berani mulai sama sekali. Ada lompatan yang perlu dipikirin lebih mateng.',
      symbol: 'Seorang pemuda bawa buntelan kecil dan setangkai mawar putih, seekor anjing setia di kakinya, berdiri di tepi tebing di bawah matahari pagi. Mawar putih melambangkan kemurnian niat; anjing adalah naluri yang melindungi.',
      topics: {
        cinta: 'Cinta yang datang tak terduga atau hubungan yang masuk ke fase baru yang segar. Buat yang lajang, buka diri pada pertemuan spontan; bagi yang berpasangan, ajak pasangan berpetualang dan keluar dari rutinitas.',
        karir: 'Peluang baru, pekerjaan baru, bidang baru, atau usaha rintisan. Kamu mungkin belum punya semua jawabannya, tapi antusiasme dan keberanian nyoba adalah modal utamamu sekarang.',
        keuangan: 'Awal baru dalam keuangan, tapi waspadain pengeluaran impulsif. Bagus buat mulai belajar investasi atau nabung dari nol, asalkan nggak berspekulasi buta.',
        kesehatan: 'Energi segar dan semangat mulai kebiasaan sehat baru. Hati-hati dengan kecerobohan fisik, cedera kecil karena buru-buru.',
        diri: 'Jiwa manggil kamu buat percaya pada perjalanan. Lepasin kebutuhan buat ngontrol semuanya; pertumbuhan datang ketika kamu berani jadi pemula lagi.',
        keluarga: 'Suasana baru di rumah atau dalam pertemanan, mungkin pindahan, anggota keluarga baru, atau teman baru yang bawa keceriaan. Bawa sikap terbuka dan ringan.'
      },
      advice: 'Berani melangkah, meski belum ngeliat seluruh jalan.', pol: 1
    },
    {
      n: 1, name: 'The Magician', nameId: 'Sang Penyihir', glyph: '☿', astro: 'Merkurius',
      kwUp: ['kehendak', 'keterampilan', 'manifestasi', 'sumber daya'],
      kwRev: ['manipulasi', 'potensi terbuang', 'tipu daya'],
      up: 'The Magician berdiri dengan satu tangan menunjuk langit dan satu ke bumi: "seperti di atas, begitu pula di bawah". Di mejanya ada keempat simbol suit, tongkat, piala, pedang, pentakel, artinya kamu punya semua alat yang dibutuhin. Ini kartu manifestasi: niat yang jelas ditambah tindakan terfokus bakal wujudin apa yang kamu mau.',
      rev: 'Terbalik, kekuatan The Magician bisa disalahgunakan atau nggak digunakan. Waspadain manipulasi, dari orang lain maupun dari dirimu sendiri, serta bakat yang terbengkalai karena kurang fokus dan rasa nggak percaya diri.',
      symbol: 'Penyihir berjubah merah di atas jubah putih, lambang tak hingga melayang di atas kepalanya, dikelilingi mawar dan lili di taman.',
      topics: {
        cinta: 'Kamu punya daya tarik dan kemampuan buat menciptakan hubungan yang kamu mau. Ungkapin perasaan dengan jelas, komunikasi adalah sihirmu. Bisa juga nandain seseorang yang pandai memikat.',
        karir: 'Saat yang tepat buat nunjukin kemampuan: presentasi, wawancara, peluncuran proyek. Keterampilanmu udah cukup, sekarang soal eksekusi dan percaya diri.',
        keuangan: 'Kemampuan menciptakan penghasilan dari keterampilanmu sendiri. Ide bisnis atau sumber pemasukan baru bisa diwujudkan kalau direncanakan dan dijalankan dengan fokus.',
        kesehatan: 'Pikiran berpengaruh kuat pada tubuh. Kamu punya kendali besar atas pemulihan dan kebugaranmu, mulai dengan niat yang jelas dan rutinitas yang disiplin.',
        diri: 'Kamu adalah pencipta realitasmu. Selaraskan pikiran, perasaan, kata, dan tindakan; ketika keempatnya searah, perubahan terjadi.',
        keluarga: 'Kamu bisa jadi penengah atau penggerak dalam keluarga/pertemanan. Kata-katamu punya pengaruh, pakai buat menyatukan, bukan mengatur.'
      },
      advice: 'Pakai yang udah ada di tanganmu. Kamu lebih siap dari yang kamu kira.', pol: 2
    },
    {
      n: 2, name: 'The High Priestess', nameId: 'Sang Pendeta Wanita', glyph: '☽', astro: 'Bulan',
      kwUp: ['intuisi', 'misteri', 'pengetahuan batin', 'ketenangan'],
      kwRev: ['rahasia', 'mengabaikan intuisi', 'kebingungan batin'],
      up: 'The High Priestess duduk di antara dua pilar, terang dan gelap, menjaga tirai menuju alam bawah sadar. Dia mengajakmu diam dan denger suara batin. Nggak semua jawaban datang dari logika; sebagian udah kamu ketahui jauh di dalam diri.',
      rev: 'Terbalik, ada suara batin yang kamu abaikan, atau rahasia yang mulai muncul ke permukaan. Kamu mungkin terlalu sibuk mencari jawaban di luar sehingga kehilangan koneksi dengan intuisimu sendiri.',
      symbol: 'Seorang perempuan berjubah biru duduk di antara pilar hitam (Boaz) dan putih (Jachin), memegang gulungan kitab, dengan bulan sabit di kakinya dan tirai bergambar delima di belakangnya.',
      topics: {
        cinta: 'Ada perasaan yang belum diungkapkan, dari dirimu atau dari dia. Ketertarikan yang dalam dan misterius. Percaya sama firasatmu tentang orang ini, dan jangan buru-buru; biarin semuanya terungkap perlahan.',
        karir: 'Jangan membuka semua kartu dulu. Amati, kumpulkan informasi, dan percaya sama instingmu dalam membaca situasi kantor. Ada hal di balik layar yang belum keliatan.',
        keuangan: 'Belum saatnya keputusan besar. Ada informasi yang belum lengkap, tunggu dan pelajari dulu. Instingmu tentang suatu tawaran perlu didengarkan.',
        kesehatan: 'Dengerin sinyal halus dari tubuhmu. Berkaitan juga dengan siklus hormonal, tidur, dan kesehatan batin. Istirahat dan meditasi bakal bantu.',
        diri: 'Masa yang sangat baik buat meditasi, menulis jurnal, dan memperdalam spiritualitas. Jawabanmu ada di dalam, bukan di luar.',
        keluarga: 'Ada hal yang nggak dikatakan dalam keluarga atau lingkar pertemanan. Jadi pendengar yang peka; kadang dukungan terbaik adalah kehadiran yang tenang.'
      },
      advice: 'Diam bentar, dengerin feeling-mu. Dia udah tahu jawabannya.', pol: 1
    },
    {
      n: 3, name: 'The Empress', nameId: 'Sang Permaisuri', glyph: '♀', astro: 'Venus',
      kwUp: ['kelimpahan', 'kesuburan', 'kasih sayang', 'kreativitas'],
      kwRev: ['ketergantungan', 'mengabaikan diri', 'kreativitas mandek'],
      up: 'The Empress adalah ibu bumi, lambang kelimpahan, keindahan, dan kasih yang memelihara. Segala yang kamu rawat dengan sabar bakal bertumbuh. Kartu ini mengundangmu menikmati hidup lewat panca indra, berkarya, serta merawat diri dan orang lain.',
      rev: 'Terbalik, energi pemeliharaan jadi nggak seimbang: terlalu mengurus orang lain hingga lupa diri, atau sebaliknya ngerasa kering dan nggak dirawat. Bisa juga tanda kreativitas tersumbat atau ketergantungan emosional.',
      symbol: 'Perempuan bermahkota dua belas bintang bersandar di bantal di tengah ladang gandum matang dan hutan rimbun, dengan perisai berlambang Venus.',
      topics: {
        cinta: 'Hubungan yang hangat, penuh kasih, dan memelihara. Bisa nandain komitmen yang lebih dalam, keharmonisan, bahkan kehamilan. Kamu memancarkan daya tarik alami sekarang.',
        karir: 'Proyek yang kamu rawat mulai berbuah. Sangat baik buat bidang kreatif, desain, perawatan, dan pekerjaan yang melibatkan kepedulian. Kepemimpinanmu yang mengayomi dihargai.',
        keuangan: 'Kelimpahan dan kenyamanan materi. Uang mengalir ketika kamu bekerja dengan hal yang kamu cintai. Nikmati hasilmu, tapi tetap bijak.',
        kesehatan: 'Vitalitas, kesuburan, dan pemulihan. Tubuh minta dirawat dengan makanan bergizi, alam, dan istirahat yang cukup.',
        diri: 'Saatnya mencintai diri sendiri secara nyata, bukan sekadar konsep. Terhubung dengan alam dan kreativitas bakal memulihkan jiwamu.',
        keluarga: 'Rumah yang hangat dan keluarga yang harmonis. Sosok ibu atau pengasuh memegang peran penting. Kabar kelahiran atau berkumpulnya keluarga.'
      },
      advice: 'Rawat dirimu, mimpimu, dan orang-orangmu. Pelan-pelan, pakai sayang.', pol: 2
    },
    {
      n: 4, name: 'The Emperor', nameId: 'Sang Kaisar', glyph: '♈', astro: 'Aries',
      kwUp: ['struktur', 'otoritas', 'stabilitas', 'kepemimpinan'],
      kwRev: ['kekakuan', 'dominasi', 'kehilangan kendali'],
      up: 'The Emperor membangun kerajaan lewat disiplin, aturan, dan tanggung jawab. Dia mewakili struktur yang bikin hidup stabil dan aman. Kartu ini mengajakmu mengambil kendali, bikin rencana yang jelas, dan bertindak sebagai pemimpin hidupmu sendiri.',
      rev: 'Terbalik, struktur berubah jadi kekakuan atau tirani: terlalu mengontrol, keras kepala, atau berhadapan dengan figur otoritas yang menekan. Bisa juga sebaliknya, hidup tanpa arah dan disiplin.',
      symbol: 'Seorang raja tua berbaju zirah di bawah jubah merah duduk di singgasana batu berhias kepala domba jantan, dengan gunung tandus di belakangnya.',
      topics: {
        cinta: 'Hubungan yang stabil dan dapat diandalkan, mungkin dengan sosok yang protektif dan dewasa. Komitmen serius. Tapi pastiin rasa aman nggak berubah jadi kontrol.',
        karir: 'Kepemimpinan, promosi, atau bekerja dengan atasan yang tegas. Saatnya menyusun strategi dan sistem kerja yang rapi. Kamu dihormati karena konsistensi.',
        keuangan: 'Kelola uang dengan disiplin: anggaran, dana darurat, investasi jangka panjang. Stabilitas datang dari aturan yang kamu tepati.',
        kesehatan: 'Rutinitas dan disiplin adalah obat. Perhatiin kepala, stres karena beban tanggung jawab, dan pola tidur.',
        diri: 'Menjadi otoritas atas hidupmu sendiri: bikin batasan, menepati janji pada diri, dan bertanggung jawab atas pilihan.',
        keluarga: 'Sosok ayah atau kepala keluarga berperan besar. Aturan rumah, tanggung jawab, dan perlindungan. Seimbangkan ketegasan dengan kehangatan.'
      },
      advice: 'Bikin rencana, pasang batasan, terus pegang setir hidupmu sendiri.', pol: 1
    },
    {
      n: 5, name: 'The Hierophant', nameId: 'Sang Guru Agung', glyph: '♉', astro: 'Taurus',
      kwUp: ['tradisi', 'bimbingan', 'nilai', 'institusi'],
      kwRev: ['memberontak', 'dogma', 'jalan sendiri'],
      up: 'The Hierophant adalah penjaga tradisi dan kebijaksanaan yang diwariskan. Dia mewakili guru, mentor, lembaga, dan nilai-nilai bersama. Kartu ini menyarankan belajar dari yang berpengalaman, mengikuti jalur yang udah teruji, atau nemu makna dalam komunitas dan keyakinan.',
      rev: 'Terbalik, kamu mungkin ngerasa terkekang oleh aturan, tradisi, atau ekspektasi. Ini bisa jadi panggilan buat mempertanyakan dogma dan nemu kebenaranmu sendiri, atau peringatan tentang sikap memberontak tanpa arah.',
      symbol: 'Seorang pemuka agama bermahkota tiga tingkat mengangkat tangan memberkati dua murid, dengan dua kunci bersilang di kakinya.',
      topics: {
        cinta: 'Hubungan yang mengarah pada komitmen formal, tunangan, pernikahan, restu keluarga. Nilai dan keyakinan bersama jadi fondasi.',
        karir: 'Bekerja dalam institusi atau struktur yang mapan, mencari mentor, pendidikan, sertifikasi. Ikuti prosedur; jalur konvensional menguntungkan sekarang.',
        keuangan: 'Pendekatan konservatif dan terbukti lebih aman: bank, asuransi, nasihat profesional. Hindari skema yang terlalu menjanjikan.',
        kesehatan: 'Ikuti saran tenaga medis dan pengobatan yang teruji. Rutinitas sehat yang diwariskan (pola makan, ibadah, olahraga teratur) bawa manfaat.',
        diri: 'Mencari guru, komunitas, atau tradisi spiritual yang membimbing. Belajar dengan rendah hati dari yang lebih dahulu berjalan.',
        keluarga: 'Tradisi keluarga, acara adat, perkumpulan, atau peranmu sebagai pembimbing bagi yang lebih muda. Nilai keluarga sangat menonjol.'
      },
      advice: 'Tanya ke yang lebih berpengalaman, dan pegang nilai yang kamu yakini.', pol: 1
    },
    {
      n: 6, name: 'The Lovers', nameId: 'Sang Kekasih', glyph: '♊', astro: 'Gemini',
      kwUp: ['cinta', 'keselarasan', 'pilihan dari hati', 'nilai'],
      kwRev: ['ketidakselarasan', 'pilihan sulit', 'godaan'],
      up: 'The Lovers ngomongin cinta, tapi lebih dalam lagi tentang pilihan yang selaras dengan nilai sejatimu. Dua jiwa yang saling melengkapi di bawah berkat malaikat, kartu ini nandain hubungan yang bermakna dan keputusan penting yang datang dari hati.',
      rev: 'Terbalik, ada ketidakselarasan: nilai yang berbeda, komunikasi yang terputus, atau godaan yang menjauhkan dari komitmen. Bisa juga keraguan dalam memilih karena takut kehilangan salah satunya.',
      symbol: 'Dua manusia berdiri di bawah malaikat Raphael; di belakang sang perempuan ada pohon pengetahuan dengan ular, di belakang sang lelaki pohon berapi.',
      topics: {
        cinta: 'Salah satu kartu terkuat buat cinta: ketertarikan mendalam, belahan jiwa, hubungan yang naik ke level komitmen. Ada pilihan dari hati yang perlu diambil dengan jujur.',
        karir: 'Pilihan penting dalam karier, pilih yang selaras dengan nilaimu, bukan cuma gaji. Kemitraan atau kolaborasi yang harmonis.',
        keuangan: 'Keputusan finansial yang melibatkan pasangan atau mitra. Selaraskan prioritas keuangan bersama sebelum melangkah.',
        kesehatan: 'Keseimbangan antara pikiran dan hati. Kesehatan membaik ketika kamu hidup selaras dengan nilai-nilaimu dan menjaga hubungan yang sehat.',
        diri: 'Mengenal nilai-nilai terdalammu dan hidup sesuai dengannya. Menyatukan sisi-sisi yang berlawanan dalam diri.',
        keluarga: 'Ikatan yang erat, rekonsiliasi, atau keputusan keluarga yang perlu diambil bersama. Pertemanan yang kerasa kayak keluarga.'
      },
      advice: 'Pilih pakai hati yang jujur. Mana yang beneran kamu banget?', pol: 2
    },
    {
      n: 7, name: 'The Chariot', nameId: 'Sang Kereta Perang', glyph: '♋', astro: 'Cancer',
      kwUp: ['tekad', 'kemenangan', 'kendali', 'gerak maju'],
      kwRev: ['kehilangan arah', 'agresif', 'terhambat'],
      up: 'The Chariot adalah kemenangan melalui tekad. Dua sphinx, hitam dan putih, menarik kereta ke arah berbeda, tapi sang kesatria mengendalikannya dengan kekuatan kehendak. Kartu ini berkata: fokus, disiplin, dan percaya diri bakal membawamu melewati rintangan.',
      rev: 'Terbalik, kereta kehilangan kendali: tujuan yang kabur, energi tercerai-berai, atau memaksakan kehendak secara agresif. Berhenti sejenak dan tentukan lagi ke mana kamu sebenarnya pengin pergi.',
      symbol: 'Seorang kesatria bermahkota bintang berdiri di kereta di bawah kanopi bintang, ditarik dua sphinx hitam dan putih, tanpa tali kekang.',
      topics: {
        cinta: 'Kamu perlu aktif memperjuangkan apa yang kamu mau. Hubungan bergerak maju, atau butuh keberanian buat mengambil kendali atas dinamika yang ada. Perbedaan diatasi dengan tekad bersama.',
        karir: 'Kemenangan dan kemajuan: target tercapai, persaingan dimenangkan, ambisi terwujud. Bisa juga perjalanan dinas atau pindah kerja.',
        keuangan: 'Kemajuan finansial melalui kerja keras dan disiplin. Tetap fokus pada tujuan, jangan tergoda pengeluaran yang membelokkan arah.',
        kesehatan: 'Tekad kuat bantu pemulihan. Baik buat target kebugaran. Jaga keseimbangan biar nggak memaksakan tubuh.',
        diri: 'Menyatukan dorongan-dorongan yang saling bertentangan dalam dirimu jadi satu arah. Kehendak yang terarah adalah kekuatan spiritual.',
        keluarga: 'Memimpin keluarga melewati masa sulit, atau perjalanan bersama. Kamu bisa jadi penggerak yang menyatukan kepentingan berbeda.'
      },
      advice: 'Tentuin arah, pegang kendali, terus maju. Jangan nengok-nengok.', pol: 2
    },
    {
      n: 8, name: 'Strength', nameId: 'Kekuatan', glyph: '♌', astro: 'Leo',
      kwUp: ['keberanian', 'kesabaran', 'kelembutan', 'kendali diri'],
      kwRev: ['keraguan diri', 'emosi meledak', 'rapuh'],
      up: 'Strength nunjukin seorang perempuan yang menjinakkan singa bukan dengan paksaan, melainkan dengan kelembutan. Kekuatan sejati adalah kesabaran, welas asih, dan keberanian menghadapi sisi liar dalam dirimu. Kamu lebih tangguh dari yang kamu sadari.',
      rev: 'Terbalik, kamu mungkin lagi meragukan diri sendiri, kewalahan oleh emosi, atau membiarkan rasa takut dan amarah mengambil alih. Saatnya membangun kembali kepercayaan diri dari dalam.',
      symbol: 'Perempuan berjubah putih dengan mahkota bunga dan lambang tak hingga di atas kepala, dengan lembut menutup mulut seekor singa.',
      topics: {
        cinta: 'Hubungan yang butuh kesabaran dan kelembutan. Kasih yang sabar mampu meluluhkan hati yang keras. Percaya diri adalah daya tarikmu.',
        karir: 'Kamu mampu menghadapi tekanan dan orang sulit dengan kepala dingin. Pengaruh yang lembut lebih efektif daripada konfrontasi.',
        keuangan: 'Kendalikan dorongan belanja dan emosi dalam keputusan uang. Kesabaran bakal membuahkan stabilitas.',
        kesehatan: 'Vitalitas dan daya tahan yang kuat; pemulihan berjalan baik. Perhatiin jantung dan punggung, serta kelola stres.',
        diri: 'Menerima dan menjinakkan sisi bayangan diri dengan welas asih. Keberanian lembut buat jadi diri sendiri.',
        keluarga: 'Kesabaran menghadapi anggota keluarga atau teman yang sulit. Kamu jadi sumber kekuatan dan ketenangan bagi mereka.'
      },
      advice: 'Hadapi pakai lembut yang berani. Sabarmu itu kekuatanmu.', pol: 2
    },
    {
      n: 9, name: 'The Hermit', nameId: 'Sang Pertapa', glyph: '♍', astro: 'Virgo',
      kwUp: ['perenungan', 'kesendirian', 'kebijaksanaan', 'pencarian batin'],
      kwRev: ['isolasi', 'kesepian', 'menutup diri'],
      up: 'The Hermit mundur dari keramaian buat nemu cahaya batin. Lentera di tangannya berisi bintang, kebijaksanaan yang cuma ketemu dalam keheningan. Ini saat yang tepat buat menyendiri, merenung, dan mencari makna yang lebih dalam.',
      rev: 'Terbalik, kesendirian berubah jadi isolasi atau kesepian. Kamu mungkin menarik diri terlalu jauh, atau sebaliknya, takut sendirian dengan pikiranmu sendiri.',
      symbol: 'Seorang tua berjubah abu-abu berdiri di puncak gunung bersalju, memegang lentera berisi bintang enam sudut dan tongkat panjang.',
      topics: {
        cinta: 'Butuh waktu buat diri sendiri sebelum bisa mencintai dengan utuh. Bagi pasangan: beri ruang. Bagi lajang: masa refleksi tentang apa yang sebenarnya kamu cari.',
        karir: 'Fokus pada pekerjaan mendalam, riset, atau mencari panggilan karier yang lebih bermakna. Bisa juga hadirnya mentor yang bijak.',
        keuangan: 'Tinjau ulang keuanganmu dengan tenang. Hidup sederhana dan hemat; bukan saatnya pengeluaran besar.',
        kesehatan: 'Istirahat, retret, dan pemulihan. Kesehatan mental perlu perhatian, kurangi kebisingan dan stimulasi.',
        diri: 'Waktu emas buat pertumbuhan spiritual: meditasi, retret, membaca, mencari guru batin. Kamu lagi nemu cahayamu sendiri.',
        keluarga: 'Kebutuhan bakal ruang pribadi. Mungkin ada anggota keluarga/teman yang menarik diri, dekati dengan pengertian, bukan tuntutan.'
      },
      advice: 'Minggir dulu dari keramaian. Jawabanmu ada di tempat yang sepi.', pol: 0
    },
    {
      n: 10, name: 'Wheel of Fortune', nameId: 'Roda Keberuntungan', glyph: '♃', astro: 'Jupiter',
      kwUp: ['siklus', 'takdir', 'titik balik', 'keberuntungan'],
      kwRev: ['kemunduran', 'melawan perubahan', 'pola berulang'],
      up: 'Roda selalu berputar, yang di bawah bakal naik, yang di atas bakal turun. Wheel of Fortune nandain titik balik, kejadian tak terduga, dan keberuntungan yang berpihak. Semesta lagi menggerakkan sesuatu; ikutlah dalam alirannya.',
      rev: 'Terbalik, roda kerasa berputar melawanmu: kemunduran, pola lama yang berulang, atau upaya mempertahankan sesuatu yang memang harus berubah. Ingat, fase sulit pun bakal berlalu.',
      symbol: 'Roda besar bertuliskan TARO dan huruf Ibrani, dengan sphinx di puncak, ular turun di satu sisi dan Anubis naik di sisi lain; empat makhluk bersayap di sudut-sudut awan.',
      topics: {
        cinta: 'Pertemuan yang kerasa kayak takdir, atau perubahan besar dalam hubungan. Waktu yang tepat lagi bekerja untukmu.',
        karir: 'Peluang tak terduga, perubahan posisi, atau keberuntungan. Bersiaplah menangkap momentum ketika dia datang.',
        keuangan: 'Rezeki tak terduga dan siklus naik. Ingat roda berputar, sisihkan saat lagi di atas.',
        kesehatan: 'Perubahan kondisi, biasanya ke arah membaik. Perhatiin pola dan siklus tubuhmu.',
        diri: 'Memahami bahwa hidup bergerak dalam siklus. Pelajaran karma: apa yang kamu tanam bakal kembali ke kamu.',
        keluarga: 'Perubahan dalam dinamika keluarga, momen reuni, atau kejadian yang mengubah arah keluarga.'
      },
      advice: 'Ikutin arus perubahannya. Rodanya lagi muter buat kamu, jangan ditahan.', pol: 1
    },
    {
      n: 11, name: 'Justice', nameId: 'Keadilan', glyph: '♎', astro: 'Libra',
      kwUp: ['kebenaran', 'keadilan', 'sebab-akibat', 'keputusan'],
      kwRev: ['ketidakadilan', 'ketidakjujuran', 'lari dari tanggung jawab'],
      up: 'Justice memegang pedang kebenaran dan timbangan keseimbangan. Setiap tindakan punya konsekuensi, dan kini saatnya hasil yang adil muncul. Kartu ini minta kejujuran, objektivitas, dan keberanian menanggung tanggung jawab atas pilihanmu.',
      rev: 'Terbalik, ada ketidakadilan, ketidakjujuran, atau penghindaran tanggung jawab. Mungkin kamu ngerasa diperlakukan nggak adil, atau perlu jujur pada diri sendiri tentang peranmu dalam situasi ini.',
      symbol: 'Sosok bermahkota duduk di antara dua pilar, tangan kanan memegang pedang tegak, tangan kiri memegang timbangan.',
      topics: {
        cinta: 'Hubungan yang setara dan jujur. Keputusan penting tentang hubungan perlu diambil dengan adil. Apa yang kamu beri bakal kembali.',
        karir: 'Kontrak, urusan hukum, negosiasi, atau evaluasi kinerja. Hasil sesuai dengan usaha yang kamu tanam. Bertindaklah dengan integritas.',
        keuangan: 'Urusan legal, pajak, pembagian harta, atau perjanjian. Pastiin semuanya tertulis dan adil.',
        kesehatan: 'Keseimbangan adalah kunci, pola makan, kerja, istirahat. Tubuh merespons secara adil terhadap kebiasaanmu.',
        diri: 'Hukum sebab-akibat. Bersikap jujur sepenuhnya pada diri sendiri adalah langkah pertama menuju kebebasan.',
        keluarga: 'Menyelesaikan konflik dengan adil, urusan warisan, atau pembagian peran yang seimbang di rumah.'
      },
      advice: 'Jujur dan adil, terutama sama dirimu sendiri.', pol: 0
    },
    {
      n: 12, name: 'The Hanged Man', nameId: 'Sang Tergantung', glyph: '♆', astro: 'Neptunus · Air',
      kwUp: ['berserah', 'jeda', 'sudut pandang baru', 'pengorbanan'],
      kwRev: ['menunda-nunda', 'stagnasi', 'pengorbanan sia-sia'],
      up: 'The Hanged Man tergantung terbalik dengan wajah tenang dan lingkaran cahaya di kepala. Dia memilih berhenti, dan dari posisi itu ngeliat dunia dengan cara yang sama sekali baru. Kartu ini mengajak berserah, menunda tindakan, dan ngelepasin cara pandang lama.',
      rev: 'Terbalik, jeda telah berubah jadi stagnasi. Kamu mungkin menunda keputusan, berkorban tanpa hasil, atau menolak ngeliat situasi dari sudut yang berbeda.',
      symbol: 'Seorang pria tergantung terbalik dari pohon berbentuk T dengan satu kaki, kaki lainnya bersilang membentuk angka 4, kepalanya bercahaya.',
      topics: {
        cinta: 'Hubungan dalam fase menggantung atau nunggu. Lihat dari sudut pandang pasangan. Jangan memaksakan; kadang ngelepasin justru ngasih jawaban.',
        karir: 'Proyek tertunda atau masa nunggu. Pakai jeda ini buat meninjau ulang strategi, ide terobosan sering lahir dari berhenti sejenak.',
        keuangan: 'Tahan keputusan finansial besar. Mungkin perlu mengorbankan kesenangan jangka pendek demi tujuan jangka panjang.',
        kesehatan: 'Tubuh minta berhenti dan beristirahat. Pemulihan butuh kesabaran; jangan dipaksakan.',
        diri: 'Berserah dan percaya. Pencerahan datang ketika kamu ngelepasin kebutuhan buat mengontrol hasil.',
        keluarga: 'Melihat konflik dari sudut pandang anggota keluarga lain. Pengorbanan kecil demi keharmonisan.'
      },
      advice: 'Stop sebentar. Coba lihat dari sudut yang beda.', pol: 0
    },
    {
      n: 13, name: 'Death', nameId: 'Kematian (Transformasi)', glyph: '♏', astro: 'Scorpio',
      kwUp: ['akhir', 'transformasi', 'transisi', 'pelepasan'],
      kwRev: ['menolak perubahan', 'terjebak', 'takut melepas'],
      up: 'Death jarang berarti kematian fisik. Dia adalah akhir sebuah babak biar babak baru bisa dimulai. Matahari terbit di antara dua menara di kejauhan, setelah setiap akhir ada kelahiran kembali. Lepasin apa yang udah selesai; transformasi lagi terjadi.',
      rev: 'Terbalik, kamu nahan sesuatu yang udah waktunya berakhir. Penolakan terhadap perubahan bikin prosesnya lebih menyakitkan dan lebih lama.',
      symbol: 'Kerangka berbaju zirah menunggang kuda putih bawa panji bermawar putih; raja tumbang, sementara anak dan pendeta menyambutnya; matahari terbit di kejauhan.',
      topics: {
        cinta: 'Akhir dari satu fase hubungan, bisa berarti perpisahan, atau berubahnya hubungan lama jadi sesuatu yang baru dan lebih dalam. Lepasin pola lama biar cinta bisa terlahir kembali.',
        karir: 'Pekerjaan atau peran lama berakhir buat membuka jalan baru. Restrukturisasi, perubahan karier, menutup satu bab.',
        keuangan: 'Akhir dari kebiasaan finansial lama. Bereskan utang, tutup yang nggak perlu, dan mulai lembaran baru.',
        kesehatan: 'Transformasi gaya hidup: meninggalkan kebiasaan nggak sehat. (Bukan pertanda kematian fisik.) Fase regenerasi dan pemulihan.',
        diri: 'Kelahiran kembali secara spiritual. Identitas lama luruh biar dirimu yang lebih sejati bisa muncul.',
        keluarga: 'Perubahan besar dalam struktur keluarga atau pertemanan, ada yang pergi, ada yang berubah, membuka ruang bagi hubungan yang lebih jujur.'
      },
      advice: 'Lepasin yang udah selesai. Ruang kosongnya bakal diisi yang baru.', pol: 0
    },
    {
      n: 14, name: 'Temperance', nameId: 'Keseimbangan', glyph: '♐', astro: 'Sagitarius',
      kwUp: ['keseimbangan', 'kesabaran', 'moderasi', 'penyembuhan'],
      kwRev: ['berlebihan', 'ketidakseimbangan', 'tergesa-gesa'],
      up: 'Temperance menuangkan air dari satu piala ke piala lain dengan sabar, memadukan unsur yang berbeda jadi harmoni. Kartu ini tentang jalan tengah, kesabaran, dan penyembuhan. Hal baik datang dari proses yang perlahan dan seimbang.',
      rev: 'Terbalik, ada ketidakseimbangan: berlebihan dalam sesuatu, buru-buru, atau konflik antara bagian-bagian hidupmu. Kembalilah ke tengah.',
      symbol: 'Malaikat bersayap dengan satu kaki di air dan satu di darat, menuangkan air di antara dua piala; jalan setapak menuju gunung bermahkota cahaya.',
      topics: {
        cinta: 'Hubungan yang seimbang dan saling melengkapi. Kompromi dan kesabaran bikin cinta matang. Penyembuhan setelah konflik.',
        karir: 'Kerja sama, menyeimbangkan beban kerja, nemu jalan tengah. Kesabaran dalam proses bakal dihargai.',
        keuangan: 'Moderasi: nggak terlalu boros, nggak terlalu pelit. Diversifikasi dan konsistensi.',
        kesehatan: 'Kartu penyembuhan. Seimbangkan pola makan, asupan cairan, dan istirahat. Hindari yang berlebihan.',
        diri: 'Alkimia batin, memadukan sisi-sisi diri yang berbeda. Jalan tengah adalah jalan spiritual.',
        keluarga: 'Menjadi penengah, mendamaikan, dan menciptakan harmoni di rumah atau lingkar pertemanan.'
      },
      advice: 'Cari jalan tengah, dan sabar sama prosesnya.', pol: 1
    },
    {
      n: 15, name: 'The Devil', nameId: 'Sang Iblis', glyph: '♑', astro: 'Capricorn',
      kwUp: ['keterikatan', 'godaan', 'kecanduan', 'sisi bayangan'],
      kwRev: ['pembebasan', 'memutus rantai', 'kesadaran baru'],
      up: 'The Devil nunjukin dua sosok yang dirantai, tapi rantainya longgar; mereka bisa melepaskannya kapan aja. Kartu ini menyoroti keterikatan: kecanduan, hubungan nggak sehat, materialisme, atau pola pikir yang memenjarakan. Kesadaran adalah langkah pertama menuju kebebasan.',
      rev: 'Terbalik, kamu mulai menyadari dan ngelepasin rantai. Ini tanda pembebasan dari kebiasaan buruk, hubungan toksik, atau ketakutan yang selama ini mengikat.',
      symbol: 'Sosok bertanduk duduk di atas tumpuan, dengan dua manusia bertanduk dan berekor dirantai di lehernya, rantai yang longgar.',
      topics: {
        cinta: 'Ketertarikan fisik yang kuat, tapi waspadain obsesi, kecemburuan, atau hubungan yang nggak sehat. Apakah ini cinta, atau keterikatan?',
        karir: 'Merasa terjebak dalam pekerjaan demi uang, atau lingkungan kerja yang toksik. Ingat: pilihanmu lebih banyak dari yang kamu kira.',
        keuangan: 'Waspadain utang, belanja impulsif, judi, atau obsesi materi. Periksa apa yang sebenarnya ngontrol keuanganmu.',
        kesehatan: 'Kecanduan dan kebiasaan buruk (gula, rokok, gawai, begadang). Saatnya jujur dan mencari bantuan kalau perlu.',
        diri: 'Menghadapi sisi bayangan: ketakutan, nafsu, dan pola yang nggak kamu akui. Mengenalinya adalah awal kebebasan.',
        keluarga: 'Dinamika nggak sehat, ketergantungan, atau manipulasi dalam keluarga/pertemanan. Pasang batasan yang sehat.'
      },
      advice: 'Kenali apa yang ngiket kamu. Rantainya lebih longgar dari yang kamu kira.', pol: -2, revPol: 1
    },
    {
      n: 16, name: 'The Tower', nameId: 'Menara', glyph: '♂', astro: 'Mars',
      kwUp: ['guncangan', 'perubahan mendadak', 'kebenaran terungkap', 'pembebasan'],
      kwRev: ['menghindari krisis', 'takut berubah', 'guncangan tertunda'],
      up: 'The Tower adalah petir yang menghancurkan struktur yang dibangun di atas fondasi palsu. Perubahan mendadak ini mengejutkan, bahkan menyakitkan, tapi dia membebaskanmu dari ilusi. Setelah reruntuhan, kamu bisa membangun dengan kebenaran.',
      rev: 'Terbalik, kamu mungkin berhasil menghindari krisis, atau lagi menunda perubahan yang tak terelakkan. Perubahan bisa terjadi lebih perlahan, dari dalam.',
      symbol: 'Menara tinggi di puncak bukit tersambar petir, mahkotanya terlempar, dua orang jatuh di antara api dan percikan cahaya.',
      topics: {
        cinta: 'Guncangan dalam hubungan: rahasia terungkap, pertengkaran besar, atau runtuhnya ilusi. Menyakitkan, tapi membuka jalan bagi hubungan yang jujur.',
        karir: 'Perubahan tiba-tiba: restrukturisasi, kehilangan pekerjaan, atau proyek gagal. Dari sinilah kamu bisa membangun ulang dengan lebih kokoh.',
        keuangan: 'Pengeluaran mendadak atau kerugian tak terduga. Siapkan dana darurat dan hindari investasi berisiko tinggi sekarang.',
        kesehatan: 'Waspadain kejadian mendadak dan stres akut. Jangan abaikan sinyal tubuh, periksakan diri ke tenaga medis kalau ada keluhan.',
        diri: 'Kebangkitan kesadaran yang tiba-tiba. Keyakinan lama runtuh, ngasih tempat bagi kebenaran yang lebih luas.',
        keluarga: 'Konflik atau perubahan mendadak dalam keluarga/pertemanan. Kejujuran yang menyakitkan bisa memulihkan hubungan dalam jangka panjang.'
      },
      advice: 'Biarin yang rapuh runtuh. Yang jujur bakal jadi pondasi yang lebih kuat.', pol: -2, revPol: -0.5
    },
    {
      n: 17, name: 'The Star', nameId: 'Bintang', glyph: '♒', astro: 'Aquarius',
      kwUp: ['harapan', 'penyembuhan', 'inspirasi', 'ketenangan'],
      kwRev: ['putus asa', 'kehilangan iman', 'kurang percaya diri'],
      up: 'Setelah badai The Tower, The Star hadir bawa harapan. Seorang perempuan menuangkan air kehidupan ke tanah dan kolam di bawah bintang-bintang yang bersinar. Ini kartu penyembuhan, pembaruan, dan keyakinan bahwa masa depan cerah. Semesta mendukungmu.',
      rev: 'Terbalik, harapan meredup. Kamu mungkin ngerasa putus asa, lelah, atau kehilangan kepercayaan. Cahaya bintang masih ada, kamu cuma perlu mengangkat kepala lagi.',
      symbol: 'Perempuan berlutut di tepi kolam, menuangkan air dari dua kendi ke tanah dan ke air, di bawah satu bintang besar dan tujuh bintang kecil.',
      topics: {
        cinta: 'Harapan baru dalam cinta, penyembuhan dari luka lama, hubungan yang tulus dan penuh inspirasi. Izinkan dirimu dicintai apa adanya.',
        karir: 'Inspirasi, pengakuan, dan masa depan yang menjanjikan. Ikuti visi dan bakatmu; kamu berada di jalur yang benar.',
        keuangan: 'Pemulihan finansial dan prospek yang membaik. Optimis, tapi tetap realistis dalam rencana.',
        kesehatan: 'Penyembuhan dan pemulihan yang kuat. Air, alam, dan ketenangan pikiran sangat bantu.',
        diri: 'Terhubung kembali dengan harapan dan tujuan jiwa. Kamu lagi dipulihkan dan dibimbing.',
        keluarga: 'Rekonsiliasi dan kedamaian setelah masa sulit. Dukungan tulus dari orang-orang terdekat.'
      },
      advice: 'Tetap berharap. Kamu lagi dalam proses pulih.', pol: 2
    },
    {
      n: 18, name: 'The Moon', nameId: 'Bulan', glyph: '♓', astro: 'Pisces',
      kwUp: ['ilusi', 'kecemasan', 'intuisi', 'ketidakpastian'],
      kwRev: ['kejelasan muncul', 'ketakutan mereda', 'kebenaran terungkap'],
      up: 'The Moon menerangi jalan dengan cahaya samar, segala sesuatu tampak nggak sebagaimana adanya. Kartu ini ngomongin ketidakpastian, ilusi, kecemasan, dan alam bawah sadar. Jangan percaya begitu aja pada penampakan; andalkan intuisimu buat menembus kabut.',
      rev: 'Terbalik, kabut mulai tersingkap. Ketakutan berkurang, kebohongan terungkap, dan kamu mulai ngeliat lebih jernih.',
      symbol: 'Bulan berwajah di antara dua menara, anjing dan serigala melolong, seekor udang karang merangkak keluar dari kolam menuju jalan berliku.',
      topics: {
        cinta: 'Ada ketidakjelasan, kecurigaan, atau hal yang disembunyikan. Jangan bikin keputusan berdasarkan kecemasan; cari kejelasan dengan sabar.',
        karir: 'Situasi kerja belum jelas; informasi bisa menyesatkan. Waspadain gosip dan janji yang terlalu indah. Periksa fakta.',
        keuangan: 'Hati-hati dengan penipuan dan informasi yang kabur. Baca detail sebelum menandatangani apa pun.',
        kesehatan: 'Kecemasan, gangguan tidur, atau gejala yang sulit dipastikan. Konsultasikan ke profesional; jaga kesehatan mental.',
        diri: 'Menyelami alam bawah sadar: mimpi, ketakutan, dan intuisi. Masa yang kuat buat kerja batin, asalkan kamu tetap membumi.',
        keluarga: 'Kesalahpahaman atau hal yang belum diucapkan. Hindari asumsi, tanyain langsung dengan lembut.'
      },
      advice: 'Jangan mau dibohongin rasa takut. Jalan pelan-pelan, pakai feeling sebagai senter.', pol: -1, revPol: 0.5
    },
    {
      n: 19, name: 'The Sun', nameId: 'Matahari', glyph: '☉', astro: 'Matahari',
      kwUp: ['kebahagiaan', 'kesuksesan', 'vitalitas', 'kejelasan'],
      kwRev: ['kebahagiaan tertunda', 'optimisme berlebih', 'kurang semangat'],
      up: 'The Sun adalah salah satu kartu paling positif. Seorang anak menunggang kuda putih di bawah matahari yang bersinar terang, sukacita yang murni, kesuksesan, dan kehangatan. Segalanya jadi jelas dan terang; kamu boleh merayakan.',
      rev: 'Terbalik, sinar matahari tertutup awan sementara, kebahagiaan masih ada tapi tertunda atau kurang dirasakan. Bisa juga optimisme yang nggak realistis.',
      symbol: 'Anak kecil menunggang kuda putih bawa panji merah, di depan tembok berhias bunga matahari, di bawah matahari besar yang tersenyum.',
      topics: {
        cinta: 'Kebahagiaan, kehangatan, dan hubungan yang penuh keceriaan. Sangat positif buat pernikahan, komitmen, dan keluarga.',
        karir: 'Sukses, pengakuan, dan pencapaian. Kamu bersinar, saatnya tampil dan nunjukin karyamu.',
        keuangan: 'Kemakmuran dan stabilitas. Usahamu membuahkan hasil yang menggembirakan.',
        kesehatan: 'Vitalitas tinggi dan pemulihan yang baik. Sinar matahari pagi dan aktivitas luar ruangan sangat bermanfaat.',
        diri: 'Kejernihan, kegembiraan, dan jadi diri sendiri sepenuhnya. Anak batinmu bahagia.',
        keluarga: 'Keluarga yang bahagia, kabar gembira tentang anak, momen kebersamaan yang hangat.'
      },
      advice: 'Tampil apa adanya, dan izinin dirimu bahagia.', pol: 2
    },
    {
      n: 20, name: 'Judgement', nameId: 'Kebangkitan', glyph: '♇', astro: 'Pluto · Api',
      kwUp: ['kebangkitan', 'panggilan jiwa', 'evaluasi', 'pengampunan'],
      kwRev: ['menghakimi diri', 'menolak panggilan', 'rasa bersalah'],
      up: 'Judgement ngegambarin malaikat yang meniup sangkakala, membangunkan jiwa-jiwa buat bangkit. Ini momen kebangkitan dan evaluasi hidup: memaafkan masa lalu, denger panggilan jiwa, dan bangkit jadi versi dirimu yang lebih utuh.',
      rev: 'Terbalik, kamu mungkin terlalu keras menghakimi diri sendiri atau menolak panggilan buat berubah. Rasa bersalah lama nahan langkahmu.',
      symbol: 'Malaikat Gabriel meniup sangkakala dari balik awan; orang-orang bangkit dari peti dengan tangan terbuka menyambut panggilan.',
      topics: {
        cinta: 'Kesempatan kedua, rekonsiliasi, atau keputusan besar tentang masa depan hubungan. Belajar dari masa lalu buat mencintai dengan lebih bijak.',
        karir: 'Panggilan buat karier yang lebih bermakna. Evaluasi, keputusan penting, atau kebangkitan setelah masa sulit.',
        keuangan: 'Evaluasi menyeluruh atas keuangan. Hasil keputusan masa lalu mulai keliatan, saatnya benerin arah.',
        kesehatan: 'Kebangkitan vitalitas dan pemulihan. Keputusan sadar buat hidup lebih sehat.',
        diri: 'Kebangkitan spiritual. Mendengar dan menjawab panggilan jiwa; memaafkan diri sendiri.',
        keluarga: 'Memaafkan, berdamai, dan berkumpul kembali. Bab lama keluarga ditutup dengan pemahaman.'
      },
      advice: 'Dengerin panggilan hatimu, maafin masa lalu. Waktunya bangun.', pol: 1
    },
    {
      n: 21, name: 'The World', nameId: 'Dunia', glyph: '♄', astro: 'Saturnus · Tanah',
      kwUp: ['penyelesaian', 'keutuhan', 'pencapaian', 'perjalanan'],
      kwRev: ['belum tuntas', 'tertunda', 'kurang penutupan'],
      up: 'The World adalah akhir dari perjalanan The Fool, siklus yang lengkap, tujuan tercapai, dan rasa utuh. Penari di dalam karangan bunga merayakan keharmonisan dengan semesta. Kamu telah sampai; nikmati pencapaianmu sebelum mulai siklus baru.',
      rev: 'Terbalik, ada yang belum tuntas, tujuan hampir tercapai tapi tertunda, atau kamu belum menutup satu bab dengan baik. Selesaiin dulu urusan yang menggantung.',
      symbol: 'Penari berselendang ungu di dalam karangan daun laurel, memegang dua tongkat; di keempat sudut ada malaikat, elang, singa, dan banteng.',
      topics: {
        cinta: 'Hubungan yang utuh dan matang; komitmen jangka panjang, pernikahan, atau perasaan "pulang". Bagi lajang: kamu utuh dengan dirimu sendiri dan siap menarik cinta yang setara.',
        karir: 'Pencapaian besar, proyek selesai, kelulusan, atau peluang internasional. Kerja kerasmu diakui.',
        keuangan: 'Tujuan finansial tercapai. Stabilitas dan rasa cukup. Waktu yang baik buat merayakan lalu menyusun target berikutnya.',
        kesehatan: 'Kesehatan menyeluruh, tubuh, pikiran, dan jiwa selaras. Pemulihan yang tuntas.',
        diri: 'Rasa menyatu dengan semesta. Satu siklus pembelajaran jiwa telah selesai.',
        keluarga: 'Keluarga yang utuh dan harmonis, perayaan besar, atau berkumpul dari berbagai tempat.'
      },
      advice: 'Selesaiin sampai tuntas, terus rayain perjalananmu.', pol: 2
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
        cinta: 'Sebagai kartu Tongkat (api), dia ngomongin gairah, ketertarikan, dan semangat dalam hubungan.',
        karir: 'Sebagai kartu Tongkat (api), dia menyala tepat di wilayah ambisi, inisiatif, dan semangat kerja, sangat relevan dengan kariermu.',
        keuangan: 'Sebagai kartu Tongkat (api), dia bawa energi usaha dan keberanian mengambil inisiatif buat menghasilkan uang.',
        kesehatan: 'Sebagai kartu Tongkat (api), dia menyentuh vitalitas, stamina, dan semangat hidupmu.',
        diri: 'Sebagai kartu Tongkat (api), dia menyalakan api tujuan hidup dan gairah jiwamu.',
        keluarga: 'Sebagai kartu Tongkat (api), dia bawa energi aktivitas, semangat, dan kadang gesekan ego di rumah atau pertemanan.'
      }
    },
    cups: {
      key: 'cups', name: 'Cups', nameId: 'Piala', element: 'Air',
      domain: 'perasaan, cinta, intuisi, dan hubungan',
      hidden: 'soal perasaan, kepuasan batin, dan ikatan emosional',
      adviceDomain: 'dengan mendengarkan hatimu',
      affinity: { cinta: 1, karir: 0.4, keuangan: 0.3, kesehatan: 0.6, diri: 0.85, keluarga: 1 },
      lens: {
        cinta: 'Sebagai kartu Piala (air), dia ngomong langsung ke hatimu, perasaan, kedekatan, dan kejujuran rasa. Sangat selaras dengan pertanyaan cinta.',
        karir: 'Sebagai kartu Piala (air), dia bawa sisi emosional pekerjaan: kepuasan batin, hubungan dengan rekan, dan apakah hatimu beneran ada di sana.',
        keuangan: 'Sebagai kartu Piala (air), dia mengingatkan bahwa keputusan uangmu dipengaruhi perasaan, rasa aman, puas, atau cemas.',
        kesehatan: 'Sebagai kartu Piala (air), dia menyentuh kesehatan emosional dan keseimbangan cairan tubuh.',
        diri: 'Sebagai kartu Piala (air), dia membuka dunia batin: perasaan, intuisi, dan kepekaan spiritual.',
        keluarga: 'Sebagai kartu Piala (air), suit keluarga dan persahabatan, dia ngomongin ikatan emosional, kehangatan, dan rasa punya.'
      }
    },
    swords: {
      key: 'swords', name: 'Swords', nameId: 'Pedang', element: 'Udara',
      domain: 'pikiran, komunikasi, kebenaran, dan konflik',
      hidden: 'soal pikiran, kecemasan, komunikasi, dan keputusan yang belum diambil',
      adviceDomain: 'dengan pikiran yang jernih dan kata-kata yang jujur',
      affinity: { cinta: 0.45, karir: 0.7, keuangan: 0.45, kesehatan: 0.65, diri: 0.7, keluarga: 0.5 },
      lens: {
        cinta: 'Sebagai kartu Pedang (udara), dia menyoroti pikiran dan komunikasi dalam hubungan, kejujuran, keputusan, juga luka karena kata-kata.',
        karir: 'Sebagai kartu Pedang (udara), dia menyoroti strategi, keputusan, komunikasi, dan konflik di tempat kerja.',
        keuangan: 'Sebagai kartu Pedang (udara), dia menuntut kejernihan berpikir dan keputusan rasional tentang uang.',
        kesehatan: 'Sebagai kartu Pedang (udara), dia menyentuh kesehatan mental: stres, pikiran berlebih, dan pola tidur.',
        diri: 'Sebagai kartu Pedang (udara), dia mengajak mengurai keyakinan dan pikiran yang membentuk realitasmu.',
        keluarga: 'Sebagai kartu Pedang (udara), dia menyoroti komunikasi, perbedaan pendapat, dan keputusan sulit dalam keluarga/pertemanan.'
      }
    },
    pentacles: {
      key: 'pentacles', name: 'Pentacles', nameId: 'Pentakel', element: 'Tanah',
      domain: 'materi, uang, pekerjaan, tubuh, dan rumah',
      hidden: 'soal hal-hal praktis: uang, waktu, tubuh, dan rasa aman',
      adviceDomain: 'dengan langkah nyata yang praktis dan konsisten',
      affinity: { cinta: 0.5, karir: 0.9, keuangan: 1, kesehatan: 0.9, diri: 0.5, keluarga: 0.8 },
      lens: {
        cinta: 'Sebagai kartu Pentakel (tanah), dia bawa sisi nyata cinta: komitmen, rasa aman, dan rencana hidup bersama.',
        karir: 'Sebagai kartu Pentakel (tanah), dia ngomongin hasil konkret: pekerjaan, keterampilan, dan stabilitas karier.',
        keuangan: 'Sebagai kartu Pentakel (tanah), dia berada tepat di jantung urusan uang, aset, dan kemakmuran, sangat relevan dengan pertanyaanmu.',
        kesehatan: 'Sebagai kartu Pentakel (tanah), suit tubuh fisik, dia menyentuh pola makan, rutinitas, dan kesehatan jasmani.',
        diri: 'Sebagai kartu Pentakel (tanah), dia mengajak membumikan spiritualitas dalam tindakan sehari-hari.',
        keluarga: 'Sebagai kartu Pentakel (tanah), dia menyentuh rumah, warisan, dan kesejahteraan keluarga.'
      }
    }
  };

  /* ---------------- RANK (angka & kartu istana) ---------------- */
  const RANKS = {
    1: { label: 'As', short: 'A', theme: 'awal baru dan benih potensi', advice: 'Mulai aja. Tanam benihnya sekarang.',
      rev: 'energi awalnya masih tertahan, peluang tertunda atau belum dimanfaatkan.',
      topics: {
        cinta: 'Benih cinta baru atau babak segar dalam hubungan, momen yang tepat buat membuka hati.',
        karir: 'Peluang baru lagi ditawarkan: tawaran kerja, proyek, atau ide yang layak dikejar.',
        keuangan: 'Pintu rezeki baru terbuka, sumber pemasukan atau kesempatan finansial yang bisa ditumbuhkan.',
        kesehatan: 'Awal yang baik buat mulai kebiasaan sehat; energi pemulihan lagi naik.',
        diri: 'Percikan kesadaran baru, undangan buat mulai perjalanan batin dari titik nol.',
        keluarga: 'Awal baru dalam hubungan keluarga atau pertemanan, kabar baik, anggota baru, atau ikatan yang diperbarui.' } },
    2: { label: 'Dua', short: 'II', theme: 'pilihan, keseimbangan, dan kemitraan', advice: 'Timbang dengan seimbang sebelum memilih.',
      rev: 'keseimbangannya goyah, keputusan tertunda atau kemitraan yang timpang.',
      topics: {
        cinta: 'Dua hati, dua pilihan, tentang keselarasan, keseimbangan ngasih dan menerima, atau keputusan di antara dua jalan.',
        karir: 'Menimbang dua opsi atau menjalin kemitraan; menyeimbangkan tuntutan yang berbeda.',
        keuangan: 'Menyeimbangkan pemasukan dan pengeluaran, atau memilih di antara dua keputusan finansial.',
        kesehatan: 'Tubuh minta keseimbangan, antara aktivitas dan istirahat, antara pikiran dan perasaan.',
        diri: 'Mendamaikan dua sisi dalam diri yang tampak bertentangan.',
        keluarga: 'Hubungan satu-lawan-satu yang penting; perlu saling memahami dan berkompromi.' } },
    3: { label: 'Tiga', short: 'III', theme: 'pertumbuhan dan kolaborasi', advice: 'Tumbuh bersama orang lain.',
      rev: 'pertumbuhannya tersendat, kerja sama kurang selaras.',
      topics: {
        cinta: 'Hubungan tumbuh dan melibatkan lingkungan sosial, tapi waspadain pihak ketiga atau campur tangan orang lain.',
        karir: 'Pertumbuhan awal dan kerja tim; hasil pertama mulai keliatan ketika kamu berkolaborasi.',
        keuangan: 'Uang mulai berkembang dari usaha awal; kerja sama bawa hasil.',
        kesehatan: 'Perkembangan yang baik; dukungan orang lain mempercepat pemulihan.',
        diri: 'Bertumbuh melalui ekspresi diri dan komunitas.',
        keluarga: 'Berkumpul, merayakan, atau dinamika tiga pihak dalam keluarga/pertemanan.' } },
    4: { label: 'Empat', short: 'IV', theme: 'stabilitas dan fondasi', advice: 'Kokohkan fondasi dan beri dirimu jeda.',
      rev: 'stabilitasnya berubah jadi stagnasi atau kelekatan berlebih.',
      topics: {
        cinta: 'Fase stabil, bisa berarti rasa aman, tapi juga kebosanan kalau nggak dirawat.',
        karir: 'Fondasi karier yang stabil; saatnya mengonsolidasi, bukan melompat.',
        keuangan: 'Stabilitas dan keamanan finansial; nabung dan menjaga apa yang udah ada.',
        kesehatan: 'Waktu istirahat dan pemulihan; tubuh butuh jeda dan rutinitas yang menenangkan.',
        diri: 'Menemukan ketenangan dan pijakan yang kokoh di dalam diri.',
        keluarga: 'Rumah sebagai tempat aman; stabilitas dan rasa punya.' } },
    5: { label: 'Lima', short: 'V', theme: 'konflik, tantangan, dan kehilangan', advice: 'Hadapi konflik dengan jujur, lalu lepasin ego.',
      rev: 'konfliknya mulai mereda, fase pemulihan dan belajar dari kehilangan.',
      topics: {
        cinta: 'Ada gesekan, kekecewaan, atau ego yang berbenturan, hadapi dengan jujur biar nggak berlarut.',
        karir: 'Persaingan, konflik, atau kemunduran sementara di tempat kerja.',
        keuangan: 'Kesulitan atau kehilangan finansial; perlu berhemat dan mencari dukungan.',
        kesehatan: 'Tubuh atau pikiran lagi dalam tekanan; jangan abaikan keluhan kecil.',
        diri: 'Krisis kecil yang maksa pertumbuhan, rasa sakit sebagai guru.',
        keluarga: 'Perselisihan atau jarak emosional dalam keluarga/pertemanan.' } },
    6: { label: 'Enam', short: 'VI', theme: 'pemulihan dan harmoni', advice: 'Beri dan terima dengan tulus.',
      rev: 'harmoninya timpang, terjebak masa lalu atau ngasih dengan pamrih.',
      topics: {
        cinta: 'Pemulihan dan keharmonisan; kebaikan yang berbalas, kenangan manis, atau hubungan yang membaik.',
        karir: 'Kemajuan setelah kesulitan; pengakuan, bantuan, atau situasi kerja yang lebih ringan.',
        keuangan: 'Arus ngasih dan menerima, bantuan datang, atau kamu bisa bantu orang lain.',
        kesehatan: 'Fase pemulihan; kondisi berangsur membaik.',
        diri: 'Kedamaian setelah badai; berdamai dengan masa lalu.',
        keluarga: 'Kehangatan, nostalgia, dan saling bantu.' } },
    7: { label: 'Tujuh', short: 'VII', theme: 'ujian, evaluasi, dan ketekunan', advice: 'Bertahan dan evaluasi dengan jernih.',
      rev: 'ketekunannya melemah, mudah menyerah atau kurang jujur pada diri sendiri.',
      topics: {
        cinta: 'Hubungan lagi diuji, kesetiaan, kejujuran, atau kesabaran. Lihat dengan jernih apa yang nyata.',
        karir: 'Ujian ketekunan; mempertahankan posisi atau mengevaluasi strategi jangka panjang.',
        keuangan: 'Investasi butuh kesabaran; evaluasi dulu sebelum menambah komitmen.',
        kesehatan: 'Pemulihan butuh konsistensi; jangan mudah menyerah pada program sehatmu.',
        diri: 'Menguji keyakinan dan memilah ilusi dari kebenaran.',
        keluarga: 'Menghadapi tantangan dalam hubungan dan mempertahankan batasan yang sehat.' } },
    8: { label: 'Delapan', short: 'VIII', theme: 'gerak, perubahan, dan penguasaan', advice: 'Gerak dan terus asah dirimu.',
      rev: 'geraknya terhambat, tertunda, kehilangan arah, atau terjebak.',
      topics: {
        cinta: 'Pergerakan dan perubahan dalam hubungan, sesuatu bergerak cepat, atau ada yang perlu ditinggalkan.',
        karir: 'Momentum, keahlian yang terus diasah, atau perubahan arah pekerjaan.',
        keuangan: 'Kerja tekun membangun keuangan; atau perubahan arus uang yang perlu diawasi.',
        kesehatan: 'Energi bergerak, olahraga dan aktivitas bantu, tapi hindari kelelahan.',
        diri: 'Melepaskan yang lama dan bergerak menuju makna yang lebih dalam.',
        keluarga: 'Perubahan ritme keluarga, kesibukan, kepergian, atau kabar yang datang cepat.' } },
    9: { label: 'Sembilan', short: 'IX', theme: 'puncak dan hampir selesai', advice: 'Bertahan sedikit lagi, kamu hampir sampai.',
      rev: 'puncaknya kerasa berat, kecemasan atau kepuasan yang semu.',
      topics: {
        cinta: 'Perasaan yang memuncak atau kepuasan yang hampir tercapai, kamu nyaris tiba di tujuan hati.',
        karir: 'Hampir tiba di garis akhir; bertahan sedikit lagi.',
        keuangan: 'Kemandirian dan hasil yang hampir penuh dari kerja kerasmu.',
        kesehatan: 'Perhatiin kelelahan menjelang akhir; pertahankan disiplin sampai tuntas.',
        diri: 'Kepuasan batin, atau ujian terakhir sebelum sebuah siklus selesai.',
        keluarga: 'Rasa syukur atas apa yang udah dibangun bersama, atau kewaspadaan berlebih yang perlu dilepas.' } },
    10: { label: 'Sepuluh', short: 'X', theme: 'penyelesaian siklus', advice: 'Tuntaskan siklus ini dan lepasin bebannya.',
      rev: 'penyelesaiannya tertunda, beban berlebih atau akhir yang belum diterima.',
      topics: {
        cinta: 'Siklus emosional mencapai puncaknya, kebahagiaan penuh, atau akhir yang membuka babak baru.',
        karir: 'Penyelesaian besar; beban penuh atau hasil penuh dari sebuah siklus kerja.',
        keuangan: 'Hasil jangka panjang, warisan, kekayaan, atau tanggung jawab finansial yang besar.',
        kesehatan: 'Puncak sebuah siklus; perhatiin beban yang menumpuk dan rayain kemajuan.',
        diri: 'Satu pelajaran jiwa tuntas; bersiap buat siklus berikutnya.',
        keluarga: 'Keluarga sebagai satu kesatuan, kebahagiaan bersama atau beban yang dipikul bersama.' } },
    11: { label: 'Page', short: 'P', court: true, person: 'sosok muda, pelajar, atau pembawa kabar', theme: 'pesan, belajar, dan rasa ingin tahu', advice: 'Tetaplah jadi murid yang penasaran.',
      rev: 'pesannya kabur, ketidakmatangan atau kabar yang tertunda.',
      topics: {
        cinta: 'Pesan atau sinyal ketertarikan, perasaan yang masih muda dan polos; bisa juga sosok yang lebih muda.',
        karir: 'Kabar, kesempatan belajar, magang, atau posisi pemula yang menjanjikan.',
        keuangan: 'Belajar mengelola uang; peluang kecil yang bisa tumbuh.',
        kesehatan: 'Mulai mempelajari tubuhmu sendiri; kabar hasil pemeriksaan.',
        diri: 'Rasa pengin tahu yang murni; jadi murid kehidupan.',
        keluarga: 'Anak atau anggota keluarga yang lebih muda, atau kabar dari seorang teman.' } },
    12: { label: 'Ksatria', short: 'Kn', court: true, person: 'sosok yang bergerak cepat dan sedang mengejar sesuatu', theme: 'aksi dan pengejaran', advice: 'Gerak, tapi arahnya jelas.',
      rev: 'geraknya tergesa atau tak terarah, semangat tanpa kendali.',
      topics: {
        cinta: 'Seseorang yang mendekat atau mengejar dengan cepat; hubungan yang bergerak dan bergairah.',
        karir: 'Aksi cepat, pengejaran target, perjalanan, atau proyek yang lagi melaju.',
        keuangan: 'Mengejar peluang finansial, pastiin semangatnya diimbangi perhitungan.',
        kesehatan: 'Energi tinggi; jaga biar nggak memaksakan diri.',
        diri: 'Mengejar misi jiwa dengan penuh semangat.',
        keluarga: 'Sosok yang datang atau pergi, atau anggota keluarga yang lagi berjuang.' } },
    13: { label: 'Ratu', short: 'Q', court: true, person: 'sosok yang matang, mengayomi, dan peka (sering perempuan, tapi nggak selalu)', theme: 'kematangan batin dan kepedulian', advice: 'Pimpin dari kematangan batin dan kepedulian.',
      rev: 'kematangannya terganggu, emosi tak terkendali atau nyuekin diri.',
      topics: {
        cinta: 'Sosok yang matang secara emosional, mengayomi, dan setia; kasih yang dewasa.',
        karir: 'Kepemimpinan yang empatik dan cerdas; kamu dihargai karena kematanganmu.',
        keuangan: 'Mengelola keuangan dengan bijak dan penuh perhatian.',
        kesehatan: 'Merawat diri dengan penuh kasih dan kesadaran.',
        diri: 'Menguasai dunia batin, intuisi dan kebijaksanaan yang tenang.',
        keluarga: 'Sosok ibu/pengasuh, atau teman yang jadi tempat bersandar.' } },
    14: { label: 'Raja', short: 'K', court: true, person: 'sosok berwibawa, mapan, dan bertanggung jawab (sering laki-laki, tapi nggak selalu)', theme: 'penguasaan dan kepemimpinan', advice: 'Ambil tanggung jawab dengan bijak dan tegas.',
      rev: 'kekuasaannya disalahgunakan, terlalu mengontrol atau kurang bijak.',
      topics: {
        cinta: 'Sosok yang stabil, bertanggung jawab, dan berkomitmen; cinta yang dipimpin dengan bijak.',
        karir: 'Otoritas, keahlian puncak, atau atasan yang berpengaruh; kamu siap memimpin.',
        keuangan: 'Penguasaan finansial, keputusan besar dibikin dengan kepala dingin.',
        kesehatan: 'Kendali penuh atas kesehatanmu melalui disiplin yang matang.',
        diri: 'Kepemimpinan atas dirimu sendiri; kebijaksanaan yang diterapkan.',
        keluarga: 'Sosok ayah/pemimpin keluarga, atau teman yang jadi pelindung.' } }
  };

  const RANK_EN = { 1: 'Ace', 2: 'Two', 3: 'Three', 4: 'Four', 5: 'Five', 6: 'Six', 7: 'Seven', 8: 'Eight', 9: 'Nine', 10: 'Ten', 11: 'Page', 12: 'Knight', 13: 'Queen', 14: 'King' };

  /* [rank, kwUp, kwRev, makna tegak, makna terbalik, polaritas, polaritas terbalik(opsional)] */
  const MINOR_DATA = {
    wands: [
      [1, 'inspirasi, gairah baru, potensi kreatif', 'tertunda, kurang semangat, ide mandek',
        'Sebuah tangan muncul dari awan menggenggam tongkat yang bertunas. As Tongkat adalah percikan api inspirasi: ide baru, gairah, dan dorongan buat mulai sesuatu dengan berani.',
        'Percikan semangat padam sebelum menyala, ide tertunda, kurang motivasi, atau energi yang belum nemu arah.', 2],
      [2, 'perencanaan, keputusan, visi ke depan', 'takut melangkah, rencana mandek, ragu',
        'Seorang tokoh memegang bola dunia sambil memandang jauh dari benteng. Dua Tongkat adalah tentang merencanakan masa depan dan mutusin apakah tetap di zona nyaman atau menjelajah dunia yang lebih luas.',
        'Takut keluar dari zona aman bikin rencana cuma tinggal rencana; kurang persiapan atau bingung memilih arah.', 1],
      [3, 'ekspansi, pandangan jauh, kemajuan', 'hambatan, keterlambatan, kecewa pada hasil',
        'Tokoh berdiri di tebing memandang kapal-kapal berlayar. Usaha awalmu mulai membuahkan hasil; saatnya memperluas cakrawala dan menanti kapal-kapalmu kembali bawa hasil.',
        'Rencana tertunda atau hasil nggak sesuai harapan; ekspansi terhambat karena kurang persiapan.', 1],
      [4, 'perayaan, rumah, harmoni, pencapaian', 'ketegangan di rumah, transisi, kurang dukungan',
        'Empat tongkat berhias untaian bunga, orang-orang merayakan di depan kastil. Momen sukacita, perayaan, pulang ke rumah, dan stabilitas yang patut disyukuri.',
        'Perayaan tertunda atau suasana rumah yang kurang harmonis; transisi yang belum mulus.', 2],
      [5, 'persaingan, konflik, perbedaan pendapat', 'menghindari konflik, berdamai, kompromi',
        'Lima orang mengacungkan tongkat kayak lagi bertarung, atau berlatih. Ada persaingan, gesekan ego, dan perbedaan pendapat yang menuntutmu mempertahankan posisi.',
        'Konflik mereda atau dihindari; bisa berarti mencari jalan damai, atau memendam ketegangan.', -1, 0.5],
      [6, 'kemenangan, pengakuan, kepercayaan diri', 'ego, kurang pengakuan, jatuh dari puncak',
        'Penunggang kuda bermahkota daun laurel diarak oleh orang banyak. Enam Tongkat adalah kemenangan di depan umum, pengakuan, dan kepercayaan diri setelah usaha keras.',
        'Pengakuan yang tak kunjung datang atau kesombongan yang menjatuhkan; ragu bakal pencapaian sendiri.', 2],
      [7, 'bertahan, mempertahankan posisi, keberanian', 'kewalahan, menyerah, terlalu defensif',
        'Seseorang di atas bukit menangkis enam tongkat dari bawah. Kamu berada di posisi unggul, tapi harus mempertahankannya dengan berani dan teguh pada pendirian.',
        'Merasa kewalahan dan pengin menyerah, atau terlalu defensif hingga melawan semua orang.', 0],
      [8, 'kecepatan, kabar cepat, gerak maju', 'tertunda, terburu-buru, frustrasi',
        'Delapan tongkat melesat di udara menuju sasaran. Segalanya bergerak cepat: kabar datang, perjalanan, perkembangan yang pesat.',
        'Hambatan dan penundaan, atau tindakan buru-buru yang bikin kacau.', 1],
      [9, 'ketahanan, kegigihan, waspada', 'kelelahan, curiga berlebihan, hampir menyerah',
        'Seorang yang terluka berjaga dengan tongkat di tangan. Kamu udah melewati banyak pertempuran; sedikit lagi, kegigihanmu bakal membawamu ke garis akhir.',
        'Kelelahan dan sikap defensif yang berlebihan; kamu butuh istirahat dan dukungan.', 0],
      [10, 'beban, tanggung jawab berlebih, kerja keras', 'melepaskan beban, delegasi, kelelahan total',
        'Seseorang memanggul sepuluh tongkat dengan susah payah. Kamu menanggung terlalu banyak; kesuksesan datang bersama beban tanggung jawab yang berat.',
        'Saatnya ngelepasin sebagian beban dan mendelegasikan, atau kamu bakal kelelahan total.', -1, 0],
      [11, 'semangat, eksplorasi, kabar baik', 'kurang arah, tidak sabar, ide mentah',
        'Pemuda memandang tongkat bertunas dengan kagum. Page Tongkat bawa antusiasme, rasa penasaran, dan kabar menggembirakan tentang hal baru.',
        'Semangat yang cepat padam, ide yang belum matang, atau kabar yang tertunda.', 1],
      [12, 'petualangan, gairah, aksi berani', 'impulsif, tergesa-gesa, tidak konsisten',
        'Kesatria di atas kuda yang mengangkat kaki depannya, siap melesat. Penuh energi, berani mengambil risiko, dan mengejar petualangan.',
        'Gegabah, mudah bosan, atau mulai banyak hal tanpa menyelesaikannya.', 1],
      [13, 'percaya diri, karisma, kehangatan', 'cemburu, egois, kurang percaya diri',
        'Ratu duduk dengan bunga matahari di tangan dan kucing hitam di kakinya. Dia percaya diri, hangat, mandiri, dan memikat, inspirasi bagi orang-orang di sekitarnya.',
        'Rasa nggak aman yang muncul sebagai cemburu atau sikap menuntut; kehilangan kepercayaan diri.', 2],
      [14, 'visi, kepemimpinan, jiwa wirausaha', 'otoriter, impulsif, ekspektasi terlalu tinggi',
        'Raja berjubah motif salamander memegang tongkat bertunas. Pemimpin visioner yang berani mengambil keputusan dan menginspirasi orang lain buat mengikutinya.',
        'Kepemimpinan yang otoriter atau gegabah; menuntut terlalu banyak dari diri sendiri dan orang lain.', 2]
    ],
    cups: [
      [1, 'cinta baru, luapan perasaan, welas asih', 'emosi tertahan, kekosongan, kurang mencintai diri',
        'Piala meluap dengan lima aliran air, seekor merpati bawa roti suci. As Piala adalah awal emosional yang indah: cinta baru, kasih, dan hati yang terbuka.',
        'Perasaan dipendam atau hati yang tertutup; kamu perlu mengisi pialamu sendiri lebih dulu.', 2],
      [2, 'kemitraan, saling tertarik, persatuan', 'hubungan timpang, komunikasi putus, renggang',
        'Dua orang saling bertukar piala di bawah lambang caduceus berkepala singa. Kartu cinta dan kemitraan yang setara, ketertarikan timbal balik dan ikatan yang tulus.',
        'Hubungan yang timpang, salah paham, atau rasa yang mulai terputus antara dua pihak.', 2],
      [3, 'persahabatan, perayaan, komunitas', 'gosip, pihak ketiga, berlebihan',
        'Tiga perempuan mengangkat piala sambil menari. Persahabatan, perayaan, dan kegembiraan bersama komunitas.',
        'Pesta berlebihan, gosip, atau kehadiran pihak ketiga yang mengganggu.', 2],
      [4, 'apatis, perenungan, kurang puas', 'kesadaran baru, menerima tawaran, bangkit',
        'Seseorang duduk di bawah pohon dengan tangan bersilang, nyuekin piala yang ditawarkan dari awan. Bosan, nggak puas, atau terlalu tenggelam dalam diri hingga melewatkan kesempatan.',
        'Bangun dari kebosanan; kamu mulai ngeliat peluang yang selama ini terabaikan.', -1, 0.5],
      [5, 'kehilangan, penyesalan, duka', 'menerima, memaafkan, bangkit',
        'Sosok berjubah hitam menunduk menatap tiga piala tumpah, tanpa ngeliat dua piala yang masih berdiri di belakangnya. Duka dan penyesalan, tapi masih ada yang tersisa buat disyukuri.',
        'Mulai menerima kehilangan dan bangkit; berdamai dengan masa lalu.', -1, 0.5],
      [6, 'nostalgia, kenangan manis, kebaikan', 'terjebak masa lalu, naif, tidak realistis',
        'Seorang anak ngasih piala berisi bunga ke anak lain. Kenangan manis, kepolosan, kebaikan, dan mungkin pertemuan kembali dengan seseorang dari masa lalu.',
        'Terlalu terikat pada masa lalu sehingga sulit bergerak maju.', 1],
      [7, 'banyak pilihan, khayalan, ilusi', 'kejelasan, keputusan, realistis',
        'Tujuh piala melayang di awan berisi berbagai godaan. Banyak pilihan dan angan-angan, tapi nggak semuanya nyata. Bedakan mimpi dari ilusi.',
        'Kabut mulai terang; kamu siap memilih dengan realistis.', -1, 0.5],
      [8, 'meninggalkan, mencari makna, melepas', 'takut pergi, ragu, kembali ke yang lama',
        'Sosok berjalan pergi meninggalkan delapan piala yang tersusun rapi, menuju gunung di bawah bulan. Meninggalkan sesuatu yang tak lagi memuaskan jiwa demi pencarian yang lebih bermakna.',
        'Ragu buat pergi, atau bertahan di situasi yang sebenarnya udah nggak membahagiakan.', 0],
      [9, 'harapan terkabul, puas, bahagia', 'kepuasan semu, serakah, kecewa',
        'Seorang pria duduk puas dengan sembilan piala berjajar di belakangnya. Disebut "kartu permohonan", keinginanmu cenderung terkabul.',
        'Kepuasan yang dangkal, atau keinginan yang terkabul tapi nggak membahagiakan kayak yang dibayangkan.', 2],
      [10, 'kebahagiaan keluarga, harmoni, cinta yang langgeng', 'keluarga kurang harmonis, ekspektasi, keretakan',
        'Keluarga bahagia di bawah pelangi sepuluh piala. Kebahagiaan emosional yang utuh, keharmonisan rumah tangga, dan cinta yang bertahan.',
        'Ketidakharmonisan di rumah, atau ekspektasi "keluarga sempurna" yang membebani.', 2],
      [11, 'pesan cinta, kreativitas, intuisi', 'emosi belum dewasa, kecewa, kreativitas tersumbat',
        'Pemuda memegang piala berisi ikan yang muncul tiba-tiba. Kabar yang menyentuh hati, ide kreatif, atau ungkapan perasaan yang manis dan polos.',
        'Perasaan yang belum matang, terlalu sensitif, atau kreativitas yang tersumbat.', 1],
      [12, 'romantis, tawaran, mengikuti hati', 'suasana hati berubah-ubah, janji kosong, cemburu',
        'Kesatria berkuda pelan bawa piala dengan anggun. Pembawa tawaran romantis, undangan, atau seseorang yang mengikuti kata hatinya.',
        'Janji manis yang nggak ditepati, suasana hati yang berubah-ubah, atau idealisme yang nggak realistis.', 1],
      [13, 'empati, kasih sayang, intuisi', 'terlalu sensitif, ketergantungan, lelah emosional',
        'Ratu duduk di tepi laut menatap piala berhias yang tertutup. Penuh empati, intuitif, dan pengasih, dia memahami perasaan orang lain dengan dalam.',
        'Kelelahan emosional karena menyerap perasaan orang lain; lupa merawat diri sendiri.', 2],
      [14, 'emosi seimbang, bijak, diplomatis', 'manipulatif, emosi tertekan, dingin',
        'Raja duduk di singgasana yang mengapung di tengah laut bergelora, tapi tetap tenang. Kematangan emosional, mampu tetap tenang dan bijak di tengah gejolak.',
        'Emosi yang dipendam atau dipakai buat memanipulasi; tampak tenang di luar tapi bergolak di dalam.', 1]
    ],
    swords: [
      [1, 'kejernihan, kebenaran, terobosan', 'kebingungan, salah komunikasi, kata-kata tajam',
        'Tangan dari awan menggenggam pedang bermahkota. Kejernihan pikiran, kebenaran, dan terobosan, kamu ngeliat situasi dengan tajam.',
        'Pikiran kacau, keputusan yang keliru, atau kata-kata yang melukai.', 1],
      [2, 'jalan buntu, menghindar, keputusan sulit', 'kebimbangan memuncak, informasi berlebih, terpaksa memilih',
        'Perempuan dengan mata tertutup menyilangkan dua pedang di dada, di tepi laut. Keputusan sulit yang terus ditunda; menutup mata biar nggak perlu memilih.',
        'Kebimbangan memuncak; informasi baru memaksamu buat mutusin.', -1, 0],
      [3, 'patah hati, duka, luka emosional', 'pemulihan, memaafkan, melepas duka',
        'Tiga pedang menembus hati merah di bawah awan hujan. Patah hati, kesedihan, atau kebenaran yang menyakitkan. Rasa sakit ini nyata dan perlu dirasakan biar bisa sembuh.',
        'Luka mulai pulih; kamu belajar melepaskan dan memaafkan.', -2, 0],
      [4, 'istirahat, pemulihan, kontemplasi', 'gelisah, kelelahan, kembali beraktivitas',
        'Seorang kesatria berbaring di atas makam dengan tangan dalam posisi berdoa. Waktu buat beristirahat, memulihkan diri, dan menenangkan pikiran sebelum melangkah lagi.',
        'Gelisah dan nggak bisa beristirahat, atau terpaksa kembali beraktivitas sebelum pulih.', 0],
      [5, 'konflik, kemenangan pahit, ego', 'berdamai, menyesal, melepas dendam',
        'Seorang pria tersenyum mengumpulkan pedang sementara dua orang pergi dengan kecewa. Kemenangan yang merusak hubungan, apakah menang lebih penting daripada damai?',
        'Keinginan buat berdamai dan benerin hubungan setelah konflik.', -2, 0],
      [6, 'transisi, meninggalkan masalah, perjalanan', 'sulit pergi, beban terbawa, tertahan',
        'Tukang perahu bawa seorang perempuan dan anak menyeberang menuju perairan yang tenang. Bergerak menjauh dari masa sulit menuju tempat yang lebih damai.',
        'Sulit meninggalkan masalah, atau bawa beban lama ke tempat yang baru.', 1],
      [7, 'strategi, siasat, ketidakjujuran', 'ketahuan, pengakuan, mengubah cara',
        'Seseorang mengendap-endap bawa lima pedang dari perkemahan. Siasat dan strategi diam-diam, atau ketidakjujuran. Waspadain siapa yang bermain curang.',
        'Rahasia terungkap, atau kamu mutusin berhenti menipu diri sendiri.', -1, 0],
      [8, 'terjebak, membatasi diri, merasa tak berdaya', 'membebaskan diri, perspektif baru, jalan keluar',
        'Perempuan terikat dan tertutup matanya di antara delapan pedang, padahal jalannya sebenarnya terbuka. Penjara ini sebagian besar dibangun oleh pikiranmu sendiri.',
        'Mulai membebaskan diri dari pikiran yang membatasi; kamu ngeliat jalan keluar.', -1, 1],
      [9, 'kecemasan, mimpi buruk, overthinking', 'harapan, mulai pulih, kecemasan mereda',
        'Seseorang terbangun di tengah malam, menutup wajah, dengan sembilan pedang di dinding. Kecemasan dan pikiran berlebih yang bikin masalah tampak lebih besar dari aslinya.',
        'Kecemasan mereda; kamu mulai ngeliat bahwa nggak semuanya seburuk yang dibayangkan.', -2, 0],
      [10, 'titik terendah, akhir yang menyakitkan, selesai', 'bangkit, pemulihan, enggan melepas',
        'Seseorang terbaring dengan sepuluh pedang di punggung, tapi fajar mulai menyingsing. Titik terendah, akhir yang menyakitkan, tapi nggak ada lagi yang lebih buruk; dari sini cuma ada jalan naik.',
        'Bangkit dari keterpurukan, meski bekas lukanya masih kerasa.', -2, 0.5],
      [11, 'rasa ingin tahu, ide baru, waspada', 'gosip, bicara tanpa pikir, defensif',
        'Pemuda memegang pedang dengan angin berembus di sekitarnya. Pikiran tajam, haus pengetahuan, dan siap menghadapi tantangan intelektual.',
        'Bicara tanpa berpikir, gosip, atau sikap defensif.', 0],
      [12, 'ambisius, cepat bertindak, tegas', 'tergesa-gesa, kasar, tanpa rencana',
        'Kesatria menyerbu dengan pedang terhunus menantang angin. Bertindak cepat dan tegas, langsung ke inti persoalan.',
        'Gegabah dan kasar; menyerbu tanpa memikirkan akibat.', 0],
      [13, 'jernih, mandiri, jujur', 'dingin, kejam, pahit',
        'Ratu duduk tegak, pedang terangkat, tangan terulur. Jernih, jujur, dan mandiri, dia ngeliat kebenaran tanpa ilusi, ditempa oleh pengalaman.',
        'Kepahitan masa lalu membuatnya dingin dan terlalu kritis.', 1],
      [14, 'otoritas intelektual, kebenaran, adil', 'manipulatif, tirani, kejam',
        'Raja duduk dengan pedang tegak lurus, penuh wibawa. Pemikir yang adil dan tegas, mengambil keputusan berdasarkan logika dan prinsip.',
        'Kecerdasan dipakai buat memanipulasi; keputusan dingin tanpa empati.', 1]
    ],
    pentacles: [
      [1, 'peluang materi, kemakmuran, manifestasi', 'peluang hilang, perencanaan buruk, boros',
        'Tangan dari awan menyodorkan koin emas di atas taman yang subur. Peluang nyata buat kemakmuran: pekerjaan baru, sumber uang baru, atau awal yang kokoh.',
        'Peluang terlewat atau rencana keuangan yang buruk.', 2],
      [2, 'mengatur prioritas, adaptasi, luwes', 'kewalahan, tidak teratur, berantakan',
        'Pemuda menari sambil memainkan dua koin dalam lingkaran tak hingga, kapal terombang-ambing di belakangnya. Menyeimbangkan banyak hal dengan luwes.',
        'Kewalahan mengatur waktu dan uang; terlalu banyak hal yang dipegang.', 0],
      [3, 'kerja tim, keahlian, pembelajaran', 'kurang kerja sama, kualitas buruk',
        'Tukang batu bekerja di katedral sambil berdiskusi dengan dua perancang. Keahlian yang dihargai dan kerja sama yang membangun sesuatu yang bernilai.',
        'Kerja tim yang nggak kompak, atau kualitas yang dikorbankan.', 1],
      [4, 'menabung, keamanan, kontrol', 'pelit, takut kehilangan, boros',
        'Seseorang memeluk koin erat-erat, satu di atas kepala dan dua di bawah kaki. Keamanan finansial dan nabung, tapi hati-hati jadi terlalu menggenggam.',
        'Terlalu pelit, atau sebaliknya melepas kendali hingga boros.', 0],
      [5, 'kesulitan, kehilangan, merasa terabaikan', 'pemulihan, bantuan datang, keluar dari krisis',
        'Dua orang miskin berjalan di salju melewati jendela gereja yang terang. Kesulitan materi atau rasa terasing, padahal bantuan mungkin ada di dekatmu.',
        'Masa sulit mulai berakhir; bantuan dan pemulihan datang.', -2, 0.5],
      [6, 'memberi, menerima, kedermawanan', 'utang, pamrih, ketimpangan',
        'Pedagang kaya menimbang dan ngasih koin ke yang butuh. Keseimbangan ngasih dan menerima; kedermawanan atau bantuan yang datang.',
        'Bantuan dengan pamrih, utang yang membebani, atau ketidakseimbangan.', 1],
      [7, 'kesabaran, investasi jangka panjang, evaluasi', 'hasil kurang, tidak sabar, usaha sia-sia',
        'Petani bersandar pada cangkulnya memandang tanaman berbuah koin. Investasi jangka panjang yang mulai tumbuh, bersabarlah dan evaluasi hasilnya.',
        'Nggak sabar nunggu hasil, atau usaha yang nggak sebanding dengan hasilnya.', 0],
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
        'Kesatria duduk tenang di atas kuda yang diam, memandang koin. Lambat tapi pasti, kerja keras yang konsisten dan dapat diandalkan.',
        'Stagnasi, terlalu kaku, atau kemalasan.', 1],
      [13, 'mengayomi, praktis, sejahtera', 'terlalu sibuk, mengabaikan diri, materialistis',
        'Ratu memangku koin di taman yang subur, seekor kelinci di dekatnya. Praktis, hangat, dan mampu menciptakan rumah serta kehidupan yang nyaman.',
        'Terlalu sibuk bekerja atau mengurus orang lain hingga nyuekin diri sendiri.', 2],
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
