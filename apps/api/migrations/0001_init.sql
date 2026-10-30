-- CEA Learn — schema (ROADMAP 3.1, 4.6, 5.1-5.6, 7.1-7.12)
-- Written once for SQLite so it runs unchanged on Cloudflare D1 and on the
-- node:sqlite dev adapter. Everything money- or progress-related is server-side.
PRAGMA foreign_keys = ON;

-- 3.1 accounts -----------------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id                TEXT PRIMARY KEY,
  email             TEXT NOT NULL UNIQUE,
  phone             TEXT,
  name              TEXT NOT NULL,
  password_hash     TEXT NOT NULL,
  role              TEXT NOT NULL DEFAULT 'learner',      -- learner | admin
  is_guest          INTEGER NOT NULL DEFAULT 0,
  avatar_seed       TEXT,
  xp                INTEGER NOT NULL DEFAULT 0,
  streak_count      INTEGER NOT NULL DEFAULT 0,
  streak_best       INTEGER NOT NULL DEFAULT 0,
  streak_freezes    INTEGER NOT NULL DEFAULT 0,
  last_active_date  TEXT,                                  -- YYYY-MM-DD, Africa/Lagos
  streak_lost_date  TEXT,
  leaderboard_opt_in INTEGER NOT NULL DEFAULT 1,
  data_saver        INTEGER NOT NULL DEFAULT 0,
  theme             TEXT NOT NULL DEFAULT 'system',        -- light | dark | system
  email_prefs       TEXT NOT NULL DEFAULT 'welcome,payments,streak',
  banned_at         TEXT,
  banned_reason     TEXT,
  created_at        TEXT NOT NULL,
  updated_at        TEXT
);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_xp ON users(xp DESC);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(last_active_date DESC);

-- 3.3 sessions (cookie -> user). Session id is the JWT jti so a token can be revoked.
CREATE TABLE IF NOT EXISTS auth_sessions (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TEXT NOT NULL, expires_at TEXT NOT NULL, user_agent TEXT, ip TEXT
);
CREATE INDEX IF NOT EXISTS idx_authsessions_user ON auth_sessions(user_id);

-- 3.4 password reset: single-use, expiring
CREATE TABLE IF NOT EXISTS password_resets (
  token_hash TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at TEXT NOT NULL,
  used_at TEXT, created_at TEXT NOT NULL
);

-- 2.12 content index (seeded by `pnpm content:build` -> seed.sql)
CREATE TABLE IF NOT EXISTS course_index (
  slug TEXT PRIMARY KEY, name TEXT, title TEXT, category TEXT, sessions_count INTEGER,
  session_minutes INTEGER, fee_ngn INTEGER, cover TEXT, accent TEXT, certificate TEXT, is_active INTEGER DEFAULT 1
);
CREATE TABLE IF NOT EXISTS session_index (
  id TEXT PRIMARY KEY, course TEXT NOT NULL, number INTEGER, of_total INTEGER, title TEXT,
  module TEXT, minutes INTEGER, is_free INTEGER, is_capstone INTEGER, words INTEGER, quiz_count INTEGER
);
CREATE INDEX IF NOT EXISTS idx_session_course ON session_index(course, number);

-- 7.1 access & pricing ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL, course TEXT NOT NULL,
  source TEXT NOT NULL,                -- payment | grant | code | beta | free-preview
  status TEXT NOT NULL DEFAULT 'active', -- active | revoked | expired
  granted_by TEXT, note TEXT, payment_id TEXT,
  created_at TEXT NOT NULL, expires_at TEXT, revoked_at TEXT, revoke_reason TEXT,
  UNIQUE(user_id, course)
);
CREATE INDEX IF NOT EXISTS idx_enroll_user ON enrollments(user_id, status);
CREATE TABLE IF NOT EXISTS course_pricing (
  course TEXT PRIMARY KEY, fee_ngn INTEGER NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT
);
CREATE TABLE IF NOT EXISTS access_codes (
  code TEXT PRIMARY KEY, course TEXT NOT NULL, kind TEXT NOT NULL DEFAULT 'comp',
  max_uses INTEGER NOT NULL DEFAULT 1, used_count INTEGER NOT NULL DEFAULT 0,
  note TEXT, created_by TEXT, created_at TEXT NOT NULL, expires_at TEXT
);
CREATE TABLE IF NOT EXISTS access_code_redemptions (
  code TEXT NOT NULL, user_id TEXT NOT NULL, redeemed_at TEXT NOT NULL, UNIQUE(code, user_id)
);

