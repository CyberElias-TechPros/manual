/**
 * ROADMAP 2.3 / 2.4 / 2.5 (+ data for 6.3, 6.5, 6.7) — turn existing lesson
 * text into interactive objects, so nothing about the game layer requires new
 * authoring.
 *
 * 2.3 quiz        <- "Knowledge Check" section (M in the shipped manuals)
 * 2.4 exercises   <- Guided practical (H), Independent exercise (I), Assignment (L)
 * 2.5 scenarios   <- Real-world case study (J) -> branching decision
 * 6.3 fill-blank  <- generated code-completion from the lecture's own snippets
 * 6.5 flashcards  <- term/definition pairs lifted from the lecture
 * 6.7 checklist   <- success criteria + rubric rows + deliverables
 */
import type { Block, Exercise, Flashcard, Question, Scenario, Section, SectionKind } from './schema.js'

const STOP = new Set(('the a an and or of to in for on with by is are be this that these those it its as at from into we you they he she i your our their not but if then else when what which who how why do does did can could should would will may might must have has had been being also more most than too very just only own same such no nor so than too both each few other another because while about against between during before after above below up down out off over under again further once here there all any some'.split(' ')))

export const norm = (s: string): string =>
  s.toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[“”‘’]/g, "'")
    .replace(/[^\p{L}\p{N}\s.,%₦+*/=<>&'()#-]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()

/** "a) string, b) number" -> ["string","number"] style helpers */
const OPTION_RE = /(?:^|[\s(])([a-h])\s*[).]\s+/g

/** Some manuals put every question on one line (they were paragraphs in the PDF),
 * so boundaries may appear mid-line. We only accept a strictly ascending run of
 * Q1,Q2,Q3… which keeps "Q3" inside prose from splitting a question. */
function splitNumbered(text: string, marker: 'Q' | 'A' | ''): Map<number, string> {
  const out = new Map<number, string>()
  const re = new RegExp(`(?:^|[\\n\\s])${marker}(\\d{1,2})\\s*[.)]\\s+`, 'g')
  const hits: { n: number; start: number; end: number }[] = []
  let m: RegExpExecArray | null
  let expect = 1
  while ((m = re.exec(text))) {
    const n = Number(m[1])
    if (n !== expect) {
      // tolerate a skipped number once, but never go backwards
      if (n !== expect + 1 || expect !== 1 && marker === 'Q') continue
      expect = n
    }
    hits.push({ n, start: m.index, end: m.index + m[0].length })
    expect = n + 1
  }
  hits.forEach((h, i) => {
    const stop = i + 1 < hits.length ? hits[i + 1].start : text.length
    const body = text.slice(h.end, stop).trim()
    if (body) out.set(h.n, body)
  })
  return out
}

function extractOptions(stem: string): { choices: { id: string; text: string }[]; stem: string } | null {
  const marks: { id: string; start: number; textStart: number }[] = []
  OPTION_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = OPTION_RE.exec(stem))) {
    if (m[1] && (!marks.length || m[1].charCodeAt(0) === marks[marks.length - 1].id.charCodeAt(0) + 1)) {
      marks.push({ id: m[1], start: m.index, textStart: m.index + m[0].length })
    }
  }
  if (marks.length < 2) return null
  const choices = marks.map((mk, i) => ({
    id: mk.id,
    text: stem.slice(mk.textStart, i + 1 < marks.length ? marks[i + 1].start : stem.length).trim().replace(/\s+/g, ' '),
  })).filter(c => c.text.length > 0 && c.text.length < 320)
  if (choices.length < 2) return null
  return { choices, stem: stem.slice(0, marks[0].start).trim() }
}

