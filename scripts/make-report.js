#!/usr/bin/env node
/* =========================================================
   GENERATOR LAPORAN NUMEROLOGI LENGKAP (PDF)

   Pakai:
     node scripts/make-report.js --name "Arianita Dewi" --date 1977-02-22 \
       [--time 14:00] [--city Semarang] [--year 2026] [--out reports/]

   Hasil: file .html dan .pdf di folder --out (default: reports/).
   PDF dibuat dengan Chromium lewat Playwright.
   ========================================================= */
'use strict';

const fs = require('fs');
const path = require('path');
const { NUMBERS, YEARS, ZODIAC, HARI, PASARAN } = require('../report/content');

/* Produk yang dijual (lib/catalog.js) → bab yang masuk ke PDF. */
const SECTIONS = {
  lifepath: ['lifepath', 'career', 'love'],
  destiny: ['destiny', 'career'],
  soul: ['inner'],
  year: ['year'],
  selfpack: ['map', 'lifepath', 'destiny', 'inner', 'career', 'love'],
  numerology: ['map', 'lifepath', 'destiny', 'inner', 'career', 'love', 'year', 'bonus']
};
const TITLES = {
  numerology: 'Laporan Numerologi Lengkap', selfpack: 'Paket Kenali Diri', lifepath: 'Laporan Life Path',
  destiny: 'Laporan Destiny Path', soul: 'Isi Hati & Kesan Pertama', year: 'Ramalan Tahun Pribadi'
};

/* ---------------- argumen ---------------- */
function args() {
  const out = {};
  const a = process.argv.slice(2);
  for (let i = 0; i < a.length; i++) {
    if (a[i].startsWith('--')) out[a[i].slice(2)] = a[i + 1] && !a[i + 1].startsWith('--') ? a[++i] : true;
  }
  return out;
}

/* ---------------- hitungan ---------------- */
const isMaster = (n) => n === 11 || n === 22 || n === 33;
const sumDigits = (n) => String(n).split('').reduce((a, d) => a + Number(d), 0);
const chain = (n, keepMaster = true) => {
  const c = [n];
  while (n > 9 && !(keepMaster && isMaster(n))) { n = sumDigits(n); c.push(n); }
  return c;
};
const reduce = (n, keepMaster = true) => { const c = chain(n, keepMaster); return c[c.length - 1]; };
const letterValue = (ch) => ((ch.charCodeAt(0) - 65) % 9) + 1;
const letters = (name) => name.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase().replace(/[^A-Z]/g, '');
const VOWELS = new Set(['A', 'I', 'U', 'E', 'O']);

function compute(name, iso, year) {
  const [y, mo, d] = iso.split('-').map(Number);
  const dd = reduce(sumDigits(d)), mm = reduce(sumDigits(mo)), yy = reduce(sumDigits(y));
  const lpTotal = dd + mm + yy;
  const L = letters(name).split('');
  const sum = (arr) => arr.reduce((a, ch) => a + letterValue(ch), 0);
  const total = sum(L), vow = sum(L.filter((c) => VOWELS.has(c))), con = sum(L.filter((c) => !VOWELS.has(c)));
  const py = (yr) => reduce(reduce(sumDigits(d), false) + reduce(sumDigits(mo), false) + reduce(sumDigits(yr), false), false);
  return {
    y, mo, d,
    lp: reduce(lpTotal), lpSteps: { dd, mm, yy, yChain: chain(sumDigits(y)), total: lpTotal, chain: chain(lpTotal) },
    ds: reduce(total), dsChain: chain(total), letterCount: L.length,
    soul: reduce(vow), soulChain: chain(vow),
    persona: reduce(con), personaChain: chain(con),
    bday: isMaster(d) ? d : reduce(d),
    year, py: py(year), pyNext: py(year + 1),
    months: Array.from({ length: 12 }, (_, i) => reduce(py(year) + reduce(i + 1, false), false))
  };
}

function zodiac(mo, d) {
  return ZODIAC.find(([, em, ed]) => mo < em || (mo === em && d <= ed));
}

