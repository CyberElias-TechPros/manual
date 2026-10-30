'use client'
/** Every module in this kit is client-rendered: a UI kit exists to hold handlers, and a server component cannot receive one. Next still server-renders the markup. */
/**
 * 6.1 + 5.8 — the knowledge check, staged. One question on screen at a time, then a single
 * submission that the API grades (never here — the learner bundle holds no answer key, 4.4), then a
 * review list where the teaching actually happens: verdict, model answer, why.
 *
 * Retries are unlimited and answers are kept between attempts, so a learner can fix only what was
 * wrong instead of retyping everything.
 *
 * There is exactly one ad slot in here (`after-question`), under the answer box. The old 8.3 rule
 * ("never mid-quiz") was retired by the academy on 2026-10-29 when ads became the product's
 * revenue; this is where the line now sits — a slot may sit below a question, but never between a
 * submitted answer and its verdict, because reading whether you were right is the one moment in a
 * check that belongs to the learner. Nothing here renders the verdict in the same screen as the slot:
 * `graded` marks appear in the review list, after the check is over.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Question } from '@cea/content/schema'
import { Button, Card, Label, Pill, ProgressBar, cx } from './primitives'
import { AdSlot } from './shell'
import { GAME } from '@cea/config'

/** Where a run of correct answers becomes a combo — the same number the API pays on (5.9). */
const COMBO_TRIGGER = GAME.combo.trigger

export interface GradedQuestion { id: string; correct: boolean | null; credit: number; modelAnswer: string; explanation: string; note: string; expected?: string[] }
export interface QuizResult { correct: number; total: number; scorePct: number; passed: boolean; perfect: boolean; perQuestion: GradedQuestion[] }

