'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, Card, Chip, ProgressBar, cx, request, useApi } from '@cea/ui'
import { formatNgn } from '@cea/config'

type U = {
  id: string; email: string; name: string; phone: string | null; role: string; isGuest: boolean
  banned: boolean; bannedReason: string | null; xp: number; rank: string; streak: number; best: number
  joinedAt: string; lastActive: string | null; enrolled: { course: string; source: string; status: string }[]
  completed: Record<string, number>; payments?: any[]
}

/** 7.10 — support tools: find a learner, see their state, fix it, and every action is audited. */
export function UsersClient() {
  const [q, setQ] = useState('')
  const [debounced, setDebounced] = useState('')
  useEffect(() => { const t = setTimeout(() => setDebounced(q.trim()), 300); return () => clearTimeout(t) }, [q])
  const data = useApi<{ users: U[] }>(`/api/admin/users?q=${encodeURIComponent(debounced)}&limit=40`)
  const [busy, setBusy] = useState<string | null>(null)
  const [note, setNote] = useState<string | null>(null)
  const [panel, setPanel] = useState<string | null>(null)

  async function act(id: string, path: string, body: Record<string, unknown> = {}) {
    setBusy(id + path); setNote(null)
    try {
      const r = await request<any>(`/api/admin/users/${id}/${path}`, { method: 'POST', body })
      setNote(r?.temporaryPassword ? `Temporary password: ${r.temporaryPassword} — send once, then ask them to change it.` : 'Done.')
      data.reload()
    } catch (e: any) { setNote(e?.message || 'Failed.') } finally { setBusy(null) }
  }

  const rows = data.data?.users ?? []
  return (
    <div className="space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-xl font-bold">Learners</h1>
          <p className="mt-0.5 text-sm text-ink/65 dark:text-light/65">Search by name, email or phone. Guests are included — they are the top of the funnel.</p>
        </div>
        <Link href="/admin" className="text-sm underline">← Overview</Link>
      </header>

      <form onSubmit={e => e.preventDefault()}>
        <label className="sr-only" htmlFor="uq">Search learners</label>
        <input id="uq" value={q} onChange={e => setQ(e.target.value)} placeholder="chidi, chidi@…, 0803…"
          className="min-h-[44px] w-full rounded-card border border-surface-line bg-surface px-3 text-[15px] dark:border-surface-dark-line dark:bg-surface-dark" />
      </form>

      {note && <p role="status" className="rounded-card bg-surface-muted px-3 py-2 font-mono text-sm dark:bg-surface-dark-muted">{note}</p>}

      {data.loading ? <p className="text-sm">Loading…</p> : rows.length === 0 ? (
        <Card><p className="text-sm">{debounced ? `Nobody matches “${debounced}”.` : 'No accounts yet.'}</p></Card>
      ) : (
        <ul className="space-y-2">
          {rows.map(u => (
            <li key={u.id}>
              <Card className={cx(u.banned && 'opacity-70')}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[15px] font-semibold">{u.name}</span>
                      {u.role !== 'learner' && <Chip tone="gold">{u.role}</Chip>}
                      {u.isGuest && <Chip tone="muted">guest</Chip>}
                      {u.banned && <Chip tone="error">suspended</Chip>}
                      <Chip tone="navy">{u.rank}</Chip>
                    </div>
                    <p className="mt-0.5 text-xs text-ink/60 dark:text-light/60">{u.email}{u.phone ? ` · ${u.phone}` : ''} · joined {new Date(u.joinedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' })} · last active {u.lastActive ?? 'never'}</p>
                    <p className="mt-1 text-sm tabular-nums">{u.xp.toLocaleString()} XP · streak {u.streak} (best {u.best}) · {u.enrolled.length} enrolled · {Object.values(u.completed ?? {}).reduce((a: number, b: any) => a + Number(b), 0)} levels done</p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-1.5">
                    <Button size="sm" variant="outline" onClick={() => setPanel(panel === u.id ? null : u.id)}>Tools</Button>
                  </div>
                </div>

                {u.enrolled.length > 0 && (
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {u.enrolled.map(e => (
                      <li key={e.course}><span className="rounded-pill bg-surface-muted px-2 py-0.5 text-xs capitalize dark:bg-surface-dark-muted">{e.course.replace(/-/g, ' ')} · {e.source}{e.status !== 'active' ? ` · ${e.status}` : ''}</span></li>
                    ))}
                  </ul>
                )}

                {panel === u.id && (
                  <div className="mt-3 space-y-3 border-t border-surface-line pt-3 dark:border-surface-dark-line">
                    <div className="grid gap-2 sm:grid-cols-2">
                      <label className="text-xs"><span>XP adjustment (±2000 max, needs a reason in the audit note)</span>
                        <XpInput onSend={delta => act(u.id, 'xp', { delta, reason: 'support' })} busy={busy === u.id + 'xp'} />
                      </label>
                      <div className="text-xs"><span>Account actions</span>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {u.banned
                            ? <Button size="sm" variant="outline" loading={busy === u.id + 'unban'} onClick={() => act(u.id, 'unban')}>Reinstate</Button>
                            : <Button size="sm" variant="danger" loading={busy === u.id + 'ban'} onClick={() => act(u.id, 'ban', { reason: 'manual suspension from admin UI' })}>Suspend</Button>}
                          <Button size="sm" variant="outline" loading={busy === u.id + 'reset-password'} onClick={() => act(u.id, 'reset-password', {})}>Reset password</Button>
                        </div>
                      </div>
                    </div>
                    <GrantRow userId={u.id} onDone={() => data.reload()} busy={busy} setBusy={setBusy} />
                    {u.enrolled.length > 0 && (
                      <div className="text-xs"><span>Revoke access</span>
                        <div className="mt-1 flex flex-wrap gap-1.5">
                          {u.enrolled.filter(e => e.status === 'active').map(e => (
                            <RevokeButton key={e.course} userId={u.id} course={e.course} onDone={() => data.reload()} />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function XpInput({ onSend, busy }: { onSend: (delta: number) => void; busy: boolean }) {
  const [v, setV] = useState('')
  return (
    <div className="mt-1 flex gap-1.5">
      <input value={v} onChange={e => setV(e.target.value.replace(/[^-0-9]/g, ''))} placeholder="+150" aria-label="XP adjustment"
        className="min-h-[40px] w-24 rounded-card border border-surface-line bg-surface px-2 font-mono text-sm dark:border-surface-dark-line dark:bg-surface-dark" />
      <Button size="sm" loading={busy} disabled={!v || v === '0' || !/^[+-]?\d+$/.test(v)} onClick={() => onSend(Number(v))}>Apply</Button>
    </div>
  )
}

function RevokeButton({ userId, course, onDone }: { userId: string; course: string; onDone: () => void }) {
  const [busy, setBusy] = useState(false)
  return (
    <Button size="sm" variant="outline" loading={busy} onClick={async () => {
      setBusy(true)
      try { await request('/api/admin/revoke', { method: 'POST', body: { userId, course, reason: 'revoked from admin UI' } }); onDone() } finally { setBusy(false) }
    }}>revoke {course.replace(/-/g, ' ')}</Button>
  )
}

function GrantRow({ userId, onDone, busy, setBusy }: { userId: string; onDone: () => void; busy: string | null; setBusy: (v: string | null) => void }) {
  const courses = useApi<{ courses: { slug: string; displayTitle?: string; name: string; feeNgn?: number }[] }>('/api/courses')
  const [slug, setSlug] = useState('')
  const [note, setNote] = useState('')
  return (
    <div className="rounded-card bg-surface-muted p-2 text-xs dark:bg-surface-dark-muted">
      <p className="font-medium">Grant access without payment</p>
      <p className="mt-0.5 text-ink/60 dark:text-light/60">For a scholarship, a workshop attendee, or “yes we took cash at the office”. It is audited and the learner gets an email.</p>
      <div className="mt-1.5 flex flex-wrap items-end gap-1.5">
        <select value={slug} onChange={e => setSlug(e.target.value)} aria-label="Course"
          className="min-h-[40px] rounded-card border border-surface-line bg-surface px-2 text-sm dark:border-surface-dark-line dark:bg-surface-dark">
          <option value="">Choose a course…</option>
          {(courses.data?.courses ?? []).map(c => <option key={c.slug} value={c.slug}>{c.displayTitle || c.name}</option>)}
        </select>
        <input value={note} onChange={e => setNote(e.target.value)} placeholder="note for the audit log" aria-label="Note"
          className="min-h-[40px] flex-1 rounded-card border border-surface-line bg-surface px-2 text-sm dark:border-surface-dark-line dark:bg-surface-dark" />
        <Button size="sm" loading={busy === userId + 'grant'} disabled={!slug} onClick={async () => {
          setBusy(userId + 'grant')
          try { await request('/api/admin/grant', { method: 'POST', body: { userId, course: slug, note } }); onDone() } finally { setBusy(null) }
        }}>Grant</Button>
      </div>
    </div>
  )
}
