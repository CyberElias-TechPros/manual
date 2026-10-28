#!/usr/bin/env python3
"""
CEA Learn — PDF -> app content extractor.

WHY THIS EXISTS (gap fix)
-------------------------
`README.md` Part B (B2/B3/B11/B12) claims that 141 `Session_*.md` files, 141 SVG
concept diagrams, the `cealogo.png` brand anchor and per-course covers already
exist in the repo. They do not: the repository ships only the 48 compiled PDFs.
Phase 2 of the roadmap ("markdown -> app data") therefore has no input.

This tool creates that input. It reads the *Teaching Manual* PDF of every course
and emits:

  content/<course-slug>/session-NN.md   canonical lesson source (sections A..O + frontmatter)
  content/<course-slug>/course.json     course metadata (fee, duration, certificate, audience...)
  assets/covers/<slug>.svg              generated branded course cover
  assets/concepts/<slug>/session-NN.png the session concept diagram, rendered from the PDF vector art
  assets/cealogo.png                    the real logo, extracted at native resolution

The concept diagrams in the PDFs are *vector drawings*, so they are re-rendered at
2x rather than copied. Text inside the diagram is captured too: it becomes the
alt/transcript (accessibility) and the hotspot geometry for the interactive
diagram component (task 6.8).

Usage:
  python3 tools/pdf-extract/extract.py --all
  python3 tools/pdf-extract/extract.py --course Web_Development [--no-images] [--dry-run]

Requires: pymupdf (see requirements.txt)
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import unicodedata
from dataclasses import dataclass, field
from pathlib import Path

try:
    import pymupdf as fitz  # type: ignore
except ImportError:  # pragma: no cover
    try:
        import fitz  # type: ignore
    except ImportError:
        sys.exit("pymupdf is required:  pip install -r tools/pdf-extract/requirements.txt")

ROOT = Path(__file__).resolve().parents[2]
OUT_CONTENT = ROOT / "content"
OUT_ASSETS = ROOT / "assets"
DIAGRAM_SCALE = 2.0
IMG_EXT = ".png"

# ---------------------------------------------------------------------------
# text normalisation
# ---------------------------------------------------------------------------

# The source PDFs were authored through a pipeline that double-encoded UTF-8 as
# cp1252, so real lessons contain mojibake ("â€" for an em dash, "â€™" for a
# right single quote). Task 2.8 of the roadmap lists this as a lint item but
# nobody had fixed it. We repair it on the way in and the linter keeps checking.
_CP1252_REVERSE = {
    "\u20ac": "\x80", "\u201a": "\x82", "\u0192": "\x83", "\u201e": "\x84",
    "\u2026": "\x85", "\u2020": "\x86", "\u2021": "\x87", "\u02c6": "\x88",
    "\u2030": "\x89", "\u0160": "\x8a", "\u2039": "\x8b", "\u0152": "\x8c",
    "\u017d": "\x8e", "\u2018": "\x91", "\u2019": "\x92", "\u201c": "\x93",
    "\u201d": "\x94", "\u2022": "\x95", "\u2013": "\x96", "\u2014": "\x97",
    "\u02dc": "\x98", "\u2122": "\x99", "\u0161": "\x9a", "\u203a": "\x9b",
    "\u0153": "\x9c", "\u017e": "\x9e", "\u0178": "\x9f",
}
_CP1252_REV_ORD = {
    0x20AC: 0x80, 0x201A: 0x82, 0x0192: 0x83, 0x201E: 0x84, 0x2026: 0x85,
    0x2020: 0x86, 0x2021: 0x87, 0x02C6: 0x88, 0x2030: 0x89, 0x0160: 0x8A,
    0x2039: 0x8B, 0x0152: 0x8C, 0x017D: 0x8E, 0x2018: 0x91, 0x2019: 0x92,
    0x201C: 0x93, 0x201D: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97,
    0x02DC: 0x98, 0x2122: 0x99, 0x0161: 0x9A, 0x203A: 0x9B, 0x0153: 0x9C,
    0x017E: 0x9E, 0x0178: 0x9F,
}


# The source PDFs were authored through a pipeline that double-encoded UTF-8 as
# cp1252, so lesson text arrives as "â€”" for an em dash, "â‚¦" for ₦, "â”œ" for ├.
# Task 2.8 lists this as a lint item; this is the actual repair. A plain regex is
# not enough: runs are adjacent ("â”œâ”€"), so the matcher must try the longest
# prefix that is valid UTF-8 and leave the rest for the next iteration.
_MOJI_LEADS = {0x00C2, 0x00C3, 0x00E2, 0x00E3}
_CONT_MAX = 3


def _to_bytes(seg: str) -> bytes | None:
    out = bytearray()
    for ch in seg:
        v = _CP1252_REV_ORD.get(ord(ch), ord(ch))
        if v > 0xFF:
            return None
        out.append(v)
    return bytes(out)


# A few runs in the source PDFs lost their third byte entirely (0xE2 0x95 with
# nothing after it). They cannot be decoded, so they get the closest readable
# character instead of shipping "â•" to a learner's screen.
_UNRECOVERABLE = {
    "\u00e2\u2022": "\u2022",   # bullet that lost its 0x80 byte
    "\u00e2\u0094": "\u2500",   # box drawing, truncated
    "\u00e2\u0095": "\u2502",
    "\u00c3\u00a2": "\u00e2",
}
_C1 = {i: chr(t) for i, t in {
    0x80: 0x20AC, 0x82: 0x201A, 0x83: 0x0192, 0x84: 0x201E, 0x85: 0x2026, 0x86: 0x2020,
    0x87: 0x2021, 0x88: 0x02C6, 0x89: 0x2030, 0x8A: 0x0160, 0x8B: 0x2039, 0x8C: 0x0152,
    0x8E: 0x017D, 0x91: 0x2018, 0x92: 0x2019, 0x93: 0x201C, 0x94: 0x201D, 0x95: 0x2022,
    0x96: 0x2013, 0x97: 0x2014, 0x98: 0x02DC, 0x99: 0x2122, 0x9A: 0x0161, 0x9B: 0x203A,
    0x9C: 0x0153, 0x9E: 0x017E, 0x9F: 0x0178,
}.items()}


def _scrub_leftovers(text: str) -> str:
    for bad, good in _UNRECOVERABLE.items():
        text = text.replace(bad, good)
    text = "".join(_C1.get(ord(ch), ch) for ch in text)
    # an orphan lead char at the end of a line is noise, not content
    return re.sub("[\u00c2\u00c3\u00e2](?=$|[\s,.;:)])", "", text)


def fix_mojibake(text: str) -> str:
    if not any(ord(c) in _MOJI_LEADS for c in text):
        return text
    out: list[str] = []
    i, n = 0, len(text)
    while i < n:
        lead = text[i]
        if ord(lead) not in _MOJI_LEADS:
            out.append(lead)
            i += 1
            continue
        replaced = False
        for take in range(_CONT_MAX + 1, 1, -1):
            seg = text[i:i + take]
            if len(seg) < 2:
                continue
            raw = _to_bytes(seg)
            if raw is None:
                continue
            try:
                fixed = raw.decode("utf-8")
            except UnicodeDecodeError:
                continue
            if len(fixed) < len(seg) and not any(ord(c) in _MOJI_LEADS for c in fixed):
                out.append(fixed)
                i += len(seg)
                replaced = True
                break
        if not replaced:
            out.append(lead)
            i += 1
    return _scrub_leftovers("".join(out))


def flat(text: str) -> str:
    """Whitespace-free uppercase key used to recognise letter-spaced PDF headers."""
    return re.sub(r"\s+", "", text).upper()


SMALL = {"a", "an", "and", "as", "at", "but", "by", "for", "in", "of", "on", "or", "the", "to", "with", "vs"}
ACRONYMS = {
    "API", "CSV", "CSS", "DNS", "DOM", "FAQ", "FTP", "HTML", "HTTP", "HTTPS", "IDE", "JSON",
    "LAN", "NAS", "OS", "PDF", "PNG", "RAM", "SEO", "SMTP", "SQL", "SVG", "TCP", "UDP", "UI",
    "UX", "VPN", "WAN", "WPM", "AI", "PC", "PCs", "USB", "ZIP", "XML", "SMB", "DMARC", "SPF",
    "MFA", "2FA", "GDPR", "NDPR", "CDN", "CMS", "LMS", "XP", "TTFB", "LCP", "CLS", "INP",
    "QWERTY", "KPI", "KPIs", "ROI", "OKR", "KPI", "OCR", "PDFs", "GIF", "JPEG", "TIFF", "RAW",
    "MB", "GB", "SSD", "HDD", "BIOS", "CPU", "GPU", "PSU", "RAM", "SMART", "SMART", "AV", "NAS",
    "SOP", "QA", "UK", "US", "NG", "AI", "ML", "APIs", "URL", "URLs", "GRAB", "PROMPT", "PR",
    "TOS", "PII", "SMS", "IVR", "UX", "OK", "TODO", "CAP", "VBA", "PivotTables", "AD", "BYOD",
}
ROMAN = {"I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"}


def smart_title(text: str) -> str:
    """UPPER-CASED PDF heading -> readable title, preserving acronyms."""
    raw = re.sub(r"\s+", " ", text).strip()
    if not raw:
        return raw
    if raw != raw.upper():  # already mixed case, trust the source
        return raw[0].upper() + raw[1:] if raw.islower() is False else raw.capitalize()
    words = raw.replace("-", " - ").split()
    out = []
    for i, w in enumerate(words):
        core = re.sub(r"[^A-Z]", "", w)
        if not core:
            out.append(w.lower().capitalize() if w != "-" else "-")
            continue
        if core in ACRONYMS or core in ROMAN or len(core) <= 3 or w.endswith("s'"):
            out.append(w)
        elif "-" in w:
            out.append("-".join(smart_title(p) for p in w.split("-")))
        elif "/" in w:
            out.append("/".join(x.capitalize() for x in w.split("/")))
        else:
            out.append(w.capitalize())
    joined = " ".join(out)
    joined = re.sub(r"\s+([,.;:!?])", r"\1", joined)
    joined = re.sub(r"(?<=[A-Za-z])\s*-\s*(?=[A-Za-z])", "-", joined)
    # small words in the middle of a phrase stay lower-case
    parts = joined.split(" ")
    if len(parts) > 2:
        parts = [p.lower() if p.lower() in SMALL and 0 < i < len(parts) - 1 else p for i, p in enumerate(parts)]
        joined = " ".join(parts)
    return joined


# ---------------------------------------------------------------------------
# line model
# ---------------------------------------------------------------------------

@dataclass
class Line:
    text: str
    page: int
    block: int
    idx: int
    size: float
    bold: bool
    mono: bool
    bbox: tuple
    kind: str = "body"

    @property
    def x0(self) -> float:
        return self.bbox[0]

    @property
    def y0(self) -> float:
        return self.bbox[1]

    @property
    def y1(self) -> float:
        return self.bbox[3]


FOOTER_RE = re.compile(r".*PAGE\d+OF\d+$")
BRAND_RE = re.compile(r"^(CYBERELIASACADEMY|CEALEARN|FROMZEROTOEXPERT)")
BANNER_RE = re.compile(r"^SESSION(\d+)OF(\d+)$")
DIAGRAM_RE = re.compile(r"^CONCEPTDIAGRAM")
SKIP_EXACT = {"ITEMDETAIL", "PART", "OVERVIEW", "COURSECONTENTS", "TABLEOFCONTENTS", "QUICKNAVIGATION"}


def page_lines(page, pno: int) -> list[Line]:
    out: list[Line] = []
    d = page.get_text("dict")
    for bi, block in enumerate(d["blocks"]):
        if block.get("type") != 0:
            continue
        for li, ln in enumerate(block.get("lines", [])):
            spans = [s for s in ln.get("spans", []) if s.get("text")]
            if not spans:
                continue
            text = "".join(s["text"] for s in spans)
            if not text.strip():
                continue
            sizes = [s["size"] for s in spans]
            fonts = [s["font"] for s in spans]
            mono = all(("Courier" in f or "Mono" in f or "Consol" in f) for f in fonts)
            bold = all(("Bold" in f or "Semibold" in f or "Black" in f or "BoldItalic" in f) for f in fonts)
            out.append(Line(
                text=fix_mojibake(text).rstrip(), page=pno, block=bi, idx=li,
                size=round(max(sizes), 1), bold=bold, mono=mono, bbox=tuple(round(v, 1) for v in ln["bbox"]),
            ))
    return out


# ---------------------------------------------------------------------------
# section model — the roadmap's `## A.` .. `## O.` contract, made robust
# ---------------------------------------------------------------------------
# GAP FIX: README tasks 2.2-2.5 hard-code letter meanings ("quiz from section N",
# "case study from section K", "rubric from section M"). The real PDFs are not
# consistent: Web Development has D=prerequisite review / E=opening activity while
# the other 15 courses have them the other way round, capstone sessions rename
# headers ("K. THE CAPSTONE BRIEF AND RUBRIC"), and Knowledge Check sits at M,
# not N. We therefore key on the heading *text* and keep the letter for display.
KIND_BY_TITLE = [
    (r"SESSION IDENTIFICATION", "identification"),
    (r"LEARNING OUTCOMES|OUTCOMES", "outcomes"),
    (r"REQUIRED MATERIALS|MATERIALS", "materials"),
    (r"PREREQUISITE REVIEW|PREREQUISIVE REVIEW|PREREQ REVIEW", "prereq_review"),
    (r"OPENING ACTIVITY", "opening"),
    (r"LECTURE|CAPSTONE BRIEF$", "lecture"),
    (r"DEMONSTRATION|DEMO", "demo"),
    (r"GUIDED PRACTICAL|PRACTICAL EXERCISE", "guided_practical"),
    (r"INDEPENDENT CLASS EXERCISE|INDEPENDENT EXERCISE", "exercise"),
    (r"CASE STUDY", "case_study"),
    (r"COMMON MISTAKES|TROUBLESHOOT|FAILURE POINTS|REMEDIAT", "troubleshooting"),
    (r"ASSIGNMENT", "assignment"),
    (r"KNOWLEDGE CHECK|VIVA QUESTION", "knowledge_check"),
    (r"REFLECTION|RECAP|WRAP-?UP", "reflection"),
    (r"EVALUATION NOTES|INSTRUCTOR NOTES", "instructor_notes"),
    (r"RUBRIC", "rubric"),
]
SECTION_HEAD_RE = re.compile(r"^([A-O])\.\s*([A-Z][A-Za-z ,&/\-\(\)0-9']{2,70})$")


def classify_head(text: str) -> tuple[str, str] | None:
    m = SECTION_HEAD_RE.match(text.strip())
    if not m:
        return None
    letter, title = m.group(1), m.group(2).strip()
    f = flat(title)
    if not re.match(r"^[A-Z][A-Z ,&/\-\(\)0-9']{2,}$", f):
        return None
    for pat, kind in KIND_BY_TITLE:
        if re.search(pat.replace(" ", ""), f):
            return letter, kind
    return letter, "other"


# ---------------------------------------------------------------------------
# markdown rendering
# ---------------------------------------------------------------------------

LIST_MARK = re.compile(r"^\s*([•▪◦‣\-\u2013✓☐\[\]])\s*")
NUM_MARK = re.compile(r"^\s*(\d{1,2})[.)]\s+")
LABEL_LINE = re.compile(r"^(Session number|Session title|Week / Module|Recommended duration|Difficulty level|Prerequisite knowledge|Connection to previous work|Preparation before class|Prerequisite review|Materials|Hardware|Software|Accounts|Sample files)\s*:?\s*(.*)$")


def is_listy(text: str) -> bool:
    return bool(LIST_MARK.match(text) or NUM_MARK.match(text))


def block_to_md(lines: list[Line]) -> list[str]:
    """Convert one text block to markdown lines: paragraphs reflowed, lists kept, mono fenced."""
    out: list[str] = []
    para: list[str] = []
    code: list[str] = []

    def flush_para():
        if para:
            out.append(" ".join(x.strip() for x in para).strip())
            para.clear()

    def flush_code():
        if code:
            out.append("```text")
            out.extend(code)
            out.append("```")
            code.clear()

    for ln in lines:
        t = ln.text.strip()
        if not t:
            continue
        if ln.mono:
            flush_para()
            code.append(ln.text.rstrip())
            continue
        flush_code()
        if is_listy(t) or t.endswith(":") or LABEL_LINE.match(t):
            flush_para()
            t2 = LIST_MARK.sub("- ", t)
            out.append(t2)
            continue
        para.append(t)
    flush_para()
    flush_code()
    return out


def lines_to_markdown(lines: list[Line]) -> str:
    md: list[str] = []
    cur_page_block: tuple[int, int] | None = None
    bucket: list[Line] = []

    def emit():
        if bucket:
            md.extend(block_to_md(list(bucket)))
            bucket.clear()

    for ln in lines:
        key = (ln.page, ln.block)
        if key != cur_page_block:
            emit()
            cur_page_block = key
        bucket.append(ln)
    emit()
    # blank line between blocks
    text = "\n\n".join(b for b in "\n".join(md).split("\n\n") if b.strip())
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip() + "\n"


# ---------------------------------------------------------------------------
# section A parsing (the "Item / Detail" pseudo-table)
# ---------------------------------------------------------------------------

FIELD_ORDER = [
    ("Session number", "number"), ("Session title", "title"), ("Week / Module", "module"),
    ("Recommended duration", "duration"), ("Difficulty level", "difficulty"),
    ("Prerequisite knowledge", "prerequisite_knowledge"),
    ("Connection to previous work", "connection_to_previous"),
    ("Preparation before class", "preparation"),
]


def parse_identification(md: str) -> tuple[dict, str]:
    fields: dict[str, str] = {}
    lines = md.split("\n")
    cur_key: str | None = None
    buf: list[str] = []
    leftovers: list[str] = []
    label_map = {re.sub(r"\s+", " ", k.lower()): (k, v) for k, v in FIELD_ORDER}

    def close():
        nonlocal cur_key
        if cur_key and buf:
            fields[cur_key] = re.sub(r"\s+", " ", " ".join(buf)).strip(" :")
        buf.clear()

    for raw in lines:
        t = raw.strip().strip("-").strip()
        if not t or t.lower() in ("item detail", "item", "detail"):
            continue
        key = re.sub(r"\s+", " ", re.sub(r":$", "", t.lower()))
        if key in label_map:
            close()
            cur_key = label_map[key][1]
            after = re.sub(r"^[^:]*:\s*", "", t) if ":" in t else ""
            if after:
                buf.append(after)
            continue
        m = re.match(r"^(Session number|Session title|Week / Module|Recommended duration|Difficulty level|Prerequisite knowledge|Connection to previous work|Preparation before class)\s*:\s*(.+)$", t, re.I)
        if m:
            close()
            for k, v in FIELD_ORDER:
                if m.group(1).lower().startswith(k.lower()[:9]):
                    cur_key = v
                    buf.append(m.group(2))
                    break
            continue
        (buf if cur_key else leftovers).append(t)
    close()
    rest = "\n".join(leftovers).strip()
    return fields, rest


# ---------------------------------------------------------------------------
# diagram rendering + hotspots
# ---------------------------------------------------------------------------

def find_diagram(page) -> tuple[fitz.Rect, list[Line]] | None:
    """Locate the concept-diagram card on a page and return its clip rect + inner text lines."""
    lines = page_lines(page, page.number)
    head = None
    for ln in lines:
        if DIAGRAM_RE.match(flat(ln.text)):
            head = ln
            break
    if head is None:
        return None
    limit_y = page.rect.y1 - 34
    below = [ln.y0 for ln in lines if ln.y0 > head.y1 + 8 and (flat(ln.text).startswith(("CYBERELIAS", "SESSION")) or classify_head(ln.text))]
    if below:
        limit_y = min(below) - 6
    rects = []
    for d in page.get_drawings():
        r = fitz.Rect(d["rect"])
        if r.is_empty or r.width < 4 or r.height < 4:
            continue
        if r.width * r.height > 0.7 * page.rect.width * page.rect.height:
            continue  # page background
        if r.y0 < head.y1 - 4 or r.y1 > limit_y:
            continue
        rects.append(r)
    if not rects:
        return None
    clip = rects[0]
    for r in rects[1:]:
        clip |= r
    inner = [ln for ln in lines if fitz.Rect(ln.bbox).intersects(clip) and head.y1 < ln.y0 < clip.y1 - 2
             and not FOOTER_RE.match(flat(ln.text)) and not flat(ln.text).startswith("CYBERELIAS")]
    clip = fitz.Rect(max(0, clip.x0 - 10), max(head.y1 - 6, clip.y0 - 10),
                     min(page.rect.x1, clip.x1 + 10), min(page.rect.y1 - 34, clip.y1 + 10))
    return clip, inner


def render_diagram(page, clip: fitz.Rect, path: Path) -> dict:
    path.parent.mkdir(parents=True, exist_ok=True)
    pm = page.get_pixmap(matrix=fitz.Matrix(DIAGRAM_SCALE, DIAGRAM_SCALE), clip=clip, alpha=False)
    pm.save(str(path))
    return {"width": pm.width, "height": pm.height}


def hotspots_from(inner: list[Line], clip: fitz.Rect, max_items: int = 26) -> list[dict]:
    out = []
    for ln in inner:
        x0, y0, x1, y1 = ln.bbox
        w = x1 - x0
        h = y1 - y0
        if w <= 0 or h <= 0:
            continue
        text = re.sub(r"\s+", " ", ln.text).strip()
        if len(text) < 3 or flat(text).startswith(("CYBERELIAS", "SESSION")):
            continue
        out.append({
            "label": text[:160],
            "x": round(100 * (x0 - clip.x0) / clip.width, 2),
            "y": round(100 * (y0 - clip.y0) / clip.height, 2),
            "w": round(100 * w / clip.width, 2),
            "h": round(100 * h / clip.height, 2),
            "mono": ln.mono,
        })
    out.sort(key=lambda d: (d["y"], d["x"]))
    # merge lines that share a row into one hotspot (a diagram card row)
    merged: list[dict] = []
    for h in out:
        if merged and abs(merged[-1]["y"] - h["y"]) < 0.6 and merged[-1]["mono"] == h["mono"]:
            prev = merged[-1]
            prev["label"] = f"{prev['label']} {h['label']}".strip()[:200]
            prev["w"] = round(max(prev["w"], h["x"] + h["w"] - prev["x"]), 2)
        else:
            merged.append(h)
    # keep only meaningful blocks: those with a label that looks like a heading
    keep = [m for m in merged if len(m["label"]) > 3][:max_items]
    return keep


# ---------------------------------------------------------------------------
# course metadata (from the Full Course PDF, Part 1)
# ---------------------------------------------------------------------------

# The 16 course design documents are not written to one template: some use
# "Key: value" on one line, some use an "Item | Detail" table where the value is
# on the following line, and a few bury the design doc past page 10. So instead
# of line-by-line regexes we scan for a *label* and read the value in whichever
# of the two layouts follows it, stopping at the next known label.
LABELS = {
    "display_title": r"course (?:title|name)",
    "category": r"course category|course area|category",
    "study_mode": r"delivery mode|study mode|mode of delivery|format",
    "session_length": r"session length|session duration|class length",
    "sessions_per_week": r"sessions per week|sessions/week|frequency",
    "duration": r"course duration|duration",
    "sessions_count": r"total sessions|^sessions\b",
    "level": r"^(?:target )?level",
    "fee_ngn": r"course fee|fee",
    "certificate": r"certificate requirement|certificate",
    "toolset": r"primary toolset|primary software|required tools|tools?",
    "audience_raw": r"target learner|designed for|who this course is for",
    "entry_requirements_raw": r"entry requirements|prerequisites|assumed knowledge",
    "mission_raw": r"course mission|^1(?:\.1)?\s+mission|our mission for this course",
    "problem_raw": r"the problem this course solves|problem this course solves|why this course exists",
    "progression": r"progression|lineage|what comes next",
    "running_example_raw": r"the running example|running example|project thread",
    "success_raw": r"what success looks like|definition of success",
    "assessment_raw": r"assessment(?: strategy| method)?|how you are assessed",
}
_LABEL_STOP = re.compile(r"(?im)^(?:\s*(?:\d+(?:\.\d+)?[.)]?\s+)?)[*\s]*(" + "|".join(f"(?:{v})" for v in LABELS.values()) + r")\s*:?\s*(?:\n|$)")


def scan_field(text: str, key: str, max_chars: int = 900) -> str:
    pat = LABELS[key]
    for m in re.finditer(r"(?im)^[ \t*" + "\u2022" + r"]*(?:" + pat + r")\s*:?\s*(.*)$", text):
        rest = m.group(1).strip()
        if rest and not re.fullmatch(r"[|:\-–—]*", rest):
            value = rest
        else:
            tail = text[m.end(): m.end() + max_chars]
            lines = []
            for raw in tail.split("\n"):
                t = raw.strip()
                if not t:
                    if lines:
                        break
                    continue
                if _LABEL_STOP.match(t) or re.match(r"^(?:PART|SECTION)\b", t, re.I):
                    break
                lines.append(t)
                if sum(len(x) for x in lines) > max_chars:
                    break
            value = " ".join(lines)
        value = re.sub(r"\s+\n\s+", " ", value)
        value = re.sub(r"\s+", " ", value).strip(" .:|\u2014-")
        # a stray label-only capture ("Certificate | awarded") keeps reading on
        if key == "certificate" and re.fullmatch(r"awarded|yes|on completion", value, re.I):
            nxt = text[m.end(): m.end() + max_chars].strip().split("\n")
            value = " ".join(x.strip() for x in nxt if x.strip() and not _LABEL_STOP.match(x.strip()))[:max_chars]
        if len(value) >= 2:
            return value
    return ""


def _bullets(text: str, key: str, limit: int = 12) -> list[str]:
    raw = scan_field(text, key, 1400)
    if not raw:
        return []
    parts = re.split(r"(?:^|[\s,;])[-•✓]\s+|\s(?=[a-z]{1,3}[.)]\s)", raw)
    items = [re.sub(r"^\s*\d+[.)]\s*", "", x).strip(" .") for x in parts]
    items = [i for i in items if len(i) > 6]
    if len(items) <= 1:
        items = [i.strip(" .") for i in re.split(r";\s|\.\s(?=[A-Z])", raw) if len(i.strip()) > 12]
    return items[:limit]


def pick(text: str, patterns: list[str], cast=None, limit: int = 320) -> str | None:
    """First pattern that matches wins. `cast` post-processes the capture group."""
    for pat in patterns:
        m = re.search(pat, text, re.I | re.S)
        if not m:
            continue
        val = next((g for g in m.groups() if g), "")
        val = re.sub(r"\s+", " ", val).strip(" .:|\u2014-\u2013")
        if not val:
            continue
        return cast(val) if cast else val[:limit]
    return None


def bullets_after_heading(text: str, heading_re: str, limit: int = 10) -> list[str]:
    """Design docs put the audience under a heading like '2.1 Who this course is for'."""
    m = re.search(rf"(?im)^\s*\d{{0,2}}\.?\d?\s*(?:{heading_re})[^\n]{{0,40}}\n", text)
    if not m:
        return []
    items, cur = [], ""
    for raw in text[m.end(): m.end() + 2400].split("\n"):
        t = raw.strip()
        if not t:
            continue
        if re.match(r"^(\d+\.\d+|[A-Z][A-Za-z ,&\-/']{4,40})\s*$", t) or re.match(r"^(PART|APPENDIX)\b", t, re.I):
            break
        t = re.sub(r"^[-\u2022\u2713\d.)\s]+", "", t)
        if len(t) > 6:
            items.append(re.sub(r"\s+", " ", t))
        if len(items) >= limit:
            break
    return items


def parse_course_design(full_text: str, course_name: str) -> dict:
    """Extract the Part-1 course design facts. Missing keys are simply omitted so
    the UI can fall back instead of showing an empty field."""
    i = full_text.upper().find("COURSE DESIGN DOCUMENT")
    region = full_text[i: i + 26000] if i >= 0 else full_text[:26000]
    out: dict = {}
    for key in LABELS:
        if key.endswith("_raw"):
            continue
        v = scan_field(region, key)
        if v:
            out[key] = v
    # prose fields
    for key, label in (("mission", "mission_raw"), ("problem", "problem_raw"),
                       ("running_example", "running_example_raw"), ("success_definition", "success_raw"),
                       ("assessment", "assessment_raw"), ("scope_statement", None),
                       ("tools", "toolset")):
        if label is None:
            m = re.search(r"(?is)honest scope statement[^\n]*\n(.{20,900}?)(?:\n\s*\d+\.|\n\n\n)", region)
            if m:
                out[key] = re.sub(r"\s+", " ", m.group(1)).strip()
            continue
        v = scan_field(region, label, 1300)
        if v:
            out[key] = v
    out["audience"] = _bullets(region, "audience_raw") or bullets_after_heading(region, r"who this course is for|target learners?\b")
    out["entry_requirements"] = _bullets(region, "entry_requirements_raw") or bullets_after_heading(region, r"entry requirements")
    if not out.get("audience") and out.get("level"):
        out["audience"] = [out["level"]]
    # ---- compact one-line fields (labels sit mid-paragraph in many courses) ----
    head = region[:20000]
    num = lambda v: int(re.sub(r"[^\d]", "", v) or 0) or None
    out["fee_ngn"] = pick(head, [r"(?:course\s+fee|fee)\s*:?\s*\u20a6\s*([\d][\d,]{2,12})",
                                r"\u20a6\s*([\d][\d,]{2,12})\s*(?:per course|course fee)"]) or out.get("fee_ngn")
    out["weeks"] = pick(head, [r"(?:course\s+)?duration\s*:?\s*\|?\s*(\d{1,2})\s*week"]) or out.get("weeks")
    out["sessions_count"] = pick(head, [r"total\s+sessions\s*:?\s*\|?\s*(\d{1,2})",
                                       r"(?:^|[|\n:]\s*)sessions\s*:?\s*(\d{1,2})\s*(?=[\s]*(?:\||\n|$|\u00d7|\(|-))"]) or out.get("sessions_count")
    out["session_length_minutes"] = pick(head, [r"session\s*(?:length|duration)\s*:?\s*(\d{2,3})\s*min",
                                               r"\u00d7\s*(\d{2,3})\s*min"]) or out.get("session_length_minutes")
    out["sessions_per_week"] = pick(head, [r"sessions?\s*per\s*week\s*:?\s*(\d{1,2})"]) or out.get("sessions_per_week")
    out["category"] = pick(head, [r"(?:course\s+)?category\s*[:|]\s*([A-Z][^\n|]{2,70}?)(?=\s*(?:Designed|Assumed|Progression|Duration|Session|Course|Target|\n|$))"]) or out.get("category")
    out["level"] = pick(head, [r"(?:^|\n|\s)level\s*:?\s*\|?\s*(Beginner[^\n|]{0,80}|Intermediate[^\n|]{0,80}|All levels[^\n|]{0,60})"]) or out.get("level")
    out["certificate"] = out.get("certificate") or pick(head, [
        r"certificate(?:\s+requirement)?\s*:?\s*\|?\s*(?:awarded|issued)?\s*[-:]?\s*([A-Z][^\n]{12,300})",
    ], limit=420)
    out["study_mode"] = out.get("study_mode") or pick(head, [r"(?:delivery|study)\s+mode\s*:?\s*\|?\s*([^\n|]{6,110})"])
    for k in ("fee_ngn", "weeks", "sessions_count", "session_length_minutes", "sessions_per_week"):
        if k in out and not isinstance(out[k], int):
            v = re.search(r"\d[\d,]*", str(out[k]).replace(" ", ""))
            digits = re.sub(r"[^\d]", "", v.group(0)) if v else ""
            out[k] = int(digits) if digits and int(digits) < 100000 else None
            if out.get(k) is None:
                out.pop(k, None)
    if all(out.get(k) for k in ("sessions_count", "session_length_minutes")):
        out["contact_hours"] = round(out["sessions_count"] * out["session_length_minutes"] / 60, 1)
    for k, v in list(out.items()):
        if isinstance(v, str) and v.lower().startswith(("n/a", "none", "not applicable")):
            del out[k]
    out["display_title"] = out.get("display_title") or course_name
    return out


# ---------------------------------------------------------------------------
# cover generation (roadmap B5 promised 16 SVG covers; none existed)
# ---------------------------------------------------------------------------

ACCENTS = ["#2c5282", "#2b6cb0", "#3182ce", "#38a169", "#d69e2e", "#dd6b20", "#e53e3e", "#805ad5", "#319795", "#0f1b33"]


def slugify(name: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")


def make_cover(path: Path, title: str, subtitle: str, sessions: int, accent: str) -> None:
    esc = lambda s: (s or "").replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
    words = esc(title).split()
    lines, cur = [], ""
    for w in words:
        if len(cur) + len(w) + 1 > 17:
            lines.append(cur)
            cur = w
        else:
            cur = f"{cur} {w}".strip()
    if cur:
        lines.append(cur)
    lines = lines[:3]
    tspans = "".join(
        f'<tspan x="60" dy="{54 if i else 0}">{l}</tspan>' for i, l in enumerate(lines)
    )
    dots = "".join(
        f'<circle cx="{60 + i * 26}" cy="330" r="7" fill="{accent}" opacity="{0.9 - i * 0.11:.2f}"/>'
        for i in range(min(sessions, 12))
    )
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="640" height="360" role="img" aria-label="{esc(title)} course cover">
<defs>
<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#0f1b33"/><stop offset="0.55" stop-color="#1a365d"/><stop offset="1" stop-color="{accent}"/>
</linearGradient>
</defs>
<rect width="640" height="360" fill="url(#g)"/>
<g opacity="0.16" stroke="#fff" fill="none" stroke-width="2">
<path d="M470 40v70M470 110h70M540 110a10 10 0 1 0 .1 0M500 40v40M500 80h-30"/>
<circle cx="470" cy="40" r="9" fill="#fff"/><circle cx="540" cy="110" r="9" fill="#fff"/>
</g>
<text x="60" y="72" font-family="Segoe UI,Arial,sans-serif" font-size="15" letter-spacing="4" fill="{accent}">CYBER ELIAS ACADEMY</text>
<g font-family="Segoe UI,Arial,sans-serif" font-size="46" font-weight="700" fill="#ffffff">{tspans}</g>
<text x="60" y="266" font-family="Segoe UI,Arial,sans-serif" font-size="19" fill="#cbd5e0">{esc(subtitle)}</text>
{dots}
<text x="60" y="326" font-family="Segoe UI,Arial,sans-serif" font-size="14" letter-spacing="2" fill="#a0aec0">{sessions} SESSIONS · MISSION-BASED · cea.ng</text>
</svg>
'''
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(svg, encoding="utf-8")


# ---------------------------------------------------------------------------
# per-course pipeline
# ---------------------------------------------------------------------------

@dataclass
class Stats:
    course: str
    sessions: int = 0
    sections: int = 0
    diagrams: int = 0
    chars: int = 0
    warnings: list = field(default_factory=list)


def load_lines(pdf_path: Path, page_filter=None) -> tuple[list[Line], "fitz.Document"]:
    doc = fitz.open(str(pdf_path))
    all_lines: list[Line] = []
    for pno, page in enumerate(doc):
        if page_filter is not None and not page_filter(pno, page):
            continue
        all_lines.extend(page_lines(page, pno))
    return all_lines, doc


def build_course(dirn: Path, only: bool, want_images: bool, dry: bool, stats: Stats) -> dict | None:
    course_name = dirn.name.replace("_", " ").strip()
    slug = slugify(dirn.name)
    tm = next(iter(dirn.glob("*_Teaching_Manual.pdf")), None)
    fc = next(iter(dirn.glob("*_Full_Course.pdf")), None)
    if tm is None:
        stats.warnings.append(f"no teaching manual in {dirn.name}")
        return None

    lines, doc = load_lines(tm)
    # ---- strip furniture, split into sessions --------------------------------
    kept: list[Line] = []
    for ln in lines:
        f = flat(ln.text)
        if FOOTER_RE.match(f) or BRAND_RE.match(f) or SKIP_EXACT.intersection({f}):
            ln.kind = "furniture"
            continue
        if re.match(r"^[A-Z ]+\|CYBERELIASACADEMY$", f) or f.startswith("CYBERELIASACADEMY"):
            continue
        kept.append(ln)

    banner_idx = [i for i, ln in enumerate(kept) if BANNER_RE.match(flat(ln.text))]
    if not banner_idx:
        # fall back to first section heading of each session
        banner_idx = [i for i, ln in enumerate(kept) if classify_head(ln.text) and classify_head(ln.text)[0] == "A"]
        stats.warnings.append("session banner not found; split on section A")
    bounds = banner_idx + [len(kept)]

    # diagram pages: one per session, in document order
    diagram_pages: list[tuple[int, fitz.Rect, list[Line]]] = []
    for pno, page in enumerate(doc):
        res = find_diagram(page)
        if res:
            diagram_pages.append((pno, res[0], res[1]))
    # pages whose diagram already belongs to a session we have not seen (cover dupes)
    by_page = {p: (r, l) for p, r, l in diagram_pages}
    ordered_pages = sorted(by_page)

    # the teaching manual repeats the session-1 diagram on the cover -> align by
    # walking sessions in order and taking the first diagram page at/after the
    # session's first content page.
    outdir = OUT_CONTENT / slug
    imgdir = OUT_ASSETS / "concepts" / slug
    if not dry:
        outdir.mkdir(parents=True, exist_ok=True)

    cursor = 0
    sessions_out = []
    for si in range(len(banner_idx)):
        lo, hi = bounds[si], bounds[si + 1]
        slice_lines = kept[lo:hi]
        if not slice_lines:
            continue
        banner = flat(slice_lines[0].text)
        mb = BANNER_RE.match(banner)
        num = int(mb.group(1)) if mb else si + 1
        of = int(mb.group(2)) if mb else len(banner_idx)
        first_page = slice_lines[0].page
        disp = [ln for ln in slice_lines[1:8] if ln.size >= 13 and len(ln.text.strip()) > 4]
        big = max((ln.size for ln in disp), default=0)
        title_guess = smart_title(" ".join(ln.text.strip() for ln in disp if ln.size >= big - 0.6)) if disp else ""

        # ---- split sections --------------------------------------------------
        heads = [(i, classify_head(ln.text)) for i, ln in enumerate(slice_lines)]
        heads = [(i, c) for i, c in heads if c]
        if not heads:
            stats.warnings.append(f"session {num}: no sections found")
            continue
        # keep only a monotonically sensible run of section heads
        secs = []
        for k, (i, (letter, kind)) in enumerate(heads):
            body = slice_lines[i + 1: heads[k + 1][0] if k + 1 < len(heads) else len(slice_lines)]
            secs.append((letter, kind, body))

        # ---- diagram ---------------------------------------------------------
        diagram = None
        chosen = None
        while cursor < len(ordered_pages) and ordered_pages[cursor] < first_page:
            cursor += 1
        if cursor < len(ordered_pages):
            chosen = ordered_pages[cursor]
            cursor += 1
        if chosen is not None:
            clip, inner = by_page[chosen]
            rel_img = f"assets/concepts/{slug}/session-{num:02d}{IMG_EXT}"
            diagram = {
                "src": "/" + rel_img,
                "page": chosen + 1,
                "transcript": [re.sub(r"\s+", " ", ln.text).strip() for ln in inner
                               if len(ln.text.strip()) > 2 and not flat(ln.text).startswith(("CYBERELIAS", "CONCEPTDIAGRAM"))][:60],
                "hotspots": hotspots_from(inner, clip),
                "width": int(clip.width * DIAGRAM_SCALE), "height": int(clip.height * DIAGRAM_SCALE),
            }
            if want_images and not dry:
                render_diagram(doc[chosen], clip, ROOT / rel_img)
                stats.diagrams += 1

        # ---- write markdown --------------------------------------------------
        front = {
            "id": f"{slug}/session-{num:02d}",
            "course": slug,
            "number": num,
            "of": of,
            "title": title_guess or f"Session {num:02d}",
            "free": num == 1,
            "diagram": diagram,
        }
        body_md = ["# title", ""]
        for letter, kind, body in secs:
            raw_head = next(l.text for l in slice_lines if l is not None and classify_head(l.text) == (letter, kind))
            md = lines_to_markdown(body)
            if kind == "identification":
                fields, rest = parse_identification(md)
                front["module"] = fields.get("module")
                d = re.search(r"(\d+)", fields.get("duration", "") or "")
                front["duration_minutes"] = int(d.group(1)) if d else None
                if fields.get("title") and len(fields["title"]) > 3:
                    front["title"] = re.sub(r"\s+", " ", fields["title"]).strip()
                front["difficulty"] = fields.get("difficulty")
                front["prerequisite_knowledge"] = fields.get("prerequisite_knowledge")
                front["connection_to_previous"] = fields.get("connection_to_previous")
                md_rows = []
                label_for = {"module": "Week / module", "difficulty": "Difficulty", "prerequisite_knowledge": "Prerequisite knowledge", "connection_to_previous": "Connection to previous work", "preparation": "Preparation before class", "duration": "Recommended duration"}
                for key in ("module", "duration", "difficulty", "prerequisite_knowledge", "connection_to_previous", "preparation"):
                    if fields.get(key):
                        md_rows.append(f"**{label_for[key]}:** {fields[key]}")
                md = "\n\n".join([x for x in [*md_rows, rest] if x])
            if kind == "lecture" and md.count("```") == 0:
                stats.warnings.append(f"session {num}: lecture has no code block")
            body_md.append(f"## {letter}. {smart_title(raw_head.split('.', 1)[1])}")
            body_md.append(f"<!-- kind:{kind} -->")
            body_md.append(md.strip() or "_See the instructor manual._")
            body_md.append("")
            stats.sections += 1
            stats.chars += len(md)

        body_md[0] = f"# {front['title']}"
        fm = "---\n" + json.dumps(front, indent=2, ensure_ascii=False).strip() + "\n---\n"
        content = fm + "\n".join(body_md).strip() + "\n"
        if not dry:
            (outdir / f"session-{num:02d}.md").write_text(content, encoding="utf-8")
        sessions_out.append({"number": num, "of": of, "title": front["title"], "module": front.get("module"), "sections": [s[1] for s in secs]})
        stats.sessions += 1

    # ---- course metadata ----------------------------------------------------
    meta = {"slug": slug, "name": course_name, "sessions": sessions_out}
    if fc is not None:
        fdoc = fitz.open(str(fc))
        upto = min(40, fdoc.page_count)
        head_text = fix_mojibake("\n".join(fdoc[i].get_text() for i in range(upto)))
        meta.update(parse_course_design(head_text, course_name))
        fdoc.close()
    else:
        stats.warnings.append("no full-course pdf; metadata incomplete")
    meta["declared_sessions_count"] = meta.get("sessions_count")
    meta["sessions_count"] = len(sessions_out)
    meta.setdefault("fee_ngn", None)
    meta["pdfs"] = {"teaching_manual": tm.name} | ({"full_course": fc.name} if fc else {})

    if not dry:
        (OUT_CONTENT / slug / "course.json").write_text(json.dumps(meta, indent=2) + "\n", encoding="utf-8")
    return meta


def extract_logo(dry: bool) -> None:
    """B12 promised cealogo.png; it lives inside every PDF. Pull it out at native res."""
    path = OUT_ASSETS / "cealogo.png"
    if dry or path.exists():
        return
    for doc_path in sorted(ROOT.glob("*/*_Teaching_Manual.pdf")):
        d = fitz.open(str(doc_path))
        page = d[0]
        infos = [i for i in page.get_image_info(xrefs=True) if i["width"] >= 512]
        if infos:
            xref = infos[0]["xref"]
            pix = fitz.Pixmap(d, xref)
            if pix.alpha == 0 and pix.n >= 3:
                smask = None
                # keep as-is; PDF image may carry its own alpha
            path.parent.mkdir(parents=True, exist_ok=True)
            pix.save(str(path))
            d.close()
            return
        d.close()


def main() -> int:
    ap = argparse.ArgumentParser(description="Extract CEA course PDFs into app content")
    ap.add_argument("--all", action="store_true")
    ap.add_argument("--course")
    ap.add_argument("--no-images", action="store_true")
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--repair-only", action="store_true",
                    help="re-apply the mojibake repair to content/**/*.md without touching the PDFs")
    ap.add_argument("--meta-only", action="store_true",
                    help="re-parse only the Part-1 course design facts and merge them into content/<slug>/course.json")
    args = ap.parse_args()

    dirs = [p for p in sorted(ROOT.iterdir()) if p.is_dir() and list(p.glob("*_Teaching_Manual.pdf"))]
    if args.course:
        dirs = [d for d in dirs if d.name == args.course or slugify(d.name) == slugify(args.course)]
        if not dirs:
            sys.exit(f"course {args.course!r} not found")
    elif not (args.all or args.meta_only or args.repair_only):
        sys.exit("pass --all, --meta-only, --repair-only or --course <name>")

    if args.repair_only:
        fixed = touched = 0
        for md in (sorted(OUT_CONTENT.glob("*/session-*.md")) if OUT_CONTENT.exists() else []):
            before = md.read_text(encoding="utf-8")
            after = fix_mojibake(before)
            touched += 1
            if after != before:
                md.write_text(after, encoding="utf-8")
                fixed += 1
        print(f"repaired mojibake in {fixed}/{touched} session files")
        return 0

    if args.meta_only:
        metas = []
        for d in dirs:
            slug = slugify(d.name)
            fc = next(iter(d.glob("*_Full_Course.pdf")), None)
            cj = OUT_CONTENT / slug / "course.json"
            if fc is None or not cj.exists():
                print(f"{d.name:<24} skipped"); continue
            doc = fitz.open(str(fc))
            head = fix_mojibake("\n".join(doc[i].get_text() for i in range(min(40, doc.page_count))))
            doc.close()
            patch = parse_course_design(head, d.name.replace("_", " "))
            data = json.loads(cj.read_text())
            data.update({k: v for k, v in patch.items() if v not in (None, "", [], {})})
            data["name"] = d.name.replace("_", " ")
            cj.write_text(json.dumps(data, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
            metas.append(data)
            print(f"{d.name:<24} fee={str(patch.get('fee_ngn')):>7} cat={str(patch.get('category'))[:26]:26} "
                  f"weeks={patch.get('weeks')} sess={patch.get('sessions_count')} len={patch.get('session_length_minutes')} "
                  f"cert={'Y' if patch.get('certificate') else 'N'} aud={len(patch.get('audience') or [])}")
        print(f"\npatched {len(metas)} course.json files")
        return 0

    if not args.dry_run:
        (OUT_CONTENT).mkdir(exist_ok=True)
        (OUT_ASSETS).mkdir(exist_ok=True)
    extract_logo(not args.dry_run)

    metas = []
    for d in dirs:
        st = Stats(d.name)
        meta = build_course(d, True, not args.no_images, args.dry_run, st)
        if meta:
            # deterministic cover accent
            accent = ACCENTS[abs(hash(d.name)) % len(ACCENTS)]
            if not args.dry_run:
                make_cover(OUT_ASSETS / "covers" / f"{slugify(d.name)}.svg",
                           meta.get("display_title") or d.name.replace("_", " "),
                           (meta.get("category") or "Professional Training") + f" · {meta.get('duration') or ''}".strip(" ·"),
                           meta.get("sessions_count") or 0, accent)
            metas.append(meta)
        warn = "; ".join(sorted(set(st.warnings))[:4])
        print(f"{st.course:<24} sessions={st.sessions:>2} sections={st.sections:>4} diagrams={st.diagrams:>2} "
              f"chars={st.chars:>7} fee={str(meta and meta.get('fee_ngn')):>7} {('WARN: ' + warn) if warn else ''}")
    print(f"\ncourses={len(metas)} total_sessions={sum(m['sessions_count'] or 0 for m in metas)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
