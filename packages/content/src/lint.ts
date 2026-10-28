/**
 * ROADMAP 2.6, 2.8, 2.10, 2.11, 2.12 — quality gate + bundling + seeding.
 *
 * The lint gate is deliberately opinionated: it fails the build on the things
 * that would embarrass the academy in front of a paying learner (mojibake, a
 * session with no quiz, a broken diagram reference, inconsistent ₦ formatting).
 */
import type { LintIssue, Section, Session } from './schema.js'

const MOJI_RE = /[\u00c2\u00e2][\u0080-\u009f\u20ac\u201a\u0192\u201e\u2026\u2020\u2021\u02c6\u2030\u0160\u2039\u0152\u017d\u2018\u2019\u201c\u201d\u2022\u2013\u2014\u02dc\u2122\u0161\u203a\u0153\u017e\u0178]|\uFFFD|\?\u201d|\?\u2018/
const BAD_NAIRA_RE = /\u20a6\s?\d{5,}(?![\d,])|(?<![\u20a6\d])N\d{2,}k\b/
export interface SessionSource { file: string; md: string; front: Record<string, any>; sections: Section[] }

export function lintSession(src: SessionSource, session: Session, exists: (p: string) => boolean, answered = session.quiz.questions.length): LintIssue[] {
  const issues: LintIssue[] = []
  const f = (code: string, level: LintIssue['level'], message: string) => issues.push({ level, file: src.file, code, message })

  if (!src.front.title) f('title-missing', 'critical', 'no session title in frontmatter')
  const kinds = new Set(session.sections.map(s => s.kind))
  if (!kinds.has('outcomes')) f('outcomes-missing', 'critical', 'no Learning Outcomes section — a level needs stated outcomes')
  if (!kinds.has('lecture')) f('lecture-missing', 'critical', 'no lecture content')
  // Capstone levels are assessed by the instructor against the rubric, not by a
  // knowledge check, so a thin/absent quiz there is correct, not a bug.
  if (session.quiz.questions.length < 5 && !session.isCapstone)
    f('quiz-thin', 'critical', `only ${session.quiz.questions.length} quiz questions extracted (target ≥5)`)
  if (answered < session.quiz.questions.length)
    f('answer-missing', session.isCapstone ? 'info' : 'warn',
      `${session.quiz.questions.length - answered} of ${session.quiz.questions.length} questions have no answer key in the source PDF`)
  // A capstone level *is* the practice task — it is graded against its own rubric
  // in section L, so it is not missing one.
  if (!session.exercises.length) f('exercise-missing', session.isCapstone ? 'info' : 'critical', 'no practice task in this session')
  if (!session.sections.some(s => s.kind === 'reflection')) f('reflection-missing', 'warn', 'no reflection/recap section')

  const all = session.sections.map(s => s.raw).join('\n')
  /*
   * Typography and encoding checks read the prose only: a code block is allowed to
   * print `₦4500450` — in web-development session 1 that exact number IS the lesson
   * (string + string in JavaScript), and separators would silently "fix" the bug the
   * learner is being shown.
   */
  const prose = (() => {
    // Read the *file*, not the assembled sections: an instructor-only section can
    // open a fence that the learner sections then close, and a naive toggle over
    // section text would call the code sample prose.
    const body = String(src.md || all).replace(/^---\n[\s\S]*?\n---\n?/, '')
    const out: string[] = []
    let inFence = false
    for (const line of body.split('\n')) {
      if (/^\s*```/.test(line)) { inFence = !inFence; continue }
      if (!inFence) out.push(line)
    }
    return out.join('\n')
  })()
  const moji = prose.match(MOJI_RE)
  if (moji) f('mojibake', 'critical', `encoding artifact "${moji[0]}" — fix the source or the extractor's mojibake map`)
  // A number that is *being demonstrated* is not a typo: "Total: ₦24000" and
  // "Output becomes ₦4500450 — wrong!" are the JavaScript lesson in web-development
  // session 1 and 5, where the missing separator is the point.
  const DEMO_LINE = /(→|->|output|becomes|prints?|console\.log|Total:|wrong)/i
  const naira = (prose.match(BAD_NAIRA_RE) || []).find(hit => {
    const line = (prose.split('\n').find(l => l.includes(hit)) || '')
    return !DEMO_LINE.test(line)
  })
  if (naira) f('naira-format', 'warn', `naira amount not using thousands separators: "${naira}"`)
  const fences = (all.match(/```/g) || []).length
  if (fences % 2) f('unclosed-fence', 'critical', 'unbalanced code fence — lesson body will render broken')

  if (session.diagram) {
    const rel = (session.diagram.src || '').replace(/^\//, '')
    // a generated flow diagram has no file by design (see build.ts flowDiagram)
    if (rel && !exists(rel)) f('diagram-missing', 'critical', `diagram referenced but not on disk: ${rel}`)
    if (!session.diagram.alt) f('diagram-alt', 'critical', 'diagram has no alt text (a11y, 10.5)')
    if (session.diagram.transcript.length < 3) f('diagram-transcript', 'warn', 'diagram transcript too thin for screen readers')
  } else {
    f('diagram-missing', 'critical', 'no concept diagram resolved for this session')
  }

  const dupWords = (session.estWords || 0) < 250
  if (dupWords) f('too-short', 'warn', `session body is only ${session.estWords} words — extraction may have dropped content`)
  if (/^\s*_[Ss]ee the instructor manual\._$/m.test(all)) f('empty-section', 'warn', 'an section rendered empty (placeholder used)')
  return issues
}

export interface LintSummary { critical: number; warn: number; info: number; byCode: Record<string, number>; total: number }

export function summarise(issues: LintIssue[]): LintSummary {
  const by = { critical: 0, warn: 0, info: 0 } as Record<string, number>
  for (const i of issues) by[i.level]++
  const byCode: Record<string, number> = {}
  for (const i of issues) byCode[i.code] = (byCode[i.code] || 0) + 1
  return { critical: by.critical, warn: by.warn, info: by.info, byCode, total: issues.length }
}