function keywordsOf(answer: string, extra: string[] = []): string[] {
  const words = norm(answer)
    .split(/[^\p{L}\p{N}₦.%+*/=<>&'#$-]+/u)
    .filter(w => w.length > 3 && !STOP.has(w))
  const freq = new Map<string, number>()
  for (const w of words) freq.set(w, (freq.get(w) || 0) + 1)
  const top = [...freq.entries()].sort((a, b) => b[1] - a[1]).slice(0, 8).map(([w]) => w)
  const nums = [...new Set(answer.match(/\b\d[\d,.]*\b/g) || [])]
  const code = extra.filter(Boolean)
  return [...new Set([...top, ...nums, ...code.map(k => norm(k))])].slice(0, 14)
}

const TAGS: { re: RegExp; type: Question['type']; label: string }[] = [
  { re: /^(multiple choice|choose the|which of the|select the)/i, type: 'mcq', label: 'Multiple choice' },
  { re: /^(true or false|state whether|t\/f)/i, type: 'true_false', label: 'True / false' },
  { re: /^(fill in|complete the|supply the|fill the blank)/i, type: 'fill_blank', label: 'Fill in the blank' },
  { re: /^(write the code|code|fix the|debug|correct the|error detection|build a? ?function)/i, type: 'code', label: 'Code' },
]

function tagOf(stem: string): { tag: string | undefined; rest: string; type: Question['type'] | null } {
  const m = /^([A-Z][A-Za-z' /.\-]{2,42}?)[.:]\s(?=[A-Z("“])/.exec(stem)
  if (!m) return { tag: undefined, rest: stem, type: null }
  const tag = m[1].trim()
  const hit = TAGS.find(t => t.re.test(tag))
  return { tag, rest: stem.slice(m[0].length), type: hit ? hit.type : null }
}

const looksLikeCode = (s: string) =>
  /(<\/?[a-z][a-z0-9-]*\b|=>|\bfunction\b|\bconst\b|\blet\b|[{}]\s*$|\bconsole\.log\b|\bSELECT\b|\bdiv\b)/i.test(s) && s.length < 1400

/** 2.3 — Knowledge Check -> Quiz. Answer key never reaches the browser. */
export function buildQuiz(section: Section, sessionId: string, passPercent = 60) {
  const raw = section.raw || ''
  let keyIdx = raw.search(/^\s*(INSTRUCTOR )?ANSWER KEY/im)
  // Some manuals print no key heading at all — the answers simply follow the questions, labelled
  // "A1." to "A6." (Video Editing 3, and the Cybersecurity viva once its heading is recognised). The
  // first A-label is the boundary in that shape; without it the whole block stays "learner text" and
  // every question reads as unkeyed.
  if (keyIdx < 0) {
    const first = /(?:^|\n)\s*A1\s*[.)]/.exec(raw)
    if (first) keyIdx = first.index
  }
  const learnerPart = keyIdx > 0 ? raw.slice(0, keyIdx) : raw
  const keyPart = keyIdx > 0 ? raw.slice(keyIdx) : ''
  let qs = splitNumbered(learnerPart.replace(/^\(Learner version[^\n]*\n/i, ''), 'Q')
  let as = splitNumbered(keyPart, 'A')
  if (qs.size < 3) {
    // Second layout in the corpus (e.g. Data Entry, Graphic Design, MS Office):
    //   1. Multiple Choice: <stem> a) … b) …
    //   Answer: b) …
    const alt = splitInlineAnswers(raw.replace(/^\s*Questions\s*$/gim, '').replace(/^\(Learner version[^\n]*\n/i, ''))
    if (alt.questions.size > qs.size) { qs = alt.questions; as = alt.answers }
  }
  // A key block that repeats the questions' own numbering ("Answer Key … 1. Select the text") instead
  // of labelling each answer "A1." is the third layout in this corpus — Microsoft Office 9, Typing 6,
  // Data Entry 6, Graphic Design 12, Computer Repairs 12, Video Editing 3. The parser only looked for
  // A-prefixes, so those levels' 60-odd questions have been sitting unkeyed (the learner gets "a tutor
  // reads it" for every one) while the answers were in the file the whole time.
  if (keyPart && as.size === 0) {
    const bare = splitNumbered(keyPart, '')
    const wanted = [...qs.keys()]
    const overlap = wanted.filter(n => bare.has(n)).length
    if (wanted.length && overlap >= Math.max(3, Math.floor(wanted.length * 0.6))) as = bare
  }

  const questions: Question[] = []

  for (const [n, body] of qs) {
    // Third layout in the corpus — the capstone vivas (Cybersecurity 9, Typing 6, MS Office 9): the
    // model answer is interleaved with its question instead of collected in a key block below, so the
    // answer has to be lifted out of the prompt or the question reads as unkeyed forever.
    // the label carries a qualifier as often as not — "Model answer (key honesty question):", "Model answer (honest):"
    const inline = /(?:\n|(?<=\s))(?:Model|Suggested|Expected|Sample|Reference)\s+answer(?:\s*\([^)]*\))?\s*:\s*/i.exec(body)
    // Only when the key block itself is silent about this question — some manuals drop a single
    // "Model answer (honest):" note into the question instead of the key (Web Design 12's project
    // review), which otherwise reads as unkeyed forever and buries the prompt under the answer.
    const needsInline = inline && !(as.get(n) || '').trim()
    const inlineAnswer = needsInline ? body.slice(inline.index + inline[0].length).trim() : ''
    const bodyText = needsInline ? body.slice(0, inline.index).trim() : body
    const answer = ((as.get(n) || '').replace(/^[\s(]*ANSWER[:)]?\s*/i, '').trim()) || inlineAnswer
    const { tag, rest, type: taggedType } = tagOf(bodyText.trim())
    let text = rest
    let type: Question['type'] = taggedType || 'short_answer'
    let choices: { id: string; text: string }[] | undefined
    let correct: string[] | undefined
    let codeStarter: string | undefined
    let parts: string[] | undefined

    const fence = /```(\w*)\n([\s\S]*?)```/.exec(text)
    if (fence) { codeStarter = fence[2].trim(); text = text.replace(fence[0], '').trim() }

    const opt = extractOptions(text)
    const answerLetter = /^\s*\(?\s*([a-h])\s*[).]?\s*[.,-]?\s/i.exec(answer)
    const answerSaysLetter = answerLetter && (answer.length < 200 || /^(b|c|a|d)\b/i.test(answer))
    const optMatchesAnOption = !!opt && !!answerLetter && opt.choices.some(ch => ch.id === answerLetter![1].toLowerCase())
    if (opt && (type === 'mcq' || optMatchesAnOption || (answerSaysLetter && (taggedType === 'mcq' || /option|choice/i.test(tag || ''))))) {
      choices = opt.choices
      text = opt.stem
      correct = answerSaysLetter ? [answerLetter![1].toLowerCase()] : undefined
      if (!correct) {
        // fall back: match the answer text to the closest option
        const na = norm(answer)
        const best = choices.reduce((acc, c) => {
          const score = norm(c.text).split(' ').filter(w => na.includes(w)).length
          return score > acc.score ? { id: c.id, score } : acc
        }, { id: '', score: 0 })
        if (best.id) correct = [best.id]
      }
      type = 'mcq'
    } else if (type !== 'code' && (looksLikeCode(text) || looksLikeCode(answer))) {
      type = 'code'
    } else if (type === 'short_answer' && /^true or false/i.test(tag || '')) {
      type = 'true_false'
    }
    if (type === 'true_false' && !choices) {
      choices = [{ id: 'true', text: 'True' }, { id: 'false', text: 'False' }]
      if (!correct) {
        const a = norm(answer)
        if (/^true/.test(a) || /\btrue\b/.test(a.slice(0, 40)) && !/false/.test(a.slice(0, 40))) correct = ['true']
        else if (/^false/.test(a) || /\bfalse\b/.test(a.slice(0, 40))) correct = ['false']
      }
    }
    // multi-part prompts (a) (b) (c) (d) answered as "a) … b) …"
    if (!choices) {
      const sub = extractOptions(text)
      if (sub && sub.choices.length >= 2 && sub.choices.every(c => c.text.length <= 80)) {
        parts = sub.choices.map(c => `${c.id}) ${c.text}`)
      }
    }

    const modelAnswer = answer || ''
    questions.push({
      id: `${sessionId}#q${n}`,
      type,
      prompt: text.replace(/\s+/g, ' ').trim(),
      parts,
      choices,
      correct,
      accept: type === 'true_false' ? correct : type === 'fill_blank' ? answer.split(/\s*(?:or|\/|,)\s*/).map(norm).filter(x => x.length > 1 && x.length < 60) : undefined,
      modelAnswer,
      explanation: modelAnswer ? (modelAnswer.length > 240 ? 'Model answer shown below — compare it with yours, point by point.' : '') : 'No answer key in the source; ask your instructor.',
      keywords: keywordsOf(modelAnswer, codeStarter ? [codeStarter.split(/\W+/).slice(0, 3).join(' ')] : []),
      codeStarter,
      points: 10,
      tagged: tag,
    })
  }

  const answerKey: Record<string, any> = {}
  for (const q of questions) {
    answerKey[q.id] = { correct: q.correct, accept: q.accept, modelAnswer: q.modelAnswer, keywords: q.keywords, type: q.type }
  }
  return {
    quiz: {
      id: `${sessionId}#quiz`,
      title: 'Knowledge check',
      questions: questions.map(q => ({ ...q, modelAnswer: '', explanation: q.explanation, keywords: [] as string[], accept: undefined, correct: undefined })),
      passPercent,
      source: 'knowledge_check' as const,
    } satisfies import('./schema.js').Quiz,
    answerKey,
    questionCount: questions.length,
  }
}

/** Numbered questions with an inline "Answer:" line, used by the office-suite courses. */
function splitInlineAnswers(text: string): { questions: Map<number, string>; answers: Map<number, string> } {
  const questions = new Map<number, string>()
  const answers = new Map<number, string>()
  const marks: { n: number; start: number; end: number }[] = []
  const re = /(?:^|\n)\s*(\d{1,2})[.)]\s+/g
  let m: RegExpExecArray | null
  let expect = 1
  while ((m = re.exec(text))) {
    const n = Number(m[1])
    if (n !== expect) continue
    marks.push({ n, start: m.index, end: m.index + m[0].length })
    expect++
  }
  marks.forEach((h, i) => {
    const chunk = text.slice(h.end, i + 1 < marks.length ? marks[i + 1].start : text.length)
    if (!/^(multiple choice|true\/false|short answer|fill in|explain|list|practical|error|scenario|define|write|state|outline|calculate|describe|compare|identify|give|name|match|why|what|which|how)/i.test(chunk.trim())) return
    // "Answer:" on its own line is the separator. An inline one usually is too — except
    // when it is part of the question's own type tag ("2. Short Answer: What is a cell
    // reference?"), where cutting there used to leave the learner a question that read
    // "Short". So an inline label only counts if enough survived in front of it to be a
    // question, and a line-start label always wins.
    const am = /(?:^|\n)[ \t]*(?:ANSWER|Model answer|Suggested answer|Solution)[ \t]*[:.\-][ \t]*/i.exec(chunk)
      || /(?:^|\n|\s)(?:ANSWER|Model answer|Suggested answer|Solution)\s*[:.\-]\s*/i.exec(chunk.replace(/(?:Multiple choice|True[ /]false|Short answer|Fill in the blank|Explain[^\n:]{0,24}|List[^\n:]{0,24}|State[^\n:]{0,24}|Define[^\n:]{0,24}|Outline[^\n:]{0,24}|Write[^\n:]{0,24}|Calculate[^\n:]{0,24}|Describe[^\n:]{0,24}|Compare[^\n:]{0,24}|Identify[^\n:]{0,24}|Error detection[^\n:]{0,24}|Scenario[^\n:]{0,24}|Practical[^\n:]{0,24}|Name[^\n:]{0,24}|Give[^\n:]{0,24}|Match[^\n:]{0,24}|Why[^\n:]{0,24}|What[^\n:]{0,24}|Which[^\n:]{0,24}|How[^\n:]{0,24})\s*:/gi, m2 => m2.replace(/:/g, '\u0000')))
    if (am && am.index >= 0 && chunk.slice(0, am.index).replace(/\u0000/g, ':').trim().length > 12) {
      questions.set(h.n, chunk.slice(0, am.index).replace(/\u0000/g, ':').replace(/\s+/g, ' ').trim())
      answers.set(h.n, chunk.slice(am.index + am[0].length).replace(/\s+/g, ' ').trim())
    } else {
      questions.set(h.n, chunk.replace(/\u0000/g, ':').replace(/\s+/g, ' ').trim())
    }
  })
  return { questions, answers }
}

// ---------------------------------------------------------------------------
// 2.4 — exercises
// ---------------------------------------------------------------------------

function bulletsUnder(md: string, labelRe: RegExp, limit = 14): { items: string[]; rest: string } {
  const m = labelRe.exec(md)
  if (!m) return { items: [], rest: md }
  const after = md.slice(m[0].length)
  const stop = after.search(/\n\s*\n/)
  const chunk = stop > 0 ? after.slice(0, stop) : after.slice(0, 900)
  const items = chunk
    .split('\n')
    .map(l => l.trim().replace(/^[-•✓\d+.)\s]+/, '').replace(/\*\*/g, ''))
    .filter(l => l.length > 2)
  return { items: items.slice(0, limit), rest: (md.slice(0, m.index) + after.slice(chunk.length)).trim() }
}

const KEY_LABELS = /^\s*(Instructor answer key[^\n:]*|Instructor reference solution[:\s]*|Model answer[:\s]*|Suggested answer[:\s]*|Worked answer[:\s]*)/im

export function buildExercises(sections: Section[], sessionId: string): Exercise[] {
  const out: Exercise[] = []
  const sources: { kind: Exercise['kind']; kindName: SectionKind; label: string }[] = [
    { kind: 'guided', kindName: 'guided_practical', label: 'Guided practical' },
    { kind: 'independent', kindName: 'exercise', label: 'Independent exercise' },
    { kind: 'assignment', kindName: 'assignment', label: 'Assignment' },
  ]
  for (const s of sources) {
    const sec = sections.find(x => x.kind === s.kindName)
    if (!sec || !sec.raw.trim()) continue
    let raw = sec.raw
    // ---- answer key (server-side only) ----
    let modelAnswer = ''
    let code: string | undefined
    const km = KEY_LABELS.exec(raw)
    if (km) {
      modelAnswer = raw.slice(km.index + km[0].length).replace(/^[:\s-]+/, '').trim()
      raw = raw.slice(0, km.index).trim()
      const fence = /```(\w*)\n([\s\S]*?)```/.exec(modelAnswer)
      if (fence) code = fence[2].trim()
    }
    const success = bulletsUnder(raw, /^\s*Success criteria[:\s]*/im)
    const marking = bulletsUnder(raw, /^\s*Marking guidance[^\n]*[:\s]*/im)
    const deliverables = bulletsUnder(raw, /^\s*(Required deliverables|Deliverables)[:\s]*/im)
    const steps = bulletsUnder(raw, /^\s*(Procedure[^\n]*|Requirements|Instructions|Detailed instructions)[:\s]*/im)
    const rubric = buildRubric(raw)
    const titleLine = /^\s*(Assignment title:)\s*"?([^"\n]+)"?/m.exec(raw)
    const taskLine = /^\s*(Task|Objective|Scenario)[:\s]\s*(.+)$/im.exec(raw)
    const prompt = (taskLine ? taskLine[2] : raw.split('\n').filter(l => l.trim() && !l.startsWith('#'))[0] || '')
      .replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()

    out.push({
      id: `${sessionId}#${s.kind}`,
      kind: s.kind,
      title: titleLine ? titleLine[2].trim() : s.label,
      prompt: prompt.slice(0, 700),
      steps: steps.items,
      successCriteria: success.items,
      deliverables: deliverables.items,
      rubric,
      markingGuidance: marking.items,
      modelAnswer: modelAnswer.replace(/```[^\n]*\n/g, '').replace(/```/g, '').slice(0, 4000),
      code,
    })
  }
  return out
}

