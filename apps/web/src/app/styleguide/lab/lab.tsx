'use client'
import { useState } from 'react'
import {
  AdSlot, BlockList, Button, Card, CodeBlanks, DiagramView, ExerciseBox, FlashcardDeck,
  Label, LockNote, Pill, ProgressBar, QuizRunner, RankChip, ScenarioRunner, SectionHead,
  SectionRail, Stars, StatBlock, StreakFlame, Troubleshooting,
} from '@cea/ui'
import { RANKS } from '@cea/config'

/**
 * Every component, in the states a lesson actually puts it in. Kept honest by importing the same
 * modules the app renders — there is no duplicated markup here that could drift from reality. The
 * fixtures below use the real block/Exercise/Scenario shapes from @cea/content/schema, so if a
 * field changes name this page stops rendering and someone notices.
 */
const inline = (v: string) => [{ t: 'text', v }]

export function LabClient() {
  const [result, setResult] = useState<any>(null)
  const blocks = [
    { t: 'h', depth: 2, inline: [{ t: 'strong', v: 'Section B' }, { t: 'text', v: ' · the worked demo' }] },
    { t: 'p', inline: [{ t: 'text', v: 'A paragraph long enough to test the measure and the leading, with a ' }, { t: 'code', v: 'code' }, { t: 'text', v: ' span, some ' }, { t: 'strong', v: 'bold' }, { t: 'text', v: ', and a ' }, { t: 'link', v: 'link to the manual', href: '/courses' }, { t: 'text', v: '. Reading this at 17px on 1.7 should feel like a book, not a dashboard.' }] },
    { t: 'list', ordered: false, items: [{ inline: inline('First line') }, { inline: inline('Second line, long enough that wrapping at 360px is visible and the marker stays aligned') }, { inline: inline('Third') }] },
    { t: 'list', ordered: true, items: [{ inline: inline('Open a blank workbook') }, { inline: inline('Type the header row') }] },
    { t: 'callout', tone: 'tip', title: '', inline: inline('A tip is a rule and a sentence — no box, no pastel fill.') },
    { t: 'callout', tone: 'mistake', title: 'Common mistake', inline: inline('Formatting the same rule in a different colour every week.') },
    { t: 'code', language: 'bash', text: 'pnpm content:build\nnode tools/link-assets.mjs' },
    { t: 'table', head: ['Tool', 'Use', 'When'], rows: [['Excel', 'Sheets, offline', 'Week 2'], ['Sheets', 'Free, shareable', 'Week 3']] },
    { t: 'quote', inline: inline('The learner is never asked to admire the interface.') },
  ]

  return (
    <div className="space-y-10 pb-10">
      <div>
        <Label>Cyber Elias Academy · component lab</Label>
        <h1 className="mt-1.5 text-2xl font-semibold tracking-snugish text-ink dark:text-light">Every state, on one page</h1>
        <p className="mt-2 max-w-reading text-[0.9375rem] leading-relaxed text-ink-500 dark:text-light/60">
          Nothing on this page is a mock: each block is the module <code className="rounded bg-surface-muted px-1 dark:bg-surface-dark-muted">apps/web</code> imports.
        </p>
      </div>

      <section>
        <SectionHead title="Actions" note="Navy is the only action colour. The gold variant is retired: it now renders the same as primary, so a page can never grow two competing CTAs." />
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button>primary</Button><Button variant="gold">gold (aliased)</Button><Button variant="outline">outline</Button><Button variant="ghost">ghost</Button><Button variant="danger">danger</Button>
          <Button loading>loading</Button><Button disabled>disabled</Button><Button size="sm">small</Button><Button size="lg">large</Button>
        </div>
      </section>

      <section>
        <SectionHead title="Status" note="Label is metadata and has no colour. Pill is a state and carries one dot. Neither is a button, so neither is a pill-shaped box." />
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Label>9 levels · 3 weeks</Label>
          <Pill tone="success">passed</Pill><Pill tone="gold">streak</Pill><Pill tone="error">rejected</Pill><Pill tone="warn">pending</Pill><Pill tone="muted">locked</Pill>
        </div>
        <div className="mt-6 max-w-measure space-y-4">
          <ProgressBar value={140} max={300} label="XP today" />
          <div className="flex flex-wrap items-center gap-6"><Stars n={2} /><StreakFlame count={6} atRisk /><StreakFlame count={0} /></div>
        </div>
      </section>

      <section>
        <SectionHead title="Numbers and ranks" note="A StatBlock is a number on the page — the whitespace is the container. Rank and streak furniture only ever appears on the dashboard and profile." />
        <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
          <StatBlock label="XP" value={1240} />
          <StatBlock label="Rank" value="Agent" />
          <StatBlock label="Streak" value="6 days" />
          <StatBlock label="Pending" value="1" tone="error" />
        </div>
        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2">{RANKS.map(r => <RankChip key={r.key} rank={r} xp={1240} next={RANKS[RANKS.indexOf(r) + 1]} />)}</div>
      </section>

      <section>
        <SectionHead title="Surfaces" note="Card is flat and borderless by default; variant=&quot;ring&quot; is the only treatment an interactive panel gets, and &quot;focus&quot; is for the single panel that carries the next step." />
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Card><p className="text-[0.9375rem] font-medium text-ink dark:text-light">plain · grouping content</p><p className="mt-1 text-[0.875rem] text-ink-500 dark:text-light/55">No border, no shadow, no fill that competes with the page.</p></Card>
          <Card variant="ring"><p className="text-[0.9375rem] font-medium text-ink dark:text-light">ring · you can act on this</p><p className="mt-1 text-[0.875rem] text-ink-500 dark:text-light/55">One hairline. Used for the quiz, the exercise, the enrolment panel.</p></Card>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2"><LockNote minutes={95} /><LockNote price="₦30,000" /></div>
      </section>

      <section>
        <SectionHead title="Lesson blocks" note="The prose a learner reads for ninety minutes: 17px/1.7, 42rem measure, ink headings, callouts as rules." />
        <div className="mt-2"><BlockList blocks={blocks as any} /></div>
      </section>

      <section>
        <SectionHead title="Assessment" note="One question at a time, then a review list where the model answer lives." />
        <div className="mt-6 space-y-8">
          <QuizRunner
            result={result}
            questions={[
              { id: 'q1', type: 'mcq', prompt: 'Which shortcut opens Paste Special in Word?', choices: [{ id: 'a', text: 'Ctrl+V' }, { id: 'b', text: 'Ctrl+Alt+V' }, { id: 'c', text: 'Ctrl+Shift+V' }, { id: 'd', text: 'Ctrl+M' }] },
              { id: 'q2', type: 'true_false', prompt: 'A pivot table can group dates by month.' },
              { id: 'q3', type: 'fill_blank', prompt: 'In Excel, =SUM(A1:A9) returns the ___ of the range.' },
              { id: 'q4', type: 'short_answer', prompt: 'Say when you would use Mail Merge instead of copying names.' },
            ] as any}
            onSubmit={async () => {
              const r = { correct: 2, total: 4, scorePct: 50, passed: false, perfect: false, perQuestion: [
                { id: 'q1', correct: true, credit: 1, modelAnswer: 'Ctrl+Alt+V', explanation: 'Paste Special is on the Home ribbon too.', note: '' },
                { id: 'q2', correct: true, credit: 1, modelAnswer: 'true', explanation: 'Drag the date field in, then group it.', note: '' },
                { id: 'q3', correct: false, credit: 0, modelAnswer: 'total', explanation: 'The formula returns one number: the total.', note: 'Say what the formula returns, in the words the manual uses.' },
                { id: 'q4', correct: null, credit: 0.5, modelAnswer: 'Many letters, one template', explanation: 'Close — a tutor confirms prose answers.', note: '' },
              ] }
              setResult(r)
              return r
            }}
            onRetry={() => setResult(null)}
          />
          <Troubleshooting items={[{ mistake: 'Deleting a referenced row and leaving #REF! behind', fix: 'Select the range again, or undo the delete before saving a copy.' }]} />
          <CodeBlanks
            items={[{ id: 'cb1', language: 'js', template: 'function greet(name) {\n  return "Hi " + {{0}};\n}', blanks: [{ answer: 'name', accepts: ['name'] }], explain: 'Say the variable name the parameter carries.' }] as any}
            check={async () => ({ results: [true], correctCount: 1, total: 1, explain: 'name', hints: ['n…'] })}
          />
          <ExerciseBox
            exercise={{
              id: 'e1', kind: 'guided', title: 'Format a timesheet',
              prompt: 'Bold the header row, freeze it, and put the week total in the last row.',
              steps: ['Open the sheet', 'Select row 1', 'Bold, then View → Freeze panes'],
              successCriteria: ['The header stays visible when you scroll', 'The total updates when hours change'],
              deliverables: ['A screenshot of row 1 frozen', 'The cell reference you used'],
              rubric: [{ criterion: 'Formatting', description: 'Header bold and frozen', marks: 4 }, { criterion: 'Accuracy', description: 'Total uses a formula, not a typed number', marks: 6 }],
            } as any}
            onSubmit={async () => undefined}
          />
          <ScenarioRunner
            scenario={{
              id: 's1', title: 'A client wants a refund',
              situation: 'They paid yesterday and opened levels 1–2 of a nine-level course.',
              facts: ['Refunds run 7 days from approval', 'Level 3 has not been opened'],
              decision: 'What do you tell them?',
              options: [{ id: 'a', text: 'No refunds, ever' }, { id: 'b', text: 'Check the level-3 rule, then decide' }],
              feedback: { a: 'The policy is in the terms and it allows this one.', b: 'Correct: the rule decides, not the mood.' },
              resolution: 'Approve it, note the reference, and tell the accounts team the same day.',
            } as any}
            correctId="b"
          />
          <FlashcardDeck cards={[{ id: 'c1', front: 'Ctrl+Z', back: 'Undo' }, { id: 'c2', front: 'Ctrl+Y', back: 'Redo' }] as any} />
          <DiagramView
            diagram={{ src: '/assets/covers/microsoft-office.svg', alt: 'Microsoft Office course cover', width: 800, height: 480, page: 12, transcript: ['Cover art for the Microsoft Office course.'], hotspots: [{ x: 30, y: 40, w: 20, h: 12, label: 'ribbon' }] } as any}
          />
          <SectionRail sections={[{ letter: 'A', title: 'Objective', kind: 'lecture' }, { letter: 'H', title: 'Exercise', kind: 'exercise' }, { letter: 'M', title: 'Knowledge check', kind: 'knowledge_check' }] as any} active="A" onPick={() => undefined} />
          <AdSlot placement="catalogue-footer" />
        </div>
      </section>
    </div>
  )
}
