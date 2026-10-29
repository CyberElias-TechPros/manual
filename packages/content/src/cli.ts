#!/usr/bin/env tsx
/**
 * ROADMAP 2.13 — content pipeline CLI.
 *   build            parse + lint + emit the static bundle + D1 seed
 *   lint             lint only (--fail-on-critical for CI, 2.8 gate)
 *   watch            rebuild on markdown change (<10 s round-trip for authoring)
 *   stats            one-line totals, used by the CI log
 */
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { buildAll, CONTENT_DIR } from './build.js'
import { summarise } from './lint.js'

const args = process.argv.slice(2)
void existsSync
const cmd = args[0] || 'build'

function printReport(r: ReturnType<typeof buildAll>) {
  const s = r.summary
  console.log(`content: ${r.totals.courses} courses · ${r.totals.sessions} sessions · ${r.totals.cards ?? 0} cards · ${r.totals.microChecks ?? 0} quick-checks · ${r.totals.questions} questions · ` +
    `${r.totals.exercises} exercises · ${r.totals.scenarios} scenarios · ${(r.totals.words / 1000).toFixed(0)}k words`)
  console.log(`bundle: ${r.bundleKb} kB of learner JSON (course-split, lazy loaded)`)
  console.log(`lint: ${s.critical} critical · ${s.warn} warn · ${s.info} info`)
  if (s.byCode && Object.keys(s.byCode).length) {
    console.log('  ' + Object.entries(s.byCode).sort((a, b) => b[1] - a[1]).slice(0, 12).map(([k, v]) => `${k}=${v}`).join('  '))
  }
  const crit = r.issues.filter(i => i.level === 'critical').slice(0, 20)
  for (const c of crit) console.log(`  ✗ ${c.file} [${c.code}] ${c.message}`)
}

if (cmd === 'build' || cmd === 'lint') {
  const r = buildAll()
  printReport(r)
  if (args.includes('--fail-on-critical') && r.summary.critical > 0) {
    const path = join(r.outDir, 'report.json')
    if (existsSync(path)) console.log(`\nfull report: ${path.replace(process.cwd() + '/', '')}`)
    process.exit(1)
  }
} else if (cmd === 'stats') {
  const r = buildAll()
  console.log(JSON.stringify({ totals: r.totals, lint: summarise(r.issues) }))
} else if (cmd === 'watch') {
  const { watch } = await import('node:fs')
  let timer: ReturnType<typeof setTimeout> | null = null
  const run = () => { try { printReport(buildAll()) } catch (e: any) { console.error('build failed:', e.message) } }
  console.log(`watching ${CONTENT_DIR.replace(process.cwd() + '/', '')} … (2.13)`)
  run()
  watch(CONTENT_DIR, { recursive: true }, (_e, file) => {
    if (file && !/\.(md|json)$/.test(file)) return
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => { console.log(`\n↻ ${new Date().toLocaleTimeString()}`); run() }, 200)
  })
} else {
  console.log('usage: tsx src/cli.ts [build|lint|watch|stats] [--fail-on-critical]')
}