/** 6.7 — rubric rows in the flattened PDF look like "<criterion> <marks> <description>". */
export function buildRubric(raw: string): Exercise['rubric'] {
  const m = /^\s*Marking rubric[^\n]*\n([\s\S]{20,1200}?)(?:\n\s*\n|^\s*(?:Note|Instructor reference|Total|Submission))/im.exec(raw)
  if (!m) return []
  const rows: Exercise['rubric'] = []
  for (const line of m[1].split('\n')) {
    const t = line.trim().replace(/\*\*/g, '')
    if (!t || /^criterion\b/i.test(t) || t.length < 12) continue
    const parts = [...t.matchAll(/\s(\d{1,2})\s(?=[A-Z(])/g)]
    if (!parts.length) { rows.push({ criterion: t, marks: null, description: '' }); continue }
    const p = parts[parts.length - 1]
    rows.push({
      criterion: t.slice(0, p.index).trim(),
      marks: Number(p[1]),
      description: t.slice(p.index + p[0].length).trim(),
    })
  }
  return rows.slice(0, 10)
}

// ---------------------------------------------------------------------------
// 2.5 — case study -> branching scenario
// ---------------------------------------------------------------------------

export function buildScenarios(sections: Section[], sessionId: string): Scenario[] {
  const sec = sections.find(s => s.kind === 'case_study')
  if (!sec || !sec.raw.trim()) return []
  const raw = sec.raw
  const pick = (re: RegExp) => { const m = re.exec(raw); return m ? m[1].replace(/\s+/g, ' ').trim() : '' }
  const situation = pick(/^\s*Situation[:.\s]([\s\S]{10,700}?)(?:\n\s*\n|Relevant facts)/im)
    || raw.split('\n').slice(0, 3).join(' ').replace(/\s+/g, ' ').trim().slice(0, 600)
  const factsBlock = /^\s*Relevant facts[:.\s]([\s\S]{5,700}?)(?:\n\s*\n|Decision point)/im.exec(raw)
  const facts = (factsBlock?.[1] || '')
    .split('\n').map(l => l.trim().replace(/^[-•\s]+/, '').replace(/\*\*/g, '')).filter(l => l.length > 3).slice(0, 8)
  const decision = pick(/^\s*Decision point[:.\s]([\s\S]{5,300}?)(?:\n\s*\n|Possible approaches)/im)
    || 'What do you do next?'
  const appBlock = /^\s*Possible approaches[:.\s]([\s\S]{10,1400}?)(?:\n\s*\n|Recommended solution)/im.exec(raw)
  const options = (appBlock?.[1] || '')
    .split('\n').map(l => l.trim().replace(/^\d+[.)]\s*/, '').replace(/\*\*/g, ''))
    .filter(l => l.length > 4).slice(0, 5)
    .map((text, i) => ({ id: String.fromCharCode(97 + i), text }))
  const recMatch = /^\s*Recommended solution[^\n]*[:.\s]([\s\S]{10,900}?)(?:\n\s*\n|Example solution|Worked)/im.exec(raw)
  const rec = recMatch ? recMatch[1].replace(/\s+/g, ' ').trim() : ''
  const recLetter = /Approach\s*(\d)/i.exec(rec)?.[1]
  const correctId = recLetter ? String.fromCharCode(96 + Number(recLetter)) : options.length === 1 ? options[0].id : null
  const example = /^\s*Example solution[:.\s]```(\w*)\n([\s\S]*?)```/im.exec(raw)?.[2]?.trim()
  const feedback: Record<string, string> = {}
  for (const o of options) {
    feedback[o.id] = o.id === correctId
      ? rec.replace(/^Approach\s*\d[.:\s]*/i, '') || 'Yes — this is the move the academy recommends at this stage.'
      : `Defensible, but not what the instructor recommends at this stage. ${o.text.split('.')[0]}. has a cost the recommendation avoids — then read the recommended solution and compare.`
  }
  return [{
    id: `${sessionId}#scenario`,
    title: 'Real-world case',
    situation, facts, decision, options, correctId, feedback,
    resolution: rec, example,
  }]
}

