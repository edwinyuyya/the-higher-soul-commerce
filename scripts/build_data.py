#!/usr/bin/env python3
"""Bangun data/ayat.json dari Alkitab Yang Terbuka (AYT), khusus Mazmur dan Amsal.

Sumber: korpus eBible.org di https://github.com/BibleNLP/ebible
(corpus/ind-indayt.txt, satu ayat per baris, sejajar dengan metadata/vref.txt).

Pembersihan:
- Judul Mazmur ("Nyanyian Daud.", "Kepada pemimpin pujian: ...") dan kata "Sela" dibuang.
- Penanda penomoran Ibrani seperti "(3-2)" dibuang.
- Ayat dalam kurung siku (tidak ada di naskah tertua) tidak dipakai.
- Tanda kutip yang terbuka/tertutup di ayat lain dirapikan.
- Ayat yang kalimatnya berlanjut digabung (mis. "Amsal 3:5-6") supaya yang
  tampil selalu kalimat utuh.

Pemakaian:
    python3 scripts/build_data.py [--cache DIR] [--out data/ayat.json]
"""
import argparse
import os
import re
import urllib.request

import json

SOURCE = "https://raw.githubusercontent.com/BibleNLP/ebible/main"
FILES = {"text": "corpus/ind-indayt.txt", "vref": "metadata/vref.txt"}

# Kode kitab (USFM) -> nama dalam AYT. Urutan ini juga urutan kanon.
BOOKS = [
    ("GEN", "Kejadian"), ("EXO", "Keluaran"), ("LEV", "Imamat"), ("NUM", "Bilangan"),
    ("DEU", "Ulangan"), ("JOS", "Yosua"), ("JDG", "Hakim-Hakim"), ("RUT", "Rut"),
    ("1SA", "1 Samuel"), ("2SA", "2 Samuel"), ("1KI", "1 Raja-Raja"), ("2KI", "2 Raja-Raja"),
    ("1CH", "1 Tawarikh"), ("2CH", "2 Tawarikh"), ("EZR", "Ezra"), ("NEH", "Nehemia"),
    ("EST", "Ester"), ("JOB", "Ayub"), ("PSA", "Mazmur"), ("PRO", "Amsal"),
    ("ECC", "Pengkhotbah"), ("SNG", "Kidung Agung"), ("ISA", "Yesaya"), ("JER", "Yeremia"),
    ("LAM", "Ratapan"), ("EZK", "Yehezkiel"), ("DAN", "Daniel"), ("HOS", "Hosea"),
    ("JOL", "Yoel"), ("AMO", "Amos"), ("OBA", "Obaja"), ("JON", "Yunus"), ("MIC", "Mikha"),
    ("NAM", "Nahum"), ("HAB", "Habakuk"), ("ZEP", "Zefanya"), ("HAG", "Hagai"),
    ("ZEC", "Zakharia"), ("MAL", "Maleakhi"),
    ("MAT", "Matius"), ("MRK", "Markus"), ("LUK", "Lukas"), ("JHN", "Yohanes"),
    ("ACT", "Kisah Para Rasul"), ("ROM", "Roma"), ("1CO", "1 Korintus"), ("2CO", "2 Korintus"),
    ("GAL", "Galatia"), ("EPH", "Efesus"), ("PHP", "Filipi"), ("COL", "Kolose"),
    ("1TH", "1 Tesalonika"), ("2TH", "2 Tesalonika"), ("1TI", "1 Timotius"),
    ("2TI", "2 Timotius"), ("TIT", "Titus"), ("PHM", "Filemon"), ("HEB", "Ibrani"),
    ("JAS", "Yakobus"), ("1PE", "1 Petrus"), ("2PE", "2 Petrus"), ("1JN", "1 Yohanes"),
    ("2JN", "2 Yohanes"), ("3JN", "3 Yohanes"), ("JUD", "Yudas"), ("REV", "Wahyu"),
]

# Kitab yang dipakai seluruhnya.
FULL_BOOKS = {"PSA", "PRO"}

