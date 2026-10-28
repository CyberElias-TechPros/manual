/**
 * Shared runtime-agnostic plumbing for the CEA Learn API.
 *
 * The same Hono app runs in two places (ROADMAP A5/A6):
 *   • Cloudflare Worker  → D1 + KV + R2 (apps/api/worker.ts)
 *   • Next.js route handlers → node:sqlite + fs + console mail (dev/preview,
 *     and it is what Vercel runs when the Worker is not configured)
 * Everything the routes touch is injected through `CeaEnv`, so no route ever
 * needs to know which runtime it is in.
 */
import type { Hono } from 'hono'

// ---------------------------------------------------------------------------
// injected platform bindings
// ---------------------------------------------------------------------------

/** Structurally identical to Cloudflare's D1DatabaseStatement surface. */
export interface Stmt {
  bind(...values: unknown[]): Stmt
  all<T = any>(opts?: { columnNames?: string[] }): Promise<{ results: T[]; success: boolean; meta: any }>
  first<T = any>(col?: string): Promise<T | null>
  run<T = any>(): Promise<{ meta: any; success: boolean }>
  raw<T = any[]>(): Promise<T>
}
export interface SqlDb {
  prepare(sql: string): Stmt
  batch?(stmts: Stmt[]): Promise<any[]>
  exec?(sql: string): Promise<void>
}
export interface KvLike {
  get<T = string>(k: string): Promise<T | null>
  put(k: string, v: string, opts?: { expirationTtl?: number }): Promise<void>
  delete(k: string): Promise<void>
}
export interface StorageLike {
  put(key: string, data: ArrayBuffer | Uint8Array, contentType: string): Promise<void>
  get(key: string): Promise<{ body: ReadableStream | Uint8Array | null; contentType: string } | null>
  delete(key: string): Promise<void>
  /** R2 signed URL in prod; a guarded route in dev. */
  url(key: string, ttlSeconds: number): Promise<string>
}
export interface MailMessage { to: string; subject: string; html: string; text: string }
export type MailFn = (m: MailMessage) => Promise<void>

export interface CeaEnv {
  DB: SqlDb
  KV: KvLike
  STORAGE: StorageLike
  MAIL: MailFn
  SECRETS: { jwt: string; admin?: string }
  PUBLIC_URL: string
  ENV: 'development' | 'preview' | 'production'
  /** Content bundle access. `keys` (answer keys) is only ever read server-side. */
  CONTENT: ContentSource
}

export interface ContentSource {
  index(): Promise<{ version: number; totals: any; courses: any[]; generatedAt?: string }>
  course(slug: string): Promise<{ course: any; sessions: any[] } | null>
  /** SERVER ONLY — quiz answer keys, model answers, scenario solutions */
  keys(slug: string): Promise<Record<string, Record<string, any>> | null>
  search(slug: string): Promise<any | null>
  report(): Promise<any | null>
}

export interface EnvWithBindings { Bindings: CeaEnv; Variables: { user: AuthUser | null } }
export type App = Hono<any, any, any>

// ---------------------------------------------------------------------------
// crypto (WebCrypto only — argon2/bcrypt from the roadmap do not exist on
// Workers without a wasm build; PBKDF2-SHA256 at 210k iterations is the
// deviation, recorded in docs/ROADMAP.md item 3.2)
// ---------------------------------------------------------------------------

const enc = new TextEncoder()
const PBKDF2_ITERATIONS = 210_000

function b64url(buf: ArrayBuffer | Uint8Array): string {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf)
  let s = ''
  for (const b of bytes) s += String.fromCharCode(b)
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
function unb64url(s: string): Uint8Array {
  const t = s.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(t.padEnd(t.length + ((4 - (t.length % 4)) % 4), '='))
  const out = new Uint8Array(bin.length)
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i)
  return out
}

export function randomBytes(n = 24): string {
  const a = new Uint8Array(n)
  crypto.getRandomValues(a)
  return b64url(a)
}

export async function hashPassword(password: string, salt = randomBytes(16)): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: enc.encode(salt), iterations: PBKDF2_ITERATIONS, hash: 'SHA-256' },
    key, 256,
  )
  return `pbkdf2-sha256$${PBKDF2_ITERATIONS}$${salt}$${b64url(bits)}`
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [, iter, salt, digest] = stored.split('$')
  if (!salt || !digest) return false
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: enc.encode(salt), iterations: Number(iter) || PBKDF2_ITERATIONS, hash: 'SHA-256' },
    key, 256,
  )
  const a = unb64url(digest)
  const b = new Uint8Array(bits)
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i]
  return diff === 0
}

/** HS256 JWT — 40 lines instead of a dependency, and it works on Workers. */
export async function signJwt(payload: Record<string, unknown>, secret: string, ttlSeconds = 60 * 60 * 24 * 30): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const body = { ...payload, iat: now, exp: now + ttlSeconds }
  const h = b64url(enc.encode(JSON.stringify({ alg: 'HS256', typ: 'JWT' })))
  const p = b64url(enc.encode(JSON.stringify(body)))
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  const sig = b64url(await crypto.subtle.sign('HMAC', key, enc.encode(`${h}.${p}`)))
  return `${h}.${p}.${sig}`
}

