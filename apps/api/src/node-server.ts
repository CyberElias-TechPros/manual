/**
 * Dev/preview entry for the API on plain Node (no Cloudflare account needed).
 * `pnpm --filter @cea/api dev` runs this; apps/web proxies /api/* to it in dev,
 * while production Next.js mounts the same app inside its own route handler.
 */
import { createApp } from './app.js'
import { createNodeEnv } from './node-env.js'
import { existsSync } from 'node:fs'
import { join } from 'node:path'

/** The monorepo root owns var/ (dev database) and apps/web/.content (bundle). */
function repoRoot(start: string): string {
  let dir = start
  for (let i = 0; i < 8; i++) {
    if (existsSync(join(dir, 'pnpm-workspace.yaml'))) return dir
    const up = join(dir, '..')
    if (up === dir) break
    dir = up
  }
  return start
}

const port = Number(process.env.PORT || 8787)
const env = await createNodeEnv({ root: process.env.CEA_ROOT || repoRoot(process.cwd()) })
const app = createApp()

const { serve } = await import('@hono/node-server')
serve({ fetch: (req: Request) => app.fetch(req, env), port, hostname: '0.0.0.0' }, (info: any) => {
  console.log(`CEA Learn API (node) → http://localhost:${info.port}/api/health`)
})