// ---------------------------------------------------------------------------
// 6.5 — flashcards, K — troubleshooting, checklist
// ---------------------------------------------------------------------------

export function buildFlashcards(sections: Section[], sessionId: string): Flashcard[] {
  const cards: Flashcard[] = []
  const seen = new Set<string>()
  for (const sec of sections.filter(s => ['lecture', 'demo', 'guided_practical', 'reflection'].includes(s.kind))) {
    for (const line of sec.raw.split('\n')) {
      const t = line.trim().replace(/^[-•\s]+/, '')
      let m = /^\*\*([^*]{3,44})[:.]\*\*\s*(.{8,240})$/.exec(t) || /^([A-Z][\w /()+.-]{2,40})\s+[—–-]\s+(.{8,240})$/.exec(t)
      if (!m) continue
      const front = m[1].replace(/[.:]$/, '').trim()
      const back = m[2].replace(/\*\*/g, '').trim()
      const key = norm(front)
      if (seen.has(key) || front.split(' ').length > 6 || /^(by the end|note|tip|warning|remember)$/i.test(front)) continue
      seen.add(key)
      cards.push({ id: `${sessionId}#fc${cards.length}`, front, back })
      if (cards.length >= 14) return cards
    }
  }
  const takeaways = sections.find(s => s.kind === 'reflection')
  if (takeaways) {
    const items = bulletsUnder(takeaways.raw, /^\s*Five important takeaways[:\s]*/im).items
    items.forEach((text, i) => {
      if (cards.length < 16) cards.push({ id: `${sessionId}#tk${i}`, front: `Takeaway ${i + 1}`, back: text })
    })
  }
  return cards
}

