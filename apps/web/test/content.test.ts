import { describe, expect, it } from 'vitest'
import { blurb, bundleExists, course, courseList, findCourse, index, sessionAt } from '../src/lib/content'

/**
 * The server reader for the built bundle (apps/web/.content). These assertions are the
 * contract every page in apps/web depends on, and the one security rule the reader exists
 * to enforce: the bundle it hands to a page is the *learner* copy.
 *
 * Run after `pnpm content:build` (the `test` script does exactly that order).
 */
describe('content bundle', () => {
  it('is present and complete', () => {
    expect(bundleExists()).toBe(true)
    const idx = index()
    expect(idx.courses).toHaveLength(16)
    expect(idx.totals.sessions).toBe(141)
    expect(idx.totals.questions).toBeGreaterThan(900)
  })

  it('gives every course a blurb, a fee and a certificate promise', () => {
    for (const c of index().courses) {
      expect(blurb(c).length, c.slug).toBeGreaterThan(12)
      expect(c.feeNgn, c.slug).toBeGreaterThan(0)
      expect(c.certificate, c.slug).toBe(true)
      expect(c.certificateName, c.slug).toContain(c.displayTitle)
      expect(Array.isArray(c.tools), c.slug).toBe(true)
      expect(Array.isArray(c.audience), c.slug).toBe(true)
    }
  })

  it('lists courses by name, so a rebuild never reshuffles the catalogue', () => {
    const names = courseList().map(c => c.name)
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)))
  })

  it('marks level 1 free and everything above it locked', () => {
    const free = sessionAt('microsoft-office', 1)
    expect(free?.session.isFree).toBe(true)
    expect(free?.session.quiz.questions.length).toBeGreaterThan(2)
    const paid = sessionAt('microsoft-office', 4)
    expect(paid?.session.isFree).toBe(false)
    // only a free level may be inlined into HTML (page.tsx), so this flag is the whole gate
    for (const c of index().courses) {
      const ones = c.sessions?.filter(s => s.isFree).map(s => s.number) ?? []
      expect(ones, c.slug).toEqual([1])
    }
  })

  it('resolves a course by slug for the detail page and the 404 path', () => {
    expect(findCourse('microsoft-office')?.sessionsCount).toBe(9)
    expect(findCourse('not-a-course')).toBeNull()
  })

  it('refuses to read a path it was not given', () => {
    expect(course('../../package')).toBeNull()
    expect(sessionAt('../..', 1)).toBeNull()
    expect(course('nope-not-here')).toBeNull()
  })
})
