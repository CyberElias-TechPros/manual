'use client'
/**
 * 4.2-4.7 + 6.x — one level, taken in stages.
 *
 * The manual for a level runs to fifteen sections; a beginner on a phone at 22:00 should never see
 * that as one page. So the level is a queue of stages — read a section, do the practical, answer the
 * check, take the case study, close the level — and exactly one of them is on screen at a time, with
 * a step counter so "how far" is never a guess. Anyone who prefers the whole manual at once can flip
 * the mode; progress is shared, and the stage lives in the URL so a dropped connection returns the
 * learner to the same sentence, not the top of the page.
 *
 * Rules the roadmap is explicit about and this file obeys:
 *   • the client reports *activity*, never scores (5.9): every award comes back from the API, so a
 *     modified bundle cannot mint XP;
 *   • nothing is lost when the network drops (10.4): reads go through the offline queue, and the
 *     level itself came from the cache or the last good response;
 *   • no ads between a question and its feedback (8.3): there is no ad slot in any stage — only after
 *     completion, where a banner costs the learner nothing.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import Link from 'next/link'
import {
  AdSlot, BlockList, Button, Checklist, CodeBlanks, DiagramView, ExerciseBox,
  FlashcardDeck, Label, LevelGlossary, LockNote, MicroDeck, Pill, ProgressBar, QuizRunner, ScenarioRunner, SectionRail,
  Stars, Troubleshooting, announceAward, cx, mutate, request, useApi,
  useSectionRead, useSession,
} from '@cea/ui'
import type { LessonCardUI, MicroCheckAttemptState, QuizResult } from '@cea/ui'
import { LevelFeedback } from './level-feedback'
import { XP, formatNgn } from '@cea/config'

type Section = { letter: string; kind: string; title: string; blocks: any[]; wordCount: number }
type Stage = { id: string; label: string; intent: string; sections: Section[] }
type Level = {
  id: string; number: number; of: number; title: string; module?: string; durationMinutes?: number
  difficulty?: string; prerequisiteKnowledge?: string; connectionToPrevious?: string
  isFree: boolean; isCapstone: boolean; diagram?: any; sections: Section[]; cards?: LessonCardUI[]; starterRewritten?: boolean
  outcomes: string[]
  quiz: { title: string; questions: any[]; passPercent: number; source: string }
  exercises: any[]; scenarios: any[]; flashcards: any[]; checklist: string[]
  troubleshooting: any[]; codeBlanks?: any[]; estWords: number
  /** 11.x — the hard words this level uses, each with a one-line plain meaning (attached by the build). */
  glossary?: { term: string; plain: string }[]
}
type Payload = {
  course: { slug: string; displayTitle?: string; name?: string; feeNgn?: number; sessionsCount?: number }
  session: Level
  /** the API answers 402/401 instead of sending an access object (7.5) */
  access?: { state: string; enrolled: boolean }
  progress?: null | {
    openedAt?: string; lastSeenAt?: string | null; completedAt?: string | null; sectionsSeen?: string[]
    resume?: any; microChecksDone?: string[]; microCheckRun?: number
    quizBest?: number | null; quizAttempts?: number; exerciseSubmitted?: boolean
    checklist?: { label: string; done: boolean }[]; scenario?: { chosen?: string; correctId?: string | null } | null
    timeSpentSec?: number
  }
  xpRules?: Record<string, number>
}

/** Section kinds that are reading, as opposed to something the learner has to do. */
const READ_KINDS = new Set(['lecture', 'concept', 'demo', 'overview', 'objective', 'recap', 'troubleshooting', 'reading', 'worked_example'])
/** Trainer-sheet metadata sections hidden from step-by-step reading so Step 1 starts straight at the lesson. */
const META_SECTION_KINDS = new Set(['identification', 'outcomes', 'materials'])
const FRIENDLY_SECTION_TITLE: Record<string, string> = {
  opening: 'Warm-up: why this matters',
  prereq_review: 'Quick recap before we begin',
  lecture: 'Main lesson (explained simply)',
  demo: 'Step-by-step walkthrough',
  guided_practical: 'Try it yourself, step by step',
  troubleshooting: 'Common mistakes & easy fixes',
  assignment: 'Extra practice challenge',
}
function friendlyTitle(s?: Section): string {
  if (!s) return 'Read'
  return FRIENDLY_SECTION_TITLE[s.kind] || s.title
}
const STAGE_XP: Record<string, number> = {
  read: XP.lessonRead,
  practise: XP.exerciseSubmit,
  check: XP.quizPass,
  case: XP.exerciseSubmit,
  finish: XP.sessionComplete,
}
/** What each activity kind is called in the queue, and why it is there. */
const ACTIVITY: Record<string, { id: string; label: string; intent: string; order: number }> = {
  exercise: { id: 'practise', label: 'Practise', order: 1, intent: `Try one practical task yourself (+${XP.exerciseSubmit} XP). You see the checklist first and the example answer right after.` },
  knowledge_check: { id: 'check', label: 'Boss Quiz', order: 2, intent: `End-of-level Boss Quiz (+${XP.quizPass} XP, +${XP.quizPerfectBonus} XP for 100%). No timer, unlimited retries, and simple everyday words count!` },
  case_study: { id: 'case', label: 'Case study', order: 3, intent: `Pick what you would do in a real-life situation (+${XP.exerciseSubmit} XP).` },
  reflection: { id: 'review', label: 'Review', order: 4, intent: 'Flip through the quick flashcards so the key ideas stick in your head.' },
}
const READ_STAGE = { id: 'read', label: 'Cards', intent: `One bite-sized card at a time (+${XP.lessonRead} XP for reading + ${XP.microCheck} XP on every ⚡ Quick Check!).` }
const FINISH_STAGE = { id: 'finish', label: 'Finish', intent: `Tick off what you tried, claim your +${XP.sessionComplete} XP level bonus, and unlock the next level!` }

