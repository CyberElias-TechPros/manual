/**
 * 6.1 + 5.9 — quiz grading. Runs ONLY on the server: the client sends answers,
 * never scores, and the answer key never leaves the API process (see
 * `apps/web/.content/keys/`, which no route serves).
 */
import type { Question } from '@cea/content'

export interface GradedQuestion {
  id: string
  correct: boolean | null       // null = needs human/self comparison
  credit: number                // 0..1, partial credit for short answers
  expected?: string[]
  modelAnswer: string
  explanation: string
  note: string
}
export interface GradeResult {
  correct: number
  total: number
  scorePct: number
  passed: boolean
  perfect: boolean
  perQuestion: GradedQuestion[]
  xpAwardedEligible: number
}

export const norm = (s: string): string =>
  String(s || '')
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[“”‘’]/g, "'")
    .replace(/[—–]/g, '-')
    .replace(/\b(₦|n)/gu, '₦')
    .replace(/[.,;:!?()"'[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

const STOP = new Set('the a an and or of to in for on with by is are be this that it its as at from into we you they what which why how do does did can could should would will not but if then so than that these those'.split(' '))
const tokens = (s: string) => norm(s).split(' ').filter(w => w.length > 2 && !STOP.has(w))
const numSet = (s: string) => new Set((String(s).match(/\d[\d,.]*/g) || []).map(n => n.replace(/[.,]$/, '')))

/** MCQ / true-false: exact. Fill-blank: normalised + accepted variants + fuzzy. */
function choiceCorrect(q: Question, answer: string): boolean {
  const a = norm(answer)
  if (!a) return false
  if (q.correct?.includes(a)) return true
  const letter = /^\(?\s*([a-h])\s*[\).]?$/.exec(answer.trim())
  if (letter && q.correct?.includes(letter[1].toLowerCase())) return true
  if (q.correct && q.choices) {
    const want = q.choices.find(c => q.correct!.includes(c.id))
    if (want && norm(want.text) === a) return true
  }
  return false
}

function blankCorrect(q: Question, answer: string): { ok: boolean; credit: number } {
  const a = norm(answer)
  if (!a) return { ok: false, credit: 0 }
  const accepted = [...(q.accept || []), ...tokens(q.modelAnswer)].map(norm)
  if (accepted.includes(a)) return { ok: true, credit: 1 }
  const bare = a.replace(/[^a-z0-9]/g, '')
  if (accepted.some(x => x.replace(/[^a-z0-9]/g, '') === bare && bare.length > 2)) return { ok: true, credit: 1 }
  const qToks = tokens(q.prompt)
  if (accepted.some(x => x.includes(a) && a.length >= 3)) return { ok: true, credit: 1 }
  if (qToks.some(t => t === a)) return { ok: true, credit: 1 }
  return { ok: false, credit: 0 }
}

/**
 * Open-ended (the manuals ask "explain in your own words" a lot). Graded by
 * keyword coverage against the model answer, which is honest about being a
 * heuristic: the learner always sees the model answer and can self-correct.
 */
function proseCorrect(q: Question, answer: string): { credit: number; note: string } {
  const given = tokens(answer)
  if (given.length === 0) return { credit: 0, note: 'No answer given.' }
  const keys = (q.keywords && q.keywords.length ? q.keywords : tokens(q.modelAnswer)).filter(k => k.length > 2)
  const hay = norm(answer)
  const hit = keys.filter(k => hay.includes(norm(k)))
  const nums = numSet(q.modelAnswer)
  const givenNums = numSet(answer)
  const numHits = [...nums].filter(n => givenNums.has(n))
  const cov = keys.length ? hit.length / keys.length : 0
  const numCov = nums.size ? numHits.length / nums.size : 0
  let credit = 0.55 * cov + 0.45 * (nums.size ? numCov : cov)
  if (hit.length >= 2 && given.length >= 6) credit = Math.max(credit, 0.6)
  if (hit.length === 0 && nums.size === 0 && given.length > 12) credit = Math.max(credit, 0.4) // wrote something sensible-ish
  credit = Math.min(1, Math.round(credit * 100) / 100)
  const note = hit.length
    ? `Matched ${hit.length}/${keys.length} key ideas${nums.size ? ` and ${numHits.length}/${nums.size} figures` : ''}.`
    : 'No key ideas from the model answer were found — compare with the model answer below.'
  return { credit, note }
}

export function grade(questions: Question[], answers: Record<string, string>, passPercent = 60): GradeResult {
  const per: GradedQuestion[] = []
  let creditSum = 0
  let exactCount = 0
  let gradeable = 0
  let answeredAll = true
  for (const q of questions) {
    const raw = answers[q.id] ?? ''
    if (!String(raw).trim()) answeredAll = false
    let correct: boolean | null = null
    let credit = 0
    let note = ''
    /*
     * 2.7 — ten of the 141 levels ask a question the source manual never gave a key
     * for (the answer table was missing from the PDF). A machine cannot mark those,
     * and scoring them 0 would punish a learner for a hole in the source document,
     * so they stay in the lesson, out of the score, and are read by a tutor instead.
     */
    const unkeyed =
      !String(q.modelAnswer || '').trim() && !(q.keywords && q.keywords.length) &&
      !(q.correct && q.correct.length) && !(q.accept && q.accept.length)
    if (unkeyed) {
      correct = null
      credit = 0
      note = 'Unscored — your course manual has no answer key for this one, so a tutor reads it. Anything else you wrote here is welcome.'
    } else if (q.type === 'mcq' || q.type === 'true_false') {
      correct = choiceCorrect(q, raw)
      credit = correct ? 1 : 0
      note = correct ? 'Correct.' : raw ? 'Not the option the key selects.' : 'No answer given.'
    } else if (q.type === 'fill_blank') {
      const r = blankCorrect(q, raw)
      correct = r.ok
      credit = r.credit
      note = r.ok ? 'Matches the key.' : 'Does not match the accepted forms.'
    } else {
      const r = proseCorrect(q, raw)
      credit = r.credit
      correct = credit >= 0.75 ? true : credit >= 0.5 ? null : false
      note = r.note + (correct === null ? ' A tutor mark can confirm this one.' : '')
    }
    if (correct === true) exactCount++
    if (!unkeyed) { creditSum += credit; gradeable++ }
    per.push({
      id: q.id, correct, credit,
      expected: q.correct,
      modelAnswer: q.modelAnswer,
      explanation: q.explanation || (q.modelAnswer ? 'Model answer above — line it up against your own.' : ''),
      note,
    })
  }
  // The denominator is what could be marked, not what was asked (see `unkeyed`).
  const total = gradeable || 1
  const scorePct = gradeable ? Math.round((creditSum / total) * 100) : answeredAll ? 100 : 0
  return {
    correct: exactCount,
    total: questions.length,
    scorePct,
    passed: scorePct >= passPercent,
    perfect: questions.length > 0 && per.every(q => q.credit >= 0.999 || !gradeable),
    perQuestion: per,
    xpAwardedEligible: scorePct >= passPercent ? 1 : 0,
  }
}

/** Rubric self-check (6.7) never awards XP twice — it only unlocks "ready to submit". */
export function checklistReady(items: { done: boolean; required?: boolean }[]): boolean {
  const req = items.filter(i => i.required !== false)
  return req.length > 0 && req.every(i => i.done)
}