# Ayat pilihan yang populer dan menguatkan dari kitab lain.
POPULAR = """
GEN 1:1 GEN 1:27 GEN 28:15 GEN 50:20
EXO 14:14 EXO 15:2 EXO 33:14
NUM 6:24-26
DEU 6:5 DEU 31:6 DEU 31:8
JOS 1:9 JOS 24:15
1SA 16:7
1CH 16:11 1CH 16:34
2CH 7:14
NEH 8:10
JOB 19:25 JOB 42:2
ECC 3:1 ECC 3:11
ISA 9:6 ISA 26:3 ISA 30:15 ISA 40:8 ISA 40:29 ISA 40:31 ISA 41:10 ISA 41:13 ISA 43:2
ISA 43:18-19 ISA 53:5 ISA 54:10 ISA 55:8-9 ISA 58:11
JER 17:7 JER 29:11 JER 29:12-13 JER 31:3 JER 32:17 JER 33:3
LAM 3:22-23 LAM 3:25
EZK 36:26
MIC 6:8 MIC 7:7
NAM 1:7
HAB 3:17-18
ZEP 3:17
ZEC 4:6
MAL 3:10
MAT 5:3-10 MAT 5:14 MAT 5:16 MAT 6:26 MAT 6:33 MAT 6:34 MAT 7:7 MAT 11:28-30 MAT 17:20
MAT 18:20 MAT 19:26 MAT 22:37-39 MAT 28:20
MRK 9:23 MRK 10:27 MRK 11:24 MRK 12:30-31
LUK 1:37 LUK 6:31 LUK 6:38
JHN 1:12 JHN 3:16 JHN 8:12 JHN 8:32 JHN 10:10 JHN 10:11 JHN 11:25 JHN 13:34-35 JHN 14:1
JHN 14:6 JHN 14:27 JHN 15:5 JHN 15:13 JHN 16:33
ACT 1:8 ACT 16:31
ROM 5:8 ROM 6:23 ROM 8:1 ROM 8:18 ROM 8:28 ROM 8:31 ROM 8:38-39 ROM 10:9 ROM 12:2 ROM 12:12
ROM 15:13
1CO 10:13 1CO 13:4-7 1CO 13:13 1CO 15:58 1CO 16:14
2CO 4:16-18 2CO 5:7 2CO 5:17 2CO 12:9
GAL 2:20 GAL 5:22-23 GAL 6:9
EPH 2:8-10 EPH 3:20 EPH 4:32 EPH 6:10
PHP 1:6 PHP 3:13-14 PHP 4:6-7 PHP 4:8 PHP 4:13 PHP 4:19
COL 3:2 COL 3:23
1TH 5:16-18
2TI 1:7 2TI 3:16
HEB 4:16 HEB 11:1 HEB 12:1-2 HEB 13:5 HEB 13:8
JAS 1:2-3 JAS 1:5 JAS 1:12 JAS 4:8
1PE 2:9 1PE 5:7
1JN 1:9 1JN 4:16 1JN 4:18 1JN 4:19
REV 3:20 REV 21:4
"""


def parse_popular():
    refs = []
    for item in POPULAR.split():
        if ":" not in item:
            book = item
            continue
        chapter, verses = item.split(":")
        first, _, last = verses.partition("-")
        refs.append((book, int(chapter), int(first), int(last or first)))
    return refs

MAX_VERSES_PER_UNIT = 4
MAX_UNIT_CHARS = 600

HEBREW_NUMBER = re.compile(r"\(\d+-\d+\)\s*")
PSALM_TITLE = re.compile(
    r"^(?:(?:Kepada pemimpin pujian|Untuk pemimpin pujian|Nyanyian|Mazmur|Doa|Pengajaran|"
    r"Miktam|Maskil|Syair|Ratapan|Pujian|Untuk peringatan|Dengan )[^.:]*[.:]\s*)+"
)
SENTENCE_END = re.compile(r"[.!?][”’)\"]*$")
QUOTE_PAIRS = {"“": "”", "‘": "’"}


def download(cache, name):
    path = os.path.join(cache, os.path.basename(FILES[name]))
    if not os.path.exists(path):
        urllib.request.urlretrieve(f"{SOURCE}/{FILES[name]}", path)
    with open(path, encoding="utf-8") as f:
        return f.read().split("\n")


def balance_quotes(text):
    """Beri pembuka untuk kutip penutup yang yatim; tutup kutip yang masih terbuka di akhir."""
    out, stack, prefix = [], [], ""
    closing = {v: k for k, v in QUOTE_PAIRS.items()}
    for ch in text:
        if ch in QUOTE_PAIRS:
            stack.append(ch)
        elif ch in closing:
            if not stack:
                prefix = closing[ch] + prefix  # kutipan dimulai di ayat sebelumnya
            elif stack[-1] != closing[ch]:
                continue
            else:
                stack.pop()
        out.append(ch)
    text = prefix + "".join(out).strip()
    for opener in reversed(stack):
        if text.endswith(opener):
            text = text[:-1].rstrip()
        else:
            text += QUOTE_PAIRS[opener]
    return text


