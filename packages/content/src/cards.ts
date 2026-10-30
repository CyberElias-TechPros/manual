/**
 * Bite-sized micro-learning card & Quick-Check builder.
 *
 * Why this exists: the source teaching manuals pack 2,000–4,400 words into a single `lecture`
 * section (`F`) and hold all questions until the end of the level. For a beginner on a phone,
 * reading 4,000 words before answering one question feels like a textbook wall.
 *
 * This module transforms every level into:
 *   1. Focused ~140–210 word `LessonCard`s built from the level's real learner-facing teaching
 *      sections (`lecture`, `demo`, `guided_practical`, `troubleshooting` — skipping classroom
 *      teacher warm-up scripts `D`/`E` while auto-crediting all reading letters),
 *   2. Airy 2-sentence paragraphs (`splitLongBlocks` breaks >58-word walls at sentence boundaries),
 *   3. A bold 1-sentence plain-English `takeaway` ("In simple words") on every single card,
 *   4. Card-local `terms` (unambiguous tricky terms explained right on the card), and
 *   5. Tap-to-answer `MicroCheck`s ("Quick Check · +5 XP") after every sub-topic (every 2–3 cards),
 *      with answer keys separated into `keys/` so `POST /api/learn/micro-check` grades and mints XP
 *      strictly on the server.
 *
 * When `content-plain/starters/<slug>.json` exists for Level 1, the hand-authored Duolingo/Mimo-style
 * starter deck is used directly while crediting all underlying manual reading letters.
 */
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { mdToBlocks, parseInline } from './parse.js'
import { glossaryFor, plainPass } from './plain.js'
import type { Block, Choice, Flashcard, LessonCard, MicroCheck, Section, SectionKind } from './schema.js'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const STARTERS_DIR = join(REPO, 'content-plain', 'starters')

/** Sections shown in the full manual rail (must all be credited when card deck finishes). */
const ALL_READ_KINDS = new Set<SectionKind>([
  'opening', 'prereq_review', 'lecture', 'demo', 'guided_practical', 'troubleshooting',
])

/**
 * Sections turned into bite-sized learner cards on Levels 2–12 (`opening`, `prereq_review`, and
 * `demo` in the manuals are classroom teacher/projector scripts, whereas `lecture`,
 * `guided_practical`, and `troubleshooting` are direct learner lessons, hands-on steps, and
 * common fixes — while `creditLetters` still auto-credits all manual reading letters).
 */
const CORE_CARD_KINDS = new Set<SectionKind>([
  'lecture', 'guided_practical', 'troubleshooting',
])

const KICKER_BY_KIND: Record<string, string> = {
  opening: 'Warm-up',
  prereq_review: 'Quick recap',
  lecture: 'Core idea',
  demo: 'Step-by-step walkthrough',
  guided_practical: 'Hands-on practice',
  troubleshooting: 'Common mistakes & fixes',
}

const DEFAULT_TITLE_BY_KIND: Record<string, string> = {
  opening: 'Warm-up',
  prereq_review: 'Quick recap',
  lecture: 'Core lesson idea',
  demo: 'Step-by-step walkthrough',
  guided_practical: 'Try it yourself, step by step',
  troubleshooting: 'Common mistakes & easy fixes',
}

/**
 * Everyday English words in `plain-pass.json` that also have a specialist tech sense — never quiz
 * these out of context unless the course is specifically about them, so a casual verb ("build a habit",
 * "log your hours") never triggers a compiler/DevOps definition.
 */
const AMBIGUOUS_GLOSSARY_TERMS = new Set([
  'build', 'log', 'lead', 'copy', 'grid', 'column', 'row', 'table', 'field', 'record',
  'query', 'branch', 'tag', 'loop', 'class', 'state', 'frame', 'cut', 'clip', 'layer',
  'mask', 'contrast', 'balance', 'pitch', 'scope', 'key', 'cell', 'form', 'filter',
  'index', 'link', 'host', 'port', 'route', 'script', 'shell', 'string', 'token', 'view',
  'mean', 'median', 'risk', 'threat', 'patch', 'backup', 'ping', 'salt', 'hash', 'process',
  'thread', 'cache', 'cookie', 'commit', 'merge', 'deploy', 'object', 'function', 'array',
  'promise', 'transaction', 'formula', 'percentage', 'forecast', 'leading', 'impression',
  'reach', 'conversion', 'funnel', 'session', 'nurture', 'campaign', 'sensitivity',
  'milestone', 'estimate', 'shortcut', 'folder', 'template', 'margin', 'alignment', 'crop',
  'timeline', 'caption', 'hook', 'driver', 'client', 'server', 'gateway', 'terminal',
  'snapshot', 'container', 'semantic', 'accessibility', 'dependency', 'conditional',
  'runtime', 'syntax', 'schema', 'macro', 'outlier', 'correlation', 'hierarchy',
  'persona', 'analytics', 'iteration', 'deliverable', 'stakeholder', 'retrospective',
  'ribbon', 'resolution', 'algorithm', 'retainer', 'invoice', 'portfolio', 'browser', 'keyword',
])

