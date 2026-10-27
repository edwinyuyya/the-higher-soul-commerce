# The Higher Soul

Next.js site for The Higher Soul Blueprint, rebuilt from the deployment that was live on Vercel (its source had never been committed). It sells personal reports by bank transfer, and a free tarot reading at `/tarot` brings visitors in.

## Pages

- `/`: landing page with the products, the free tarot band, sample report, how it works and FAQ.
- `/order?items=complete` (or `lifepath`, `destiny`, `numerology`, `humandesign`, comma separated): pick reports, fill in birth data, then get the transfer details and a WhatsApp button with the order filled in.
- `/tarot`: free tarot reader, a static site in `public/tarot/`. Its offer cards read prices from `/api/products` and link to `/order`.
- `/admin`: order list. Mark transfers as paid and upload the PDF to email it to the buyer.

## Prices, bank account, WhatsApp

All in `src/lib/products.js`. Currently Life Path Rp29.000, Destiny Path Rp29.000, Numerologi Lengkap Rp59.000, Human Design Rp79.000, and Paket Lengkap (all four) Rp150.000. Each order adds a random 3-digit code to the total so transfers can be told apart.

## Environment variables (Vercel)

Same names as the previous deployment:

- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`: orders are saved to the `orders` table. If the database is unreachable the buyer can still pay; the order details go out by WhatsApp and Telegram.
- `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`: new-order notification.
- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`: emailing the PDF from `/admin`.
- `ADMIN_PASSWORD`: password for `/admin`.

Run `supabase/add-product-columns.sql` once in the Supabase SQL editor so the order table stores the items, order code, and birth time and place. Before that, orders are still saved, with the items written into `amount_display`.

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run report -- --name "Nama Lengkap" --date 1990-08-17   # numerology PDF, see tools/
```

`tools/` holds the numerology PDF generator; `tools/TAROT-README.md` describes the tarot engine.