def clean(book, verse, text):
    if not text or "[" in text or "]" in text:
        return None
    if book == "PSA" and verse == 1:
        parts = HEBREW_NUMBER.split(text)
        text = parts[-1]  # judul mazmur ada sebelum penanda nomor terakhir
        text = PSALM_TITLE.sub("", text)
    text = HEBREW_NUMBER.sub("", text)
    if book == "PSA":
        text = re.sub(r"\s+Sela\.?$", "", text)
    text = re.sub(r"\s+", " ", text).strip()
    return text or None


def main():
    here = os.path.dirname(os.path.abspath(__file__))
    ap = argparse.ArgumentParser()
    ap.add_argument("--cache", default=os.path.join(here, ".cache-ayt"))
    ap.add_argument("--out", default=os.path.join(here, "..", "data", "ayat.json"))
    args = ap.parse_args()

    os.makedirs(args.cache, exist_ok=True)
    texts, vrefs = download(args.cache, "text"), download(args.cache, "vref")
    names = dict(BOOKS)
    popular = parse_popular()
    wanted = FULL_BOOKS | {b for b, *_ in popular}
    used = [code for code, _ in BOOKS if code in wanted]  # urutan kanon
    index = {code: i for i, code in enumerate(used)}

    def is_popular(book, chapter, first, last):
        return any(b == book and c == chapter and f <= last and first <= l for b, c, f, l in popular)

    # kelompokkan ayat per (kitab, pasal), sesuai urutan
    chapters = {}
    for ref, text in zip(vrefs, texts):
        if not ref.strip():
            continue
        book, loc = ref.split(" ")
        if book not in index:
            continue  # kitab lain (dan deuterokanonika) tidak dipakai
        chapter, verse = map(int, loc.split(":"))
        chapters.setdefault((book, chapter), []).append((verse, clean(book, verse, text.strip())))

    units, kept, dropped = [], 0, 0
    for (book, chapter), verses in chapters.items():
        pending = []
        for verse, text in verses:
            if text is None and not pending:
                continue  # ayat kosong di antara unit
            pending.append((verse, text))
            if text is not None and not SENTENCE_END.search(text):
                continue  # kalimat berlanjut ke ayat berikutnya
            joined = " ".join(t for _, t in pending) if all(t for _, t in pending) else ""
            joined = balance_quotes(joined) if joined else ""
            ok = (
                bool(joined)
                and len(pending) <= MAX_VERSES_PER_UNIT
                and len(joined) <= MAX_UNIT_CHARS
                and (joined[0].isupper() or joined[0] in "“‘")
            )
            if ok and (book in FULL_BOOKS or is_popular(book, chapter, pending[0][0], pending[-1][0])):
                units.append([index[book], chapter, pending[0][0], pending[-1][0], joined])
                kept += 1
            elif not ok and (book in FULL_BOOKS or is_popular(book, chapter, pending[0][0], pending[-1][0])):
                dropped += 1
            pending = []

    # tempelkan penjelasan ayat pilihan (scripts/penjelasan.json) sebagai elemen ke-6
    with open(os.path.join(here, "penjelasan.json"), encoding="utf-8") as f:
        notes = json.load(f)
    used_notes = set()
    for u in units:
        key = f"{names[used[u[0]]]} {u[1]}:{u[2]}" + (f"-{u[3]}" if u[3] != u[2] else "")
        if key in notes:
            u.append(notes[key])
            used_notes.add(key)
        elif used[u[0]] not in FULL_BOOKS:
            print(f"PERINGATAN: belum ada penjelasan untuk {key}")
    for key in sorted(set(notes) - used_notes):
        print(f"PERINGATAN: penjelasan {key} tidak cocok dengan ayat mana pun")

    # pastikan setiap ayat pilihan benar-benar masuk
    for b, c, f, l in popular:
        if not any(used[u[0]] == b and u[1] == c and u[2] <= l and f <= u[3] for u in units):
            print(f"PERINGATAN: {b} {c}:{f}-{l} tidak masuk")

    out = {
        "terjemahan": "Alkitab Yang Terbuka (AYT)",
        "singkatan": "AYT",
        "kitab": [{"nama": names[code]} for code in used],
        "ayat": units,
    }
    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
    print(f"diambil {kept}, dibuang {dropped} -> {args.out}")


if __name__ == "__main__":
    main()