function weton(iso) {
  const [y, mo, d] = iso.split('-').map(Number);
  const t = Date.UTC(y, mo - 1, d);
  const hari = HARI[new Date(t).getUTCDay()];
  // 17 Agustus 1945 = Jumat Legi (patokan).
  const diff = Math.round((t - Date.UTC(1945, 7, 17)) / 86400000);
  const pasaran = PASARAN[((diff % 5) + 5) % 5];
  return { hari: hari[0], pasaran: pasaran[0], neptu: hari[1] + pasaran[1], nh: hari[1], np: pasaran[1] };
}

/* ---------------- bantuan tampilan ---------------- */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
const BLN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const tgl = (c) => c.d + ' ' + BULAN[c.mo - 1] + ' ' + c.y;
const arrow = (c) => c.join(' → ');

function medal(n, size = 'm') {
  const dots = [0, 45, 90, 135, 180, 225, 270, 315].map((a) =>
    '<circle r="2.2" cx="' + (60 + 56 * Math.cos(a * Math.PI / 180)).toFixed(1) + '" cy="' + (60 + 56 * Math.sin(a * Math.PI / 180)).toFixed(1) + '"/>').join('');
  return '<div class="medal medal-' + size + '"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="56" class="ra"/><circle cx="60" cy="60" r="47" class="rb"/><g class="dots">' + dots + '</g></svg><span>' + n + '</span></div>';
}

const list = (arr, cls = '') => '<ul class="' + cls + '">' + arr.map((s) => '<li>' + s + '</li>').join('') + '</ul>';

function page(inner, n, cls = '') {
  return '<section class="page ' + cls + '"><div class="inner">' + inner + '</div>' +
    (n ? '<footer><span>Higher Soul · Laporan Numerologi</span><span>' + n + '</span></footer>' : '') + '</section>';
}

function chapter(kicker, title, intro) {
  return '<p class="kicker">' + kicker + '</p><h2>' + title + '</h2>' + (intro ? '<p class="intro">' + intro + '</p>' : '');
}