export function buildTroubleshooting(sections: Section[]): { mistake: string; fix: string }[] {
  const sec = sections.find(s => s.kind === 'troubleshooting')
  if (!sec) return []
  const out: { mistake: string; fix: string }[] = []
  for (const line of sec.raw.split('\n')) {
    const t = line.trim().replace(/^[-•\s]+/, '')
    let m = /^["“](.+?)["”]\s*(?:→|->|:)\s*(.+)$/.exec(t)
    if (!m) m = /^(.{8,90}?)\s*(?:→|->)\s*(.+)$/.exec(t)
    if (m) out.push({ mistake: m[1].replace(/\*\*/g, '').trim(), fix: m[2].replace(/\*\*/g, '').trim() })
  }
  if (!out.length) {
    const items = sec.raw.split('\n').map(l => l.trim()).filter(l => l.length > 12).slice(0, 6)
    for (const it of items) {
      const sp = it.split(/\s*(?:→|->)\s*/)
      out.push({ mistake: sp[0].replace(/^[-•\d.)\s]+/, '').slice(0, 140), fix: (sp[1] || '').slice(0, 300) })
    }
  }
  return out.filter(o => o.mistake).slice(0, 8)
}

export function buildChecklist(exercises: Exercise[], reflection?: Section): string[] {
  const items: string[] = []
  for (const e of exercises) {
    for (const s of e.successCriteria) items.push(s)
    if (e.kind === 'assignment') for (const r of e.rubric) items.push(r.criterion)
  }
  if (reflection) {
    for (const l of reflection.raw.split('\n')) {
      const m = /^(Can I .+|[A-Z].*\?)$/.exec(l.trim().replace(/^[-•\s]+/, ''))
      if (m) items.push(m[1].replace(/\?$/, ''))
    }
  }
  return [...new Set(items.map(i => i.replace(/[.]*$/, '').trim()).filter(i => i.length > 8))].slice(0, 14)
}

