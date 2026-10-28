'use client'
/** Every module in this kit is client-rendered: a UI kit exists to hold handlers, and a server component cannot receive one. Next still server-renders the markup. */
/** * App chrome + the client half of the API contract (Phase 4/9/10).
 *
 * Two rules from the manual drive this file:
 *   • data-saver: nothing here refetches on focus, images are opt-in, and a
 *     mutation made while offline is queued instead of lost (10.4, 10.3);
 *   • the client never computes a reward. It asks, it is told, it animates (5.9).
 */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import { ADS } from '@cea/config'
import { Pill, cx } from './primitives'

// ---------------------------------------------------------------------------
// fetch layer
// ---------------------------------------------------------------------------

export interface ApiErrorShape { ok: false; error: string; code: string; status: number; fields?: Record<string, string> }

export class ApiClientError extends Error {
  /** `body` is the parsed error payload: the API puts structured detail next to the
   * message (certificate eligibility checks, rate-limit retryAfter…), and a screen
   * can show *why* without a second round trip. */
  constructor(public status: number, message: string, public code = 'error', public fields?: Record<string, string>, public body?: Record<string, any>) { super(message) }
}

const QUEUE_KEY = 'cea:queued'
const SNAPSHOT_KEY = 'cea:snapshot:'

function readJson<T>(key: string, fallback: T): T {
  try { const raw = localStorage.getItem(key); return raw ? (JSON.parse(raw) as T) : fallback } catch { return fallback }
}
function writeJson(key: string, value: unknown) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* private mode / quota — the app still works, just without the cache */ }
}

export type QueuedMutation = { path: string; body: unknown; at: number; tries?: number }

export function queuedMutations(): QueuedMutation[] {
  if (typeof window === 'undefined') return []
  return readJson<QueuedMutation[]>(QUEUE_KEY, [])
}

function queueMutation(path: string, body: unknown) {
  const q = queuedMutations().filter(x => x.path !== path || JSON.stringify(x.body) !== JSON.stringify(body))
  q.push({ path, body, at: Date.now() })
  writeJson(QUEUE_KEY, q.slice(-40))
}

export async function flushQueue(): Promise<{ sent: number; left: number }> {
  const q = queuedMutations()
  if (!q.length) return { sent: 0, left: 0 }
  const left: QueuedMutation[] = []
  let sent = 0
  for (const item of q) {
    try {
      const res = await request<{ ok: boolean }>(item.path, { method: 'POST', body: item.body, retryOffline: false })
      if (res?.ok) sent++
      else left.push(item)
    } catch (e) {
      // 4xx means the server rejected it for a reason the user must see; drop it.
      if (e instanceof ApiClientError && e.status < 500 && e.status !== 408 && e.status !== 0) continue
      left.push(item)
    }
  }
  writeJson(QUEUE_KEY, left.slice(-40))
  window.dispatchEvent(new CustomEvent('cea:queue', { detail: { left: left.length } }))
  return { sent, left: left.length }
}

export function csrfFromCookie(): string | null {
  if (typeof document === 'undefined') return null
  const m = new RegExp(`(?:^|; )cea_csrf=([^;]*)`).exec(document.cookie)
  return m ? decodeURIComponent(m[1]) : null
}

/**
 * The only way the UI talks to the backend. Relative URLs keep the preview
 * proxy happy; `retryOffline` lets a lesson view fall back to the cached copy.
 */
