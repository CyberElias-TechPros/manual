'use client'
/**
 * 11.2 — the level's own feedback line, and the beta's only intake.
 *
 * The manual for a level is revised by the people who teach it, and they only revise what they hear
 * about. Until this existed the single channel was a support email in Settings, which no learner
 * writes after finishing level 4. So the Finish stage asks one question, with three words to tap and
 * an optional note, and it asks once per course. Never mid-task: there is no feedback box in the
 * reading, the practical, or the check — that is the same rule the ads obey (8.3).
 *
 * Kept out of `lesson.tsx` so it can be rendered in a test: the stage bodies here are client-side by
 * design (whether a level is open is a database question), so the only way to assert this markup
 * without a browser is to render the component itself.
 */
import { useEffect, useState } from 'react'
import { Button, cx, request } from '@cea/ui'

type Mood = 'clear' | 'fuzzy' | 'lost'

/** What the tutor reads. The tag in front is what makes a hundred of these scannable in a list. */
export function feedbackBody(mood: Mood, level: number, note: string) {
  const trimmed = note.trim()
  return `[${LABELS[mood]}] level ${level}${trimmed ? ` — ${trimmed}` : ''}`
}

const LABELS: Record<Mood, string> = { clear: 'It was clear', fuzzy: 'Partly clear', lost: 'I got lost' }
const PROMPT: Record<Mood, string> = {
  clear: 'Anything that would have made it clearer? (optional, and it is read before the next class.)',
  fuzzy: 'Which part was the muddy one? Name the section letter if you can see it.',
  lost: 'What lost you? Name the part — a sentence here changes how this level is taught.',
}

export function LevelFeedback({ slug, n }: { slug: string; n: number }) {
  const key = `cea:feedback:${slug}`
  const [muted, setMuted] = useState(false)
  const [mood, setMood] = useState<Mood | null>(null)
  const [text, setText] = useState('')
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState('')

  // "once per course" is a browser fact, so the question renders and steps aside after mount if this
  // course already answered it. Reading the flag before the first paint would make the server HTML
  // and the browser disagree, which is a worse trade than one line disappearing a frame late.
  useEffect(() => {
    try { setMuted(localStorage.getItem(key) === '1') } catch { setMuted(false) }
  }, [key])
  if (muted && state !== 'sent') return null

  const id = `level-feedback-${n}`

  async function send(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    setError('')
    try {
      await request('/api/feedback', { method: 'POST', body: { body: feedbackBody(mood ?? 'fuzzy', n, text), page: `/learn/${slug}/${n}` } })
      try { localStorage.setItem(key, '1') } catch { /* private mode: the question simply comes back */ }
      setState('sent')
    } catch (e: any) {
      setError(e?.message || 'That did not reach the academy. Nothing you typed is lost — try again.')
      setState('idle')
    }
  }

  function hide() {
    try { localStorage.setItem(key, '1') } catch { /* ignore */ }
    setMuted(true)
  }

  return (
    <div className="mt-8 border-t border-surface-line pt-6 dark:border-surface-dark-line">
      {state === 'sent' ? (
        <p className="max-w-measure text-[0.9375rem] leading-relaxed text-ink-600 dark:text-light/70" role="status">
          Sent. The tutors read this between classes, and it is how the next version of this level gets written.
        </p>
      ) : (
        <>
          <p className="text-[0.9375rem] text-ink-600 dark:text-light/70">Was level {n} clear?</p>
          <div className="mt-3 flex flex-wrap items-center gap-2.5" role="group" aria-label={`How clear was level ${n}?`}>
            {(Object.keys(LABELS) as Mood[]).map(k => (
              <button
                key={k}
                type="button"
                onClick={() => setMood(mood === k ? null : k)}
                aria-pressed={mood === k}
                className={cx(
                  'min-h-[36px] rounded-full border px-3.5 text-[0.875rem] transition-colors',
                  mood === k
                    ? 'border-navy bg-navy text-white'
                    : 'border-surface-line text-ink-600 hover:border-surface-line-strong dark:border-surface-dark-line dark:text-light/70',
                )}
              >
                {LABELS[k]}
              </button>
            ))}
            <button
              type="button"
              onClick={hide}
              className="min-h-[36px] px-1 text-[0.875rem] text-ink-500 underline-offset-2 hover:underline dark:text-light/55"
            >
              Not now
            </button>
          </div>
          {/* the note box only appears once they have chosen a word — an unasked-for textarea is noise */}
          {mood && (
            <form className="mt-5 max-w-measure" onSubmit={send}>
              <label htmlFor={id} className="block text-[0.875rem] leading-relaxed text-ink-500 dark:text-light/55">
                {PROMPT[mood]}
              </label>
              <textarea
                id={id}
                rows={3}
                value={text}
                onChange={e => setText(e.target.value)}
                maxLength={1800}
                className="mt-2 w-full rounded-card border border-surface-line bg-surface p-3 text-[0.9375rem] leading-relaxed text-ink dark:border-surface-dark-line dark:bg-surface-dark dark:text-light"
              />
              <div className="mt-3 flex flex-wrap items-center gap-4">
                <Button size="sm" type="submit" loading={state === 'sending'}>Send to the academy</Button>
                <span className="text-[0.8125rem] text-ink-500 dark:text-light/55">Your name and this level travel with it; nothing else.</span>
              </div>
              {error && <p className="mt-2 text-[0.875rem] text-error" role="alert">{error}</p>}
            </form>
          )}
        </>
      )}
    </div>
  )
}
