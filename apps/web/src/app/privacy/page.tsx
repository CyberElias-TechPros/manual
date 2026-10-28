import type { Metadata } from 'next'
import { H, LegalShell } from '../legal'
export const metadata: Metadata = {
  title: 'Privacy notice',
  description: 'What CEA Learn stores about you, why, for how long, and how to get it out.',
  robots: { index: true },
}
export const dynamic = 'force-dynamic'
const GRACE = 90

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy notice" updated="28 October 2026">
      <section><H>What we keep</H>
        <ul className="mt-2 list-disc space-y-1 pl-5 text-[15px]">
          <li><strong>Account:</strong> name, email, optional phone (for payment messages), a password hash. Never a card number — payment is a bank transfer you start yourself.</li>
          <li><strong>Learning:</strong> which level you opened, how long sections were in view, quiz/exercise/scenario results, your notes and bookmarks.</li>
          <li><strong>Money:</strong> the reference, the amount, the receipt you uploaded, and when an admin approved or rejected it.</li>
          <li><strong>Technical:</strong> a session record (device type and IP) so a stolen laptop can be signed out, plus the counts an ad network reports back to us.</li>
        </ul>
      </section>
      <section><H>What we do not do</H>
        <p className="mt-2 text-[15px]">
          No advertising profiles sold to third parties, no trackers beyond the ad networks we do use, no selling of emails. Your
          quiz answers and notes are used to score you and nothing else; the academy’s instructors can read the notes you left on a
          lesson if you ask them to mark an exercise, and that is the whole story.
        </p>
      </section>
      <section><H>Ads, and the honest trade</H>
        <p className="mt-2 text-[15px]">
          CEA Learn is free to try and cheap because ads pay for part of it (Google AdSense and ngAdverts). Those networks see a
          cookie and a page address. We keep them out of the quiz and out of the middle of a lesson, and Data Saver removes the frames
          entirely. Turning data saver on does not change your access.
        </p>
      </section>
      <section><H>How long, and what “delete” means</H>
        <p className="mt-2 text-[15px]">
          Progress lives as long as your account is open. If you delete it, the account, progress, XP, notes and uploads are anonymised or
          removed right away; payment receipts stay in the accounts ledger for up to {GRACE} days because Nigerian tax and anti-money-laundering
          rules ask for them, then they go. Certificates keep their code and name in the verification register — an employer must be able to check
          a document from five years ago.
        </p>
      </section>
      <section><H>Your rights (NDPR)</H>
        <p className="mt-2 text-[15px]">
          Access and portability: the button on your <strong>Profile → Data &amp; privacy</strong> page downloads everything in one JSON file, no request
          needed. Rectification: edit it in Settings. Erasure: Settings → Danger zone. Object to processing: turn off the leaderboard and email
          preferences, or write to us. If you are unhappy with our answer, the Nigeria Data Protection Commission accepts complaints
          (ndpc.gov.ng). We answer within 72 hours.
        </p>
      </section>
      <section><H>Children</H>
        <p className="mt-2 text-[15px]">
          The academy teaches adults and secondary-school students in its own rooms. Someone under 16 may use CEA Learn with a
          parent’s or guardian’s awareness; a guardian can ask us to remove an account at any time and we do it without argument.
        </p>
      </section>
      <section><H>Where your data sits</H>
        <p className="mt-2 text-[15px]">
          The API runs on Cloudflare’s edge with your rows in one regional D1 database; lesson content is a static bundle served from
          the same edge, with no personal data in it at all; email goes through Resend. In this build, everything is in the Africa/Europe
          region set, TLS everywhere, and cookies are <code>HttpOnly</code> + <code>SameSite=Lax</code>.
        </p>
      </section>
    </LegalShell>
  )
}
