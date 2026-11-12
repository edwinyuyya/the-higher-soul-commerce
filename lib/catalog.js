/* =========================================================
   KATALOG PRODUK, HARGA, DAN BIAYA PEMBAYARAN
   Satu-satunya tempat harga ditetapkan. Browser hanya menampilkan;
   server menghitung ulang total dari nomor pesanan saat mengecek pembayaran.

   Mengubah harga: ganti angka di PRODUCTS. Pesanan yang sedang menunggu
   pembayaran (paling lama 24 jam) memakai harga lama, jadi ubah harga di
   jam sepi atau tunggu sampai tidak ada pesanan yang menggantung.
   ========================================================= */
'use strict';

/* code: 3 huruf, dipakai di nomor pesanan. addon: hanya bisa dibeli bersama produk utama.
   includes: produk lain yang sudah termasuk (dipakai untuk menyembunyikan tambahan yang dobel). */
const PRODUCTS = {
  tarot:      { code: 'TRT', price: 15000,  name: 'Bacaan Tarot - Master Tarot', expiryMinutes: 60 },
  lifepath:   { code: 'LPT', price: 79000,  name: 'Laporan Life Path (Angka Jalan Hidup)', report: true },
  destiny:    { code: 'DST', price: 79000,  name: 'Laporan Destiny Path (Angka Bakat)', report: true },
  selfpack:   { code: 'PKD', price: 149000, name: 'Paket Kenali Diri (Life Path + Bakat + Isi Hati)', report: true, includes: ['lifepath', 'destiny', 'soul'] },
  numerology: { code: 'NUM', price: 249000, name: 'Laporan Numerologi Lengkap', report: true, includes: ['lifepath', 'destiny', 'soul', 'year'] },
  soul:       { code: 'HTI', price: 29000,  name: 'Tambahan: Isi Hati & Kesan Pertama', report: true, addon: true },
  year:       { code: 'THN', price: 29000,  name: 'Tambahan: Ramalan Tahun Pribadi', report: true, addon: true }
};

/* Metode bayar yang dipilih pembeli di halaman kita SEBELUM jendela Midtrans terbuka.
   Biaya layanan mengikuti tarif Midtrans; sesuaikan dengan kontrak Anda.
   QRIS sengaja tanpa biaya tambahan: Bank Indonesia melarang membebankan MDR QRIS ke pembeli. */
const METHODS = {
  Q: { key: 'qris', label: 'QRIS', note: 'Semua e-wallet & m-banking · tanpa biaya', enabled: ['other_qris'], feePct: 0, feeFlat: 0 },
  E: { key: 'ewallet', label: 'GoPay / ShopeePay', note: 'Biaya layanan 2%', enabled: ['gopay', 'shopeepay'], feePct: 2, feeFlat: 0 },
  V: { key: 'va', label: 'Virtual Account', note: 'BCA, BNI, BRI, Mandiri, Permata, CIMB · biaya Rp 4.000', enabled: ['bca_va', 'bni_va', 'bri_va', 'echannel', 'permata_va', 'cimb_va', 'other_va'], feePct: 0, feeFlat: 4000 },
  // Semua metode tanpa biaya tambahan (dipakai bacaan tarot Rp 15.000).
  A: { key: 'all', label: 'Semua metode', note: '', enabled: ['other_qris', 'gopay', 'shopeepay', 'bca_va', 'bni_va', 'bri_va', 'echannel', 'permata_va', 'cimb_va', 'other_va'], feePct: 0, feeFlat: 0 }
};

const REPORT_EXPIRY_MIN = 24 * 60;
const MAX_ITEMS = 5;

const byCode = (code) => Object.keys(PRODUCTS).find((k) => PRODUCTS[k].code === code) || null;

/** Biaya layanan, dibulatkan ke atas per Rp 100. Persentase dihitung "gross-up"
    supaya setelah dipotong Midtrans, yang Anda terima tetap sebesar harga produk. */
function fee(method, subtotal) {
  const m = METHODS[method];
  if (!m) return 0;
  let f = m.feeFlat;
  if (m.feePct) f += subtotal / (1 - m.feePct / 100) - subtotal;
  return Math.ceil(f / 100) * 100;
}

/** Validasi keranjang. Mengembalikan {items, method} yang sudah dibersihkan, atau {error}. */
function normalizeCart(items, method) {
  if (!Array.isArray(items) || !items.length) return { error: 'Pilih minimal satu produk.' };
  const list = [...new Set(items.map(String))];
  if (list.length > MAX_ITEMS) return { error: 'Terlalu banyak produk dalam satu pesanan.' };
  for (const k of list) if (!PRODUCTS[k]) return { error: 'Produk tidak dikenal.' };
  if (list.includes('tarot') && list.length > 1) return { error: 'Bacaan tarot dibayar terpisah.' };
  const main = list.filter((k) => !PRODUCTS[k].addon);
  if (!main.length) return { error: 'Produk tambahan hanya bisa dibeli bersama laporan utama.' };
  // Buang item yang sudah termasuk dalam paket lain di keranjang (supaya tidak bayar dobel).
  const covered = new Set(list.flatMap((k) => PRODUCTS[k].includes || []));
  const clean = list.filter((k) => !covered.has(k));
  // Urutan tetap supaya nomor pesanan konsisten.
  const order = Object.keys(PRODUCTS);
  clean.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  const m = list.includes('tarot') ? 'A' : String(method || 'Q').toUpperCase();
  if (!METHODS[m] || (m === 'A' && !list.includes('tarot'))) return { error: 'Metode pembayaran tidak dikenal.' };
  return { items: clean, method: m };
}

function quote(items, method) {
  const subtotal = items.reduce((a, k) => a + PRODUCTS[k].price, 0);
  const f = fee(method, subtotal);
  return { subtotal, fee: f, total: subtotal + f };
}

/* Nomor pesanan memuat isi keranjang dan metode, mis. HS-LPT.THN-V-LZ3K9A-1F2E3D,
   sehingga total yang benar bisa dihitung ulang tanpa database.
   Format lama (HS-TRT-xxxx-yyyy) tetap dikenali. */
const ORDER_RE = /^HS-([A-Z]{3}(?:\.[A-Z]{3}){0,4})(?:-([QEVA]))?-[A-Z0-9]{6,12}-[A-F0-9]{6}$/;

function parseOrder(orderId) {
  const m = ORDER_RE.exec(String(orderId || ''));
  if (!m) return null;
  const items = m[1].split('.').map(byCode);
  if (items.some((k) => !k)) return null;
  const method = m[2] || 'A';
  return { items, method, quote: quote(items, method) };
}

/** Data publik untuk browser (/api/config). */
function publicCatalog() {
  const products = {};
  for (const [k, p] of Object.entries(PRODUCTS)) products[k] = { name: p.name, price: p.price, addon: !!p.addon, includes: p.includes || [] };
  const methods = {};
  for (const [code, m] of Object.entries(METHODS)) if (code !== 'A') methods[code] = { label: m.label, note: m.note, feePct: m.feePct, feeFlat: m.feeFlat };
  return { products, methods };
}

module.exports = { PRODUCTS, METHODS, REPORT_EXPIRY_MIN, ORDER_RE, fee, quote, normalizeCart, parseOrder, publicCatalog, byCode };
