#!/usr/bin/env node
/**
 * The bundle must not shrink silently (GATE 2, and CI step 7).
 *
 * Every number here is a claim the academy makes about its own courses: 16 of them, 141 levels,
 * a knowledge check in every level, close to a million words of lesson text. A parser change that
 * quietly loses a heading style, or a manual re-export that truncates a course, shows up as a
 * smaller total — and nothing else in the pipeline would notice, because each course still builds
 * and every page still renders. So the floor is asserted, in one place, before a deploy.
 *
 *   node tools/assert-bundle-size.mjs            # checks apps/web/.content
 *   CEA_CONTENT_DIR=/tmp/x node tools/assert-bundle-size.mjs
 */
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const ROOT = join(new URL('.', import.meta.url).pathname, '..')
const DIR = process.env.CEA_CONTENT_DIR || join(ROOT, 'apps/web/.content')

const FLOOR = {
  courses: 16,        // the 16 manuals in this repository, no more and no fewer
  sessions: 141,      // the total the course pages promise a learner
  questions: 900,     // extraction quality floor (the corpus currently yields 991)
  exercises: 400,     // §I/§J practice tasks (currently 422)
  scenarios: 141,     // one case study per level (currently exactly one)
  words: 800_000,     // lesson text a learner can actually read (currently ~938k)
}

const failures = []
const file = join(DIR, 'report.json')
if (!existsSync(file)) {
  console.error(`assert-bundle-size: no ${file.replace(ROOT + '/', '')} — run \`pnpm content:build\` first`)
  process.exit(2)
}
const report = JSON.parse(readFileSync(file, 'utf8'))
const totals = report.totals || {}

for (const [key, min] of Object.entries(FLOOR)) {
  const got = Number(totals[key] ?? 0)
  if (key === 'courses' || key === 'sessions' || key === 'scenarios') {
    if (got !== min) failures.push(`${key}: expected exactly ${min}, got ${got}`)
  } else if (got < min) {
    failures.push(`${key}: ${got} is below the floor of ${min}`)
  }
}

const summary = report.summary || {}
if (summary.critical) failures.push(`${summary.critical} critical lint issue(s) — the corpus gate is red`)

// Per-course sanity: a course that loses half its levels passes a global floor and fails a learner.
const index = JSON.parse(readFileSync(join(DIR, 'index.json'), 'utf8'))
for (const c of index.courses || []) {
  if (!c.sessionsCount || c.sessionsCount < 5) failures.push(`${c.slug}: only ${c.sessionsCount} levels`)
  if (c.feeNgn === null || c.feeNgn === undefined) failures.push(`${c.slug}: no fee, so the paywall has no number`)
  if (!c.duration) failures.push(`${c.slug}: no duration to show in the catalogue`)
}

if (failures.length) {
  console.error(`assert-bundle-size: FAILED (${failures.length})`)
  for (const f of failures) console.error('  ✗ ' + f)
  console.error('\nIf the corpus genuinely changed size, update FLOOR here *and* PART B of the README — the two must not drift.')
  process.exit(1)
}
console.log(`✓ ${totals.courses} courses · ${totals.sessions} levels · ${totals.questions.toLocaleString('en-NG')} questions · `
  + `${totals.exercises} exercises · ${totals.scenarios} case studies · ${totals.words.toLocaleString('en-NG')} words `
  + `· lint ${summary.critical || 0} critical / ${summary.warn || 0} warn`)
