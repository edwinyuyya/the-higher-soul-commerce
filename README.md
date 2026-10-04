# Ayat Untukmu

Web app sederhana: tekan **Mulai**, dan aplikasi memilihkan satu ayat Alkitab secara acak untukmu.

## Fitur

- **Tata Cara** di layar awal: berdoa dulu, tekan Mulai, lalu renungkan ayatnya
- Tombol **Mulai** dengan animasi "mengocok" sebelum ayat muncul
- **Pengertian Ayat** untuk setiap ayat (Mazmur, Amsal, dan ayat pilihan): konteks dan maknanya — `scripts/penjelasan/`
- **Gambar tangan yang terulur** (`latar.webp`) tampil jelas di layar awal dan samar sebagai latar, dengan warna hijau toska yang menyatu di tema terang dan gelap
- **Doa Penguatan** singkat di bawah setiap ayat, sesuai tema ayatnya (lihat `prayers.js`)
- Ayat dipilih secara acak dari kitab **Mazmur** dan **Amsal**, ditambah ayat-ayat pilihan yang
  populer dari kitab lain (mis. Yesaya 41:10, Yeremia 29:11, Yohanes 3:16, Filipi 4:13)
- **Ayat lain**: 50 ayat yang terakhir keluar tidak akan diulang dulu
- **Salin** dan **Bagikan** ayat beserta doanya (menu bagikan bawaan HP, atau WhatsApp di desktop)
- Tampilan untuk HP, mode gelap otomatis, tanpa perlu instalasi atau build
- Watermark **Nexora** di bagian bawah aplikasi

## Menjalankan

Aplikasinya statis (HTML, CSS, JS), tetapi harus dibuka lewat server karena data dimuat dengan `fetch`:

```bash
python3 -m http.server 8000
# buka http://localhost:8000
```

Untuk online, unggah isi folder ini ke hosting statis apa saja (GitHub Pages, Netlify, Vercel).

## Data ayat

`data/ayat.json` dibuat oleh `scripts/build_data.py` dari **Alkitab Yang Terbuka (AYT)**,
diambil dari korpus eBible.org di [BibleNLP/ebible](https://github.com/BibleNLP/ebible).
AYT adalah terjemahan harfiah (mirip gaya KJV). Aplikasi memakai seluruh Mazmur dan Amsal
(`FULL_BOOKS`) ditambah daftar ayat populer dari kitab lain (`POPULAR`) di skrip build.

- Judul Mazmur, kata "Sela"/"Higayon", dan penanda nomor ayat Ibrani dibuang.
- Ayat yang kalimatnya berlanjut digabung (mis. *Matius 5:2–3*) agar yang tampil selalu kalimat utuh.
- Sekitar 3.330 unit ayat: Mazmur 2.321, Amsal 839, dan 171 ayat pilihan dari 40 kitab lain.
- Penjelasan ayat ada di `scripts/penjelasan/`: `pilihan.json` dan file `.txt` per kitab
  dengan format `pasal:ayat | penjelasan`.

Membangun ulang data:

```bash
python3 scripts/build_data.py
```

## Doa penguatan

`prayers.js` mengenali tema ayat dari kata-kata ayat dan penjelasannya (takut, khawatir, kekuatan, pengampunan,
hikmat, pengharapan, dan lain-lain), lalu memilih salah satu doa untuk tema itu. Ayat yang sama
selalu mendapat doa yang sama. Ayat tanpa tema yang jelas (misalnya kisah atau silsilah) mendapat
doa umum. Doa bisa ditambah atau diubah langsung di file tersebut.

## Lisensi teks

Teks AYT © Yayasan Lembaga SABDA, ditandai dapat disebarluaskan di eBible.org dan dicantumkan
dengan atribusi di footer aplikasi. Sebelum dipublikasikan, pastikan ketentuan lisensi terbaru
di https://ebible.org/indayt/ atau situs SABDA.