-- 7.3/7.4 payments -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS payments (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL, course TEXT NOT NULL,
  amount_ngn INTEGER NOT NULL, reference TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending',          -- pending | approved | rejected | expired
  proof_key TEXT, proof_mime TEXT, proof_size INTEGER, payer_name TEXT, note TEXT,
  reject_reason TEXT, reviewed_by TEXT, reviewed_at TEXT, created_at TEXT NOT NULL,
  intent_only INTEGER NOT NULL DEFAULT 0            -- reference created, nothing uploaded yet
);
CREATE INDEX IF NOT EXISTS idx_pay_status ON payments(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_pay_user ON payments(user_id, created_at DESC);

-- 4.6 granular progress -------------------------------------------------------
CREATE TABLE IF NOT EXISTS progress (
  user_id TEXT NOT NULL, course TEXT NOT NULL, session_number INTEGER NOT NULL,
  opened_at TEXT, last_seen_at TEXT, completed_at TEXT,
  sections_seen TEXT NOT NULL DEFAULT '[]',        -- json array of section letters
  furthest_section TEXT, resume_json TEXT,         -- {section, anchor, scrollPct}
  quiz_best_pct INTEGER, quiz_attempts INTEGER NOT NULL DEFAULT 0, quiz_passed_at TEXT,
  exercise_submitted_at TEXT, checklist_json TEXT, scenario_json TEXT, flashcard_json TEXT,
  time_spent_sec INTEGER NOT NULL DEFAULT 0, minutes INTEGER DEFAULT 105,
  read_awarded_at TEXT,                              -- when the +10 "read this level" award fired
  PRIMARY KEY (user_id, course, session_number)
);
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id, course);
CREATE INDEX IF NOT EXISTS idx_progress_course ON progress(course, session_number);

-- 5.1 XP ledger + 5.5 idempotent awards ---------------------------------------
CREATE TABLE IF NOT EXISTS xp_events (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL, kind TEXT NOT NULL, points INTEGER NOT NULL,
  course TEXT, session_number INTEGER, created_at TEXT NOT NULL,
  award_key TEXT, UNIQUE (user_id, award_key)   -- ledger rows are idempotent per learner, not globally
);
CREATE INDEX IF NOT EXISTS idx_xp_user_day ON xp_events(user_id, created_at DESC);
CREATE TABLE IF NOT EXISTS awards (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL, key TEXT NOT NULL, kind TEXT NOT NULL,
  payload TEXT, created_at TEXT NOT NULL,
  UNIQUE (user_id, key)          -- per learner: "web-development/session-01/read" is the same key for everyone
);
CREATE TABLE IF NOT EXISTS badges (
  key TEXT PRIMARY KEY, name TEXT NOT NULL, description TEXT NOT NULL, icon TEXT, tier TEXT DEFAULT 'bronze',
  xp_bonus INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS user_badges (
  user_id TEXT NOT NULL, badge_key TEXT NOT NULL, awarded_at TEXT NOT NULL, PRIMARY KEY (user_id, badge_key)
);

-- 5.8 daily quests ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS daily_quests (
  user_id TEXT NOT NULL, day TEXT NOT NULL, kind TEXT NOT NULL, target INTEGER NOT NULL DEFAULT 1,
  progress INTEGER NOT NULL DEFAULT 0, done INTEGER NOT NULL DEFAULT 0, xp_awarded INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, day, kind)
);

-- 4.10 notes & bookmarks ------------------------------------------------------
CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL, course TEXT NOT NULL, session_number INTEGER NOT NULL,
  section TEXT, text TEXT NOT NULL, updated_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_notes_user ON notes(user_id, course, session_number);