export async function request<T>(path: string, opts: { method?: string; body?: unknown; retryOffline?: boolean; signal?: AbortSignal } = {}): Promise<T> {
  const method = opts.method ?? 'GET'
  const headers: Record<string, string> = { accept: 'application/json' }
  if (opts.body !== undefined) headers['content-type'] = 'application/json'
  if (method !== 'GET' && method !== 'HEAD') {
    const csrf = csrfFromCookie()
    if (csrf) headers['x-cea-csrf'] = csrf
  }
  let res: Response
  try {
    res = await fetch(path, { method, headers, credentials: 'same-origin', body: opts.body === undefined ? undefined : JSON.stringify(opts.body), signal: opts.signal })
  } catch (e) {
    if (method === 'GET' && opts.retryOffline !== false) {
      const cached = readJson<T | null>(SNAPSHOT_KEY + path, null)
      if (cached) return cached
    }
    throw new ApiClientError(0, e instanceof Error && navigator.onLine === false ? 'You are offline.' : 'Could not reach the academy. Check your connection.', 'network')
  }
  const text = await res.text()
  let json: any = null
  try { json = text ? JSON.parse(text) : null } catch { json = null }
  if (!res.ok) {
    const shape = (json ?? {}) as { error?: string; code?: string; fields?: Record<string, string> }
    throw new ApiClientError(res.status, shape.error || `Request failed (${res.status})`, shape.code || 'error', shape.fields, (json ?? {}) as Record<string, any>)
  }
  if (method === 'GET') writeJson(SNAPSHOT_KEY + path, json)
  return json as T
}

/** POST that never loses a learner's work: queued when the network is down. */
export async function mutate<T>(path: string, body: unknown, opts: { optimistic?: boolean } = {}): Promise<T> {
  try {
    return await request<T>(path, { method: 'POST', body })
  } catch (e) {
    if (e instanceof ApiClientError && (e.status === 0 || e.status === 408 || e.status === 429 || e.status >= 500) && navigator.onLine === false) {
      queueMutation(path, body)
      window.dispatchEvent(new CustomEvent('cea:queue', { detail: { left: queuedMutations().length } }))
      return { ok: true, queued: true } as T
    }
    throw e
  }
}

/** Tiny data hook — no library, because 4 KB of SWR is 4 KB on every first paint (10.2). */
export function useApi<T>(path: string | null, deps: unknown[] = []): { data: T | null; error: ApiClientError | null; loading: boolean; reload: () => void; offline: boolean } {
  const [state, setState] = useState<{ data: T | null; error: ApiClientError | null; loading: boolean; offline: boolean }>({ data: null, error: null, loading: !!path, offline: false })
  const [nonce, setNonce] = useState(0)
  const reload = useCallback(() => setNonce(n => n + 1), [])
  useEffect(() => {
    if (!path) { setState({ data: null, error: null, loading: false, offline: false }); return }
    const ac = new AbortController()
    let alive = true
    setState(s => ({ ...s, loading: true, error: null }))
    request<T>(path, { signal: ac.signal })
      .then(data => { if (alive) setState({ data, error: null, loading: false, offline: false }) })
      .catch((error: ApiClientError) => {
        if (!alive || error.name === 'AbortError') return
        const cached = typeof window !== 'undefined' ? readJson<T | null>(SNAPSHOT_KEY + path, null) : null
        setState({ data: (cached ?? null) as T | null, error, loading: false, offline: !cached })
      })
    return () => { alive = false; ac.abort() }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path, nonce, ...deps])
  return { ...state, reload }
}

// ---------------------------------------------------------------------------
// session + theme + ads
// ---------------------------------------------------------------------------

export interface MeUser {
  id: string; email: string; name: string; role: 'learner' | 'admin'; isGuest: boolean
  xp: number; streak: { count: number; best: number; freezes: number; lastActiveDate: string | null; atRisk: boolean }
  rank: { current: { key: string; name: string; min: number; blurb?: string }; next?: { key: string; name: string; min: number } | null }
  prefs?: { dataSaver: boolean; leaderboardOptIn: boolean }
  badges?: { key: string; at: string }[]
  enrolled?: { course: string; source?: string; created_at?: string; expires_at?: string | null }[]
  /** Everything below is what GET /api/auth/me actually returns (profileOf in the API). */
  phone?: string | null
  joinedAt?: string
  theme?: 'light' | 'dark' | 'system'
  emailPrefs?: string
  avatarSeed?: string
  completedByCourse?: Record<string, number>
  badgeCatalogue?: { key: string; name: string; description: string; icon?: string; tier?: string }[]
  ranks?: { key: string; name: string; min: number; blurb?: string }[]
}
interface SessionCtx { user: MeUser | null; loading: boolean; refresh: () => void; signOut: () => Promise<void> }
const Session = createContext<SessionCtx>({ user: null, loading: true, refresh: () => {}, signOut: async () => {} })

