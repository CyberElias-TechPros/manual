/**
 * Node runtime adapter (dev + preview + Vercel).
 *
 * The roadmap locks the backend to Cloudflare Workers + D1 + KV + R2 (A5). That
 * is what `worker.ts` ships. But the app must also run with `pnpm dev` on a
 * laptop in Port Harcourt, and CI must be able to integration-test the money
 * flow, so this file implements the *same* `CeaEnv` contract over:
 *   node:sqlite  -> D1          (identical prepared-statement surface)
 *   in-memory KV -> Workers KV  (rate limits, cache)
 *   ./var/upload -> R2          (payment proofs)
 *   ./var/mail   -> Resend      (every transactional email is written to disk)
 *
 * It is imported only by server code — never by the Worker bundle.
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, statSync, createReadStream } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { tmpdir } from 'node:os'
import type { CeaEnv, MailMessage, SqlDb, Stmt } from './lib.js'
import { memoryTtl } from './db.js'

type DB = any
let dbPromise: Promise<DB> | null = null

async function openSqlite(file: string): Promise<DB> {
  const { DatabaseSync } = await import(/* webpackIgnore: true */ 'node:sqlite')
  mkdirSync(dirname(file), { recursive: true })
  const db = new DatabaseSync(file)
  db.exec('PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;')
  return db
}

const clean = (v: unknown): unknown =>
  v === undefined || v === null ? null
    : typeof v === 'boolean' ? (v ? 1 : 0)
      : v instanceof Date ? v.toISOString()
        : typeof v === 'object' ? JSON.stringify(v)
          : v

function adapt(db: DB): SqlDb {
  return {
    prepare(sql: string): Stmt {
      const make = (bound: unknown[]): Stmt => {
        const stmt = db.prepare(sql)
        const fix = (row: any) => {
          if (!row || typeof row !== 'object') return row
          const out: any = {}
          for (const [k, v] of Object.entries(row)) out[k] = typeof v === 'bigint' ? Number(v) : v
          return out
        }
        const api: Stmt = {
          bind(...vals: unknown[]) { return make(vals.map(clean)) },
          async all<T>() { return { results: stmt.all(...bound).map(fix) as T[], success: true, meta: {} } },
          async first<T>(col?: string) {
            const r = fix(stmt.get(...bound))
            if (r == null) return null
            return (col ? r[col] : r) as T
          },
          async run<T>() {
            const r = stmt.run(...bound)
            return { meta: { changes: Number(r.changes), last_row_id: Number(r.lastInsertRowid) }, success: true } as any
          },
          async raw<T>() { return stmt.all(...bound).map(fix) as T },
        }
        return api
      }
      return make([])
    },
    async exec(sql: string) { db.exec(sql) },
  }
}

/** Storage over the local filesystem; keys look like R2 keys. */
function fsStorage(root: string, publicBase: string) {
  mkdirSync(join(root, 'uploads'), { recursive: true })
  return {
    root,
    path(key: string) { return join(root, 'uploads', key.replace(/[^a-zA-Z0-9._/-]/g, '_')) },
    async put(key: string, data: ArrayBuffer | Uint8Array) {
      const p = this.path(key)
      mkdirSync(dirname(p), { recursive: true })
      writeFileSync(p, Buffer.from(data instanceof Uint8Array ? data : new Uint8Array(data)))
    },
    async get(key: string) {
      const p = this.path(key)
      if (!existsSync(p)) return null
      const buf = readFileSync(p)
      return { body: new Uint8Array(buf), contentType: mimeOf(key) }
    },
    async delete(key: string) { const p = this.path(key); if (existsSync(p)) writeFileSync(p, '') },
    async url(key: string) { return `${publicBase}${key}` },
    async list(prefix = '') {
      const dir = join(root, 'uploads')
      if (!existsSync(dir)) return [] as { key: string; size: number }[]
      const walk = (d: string, base = ''): { key: string; size: number }[] => {
        const out: { key: string; size: number }[] = []
        for (const e of readdirSync(d, { withFileTypes: true })) {
          if (e.isDirectory()) out.push(...walk(join(d, e.name), `${base}${e.name}/`))
          else out.push({ key: `${base}${e.name}`, size: statSync(join(d, e.name)).size })
        }
        return out
      }
      return walk(dir).filter(f => f.key.startsWith(prefix))
    },
  }
}

const mimeOf = (key: string) =>
  /\.(png|jpe?g|webp|pdf)$/i.test(key)
    ? ({ '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.pdf': 'application/pdf' } as Record<string, string>)['.' + key.split('.').pop()!.toLowerCase()] || 'application/octet-stream'
    : 'application/octet-stream'

export interface NodeEnvOptions {
  root?: string
  publicUrl?: string
  jwt?: string
  env?: CeaEnv['ENV']
  contentDir?: string
  /** Where the .sql migrations live. Defaults to the monorepo's apps/api/migrations. */
  migrationsDir?: string
  /** Where the sqlite file goes. Defaults to <root>/var/cea-learn.sqlite. */
  sqlite?: string
}

