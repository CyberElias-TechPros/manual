'use client'
/**
 * 4.2-4.7 + 6.x — one level, end to end: read, watch the worked demo, answer the
 * knowledge check, do the practical, review the case study, then finish.
 *
 * Rules this file obeys and the roadmap is explicit about:
 *   • the client reports *activity*, never scores (5.9): every award comes back from
 *     the API, so a modified bundle cannot mint XP;
 *   • nothing is lost when the network drops (10.4): reads go through the offline
 *     queue, and the level itself came from the cache or the last good response;
 *   • no ads between the question and its feedback (8.3): this tree has no ad slot
 *     inside the quiz or the exercise — only after completion, where a banner costs
 *     the learner nothing.
 */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import {
  AdSlot, BlockList, Button, Card, Checklist, Chip, CodeBlanks, DiagramView, ExerciseBox,
  FlashcardDeck, LockNote, ProgressBar, QuizRunner, RankChip, ScenarioRunner, SectionRail,
  Stars, StreakFlame, Troubleshooting, announceAward, cx, mutate, request, useApi,
  useSectionRead, useSession,
} from '@cea/ui'
import type { QuizResult } from '@cea/ui'
import { XP, formatNgn } from '@cea/config'

type Section = { letter: string; kind: string; title: string; blocks: any[]; wordCount: number }
type Level = {
  id: string; number: number; of: number; title: string; module?: string; durationMinutes?: number
  difficulty?: string; prerequisiteKnowledge?: string; connectionToPrevious?: string
  isFree: boolean; isCapstone: boolean; diagram?: any; sections: Section[]; outcomes: string[]
  quiz: { title: string; questions: any[]; passPercent: number; source: string }
  exercises: any[]; scenarios: any[]; flashcards: any[]; checklist: string[]
  troubleshooting: any[]; codeBlanks?: any[]; estWords: number
}
type Payload = {
  course: { slug: string; displayTitle?: string; name?: string; feeNgn?: number; sessionsCount?: number }
  session: Level
  /** the API answers 402/401 instead of sending an access object (7.5) */
  access?: { state: string; enrolled: boolean }
  progress?: null | {
    openedAt?: string; lastSeenAt?: string | null; completedAt?: string | null; sectionsSeen?: string[]
    resume?: any; quizBest?: number | null; quizAttempts?: number; exerciseSubmitted?: boolean
    checklist?: { label: string; done: boolean }[]; scenario?: { chosen?: string; correctId?: string | null } | null
    timeSpentSec?: number
  }
  xpRules?: Record<string, number>
}