const GENERIC_FLASH_FRONTS = /^(?:important(?:\s+\w+)?|limitation|note|rule(?:\s+of\s+thumb)?|warning|watch\s+out|example|setup|objective|goal|practical\s+objective|exercise|mistake\s*\d*|symptom|symptoms|likely\s+cause|fix|tip|summary|key\s+point|remember|check|[a-o]\.\d+\b)/i

interface StarterCardSpec {
  letter: string
  kicker: string
  title: string
  takeaway: string
  body: string
  check?: {
    prompt: string
    choices: Choice[]
    correctId: string
    hint?: string
    explanation: string
  }
}

function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function stripMd(s: string): string {
  return s
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function capFirst(s: string): string {
  const t = s.trim()
  if (!t) return ''
  return t[0].toUpperCase() + t.slice(1)
}

function oneCleanSentence(s: string, maxLen = 135): string {
  const clean = stripMd(s)
    .replace(/^(?:Plain-English definition|In plain English|The idea|Why it exists|Why it matters|What it protects|How it works|Real-life example|Rule of thumb|Watch out|Common mistake|Key takeaway|Setup|Step-by-step walkthrough)\s*[—–:-]\s*/i, '')
    .trim()
  if (!clean) return ''
  const first = clean.split(/(?<=[.!?])\s+(?=[A-Z0-9"“‘(])/)[0] || clean
  if (first.length <= maxLen) return /[.!?]$/.test(first) ? first : `${first}.`
  const cut = first.slice(0, maxLen)
  const sp = Math.max(cut.lastIndexOf(' '), cut.lastIndexOf(','), cut.lastIndexOf(';'))
  return `${(sp > maxLen * 0.6 ? cut.slice(0, sp) : cut).replace(/[,;:\s]+$/, '')}…`
}

function blockWords(b: Block): number {
  if (b.t === 'list') return b.items.reduce((n, it) => n + it.text.split(/\s+/).filter(Boolean).length, 0)
  if (b.t === 'table') return b.head.length + b.rows.flat().join(' ').split(/\s+/).filter(Boolean).length
  return (b.text || '').split(/\s+/).filter(Boolean).length
}

function blockText(b: Block): string {
  if (b.t === 'list') return b.items.map(i => i.text).join('\n')
  if (b.t === 'table') return [b.head.join(' '), ...b.rows.map(r => r.join(' '))].join('\n')
  return b.text || ''
}

/**
 * Split a dense >58-word paragraph at natural sentence boundaries (never inside backticks or bold)
 * so learners read airy 2-sentence paragraphs instead of 200-word textbook blocks.
 */
function splitSentencesSafe(text: string): string[] {
  const out: string[] = []
  let cur = ''
  let inTick = false
  let boldCount = 0
  for (let i = 0; i < text.length; i++) {
    const ch = text[i]
    if (ch === '`') inTick = !inTick
    if (!inTick && ch === '*' && text[i + 1] === '*') {
      boldCount++
      cur += '**'
      i++
      continue
    }
    cur += ch
    if (!inTick && boldCount % 2 === 0 && /[.!?]/.test(ch) && text[i + 1] === ' ') {
      const next = text.slice(i + 2)
      const tailWord = cur.trim().split(/\s+/).pop() || ''
      if (/^(?:e\.g\.|i\.e\.|vs\.|mr\.|mrs\.|dr\.|fig\.|\d+\.)$/i.test(tailWord)) continue
      if (/^[A-Z*"“‘(]/.test(next)) {
        out.push(cur.trim())
        cur = ''
        i++
      }
    }
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

export function splitLongBlocks(blocks: Block[]): Block[] {
  const out: Block[] = []
  for (const b of blocks) {
    if (b.t !== 'p' || blockWords(b) <= 58) {
      out.push(b)
      continue
    }
    const sentences = splitSentencesSafe(b.text)
    if (sentences.length < 2) {
      out.push(b)
      continue
    }
    let chunk: string[] = []
    let words = 0
    for (const s of sentences) {
      const w = s.split(/\s+/).filter(Boolean).length
      if (chunk.length > 0 && (words + w > 55 || chunk.length >= 2)) {
        const joined = chunk.join(' ')
        out.push({ t: 'p', text: joined, inline: parseInline(joined) })
        chunk = [s]
        words = w
      } else {
        chunk.push(s)
        words += w
      }
    }
    if (chunk.length) {
      const joined = chunk.join(' ')
      out.push({ t: 'p', text: joined, inline: parseInline(joined) })
    }
  }
  return out
}

function extractTakeaway(title: string, blocks: Block[]): string {
  for (const b of blocks) {
    if (b.t === 'p' && /^\*\*(?:Plain-English definition|In plain English|The idea|Key takeaway|Rule of thumb|Why it matters|Why it exists)\*\*/i.test(b.text)) {
      const s = oneCleanSentence(b.text, 145)
      if (s.length >= 22) return s
    }
  }
  for (const b of blocks) {
    if (b.t === 'callout') {
      const s = oneCleanSentence(b.text, 145)
      if (s.length >= 22) return s
    }
  }
  for (const b of blocks) {
    if (b.t === 'p') {
      const s = oneCleanSentence(b.text, 140)
      if (s.length >= 24 && !/^(?:Setup|Instructor|Step \d+)/i.test(s)) return s
    }
    if (b.t === 'list' && b.items.length) {
      const s = oneCleanSentence(b.items[0].text, 135)
      if (s.length >= 22) return s
    }
  }
  return capFirst(oneCleanSentence(title, 120) || 'Read this short card, then test yourself in the Quick Check ahead.')
}

function cleanCardTitle(raw: string, kind: string): string {
  const fallback = DEFAULT_TITLE_BY_KIND[kind] || 'Lesson step'
  let t = stripMd(raw)
    .replace(/^(?:Part\s+\d+\s*:\s*|Topic\s+\d+\s*:\s*|[A-O]\.\d+\s+)/i, '')
    .replace(/\s*\(\d+\s*min(?:utes?)?\)\s*$/i, '')
    .trim()
  if (!t || t.length < 3) return fallback
  // Convert shouting ALL-CAPS manual titles ("FULL LECTURE NOTES", "TROUBLESHOOTING") to friendly titles
  if (t === t.toUpperCase() && /[A-Z]{4}/.test(t)) {
    if (/LECTURE|CONCEPT|CONTENT|NOTES/i.test(t)) return 'Main lesson'
    if (/DEMO|WALKTHROUGH/i.test(t)) return 'Step-by-step walkthrough'
    if (/GUIDED|PRACTICAL/i.test(t)) return 'Try it yourself, step by step'
    if (/TROUBLE|MISTAKE|REMEDIATION|FAILURE/i.test(t)) return 'Common mistakes & easy fixes'
    t = t[0] + t.slice(1).toLowerCase()
  }
  return capFirst(t)
}

function safeCardTerms(text: string, max = 3): { term: string; plain: string }[] {
  return glossaryFor(text, 8)
    .filter(g => !AMBIGUOUS_GLOSSARY_TERMS.has(g.term.toLowerCase()))
    .slice(0, max)
}

function loadStarterSpecs(slug: string): StarterCardSpec[] | null {
  const file = join(STARTERS_DIR, `${slug}.json`)
  if (!existsSync(file)) return null
  try {
    const parsed = JSON.parse(readFileSync(file, 'utf8'))
    if (Array.isArray(parsed?.cards) && parsed.cards.length >= 3) return parsed.cards as StarterCardSpec[]
  } catch { /* fall back to automatic card slicer */ }
  return null
}

function ensureAllReadLettersCredited(cards: LessonCard[], sections: Section[]): void {
  const readLetters = sections
    .filter(s => ALL_READ_KINDS.has(s.kind) && s.blocks.length > 0)
    .map(s => s.letter)
  const covered = new Set(cards.flatMap(c => c.creditLetters || [c.sectionLetter]))
  const missing = readLetters.filter(l => !covered.has(l))
  if (!missing.length || !cards.length) return
  missing.forEach((l, i) => {
    const target = cards[Math.min(cards.length - 1, Math.floor((i * cards.length) / Math.max(1, missing.length)))]
    target.creditLetters = [...new Set([...(target.creditLetters || [target.sectionLetter]), l])]
  })
}

function buildFromStarterSpecs(
  specs: StarterCardSpec[],
  sessionId: string,
  sections: Section[],
): { cards: LessonCard[]; starterRewritten: true } {
  const readLetters = sections
    .filter(s => ALL_READ_KINDS.has(s.kind) && s.blocks.length > 0)
    .map(s => s.letter)
  let checkIdx = 0

  const cards: LessonCard[] = specs.map((sp, idx) => {
    const letter = sp.letter || readLetters[Math.min(idx, Math.max(0, readLetters.length - 1))] || 'F'
    const kindObj = sections.find(s => s.letter === letter)
    const blocks = splitLongBlocks(mdToBlocks(sp.body))
    const rawText = `${sp.title}\n${sp.takeaway}\n${sp.body}`
    const words = blocks.reduce((n, b) => n + blockWords(b), 0)
    let check: MicroCheck | undefined
    if (sp.check && sp.check.choices?.length >= 2 && sp.check.correctId) {
      checkIdx++
      check = {
        id: `${sessionId}#mc${checkIdx}`,
        prompt: sp.check.prompt,
        choices: sp.check.choices,
        hint: sp.check.hint,
        correctId: sp.check.correctId,
        explanation: sp.check.explanation,
      }
    }
    return {
      id: `${sessionId}#c${idx + 1}`,
      sectionLetter: letter,
      creditLetters: [letter],
      sectionKind: kindObj?.kind || 'lecture',
      kicker: sp.kicker || `Card ${idx + 1}`,
      title: sp.title,
      takeaway: sp.takeaway,
      blocks,
      terms: safeCardTerms(rawText, 3),
      wordCount: words,
      check,
    }
  })

  ensureAllReadLettersCredited(cards, sections)
  return { cards, starterRewritten: true }
}

function shuffleChoices(correctText: string, distractors: string[], seedStr: string): { choices: Choice[]; correctId: string } {
  const unique = [correctText]
  const seen = new Set([correctText.toLowerCase()])
  for (const d of distractors) {
    const t = d.trim()
    if (!t || seen.has(t.toLowerCase())) continue
    seen.add(t.toLowerCase())
    unique.push(t)
    if (unique.length >= 4) break
  }
  const indices = unique.map((_, i) => i)
  let s = hash(seedStr) || 1
  for (let i = indices.length - 1; i > 0; i--) {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    const j = s % (i + 1)
    ;[indices[i], indices[j]] = [indices[j], indices[i]]
  }
  const letters = ['a', 'b', 'c', 'd']
  let correctId = 'a'
  const choices: Choice[] = indices.map((origIdx, pos) => {
    const id = letters[pos]
    if (origIdx === 0) correctId = id
    return { id, text: unique[origIdx] }
  })
  return { choices, correctId }
}

function attachAutoChecks(
  cards: LessonCard[],
  sessionId: string,
  flashcards: Flashcard[],
  troubleshooting: { mistake: string; fix: string }[],
): void {
  if (!cards.length) return
  const allGlossary = plainPass().glossary.filter(g => !AMBIGUOUS_GLOSSARY_TERMS.has(g.term.toLowerCase()))
  const usedTerms = new Set<string>()
  const usedFlash = new Set<string>()
  const usedTrouble = new Set<number>()
  const usedTakeaways = new Set<number>()

  // Place a Quick Check after every 2–3 cards across the entire deck so checks stay evenly spaced.
  const stride = cards.length <= 9 ? 2 : 3
  const targetIndices: number[] = []
  for (let i = stride - 1; i < cards.length; i += stride) {
    targetIndices.push(i)
  }
  if (!targetIndices.length) targetIndices.push(cards.length - 1)
  else if (cards.length - 1 - targetIndices[targetIndices.length - 1] >= 2) {
    targetIndices.push(cards.length - 1)
  }

  let checkNum = 0
  let prevEnd = -1

  for (const idx of targetIndices) {
    const windowCards = cards.slice(prevEnd + 1, idx + 1)
    prevEnd = idx
    const windowText = windowCards.map(c => `${c.title}\n${c.takeaway}\n${c.blocks.map(blockText).join('\n')}`).join('\n')
    const card = cards[idx]
    const seedBase = `${sessionId}:mc:${idx}`

    // 1. Level flashcard concept appearing in this card window (course-authentic!)
    const fc = flashcards.find(f => {
      const key = stripMd(f.front).replace(/^[A-O]\.\d+\s+/, '').trim()
      if (key.length < 4 || key.length > 44 || GENERIC_FLASH_FRONTS.test(key) || usedFlash.has(key.toLowerCase())) return false
      return windowText.toLowerCase().includes(key.toLowerCase()) && stripMd(f.back).length >= 22
    })
    if (fc) {
      const label = stripMd(fc.front).replace(/^[A-O]\.\d+\s+/, '').trim()
      usedFlash.add(label.toLowerCase())
      const correctText = capFirst(oneCleanSentence(fc.back, 120))
      const otherBacks = flashcards
        .filter(o => stripMd(o.front).trim().toLowerCase() !== label.toLowerCase())
        .map(o => capFirst(oneCleanSentence(o.back, 120)))
      const h = hash(seedBase)
      const glossFallbacks = [1, 2, 3].map(k => capFirst(oneCleanSentence(allGlossary[(h + k * 23) % allGlossary.length]?.plain || '', 120)))
      const { choices, correctId } = shuffleChoices(correctText, [...otherBacks, ...glossFallbacks], seedBase)
      if (choices.length >= 3) {
        checkNum++
        card.check = {
          id: `${sessionId}#mc${checkNum}`,
          prompt: `Quick check from what you just read: Which description matches "${label}"?`,
          choices,
          hint: `Think back to how "${label}" was just explained in simple words.`,
          correctId,
          explanation: `Nice! ${label}: ${correctText}`,
        }
        continue
      }
    }

    // 2. Troubleshooting mistake -> fix check
    if (card.sectionKind === 'troubleshooting' && troubleshooting.length >= 2) {
      const tIdx = troubleshooting.findIndex((t, i) => !usedTrouble.has(i) && t.mistake.length > 12 && t.fix.length > 12)
      if (tIdx >= 0) {
        usedTrouble.add(tIdx)
        const item = troubleshooting[tIdx]
        const correctText = capFirst(oneCleanSentence(item.fix, 120))
        const otherFixes = troubleshooting.filter((_, i) => i !== tIdx).map(t => capFirst(oneCleanSentence(t.fix, 120)))
        const fallbackFixes = [
          'Delete all project files and start over from scratch.',
          'Ignore the warning sign and keep working without saving.',
          'Unplug the power cable immediately without checking settings.',
        ]
        const { choices, correctId } = shuffleChoices(correctText, [...otherFixes, ...fallbackFixes], seedBase)
        checkNum++
        card.check = {
          id: `${sessionId}#mc${checkNum}`,
          prompt: `Quick fix check: What should you do if "${oneCleanSentence(item.mistake, 95).replace(/\.$/, '')}"?`,
          choices,
          hint: `Think back to the practical fix covered in "${card.title}".`,
          correctId,
          explanation: `Exactly right! ${correctText}`,
        }
        continue
      }
    }

    // 3. Unambiguous technical glossary term introduced in this 2–3 card window
    const winTerm = windowCards.flatMap(c => c.terms || []).find(t => !usedTerms.has(t.term.toLowerCase()))
    if (winTerm && allGlossary.length >= 4) {
      usedTerms.add(winTerm.term.toLowerCase())
      const correctText = capFirst(oneCleanSentence(winTerm.plain, 120))
      const pool = allGlossary.filter(g => g.term.toLowerCase() !== winTerm.term.toLowerCase())
      const h = hash(seedBase)
      const distractors = [1, 2, 3, 4].map(k => capFirst(oneCleanSentence(pool[(h + k * 17) % pool.length]?.plain || '', 120))).filter(Boolean)
      if (distractors.length >= 3) {
        checkNum++
        const { choices, correctId } = shuffleChoices(correctText, distractors, seedBase)
        card.check = {
          id: `${sessionId}#mc${checkNum}`,
          prompt: `Quick word check: In simple everyday words, what does "${winTerm.term}" mean?`,
          choices,
          hint: `Check the tricky-words note on "${card.title}"!`,
          correctId,
          explanation: `Spot on! "${winTerm.term}" means: ${winTerm.plain}`,
        }
        continue
      }
    }

    // 4. Sub-topic key takeaway check
    if (!usedTakeaways.has(idx) && card.takeaway.length >= 24) {
      usedTakeaways.add(idx)
      const correctText = capFirst(oneCleanSentence(card.takeaway, 125))
      const distant = cards
        .filter((_, j) => Math.abs(j - idx) >= 2 && cards[j].takeaway.length >= 24 && cards[j].takeaway !== card.takeaway)
        .map(c => capFirst(oneCleanSentence(c.takeaway, 125)))
      const genericFallbacks = [
        'Skip saving your work until every task in the whole course is finished.',
        'Guess settings randomly instead of checking one step at a time.',
        'Share secret login codes publicly so anyone can edit the account.',
      ]
      const { choices, correctId } = shuffleChoices(correctText, [...distant, ...genericFallbacks], seedBase)
      if (choices.length >= 3) {
        checkNum++
        card.check = {
          id: `${sessionId}#mc${checkNum}`,
          prompt: `Quick check on "${card.title}": Which key takeaway matches what you just learned?`,
          choices,
          hint: `Peek back at the "In simple words" box on "${card.title}" if you want a quick hint!`,
          correctId,
          explanation: `You nailed it! ${correctText}`,
        }
      }
    }
  }
}

export function buildLessonCards(opts: {
  slug: string
  number: number
  sessionId: string
  sections: Section[]
  flashcards: Flashcard[]
  troubleshooting: { mistake: string; fix: string }[]
}): { cards: LessonCard[]; starterRewritten: boolean } {
  const { slug, number, sessionId, sections, flashcards, troubleshooting } = opts

  // 1. Level-1 hand-rewritten Duolingo/Mimo-style starter decks for all 16 courses
  if (number === 1) {
    const specs = loadStarterSpecs(slug)
    if (specs) return buildFromStarterSpecs(specs, sessionId, sections)
  }

  // 2. Smart card slicer + paragraph splitter + takeaway & Quick-Check generator for Levels 2–12
  const rawCards: Omit<LessonCard, 'id'>[] = []
  let readSecs = sections.filter(s => CORE_CARD_KINDS.has(s.kind) && s.blocks.length > 0)
  if (!readSecs.length) {
    readSecs = sections.filter(s => ALL_READ_KINDS.has(s.kind) && s.blocks.length > 0)
  }

  for (const sec of readSecs) {
    const baseKicker = KICKER_BY_KIND[sec.kind] || cleanCardTitle(sec.title, sec.kind)
    const blocks = splitLongBlocks(sec.blocks)
    let curTitle = cleanCardTitle(sec.title, sec.kind)
    let curBlocks: Block[] = []
    let curWords = 0
    let partInSec = 0

    const flush = () => {
      if (!curBlocks.length) return
      if (curWords < 35 && rawCards.length > 0 && rawCards[rawCards.length - 1].sectionLetter === sec.letter) {
        const prev = rawCards[rawCards.length - 1]
        prev.blocks.push(...curBlocks)
        prev.wordCount += curWords
        const joinedText = `${prev.title}\n${prev.blocks.map(blockText).join('\n')}`
        prev.terms = safeCardTerms(joinedText, 3)
        curBlocks = []
        curWords = 0
        return
      }
      partInSec++
      const textBlob = `${curTitle}\n${curBlocks.map(blockText).join('\n')}`
      rawCards.push({
        sectionLetter: sec.letter,
        creditLetters: [sec.letter],
        sectionKind: sec.kind,
        kicker: partInSec > 1 ? `${baseKicker} · ${partInSec}` : baseKicker,
        title: curTitle,
        takeaway: extractTakeaway(curTitle, curBlocks),
        blocks: curBlocks,
        terms: safeCardTerms(textBlob, 3),
        wordCount: curWords,
      })
      curBlocks = []
      curWords = 0
    }

    for (const b of blocks) {
      // Only split on major topic headings (depth <= 3), keeping tiny inline labels (`h4` like "Example:") inside their card
      if (b.t === 'h' && b.depth <= 3) {
        if (curBlocks.length) flush()
        curTitle = cleanCardTitle(b.text, sec.kind)
        continue
      }
      const w = blockWords(b)
      if (curBlocks.length > 0 && (curWords + w > 210 || (curBlocks.length >= 5 && curWords >= 140))) {
        flush()
      }
      curBlocks.push(b)
      curWords += w
    }
    flush()
  }

  const cards: LessonCard[] = rawCards.map((c, idx) => ({
    ...c,
    id: `${sessionId}#c${idx + 1}`,
  }))

  ensureAllReadLettersCredited(cards, sections)
  attachAutoChecks(cards, sessionId, flashcards, troubleshooting)
  return { cards, starterRewritten: false }
}
