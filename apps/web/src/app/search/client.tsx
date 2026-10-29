'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { AdSlot, Pill, cx, request } from '@cea/ui'

type Hit = { course: string; courseTitle: string; sessionNumber: number; title: string; score: number; free?: boolean; locked?: boolean }

/**
 * 4.11 — search runs on the server against the pre-built TF·IDF index, but the
 * result list is cached in this browser so the same query works with no signal.
 */
export function SearchClient({ initial }: { initial: string }) {
  const [q, setQ] = useState(initial)
  const [hits, setHits] = useState<Hit[]>([])
  const [note, setNote] = useState<string | null>(null)
  const [scope, setScope] = useState<number | null>(null)
  const [busy, setBusy] = useState(false)
  const [offline, setOffline] = useState(false)
  const box = useRef<HTMLInputElement>(null)

  useEffect(() => { box.current?.focus() }, [])
  useEffect(() => {
    if (!q.trim()) { setHits([]); setNote(null); return }
    const cached = readCache(q)
    if (cached) { setHits(cached.hits); setScope(cached.scope ?? null); setOffline(true) }
    const ac = new AbortController()
    const t = setTimeout(async () => {
      setBusy(true)
      try {
        const r = await request<{ hits: Hit[]; note?: string; scope?: number }>(`/api/search?q=${encodeURIComponent(q)}`, { signal: ac.signal })
        setHits(r.hits ?? []); setNote(r.note ?? null); setScope(r.scope ?? null); setOffline(false)
        writeCache(q, r.hits ?? [], r.scope ?? 0)
      } catch (e: any) {
        if (e?.name === 'AbortError') return
        setNote(cached ? 'Showing the copy saved on this device — no signal.' : e?.message || 'Search needs a connection.')
      } finally { setBusy(false) }
    }, 260)
    return () => { clearTimeout(t); ac.abort() }
  }, [q])

  const grouped = new Map<string, Hit[]>()
  for (const h of hits) {
    const list = grouped.get(h.course) ?? []
    list.push(h)
    grouped.set(h.course, list)
  }

  return (
    <div className="mx-auto max-w-reading pb-8">
      <header>
        <h1 className="text-2xl font-bold tracking-snugish text-ink sm:text-3xl dark:text-light">Search all 16 courses</h1>
        <p className="mt-2.5 text-[0.9375rem] text-ink-600 dark:text-light/75">Type any topic, tool or word (like Excel, phishing, flyer, JavaScript) to jump straight to the exact level that teaches it.</p>
      </header>
      <form role="search" className="mt-7" onSubmit={e => e.preventDefault()}>
        <label className="sr-only" htmlFor="q">Search</label>
        <div className="relative">
          <input
            ref={box} id="q" value={q} onChange={e => setQ(e.target.value)} placeholder="e.g. pivot table, phishing, gutter, invoice…"
            autoComplete="off"
            className="min-h-[48px] w-full rounded-card border border-surface-line bg-surface px-4 pr-20 text-base text-ink outline-none transition-colors placeholder:text-ink-400 focus:border-navy dark:border-surface-dark-line dark:bg-surface-dark dark:text-light dark:placeholder:text-light/40 dark:focus:border-sky"
          />
          {busy && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ink-500 dark:text-light/55">…</span>}
          {!busy && q && <button type="button" onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 px-1 text-[0.8125rem] text-ink-500 underline underline-offset-2 hover:text-ink dark:text-light/55">clear</button>}
        </div>
      </form>

      {q.trim().length > 0 && q.trim().length < 2 && <p className="mt-3 text-[0.875rem] text-ink-500 dark:text-light/55">Two characters minimum.</p>}
      {note && <p className="mt-3 text-[0.875rem] text-ink-500 dark:text-light/55">{note}</p>}
      {offline && <p className="mt-3"><Pill tone="warn">cached results</Pill></p>}

      {hits.length > 0 && (
        <ul className="mt-8 space-y-7">
          {[...grouped.entries()].map(([slug, list]) => (
            <li key={slug}>
              <h2 className="border-b border-surface-line pb-2 text-[0.875rem] font-medium text-ink-500 dark:border-surface-dark-line dark:text-light/55">
                <Link href={`/courses/${slug}`} className="underline-offset-2 hover:text-ink hover:underline dark:hover:text-light">{list[0].courseTitle}</Link>
              </h2>
              <ul className="divide-y divide-surface-line dark:divide-surface-dark-line">
                {list.map(h => (
                  <li key={`${h.course}-${h.sessionNumber}`}>
                    <Link href={`/learn/${h.course}/${h.sessionNumber}`} className={cx('-mx-2 flex items-start justify-between gap-4 rounded-card px-2 py-3.5 transition-colors hover:bg-surface-muted/70', h.locked && 'opacity-70')}>
                      <span className="min-w-0">
                        <span className="block text-[0.9375rem] font-medium leading-snug text-ink dark:text-light">Level {h.sessionNumber} — {h.title}</span>
                        <span className="mt-1 block text-[0.8125rem] text-ink-500 dark:text-light/50">{h.free ? 'Free level — open it now' : 'Your level'}</span>
                      </span>
                      {h.locked ? <Pill tone="muted" className="mt-1 shrink-0">locked</Pill> : h.free ? <Pill tone="success" className="mt-1 shrink-0">free</Pill> : null}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
      <AdSlot placement="search-results" variant="card" />
      {q.trim() && !hits.length && !busy && (
        <p className="mt-10 py-6 text-center text-[0.9375rem] text-ink-500 dark:text-light/55">
          No level matches “{q}” in what you can open. <Link className="font-medium text-navy underline underline-offset-2 dark:text-sky" href="/courses">Browse the catalogue</Link> to open more.
        </p>
      )}
    </div>
  )
}

const KEY = 'cea:search'
function readCache(q: string): { hits: Hit[]; scope?: number } | null {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) || '{}')
    return all[q.toLowerCase()] ?? null
  } catch { return null }
}
function writeCache(q: string, hits: Hit[], scope: number) {
  try {
    const all = JSON.parse(localStorage.getItem(KEY) || '{}')
    all[q.toLowerCase()] = { hits, scope }
    localStorage.setItem(KEY, JSON.stringify(all))
  } catch { /* quota */ }
}
