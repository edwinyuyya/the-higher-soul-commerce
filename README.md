# Ayat Untukmu

Web app sederhana: tekan **Mulai**, dan aplikasi memilihkan satu ayat Alkitab secara acak untukmu.

## Fitur

- Tombol **Mulai** dengan animasi "mengocok" sebelum ayat muncul
- Pilihan bagian: Semua, Perjanjian Lama, atau Perjanjian Baru
- **Ayat lain**: 50 ayat yang terakhir keluar tidak akan diulang dulu
- **Salin** dan **Bagikan** (menu bagikan bawaan HP, atau WhatsApp di desktop)
- Tampilan untuk HP, mode gelap otomatis, tanpa perlu instalasi atau build

## Menjalankan

Aplikasinya statis (HTML, CSS, JS), tetapi harus dibuka lewat server karena data dimuat dengan `fetch`:

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

Untuk online, unggah isi folder ini ke hosting statis apa saja (GitHub Pages, Netlify, Vercel).

## Data ayat

`data/ayat.json` dibuat oleh `scripts/build_data.py` dari
**Alkitab Terjemahan Sederhana Indonesia (TSI), Edisi Ketiga**, melalui
[wldeh/bible-api](https://github.com/wldeh/bible-api).

- Isi: Perjanjian Baru lengkap ditambah Kejadian, Keluaran, Ulangan, Rut, 1–2 Samuel, Ezra,
  Nehemia, Ester, Pengkhotbah, dan Yunus. Kitab PL lainnya belum tersedia di sumber TSI.
- Ayat yang kalimatnya berlanjut digabung (mis. *Kejadian 1:1–2*) agar yang tampil selalu kalimat utuh.
- Sumber data menyisipkan catatan kaki ke dalam teks dan menghilangkan baris puisi. Skrip build
  membersihkan catatan kaki dan membuang ayat yang terlihat terpotong. Karena itu Amsal tidak
  dipakai, dan sekitar 11 ribu unit ayat yang lolos.

Membangun ulang data:

```bash
python3 scripts/build_data.py [--ref tb.json]
```

`--ref` opsional: teks TB yang hanya dipakai sebagai pembanding panjang untuk mendeteksi ayat
terpotong. Teks TB tidak ikut ditulis ke output.

## Lisensi teks

Teks TSI dicantumkan dengan atribusi di footer aplikasi. Sebelum aplikasi dipublikasikan,
pastikan ketentuan lisensi TSI terbaru di halaman resmi penerbitnya (eBible.org / Yayasan Alkitab
Terjemahan Sederhana Indonesia).
