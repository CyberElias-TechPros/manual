'use client'
/**
 * Bite-Sized Micro-Learning Card Deck + Tap-to-Answer Quick Checks (`MicroDeck`).
 *
 * Replaces 2,000–4,400-word textbook walls with short ~100–180-word cards, each carrying:
 *   1. A bold 1-line "In simple words" takeaway right at the top,
 *   2. Short 2-sentence paragraphs rendered via `BlockList`,
 *   3. Card-local tricky-word explanations (`terms`) right where the word appears, and
 *   4. Inline server-graded `⚡ Quick Check · +5 XP` micro-quizzes every 2–3 cards with
 *      instant hints, plain-English explanations, and 3-in-a-row `🔥` combo bonuses.
 */
import { useState } from 'react'
import { XP } from '@cea/config'
import { BlockList, DiagramView } from './blocks'
import { cx, Pill } from './primitives'
import { AdSlot } from './shell'

export interface MicroChoiceUI {
  id: string
  text: string
}

export interface MicroCheckUI {
  id: string
  prompt: string
  choices: MicroChoiceUI[]
  hint?: string
}

export interface LessonCardUI {
  id: string
  sectionLetter: string
  creditLetters?: string[]
  sectionKind: string
  kicker: string
  title: string
  takeaway: string
  blocks: any[]
  terms?: { term: string; plain: string }[]
  wordCount: number
  check?: MicroCheckUI
}

export interface MicroCheckAttemptState {
  selectedId?: string
  correct?: boolean
  correctId?: string
  explanation?: string
  hint?: string
  busy?: boolean
  guestPreview?: boolean
  xpEarned?: number
  comboXp?: number
}

