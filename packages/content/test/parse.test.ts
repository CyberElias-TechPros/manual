import { describe, expect, it } from 'vitest'
import { countWords, LETTER_KIND, normalizeCourse, parseSessionFile, scrubMojibake, tidyTitle } from '../src/parse.js'
import { buildQuiz } from '../src/interactives.js'

/**
 * Every assertion here exists because a real course manual broke it. The PDFs are the
 * source of truth for 141 levels, so the parser is only as good as the worst page in them.
 */
describe('section headings', () => {
  const md = [
    '---',
    '{"title":"Excel Basics","number":3}',
    '---',
    '## A. Session Identification',
    'Level 3 of 9.',
    '## F. Lecture — Cell References',
    'Use $ to lock a row.',
    'M. Knowledge Check',
    '1. What locks a column? $',
  ].join('\n')

  it('splits the manual letters the way the teaching manuals print them', () => {
    const s = parseSessionFile(md, 'content/x/session-03.md')
    expect(s.front.title).toBe('Excel Basics')
    expect(s.sections.map(x => x.letter)).toEqual(['A', 'F', 'M'])
    expect(s.sections[1].kind).toBe('lecture')
    expect(s.sections[1].raw).toContain('$ to lock a row')
  })

  it('falls back to the letter contract when no `<!-- kind: -->` marker survives the PDF', () => {
    const s = parseSessionFile(md, 'f')
    expect(s.sections[2].kind).toBe('knowledge_check')
    expect(LETTER_KIND.K).toBe('troubleshooting')
    expect(LETTER_KIND.O).toBe('instructor_notes')
  })

  it('recovers a bare letter heading, but only when the words say it is a section', () => {
    // web-design prints "F." + a title on the line below and lost the "##";
    // a bullet that merely starts with a letter must not be mistaken for one.
    const bare = ['## A. Session Identification', 'one', 'F. Lecture — the toolbar', 'two'].join('\n')
    expect(parseSessionFile(bare, 'f').sections.map(s => s.letter)).toEqual(['A', 'F'])
    const nope = ['## A. Session Identification', 'A. or B. are the options'].join('\n')
    expect(parseSessionFile(nope, 'f').sections).toHaveLength(1)
  })

  it('does not open a heading inside a code fence', () => {
    const fenced = ['## F. Lecture', '```', 'H. Guided Practice', '```', '## G. Demonstration', 'text'].join('\n')
    expect(parseSessionFile(fenced, 'f').sections.map(s => s.letter)).toEqual(['F', 'G'])
  })

  it('repairs the encoding damage before it can reach the learner text', () => {
    expect(scrubMojibake('click âœ“ to continue')).toBe('click ✓ to continue')
    expect(scrubMojibake('the â€œsafeâ€\u009d mode')).toBe('the “safe” mode')
    // An incomplete run is *not* guessed at: repairing half a character is how box-drawing
    // art and ⌘ sequences got mangled by the first version of this code.
    expect(scrubMojibake('A1:B9 │ total â€ mode')).toBe('A1:B9 │ total â€ mode')
    const ok = 'A1:B9 │ total ₦4,500 — a range'
    expect(scrubMojibake(ok)).toBe(ok)
  })

  it('survives a NUL byte splitting a broken run (the digital-marketing case)', () => {
    // One level's emoji came out of the PDF as "â<NUL>œ": the control byte both has to go
    // and has to go *first*, or the repair sees two orphan runs instead of one broken run.
    const nul = '## F. Lecture\npaste â\u0000œquotedâ\u0000œ text\n'
    const s = parseSessionFile(nul, 'f')
    const text = s.sections[0].raw
    expect(text).not.toContain('\u0000')
    expect(/[\u0080-\u009f]/.test(text)).toBe(false)
    expect(text).toContain('quoted')
  })

  it('titles are readable after the PDFâ€™s entity and hyphen damage', () => {
    expect(tidyTitle("Lecture &#39; setup - basics")).toBe("Lecture ' setup-basics")
  })
})

