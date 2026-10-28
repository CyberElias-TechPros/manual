'use client'
/** Every module in this kit is client-rendered: a UI kit exists to hold handlers, and a server component cannot receive one. Next still server-renders the markup. */
/** * 6.1 + 5.8 — the knowledge check. Unlimited retries, immediate per-question
 * feedback, model answer revealed after the attempt, and the score computed by
 * the API (never here). Ads are structurally impossible inside this component:
 * there is no slot in it (8.3 "never mid-quiz").
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Question } from '@cea/content/schema'
import { Button, Card, Chip, ProgressBar, cx } from './primitives'

export interface GradedQuestion { id: string; correct: boolean | null; credit: number; modelAnswer: string; explanation: string; note: string; expected?: string[] }
export interface QuizResult { correct: number; total: number; scorePct: number; passed: boolean; perfect: boolean; perQuestion: GradedQuestion[] }

export function QuizRunner({
  questions, passPercent = 60, title = 'Knowledge check', submitDisabled,
  onSubmit, result, onRetry,
}: {
  questions: Question[]
  passPercent?: number
  title?: string
  submitDisabled?: boolean
  /** returns the graded result; the parent owns the POST so the award toast is shared */
  onSubmit: (answers: Record<string, string>, elapsedSec: number) => Promise<QuizResult | null>
  result?: QuizResult | null
  onRetry?: () => void
}) {
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const started = useRef(Date.now())
  const [elapsed, setElapsed] = useState(0)
  const graded = !!result
  const byId = useMemo(() => Object.fromEntries((result?.perQuestion ?? []).map(r => [r.id, r])), [result])

  useEffect(() => {
    const t = setInterval(() => setElapsed(Math.round((Date.now() - started.current) / 1000)), 1000)
    return () => clearInterval(t)
  }, [])

  const answered = Object.values(answers).filter(v => String(v || '').trim() !== '').length
  const set = (id: string, v: string) => setAnswers(a => ({ ...a, [id]: v }))

  async function submit() {
    setBusy(true); setError(null)
    try {
      await onSubmit(answers, Math.max(3, Math.round((Date.now() - started.current) / 1000)))
    } catch (e: any) {
      setError(e?.message || 'Could not grade that attempt. Check your connection and try again.')
    } finally { setBusy(false) }
  }

  return (
    <Card as="section" className="relative scroll-mt-20" >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-navy dark:text-light">{title}</h3>
        <div className="flex items-center gap-2">
          <Chip tone="muted">{elapsed}s</Chip>
          <Chip tone={graded ? (result!.passed ? 'success' : 'warn') : 'muted'}>
            {graded ? `${result!.scorePct}% · pass at ${passPercent}%` : `${answered}/${questions.length} answered`}
          </Chip>
        </div>
      </div>
      <p className="mt-1 text-sm text-ink/65 dark:text-light/65">
        Answer in your own words where the question asks for it — the academy grades the meaning, not the spelling.
        {questions.length > 2 ? ' You must spend at least a few seconds: instant submissions are refused.' : ''}
      </p>
      {graded && <ProgressBar className="mt-3" value={result!.scorePct} label={`Score ${result!.correct}/${result!.total}`} tone={result!.passed ? 'success' : 'gold'} />}

      <ol className="mt-4 space-y-4">
        {questions.map((q, i) => (
          <li key={q.id}>
            <QuestionView
              index={i + 1} question={q} value={answers[q.id] ?? ''} graded={byId[q.id]}
              onChange={v => set(q.id, v)} disabled={graded}
            />
          </li>
        ))}
      </ol>

      {error && <p role="alert" className="mt-3 rounded-card bg-error/10 p-2.5 text-sm text-error">{error}</p>}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!graded
          ? <Button onClick={submit} loading={busy} disabled={submitDisabled || answered === 0}>Submit for grading</Button>
          : (
            <>
              <Button variant="outline" onClick={() => { setAnswers({}); started.current = Date.now(); onRetry?.() }}>Try again</Button>
              <span className="text-sm text-ink/70 dark:text-light/70">
                {result!.passed ? 'Passed — XP banked. A better score is possible; the best one counts.' : `Need ${passPercent}% to pass. Read the feedback, then try again — retries are unlimited.`}
              </span>
            </>
          )}
        {!graded && answered < questions.length && (
          <span className="text-xs text-warn">{questions.length - answered} still blank — a blank counts as wrong.</span>
        )}
      </div>
    </Card>
  )
}

