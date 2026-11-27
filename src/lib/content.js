// Teks halaman depan. Ikuti .claude/skills/higher-soul-style sebelum mengubahnya.
export const CONTENT = {
  nav: { products: "Harga", how: "Cara pesan", faq: "Tanya jawab", tarot: "Tarot" },
  headline: "Baca dirimu dari nama dan tanggal lahir.",
  sub: "Kami menghitung angka dari nama lengkap dan tanggal lahirmu, lalu menuliskan artinya dengan bahasa sehari-hari: soal kerja, uang, dan hubungan. Hasilnya laporan PDF yang dikirim ke emailmu dalam 2-3 hari kerja.",
  ctaPrimary: "Lihat harga",
  ctaSample: "Lihat contoh isi",
  heroSample: {
    label: "Contoh",
    date: "Lahir 17 Agustus 1990",
    sum: "1 + 7 + 8 + 1 + 9 + 9 + 0 = 35 → 8",
    number: 8,
    caption: "Life Path 8. Orang dengan angka ini biasanya cepat diberi tanggung jawab di tempat kerja, dan sering lupa istirahat.",
  },

  reasonsTitle: "Biasanya orang memesan karena",
  reasons: [
    "Sudah dua kali ganti kerja tahun ini dan masih belum yakin bidang mana yang cocok.",
    "Penghasilan naik, tapi uangnya tetap habis entah ke mana.",
    "Hubungannya baik-baik saja di awal, lalu selalu retak di titik yang mirip.",
  ],
  reasonsClose: "Angka tidak menjawab semuanya. Tapi sering membantu kamu melihat pola yang selama ini kamu ulang.",

  numbersTitle: "Apa yang kami hitung",
  numbers: [
    {
      name: "Life Path",
      from: "dari tanggal lahir",
      body: "Arah besar hidupmu, dan pelajaran yang terus datang lagi sampai kamu paham.",
    },
    {
      name: "Destiny Path",
      from: "dari nama lengkap sesuai akta",
      body: "Bakat yang kamu bawa. Biasanya hal yang orang lain anggap susah, buatmu terasa biasa saja.",
    },
    {
      name: "Human Design",
      from: "dari jam dan kota lahir",
      body: "Cara energimu bekerja. Kapan sebaiknya kamu memulai sesuatu, dan bagaimana kamu paling tepat mengambil keputusan.",
    },
    {
      name: "Tarot Master",
      from: "dari pertanyaanmu hari ini",
      body: "Untuk satu pertanyaan yang sedang mengganjal. Kamu kocok kartu sendiri, Master Tarot menjawab lewat kartu yang keluar.",
    },
  ],

  productsTitle: "Harga",
  productsSub: "Ambil satu laporan, atau semuanya sekaligus dalam Paket Lengkap.",

  tarotTitle: "Tarot Master",
  tarotBody:
    "Pikirkan satu pertanyaan, kocok kartunya, lalu pilih tiga kartu ditambah satu kartu kunci. Master Tarot membaca kartu yang keluar khusus untuk pertanyaanmu. Aksesnya pribadi, linknya kami kirim lewat WhatsApp setelah transfer dicek.",

  originTitle: "Sistem yang kami pakai",
  originBody: [
    "Numerologi sudah dipakai sejak zaman Pythagoras, sekitar 2.500 tahun lalu. Kami memakai sistem Pythagoras: setiap huruf punya nilai 1 sampai 9, lalu dijumlahkan dan disederhanakan sampai tinggal satu angka. Angka 11, 22, dan 33 tidak disederhanakan karena dianggap istimewa.",
    "Laporannya kami pakai untuk bercermin, tidak untuk meramal. Keputusan tetap di tanganmu.",
  ],

  sampleTitle: "Contoh isi laporan",
  sampleIntro: "Cuplikan dari laporan untuk nama contoh, lahir 17 Agustus 1990. Laporanmu dihitung dari datamu sendiri.",
  sample: {
    name: "Nama Contoh",
    birthDate: "17 Agustus 1990",
    numbers: [
      { label: "Life Path", number: 8, body: "Kamu cepat diberi tanggung jawab, dan biasanya sanggup. Yang sering terlupa adalah istirahat." },
      { label: "Destiny", number: 5, body: "Kamu betah di pekerjaan yang isinya bertemu orang baru dan berpindah tempat." },
    ],
    sections: [
      { title: "Kerja dan uang", body: "2026 sampai 2028 cocok untuk kerja sama dan kemitraan. Hati-hati membeli barang besar di bulan-bulan yang angkanya 5." },
      { title: "Hubungan", body: "Kamu biasanya cocok dengan Life Path 2 atau 6, karena mereka sabar dengan jadwalmu yang padat." },
    ],
    footerNote: "Laporan lengkap berisi 10 halaman.",
  },

  howTitle: "Cara pesan",
  howSteps: [
    "Pilih laporan, lalu isi nama lengkap dan tanggal lahir sesuai akta.",
    "Transfer ke BCA sesuai nominal yang muncul, termasuk tiga angka terakhirnya.",
    "Tekan tombol WhatsApp dan lampirkan bukti transfer.",
    "PDF dikirim ke emailmu dalam 2-3 hari kerja. Link tarot dikirim lewat WhatsApp.",
  ],

  faqTitle: "Tanya jawab",
  faq: [
    {
      q: "Apakah hasilnya akurat?",
      a: "Angkanya dihitung dengan rumus numerologi Pythagoras, jadi hasil hitungannya pasti sama setiap kali. Artinya yang kami tulis adalah gambaran kecenderungan. Pakai untuk bercermin, jangan untuk menebak masa depan.",
    },
    {
      q: "Apa bedanya Human Design dengan numerologi?",
      a: "Numerologi memakai nama dan tanggal lahir. Human Design memakai posisi planet pada jam dan tempat kamu lahir, jadi perlu jam dan kota lahir.",
    },
    {
      q: "Saya tidak tahu jam lahir pastinya.",
      a: "Isi perkiraan terdekat dan beri tahu kami lewat WhatsApp. Untuk numerologi, jam lahir tidak diperlukan.",
    },
    {
      q: "Data saya dipakai untuk apa?",
      a: "Hanya untuk menyusun laporanmu. Tidak kami bagikan ke siapa pun.",
    },
    {
      q: "Berapa lama sampai laporannya jadi?",
      a: "Biasanya 2-3 hari kerja setelah transfer kami terima.",
    },
    {
      q: "Bisa refund?",
      a: "Laporan ditulis untuk datamu, jadi setelah mulai dikerjakan tidak bisa dikembalikan. Kalau ragu, tanya dulu lewat WhatsApp sebelum transfer.",
    },
    {
      q: "Apakah ini bertentangan dengan agama?",
      a: "Kami menyajikan numerologi sebagai alat refleksi diri. Kami tidak mengklaim tahu hal gaib atau meramal. Silakan pertimbangkan sesuai keyakinanmu.",
    },
  ],
  footerNote: "Ditulis dan dihitung di Indonesia.",
};
