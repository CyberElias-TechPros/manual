/**
 * Server-only reader for the built content bundle (apps/web/.content).
 *
 * The pages below render on the server, so they read the JSON from disk instead
 * of round-tripping through /api — that is the difference between 1 round trip
 * and 4 on a 3G connection, and it is why the bundle is committed as the source
 * of truth. The client never imports this file (it uses /api/*), which is also
 * how the answer keys stay off the browser: `keys/` is read here and in
 * apps/api only, and no route serves it.
 */
import { existsSync, readFileSync, statSync } from 'node:fs'
import { join } from 'node:path'

// The bundle is looked up relative to the *app*, not the process: `next dev`, `next start`
// and `next build` all run with cwd = apps/web, but anything else (vitest, a tools script,
// CI) may not — so walk the two layouts that exist and take the first hit.
const DIR = process.env.CEA_CONTENT_DIR || [
  join(process.cwd(), '.content'),
  join(process.cwd(), 'apps/web/.content'),
  join(process.cwd(), '..', 'apps/web/.content'),
  join(__dirname_rel(), '.content'),
].find(existsSync) || join(process.cwd(), '.content')

function __dirname_rel() {
  // used only as a last resort; the module lives in apps/web/src/lib
  return join(process.cwd(), 'apps/web/src/lib/../../..')
}
const cache = new Map<string, { at: number; value: unknown }>()

function read<T>(rel: string): T | null {
  const file = join(DIR, rel)
  if (!existsSync(file)) return null
  const at = statSync(file).mtimeMs
  const hit = cache.get(rel) as { at: number; value: T } | undefined
  if (hit && hit.at === at) return hit.value
  try {
    const value = JSON.parse(readFileSync(file, 'utf8')) as T
    cache.set(rel, { at, value })
    return value
  } catch {
    return null
  }
}

export interface CourseSessionRef {
  number: number; title: string; module?: string; isFree: boolean; isCapstone: boolean
}
/**
 * One entry of `index.json` — the whole `Course` object, so a card can be built without a
 * second request. `tagline`, `description`, `level`, `outcomes`, `prerequisites` and
 * `firstSessionFree` are derived by `pnpm content:build` (see Course in @cea/content/schema):
 * the manuals state outcomes per level, not per course, so the course's own words come from
 * the capstone level and the blurb from the problem the course was written to solve.
 */
export interface IndexCourse {
  slug: string; name: string; displayTitle: string
  tagline?: string; description?: string; level?: string
  category?: string; studyMode?: string; duration?: string
  weeks?: number; sessionsPerWeek?: number; sessionLengthMinutes?: number
  sessionsCount: number; feeNgn: number | null
  certificate?: boolean; certificateName?: string
  problem?: string; audience?: string[]; entryRequirements?: string[]
  tools?: string[]; prerequisites?: string[]
  outcomes?: string[]; firstSessionFree?: boolean
  accent?: string; cover?: string
  sessions?: CourseSessionRef[]
}

/** One line for a card: the manual's own problem statement, first sentence only. */
export function blurb(c: IndexCourse): string {
  if (c.tagline) return c.tagline
  const raw = (c.problem || '').replace(/\s+/g, ' ').trim()
  const first = raw ? (raw.split(/(?<=[.!?])\s/)[0] || raw) : ''
  if (!first) return `${c.sessionsCount} levels · ${c.studyMode || 'in-person'}`
  return first.length > 180 ? `${first.slice(0, 177).trimEnd()}…` : first
}
export interface ContentIndex { version: number; generatedAt: string; totals: Record<string, number>; courses: IndexCourse[] }

export function index(): ContentIndex {
  return read<ContentIndex>('index.json') ?? { version: 0, generatedAt: '', totals: {}, courses: [] }
}
export function course(slug: string): { course: any; sessions: any[] } | null {
  return read<{ course: any; sessions: any[] }>(`courses/${safe(slug)}.json`)
}
/** NEVER render this to a client component; it is the answer key. */
export function keys(slug: string): Record<string, any> {
  return read<Record<string, any>>(`keys/${safe(slug)}.json`) ?? {}
}
/**
 * One level, straight from the bundle. Only ever handed to the client for a **free**
 * level (see learn/[slug]/[n]/page.tsx): the paid gate is a database question, so a
 * paid level's text is never inlined into HTML an intermediary could cache — it goes
 * through /api, which is where access is checked.
 */
export function sessionAt(slug: string, n: number): { course: any; session: any } | null {
  const c = course(slug)
  if (!c) return null
  const session = c.sessions.find((s: any) => Number(s.number) === Number(n))
  return session ? { course: c.course, session } : null
}

export function report(): any {
  return read<any>('report.json')
}
export function bundleExists() {
  return existsSync(join(DIR, 'index.json'))
}
const safe = (s: string) => String(s).replace(/[^a-z0-9-]/gi, '')

export function courseList() {
  const idx = index()
  return [...idx.courses].sort((a, b) => a.name.localeCompare(b.name))
}
export function findCourse(slug: string) {
  return courseList().find(c => c.slug === slug) ?? null
}
export const categories = () => [...new Set(courseList().map(c => c.category || 'Other'))].sort()
