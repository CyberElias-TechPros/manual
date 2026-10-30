#!/usr/bin/env node
/**
 * `pnpm dev` — the one command a new contributor runs (Phase 0.4).
 *
 * It does the three things that are easy to forget and produce a confusing first
 * run, then hands the terminal to Next:
 *   1. content bundle   → pnpm --filter @cea/content build   (skipped if fresh)
 *   2. images into public/assets
 *   3. the local sqlite DB migrated + seeded, so /dashboard is not empty
 *
 * Flags:
 *   --no-seed    start with an empty database
 *   --rebuild    force the content build even if the bundle looks current
 *   --api        also run the standalone Node API on :8787 (the Worker contract,
 *                for curl-ing the same endpoints the Worker will serve)
 */
import { spawn, spawnSync } from 'node:child_process'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const argv = process.argv.slice(2)
const flag = f => argv.includes(f)
const sh = process.platform === 'win32'

function run(cmd, args, opts = {}) {
  const r = spawnSync(sh ? `${cmd}.cmd` : cmd, args, { cwd: root, stdio: 'inherit', shell: sh, ...opts })
  return r.status ?? 1
}

const bundle = join(root, 'apps/web/.content/index.json')
function bundleStale() {
  if (!existsSync(bundle) || flag('--rebuild')) return true
  const stamp = statSync(bundle).mtimeMs
  // any course markdown newer than the bundle means the bundle is a lie
  const out = spawnSync('node', ['-e', `
    const { readdirSync, statSync, existsSync } = require('fs')
    const { join } = require('path')
    const root = ${JSON.stringify(root)}
    const stamp = ${stamp}
    let stale = false
    for (const dir of existsSync(join(root, 'content')) ? readdirSync(join(root, 'content')) : []) {
      const courses = join(root, 'content', dir)
      if (!statSync(courses).isDirectory()) continue
      for (const f of readdirSync(courses).filter(x => x.endsWith('.md'))) {
        if (statSync(join(courses, f)).mtimeMs > stamp) { stale = true; break }
      }
      if (stale) break
    }
    process.exit(stale ? 0 : 1)
  `], { encoding: 'utf8' })
  return out.status === 0
}

if (bundleStale()) {
  console.log('[dev] content bundle missing or stale → building')
  if (run('pnpm', ['--filter', '@cea/content', 'build']) !== 0) process.exit(1)
} else {
  console.log('[dev] content bundle is current')
}
run('node', ['tools/link-assets.mjs'])

if (!flag('--no-seed')) {
  const db = join(root, 'var/cea-learn.sqlite')
  const hasUsers = existsSync(db) && (() => {
    try { return readFileSync(db).includes('learner@cea.ng') } catch { return true }
  })()
  if (!hasUsers) {
    console.log('[dev] seeding the local database (admin@cea.ng / learner@cea.ng)')
    run('node', ['tools/seed.mjs'])
  }
}

const kids = []
const web = spawn(sh ? 'pnpm.cmd' : 'pnpm', ['--filter', '@cea/web', 'dev'], { cwd: root, stdio: 'inherit', shell: sh })
kids.push(web)
if (flag('--api')) {
  const api = spawn(sh ? 'pnpm.cmd' : 'pnpm', ['--filter', '@cea/api', 'dev'], { cwd: root, stdio: 'inherit', shell: sh })
  kids.push(api)
}
const stop = () => { for (const k of kids) k.kill('SIGTERM'); process.exit(0) }
process.on('SIGINT', stop)
process.on('SIGTERM', stop)
for (const k of kids) k.on('exit', code => { if (kids.length === 1) process.exit(code ?? 0) })
