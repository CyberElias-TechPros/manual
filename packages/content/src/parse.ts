/**
 * ROADMAP 2.2 — markdown -> typed sections/blocks.
 *
 * Reads the canonical lesson files created by `tools/pdf-extract/extract.py`
 * (one per session, sections A..O, frontmatter as JSON between --- fences) and
 * turns them into renderable blocks. No markdown library is used on purpose:
 * the app renders these blocks as React text nodes, which makes the "sanitize
 * content before render" line of the security review (10.6) structurally
 * unnecessary — there is no HTML injection surface.
 */
import type { Block, Course, Inline, InlineParse, Section, SectionKind } from './schema.js'

export const SECTION_KINDS: SectionKind[] = [
  'identification', 'outcomes', 'materials', 'prereq_review', 'opening', 'lecture', 'demo',
  'guided_practical', 'exercise', 'case_study', 'troubleshooting', 'assignment', 'knowledge_check',
  'reflection', 'instructor_notes', 'rubric', 'other',
]

/** Sections the learner should not see by default (instructor-facing craft notes). */
export const INSTRUCTOR_KINDS = new Set<SectionKind>(['instructor_notes'])

export interface RawSession {
  front: Record<string, any>
  sections: { letter: string; kind: SectionKind; title: string; raw: string; blocks: Block[] }[]
  file: string
}

/** The manual's own A→O contract, used when a section carries no `<!-- kind: -->` marker. */
export const LETTER_KIND: Record<string, SectionKind> = {
  A: 'identification', B: 'outcomes', C: 'materials', D: 'opening', E: 'prereq_review', F: 'lecture',
  G: 'demo', H: 'guided_practical', I: 'exercise', J: 'case_study', K: 'troubleshooting', L: 'assignment',
  M: 'knowledge_check', N: 'reflection', O: 'instructor_notes',
}

const HEAD_RE = /^##\s+([A-O])\.\s*(.+)$/
const KIND_RE = /^<!--\s*kind:([a-z_]+)\s*-->$/

// ---------------------------------------------------------------------------
// inline
// ---------------------------------------------------------------------------

export function parseInline(src: string): Inline[] {
  const out: Inline[] = []
  const re = /(\*\*([^*]+)\*\*)|(`([^`]+)`)|(\[([^\]]+)\]\(([^)\s]+)\))/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    if (m.index > last) out.push({ t: 'text', v: src.slice(last, m.index) })
    if (m[2] != null) out.push({ t: 'strong', v: m[2] })
    else if (m[4] != null) out.push({ t: 'code', v: m[4] })
    else if (m[6] != null) out.push({ t: 'link', v: m[6], href: m[7] })
    last = m.index + m[0].length
  }
  const tail = src.slice(last)
  if (tail) out.push({ t: 'text', v: tail })
  return out.length ? out : [{ t: 'text', v: '' }]
}

export function withInline(text: string): InlineParse {
  return { text: text.trim(), inline: parseInline(text) }
}

// ---------------------------------------------------------------------------
// blocks
// ---------------------------------------------------------------------------

const LIST_UL = /^[-•▪◦‣]\s+(.*)$/
const LIST_OL = /^(\d{1,2})[.)]\s+(.*)$/
const CODE_FENCE = /^```(\w*)\s*$/
const CALLOUT: [RegExp, Block extends never ? never : 'tip' | 'warn' | 'note' | 'mistake' | 'naira'][] = [] as any
const CALLOUT_TONES: { re: RegExp; tone: any; title?: string }[] = [
  { re: /^(Tip|Helpful tip)[:\s]/i, tone: 'tip', title: 'Tip' },
  { re: /^(Warning|Caution)[:\s]/i, tone: 'warn', title: 'Warning' },
  { re: /^(Common mistake|Mistake to avoid)[:\s]/i, tone: 'mistake', title: 'Common mistake' },
  { re: /^(Remember|Note)[:\s]/i, tone: 'note', title: 'Remember' },
  { re: /^(Nigerian example|Local example)[:\s]/i, tone: 'naira', title: 'Nigerian example' },
]

/** A short line ending with ':' that introduces a run is a sub-head, not a paragraph. */
function isLead(text: string): boolean {
  const t = text.trim()
  if (t.length > 78 || !t.endsWith(':')) return false
  const words = t.replace(/:$/, '').split(/\s+/)
  return words.length <= 9 && !/^[a-z]/.test(t)
}

