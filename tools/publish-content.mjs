#!/usr/bin/env node
/**
 * Publish the built content bundle to the Worker's storage (ROADMAP 2.12 / 10.4).
 *
 * `apps/api` reads content through one interface with two sources: KV for the small,
 * every-request files (index, search, report) and R2 for the big per-course JSON
 * (learner payload + answer keys). Nothing is deployed by hand — the bundle in
 * `apps/web/.content/` is the artefact, this script is the only writer.
 *
 *   node tools/publish-content.mjs                  # build check, then upload for real
 *   node tools/publish-content.mjs --dry-run        # print the plan, touch nothing
 *   node tools/publish-content.mjs --local          # target `wrangler dev`'s local KV/R2
 *   node tools/publish-content.mjs --only courses   # one folder (courses|keys|search|index|report)
 *   node tools/publish-content.mjs --verify         # read every key back and compare bytes
 *
 * Answer keys go to R2 only: they are never cached at the edge, and the Worker is the
 * only reader (no route serves them) — see tools/leak-audit.mjs.
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = join(new URL('.', import.meta.url).pathname, '..')
const SRC = process.env.CEA_CONTENT_DIR || join(ROOT, 'apps/web/.content')
const args = process.argv.slice(2)
const has = (f) => args.includes(f)
const val = (name, dflt) => { const i = args.indexOf(name); return i >= 0 && args[i + 1] ? args[i + 1] : dflt }

const BUCKET = val('--bucket', 'cea-learn-content')
const KV_BINDING = val('--kv-binding', 'CONTENT_KV')
const only = val('--only', null)?.split(',').map(s => s.trim()).filter(Boolean) ?? null

/** Which store each file lands in. KV is 25 MB/value and best for small hot reads. */
const PLAN = [
  { rel: 'index.json', key: 'content/index', kv: true, r2: true },
  { rel: 'report.json', key: 'content/report', kv: true, r2: true },
]
const KV_MAX = 20 * 1024 * 1024

function filesIn(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir, { withFileTypes: true }).flatMap(e => {
    const p = join(dir, e.name)
    if (e.isDirectory()) return filesIn(p)
    return e.name.endsWith('.json') ? [p] : []
  })
}
for (const folder of ['courses', 'keys', 'search']) {
  for (const f of filesIn(join(SRC, folder))) {
    const rel = relative(SRC, f).replace(/\.json$/, '')
    const big = statSync(f).size > KV_MAX
    PLAN.push({ rel: relative(SRC, f), key: `content/${rel}`, kv: !big, r2: true, file: f })
  }
}
for (const p of PLAN) if (!p.file) p.file = join(SRC, p.rel)
const selected = only ? PLAN.filter(p => only.some(o => p.rel === `${o}.json` || p.rel.startsWith(`${o}/`))) : PLAN

if (!existsSync(join(SRC, 'index.json'))) {
  console.error(`No bundle at ${SRC.replace(ROOT + '/', '')} — run \`pnpm content:build\` first.`)
  process.exit(2)
}
if (!selected.length) { console.error('Nothing selected (check --only).'); process.exit(2) }

const dryRun = has('--dry-run')
const wrangler = has('--local') ? ['--local'] : []
const run = (argv) => {
  if (dryRun) return { ok: true, out: '' }
  const r = spawnSync('npx', ['wrangler', ...argv], { cwd: ROOT, encoding: 'utf8' })
  return { ok: r.status === 0, out: (r.stdout || '') + (r.stderr || '') }
}

const bytes = selected.reduce((n, p) => n + statSync(p.file).size, 0)
console.log(`${dryRun ? '[dry-run] would publish' : 'publishing'} ${selected.length} files · ${(bytes / 1024 / 1024).toFixed(1)} MB`)
console.log(`  source  ${relative(ROOT, SRC)}`)
console.log(`  R2      ${BUCKET}`)
console.log(`  KV      binding ${KV_BINDING}${has('--local') ? ' (local)' : ''}`)

let failed = 0
for (const p of selected) {
  const size = Buffer.byteLength(readFileSync(p.file, 'utf8'))
  const a = []
  if (p.kv) {
    const r = run(['kv:key', 'put', '--binding', KV_BINDING, p.key, p.file, ...wrangler])
    if (!r.ok) { failed++; a.push(`KV ✗ ${r.out.split('\n').slice(0, 2).join(' ')}`) }
  }
  const r2 = run(['r2', 'object', 'put', `${BUCKET}/${p.key}`, `--file=${p.file}`, '--ct', 'application/json', ...wrangler])
  if (!r2.ok) { failed++; a.push(`R2 ✗ ${r2.out.split('\n').slice(0, 2).join(' ')}`) }
  console.log(`  ${failed && a.length ? '✗' : '✓'} ${p.key} · ${a.join(' · ') || `kv:${p.kv ? 'y' : 'n'} r2:y`}`)
  if (has('--verify') && !dryRun) {
    const back = run(['r2', 'object', 'get', `${BUCKET}/${p.key}`, `--file=${join(ROOT, '.cea-verify-tmp')}`, ...wrangler])
    const same = back.ok && readFileSync(join(ROOT, '.cea-verify-tmp'), 'utf8') === text
    console.log(`     verify ${same ? '✓ identical' : '✗ mismatch'}`)
    if (!same) failed++
  }
}
if (dryRun) {
  console.log('\nNothing was written (dry run). Drop --dry-run to publish.')
  process.exit(0)
}
console.log(failed ? `\n✗ ${failed} key(s) failed — the Worker will serve stale or empty content until they succeed.`
  : `\n✓ published to ${BUCKET} and KV (${KV_BINDING}). The Worker reads KV first, so new content is live on the next request.`)
process.exit(failed ? 1 : 0)
