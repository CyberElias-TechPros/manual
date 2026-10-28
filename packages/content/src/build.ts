/**
 * ROADMAP 2.6 (diagram resolver), 2.10 (bundling), 2.11 (free preview),
 * 2.12 (D1 seed SQL) — produces the static bundle the app reads.
 *
 * Output layout (all git-ignored, rebuilt by `pnpm content:build`):
 *   apps/web/.content/index.json          catalogue: 16 courses + totals
 *   apps/web/.content/courses/<slug>.json  LEARNER-SAFE session data
 *   apps/web/.content/keys/<slug>.json     SERVER-ONLY answer keys (never routed)
 *   apps/web/.content/search/<slug>.json   client search index (4.11)
 *   apps/web/.content/report.json          lint report for /admin/content
 *   apps/web/.content/seed.sql             D1 content index (2.12)
 *
 * Splitting learner payload from answer keys is how the app can be 100% static
 * (fast on a metered Nigerian connection) while still scoring server-side, which
 * the roadmap demands in 5.9 "never trust the client".
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { normalizeCourse, parseSessionFile, countWords } from './parse.js'
import { buildChecklist, buildCodeBlanks, buildExercises, buildFlashcards, buildQuiz, buildScenarios, buildTroubleshooting } from './interactives.js'
import { lintSession, summarise } from './lint.js'
import type { Block, CatalogueIndex, Course, LintIssue, Section, Session } from './schema.js'

const HERE = dirname(fileURLToPath(import.meta.url))
export const REPO = resolve(HERE, '..', '..', '..')
export const CONTENT_DIR = join(REPO, 'content')
export const ASSETS_DIR = join(REPO, 'assets')
export const OUT_DIR = process.env.CEA_CONTENT_DIR
  ? resolve(process.env.CEA_CONTENT_DIR)
  : join(REPO, 'apps', 'web', '.content')

const ACCENTS = ['#2c5282', '#3182ce', '#38a169', '#d69e2e', '#dd6b20', '#e53e3e', '#805ad5', '#319795', '#2b6cb0', '#0f766e']

/**
 * 4.8 — every level shows a visual. Where the source manual has no figure to clip
 * (two sessions in social-media-management, for instance), the diagram is generated
 * from the level's own procedure: a numbered flow, drawn from data rather than a PNG.
 * Nothing to download, it stays legible at any size, and the transcript *is* the
 * picture — so the accessibility note and the image can never drift apart.
 */