function paragraphFrom(lines: string[]): Block | null {
  const text = lines.join(' ').replace(/\s+/g, ' ').trim()
  if (!text) return null
  if (isLead(text)) return { t: 'h', depth: 4, text: text.replace(/:$/, ''), inline: parseInline(text.replace(/:$/, '')) }
  for (const c of CALLOUT_TONES) {
    const m = c.re.exec(text)
    if (m) {
      const rest = text.slice(m[0].length).replace(/^[-–—:]\s*/, '').trim()
      return { t: 'callout', tone: c.tone, title: c.title, text: rest, inline: parseInline(rest) }
    }
  }
  if (text.startsWith('>')) {
    const q = text.replace(/^>\s?/, '').trim()
    return { t: 'quote', text: q, inline: parseInline(q) }
  }
  return { t: 'p', text, inline: parseInline(text) }
}

export function mdToBlocks(md: string): Block[] {
  const blocks: Block[] = []
  const lines = md.replace(/\r/g, '').split('\n')
  let para: string[] = []
  let list: { ordered: boolean; items: { text: string; inline: Inline[] }[] } | null = null
  let code: { lang: string; buf: string[] } | null = null

  const flushPara = () => {
    if (!para.length) return
    const b = paragraphFrom(para)
    if (b) blocks.push(b)
    para = []
  }
  const flushList = () => {
    if (list && list.items.length) blocks.push({ t: 'list', ordered: list.ordered, items: list.items })
    list = null
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    const fence = CODE_FENCE.exec(line.trim())
    if (fence) {
      if (code) {
        blocks.push({ t: 'code', lang: code.lang || 'text', text: code.buf.join('\n') })
        code = null
      } else {
        flushPara(); flushList()
        code = { lang: fence[1], buf: [] }
      }
      continue
    }
    if (code) { code.buf.push(raw.replace(/^ {0,4}/, '')); continue }
    if (!line.trim()) { flushPara(); flushList(); continue }
    if (/^#{1,4}\s/.test(line.trim())) {
      flushPara(); flushList()
      const depth = Math.min(4, (line.trim().match(/^#+/) as RegExpMatchArray)[0].length) as 1 | 2 | 3 | 4
      const text = line.trim().replace(/^#+\s*/, '')
      blocks.push({ t: 'h', depth: depth === 1 ? 3 : (depth as 2 | 3 | 4), text, inline: parseInline(text) })
      continue
    }
    const ul = LIST_UL.exec(line.trim())
    const ol = LIST_OL.exec(line.trim())
    if (ul || ol) {
      flushPara()
      const ordered = !!ol
      if (!list || list.ordered !== ordered) { flushList(); list = { ordered, items: [] } }
      const text = (ul ? ul[1] : (ol as RegExpExecArray)[2]).trim()
      list.items.push(withInline(text))
      continue
    }
    if (/^\*\*[^*]+:\*\*\s/.test(line.trim())) {
      // "**Label:** value" — keep as its own paragraph so the field stays legible
      flushPara(); flushList()
      blocks.push(paragraphFrom([line.trim()]) as Block)
      continue
    }
    flushList()
    para.push(line.trim())
  }
  flushPara()
  flushList()
  if (code) blocks.push({ t: 'code', lang: code.lang || 'text', text: code.buf.join('\n') })
  return blocks.filter(Boolean)
}

// ---------------------------------------------------------------------------
// file parsing
// ---------------------------------------------------------------------------

const C1_MAP: Record<number, string> = {
  0x80: '\u20ac', 0x82: '\u201a', 0x84: '\u201e', 0x85: '\u2026', 0x91: '\u2018', 0x92: '\u2019',
  0x93: '\u201c', 0x94: '\u201d', 0x95: '\u2022', 0x96: '\u2013', 0x97: '\u2014', 0x99: '\u2122',
  0x9a: '\u0161', 0x9b: '\u203a', 0x9c: '\u0153', 0x9e: '\u017e', 0x9f: '\u0178',
}

/**
 * Second line of defence for encoding artifacts (2.8). `tools/pdf-extract` repairs
 * double-encoded UTF-8 when it writes the markdown, but the markdown is a
 * human-editable source, so the parser scrubs again on ingest. It never touches
 * correct text: only the specific "Â/â/Ã + cp1252 punctuation" shapes are changed.
 */
/**
 * CP1252 code points that stand for a byte in the 0x80–0x9F range. A PDF text layer
 * that was read as CP1252 shows these where the file actually held UTF-8 bytes, so
 * the true repair is: back to bytes, then decode as UTF-8 (see roundTrip()).
 */
const CP1252_BACK: Record<string, number> = {
  '\u20ac': 0x80, '\u0081': 0x81, '\u201a': 0x82, '\u0192': 0x83, '\u201e': 0x84, '\u2026': 0x85,
  '\u2020': 0x86, '\u2021': 0x87, '\u02c6': 0x88, '\u2030': 0x89, '\u0160': 0x8a, '\u2039': 0x8b,
  '\u0152': 0x8c, '\u008d': 0x8d, '\u017d': 0x8e, '\u008f': 0x8f, '\u0090': 0x90, '\u2018': 0x91,
  '\u2019': 0x92, '\u201c': 0x93, '\u201d': 0x94, '\u2022': 0x95, '\u2013': 0x96, '\u2014': 0x97,
  '\u02dc': 0x98, '\u2122': 0x99, '\u0161': 0x9a, '\u203a': 0x9b, '\u0153': 0x9c, '\u009d': 0x9d,
  '\u017e': 0x9e, '\u0178': 0x9f,
}

/** Turns a run of "UTF-8 bytes shown as CP1252 characters" back into the real text. */
function roundTrip(run: string): string | null {
  const bytes: number[] = []
  for (const ch of run) {
    const code = ch.codePointAt(0)!
    if (code < 0x100) bytes.push(code)
    else if (CP1252_BACK[ch] !== undefined) bytes.push(CP1252_BACK[ch])
    else return null
  }
  try {
    const back = Buffer.from(bytes).toString('utf8')
    // only accept it when the round trip is genuinely shorter (a real multi-byte
    // character) and it did not smuggle a replacement character in
    if (!back || back.includes('\uFFFD') || back.length >= run.length) return null
    return back
  } catch { return null }
}

/**
 * A mojibake run is one UTF-8 lead byte plus the bytes that a CP1252 renderer turned the
 * continuation bytes into — which is € for 0x80, œ for 0x9C, " for 0x94, and (in a PDF that
 * kept the control code instead) 0x80–0x9F themselves. All of them have to be in this class
 * or the opening quote repairs while the closing one is left behind, which is the asymmetry
 * a real level of digital-marketing shipped with.
 */
const MOJI_CONT = '[\u0080-\u009f\u00a0-\u00ff\u0100-\u017f\u0192\u02c6\u02dc\u2013\u2014\u2018\u2019\u201a\u201c\u201d\u201e\u2020\u2021\u2022\u2026\u2030\u2039\u203a\u20ac\u2122]'
const MOJI_RUN_RE = new RegExp(`[\\u00c2\\u00c3\\u00e2\\u00c5\\u00cb]${MOJI_CONT}{1,3}(?![\\u00a0-\\u00ff])`, 'g')

export function scrubMojibake(text: string): string {
  if (!/[\u0080-\u009f\u00c2\u00c3\u00e2\u0152\u017d\u0192\u02c6\u02dc\u2018-\u201e\u2020-\u2022\u2026\u2030\u2039\u203a\u20ac\u2122]/.test(text)) return text
  // 1. real repair: CP1252-rendered UTF-8 back to the character it was meant to be
  let out = text.replace(MOJI_RUN_RE, m => roundTrip(m) ?? m)
  // 2. leftovers: an orphan lead byte (a glyph the PDF never embedded, e.g. an emoji
  //    that arrived as "â" + NUL + "Å\u0092") is decoration, not content — drop it.
  out = out.replace(/[\u00c2\u00c3\u00e2][\u0080-\u009f\u0152\u017d\u0192\u02c6\u02dc\u2018\u2019\u201c\u201d\u2022\u2013\u2014\u2122]{1,2}/g, '')
  out = out.replace(/[\u00c2\u00c3\u00e2](?=$|[\s,.;:)\]])/gm, '')
  out = out.replace(/[\u0080-\u009f]/g, ch => C1_MAP[ch.charCodeAt(0)] ?? '')
  return out.replace(/[ \t]{2,}/g, ' ').replace(/ +([,.;:)\n])/g, '$1')
}

/**
 * The A→O section letters, from either a real markdown heading or the bare
 * "F. Full Lecture Notes" line that some manuals produce instead (their tables
 * survived the PDF conversion without heading markers). A bare letter only counts
 * when it continues the sequence and reads like one of the manual's own titles —
 * that is what stops "A. First you open the file" from becoming a section.
 */
const BARE_HEAD_RE = /^([A-O])\.\s+([A-Z][^.\n]{2,72})$/
const TITLEISH = /IDENTIFICATION|OUTCOMES|MATERIALS|RESOURCES|OPENING|ACTIVITY|PREREQUISITE|REVIEW|LECTURE|DEMONSTRATION|GUIDED|PRACTICAL|INDEPENDENT|EXERCISE|CASE|STUDY|MISTAKES|TROUBLESHOOTING|FAILURE|REMEDIATION|ASSIGNMENT|HOMEWORK|CAPSTONE|BRIEF|CHECK|QUIZ|ASSESSMENT|REFLECTION|RECAP|WRAP|SUMMARY|EVALUATION|NOTES|VIVA/i

function detectHeading(line: string, inFence: boolean, seen: Set<string>, lastLetter: string): RegExpMatchArray | null {
  const h = HEAD_RE.exec(line)
  if (h) return h
  if (inFence || !line || /^[-*•|>]/.test(line) || /^#{1,6}/.test(line)) return null
  const bare = BARE_HEAD_RE.exec(line)
  if (!bare) return null
  if (seen.has(bare[1])) return null
  if (bare[1].charCodeAt(0) <= lastLetter.charCodeAt(0)) return null
  if (!TITLEISH.test(bare[2])) return null
  return [line, bare[1], bare[2]] as unknown as RegExpMatchArray
}

export function parseSessionFile(md: string, file: string): RawSession {
  let front: Record<string, any> = {}
  let body = md
  const m = /^---\n([\s\S]*?)\n---\n?/.exec(md)
  if (m) {
    try { front = JSON.parse(m[1]) } catch { front = {} }
    body = md.slice(m[0].length)
  }
  // A few manuals carry a NUL where a glyph failed to embed (an emoji whose UTF-16
  // surrogate pair the PDF wrote half-heartedly). The control character has to go
  // *before* the mojibake repair, because it is what splits the broken run in two.
  const lines = scrubMojibake(body.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '')).split('\n')
  const sections: RawSession['sections'] = []
  let cur: { letter: string; kind: SectionKind; title: string; buf: string[] } | null = null
  let inFence = false
  const seen = new Set<string>()
  let lastLetter = '@'
  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (line.startsWith('```')) inFence = !inFence
    const h = detectHeading(line, inFence, seen, lastLetter)
    if (h) {
      if (cur) sections.push(finalize(cur))
      seen.add(h[1])
      lastLetter = h[1]
      cur = { letter: h[1], kind: 'other', title: h[2].trim(), buf: [] }
      continue
    }
    const k = cur && KIND_RE.exec(line)
    if (k && cur) {
      cur.kind = (SECTION_KINDS as string[]).includes(k[1]) ? (k[1] as SectionKind) : 'other'
      continue
    }
    if (cur) cur.buf.push(line)
  }
  if (cur) sections.push(finalize(cur))
  return {
    front,
    file,
    sections: sections.map(s => ({ letter: s.letter, kind: s.kind, title: s.title, raw: s.raw, blocks: s.blocks })),
  }

  function finalize(c: { letter: string; kind: SectionKind; title: string; buf: string[] }) {
    const raw = c.buf.join('\n').replace(/\n{3,}/g, '\n\n').trim()
    // A marker always wins; otherwise fall back to the letter, then to the title
    // ("Rubric" sections are lettered inconsistently across the 16 manuals).
    let kind = c.kind
    if (kind === 'other') kind = LETTER_KIND[c.letter] ?? 'other'
    if (kind === 'other' && /rubric|marking/i.test(c.title)) kind = 'rubric'
    return { letter: c.letter, kind, title: tidyTitle(c.title), raw, blocks: mdToBlocks(raw) }
  }
}

