import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { feedbackBody, LevelFeedback } from '../src/app/learn/[slug]/[n]/level-feedback'

/**
 * 11.2 — the stage bodies of a lesson are client-rendered by design (whether a level is open is a
 * database question), so the feedback line cannot be asserted by fetching HTML the way route-walk
 * asserts a page. Rendering the component is the honest way to pin its markup: the accessible name
 * rules the scanner checks, and the copy the tutors actually read.
 */
describe('level feedback (11.2)', () => {
  const html = renderToStaticMarkup(<LevelFeedback slug="microsoft-office" n={3} />)

  it('asks one question, in words a beginner answers', () => {
    expect(html).toContain('Was level 3 clear?')
    expect(html.match(/aria-pressed="false"/g)).toHaveLength(3)
    for (const label of ['It was clear', 'Partly clear', 'I got lost', 'Not now']) expect(html).toContain(label)
  })

  it('groups the three words and names the group, so a screen reader says what it is', () => {
    expect(html).toContain('role="group"')
    expect(html).toContain('aria-label="How clear was level 3?"')
  })

  it('withholds the note box until a word is chosen', () => {
    expect(html).not.toContain('<textarea')
    expect(html).not.toContain('<form')
  })

  it('tags the body so a hundred of these are scannable by a tutor', () => {
    expect(feedbackBody('lost', 4, '  the grid section  ')).toBe('[I got lost] level 4 — the grid section')
    expect(feedbackBody('clear', 1, '   ')).toBe('[It was clear] level 1')
    expect(feedbackBody('fuzzy', 9, '')).not.toMatch(/\s—\s$/)
  })
})
