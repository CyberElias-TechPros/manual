'use client'
import { useState } from 'react'
import { Card, Chip, ProgressBar, cx, useApi } from '@cea/ui'

type SessionStat = { course: string; session: number; learners: number; avgQuizPct: number; completed: number }

/**
 * 11.1/6.x — the lint report is the QA gate for content: the same numbers
 * `pnpm content:build` prints in CI, in the browser for whoever edited the markdown.
 * Below it, per-level difficulty, which is how you notice "level 9 has a 12 % pass rate".
 */
export function ContentClient() {
  const data = useApi<{
    report: { totals?: any; courses?: any[]; issues?: { level: string; course: string; session?: number; kind: string; message: string }[] }
    sessions: SessionStat[]
    rebuild: { command: string; note: string; hotReload: string }
  }>('/api/admin/content')
  const [level, setLevel] = useState<'critical' | 'warn' | 'info'>('warn')
  if (data.loading) return <p className="text-sm">Reading the build report…</p>
  if (data.error) return <Card><p className="text-sm text-error">{data.error.message}</p></Card>

  const r: any = data.data!.report ?? {}
  const issues = (r.issues ?? []).filter((i: any) => (level === 'warn' ? i.level === 'warn' || i.level === 'critical' : i.level === level))
  const counts = { critical: 0, warn: 0, info: 0 } as Record<string, number>
  for (const i of r.issues ?? []) counts[i.level] = (counts[i.level] ?? 0) + 1
  const stats = data.data!.sessions ?? []
  const hard = [...stats].filter(s => s.learners >= 2 && s.avgQuizPct < 45).slice(0, 10)

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Content</h1>
          <p className="mt-0.5 text-sm text-ink/65 dark:text-light/65">The bundle the app serves, plus the lint the build gate uses.</p>
        </div>
        <code className="rounded-card bg-surface-muted px-2 py-1 text-xs dark:bg-surface-dark-muted">{data.data!.rebuild.command}</code>
      </header>

      {r.totals && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {Object.entries(r.totals).filter(([, v]) => typeof v === 'number').map(([k, v]) => (
            <Card key={k}><p className="text-xs uppercase tracking-wide text-ink/55 dark:text-light/55">{k}</p><p className="text-lg font-semibold tabular-nums">{Number(v).toLocaleString()}</p></Card>
          ))}
        </div>
      )}

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold">Lint</h2>
          <div className="flex gap-1.5">
            {(['critical', 'warn', 'info'] as const).map(l => (
              <button key={l} type="button" onClick={() => setLevel(l)} aria-pressed={level === l}
                className={cx('min-h-[34px] rounded-pill px-2.5 text-xs font-medium', level === l ? 'bg-navy text-white' : 'border border-surface-line dark:border-surface-dark-line')}>
                {l} {counts[l] ?? 0}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-1 text-xs text-ink/60 dark:text-light/60">{data.data!.rebuild.note}. Critical issues fail the build in CI — a learner should never meet a level with no quiz or an answer key that contradicts the question.</p>
        {issues.length === 0 ? (
          <p className="mt-3 text-sm text-success">Nothing at this level. The corpus is clean.</p>
        ) : (
          <ul className="mt-3 space-y-1.5">
            {issues.slice(0, 60).map((i: any, n: number) => (
              <li key={n} className="flex flex-wrap items-baseline gap-2 text-sm">
                <Chip tone={i.level === 'critical' ? 'error' : i.level === 'warn' ? 'warn' : 'muted'}>{i.level}</Chip>
                <span className="font-mono text-xs">{i.course}{i.session ? ` · s${String(i.session).padStart(2, '0')}` : ''}</span>
                <span className="min-w-0 flex-1">{i.message}</span>
                <span className="text-xs uppercase tracking-wide text-ink/50 dark:text-light/50">{i.kind}</span>
              </li>
            ))}
            {issues.length > 60 && <li className="text-xs text-ink/60 dark:text-light/60">+{issues.length - 60} more</li>}
          </ul>
        )}
      </Card>

      <div className="grid gap-3 lg:grid-cols-2">
        <Card>
          <h2 className="text-base font-semibold">Courses in the bundle</h2>
          <ul className="mt-2 space-y-2 text-sm">
            {(r.courses ?? []).map((c: any) => (
              <li key={c.slug}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate capitalize">{c.slug.replace(/-/g, ' ')}</span>
                  <span className="shrink-0 font-mono text-xs text-ink/60 dark:text-light/60">{c.sessions ?? c.sessionCount ?? '—'} levels · {c.issues ?? 0} issues</span>
                </div>
                {c.sessions ? <ProgressBar value={c.sessions} max={12} tone={c.sessions >= 10 ? 'success' : 'gold'} /> : null}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="text-base font-semibold">Levels learners get stuck on</h2>
          <p className="mt-1 text-xs text-ink/60 dark:text-light/60">Average best quiz score under 45 % with 2+ learners. That is usually the quiz, not the class.</p>
          {hard.length === 0 ? <p className="mt-2 text-sm">No data yet — this fills in as learners attempt quizzes.</p> : (
            <ul className="mt-2 space-y-1.5 text-sm">
              {hard.map(s => (
                <li key={`${s.course}-${s.session}`} className="flex items-center justify-between gap-2">
                  <span className="truncate capitalize">{s.course.replace(/-/g, ' ')} · level {s.session}</span>
                  <span className="shrink-0 font-mono text-xs">{s.avgQuizPct}% · {s.learners} learners</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
