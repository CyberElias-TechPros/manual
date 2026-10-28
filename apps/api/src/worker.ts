/**
 * Cloudflare Worker entry — the production API runtime (3.1).
 *
 * Bindings (see wrangler.toml): D1 = data, KV = rate limits + small content,
 * R2 = the big content payloads and payment proof uploads. Secrets come from
 * `wrangler secret put`, never from the repo.
 */
import { createApp } from './app.js'
import type { CeaEnv, KvLike, MailMessage, SqlDb, StorageLike } from './lib.js'

interface D1Like {
  prepare(sql: string): {
    bind(...values: unknown[]): { all(): Promise<{ results: any[]; success: boolean }>; first(): Promise<any>; run(): Promise<any>; raw(): Promise<any[]> }
    all(): Promise<{ results: any[] }>
    first(): Promise<any>
    run(): Promise<any>
  }
  batch?(stmts: unknown[]): Promise<any[]>
}
interface KVLike {
  get(key: string, type?: 'text'): Promise<string | null>
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>
  delete(key: string): Promise<void>
}
interface R2Like {
  get(key: string): Promise<{ body: ReadableStream; httpMetadata?: { contentType?: string } } | null>
  delete?(key: string): Promise<void>
  put(key: string, value: ArrayBuffer | Uint8Array | string, opts?: { httpMetadata?: { contentType?: string } }): Promise<unknown>
  list(opts?: { prefix?: string; limit?: number }): Promise<{ objects?: { key: string }[] }>
}

export interface Env {
  DB: D1Like
  KV: KVLike
  CONTENT_KV?: KVLike
  STORAGE: R2Like
  RESEND_API_KEY?: string
  MAIL_FROM?: string
  JWT_SECRET: string
  ADMIN_KEY?: string
  PUBLIC_URL?: string
  APP_ENV?: string
  CONTENT_R2?: R2Like
  CRON_PATH?: string
}

const toSql = (db: D1Like): SqlDb => ({
  prepare(sql: string) {
    const stmt = db.prepare(sql)
    const wrap = (bound: any) => ({
      bind: (...values: unknown[]) => wrap(bound.bind(...values)),
      all: async () => ({ results: (await bound.all()).results as any[], success: true, meta: {} }),
      first: async (col?: string) => {
        const row = await bound.first()
        if (!row) return null
        return col ? row[col] : row
      },
      run: async () => ({ meta: {}, success: true }),
      raw: async () => bound.raw(),
    })
    return wrap(stmt) as any
  },
})

const toKv = (kv: KVLike): KvLike => ({
  async get<T = string>(key: string) { return ((await kv.get(key)) ?? null) as T | null },
  async put(key, value, opts) { await kv.put(key, value, opts) },
  async delete(key) { await kv.delete(key) },
})

const toStorage = (r2: R2Like, publicUrl: string): StorageLike => ({
  async put(key, value, ct) {
    const bytes = typeof value === 'string' ? new TextEncoder().encode(value) : value
    await r2.put(key, bytes, { httpMetadata: { contentType: ct } })
  },
  // Payment proofs are small (<5 MB) and access-checked in /api/uploads/:key, so we
  // read them fully rather than streaming: no signed URL, no public bucket.
  async get(key) {
    const obj = await r2.get(key)
    if (!obj) return null
    return { body: new Uint8Array(await new Response(obj.body as any).arrayBuffer()), contentType: obj.httpMetadata?.contentType || 'application/octet-stream' }
  },
  async delete(key) { await (r2 as any).delete?.(key) },
  async url(key) { return `${publicUrl.replace(/\/$/, '')}/api/uploads/${key}` },
})

/**
 * Content is *published* as static JSON (pnpm content:build → tools/publish-content.mjs),
 * so this reads KV first (cheap, edge-local) and falls back to R2 for the big
 * course/answer-key bundles. Same interface as the Node fs source, so no route
 * code knows which runtime it is in.
 */
function workerContent(kv: KVLike | undefined, r2: R2Like | undefined) {
  const readJson = async (key: string): Promise<any | null> => {
    if (kv) { const t = await kv.get(key); if (t) { try { return JSON.parse(t) } catch { /* fall through to R2 */ } } }
    if (r2) {
      const obj = await r2.get(key)
      if (obj) { try { return JSON.parse(await new Response(obj.body).text()) } catch { return null } }
    }
    return null
  }
  return {
    async index() { return (await readJson('content/index')) ?? { version: 0, generatedAt: '', totals: {}, courses: [] } },
    async course(slug: string) { return readJson(`content/courses/${safe(slug)}`) },
    async keys(slug: string) { return readJson(`content/keys/${safe(slug)}`) },
    async search(slug: string) { return readJson(`content/search/${safe(slug)}`) },
    async report() { return readJson('content/report') },
  }
}
const safe = (s: string) => String(s).replace(/[^a-z0-9-]/gi, '')

function mailFor(env: Env): (m: MailMessage) => Promise<void> {
  if (!env.RESEND_API_KEY) {
    // Preview deploys and cron dry runs must not fail because mail is unconfigured (F-risk: "email provider down").
    return async (m) => { console.log(`[mail:skipped] ${m.to} · ${m.subject}`) }
  }
  return async (m) => {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: env.MAIL_FROM || 'CEA Learn <learn@cea.ng>',
        to: [m.to], subject: m.subject, html: m.html, text: m.text,
      }),
    })
    if (!res.ok) throw new Error(`resend ${res.status}: ${(await res.text()).slice(0, 200)}`)
  }
}

function toEnv(env: Env): CeaEnv {
  return {
    DB: toSql(env.DB),
    KV: toKv(env.KV),
    STORAGE: toStorage(env.STORAGE, env.PUBLIC_URL || 'https://cea.ng'),
    MAIL: mailFor(env),
    SECRETS: { jwt: env.JWT_SECRET, admin: env.ADMIN_KEY },
    PUBLIC_URL: env.PUBLIC_URL || 'https://cea.ng',
    ENV: (env.APP_ENV as CeaEnv['ENV']) || 'production',
    CONTENT: workerContent(env.CONTENT_KV ?? env.KV, env.CONTENT_R2 ?? env.STORAGE) as any,
  }
}

const app = createApp()

export default {
  fetch: (request: Request, env: Env, ctx: any) => app.fetch(request, toEnv(env), ctx),
  /** 5.7 streak warnings + weekly digest; wrangler `[triggers] cron`. */
  async scheduled(_event: { cron: string }, env: Env, ctx: any) {
    const url = new URL(env.CRON_PATH || '/api/admin/nudges/run?kind=both', env.PUBLIC_URL || 'https://cea.ng')
    const headers: Record<string, string> = {}
    if (env.ADMIN_KEY) headers['x-cea-admin-key'] = env.ADMIN_KEY
    // The cron only needs the work done, not the response — but a thrown error must
    // still surface in the Workers log, hence the explicit await inside waitUntil.
    ctx.waitUntil(Promise.resolve(app.fetch(new Request(url.toString(), { headers }), toEnv(env), ctx)).then(async (res: Response) => {
      if (res.status >= 400) console.error('[cron] nudges failed', res.status, (await res.text()).slice(0, 300))
    }))
  },
}