/* ---------------- halaman-halaman ---------------- */
function build(o) {
  const c = compute(o.name, o.date, o.year);
  const LP = NUMBERS[c.lp], DS = NUMBERS[c.ds], SU = NUMBERS[c.soul], PE = NUMBERS[c.persona], BD = NUMBERS[c.bday];
  const first = esc(o.name.trim().split(/\s+/)[0]);
  const name = esc(o.name.trim());
  const z = zodiac(c.mo, c.d);
  const w = weton(o.date);
  const products = (o.products && o.products.length ? o.products : ['numerology']).filter((k) => SECTIONS[k]);
  if (!products.length) throw new Error('Produk tidak dikenal. Pilihan: ' + Object.keys(SECTIONS).join(', '));
  const want = new Set(products.flatMap((k) => SECTIONS[k]));
  const has = (k) => want.has(k);
  const coverTitle = TITLES[products[0]] + (products.length > 1 ? ' + ' + products.slice(1).map((k) => TITLES[k]).join(' + ') : '');
  let pn = 1, bn = 0;
  const bab = () => 'Bab ' + (++bn);
  const pages = [];

  /* 1. Sampul */
  pages.push(page(
    '<div class="cover-top"><span class="brand">✦ Higher Soul</span><span>Laporan Pribadi</span></div>' +
    '<div class="cover-mid">' + medal(c.lp, 'xl') +
    '<p class="cover-kicker">' + coverTitle + '</p>' +
    '<h1>' + name + '</h1>' +
    '<p class="cover-meta">Lahir ' + tgl(c) + (o.time ? ' · pukul ' + esc(o.time) : '') + (o.city ? ' · ' + esc(o.city) : '') + '</p>' +
    '</div>' +
    '<div class="cover-bottom"><p>“Angka kelahiranmu bukan takdir yang mengikat, melainkan peta yang membantumu mengenal diri.”</p><small>Disusun ' + new Date().getDate() + ' ' + BULAN[new Date().getMonth()] + ' ' + new Date().getFullYear() + '</small></div>',
    0, 'cover'));

  /* 2. Peta angka */
  const grid = [
    [c.lp, 'Angka Jalan Hidup', 'Arah dan tujuan hidupmu', 'tanggal lahir'],
    [c.ds, 'Angka Bakat', 'Kelebihan alami yang kamu bawa', 'nama lengkap'],
    [c.soul, 'Angka Isi Hati', 'Apa yang sebenarnya kamu inginkan', 'huruf hidup nama'],
    [c.persona, 'Angka Kesan Pertama', 'Cara orang lain melihatmu', 'huruf mati nama'],
    [c.bday, 'Angka Hari Lahir', 'Bakat khusus dari tanggal lahir', 'tanggal ' + c.d],
    [c.py, 'Tahun Pribadi ' + c.year, 'Tema hidupmu tahun ini', 'tanggal, bulan, dan tahun ' + c.year, YEARS[c.py].theme]
  ];
  if (has('map')) pages.push(page(
    chapter('Ringkasan', 'Peta Angkamu', 'Halo, ' + first + '. Siap-siap ngerasa "kok tahu sih?". Laporan ini dihitung dari nama lengkap dan tanggal lahirmu. Ada enam angka yang ngebentuk dirimu, dan semuanya dibongkar satu per satu di halaman berikutnya. Tanpa bahasa ribet.') +
    '<div class="grid6">' + grid.map(([n, t, s, from, title]) =>
      '<div class="g">' + medal(n, 's') + '<div><b>' + t + '</b><span class="g-title">' + (title || NUMBERS[n].title) + '</span><small>' + s + '. Dari ' + from + '.</small></div></div>').join('') + '</div>' +
    '<div class="callout"><p class="callout-t">Kamu dalam satu kalimat</p><p>Kamu adalah <b>' + LP.title.replace('Sang ', 'sang ').toLowerCase() + '</b> (' + LP.short + ') yang dibekali bakat <b>' + DS.short + '</b>. Di dalam hati, kamu ' + SU.soul.replace(/^Jauh di dalam hati, kamu /, '').replace(/\.$/, '') + '.</p></div>' +
    '<p class="note">Cara membaca: angka 1–9 adalah angka dasar. Angka 11, 22, dan 33 disebut <b>Angka Master</b>, angka istimewa dengan energi yang lebih kuat.</p>',
    pn++));

  /* 3. Jalan hidup */
  const s = c.lpSteps;
  if (has('lifepath')) pages.push(page(
    '<div class="hero">' + medal(c.lp, 'l') + '<div>' + chapter(bab() + ' · Angka Jalan Hidup', LP.title) + '<p class="hero-sub">Angka paling penting di numerologi. Ini jawaban dari "sebenarnya aku hidup buat apa sih?"</p></div></div>' +
    LP.about.map((p) => '<p class="lead">' + p + '</p>').join('') +
    '<div class="two">' +
    '<div class="box good"><p class="box-t">Senjatamu</p>' + list(LP.strengths, 'ticks') + '</div>' +
    '<div class="box warn"><p class="box-t">Yang sering jadi bumerang</p>' + list(LP.challenges, 'dots') + '</div>' +
    '</div>' +
    '<div class="calc"><p class="box-t">Biar nggak dibilang asal: cara hitungnya</p><table>' +
    '<tr><td>Tanggal ' + c.d + '</td><td>' + (String(c.d).length > 1 ? String(c.d).split('').join(' + ') + ' = ' : '') + arrow(chain(sumDigits(c.d))) + '</td></tr>' +
    '<tr><td>Bulan ' + String(c.mo).padStart(2, '0') + '</td><td>' + (String(c.mo).length > 1 ? String(c.mo).split('').join(' + ') + ' = ' : '') + arrow(chain(sumDigits(c.mo))) + '</td></tr>' +
    '<tr><td>Tahun ' + c.y + '</td><td>' + String(c.y).split('').join(' + ') + ' = ' + arrow(s.yChain) + '</td></tr>' +
    '<tr class="sum"><td>Dijumlah</td><td>' + s.dd + ' + ' + s.mm + ' + ' + s.yy + ' = ' + arrow(s.chain) + '</td></tr>' +
    '</table></div>',
    pn++));

  /* 4. Bakat + gabungan */
  const combo = c.lp === c.ds
    ? 'Angka Jalan Hidup dan Angka Bakatmu sama, yaitu <b>' + c.lp + '</b>. Ini jarang banget. Artinya tujuan hidup dan bakatmu searah, jadi kamu bakal ngebut asal berani jadi dirimu sendiri.'
    : 'Hidupmu mengarah menjadi <b>' + LP.title.toLowerCase().replace('sang ', 'sang ') + '</b>: ' + LP.short + '. Bekal paling ampuhmu buat sampai ke sana: sifat <b>' + DS.title.toLowerCase() + '</b>: ' + DS.short + '. ' +
      'Rumusnya simpel: kamu paling bahagia dan paling berhasil pas pakai bakat ' + c.ds + ' (' + DS.strengths.slice(0, 2).join(', ').toLowerCase() + ') untuk menjalani jalan hidup ' + c.lp + ' (' + LP.strengths.slice(0, 2).join(', ').toLowerCase() + ').';
  if (has('destiny')) pages.push(page(
    '<div class="hero">' + medal(c.ds, 'l') + '<div>' + chapter(bab() + ' · Angka Bakat', DS.title) + '<p class="hero-sub">Dihitung dari semua huruf nama lengkapmu. Ini bakat bawaan yang kadang malah kamu anggap biasa aja.</p></div></div>' +
    '<p class="lead">' + DS.about[0].replace(/Ini (adalah )?Angka Master.*$/, '') + '</p>' +
    '<p class="label">Bakat bawaanmu</p><ul class="chips">' + DS.strengths.map((x) => '<li>' + x + '</li>').join('') + '</ul>' +
    '<div class="two">' +
    '<div class="box good"><p class="box-t">Bakat ini paling keluar pas…</p><p>' + DS.career.style + '</p></div>' +
    '<div class="box warn"><p class="box-t">Sisi gelap bakat ini</p>' + list(DS.challenges, 'dots') + '</div>' +
    '</div>' +
    '<p class="small">Cara hitung: setiap huruf diubah menjadi angka (A=1, B=2, … I=9, lalu J=1 lagi). ' + c.letterCount + ' huruf dari namamu dijumlah: <b>' + arrow(c.dsChain) + '</b>.</p>' +
    '<div class="combo"><p class="kicker">Kalau digabung</p><h3>Jalan Hidup ' + c.lp + ' + Bakat ' + c.ds + '</h3><p>' + combo + '</p></div>',
    pn++));

  /* 5. Isi hati, kesan pertama, hari lahir */
  const trio = (n, t, sub, text) => '<div class="trio">' + medal(n, 's') + '<div><p class="kicker">' + t + '</p><h3>' + NUMBERS[n].title + '</h3><p class="small muted">' + sub + '</p><p>' + text + '</p></div></div>';
  let gap = '';
  if (c.soul !== c.persona) gap = '<div class="callout"><p class="callout-t">Plot twist</p><p>Orang yang baru kenal ngeliat kamu sebagai pribadi angka ' + c.persona + ' (' + PE.short + '). Padahal isi hatimu itu angka ' + c.soul + ' (' + SU.short + '). Pantes kamu sering ngerasa “orang belum beneran kenal aku”. Cuma orang terdekat yang lihat dirimu yang asli.</p></div>';
  if (has('inner')) pages.push(page(
    chapter(bab() + ' · Di Balik Nama dan Tanggalmu', 'Isi Hati, Kesan Pertama, dan Hari Lahir') +
    trio(c.soul, 'Angka Isi Hati', 'Dari huruf hidup (A, I, U, E, O) namamu: ' + arrow(c.soulChain), SU.soul) +
    trio(c.persona, 'Angka Kesan Pertama', 'Dari huruf mati namamu: ' + arrow(c.personaChain), PE.persona) +
    trio(c.bday, 'Angka Hari Lahir', 'Dari tanggal ' + c.d, BD.birthday) +
    gap,
    pn++));

  /* 6. Karier & rezeki */
  const fields = [...new Set([...LP.career.fields.slice(0, 4), ...DS.career.fields.slice(0, 4)])].slice(0, 8);
  if (has('career')) pages.push(page(
    chapter(bab() + ' · Karier dan Rezeki', 'Kerjaan yang Bikin Kamu Hidup', 'Capek kerja itu wajar. Capek karena salah jalur itu beda cerita. Kerjaan yang paling bikin puas biasanya cocok dengan jalan hidupmu (angka ' + c.lp + ') dan memakai bakat alamimu (angka ' + c.ds + ').') +
    '<p class="label">Jalur yang paling kamu banget</p><ol class="fields">' + fields.map((f) => '<li>' + f + '</li>').join('') + '</ol>' +
    '<div class="two">' +
    '<div class="box"><p class="box-t">Gaya kerjamu</p><p>' + LP.career.style + '</p></div>' +
    '<div class="box"><p class="box-t">Soal duit</p><p>' + LP.career.money + '</p></div>' +
    '</div>' +
    '<div class="callout"><p class="callout-t">Dorongan dari isi hatimu (angka ' + c.soul + ')</p><p>' + SU.soul + ' Pilih kerjaan yang juga ngisi keinginan ini, biar kamu nggak cuma sibuk, tapi juga puas.</p></div>' +
    '<p class="label">Mulai dari sini</p>' + list([
      'Tulis 3 hal yang paling sering orang minta tolong ke kamu. Itu bocoran bakat yang bisa jadi duit.',
      DS.career.money,
      'Lagi buntu? Balik lagi ke senjatamu: ' + LP.strengths.slice(0, 3).join(', ').toLowerCase() + '.'
    ], 'ticks'),
    pn++));

  /* 7. Cinta */
  if (has('love')) pages.push(page(
    chapter(bab() + ' · Cinta dan Hubungan', 'Kenapa Kisah Cintamu Begitu-begitu Aja') +
    '<p class="lead">' + LP.love.pattern + '</p>' +
    '<p>' + DS.love.pattern + '</p>' +
    '<div class="two">' +
    '<div class="box good"><p class="box-t">Yang sebenarnya kamu butuhin</p><p>' + LP.love.needs + ' ' + SU.love.needs + '</p></div>' +
    '<div class="box warn"><p class="box-t">Pola yang terus keulang</p><p>' + LP.challenges[0] + '. ' + SU.challenges[0] + '. Kalau dibiarin, hubunganmu bakal terus kerasa berat sebelah.</p></div>' +
    '</div>' +
    '<p class="label">Angka Jalan Hidup yang paling nyambung sama kamu</p>' +
    '<div class="match">' + LP.match.map((n) => '<div>' + medal(n, 'xs') + '<span>' + NUMBERS[n].title + '<small>' + NUMBERS[n].short + '</small></span></div>').join('') + '</div>' +
    '<p class="small muted">Angka lain tetap bisa jodoh kok. Ini cuma yang paling gampang “klik” sama kamu.</p>' +
    '<div class="callout"><p class="callout-t">Saran jujur buat hubunganmu</p><p>' + LP.love.advice + ' ' + DS.love.advice + '</p></div>',
    pn++));

  /* 8. Tahun pribadi */
  const Y = YEARS[c.py], YN = YEARS[c.pyNext];
  if (has('year')) pages.push(page(
    '<div class="hero">' + medal(c.py, 'l') + '<div>' + chapter(bab() + ' · Arah Tahun ' + c.year, 'Tahun Pribadi ' + c.py + ': ' + Y.theme) + '<p class="hero-sub">Hidup jalan dalam siklus 9 tahun. Tahun Pribadi nunjukin “musim” yang lagi kamu jalani: waktunya gas, atau waktunya rem. Gantinya tiap hari ulang tahun.</p></div></div>' +
    '<p class="lead">' + Y.text + '</p>' +
    '<div class="two">' +
    '<div class="box good"><p class="box-t">Gas</p>' + list(Y.do, 'ticks') + '</div>' +
    '<div class="box warn"><p class="box-t">Rem</p><p>' + Y.avoid + '</p></div>' +
    '</div>' +
    '<p class="label">Bocoran tiap bulan di tahun ' + c.year + '</p>' +
    '<div class="months">' + c.months.map((m, i) => '<div><b>' + BLN[i] + '</b><span>' + m + '</span><small>' + YEARS[m].theme + '</small></div>').join('') + '</div>' +
    '<div class="callout"><p class="callout-t">Ngintip tahun ' + (c.year + 1) + ': Tahun Pribadi ' + c.pyNext + ' (' + YN.theme + ')</p><p>' + YN.text + '</p></div>',
    pn++));

  /* 9. Bonus: zodiak & weton */
  if (has('bonus')) pages.push(page(
    chapter('Bonus', 'Zodiak dan Weton', 'Bonus buat kamu: dua tradisi lain yang juga baca tanggal lahirmu, dengan cara yang beda.') +
    '<div class="two">' +
    '<div class="box"><p class="box-t">Zodiak</p><h3 class="big">' + z[0] + '</h3><p>Orang ' + z[0] + ' dikenal ' + z[3] + '.</p>' +
    (o.time || o.city ? '<p class="small muted">Jam lahir (' + esc(o.time || '-') + ') dan kota (' + esc(o.city || '-') + ') dipakai buat peta astrologi lengkap (ascendant dan posisi planet). Itu cerita lain, nggak masuk laporan numerologi ini.</p>' : '') + '</div>' +
    '<div class="box"><p class="box-t">Weton Jawa</p><h3 class="big">' + w.hari + ' ' + w.pasaran + '</h3><p>Neptu: ' + w.hari + ' (' + w.nh + ') + ' + w.pasaran + ' (' + w.np + ') = <b>' + w.neptu + '</b>.</p><p class="small muted">Neptu dipakai dalam tradisi Jawa, misalnya untuk menghitung kecocokan atau memilih hari baik.' + (o.time && Number(String(o.time).split(/[:.]/)[0]) >= 18 ? ' Karena lahir setelah magrib, sebagian tradisi menghitung weton dari hari berikutnya.' : '') + '</p></div>' +
    '</div>' +
    '<div class="callout"><p class="callout-t">Benang merah</p><p>Numerologimu menunjukkan <b>' + LP.title + '</b> dengan bakat <b>' + DS.title + '</b>. Zodiak ' + z[0] + ' (' + z[3].split(', ')[0] + ') nambah warna di gambaran itu.</p></div>',
    pn++));

  /* 10. Penutup */
  pages.push(page(
    chapter('Penutup', 'Pesan untuk ' + first) +
    '<p class="lead">Semua angka ini ngomongin satu hal: bekalmu udah lengkap dari lahir. Tugasmu bukan jadi orang lain. Tugasmu kenalin bekal itu, terus pakai. Sekarang, bukan nanti.</p>' +
    '<p class="label">Tempel di kepala</p><ol class="fields five">' +
    (has('lifepath') ? '<li><b>Kelebihan utamamu</b> adalah ' + LP.strengths.slice(0, 2).join(' dan ').toLowerCase() + '. Pakai tiap hari, jangan disimpen.</li>' : '') +
    (has('destiny') ? '<li><b>Bakatmu</b> untuk ' + DS.short + ' layak dibayar. Beneran dibayar, bukan cuma "makasih ya".</li>' : '') +
    (has('lifepath') ? '<li><b>Waspadai</b> kebiasaan ' + LP.challenges[0].toLowerCase() + '.</li>' : '') +
    (has('inner') ? '<li><b>Jujur sama isi hatimu:</b> ' + SU.soul.replace(/^Jauh di dalam hati, /, '') + '</li>' : '') +
    (has('year') ? '<li><b>Tahun ini</b> tahun ' + Y.theme.toLowerCase() + '. ' + Y.do[0] + '.</li>' : '') +
    '</ol>' +
    '<div class="affirm"><p class="kicker">Afirmasi pribadimu</p><p>“' + (has('lifepath') ? 'Aku ' + LP.short + '. ' : '') + 'Aku memakai ' + (has('destiny') ? DS.strengths[0] : (has('lifepath') ? LP.strengths[0] : SU.strengths[0])).toLowerCase() + ' untuk kebaikan diriku dan orang-orang yang kusayangi.”</p></div>' +
    '<p class="small muted center">Numerologi itu alat buat ngaca, bukan ramalan pasti, dan bukan pengganti nasihat profesional (medis, keuangan, atau hukum). Yang mutusin tetap kamu.</p>',
    pn++));

  return { html: shell(pages.join(''), o.name), c };
}

