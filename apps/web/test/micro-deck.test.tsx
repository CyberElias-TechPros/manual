import { describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { XP } from '@cea/config'
import { xpFor } from '../../api/src/gamify'
import { MicroDeck, type LessonCardUI } from '../../../packages/ui/micro-deck'

const sampleCards: LessonCardUI[] = [
  {
    id: 'typing-computer-basics/session-01#c1',
    sectionLetter: 'D',
    creditLetters: ['D', 'E'],
    sectionKind: 'lecture',
    kicker: 'Warm-up',
    title: 'Hardware vs. Software — Body vs. Instructions',
    takeaway: 'Hardware is any computer part you can physically touch; software is the invisible apps and instructions running inside.',
    blocks: [
      { t: 'p', text: 'If you can tap it with your finger, it is hardware.', inline: [{ t: 'text', v: 'If you can tap it with your finger, it is hardware.' }] },
    ],
    terms: [{ term: 'browser', plain: 'The app you use to open websites, like Chrome or Edge.' }],
    wordCount: 48,
    check: {
      id: 'typing-computer-basics/session-01#mc1',
      prompt: 'Which pair correctly matches one piece of HARDWARE and one piece of SOFTWARE?',
      choices: [
        { id: 'a', text: 'Hardware: Keyboard · Software: Microsoft Word' },
        { id: 'b', text: 'Hardware: Google Chrome · Software: Monitor' },
      ],
      hint: 'Ask yourself: which one can I tap with my finger?',
    },
  },
  {
    id: 'typing-computer-basics/session-01#c2',
    sectionLetter: 'F',
    creditLetters: ['F'],
    sectionKind: 'lecture',
    kicker: 'Core idea',
    title: 'Meet Your Mouse',
    takeaway: 'Left-click selects, double-click opens, right-click shows a helpful menu.',
    blocks: [{ t: 'p', text: 'Rest your hand gently on the mouse.', inline: [{ t: 'text', v: 'Rest your hand gently on the mouse.' }] }],
    wordCount: 52,
  },
]

describe('bite-sized MicroDeck & Quick Checks', () => {
  it('renders card progress, plain-English takeaway, card-local glossary, and Quick Check options', () => {
    const html = renderToStaticMarkup(
      <MicroDeck
        cards={sampleCards}
        index={0}
        onPickCard={() => {}}
        outcomes={['Tell hardware and software apart']}
        starterRewritten
        lessonTitle="Getting Comfortable with Your Computer"
        doneCheckIds={new Set()}
        checkStates={{}}
        streakRun={2}
        onAnswerCheck={() => {}}
      />,
    )
    expect(html).toContain('Card 1 of 2')
    expect(html).toContain('Beginner-friendly starter')
    expect(html).toContain('In simple words')
    expect(html).toContain('Hardware is any computer part you can physically touch')
    expect(html).toContain('Tricky words on this card')
    expect(html).toContain(`Quick Check · +${XP.microCheck} XP`)
    expect(html).toContain('2 in a row')
    expect(html).toContain('Hardware: Keyboard · Software: Microsoft Word')
  })

  it('renders gentle hint on wrong tap and celebration + explanation on right tap', () => {
    const wrongHtml = renderToStaticMarkup(
      <MicroDeck
        cards={sampleCards}
        index={0}
        onPickCard={() => {}}
        lessonTitle="Test"
        doneCheckIds={new Set()}
        checkStates={{
          'typing-computer-basics/session-01#mc1': {
            selectedId: 'b',
            correct: false,
            hint: 'Ask yourself: which one can I tap with my finger?',
          },
        }}
        streakRun={0}
        onAnswerCheck={() => {}}
      />,
    )
    expect(wrongHtml).toContain('Not quite yet — try another option!')
    expect(wrongHtml).toContain('Ask yourself: which one can I tap with my finger?')

    const rightHtml = renderToStaticMarkup(
      <MicroDeck
        cards={sampleCards}
        index={0}
        onPickCard={() => {}}
        lessonTitle="Test"
        doneCheckIds={new Set(['typing-computer-basics/session-01#mc1'])}
        checkStates={{
          'typing-computer-basics/session-01#mc1': {
            selectedId: 'a',
            correct: true,
            correctId: 'a',
            explanation: 'Spot on! You can touch a keyboard (hardware), while Word is an app (software).',
            xpEarned: XP.microCheck,
            comboXp: XP.comboStreak,
          },
        }}
        streakRun={3}
        onAnswerCheck={() => {}}
      />,
    )
    expect(rightHtml).toContain(`+${XP.microCheck} XP`)
    expect(rightHtml).toContain('Combo XP')
    expect(rightHtml).toContain('You can touch a keyboard (hardware)')
  })

  it('prices micro_check XP from the central server config table', () => {
    expect(XP.microCheck).toBe(5)
    expect(xpFor('micro_check')).toBe(XP.microCheck)
    expect(xpFor('micro_check', { capLeft: 2 })).toBe(2)
  })
})