function flowDiagram(title: string, exercises: { steps: string[]; successCriteria: string[] }[], outcomes: string[]) {
  const clean = (s: string) => s.replace(/[*`_]/g, '').replace(/\s+/g, ' ').trim()
  const steps = [...(exercises[0]?.steps ?? []), ...(exercises[0]?.successCriteria ?? [])]
    .map(clean).filter(s => s.length > 12).slice(0, 6)
  const source = steps.length >= 3 ? steps : outcomes.map(clean).filter(s => s.length > 12).slice(0, 5)
  if (source.length < 3) return undefined
  return {
    src: '', width: 960, height: 540, page: undefined,
    alt: `Step diagram for ${title}: ${source.join('; ')}`,
    transcript: source, hotspots: [], flow: { title, steps: source },
  }
}

function readSessionFiles(dir: string) {
  return readdirSync(dir).filter(f => /^session-\d+\.md$/.test(f)).sort()
}

export function buildCourse(slug: string, opts: { strict?: boolean } = {}) {
  const dir = join(CONTENT_DIR, slug)
  const courseJson = JSON.parse(readFileSync(join(dir, 'course.json'), 'utf8'))
  const files = readSessionFiles(dir)
  const sessions: Session[] = []
  const keys: Record<string, any> = {}
  const issues: LintIssue[] = []
  const exists = (p: string) => existsSync(join(REPO, p))

  for (const file of files) {
    const md = readFileSync(join(dir, file), 'utf8')
    const raw = parseSessionFile(md, `content/${slug}/${file}`)
    const front = raw.front
    const sections: Section[] = raw.sections.map(s => ({
      letter: s.letter, kind: s.kind, title: s.title, blocks: s.blocks,
      wordCount: countWords({ blocks: s.blocks }), raw: s.raw,
    }))
    const sessionId = `${slug}/session-${String(front.number).padStart(2, '0')}`
    const { quiz, answerKey } = buildQuiz(sections.find(s => s.kind === 'knowledge_check') || emptySection(), sessionId)
    const exercises = buildExercises(sections, sessionId)
    const lectureBlocks: Block[] = sections.filter(s => s.kind === 'lecture' || s.kind === 'demo').flatMap(s => s.blocks)
    const outcomes0 = (secs: Section[]) => {
      const sec = secs.find(s => s.kind === 'outcomes')
      if (!sec) return []
      const list = sec.blocks.find(b => b.t === 'list')
      return list && list.t === 'list' ? list.items.map(i => i.text) : []
    }
    const diagram = front.diagram ? {
      src: front.diagram.src, width: front.diagram.width, height: front.diagram.height, page: front.diagram.page,
      alt: `Concept diagram for ${front.title || file}: ${(front.diagram.transcript || []).slice(0, 6).join(' · ')}`,
      transcript: front.diagram.transcript || [], hotspots: front.diagram.hotspots || [],
    } : flowDiagram(String(front.title || ''), exercises, outcomes0(sections))
    const outcomes = (() => {
      const sec = sections.find(s => s.kind === 'outcomes')
      if (!sec) return []
      const list = sec.blocks.find(b => b.t === 'list')
      return list && list.t === 'list' ? list.items.map(i => i.text) : []
    })()

    const estWords = sections.reduce((n, s) => n + (INSTRUCTOR_ONLY.has(s.kind) ? 0 : s.wordCount), 0)
    const session: Session = {
      id: sessionId, course: slug, number: front.number, of: front.of || files.length,
      title: front.title, module: front.module, durationMinutes: front.duration_minutes,
      difficulty: front.difficulty, prerequisiteKnowledge: front.prerequisite_knowledge,
      connectionToPrevious: front.connection_to_previous,
      isFree: !!front.free || front.number === 1,
      isCapstone: /capstone|showcase|deploy and present|demonstrated independence/i.test(`${front.title} ${front.module || ''}`),
      diagram, sections: sections.map(stripInstructor), outcomes, quiz,
      exercises,
      scenarios: buildScenarios(sections, sessionId),
      flashcards: buildFlashcards(sections, sessionId),
      checklist: buildChecklist(exercises, sections.find(s => s.kind === 'reflection')),
      troubleshooting: buildTroubleshooting(sections),
      codeBlanks: buildCodeBlanks(lectureBlocks, sessionId),
      estWords,
      source: { file: `content/${slug}/${file}`, pdf: courseJson.pdfs?.teaching_manual },
    } as Session

    keys[sessionId] = {
      quiz: answerKey,
      exercises: Object.fromEntries(exercises.map(e => [e.id, { modelAnswer: e.modelAnswer, code: e.code, rubric: e.rubric }])),
      scenarios: Object.fromEntries((session.scenarios || []).map(sx => [sx.id, { correctId: sx.correctId, resolution: sx.resolution }])),
      codeBlanks: Object.fromEntries((session.codeBlanks || []).map(cb => [cb.id, { blanks: cb.blanks.map(x => ({ answer: x.answer, accepts: x.accepts })) }])),
    }
    // The client never gets model answers — including the gap-fill answers, which
    // used to ride along here (6.3, and the 10.6 "no keys in the client bundle" rule).
    session.exercises = session.exercises.map(e => ({
      ...e, modelAnswer: '', code: undefined,
      // the criteria are the learner's checklist; the mark allocation is the grader's
      rubric: (e.rubric || []).map(row => ({ ...row, marks: null })),
    }))
    // A case study's resolution and its correct branch are the answers: they live in keys/ and
    // come back from POST /api/learn/scenario once a choice has been made. The rubric criteria
    // stay with the learner — you are entitled to know how you will be judged; only the mark
    // allocation is withheld (it is null in the learner copy).
    session.scenarios = (session.scenarios || []).map(sx => ({ ...sx, resolution: '', correctId: null }))
    session.codeBlanks = (session.codeBlanks || []).map(cb => ({ ...cb, blanks: cb.blanks.map(() => ({ answer: '', accepts: [] })) }))
    sessions.push(session)
    const answered = Object.values(answerKey).filter((k: any) => (k.modelAnswer || '').trim() || (k.correct || []).length).length
    issues.push(...lintSession({ file: `content/${slug}/${file}`, md, front, sections }, session, exists, answered))
  }

  const course: Course = normalizeCourse(courseJson, sessions.map(s => ({ number: s.number, title: s.title, module: s.module })))
  course.accent = ACCENTS[Math.abs(hashCode(slug)) % ACCENTS.length]
  return { course, sessions, keys, issues }
}

const INSTRUCTOR_ONLY = new Set(['instructor_notes'])
function emptySection(): Section { return { letter: 'M', kind: 'knowledge_check', title: 'Knowledge check', blocks: [], raw: '', wordCount: 0 } }
function stripInstructor(s: Section): Section { return INSTRUCTOR_ONLY.has(s.kind) ? { ...s, blocks: [], raw: '' } : s }
function hashCode(s: string) { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) | 0; return h }

/** search index (4.11): small enough to live in the browser, good enough ranking */
function buildSearch(course: Course, sessions: Session[]) {
  const docs = sessions.map(s => ({
    id: s.id, n: s.number, t: s.title,
    k: [
      ...s.outcomes.map(o => o.toLowerCase()),
      ...s.sections.filter(x => !INSTRUCTOR_ONLY.has(x.kind)).flatMap(x => x.raw.toLowerCase().replace(/[#*`>|-]+/g, ' ').split(/\s+/)),
    ].filter(w => w.length > 3),
  }))
  const df = new Map<string, number>()
  for (const d of docs) for (const w of new Set(d.k)) df.set(w, (df.get(w) || 0) + 1)
  const vocab = new Map<string, number>()
  for (const [w, n] of df) vocab.set(w, Math.log(1 + docs.length / (1 + n)))
  return {
    course: course.slug,
    title: course.displayTitle,
    idf: Object.fromEntries([...vocab].slice(0, 4000).map(([w, v]) => [w, +v.toFixed(3)])),
    docs: docs.map(d => {
      const tf = new Map<string, number>()
      for (const w of d.k) tf.set(w, (tf.get(w) || 0) + 1)
      return { id: d.id, n: d.n, t: d.t, v: Object.fromEntries([...tf].sort((a, b) => b[1] - a[1]).slice(0, 90).map(([w, c]) => [w, +Math.log(1 + c).toFixed(3)])) }
    }),
  }
}

