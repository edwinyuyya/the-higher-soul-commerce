// Katalog produk, rekening, dan WhatsApp admin. Ubah harga di sini saja:
// halaman depan, halaman order, server, dan halaman tarot membaca dari file ini.

export const STORE = {
  bankName: "BCA",
  accountNumber: "015 2800 914",
  accountHolder: "Edwin Adrian Pranoto",
  whatsappNumber: "6281916416688",
  whatsappDisplay: "0819-1641-6688",
};

export const PRODUCTS = [
  {
    id: "lifepath",
    icon: "☉",
    title: "Life Path",
    price: 29000,
    body: "Arah hidup dan pelajaran utamamu, dihitung dari tanggal lahir.",
  },
  {
    id: "destiny",
    icon: "✧",
    title: "Destiny Path",
    price: 29000,
    body: "Bakat bawaan dari nama lengkapmu, dan cara memakainya untuk kerja.",
  },
  {
    id: "numerology",
    icon: "✦",
    title: "Numerologi Lengkap",
    price: 99000,
    includes: ["lifepath", "destiny"],
    body: "Laporan 10 halaman. Sudah termasuk Life Path dan Destiny Path, ditambah bab kerja dan uang, hubungan, dan tema tahun 2026 per bulan.",
  },
  {
    id: "humandesign",
    icon: "◈",
    title: "Human Design",
    price: 79000,
    needsBirthTime: true,
    body: "Tipe energimu dan cara terbaikmu mengambil keputusan. Perlu jam dan kota lahir.",
  },
  {
    id: "tarot",
    icon: "🃏",
    title: "Tarot Master",
    price: 29000,
    grantsTarot: true,
    noBirthData: true,
    body: "Akses pribadi ke pembacaan tarot online. Linknya dikirim lewat WhatsApp.",
  },
];

export const BUNDLE = {
  id: "complete",
  icon: "🔮",
  title: "Paket Lengkap Higher Soul",
  price: 150000,
  needsBirthTime: true,
  grantsTarot: true,
  includes: ["numerology", "humandesign", "tarot"],
  body: "Numerologi Lengkap dan Human Design dalam laporan PDF, ditambah akses Tarot Master.",
};

// Harga kalau isi paket dibeli satuan, ditampilkan sebagai harga coret.
export const BUNDLE_VALUE = PRODUCTS.filter((p) => BUNDLE.includes.includes(p.id)).reduce((a, p) => a + p.price, 0);
export const MIN_PRICE = Math.min(...PRODUCTS.map((p) => p.price));

export function rupiah(n) {
  return "Rp" + Number(n).toLocaleString("id-ID");
}

/**
 * Mengubah daftar id produk jadi pesanan. Paket menggantikan item satuan.
 * needsBirthDate: false bila hanya membeli Tarot Master. grantsTarot: pesanan
 * ini mendapat link tarot pribadi.
 */
export function resolveItems(ids) {
  const list = Array.isArray(ids) ? ids : String(ids || "").split(",");
  if (list.includes(BUNDLE.id)) {
    return { items: [BUNDLE], total: BUNDLE.price, needsBirthTime: true, needsBirthDate: true, grantsTarot: true };
  }
  // Item yang sudah termasuk di item lain (mis. Life Path di Numerologi Lengkap) tidak ditagih dua kali.
  const covered = PRODUCTS.filter((p) => list.includes(p.id)).flatMap((p) => p.includes || []);
  const items = PRODUCTS.filter((p) => list.includes(p.id) && !covered.includes(p.id));
  return {
    items,
    total: items.reduce((a, p) => a + p.price, 0),
    needsBirthTime: items.some((p) => p.needsBirthTime),
    needsBirthDate: items.some((p) => !p.noBirthData),
    grantsTarot: items.some((p) => p.grantsTarot),
  };
}
