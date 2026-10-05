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

## Structure

```
index.html      page layout and the question dialog
css/style.css   visuals: cards, animations, responsive layout
js/cards.js     data for all 78 cards (Rider–Waite–Smith) in Indonesian
js/scenarios.js question scenarios (what is actually being asked)
js/engine.js    Master Tarot rule engine: links the question to the cards
js/app.js       flow: shuffle → spread → pick → open → ask → link
```

> Tarot is a tool for reflection. It is not a substitute for medical, financial or legal advice.
