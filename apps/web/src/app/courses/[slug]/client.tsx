'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdSlot, Button, Label, Naira, Pill, SessionMap, Skeleton, cx, announceAward, mutate, request, useApi, useSession } from '@cea/ui'
import { PAYMENT, XP, isFreeAccess } from '@cea/config'

type Access = { enrolled: boolean; paymentStatus: string | null; expiresAt: string | null; state: string }
type Row = { number: number; title: string; module?: string; minutes?: number; isFree?: boolean; isCapstone?: boolean; words?: number; quizCount?: number; state: any }

export function CourseSyllabus({ slug }: { slug: string }) {
  const { data, loading, error } = useApi<{ sessions: Row[]; access: Access }>(`/api/courses/${slug}`)
  if (loading) return <div className="mt-6 space-y-3">{[0, 1, 2, 3, 4].map(i => <Skeleton key={i} className="h-12 w-full" />)}</div>
  if (error || !data) {
    return (
      <p className="mt-6 text-[0.9375rem] text-ink-500 dark:text-light/55">
        The map could not load ({error?.code}). <button className="font-medium text-navy underline underline-offset-2 dark:text-sky" onClick={() => location.reload()}>Retry</button>
      </p>
    )
  }
  return (
    <div className="mt-2 max-w-reading">
      <SessionMap slug={slug} sessions={data.sessions.map(s => ({
        number: s.number, title: s.title, module: s.module, minutes: s.minutes, isFree: s.isFree, isCapstone: s.isCapstone,
        quizCount: s.quizCount, words: s.words, state: s.state,
      }))} />
      <AdSlot placement="course-after-syllabus" />
      <AdSlot placement="course-side" variant="card" />
    </div>
  )
}

/**
 * 7.1-7.6: the whole enrolment decision in one panel. What it shows is driven only by what the API
 * says about this learner, so the UI can never promise access that the server will refuse. One
 * price, one action, and the honest sentence about what happens after you press it.
 */
