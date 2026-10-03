(() => {
  "use strict";

  const SHUFFLE_MS = 1400;
  const RECENT_LIMIT = 50; // ayat yang baru keluar tidak akan diulang dulu

  const $ = (id) => document.getElementById(id);
  const screens = { intro: $("intro"), shuffle: $("shuffle"), result: $("result") };
  const startBtn = $("start");
  const againBtn = $("again");

  let data = null;
  let current = null;
  const recent = [];

  // ---------- data ----------

  fetch("data/ayat.json")
    .then((r) => {
      if (!r.ok) throw new Error(r.status);
      return r.json();
    })
    .then((json) => {
      data = json;
      $("version").textContent = json.singkatan;
      startBtn.disabled = false;
      startBtn.querySelector(".label").textContent = "Mulai";
    })
    .catch(() => {
      startBtn.querySelector(".label").textContent = "Gagal memuat";
      toast("Data ayat gagal dimuat. Coba muat ulang halaman.");
    });

  function randomIndex(n) {
    if (window.crypto?.getRandomValues) {
      // tolak sampel di ujung supaya distribusinya benar-benar merata
      const max = Math.floor(0x100000000 / n) * n;
      const buf = new Uint32Array(1);
      do crypto.getRandomValues(buf); while (buf[0] >= max);
      return buf[0] % n;
    }
    return Math.floor(Math.random() * n);
  }

  function pickVerse() {
    const list = data.ayat;
    let v;
    for (let i = 0; i < 20; i++) {
      v = list[randomIndex(list.length)];
      if (!recent.includes(v)) break;
    }
    recent.push(v);
    if (recent.length > RECENT_LIMIT) recent.shift();
    return v;
  }

  function reference(v) {
    const [book, chapter, from, to] = v;
    return `${data.kitab[book].nama} ${chapter}:${from}${to !== from ? "–" + to : ""}`;
  }

  // ---------- alur layar ----------

  function show(name) {
    for (const [key, el] of Object.entries(screens)) el.hidden = key !== name;
    window.scrollTo(0, 0);
  }

  function reveal() {
    if (!data) return;
    const chosen = pickVerse();
    show("shuffle");

    const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ref = $("shuffle-ref");
    const list = data.ayat;
    let timer = null;
    if (!reduceMotion) {
      // nama-nama ayat berputar cepat lalu melambat, seperti mengocok
      let delay = 55;
      const spin = () => {
        ref.textContent = reference(list[randomIndex(list.length)]);
        delay *= 1.12;
        timer = setTimeout(spin, delay);
      };
      spin();
    }

    setTimeout(() => {
      clearTimeout(timer);
      showVerse(chosen);
    }, reduceMotion ? 300 : SHUFFLE_MS);
  }

  function showVerse(v) {
    current = v;
    const text = $("verse-text");
    text.textContent = v[4];
    text.classList.toggle("long", v[4].length > 280);
    $("verse-ref").textContent = reference(v);
    $("prayer-text").textContent = window.Doa.prayerFor(v[4], reference(v));
    $("share").href = `https://wa.me/?text=${encodeURIComponent(shareText(v))}`;
    show("result");
    // ulangi animasi kartu setiap kali ayat baru muncul
    const card = screens.result.querySelector(".card");
    card.style.animation = "none";
    void card.offsetWidth;
    card.style.animation = "";
    againBtn.focus({ preventScroll: true });
  }

  startBtn.addEventListener("click", reveal);
  againBtn.addEventListener("click", reveal);
  $("home").addEventListener("click", () => {
    show("intro");
    startBtn.focus({ preventScroll: true });
  });

  // ---------- salin & bagikan ----------

  function shareText(v) {
    const prayer = window.Doa.prayerFor(v[4], reference(v));
    return `“${v[4]}”\n— ${reference(v)} (${data.singkatan})\n\nDoa Penguatan:\n${prayer}`;
  }

  $("copy").addEventListener("click", async () => {
    if (!current) return;
    try {
      await navigator.clipboard.writeText(shareText(current));
      toast("Ayat disalin");
    } catch {
      // salin otomatis ditolak: pilihkan teksnya supaya bisa disalin manual
      const range = document.createRange();
      range.selectNodeContents(screens.result);
      getSelection().removeAllRanges();
      getSelection().addRange(range);
      toast("Teks sudah dipilih, silakan salin secara manual");
    }
  });

  // Bagikan: menu bagikan bawaan HP kalau ada, selain itu tautan WhatsApp biasa
  $("share").addEventListener("click", async (e) => {
    if (!current || !navigator.share) return;
    e.preventDefault();
    try {
      await navigator.share({ text: shareText(current) });
    } catch {
      /* dibatalkan pengguna atau tidak diizinkan */
    }
  });

  // ---------- utilitas ----------

  let toastTimer;
  function toast(message) {
    const el = $("toast");
    el.textContent = message;
    el.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => (el.hidden = true), 2200);
  }

})();