export function QuizRunner({
  questions, passPercent = 60, title = 'Knowledge check', submitDisabled,
  onSubmit, result, onRetry, combo,
}: {
  questions: Question[]
  passPercent?: number
  title?: string
  submitDisabled?: boolean
  /** returns the graded result; the parent owns the POST so the award toast is shared */
  onSubmit: (answers: Record<string, string>, elapsedSec: number) => Promise<QuizResult | null>
  result?: QuizResult | null
  onRetry?: () => void
  /**
   * The longest run of correct answers, measured by the API at marking time (5.9). Optional because a
   * level with two questions cannot produce one — the line only appears when the server says it did.
   */
  combo?: { run: number } | null
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [step, setStep] = useState(0)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const started = useRef(Date.now())
  const graded = !!result
  const byId = useMemo(() => Object.fromEntries((result?.perQuestion ?? []).map(r => [r.id, r])), [result])

  // one question at a time means the keyboard has to follow the page, not the other way round
  const promptRef = useRef<HTMLParagraphElement | null>(null)
  useEffect(() => { if (!graded) promptRef.current?.focus() }, [step, graded])

  const answered = Object.values(answers).filter(v => String(v || '').trim() !== '').length
  const set = (id: string, v: string) => setAnswers(a => ({ ...a, [id]: v }))
  const total = questions.length
  const last = step === total - 1
  const q = questions[Math.min(step, total - 1)]

  async function submit() {
    setBusy(true); setError(null)
    try {
      await onSubmit(answers, Math.max(3, Math.round((Date.now() - started.current) / 1000)))
    } catch (e: any) {
      setError(e?.message || 'Could not grade that attempt. Check your connection and try again.')
    } finally { setBusy(false) }
  }

  if (graded) {
    return (
      <Card as="section" variant="ring" className="scroll-mt-24" pad>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-xl font-semibold text-ink dark:text-light">{title}</h3>
          <Pill tone={result!.passed ? 'success' : 'warn'}>
            {result!.correct} of {result!.total} correct · pass at {passPercent}%
          </Pill>
        </div>
        <div className="mt-4 max-w-measure">
          <ProgressBar value={result!.scorePct} tone={result!.passed ? 'success' : 'gold'} />
          {combo && combo.run >= COMBO_TRIGGER ? (
            <p className="mt-2 text-[0.9375rem] font-semibold text-ink dark:text-light">
              <span className="rounded-pill bg-gold/20 px-2 py-0.5">{combo.run} in a row</span>{' '}
              combo bonus banked with this check.
            </p>
          ) : null}
          <p className="mt-2 text-base text-ink-600 dark:text-light/75">
            {result!.passed
              ? 'Passed — XP banked. A better score is still possible; the best one counts.'
              : `You need ${passPercent}% to pass. Read the notes below, then try again — retries are unlimited and your answers are kept.`}
          </p>
        </div>

        <ol className="mt-6 space-y-5 border-t border-surface-line pt-5 dark:border-surface-dark-line">
          {questions.map((qq, i) => (
            <li key={qq.id}>
              <QuestionView index={i + 1} question={qq} value={answers[qq.id] ?? ''} graded={byId[qq.id]} onChange={() => {}} disabled readOnly />
            </li>
          ))}
        </ol>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-surface-line pt-4 dark:border-surface-dark-line">
          <Button variant="outline" onClick={() => { started.current = Date.now(); setStep(0); onRetry?.() }}>Try again</Button>
          <Label>Or step back through the sections above and read the parts you missed.</Label>
        </div>
      </Card>
    )
  }

  return (
    <Card as="section" variant="ring" className="scroll-mt-24">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-base font-medium text-ink dark:text-light">{title}</h3>
        <Label>{total > 1 ? `Question ${step + 1} of ${total}` : '1 question'}</Label>
      </div>
      {total > 1 && <ProgressBar className="mt-3" value={step + 1} max={total} />}

      <div className="mt-5">
        <QuestionView
          promptRef={promptRef} index={step + 1} question={q} value={answers[q.id] ?? ''}
          onChange={v => set(q.id, v)}
        />
      </div>

      {error && <p role="alert" className="mt-4 text-sm text-error">{error}</p>}

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-surface-line pt-4 dark:border-surface-dark-line">
        <div className="flex items-center gap-2">
          {step > 0 && <Button variant="ghost" size="sm" onClick={() => setStep(s => Math.max(0, s - 1))}>Back</Button>}
          <Label>{answered} of {total} answered</Label>
        </div>
        {last ? (
          <Button onClick={submit} loading={busy} disabled={submitDisabled || answered === 0}>Check my answers</Button>
        ) : (
          <Button onClick={() => setStep(s => Math.min(total - 1, s + 1))} disabled={!String(answers[q.id] ?? '').trim()}>Next</Button>
        )}
      </div>
      {/* 8.x — under the answer, never between a question and its verdict: the learner must not have to
          scroll past a banner to find out whether they were right. */}
      <AdSlot placement="after-question" variant="card" />
      {!last && !String(answers[q.id] ?? '').trim() && (
        <p className="mt-2 text-right text-[0.8125rem] text-ink-500 dark:text-light/55">Answer this one to move on — a blank counts as wrong.</p>
      )}
      <p className="mt-3 text-[0.8125rem] text-ink-600 dark:text-light/70">
        <strong>Beginner tip:</strong> Take your time — there is no timer, and you can retry as often as you want. Answer in simple everyday words (we grade meaning, not spelling), and get <strong>{COMBO_TRIGGER} right in a row</strong> for a Combo XP bonus!
      </p>
    </Card>
  )
}

function QuestionView({ index, question: q, value, onChange, graded, disabled, readOnly, promptRef }:
  { index: number; question: Question; value: string; onChange: (v: string) => void; graded?: GradedQuestion; disabled?: boolean; readOnly?: boolean; promptRef?: any }) {
  const wrong = graded && graded.correct === false
  const partial = graded && typeof graded.credit === 'number' && graded.credit > 0 && graded.credit < 1
  return (
    <fieldset className={cx('transition', wrong && 'animate-shake-x')}>
      <legend className="sr-only">Question {index}</legend>
      <div className="flex items-start justify-between gap-3">
        <p ref={promptRef} tabIndex={-1} className="max-w-reading text-lg leading-relaxed font-medium text-ink outline-none dark:text-light">{q.prompt}</p>
        {graded && (
          <Pill tone={graded.correct ? 'success' : partial ? 'warn' : 'error'} className="mt-1 shrink-0">
            {graded.correct ? 'correct' : partial ? `${Math.round(graded.credit * 100)}% credit` : 'not yet'}
          </Pill>
        )}
      </div>
      {q.parts && q.parts.length > 1 && <p className="mt-1.5 text-[0.8125rem] text-ink-500 dark:text-light/55">This question has {q.parts.length} parts: {q.parts.join(' · ')}</p>}

      <div className="mt-4">
        {(q.type === 'mcq' && q.choices?.length) ? (
          <div role="radiogroup" aria-label={`Question ${index} options`} className="max-w-measure space-y-2">
            {q.choices.map(ch => {
              const on = value === ch.id
              const right = graded?.expected?.includes(ch.id)
              return (
                <label key={ch.id} className={cx(
                  'flex cursor-pointer items-start gap-3 rounded-card border px-4 py-3 text-[0.9375rem] transition-colors duration-150',
                  readOnly && 'cursor-default',
                  on ? 'border-navy bg-navy/[.04] dark:border-sky dark:bg-sky/10' : 'border-surface-line hover:border-surface-line-strong dark:border-surface-dark-line dark:hover:bg-surface-dark-muted/60',
                  graded && right && 'border-success', graded && on && !right && 'border-error',
                )}>
                  <input type="radio" name={q.id} value={ch.id} checked={on} disabled={disabled} className="mt-1 h-4 w-4 shrink-0 accent-[#1a365d]" />
                  <span className="min-w-0">{ch.text}</span>
                </label>
              )
            })}
          </div>
        ) : q.type === 'true_false' ? (
          <div className="flex max-w-measure gap-3" role="radiogroup" aria-label="True or false">
            {['true', 'false'].map(v => (
              <button key={v} type="button" disabled={disabled} onClick={() => onChange(v)} aria-pressed={value === v}
                className={cx('min-h-[48px] flex-1 rounded-card border px-3 py-2 text-[0.9375rem] font-medium capitalize transition-colors',
                  value === v ? 'border-navy bg-navy text-white' : 'border-surface-line hover:bg-surface-muted dark:border-surface-dark-line dark:hover:bg-surface-dark-muted')}>
                {v}
              </button>
            ))}
          </div>
        ) : q.type === 'code' ? (
          <textarea
            value={value} disabled={disabled} readOnly={readOnly} spellCheck={false} rows={6}
            onChange={e => onChange(e.target.value)}
            aria-label={`Answer to question ${index}`}
            placeholder={q.codeStarter || 'Write the code here'}
            className="w-full rounded-card border border-surface-line bg-surface-muted p-3.5 font-mono text-[0.875rem] leading-relaxed text-ink disabled:opacity-80 dark:border-surface-dark-line dark:bg-surface-dark dark:text-light"
          />
        ) : (
          <textarea
            value={value} disabled={disabled} readOnly={readOnly} rows={q.type === 'short_answer' ? 4 : 3}
            onChange={e => onChange(e.target.value)}
            aria-label={`Answer to question ${index}`}
            placeholder={q.type === 'fill_blank' ? 'Type the missing value' : 'Your answer'}
            className="w-full rounded-card border border-surface-line bg-surface p-3.5 text-base leading-relaxed disabled:opacity-80 dark:border-surface-dark-line dark:bg-surface-dark"
          />
        )}
      </div>

      {graded && (
        <div className={cx('mt-4 max-w-reading space-y-2 border-l-2 pl-4 text-[0.9375rem]', graded.correct ? 'border-success' : 'border-gold')}>
          <p className="text-ink-800 dark:text-light/90"><span className="font-semibold">Model answer:</span> {graded.modelAnswer || (graded.expected?.length ? graded.expected.join(', ') : '—')}</p>
          {graded.explanation && <p className="text-ink-600 dark:text-light/70">{graded.explanation}</p>}
          {graded.note && <p className="text-[0.8125rem] text-warn">{graded.note}</p>}
        </div>
      )}
    </fieldset>
  )
}
