/**
 * @cea/config — single source of truth for brand + business config.
 *
 * ROADMAP COVERAGE: 1.1 (brand tokens), 7.1 (pricing), 8.1/8.2 (ads),
 * 7.12 (access policy), 5.1/5.2 (XP + rank constants live here so the API,
 * the UI and the tests can never disagree).
 *
 * GAP CLOSED: the roadmap says "extract brand tokens from cealogo.png", but the
 * logo only carries two colours (navy + pale blue). The real accent palette is
 * in the 141 concept diagrams, so the tokens below were sampled from those
 * renders (`tools/pdf-extract`), which is why blue/green/red/cream appear here.
 */

export const brand = {
  name: 'Cyber Elias Academy',
  short: 'CEA',
  app: 'CEA Learn',
  tagline: 'From Zero to Expert, Together',
  url: 'https://cea.ng',
  learnUrl: 'https://learn.cea.ng',
  address: '24/26 Ebony Road, Off Rumuola Road, Port Harcourt, Rivers State, Nigeria',
  certificateVerifyUrl: 'https://cea.ng/certificates/verify',
  supportEmail: 'hello@cea.ng',
  /** Sampled from cealogo.png (xref of the PDF cover) and the concept diagrams. */
  palette: {
    navy: '#1a365d',
    deep: '#0f1b33',
    blue: '#2c5282',
    sky: '#62b3ec',
    gold: '#d69e2e',
    mint: '#67d390',
    coral: '#fb8181',
    light: '#f7fafc',
    paper: '#fffdf5',
    success: '#38a169',
    error: '#e53e3e',
    warn: '#dd6b20',
    ink: '#12233d',
  },
}

/** 5.1 — XP rules. Kept as data so the ledger and the UI share one definition. */
export const XP = {
  lessonRead: 10,
  quizPass: 20,
  quizPerfectBonus: 10,
  exerciseSubmit: 15,
  sessionComplete: 25,
  streakDay: 5,
  streakWeekBonus: 50,
  badgeAward: 25,
  /** 5.9 anti-cheat — a learner cannot farm more than this in a day. */
  dailyCap: 300,
  /** 5.9 — minimum seconds between a session-open and a completion award. */
  minCompletionSeconds: 45,
  quizPassPercent: 60,
}

/** 5.2 — rank ladder. */
export const RANKS = [
  { key: 'rookie', name: 'Rookie', min: 0, blurb: 'Just signed in. Every agent starts here.' },
  { key: 'agent', name: 'Agent', min: 500, blurb: 'You can work a lesson without hand-holding.' },
  { key: 'specialist', name: 'Specialist', min: 1500, blurb: 'Multiple missions underway, quizzes passing.' },
  { key: 'pro', name: 'Pro', min: 4000, blurb: 'Consistent, and finishing what you start.' },
  { key: 'master', name: 'Master', min: 10000, blurb: 'A full course or two, plus the streak to match.' },
  { key: 'legend', name: 'Legend', min: 25000, blurb: 'The top of the academy. Mentions others.' },
]

/** 5.3 — streak config. */
export const STREAK = {
  graceMinutes: 120,
  freezesEarnedEvery: 7,
  maxFreezes: 2,
  /** Academy operates in Lagos/Port Harcourt — one timezone for everyone. */
  timezone: 'Africa/Lagos',
}

/** 7.1 — default fees. The DB table `course_pricing` overrides these at runtime. */
export const DEFAULT_FEES_NGN = {
  /** Read off the course PDFs (fees page of each manual) — not the README example,
   * which quoted ₦15,000 for Typing. `course_pricing` in the DB still wins, and
   * the content bundle carries the same numbers, so this map is only the fallback. */
  'typing-computer-basics': 20000,
  'data-entry': 20000,
  'online-teaching': 25000,
  'business-freelancing': 30000,
  'content-creation': 30000,
  'digital-productivity': 30000,
  'microsoft-office': 30000,
  'photography': 30000,
  'digital-marketing': 35000,
  'social-media-management': 35000,
  'cybersecurity': 40000,
  'graphic-design': 40000,
  'video-editing': 40000,
  'computer-repairs': 50000,
  'web-design': 50000,
  'web-development': 50000,
}

