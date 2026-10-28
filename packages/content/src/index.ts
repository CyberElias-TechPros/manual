/**
 * @cea/content — public surface.
 *
 * Server-side readers used by the Next app and by the Cloudflare Worker. The
 * learner bundle lives on disk / in R2 (2.10) and is read once per process.
 */
import { readFileSync } from 'node:fs'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { OUT_DIR } from './build.js'
import type { CatalogueIndex, Course, Session } from './schema.js'

export * from './schema.js'
export { normalizeCourse, parseSessionFile, mdToBlocks, parseInline, tidyTitle } from './parse.js'
export { buildQuiz, buildExercises, buildScenarios, buildFlashcards, buildTroubleshooting, buildChecklist, buildCodeBlanks, norm } from './interactives.js'
export { lintSession, summarise } from './lint.js'
export { buildAll, buildCourse, CONTENT_DIR, ASSETS_DIR, OUT_DIR, REPO } from './build.js'

const cache = new Map<string, any>()
function readJson(rel: string) {
  if (cache.has(rel)) return cache.get(rel)
  const p = join(OUT_DIR, rel)
  if (!existsSync(p)) throw new Error(`content bundle missing ${rel} — run \`pnpm content:build\` (${p})`)
  const v = JSON.parse(readFileSync(p, 'utf8'))
  cache.set(rel, v)
  return v
}

export function catalogue(): CatalogueIndex { return readJson('index.json') }
export function courseList(): Course[] { return catalogue().courses }
export function findCourse(slug: string): Course | undefined { return courseList().find(c => c.slug === slug) }
export function courseBundle(slug: string): { course: Course; sessions: Session[] } { return readJson(`courses/${slug}.json`) }
export function sessionData(slug: string, number: number): Session | undefined {
  const n = String(number).padStart(2, '0')
  return courseBundle(slug).sessions.find(s => s.number === number || s.id.endsWith(`session-${n}`))
}
/** SERVER ONLY — must never be serialized to a client component. */
export function answerKeys(slug: string): Record<string, any> { return readJson(`keys/${slug}.json`) }
export function searchIndex(slug: string) { return readJson(`search/${slug}.json`) }
export function contentReport() { return readJson('report.json') }
export function seedSql() { return readFileSync(join(OUT_DIR, 'seed.sql'), 'utf8') }
export function totals() { return catalogue().totals }
