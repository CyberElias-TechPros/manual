/**
 * The plain-English pass (docs/ROADMAP.md 11.x, and the academy's "a beginner must grasp any concept"
 * rule of 2026-10-29).
 *
 * `content/<slug>/session-NN.md` is the extraction from the trainers' PDFs. It stays exactly as
 * extracted — it is the audit trail back to the source, and every answer key is derived from its
 * question markers. So the learner-facing simplification happens on the way *into* the build, in this
 * file, and it never rewrites the source on disk.
 *
 * Three moves, from the least to the most invasive:
 *   1. **substitution** — a hard formal word becomes the everyday one ("utilise" → "use"). Same length
 *      or shorter, so no sentence gains a concept;
 *   2. **acronym expansion** — the first time a level says "DNS", it says "DNS (the book that turns a
 *      name into a number)". Once per level, because the second mention needs no help;
 *   3. **override** — a hand-rewritten level in `content-plain/<slug>/session-NN.md` replaces the
 *      extracted one entirely. This is where a real rewrite lands, level by level, and it is why the
 *      other two moves are mechanical: they make the whole corpus readable today, while the careful
 *      rewrites arrive course by course.
 *
 * What the pass refuses to touch: fenced code, inline code, headings and table rows. A command is not
 * prose — renaming `generate_census_db()` to `create_census_db()` would teach a learner a command that
 * does not exist, which is worse than a hard word.
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

// The repo root, derived the same way build.ts does it — duplicated on purpose so this module never
// imports the builder that imports it.
const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')

export interface GlossaryTerm { term: string; plain: string }
export interface PlainCourseCopy { tagline: string; summary: string }
export interface PlainPass {
  acronyms: Record<string, string>
  substitutions: Record<string, string>
  glossary: GlossaryTerm[]
  courses: Record<string, PlainCourseCopy>
}

const PASS_FILE = join(REPO, 'content-plain', 'plain-pass.json')
const OVERRIDE_DIR = join(REPO, 'content-plain')

let cached: PlainPass | null = null
/** Missing file is not an error: the build must work in a checkout that predates the layer. */
export function plainPass(): PlainPass {
  if (cached) return cached
  try {
    const raw = JSON.parse(readFileSync(PASS_FILE, 'utf8'))
    cached = {
      acronyms: raw.acronyms || {},
      substitutions: raw.substitutions || {},
      glossary: raw.glossary || [],
      courses: raw.courses || {},
    }
  } catch {
    cached = { acronyms: {}, substitutions: {}, glossary: [], courses: {} }
  }
  return cached
}

