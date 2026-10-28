'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Button, Card, Chip, ProgressBar, request, useApi, useSession } from '@cea/ui'

type Cert = { code: string; course: string; learner_name: string; issued_at: string; grade: string; sessions_completed: number; avg_quiz_pct: number }
type Checks = { sessionsCompleted: number; sessionsRequired: number; avgQuizPct: number; avgQuizRequired: number; capstoneDone: boolean }

/**
 * Certificates were a backlog item in the README (Phase 12) while the course PDFs
 * already promise one per course. v1-lite: server-issued code + a printable A4 sheet
 * + a public verifier. No PDF renderer in the bundle — the browser prints, which is
 * also what a learner with 40 MB of data left needs.
 */
export function CertificatesClient() {
  const { user } = useSession()
  const list = useApi<{ certificates: Cert[] }>(user ? '/api/certificates' : null)
  const courses = useApi<{ courses: any[]; totals: any; signedIn?: boolean }>(user ? '/api/courses' : null)
  const [busy, setBusy] = useState<string | null>(null)
  const [msg, setMsg] = useState<{ tone: 'ok' | 'bad'; text: string; checks?: Checks } | null>(null)

  if (!user) {
    return (
      <Card className="mx-auto max-w-reading text-center">
        <h1 className="text-xl font-bold">Certificates</h1>
        <p className="mt-1.5 text-sm text-ink/70 dark:text-light/70">Sign in to request the certificate for a course you finished. Anyone can check a code without an account.</p>
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          <Link href="/auth/login?next=/certificates" className="inline-flex min-h-[44px] items-center rounded-pill bg-navy px-4 text-sm font-medium text-white">Sign in</Link>
          <Link href="/certificates/verify" className="inline-flex min-h-[44px] items-center rounded-pill border border-surface-line px-4 text-sm font-medium dark:border-surface-dark-line">Verify a code</Link>
        </div>
      </Card>
    )
  }

  const mine = list.data?.certificates ?? []
  const enrolled = new Set((user as any).enrolled?.map?.((e: any) => e.course ?? e) ?? [])
  const candidates = (courses.data?.courses ?? []).filter((c: any) => enrolled.has(c.slug) && !mine.some(m => m.course === c.slug))

  async function issue(slug: string) {
    setBusy(slug); setMsg(null)
    try {
      const r = await request<{ code: string; url: string }>('/api/certificates/issue', { method: 'POST', body: { course: slug } })
      setMsg({ tone: 'ok', text: `Issued: ${r.code}` })
      list.reload()
      setTimeout(() => { location.href = r.url }, 700)
    } catch (e: any) {
      // The 422 carries the eligibility checks alongside the message (gap fix: a
      // learner should never have to guess what is missing).
      const checks = (e?.body ?? {}) as unknown as Checks
      setMsg({ tone: 'bad', text: e?.message || 'Not yet.', checks: e?.body ? checks : undefined })
    } finally { setBusy(null) }
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Certificates</h1>
          <p className="mt-0.5 text-sm text-ink/70 dark:text-light/70">Every level completed, a 70% average across the knowledge checks, and the capstone submitted — then the academy issues the code.</p>
        </div>
        <Link href="/certificates/verify" className="text-sm font-medium text-blue underline underline-offset-4 dark:text-sky">Verify somebody else’s →</Link>
      </header>

      {msg && (
        <Card className={msg.tone === 'ok' ? 'border-success/50 bg-success/6' : ''}>
          <p className={msg.tone === 'ok' ? 'text-sm text-success' : 'text-sm'}>{msg.text}</p>
          {msg.tone === 'bad' && msg.checks && <Eligibility checks={msg.checks as unknown as Checks} />}
        </Card>
      )}

      {mine.length === 0 ? (
        <Card className="text-center"><p className="text-sm">No certificates yet. That is not a small thing — finish a course and it will be the first one the academy has issued through this app.</p></Card>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {mine.map(cert => (
            <li key={cert.code}>
              <Card className="cea-print-sheet">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[15px] font-semibold capitalize">{cert.course.replace(/-/g, ' ')}</h2>
                    <p className="mt-0.5 text-xs text-ink/60 dark:text-light/60">{cert.learner_name} · {new Date(cert.issued_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                  </div>
                  <Chip tone="gold">{cert.grade}</Chip>
                </div>
                <p className="mt-2 font-mono text-sm">{cert.code}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-ink/60 dark:text-light/60">{cert.sessions_completed} levels · avg quiz {cert.avg_quiz_pct}%</span>
                  <Link href={`/certificate/${cert.code}`} className="min-h-[34px] rounded-pill bg-navy px-3 font-medium text-white inline-flex items-center">Open & print</Link>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}

      {candidates.length > 0 && (
        <section aria-labelledby="canask">
          <h2 id="canask" className="mb-2 text-lg font-semibold">Courses you have paid for</h2>
          <ul className="space-y-2">
            {candidates.map((c: any) => (
              <li key={c.slug}>
                <Card className="flex flex-wrap items-center justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="text-[15px] font-semibold">{c.displayTitle || c.name}</h3>
                    <p className="text-xs text-ink/60 dark:text-light/60">{c.sessionsCount} levels · certificate on completion</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={`/courses/${c.slug}/map`} className="inline-flex min-h-[36px] items-center rounded-pill border border-surface-line px-3 text-sm dark:border-surface-dark-line">map</Link>
                    <Button size="sm" variant="gold" loading={busy === c.slug} onClick={() => issue(c.slug)}>Ask for my certificate</Button>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export function Eligibility({ checks }: { checks: Checks }) {
  const rows = [
    ['Levels completed', `${checks.sessionsCompleted}/${checks.sessionsRequired}`, checks.sessionsCompleted >= checks.sessionsRequired],
    ['Average quiz score', `${checks.avgQuizPct}% of ${checks.avgQuizRequired}%`, checks.avgQuizPct >= checks.avgQuizRequired],
    ['Capstone submitted', checks.capstoneDone ? 'yes' : 'not yet', !!checks.capstoneDone],
  ] as const
  return (
    <div className="mt-2 space-y-1.5">
      {rows.map(([label, value, ok]) => (
        <div key={label} className="flex items-center gap-2 text-sm">
          <span className={ok ? 'text-success' : 'text-warn'} aria-hidden>{ok ? '✓' : '○'}</span>
          <span className="min-w-[10rem]">{label}</span>
          <span className="font-medium tabular-nums">{value}</span>
        </div>
      ))}
      <ProgressBar value={Math.min(100, Math.round((checks.sessionsCompleted / Math.max(1, checks.sessionsRequired)) * 100))} />
    </div>
  )
}
