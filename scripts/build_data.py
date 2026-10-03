#!/usr/bin/env python3
"""Bangun data/ayat.json dari Alkitab Yang Terbuka (AYT).

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
NEW_TESTAMENT_START = 39

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
    index = {code: i for i, (code, _) in enumerate(BOOKS)}

    # kelompokkan ayat per (kitab, pasal), sesuai urutan
    chapters = {}
    for ref, text in zip(vrefs, texts):
        if not ref.strip():
            continue
        book, loc = ref.split(" ")
        if book not in index:
            continue  # deuterokanonika tidak ada di AYT
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
            if ok:
                units.append([index[book], chapter, pending[0][0], pending[-1][0], joined])
                kept += 1
            else:
                dropped += 1
            pending = []

    out = {
        "terjemahan": "Alkitab Yang Terbuka (AYT)",
        "singkatan": "AYT",
        "kitab": [{"nama": name, "pl": i < NEW_TESTAMENT_START} for i, (_, name) in enumerate(BOOKS)],
        "ayat": units,
    }
    os.makedirs(os.path.dirname(os.path.abspath(args.out)), exist_ok=True)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, separators=(",", ":"))
    print(f"diambil {kept}, dibuang {dropped} -> {args.out}")


if __name__ == "__main__":
    main()
