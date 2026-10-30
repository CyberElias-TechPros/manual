/**
 * The single Hono app. Both runtimes mount this identical tree:
 *   • apps/web/app/api/[[...path]]/route.ts  → Node (Next.js server) via createNodeEnv
 *   • apps/api/src/worker.ts                 → Cloudflare Worker via D1/KV/R2/Resend
 *
 * Keeping it in one function is what makes "same API on both hosts" true instead
 * of aspirational — the README asks for a shared code path (A5, 3.1) but never
 * says how, so this is the gap fix: no duplicated route file per runtime.
 */
import { Hono } from 'hono'
import type { CeaEnv } from './lib.js'
import { ApiError, csrfPair, CSRF_COOKIE, readCookie, SESSION_COOKIE } from './lib.js'
import { middleware, authRoutes, learnRoutes } from './routes.js'
import { paymentRoutes, adminRoutes } from './money.js'

export type AppEnv = { Bindings: CeaEnv; Variables: { user: any } }

export function createApp() {
  const app = new Hono<AppEnv>()

  // request-scoped user lookup + CSRF (3.8).
  middleware(app as unknown as Hono<any, any, any>)

  // 9.4/10.3 — the API is same-origin for the PWA, so this only widens it for a
  // future subdomain, and keeps every dynamic response out of shared caches.
  app.use('/api/*', async (c, next) => {
    await next()
    const origin = c.req.header('origin')
    if (origin && /^(https?:\/\/)?(localhost|\W*\.(cea\.ng|e2b\.app))/.test(origin)) {
      c.res.headers.set('Access-Control-Allow-Origin', origin)
      c.res.headers.set('Vary', 'Origin')
    }
    c.res.headers.set('Cache-Control', 'no-store')
    c.res.headers.set('X-Content-Type-Options', 'nosniff')
    c.res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  })

  app.get('/api/health', async (c) => {
    const t = Date.now()
    const row = await c.env.DB.prepare('SELECT 1 AS ok').first<{ ok: number }>().catch(() => null)
    return c.json({
      ok: !!row,
      db: row ? 'up' : 'down',
      env: c.env.ENV,
      ms: Date.now() - t,
      content: (await c.env.CONTENT.index().catch(() => null))?.generatedAt ?? null,
    })
  })

  // CSRF bootstrap: every page load can read this token and send it back on POSTs (3.8).
  app.get('/api/csrf', (c) => {
    const token = csrfPair(c as any)
    const res = c.json({ ok: true, token })
    const secure = !['localhost', '127.0.0.1', '[::1]'].includes(safeHost(c.req.url))
    res.headers.append('set-cookie', `${CSRF_COOKIE}=${token}; Path=/; SameSite=Lax; Max-Age=${86400 * 30}${secure ? '; Secure' : ''}`)
    return res
  })

  app.route('/api/auth', authRoutes() as any)
  app.route('/api', learnRoutes() as any)
  app.route('/api', paymentRoutes() as any)
  app.route('/api/admin', adminRoutes() as any)

  app.notFound((c) => c.json({ ok: false, error: 'No such endpoint.', code: 'not_found' }, 404))
  app.onError((err, c) => {
    if (err instanceof ApiError) {
      return c.json({ ok: false, error: err.message, code: err.code, ...err.extra }, err.status as any)
    }
    // Never leak a stack trace to a learner's phone; log it for us instead.
    console.error('[api] unhandled', err)
    return c.json({ ok: false, error: 'Something went wrong on our side. Please try again.', code: 'server_error' }, 500)
  })

  return app
}

function safeHost(url: string) {
  try { return new URL(url).hostname } catch { return 'localhost' }
}

/** Re-exported so the Next.js route handler can reuse the same cookie contract. */
export { SESSION_COOKIE, readCookie }
