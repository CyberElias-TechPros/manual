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
import { Button, Card, Label, Pill, ProgressBar, cx } from './primitives'

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
    <Card as="section" variant="ring" className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-medium text-ink dark:text-light">{exercise.title}</h3>
        <Label>{exercise.kind === 'assignment' ? 'Assignment' : exercise.kind === 'guided' ? 'Guided practice' : 'Your turn'}</Label>
      </div>
      <p className="whitespace-pre-line text-base leading-relaxed text-ink-700 dark:text-light/85">{exercise.prompt}</p>

      {exercise.steps?.length > 0 && (
        <ol className="list-decimal space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed marker:text-ink-400">
          {exercise.steps.map((s, i) => <li key={i}>{s}</li>)}
        </ol>
      )}

      <div className="grid gap-3 sm:grid-cols-2">
        {exercise.successCriteria?.length > 0 && (
          <div className="border-l-2 border-success pl-4">
            <div className="text-[0.8125rem] font-medium text-ink-600 dark:text-light/65">You have it when</div>
            <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[0.9375rem] leading-relaxed text-ink-700 marker:text-ink-300 dark:text-light/85">{exercise.successCriteria.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
        )}
        {exercise.deliverables?.length > 0 && (
          <div className="border-l-2 border-ink-200 pl-4 dark:border-surface-dark-line-strong">
            <div className="text-[0.8125rem] font-medium text-ink-600 dark:text-light/65">What to submit</div>
            <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[0.9375rem] leading-relaxed text-ink-700 marker:text-ink-300 dark:text-light/85">{exercise.deliverables.map((c, i) => <li key={i}>{c}</li>)}</ul>
          </div>
        )}
      </div>

      {hasRubric && (
        <details open={!!submittedText}>
          <summary className="min-h-[36px] cursor-pointer text-[0.9375rem] font-medium text-ink underline-offset-4 hover:underline dark:text-light">Marking rubric ({exercise.rubric.reduce((n, r) => n + (r.marks || 0), 0) || '—'} marks)</summary>
          <table className="mt-3 w-full text-[0.875rem]">
            <tbody>
              {exercise.rubric.map((r, i) => (
                <tr key={i} className="border-t border-surface-line align-top dark:border-surface-dark-line">
                  <td className="w-14 py-2 pr-2 text-[0.8125rem] tabular-nums text-ink-500 dark:text-light/55">{r.marks != null ? `${r.marks} mk` : ''}</td>
                  <td className="py-2 pr-3 font-medium text-ink dark:text-light">{r.criterion}</td>
                  <td className="py-2 text-ink-500 dark:text-light/60">{r.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {exercise.markingGuidance?.length > 0 && (
            <ul className="mt-3 list-disc space-y-1 pl-4 text-[0.8125rem] text-ink-500 dark:text-light/60">{exercise.markingGuidance.map((g, i) => <li key={i}>{g}</li>)}</ul>
          )}
        </details>
      )}

      {onSubmit && (
        <div className="space-y-2.5">
          <label className="block text-[0.9375rem] font-medium text-ink dark:text-light" htmlFor={`ex-${exercise.id}`}>What did you produce? Write it out or describe the steps.</label>
          <textarea
            id={`ex-${exercise.id}`} value={text} rows={6} onChange={e => setText(e.target.value)}
            className="w-full rounded-card border border-surface-line bg-surface p-3.5 text-base leading-relaxed text-ink dark:border-surface-dark-line dark:bg-surface-dark dark:text-light"
            placeholder="e.g. I made a 12-column grid in Figma, set the gutter to 16px, and checked it against the flyer brief…"
          />
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" loading={busy} disabled={!text.trim() || !dirty} onClick={() => onSubmit(text, self)}>
              {submittedText ? 'Update my attempt' : 'Submit for the model answer'}
            </Button>
            <label className="flex items-center gap-2.5 text-[0.8125rem] text-ink-500 dark:text-light/55">
              How well do you think you did?
              <input type="range" aria-label="Self-assessment, 0 to 10" min={0} max={10} value={self} onChange={e => setSelf(Number(e.target.value))} className="accent-[#1a365d]" />
              <span className="w-9 tabular-nums">{self}/10</span>
            </label>
          </div>
          {!dirty && submittedText && <p className="text-[0.8125rem] text-ink-500 dark:text-light/55">Already saved — edit the text to submit again.</p>}
        </div>
      )}

      {modelAnswer !== undefined && (
        <div className="border-l-2 border-gold pl-4">
          <div className="text-[0.8125rem] font-medium text-ink-600 dark:text-light/65">Model answer</div>
          <p className="mt-1 whitespace-pre-line text-[0.9375rem] leading-relaxed text-ink-700 dark:text-light/85">{modelAnswer || 'The manual gives no model answer for this task — take it to your instructor.'}</p>
        </div>
      )}
      {exercise.code && (
        <pre className="overflow-x-auto rounded-card bg-deep p-4 text-[0.875rem] leading-relaxed text-[#e6eefb]" tabIndex={0}><code className="font-mono">{exercise.code}</code></pre>
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
    <Card as="section" variant="ring" className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-lg font-medium text-ink dark:text-light">{scenario.title}</h3>
        <Label>Case study</Label>
      </div>
      <p className="text-base leading-relaxed text-ink-700 dark:text-light/85">{scenario.situation}</p>
      {scenario.facts?.length > 0 && (
        <ul className="list-disc space-y-1.5 pl-5 text-[0.9375rem] leading-relaxed text-ink-700 marker:text-ink-300 dark:text-light/85">
          {scenario.facts.map((f, i) => <li key={i}>{f}</li>)}
        </ul>
      )}
      <p className="text-base font-medium text-ink dark:text-light">{scenario.decision}</p>
      <div role="radiogroup" aria-label="Choose an approach" className="space-y-2">
        {scenario.options.map(o => {
          const on = active === o.id
          const isRight = correctId ? o.id === correctId : undefined
          return (
            <button key={o.id} type="button" role="radio" aria-checked={on} disabled={!onPick || !!active}
              onClick={() => { setPick(o.id); onPick?.(o.id) }}
              className={cx('w-full rounded-card border px-4 py-3 text-left text-[0.9375rem] leading-relaxed text-ink transition-colors dark:text-light/85',
                on && isRight === true && 'border-success',
                on && isRight === false && 'border-error',
                on && isRight === undefined && 'border-navy bg-navy/[.04] dark:border-sky',
                !on && 'border-surface-line hover:border-surface-line-strong dark:border-surface-dark-line dark:hover:bg-surface-dark-muted/60',
                !on && active && 'opacity-60')}>
              {o.text}
            </button>
          )
        })}
      </div>
      {active && scenario.feedback?.[active] && (
        <div className={cx('border-l-2 pl-4 text-[0.9375rem] leading-relaxed', verdict === 'right' ? 'border-success' : verdict === 'wrong' ? 'border-error' : 'border-ink-200 dark:border-surface-dark-line-strong')}>
          <div className="font-medium text-ink dark:text-light">{verdict === 'right' ? 'That holds up.' : verdict === 'wrong' ? 'This would cost you.' : 'Instructor will discuss this one.'}</div>
          <p className="mt-1 text-ink-700 dark:text-light/85">{scenario.feedback[active]}</p>
        </div>
      )}
      {active && (resolution ?? scenario.resolution) && (
        <details open={verdict === 'wrong'}>
          <summary className="min-h-[36px] cursor-pointer text-[0.9375rem] font-medium text-ink underline-offset-4 hover:underline dark:text-light">How the academy would resolve it</summary>
          <p className="mt-2 whitespace-pre-line text-[0.9375rem] leading-relaxed text-ink-700 dark:text-light/85">{resolution ?? scenario.resolution}</p>
          {scenario.example && <pre className="mt-3 overflow-x-auto rounded-card bg-deep p-3.5 text-[0.875rem] text-[#e6eefb]"><code className="font-mono">{scenario.example}</code></pre>}
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
    <Card as="section" variant="ring" className="space-y-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-lg font-medium text-ink dark:text-light">Flashcards</h3>
        <Label>{doneCount} of {cards.length} seen</Label>
      </div>
      <ProgressBar value={cards.length ? (doneCount / cards.length) * 100 : 0} />
      {card ? (
        <>
          <button
            type="button" onClick={() => setFlipped(f => !f)}
            aria-label={flipped ? 'Show prompt' : 'Show answer'}
            className="flex min-h-[10rem] w-full flex-col justify-center rounded-card bg-surface-muted p-5 text-left transition-colors hover:bg-surface-line/70 dark:border dark:border-surface-dark-line dark:bg-surface-dark-muted dark:hover:bg-surface-dark"
          >
            <span className="block text-[0.8125rem] text-ink-500 dark:text-light/50">{flipped ? 'Answer' : 'Prompt'}</span>
            <span className={cx('mt-2 block whitespace-pre-line', flipped ? 'text-base leading-relaxed text-ink-700 dark:text-light/85' : 'text-lg font-medium text-ink dark:text-light')}>{flipped ? card.back : card.front}</span>
          </button>
          {flipped ? (
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => { mark(card.id, 0); setQueue(q => [...q.slice(1), q[0]]) }}>Again</Button>
              <Button size="sm" variant="outline" onClick={() => { mark(card.id, 1); setQueue(q => q.slice(1)) }}>Good</Button>
              <Button size="sm" onClick={() => { mark(card.id, 2); setQueue(q => q.slice(1)) }}>Easy</Button>
            </div>
          ) : <Button size="sm" onClick={() => setFlipped(true)}>Flip card</Button>}
        </>
      ) : (
        <p className="text-[0.9375rem] leading-relaxed text-ink-600 dark:text-light/70">
          Deck finished — {Object.values(grades).filter(g => g > 0).length} of {cards.length} felt solid. Come back tomorrow and the ones you marked “again” will be first.
        </p>
      )}
      <p className="text-[0.8125rem] text-ink-500 dark:text-light/50">Grades go to the API, which decides what is due next.</p>
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
    <Card as="section" variant="ring" className="space-y-3">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="text-base font-medium text-ink dark:text-light">{title}</h3>
        <Label>{onCount} of {items.length} ticked</Label>
      </div>
      <ul className="space-y-1">
        {items.map((label, i) => {
          const key = String(i)
          const on = !!done[key]
          return (
            <li key={key}>
              <label className={cx('flex min-h-[44px] cursor-pointer items-start gap-3 border-b border-surface-line py-2.5 text-[0.9375rem] leading-relaxed transition-colors last:border-0 dark:border-surface-dark-line', on ? 'text-ink-400 dark:text-light/45' : 'text-ink dark:text-light')}>
                <input type="checkbox" checked={on} onChange={() => onChange?.({ ...done, [key]: !on })} className="mt-1 h-4 w-4 shrink-0 accent-[#1a365d]" />
                <span className={cx(on && 'line-through decoration-1')}>{label}</span>
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
    <Card as="section" variant="ring" className="space-y-3">
      <h3 className="text-lg font-medium text-ink dark:text-light">Finish the code</h3>
      <p className="text-[0.9375rem] leading-relaxed text-ink-500 dark:text-light/60">Fill each gap, then check it. The snippet is the same one from the lecture, so nothing here is a trick question.</p>
      {items.map(item => {
        const pieces = item.template.split(/\{\{\d+\}\}/)
        const state = result[item.id]
        const stateFlags = state?.results
        const values = draft[item.id] ?? []
        return (
          <div key={item.id} className="rounded-card border border-surface-line dark:border-surface-dark-line">
            <button type="button" className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-[0.9375rem] font-medium text-ink dark:text-light" onClick={() => setOpen(o => (o === item.id ? null : item.id))} aria-expanded={open === item.id}>
              <span className="min-w-0 truncate">{item.language ? `${item.language} · ` : ''}{item.blanks.length} gap{item.blanks.length > 1 ? 's' : ''}</span>
              <Pill tone={state && stateFlags?.every(Boolean) ? 'success' : state ? 'warn' : 'muted'}>{state ? `${state.correctCount} of ${state.total} right` : 'open'}</Pill>
            </button>
            {open === item.id && (
              <div className="space-y-2 border-t border-surface-line p-3 dark:border-surface-dark-line">
                <pre className="overflow-x-auto rounded-card bg-deep p-4 font-mono text-[0.875rem] leading-relaxed text-[#e6eefb]" tabIndex={0}>
                  {pieces.map((piece, i) => (
                    <span key={i}>
                      {piece}
                      {i < pieces.length - 1 && (
                        <input
                          aria-label={`Gap ${i + 1} of ${item.blanks.length}${stateFlags?.[i] === false ? ', not correct yet' : stateFlags?.[i] ? ', correct' : ''}`}
                          inputMode="text" autoCapitalize="off" autoCorrect="off" spellCheck={false}
                          value={values[i] ?? ''}
                          onChange={e => setDraft(d => { const arr = [...(d[item.id] ?? [])]; arr[i] = e.target.value; return { ...d, [item.id]: arr } })}
                          className={cx('mx-0.5 inline-block w-32 rounded-sm border-b-2 bg-white/10 px-1 font-mono text-[0.875rem] outline-none',
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
                  {state && <span className="text-[0.8125rem] text-ink-500 dark:text-light/60">{state.correctCount} of {state.total} match{stateFlags?.some(x => !x) ? ' — the red gaps need another look.' : '.'}</span>}
                </div>
                {state && (
                  <ul className="space-y-1 text-[0.8125rem] text-ink-500 dark:text-light/60" aria-live="polite">
                    {stateFlags?.map((ok, i) => (!ok && state.hints?.[i] ? <li key={i}>Gap {i + 1}: starts with “{state.hints[i]}…”</li> : null))}
                  </ul>
                )}
                <p className="text-[0.875rem] leading-relaxed text-ink-500 dark:text-light/60">{item.explain}</p>
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
    <section className="space-y-5">
      <h3 className="text-lg font-medium text-ink dark:text-light">Where people slip</h3>
      <ul className="space-y-5">
        {items.map((t, i) => (
          <li key={i} className="border-l-2 border-error pl-4">
            <div className="text-[0.9375rem] font-medium text-ink dark:text-light">{t.mistake}</div>
            <div className="mt-1 text-[0.9375rem] leading-relaxed text-ink-600 dark:text-light/70">{t.fix}</div>
          </li>
        ))}
      </ul>
    </section>
  )
}