/** Longest keys first, so "in order to" is taken before "order" and "provided that" before "provide". */
function byLengthDesc(keys: string[]): string[] {
  return [...keys].sort((a, b) => b.length - a.length)
}
const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Is this word really prose, or part of an identifier / a call / a filename? */
function isBareWord(md: string, start: number, end: number): boolean {
  const before = md[start - 1] ?? ' '
  const after = md[end] ?? ' '
  if (/[_\-./]/.test(before)) return false
  if (/[_\-.(]/.test(after)) return false
  return !/[A-Za-z0-9]/.test(before) && !/[A-Za-z0-9]/.test(after)
}

/**
 * Walk the markdown a line at a time, skipping what must not be rewritten, and hand back only prose
 * lines. Fenced blocks are tracked by their own markers; a line with an odd number of backticks has
 * inline code in it, so the parts outside the backticks are the prose.
 */
function mapProse(md: string, fn: (line: string) => string): string {
  let inFence = false
  return md.replace(/\r/g, '').split('\n').map(line => {
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; return line }
    if (inFence) return line
    if (/^\s*(#|\||>?\s*\|)/.test(line)) return line            // heading or table row
    if (line.includes('`')) {
      // rewrite around the code spans, never inside them
      const parts = line.split(/(`[^`]*`)/)
      return parts.map((p, i) => (i % 2 === 1 ? p : fn(p))).join('')
    }
    return fn(line)
  }).join('\n')
}

/** `Utilize` at a sentence start keeps its capital; a mid-sentence word keeps the case it had. */
function matchCase(from: string, to: string): string {
  if (/^[A-Z]/.test(from) && /^[a-z]/.test(to)) return to[0].toUpperCase() + to.slice(1)
  return to
}

/**
 * Step 1 — hard word → everyday word. Whole words and whole phrases only, and only in prose: the same
 * walk `expandAcronyms` uses, so a command inside backticks or a fenced block is never renamed. That
 * is not a nicety — `generate_report()` becoming `create_report()` is a wrong instruction, and the
 * manual would then be teaching something that does not run.
 */
export function simplify(md: string, subs = plainPass().substitutions): string {
  const keys = byLengthDesc(Object.keys(subs))
  const re = new RegExp(`(?<![A-Za-z0-9_])(${keys.map(esc).join('|')})(?![A-Za-z0-9_])`, 'gi')
  return mapProse(md, line => line.replace(re, (m, _g, offset: number) => {
    if (!isBareWord(line, offset, offset + m.length)) return m
    const rep = subs[String(m).toLowerCase()]
    return rep ? matchCase(String(m), rep) : m
  }))
  // One pass is enough: the table is written so that no output word is also an input word.
}

/**
 * Step 2 — spell out each acronym the first time a level uses it. Skipped when the source already
 * explains it (a parenthesis right after the letters), because the manual is then doing its own job.
 */
export function expandAcronyms(md: string, acronyms = plainPass().acronyms): string {
  const done = new Set<string>()
  const keys = byLengthDesc(Object.keys(acronyms))
  const re = new RegExp(`(?<![A-Za-z0-9_])(${keys.map(esc).join('|')})(?![A-Za-z0-9_])`, 'g')
  return mapProse(md, line => {
    let changed = line
    for (const m of line.matchAll(re)) {
      const key = String(m[1]).toUpperCase()
      if (done.has(key) || !acronyms[key]) continue
      const after = changed.slice((m.index ?? 0) + key.length, (m.index ?? 0) + key.length + 2)
      if (after.startsWith('(') || after.startsWith(' (')) continue
      done.add(key)
      changed = changed.replace(m[0], `${m[0]} (${acronyms[key]})`)
    }
    return changed
  })
}

/** Step 3 — a hand-rewritten level wins outright. Same file name, different directory. */
export function sessionSource(slug: string, file: string): { path: string; overridden: boolean } {
  const override = join(OVERRIDE_DIR, slug, file)
  if (existsSync(override)) return { path: override, overridden: true }
  return { path: join(REPO, 'content', slug, file), overridden: false }
}

/**
 * The words that stay, because they are the subject — with the one-line plain meaning next to them.
 * Ordered by first appearance in the level, capped at 12: a wall of definitions is its own kind of
 * noise, and a level that needs more than 12 explanations needs a rewrite, not a glossary.
 */
export function glossaryFor(md: string, cap = 12, glossary = plainPass().glossary): GlossaryTerm[] {
  const found: { at: number; term: GlossaryTerm }[] = []
  for (const g of glossary) {
    const re = new RegExp(`(?<![A-Za-z0-9_])${esc(g.term)}(?![A-Za-z0-9_])`, 'i')
    const m = md.search(re)
    if (m >= 0) found.push({ at: m, term: g })
  }
  return found.sort((a, b) => a.at - b.at).slice(0, cap).map(x => x.term)
}

const READING_SECTION_KINDS = new Set([
  'opening', 'prereq_review', 'lecture', 'demo', 'guided_practical', 'troubleshooting',
])

/**
 * Step 0 — turn classroom trainer scripts ("Instructor Script:", "Ask the class:", "Write on the board:",
 * and PDF subheadings glued onto "The idea.") into direct, warm, self-paced learner prose.
 *
 * Scoped strictly to reading sections (and outside fenced code blocks), so `knowledge_check`, `exercise`
 * and `case_study` markers are never touched and every quiz question, exercise and answer key stays 1:1
 * auditable against the source PDF.
 */
export function cleanClassroomVoice(md: string): string {
  let kind = ''
  let inFence = false
  return md.replace(/\r/g, '').split('\n').map(line => {
    const kindMatch = line.match(/^<!--\s*kind:([a-z_]+)\s*-->/i)
    if (kindMatch) { kind = kindMatch[1].toLowerCase(); return line }
    if (/^\s*(```|~~~)/.test(line)) { inFence = !inFence; return line }
    if (inFence || (kind && !READING_SECTION_KINDS.has(kind))) return line
    if (/^\s*(#|\||>?\s*\|)/.test(line)) return line

    let out = line
    const hadScriptQuote = /Instructor\s+Script\s*:\s*"/i.test(out)
    out = out.replace(/Instructor\s+Setup\s*:[^\n]*?(?=Instructor\s+Script\s*:)/gi, '')
    out = out.replace(/^Topic\s+(\d+)\s*:\s*([^(\n]+?)\s*\(\d+\s*minutes?\)\s*Instructor\s+Script\s*:\s*"?/i, '### Part $1: $2\n\n')
    out = out.replace(/^Topic\s+(\d+)\s*:\s*([^(\n]+?)\s*\(\d+\s*minutes?\)\s*/i, '### Part $1: $2\n\n')
    out = out.replace(/Instructor\s+Script\s*:\s*"?/gi, '')
    out = out.replace(/Instructor\s+Setup\s*:/gi, '**Setup:**')
    out = out.replace(/Instructor\s+Demonstrates\s*\([^)]*\)\s*:/gi, '**Step-by-step walkthrough:**')
    out = out.replace(/Ask\s+the\s+(?:class|learners|students|room)\s*:/gi, '**Think about this:**')
    out = out.replace(/Write\s+on\s+the\s+(?:white)?board\s*:/gi, '**Key point to remember:**')
    out = out.replace(/^([A-Z]\.\d+)\s+([A-Z][^\n.?!:]{2,80})$/, '\n### $2\n')
    out = out.replace(/^([A-Z]\.\d+)\s+([A-Z][^\n.?!]{3,75}?)\s+(The idea\.|Plain-English definition\.|Why it matters\.|In plain English\.|How it works\.)/,
      '\n### $2\n\n**$3**')
    out = out.replace(/^(The idea|Plain-English definition|In plain English|Why it exists|Why it matters|What it protects|How it works|Real-life example|Rule of thumb|Watch out|Common mistake|Key takeaway)\.\s+/,
      '\n**$1** — ')
    if (hadScriptQuote && out.endsWith('"') && (out.match(/"/g) || []).length % 2 === 1) {
      out = out.slice(0, -1)
    }
    return out
  }).join('\n')
}

/** The whole pass, in one call, from the extracted markdown to what the build should parse. */
export function applyPlainPass(md: string, slug: string, file: string): { md: string; overridden: boolean; source: string } {
  const src = sessionSource(slug, file)
  const raw = src.overridden ? readFileSync(src.path, 'utf8') : md
  const cleaned = src.overridden ? raw : cleanClassroomVoice(raw)
  return { md: expandAcronyms(simplify(cleaned)), overridden: src.overridden, source: src.overridden ? `content-plain/${slug}/${file}` : `content/${slug}/${file}` }
}

// ---------------------------------------------------------------------------
// the gate: definitions are held to the same rule they exist to serve
// ---------------------------------------------------------------------------

const MAX_DEFINITION_WORDS = 20

/**
 * A definition that uses a word the table says is too hard, or that hides an unexplained acronym in
 * itself, is not a definition. These checks are why the file can be edited by a trainer: the rule is
 * enforced by the build, not by review.
 */
export function plainPassIssues(allMd: string[], pass: PlainPass = plainPass()): { level: 'critical' | 'info'; code: string; message: string }[] {
  const out: { level: 'critical' | 'info'; code: string; message: string }[] = []
  // Both sets come from the table handed in, not from the global one: a caller that passes a small
  // table (a test, or a future per-course override) must be judged by its own rules.
  const subs = new Set(Object.keys(pass.substitutions))
  const knownAcronyms = new Set(Object.keys(pass.acronyms).map(k => k.toLowerCase()))

  for (const g of pass.glossary) {
    const words = g.plain.trim().split(/\s+/)
    if (words.length > MAX_DEFINITION_WORDS) {
      out.push({ level: 'critical', code: 'plain-definition', message: `"${g.term}" is explained in ${words.length} words — a glossary line is one breath (${MAX_DEFINITION_WORDS} max)` })
    }
    const hard = words.filter(w => subs.has(w.toLowerCase().replace(/[^a-z]/g, '')))
    if (hard.length) out.push({ level: 'critical', code: 'plain-definition', message: `"${g.term}" is explained with "${hard[0]}", which the pass itself calls too hard` })
    const hidden = words.map(w => w.replace(/[^A-Za-z]/g, '')).filter(w => w.length >= 3 && w === w.toUpperCase() && !knownAcronyms.has(w.toLowerCase()))
    if (hidden.length) out.push({ level: 'critical', code: 'plain-definition', message: `"${g.term}" is explained with the unspelled acronym "${hidden[0]}"` })
  }

  // Dead entries are not a failure — they are the list a writer prunes, and the proof the table is
  // matched to this corpus rather than to a general idea of "jargon".
  const corpus = allMd.join('\n')
  const dead = (keys: string[]) => keys.filter(k => !new RegExp(`(?<![A-Za-z0-9_])${esc(k)}(?![A-Za-z0-9_])`, 'i').test(corpus))
  const deadSubs = dead(Object.keys(pass.substitutions))
  const deadAcro = dead(Object.keys(pass.acronyms))
  const deadTerms = dead(pass.glossary.map(g => g.term))
  if (deadSubs.length + deadAcro.length + deadTerms.length > 0) {
    out.push({ level: 'info', code: 'plain-unused', message: `in this corpus, never met: ${deadTerms.length} glossary (${deadTerms.slice(0, 6).join(', ')}), ${deadAcro.length} acronyms, ${deadSubs.length} word swaps — prune them or the table grows without helping` })
  }
  return out
}

/** How much of a level is a sentence a beginner has to re-read. Reported, not enforced. */
export function longSentenceShare(md: string, over = 30): number {
  const prose = md.split('\n').filter(l => l.trim() && !/^\s*(```|~~~|#|\|)/.test(l)).join(' ')
  const sentences = prose.split(/(?<=[.!?])\s+/).filter(s => s.split(/\s+/).length > 4)
  if (!sentences.length) return 0
  const long = sentences.filter(s => s.replace(/`[^`]*`/g, ' code ').split(/\s+/).length > over)
  return Math.round((long.length / sentences.length) * 100)
}