/** Turn the level's sections into an ordered queue of stages: one idea per screen. */
function buildStages(lesson?: Level | null): Stage[] {
  if (!lesson) return []
  const buckets = new Map<string, Section[]>()
  for (const s of lesson.sections ?? []) {
    const activity = ACTIVITY[s.kind]
    if (!s.blocks?.length && !activity) continue
    if (!activity && META_SECTION_KINDS.has(s.kind)) continue
    const id = activity && !READ_KINDS.has(s.kind) ? activity.id : 'read'
    if (!buckets.has(id)) buckets.set(id, [])
    buckets.get(id)!.push(s)
  }
  if (!buckets.has('read')) {
    const fallback = (lesson.sections ?? []).filter(s => s.blocks?.length > 0 && !ACTIVITY[s.kind])
    if (fallback.length) buckets.set('read', fallback)
  }
  const stages: Stage[] = []
  if (buckets.has('read')) stages.push({ ...READ_STAGE, sections: buckets.get('read')! })
  for (const meta of Object.values(ACTIVITY).sort((a, b) => a.order - b.order)) {
    if (buckets.has(meta.id)) stages.push({ id: meta.id, label: meta.label, intent: meta.intent, sections: buckets.get(meta.id)! })
  }
  stages.push({ ...FINISH_STAGE, sections: [] })
  return stages
}

/** The stage/sub-step in the URL, so a reload is a resume and not a reset. */
function readLocation(): { s: string; i: number } | null {
  if (typeof window === 'undefined') return null
  const p = new URLSearchParams(window.location.search)
  const s = p.get('s')
  if (!s) return null
  const i = Number(p.get('i') ?? '0')
  return { s, i: Number.isFinite(i) && i > 0 ? i : 0 }
}