/** 7.2 — the manual-transfer instructions shown at checkout. */
export const PAYMENT = {
  bank: 'Moniepoint MFB',
  accountName: 'Delgra Ltd',
  accountNumber: '6674684361',
  referencePrefix: 'CEA',
  /** Admin should clear the queue inside this window (SLA promise to learners). */
  slaHours: 24,
  proofMaxBytes: 4 * 1024 * 1024,
  proofTypes: ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'],
  minAmountNgn: 1_000,
  /**
   * GAP FIX — the course PDFs promise a certificate but are silent on refunds and
   * on how long we keep a learner's data, and nothing in the README decided either.
   * This is the policy the app enforces and /terms + /privacy state, so the number
   * lives in code (one source) rather than in prose that can drift.
   */
  refundWindowDays: 7,
  refundCondition: 'requested before level 3 of the course is unlocked',
  /** NDPR retention: progress + receipts are kept while the account is open, then 90 days. */
  retentionGraceDays: 90,
}

/** 7.12 — access duration policy. */
export const ACCESS = { mode: 'lifetime', monthsWhenTimed: 6 }

/**
 * 3.7 — abuse thresholds. The README asked for rate limiting but never gave
 * numbers, so these are the shipped policy: strict where money or accounts are
 * created, looser where a learner is just retrying a password. `devHeadroom`
 * keeps automated tests and local hot-reload from tripping the production
 * limits while still exercising the same code path.
 */
export const RATE_LIMITS = {
  register: { limit: 5, windowSec: 3600 },
  login: { limit: 6, windowSec: 300 },
  loginPerIp: { limit: 25, windowSec: 300 },
  forgotPassword: { limit: 4, windowSec: 900 },
  certificateIssue: { limit: 10, windowSec: 600 },
  adminAction: { limit: 120, windowSec: 60 },
  devHeadroom: 20,
}

/** 8.1 / 8.2 — ad networks. Ads are OFF until the site is AdSense-approved. */
export const ADS = {
  enabled: process.env.NEXT_PUBLIC_ADS === 'on',
  adsense: { clientId: 'ca-pub-9117572925263537', slotCatalogue: '1000000001', slotCompletion: '1000000002' },
  ngAdverts: { script: 'https://ngadverts.com/ad/ads.js', slots: [13225, 13226] },
  /** 8.3 — placement policy, expressed as code so it cannot drift from the doc. */
  policy: {
    allowedPlacements: ['catalogue-footer', 'course-after-syllabus', 'level-complete-side', 'leaderboard-side', 'dashboard-side'],
    forbidden: ['inside-quiz', 'mid-paragraph', 'above-fold-on-mobile', 'lesson-body'],
    maxPerView: 2,
  },
}

/** Money formatting used everywhere (2.8 flags inconsistent ₦ formatting). */
export function formatNgn(amount) {
  if (amount === null || amount === undefined) return 'Free preview'
  return '₦' + Number(amount).toLocaleString('en-NG', { maximumFractionDigits: 0 })
}

export function rankForXp(xp) {
  let current = RANKS[0]
  for (const r of RANKS) if (xp >= r.min) current = r
  const next = RANKS[RANKS.indexOf(current) + 1] || null
  const span = next ? next.min - current.min : 1
  const pct = next ? Math.min(100, Math.round(((xp - current.min) / span) * 100)) : 100
  return { current, next, pctIntoRank: pct, toNext: next ? Math.max(0, next.min - xp) : 0 }
}

export default { brand, XP, RANKS, STREAK, DEFAULT_FEES_NGN, PAYMENT, ACCESS, ADS }
