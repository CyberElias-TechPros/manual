'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, Card, Pill, ProgressBar, cx, flushQueue, mutate, queuedMutations, request, useDataSaver, useSession, useTheme } from '@cea/ui'
import { PAYMENT } from '@cea/config'

/**
 * 10.1/10.3/10.6/11.4 — every control a low-bandwidth learner actually needs,
 * on one page, working without a connection where it can (theme, data saver) and
 * saving to the account where it must (password, privacy flags).
 */
export function SettingsClient() {
  const { user, loading, refresh } = useSession()
  const { theme, set: setTheme } = useTheme()
  const saver = useDataSaver()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [emailPrefs, setEmailPrefs] = useState('')
  const [pw, setPw] = useState({ current: '', next: '' })
  const [state, setState] = useState<Record<string, 'idle' | 'busy' | 'done' | 'error'>>({})
  const [msg, setMsg] = useState<string | null>(null)
  const [queued, setQueued] = useState(0)
  const [confirmDelete, setConfirmDelete] = useState('')

  useEffect(() => {
    if (!user) return
    setName(user.name ?? ''); setPhone(user.phone ?? ''); setEmailPrefs(user.emailPrefs ?? 'receipts,streak')
  }, [user])
  useEffect(() => {
    const upd = () => setQueued(queuedMutations().length)
    upd()
    window.addEventListener('cea:queue', upd as EventListener)
    return () => window.removeEventListener('cea:queue', upd as EventListener)
  }, [])

  if (loading) return <p className="text-sm text-ink/60 dark:text-light/60">Loading settings…</p>

  async function save(what: string, payload: Record<string, unknown>) {
    setState(s => ({ ...s, [what]: 'busy' })); setMsg(null)
    try {
      await mutate('/api/auth/me', payload)
      await refresh()
      setState(s => ({ ...s, [what]: 'done' }))
      setMsg('Saved.')
      setTimeout(() => setState(s => ({ ...s, [what]: 'idle' })), 1800)
    } catch (e: any) {
      setState(s => ({ ...s, [what]: 'error' }))
      setMsg(e?.message || 'Could not save that.')
    }
  }

  return (
    <div className="mx-auto max-w-reading space-y-4">
      <header>
        <h1 className="text-2xl font-semibold tracking-snugish text-ink dark:text-light">Settings</h1>
        <p className="mt-0.5 text-sm text-ink/70 dark:text-light/70">Theme, data, privacy and password. The first two work even with no signal.</p>
      </header>

      <Card>
        <h2 className="text-base font-semibold">Look & bandwidth</h2>
        <div className="mt-3 space-y-3">
          <Row label="Theme" hint="Dark saves your battery on an OLED screen and is easier on the eyes at night.">
            <div className="flex gap-1.5">
              {(['light', 'dark', 'system'] as const).map(t => (
                <button key={t} type="button" onClick={() => { setTheme(t); if (user && !user.isGuest) void save('theme', { theme: t }) }}
                  aria-pressed={theme === t}
                  className={cx('min-h-[38px] rounded-card px-3 text-sm font-medium capitalize', theme === t ? 'bg-navy text-white' : 'border border-surface-line hover:bg-surface-muted dark:border-surface-dark-line dark:hover:bg-surface-dark-muted')}>
                  {t}
                </button>
              ))}
            </div>
          </Row>
          <Row label="Data saver" hint="Hides diagrams, ad frames and animation. Your progress is unaffected.">
            <Toggle on={saver.on} onChange={v => { saver.set(v); if (user && !user.isGuest) void save('saver', { dataSaver: v }) }} label="Data saver" />
          </Row>
        </div>
      </Card>

      {user ? (
        <>
          <Card>
            <h2 className="text-base font-semibold">Profile</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Name"><input value={name} onChange={e => setName(e.target.value)} className={inputCls} /></Field>
              <Field label="Phone (optional)"><input value={phone} onChange={e => setPhone(e.target.value)} inputMode="tel" placeholder="08031234567" className={inputCls} /></Field>
              <Field label="Email" hint="Changing the email address needs the academy — email hello@cea.ng.">
                <input value={user.email} readOnly className={cx(inputCls, 'opacity-70')} />
              </Field>
              <Field label="Email updates" hint="Comma-separated. We never send marketing without a separate opt-in.">
                <input value={emailPrefs} onChange={e => setEmailPrefs(e.target.value)} className={inputCls} />
              </Field>
            </div>
            <Button size="sm" className="mt-3" loading={state.profile === 'busy'} onClick={() => save('profile', { name, phone, emailPrefs })}>Save profile</Button>
            {msg && state.profile === 'done' && <span className="ml-2 text-xs text-success">saved ✓</span>}
          </Card>

          <Card>
            <h2 className="text-base font-semibold">Privacy</h2>
            <div className="mt-3 space-y-3">
              <Row label="Show me on the leaderboard" hint="Off means your name never appears on a board, in-app or in an email.">
                <Toggle on={!!user.prefs?.leaderboardOptIn} onChange={v => save('lb', { leaderboardOptIn: v })} label="Leaderboard" busy={state.lb === 'busy'} />
              </Row>
              <Row label="Sync data saver across devices" hint="Stores the switch on your account so a new phone starts in the mode you like.">
                <Pill tone="muted">on by default</Pill>
              </Row>
            </div>
          </Card>

          <Card>
            <h2 className="text-base font-semibold">Password</h2>
            <p className="mt-1 text-xs text-ink/60 dark:text-light/60">Ten characters or more. Changing it signs you out everywhere else.</p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field label="Current password"><input type="password" value={pw.current} onChange={e => setPw(p => ({ ...p, current: e.target.value }))} autoComplete="current-password" className={inputCls} /></Field>
              <Field label="New password"><input type="password" value={pw.next} onChange={e => setPw(p => ({ ...p, next: e.target.value }))} autoComplete="new-password" className={inputCls} /></Field>
            </div>
            <Button size="sm" className="mt-3" loading={state.pw === 'busy'} disabled={pw.next.length < 10}
              onClick={async () => { await save('pw', { currentPassword: pw.current, password: pw.next }); setPw({ current: '', next: '' }) }}>
              Change password
            </Button>
            {state.pw === 'error' && msg && <p role="alert" className="mt-2 text-sm text-error">{msg}</p>}
            <p className="mt-2 text-xs text-ink/60 dark:text-light/60">Forgotten it instead? <Link href="/auth/forgot" className="underline">Use the reset email</Link>.</p>
          </Card>

          <Card>
            <h2 className="text-base font-semibold">Offline &amp; sync</h2>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
              <span className={queued ? 'text-warn' : 'text-success'}>{queued ? `${queued} action${queued > 1 ? 's' : ''} queued` : 'everything synced'}</span>
              <Button size="sm" variant="outline" onClick={async () => { const r = await flushQueue(); setMsg(`Sent ${r.sent}. ${r.left} still waiting.`) }}>Sync now</Button>
              <Button size="sm" variant="ghost" onClick={async () => { if ('caches' in window) { await Promise.all((await caches.keys()).map(k => caches.delete(k))) } setMsg('Cached levels cleared. They will come back as you read.') }}>Clear cached lessons</Button>
            </div>
            <p className="mt-2 text-xs text-ink/60 dark:text-light/60">
              The app works as an installable program: add it to your home screen and the last four levels you read stay available with no connection at all.
            </p>
            {user.isGuest && (
              <div className="mt-3 rounded-card bg-sky/12 p-3 text-sm">
                <p className="font-medium">This is a guest pass</p>
                <p className="mt-1 text-ink/75 dark:text-light/75">Add an email and password and it becomes a real account — same XP, same streak, and it survives a broken phone.</p>
                <GuestUpgrade onDone={refresh} />
              </div>
            )}
          </Card>

          <Card className="border-error/40">
            <h2 className="text-base font-semibold text-error">Danger zone</h2>
            <p className="mt-1 text-sm text-ink/75 dark:text-light/75">
              Deleting your account removes your profile, progress, XP and notes. Payment receipts are kept in the accounts ledger for
              {` ${PAYMENT.retentionGraceDays} days`} because Nigerian tax law asks for them, then deleted.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <input value={confirmDelete} onChange={e => setConfirmDelete(e.target.value)} placeholder='Type DELETE to confirm' className={cx(inputCls, 'max-w-[14rem]')} aria-label="Type DELETE to confirm" />
              <Button size="sm" variant="danger" loading={state.del === 'busy'} disabled={confirmDelete !== 'DELETE'}
                onClick={async () => {
                  setState(s => ({ ...s, del: 'busy' }))
                  try { await request('/api/auth/me', { method: 'DELETE' }); localStorage.clear(); location.href = '/' }
                  catch (e: any) { setMsg(e?.message || 'Could not delete the account.'); setState(s => ({ ...s, del: 'error' })) }
                }}>
                Delete my account
              </Button>
            </div>
            {state.del === 'error' && msg && <p role="alert" className="mt-2 text-sm text-error">{msg}</p>}
          </Card>
        </>
      ) : (
        <Card className="text-center">
          <p className="text-sm">Settings that need an account (profile, password, privacy) appear once you sign in. Theme and data saver already work.</p>
          <Link href="/auth/login?next=/settings" className="mt-3 inline-flex min-h-[44px] items-center rounded-card bg-navy px-4 text-sm font-medium text-white">Sign in</Link>
        </Card>
      )}

      {msg && !user ? <p role="status" className="text-sm text-success">{msg}</p> : null}
      <p className="pb-2 text-xs text-ink/55 dark:text-light/55">
        Something not on this list? The academy answers at <a href="mailto:hello@cea.ng" className="underline">hello@cea.ng</a>.
      </p>
    </div>
  )
}

