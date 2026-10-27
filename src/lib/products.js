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
    body: "Arah hidup alami, siklus keberuntungan, dan pelajaran utama dari tanggal lahirmu.",
  },
  {
    id: "destiny",
    icon: "✧",
    title: "Destiny Path",
    price: 29000,
    body: "Potensi, bakat tersembunyi, dan tujuan hidup dari nama lengkapmu.",
  },
  {
    id: "numerology",
    icon: "✦",
    title: "Numerologi Lengkap",
    price: 59000,
    body: "Peta rezeki, arah karier, pola jodoh, Soul Urge, Personality, dan tema Tahun Pribadimu.",
  },
  {
    id: "humandesign",
    icon: "◈",
    title: "Human Design",
    price: 79000,
    needsBirthTime: true,
    body: "Tipe, strategi, cara terbaikmu mengambil keputusan, profil, dan pusat energimu. Butuh jam dan kota lahir.",
  },
];

export const BUNDLE = {
  id: "complete",
  icon: "🔮",
  title: "Paket Lengkap Higher Soul",
  price: 150000,
  needsBirthTime: true,
  body: "Life Path + Destiny Path + Numerologi Lengkap + Human Design dalam satu laporan PDF, plus bonus akses Tarot Master.",
};

export const SINGLES_TOTAL = PRODUCTS.reduce((a, p) => a + p.price, 0);
export const MIN_PRICE = Math.min(...PRODUCTS.map((p) => p.price));

export function rupiah(n) {
  return "Rp" + Number(n).toLocaleString("id-ID");
}

/** Mengubah daftar id produk jadi pesanan. Paket menggantikan item satuan. */
export function resolveItems(ids) {
  const list = Array.isArray(ids) ? ids : String(ids || "").split(",");
  if (list.includes(BUNDLE.id)) {
    return { items: [BUNDLE], total: BUNDLE.price, needsBirthTime: true };
  }
  const items = PRODUCTS.filter((p) => list.includes(p.id));
  return {
    items,
    total: items.reduce((a, p) => a + p.price, 0),
    needsBirthTime: items.some((p) => p.needsBirthTime),
  };
}
