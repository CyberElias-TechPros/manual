/**
 * @cea/content — schema (ROADMAP 2.1).
 *
 * Every type here is derived from what the *actual* PDFs contain, not from the
 * letter scheme assumed by the roadmap. See `docs/GAP-ANALYSIS.md` §1: the docs
 * say "quiz from §N / case study from §K / rubric from §M", but in the shipped
 * manuals the knowledge check is §M, the case study is §J and the rubric lives
 * inside §L — and capstone sessions rename their headings entirely. So the
 * stable contract is `kind` (semantic), while `letter` is display-only.
 */

export type SectionKind =
  | 'identification' | 'outcomes' | 'materials' | 'prereq_review' | 'opening'
  | 'lecture' | 'demo' | 'guided_practical' | 'exercise' | 'case_study'
  | 'troubleshooting' | 'assignment' | 'knowledge_check' | 'reflection'
  | 'instructor_notes' | 'rubric' | 'other'

export type Inline =
  | { t: 'text'; v: string }
  | { t: 'strong'; v: string }
  | { t: 'code'; v: string }
  | { t: 'link'; v: string; href: string }

export type Block =
  | { t: 'h'; depth: 1 | 2 | 3 | 4; text: string; inline: Inline[] }
  | { t: 'p'; text: string; inline: Inline[] }
  | { t: 'list'; ordered: boolean; items: { text: string; inline: Inline[] }[] }
  | { t: 'code'; lang: string; text: string }
  | { t: 'callout'; tone: 'tip' | 'warn' | 'note' | 'mistake' | 'naira'; title?: string; text: string; inline: Inline[] }
  | { t: 'table'; head: string[]; rows: string[][] }
  | { t: 'quote'; text: string; inline: Inline[] }

export interface InlineParse { text: string; inline: Inline[] }

export interface Hotspot { label: string; x: number; y: number; w: number; h: number; mono?: boolean }

export interface Diagram {
  /** empty when the visual was generated from the level's own steps instead of clipped from the PDF */
  src: string
  /** 4.8 fallback: a numbered flow rendered from the exercise procedure (no bytes, screen-reader first) */
  flow?: { title: string; steps: string[] }
  width: number
  height: number
  page?: number
  alt: string
  transcript: string[]
  hotspots: Hotspot[]
}

export interface Section {
  letter: string
  kind: SectionKind
  title: string
  blocks: Block[]
  /** learner-visible text (instructor-only sections are stripped before this ships) */
  wordCount: number
  /** untouched markdown body — the interactive builders parse this, the client never sees it */
  raw: string
}

export type QuestionType = 'mcq' | 'true_false' | 'short_answer' | 'fill_blank' | 'code'

export interface Choice { id: string; text: string }

export interface Question {
  id: string
  type: QuestionType
  prompt: string
  /** multi-part prompts (a) b) c) d)) inside one question */
  parts?: string[]
  choices?: Choice[]
  /** letters of correct choices, e.g. ["b"] */
  correct?: string[]
  /** accepted free-text variants, normalised (lowercase, punctuation-free) */
  accept?: string[]
  modelAnswer: string
  explanation: string
  /** significant tokens of the model answer, used for server-side partial credit */
  keywords: string[]
  codeStarter?: string
  points: number
  tagged?: string
}

export interface Quiz {
  id: string
  title: string
  questions: Question[]
  passPercent: number
  source: 'knowledge_check' | 'viva' | 'authored'
}

export interface Exercise {
  id: string
  kind: 'guided' | 'independent' | 'assignment'
  title: string
  prompt: string
  steps: string[]
  successCriteria: string[]
  deliverables: string[]
  rubric: { criterion: string; marks: number | null; description: string }[]
  markingGuidance: string[]
  modelAnswer: string
  code?: string
}

export interface Scenario {
  id: string
  title: string
  situation: string
  facts: string[]
  decision: string
  options: { id: string; text: string }[]
  correctId: string | null
  feedback: Record<string, string>
  resolution: string
  example?: string
}

export interface Flashcard { id: string; front: string; back: string }

export interface Session {
  id: string
  course: string
  number: number
  of: number
  title: string
  module?: string
  durationMinutes?: number
  difficulty?: string
  prerequisiteKnowledge?: string
  connectionToPrevious?: string
  isFree: boolean
  /** capstone / "boss level" session (5.7) */
  isCapstone: boolean
  diagram?: Diagram
  sections: Section[]
  outcomes: string[]
  quiz: Quiz
  exercises: Exercise[]
  scenarios: Scenario[]
  flashcards: Flashcard[]
  checklist: string[]
  troubleshooting: { mistake: string; fix: string }[]
  /** The plain-English pass (11.x): the hard words this level uses, each with a one-line plain meaning. */
  glossary?: { term: string; plain: string }[]
  /** True when a hand-rewritten level in `content-plain/` replaced the extracted markdown. */
  plainOverridden?: boolean
  /** Share of this level's prose sentences that run over 30 words — a rewrite signal, not a failure. */
  hardSentences?: number
  /** 6.3 — code-completion blanks generated from this session's own snippets */
  codeBlanks?: { id: string; language: string; template: string; blanks: { answer: string; accepts: string[] }[]; explain: string }[]
  estWords: number
  source: { file: string; pdf?: string; page?: number }
}

export interface Course {
  slug: string
  name: string
  displayTitle: string
  category?: string
  studyMode?: string
  duration?: string
  weeks?: number
  sessionsPerWeek?: number
  sessionLengthMinutes?: number
  sessionsCount: number
  feeNgn: number | null
  /** true when the manual promises one — every CEA course does; the name is separate */
  certificate?: boolean
  certificateName?: string
  mission?: string
  problem?: string
  progression?: string
  runningExample?: string
  successDefinition?: string
  scopeStatement?: string
  audience: string[]
  entryRequirements: string[]
  tools: string[]
  accent: string
  cover: string
  /**
   * Derived by the build for the catalogue and the course page (the manuals state
   * outcomes per level, not per course, so the course's own words are taken from the
   * capstone level — the manual's exit standard — and the blurb from the problem the
   * course was written to solve).
   */
  tagline?: string
  description?: string
  level?: string
  outcomes?: string[]
  prerequisites?: string[]
  firstSessionFree?: boolean
  sessions: { number: number; title: string; module?: string; isFree: boolean; isCapstone: boolean }[]
  pdf: Record<string, string>
}

export interface CatalogueIndex {
  version: number
  generatedAt: string
  totals: { courses: number; sessions: number; questions: number; exercises: number; scenarios: number; words: number }
  courses: Course[]
}

export interface LintIssue { level: 'critical' | 'warn' | 'info'; file: string; code: string; message: string }
