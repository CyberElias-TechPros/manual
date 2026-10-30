'use client'
import Link from 'next/link'
import { Card, Pill, ProgressBar, StatBlock, cx, useApi } from '@cea/ui'
import { formatNgn } from '@cea/config'

type K = {
  signups7: number; signups30: number; active7: number; active30: number
  revenueNgnAll: number; revenueNgnMonth: number; pendingApprovals: number
  approvedCount: number; rejectedCount: number; paidLearners: number; quizAttempts: number
  avgQuizPct: number; passRatePct: number; atRiskStreaks: number
  adImpressions: number; adClicks: number; adBlocked: number; paymentConversion: number
  newFeedback?: number
}

/** 11.1/11.2 — the numbers the academy actually runs on: signups, approvals, revenue, pass rate. */
export function OverviewClient() {
  const data = useApi<{ kpis: K; enrolmentsByCourse: { course: string; count: number }[]; funnel: any[]; generatedAt: string; today: string }>('/api/admin/overview')
  if (data.loading) return <p className="text-sm text-ink-500 dark:text-light/60">Loading the ledger…</p>
  if (data.error) return <Card><p className="text-sm text-error">{data.error.message}</p></Card>
  const k = data.data!.kpis
  const top = [...(data.data!.enrolmentsByCourse ?? [])].sort((a, b) => b.count - a.count).slice(0, 8)
  const maxEnrol = Math.max(1, ...top.map(t => t.count))

  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-snugish text-ink dark:text-light">Admin</h1>
          <p className="mt-0.5 text-sm text-ink-500 dark:text-light/65">Day {data.data!.today} · content built {new Date(data.data!.generatedAt).toLocaleString('en-NG')}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/payments" className={pill(k.pendingApprovals > 0, k.pendingApprovals ? 'bg-warn/15 text-warn' : '')}>Approvals {k.pendingApprovals > 0 ? `(${k.pendingApprovals})` : ''}</Link>
          <Link href="/admin/users" className={pill(false)}>Learners</Link>
          <Link href="/admin/content" className={pill(false)}>Content</Link>
          <Link href="/admin/feedback" className={pill(!!k.newFeedback, k.newFeedback ? 'bg-warn/15 text-warn' : '')}>Feedback {k.newFeedback ? `(${k.newFeedback})` : ''}</Link>
          <Link href="/admin/settings" className={pill(false)}>Fees &amp; codes</Link>
        </div>
      </header>

      {k.pendingApprovals > 0 && (
        <Card className="border-warn/50 bg-warn/8">
          <h2 className="text-base font-semibold">{k.pendingApprovals} receipt{k.pendingApprovals > 1 ? 's' : ''} waiting on a human</h2>
          <p className="mt-1 text-sm text-ink-600 dark:text-light/75">The learner’s next level is blocked until this is cleared. The SLA we promise is 24 hours.</p>
          <Link href="/admin/payments" className="mt-2 inline-flex min-h-[40px] items-center rounded-card bg-navy px-4 text-sm font-medium text-white">Open the queue</Link>
        </Card>
      )}

      <section aria-label="Revenue" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatBlock label="Revenue this month" value={formatNgn(k.revenueNgnMonth)} tone="success" />
        <StatBlock label="Revenue all time" value={formatNgn(k.revenueNgnAll)} hint={`${k.approvedCount} approved`} />
        <StatBlock label="Paid learners" value={k.paidLearners} hint={`${k.paymentConversion}% of 30-day signups`} />
        <StatBlock label="Rejected" value={k.rejectedCount} tone={k.rejectedCount ? 'error' : undefined} hint="wrong amount or unreadable screenshot" />
      </section>

      <section aria-label="Learning" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatBlock label="Signups (7d)" value={k.signups7} hint={`${k.signups30} in 30 days`} />
        <StatBlock label="Active (7d)" value={k.active7} hint={`${pct(k.active30, k.signups30)}% of the last month earned XP`} />
        <StatBlock label="Quiz pass rate" value={`${k.passRatePct}%`} hint={`avg score ${k.avgQuizPct}% · ${k.quizAttempts} attempts`} tone={k.passRatePct < 50 ? 'error' : 'success'} />
        <StatBlock label="Streaks at risk" value={k.atRiskStreaks} tone={k.atRiskStreaks > 5 ? 'error' : undefined} hint="nudge email goes out tonight" />
      </section>

      <section className="grid gap-3 lg:grid-cols-2">
        <Card>
          <h2 className="text-base font-semibold">Enrolments by course</h2>
          <ul className="mt-2 space-y-2">
            {top.map(e => (
              <li key={e.course}>
                <div className="flex items-baseline justify-between gap-2 text-sm">
                  <span className="capitalize">{e.course.replace(/-/g, ' ')}</span>
                  <span className="font-mono tabular-nums">{e.count}</span>
                </div>
                <ProgressBar value={e.count} max={maxEnrol} />
              </li>
            ))}
            {!top.length && <li className="text-sm text-ink-500 dark:text-light/60">Nobody has paid yet. Approvals here are the fastest way to change that.</li>}
          </ul>
        </Card>
        <Card>
          <h2 className="text-base font-semibold">Free level → paid</h2>
          <p className="mt-1 text-sm text-ink-600 dark:text-light/70">The funnel the whole business sits on (README 7.6). A big drop between “level 1 finished” and “intent created” means the price or the pitch is wrong, not the teaching.</p>
          <ul className="mt-3 space-y-2.5 text-sm">
            {(data.data!.funnel ?? []).slice(0, 8).map((f: any) => (
              <li key={f.course}>
                <div className="flex items-baseline justify-between gap-2">
                  <span className="truncate capitalize">{f.title || f.course.replace(/-/g, ' ')}</span>
                  <span className="shrink-0 font-mono text-xs tabular-nums">{f.learners} learners · {f.completionRatePct}% finished</span>
                </div>
                <div className="mt-1 flex items-center gap-1">
                  {(f.steps ?? []).map((st: any) => (
                    <span key={st.pct} title={`${st.pct}% of the course completed by ${st.count}`} className="flex-1">
                      <span className="block h-1.5 rounded-card bg-gold/70" style={{ opacity: f.steps[0].count ? 0.25 + 0.75 * (st.count / Math.max(1, f.steps[0].count)) : 0.15 }} />
                      <span className="mt-0.5 block text-center text-[10px] tabular-nums text-ink-500 dark:text-light/55">{st.pct}%</span>
                    </span>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </section>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-base font-semibold">Ads (last 30 days)</h2>
          <Pill tone={k.adBlocked ? 'warn' : 'muted'}>{k.adBlocked} blocked by policy</Pill>
        </div>
        <div className="mt-2 grid gap-3 sm:grid-cols-3 text-sm">
          <StatBlock label="Impressions" value={k.adImpressions} />
          <StatBlock label="Clicks" value={k.adClicks} hint={`${pct(k.adClicks, k.adImpressions)}% CTR`} />
          <StatBlock label="Revenue estimate" value="—" hint="read it from the AdSense console; we never put the code that reads money in the learner bundle" />
        </div>
      </Card>
      <p className="pb-4 text-xs text-ink-500 dark:text-light/55">
        All figures come from the same D1 the app writes to; nothing here is a second source of truth. <Link href="/admin/settings" className="underline">Change fees</Link> · <Link href="/admin/content" className="underline">lint report</Link>.
      </p>
    </div>
  )
}

const pill = (warn: boolean, extra = '') => cx('inline-flex min-h-[38px] items-center rounded-card border border-surface-line px-3 text-sm font-medium dark:border-surface-dark-line', warn && extra)
const pct = (a: number, b: number) => (b ? Math.round((a / b) * 100) : 0)