function shell(body, name) {
  const css = fs.readFileSync(path.join(__dirname, '..', 'report', 'report.css'), 'utf8')
    .replace(/url\(fonts\//g, 'url(' + 'file://' + path.join(__dirname, '..', 'report', 'fonts') + '/');
  return '<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Laporan Numerologi - ' + esc(name) + '</title><style>' + css + '</style></head><body>' + body + '</body></html>';
}

async function toPdf(htmlFile, pdfFile) {
  let pw;
  try { pw = require('playwright'); } catch (e) {
    try { pw = require('/opt/node-tools/node_modules/playwright'); } catch (e2) {
      console.warn('Playwright tidak ditemukan. Buka file HTML di Chrome lalu Print → Save as PDF.');
      return false;
    }
  }
  const browser = await pw.chromium.launch();
  const p = await browser.newPage();
  await p.goto('file://' + path.resolve(htmlFile), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.pdf({ path: pdfFile, format: 'A4', printBackground: true, preferCSSPageSize: true });
  await browser.close();
  return true;
}

async function main() {
  const a = args();
  if (!a.name || !/^\d{4}-\d{2}-\d{2}$/.test(a.date || '')) {
    console.error('Pakai: node scripts/make-report.js --name "Nama Lengkap" --date YYYY-MM-DD [--products lifepath,year] [--time 14:00] [--city Kota] [--year 2026] [--out reports/]');
    console.error('Produk: ' + Object.keys(SECTIONS).join(', ') + ' (default: numerology)');
    process.exit(1);
  }
  const products = String(a.products || 'numerology').split(',').map((x) => x.trim()).filter(Boolean);
  const bad = products.filter((k) => !SECTIONS[k]);
  if (bad.length) { console.error('Produk tidak dikenal: ' + bad.join(', ') + '. Pilihan: ' + Object.keys(SECTIONS).join(', ')); process.exit(1); }
  const o = { name: String(a.name), date: a.date, time: a.time, city: a.city, products, year: Number(a.year) || new Date().getFullYear() };
  const outDir = a.out || 'reports';
  fs.mkdirSync(outDir, { recursive: true });
  const slug = o.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const base = path.join(outDir, products.join('+') + '-' + slug + '-' + o.date);
  const { html, c } = build(o);
  fs.writeFileSync(base + '.html', html);
  const ok = await toPdf(base + '.html', base + '.pdf');
  console.log('Jalan Hidup ' + c.lp + ' · Bakat ' + c.ds + ' · Isi Hati ' + c.soul + ' · Kesan ' + c.persona + ' · Hari Lahir ' + c.bday + ' · Tahun Pribadi ' + c.py);
  console.log('HTML: ' + base + '.html' + (ok ? '\nPDF:  ' + base + '.pdf' : ''));
}

if (require.main === module) main().catch((e) => { console.error(e); process.exit(1); });
module.exports = { build, compute, weton, zodiac, SECTIONS };
