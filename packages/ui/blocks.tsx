'use client'
/** Every module in this kit is client-rendered: a UI kit exists to hold handlers, and a server component cannot receive one. Next still server-renders the markup. */
/** * Renders the content blocks produced by packages/content. Nothing here
 * interprets markdown at runtime — the parse happens once at build time so a
 * learner on a metered connection downloads JSON, not a parser (10.2).
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
          case 'code': return <code key={i} className="rounded bg-surface-muted px-1 py-0.5 font-mono text-[0.92em] dark:bg-surface-dark-muted">{p.v}</code>
          case 'link': return <a key={i} href={p.href} className="text-blue underline decoration-1 underline-offset-2 dark:text-sky" rel="noopener noreferrer">{p.v}</a>
          default: return <span key={i}>{p.v}</span>
        }
      })}
    </>
  )
}

const CALLOUT: Record<string, { label: string; cls: string }> = {
  tip: { label: 'Tip', cls: 'border-success/40 bg-success/8' },
  warn: { label: 'Watch out', cls: 'border-warn/45 bg-warn/8' },
  note: { label: 'Note', cls: 'border-sky/45 bg-sky/8' },
  mistake: { label: 'Common mistake', cls: 'border-error/40 bg-error/7' },
  naira: { label: 'Money', cls: 'border-gold/50 bg-gold/8' },
}

export function BlockView({ block }: { block: Block }) {
  switch (block.t) {
    case 'h': {
      const Tag = (`h${Math.min(4, block.depth + 1)}`) as 'h2' | 'h3' | 'h4' | 'h5'
      return <Tag className={cx('font-semibold text-navy dark:text-light', block.depth <= 2 ? 'mt-6 text-lg' : 'mt-4 text-base')}><Inlines parts={block.inline} /></Tag>
    }
    case 'p':
      return <p className="my-2.5"><Inlines parts={block.inline} /></p>
    case 'list':
      return block.ordered ? (
        <ol className="my-2.5 list-decimal space-y-1.5 pl-6 marker:font-semibold marker:text-blue dark:marker:text-sky">
          {block.items.map((it, i) => <li key={i}><Inlines parts={it.inline} /></li>)}
        </ol>
      ) : (
        <ul className="my-2.5 list-disc space-y-1.5 pl-5 marker:text-gold">
          {block.items.map((it, i) => <li key={i}><Inlines parts={it.inline} /></li>)}
        </ul>
      )
    case 'code':
      return (
        <pre className="my-3 overflow-x-auto rounded-card bg-deep p-3 text-[13px] leading-relaxed text-[#eaf2fb]" tabIndex={0}>
          <code className="font-mono whitespace-pre">{block.text}</code>
        </pre>
      )
    case 'callout': {
      const c = CALLOUT[block.tone] ?? CALLOUT.note
      return (
        <aside className={cx('my-3 rounded-card border-l-4 p-3', c.cls)}>
          <div className="text-xs font-semibold uppercase tracking-wide opacity-80">{block.title || c.label}</div>
          <div className="mt-1 text-[15px]"><Inlines parts={block.inline} /></div>
        </aside>
      )
    }
    case 'table':
      return (
        <div className="my-3 -mx-1 overflow-x-auto rounded-card border border-surface-line dark:border-surface-dark-line">
          <table className="w-full min-w-[28rem] border-collapse text-sm">
            <thead>
              <tr className="bg-surface-muted text-left dark:bg-surface-dark-muted">
                {block.head.map((h, i) => <th key={i} scope="col" className="px-3 py-2 font-semibold">{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((r, i) => (
                <tr key={i} className="border-t border-surface-line dark:border-surface-dark-line">
                  {r.map((cell, j) => <td key={j} className="px-3 py-2 align-top">{cell}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    case 'quote':
      return <blockquote className="my-3 border-l-2 border-gold pl-3 italic text-ink/80 dark:text-light/80"><Inlines parts={block.inline} /></blockquote>
    default:
      return null
  }
}

export function BlockList({ blocks, className }: { blocks: Block[]; className?: string }) {
  return <div className={cx('text-[16px] leading-[1.65] text-ink dark:text-light/90', className)}>{blocks.map((b, i) => <BlockView key={i} block={b} />)}</div>
}

/**
 * 4.8 — the clipped diagram plus its transcript. Hotspots are focusable so the
 * callouts are usable with a keyboard and with TalkBack/VoiceOver (10.5), and in
 * data-saver mode the image is skipped entirely: the text is the accessible source.
 */
