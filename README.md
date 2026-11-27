# The Higher Soul

Next.js site for The Higher Soul Blueprint, rebuilt from the deployment that was live on Vercel (its source had never been committed). It sells personal reports by bank transfer. The tarot reader at `/tarot` is sold on its own for Rp29.000 and included in the Paket Lengkap.

## Pages

- `/`: landing page with the products, the free tarot band, sample report, how it works and FAQ.
- `/order?items=complete` (or `lifepath`, `destiny`, `numerology`, `humandesign`, comma separated): pick reports, fill in birth data, then get the transfer details and a WhatsApp button with the order filled in.
- `/tarot`: tarot reader, a static site in `public/tarot/`, open only with a personal link. Every order that includes Tarot Master or the Paket Lengkap puts a link like `/tarot?akses=HS-XXXXXX.<signature>` in the Telegram alert; forward it to the buyer once the transfer is confirmed. The link sets a cookie for a year. Without it, visitors land on `/bonus-tarot`, which offers the tarot or the package. Links are signed with `TAROT_SECRET`, falling back to `TELEGRAM_BOT_TOKEN`; changing either one invalidates links already sent.
- `/admin`: order list. Mark transfers as paid and upload the PDF to email it to the buyer.

## Prices, bank account, WhatsApp

All in `src/lib/products.js`. Currently Life Path Rp29.000, Destiny Path Rp29.000, Numerologi Lengkap Rp99.000 (includes Life Path and Destiny Path), Human Design Rp79.000, Tarot Master Rp29.000, and Paket Lengkap Rp150.000 (Numerologi Lengkap, Human Design and Tarot Master, worth Rp207.000). A Tarot Master order on its own asks only for name and WhatsApp. Each order adds a random 3-digit code to the total so transfers can be told apart.

## Environment variables (Vercel)

Same names as the previous deployment:

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`: orders are saved to the `orders` table. If the database is unreachable the buyer can still pay; the order details go out by WhatsApp and Telegram.
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`: new-order notification.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`: emailing the PDF from `/admin`.
- `ADMIN_PASSWORD`: password for `/admin`.
- `TAROT_SECRET` (optional): signs the bonus tarot links. Without it the Telegram bot token is used.

Run `supabase/add-product-columns.sql` once in the Supabase SQL editor so the order table stores the items, order code, and birth time and place. Before that, orders are still saved, with the items written into `amount_display`.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run report -- --name "Nama Lengkap" --date 1990-08-17   # numerology PDF, see tools/
```

`tools/` holds the numerology PDF generator; `tools/TAROT-README.md` describes the tarot engine.