const TITLE_FIX = /\s*-\s*(?=[a-z])/g
export function tidyTitle(t: string): string {
  return t.replace(/&#39;/g, "'").replace(TITLE_FIX, '-').replace(/\s+/g, ' ').trim()
}

export function sectionText(s: { blocks: Block[] }): string {
  return s.blocks.map(b => (b.t === 'list' ? b.items.map(i => i.text).join('\n') : (b as any).text || '')).join('\n')
}

export function countWords(s: { blocks: Block[] }): number {
  return sectionText(s).split(/\s+/).filter(w => w.length > 1).length
}

// ---------------------------------------------------------------------------
// course.json (emitted by the PDF extractor) -> Course
// ---------------------------------------------------------------------------

const FALLBACK_FEE_NOTE = 'fee declared in the course design document'

/** Cover-page tables in the PDFs bleed into the wrong fields; these helpers undo that. */
const FOOTER_LINE = /page \d+ of \d+|cyber\s*elias\s*academy\s*$|^\s*[-–|·]+\s*$/i
// A bare label like "Primary Audience:" or "Key Skills" is a heading the PDF dragged into
// the list, not an item. It has to end in a colon to count, or a real tool name
// ("VS Code", "Canva") gets eaten with it.
const LABEL_LINE = /^[A-Z][A-Za-z0-9 ()&’'-]{1,46}:$/
const LIST_DANGLERS = new Set(['free', 'and', 'or', 'the', 'a', 'an', 'with', 'for', 'of', 'to', 'in', 'on', 'academy', 'other', 'others'])

function toLines(v: unknown): string[] {
  if (Array.isArray(v)) {
    // The extractor already split these on the PDF's own line breaks, which can start a
    // continued sentence with "and".
    return v.map(x => String(x).replace(/\s+/g, ' ').replace(/^and\s+(?=[a-z])/i, '').trim()).filter(Boolean)
  }
  if (typeof v === 'string') {
    // A manual prints these fields as prose ("A smartphone, free Google tools (Docs,
    // Sheets, Slides), WhatsApp Business…"). Splitting on every comma cut the phrase in
    // half inside its own parentheses, and splitting on nothing left a wall of text, so:
    // break on lines/semicolons, then on commas that are *outside* brackets, and only when
    // every piece still reads as an item.
    const parts: string[] = []
    for (const chunk of v.split(/\r?\n|;/)) {
      const line = chunk.replace(/\s+/g, ' ').trim()
      if (!line) continue
      const commas = splitOutsideBrackets(line)
      if (commas.length >= 3 && commas.every(x => x.length >= 3 && x.length <= 88)) parts.push(...commas)
      else parts.push(line)
    }
    return parts.map(x => {
      let t = x.replace(/^and\s+/i, '').trim()
      // The fee/tools tables are cut off by the PDF column, so a list can end inside its
      // own parenthesis. Say so instead of pretending the sentence finished.
      if ((t.match(/\(/g) || []).length > (t.match(/\)/g) || []).length) t = `${t.trimEnd()}…)`
      return t
    }).filter(Boolean)
  }
  return []
}

function splitOutsideBrackets(line: string): string[] {
  const out: string[] = []
  let depth = 0
  let cur = ''
  for (const ch of line) {
    if (ch === '(' || ch === '[') depth++
    if (ch === ')' || ch === ']') depth = Math.max(0, depth - 1)
    if (ch === ',' && depth === 0) {
      out.push(cur.trim())
      cur = ''
      continue
    }
    cur += ch
  }
  if (cur.trim()) out.push(cur.trim())
  return out.filter(Boolean)
}

function cleanList(v: unknown): string[] {
  return toLines(v)
    .filter(l => !FOOTER_LINE.test(l))
    .filter(l => l.replace(/[^A-Za-z0-9]/g, '').length > 3)
    .filter(l => !(LABEL_LINE.test(l) && l.split(/\s+/).length <= 7))
    // A PDF line that broke mid-sentence leaves a connector on its own ("free", "and
    // academy"). It is not an item; a real one-word tool ("Canva", "Figma") survives.
    .filter(l => !(/^[a-z]/.test(l) && l.split(/\s+/).length === 1 && LIST_DANGLERS.has(l.toLowerCase())))
    .slice(0, 12)
    .map(l => l.replace(/\s*\|\s*Cyber Elias Academy.*$/i, '').trim())
    .filter(Boolean)
}

function cleanTitle(raw: unknown, fallback: string): string {
  const t = String(raw ?? '').replace(/\s+/g, ' ').trim()
  if (!t) return fallback
  // "Data Entry Course Category: Office & Data — … Target Duration: 2 weeks (…"
  const cut = t.split(/\s+Course Category:\s|\s+Category:\s|\s+Target Duration:\s|\s+Target\s/i)[0].trim()
  const cleaned = cut.replace(/\s*\(Short Course\)$/i, '').replace(/\s+Course$/i, '').trim()
  if (!cleaned || cleaned.length > 64 || /\||₦/.test(cleaned)) return fallback
  return cleaned || fallback
}

function cleanMode(raw: unknown): string {
  const t = String(raw ?? '').replace(/\s+/g, ' ').trim()
  if (t && t.length <= 80 && /in-person|online|hybrid|self-paced|remote/i.test(t) && !/Session Length/i.test(t)) return t
  return 'In-person, with an online/hybrid option where available'
}

function cleanDuration(json: any): string {
  const weeks = Number(json.weeks) || Number(/(\d+)\s*week/i.exec(String(json.duration ?? ''))?.[1]) || 0
  const sessions = Number(json.sessions_count) || 0
  const len = Number(json.session_length_minutes) || 105
  if (weeks && sessions) return `${weeks} week${weeks > 1 ? 's' : ''} · ${sessions} sessions × ${len} minutes`
  // A cell like "Key Skills" is the next column bleeding in, not a duration: only text
  // that actually talks about time may override the arithmetic the manual states.
  const t = String(json.duration ?? '').split('|')[0].replace(/\s+/g, ' ').trim()
  if (t && t.length < 48 && /\d|week|day|month|session|hour|minute|self.?paced/i.test(t)) return t
  if (sessions) return weeks ? `${weeks} weeks · ${sessions} sessions × ${len} minutes` : `${sessions} sessions × ${len} minutes`
  return ''
}

/**
 * Every CEA manual states a certificate; the extracted string is often the cover
 * table's "Name" cell, so the *boolean* is what the app should trust, and the
 * certificate is named after the course rather than scraped.
 */
function cleanCertificate(json: any, title: string): { awarded: boolean; name: string } {
  const raw = String(json.certificate ?? '')
  const named = /CEA Certificate in ([^—|]{4,70})/i.exec(raw)
  return {
    awarded: true,
    name: named ? `CEA Certificate in ${named[1].trim()}` : `CEA Certificate in ${title}`,
  }
}

export function normalizeCourse(json: any, sessions: { number: number; title: string; module?: string; difficulty?: string }[]): Course {
  const cap = json.sessions?.length || sessions.length
  const name = String(json.name ?? json.slug ?? '')
  const displayTitle = cleanTitle(json.display_title, name)
  const cert = cleanCertificate(json, displayTitle)
  const weeks = Number(json.weeks) || Number(/(\d+)\s*week/i.exec(String(json.duration ?? ''))?.[1]) || undefined
  return {
    slug: json.slug,
    name,
    displayTitle,
    category: String(json.category ?? '').split(/\s+Target\s/i)[0].replace(/\s+/g, ' ').trim() || 'Professional Skills',
    studyMode: cleanMode(json.study_mode),
    duration: cleanDuration(json),
    weeks,
    sessionsPerWeek: Number(json.sessions_per_week) || 3,
    sessionLengthMinutes: Number(json.session_length_minutes) || 105,
    sessionsCount: Number(json.sessions_count) || cap,
    feeNgn: json.fee_ngn ?? null,
    certificate: cert.awarded,
    certificateName: cert.name,
    mission: json.mission,
    problem: toLines(json.problem).join(' ') || undefined,
    progression: json.progression,
    runningExample: json.running_example,
    successDefinition: json.success_definition,
    scopeStatement: json.scope_statement,
    audience: cleanList(json.audience),
    entryRequirements: cleanList(json.entry_requirements),
    tools: cleanList(json.tools),
    accent: json.accent || '#2c5282',
    cover: `/assets/covers/${json.slug}.svg`,
    sessions: (json.sessions || []).map((s: any) => ({
      number: s.number,
      title: s.title,
      module: s.module,
      isFree: s.number === 1,
      isCapstone: /capstone|showcase|present/i.test(s.title || ''),
    })),
    pdf: json.pdfs || {},
  }
}

export { FALLBACK_FEE_NOTE }