export function SessionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<MeUser | null>(null)
  const [loading, setLoading] = useState(true)
  const refresh = useCallback(async () => {
    try {
      const r = await request<{ user: MeUser | null }>('/api/auth/me')
      setUser(r?.user ?? null)
    } catch { setUser(null) } finally { setLoading(false) }
  }, [])
  useEffect(() => { void refresh() }, [refresh])
  useEffect(() => {
    const onAuth = () => void refresh()
    window.addEventListener('cea:auth', onAuth)
    return () => window.removeEventListener('cea:auth', onAuth)
  }, [refresh])
  const signOut = useCallback(async () => {
    await request('/api/auth/logout', { method: 'POST' }).catch(() => undefined)
    setUser(null)
  }, [])
  const value = useMemo(() => ({ user, loading, refresh, signOut }), [user, loading, refresh, signOut])
  return <Session.Provider value={value}>{children}</Session.Provider>
}
export const useSession = () => useContext(Session)

const Theme = createContext<{ theme: 'light' | 'dark' | 'system'; set: (t: 'light' | 'dark' | 'system') => void }>({ theme: 'system', set: () => {} })
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system')
  useEffect(() => {
    const stored = (localStorage.getItem('cea:theme') as 'light' | 'dark' | 'system' | null) ?? 'system'
    setTheme(stored)
  }, [])
  useEffect(() => {
    const root = document.documentElement
    const dark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
    root.classList.toggle('dark', dark)
    root.style.colorScheme = dark ? 'dark' : 'light'
  }, [theme])
  const set = useCallback((t: 'light' | 'dark' | 'system') => { setTheme(t); localStorage.setItem('cea:theme', t) }, [])
  return <Theme.Provider value={{ theme, set }}>{children}</Theme.Provider>
}
export const useTheme = () => useContext(Theme)

/**
 * 10.3 — data saver is a promise to a learner on a metered SIM: no images, no ad
 * frames, no decorative motion. It is remembered on the device first (so it works
 * before any request) and mirrored to the account when they are signed in.
 */
export function useDataSaver() {
  const [on, setOnState] = useState(false)
  useEffect(() => { setOnState(localStorage.getItem('cea:saver') === 'on') }, [])
  useEffect(() => {
    document.documentElement.dataset.saver = on ? 'on' : 'off'
    document.documentElement.classList.toggle('cea-saver', on)
  }, [on])
  const set = useCallback((v: boolean) => {
    setOnState(v)
    try { localStorage.setItem('cea:saver', v ? 'on' : 'off') } catch { /* private mode */ }
    window.dispatchEvent(new CustomEvent('cea:saver', { detail: { on: v } }))
  }, [])
  return { on, set }
}

/** 8.3 — placement policy expressed in code, so an ad can never appear mid-quiz. */
export type AdPlacement = typeof ADS.policy.allowedPlacements[number]
export function adAllowed(placement: AdPlacement, opts: { dataSaver?: boolean; premium?: boolean } = {}): boolean {
  if (!ADS.enabled) return false
  if (opts.premium) return false
  if (opts.dataSaver) return false
  return (ADS.policy.allowedPlacements as readonly string[]).includes(placement)
}