function GuestUpgrade({ onDone }: { onDone: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  return (
    <form className="mt-2 flex flex-wrap items-end gap-2" onSubmit={async e => {
      e.preventDefault(); setBusy(true); setErr(null)
      try { await request('/api/auth/upgrade', { method: 'POST', body: { email, password } }); await onDone(); location.href = '/dashboard' }
      catch (e: any) { setErr(e?.message || 'Could not upgrade the pass.') } finally { setBusy(false) }
    }}>
      <input value={email} onChange={e => setEmail(e.target.value)} type="email" required placeholder="you@example.com" aria-label="Email" className={cx(inputCls, 'max-w-[15rem]')} />
      <input value={password} onChange={e => setPassword(e.target.value)} type="password" required minLength={10} placeholder="password (10+)" aria-label="Password" className={cx(inputCls, 'max-w-[13rem]')} />
      <Button size="sm" type="submit" loading={busy}>Upgrade</Button>
      {err && <p className="w-full text-xs text-error">{err}</p>}
    </form>
  )
}

const inputCls = 'min-h-[44px] w-full rounded-card border border-surface-line bg-surface px-3 text-sm dark:border-surface-dark-line dark:bg-surface-dark'

function Row({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="min-w-[12rem] flex-1">
        <p className="text-sm font-medium">{label}</p>
        {hint && <p className="mt-0.5 text-xs text-ink/60 dark:text-light/60">{hint}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  )
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium">
      <span>{label}</span>
      <div className="mt-1 font-normal">{children}</div>
      {hint && <span className="mt-1 block text-xs font-normal text-ink/60 dark:text-light/60">{hint}</span>}
    </label>
  )
}

function Toggle({ on, onChange, label, busy }: { on: boolean; onChange: (v: boolean) => void; label: string; busy?: boolean }) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} disabled={busy} onClick={() => onChange(!on)}
      className={cx('relative h-7 w-12 shrink-0 rounded-pill border transition-colors', on ? 'border-navy bg-navy' : 'border-surface-line bg-surface dark:border-surface-dark-line dark:bg-surface-dark')}>
      <span className={cx('absolute top-1 h-5 w-5 rounded-full bg-white shadow-card transition-all', on ? 'left-6' : 'left-1')} />
    </button>
  )
}
