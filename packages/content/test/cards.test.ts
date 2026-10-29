import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { splitLongBlocks } from '../src/cards.js'
import { mdToBlocks } from '../src/parse.js'

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), '..', '..', '..')
const COURSES_DIR = join(REPO, 'apps/web/.content/courses')
const KEYS_DIR = join(REPO, 'apps/web/.content/keys')
const STARTERS_DIR = join(REPO, 'content-plain/starters')

const READ_KINDS = new Set(['opening', 'prereq_review', 'lecture', 'demo', 'guided_practical', 'troubleshooting'])

describe('bite-sized micro-learning cards & Level-1 starters', () => {
  it('ships all 16 hand-rewritten Level-1 starter decks with clean plain-English cards and Quick Checks', () => {
    const starterFiles = readdirSync(STARTERS_DIR).filter(f => f.endsWith('.json')).sort()
    expect(starterFiles).toHaveLength(16)

    for (const file of starterFiles) {
      const slug = file.replace(/\.json$/, '')
      const bundle = JSON.parse(readFileSync(join(COURSES_DIR, `${slug}.json`), 'utf8'))
      const keys = JSON.parse(readFileSync(join(KEYS_DIR, `${slug}.json`), 'utf8'))
      const s1 = bundle.sessions.find((s: any) => s.number === 1)
      expect(s1, `${slug} session 1`).toBeTruthy()
      expect(s1.starterRewritten).toBe(true)
      expect(s1.cards.length).toBeGreaterThanOrEqual(4)
      expect(s1.cards.length).toBeLessThanOrEqual(9)

      const checks = s1.cards.filter((c: any) => !!c.check)
      expect(checks.length).toBeGreaterThanOrEqual(2)

      // Every underlying manual reading section letter must be credited when completing the starter deck
      const manualReadLetters = s1.sections
        .filter((s: any) => READ_KINDS.has(s.kind) && s.blocks?.length > 0)
        .map((s: any) => s.letter)
      const credited = new Set(s1.cards.flatMap((c: any) => c.creditLetters || [c.sectionLetter]))
      for (const l of manualReadLetters) {
        expect(credited.has(l), `${slug} L1 credits section ${l}`).toBe(true)
      }

      // Learner payload never leaks `correctId` or `explanation`, while server keys hold both
      for (const card of s1.cards) {
        expect(card.title.length).toBeGreaterThan(4)
        expect(card.takeaway.length).toBeGreaterThan(15)
        if (card.check) {
          expect(card.check.correctId).toBeNull()
          expect(card.check.explanation).toBe('')
          const key = keys[s1.id]?.microChecks?.[card.check.id]
          expect(key, `missing key for ${card.check.id}`).toBeTruthy()
          expect(card.check.choices.some((ch: any) => ch.id === key.correctId)).toBe(true)
          expect(key.explanation.length).toBeGreaterThan(10)
        }
      }
    }
  })

  it('generates bite-sized cards, 1-line takeaways, and server-keyed Quick Checks across all 141 levels', () => {
    const courseFiles = readdirSync(COURSES_DIR).filter(f => f.endsWith('.json'))
    expect(courseFiles).toHaveLength(16)

    let totalSessions = 0
    let totalCards = 0
    let totalChecks = 0

    for (const file of courseFiles) {
      const slug = file.replace(/\.json$/, '')
      const bundle = JSON.parse(readFileSync(join(COURSES_DIR, file), 'utf8'))
      const keys = JSON.parse(readFileSync(join(KEYS_DIR, `${slug}.json`), 'utf8'))

      for (const s of bundle.sessions) {
        totalSessions++
        expect(s.cards?.length, `${s.id} has cards`).toBeGreaterThanOrEqual(3)
        const checks = s.cards.filter((c: any) => !!c.check)
        expect(checks.length, `${s.id} has Quick Checks`).toBeGreaterThanOrEqual(1)
        totalCards += s.cards.length
        totalChecks += checks.length

        for (const c of s.cards) {
          expect(c.takeaway.trim().length, `${c.id} takeaway`).toBeGreaterThan(5)
          if (c.check) {
            expect(c.check.correctId).toBeNull()
            const k = keys[s.id]?.microChecks?.[c.check.id]
            expect(k?.correctId, `${c.check.id} key`).toBeTruthy()
            expect(c.check.choices.some((ch: any) => ch.id === k.correctId)).toBe(true)
          }
        }
      }
    }

    expect(totalSessions).toBe(141)
    expect(totalCards).toBeGreaterThan(2000)
    expect(totalChecks).toBeGreaterThan(600)
  })

  it('splits dense >60-word paragraphs at sentence boundaries without breaking inline code', () => {
    const dense = [
      'A variable stores a named value so your program can reuse it later without typing the value again.',
      'For example, `const price = 2500; const total = price * 2;` keeps your code clean and readable.',
      'When requirements change next week, you only update the number in one place instead of hunting through twenty lines.',
      'That simple habit prevents silly copy-paste mistakes on real client projects and saves hours of debugging.',
    ].join(' ')
    const split = splitLongBlocks(mdToBlocks(dense))
    expect(split.length).toBeGreaterThanOrEqual(2)
    expect(split.map(b => (b as any).text).join(' ')).toContain('`const price = 2500; const total = price * 2;`')
  })
})