export function LessonView({ slug, n, seed }: { slug: string; n: number; seed?: Payload }) {
  const { user, refresh } = useSession()
  const { data, loading, error, reload, offline } = useApi<Payload>(`/api/courses/${slug}/${n}`)
  const markRead = useSectionRead(slug, n)
  const [active, setActive] = useState<string>('A')
  const [seconds, setSeconds] = useState(0)
  const [quiz, setQuiz] = useState<QuizResult | null>(null)
  const [exerciseAnswers, setExerciseAnswers] = useState<Record<string, { text: string; modelAnswer?: string }>>({})
  const [scenarios, setScenarios] = useState<Record<string, { chosen: string; correct: boolean | null; feedback: string; resolution?: string; correctId?: string | null }>>({})
  const [checklist, setChecklist] = useState<Record<string, boolean>>({})
  const [flashDone, setFlashDone] = useState(false)
  const [completing, setCompleting] = useState(false)
  const [finished, setFinished] = useState<{ award: any; already?: boolean } | null>(null)
  const [banner, setBanner] = useState<{ tone: 'ok' | 'bad'; text: string } | null>(null)
  const startedAt = useRef(Date.now())

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
    if (!data?.progress?.timeSpentSec) return
    startedAt.current = Date.now() - Math.min(4000, Number(data.progress.timeSpentSec)) * 1000
  }, [data])

  /**
   * Reading is measured, not clicked (gap fix: the roadmap said "+10 for reading a
   * session" without defining a read). A section counts when it is the majority-
   * visible one for >1.2s; the API then decides whether that is enough of the level.
   */
  const seen = useRef(new Set<string>())
  const visibleTimer = useRef<number | null>(null)
  useEffect(() => {
    if (!data) return
    const io = new IntersectionObserver(entries => {
      for (const e of entries) {
        if (e.isIntersecting && e.intersectionRatio > 0.5) {
          const letter = (e.target as HTMLElement).dataset.sec || ''
          if (!letter) continue
          setActive(letter)
          if (visibleTimer.current) window.clearTimeout(visibleTimer.current)
          visibleTimer.current = window.setTimeout(() => {
            if (seen.current.has(letter)) return
            seen.current.add(letter)
            markRead(letter, 45)
          }, 1200)
        }
      }
    }, { threshold: [0.5] })
    for (const el of document.querySelectorAll('[data-sec]')) io.observe(el)
    return () => io.disconnect()
  }, [data, markRead])

  const lesson = data?.session ?? seed?.session
  const sections = useMemo(() => (lesson?.sections ?? []).filter(s => s.blocks?.length), [lesson])
  const readCount = Math.max(seen.current.size, data?.progress?.sectionsSeen?.length ?? 0)
  const courseMeta = data?.course ?? seed?.course

  if (loading && !seed) return <LessonSkeleton />
  if (error && !data) {
    if (error.status === 402) return <LockedCourse slug={slug} n={n} message={error.message} />
    if (error.status === 401) return <SignInPrompt slug={slug} n={n} />
    return (
      <Card className="mx-auto max-w-reading text-center">
        <h1 className="text-lg font-semibold">That level could not load</h1>
        <p className="mt-1 text-sm text-ink/70 dark:text-light/70">{error.message}</p>
        <div className="mt-3 flex justify-center gap-2">
          <Button size="sm" onClick={reload}>Try again</Button>
          <Link href={`/courses/${slug}`} className="inline-flex min-h-[36px] items-center rounded-pill px-3 text-sm font-medium underline">Back to the course</Link>
        </div>
      </Card>
    )
  }
  if (!lesson) return null

  async function submitQuiz(answers: Record<string, string>, elapsedSec: number): Promise<QuizResult> {
    const r = await request<{ result: QuizResult; award: any; best: number }>('/api/learn/quiz', {
      method: 'POST', body: { course: slug, session: n, answers, elapsedSec },
    })
    setQuiz(r.result)
    announceAward(r.award, r.result.perfect ? 'perfect score' : 'knowledge check')
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
    const r = await request<{ correct: boolean | null; feedback: string; resolution?: string; correctId?: string | null; example?: string | null; award: any }>('/api/learn/scenario', {
      method: 'POST', body: { course: slug, session: n, scenarioId: id, choiceId },
    })
    setScenarios(prev => ({ ...prev, [id]: { chosen: choiceId, correct: r.correct, feedback: r.feedback, resolution: r.resolution, correctId: r.correctId } }))
    announceAward(r.award, 'case study')
  }

  async function sendFlashcards(grades: { id: string; grade: number }[]) {
    // The endpoint is keyed by card id (`cardId`) so a review can be stored without
    // re-sending the course/level for each card.
    await mutate('/api/learn/flashcards', { course: slug, session: n, reviews: grades.map(g => ({ cardId: g.id, grade: g.grade })) })
    setFlashDone(true)
    setBanner({ tone: 'ok', text: `${grades.length} cards logged — the ones you marked “again” will be due tomorrow.` })
  }

  function toggleChecklist(next: Record<string, boolean>) {
    setChecklist(next)
    const items = (lesson?.checklist ?? []).map((label, i) => ({ label, done: !!next[String(i)] }))
    void mutate('/api/learn/checklist', { course: slug, session: n, items })
  }

  async function finish() {
    setCompleting(true)
    try {
      const r = await request<{ award: any; alreadyCompleted?: boolean }>('/api/learn/complete', {
        method: 'POST', body: { course: slug, session: n, timeSpentSec: Math.round((Date.now() - startedAt.current) / 1000) },
      })
      setFinished({ award: r.award, already: r.alreadyCompleted })
      announceAward(r.award, 'level complete')
      void refresh()
    } catch (e: any) {
      setBanner({ tone: 'bad', text: e?.message || 'Could not record that yet.' })
    } finally { setCompleting(false) }
  }

  const minutes = lesson.durationMinutes || 105
  const readPct = sections.length ? Math.min(100, Math.round((readCount / Math.max(1, sections.length)) * 100)) : 0
  const nextNumber = Math.min((lesson.of || 12), n + 1)

  return (
    <div className="mx-auto max-w-course gap-6 lg:grid lg:grid-cols-[minmax(0,1fr)_15rem]">
      <div className="min-w-0">
        <header className="mb-4">
          <nav aria-label="Breadcrumb" className="text-xs text-ink/60 dark:text-light/60">
            <Link href={`/courses/${slug}`} className="underline-offset-2 hover:underline">{data?.course?.displayTitle || data?.course?.name || slug}</Link>
            {' · '}<Link href={`/courses/${slug}/map`} className="underline-offset-2 hover:underline">map</Link>
          </nav>
          <div className="mt-1.5 flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl font-bold leading-snug sm:text-2xl">
                <span className="text-ink/45 dark:text-light/45">{lesson.number}.</span> {lesson.title}
              </h1>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink/60 dark:text-light/60">
                {lesson.module && <span>{lesson.module}</span>}
                <span>{minutes} min</span>
                <span>{lesson.estWords.toLocaleString()} words</span>
                {lesson.isCapstone && <Chip tone="gold">Boss level</Chip>}
                {offline && <Chip tone="warn">offline copy</Chip>}
                {lesson.isFree && !user && <Chip tone="success">free preview</Chip>}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {user ? (
                <>
                  <RankChip rank={(user as any).rank?.current ?? { key: 'rookie', name: 'Rookie' }} xp={user.xp} next={(user as any).rank?.next} />
                  <StreakFlame count={user.streak?.count ?? 0} atRisk={user.streak?.atRisk} freezes={user.streak?.freezes} size="sm" />
                </>
              ) : <Chip tone="muted">reading free level 1</Chip>}
            </div>
          </div>
          <ProgressBar className="mt-3" value={readPct} label={`${readCount} of ${sections.length} sections in view`} />
          {lesson.connectionToPrevious && (
            <p className="mt-2 rounded-card bg-sky/8 p-2.5 text-sm text-ink/80 dark:text-light/80"><span className="font-semibold">Last time:</span> {lesson.connectionToPrevious}</p>
          )}
        </header>

        {banner && (
          <div role="status" className={cx('mb-3 rounded-card p-3 text-sm', banner.tone === 'ok' ? 'bg-success/10 text-success' : 'bg-error/10 text-error')}>
            <div className="flex items-start justify-between gap-3">
              <span>{banner.text}</span>
              <button type="button" onClick={() => setBanner(null)} className="text-xs underline opacity-70">dismiss</button>
            </div>
          </div>
        )}

        {lesson.outcomes?.length > 0 && (
          <Card className="mb-4 border-gold/40 bg-paper dark:bg-surface-dark-muted">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[#8a5b0d] dark:text-gold">By the end of this level you can</h2>
            <ul className="mt-1.5 space-y-1 text-[15px]">
              {lesson.outcomes.map((o, i) => <li key={i} className="flex gap-2"><span aria-hidden className="text-success">✓</span><span>{o}</span></li>)}
            </ul>
            {lesson.prerequisiteKnowledge && <p className="mt-2 text-xs text-ink/65 dark:text-light/65">Needs: {lesson.prerequisiteKnowledge}</p>}
          </Card>
        )}

        <div className="space-y-5">
          {sections.map(s => (
            <section key={s.letter} id={`sec-${s.letter}`} data-sec={s.letter} className="scroll-mt-24">
              <h2 className="flex items-baseline gap-2 text-lg font-semibold text-navy dark:text-light">
                <span className="font-mono text-xs text-ink/40 dark:text-light/40">{s.letter}</span>{s.title}
                {s.wordCount > 0 && <span className="text-xs font-normal text-ink/40 dark:text-light/40">{s.wordCount} words</span>}
              </h2>
              <BlockList blocks={s.blocks} className="mt-1" />
              {(s.kind === 'lecture' || s.kind === 'demo') && lesson.diagram && <DiagramView diagram={lesson.diagram} dataSaver={!!user?.prefs?.dataSaver} alt={`${lesson.title} — diagram from the manual`} />}
              {s.kind === 'knowledge_check' && lesson.quiz?.questions?.length > 0 && (
                <div className="mt-3">
                  <QuizRunner
                    questions={lesson.quiz.questions} passPercent={lesson.quiz.passPercent} title={lesson.quiz.title || 'Knowledge check'}
                    result={quiz} onSubmit={submitQuiz} onRetry={() => setQuiz(null)}
                  />
                </div>
              )}
              {s.kind === 'exercise' && lesson.exercises?.length > 0 && (
                <div className="mt-3 space-y-4">
                  {lesson.exercises.map((ex: any) => (
                    <ExerciseBox
                      key={ex.id} exercise={ex}
                      modelAnswer={exerciseAnswers[ex.id]?.modelAnswer}
                      submittedText={exerciseAnswers[ex.id]?.text}
                      onSubmit={(text, self) => submitExercise(ex.id, text, self)}
                    />
                  ))}
                  {(lesson.codeBlanks?.length ?? 0) > 0 && (
                    <CodeBlanks
                      items={lesson.codeBlanks ?? []}
                      check={async (id, values) => {
                        try {
                          const r = await request<any>('/api/learn/blank', { method: 'POST', body: { course: slug, session: n, id, values } })
                          return { results: r.results, correctCount: r.correctCount, total: r.total, hints: r.hints, explain: r.explain }
                        } catch (e: any) {
                          setBanner({ tone: 'bad', text: e?.message || 'Could not check those gaps.' })
                          return null
                        }
                      }}
                    />
                  )}
                </div>
              )}
              {s.kind === 'case_study' && lesson.scenarios?.length > 0 && (
                <div className="mt-3 space-y-4">
                  {lesson.scenarios.map((sc: any) => (
                    <ScenarioRunner
                      key={sc.id} scenario={sc}
                      chosen={scenarios[sc.id]?.chosen}
                      correctId={scenarios[sc.id]?.correctId ?? null}
                      resolution={scenarios[sc.id]?.resolution}
                      onPick={choice => chooseScenario(sc.id, choice)}
                    />
                  ))}
                </div>
              )}
              {s.kind === 'troubleshooting' && lesson.troubleshooting?.length > 0 && (
                <div className="mt-3"><Troubleshooting items={lesson.troubleshooting} /></div>
              )}
              {s.kind === 'reflection' && lesson.flashcards?.length > 0 && (
                <div className="mt-3"><FlashcardDeck cards={lesson.flashcards} onGraded={sendFlashcards} /></div>
              )}
            </section>
          ))}
        </div>

        <footer className="mt-6 space-y-4">
          {lesson.checklist?.length > 0 && (
            <ChecklistPanel
              items={lesson.checklist}
              done={checklist}
              onChange={toggleChecklist}
              initial={data?.progress?.checklist}
            />
          )}
          {finished ? (
            <Card className="border-success/50 bg-success/6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-lg font-semibold text-navy dark:text-light">
                    Level {lesson.number} cleared {finished.award?.xp ? `· +${finished.award.xp} XP` : ''}
                  </h2>
                  <p className="mt-0.5 text-sm text-ink/75 dark:text-light/75">
                    {finished.already ? 'You had already finished this one — no double credit.' : 'Streak kept. Your best quiz score is what counts.'}
                    {flashDone ? ' Flashcard reviews are scheduled.' : ''}
                  </p>
                  {quiz && <p className="mt-1 text-sm"><Stars n={(quiz as any).scorePct >= 90 ? 3 : (quiz as any).scorePct >= 70 ? 2 : (quiz as any).scorePct >= (lesson.quiz.passPercent || 60) ? 1 : 0} size={14} /> <span className="tabular-nums">{quiz.scorePct}%</span></p>}
                </div>
                <div className="flex flex-wrap gap-2">
                  {n < nextNumber && <Link href={`/learn/${slug}/${nextNumber}`} className="inline-flex min-h-[44px] items-center rounded-pill bg-navy px-4 text-sm font-medium text-white hover:bg-blue">Next level → {nextNumber}</Link>}
                  <Link href={`/courses/${slug}/map`} className="inline-flex min-h-[44px] items-center rounded-pill border border-surface-line px-4 text-sm font-medium hover:bg-surface-muted dark:border-surface-dark-line">Back to the map</Link>
                  <Link href="/dashboard" className="inline-flex min-h-[44px] items-center rounded-pill border border-surface-line px-4 text-sm font-medium hover:bg-surface-muted dark:border-surface-dark-line">Dashboard</Link>
                </div>
              </div>
              <AdSlot placement="level-complete-side" />
            </Card>
          ) : (
            <Card className="flex flex-wrap items-center justify-between gap-3">
              <div className="min-w-[14rem] flex-1">
                <h2 className="text-base font-semibold">Finished this level?</h2>
                <p className="mt-0.5 text-sm text-ink/70 dark:text-light/70">
                  {seconds < XP.minCompletionSeconds
                    ? `Give it a few minutes first — the manual says ${minutes}, and a 30-second “finish” teaches nothing.`
                    : 'Completing it banks the level credit, keeps your streak and unlocks the next one.'}
                </p>
              </div>
              <Button variant="gold" onClick={finish} loading={completing} disabled={seconds < XP.minCompletionSeconds}>
                Mark level {lesson.number} complete
              </Button>
            </Card>
          )}
          {!user && (
            <Card className="bg-deep text-light">
              <h2 className="text-base font-semibold">Your progress here is not saved yet</h2>
              <p className="mt-1 text-sm text-light/80">Create the free account to keep XP, streak and this level’s place — and to unlock the other {Math.max(0, (data?.course?.sessionsCount ?? 1) - 1)} levels by transfer ({formatNgn(data?.course?.feeNgn ?? 0)}).</p>
              <div className="mt-3 flex gap-2">
                <Link href="/auth/register" className="inline-flex min-h-[40px] items-center rounded-pill bg-gold px-4 text-sm font-semibold text-deep">Create account</Link>
                <Link href="/auth/login" className="inline-flex min-h-[40px] items-center rounded-pill border border-white/25 px-4 text-sm">Sign in</Link>
              </div>
            </Card>
          )}
        </footer>
      </div>

      <aside className="hidden lg:block">
        <div className="sticky top-20 space-y-3">
          <SectionRail sections={sections.map(s => ({ letter: s.letter, title: s.title, kind: s.kind }))} active={active} onPick={letter => document.getElementById(`sec-${letter}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })} />
          <LevelTools slug={slug} n={n} sections={sections} />
        </div>
      </aside>
    </div>
  )
}

/** Notes + bookmark + a copy-the-instruction block helper (4.10). */
function LevelTools({ slug, n, sections }: { slug: string; n: number; sections: Section[] }) {
  const { user } = useSession()
  const [note, setNote] = useState('')
  const [saved, setSaved] = useState<{ id?: string; text: string } | null>(null)
  const [busy, setBusy] = useState(false)
  const [marked, setMarked] = useState(false)
  if (!user) return null
  return (
    <Card pad className="space-y-2">
      <h2 className="text-sm font-semibold text-navy dark:text-light">Your notes for this level</h2>
      <textarea
        value={saved ? saved.text : note} rows={5} onChange={e => setNote(e.target.value)}
        placeholder="What will you remember in week 3? Write it here — notes are searchable from /search."
        className="w-full rounded-card border border-surface-line bg-surface p-2.5 text-sm dark:border-surface-dark-line dark:bg-surface-dark"
      />
      <div className="flex items-center gap-2">
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
          className={cx('inline-flex min-h-[36px] items-center gap-1 rounded-pill border px-3 text-sm', marked ? 'border-gold bg-gold/15 font-medium' : 'border-surface-line hover:bg-surface-muted dark:border-surface-dark-line')}
        >
          {marked ? '★ Bookmarked' : '☆ Bookmark'}
        </button>
      </div>
      {saved && <p className="text-xs text-success">Saved{saved.id ? ` (${saved.id.slice(0, 6)})` : ''}.</p>}
    </Card>
  )
}

function ChecklistPanel({ items, done, onChange, initial }: { items: string[]; done: Record<string, boolean>; onChange: (n: Record<string, boolean>) => void; initial?: { label: string; done: boolean }[] }) {
  const seeded = useRef(false)
  useEffect(() => {
    if (seeded.current || !initial?.length) return
    seeded.current = true
    const next: Record<string, boolean> = {}
    initial.forEach((it, i) => { next[String(i)] = !!it.done })
    onChange(next)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initial])
  return <Checklist items={items} done={done} onChange={onChange} title="Pre-flight check (6.7)" />
}

function LessonSkeleton() {
  return (
    <div className="mx-auto max-w-reading space-y-3" aria-busy="true" aria-label="Loading level">
      {[8, 4, 10, 10, 6, 10].map((h, i) => <div key={i} className="animate-shimmer rounded bg-[linear-gradient(90deg,#eef2f7_25%,#e2e8f0_37%,#eef2f7_63%)] dark:bg-[linear-gradient(90deg,#16264a_25%,#1d3057_37%,#16264a_63%)]" style={{ height: h * 4, backgroundSize: '400% 100%' }} />)}
    </div>
  )
}

function LockedCourse({ slug, n, message }: { slug: string; n: number; message: string }) {
  return (
    <div className="mx-auto max-w-reading space-y-3">
      <LockNote price={undefined} onUnlock={() => { location.href = `/checkout/${slug}` }} />
      <p className="text-center text-sm text-ink/65 dark:text-light/65">{message}</p>
    </div>
  )
}

function SignInPrompt({ slug, n }: { slug: string; n: number }) {
  return (
    <Card className="mx-auto max-w-reading text-center">
      <h1 className="text-lg font-semibold">Sign in to keep this level’s progress</h1>
      <p className="mt-1 text-sm text-ink/70 dark:text-light/70">Level 1 of every course is free — you only need an account so the XP, the streak and the next level are remembered.</p>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <Link href={`/auth/register?next=/learn/${slug}/${n}`} className="inline-flex min-h-[44px] items-center rounded-pill bg-navy px-4 text-sm font-medium text-white">Create account</Link>
        <Link href={`/auth/login?next=/learn/${slug}/${n}`} className="inline-flex min-h-[44px] items-center rounded-pill border border-surface-line px-4 text-sm font-medium dark:border-surface-dark-line">Sign in</Link>
      </div>
    </Card>
  )
}