function QuestionView({ index, question: q, value, onChange, graded, disabled }:
  { index: number; question: Question; value: string; onChange: (v: string) => void; graded?: GradedQuestion; disabled?: boolean }) {
  const wrong = graded && graded.correct === false
  const partial = graded && typeof graded.credit === 'number' && graded.credit > 0 && graded.credit < 1
  return (
    <fieldset className={cx('rounded-card border p-3 transition', wrong && 'animate-shake-x border-error/60 bg-error/5', graded && !wrong && 'border-success/45', !graded && 'border-surface-line dark:border-surface-dark-line')}>
      <legend className="sr-only">Question {index}</legend>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 font-mono text-xs text-ink/50 dark:text-light/50">Q{index}</span>
        <div className="min-w-0 flex-1">
          <p className="font-medium">{q.prompt}</p>
          {q.parts && q.parts.length > 1 && <p className="mt-1 text-xs text-ink/60 dark:text-light/60">Parts: {q.parts.join(' · ')}</p>}
        </div>
        {graded && (
          <Chip tone={graded.correct ? 'success' : partial ? 'warn' : 'error'}>
            {graded.correct ? 'correct' : partial ? `${Math.round(graded.credit * 100)}% credit` : 'not yet'}
          </Chip>
        )}
      </div>

      <div className="mt-3">
        {(q.type === 'mcq' && q.choices?.length) ? (
          <div role="radiogroup" aria-label={`Question ${index} options`} className="space-y-1.5">
            {q.choices.map(ch => {
              const on = value === ch.id
              const right = graded?.expected?.includes(ch.id)
              return (
                <label key={ch.id} className={cx(
                  'flex cursor-pointer items-start gap-2.5 rounded-card border px-3 py-2 text-sm transition',
                  on ? 'border-navy bg-navy/6 dark:border-sky dark:bg-sky/10' : 'border-surface-line hover:bg-surface-muted dark:border-surface-dark-line dark:hover:bg-surface-dark-muted',
                  graded && right && 'border-success bg-success/8', graded && on && !right && 'border-error/70 bg-error/6',
                )}>
                  <input type="radio" name={q.id} value={ch.id} checked={on} disabled={disabled}
                    onChange={() => onChange(ch.id)} className="mt-0.5 accent-[#1a365d]" />
                  <span className="min-w-0"><span className="mr-1 font-mono text-xs uppercase opacity-60">{ch.id}</span>{ch.text}</span>
                </label>
              )
            })}
          </div>
        ) : q.type === 'true_false' ? (
          <div className="flex gap-2" role="radiogroup" aria-label="True or false">
            {['true', 'false'].map(v => (
              <button key={v} type="button" disabled={disabled} onClick={() => onChange(v)} aria-pressed={value === v}
                className={cx('min-h-[44px] flex-1 rounded-card border px-3 py-2 text-sm font-medium capitalize transition',
                  value === v ? 'border-navy bg-navy text-white' : 'border-surface-line hover:bg-surface-muted dark:border-surface-dark-line')}>
                {v}
              </button>
            ))}
          </div>
        ) : q.type === 'code' ? (
          <textarea
            value={value} disabled={disabled} spellCheck={false} rows={6}
            onChange={e => onChange(e.target.value)}
            aria-label={`Answer to question ${index}`}
            placeholder={q.codeStarter || 'Write the code here'}
            className="w-full rounded-card border border-surface-line bg-surface-muted p-3 font-mono text-[13px] leading-relaxed text-ink disabled:opacity-70 dark:border-surface-dark-line dark:bg-surface-dark dark:text-light"
          />
        ) : (
          <textarea
            value={value} disabled={disabled} rows={q.type === 'short_answer' ? 3 : 2}
            onChange={e => onChange(e.target.value)}
            aria-label={`Answer to question ${index}`}
            placeholder={q.type === 'fill_blank' ? 'Type the missing value' : 'Your answer'}
            className="w-full rounded-card border border-surface-line bg-surface p-3 text-[15px] disabled:opacity-70 dark:border-surface-dark-line dark:bg-surface-dark"
          />
        )}
      </div>

      {graded && (
        <div className="mt-3 space-y-1.5 border-t border-surface-line pt-2.5 text-sm dark:border-surface-dark-line">
          <p><span className="font-semibold text-success">Model answer:</span> {graded.modelAnswer || (graded.expected?.length ? graded.expected.join(', ') : '—')}</p>
          {graded.explanation && <p className="text-ink/75 dark:text-light/75">{graded.explanation}</p>}
          {graded.note && <p className="text-xs text-warn">{graded.note}</p>}
        </div>
      )}
    </fieldset>
  )
}
