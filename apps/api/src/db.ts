/**
 * D1 / SQLite plumbing. No Node APIs in this file — it is imported by the
 * Cloudflare Worker as well as by the Next.js server, so it must stay runtime-free.
 */
import type { SqlDb, Stmt } from './lib.js'

/** Wraps a Cloudflare D1Database into the same shape as the node:sqlite adapter. */
/**
 * Cloudflare's D1 binding is structurally the same as our `SqlDb` (it *is* the
 * same interface the Worker gets), so the adapter only has to add `exec`, which
 * D1 lacks and which migrations need.
 */
export function d1(db: SqlDb): SqlDb {
  return {
    prepare(sql: string) { return db.prepare(sql) as unknown as Stmt },
    async exec(sql: string) {
      for (const s of splitStatements(sql)) await db.prepare(s).run()
    },
  }
}

/** Split a script into statements without breaking on semicolons inside strings. */
export function splitStatements(sql: string): string[] {
  const out: string[] = []
  let cur = ''
  let inStr: string | null = null
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i]
    if (inStr) {
      cur += ch
      if (ch === inStr) {
        if (sql[i + 1] === inStr) { cur += sql[++i]; continue }
        inStr = null
      }
      continue
    }
    if (ch === "'" || ch === '"' || ch === '`') { inStr = ch; cur += ch; continue }
    if (ch === '-' && sql[i + 1] === '-') { while (i < sql.length && sql[i] !== '\n') i++; cur += '\n'; continue }
    if (ch === ';') { if (cur.trim()) out.push(cur.trim()); cur = ''; continue }
    cur += ch
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

export async function migrate(db: SqlDb, script: string): Promise<{ statements: number }> {
  let n = 0
  for (const stmt of splitStatements(script)) { await db.prepare(stmt).run(); n++ }
  return { statements: n }
}

/** Tiny KV shim with the same surface as Workers KV (dev + tests). */
export function memoryTtl(maxEntries = 5000) {
  const map = new Map<string, { v: string; exp: number }>()
  const sweep = () => {
    const now = Date.now()
    for (const [k, e] of map) if (e.exp && e.exp < now) map.delete(k)
    if (map.size > maxEntries) for (const k of [...map.keys()].slice(0, map.size - maxEntries)) map.delete(k)
  }
  return {
    async get<T = string>(k: string): Promise<T | null> {
      sweep()
      const e = map.get(k)
      if (!e) return null
      if (e.exp && e.exp < Date.now()) { map.delete(k); return null }
      return e.v as T
    },
    async put(k: string, v: string, opts?: { expirationTtl?: number }) {
      sweep()
      map.set(k, { v, exp: opts?.expirationTtl ? Date.now() + opts.expirationTtl * 1000 : 0 })
    },
    async delete(k: string) { map.delete(k) },
    _size: () => map.size,
  }
}

/** Cache-aside helper used by the leaderboard + catalogue (9.4). */
export async function cached<T>(kv: { get(k: string): Promise<string | null>; put(k: string, v: string, o?: { expirationTtl?: number }): Promise<void> }, key: string, ttl: number, fn: () => Promise<T>): Promise<T> {
  const hit = await kv.get(key)
  if (hit) { try { return JSON.parse(hit) as T } catch { /* fall through */ } }
  const v = await fn()
  await kv.put(key, JSON.stringify(v), { expirationTtl: ttl })
  return v
}
