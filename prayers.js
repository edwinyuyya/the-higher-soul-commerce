// Doa penguatan singkat yang dipilih sesuai tema ayat.
// Tema dikenali dari kata-kata di ayat; setiap tema punya beberapa doa,
// dan ayat yang sama selalu mendapat doa yang sama.
(() => {
  "use strict";

  const CLOSING = "Dalam nama Tuhan Yesus aku berdoa. Amin.";

  // weight: tema penguatan diberi bobot lebih tinggi supaya lebih diutamakan
  const THEMES = [
    {
      id: "takut", weight: 3,
      words: ["jangan takut", "takut", "ketakutan", "gentar", "gemetar", "ngeri", "cemas", "kecemasan"],
      prayers: [
        "Tuhan Yesus, Engkau tahu ketakutan yang ada di hatiku saat ini. Terima kasih karena firman-Mu mengingatkan bahwa aku tidak sendirian. Ganti rasa takutku dengan keberanian dan damai yang datang dari-Mu.",
        "Tuhan Yesus, ketika aku gemetar dan tidak tahu harus berbuat apa, peganglah tanganku. Tolong aku percaya bahwa Engkau lebih besar daripada apa pun yang aku takutkan.",
        "Tuhan Yesus, aku menyerahkan semua kecemasanku kepada-Mu. Tenangkan hatiku, teguhkan langkahku, dan biarlah kehadiran-Mu menjadi tempat aku merasa aman.",
      ],
    },
    {
      id: "khawatir", weight: 3,
      words: ["khawatir", "kuatir", "kekhawatiran", "gelisah", "resah", "susah hati", "beban", "berbeban", "letih lesu", "kelegaan", "lelah"],
      prayers: [
        "Tuhan Yesus, hari ini aku membawa semua kekhawatiranku kepada-Mu. Engkau peduli kepadaku lebih dari yang aku tahu. Ajar aku melepaskan beban ini dan beristirahat dalam pemeliharaan-Mu.",
        "Tuhan Yesus, pikiranku sering penuh dengan hal-hal yang belum terjadi. Tolong aku hidup satu hari demi satu hari dengan percaya kepada-Mu, dan berikanlah kelegaan bagi jiwaku yang letih.",
        "Tuhan Yesus, aku datang kepada-Mu dengan hati yang gelisah. Ambillah beban yang terlalu berat bagiku, dan biarlah damai-Mu menjaga hati dan pikiranku.",
      ],
    },
    {
      id: "penghiburan", weight: 2.5,
      words: ["menghibur", "dihibur", "penghiburan", "air mata", "menangis", "tangis", "dukacita", "berdukacita", "duka", "ratap", "meratap", "remuk", "patah hati", "kesepian", "sendirian"],
      prayers: [
        "Tuhan Yesus, Engkau melihat setiap air mataku. Terima kasih karena Engkau dekat dengan orang yang patah hati. Hiburlah aku dengan kasih-Mu, dan pulihkanlah hatiku perlahan-lahan.",
        "Tuhan Yesus, di tengah dukaku, jadilah penghiburku. Aku tidak harus kuat sendirian, sebab Engkau menanggung aku. Berikan aku pengharapan bahwa sukacita akan datang kembali.",
        "Tuhan Yesus, ketika aku merasa sendiri dan hancur, ingatkan aku bahwa Engkau tidak pernah meninggalkanku. Peluklah hatiku dan balutlah lukaku.",
      ],
    },
    {
      id: "kekuatan", weight: 2,
      words: ["kuatkan", "menguatkan", "kekuatan", "kuat dan berani", "teguh", "tegar", "berani", "keberanian", "perkasa", "tenaga", "lemah", "kelemahan"],
      prayers: [
        "Tuhan Yesus, ketika kekuatanku habis, jadilah kekuatanku. Terima kasih karena kuasa-Mu justru nyata dalam kelemahanku. Teguhkan aku untuk menjalani hari ini bersama-Mu.",
        "Tuhan Yesus, aku merasa lemah, tetapi Engkau perkasa. Berikan aku keberanian untuk tetap melangkah dan hati yang teguh untuk tidak menyerah.",
        "Tuhan Yesus, kuatkanlah tanganku yang lemah dan lututku yang goyah. Biarlah aku bersandar kepada-Mu, bukan kepada kekuatanku sendiri.",
      ],
    },
    {
      id: "perlindungan", weight: 2,
      words: ["lindung", "perlindungan", "melindungi", "perisai", "benteng", "gunung batu", "naungan", "kubu", "menjaga", "penjaga", "memelihara", "pemeliharaan", "gembala", "aman"],
      prayers: [
        "Tuhan Yesus, Engkaulah tempat perlindunganku. Terima kasih karena di dalam Engkau aku aman. Jagalah aku, keluargaku, dan setiap langkahku hari ini.",
        "Tuhan Yesus, ketika badai datang, sembunyikan aku di bawah naungan-Mu. Aku percaya Engkau adalah perisai dan benteng yang tidak tergoyahkan.",
        "Tuhan Yesus, aku menyerahkan hidupku ke dalam penjagaan-Mu. Lindungilah hatiku dari kekhawatiran dan hidupku dari yang jahat.",
      ],
    },
    {
      id: "pertolongan", weight: 2,
      words: ["tolong", "pertolongan", "menolong", "penolong", "menyelamatkan", "melepaskan", "kelepasan", "luput"],
      prayers: [
        "Tuhan Yesus, pertolonganku datang dari-Mu. Engkau tahu apa yang sedang aku hadapi. Ulurkan tangan-Mu, tolonglah aku, dan bukakan jalan yang tidak dapat aku lihat.",
        "Tuhan Yesus, aku berseru kepada-Mu karena aku membutuhkan pertolongan-Mu. Terima kasih karena Engkau tidak pernah terlambat. Aku menanti-nantikan Engkau dengan percaya.",
        "Tuhan Yesus, lepaskan aku dari hal-hal yang mengikat dan menekan hidupku. Aku percaya Engkau sanggup menolong lebih dari yang aku bayangkan.",
      ],
    },
    {
      id: "penyertaan", weight: 2,
      words: ["menyertai", "menyertaimu", "menyertai kamu", "beserta", "bersamamu", "tidak akan meninggalkan", "tidak akan membiarkan", "dekat"],
      prayers: [
        "Tuhan Yesus, terima kasih karena Engkau berjanji menyertaiku setiap hari. Ke mana pun aku pergi hari ini, biarlah aku menyadari kehadiran-Mu di sampingku.",
        "Tuhan Yesus, ketika aku merasa sendiri, ingatkan aku bahwa Engkau tidak pernah meninggalkanku. Jadikan kehadiran-Mu sumber ketenangan bagiku.",
        "Tuhan Yesus, berjalanlah bersamaku melewati setiap musim hidupku. Aku tidak takut melangkah karena Engkau ada bersamaku.",
      ],
    },
    {
      id: "damai", weight: 2,
      words: ["damai", "sejahtera", "tenang", "ketenangan", "tenteram", "istirahat", "perhentian", "teduh"],
      prayers: [
        "Tuhan Yesus, Engkaulah Raja Damai. Tenangkan badai di dalam hatiku, dan berikan aku damai sejahtera yang melampaui segala pengertian.",
        "Tuhan Yesus, aku butuh ketenangan dari-Mu. Ajar aku diam di hadapan-Mu, beristirahat dalam kasih-Mu, dan percaya bahwa Engkau memegang kendali.",
        "Tuhan Yesus, biarlah damai-Mu memerintah dalam hatiku, dalam keluargaku, dan dalam setiap keputusan yang aku ambil hari ini.",
      ],
    },
    {
      id: "ampun", weight: 2,
      words: ["dosa", "berdosa", "ampun", "ampuni", "mengampuni", "pengampunan", "pelanggaran", "kesalahan", "bertobat", "pertobatan", "menyesal", "tahir", "bersihkan"],
      prayers: [
        "Tuhan Yesus, aku mengaku bahwa aku sering jatuh. Terima kasih karena kasih-Mu lebih besar daripada dosaku. Ampunilah aku, bersihkan hatiku, dan berikan aku awal yang baru.",
        "Tuhan Yesus, terima kasih untuk pengampunan yang Engkau berikan melalui salib-Mu. Tolong aku untuk tidak lagi hidup dalam rasa bersalah, tetapi berjalan dalam kasih karunia-Mu.",
        "Tuhan Yesus, selidikilah hatiku dan tunjukkan bagian yang perlu Engkau pulihkan. Berikan aku hati yang mau bertobat dan kekuatan untuk hidup benar.",
      ],
    },
    {
      id: "kesembuhan", weight: 2,
      words: ["sakit", "penyakit", "sembuh", "disembuhkan", "menyembuhkan", "kesembuhan", "pulihkan", "memulihkan", "pemulihan", "lumpuh", "buta", "kusta"],
      prayers: [
        "Tuhan Yesus, Engkaulah Tabib yang ajaib. Aku membawa tubuhku, hatiku, dan orang-orang yang sedang sakit kepada-Mu. Sentuhlah dan pulihkanlah kami menurut kasih-Mu.",
        "Tuhan Yesus, Engkau berbelas kasihan kepada orang yang sakit dan menderita. Berikan kesembuhan, kekuatan, dan pengharapan bagi setiap yang membutuhkan sentuhan-Mu.",
        "Tuhan Yesus, pulihkanlah yang rusak dalam hidupku, baik tubuh, hati, maupun hubungan-hubunganku. Aku percaya Engkau sanggup memulihkan.",
      ],
    },
    {
      id: "pengharapan", weight: 2,
      words: ["harap", "berharap", "pengharapan", "menanti", "menantikan", "nantikan", "masa depan", "janji", "berjanji", "rencana"],
      prayers: [
        "Tuhan Yesus, ketika masa depan terasa gelap, Engkaulah pengharapanku. Terima kasih karena rencana-Mu bagiku adalah rencana yang baik. Ajar aku menanti dengan sabar dan percaya.",
        "Tuhan Yesus, nyalakan kembali pengharapan di hatiku. Aku percaya janji-janji-Mu tidak pernah gagal, dan Engkau sedang bekerja walaupun aku belum melihatnya.",
        "Tuhan Yesus, aku menyerahkan hari esokku ke dalam tangan-Mu. Berikan aku pengharapan yang teguh, yang tidak bergantung pada keadaan, tetapi pada kesetiaan-Mu.",
      ],
    },
    {
      id: "hikmat", weight: 1.5,
      words: ["hikmat", "berhikmat", "bijak", "bijaksana", "pengertian", "pengetahuan", "didikan", "nasihat", "teguran", "bodoh", "kebodohan", "orang bebal"],
      prayers: [
        "Tuhan Yesus, aku membutuhkan hikmat-Mu. Terangilah pikiranku supaya aku dapat mengambil keputusan yang benar dan menyenangkan hati-Mu.",
        "Tuhan Yesus, ajar aku untuk mau mendengar nasihat dan menerima teguran dengan rendah hati. Jauhkan aku dari bersandar pada pengertianku sendiri.",
        "Tuhan Yesus, berikan aku hati yang bijaksana dan telinga yang peka terhadap suara-Mu, supaya hidupku semakin serupa dengan kehendak-Mu.",
      ],
    },
    {
      id: "tuntunan", weight: 1.5,
      words: ["jalan", "menuntun", "tuntun", "tuntunlah", "pimpin", "memimpin", "petunjuk", "langkah", "arah", "luruskan", "meluruskan", "terang"],
      prayers: [
        "Tuhan Yesus, aku tidak selalu tahu jalan mana yang harus aku ambil. Tuntunlah langkahku, luruskan jalanku, dan jauhkan aku dari jalan yang salah.",
        "Tuhan Yesus, jadilah terang bagi jalanku. Ketika aku bingung, berikan aku petunjuk yang jelas dan hati yang taat untuk mengikuti-Mu.",
        "Tuhan Yesus, aku menyerahkan setiap rencanaku kepada-Mu. Pimpinlah aku sesuai kehendak-Mu, bukan kehendakku sendiri.",
      ],
    },
    {
      id: "iman", weight: 1.5,
      words: ["percaya", "iman", "beriman", "yakin", "keyakinan", "bimbang", "ragu"],
      prayers: [
        "Tuhan Yesus, aku percaya, tolonglah aku yang kurang percaya ini. Teguhkan imanku ketika keadaan membuatku ragu.",
        "Tuhan Yesus, ajar aku hidup dengan iman, bukan dengan apa yang aku lihat. Biarlah kepercayaanku kepada-Mu bertumbuh setiap hari.",
        "Tuhan Yesus, ketika aku bimbang, ingatkan aku akan kesetiaan-Mu di masa lalu. Kuatkan imanku untuk menghadapi hari ini.",
      ],
    },
    {
      id: "kasih", weight: 1.5,
      words: ["kasih setia", "kasih", "mengasihi", "dikasihi", "belas kasihan", "berbelas kasihan", "rahmat", "kemurahan"],
      prayers: [
        "Tuhan Yesus, terima kasih karena Engkau mengasihiku dengan kasih yang tidak berkesudahan. Ketika aku merasa tidak layak, ingatkan aku bahwa aku berharga di mata-Mu.",
        "Tuhan Yesus, penuhilah hatiku dengan kasih-Mu, supaya aku dapat mengasihi orang lain seperti Engkau mengasihiku.",
        "Tuhan Yesus, kasih setia-Mu baru setiap pagi. Biarlah aku hidup hari ini dengan menyadari betapa besar belas kasihan-Mu bagiku.",
      ],
    },
    {
      id: "penderitaan", weight: 1.5,
      words: ["menderita", "penderitaan", "kesesakan", "kesusahan", "kesukaran", "aniaya", "menganiaya", "dianiaya", "pencobaan", "cobaan", "ujian", "musuh", "lawan", "tertindas"],
      prayers: [
        "Tuhan Yesus, Engkau tahu pergumulan yang sedang aku alami. Terima kasih karena Engkau pernah menderita dan mengerti rasa sakitku. Kuatkan aku untuk bertahan sampai pertolongan-Mu datang.",
        "Tuhan Yesus, di tengah kesesakan ini, jangan biarkan aku putus asa. Pakailah masa sulit ini untuk membentukku, dan berikan aku kekuatan untuk melewatinya.",
        "Tuhan Yesus, ketika aku diserang dan disakiti, jadilah pembelaku. Jagalah hatiku supaya tidak pahit, dan berikan aku kasih bahkan kepada yang menyakitiku.",
      ],
    },
    {
      id: "syukur", weight: 1,
      words: ["syukur", "bersyukur", "ucapan syukur", "puji", "pujilah", "memuji", "pujian", "bersorak", "nyanyikanlah", "bernyanyi", "memuliakan", "muliakanlah"],
      prayers: [
        "Tuhan Yesus, terima kasih untuk kebaikan-Mu dalam hidupku. Ajar aku untuk bersyukur dalam segala keadaan, karena Engkau tetap baik.",
        "Tuhan Yesus, hatiku mau memuji Engkau hari ini. Bukalah mataku untuk melihat berkat-berkat-Mu, sekecil apa pun itu.",
        "Tuhan Yesus, Engkau layak menerima segala pujian. Biarlah hidupku hari ini menjadi ucapan syukur bagi-Mu.",
      ],
    },
    {
      id: "sukacita", weight: 1,
      words: ["sukacita", "bersukacita", "bersukaria", "gembira", "bahagia", "berbahagialah", "diberkatilah", "berbahagia", "memberkati", "diberkati"],
      prayers: [
        "Tuhan Yesus, terima kasih karena sukacita dari-Mu tidak bergantung pada keadaan. Penuhilah hatiku dengan sukacita-Mu hari ini.",
        "Tuhan Yesus, berkatilah hidupku dan jadikan aku berkat bagi orang lain. Biarlah sukacita-Mu menjadi kekuatanku.",
        "Tuhan Yesus, pulihkan sukacita di hatiku. Ajar aku menemukan kebahagiaan sejati di dalam Engkau.",
      ],
    },
    {
      id: "kesetiaan", weight: 1,
      words: ["setia", "kesetiaan", "selama-lamanya", "turun-temurun", "tidak berubah", "teguh"],
      prayers: [
        "Tuhan Yesus, Engkau setia dari dulu sampai sekarang. Terima kasih karena janji-Mu tidak pernah berubah, walaupun keadaanku berubah.",
        "Tuhan Yesus, ketika banyak hal terasa tidak pasti, Engkaulah yang tetap sama. Aku bersandar pada kesetiaan-Mu hari ini.",
        "Tuhan Yesus, ajar aku untuk setia kepada-Mu seperti Engkau selalu setia kepadaku.",
      ],
    },
    {
      id: "doa", weight: 1,
      words: ["berdoa", "doa", "doaku", "berseru", "seruan", "memohon", "permohonan", "dengarlah", "jawablah"],
      prayers: [
        "Tuhan Yesus, terima kasih karena Engkau mendengar setiap doaku. Ajar aku untuk tekun berdoa dan percaya bahwa Engkau menjawab tepat pada waktu-Nya.",
        "Tuhan Yesus, dengarkanlah seruan hatiku hari ini. Aku menyerahkan setiap permohonanku kepada-Mu dengan penuh percaya.",
        "Tuhan Yesus, tariklah aku lebih dekat kepada-Mu dalam doa. Biarlah aku menikmati persekutuan dengan-Mu setiap hari.",
      ],
    },
    {
      id: "perkataan", weight: 1,
      words: ["lidah", "mulut", "bibir", "perkataan", "kata-kata", "berkata-kata", "dusta", "bohong", "berbohong", "fitnah", "gosip"],
      prayers: [
        "Tuhan Yesus, jagalah mulutku hari ini. Biarlah perkataanku membangun, menghibur, dan membawa damai bagi orang lain.",
        "Tuhan Yesus, ajar aku untuk berkata jujur dan lemah lembut. Jauhkan aku dari kata-kata yang melukai.",
        "Tuhan Yesus, kiranya ucapan mulutku dan renungan hatiku berkenan kepada-Mu.",
      ],
    },
    {
      id: "kerja", weight: 1,
      words: ["rajin", "malas", "pemalas", "pekerjaan", "bekerja", "usaha", "usahamu", "upah", "menabur", "menuai", "rezeki", "nafkah"],
      prayers: [
        "Tuhan Yesus, berkatilah pekerjaan tanganku. Berikan aku semangat untuk bekerja dengan rajin dan jujur, seperti untuk Engkau.",
        "Tuhan Yesus, aku menyerahkan usaha dan pekerjaanku kepada-Mu. Cukupkanlah kebutuhanku dan pakailah pekerjaanku untuk memuliakan nama-Mu.",
        "Tuhan Yesus, ajar aku menabur kebaikan dengan tekun, dan percaya bahwa Engkau akan memberi tuaian pada waktunya.",
      ],
    },
    {
      id: "harta", weight: 1,
      words: ["kaya", "kekayaan", "harta", "uang", "miskin", "kemiskinan", "emas", "perak", "serakah", "keserakahan"],
      prayers: [
        "Tuhan Yesus, ajar aku untuk merasa cukup di dalam Engkau. Jauhkan aku dari keserakahan, dan cukupkanlah segala kebutuhanku.",
        "Tuhan Yesus, Engkaulah hartaku yang paling berharga. Tolong aku untuk tidak menggantungkan hidupku pada uang, tetapi kepada-Mu.",
        "Tuhan Yesus, berikan aku hati yang murah hati kepada orang yang berkekurangan, dan iman untuk percaya bahwa Engkau memelihara hidupku.",
      ],
    },
    {
      id: "rendahhati", weight: 1,
      words: ["sombong", "kesombongan", "congkak", "tinggi hati", "angkuh", "rendah hati", "kerendahan hati", "merendahkan diri", "lemah lembut"],
      prayers: [
        "Tuhan Yesus, berikan aku hati yang rendah hati seperti hati-Mu. Jauhkan aku dari kesombongan dan ajar aku untuk melayani orang lain.",
        "Tuhan Yesus, ketika aku merasa lebih baik dari orang lain, tegurlah aku dengan lembut. Biarlah aku belajar dari kerendahan hati-Mu.",
        "Tuhan Yesus, aku merendahkan diriku di hadapan-Mu. Angkatlah aku pada waktu-Mu, menurut kehendak-Mu.",
      ],
    },
    {
      id: "sabar", weight: 1,
      words: ["sabar", "kesabaran", "panjang sabar", "marah", "amarah", "kemarahan", "geram", "lambat untuk marah", "dendam", "membalas"],
      prayers: [
        "Tuhan Yesus, ajar aku untuk sabar dan lambat marah. Ketika emosiku memuncak, tenangkan hatiku dengan Roh-Mu.",
        "Tuhan Yesus, aku melepaskan kemarahan dan keinginan untuk membalas. Biarlah Engkau yang menjadi hakim, dan aku belajar mengampuni.",
        "Tuhan Yesus, bentuklah kesabaran dalam diriku, baik saat menunggu jawaban-Mu maupun saat menghadapi orang lain.",
      ],
    },
    {
      id: "keselamatan", weight: 1.5,
      words: ["keselamatan", "diselamatkan", "hidup kekal", "salib", "disalibkan", "kebangkitan", "bangkit", "injil", "juru selamat", "juruselamat", "anak domba"],
      prayers: [
        "Tuhan Yesus, terima kasih karena Engkau rela mati di kayu salib untuk menyelamatkanku. Biarlah hidupku menjadi ucapan syukur atas keselamatan yang Engkau berikan.",
        "Tuhan Yesus, Engkau telah bangkit dan hidup. Terima kasih untuk pengharapan hidup kekal. Tolong aku hidup setiap hari sebagai milik-Mu.",
        "Tuhan Yesus, terima kasih untuk kabar baik tentang kasih-Mu. Pakailah aku untuk membagikan kabar ini kepada orang-orang di sekitarku.",
      ],
    },
    {
      id: "roh", weight: 1.5,
      words: ["roh kudus", "roh allah", "roh tuhan", "roh-ku", "roh-mu", "penghibur"],
      prayers: [
        "Tuhan Yesus, terima kasih untuk Roh Kudus yang Engkau berikan. Penuhilah aku dengan Roh-Mu, supaya aku dapat hidup dalam kuasa dan kasih-Mu.",
        "Tuhan Yesus, biarlah Roh Kudus menuntun, menghibur, dan mengajarku hari ini. Aku mau peka terhadap suara-Mu.",
        "Tuhan Yesus, hasilkanlah buah Roh dalam hidupku: kasih, sukacita, damai sejahtera, kesabaran, kemurahan, kebaikan, kesetiaan, kelemahlembutan, dan penguasaan diri.",
      ],
    },
    {
      id: "firman", weight: 0.6,
      words: ["firman", "perintah", "perintah-ku", "hukum", "taurat", "ketetapan", "taat", "ketaatan", "menaati", "patuh", "kehendak"],
      prayers: [
        "Tuhan Yesus, terima kasih untuk firman-Mu yang menjadi pelita bagi kakiku. Berikan aku hati yang mau taat dan melakukan kehendak-Mu.",
        "Tuhan Yesus, tanamkan firman-Mu dalam hatiku supaya aku tidak mudah goyah. Ajar aku bukan hanya mendengar, tetapi juga melakukannya.",
        "Tuhan Yesus, biarlah firman-Mu membentuk cara pikirku, perkataanku, dan tindakanku hari ini.",
      ],
    },
    {
      id: "sesama", weight: 1,
      words: ["sesama", "sesamamu", "saling", "satu sama lain", "tetangga", "sahabat", "teman", "kawan", "persaudaraan", "bersatu", "kesatuan"],
      prayers: [
        "Tuhan Yesus, ajar aku untuk mengasihi sesamaku seperti diriku sendiri. Berikan aku hati yang peduli kepada orang-orang di sekitarku.",
        "Tuhan Yesus, pulihkan hubungan-hubunganku yang retak. Berikan aku kerendahan hati untuk meminta maaf dan kebesaran hati untuk mengampuni.",
        "Tuhan Yesus, jadikan aku sahabat yang setia dan pembawa damai di tengah keluarga, teman, dan lingkunganku.",
      ],
    },
    {
      id: "keluarga", weight: 1,
      words: ["istri", "istrimu", "suami", "suamimu", "ayahmu", "ibumu", "anakmu", "anak-anakmu", "orang tua", "orangtua", "keluarga", "keluargamu", "rumah tangga"],
      prayers: [
        "Tuhan Yesus, aku menyerahkan keluargaku ke dalam tangan-Mu. Peliharalah kami, satukan hati kami, dan jadikan rumah kami tempat kasih-Mu dinyatakan.",
        "Tuhan Yesus, berkatilah orang-orang yang aku kasihi. Lindungilah mereka dan tariklah mereka semakin dekat kepada-Mu.",
        "Tuhan Yesus, ajar aku untuk menghormati, mengasihi, dan melayani keluargaku dengan sabar, seperti Engkau mengasihi aku.",
      ],
    },
    {
      id: "hormat", weight: 1.5,
      words: ["takut akan tuhan", "takut akan allah", "takut kepada tuhan", "takut kepada allah", "takutilah", "takut akan dia", "menyembah", "sembahlah", "kudus", "kekudusan"],
      prayers: [
        "Tuhan Yesus, Engkau kudus dan mulia. Berikan aku hati yang hormat dan takut akan Engkau, supaya aku hidup dengan benar di hadapan-Mu.",
        "Tuhan Yesus, aku menyembah Engkau. Biarlah seluruh hidupku menjadi ibadah yang menyenangkan hati-Mu.",
        "Tuhan Yesus, ajar aku untuk mengutamakan Engkau di atas segalanya, dan menjauhi hal-hal yang tidak berkenan kepada-Mu.",
      ],
    },
    {
      id: "kebenaran", weight: 0.8,
      words: ["kebenaran", "orang benar", "orang-orang benar", "adil", "keadilan", "jujur", "kejujuran", "tulus", "fasik", "orang fasik", "jahat", "kejahatan"],
      prayers: [
        "Tuhan Yesus, ajar aku untuk hidup jujur dan benar, walaupun tidak ada yang melihat. Biarlah hidupku memancarkan kebenaran-Mu.",
        "Tuhan Yesus, ketika aku melihat ketidakadilan, ingatkan aku bahwa Engkau adalah Hakim yang adil. Berikan aku hati yang tetap berbuat baik.",
        "Tuhan Yesus, jauhkan aku dari jalan orang fasik. Tuntun aku untuk memilih yang benar, sekalipun itu tidak mudah.",
      ],
    },
    {
      id: "peringatan", weight: 0.8,
      words: ["murka", "hukuman", "menghukum", "dihukum", "binasa", "membinasakan", "kebinasaan", "celaka", "celakalah", "berhala", "kutuk", "terkutuk", "pedang", "perang"],
      prayers: [
        "Tuhan Yesus, firman-Mu hari ini mengingatkanku untuk hidup dengan sungguh-sungguh di hadapan-Mu. Jauhkan aku dari jalan yang salah, dan tuntunlah aku kembali setiap kali aku menyimpang.",
        "Tuhan Yesus, terima kasih karena Engkau menegur karena Engkau mengasihi. Berikan aku hati yang lembut untuk bertobat dan kembali kepada-Mu.",
        "Tuhan Yesus, singkirkan dari hidupku segala sesuatu yang aku utamakan lebih dari Engkau. Aku mau setia hanya kepada-Mu.",
      ],
    },
  ];

  // Untuk ayat kisah/sejarah tanpa tema yang jelas.
  const GENERAL = [
    "Tuhan Yesus, terima kasih untuk firman-Mu hari ini. Bukalah mata hatiku untuk mengerti apa yang ingin Engkau sampaikan kepadaku melalui ayat ini, dan berikan aku kekuatan untuk melakukannya.",
    "Tuhan Yesus, setiap kisah dalam firman-Mu menunjukkan bahwa Engkau bekerja dalam hidup manusia. Ingatkan aku bahwa Engkau juga sedang bekerja dalam hidupku, bahkan dalam hal-hal yang belum aku mengerti.",
    "Tuhan Yesus, aku percaya Engkau menuntunku kepada ayat ini. Ajar aku merenungkannya dengan sungguh-sungguh, dan biarlah firman-Mu menguatkan serta menuntun langkahku hari ini.",
    "Tuhan Yesus, firman-Mu hidup dan berkuasa. Tanamkan ayat ini di hatiku, supaya aku semakin mengenal Engkau dan semakin percaya kepada-Mu.",
  ];

  const LETTER = "\\p{L}";
  const compiled = THEMES.map((t) => ({
    ...t,
    // cocokkan awal kata, akhiran (-nya, -mu, -lah, dsb.) boleh ada
    re: new RegExp(
      `(?:^|[^${LETTER}])(?:${t.words.join("|")})${LETTER}{0,4}(?![${LETTER}])`,
      "giu"
    ),
  }));
  const REVERENT_FEAR = /takut (?:akan|kepada) (?:tuhan|allah|dia)|takutilah/giu;

  function hash(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function themeOf(text) {
    let best = null;
    let bestScore = 0;
    for (const t of compiled) {
      let source = text;
      // "takut akan TUHAN" berarti hormat, bukan rasa takut
      if (t.id === "takut") source = text.replace(REVERENT_FEAR, "");
      const hits = source.match(t.re);
      if (!hits) continue;
      const score = hits.length * t.weight;
      if (score > bestScore) {
        best = t;
        bestScore = score;
      }
    }
    return best;
  }

  /** Doa singkat untuk teks ayat; `key` (mis. referensi) menentukan variasi doa. */
  function prayerFor(text, key) {
    const theme = themeOf(text);
    const list = theme ? theme.prayers : GENERAL;
    return `${list[hash(key) % list.length]} ${CLOSING}`;
  }

  window.Doa = { prayerFor, themeOf };
})();
