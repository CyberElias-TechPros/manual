import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { REPO } from '../src/build.js'
import { expandAcronyms, glossaryFor, longSentenceShare, plainPass, plainPassIssues, sessionSource, simplify } from '../src/plain.js'

/**
 * The plain-English pass (11.x). These are the behaviours a learner would notice if they broke: a
 * command renamed into something that does not exist, an acronym expanded twice, or a hard word left
 * unexplained while the strip claims to be there.
 */
const SAMPLE = [
  '## Section A: How DNS works',
  '',
  'The DNS resolves a name. Prior to connecting, utilise the DNS settings and run `nslookup example.com`.',
  'Call `generate_report()` to produce the file. The DNS is already configured.',
  '',
  '```bash',
  'nslookup example.com   # the DNS here must stay untouched',
  'utilize this too',
  '```',
].join('\n')

describe('plain-English pass (11.x)', () => {
  it('swaps the hard word for the everyday one, in prose only', () => {
    const out = simplify('Prior to the test, utilize the tool to execute the query and obtain results.')
    expect(out).toBe('Before the test, use the tool to run the query and get results.')
  })

  it('leaves an identifier alone, because renaming it would teach a wrong command', () => {
    expect(simplify('Run generate_census_db() and execute_query() now.')).not.toMatch(/create|run /)
    expect(simplify('Run `generate the file` then obtain it.')).toContain('`generate the file`')
  })

  it('leaves code fences, headings and table rows alone', () => {
    const out = expandAcronyms(simplify(SAMPLE))
    expect(out).toContain('`nslookup example.com`')
    expect(out).toContain('# the DNS here must stay untouched')
    expect(out).toContain('utilize this too')            // inside a fence: untouched
    expect(out).toContain('## Section A: How DNS works')  // a heading is not prose
    expect(out).toMatch(/use the DNS settings/)           // the same word, in prose: swapped
    expect(out).toContain('`generate_report()`')
  })

  it('spells an acronym out once per level, and not where the manual already did it', () => {
    const out = expandAcronyms(SAMPLE)
    expect(out.match(/DNS \(/g)).toHaveLength(1)
    expect(out).toContain('DNS (the book that turns a name into a number)')
    // the fenced mention never counts as the first one
    expect(out.indexOf('DNS (')).toBeLessThan(out.indexOf('```'))
  })

  it('attaches only the hard words this level actually uses', () => {
    const terms = glossaryFor('A firewall filters traffic, and a backup keeps a second copy safe.')
    expect(terms.map(t => t.term)).toEqual(expect.arrayContaining(['firewall', 'backup']))
    expect(terms.some(t => t.term === 'ransomware')).toBe(false)
    expect(glossaryFor('nothing hard here at all', 12, [{ term: 'firewall', plain: 'rules about what may pass.' }])).toHaveLength(0)
  })

  it('caps the strip so a level never opens with a dictionary', () => {
    const text = plainPass().glossary.map(g => g.term).join(' and ')
    expect(glossaryFor(text, 12)).toHaveLength(12)
  })

  it('holds its own definitions to the same plain rule', () => {
    // the shipped table passes its own test ...
    expect(plainPassIssues(['firewalls, backups and queries']).filter(i => i.level === 'critical')).toEqual([])
    // ... and a table that breaks the rule is caught, which is what makes the file safe to edit
    const broken = {
      acronyms: {}, substitutions: { utilize: 'use' },
      glossary: [
        { term: 'long', plain: `a definition that keeps going ${'on '.repeat(22)}and never lands` },
        { term: 'hard', plain: 'a thing you can utilize to obtain the answer' },
        { term: 'acronymy', plain: 'it is all about the HTML' },
      ],
    }
    const codes = plainPassIssues(['long hard acronymy utilize obtain HTML'], broken as any).filter(i => i.level === 'critical')
    expect(codes).toHaveLength(3)
    expect(codes.map(c => c.message).join(' ')).toMatch(/is explained with "utilize"/)
    expect(codes.map(c => c.message).join(' ')).toMatch(/unspelled acronym "HTML"/)
  })

  it('reports long sentences without failing on them', () => {
    const short = longSentenceShare('Do this. Then that. One more.')
    const long = longSentenceShare(`The ${'many words here '.repeat(12)}end.`)
    expect(short).toBe(0)
    expect(long).toBeGreaterThan(50)
  })

  it('honours a hand-rewritten level in content-plain/, and the extraction when there is none', () => {
    expect(sessionSource('web-development', 'session-01.md').overridden).toBe(false)
    expect(sessionSource('web-development', 'session-01.md').path).toContain('content/web-development/session-01.md')
  })
})
