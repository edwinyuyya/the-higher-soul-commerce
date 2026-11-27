---
name: higher-soul-style
description: House style for The Higher Soul — Indonesian copy, typography, colour and layout rules, plus a list of "looks AI-made" patterns to avoid. Use whenever writing or changing any user-facing text, page, component, CSS, PDF report, Instagram caption or WhatsApp/Telegram message in this repo.
---

# The Higher Soul — house style

The owner's complaint: everything Claude builds looks and reads the same, and buyers can tell it was made by AI. The goal of this guide is work that feels written and designed by one particular person with taste, for Indonesian women and men who are curious about themselves, not by a template.

Before shipping any user-facing change, run the **checklist at the bottom** against the diff.

## 1. Voice (Bahasa Indonesia)

Write like a warm, slightly old-fashioned friend who reads numerology at the kitchen table, not like a marketing deck.

- **Short, plain sentences.** One idea per sentence. Everyday words: *rezeki, jodoh, kerja, capek, ngerasa* are fine; *transformasi, potensi maksimal, perjalanan spiritual, energi semesta* are not.
- **Concrete over abstract.** "Kamu sering jadi tempat curhat teman" beats "Kamu memiliki empati yang tinggi".
- **Address the reader as *kamu*.** Never *Anda*. Never "kita semua".
- **Say the thing once.** No restating the heading in the first sentence. No summary sentence at the end of a paragraph.
- **Honest claims only.** Numerology is a tool for reflection, not prediction. Never promise outcomes ("pasti dapat jodoh", "rezeki melimpah").
- Prices: `Rp29.000` or `29rb` in casual copy, never `IDR` or `Rp 29.000,-`.

### Banned in copy (these are the giveaways)

| Pattern | Example to avoid | Write instead |
|---|---|---|
| Em dash `—` as a pause | "Jawabannya sudah ada — sejak kamu lahir." | Full stop or comma. Use `—` only in price ranges or never. |
| "Bukan X, melainkan Y" / "bukan sekadar" | "Bukan template umum, melainkan…" | Just say what it is. |
| Groups of three adjectives | "tegas, ambisius, dan pandai mengatur" | Pick the one that matters, show it with an example. |
| Rhetorical opener + reassurance | "Pernah merasa…? Kamu tidak sendirian." | Start with a specific situation the reader recognises. |
| Hype words | *ungkap, rahasia, luar biasa, sempurna, ajaib, dirancang khusus* | Describe the actual content. |
| Headline with colon or dash | "Bukan Hal Baru — Ilmu Ribuan Tahun" | One plain line: "Numerologi sudah dipakai sejak zaman Pythagoras." |
| Emoji as section icons | 🌾 💼 💞 🔮 ✨ | No emoji in UI. Use typography, numbers, or a single drawn mark. |
| "Mari", "Yuk temukan", "Siap untuk…?" | | A direct verb on the button: "Pesan", "Lihat contoh". |
| Ellipsis for drama | "Pernah Merasa..." | Remove. |
| Title Case in Indonesian headings | "Cara Kerjanya Mudah Sekali" | Sentence case: "Cara pesannya". |

## 2. Typography

Inter, Poppins, Montserrat, Playfair Display and Cormorant paired with a sans are what every generated site uses. Do not add them to new work; migrate away when a page is being redesigned.

- **Body:** `Newsreader` (Google Fonts) at 18px / 1.6, or `Source Serif 4`. A serif body is the main thing that makes the site feel like a printed reading, not an app.
- **Headings:** the same serif, heavier (600) and tighter (`letter-spacing: -0.01em`), sentence case. No second display font.
- **Small labels / prices / numbers:** `IBM Plex Mono` or the serif's tabular figures. Never all-caps letter-spaced eyebrows above every heading ("BLUEPRINT NUMEROLOGI PRIBADI") — at most one per page.
- The tarot reader (`public/tarot`) keeps Cinzel + Lora for now; it is its own world.

## 3. Colour

Avoid the default "mystic" palette of purple gradient + gold glow, and avoid lavender-on-cream; both read as AI.

Use a paper-and-ink palette with one earthy accent:

| Token | Value | Use |
|---|---|---|
| `--paper` | `#F4EFE6` | page background |
| `--paper-2` | `#EAE2D3` | alternate sections, cards |
| `--ink` | `#1F1B16` | text |
| `--ink-soft` | `#5E554A` | secondary text |
| `--accent` | `#8A3B2E` (terracotta) | buttons, links, the one highlight per section |
| `--line` | `#D6CBB8` | rules and borders |

No gradients on buttons or backgrounds. No glow, no `box-shadow` larger than `0 1px 0`. Borders are 1px `--line`.

## 4. Layout

- **Left-aligned text.** Centre only the price on the order page. A fully centred landing page is the most recognisable template.
- **Not everything is a card.** Use rules (`<hr>`), whitespace and numbered lists. Cards only for the products you can click.
- **Vary the rhythm.** Sections should not all be "heading, sub-heading, grid of 3–4 equal boxes". Mix: a single long paragraph, a two-column text + number, a table of prices.
- Rounded corners 4px max. Pills (`border-radius: 999px`) only for small tags, not buttons.
- One photo or hand-drawn element beats ten icons. If there are no real images, use large numerals (the reader's numbers) as the visual.

## 5. PDF reports (`tools/report`)

Same voice rules. Each number's text should mention at least one specific, everyday situation. Avoid repeating the reader's name more than twice per page.

## Checklist before committing user-facing changes

1. `grep -n "—" <changed files>` returns nothing in copy (code comments are fine).
2. No emoji in rendered UI text.
3. No new import of Inter / Poppins / Montserrat / Playfair / Cormorant.
4. No `linear-gradient` or glow `box-shadow` added outside `public/tarot`.
5. Read every new sentence aloud in Indonesian: would a person say it to a friend? If it sounds like an ad, rewrite it.
6. Check the page at 390px wide: headings left-aligned, nothing that looks like a SaaS template.
