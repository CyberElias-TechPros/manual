'use client'
/** Every module in this kit is client-rendered: a UI kit exists to hold handlers, and a server component cannot receive one. Next still server-renders the markup. */
/**
 * Renders the content blocks produced by packages/content. Nothing here interprets markdown at
 * runtime — the parse happens once at build time so a learner on a metered connection downloads
 * JSON, not a parser (10.2).
 *
 * Calm Focus (docs/DESIGN.md): the lesson is read, not scrolled through a scrapbook. Body copy is
 * 17px on 1.7 with a 42rem measure; headings are ink, not colour; a callout is a rule and a word,
 * not a pastel box; nothing in a lesson gets a drop shadow. Colour appears exactly twice — the
 * link blue and the gold of a diagram marker.
 */
import { useState, type ReactNode } from 'react'
import type { Block, Diagram, Inline } from '@cea/content/schema'
import { cx } from './primitives'

export function Inlines({ parts }: { parts: Inline[] }) {
  return (
    <>
      {parts.map((p, i) => {
        switch (p.t) {
          case 'strong': return <strong key={i} className="font-semibold text-ink dark:text-light">{p.v}</strong>
          case 'code': return <code key={i} className="rounded bg-surface-muted px-1 py-0.5 font-mono text-[0.88em] text-ink-800 dark:bg-surface-dark-muted dark:text-light/90">{p.v}</code>
          case 'link': return <a key={i} href={p.href} className="text-blue underline decoration-[1px] underline-offset-2 hover:text-navy dark:text-sky" rel="noopener noreferrer">{p.v}</a>
          default: return <span key={i}>{p.v}</span>
        }
      })}
    </>
  )
}

const CALLOUT: Record<string, { label: string; rule: string }> = {
  tip: { label: 'Tip', rule: 'border-success' },
  warn: { label: 'Watch out', rule: 'border-warn' },
  note: { label: 'Note', rule: 'border-ink-200 dark:border-surface-dark-line-strong' },
  mistake: { label: 'Common mistake', rule: 'border-error' },
  naira: { label: 'Money', rule: 'border-gold' },
}