export async function createNodeEnv(opts: NodeEnvOptions = {}): Promise<CeaEnv> {
  const root = resolve(opts.root || process.cwd())
  // Vercel/preview filesystems are read-only outside /tmp, so a deployed Node API
  // writes its scratch database there. Production traffic should be on the Worker
  // (D1); this only keeps a preview deploy from crashing on the first INSERT.
  const onVercel = !!process.env.VERCEL && !process.env.CEA_SQLITE
  // One canonical dev data dir for the whole monorepo: <repo>/var. Every entry
  // point (tools/dev.mjs, tools/seed.mjs, the Next server) resolves to it, so the
  // seed and the API can never disagree about which file they are opening.
  const varDir = [join(root, 'var'), join(root, '../var'), join(root, '../../var')].find(d => existsSync(d)) || (onVercel ? tmpdir() : join(root, 'var'))
  mkdirSync(varDir, { recursive: true })
  const dbFile = opts.sqlite || process.env.CEA_SQLITE || (onVercel ? join(tmpdir(), 'cea-learn-preview.sqlite') : join(varDir, 'cea-learn.sqlite'))
  if (!dbPromise) dbPromise = openSqlite(dbFile)
  const db = adapt(await dbPromise)

  // migrate once per process
  const migrationsDir = opts.migrationsDir || [
    join(root, 'migrations'),
    join(root, 'apps/api/migrations'),
    resolve(root, '../../apps/api/migrations'),
    resolve(root, '../apps/api/migrations'),
  ].find(d => existsSync(d)) || ''
  const hasMigrations = existsSync(migrationsDir)
  if (hasMigrations) {
    const tables = await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").all()
    if (!tables.results.length) {
      for (const f of readdirSync(migrationsDir).filter(x => x.endsWith('.sql')).sort()) {
        const sql = readFileSync(join(migrationsDir, f), 'utf8')
        for (const stmt of splitAll(sql)) await db.prepare(stmt).run()
      }
    }
  }

  const storage = fsStorage(varDir, '/api/uploads/')
  const mailRoot = join(varDir, 'mail')
  mkdirSync(mailRoot, { recursive: true })

  // The bundle is built once into apps/web/.content (so Next can ship it and the
  // API can read it). Find it whichever workspace the server was started from.
  const contentDir = opts.contentDir || [
    join(root, '.content'),
    join(root, 'apps/web/.content'),
    join(root, '../web/.content'),
    join(root, '../../apps/web/.content'),
  ].find(d => existsSync(join(d, 'index.json'))) || join(root, '.content')
  const contentSource = fsContentSource(contentDir)

  return {
    DB: db,
    KV: memoryTtl() as any,
    STORAGE: storage as any,
    MAIL: async (m: MailMessage) => {
      const file = join(mailRoot, `${Date.now()}-${m.to.replace(/[^a-z0-9]/gi, '_')}-${m.subject.slice(0, 24).replace(/[^a-z0-9]/gi, '_')}.html`)
      writeFileSync(file, `<meta charset="utf-8"><h2>${m.subject}</h2><p>To: ${m.to}</p><hr>${m.html}`)
      console.log(`[mail] ${m.to} · ${m.subject} → ${file.replace(root, '.')}`)
    },
    SECRETS: { jwt: opts.jwt || process.env.JWT_SECRET || 'cea-dev-secret-change-me-32-bytes-min', admin: process.env.ADMIN_KEY },
    PUBLIC_URL: opts.publicUrl || process.env.PUBLIC_URL || 'http://localhost:3000',
    ENV: opts.env || (process.env.NODE_ENV === 'production' ? 'production' : 'development'),
    CONTENT: contentSource,
  }
}

function splitAll(sql: string): string[] {
  const out: string[] = []
  let cur = ''
  let inStr: string | null = null
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i]
    if (inStr) { cur += ch; if (ch === inStr) inStr = null; continue }
    if (ch === "'" || ch === '"') { inStr = ch; cur += ch; continue }
    if (ch === '-' && sql[i + 1] === '-') { while (i < sql.length && sql[i] !== '\n') i++; continue }
    if (ch === ';') { if (cur.trim()) out.push(cur.trim()); cur = ''; continue }
    cur += ch
  }
  if (cur.trim()) out.push(cur.trim())
  return out
}

/**
 * Reads the generated bundle from disk. `apps/web/.content` is produced by
 * `pnpm content:build` (see packages/content). On Cloudflare the same five
 * objects are published to KV/R2 by `tools/publish-content.mjs` — see worker.ts,
 * which implements this identical interface.
 */
export function fsContentSource(dir: string) {
  const cache = new Map<string, { stamp: number; value: any }>()
  const readJson = (rel: string) => {
    const p = join(dir, rel)
    if (!existsSync(p)) return null
    const stamp = statSync(p).mtimeMs
    const hit = cache.get(rel)
    if (hit && hit.stamp === stamp) return hit.value
    let value: any = null
    try { value = JSON.parse(readFileSync(p, 'utf8')) } catch (e: any) { console.warn('[content] unreadable', rel, e.message) }
    cache.set(rel, { stamp, value })
    return value
  }
  return {
    async index() { return readJson('index.json') || { version: 0, generatedAt: '', totals: {}, courses: [] } },
    async course(slug: string) { return readJson(`courses/${safe(slug)}.json`) },
    async keys(slug: string) { return readJson(`keys/${safe(slug)}.json`) },
    async search(slug: string) { return readJson(`search/${safe(slug)}.json`) },
    async report() { return readJson('report.json') },
  }
}
const safe = (s: string) => String(s).replace(/[^a-z0-9-]/gi, '')

export { fsStorage, createReadStream }
