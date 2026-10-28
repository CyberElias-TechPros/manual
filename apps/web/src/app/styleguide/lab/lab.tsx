'use client'
import { useState } from 'react'
import {
  AdSlot, BlockList, Button, Card, Chip, CodeBlanks, DiagramView, ExerciseBox, FlashcardDeck,
  LockNote, ProgressBar, QuizRunner, RankChip, ScenarioRunner, SectionRail, Stars, StatBlock,
  StreakFlame, Troubleshooting,
} from '@cea/ui'
import { RANKS } from '@cea/config'

/**
 * Every component, in the states a lesson actually puts it in. Kept honest by
 * importing the same modules the app renders — there is no duplicated markup here
 * that could drift from the real thing.
 */
export function LabClient() {
  const [result, setResult] = useState<any>(null)
  const [blocks] = useState<any[]>([
    { type: 'paragraph', text: 'A paragraph long enough to test the measure and the leading, with a `code` span and some **bold**.' },
    { type: 'list', ordered: false, items: ['First checklist line', 'Second line, longer, so wrapping is visible at 360px', 'Third'] },
    { type: 'callout', tone: 'warn', title: 'Do not skip', body: 'Warning colour on a warm background.' },
    { type: 'code', language: 'bash', code: 'pnpm content:build\nnode tools/link-assets.mjs' },
    { type: 'table', head: ['Tool', 'Use', 'When'], rows: [['Excel', 'Sheets', 'Week 2'], ['Sheets', 'Free', 'Week 3']] },
  ])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Component lab</h1>

      <section className="grid gap-3 sm:grid-cols-2">
        <Card><h2 className="text-sm font-semibold uppercase tracking-wide">Buttons</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button>primary</Button><Button variant="gold">gold</Button><Button variant="outline">outline</Button><Button variant="ghost">ghost</Button><Button variant="danger">danger</Button>
            <Button loading>loading</Button><Button disabled>disabled</Button><Button size="sm">small</Button><Button size="lg">large</Button>
          </div></Card>
        <Card><h2 className="text-sm font-semibold uppercase tracking-wide">Status</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            <Chip>neutral</Chip><Chip tone="success">passed</Chip><Chip tone="gold">streak</Chip><Chip tone="error">rejected</Chip><Chip tone="warn">pending</Chip><Chip tone="muted">locked</Chip>
          </div>
          <div className="mt-3 space-y-2"><ProgressBar value={140} max={300} label="XP today" /><Stars n={2} /><StreakFlame count={6} atRisk /></div></Card>
      </section>

      <Card><h2 className="text-sm font-semibold uppercase tracking-wide">Stats &amp; ranks</h2>
        <div className="mt-2 grid gap-3 sm:grid-cols-4"><StatBlock label="XP" value={1240} /><StatBlock label="Rank" value="Agent" tone="gold" /><StatBlock label="Streak" value="6 days" tone="success" /><StatBlock label="Pending" value="1" tone="error" /></div>
        <div className="mt-3 flex flex-wrap gap-2">{RANKS.map(r => <RankChip key={r.key} rank={r} xp={1240} next={RANKS[RANKS.indexOf(r) + 1]} />)}</div>
        <div className="mt-3 flex flex-wrap gap-2"><LockNote minutes={95} /><LockNote price="₦30,000" /></div>
      </Card>

      <Card><h2 className="text-sm font-semibold uppercase tracking-wide">Lesson blocks</h2><div className="mt-2"><BlockList blocks={blocks as any} /></div></Card>

      <Card>
        <h2 className="text-sm font-semibold uppercase tracking-wide">Assessment</h2>
        <div className="mt-2 space-y-4">
          <QuizRunner
            result={result}
            questions={[
              { id: 'q1', type: 'mcq', prompt: 'Which shortcut opens Paste Special in Word?', options: ['Ctrl+V', 'Ctrl+Alt+V', 'Ctrl+Shift+V', 'Ctrl+M'], explanation: 'Ctrl+Alt+V.' },
              { id: 'q2', type: 'truefalse', prompt: 'A pivot table can group dates by month.', explanation: 'Drag the date field in, then group it.' },
              { id: 'q3', type: 'fillblank', prompt: 'In Excel, =SUM(A1:A9) returns the ___ of the range.', explanation: 'Total.' },
              { id: 'q4', type: 'prose', prompt: 'Say when you would use Mail Merge instead of copying names.', explanation: 'Any batch of letters from one template.' },
            ] as any}
            onSubmit={async () => {
              const r = { correct: 2, total: 4, scorePct: 50, passed: false, perfect: false, perQuestion: [
                { id: 'q1', correct: true, credit: 1, modelAnswer: 'Ctrl+Alt+V', explanation: 'Paste Special.', note: '' },
                { id: 'q2', correct: true, credit: 1, modelAnswer: 'true', explanation: 'It can.', note: '' },
                { id: 'q3', correct: false, credit: 0, modelAnswer: 'total', explanation: 'Total or sum.', note: 'Say what the formula returns.' },
                { id: 'q4', correct: null, credit: 0.5, modelAnswer: 'Many letters, one template', explanation: 'Close.', note: 'A tutor confirms prose answers.' },
              ] }
              setResult(r)
              return r
            }}
            onRetry={() => setResult(null)}
          />
          <Troubleshooting items={[{ mistake: 'Deleting a referenced row and leaving #REF! behind', fix: 'Select the range again, or undo the delete before saving a copy.' }]} />
          <CodeBlanks
            items={[{ id: 'cb1', language: 'js', template: 'function greet(name) {\n  return "Hi " + {{0}};\n}', blanks: [{ answer: '', accepts: [] }], explain: 'Say the variable name.' }]}
            check={async () => ({ results: [true], correctCount: 1, total: 1, explain: 'name', hints: ['n…'] })}
          />
          <ExerciseBox
            exercise={{ id: 'e1', title: 'Format a timesheet', task: 'Bold the header row and freeze it.', deliverables: ['A screenshot'], rubric: ['Formatting 4', 'Accuracy 6'] } as any}
            onSubmit={async () => undefined}
          />
          <ScenarioRunner
            scenario={{ id: 's1', title: 'A client wants a refund', situation: 'They paid yesterday and opened levels 1-2.', facts: ['Refunds within 7 days if level 3 is not open'], decision: 'What do you tell them?', options: [{ id: 'a', label: 'No refunds, ever' }, { id: 'b', label: 'Check the level-3 rule, then decide' }] } as any}
            correctId="b"
          />
          <FlashcardDeck cards={[{ id: 'c1', front: 'Ctrl+Z', back: 'Undo' }, { id: 'c2', front: 'Ctrl+Y', back: 'Redo' }] as any} />
          <DiagramView diagram={{ src: '/assets/covers/microsoft-office.svg', alt: 'Microsoft Office course cover', width: 800, height: 480, transcript: ['Cover art for the Microsoft Office course.'], hotspots: [{ x: 30, y: 40, w: 20, h: 12, label: 'ribbon' }] } as any} />
          <SectionRail sections={[{ letter: 'A', title: 'Objective', type: 'text' }, { letter: 'H', title: 'Exercise', type: 'exercise' }, { letter: 'M', title: 'Knowledge check', type: 'quiz' }] as any} onPick={() => undefined} />
          <AdSlot placement="lesson-bottom" />
        </div>
      </Card>
    </div>
  )
}