describe('quiz extraction', () => {
  it('reads the manual\'s own question layout: tag, stem, inline answer', () => {
    // verbatim shape from content/microsoft-office/session-01.md §M
    const md = [
      '## M. KNOWLEDGE CHECK (5 minutes)',
      '<!-- kind:knowledge_check -->',
      'Questions',
      '1. Multiple Choice: What does Ctrl+S do? a) Select all text b) Save the document c) Copy text d) Print',
      'Answer: b) Save the document',
      '2. Short Answer: What are the main parts of the Word interface?',
      'Answer: Title bar, Ribbon (with tabs), document area, status bar.',
    ].join('\n')
    const sec = parseSessionFile(md, 'f').sections[0]
    const { quiz, answerKey } = buildQuiz(sec as any, 'microsoft-office/1')
    expect(quiz.questions).toHaveLength(2)
    expect(quiz.questions[0].type).toBe('mcq')
    expect(quiz.questions[0].prompt).toBe('What does Ctrl+S do?')
    expect(quiz.questions[0].choices?.map(c => c.id)).toEqual(['a', 'b', 'c', 'd'])
    expect(answerKey[quiz.questions[0].id].correct).toEqual(['b'])
    expect(quiz.questions[1].type).toBe('short_answer')
    expect(quiz.questions[1].tagged).toBe('Short Answer')
    expect(answerKey[quiz.questions[1].id].modelAnswer).toContain('Ribbon')
  })

  it('treats an unanswerable question as unscored rather than guessing', () => {
    const md = '## M. Knowledge Check\n1. What did you find hardest today?\n(no answer key in the manual)'
    const { quiz, answerKey } = buildQuiz(parseSessionFile(md, 'f').sections[0] as any, 'x/2')
    expect(quiz.questions[0].type).toBe('short_answer')
    expect(quiz.questions[0].prompt).toContain('hardest')
    expect(answerKey[quiz.questions[0].id].modelAnswer).toBeFalsy()
  })
})

describe('course metadata normalisation', () => {
  it('never lets a table cell bleed into title, duration or certificate', () => {
    const c = normalizeCourse({
      slug: 'microsoft-office',
      name: 'Microsoft Office',
      display_title: 'Microsoft Office Course Category: Office & Data — Productivity Target Duration: 3 weeks (9 sessions × 105 minutes',
      duration: 'Key Skills',
      fee_ngn: 30000,
      sessions_count: 9,
    }, [])
    expect(c.displayTitle).toBe('Microsoft Office')
    expect(c.duration).toBe('9 sessions × 105 minutes')
    expect(c.certificate).toBe(true)
    expect(c.feeNgn).toBe(30000)
  })

  it('keeps list fields arrays, even when the PDF printed one blob', () => {
    const c = normalizeCourse({ slug: 'web-design', tools: 'VS Code, Figma\nCanva', audience: null }, [])
    // two fragments do not make a list; only a real enumeration is split
    expect(c.tools).toEqual(['VS Code, Figma', 'Canva'])
    expect(c.audience).toEqual([])
  })

  it('marks level 1 free and a capstone by its own words', () => {
    const c = normalizeCourse({
      slug: 'x', name: 'X',
      sessions: [{ number: 1, title: 'Identification & setup' }, { number: 4, title: 'Capstone showcase' }],
    }, [])
    expect(c.sessions[0].isFree).toBe(true)
    expect(c.sessions[1].isFree).toBe(false)
    expect(c.sessions[1].isCapstone).toBe(true)
  })

  it('counts every word the learner has to get through, listing included', () => {
    const prose = parseSessionFile(['## F. Lecture', 'Type 25 words a minute.'].join('\n'), 'f')
    const withCode = parseSessionFile(['## F. Lecture', 'Type 25 words a minute.', '```js', 'const total = sum(range)', '```'].join('\n'), 'f')
    expect(countWords(prose.sections[0])).toBe(4)
    expect(countWords(withCode.sections[0])).toBe(7)
  })
})
