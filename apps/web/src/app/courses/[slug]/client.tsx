'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { AdSlot, Button, Card, Chip, SessionMap, Skeleton, announceAward, cx, mutate, request, useApi, useSession } from '@cea/ui'
import { PAYMENT } from '@cea/config'

type Access = { enrolled: boolean; paymentStatus: string | null; expiresAt: string | null; state: string }
type Row = { number: number; title: string; module?: string; minutes?: number; isFree?: boolean; isCapstone?: boolean; words?: number; quizCount?: number; state: any }

export function CourseSyllabus({ slug }: { slug: string }) {
  const { data, loading, error } = useApi<{ sessions: Row[]; access: Access }>(`/api/courses/${slug}`)
  if (loading) return <div className="mt-3 space-y-2">{[0, 1, 2, 3, 4].map(i => <Skeleton key={i} className="h-16 w-full" />)}</div>
  if (error || !data) return <Card className="mt-3 text-sm">The map could not load ({error?.code}). <button className="font-medium underline" onClick={() => location.reload()}>Retry</button></Card>
  return (
    <div className="mt-3">
      <SessionMap slug={slug} sessions={data.sessions.map(s => ({
        number: s.number, title: s.title, module: s.module, minutes: s.minutes, isFree: s.isFree, isCapstone: s.isCapstone,
        quizCount: s.quizCount, words: s.words, state: s.state,
      }))} />
      <AdSlot placement="course-after-syllabus" />
    </div>
  )
}

/**
 * 7.1-7.6: the whole enrolment decision in one panel. What it shows is driven only
 * by what the API says about this learner, so the UI can never promise access that
 * the server will refuse.
 */
export function CourseAccessPanel({ slug }: { slug: string }) {
  const { user, refresh } = useSession()
  const [state, setState] = useState<'loading' | 'idle' | 'busy'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const [code, setCode] = useState('')
  const access = useApi<{ access: Access }>(user ? `/api/courses/${slug}` : null)
  const info = access.data?.access

  useEffect(() => { setError(null) }, [slug])

  if (!user) {
    return (
      <div className="mt-3 space-y-2">
        <Link href="/auth/register" className="flex min-h-[44px] items-center justify-center rounded-pill bg-gold px-4 text-[15px] font-semibold text-deep hover:brightness-105">
          Create a free account
        </Link>
        <Link href={`/learn/${slug}/1`} className="flex min-h-[44px] items-center justify-center rounded-pill border border-white/25 px-4 text-sm text-light hover:bg-white/10">
          Read level 1 first
        </Link>
        <p className="text-center text-xs text-light/60">An account keeps your XP, streak and the level you stopped at.</p>
      </div>
    )
  }

  if (info?.enrolled) {
    return (
      <div className="mt-3 space-y-2">
        <Link href={`/learn/${slug}/1`} className="flex min-h-[44px] items-center justify-center rounded-pill bg-gold px-4 text-[15px] font-semibold text-deep hover:brightness-105">
          Go to my levels
        </Link>
        <p className="text-center text-xs text-light/70"><Chip tone="success">Enrolled</Chip></p>
      </div>
    )
  }

  async function startPayment() {
    setState('busy'); setError(null)
    try {
      const r = await request<{ reference: string; amount: number }>('/api/payments/intent', { method: 'POST', body: { course: slug } })
      location.href = `/checkout/${slug}?ref=${encodeURIComponent(r.reference)}&amount=${r.amount}`
    } catch (e: any) {
      setError(e?.message || 'Could not start the payment.')
      setState('idle')
    }
  }

  async function redeem() {
    setState('busy'); setError(null)
    try {
      const r = await mutate<{ ok: boolean; course?: string; award?: any }>('/api/codes/redeem', { code })
      announceAward(r?.award, 'access code')
      setNotice(`Code redeemed — ${r.course === '*' ? 'every course' : r.course} is now unlocked for you.`)
      setCode('')
      await refresh(); access.reload()
    } catch (e: any) {
      setError(e?.message || 'That code did not work.')
    } finally { setState('idle') }
  }

  return (
    <div className="mt-3 space-y-2.5">
      <Button variant="gold" className="w-full" onClick={startPayment} loading={state === 'busy'}>
        Pay by transfer, unlock everything
      </Button>
      <Link href={`/learn/${slug}/1`} className="flex min-h-[44px] items-center justify-center rounded-pill border border-white/25 px-4 text-sm text-light hover:bg-white/10">
        Read level 1 free
      </Link>
      {info?.paymentStatus === 'pending' && (
        <p className="rounded-card bg-white/10 p-2 text-center text-xs text-light/85">
          Your receipt is with the academy. Levels open as soon as it is approved — no need to pay again.
        </p>
      )}
      <form className="flex gap-1.5" onSubmit={e => { e.preventDefault(); void redeem() }}>
        <label className="sr-only" htmlFor="access-code">Access code</label>
        <input id="access-code" value={code} onChange={e => setCode(e.target.value.toUpperCase())} placeholder="Have a code?"
          className="min-h-[40px] w-full rounded-pill bg-white/90 px-3 font-mono text-sm text-deep outline-none placeholder:text-ink/45" />
        <button type="submit" disabled={!code.trim() || state === 'busy' || state === 'loading'} className={cx('min-h-[40px] shrink-0 rounded-pill bg-white/15 px-3 text-sm font-medium text-light hover:bg-white/25', (!code.trim()) && 'opacity-50')}>
          Redeem
        </button>
      </form>
      {error && <p role="alert" className="rounded-card bg-error/20 p-2 text-xs text-[#ffd9d9]">{error}</p>}
      {notice && <p role="status" className="rounded-card bg-success/20 p-2 text-xs text-[#e6fff0]">{notice}</p>}
    </div>
  )
}