export function DiagramView({ diagram, dataSaver, alt }: { diagram?: Diagram | null; dataSaver?: boolean; alt?: string }) {
  const [showTranscript, setShowTranscript] = useState(false)
  if (!diagram) return null
  const hasTranscript = diagram.transcript?.length > 0
  return (
    <figure className="my-4 rounded-card border border-surface-line bg-surface p-3 dark:border-surface-dark-line dark:bg-surface-dark">
      {dataSaver ? (
        <div className="rounded bg-surface-muted p-4 text-center text-sm text-ink/70 dark:bg-surface-dark-muted dark:text-light/70">
          Diagram hidden to save data — “{alt || 'the on-screen layout'}”. {hasTranscript ? 'Read the transcript below.' : ''}
        </div>
      ) : diagram.flow && !diagram.src ? (
        /* The generated flow: the level's own procedure, drawn as numbered steps.
           Same information as a clipped figure, zero bytes, and it cannot go stale. */
        <ol className="cea-flow grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {diagram.flow.steps.map((step, i) => (
            <li key={i} className="relative rounded-card border border-surface-line bg-surface-muted p-3 text-sm dark:border-surface-dark-line dark:bg-surface-dark-muted">
              <span aria-hidden className="mb-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-navy font-mono text-xs font-bold text-white">{i + 1}</span>
              <p className="leading-snug">{step}</p>
              {i < diagram.flow!.steps.length - 1 && (
                <span aria-hidden className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 text-gold lg:block">→</span>
              )}
            </li>
          ))}
        </ol>
      ) : (
        <div className="relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={diagram.src} alt={alt || 'Diagram from the course manual'} width={diagram.width} height={diagram.height}
            loading="lazy" decoding="async" className="w-full rounded bg-white"
          />
          {diagram.hotspots?.length > 0 && (
            <>
              {diagram.hotspots.map((h, i) => (
                <button
                  key={i} type="button"
                  onClick={() => setShowTranscript(true)}
                  aria-label={`Callout ${i + 1}: ${h.label}`} title={h.label}
                  className="absolute rounded border-2 border-gold/80 bg-gold/15 transition hover:bg-gold/35 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                  style={{ left: `${h.x}%`, top: `${h.y}%`, width: `${Math.max(4, h.w)}%`, height: `${Math.max(4, h.h)}%` }}
                />
              ))}
            </>
          )}
        </div>
      )}
      <figcaption className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-ink/65 dark:text-light/65">
        <span>
          {diagram.page ? `Manual p.${diagram.page}` : diagram.flow && !diagram.src ? 'Drawn from this level’s procedure' : 'Course manual diagram'}
          {diagram.hotspots?.length ? ` · ${diagram.hotspots.length} callouts` : ''}
        </span>
        {hasTranscript && (
          <button type="button" onClick={() => setShowTranscript(v => !v)} aria-expanded={showTranscript} className="font-medium text-blue underline underline-offset-2 dark:text-sky">
            {showTranscript ? 'Hide transcript' : 'Read transcript'}
          </button>
        )}
      </figcaption>
      {showTranscript && hasTranscript && (
        <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-ink dark:text-light/90">
          {diagram.transcript.map((line, i) => <li key={i}>{line}</li>)}
        </ol>
      )}
    </figure>
  )
}

/** Sticky section rail (4.2). On a phone it collapses to a horizontal scroller. */
export function SectionRail({ sections, active, onPick }: { sections: { letter: string; title: string; kind: string }[]; active?: string; onPick: (letter: string) => void }) {
  return (
    <nav aria-label="Sections in this level" className="no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1 lg:flex-col lg:overflow-visible">
      {sections.map(s => (
        <button
          key={s.letter} type="button" onClick={() => onPick(s.letter)}
          aria-current={active === s.letter ? 'true' : undefined}
          className={cx(
            'shrink-0 rounded-pill border px-3 py-1.5 text-left text-xs font-medium transition',
            active === s.letter
              ? 'border-gold bg-gold/15 text-ink dark:text-light'
              : 'border-surface-line bg-surface text-ink/70 hover:bg-surface-muted dark:border-surface-dark-line dark:bg-surface-dark dark:text-light/70',
          )}
        >
          <span className="mr-1 font-mono text-[10px] opacity-60">{s.letter}</span>{s.title}
        </button>
      ))}
    </nav>
  )
}

export function Prose({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('max-w-reading', className)}>{children}</div>
}
