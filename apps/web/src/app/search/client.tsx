'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Card, Chip, cx, request } from '@cea/ui'

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
    <div className="mx-auto max-w-3xl space-y-4">
      <header>
        <h1 className="text-2xl font-bold">Search the courses</h1>
        <p className="mt-1 text-sm text-ink/70 dark:text-light/70">Titles, outcomes and lesson text. Levels you cannot open yet appear without their content.</p>
      </header>
      <form role="search" onSubmit={e => e.preventDefault()}>
        <label className="sr-only" htmlFor="q">Search</label>
        <div className="relative">
          <input
            ref={box} id="q" value={q} onChange={e => setQ(e.target.value)} placeholder="e.g. pivot table, phishing, gutter, invoice…"
            autoComplete="off"
            className="min-h-[48px] w-full rounded-card border border-surface-line bg-surface px-4 pr-20 text-[16px] outline-none focus:border-navy dark:border-surface-dark-line dark:bg-surface-dark dark:focus:border-sky"
          />
          {busy && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-ink/55 dark:text-light/55">…</span>}
          {!busy && q && <button type="button" onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-pill px-2 py-1 text-xs underline">clear</button>}
        </div>
      </form>

      {q.trim().length > 0 && q.trim().length < 2 && <p className="text-sm text-warn">Two characters minimum.</p>}
      {note && <p className="text-sm text-ink/65 dark:text-light/65">{note}</p>}
      {offline && <Chip tone="warn">cached results</Chip>}

      {hits.length > 0 && (
        <ul className="space-y-4">
          {[...grouped.entries()].map(([slug, list]) => (
            <li key={slug}>
              <h2 className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-ink/60 dark:text-light/60">
                <Link href={`/courses/${slug}`} className="underline-offset-2 hover:underline normal-case">{list[0].courseTitle}</Link>
              </h2>
              <div className="space-y-2">
                {list.map(h => (
                  <Link key={`${h.course}-${h.sessionNumber}`} href={`/learn/${h.course}/${h.sessionNumber}`} className="block">
                    <Card className={cx('transition hover:shadow-glow', h.locked && 'opacity-70')}>
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="text-[15px] font-semibold">Level {h.sessionNumber} — {h.title}</h3>
                          <p className="mt-0.5 text-xs text-ink/60 dark:text-light/60">relevance {h.score}{h.free ? ' · free level' : ''}</p>
                        </div>
                        {h.locked ? <Chip tone="muted">locked</Chip> : h.free ? <Chip tone="success">free</Chip> : null}
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
      {q.trim() && !hits.length && !busy && (
        <Card className="text-center"><p className="text-sm">No level matches “{q}” in what you can open. <Link className="font-medium underline" href="/courses">Browse the catalogue</Link> to enrol in more.</p></Card>
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