CREATE TABLE IF NOT EXISTS bookmarks (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL, course TEXT NOT NULL, session_number INTEGER NOT NULL,
  section TEXT, label TEXT, created_at TEXT NOT NULL, UNIQUE(user_id, course, session_number, section)
);

-- 6.1 / 6.9 attempts and submissions -----------------------------------------
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL, course TEXT NOT NULL, session_number INTEGER NOT NULL,
  score_pct INTEGER NOT NULL, correct INTEGER NOT NULL, total INTEGER NOT NULL,
  elapsed_sec INTEGER, passed INTEGER NOT NULL DEFAULT 0, answers TEXT, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_qa_user ON quiz_attempts(user_id, course, session_number, created_at DESC);
CREATE TABLE IF NOT EXISTS exercise_submissions (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL, course TEXT NOT NULL, session_number INTEGER NOT NULL,
  exercise_id TEXT NOT NULL, kind TEXT NOT NULL, text TEXT NOT NULL, self_score INTEGER,
  xp_awarded INTEGER NOT NULL DEFAULT 0, created_at TEXT NOT NULL, updated_at TEXT,
  UNIQUE(user_id, course, session_number, exercise_id)
);
CREATE TABLE IF NOT EXISTS playground_runs (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL, course TEXT NOT NULL, session_number INTEGER NOT NULL,
  chars INTEGER, runs INTEGER NOT NULL DEFAULT 1, last_run_at TEXT NOT NULL, UNIQUE(user_id, course, session_number)
);
CREATE TABLE IF NOT EXISTS flashcard_reviews (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL, card_id TEXT NOT NULL, grade INTEGER NOT NULL,
  interval_days REAL NOT NULL DEFAULT 0, due_at TEXT, reviews INTEGER NOT NULL DEFAULT 1,
  last_reviewed_at TEXT NOT NULL, UNIQUE(user_id, card_id)
);

-- 11.2 feedback, audit trail, notifications ----------------------------------
CREATE TABLE IF NOT EXISTS feedback (
  id TEXT PRIMARY KEY, user_id TEXT, body TEXT NOT NULL, page TEXT, created_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new'
);
CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY, actor_id TEXT NOT NULL, action TEXT NOT NULL, target TEXT, meta TEXT, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS email_log (
  id TEXT PRIMARY KEY, to_email TEXT NOT NULL, template TEXT NOT NULL, subject TEXT, status TEXT,
  error TEXT, created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS notification_outbox (
  id TEXT PRIMARY KEY, user_id TEXT NOT NULL, kind TEXT NOT NULL, payload TEXT NOT NULL,
  due_at TEXT NOT NULL, sent_at TEXT, attempts INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS course_completions (
  user_id TEXT NOT NULL, course TEXT NOT NULL, completed_at TEXT NOT NULL, certificate_code TEXT,
  PRIMARY KEY (user_id, course)
);
CREATE TABLE IF NOT EXISTS settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL, updated_by TEXT);

-- 8.8 ad telemetry (impressions/clicks so revenue is visible next to fees) ----
CREATE TABLE IF NOT EXISTS ad_events (
  id TEXT PRIMARY KEY, kind TEXT NOT NULL, placement TEXT NOT NULL, network TEXT NOT NULL,
  user_id TEXT, course TEXT, session_number INTEGER, created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ad_day ON ad_events(created_at DESC);

-- certificates (gap closed: A2 promises proof of skill; course docs define the policy)
CREATE TABLE IF NOT EXISTS certificates (
  code TEXT PRIMARY KEY, user_id TEXT NOT NULL, course TEXT NOT NULL, learner_name TEXT NOT NULL,
  issued_at TEXT NOT NULL, grade TEXT, sessions_completed INTEGER, avg_quiz_pct INTEGER, capstone INTEGER DEFAULT 0,
  url TEXT
);

-- 5.6 leaderboard materialised view-ish table (KV caches the hot ones) --------
CREATE TABLE IF NOT EXISTS leaderboard_weekly (
  week TEXT NOT NULL, user_id TEXT NOT NULL, course TEXT NOT NULL DEFAULT 'global', xp INTEGER NOT NULL,
  PRIMARY KEY (week, user_id, course)
);
