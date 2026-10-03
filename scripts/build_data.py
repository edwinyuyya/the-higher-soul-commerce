#!/usr/bin/env python3
"""Bangun data/ayat.json dari Alkitab Terjemahan Sederhana Indonesia (TSI).

Sumber: https://github.com/wldeh/bible-api (bibles/id-tsi), diunduh per pasal.
Data sumber punya dua cacat yang dibersihkan di sini:

1. Catatan kaki ikut tercampur di teks ayat ("...Allah3:3 Mrk. 4:11 kalau...").
   Rujukan silang dihapus; ayat yang masih berisi catatan penjelasan dibuang.
2. Baris puisi (\\q2 dst.) hilang, sehingga ayat puisi hanya berisi baris
   pertamanya. Amsal (hampir seluruhnya puisi) tidak dipakai, dan gabungan
   ayat yang menunjukkan pola terpotong dibuang.

Ayat yang kalimatnya berlanjut ke ayat berikutnya digabung menjadi satu unit
(mis. "Kejadian 1:1-2") supaya yang tampil selalu kalimat utuh.

Pemakaian:
    python3 scripts/build_data.py [--cache DIR] [--ref TB_JSON]

--ref (opsional) adalah file JSON teks TB berformat
{"Kitab": {"chapter": [["ayat1", ...], ...]}} yang HANYA dipakai untuk
membandingkan panjang ayat (mendeteksi ayat yang terpotong); teks TB tidak
pernah ditulis ke output.
"""
import argparse
import concurrent.futures as cf
import json
import os
import re
import statistics
import urllib.error
import urllib.request

SOURCE = "https://raw.githubusercontent.com/wldeh/bible-api/main/bibles/id-tsi/books"

# (slug di sumber, nama tampilan). Kitab PL lain belum tersedia di TSI.
BOOKS = [
    ("kejadian", "Kejadian"), ("keluaran", "Keluaran"), ("ulangan", "Ulangan"),
    ("rut", "Rut"), ("1samuel", "1 Samuel"), ("2samuel", "2 Samuel"),
    ("ezra", "Ezra"), ("nehemia", "Nehemia"), ("ester", "Ester"),
    ("pengkhotbah", "Pengkhotbah"), ("yunus", "Yunus"),
    ("matius", "Matius"), ("markus", "Markus"), ("lukas", "Lukas"),
    ("yohanes", "Yohanes"), ("kisah", "Kisah Para Rasul"), ("roma", "Roma"),
    ("1korintus", "1 Korintus"), ("2korintus", "2 Korintus"),
    ("galatia", "Galatia"), ("efesus", "Efesus"), ("filipi", "Filipi"),
    ("kolose", "Kolose"), ("1tesalonika", "1 Tesalonika"),
    ("2tesalonika", "2 Tesalonika"), ("1timotius", "1 Timotius"),
    ("2timotius", "2 Timotius"), ("titus", "Titus"), ("filemon", "Filemon"),
    ("ibrani", "Ibrani"), ("yakobus", "Yakobus"), ("1petrus", "1 Petrus"),
    ("2petrus", "2 Petrus"), ("1yohanes", "1 Yohanes"),
    ("2yohanes", "2 Yohanes"), ("3yohanes", "3 Yohanes"), ("yudas", "Yudas"),
    ("wahyu", "Wahyu"),
]
OLD_TESTAMENT = {"kejadian", "keluaran", "ulangan", "rut", "1samuel", "2samuel",
                 "ezra", "nehemia", "ester", "pengkhotbah", "yunus"}

MAX_VERSES_PER_UNIT = 4
MAX_UNIT_CHARS = 600
MIN_RELATIVE_LENGTH = 0.45  # terhadap median rasio TSI/TB kitab itu
MIN_LENGTH_AFTER_CUT = 0.85

NUM = r"\d+[a-z]?"
LOC = rf"{NUM}:{NUM}(?:-{NUM})?"
REF = r"(?:[1-3] ?)?[A-Z][a-z]{1,5}\.? ?\d+(?::\d+(?:[-–]\d+)?(?:, ?\d+(?:[-–]\d+)?)*)?(?: ?LXX)?"
REFS = rf"{REF}(?:[;,] ?(?:{REF}|\d+(?::\d+)?(?:[-–]\d+)?))*\.?"
XREF_NOTE = re.compile(rf"(?<=[^\s\d]){LOC} {REFS}(?=\s|$)")
ANY_NOTE = re.compile(rf"(?<=[^\s\d]){LOC}(?=\s|$)")
SENTENCE_END = re.compile(r"[.!?][”’)\"]*$")


def fetch_chapter(cache, slug, chapter):
    path = os.path.join(cache, f"{slug}-{chapter}.json")
    if os.path.exists(path):
        with open(path) as f:
            return json.load(f)
    url = f"{SOURCE}/{slug}/chapters/{chapter}.json"
    for _ in range(4):
        try:
            with urllib.request.urlopen(url, timeout=60) as r:
                data = json.load(r)
            break
        except urllib.error.HTTPError as e:
            if e.code == 404:
                return None
        except OSError:
            pass
    else:
        raise SystemExit(f"Gagal mengunduh {url}")
    with open(path, "w") as f:
        json.dump(data, f, ensure_ascii=False)
    return data


