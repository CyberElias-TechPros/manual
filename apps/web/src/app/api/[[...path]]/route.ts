/**
 * The API, mounted inside Next (Phase 3.1 + the Vercel half of the topology).
 *
 * Same Hono app the Cloudflare Worker runs, same D1-shaped contract — only the
 * adapter differs (apps/api/src/node-env.ts). That is what keeps "preview and
 * production share one API surface" honest: there is literally one route table.
 */
import type { NextRequest } from 'next/server'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { createApp } from '@cea/api/app'
import { createNodeEnv, type NodeEnvOptions } from '@cea/api/node-env'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/** dev/preview run from apps/web; var/ and the bundle live at the repo root. */
function root(): string {
  const cwd = process.cwd()
  return existsSync(join(cwd, 'pnpm-workspace.yaml')) ? cwd : join(cwd, '..', '..')
}

let ready: Promise<any> | null = null
function env() {
  if (!ready) {
    // Only the root and the public URL are decided here. Migrations
    // (apps/api/migrations), the content bundle (apps/web/.content), var/ and the
    // sqlite file are resolved by createNodeEnv from that root, so the dev server,
    // `tools/seed.mjs` and the Worker point at the same data.
    const opts: NodeEnvOptions = {
      root: root(),
      publicUrl: process.env.NEXT_PUBLIC_URL || process.env.PUBLIC_URL,
      env: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    }
    ready = createNodeEnv(opts)
  }
  return ready
}

const app = createApp()

async function handle(req: NextRequest) {
  const env0 = await env()
  return app.fetch(req, env0)
}

export { handle as GET, handle as POST, handle as PUT, handle as PATCH, handle as DELETE }
export async function HEAD(req: NextRequest) { return handle(req) }
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: { allow: 'GET,HEAD,POST,PUT,PATCH,DELETE,OPTIONS' } })
}