export function MicroDeck({
  cards,
  index,
  onPickCard,
  outcomes,
  connectionToPrevious,
  starterRewritten,
  diagram,
  dataSaver,
  lessonTitle,
  doneCheckIds,
  checkStates,
  streakRun,
  onAnswerCheck,
}: {
  cards: LessonCardUI[]
  index: number
  onPickCard: (idx: number) => void
  outcomes?: string[]
  connectionToPrevious?: string
  starterRewritten?: boolean
  diagram?: any
  dataSaver?: boolean
  lessonTitle: string
  doneCheckIds: Set<string>
  checkStates: Record<string, MicroCheckAttemptState>
  streakRun: number
  onAnswerCheck: (checkId: string, choiceId: string) => void | Promise<void>
}) {
  const [goalsOpen, setGoalsOpen] = useState(false)
  if (!cards.length) return null

  const safeIdx = Math.max(0, Math.min(index, cards.length - 1))
  const card = cards[safeIdx]
  const totalChecks = cards.filter(c => !!c.check).length
  const solvedChecks = cards.filter(c => c.check && (doneCheckIds.has(c.check.id) || checkStates[c.check.id]?.correct)).length
  const estSeconds = Math.max(25, Math.round(((card.wordCount || 90) / 170) * 60))
  const firstLectureIdx = cards.findIndex(c => c.sectionKind === 'lecture')
  const showDiagram = !!diagram && safeIdx === (firstLectureIdx >= 0 ? firstLectureIdx : 0)

  return (
    <div className="mt-5 space-y-5">
      {/* Gamified Micro-Deck HUD: Card counter + Quick-Check XP counter + live Combo Streak */}
      <div className="rounded-panel border border-surface-line bg-surface-muted/75 p-3.5 sm:p-4 dark:border-surface-dark-line dark:bg-surface-dark-muted/60">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-navy px-2.5 py-1 text-[0.75rem] font-extrabold text-white dark:bg-sky dark:text-deep">
              Card {safeIdx + 1} of {cards.length}
            </span>
            <span className="text-[0.8125rem] font-semibold text-ink-600 dark:text-light/75">
              ~{estSeconds} sec read
            </span>
            {starterRewritten && (
              <Pill tone="success">Beginner-friendly starter</Pill>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {streakRun >= 2 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-gold/25 px-2.5 py-1 text-[0.75rem] font-extrabold text-[#7a4f08] dark:bg-gold/20 dark:text-gold">
                🔥 {streakRun} in a row
              </span>
            )}
            {totalChecks > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full border border-surface-line-strong bg-surface px-2.5 py-1 text-[0.75rem] font-bold text-ink-700 tabular-nums dark:border-surface-dark-line-strong dark:bg-surface-dark dark:text-light/85">
                ⚡ {solvedChecks}/{totalChecks} Quick Checks (+{XP.microCheck} XP each)
              </span>
            )}
          </div>
        </div>

        {/* Clickable bite-sized card & checkpoint track */}
        <div className="no-scrollbar mt-3 flex items-center gap-1.5 overflow-x-auto pb-0.5" role="tablist" aria-label="Lesson cards">
          {cards.map((c, i) => {
            const isCurrent = i === safeIdx
            const isPast = i < safeIdx
            const hasCheck = !!c.check
            const checkDone = hasCheck && (doneCheckIds.has(c.check!.id) || !!checkStates[c.check!.id]?.correct)
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={isCurrent}
                aria-label={`Card ${i + 1}: ${c.title}${hasCheck ? ' (includes Quick Check)' : ''}`}
                onClick={() => onPickCard(i)}
                className={cx(
                  'group relative flex h-7 shrink-0 items-center justify-center rounded-full px-2 text-[0.6875rem] font-extrabold tabular-nums transition-all',
                  isCurrent
                    ? 'bg-navy text-white ring-2 ring-gold/70 dark:bg-sky dark:text-deep'
                    : checkDone
                      ? 'bg-[#146c43]/15 text-[#146c43] hover:bg-[#146c43]/25 dark:bg-success/20 dark:text-[#4ade80]'
                      : isPast
                        ? 'bg-navy/12 text-navy hover:bg-navy/20 dark:bg-sky/20 dark:text-sky'
                        : 'bg-surface text-ink-600 hover:bg-surface-line dark:bg-surface-dark dark:text-light/70',
                )}
              >
                <span>{i + 1}</span>
                {hasCheck && (
                  <span aria-hidden className={cx('ml-0.5 text-[0.6875rem]', checkDone ? 'text-[#146c43] dark:text-[#4ade80]' : isCurrent ? 'text-gold dark:text-deep' : 'text-[#7a4f08] dark:text-gold')}>
                    {checkDone ? '✓' : '⚡'}
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Compact collapsible Level Goals on Card 1 so learners are never hit by a wall before Card 1 */}
      {safeIdx === 0 && (outcomes?.length ?? 0) > 0 && (
        <div className="rounded-card border border-surface-line bg-surface p-3.5 dark:border-surface-dark-line dark:bg-surface-dark">
          <button
            type="button"
            aria-expanded={goalsOpen}
            onClick={() => setGoalsOpen(o => !o)}
            className="flex w-full items-center justify-between gap-3 text-left text-[0.875rem] font-bold text-ink dark:text-light"
          >
            <span>🎯 What you will master in this level ({outcomes!.length} simple goals)</span>
            <span className="shrink-0 text-[0.8125rem] font-bold text-navy dark:text-sky">
              {goalsOpen ? 'Hide ▲' : 'Show ▼'}
            </span>
          </button>
          {goalsOpen && (
            <ul className="mt-2.5 list-disc space-y-1.5 border-t border-surface-line pt-2.5 pl-5 text-[0.875rem] text-ink-700 dark:border-surface-dark-line dark:text-light/85">
              {outcomes!.map((o, idx) => <li key={idx}>{o}</li>)}
            </ul>
          )}
          {connectionToPrevious && (
            <p className="mt-2 text-[0.8125rem] text-ink-600 dark:text-light/70">
              <strong className="font-bold text-ink dark:text-light">Previously:</strong> {connectionToPrevious}
            </p>
          )}
        </div>
      )}

      {/* Main Bite-Sized Lesson Card */}
      <article
        aria-label={`Card ${safeIdx + 1}: ${card.title}`}
        className="rounded-panel border-2 border-surface-line bg-surface p-5 shadow-xs sm:p-7 dark:border-surface-dark-line dark:bg-surface-dark"
      >
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[0.75rem] font-extrabold uppercase tracking-wider text-navy dark:text-sky">
            {card.kicker}
          </span>
          <span className="text-[0.75rem] font-semibold text-ink-500 tabular-nums dark:text-light/60">
            {card.wordCount} words
          </span>
        </div>

        <h3 className="mt-1.5 text-xl font-extrabold leading-snug text-ink sm:text-[1.375rem] dark:text-light">
          {card.title}
        </h3>

        {/* Bold 1-sentence Plain-English Takeaway Banner */}
        {card.takeaway && (
          <div className="mt-4 rounded-card border-l-4 border-gold bg-gold/12 px-4 py-3 dark:bg-gold/10">
            <p className="text-[0.75rem] font-extrabold uppercase tracking-wider text-[#7a4f08] dark:text-gold">
              💡 In simple words
            </p>
            <p className="mt-1 text-[0.95rem] font-bold leading-relaxed text-ink dark:text-light">
              {card.takeaway}
            </p>
          </div>
        )}

        {/* Short, airy 2-sentence paragraphs & lists */}
        <div className="mt-5">
          <BlockList blocks={card.blocks} />
        </div>

        {showDiagram && (
          <div className="mt-5">
            <DiagramView diagram={diagram} dataSaver={!!dataSaver} alt={`${lessonTitle} — visual diagram`} />
          </div>
        )}

        {/* Card-local plain-English word helper (only words appearing right on this card!) */}
        {card.terms && card.terms.length > 0 && (
          <div className="mt-6 rounded-card border border-surface-line bg-surface-muted/70 p-3.5 dark:border-surface-dark-line dark:bg-surface-dark-muted/50">
            <h4 className="text-[0.8125rem] font-extrabold text-ink dark:text-light">
              📖 Tricky words on this card — in plain English
            </h4>
            <dl className="mt-2 grid gap-2 sm:grid-cols-2">
              {card.terms.map(t => (
                <div key={t.term} className="rounded bg-surface px-3 py-2 dark:bg-surface-dark">
                  <dt className="text-[0.8125rem] font-extrabold capitalize text-navy dark:text-sky">{t.term}</dt>
                  <dd className="mt-0.5 text-[0.8125rem] leading-snug text-ink-700 dark:text-light/80">{t.plain}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </article>

      {/* Inline Tap-to-Answer Quick Check (+5 XP & Combo) */}
      {card.check && (
        <MicroCheckBox
          check={card.check}
          alreadyBanked={doneCheckIds.has(card.check.id)}
          state={checkStates[card.check.id]}
          streakRun={streakRun}
          onAnswer={choiceId => onAnswerCheck(card.check!.id, choiceId)}
        />
      )}

      {/* Ad slot placed cleanly below the card/check unit — never inside a question */}
      <AdSlot placement="lesson-inline" variant="card" />
    </div>
  )
}

function MicroCheckBox({
  check,
  alreadyBanked,
  state,
  streakRun,
  onAnswer,
}: {
  check: MicroCheckUI
  alreadyBanked: boolean
  state?: MicroCheckAttemptState
  streakRun: number
  onAnswer: (choiceId: string) => void | Promise<void>
}) {
  const solved = alreadyBanked || !!state?.correct
  const wrongPick = state?.correct === false ? state.selectedId : undefined

  return (
    <section
      aria-label="Quick Check"
      className={cx(
        'rounded-panel border-2 p-5 transition-colors sm:p-6',
        solved
          ? 'border-[#146c43]/50 bg-[#146c43]/6 dark:border-success/50 dark:bg-success/10'
          : 'border-gold bg-gold/8 dark:border-gold/70 dark:bg-gold/10',
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className={cx(
            'inline-flex items-center gap-1 rounded-full px-3 py-1 text-[0.75rem] font-extrabold',
            solved
              ? 'bg-[#146c43] text-white dark:bg-success dark:text-deep'
              : 'bg-navy text-white dark:bg-gold dark:text-deep',
          )}>
            {solved ? `✓ Quick Check Complete · +${XP.microCheck} XP` : `⚡ Quick Check · +${XP.microCheck} XP`}
          </span>
          {!solved && streakRun === 2 && (
            <span className="text-[0.75rem] font-extrabold text-[#7a4f08] dark:text-gold">
              🔥 Nail this on 1st try for +{XP.comboStreak} Combo XP!
            </span>
          )}
        </div>
        <span className="text-[0.75rem] font-semibold text-ink-600 dark:text-light/75">
          Tap one answer
        </span>
      </div>

      <h4 className="mt-3 text-[1.0625rem] font-extrabold leading-snug text-ink dark:text-light">
        {check.prompt}
      </h4>

      <div className="mt-3.5 grid gap-2.5">
        {check.choices.map((ch, idx) => {
          const letter = String.fromCharCode(65 + idx)
          const isPickedRight = solved && (state?.correctId ? ch.id === state.correctId : state?.selectedId === ch.id)
          const isPickedWrong = !solved && wrongPick === ch.id
          return (
            <button
              key={ch.id}
              type="button"
              disabled={!!state?.busy || (solved && !!state?.correctId)}
              onClick={() => onAnswer(ch.id)}
              className={cx(
                'flex min-h-[48px] w-full items-center gap-3 rounded-card border-2 px-4 py-3 text-left text-[0.9375rem] font-semibold transition-all',
                isPickedRight
                  ? 'border-[#146c43] bg-[#146c43]/12 text-ink dark:border-success dark:bg-success/20 dark:text-light'
                  : isPickedWrong
                    ? 'border-[#b42318] bg-[#b42318]/8 text-ink dark:border-error dark:bg-error/15 dark:text-light'
                    : 'border-surface-line-strong bg-surface text-ink hover:border-navy hover:bg-surface-muted dark:border-surface-dark-line-strong dark:bg-surface-dark dark:text-light dark:hover:border-sky',
              )}
            >
              <span
                aria-hidden
                className={cx(
                  'flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[0.8125rem] font-extrabold',
                  isPickedRight
                    ? 'bg-[#146c43] text-white dark:bg-success dark:text-deep'
                    : isPickedWrong
                      ? 'bg-[#b42318] text-white dark:bg-error dark:text-white'
                      : 'bg-surface-muted text-ink-700 dark:bg-surface-dark-muted dark:text-light/85',
                )}
              >
                {isPickedRight ? '✓' : isPickedWrong ? '✗' : letter}
              </span>
              <span className="min-w-0 flex-1 leading-snug">{ch.text}</span>
            </button>
          )
        })}
      </div>

      {/* Wrong answer -> gentle hint, immediate retry */}
      {!solved && state?.correct === false && (
        <div role="status" className="mt-3.5 rounded-card border border-[#7a4f08]/35 bg-surface px-4 py-3 text-[0.875rem] text-ink dark:border-gold/40 dark:bg-surface-dark dark:text-light">
          <p className="font-extrabold text-[#b42318] dark:text-[#fca5a5]">
            Not quite yet — try another option! (No points lost.)
          </p>
          {state.hint && (
            <p className="mt-1 text-ink-700 dark:text-light/85">
              <strong>💡 Hint:</strong> {state.hint}
            </p>
          )}
        </div>
      )}

      {/* Correct answer -> explanation + XP celebration */}
      {solved && (
        <div role="status" className="mt-3.5 rounded-card border border-[#146c43]/35 bg-surface px-4 py-3 text-[0.875rem] text-ink dark:border-success/40 dark:bg-surface-dark dark:text-light">
          <p className="font-extrabold text-[#146c43] dark:text-[#4ade80]">
            {state?.comboXp
              ? `🎉 Spot on! +${state.xpEarned ?? XP.microCheck} XP + 🔥 ${state.comboXp} Combo XP!`
              : state?.guestPreview
                ? `🎉 Spot on! (Sign in free below to bank +${XP.microCheck} XP on every Quick Check!)`
                : state?.xpEarned
                  ? `🎉 Spot on! +${state.xpEarned} XP banked!`
                  : '✓ Completed — nice work!'}
          </p>
          {state?.explanation && (
            <p className="mt-1 leading-relaxed text-ink-700 dark:text-light/85">
              {state.explanation}
            </p>
          )}
        </div>
      )}
    </section>
  )
}