/**
 * 8.4 — an ad must never be on the critical path. The tag is mounted, but the auction is
 * not requested until the slot is within 200 px of the viewport *and* the page has finished
 * its first paint, so LCP is the lesson text and the reserved height keeps CLS at 0.
 * (An `<ins>` with no `adsbygoogle.push()` renders nothing at all — the snippet below is
 * what makes the placement actually fill.)
 */
function useDeferredAd(ref: React.RefObject<HTMLElement | null>, enabled: boolean) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    if (!enabled || !ref.current) return
    const el = ref.current
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return }
    const io = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) { setVisible(true); io.disconnect() }
    }, { rootMargin: '200px' })
    io.observe(el)
    return () => io.disconnect()
  }, [enabled, ref])
  useEffect(() => {
    if (!visible) return
    const run = () => { try { ((window as any).adsbygoogle ||= []).push({}) } catch { /* blocked, filtered, or offline: the slot stays empty */ } }
    if (typeof (window as any).requestIdleCallback === 'function') (window as any).requestIdleCallback(run, { timeout: 2000 })
    else run()
  }, [visible])
}

export function AdSlot({ placement, label = 'Advertisement' }: { placement: AdPlacement; label?: string }) {
  const { user } = useSession()
  const dataSaver = !!user?.prefs?.dataSaver
  const allowed = adAllowed(placement, { dataSaver })
  const ref = useRef<HTMLDivElement>(null)
  useDeferredAd(ref, allowed)
  if (!allowed) return null
  // 10.1 CLS: the slot reserves its height even when the network returns nothing.
  return (
    <aside ref={ref} className="my-8 border-y border-surface-line bg-surface-muted/60 py-3 text-center dark:border-surface-dark-line dark:bg-surface-dark-muted/60" aria-label={label}>
      <div className="text-[0.625rem] uppercase tracking-[0.14em] text-ink-400 dark:text-light/40">{label}</div>
      <ins className="adsbygoogle block" style={{ minHeight: 90 }} data-ad-client={`ca-pub-${(ADS as any).adsense.clientId.replace(/^ca-pub-/, '')}`}
        data-ad-slot={(ADS as any).adsense.slotCatalogue} data-ad-format="auto" data-full-width-responsive="true" />
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" data-ad-channel="cea-learn" />
    </aside>
  )
}

/** ngAdverts (8.2) is a separate, Nigerian-first fallback slot; same policy guard. */
export function NgAdSlot({ placement = 'dashboard-side' as AdPlacement }: { placement?: AdPlacement }) {
  const { user } = useSession()
  const allowed = adAllowed(placement, { dataSaver: !!user?.prefs?.dataSaver })
  const ref = useRef<HTMLDivElement>(null)
  if (!allowed) return null
  return (
    <aside ref={ref} className="my-8 border-y border-surface-line bg-surface-muted/60 py-3 text-center dark:border-surface-dark-line dark:bg-surface-dark-muted/60" aria-label="Sponsored">
      <div className="text-[0.625rem] uppercase tracking-[0.14em] text-ink-400 dark:text-light/40">Sponsored · ngAdverts</div>
      <div style={{ minHeight: 90 }} data-cfasync="false">
        <script async src={`${(ADS as any).ngAdverts.script}?slot=${(ADS as any).ngAdverts.slots[0]}`} data-cfasync="false" />
      </div>
    </aside>
  )
}

// ---------------------------------------------------------------------------
// navigation chrome
// ---------------------------------------------------------------------------

