import { mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { buildAll } from '../src/build.js'

/**
 * GATE 2 as an executable assertion (ROADMAP 2.8 + the README's "141 sessions as validated
 * JSON with quizzes"). This runs the whole pipeline against the committed corpus into a
 * temp directory, so a parser change cannot quietly halve the quiz count or drop a level's
 * diagram — the two failure modes that are invisible page by page.
 */
const OUT = mkdtempSync(join(tmpdir(), 'cea-corpus-'))
let result: ReturnType<typeof buildAll>

beforeAll(() => { result = buildAll(OUT) }, 120_000)
afterAll(() => rmSync(OUT, { recursive: true, force: true }))

describe('the 16-course corpus', () => {
  it('builds all of it, with the numbers the academy publishes', () => {
    expect(result.totals.courses).toBe(16)
    expect(result.totals.sessions).toBe(141)
    expect(result.totals.questions).toBeGreaterThan(900)
    expect(result.totals.exercises).toBeGreaterThan(400)
    expect(result.totals.scenarios).toBe(result.totals.sessions) // a case study per level
    expect(result.totals.words).toBeGreaterThan(800_000)
  })

  it('passes the lint gate: nothing critical, only the known source gaps as warnings', () => {
    expect(result.summary.critical).toBe(0)
    // every remaining warning is `answer-missing`: the source PDF has no answer key. The
    // app scores those questions as "a tutor reads it" rather than inventing an answer.
    expect(Object.keys(result.summary.byCode).sort()).toEqual(expect.arrayContaining(['answer-missing']))
    for (const code of Object.keys(result.summary.byCode)) {
      expect(['answer-missing', 'naira-format', 'diagram-missing', 'quiz-thin']).toContain(code)
    }
  })

  it('gives every course a promise the catalogue can print', () => {
    // The redesign put one sentence under every course title, so that sentence is now a contract:
    // real prose from the manual, complete, and free of the PDF's page furniture.
    const index = JSON.parse(readFileSync(join(OUT, 'index.json'), 'utf8'))
    expect(index.courses).toHaveLength(16)
    for (const c of index.courses) {
      const problem = String(c.problem ?? '')
      expect(problem.length, c.slug).toBeGreaterThan(80)
      expect(problem, c.slug).toMatch(/[.!?\u201d\u2019"]$/)
      const tagline = String(c.tagline ?? '')
      expect(tagline.length, c.slug).toBeLessThanOrEqual(190)
      expect(tagline, c.slug).toMatch(/[.!?\u201d\u2019"\u2026]$/)
      const lists = [...(c.audience ?? []), ...(c.entryRequirements ?? [])]
      expect(lists.length, c.slug).toBeGreaterThan(0)
      for (const item of lists) {
        expect(item, c.slug).not.toMatch(/\|\s*Cyber Elias Academy|Page \d+ of \d+/i)
        expect(item, c.slug).not.toMatch(/(?:designed for|target learners|what learners bring|class profile)\s*[:.]?$/i)
      }
    }
  })

  it('gives every level a question set, a diagram and a scenario', () => {
    for (const file of ['microsoft-office', 'web-development', 'social-media-management', 'typing-computer-basics']) {
      const bundle = JSON.parse(readFileSync(join(OUT, 'courses', `${file}.json`), 'utf8'))
      expect(bundle.sessions.length).toBeGreaterThan(5)
      for (const s of bundle.sessions) {
        expect(s.quiz.questions.length, `${file} L${s.number}`).toBeGreaterThanOrEqual(3)
        expect(s.diagram, `${file} L${s.number} has no visual`).toBeTruthy()
        expect(s.diagram.src || s.diagram.flow?.steps?.length, `${file} L${s.number}`).toBeTruthy()
        expect(s.scenarios.length, `${file} L${s.number} has no case study`).toBeGreaterThan(0)
        // and nothing gradable is on the client
        for (const q of s.quiz.questions) expect(q.correct, `${file} L${s.number} leaks ${q.id}`).toBeFalsy()
      }
    }
  })

  it('writes the artefacts the two deployments read', () => {
    for (const rel of ['index.json', 'report.json', 'seed.sql', 'courses/microsoft-office.json', 'keys/microsoft-office.json', 'search/microsoft-office.json']) {
      expect(readFileSync(join(OUT, rel), 'utf8').length, rel).toBeGreaterThan(40)
    }
    const index = JSON.parse(readFileSync(join(OUT, 'index.json'), 'utf8'))
    const fees = new Set(index.courses.map((c: any) => c.feeNgn))
    expect(fees.has(null)).toBe(false) // no course may be unpriced: the paywall needs a number
    const seed = readFileSync(join(OUT, 'seed.sql'), 'utf8')
    expect(seed).toContain('INSERT INTO course_index')
    expect((seed.match(/INSERT INTO session_index/g) || []).length).toBe(141)
  })
})