function seedSql(courses: Course[], sessions: Session[][]) {
  const esc = (v: unknown) => v === null || v === undefined ? 'NULL' : `'${String(v).replace(/'/g, "''")}'`
  const out: string[] = ['-- generated by @cea/content — ROADMAP 2.12 content index for D1', 'BEGIN;',
    `DELETE FROM session_index;`, `DELETE FROM course_index;`]
  for (const c of courses) {
    out.push(`INSERT INTO course_index (slug,name,title,category,sessions_count,session_minutes,fee_ngn,cover,accent,certificate,is_active) VALUES (${esc(c.slug)},${esc(c.name)},${esc(c.displayTitle)},${esc(c.category)},${c.sessionsCount},${c.sessionLengthMinutes || 105},${c.feeNgn ?? 'NULL'},${esc(c.cover)},${esc(c.accent)},${esc(c.certificate || '')},1);`)
  }
  sessions.flat().forEach(s => {
    out.push(`INSERT INTO session_index (id,course,number,of_total,title,module,minutes,is_free,is_capstone,words,quiz_count) VALUES (${esc(s.id)},${esc(s.course)},${s.number},${s.of},${esc(s.title)},${esc(s.module || '')},${s.durationMinutes || 105},${s.isFree ? 1 : 0},${s.isCapstone ? 1 : 0},${s.estWords},${s.quiz.questions.length});`)
  })
  out.push('COMMIT;')
  return out.join('\n') + '\n'
}