export function Brand({ compact }: { compact?: boolean }) {
  const size = compact ? 24 : 26
  return (
    <span className="inline-flex items-center gap-2.5">
      {/*
       * The mark is inline SVG, not `/brand/cealogo.png` (a 737 KB raster). Every learner
       * page carries this bar, and 10.2's budget is per navigation: a PNG of the full-size
       * logo costs ~30× the data of the drawing below on the connection that matters. The
       * raster still belongs in `layout.tsx` metadata (one fetch, by a crawler, on share).
       */}
      <svg width={size} height={size} viewBox="0 0 32 32" role="img" aria-label="Cyber Elias Academy" className="shrink-0">
        <rect x="0.5" y="0.5" width="31" height="31" rx="8" fill="#1a365d" />
        <path d="M22.6 10.6a7.6 7.6 0 1 0 0 10.8" fill="none" stroke="#f7fafc" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="16" cy="16" r="2.1" fill="#f7fafc" />
      </svg>
      <span className="leading-none">
        <span className="block text-[0.9375rem] font-semibold tracking-snugish text-ink dark:text-light">Cyber Elias Academy</span>
        {!compact && <span className="mt-0.5 block text-[0.6875rem] text-ink-500 dark:text-light/50">Learn a skill, level by level</span>}
      </span>
    </span>
  )
}

export function TopBar({ items }: { items: { href: string; label: string; icon?: ReactNode }[] }) {
  const { user, refresh, signOut } = useSession()
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-30 border-b border-surface-line bg-surface dark:border-surface-dark-line dark:bg-surface-dark">
      <div className="mx-auto flex h-14 max-w-course items-center gap-4 px-4 sm:px-6">
        <a href="/" className="shrink-0 rounded-card focus-visible:outline-2 focus-visible:outline-offset-4"><Brand /></a>
        <nav aria-label="Main" className="ml-3 hidden items-center gap-6 lg:flex">
          {items.map(it => <NavLink key={it.href} {...it} />)}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          {user ? (
            <>
              <StreakChip />
              <a href="/search" aria-label="Search the academy" className="text-ink-500 transition-colors hover:text-ink lg:hidden dark:text-light/55 dark:hover:text-light"><SearchIcon /></a>
              <button type="button" className="rounded-card p-1.5 text-ink-600 focus-visible:outline-2 lg:hidden dark:text-light/70" onClick={() => setOpen(o => !o)} aria-expanded={open} aria-label="Menu">
                <Hamburger open={open} />
              </button>
              <div className="relative hidden lg:block">
                <UserMenu user={user} onSignedOut={() => { void signOut().then(refresh) }} />
              </div>
            </>
          ) : (
            <>
              <a className="text-[0.9375rem] font-medium text-navy underline-offset-4 hover:underline dark:text-light" href="/auth/login">Sign in</a>
              <a className="rounded-card bg-navy px-4 py-2 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#152c4d]" href="/auth/register">Create a free account</a>
            </>
          )}
        </div>
      </div>
      {open && (
        <nav aria-label="Main, mobile" className="border-t border-surface-line px-4 pb-3 lg:hidden dark:border-surface-dark-line">
          <ul className="divide-y divide-surface-line pt-1 dark:divide-surface-dark-line">
            {items.map(it => (
              <li key={it.href}><a href={it.href} onClick={() => setOpen(false)} className="flex min-h-[48px] items-center gap-2.5 text-[0.9375rem] font-medium text-ink dark:text-light">{it.icon}{it.label}</a></li>
            ))}
            {user && <li><a href="/profile" onClick={() => setOpen(false)} className="flex min-h-[48px] items-center text-[0.9375rem] text-ink-500 dark:text-light/60">{user.email}</a></li>}
          </ul>
        </nav>
      )}
    </header>
  )
}

function NavLink({ href, label, icon }: { href: string; label: string; icon?: ReactNode }) {
  const active = typeof window !== 'undefined' && window.location.pathname.startsWith(href) && href !== '/'
  return (
    <a href={href} aria-current={active ? 'page' : undefined}
      className={cx('inline-flex min-h-[36px] items-center gap-1.5 border-b-2 py-1 text-[0.9375rem] font-medium transition-colors',
        active ? 'border-navy text-ink dark:border-sky dark:text-light' : 'border-transparent text-ink-500 hover:text-ink dark:text-light/60 dark:hover:text-light')}>
      {label}
    </a>
  )
}

