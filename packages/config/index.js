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
  /**
   * Added with the "gamified everywhere" decision (2026-10-29). Every one of these is awarded by
   * the API, never by the client — the reason 5.9 exists is that a modified bundle must not be able
   * to mint XP, so a spinner, a combo or a show-up bonus is a *server* number the UI only reports.
   */
  spinBonus: 15,
  comboStreak: 5,
  firstLevelToday: 15,
  questComplete: 30,
  /** 5.9 anti-cheat — raised with more ways to earn, still a hard ceiling per day. */
  dailyCap: 600,
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

/**
 * 7.12 — access policy.
 *
 * The academy's call on 2026-10-29: **payments are paused, the whole catalogue is open**, and the
 * price stays visible on the course card so the money story is still told. `mode: 'free'` is read
 * in one place (`lockState`), so the checkout screens, `/api/payments`, the admin approval queue,
 * the fee tables and their smoke tests all keep working untouched — `CEA_ACCESS_MODE=paid` flips
 * the app back to paid gating without a rebuild of anything else. That is deliberate: "for now"
 * should cost one environment variable, not a re-architecture.
 */
export const ACCESS = {
  mode: process.env.CEA_ACCESS_MODE === 'paid' ? 'lifetime' : 'free',
  monthsWhenTimed: 6,
  /** Course cards still show the fee, with this line under it. */
  showPrices: true,
  priceNote: 'Payments are paused — every level is open, start today free.',
}

/** The one question every access check asks. */
export const isFreeAccess = () => ACCESS.mode === 'free'

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

/**
 * 8.1 / 8.2 — ad networks, and the monetisation surface.
 *
 * The academy's call on 2026-10-29: **ads carry the product** while payments are paused, so the
 * old placement policy (8.3: nothing in the lesson body, nothing between a question and its verdict,
 * at most two per view) is retired — see `policy.forbidden`, which is now empty *by decision* and is
 * written down in docs/DESIGN.md so nobody "restores" it by accident. `maxPerView` is kept as a
 * readability floor, not a moral one: past this many on one screen the page stops being a lesson.
 *
 * `enabled` still means "AdSense has approved this site". Until then a slot never renders an empty
 * grey box: `fillEmpty` makes it show a house promo instead (another course, a free level, a study
 * tip), which is also the inventory you would sell to a Nigerian sponsor first.
 */
export const ADS = {
  enabled: process.env.NEXT_PUBLIC_ADS === 'on',
  fillEmpty: process.env.NEXT_PUBLIC_ADS_FILL !== 'off',
  adsense: { clientId: 'ca-pub-9117572925263537', slotCatalogue: '1000000001', slotCompletion: '1000000002' },
  ngAdverts: { script: 'https://ngadverts.com/ad/ads.js', slots: [13225, 13226] },
  /** 8.3 — placement policy, expressed as code so it cannot drift from the doc. */
  policy: {
    allowedPlacements: [
      'catalogue-footer', 'catalogue-inline', 'course-hero', 'course-after-syllabus', 'course-side',
      'map-side', 'lesson-top', 'lesson-inline', 'lesson-between-stages', 'after-question',
      'level-complete-side', 'level-complete-band', 'dashboard-side', 'dashboard-inline',
      'leaderboard-side', 'profile-side', 'certificate-top', 'auth-side', 'search-results',
      'checkout-note', 'offline', 'notfound', 'styleguide',
    ],
    /** 8.3 is retired by decision (2026-10-29). The floor that remains is `maxPerView` + data-saver. */
    forbidden: [],
    maxPerView: 6,
    /** Learners who turn data-saver on still get no ads: it is their explicit choice, on a metered SIM. */
    respectDataSaver: true,
  },
}

/**
 * 5.x — the game furniture. Kept as data next to XP/RANKS for the same reason they are: the API, the
 * UI and the tests must not disagree about what a reward is worth.
 */
export const GAME = {
  /**
   * The daily wheel. Rolled on the server from (user, day) — a client cannot pick its own prize, and
   * a refresh cannot re-roll it. One free spin a day, plus one more once the streak is 3 days old.
   */
  wheel: {
    spinsPerDay: 1,
    bonusSpinStreakDays: 3,
    segments: [
      { id: 'small', label: '+10 XP', xp: 10, weight: 26 },
      { id: 'common', label: '+20 XP', xp: 20, weight: 22 },
      { id: 'good', label: '+40 XP', xp: 40, weight: 10 },
      { id: 'shield', label: 'Streak shield', xp: 5, freeze: 1, weight: 12 },
      { id: 'boost', label: 'Badge boost', xp: 25, weight: 6 },
      { id: 'again', label: 'Try tomorrow', xp: 5, weight: 24 },
    ],
  },
  /** Three correct in a row lights the combo. The bonus is paid at the end of the check, by the API. */
  combo: { trigger: 3, xpPerCorrect: 2, max: 10 },
  /** One "you showed up today" bonus per day, awarded with the first completed level. */
  firstLevelToday: true,
  /** Streak calendar on /profile and /dashboard: 12 weeks of squares, ~90 days of activity. */
  streakCalendarWeeks: 12,
  /** How many levels a day the quest line expects; the quest itself stays one per day (5.8). */
  questTarget: 1,
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

export default { brand, XP, RANKS, STREAK, DEFAULT_FEES_NGN, PAYMENT, ACCESS, ADS, GAME }
