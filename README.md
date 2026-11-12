# Higher Soul Tarot

A tarot reader web app in Indonesian. After the cards are read, it asks the user what their question was and links each card's meaning to that topic.

## How it works

1. **Mulai**: the user keeps a question in mind and presses Start.
2. **Shuffle**: a riffle-shuffle and cut animation plays on the deck.
3. **Spread**: all 78 cards are laid out face down in a fan (one row on desktop, two or three rows on smaller screens).
4. **Pick 3 + 1 cards**: Masa Lalu (past), Masa Kini (present), Masa Depan (future), plus one **Kartu Kunci** (key card) that carries the guiding message. Each chosen card flies to its slot.
5. **Cards open**: the cards flip one at a time, and a detail panel appears for each one: upright/reversed meaning, keywords, symbolism, suit and number, and the card's advice.
6. **The app asks**: "Pertanyaanmu tadi apa?" (What was your question?) The user writes the question (optional) and picks a topic: Cinta (love), Karier (career), Keuangan (money), Kesehatan (health), Diri & Spiritual (self and spirit), or Keluarga & Pertemanan (family and friends). The topic is detected automatically from the question text.
7. **Linked reading**: the core engine reads every card again within the chosen topic.

## Master Tarot

The reading is written by the **Master Tarot**, which works in two layers:

1. **Question scenarios (`js/scenarios.js`)**: the actual words of the question are matched against about 20 situations, such as getting back with an ex, whether someone likes you, marriage, finding a new job, resigning, debt, recovery and family. Each card's meaning is then written for that situation. The answer repeats the question and answers it directly.
2. **AI reading (optional)**: when the page is opened inside a claude.ai artifact, the Master Tarot also writes a personal reading through the artifact's `sample` capability. Anywhere else this panel stays hidden and the rule-based reading still works.

## The rule engine (`js/engine.js`)

The engine is rule-based and runs entirely in the browser, with no server or API. What it does:

- **Topic × card**: every Major Arcana card has its own text for each topic. Minor Arcana text is built from the *suit lens* for the topic (for example, Cups in a career question) combined with what the *number/rank* means in that topic.
- **Topic relevance**: each suit has an affinity score per topic. When a card comes from a different domain (for example, Pentacles in a love question), the engine explains the hidden message: the problem may really be about practical matters.
- **Short answer and meter**: a polarity score for each card, weighted by position, with reversed cards taken into account.
- **Question type**: yes/no questions ("apakah…") get a yes/no leaning, "kapan" (when) gets a timing estimate from the suit, "siapa" (who) gets court-card figures, "kenapa" (why) gets root causes, and "bagaimana" (how) gets steps.
- **Patterns**: number of Major Arcana, dominant or missing suit, reversed cards, court cards as people, repeated numbers, and special combinations (for example, The Tower + The Star, The Lovers + Two of Cups).
- **The red thread** running from past to future, practical steps, and reflection questions for each topic.

## Running it

It's a static site with no build step. Open `index.html` directly in a browser, or serve it:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Products and prices

All prices, service fees and payment methods live in `lib/catalog.js`; the browser only displays them (`/api/config`).

| Product | Key | Price |
|---|---|---|
| Tarot reading (in-app) | `tarot` | Rp 15.000 |
| Life Path report | `lifepath` | Rp 79.000 |
| Destiny Path (talent number) report | `destiny` | Rp 79.000 |
| Paket Kenali Diri (Life Path + Destiny + Soul Urge) | `selfpack` | Rp 149.000 |
| Full numerology report | `numerology` | Rp 249.000 |
| Add-on: Soul Urge & Personality | `soul` | Rp 29.000 |
| Add-on: Personal Year forecast | `year` | Rp 29.000 |

Add-ons can only be bought with a main report, and an add-on already included in a bundle is dropped from the cart so nobody pays twice. Ads should point at the main reports and bundles; the add-ons raise the order value at checkout.

## Payments (Midtrans)

The buyer picks the payment method on our page before the Midtrans window opens, and the window then shows only that method:

| Method | Service fee paid by the buyer |
|---|---|
| QRIS (all e-wallets and m-banking) | none: Bank Indonesia does not allow passing the QRIS MDR to buyers |
| GoPay / ShopeePay | 2%, grossed up so you still receive the full product price |
| Virtual Account (BCA, BNI, BRI, Mandiri, Permata, CIMB) | Rp 4.000 |

Adjust `feePct` / `feeFlat` in `lib/catalog.js` to match your Midtrans contract. The tarot reading keeps all methods with no fee.

The order number carries the cart and the method (for example `HS-LPT.THN-V-LZ3K9A-1F2E3D`), so the server recomputes the exact total when it checks a payment, without a database. A payment whose amount does not match is never treated as paid.

How the flow avoids lost or failed payments:

1. Prices and transactions are created on the server (`/api/create-payment`). The browser cannot change the price.
2. Payment status is always read from Midtrans by the server (`/api/payment-status`). Browser callbacks only trigger a check. The page polls every 3 seconds and keeps retrying on network errors.
3. The unpaid order is saved in the browser. When the buyer switches to an e-wallet or banking app and comes back (Midtrans redirects to the site with `?order_id=`), the check resumes on the same order. No double charge.
4. If the Snap popup cannot load, the buyer is sent to the hosted Midtrans payment page.
5. The webhook (`/api/midtrans-notification`) verifies the SHA-512 signature and re-checks the status with Midtrans. The app does not depend on it to unlock.

## Meta Pixel and Conversions API

Ads must optimise for people who actually pay, not for people who only open checkout.

- The browser Pixel (`js/tracking.js`) sends only PageView, ViewContent and InitiateCheckout. It never sends Purchase.
- **Purchase is sent from the server through the Conversions API (`lib/meta.js`), only after Midtrans confirms the payment** (`settlement`, amount matching). It fires from the webhook (works even if the buyer closed the browser) and from the status check as a backup. Both use the order number as `event_id`, so Meta counts it once.
- Matching data (hashed email and phone, IP, user agent, `_fbp`/`_fbc` cookies) is stored in the Midtrans custom fields 1 and 3 at checkout, since there is no database. Field 2 keeps the buyer's name, birth date and WhatsApp for the report.
- In Ads Manager, optimise campaigns for the **Purchase** event.

Set `META_PIXEL_ID` and `META_CAPI_TOKEN` (see `.env.example`). Without them the site works normally and sends nothing to Meta. Use `META_TEST_EVENT_CODE` to watch events in Events Manager → Test events before running ads.

### Setup

1. Create a Midtrans account at https://dashboard.midtrans.com and copy the **Sandbox** Server Key and Client Key (Settings → Access Keys).
2. Deploy this repository to Vercel (static files plus the `api/` functions; no build step).
3. In Vercel → Settings → Environment Variables, set the values from `.env.example` (Midtrans keys, and the Meta Pixel ID and Conversions API token).
4. In the Midtrans dashboard → Settings → Payment, set:
   - Payment Notification URL: `https://<your-domain>/api/midtrans-notification`
   - Finish / Unfinish / Error Redirect URL: `https://<your-domain>/`
5. Test with the Midtrans sandbox simulator (QRIS, GoPay, VA). When everything works and Midtrans has approved your production account, switch to the Production keys and set `MIDTRANS_IS_PRODUCTION=true`.

### Local development and tests

```bash
cp .env.example .env   # fill in sandbox keys
npm run dev            # http://localhost:3000, runs the api/ functions too
npm test               # payment logic against a fake Midtrans (no network, no money)
```

`window.HS_PAYMENT_MODE = 'demo'` turns on a clearly labelled simulation with no real payment; it is used only for the claude.ai demo.

## Numerology PDF report

After a numerology order is paid, generate the buyer's report with one command:

```bash
npm run report -- --name "Arianita Dewi" --date 1977-02-22 --time 14:00 --city Semarang
# → reports/numerology-arianita-dewi-1977-02-22.pdf (and .html)

# One report per order: pass the product keys from the order (same keys as lib/catalog.js)
npm run report -- --name "Arianita Dewi" --date 1977-02-22 --products lifepath,year
```

`--products` picks the chapters: `lifepath` (Life Path, career, love), `destiny` (talent number and how it combines with Life Path, career), `soul` (Soul Urge, Personality, Birthday), `year` (Personal Year with monthly themes), `selfpack`, and `numerology` (everything, the default). Chapter numbers follow what is included.

The report is 10 A4 pages in plain Indonesian: number map, Life Path, Destiny (talent) and how the two combine, Soul Urge / Personality / Birthday numbers, career and money, love and compatible numbers, the Personal Year with a month-by-month table plus a look at next year, a bonus page with zodiac sign and Javanese weton, and a closing page with an affirmation. `--year` sets the forecast year (default: this year). Birth time and city appear on the cover and bonus page; they are not used in the numerology math.

PDF output needs Playwright (Chromium). Without it the script still writes the HTML, which can be printed to PDF from Chrome. Text for every number lives in `report/content.js`; layout is in `report/report.css`.

## Structure

```
index.html      page layout and the question dialog
css/style.css   visuals: cards, animations, responsive layout
js/cards.js     data for all 78 cards (Rider–Waite–Smith) in Indonesian
js/scenarios.js question scenarios (what is actually being asked)
js/engine.js    Master Tarot rule engine: links the question to the cards
js/numerology.js free numerology reading (plain-language meanings) and the PDF report offer
js/payment.js   payment dialog and status checks (Midtrans Snap)
js/tracking.js  Meta Pixel in the browser (never sends Purchase)
lib/catalog.js  products, prices, service fees, order number format
lib/meta.js     Meta Conversions API: Purchase after confirmed payment
api/            serverless functions: config, create-payment, payment-status, midtrans-notification
lib/midtrans.js prices, Midtrans API calls, signature check
report/         numerology PDF report: text per number (content.js), print styles, fonts
scripts/make-report.js  builds the numerology PDF report for one buyer
scripts/        local dev server, fake Midtrans, payment tests
js/app.js       flow: shuffle → spread → pick → open → ask → link
```

> Tarot is a tool for reflection. It is not a substitute for medical, financial or legal advice.
