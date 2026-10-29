'use client'
/**
 * The plain-English strip (11.x — "explain anything that may seem even remotely complex").
 *
 * The build already knows which hard words a level uses: `packages/content/src/plain.ts` matches the
 * shared table in `content-plain/plain-pass.json` against the level's own text and stores the hits on
 * the payload. This component only renders that list — it never looks a word up at read time, so the
 * explanations are in the first paint instead of arriving a moment later.
 *
 * Deliberately not clever: no dotted underlines on every mention of a word inside the prose (that is 40
 * hover targets per screen, and a hover target is a dead end on a phone), no tooltips, no modal. One
 * named block, in the learner's own words, above the reading, and it stays out of the way when a level
 * happens to use no hard words at all.
 */
import { cx } from './primitives'

export type GlossaryTerm = { term: string; plain: string }

export function LevelGlossary({ terms, className, label = 'Words in this level, in plain English' }:
  { terms?: GlossaryTerm[] | null; className?: string; label?: string }) {
  const list = (terms ?? []).filter(t => t?.term && t?.plain)
  if (list.length === 0) return null
  return (
    <aside aria-labelledby={`glossary-${list.length}`} className={cx('rounded-panel border border-surface-line bg-surface-muted/70 p-4 sm:p-5 dark:border-surface-dark-line dark:bg-surface-dark-muted/40', className)}>
      <h3 id={`glossary-${list.length}`} className="text-[0.9375rem] font-bold text-ink dark:text-light">
        {label} <span className="font-medium text-ink-500 tabular-nums dark:text-light/55">({list.length})</span>
      </h3>
      <dl className="mt-3 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
        {list.map(t => (
          <div key={t.term} className="min-w-0">
            <dt className="text-[0.9375rem] font-bold text-ink capitalize dark:text-light">{t.term}</dt>
            <dd className="mt-0.5 text-[0.875rem] leading-relaxed text-ink-600 dark:text-light/70">{t.plain}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 border-t border-surface-line pt-2.5 text-[0.8125rem] leading-relaxed text-ink-500 dark:border-surface-dark-line dark:text-light/55">
        Any word here you already know, skip. The reading does not assume it.
      </p>
    </aside>
  )
}