function UserMenu({ user, onSignedOut }: { user: MeUser; onSignedOut: () => void }) {
  const [open, setOpen] = useState(false)
  const box = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!box.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])
  return (
    <div ref={box} className="relative">
      <button type="button" onClick={() => setOpen(o => !o)} aria-expanded={open} className="flex h-8 w-8 items-center justify-center rounded-full border border-surface-line bg-surface-muted text-[0.8125rem] font-semibold text-navy dark:border-surface-dark-line dark:bg-surface-dark-muted dark:text-light" aria-label="Account menu">
        {user.name?.slice(0, 1).toUpperCase() ?? '?'}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-60 rounded-card border border-surface-line bg-surface p-1.5 shadow-elev dark:border-surface-dark-line dark:bg-surface-dark">
          <div className="px-2.5 py-2"><div className="truncate text-[0.9375rem] font-medium text-ink dark:text-light">{user.name}</div><div className="truncate text-[0.8125rem] text-ink-500 dark:text-light/55">{user.email}</div></div>
          <div className="border-t border-surface-line py-1 dark:border-surface-dark-line">
            {[['/dashboard', 'Dashboard'], ['/profile', 'Progress & badges'], ['/settings', 'Settings'], ['/certificates', 'Certificates'], ...(user.role === 'admin' ? [['/admin', 'Admin control room']] : [])].map(([href, label]) => (
              <a key={href} href={href} onClick={() => setOpen(false)} className="block rounded px-2.5 py-2 text-sm hover:bg-surface-muted dark:hover:bg-surface-dark-muted">{label}</a>
            ))}
          </div>
          <button type="button" onClick={onSignedOut} className="block w-full rounded px-2.5 py-2 text-left text-sm text-error hover:bg-error/8">Sign out</button>
        </div>
      )}
    </div>
  )
}

export function StreakChip() {
  const { user } = useSession()
  if (!user) return null
  const count = user.streak?.count ?? 0
  return (
    <a href="/dashboard" className={cx('inline-flex items-center gap-1.5 text-[0.8125rem] font-medium', user.streak?.atRisk ? 'text-warn' : 'text-ink-500 hover:text-ink dark:text-light/55 dark:hover:text-light')} title={`${count}-day streak${user.streak?.atRisk ? ' — finish a level today' : ''}`}>
      <span aria-hidden className={cx('inline-block h-1.5 w-1.5 rounded-full', count > 0 ? 'bg-gold' : 'bg-ink-300')} />
      <span className="tabular-nums">{count}-day streak</span>
    </a>
  )
}