export function LessonView({ slug, n, seed }: { slug: string; n: number; seed?: Payload }) {
  const { user, refresh } = useSession()
  const { data, loading, error, reload, offline } = useApi<Payload>(`/api/courses/${slug}/${n}`)
  const markRead = useSectionRead(slug, n)
  const [seconds, setSeconds] = useState(0)
  const [quiz, setQuiz] = useState<QuizResult | null>(null)
  const [combo, setCombo] = useState<{ run: number } | null>(null)
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, { text: string; modelAnswer?: string }>>({})
  const [scenarios, setScenarios] = useState<Record<string, { chosen: string; correct: boolean | null; resolution?: string; correctId?: string | null }>>({})
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})
  const [flashDone, setFlashDone] = useState(false)
  const [completing, setCompleting] = useState(false)
  const [finished, setFinished] = useState<{ award: any; already?: boolean } | null>(null)
  const [banner, setBanner] = useState<{ tone: 'ok' | 'bad'; text: string } | null>(null)
  const [flow, setFlow] = useState<'step' | 'all'>('step')
  const [readCount, setReadCount] = useState(0)
  const [stageId, setStageId] = useState<string>('read')
  const [sub, setSub] = useState(0)
  const [placed, setPlaced] = useState(false)
  const [mcDone, setMcDone] = useState<Set<string>>(() => new Set())
  const [mcStates, setMcStates] = useState<Record<string, MicroCheckAttemptState>>({})
  const [mcRun, setMcRun] = useState(0)
  const startedAt = useRef(Date.now())
  const seen = useRef(new Set<string>())

  const lesson = data?.session ?? seed?.session
  const cards = useMemo(() => lesson?.cards ?? [], [lesson])
  const hasCards = cards.length > 0
  const stages = useMemo(() => buildStages(lesson), [lesson])
  const stageIndex = Math.max(0, stages.findIndex(s => s.id === stageId))
  const stage = stages[stageIndex] ?? stages[0]
  const readSections = useMemo(() => stages.find(s => s.id === 'read')?.sections ?? [], [stages])
  const readStepTotal = hasCards ? cards.length : Math.max(1, readSections.length)
  const stepping = stage?.id === 'read' && flow === 'step'
  const stepsIn = (s: Stage) => (s.id === 'read' && flow === 'step' ? readStepTotal : 1)
  const totalSteps = useMemo(() => stages.reduce((sum, s) => sum + stepsIn(s), 0), [stages, flow, readStepTotal])
  const linearStep = useMemo(
    () => stages.slice(0, stageIndex).reduce((sum, s) => sum + stepsIn(s), 0) + (stepping ? Math.min(sub + 1, readStepTotal) : 1),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stages, stageIndex, sub, flow, stepping, readStepTotal],
  )

  const currentCard = stepping && hasCards ? cards[Math.min(sub, cards.length - 1)] : undefined
  const currentRead = stepping && !hasCards ? readSections[Math.min(sub, readSections.length - 1)] : undefined
  const metaLetters = useMemo(
    () => (lesson?.sections ?? []).filter(ms => META_SECTION_KINDS.has(ms.kind) && ms.letter).map(ms => ms.letter),
    [lesson],
  )

  const doMarkRead = useCallback((letter: string, extraLetters: string[] = [], cardIdx?: number) => {
    const all = [letter, ...extraLetters].filter(Boolean)
    const fresh = all.filter(l => !seen.current.has(l))
    if (!fresh.length && cardIdx === undefined) return
    fresh.forEach(l => seen.current.add(l))
    setReadCount(seen.current.size)
    markRead(letter || fresh[0] || '', hasCards ? 25 : 45, [...extraLetters, ...metaLetters], cardIdx)
  }, [markRead, hasCards, metaLetters])

  // 4.6 — one heartbeat for the whole level; the API caps what a minute of it is worth.
  useEffect(() => {
    const t = setInterval(() => setSeconds(Math.round((Date.now() - startedAt.current) / 1000)), 15000)
    return () => clearInterval(t)
  }, [])

  // Opening the level is the first thing that happens, and it must survive being offline.
  useEffect(() => {
    if (data && user && !user.isGuest) void mutate('/api/learn/open', { course: slug, session: n })
  }, [data, user, slug, n])

  useEffect(() => {
    if (!data?.progress) return
    if (data.progress.timeSpentSec) {
      startedAt.current = Date.now() - Math.min(4000, Number(data.progress.timeSpentSec)) * 1000
    }
    if (Array.isArray(data.progress.microChecksDone) && data.progress.microChecksDone.length) {
      setMcDone(new Set(data.progress.microChecksDone))
    }
    if (typeof data.progress.microCheckRun === 'number') {
      setMcRun(data.progress.microCheckRun)
    }
  }, [data])

  // Where does this learner land? A stage in the URL wins. Otherwise: resume cardIndex or first unread card/section.
  useEffect(() => {
    if (placed || !stages.length) return
    const fromUrl = readLocation()
    if (fromUrl && stages.some(s => s.id === fromUrl.s)) {
      setStageId(fromUrl.s)
      if (fromUrl.s === 'read') setSub(Math.min(fromUrl.i, Math.max(0, readStepTotal - 1)))
    } else if (data) {
      const before = new Set(data.progress?.sectionsSeen ?? [])
      before.forEach(l => seen.current.add(l))
      if (before.size) setReadCount(before.size)
      const savedIdx = typeof data.progress?.resume?.cardIndex === 'number' ? data.progress.resume.cardIndex : -1
      if (hasCards) {
        if (before.size >= readSections.length && (data.progress?.completedAt || data.progress?.quizAttempts)) {
          setStageId('finish')
        } else if (savedIdx > 0 && savedIdx < cards.length) {
          setSub(savedIdx)
        } else {
          const firstUnreadCard = cards.findIndex(c => !before.has(c.sectionLetter))
          if (firstUnreadCard > 0) setSub(firstUnreadCard)
        }
      } else {
        const firstUnread = readSections.findIndex(s => !before.has(s.letter))
        if (firstUnread > 0) setSub(firstUnread)
        else if (firstUnread === -1 && (data.progress?.completedAt || data.progress?.quizAttempts)) setStageId('finish')
      }
    }
    if (data || seed) setPlaced(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stages.length, data])

  useEffect(() => {
    if (!placed || typeof window === 'undefined') return
    const url = new URL(window.location.href)
    url.searchParams.set('s', stageId)
    if (stepping) url.searchParams.set('i', String(sub)); else url.searchParams.delete('i')
    window.history.replaceState(null, '', url.toString())
  }, [stageId, sub, stepping, placed])

  /*
   * Reading is measured, not clicked: a bite-sized card counts after 0.9 s on screen (crediting its
   * underlying manual letters), or a legacy section after 1.4 s.
   */
  useEffect(() => {
    if (currentCard) {
      const t = window.setTimeout(
        () => doMarkRead(currentCard.sectionLetter, currentCard.creditLetters ?? [], sub),
        900,
      )
      return () => window.clearTimeout(t)
    }
    if (!currentRead?.blocks?.length) return
    const t = window.setTimeout(() => doMarkRead(currentRead.letter), 1400)
    return () => window.clearTimeout(t)
  }, [currentCard, currentRead, sub, doMarkRead])

  useEffect(() => {
    if (flow !== 'all' || !lesson) return
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (!(e.isIntersecting && e.intersectionRatio > 0.5)) continue
        const letter = (e.target as HTMLElement).dataset.sec || ''
        if (!letter || seen.current.has(letter)) continue
        window.setTimeout(() => doMarkRead(letter), 1200)
      }
    }, { threshold: [0.5] })
    for (const el of document.querySelectorAll('[data-sec]')) io.observe(el)
    return () => io.disconnect()
  }, [flow, lesson, doMarkRead])

  if (loading && !seed) return <LessonSkeleton slug={slug} n={n} />
  if (error && !data) {
    if (error.status === 402) return <LockedCourse slug={slug} n={n} message={error.message} />
    if (error.status === 401) return <SignInPrompt slug={slug} n={n} />
    return (
      <div className="mx-auto max-w-reading py-14 text-center">
        <h1 className="text-xl font-semibold text-ink dark:text-light">That level could not load</h1>
        <p className="mt-2 text-[0.9375rem] text-ink-500 dark:text-light/60">{error.message}</p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
          <Button size="sm" onClick={reload}>Try again</Button>
          <Link href={`/courses/${slug}`} className="inline-flex min-h-[36px] items-center text-[0.9375rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">Back to the course</Link>
        </div>
      </div>
    )
  }
  if (!lesson || !stage) return null

  async function answerMicroCheck(checkId: string, choiceId: string) {
    setMcStates(prev => ({ ...prev, [checkId]: { ...prev[checkId], selectedId: choiceId, busy: true } }))
    try {
      const r = await request<{
        ok: boolean
        correct: boolean
        correctId?: string
        explanation?: string
        hint?: string
        run?: number
        guestPreview?: boolean
        microChecksDone?: string[]
        award?: any
        combo?: { run: number; award: any } | null
      }>('/api/learn/micro-check', {
        method: 'POST',
        body: { course: slug, session: n, checkId, choiceId },
      })
      if (!r.correct) {
        setMcRun(0)
        setMcStates(prev => ({
          ...prev,
          [checkId]: { selectedId: choiceId, correct: false, hint: r.hint, busy: false },
        }))
        return
      }
      setMcRun(r.run ?? 1)
      if (Array.isArray(r.microChecksDone)) {
        setMcDone(new Set(r.microChecksDone))
      } else {
        setMcDone(prev => new Set([...prev, checkId]))
      }
      setMcStates(prev => ({
        ...prev,
        [checkId]: {
          selectedId: choiceId,
          correct: true,
          correctId: r.correctId,
          explanation: r.explanation,
          busy: false,
          guestPreview: r.guestPreview,
          xpEarned: r.award?.xp ?? 0,
          comboXp: r.combo?.award?.xp ?? 0,
        },
      }))
      if (r.award?.awarded) {
        announceAward(r.award, 'quick check')
        void refresh()
      }
      if (r.combo?.award?.awarded) {
        announceAward(r.combo.award, `${r.combo.run} Quick Checks in a row`)
      }
    } catch (e: any) {
      setMcStates(prev => ({ ...prev, [checkId]: { ...prev[checkId], busy: false } }))
      setBanner({ tone: 'bad', text: e?.message || 'Could not check that answer right now.' })
    }
  }

  async function submitQuiz(answers: Record<string, string>, elapsedSec: number): Promise<QuizResult> {
    const r = await request<{ result: QuizResult; award: any; best: number; combo?: { run: number } | null }>('/api/learn/quiz', {
      method: 'POST', body: { course: slug, session: n, answers, elapsedSec },
    })
    setQuiz(r.result)
    setCombo(r.combo ?? null)
    announceAward(r.award, r.result.perfect ? 'perfect score' : 'knowledge check')
    // The combo is its own award, so it toasts on its own: two numbers, two reasons, both from the server.
    if (r.combo) announceAward((r as any).combo.award, `${r.combo.run} in a row`)
    if (r.award?.unlocked) setBanner({ tone: 'ok', text: `Level ${r.award.unlocked.sessionNumber} is open: ${r.award.unlocked.title}.` })
    return r.result
  }

  async function submitExercise(id: string, text: string, selfScore: number) {
    const r = await request<{ modelAnswer?: string; code?: string | null; award: any }>('/api/learn/exercise', {
      method: 'POST', body: { course: slug, session: n, exerciseId: id, text, selfScore },
    })
    setExerciseAnswers(prev => ({ ...prev, [id]: { text, modelAnswer: r.modelAnswer || '' } }))
    announceAward(r.award, 'practical task')
  }

  async function chooseScenario(id: string, choiceId: string) {
    const r = await request<{ correct: boolean | null; feedback: string; resolution?: string; correctId?: string | null; award: any }>('/api/learn/scenario', {
      method: 'POST', body: { course: slug, session: n, scenarioId: id, choiceId },
    })
    setScenarios(prev => ({ ...prev, [id]: { chosen: choiceId, correct: r.correct, resolution: r.resolution, correctId: r.correctId } }))
    announceAward(r.award, 'case study')
  }

  async function sendFlashcards(grades: { id: string; grade: number }[]) {
    // The endpoint is keyed by card id (`cardId`) so a review can be stored without
    // re-sending the course/level for each card.
    await mutate('/api/learn/flashcards', { course: slug, session: n, reviews: grades.map(g => ({ cardId: g.id, grade: g.grade })) })
    setFlashDone(true)
    setBanner({ tone: 'ok', text: `${grades.length} cards logged — the ones you marked "again" will be due tomorrow.` })
  }

  // a returning learner's pre-flight ticks come back from the API (6.7)
  useEffect(() => {
    const init = data?.progress?.checklist
    if (!init?.length) return
    const next: Record<string, boolean> = {}
    init.forEach((it, i) => { next[String(i)] = !!it.done })
    setChecklist(next)
  }, [data])

  function toggleChecklist(next: Record<string, boolean>) {
    setChecklist(next)
    const items = (lesson?.checklist ?? []).map((label: string, i: number) => ({ label, done: !!next[String(i)] }))
    void mutate('/api/learn/checklist', { course: slug, session: n, items })
  }

  async function finish() {
    setCompleting(true)
    try {
      const r = await request<{ award: any; alreadyCompleted?: boolean; showUp?: any }>('/api/learn/complete', {
        method: 'POST', body: { course: slug, session: n, timeSpentSec: Math.round((Date.now() - startedAt.current) / 1000) },
      })
      setFinished({ award: r.award, already: r.alreadyCompleted })
      announceAward(r.award, 'level complete')
      // 5.9 — the show-up bonus rides the same response; it is a second number the API chose, so it
      // gets its own line instead of being folded into the level's total.
      if (r.showUp) announceAward(r.showUp, 'first level today')
      void refresh()
    } catch (e: any) {
      setBanner({ tone: 'bad', text: e?.message || 'Could not record that yet.' })
    } finally { setCompleting(false) }
  }

  function go(id: string, nextSub = 0) {
    setStageId(id)
    setSub(nextSub)
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'auto' })
  }

  function step(delta: 1 | -1) {
    if (stepping) {
      if (delta === 1 && currentCard) {
        doMarkRead(currentCard.sectionLetter, currentCard.creditLetters ?? [], sub)
      }
      const nextSub = sub + delta
      if (nextSub >= 0 && nextSub < readStepTotal) {
        setSub(nextSub)
        if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'auto' })
        return
      }
    }
    const target = stages[Math.min(stages.length - 1, Math.max(0, stageIndex + delta))]
    if (!target || target.id === stage.id) return
    go(target.id, delta < 0 && target.id === 'read' && flow === 'step' ? Math.max(0, readStepTotal - 1) : 0)
  }

  const done = new Set<string>()
  if (readSections.length && readCount >= readSections.length) done.add('read')
  if (quiz?.passed || (data?.progress?.quizBest ?? 0) >= 60) done.add('check')
  if ((lesson.exercises?.length ?? 0) > 0 && Object.keys(exerciseAnswers).length >= (lesson.exercises?.length ?? 0)) done.add('practise')
  if ((lesson.scenarios?.length ?? 0) > 0 && Object.keys(scenarios).length >= (lesson.scenarios?.length ?? 0)) done.add('case')
  if (flashDone || !(lesson.flashcards?.length ?? 0)) done.add('review')
  if (finished || data?.progress?.completedAt) done.add('finish')

  const minutes = lesson.durationMinutes || 105
  const nextNumber = Math.min(lesson.of || 12, n + 1)
  const courseName = data?.course?.displayTitle || data?.course?.name || slug
  const quizAttempts = (data?.progress?.quizAttempts ?? 0) + (quiz ? 1 : 0)
  const quizPending = (lesson.quiz?.questions?.length ?? 0) > 0 && quizAttempts === 0
  const needToRead = Math.min(readSections.length, Math.max(2, Math.ceil(readSections.length * 0.6)))
  const readingShort = readCount < needToRead
  const alreadyDone = !!finished || !!data?.progress?.completedAt

  return (
    <div className="mx-auto grid max-w-course gap-x-12 pb-8 pt-2 lg:grid-cols-[minmax(0,1fr)_14rem] lg:pb-16 lg:pt-6">
      <div className="min-w-0">
        <header className="max-w-reading">
          <Link href={`/courses/${slug}`} className="text-[0.8125rem] text-ink-500 underline-offset-2 hover:text-ink hover:underline dark:text-light/55">
            {courseName}{lesson.of ? ` · level ${lesson.number} of ${lesson.of}` : ''}
          </Link>
          <h1 className="mt-2.5 text-2xl font-semibold leading-tight tracking-snugish text-ink sm:text-[1.75rem] dark:text-light">{lesson.title}</h1>
          <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.8125rem] text-ink-500 dark:text-light/55">
            <span>About {minutes} minutes</span>
            <span aria-hidden className="text-ink-200 dark:text-light/20">·</span>
            <span>{stages.length} stages</span>
            {lesson.isCapstone && <Pill tone="gold">final project</Pill>}
            {offline && <Pill tone="warn">offline copy</Pill>}
            {lesson.isFree && !user && <Pill tone="success">free preview</Pill>}
          </p>
        </header>

        <div className="mt-7 border-y border-surface-line py-3 dark:border-surface-dark-line">
          <StageRail stages={stages} current={stage.id} done={done} onPick={id => go(id)} />
          <div className="mt-2.5 flex items-center gap-4">
            <ProgressBar value={linearStep} max={totalSteps} />
            <span className="shrink-0 text-[0.8125rem] tabular-nums text-ink-500 dark:text-light/55">Step {linearStep} of {totalSteps}</span>
          </div>
        </div>

        <AdSlot placement="lesson-top" />

        {banner && (
          <div role="status" className={cx('mt-6 flex max-w-reading items-start justify-between gap-4 px-4 py-3 text-[0.9375rem]', banner.tone === 'ok' ? 'bg-success/8 text-success' : 'bg-error/8 text-error')}>
            <span>{banner.text}</span>
            <button type="button" onClick={() => setBanner(null)} className="shrink-0 text-[0.8125rem] underline-offset-2 hover:underline">dismiss</button>
          </div>
        )}

        {/* not a <main> — the layout owns that landmark and the skip link targets it */}
        <div key={`${stage.id}-${stepping ? sub : 'x'}`} className="mt-8 max-w-reading animate-fade-in">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
            <h2 className="text-xl font-bold text-ink dark:text-light">
              {stepping ? (hasCards ? 'Bite-sized lesson cards' : friendlyTitle(currentRead)) : stage.label}
            </h2>
            {stepping && readStepTotal > 1 && (
              <Label>{hasCards ? `Card ${Math.min(sub + 1, readStepTotal)} of ${readStepTotal}` : `Section ${Math.min(sub + 1, readStepTotal)} of ${readStepTotal}`}</Label>
            )}
          </div>
          <p className="mt-1.5 text-[0.9375rem] text-ink-600 dark:text-light/70">{stepping ? READ_STAGE.intent : stage.intent}</p>

          {stage.id === 'read' ? (
            stepping && hasCards ? (
              <MicroDeck
                cards={cards}
                index={sub}
                onPickCard={idx => {
                  if (currentCard) doMarkRead(currentCard.sectionLetter, currentCard.creditLetters ?? [], sub)
                  setSub(idx)
                  if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'auto' })
                }}
                outcomes={lesson.outcomes}
                connectionToPrevious={lesson.connectionToPrevious}
                starterRewritten={lesson.starterRewritten}
                diagram={lesson.diagram}
                dataSaver={!!user?.prefs?.dataSaver}
                lessonTitle={lesson.title}
                doneCheckIds={mcDone}
                checkStates={mcStates}
                streakRun={mcRun}
                onAnswerCheck={answerMicroCheck}
              />
            ) : (
              <ReadStage lesson={lesson} sections={readSections} sub={sub} flow={flow} dataSaver={!!user?.prefs?.dataSaver} />
            )
          ) : stage.id === 'finish' ? (
            <FinishStage
              lesson={lesson} checklist={checklist} onChecklist={toggleChecklist}
              readCount={readCount} needToRead={needToRead} readingShort={readingShort}
              quizPending={quizPending} seconds={seconds} minutes={minutes}
              completing={completing} alreadyDone={alreadyDone} finished={finished}
              quiz={quiz} flashDone={flashDone} passPercent={lesson.quiz?.passPercent ?? XP.quizPassPercent}
              onNextStage={() => step(1)} onJump={go} onFinish={finish}
              n={n} slug={slug} nextNumber={nextNumber}
            />
          ) : (
            <ActivityStage
              stage={stage} lesson={lesson} slug={slug} n={n}
              quiz={quiz} combo={combo} submitQuiz={submitQuiz} retryQuiz={() => { setQuiz(null); setCombo(null) }}
              exerciseAnswers={exerciseAnswers} submitExercise={submitExercise}
              scenarios={scenarios} chooseScenario={chooseScenario}
              sendFlashcards={sendFlashcards} onNotice={setBanner}
            />
          )}
        </div>

        {/* the gap between stages is the one moment in a level where the learner has finished a thought
            and has not yet started the next one; the ad lives there rather than inside a question */}
        {stage.id !== 'finish' && <AdSlot placement="lesson-between-stages" variant="card" />}

        {stage.id !== 'finish' && (
          <div className="mt-10 flex max-w-reading flex-wrap items-center justify-between gap-4 border-t border-surface-line pt-5 dark:border-surface-dark-line">
            <button
              type="button" onClick={() => step(-1)} disabled={linearStep <= 1}
              className="min-h-[44px] text-[0.9375rem] font-bold text-ink-700 underline-offset-4 hover:text-ink hover:underline disabled:invisible dark:text-light/75 dark:hover:text-light"
            >← Previous</button>
            <div className="flex flex-wrap items-center gap-4">
              {stage.id === 'read' && (
                <button
                  type="button" onClick={() => setFlow(f => (f === 'step' ? 'all' : 'step'))}
                  className="text-[0.8125rem] font-semibold text-ink-600 underline-offset-2 hover:text-ink hover:underline dark:text-light/70"
                  title="Switch between bite-sized cards and full manual notes"
                >
                  {flow === 'step' ? 'Full manual view' : 'Bite-sized cards'}
                </button>
              )}
              <Button onClick={() => step(1)}>
                {stepping && sub + 1 < readStepTotal
                  ? (currentCard?.check && !mcDone.has(currentCard.check.id) && !mcStates[currentCard.check.id]?.correct
                    ? 'Skip check · Next card →'
                    : 'Next card →')
                  : stage.id === 'read'
                    ? 'Continue to practice →'
                    : 'Continue →'}
              </Button>
            </div>
          </div>
        )}

        {!user && (
          <section className="mt-10 max-w-reading bg-surface-muted p-6 text-center dark:bg-surface-dark-muted">
            <h2 className="text-base font-medium text-ink dark:text-light">This level is free. Your progress is not saved yet.</h2>
            <p className="mx-auto mt-2 max-w-measure text-[0.9375rem] text-ink-500 dark:text-light/60">
              An account keeps your XP, your streak and your place in the other {Math.max(0, (data?.course?.sessionsCount ?? 1) - 1)} levels
              {' '}{formatNgn(data?.course?.feeNgn ?? 0)} by bank transfer.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-5">
              <Link href="/auth/register" className="inline-flex min-h-[44px] items-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white hover:bg-[#152c4d]">Create a free account</Link>
              <Link href="/auth/login" className="inline-flex min-h-[44px] items-center text-[0.9375rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">Sign in</Link>
            </div>
          </section>
        )}
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-20 space-y-9">
          <div>
            <h2 className="text-[0.8125rem] font-medium text-ink-500 dark:text-light/55">This level</h2>
            <ol className="mt-2 -mx-2">
              {stages.map(s => {
                const isNow = s.id === stage.id
                const isDone = done.has(s.id)
                return (
                  <li key={s.id}>
                    <button
                      type="button" onClick={() => go(s.id)} aria-current={isNow ? 'step' : undefined}
                      className={cx('flex w-full items-center gap-2.5 rounded-card px-2 py-1.5 text-left text-[0.8125rem] transition-colors',
                        isNow ? 'bg-surface-muted font-medium text-ink dark:bg-surface-dark-muted dark:text-light' : 'text-ink-500 hover:bg-surface-muted/60 dark:text-light/55')}
                    >
                      <span aria-hidden className={cx('h-1.5 w-1.5 shrink-0 rounded-full', isDone ? 'bg-success' : isNow ? 'bg-navy dark:bg-sky' : 'bg-ink-200 dark:bg-surface-dark-line-strong')} />
                      {s.label}
                      {s.id === 'read' && readStepTotal > 1 && <span className="ml-auto tabular-nums text-ink-400 dark:text-light/45">{Math.min(sub + 1, readStepTotal)}/{readStepTotal}</span>}
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>
          <LevelTools slug={slug} n={n} sections={lesson.sections ?? []} />
          {lesson.prerequisiteKnowledge && (
            <p className="text-[0.8125rem] leading-relaxed text-ink-500 dark:text-light/50">Before this level: {lesson.prerequisiteKnowledge}</p>
          )}
        </div>
      </aside>
    </div>
  )
}

/** The stage strip under the title: where I am, what is next, nothing else. */
function StageRail({ stages, current, done, onPick }: { stages: Stage[]; current: string; done: Set<string>; onPick: (id: string) => void }) {
  return (
    <nav aria-label="Stages in this level" className="no-scrollbar -mx-1 flex items-center gap-1 overflow-x-auto px-1">
      {stages.map((s, i) => {
        const isNow = s.id === current
        const isDone = done.has(s.id)
        return (
          <button
            key={s.id} type="button" onClick={() => onPick(s.id)} aria-current={isNow ? 'step' : undefined}
            className={cx('flex shrink-0 items-center gap-2 rounded-card px-2.5 py-1.5 text-[0.8125rem] transition-colors duration-150',
              isNow ? 'font-medium text-ink dark:text-light' : 'text-ink-400 hover:text-ink dark:text-light/45 dark:hover:text-light/80')}
          >
            <span aria-hidden className={cx('flex h-5 w-5 items-center justify-center rounded-full text-[0.6875rem] font-bold tabular-nums',
              isDone && !isNow ? 'bg-navy text-white dark:bg-sky dark:text-deep' : isNow ? 'border-2 border-navy text-navy dark:border-sky dark:text-sky' : 'border border-surface-line-strong text-ink-400 dark:border-surface-dark-line-strong dark:text-light/45')}>
              {isDone && !isNow ? '✓' : i + 1}
            </span>
            <span>{s.label}</span>
            {STAGE_XP[s.id] && !isDone ? <span className="text-[0.6875rem] font-bold text-[#8a5b0d] dark:text-gold">+{STAGE_XP[s.id]} XP</span> : null}
          </button>
        )
      })}
    </nav>
  )
}

/** The reading half of the level: one section (or all of them) plus the diagram that belongs to it. */
function ReadStage({ lesson, sections, sub, flow, dataSaver }:
  { lesson: Level; sections: Section[]; sub: number; flow: 'step' | 'all'; dataSaver: boolean }) {
  const list = flow === 'step' ? [sections[Math.min(sub, sections.length - 1)]].filter(Boolean) : sections
  const showDiagram = !!lesson.diagram && (flow === 'step' ? ['lecture', 'demo'].includes(list[0]?.kind) : sub === 0)
  const leadIn = sub === 0 || flow === 'all'
  return (
    <>
      {leadIn && lesson.outcomes?.length > 0 && (
        <div className="mt-6 rounded-card border-l-4 border-gold bg-surface-muted/60 p-4 dark:bg-surface-dark-muted/50">
          <h3 className="text-[0.875rem] font-bold text-ink dark:text-light">What you will be able to do after this level</h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.9375rem] text-ink-800 dark:text-light/90">
            {lesson.outcomes.map((o, i) => <li key={i}>{o}</li>)}
          </ul>
        </div>
      )}
      {/* The plain-English strip goes above the reading, not after it: a learner who does not know a
          word cannot get to the end of a section and still be lost. */}
      {leadIn && <LevelGlossary terms={lesson.glossary} />}
      {leadIn && lesson.connectionToPrevious && (
        <p className="mt-5 text-[0.9375rem] text-ink-500 dark:text-light/60">
          <span className="font-medium text-ink-700 dark:text-light/80">Last time:</span> {lesson.connectionToPrevious}
        </p>
      )}
      {flow === 'all' && (
        <div className="mt-7">
          <SectionRail
            sections={sections.map(s => ({ letter: s.letter, title: s.title, kind: s.kind }))}
            active={list[0]?.letter}
            onPick={letter => document.getElementById(`sec-${letter}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          />
        </div>
      )}
      <div className="mt-2 space-y-10">
        {list.map((s, i) => (
          <section key={s.letter} id={`sec-${s.letter}`} data-sec={s.letter} className="scroll-mt-24">
            {flow === 'all' && i > 0 && (
              <h3 className="mb-2 text-[0.8125rem] font-medium text-ink-400 dark:text-light/45">{s.title}</h3>
            )}
            <BlockList blocks={s.blocks} />
          </section>
        ))}
      </div>
      {showDiagram && (
        <div className="mt-2">
          <DiagramView diagram={lesson.diagram} dataSaver={dataSaver} alt={`${lesson.title} — diagram from the manual`} />
        </div>
      )}
      <AdSlot placement="lesson-inline" variant="card" />
    </>
  )
}

/** Everything the learner has to *do* in this stage, in the manual's own order. */
function ActivityStage({ stage, lesson, quiz, combo, submitQuiz, retryQuiz, exerciseAnswers, submitExercise, scenarios, chooseScenario, sendFlashcards, onNotice, slug, n }: any) {
  return (
    <div className="mt-7 space-y-10">
      {stage.sections.map((s: Section) => (
        <div key={s.letter} id={`sec-${s.letter}`} data-sec={s.letter} className="scroll-mt-24">
          {s.blocks?.length > 0 && <BlockList blocks={s.blocks} />}
          {s.kind === 'knowledge_check' && lesson.quiz?.questions?.length > 0 && (
            <div className="mt-6">
              <QuizRunner
                questions={lesson.quiz.questions} passPercent={lesson.quiz.passPercent} title={lesson.quiz.title || 'Knowledge check'}
                result={quiz} onSubmit={submitQuiz} onRetry={retryQuiz} combo={combo}
              />
            </div>
          )}
          {s.kind === 'exercise' && (
            <div className="mt-6 space-y-8">
              {(lesson.exercises ?? []).map((ex: any) => (
                <ExerciseBox
                  key={ex.id} exercise={ex}
                  modelAnswer={exerciseAnswers[ex.id]?.modelAnswer}
                  submittedText={exerciseAnswers[ex.id]?.text}
                  onSubmit={(text: string, self: number) => submitExercise(ex.id, text, self)}
                />
              ))}
              {(lesson.codeBlanks?.length ?? 0) > 0 && (
                <CodeBlanks
                  items={lesson.codeBlanks}
                  check={async (id: string, values: string[]) => {
                    try {
                      const r = await request<any>('/api/learn/blank', { method: 'POST', body: { course: slug, session: n, id, values } })
                      return { results: r.results, correctCount: r.correctCount, total: r.total, hints: r.hints, explain: r.explain }
                    } catch (e: any) {
                      onNotice({ tone: 'bad', text: e?.message || 'Could not check those gaps.' })
                      return null
                    }
                  }}
                />
              )}
            </div>
          )}
          {s.kind === 'case_study' && (lesson.scenarios ?? []).length > 0 && (
            <div className="mt-6 space-y-8">
              {lesson.scenarios.map((sc: any) => (
                <ScenarioRunner
                  key={sc.id} scenario={sc}
                  chosen={scenarios[sc.id]?.chosen}
                  correctId={scenarios[sc.id]?.correctId ?? null}
                  resolution={scenarios[sc.id]?.resolution}
                  onPick={(choice: string) => chooseScenario(sc.id, choice)}
                />
              ))}
            </div>
          )}
          {s.kind === 'troubleshooting' && (lesson.troubleshooting ?? []).length > 0 && <div className="mt-6"><Troubleshooting items={lesson.troubleshooting} /></div>}
          {s.kind === 'reflection' && (lesson.flashcards ?? []).length > 0 && <div className="mt-6"><FlashcardDeck cards={lesson.flashcards} onGraded={sendFlashcards} /></div>}
        </div>
      ))}
    </div>
  )
}

/**
 * The last stage. It is the only place in the app that refuses to let you move on, and it says why in
 * one plain sentence instead of a red toast — the API is the authority (too_fast / quiz_required /
 * not_opened), so this list is a preview of that check, not a second rule.
 */
function FinishStage({ lesson, checklist, onChecklist, readCount, needToRead, readingShort, quizPending, seconds, minutes, completing, alreadyDone, finished, quiz, flashDone, passPercent, onJump, onFinish, n, slug, nextNumber }: any) {
  const { user } = useSession()
  const open = !(readingShort || quizPending) && seconds >= XP.minCompletionSeconds
  return (
    <div className="mt-7 space-y-8">
      {(lesson.checklist ?? []).length > 0 && (
        <Checklist items={lesson.checklist} done={checklist} onChange={onChecklist} title="Before you go" />
      )}

      {alreadyDone ? (
        <div className="rounded-card border border-surface-line bg-surface-muted/70 p-6 text-center dark:border-surface-dark-line dark:bg-surface-dark-muted/70">
          <h3 className="text-lg font-semibold text-ink dark:text-light">Level {lesson.number} is closed.</h3>
          <p className="mx-auto mt-1.5 max-w-measure text-[0.9375rem] text-ink-500 dark:text-light/60">
            {finished?.award?.xp ? `+${finished.award.xp} XP banked. ` : ''}
            {finished?.already ? 'You had already finished this one — no double credit.' : 'Your streak is kept, and your best quiz score is what counts.'}
            {flashDone ? ' Flashcard reviews are scheduled.' : ''}
          </p>
          {quiz && (
            <p className="mt-3 flex items-center justify-center gap-2 text-[0.9375rem] text-ink-600 dark:text-light/70">
              <Stars n={quiz.scorePct >= 90 ? 3 : quiz.scorePct >= 70 ? 2 : quiz.scorePct >= passPercent ? 1 : 0} size={14} />
              <span className="tabular-nums">{quiz.scorePct}%</span>
            </p>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
            {n < nextNumber && (
              <Link href={`/learn/${slug}/${nextNumber}`} className="inline-flex min-h-[44px] items-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white hover:bg-[#152c4d]">
                Next level · {nextNumber}
              </Link>
            )}
            <Link href={`/courses/${slug}/map`} className="inline-flex min-h-[44px] items-center text-[0.9375rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">See the map</Link>
            <Link href="/dashboard" className="inline-flex min-h-[44px] items-center text-[0.9375rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">Dashboard</Link>
          </div>
          <AdSlot placement="level-complete-band" />
          <AdSlot placement="level-complete-side" />
        </div>
      ) : (
        <div className="rounded-card border border-surface-line p-6 dark:border-surface-dark-line">
          <h3 className="text-base font-medium text-ink dark:text-light">Close this level</h3>
          <ul className="mt-3 space-y-2 text-[0.9375rem]">
            <Requirement ok={!readingShort} label={`Read at least ${needToRead} of ${Math.max(needToRead, readCount)} reading parts`}>
              You are on {readCount}. <button type="button" className="text-navy underline underline-offset-2 dark:text-sky" onClick={() => onJump('read')}>Back to the reading</button>
            </Requirement>
            <Requirement ok={!quizPending} label="Take the knowledge check">
              {quizPending ? <>It is what proves the level, and it takes about five minutes. <button type="button" className="text-navy underline underline-offset-2 dark:text-sky" onClick={() => onJump('check')}>Go to the check</button></> : 'Taken — your best score is recorded.'}
            </Requirement>
            <Requirement ok={seconds >= XP.minCompletionSeconds} label={`At least ${XP.minCompletionSeconds}s of real time on the level`}>
              {seconds < XP.minCompletionSeconds ? `You have been here ${seconds}s. Keep reading; this unlocks by itself.` : `Time on this level: ${Math.round(seconds / 60)} minutes.`}
            </Requirement>
          </ul>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <Button onClick={onFinish} loading={completing} disabled={!open}>Mark level {lesson.number} complete</Button>
            {!open && <Label>Nothing is lost — the buttons unlock as the three lines above turn green.</Label>}
          </div>
          {!user && <p className="mt-4 text-[0.8125rem] text-ink-500 dark:text-light/55">Sign in first, or this completion is not recorded anywhere.</p>}
        </div>
      )}
      {/* 11.2 — asked on the Finish stage whether or not the level is already closed: by this point
          the learner has read the level and taken the check, which is exactly when they know. */}
      <LevelFeedback slug={slug} n={lesson.number ?? n} />
    </div>
  )
}

function Requirement({ ok, label, children }: { ok: boolean; label: string; children?: ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden className={cx('mt-1.5 h-2 w-2 shrink-0 rounded-full', ok ? 'bg-success' : 'bg-ink-200 dark:bg-surface-dark-line-strong')} />
      <span className="min-w-0">
        <span className={cx('block', ok ? 'text-ink-400 line-through decoration-1 dark:text-light/35' : 'text-ink dark:text-light')}>{label}</span>
        {!ok && children ? <span className="mt-0.5 block text-[0.8125rem] text-ink-500 dark:text-light/55">{children}</span> : null}
      </span>
    </li>
  )
}

/** Notes + bookmark (4.10). It lives in the rail so it is never in the way of the reading. */
function LevelTools({ slug, n, sections, className }: { slug: string; n: number; sections: Section[]; className?: string }) {
  const { user } = useSession()
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState<{ id?: string; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [marked, setMarked] = useState(false)
  if (!user) return null
  return (
    <div className={className}>
      <h2 className="text-[0.8125rem] font-medium text-ink-500 dark:text-light/55">Your notes for this level</h2>
      <textarea
        value={saved ? saved.text : note} rows={4} onChange={e => setNote(e.target.value)}
        placeholder="What will you remember in week 3? Notes are searchable from /search."
        className="mt-2 w-full rounded-card border border-surface-line bg-surface p-3 text-[0.9375rem] leading-relaxed text-ink dark:border-surface-dark-line dark:bg-surface-dark dark:text-light"
      />
      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
        <Button
          size="sm" loading={busy} disabled={!note.trim()}
          onClick={async () => {
            setBusy(true)
            try {
              const r = await request<{ id: string }>('/api/notes', { method: 'POST', body: { course: slug, session: n, section: sections[0]?.letter ?? 'A', text: note } })
              setSaved({ id: r.id, text: note })
            } finally { setBusy(false) }
          }}
        >{saved ? 'Update note' : 'Save note'}</Button>
        <button
          type="button" onClick={async () => {
            setMarked(m => !m)
            await mutate('/api/bookmarks', { course: slug, session: n, section: sections[0]?.letter ?? 'A' }).catch(() => setMarked(m => !m))
          }}
          aria-pressed={marked}
          className={cx('text-[0.8125rem] underline-offset-2 hover:underline', marked ? 'font-medium text-gold' : 'text-ink-500 dark:text-light/55')}
        >
          {marked ? 'Bookmarked' : 'Bookmark this level'}
        </button>
        {saved && <span className="text-[0.8125rem] text-success">Saved.</span>}
      </div>
    </div>
  )
}

function LessonSkeleton({ slug, n }: { slug: string; n: number }) {
  return (
    <div className="mx-auto max-w-reading py-14" aria-busy="true" aria-label="Loading level">
      <p className="text-[0.8125rem] font-medium text-ink-500 dark:text-light/55">{courseLabel(slug)}</p>
      <h1 className="mt-1 text-2xl font-semibold tracking-snugish text-ink dark:text-light">Level {n}</h1>
      <div className="mt-3 h-8 w-2/3 rounded bg-surface-muted dark:bg-surface-dark-muted" />
      <div className="mt-6 h-px w-full bg-surface-line dark:bg-surface-dark-line" />
      <div className="mt-8 space-y-4">
        {[10, 6, 12, 12, 8].map((h, i) => <div key={i} className="animate-shimmer rounded bg-surface-muted dark:bg-surface-dark-muted" style={{ height: h * 4, backgroundSize: '400% 100%' }} />)}
      </div>
    </div>
  )
}

function LockedCourse({ slug, n, message }: { slug: string; n: number; message: string }) {
  return (
    <div className="mx-auto max-w-measure py-16">
      {/* the level body is behind a payment, but what page you are on is public information, and a
          locked screen with no heading leaves a screen-reader user with nothing to announce */}
      <p className="text-center text-[0.8125rem] font-medium text-ink-500 dark:text-light/55">{courseLabel(slug)}</p>
      <h1 className="mt-1 text-center text-2xl font-semibold tracking-snugish text-ink dark:text-light">Level {n} is waiting for payment</h1>
      <div className="mt-6">
        <LockNote onUnlock={() => { location.href = `/checkout/${slug}` }} />
      </div>
      <p className="mt-4 text-center text-[0.875rem] text-ink-500 dark:text-light/55">{message}</p>
    </div>
  )
}

/** The catalogue's own name, from the URL: public even when the level's text is not. */
function courseLabel(slug: string) {
  return slug.split('-').filter(Boolean).map(w => (w[0] as string).toUpperCase() + w.slice(1)).join(' ')
}

function SignInPrompt({ slug, n }: { slug: string; n: number }) {
  return (
    <div className="mx-auto max-w-measure py-16 text-center">
      <h1 className="text-xl font-semibold text-ink dark:text-light">Sign in to keep this level’s progress</h1>
      <p className="mx-auto mt-2 max-w-measure text-[0.9375rem] text-ink-500 dark:text-light/60">
        Level 1 of every course is free — you only need an account so the XP, the streak and the next level are remembered.
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
        <Link href={`/auth/register?next=/learn/${slug}/${n}`} className="inline-flex min-h-[44px] items-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white">Create a free account</Link>
        <Link href={`/auth/login?next=/learn/${slug}/${n}`} className="inline-flex min-h-[44px] items-center text-[0.9375rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">Sign in</Link>
      </div>
    </div>
  )
}