export function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case 'h': {
      const Tag = (`h${Math.min(4, block.depth + 1)}`) as 'h2' | 'h3' | 'h4' | 'h5'
      return (
        <Tag className={cx(
          'font-semibold text-ink dark:text-light',
          block.depth <= 2 ? 'mt-9 mb-2 text-lg' : 'mt-6 mb-1.5 text-base',
        )}>
          <Inlines parts={block.inline} />
        </Tag>
      )
    }
    case 'p':
      return <p className="my-3.5"><Inlines parts={block.inline} /></p>
    case 'list':
      return block.ordered ? (
        <ol className="my-3.5 list-decimal space-y-2 pl-6 marker:text-ink-400">
          {block.items.map((it, i) => <li key={i}><Inlines parts={it.inline} /></li>)}
        </ol>
      ) : (
        <ul className="my-3.5 list-disc space-y-2 pl-5 marker:text-ink-300">
          {block.items.map((it, i) => <li key={i}><Inlines parts={it.inline} /></li>)}
        </ul>
      )
    case 'code':
      return (
        <pre className="my-5 overflow-x-auto rounded-card bg-deep p-4 text-[0.875rem] leading-relaxed text-[#e6eefb]" tabIndex={0}>
          <code className="whitespace-pre font-mono">{block.text}</code>
        </pre>
      )
    case 'callout': {
      const c = CALLOUT[block.tone] ?? CALLOUT.note
      return (
        <aside className={cx('my-5 border-l-2 pl-4', c.rule)}>
          <div className="text-[0.8125rem] font-semibold text-ink-600 dark:text-light/65">{block.title || c.label}</div>
          <div className="mt-1 text-base text-ink-800 dark:text-light/90"><Inlines parts={block.inline} /></div>
        </aside>
      )
    }
    case 'table':
      return (
        <div className="my-5 -mx-1 overflow-x-auto">
          <table className="w-full min-w-[28rem] border-collapse text-[0.9375rem]">
            <thead>
              <tr className="border-b border-surface-line-strong text-left dark:border-surface-dark-line-strong">
                {block.head.map((h, i) => <th key={i} scope="col" className="px-3 py-2 font-semibold text-ink dark:text-light">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i} className="border-b border-surface-line dark:border-surface-dark-line">
                  {r.map((cell, j) => <td key={j} className="px-3 py-2 align-top text-ink-700 dark:text-light/80">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'quote':
      return <blockquote className="my-5 border-l-2 border-gold pl-4 text-lg leading-relaxed text-ink-700 dark:text-light/85"><Inlines parts={block.inline} /></blockquote>
    default:
      return null
  }
}

export function BlockList({ blocks, className }: { blocks: Block[]; className?: string }) {
  return <div className={cx('max-w-reading text-base leading-prose text-ink-700 dark:text-light/85', className)}>{blocks.map((b, i) => <BlockView key={i} block={b} />)}</div>
}

/**
 * 4.8 — the clipped diagram plus its transcript. Hotspots are focusable so the callouts are usable
 * with a keyboard and with TalkBack/VoiceOver (10.5), and in data-saver mode the image is skipped
 * entirely: the text is the accessible source.
 */
export function DiagramView({ diagram, dataSaver, alt }: { diagram?: Diagram | null; dataSaver?: boolean; alt?: string }) {
  const [showTranscript, setShowTranscript] = useState(false)
  if (!diagram) return null
  const hasTranscript = diagram.transcript?.length > 0
  return (
    <figure className="my-6">
      {dataSaver ? (
        <div className="rounded-card bg-surface-muted p-4 text-center text-sm text-ink-500 dark:bg-surface-dark-muted dark:text-light/60">
          Diagram hidden to save data — “{alt || 'the on-screen layout'}”. {hasTranscript ? 'Read the transcript below.' : ''}
        </div>
      ) : diagram.flow && !diagram.src ? (
        /* The generated flow: the level's own procedure, drawn as numbered steps.
           Same information as a clipped figure, zero bytes, and it cannot go stale. */
        <ol className="grid gap-3 sm:grid-cols-2">
          {diagram.flow.steps.map((step, i) => (
            <li key={i} className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-700 dark:text-light/85">
              <span aria-hidden className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-surface-line-strong font-mono text-[0.6875rem] text-ink-500 dark:border-surface-dark-line-strong dark:text-light/60">{i + 1}</span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={diagram.src} alt={alt || 'Diagram from the course manual'} width={diagram.width} height={diagram.height}
            loading="lazy" decoding="async" className="w-full rounded-card bg-white"
          />
          {diagram.hotspots?.length > 0 && (
            <>
              {diagram.hotspots.map((h, i) => (
                <button
                  key={i} type="button"
                  onClick={() => setShowTranscript(true)}
                  aria-label={`Callout ${i + 1}: ${h.label}`} title={h.label}
                  className="absolute rounded border-2 border-gold/70 bg-gold/10 hover:bg-gold/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                  style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${Math.max(4, h.w)}%`, height: `${Math.max(4, h.h)}%` }}
                />
              ))}
            </>
          )}
        </div>
      )}
      <figcaption className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[0.8125rem] text-ink-500 dark:text-light/55">
        <span>
          {diagram.page ? `Manual p.${diagram.page}` : diagram.flow && !diagram.src ? 'From this level’s procedure' : 'Course manual diagram'}
          {diagram.hotspots?.length ? ` · ${diagram.hotspots.length} callouts` : ''}
        </span>
        {hasTranscript && (
          <button type="button" onClick={() => setShowTranscript(v => !v)} aria-expanded={showTranscript} className="font-medium text-blue underline underline-offset-2 dark:text-sky">
            {showTranscript ? 'Hide transcript' : 'Read transcript'}
          </button>
        )}
      </figcaption>
      {showTranscript && hasTranscript && (
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-[0.9375rem] text-ink-700 dark:text-light/85">
          {diagram.transcript.map((line, i) => <li key={i}>{line}</li>)}
        </ol>
      )}
    </figure>
  )
}

/**
 * The stage rail (4.2). It answers one question — where am I, what is next — so it carries a
 * number, a word and a state, and nothing else. On a phone it sits under the title and scrolls.
 */
export function SectionRail({ sections, active, onPick }: { sections: { letter: string; title: string; kind: string }[]; active?: string; onPick: (letter: string) => void }) {
  const activeIndex = sections.findIndex(s => s.letter === active)
  return (
    <nav aria-label="Sections in this level" className="no-scrollbar -mx-1 flex items-center gap-1 overflow-x-auto px-1 lg:flex-col lg:items-stretch lg:gap-0.5 lg:overflow-visible">
      {sections.map((s, i) => {
        const state = active === s.letter ? 'now' : activeIndex > i ? 'done' : 'next'
        return (
          <button
            key={s.letter} type="button" onClick={() => onPick(s.letter)}
            aria-current={state === 'now' ? 'step' : undefined}
            className={cx(
              'group flex shrink-0 items-center gap-2 rounded-card px-2.5 py-2 text-left text-[0.8125rem] transition-colors duration-150',
              state === 'now' ? 'bg-surface-muted font-medium text-ink dark:bg-surface-dark-muted dark:text-light' : 'text-ink-500 hover:bg-surface-muted/70 dark:text-light/55 dark:hover:bg-surface-dark-muted/70',
            )}
          >
            <span aria-hidden className={cx(
              'flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[0.625rem] tabular-nums',
              state === 'done' ? 'bg-navy text-white dark:bg-sky dark:text-deep' : state === 'now' ? 'border border-navy text-navy dark:border-sky dark:text-sky' : 'border border-surface-line-strong text-ink-400 dark:border-surface-dark-line-strong',
            )}>
              {state === 'done' ? '✓' : i + 1}
            </span>
            <span className="whitespace-nowrap lg:whitespace-normal">{s.title}</span>
          </button>
        )
      })}
    </nav>
  )
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('max-w-reading text-base leading-prose text-ink-700 dark:text-light/85', className)}>{children}</div>
}
