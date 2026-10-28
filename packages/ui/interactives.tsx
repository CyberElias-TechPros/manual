'use client'
/** Every module in this kit is client-rendered: a UI kit exists to hold handlers, and a server component cannot receive one. Next still server-renders the markup. */
/** * Phase 6 interactives. Each one is deliberately small: a learner on a 3G link
 * downloads the JSON that describes the activity, and everything below is
 * plain React state — no editor, no drag-drop library, no motion library.
 *
 * 6.4's "drag-and-drop sequencing" is implemented as tap-to-order instead: it
 * works with a thumb, with a screen reader, and on a 5-year-old Android WebView.
 */
import { useMemo, useState } from 'react'
import type { Exercise, Flashcard, Scenario } from '@cea/content/schema'
import { Button, Card, Chip, ProgressBar, cx } from './primitives'

// ---------------------------------------------------------------------------
// 6.1 / 6.9 — guided + independent practice, with the rubric in view
// ---------------------------------------------------------------------------

export function ExerciseBox({ exercise, modelAnswer, submittedText, onSubmit, busy }:
  {
    exercise: Exercise
    /** revealed only after a submission exists (the key never ships with the lesson) */
    modelAnswer?: string
    submittedText?: string
    onSubmit?: (text: string, selfScore: number) => Promise<void> | void
    busy?: boolean
  }) {
  const [text, setText] = useState(submittedText ?? '')
  const [self, setSelf] = useState(0)
  const dirty = text.trim() !== (submittedText ?? '').trim()
  const hasRubric = exercise.rubric?.length > 0

  return (
    <Card as="section" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-navy dark:text-light">{exercise.title}</h3>
        <Chip tone={exercise.kind === 'assignment' ? 'gold' : 'navy'}>{exercise.kind === 'assignment' ? 'Assignment' : exercise.kind === 'guided' ? 'Guided practice' : 'Your turn'}</Chip>
      </div>
      <p className="whitespace-pre-line text-[15px]">{exercise.prompt}</p>

      {exercise.steps?.length > 0 && (
        <ol className="list-decimal space-y-1 pl-5 text-sm">
          {exercise.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {exercise.successCriteria?.length > 0 && (
          <div className="rounded-card border border-success/35 bg-success/6 p-3">
            <div className="text-xs font-semibold uppercase tracking-wide text-success">You have it when</div>
            <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm">{exercise.successCriteria.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
        )}
        {exercise.deliverables?.length > 0 && (
          <div className="rounded-card border border-surface-line bg-surface-muted p-3 dark:border-surface-dark-line dark:bg-surface-dark-muted">
            <div className="text-xs font-semibold uppercase tracking-wide text-ink/70 dark:text-light/70">Submit</div>
            <ul className="mt-1.5 list-disc space-y-1 pl-4 text-sm">{exercise.deliverables.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
        )}
      </div>

      {hasRubric && (
        <details className="rounded-card border border-surface-line p-3 dark:border-surface-dark-line" open={!!submittedText}>
          <summary className="cursor-pointer text-sm font-semibold">Marking rubric ({exercise.rubric.reduce((n, r) => n + (r.marks || 0), 0) || '—'} marks)</summary>
          <table className="mt-2 w-full text-sm">
            <tbody>
              {exercise.rubric.map((r, i) => (
                <tr key={i} className="border-t border-surface-line align-top dark:border-surface-dark-line">
                  <td className="w-16 py-1.5 pr-2 font-mono text-xs text-ink/60 dark:text-light/60">{r.marks != null ? `${r.marks} mk` : ''}</td>
                  <td className="py-1.5 pr-2 font-medium">{r.criterion}</td>
                  <td className="py-1.5 text-ink/75 dark:text-light/75">{r.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {exercise.markingGuidance?.length > 0 && (
            <ul className="mt-2 list-disc space-y-1 pl-4 text-xs text-ink/70 dark:text-light/70">{exercise.markingGuidance.map((g, i) => <li key={i}>{g}</li>)}</ul>
          )}
        </details>
      )}

      {onSubmit && (
        <div className="space-y-2">
          <label className="block text-sm font-medium" htmlFor={`ex-${exercise.id}`}>What did you produce? Write it out or describe the steps.</label>
          <textarea
            id={`ex-${exercise.id}`} value={text} rows={6} onChange={e => setText(e.target.value)}
            className="w-full rounded-card border border-surface-line bg-surface p-3 text-[15px] dark:border-surface-dark-line dark:bg-surface-dark"
            placeholder="e.g. I made a 12-column grid in Figma, set the gutter to 16px, and checked it against the flyer brief…"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm" loading={busy} disabled={!text.trim() || !dirty} onClick={() => onSubmit(text, self)}>
              {submittedText ? 'Update my attempt' : 'Submit for the model answer'}
            </Button>
            <label className="flex items-center gap-2 text-xs text-ink/70 dark:text-light/70">
              How well do you think you did?
              <input type="range" min={0} max={10} value={self} onChange={e => setSelf(Number(e.target.value))} className="accent-[#d69e2e]" />
              <span className="w-8 font-mono tabular-nums">{self}/10</span>
            </label>
          </div>
          {!dirty && submittedText && <p className="text-xs text-ink/55 dark:text-light/55">Already saved — edit the text to submit again.</p>}
        </div>
      )}

      {modelAnswer !== undefined && (
        <div className="rounded-card border border-gold/45 bg-gold/8 p-3">
          <div className="text-xs font-semibold uppercase tracking-wide text-[#8a5b0d] dark:text-gold">Model answer</div>
          <p className="mt-1 whitespace-pre-line text-sm">{modelAnswer || 'The manual gives no model answer for this task — take it to your instructor.'}</p>
        </div>
      )}
      {exercise.code && (
        <pre className="overflow-x-auto rounded-card bg-deep p-3 text-[13px] text-[#eaf2fb]" tabIndex={0}><code className="font-mono">{exercise.code}</code></pre>
      )}
    </Card>
  )
}

// ---------------------------------------------------------------------------
// 6.5 — case study with branching feedback
// ---------------------------------------------------------------------------

export function ScenarioRunner({ scenario, onPick, chosen, correctId, resolution }:
  { scenario: Scenario; chosen?: string; correctId?: string | null; resolution?: string; onPick?: (id: string) => void }) {
  const [pick, setPick] = useState<string | undefined>(chosen)
  const active = pick ?? chosen
  const verdict = active && correctId ? (active === correctId ? 'right' : 'wrong') : active ? 'seen' : null
  return (
    <Card as="section" className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-navy dark:text-light">{scenario.title}</h3>
        <Chip tone="navy">Case study</Chip>
      </div>
      <p className="text-[15px]">{scenario.situation}</p>
      {scenario.facts?.length > 0 && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-ink/80 dark:text-light/80">
          {scenario.facts.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      )}
      <p className="font-medium">{scenario.decision}</p>
      <div role="radiogroup" aria-label="Choose an approach" className="space-y-1.5">
        {scenario.options.map(o => {
          const on = active === o.id
          const isRight = correctId ? o.id === correctId : undefined
          return (
            <button key={o.id} type="button" role="radio" aria-checked={on} disabled={!onPick || !!active}
              onClick={() => { setPick(o.id); onPick?.(o.id) }}
              className={cx('w-full rounded-card border px-3 py-2.5 text-left text-sm transition',
                on && isRight === true && 'border-success bg-success/8',
                on && isRight === false && 'border-error/70 bg-error/6',
                on && isRight === undefined && 'border-navy bg-navy/6 dark:border-sky',
                !on && 'border-surface-line hover:bg-surface-muted dark:border-surface-dark-line dark:hover:bg-surface-dark-muted',
                !on && active && 'opacity-70')}>
              {o.text}
            </button>
          )
        })}
      </div>
      {active && scenario.feedback?.[active] && (
        <div className={cx('rounded-card border-l-4 p-3 text-sm', verdict === 'right' ? 'border-success bg-success/8' : verdict === 'wrong' ? 'border-error bg-error/6' : 'border-sky/60 bg-sky/8')}>
          <div className="font-semibold">{verdict === 'right' ? 'That holds up.' : verdict === 'wrong' ? 'This would cost you.' : 'Instructor will discuss this one.'}</div>
          <p className="mt-1">{scenario.feedback[active]}</p>
        </div>
      )}
      {active && (resolution ?? scenario.resolution) && (
        <details open={verdict === 'wrong'} className="rounded-card border border-surface-line p-3 dark:border-surface-dark-line">
          <summary className="cursor-pointer text-sm font-semibold">How the academy would resolve it</summary>
          <p className="mt-1.5 whitespace-pre-line text-sm">{resolution ?? scenario.resolution}</p>
          {scenario.example && <pre className="mt-2 overflow-x-auto rounded bg-surface-muted p-2 text-[13px] dark:bg-surface-dark-muted"><code className="font-mono">{scenario.example}</code></pre>}
        </details>
      )}
    </Card>
  )
}

// ---------------------------------------------------------------------------
// 6.6 — flashcards with self-grade spacing (the "due" count feeds /learn/due)
// ---------------------------------------------------------------------------

export function FlashcardDeck({ cards, onGraded }: { cards: Flashcard[]; onGraded?: (grades: { id: string; grade: number }[]) => void }) {
  const [queue, setQueue] = useState(() => cards.map((_, n) => n))
  const [flipped, setFlipped] = useState(false)
  const [grades, setGrades] = useState<Record<string, number>>({})
  const head = queue[0]
  const card = head == null ? undefined : cards[head]
  const doneCount = Object.keys(grades).length

  return (
    <Card as="section" className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-navy dark:text-light">Flashcards</h3>
        <Chip tone="muted">{doneCount}/{cards.length} seen</Chip>
      </div>
      <ProgressBar value={cards.length ? (doneCount / cards.length) * 100 : 0} />
      {card ? (
        <>
          <button
            type="button" onClick={() => setFlipped(f => !f)}
            aria-label={flipped ? 'Show prompt' : 'Show answer'}
            className="min-h-[9rem] w-full rounded-card border border-surface-line bg-paper p-4 text-left transition hover:border-gold dark:border-surface-dark-line dark:bg-surface-dark-muted"
          >
            <span className="block text-xs uppercase tracking-wide text-ink/55 dark:text-light/55">{flipped ? 'Answer' : 'Prompt'} · tap to flip</span>
            <span className={cx('mt-2 block whitespace-pre-line', flipped ? 'text-[15px]' : 'text-lg font-medium')}>{flipped ? card.back : card.front}</span>
          </button>
          {flipped ? (
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => { mark(card.id, 0); setQueue(q => [...q.slice(1), q[0]]) }}>Again</Button>
              <Button size="sm" variant="outline" onClick={() => { mark(card.id, 1); setQueue(q => q.slice(1)) }}>Good</Button>
              <Button size="sm" variant="gold" onClick={() => { mark(card.id, 2); setQueue(q => q.slice(1)) }}>Easy</Button>
            </div>
          ) : <Button size="sm" onClick={() => setFlipped(true)}>Flip card</Button>}
        </>
      ) : (
        <div className="rounded-card bg-success/8 p-4 text-sm">
          Deck finished — {Object.values(grades).filter(g => g > 0).length} of {cards.length} felt solid. Come back tomorrow and the “again” ones will be first.
        </div>
      )}
      <p className="text-xs text-ink/60 dark:text-light/60">6.6 — grades are sent to the API, which decides what is “due” next (GET /api/learn/due).</p>
      <span className="sr-only" aria-live="polite">{card ? `Card ${doneCount + 1} of ${cards.length}` : 'Deck complete'}</span>
    </Card>
  )

  function mark(id: string, g: number) {
    const next = { ...grades, [id]: Math.max(grades[id] ?? 0, g) }
    setGrades(next)
    setFlipped(false)
    if (Object.keys(next).length === cards.length) onGraded?.(cards.map(c => ({ id: c.id, grade: next[c.id] ?? 0 })))
  }
}

// ---------------------------------------------------------------------------
// 6.7 — pre-flight checklist (gates the "complete" button for capstones)
// ---------------------------------------------------------------------------

export function Checklist({ items, done, onChange, title = 'Before you submit' }:
  { items: string[]; done: Record<string, boolean>; onChange?: (next: Record<string, boolean>) => void; title?: string }) {
  if (!items?.length) return null
  const onCount = items.filter(k => done[k]).length
  return (
    <Card as="section" className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-base font-semibold text-navy dark:text-light">{title}</h3>
        <Chip tone={onCount === items.length ? 'success' : 'muted'}>{onCount}/{items.length}</Chip>
      </div>
      <ul className="space-y-1.5">
        {items.map((label, i) => {
          const key = String(i)
          const on = !!done[key]
          return (
            <li key={key}>
              <label className={cx('flex cursor-pointer items-start gap-2.5 rounded-card border px-3 py-2 text-sm transition',
                on ? 'border-success/50 bg-success/6' : 'border-surface-line hover:bg-surface-muted dark:border-surface-dark-line')}>
                <input type="checkbox" checked={on} onChange={() => onChange?.({ ...done, [key]: !on })} className="mt-0.5 h-4 w-4 accent-[#38a169]" />
                <span className={cx(on && 'line-through decoration-success/60')}>{label}</span>
              </label>
            </li>
          )
        })}
      </ul>
    </Card>
  )
}

// ---------------------------------------------------------------------------
// 6.3 — code blanks generated from the session's own snippet
// ---------------------------------------------------------------------------

export type CodeBlankItem = { id: string; language: string; template: string; blanks: { answer: string; accepts: string[] }[]; explain: string }

/**
 * Gap-fill over the session's own snippet. The learner's text is posted to the API,
 * which compares against `accepts` (see packages/content → buildCodeBlanks) and
 * returns per-gap truth — the client never holds the answers.
 */
/** A gap result as returned by POST /api/learn/blank. */
export interface BlankResult { results: boolean[]; correctCount: number; total: number; explain?: string; hints?: string[] }

/**
 * The template marks gaps with {{0}}, {{1}}… (set by buildCodeBlanks). Answers are
 * never in the learner payload: the component sends what was typed and the API
 * answers true/false per gap, with a two-character nudge for the wrong ones.
 */
export function CodeBlanks({ items, check, onResult }:
  { items: CodeBlankItem[]; check?: (id: string, values: string[]) => Promise<BlankResult | null>; onResult?: (id: string, r: BlankResult) => void }) {
  const [open, setOpen] = useState<string | null>(items[0]?.id ?? null)
  const [draft, setDraft] = useState<Record<string, string[]>>({})
  const [result, setResult] = useState<Record<string, BlankResult>>({})
  const [busy, setBusy] = useState(false)
  if (!items?.length) return null
  return (
    <Card as="section" className="space-y-2">
      <h3 className="text-lg font-semibold text-navy dark:text-light">Finish the code</h3>
      <p className="text-sm text-ink/70 dark:text-light/70">Fill each gap, then check it. The snippet is the same one from the lecture, so nothing here is a trick question.</p>
      {items.map(item => {
        const pieces = item.template.split(/\{\{\d+\}\}/)
        const state = result[item.id]
        const stateFlags = state?.results
        const values = draft[item.id] ?? []
        return (
          <div key={item.id} className="rounded-card border border-surface-line dark:border-surface-dark-line">
            <button type="button" className="flex w-full items-center justify-between gap-2 px-3 py-2 text-left text-sm font-medium" onClick={() => setOpen(o => (o === item.id ? null : item.id))} aria-expanded={open === item.id}>
              <span className="min-w-0 truncate">{item.language ? `${item.language} · ` : ''}{item.blanks.length} gap{item.blanks.length > 1 ? 's' : ''}</span>
              <Chip tone={state && stateFlags?.every(Boolean) ? 'success' : state ? 'warn' : 'muted'}>{state ? `${state.correctCount}/${state.total} right` : 'open'}</Chip>
            </button>
            {open === item.id && (
              <div className="space-y-2 border-t border-surface-line p-3 dark:border-surface-dark-line">
                <pre className="overflow-x-auto rounded bg-deep p-3 font-mono text-[12.5px] leading-relaxed text-[#eaf2fb]" tabIndex={0}>
                  {pieces.map((piece, i) => (
                    <span key={i}>
                      {piece}
                      {i < pieces.length - 1 && (
                        <input
                          aria-label={`Gap ${i + 1} of ${item.blanks.length}${stateFlags?.[i] === false ? ', not correct yet' : stateFlags?.[i] ? ', correct' : ''}`}
                          inputMode="text" autoCapitalize="off" autoCorrect="off" spellCheck={false}
                          value={values[i] ?? ''}
                          onChange={e => setDraft(d => { const arr = [...(d[item.id] ?? [])]; arr[i] = e.target.value; return { ...d, [item.id]: arr } })}
                          className={cx('mx-0.5 inline-block w-32 rounded border-b-2 bg-white/10 px-1 font-mono text-[12.5px] outline-none',
                            stateFlags?.[i] === true ? 'border-success' : stateFlags?.[i] === false ? 'border-error' : 'border-gold/70')}
                        />
                      )}
                    </span>
                  ))}
                </pre>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="sm" loading={busy} disabled={!check || !values.some(v => String(v).trim())}
                    onClick={async () => {
                      if (!check) return
                      setBusy(true)
                      try {
                        const r = await check(item.id, values)
                        if (r) { setResult(prev => ({ ...prev, [item.id]: r })); onResult?.(item.id, r) }
                      } finally { setBusy(false) }
                    }}>
                    Check gaps
                  </Button>
                  {state && <span className="text-xs text-ink/70 dark:text-light/70">{state.correctCount} of {state.total} match{stateFlags?.some(x => !x) ? ' — the red gaps need another look.' : '.'}</span>}
                </div>
                {state && (
                  <ul className="space-y-0.5 text-xs text-ink/70 dark:text-light/75" aria-live="polite">
                    {stateFlags?.map((ok, i) => (!ok && state.hints?.[i] ? <li key={i}>Gap {i + 1}: starts with “{state.hints[i]}…”</li> : null))}
                  </ul>
                )}
                <p className="text-xs text-ink/70 dark:text-light/75">{item.explain}</p>
              </div>
            )}
          </div>
        )
      })}
    </Card>
  )
}

export function Troubleshooting({ items }: { items: { mistake: string; fix: string }[] }) {
  if (!items?.length) return null
  return (
    <Card as="section" className="space-y-2">
      <h3 className="text-lg font-semibold text-navy dark:text-light">Where people slip</h3>
      <ul className="space-y-2">
        {items.map((t, i) => (
          <li key={i} className="rounded-card border-l-4 border-error/50 bg-error/5 p-3">
            <div className="text-sm font-semibold">{t.mistake}</div>
            <div className="mt-1 text-sm text-ink/80 dark:text-light/80">{t.fix}</div>
          </li>
        ))}
      </ul>
    </Card>
  )
}
