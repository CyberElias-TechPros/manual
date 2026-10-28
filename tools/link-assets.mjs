#!/usr/bin/env node
/**
 * Copies the extracted course images next to the built content bundle so both
 * runtimes can serve them:
 *   • apps/web/public/assets  → Next/Vercel static assets (hashed CDN, lazy)
 *   • the Worker gets them from R2 via tools/publish-content.mjs
 *
 * Why copy instead of symlink: `next build` only traces real files inside the
 * app, and a symlink to the repo root is not deployed. Copying also keeps the
 * learner-facing path stable (/assets/concepts/<slug>/session-NN.png), which is
 * what the build already wrote into the JSON.
 *
 * Only newer files are copied, so this is cheap enough to run on every dev start.
 */
import { cpSync, existsSync, mkdirSync, statSync, readdirSync } from 'node:fs'
import { join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const src = join(root, 'assets')
const dest = join(root, 'apps/web/public/assets')

if (!existsSync(src)) {
  console.log('[assets] no assets/ directory — run the PDF extractor first (pnpm content:extract)')
  process.exit(0)
}

let copied = 0, skipped = 0, bytes = 0
function walk(dir, rel = '') {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const abs = join(dir, entry.name)
    const r = join(rel, entry.name)
    if (entry.isDirectory()) { walk(abs, r); continue }
    const target = join(dest, r)
    const need = !existsSync(target) || statSync(target).mtimeMs < statSync(abs).mtimeMs
    if (!need) { skipped++; continue }
    mkdirSync(dirname(target), { recursive: true })
    cpSync(abs, target)
    copied++
    bytes += statSync(abs).size
  }
}
mkdirSync(dest, { recursive: true })
walk(src)
console.log(`[assets] ${copied} copied · ${skipped} unchanged → ${relative(root, dest)} (${(bytes / 1024 / 1024).toFixed(1)} MB new)`)