export function BottomNav({ items }: { items: { href: string; label: string; icon: ReactNode }[] }) {
  return (
    <nav aria-label="Primary" className="sticky bottom-0 z-30 border-t border-surface-line bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden dark:border-surface-dark-line dark:bg-surface-dark/95">
      <ul className="mx-auto flex max-w-course items-stretch justify-between px-2">
        {items.map(it => (
          <li key={it.href} className="flex-1">
            <a href={it.href} className={cx('flex min-h-[56px] flex-col items-center justify-center gap-1 px-1 text-[0.6875rem] font-medium transition-colors',
              typeof window !== 'undefined' && window.location.pathname === it.href ? 'text-navy dark:text-sky' : 'text-ink-400 dark:text-light/45')}>
              {it.icon}<span>{it.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" aria-hidden>
      <path d="m20 20-4.5-4.5M11 18a7 7 0 1 1 0-14 7 7 0 0 1 0 14Z" />
    </svg>
  )
}

function Hamburger({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden strokeLinecap="round">
      {open ? <><path d="m6 6 12 12" /><path d="M18 6 6 18" /></> : <><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h11" /></>}
    </svg>
  )
}

// ---------------------------------------------------------------------------
// offline status + the XP toast bus
// ---------------------------------------------------------------------------

export function OfflineBanner() {
  const [online, setOnline] = useState(true)
  const [queued, setQueued] = useState(0)
  useEffect(() => {
    setOnline(navigator.onLine)
    setQueued(queuedMutations().length)
    const upd = () => { setOnline(navigator.onLine); if (navigator.onLine) void flushQueue() }
    window.addEventListener('online', upd)
    window.addEventListener('offline', upd)
    const onQueue = (e: Event) => setQueued((e as CustomEvent).detail?.left ?? queuedMutations().length)
    window.addEventListener('cea:queue', onQueue as EventListener)
    return () => {
      window.removeEventListener('online', upd); window.removeEventListener('offline', upd)
      window.removeEventListener('cea:queue', onQueue as EventListener)
    }
  }, [])
  if (online && queued === 0) return null
  return (
    <div role="status" className={cx('px-3 py-2 text-center text-[0.8125rem]', online ? 'bg-surface-muted text-ink-600 dark:bg-surface-dark-muted dark:text-light/70' : 'bg-surface-muted text-warn dark:bg-surface-dark-muted')}>
      {online
        ? `${queued} action${queued > 1 ? 's' : ''} waiting to sync — sending now.`
        : `Offline. Reading what is cached works; ${queued ? `${queued} action${queued > 1 ? 's are' : ' is'} queued` : 'nothing to do'} and will sync when you are back.`}
    </div>
  )
}

export type AwardToast = { id: number; xp: number; label: string; badge?: string }
let toastSeq = 1
const listeners = new Set<(t: AwardToast) => void>()
export function announceAward(award: any, label = '') {
  // `awarded: false` is the idempotency answer (already banked) — stay quiet then.
  if (!award || award.awarded === false || !award.xp) return
  const t: AwardToast = { id: toastSeq++, xp: award.xp, label, badge: award.badges?.[0]?.name }
  listeners.forEach(fn => fn(t))
}
export function XpToaster() {
  const [toasts, setToasts] = useState<AwardToast[]>([])
  useEffect(() => {
    const fn = (t: AwardToast) => {
      setToasts(list => [...list, t])
      setTimeout(() => setToasts(list => list.filter(x => x.id !== t.id)), 2600)
    }
    listeners.add(fn)
    return () => { listeners.delete(fn) }
  }, [])
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-16 z-50 flex flex-col items-center gap-1.5 px-3 lg:bottom-6" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className="animate-slide-up rounded-card bg-navy px-4 py-2.5 text-[0.9375rem] text-white shadow-elev dark:bg-[#16263f]">
          <span className="font-semibold text-gold">+{t.xp} XP</span>
          {t.label ? <span className="text-white/75"> · {t.label}</span> : null}
          {t.badge ? (
            <span className="ml-1.5 inline-flex items-center gap-1 text-white/85">
              · Badge unlocked: {t.badge}
              {/* one pop, on the event that earned it — the only thing in the app that scales */}
              <svg aria-hidden viewBox="0 0 24 24" className="animate-badge-pop inline-block h-3.5 w-3.5 text-gold" fill="currentColor">
                <path d="M12 2l2.9 6.1 6.6.9-4.8 4.7 1.2 6.7L12 17.3 6.1 20.4l1.2-6.7L2.5 9l6.6-.9z" />
              </svg>
            </span>
          ) : null}
        </div>
      ))}
    </div>
  )
}

/** Marks a section read (4.3) — fire-and-forget, queued when offline. */
export function useSectionRead(course: string, session: number) {
  const sent = useRef(new Set<string>())
  return useCallback((letter: string, seconds = 0) => {
    if (!letter || sent.current.has(letter)) return
    sent.current.add(letter)
    void mutate('/api/learn/section', { course, session, section: letter, deltaSec: seconds })
      .then((r: any) => announceAward(r?.award, 'level read'))
      .catch(() => { sent.current.delete(letter) })
  }, [course, session])
}