def fetch_book(cache, slug):
    chapters = []
    while (data := fetch_chapter(cache, slug, len(chapters) + 1)) is not None:
        chapters.append(data["data"])
    return chapters


def tidy(t):
    t = re.sub(r"\s+", " ", t).strip()
    return re.sub(r"\s+([,.;:!?”’])", r"\1", t)


def clean(text):
    """Teks ayat tanpa catatan kaki, atau None kalau tidak bisa dibersihkan."""
    t = tidy(XREF_NOTE.sub("", text.strip()))
    return None if not t or ANY_NOTE.search(t) else t


def clean_with_reference(text, ref, chapter, label):
    """Seperti clean(), tapi catatan penjelasan sesudah akhir kalimat boleh dipotong
    kalau panjang sisanya wajar dibanding TB (artinya catatan itu memang di akhir ayat)."""
    t = clean(text)
    if t is not None:
        return t
    t = tidy(XREF_NOTE.sub("", text.strip()))
    m = ANY_NOTE.search(t)
    head = t[: m.start()].strip() if m else ""
    if head and SENTENCE_END.search(head) and not ANY_NOTE.search(head):
        r = ref.relative(head, chapter, label)
        if r is not None and r >= MIN_LENGTH_AFTER_CUT:
            return head
    return None


def verse_range(label):
    a, _, z = label.partition("-")
    return re.sub("[a-z]", "", a), re.sub("[a-z]", "", z or a)


def looks_truncated(texts):
    """Baris yang tidak selesai lalu disusul ayat berhuruf kapital = baris puisi hilang."""
    return any(
        not re.search(r"[,;:—–-]$", cur) and not SENTENCE_END.search(cur) and nxt[:1].isupper()
        or cur.endswith((",", ":")) and nxt[:1].isupper() and not nxt.split()[0].isupper()
        for cur, nxt in zip(texts, texts[1:])
    )


class Reference:
    """Panjang ayat TB untuk satu kitab, dipakai sebagai pembanding panjang TSI."""

    def __init__(self, ref_book, chapters):
        self.book = ref_book["chapter"] if ref_book else []
        ratios = []
        for ch in chapters:
            for v in ch:
                t, n = clean(v["text"]), self.length(int(v["chapter"]), v["verse"])
                if t and n:
                    ratios.append(len(t) / n)
        self.median = statistics.median(ratios) if ratios else None

    def length(self, chapter, label):
        if chapter > len(self.book):
            return 0
        verses = self.book[chapter - 1]
        a, z = verse_range(label)
        return sum(len(verses[i - 1]) for i in range(int(a), int(z) + 1) if i <= len(verses))

    def relative(self, text, chapter, label):
        """Rasio panjang TSI/TB dibanding median kitab, atau None kalau tak ada data."""
        n = self.length(chapter, label)
        if not self.median or not n:
            return None
        return len(text) / n / self.median


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    ap = argparse.ArgumentParser()
    ap.add_argument("--cache", default=os.path.join(here, ".cache-tsi"))
    ap.add_argument("--ref", help="JSON teks TB untuk pembanding panjang (opsional)")
    ap.add_argument("--out", default=os.path.join(here, "..", "data", "ayat.json"))
    args = ap.parse_args()

    os.makedirs(args.cache, exist_ok=True)
    with cf.ThreadPoolExecutor(16) as ex:
        raw = dict(zip([s for s, _ in BOOKS], ex.map(lambda s: fetch_book(args.cache, s), [s for s, _ in BOOKS])))
    ref = {}
    if args.ref:
        with open(args.ref) as f:
            ref = {k.strip(): v for k, v in json.load(f).items()}

    books, units, stats = [], [], {"diambil": 0, "dibuang": 0}
    for slug, name in BOOKS:
        chapters = raw[slug]
        reference = Reference(ref.get(name), chapters)
        books.append({"nama": name, "pl": slug in OLD_TESTAMENT})
        for ch in chapters:
            c = int(ch[0]["chapter"])
            pending = []
            for v in ch:
                t = clean_with_reference(v["text"], reference, c, v["verse"])
                pending.append((v["verse"], t))
                if t is not None and not SENTENCE_END.search(t):
                    continue  # kalimat berlanjut ke ayat berikutnya
                texts = [x for _, x in pending]
                text = " ".join(texts) if all(texts) else ""
                low = [r for label, x in pending if x and (r := reference.relative(x, c, label)) is not None]
                ok = (
                    bool(text)
                    and len(pending) <= MAX_VERSES_PER_UNIT
                    and len(text) <= MAX_UNIT_CHARS
                    and (text[0].isupper() or text[0] in "“‘\"")
                    and not looks_truncated(texts)
                    and not any(r < MIN_RELATIVE_LENGTH for r in low)
                )
                if ok:
                    first, _ = verse_range(pending[0][0])
                    _, last = verse_range(pending[-1][0])
                    units.append([len(books) - 1, c, int(first), int(last), text])
                    stats["diambil"] += 1
                else:
                    stats["dibuang"] += 1
                pending = []

    out = {
        "terjemahan": "Alkitab Terjemahan Sederhana Indonesia (TSI), Edisi Ketiga",
        "singkatan": "TSI",
        "kitab": books,
        "ayat": units,
    }
    os.makedirs(os.path.dirname(args.out), exist_ok=True)
    with open(args.out, "w") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
    print(f"{stats} -> {args.out}")


if __name__ == "__main__":
    main()