export async function verifyJwt(token: string, secret: string): Promise<Record<string, any> | null> {
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify'])
  const ok = await crypto.subtle.verify('HMAC', key, unb64url(parts[2]) as unknown as BufferSource, enc.encode(`${parts[0]}.${parts[1]}`))
  if (!ok) return null
  try {
    const payload = JSON.parse(new TextDecoder().decode(unb64url(parts[1])))
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch { return null }
}

export const sha256hex = async (s: string) =>
  b64url(await crypto.subtle.digest('SHA-256', enc.encode(s)))

// ---------------------------------------------------------------------------
// validation (3.2 — Nigerian formats; the roadmap named it but never defined it)
// ---------------------------------------------------------------------------

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i
/** Local mobile: 08012345678 / +234 801 234 5678. Also accepts a landline area code. */
export const NG_PHONE_RE = /^(\+?234|0)[7-9][01]\d{8}$/
export const NG_NAIRA_RE = /^₦?\s?\d{1,3}(,\d{3})*(\.\d{1,2})?$/

export function normalizePhone(v: string): string | null {
  const digits = (v || '').replace(/[^\d+]/g, '')
  const local = digits.replace(/^\+?234/, '0')
  return NG_PHONE_RE.test(local) || NG_PHONE_RE.test(digits) ? local : null
}

export function passwordProblem(pw: string): string | null {
  if (!pw || pw.length < 10) return 'Use at least 10 characters — a phrase you can remember beats a symbol soup.'
  if (/^(.)\1+$/.test(pw)) return 'That is all one character.'
  if (/^\d+$/.test(pw)) return 'Numbers only is not enough — mix in letters.'
  if (/(1234|password|qwerty|admin|cea2026|iloveyou|letmein)/i.test(pw)) return 'That one is on the breached list. Pick something else.'
  return null
}

// ---------------------------------------------------------------------------
// http helpers: cookies, csrf, rate limiting, errors
// ---------------------------------------------------------------------------

export const SESSION_COOKIE = 'cea_session'
export const CSRF_COOKIE = 'cea_csrf'
export const SESSION_TTL_DAYS = 30

export function cookie(name: string, value: string, opts: { maxAge?: number; secure?: boolean; path?: string } = {}) {
  const bits = [`${name}=${value}`, 'Path=/', 'HttpOnly', `Max-Age=${opts.maxAge ?? SESSION_TTL_DAYS * 86400}`, 'SameSite=Lax']
  if (opts.secure !== false) bits.push('Secure')
  return bits.join('; ')
}

/**
 * 3.8 — double-submit CSRF. The browser keeps a *readable* cookie and every
 * mutating request must echo it back in `x-cea-csrf`; a cross-site form cannot
 * read the cookie, so it cannot forge the header. Idempotent: the same learner
 * keeps one token for the whole session.
 */
export function csrfPair(c: { req: { header(name: string): string | null | undefined } }): string {
  const existing = readCookie(c.req.header('cookie') ?? null, CSRF_COOKIE)
  if (existing && /^[A-Za-z0-9_-]{16,96}$/.test(existing)) return existing
  return randomBytes(18)
}

export function readCookie(header: string | null, name: string): string | null {
  if (!header) return null
  for (const part of header.split(/;\s*/)) {
    if (part.startsWith(`${name}=`)) return decodeURIComponent(part.slice(name.length + 1))
  }
  return null
}

export interface AuthUser {
  id: string; email: string; name: string; role: 'learner' | 'admin'; isGuest: boolean
  xp: number; streakCount: number; streakFreezes: number; lastActiveDate: string | null
  leaderboardOptIn: boolean; dataSaver: boolean; banned: boolean
}

/** KV counter, 60s window. Works in dev via the in-memory KV shim. */
export async function rateLimit(
  kv: KvLike, key: string, limit: number, windowSec = 60, env?: CeaEnv['ENV'],
): Promise<{ ok: boolean; remaining: number; retryAfter: number }> {
  // Same code path in every environment; only the threshold is relaxed in dev.
  limit = env === 'development' ? Math.max(limit * 20, 100) : limit
  const bucket = Math.floor(Date.now() / 1000 / windowSec)
  const k = `rl:${key}:${bucket}`
  const raw = await kv.get<string>(k)
  const n = Number(raw || 0) + 1
  await kv.put(k, String(n), { expirationTtl: windowSec * 2 })
  return { ok: n <= limit, remaining: Math.max(0, limit - n), retryAfter: (bucket + 1) * windowSec - Math.floor(Date.now() / 1000) }
}

export class ApiError extends Error {
  constructor(public status: number, message: string, public code = 'error', public extra: Record<string, unknown> = {}) { super(message) }
}
export const bad = (status: number, msg: string, code?: string, extra?: Record<string, unknown>) => new ApiError(status, msg, code, extra)

export function id(): string {
  return `${Date.now().toString(36)}${randomBytes(6)}`.replace(/[^a-z0-9]/gi, '').slice(0, 26)
}

/** unique, human-typable payment reference (7.2) — e.g. CEA-26W4KD-7F3Q */
export function paymentReference(): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  const chunk = (n: number) => Array.from(crypto.getRandomValues(new Uint8Array(n))).map(b => alphabet[b % alphabet.length]).join('')
  const y = new Date().toISOString().slice(2, 4)
  const m = 'JFMAMJJASOND'[new Date().getMonth()]
  return `CEA-${y}${m}${chunk(4)}-${chunk(4)}`
}