// ---------------------------------------------------------------------------
// 6.3 — code-completion generated from the lesson's own snippets
// ---------------------------------------------------------------------------

const CODE_TOKENS = /\b(const|let|function|return|document|querySelector|getElementById|addEventListener|console\.log|await|async|forEach|localStorage|JSON\.parse|JSON\.stringify|if|else|for|while|class|id)\b/g

export function buildCodeBlanks(blocks: Block[], sessionId: string, max = 2) {
  const out: { id: string; language: string; template: string; blanks: { answer: string; accepts: string[] }[]; explain: string }[] = []
  const codes = blocks.filter(b => b.t === 'code' && (b as any).text.split('\n').length >= 2) as Extract<Block, { t: 'code' }>[]
  for (const c of codes.slice(0, 6)) {
    if (out.length >= max) break
    const hits = [...c.text.matchAll(CODE_TOKENS)]
    if (hits.length < 1) continue
    const pick = hits[Math.min(hits.length - 1, 1 + out.length * 2)]
    const answer = pick[1]
    const before = c.text.slice(Math.max(0, pick.index - 90), pick.index)
    const after = c.text.slice(pick.index + answer.length, pick.index + 240)
    if (!/^\s*[\w'"`(<>{})[\];,.\s=+-]*$/.test(before.slice(-40))) continue
    out.push({
      id: `${sessionId}#blank${out.length}`,
      language: c.lang,
      template: `...${before}{{0}}${after}...`,
      blanks: [{ answer, accepts: [answer.replace(/\./g, ''), answer.split('.')[0]] }],
      explain: `\`${answer}\` comes straight from the worked example in this session — the instructor types it, then you did.`,
    })
  }
  return out
}
