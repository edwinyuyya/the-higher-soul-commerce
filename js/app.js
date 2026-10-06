/* =========================================================
   APLIKASI — alur: kocok → jereng → pilih 3+1 → buka → tanya → sambungkan
   ========================================================= */
(function () {
  'use strict';

  const { DECK, SUITS, RANKS } = window.TAROT;
  const E = window.TarotEngine;
  const $ = (s, r) => (r || document).querySelector(s);
  const wait = (ms) => new Promise((res) => setTimeout(res, ms));
  const REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const T = (ms) => (REDUCED ? Math.min(ms, 60) : ms);
  const REVERSED_CHANCE = 0.3;

  const state = {
    deck: [],
    picks: [],
    busy: false,
    run: 0,
    topic: null,
    topicManual: false,
    question: ''
  };

  /* ---------------- ACAK ---------------- */
  function rand() {
    if (window.crypto && window.crypto.getRandomValues) {
      const a = new Uint32Array(1);
      window.crypto.getRandomValues(a);
      return a[0] / 4294967296;
    }
    return Math.random();
  }
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(rand() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  const newDeck = () => shuffle(DECK.map((card) => ({ card: card, reversed: rand() < REVERSED_CHANCE })));

  /* ---------------- GRAFIS KARTU ---------------- */
  const SUIT_SVG = {
    wands: '<svg viewBox="0 0 40 80" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 76V8"/><path d="M20 22c-6-2-9-7-9-11 5 1 8 5 9 11zM20 38c6-2 9-7 9-11-5 1-8 5-9 11zM20 54c-6-2-9-7-9-11 5 1 8 5 9 11z" fill="currentColor" fill-opacity=".25"/><circle cx="20" cy="6" r="3" fill="currentColor"/></svg>',
    cups: '<svg viewBox="0 0 60 70" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"><path d="M8 8h44c0 20-9 30-22 31C17 38 8 28 8 8z" fill="currentColor" fill-opacity=".22"/><path d="M30 39v17M18 64h24M22 57h16"/><path d="M14 16h32" opacity=".6"/></svg>',
    swords: '<svg viewBox="0 0 40 80" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linejoin="round" stroke-linecap="round"><path d="M20 4l5 9v41h-10V13z" fill="currentColor" fill-opacity=".22"/><path d="M8 56h24M20 56v14"/><circle cx="20" cy="74" r="3" fill="currentColor"/></svg>',
    pentacles: '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"><circle cx="30" cy="30" r="26" fill="currentColor" fill-opacity=".14"/><path d="M30 8l6.5 20H57L40.5 40.5 47 60 30 48 13 60l6.5-19.5L3 28h20.5z" transform="translate(0 -3) scale(1 .95)"/></svg>'
  };
  const COURT_MARK = { 11: '❦', 12: '♞', 13: '♛', 14: '♚' };
  const BACK_SVG = '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="30" cy="30" r="27" opacity=".7"/><circle cx="30" cy="30" r="20" opacity=".5"/><path d="M30 6l4.5 19.5L54 30l-19.5 4.5L30 54l-4.5-19.5L6 30l19.5-4.5z" fill="currentColor" fill-opacity=".35"/><path d="M38 19a12 12 0 1 0 0 22 10 10 0 1 1 0-22z" fill="currentColor" fill-opacity=".6" stroke="none"/></svg>';
  const RAYS_SVG = (() => {
    let s = '<svg viewBox="0 0 100 100" fill="none" stroke="currentColor" stroke-width=".8"><circle cx="50" cy="50" r="36" opacity=".55"/><circle cx="50" cy="50" r="46" opacity=".35" stroke-dasharray="2 3"/>';
    for (let i = 0; i < 24; i++) {
      const a = (i / 24) * Math.PI * 2;
      const r1 = 38, r2 = i % 2 ? 43 : 47;
      s += '<line x1="' + (50 + Math.cos(a) * r1).toFixed(1) + '" y1="' + (50 + Math.sin(a) * r1).toFixed(1) + '" x2="' + (50 + Math.cos(a) * r2).toFixed(1) + '" y2="' + (50 + Math.sin(a) * r2).toFixed(1) + '" opacity=".6"/>';
    }
    return s + '</svg>';
  })();

  const backHTML = () => '<div class="back-in">' + BACK_SVG + '</div>';

  function artHTML(card) {
    if (card.arcana === 'major') {
      return '<div class="maj-art">' + RAYS_SVG + '<span class="glyph">' + card.glyph + '︎</span></div>';
    }
    const icon = SUIT_SVG[card.suit];
    if (card.court) {
      return '<div class="court-art"><span class="crown">' + COURT_MARK[card.rank] + '︎</span>' + icon + '</div>';
    }
    return '<div class="pip-art n' + card.rank + '">' + new Array(card.rank).fill(icon).join('') + '</div>';
  }

  function faceHTML(d) {
    const c = d.card;
    return '<div class="face-in t-' + (c.suit || 'major') + '">' +
      '<div class="f-top">' + c.numeral + '</div>' +
      '<div class="f-art">' + artHTML(c) + '</div>' +
      '<div><div class="f-name">' + c.nameId + '</div><div class="f-en">' + c.name + '</div></div>' +
      '</div>' + (d.reversed ? '<span class="rev-tag">terbalik</span>' : '');
  }

  function card3dHTML(d) {
    return '<div class="card3d' + (d.reversed ? ' is-rev' : '') + '"><div class="card-inner">' +
      '<div class="face back">' + backHTML() + '</div>' +
      '<div class="face front">' + faceHTML(d) + '</div>' +
      '</div></div>';
  }

  const miniCardHTML = (d) => '<div class="mini-card' + (d.reversed ? ' is-rev' : '') + '">' + faceHTML(d) + '</div>';

  /* ---------------- LANGIT ---------------- */
  function buildSky() {
    const sky = $('.sky');
    let html = '';
    const n = window.innerWidth < 600 ? 70 : 140;
    for (let i = 0; i < n; i++) {
      const size = rand() < 0.15 ? 3 : rand() < 0.5 ? 2 : 1;
      html += '<i style="left:' + (rand() * 100).toFixed(2) + '%;top:' + (rand() * 100).toFixed(2) + '%;width:' + size + 'px;height:' + size + 'px;--d:' + (2 + rand() * 5).toFixed(1) + 's;--dl:-' + (rand() * 5).toFixed(1) + 's"></i>';
    }
    sky.innerHTML = html;
  }

  /* ---------------- STATUS & SLOT ---------------- */
  function setStatus(title, text) {
    $('#statusTitle').textContent = title;
    $('#statusText').textContent = text || '';
  }

  function updateCounter() {
    const el = $('#pickCounter');
    el.hidden = false;
    el.innerHTML = [0, 1, 2, 3].map((i) => '<i class="' + (i === 3 ? 'key ' : '') + (i < state.picks.length ? 'on' : '') + '"></i>').join('');
  }

  function buildSlots() {
    const wrap = $('#slots');
    wrap.innerHTML = E.POSITIONS.map((p, i) =>
      (i === 3 ? '<div class="slot-plus" aria-hidden="true">+1</div>' : '') +
      '<div class="slot' + (i === 3 ? ' key-slot' : '') + '" data-i="' + i + '">' +
      '<div class="slot-card"></div>' +
      '<div class="slot-label">' + p.label + '</div><div class="slot-sub">' + p.sub + '</div></div>'
    ).join('');
    wrap.querySelectorAll('.slot').forEach((s) => {
      s.addEventListener('click', () => {
        if (!s.classList.contains('revealed')) return;
        const el = document.getElementById('detail-' + E.POSITIONS[+s.dataset.i].key);
        if (el) el.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
      });
    });
    markNextSlot();
  }

  function markNextSlot() {
    document.querySelectorAll('.slot').forEach((s, i) => s.classList.toggle('is-next', i === state.picks.length && state.picks.length < 4 && state.phase === 'pick'));
  }

  /* ---------------- MASTER TAROT DI MEJA ---------------- */
  const ORACLE_LINES = {
    shuffle: 'Tenangkan hatimu… biarkan kartu mendengar pertanyaanmu.',
    spread: 'Lihatlah. Kartu-kartu ini sudah menunggumu.',
    pick: ['Pilih kartu pertama — akar dari pertanyaanmu.', 'Sekarang kartu untuk saat ini.', 'Satu lagi, untuk apa yang akan datang.', 'Terakhir, Kartu Kunci. Biarkan tanganmu memilih.'],
    done: 'Bagus. Mari kita lihat apa yang mereka katakan…'
  };
  function showOracle(phase) {
    const o = $('#oracle');
    o.hidden = false;
    o.classList.toggle('is-shuffling', phase === 'shuffle');
    o.classList.toggle('is-leaving', phase === 'done');
    const line = phase === 'pick' ? ORACLE_LINES.pick[Math.min(state.picks.length, 3)] : ORACLE_LINES[phase];
    $('#oracleSay').textContent = line;
  }

  /* ---------------- KOCOK ---------------- */
  async function shuffleAnimation(run) {
    const stage = $('#stage');
    stage.className = 'stage shuffling';
    stage.style.height = '';
    stage.hidden = false;
    let sparks = '';
    for (let i = 0; i < 14; i++) sparks += '<span class="spark" style="--a:' + Math.round(i * (360 / 14)) + 'deg;animation-delay:' + (i * 0.11).toFixed(2) + 's"></span>';
    stage.innerHTML = '<div class="shuffle-glow"></div>' + sparks + '<div class="pile"></div>';
    const pile = $('.pile', stage);
    const N = 16;
    const cards = [];
    const base = (i) => 'translate(-50%, -50%) translate(' + (-i * 0.35).toFixed(2) + 'px,' + (-i * 0.6).toFixed(2) + 'px)';
    for (let i = 0; i < N; i++) {
      const el = document.createElement('div');
      el.className = 'pcard';
      el.innerHTML = backHTML();
      el.style.transform = base(i);
      el.style.zIndex = i;
      pile.appendChild(el);
      cards.push(el);
    }
    const off = Math.min(110, stage.clientWidth * 0.22);
    const anim = (el, frames, o) => el.animate(frames, Object.assign({ fill: 'forwards' }, o)).finished;

    for (let r = 0; r < 3; r++) {
      if (run !== state.run) return;
      const split = (i) => base(i) + ' translateX(' + (i % 2 ? off : -off) + 'px) translateY(' + (i % 2 ? -6 : 6) + 'px) rotate(' + (i % 2 ? 9 : -9) + 'deg)';
      await Promise.all(cards.map((el, i) => anim(el, [{ transform: base(i) }, { transform: split(i) }], { duration: T(360), delay: T(i * 6), easing: 'cubic-bezier(.3,.7,.3,1)' })));
      await Promise.all(cards.map((el, i) => anim(el, [{ transform: split(i) }, { transform: base(i) }], { duration: T(240), delay: T((i % 2 ? i : N - i) * 16), easing: 'ease-in' })));
    }
    if (run !== state.run) return;
    // potong & tumpuk (cut)
    await Promise.all(cards.map((el, i) => i >= N / 2
      ? anim(el, [{ transform: base(i) }, { transform: base(i) + ' translateY(' + (-off * 0.9) + 'px) rotate(-5deg)' }, { transform: base(i) + ' translateX(' + (off * 0.4) + 'px) translateY(-10px) rotate(4deg)' }, { transform: base(i) }], { duration: T(820), easing: 'ease-in-out' })
      : anim(el, [{ transform: base(i) }, { transform: base(i) + ' translateY(10px)' }, { transform: base(i) }], { duration: T(820), easing: 'ease-in-out' })));
  }

  /* ---------------- JERENG (FAN) ---------------- */
  function computeLayout() {
    const stage = $('#stage');
    const W = stage.clientWidth;
    const count = state.deck.length;
    const rows = W < 560 ? 3 : W < 960 ? 2 : 1;
    let fw;
    if (rows === 1) fw = Math.max(64, Math.min(84, W / 14));
    else if (rows === 2) fw = Math.max(56, Math.min(74, W / 11));
    else fw = Math.max(42, Math.min(58, W / 7.4));
    const fh = fw * 1.7;
    const per = Math.ceil(count / rows);
    const arc = rows === 1 ? fh * 0.5 : fh * 0.32;
    const rowGap = rows === 1 ? 0 : fh * 0.78;
    const maxRot = rows === 1 ? 46 : rows === 2 ? 34 : 28;
    const pos = [];
    for (let i = 0; i < count; i++) {
      const r = Math.floor(i / per);
      const j = i % per;
      const n = r === rows - 1 ? count - per * (rows - 1) : per;
      const t = n > 1 ? j / (n - 1) - 0.5 : 0;
      const span = (W - fw - 28) * (n / per);
      const x = W / 2 + t * span - fw / 2;
      const y = 22 + r * rowGap + 4 * t * t * arc;
      pos.push({ x: x, y: y, rot: t * maxRot, z: r * 100 + j });
    }
    const height = 22 + (rows - 1) * rowGap + fh + arc + 26;
    return { W: W, fw: fw, fh: fh, pos: pos, height: height, cx: W / 2 - fw / 2, cy: height / 2 - fh / 2 };
  }

  function applyLayout(L, cards) {
    const stage = $('#stage');
    stage.style.setProperty('--fw', L.fw + 'px');
    stage.style.setProperty('--cx', L.cx + 'px');
    stage.style.setProperty('--cy', L.cy + 'px');
    stage.style.height = L.height + 'px';
    cards.forEach((el, i) => {
      const p = L.pos[i];
      el.style.setProperty('--tx', p.x.toFixed(1) + 'px');
      el.style.setProperty('--ty', p.y.toFixed(1) + 'px');
      el.style.setProperty('--rot', p.rot.toFixed(2) + 'deg');
      el.style.zIndex = p.z;
    });
  }

  async function spreadFan(run) {
    const stage = $('#stage');
    stage.className = 'stage fan locked';
    stage.innerHTML = '';
    const L = computeLayout();
    stage.style.setProperty('--fw', L.fw + 'px');
    stage.style.height = L.height + 'px';
    const cards = state.deck.map((d, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'fcard';
      b.setAttribute('aria-label', 'Kartu tertutup nomor ' + (i + 1));
      b.innerHTML = backHTML();
      b.style.setProperty('--tx', L.cx + 'px');
      b.style.setProperty('--ty', L.cy + 'px');
      b.style.setProperty('--rot', '0deg');
      b.style.transitionDelay = T(i * 9) + 'ms';
      b.addEventListener('click', () => pickCard(i, b));
      stage.appendChild(b);
      return b;
    });
    await wait(40);
    if (run !== state.run) return;
    applyLayout(L, cards);
    await wait(T(750 + cards.length * 9));
    if (run !== state.run) return;
    cards.forEach((c) => { c.style.transitionDelay = ''; });
    stage.classList.remove('locked');
    stage.classList.add('ready');
  }

  function relayoutFan() {
    const stage = $('#stage');
    if (!stage.classList.contains('fan') || stage.classList.contains('fan-out')) return;
    const cards = Array.from(stage.querySelectorAll('.fcard'));
    if (!cards.length) return;
    applyLayout(computeLayout(), cards);
  }

  /* ---------------- PILIH KARTU ---------------- */
  async function pickCard(i, el) {
    if (state.busy || state.phase !== 'pick' || state.picks.length >= 4 || el.classList.contains('taken')) return;
    state.busy = true;
    const run = state.run;
    const slotIdx = state.picks.length;
    const d = state.deck[i];
    state.picks.push(d);
    updateCounter();

    const slot = document.querySelectorAll('.slot')[slotIdx];
    const holder = $('.slot-card', slot);
    slot.classList.remove('is-next');

    const from = el.getBoundingClientRect();
    const rot = parseFloat(el.style.getPropertyValue('--rot')) || 0;
    el.classList.add('taken');

    holder.innerHTML = card3dHTML(d);
    const c3 = $('.card3d', holder);
    c3.style.visibility = 'hidden';
    slot.classList.add('filled');
    const to = holder.getBoundingClientRect();

    const fly = document.createElement('div');
    fly.className = 'flyer';
    fly.innerHTML = backHTML();
    const fw = el.offsetWidth, fh = el.offsetHeight;
    // posisi awal: pusat kotak pembatas kartu yang dipilih
    const sx = from.left + from.width / 2 - fw / 2;
    const sy = from.top + from.height / 2 - fh / 2;
    Object.assign(fly.style, { left: sx + 'px', top: sy + 'px', width: fw + 'px', height: fh + 'px' });
    document.body.appendChild(fly);
    const sc = to.width / fw;
    await fly.animate([
      { transform: 'translate(' + (fw / 2) + 'px,' + (fh / 2) + 'px) rotate(' + rot + 'deg) translate(' + (-fw / 2) + 'px,' + (-fh / 2) + 'px)' },
      { transform: 'translate(' + ((sx + (to.left - sx) * 0.5) - sx) + 'px,' + (Math.min(to.top, sy) - sy - 40) + 'px) scale(' + ((1 + sc) / 2 * 1.08) + ') rotate(' + (rot / 3) + 'deg)', offset: 0.55 },
      { transform: 'translate(' + (to.left - sx) + 'px,' + (to.top - sy) + 'px) scale(' + sc + ')' }
    ], { duration: T(720), easing: 'cubic-bezier(.25,.8,.25,1)', fill: 'forwards' }).finished;
    fly.remove();
    if (run !== state.run) return;
    c3.style.visibility = '';

    state.busy = false;
    showOracle('pick');
    if (state.picks.length < 3) {
      setStatus('Pilih ' + (3 - state.picks.length) + ' kartu lagi', 'Kartu berikutnya untuk ' + E.POSITIONS[state.picks.length].label + '. Biarkan tanganmu mengikuti rasa.');
    } else if (state.picks.length === 3) {
      setStatus('Sekarang pilih +1 Kartu Kunci', 'Satu kartu terakhir — pesan penuntun yang menjadi kunci dari bacaanmu.');
    } else {
      finishPicking(run);
    }
    markNextSlot();
  }

  /* ---------------- BUKA KARTU ---------------- */
  async function finishPicking(run) {
    state.phase = 'reveal';
    markNextSlot();
    setStatus('Kartu sudah terpilih', 'Semesta sedang membuka pesannya…');
    showOracle('done');
    const stage = $('#stage');
    stage.classList.add('fan-out');
    await wait(T(750));
    if (run !== state.run) return;
    stage.style.height = '0px';
    stage.innerHTML = '';
    stage.hidden = true;
    $('#oracle').hidden = true;
    $('#pickCounter').hidden = true;

    // Kartu baru terbuka setelah pembayaran terkonfirmasi.
    const paid = await tarotGate(run);
    if (!paid || run !== state.run) return;
    await revealCards(run);
  }

  async function revealCards(run) {
    setStatus('Kartu sudah terpilih', 'Semesta sedang membuka pesannya…');
    await wait(T(250));
    const slots = document.querySelectorAll('.slot');
    for (let i = 0; i < slots.length; i++) {
      if (run !== state.run) return;
      $('.card3d', slots[i]).classList.add('flipped');
      slots[i].classList.add('revealed');
      await wait(T(650));
    }
    await wait(T(500));
    if (run !== state.run) return;
    setStatus('Kartumu telah terbuka', 'Ketuk kartu untuk langsung melompat ke penjelasannya.');
    renderDetails();
    state.phase = 'ask';
    await wait(T(900));
    if (run !== state.run) return;
    $('#askbar').hidden = false;
  }

  /* ---------------- PEMBAYARAN BACAAN TAROT ---------------- */
  const SESSION_KEY = 'hs_tarot_session';
  const sessionStore = {
    get() { try { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); } catch (e) { return null; } },
    set(v) { try { localStorage.setItem(SESSION_KEY, JSON.stringify(v)); } catch (e) { /* abaikan */ } },
    del() { try { localStorage.removeItem(SESSION_KEY); } catch (e) { /* abaikan */ } }
  };
  const picksSig = () => state.picks.map((d) => d.card.id + (d.reversed ? 'r' : '')).join('.');

  function saveSession(extra) {
    sessionStore.set(Object.assign({
      picks: state.picks.map((d) => ({ id: d.card.id, reversed: d.reversed })),
      sig: picksSig(),
      at: Date.now()
    }, extra || {}));
  }

  function tarotGate(run) {
    return new Promise((resolve) => {
      const box = $('#paywall');
      const price = window.Payment ? window.Payment.rupiah(15000) : 'Rp 15.000';
      setStatus('Kartumu sudah terpilih', 'Empat kartu menunggu untuk dibuka.');
      box.innerHTML =
        '<div class="pw-cards" aria-hidden="true"><i></i><i></i><i></i><i></i></div>' +
        '<h2>Buka bacaan kartumu</h2>' +
        '<p class="pw-lead">Master Tarot siap membuka keempat kartumu dan menjawab pertanyaan yang kamu simpan dalam hati.</p>' +
        '<ul class="pw-list">' +
        '<li>Makna lengkap 4 kartu yang kamu pilih, tegak maupun terbalik</li>' +
        '<li>Jawaban Master Tarot yang disambungkan langsung dengan pertanyaanmu</li>' +
        '<li>Benang merah masa lalu, kini, dan masa depan, plus langkah yang bisa kamu ambil</li>' +
        '<li>Boleh bertanya topik lain dengan kartu yang sama, tanpa biaya tambahan</li>' +
        '</ul>' +
        '<div class="pw-buy"><div class="pw-price"><span>Sekali bayar</span><strong>' + price + '</strong></div>' +
        '<button class="btn btn-primary btn-big" type="button" id="pwPay">Bayar &amp; buka kartuku</button></div>' +
        '<p class="pw-methods">QRIS · GoPay · ShopeePay · OVO · DANA · LinkAja · Virtual Account BCA, BNI, BRI, Mandiri, Permata, CIMB</p>' +
        '<p class="pw-secure">Pembayaran diproses oleh Midtrans, payment gateway berizin Bank Indonesia. Kartu yang kamu pilih tersimpan, jadi aman bila kamu berpindah ke aplikasi e-wallet atau m-banking.</p>';
      box.hidden = false;
      const btn = box.querySelector('#pwPay');
      btn.addEventListener('click', async () => {
        if (!window.Payment) return;
        btn.disabled = true;
        try {
          const res = await window.Payment.checkout({
            product: 'tarot',
            reuseKey: picksSig(),
            beforePay: (orderId) => saveSession({ orderId: orderId, paid: false })
          });
          if (run !== state.run) return;
          saveSession({ orderId: res.orderId, paid: true });
          box.hidden = true;
          box.innerHTML = '';
          resolve(true);
        } catch (e) {
          btn.disabled = false;
        }
      });
    });
  }

  /** Membuka kembali bacaan yang sudah dibayar (mis. setelah kembali dari aplikasi e-wallet). */
  async function restoreSession(sess) {
    const picks = (sess.picks || []).map((p) => ({ card: window.TAROT.byId(p.id), reversed: !!p.reversed })).filter((d) => d.card);
    if (picks.length !== 4) return false;
    state.run++;
    const run = state.run;
    state.picks = picks;
    state.phase = 'reveal';
    $('#intro').classList.remove('is-active');
    $('#table').classList.add('is-active');
    $('#details').hidden = true;
    $('#reading').hidden = true;
    $('#reading').innerHTML = '';
    $('#paywall').hidden = true;
    $('#stage').hidden = true;
    $('#oracle').hidden = true;
    $('#pickCounter').hidden = true;
    buildSlots();
    document.querySelectorAll('.slot').forEach((slot, i) => {
      $('.slot-card', slot).innerHTML = card3dHTML(picks[i]);
      slot.classList.add('filled');
    });
    await revealCards(run);
    return true;
  }

  /* ---------------- DETAIL KARTU ---------------- */
  function detailHTML(d, p) {
    const c = d.card;
    const meta = [];
    if (c.arcana === 'major') {
      meta.push('Arcana Mayor', 'No. ' + c.numeral, c.glyph + '︎ ' + c.astro);
    } else {
      const s = SUITS[c.suit];
      meta.push('Arcana Minor', 'Suit ' + s.nameId + ' (' + s.name + ')', 'Elemen ' + s.element, c.court ? 'Kartu Istana' : 'Angka ' + c.rank);
    }
    const nowKw = d.reversed ? c.kwRev : c.kwUp;
    const otherKw = d.reversed ? c.kwUp : c.kwRev;
    let extra;
    if (c.arcana === 'major') {
      extra = '<h4>Simbolisme</h4><p>' + c.symbol + '</p>';
    } else {
      const s = SUITS[c.suit];
      const r = RANKS[c.rank];
      extra = '<h4>Suit &amp; Angka</h4><p>Suit <b>' + s.nameId + '</b> (elemen ' + s.element.toLowerCase() + ') mewakili ' + s.domain + '. ' +
        (c.court ? 'Sebagai kartu istana, <b>' + r.label + '</b> sering menggambarkan ' + r.person + ', dengan tema ' + r.theme + '.' : 'Angka <b>' + r.label + '</b> membawa tema ' + r.theme + '.') + '</p>';
    }
    return '<article class="detail" id="detail-' + p.key + '">' +
      '<div class="detail-card">' + miniCardHTML(d) + '</div>' +
      '<div class="detail-body">' +
      '<div class="pos-tag">' + p.label + ' · ' + p.sub + '</div>' +
      '<h3>' + c.nameId + '<span class="en">' + c.name + '</span></h3>' +
      '<div class="meta">' + meta.map((m) => '<span class="badge">' + m + '</span>').join('') +
      '<span class="badge ' + (d.reversed ? 'rev' : 'up') + '">' + (d.reversed ? '↓ Terbalik' : '↑ Tegak') + '</span></div>' +
      '<div class="kw">' + nowKw.map((k) => '<span>' + k + '</span>').join('') + '</div>' +
      '<h4>Makna ' + (d.reversed ? 'terbalik' : 'tegak') + ' — posisi kartumu</h4><p>' + (d.reversed ? c.rev : c.up) + '</p>' +
      extra +
      '<h4>Pesan sebagai nasihat</h4><p class="advice">“' + c.advice + '”</p>' +
      '<details><summary>Lihat juga makna ' + (d.reversed ? 'tegak' : 'terbalik') + '</summary><p>' + (d.reversed ? c.up : c.rev) + '</p>' +
      '<div class="kw">' + otherKw.map((k) => '<span>' + k + '</span>').join('') + '</div></details>' +
      '</div></article>';
  }

  function renderDetails() {
    const wrap = $('#details');
    wrap.innerHTML = '<h2 class="sec-title">Makna Kartu-kartumu</h2>' +
      '<p class="sec-sub">Inilah arti setiap kartu secara umum. Setelah ini, Master Tarot akan membacanya khusus untuk pertanyaanmu.</p>' +
      state.picks.map((d, i) => detailHTML(d, E.POSITIONS[i])).join('') +
      '<div class="ask-inline"><div class="ask-orb" aria-hidden="true"></div><h3>Pertanyaanmu tadi apa?</h3>' +
      '<p>Tentang cinta, karier, keuangan, atau yang lain? Ceritakan, agar kartu-kartu ini bisa dibaca khusus untukmu.</p>' +
      '<button class="btn btn-primary" type="button" data-ask>Ceritakan pertanyaanku ✦</button></div>';
    wrap.hidden = false;
    wrap.querySelector('[data-ask]').addEventListener('click', openAsk);
  }

  /* ---------------- DIALOG PERTANYAAN ---------------- */
  function buildChips() {
    const wrap = $('#topicChips');
    wrap.innerHTML = Object.keys(E.TOPICS).map((k) => {
      const t = E.TOPICS[k];
      return '<div class="chip"><input type="radio" name="topic" id="tp-' + k + '" value="' + k + '">' +
        '<label for="tp-' + k + '"><span class="ico">' + t.icon + '</span>' + t.label + '</label></div>';
    }).join('');
    wrap.querySelectorAll('input').forEach((inp) => {
      inp.addEventListener('change', () => {
        state.topic = inp.value;
        state.topicManual = true;
        clearAutoTags();
        $('#askSubmit').disabled = false;
      });
    });
  }

  function clearAutoTags() {
    document.querySelectorAll('.chip .auto').forEach((x) => x.remove());
  }

  function selectTopic(k, auto) {
    const inp = document.getElementById('tp-' + k);
    if (!inp) return;
    inp.checked = true;
    state.topic = k;
    clearAutoTags();
    if (auto) inp.nextElementSibling.insertAdjacentHTML('beforeend', '<span class="auto">terdeteksi</span>');
    $('#askSubmit').disabled = false;
  }

  function onQuestionInput() {
    const text = $('#questionInput').value;
    const hint = $('#detectHint');
    const det = E.detectTopic(text);
    if (det.topic) {
      hint.textContent = '✦ Master Tarot mendeteksi topik: ' + E.TOPICS[det.topic].label;
      if (!state.topicManual) selectTopic(det.topic, true);
    } else {
      hint.textContent = text.trim().length > 6 ? 'Pilih topik di bawah agar bacaan lebih tepat.' : '';
    }
  }

  function openAsk() {
    const dlg = $('#askDialog');
    $('#questionInput').value = state.question;
    if (state.topic) selectTopic(state.topic, false);
    if (typeof dlg.showModal === 'function') dlg.showModal();
    else dlg.setAttribute('open', '');
    setTimeout(() => $('#questionInput').focus(), 50);
  }

  function closeAsk() {
    const dlg = $('#askDialog');
    if (typeof dlg.close === 'function') dlg.close();
    else dlg.removeAttribute('open');
  }

  /* ---------------- BACAAN TERSAMBUNG ---------------- */
  const BRAIN_STEPS = ['Master Tarot membaca energi kartu…', 'Memahami pertanyaanmu…', 'Mencari pola & kombinasi…', 'Menyambungkan kartu dengan pertanyaanmu…'];

  async function connect() {
    const run = state.run;
    state.question = $('#questionInput').value.trim();
    closeAsk();
    $('#askbar').hidden = true;
    const box = $('#reading');
    box.hidden = false;
    box.innerHTML = '<div class="brain"><div class="brain-orbit"><i></i><i></i><i></i></div><div class="brain-text" id="brainText"></div></div>';
    box.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
    for (const s of BRAIN_STEPS) {
      if (run !== state.run) return;
      const t = $('#brainText');
      if (t) t.textContent = s;
      await wait(T(650));
    }
    if (run !== state.run) return;
    const r = E.interpret({ draws: state.picks, topic: state.topic, question: state.question });
    renderReading(r);
  }

  function renderReading(r) {
    const box = $('#reading');
    const posHTML = r.positions.map((p, i) =>
      '<div class="panel r-pos">' +
      '<div data-jump="' + p.key + '" title="Lihat makna umum kartu">' + miniCardHTML(state.picks[i]) + '</div>' +
      '<div><div class="pos-tag">' + p.label + ' · ' + p.sub + '</div>' +
      '<div class="frame">' + p.frame + '</div>' +
      '<span class="rel ' + p.relevance.level + '">' + p.relevance.label + '</span>' +
      '<div class="link"><span class="link-tag">Untuk pertanyaanmu</span>' + p.link + '</div>' +
      '<p>' + p.opening + '</p><p class="muted">' + p.text + '</p>' +
      (p.note ? '<div class="note">' + p.note + '</div>' : '') +
      '</div></div>'
    ).join('');

    box.innerHTML =
      '<div class="r-head"><span class="r-topic">' + r.topicIcon + ' ' + r.topicLabel + '</span>' +
      '<h2>Bacaan Master Tarot</h2><p class="r-intro">' + r.intro + '</p></div>' +

      (r.answer.text ? '<div class="panel answer">' + (r.answer.quote ? '<p class="q-quote">“' + E.escapeHtml(r.answer.quote) + '”</p>' : '') +
        '<h3>' + r.answer.title + '</h3><p class="big">' + r.answer.text + '</p></div>' : '') +

      '<div class="panel master" id="masterPanel" hidden><h3>✦ Pesan Pribadi Master Tarot</h3>' +
      '<div class="master-text" id="masterText"></div><p class="master-note" id="masterNote"></p></div>' +

      '<div class="panel essence tone-' + r.verdict.tone + '">' +
      '<h3>Jawaban Singkat</h3>' +
      '<div class="r-tone">' + r.verdict.label + '</div>' +
      '<div class="meter" aria-hidden="true"><div class="meter-bar"><div class="meter-dot" style="left:50%"></div></div>' +
      '<div class="meter-legend"><span>Masa ujian</span><span>Seimbang</span><span>Sangat mendukung</span></div></div>' +
      '<p class="big">' + r.verdict.text + '</p>' +
      '<p>' + r.essence + '</p>' +
      '</div>' +

      '<h2 class="sec-title">Kartu × Pertanyaanmu</h2>' +
      '<p class="sec-sub">Setiap kartu dibaca untuk menjawab: ' + r.focus + '.</p>' +
      posHTML +

      '<div class="panel"><h3>Benang Merah</h3><p>' + r.flow + '</p></div>' +

      '<div class="panel"><h3>Pola &amp; Sinyal yang Terbaca</h3><ul class="patterns">' +
      r.patterns.map((p) => '<li><span class="pt">' + p.title + '</span>' + p.text + '</li>').join('') + '</ul></div>' +

      '<div class="panel"><h3>Langkah yang Bisa Kamu Ambil</h3><ol class="steps">' +
      r.steps.map((s) => '<li>' + s + '</li>').join('') + '</ol></div>' +

      '<div class="panel"><h3>Untuk Direnungkan</h3><ul class="reflect">' +
      r.reflections.map((s) => '<li>' + s + '</li>').join('') + '</ul></div>' +

      (window.Numerology ? window.Numerology.html() : '') +

      (r.disclaimer ? '<p class="disclaimer">⚠︎ ' + r.disclaimer + '</p>' : '') +
      '<p class="disclaimer">Tarot adalah cermin untuk refleksi diri — keputusan akhir tetap ada di tanganmu.</p>' +

      '<div class="r-actions">' +
      '<button class="btn" type="button" data-act="topic">↺ Tanya topik lain (kartu sama)</button>' +
      '<button class="btn" type="button" data-act="copy">⧉ Salin bacaan</button>' +
      '<button class="btn btn-primary" type="button" data-act="new">✦ Bacaan baru</button>' +
      '</div>';

    askMaster(r);

    requestAnimationFrame(() => requestAnimationFrame(() => {
      const dot = $('.meter-dot', box);
      if (dot) dot.style.left = Math.max(3, Math.min(97, r.verdict.meter)) + '%';
    }));

    box.querySelectorAll('[data-jump]').forEach((el) => el.addEventListener('click', () => {
      const t = document.getElementById('detail-' + el.dataset.jump);
      if (t) t.scrollIntoView({ behavior: REDUCED ? 'auto' : 'smooth', block: 'start' });
    }));
    box.querySelector('[data-act="topic"]').addEventListener('click', () => { state.topicManual = true; openAsk(); });
    box.querySelector('[data-act="new"]').addEventListener('click', () => { window.scrollTo({ top: 0, behavior: REDUCED ? 'auto' : 'smooth' }); startReading(); });
    box.querySelector('[data-act="copy"]').addEventListener('click', () => copyReading(r));
    if (window.Numerology) window.Numerology.bind(box, toast);
  }

  /* ---------------- MASTER TAROT (AI, bila tersedia di viewer) ---------------- */
  let samplePromise = null;
  let masterCtl = null;
  function getSample() {
    if (!window.claude || typeof window.claude.use !== 'function') return Promise.resolve(null);
    if (!samplePromise) samplePromise = window.claude.use('sample').catch(() => null);
    return samplePromise;
  }

  function masterPrompt(r) {
    const cards = state.picks.map((d, i) => {
      const c = d.card;
      const p = E.POSITIONS[i];
      return (i + 1) + '. ' + p.label + ' (' + p.sub + ') — ' + c.nameId + ' / ' + c.name + ', ' + (d.reversed ? 'TERBALIK' : 'tegak') +
        '. Kata kunci: ' + (d.reversed ? c.kwRev : c.kwUp).join(', ') + '. Makna umum: ' + (d.reversed ? c.rev : c.up);
    }).join('\n');
    return [
      'Kamu adalah Master Tarot berpengalaman yang membaca dengan hangat, jujur, dan membumi.',
      'Seorang penanya memikirkan pertanyaan, lalu memilih 4 kartu tarot (dek Rider–Waite–Smith) dalam susunan: Masa Lalu, Masa Kini, Masa Depan, dan +1 Kartu Kunci (pesan penuntun).',
      '',
      'Pertanyaan penanya: ' + (r.question ? '"' + r.question + '"' : '(tidak ditulis; bacalah untuk topik di bawah)'),
      'Topik yang dipilih: ' + r.topicLabel,
      'Inti pertanyaan menurut sistem: ' + r.focus,
      'Kecenderungan energi kartu (hitungan sistem): ' + r.verdict.label,
      '',
      'Kartu yang keluar:',
      cards,
      '',
      'Tugasmu: jawab PERTANYAAN ITU secara langsung dan spesifik lewat kartu-kartu tersebut, supaya penanya merasa jawabannya benar-benar nyambung dengan pertanyaannya.',
      'Aturan:',
      '- Paragraf pertama: jawaban langsung atas pertanyaannya dalam 2–3 kalimat (misalnya kecenderungan ya/tidak, kapan, apa yang sedang terjadi, atau apa yang sebaiknya dilakukan), memakai kata-kata dan situasi dari pertanyaannya.',
      '- Lalu satu paragraf pendek untuk tiap kartu, diawali dengan **Masa Lalu – Nama Kartu:** (dst.), yang menjelaskan arti kartu itu KHUSUS untuk situasi dalam pertanyaan. Jangan sekadar mengulang makna umum.',
      '- Perhatikan kartu terbalik dan hubungan antar-kartu (mis. masa kini → masa depan).',
      '- Paragraf penutup: 2–3 saran konkret yang bisa dilakukan dalam minggu ini.',
      '- Bahasa Indonesia yang hangat dan santai, sapa penanya dengan "kamu". Panjang 250–380 kata. Hanya paragraf dan **tebal**; tanpa judul (#) dan tanpa daftar berpoin.',
      '- Jangan menjanjikan kepastian; tarot adalah cermin untuk refleksi. Untuk soal kesehatan, keuangan, atau hukum, tambahkan satu kalimat singkat agar tetap berkonsultasi dengan profesional.'
    ].join('\n');
  }

  function renderMasterText(text) {
    const esc = E.escapeHtml(text.trim());
    return esc.split(/\n{2,}/).map((para) => '<p>' + para.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br>') + '</p>').join('');
  }

  async function askMaster(r) {
    const run = state.run;
    if (masterCtl) masterCtl.abort();
    const sample = await getSample();
    const panel = document.getElementById('masterPanel');
    if (!sample || !panel || run !== state.run) return;
    const out = document.getElementById('masterText');
    const note = document.getElementById('masterNote');
    panel.hidden = false;
    out.innerHTML = '<p class="master-wait"><span class="dots"></span>Master Tarot sedang merenungkan pertanyaanmu…</p>';
    note.textContent = '';
    const ctl = new AbortController();
    masterCtl = ctl;
    try {
      const res = await sample(masterPrompt(r), {
        signal: ctl.signal,
        onText: ({ text }) => { if (panel.isConnected) out.innerHTML = renderMasterText(text); }
      });
      if (!panel.isConnected) return;
      out.innerHTML = renderMasterText(res.text);
      if (res.truncated) note.textContent = 'Pesan terpotong karena terlalu panjang.';
    } catch (e) {
      if (!panel.isConnected) return;
      const code = e && e.code;
      if (code === 'cancelled') return;
      if (['not_granted', 'sampling_disabled', 'not_declared', 'capability_disabled', 'capability_removed'].indexOf(code) !== -1) {
        panel.hidden = true;
        return;
      }
      if (e && e.text) out.innerHTML = renderMasterText(e.text);
      else out.innerHTML = '';
      note.textContent = code === 'rate_limited'
        ? 'Master Tarot sedang kewalahan. Coba lagi beberapa saat lagi lewat tombol "Tanya topik lain".'
        : 'Pesan pribadi Master Tarot belum bisa dimuat. Bacaan di bawah tetap berlaku.';
      if (!e || !e.text) panel.hidden = !note.textContent;
    }
  }

  function copyReading(r) {
    const strip = (h) => { const d = document.createElement('div'); d.innerHTML = h; return d.textContent; };
    const lines = [];
    lines.push('HIGHER SOUL TAROT — ' + r.topicLabel);
    if (r.question) lines.push('Pertanyaan: ' + r.question);
    lines.push('');
    state.picks.forEach((d, i) => lines.push(E.POSITIONS[i].label + ': ' + d.card.nameId + ' (' + d.card.name + ')' + (d.reversed ? ' — terbalik' : '')));
    const mt = document.getElementById('masterText');
    if (mt && !document.getElementById('masterPanel').hidden && mt.textContent.trim()) lines.push('', 'Pesan Master Tarot:', mt.innerText.trim());
    lines.push('', 'Jawaban singkat: ' + r.verdict.label, strip(r.verdict.text));
    if (r.answer.text) lines.push('', r.answer.title + ': ' + strip(r.answer.text));
    r.positions.forEach((p) => lines.push('', '— ' + p.label + ' —', strip(p.link), strip(p.opening), strip(p.text)));
    lines.push('', 'Benang merah: ' + strip(r.flow));
    lines.push('', 'Langkah:', ...r.steps.map((s, i) => (i + 1) + '. ' + strip(s)));
    const text = lines.join('\n');
    const done = () => toast('Bacaan disalin ✦');
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text, done));
    } else fallbackCopy(text, done);
  }
  function fallbackCopy(text, done) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { toast('Gagal menyalin'); }
    ta.remove();
  }

  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg;
    t.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.hidden = true; }, 2200);
  }

  /* ---------------- ALUR UTAMA ---------------- */
  async function startReading() {
    state.run++;
    if (masterCtl) masterCtl.abort();
    const run = state.run;
    state.deck = newDeck();
    state.picks = [];
    state.busy = false;
    state.phase = 'shuffle';
    state.topic = null;
    state.topicManual = false;
    state.question = '';
    sessionStore.del();
    $('#paywall').hidden = true;
    $('#paywall').innerHTML = '';
    document.querySelectorAll('.flyer').forEach((f) => f.remove());
    document.querySelectorAll('#topicChips input').forEach((i) => { i.checked = false; });
    clearAutoTags();
    $('#detectHint').textContent = '';
    $('#askSubmit').disabled = true;

    $('#intro').classList.remove('is-active');
    $('#table').classList.add('is-active');
    $('#details').hidden = true;
    $('#details').innerHTML = '';
    $('#reading').hidden = true;
    $('#reading').innerHTML = '';
    $('#askbar').hidden = true;
    $('#pickCounter').hidden = true;
    buildSlots();

    showOracle('shuffle');
    setStatus('Mengocok kartu…', 'Tenangkan napasmu dan fokuskan pikiran pada pertanyaan yang kamu simpan dalam hati.');
    await shuffleAnimation(run);
    if (run !== state.run) return;
    showOracle('spread');
    setStatus('Kartu sedang dijereng…', '78 kartu tertutup terbentang di hadapanmu.');
    await spreadFan(run);
    if (run !== state.run) return;
    state.phase = 'pick';
    updateCounter();
    markNextSlot();
    showOracle('pick');
    setStatus('Pilih 3 kartu', 'Ikuti intuisimu. Kartu pertama untuk Masa Lalu, kedua Masa Kini, ketiga Masa Depan — lalu +1 Kartu Kunci.');
  }

  function goHome() {
    state.run++;
    state.phase = 'intro';
    document.querySelectorAll('.flyer').forEach((f) => f.remove());
    $('#askbar').hidden = true;
    $('#oracle').hidden = true;
    $('#paywall').hidden = true;
    $('#table').classList.remove('is-active');
    $('#intro').classList.add('is-active');
    window.scrollTo({ top: 0 });
  }

  /* ---------------- INIT ---------------- */
  function init() {
    buildSky();
    buildChips();
    $('#startBtn').addEventListener('click', startReading);
    $('#brandBtn').addEventListener('click', goHome);
    $('#askbarBtn').addEventListener('click', openAsk);
    $('#askCancel').addEventListener('click', closeAsk);
    $('#questionInput').addEventListener('input', onQuestionInput);
    $('#askForm').addEventListener('submit', (e) => {
      e.preventDefault();
      if (!state.topic) return;
      connect();
    });
    $('#askDialog').addEventListener('close', () => {
      if (state.phase === 'ask' && $('#reading').hidden) $('#askbar').hidden = false;
    });
    let rt;
    window.addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(relayoutFan, 150); });
    resumePayments();
  }

  /* Setelah kembali dari halaman/aplikasi pembayaran: lanjutkan dari kartu yang sama. */
  async function resumePayments() {
    if (!window.Payment) return;
    let done = null;
    try { done = await window.Payment.resume(); } catch (e) { done = null; }
    const sess = sessionStore.get();
    if (done && done.product === 'numerology') {
      if (window.Numerology && window.Numerology.showPaid) window.Numerology.showPaid(done.orderId, toast);
      return;
    }
    if (done && done.product === 'tarot' && sess) {
      saveSession(Object.assign({}, sess, { orderId: done.orderId, paid: true, at: sess.at }));
      restoreSession(sess);
      return;
    }
    // Bacaan yang sudah dibayar dalam 3 jam terakhir dibuka kembali setelah halaman dimuat ulang.
    if (sess && sess.paid && Date.now() - (sess.at || 0) < 3 * 60 * 60 * 1000) restoreSession(sess);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
