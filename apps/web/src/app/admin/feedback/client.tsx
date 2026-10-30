'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button, Card, Pill, cx, request, useApi } from '@cea/ui'

type FeedbackRow = {
  id: string
  body: string
  page: string | null
  status: 'new' | 'read' | 'resolved'
  createdAt: string
  user: { id: string; name: string | null; email: string | null } | null
}

type SubmissionRow = {
  id: string
  course: string
  sessionNumber: number
  exerciseId: string
  kind: string
  text: string
  selfScore: number | null
  createdAt: string
  user: { id: string; name: string | null; email: string | null }
}

/**
 * 11.2 + GAP-ANALYSIS §2.3 — tutor inbox for learner clarity notes ("Was level N clear?")
 * and open-ended exercise submissions, so tutors never have to run SQL to read learner input.
 */
export function FeedbackClient() {
  const [filter, setFilter] = useState<'all' | 'new' | 'resolved'>('all')
  const data = useApi<{ feedback: FeedbackRow[]; submissions: SubmissionRow[] }>(`/api/admin/feedback?status=${filter}&limit=100`)
  const [busy, setBusy] = useState<string | null>(null)
  const [err, setErr] = useState<string | null>(null)

  async function setStatus(id: string, status: 'new' | 'resolved') {
    setBusy(id); setErr(null)
    try {
      await request(`/api/admin/feedback/${id}`, { method: 'PATCH', body: { status } })
      data.reload()
    } catch (e: any) {
      setErr(e?.message || 'Could not update feedback status.')
    } finally {
      setBusy(null)
    }
  }

  const items = data.data?.feedback ?? []
  const subs = data.data?.submissions ?? []

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs text-ink-500 dark:text-light/60"><Link href="/admin" className="underline">Admin</Link> / Feedback &amp; tutor inbox</p>
          <h1 className="mt-1 text-2xl font-bold text-ink dark:text-light">Feedback &amp; tutor inbox</h1>
          <p className="mt-0.5 text-sm text-ink-600 dark:text-light/70">
            Clarity ratings from the Finish stage of each level, plus written exercise answers from learners.
          </p>
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter feedback status">
          {(['all', 'new', 'resolved'] as const).map(f => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cx(
                'min-h-[36px] rounded-card border px-3 text-sm font-semibold capitalize',
                filter === f
                  ? 'border-navy bg-navy text-white dark:border-gold dark:bg-gold dark:text-ink'
                  : 'border-surface-line text-ink-600 dark:border-surface-dark-line dark:text-light/75'
              )}
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      {err && <Card variant="ring"><p className="text-sm text-error">{err}</p></Card>}

      <section aria-labelledby="feedback-heading" className="space-y-3">
        <div className="flex items-baseline justify-between gap-2">
          <h2 id="feedback-heading" className="text-lg font-bold text-ink dark:text-light">Level clarity feedback ({items.length})</h2>
        </div>
        {data.loading ? (
          <p className="text-sm text-ink-500 dark:text-light/60">Loading feedback…</p>
        ) : items.length === 0 ? (
          <Card variant="ring">
            <p className="text-sm text-ink-600 dark:text-light/70">No feedback entries match this filter yet.</p>
          </Card>
        ) : (
          <ul className="divide-y divide-surface-line rounded-card border border-surface-line bg-white dark:divide-surface-dark-line dark:border-surface-dark-line dark:bg-surface-dark-card">
            {items.map(item => (
              <li key={item.id} className="flex flex-wrap items-start justify-between gap-3 p-4">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-ink-500 dark:text-light/60">
                    <Pill tone={item.status === 'new' ? 'warn' : 'muted'}>{item.status}</Pill>
                    {item.page && (
                      <Link href={item.page} className="font-mono underline">{item.page}</Link>
                    )}
                    <span>{new Date(item.createdAt).toLocaleString('en-NG')}</span>
                    {item.user?.email && <span>· {item.user.name || item.user.email}</span>}
                  </div>
                  <p className="text-sm font-medium text-ink dark:text-light">{item.body}</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  disabled={busy === item.id}
                  onClick={() => setStatus(item.id, item.status === 'resolved' ? 'new' : 'resolved')}
                >
                  {item.status === 'resolved' ? 'Reopen' : 'Mark resolved'}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="submissions-heading" className="space-y-3">
        <h2 id="submissions-heading" className="text-lg font-bold text-ink dark:text-light">Recent written exercises ({subs.length})</h2>
        {subs.length === 0 ? (
          <Card variant="ring">
            <p className="text-sm text-ink-600 dark:text-light/70">No written exercise submissions yet.</p>
          </Card>
        ) : (
          <ul className="divide-y divide-surface-line rounded-card border border-surface-line bg-white dark:divide-surface-dark-line dark:border-surface-dark-line dark:bg-surface-dark-card">
            {subs.map(s => (
              <li key={s.id} className="space-y-1.5 p-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-500 dark:text-light/60">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link href={`/learn/${s.course}/${s.sessionNumber}?stage=exercise`} className="font-semibold text-navy underline dark:text-gold">
                      {s.course.replace(/-/g, ' ')} · Level {s.sessionNumber}
                    </Link>
                    <Pill tone="muted">{s.kind}</Pill>
                    {s.selfScore != null && <span>Self-check: {s.selfScore}/5</span>}
                  </div>
                  <span>{s.user.name || s.user.email} · {new Date(s.createdAt).toLocaleString('en-NG')}</span>
                </div>
                <pre className="overflow-x-auto whitespace-pre-wrap rounded-card bg-surface-muted p-3 font-sans text-sm text-ink dark:bg-surface-dark-muted dark:text-light">{s.text}</pre>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  )
}