export function CourseAccessPanel({ slug, feeNgn, freeTitle }: { slug: string; feeNgn?: number | null; freeTitle?: string }) {
  const { user, refresh } = useSession()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const access = useApi<{ access: Access }>(user ? `/api/courses/${slug}` : null)
  const info = access.data?.access

  useEffect(() => { setError(null) }, [slug])

  const freeNow = isFreeAccess()

  if (freeNow) {
    return (
      <div className="space-y-4">
        <div className="rounded-card border-2 border-navy/20 bg-surface p-5 dark:border-sky/30 dark:bg-surface-dark">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <span className="text-2xl font-bold text-success">Free right now</span>
            <span className="text-[0.875rem] text-ink-400 line-through dark:text-light/45"><Naira amount={feeNgn ?? null} /></span>
          </div>
          <p className="mt-1.5 text-[0.875rem] leading-relaxed text-ink-600 dark:text-light/75">
            Payments are paused — <strong>every single level is unlocked free</strong>. Earn up to{' '}
            <strong className="text-[#8a5b0d] dark:text-gold">+{XP.lessonRead + XP.exerciseSubmit + XP.quizPass + XP.quizPerfectBonus + XP.sessionComplete} XP</strong> per level and claim your certificate at the end!
          </p>
          <div className="mt-5 space-y-3">
            <Link href={`/learn/${slug}/1`} className="flex min-h-[48px] items-center justify-center rounded-card bg-navy px-5 text-[0.9375rem] font-bold text-white transition-colors hover:bg-[#152c4d]">
              {user ? 'Start / Continue Level 1 →' : 'Start Level 1 Free →'}
            </Link>
            {!user && (
              <Link href="/auth/register" className="flex min-h-[44px] items-center justify-center rounded-card border border-surface-line-strong px-4 text-[0.875rem] font-bold text-navy hover:bg-surface-muted dark:border-surface-dark-line-strong dark:text-sky dark:hover:bg-surface-dark-muted">
                Create free account (saves XP &amp; streak)
              </Link>
            )}
          </div>
        </div>
        <AdSlot placement="course-hero" variant="card" />
      </div>
    )
  }

  return (
    <div className="rounded-card border border-surface-line bg-surface p-5 dark:border-surface-dark-line dark:bg-surface-dark">
      <div className="flex items-baseline justify-between gap-3">
        <Naira amount={feeNgn ?? null} className="text-2xl font-semibold text-ink dark:text-light" />
        <Label>one-off</Label>
      </div>
      <p className="mt-1 text-[0.8125rem] text-ink-500 dark:text-light/55">Bank transfer · approval within {PAYMENT.slaHours}h</p>

      {!user ? (
        <div className="mt-5 space-y-3">
          <Link href="/auth/register" className="flex min-h-[48px] items-center justify-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#152c4d]">
            Create a free account
          </Link>
          <Link href={`/learn/${slug}/1`} className="flex min-h-[44px] items-center justify-center text-[0.9375rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">
            {freeTitle ? `Read level 1 first` : 'Read the free level first'}
          </Link>
          <p className="text-[0.8125rem] leading-relaxed text-ink-500 dark:text-light/55">
            An account keeps your XP, your streak and the level you stopped at. Nothing is charged for signing up.
          </p>
        </div>
      ) : info?.enrolled ? (
        <div className="mt-5 space-y-3">
          <Link href={`/learn/${slug}/1`} className="flex min-h-[48px] items-center justify-center rounded-card bg-navy px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#152c4d]">
            Go to my levels
          </Link>
          <p className="flex items-center gap-2 text-[0.875rem] text-ink-600 dark:text-light/70">
            <Pill tone="success">enrolled</Pill> access does not expire
          </p>
        </div>
      ) : (
        <div className="mt-5 space-y-4">
          <Button className="w-full" onClick={startPayment} loading={busy}>Unlock the whole course</Button>
          <p className="text-[0.8125rem] leading-relaxed text-ink-500 dark:text-light/55">
            You transfer {feeNgn ? `₦${feeNgn.toLocaleString('en-NG')}` : 'the course fee'} to {PAYMENT.bank}, send the receipt, and
            every level opens when an administrator approves it. Level 1 stays free whatever you decide.
          </p>
          {info?.paymentStatus === 'pending' && (
            <p className="text-[0.875rem] text-ink-600 dark:text-light/70">
              Your receipt is already with the academy. Nothing more to pay — the levels open as soon as it is approved.
            </p>
          )}
          <form className="flex items-center gap-3" onSubmit={e => { e.preventDefault(); void redeem() }}>
            <label className="sr-only" htmlFor="access-code">Access code</label>
            <input id="access-code" value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="Have an access code?"
              className="min-h-[44px] w-full rounded-card border border-surface-line bg-surface px-3 font-mono text-[0.875rem] text-ink outline-none transition-colors placeholder:font-sans placeholder:text-ink-400 focus:border-navy dark:border-surface-dark-line dark:bg-surface-dark dark:text-light dark:placeholder:text-light/40 dark:focus:border-sky" />
            <button type="submit" disabled={!code.trim() || busy} className={cx('min-h-[44px] shrink-0 px-1 text-[0.875rem] font-medium text-navy underline-offset-4 hover:underline disabled:opacity-40 dark:text-sky', !code.trim() && 'opacity-40')}>
              Redeem
            </button>
          </form>
          {error && <p role="alert" className="text-[0.875rem] text-error">{error}</p>}
          {notice && <p role="status" className="text-[0.875rem] text-success">{notice}</p>}
          <Link href={`/learn/${slug}/1`} className="inline-flex min-h-[36px] items-center text-[0.875rem] font-medium text-navy underline-offset-4 hover:underline dark:text-sky">
            Read level 1 free first
          </Link>
        </div>
      )}
    </div>
  )

  async function startPayment() {
    setBusy(true); setError(null)
    try {
      const r = await request<{ reference: string; amount: number }>('/api/payments/intent', { method: 'POST', body: { course: slug } })
      location.href = `/checkout/${slug}?ref=${encodeURIComponent(r.reference)}&amount=${r.amount}`
    } catch (e: any) {
      setError(e?.message || 'Could not start the payment.')
      setBusy(false)
    }
  }

  async function redeem() {
    setBusy(true); setError(null)
    try {
      const r = await mutate<{ ok: boolean; course?: string; award?: any }>('/api/codes/redeem', { code })
      announceAward(r?.award, 'access code')
      setNotice(`Code redeemed — ${r.course === '*' ? 'every course' : r.course} is now unlocked for you.`)
      setCode('')
      await refresh(); access.reload()
    } catch (e: any) {
      setError(e?.message || 'That code did not work.')
    } finally { setBusy(false) }
  }
}