export function buildAll(outDir = OUT_DIR) {
  const slugs = readdirSync(CONTENT_DIR).filter(d => statSync(join(CONTENT_DIR, d)).isDirectory() && existsSync(join(CONTENT_DIR, d, 'course.json')))
  const courses: Course[] = []
  const allSessions: Session[][] = []
  const issues: LintIssue[] = []
  mkdirSync(join(outDir, 'courses'), { recursive: true })
  mkdirSync(join(outDir, 'keys'), { recursive: true })
  mkdirSync(join(outDir, 'search'), { recursive: true })

  for (const slug of slugs) {
    const { course, sessions, keys, issues: iss } = buildCourse(slug)
    issues.push(...iss)
    course.sessions = sessions.map(s => ({ number: s.number, title: s.title, module: s.module, isFree: s.isFree, isCapstone: s.isCapstone }))
    // Catalogue projections (see Course.tagline/description/outcomes in schema.ts).
    const exitSession = sessions.find(s => s.isCapstone) || sessions[sessions.length - 1]
    const problem = String(course.problem || '').replace(/\s+/g, ' ').trim()
    course.tagline = problem ? (problem.split(/(?<=[.!?])\s/)[0] || problem).slice(0, 190) : undefined
    course.description = problem || undefined
    course.level = sessions[0]?.difficulty
    course.outcomes = (exitSession?.outcomes ?? []).slice(0, 6)
    course.firstSessionFree = true
    // The UI calls the "bring with you" list prerequisites; the manual calls it entry
    // requirements. One list, two names, so the page never invents a third.
    course.prerequisites = course.entryRequirements
    courses.push(course)
    allSessions.push(sessions)
    writeFileSync(join(outDir, 'courses', `${slug}.json`), JSON.stringify({ course, sessions }, null, 0))
    writeFileSync(join(outDir, 'keys', `${slug}.json`), JSON.stringify(keys, null, 0))
    writeFileSync(join(outDir, 'search', `${slug}.json`), JSON.stringify(buildSearch(course, sessions)))
  }
  courses.sort((a, b) => a.slug.localeCompare(b.slug))
  const totals = {
    courses: courses.length,
    sessions: allSessions.flat().length,
    questions: allSessions.flat().reduce((n, s) => n + s.quiz.questions.length, 0),
    exercises: allSessions.flat().reduce((n, s) => n + s.exercises.length, 0),
    scenarios: allSessions.flat().reduce((n, s) => n + s.scenarios.length, 0),
    words: allSessions.flat().reduce((n, s) => n + s.estWords, 0),
  }
  const index: CatalogueIndex = { version: 1, generatedAt: new Date().toISOString(), totals, courses }
  writeFileSync(join(outDir, 'index.json'), JSON.stringify(index, null, 0))
  writeFileSync(join(outDir, 'report.json'), JSON.stringify({ totals, summary: summarise(issues), issues: issues.slice(0, 400), perCourse: courses.map(c => ({ slug: c.slug, sessions: c.sessions.length, fee: c.feeNgn })) }, null, 2))
  writeFileSync(join(outDir, 'seed.sql'), seedSql(courses, allSessions))
  const bytes = readdirSync(join(outDir, 'courses')).reduce((n, f) => n + statSync(join(outDir, 'courses', f)).size, 0)
  return { outDir, totals, issues, summary: summarise(issues), bundleKb: Math.round(bytes / 1024) }
}

export { relative }
