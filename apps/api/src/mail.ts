/**
 * 3.9 — transactional email library. One template per message the academy
 * needs, so the Worker, the seed script and the tests all send identical copy.
 * Resend is the transport in production (see worker.ts); in dev the same
 * payload is written to ./var/mail so nothing is invisible.
 */
import { brand, PAYMENT, formatNgn } from '@cea/config'
import type { MailMessage } from './lib.js'

const wrap = (title: string, body: string, footnote = '') => `<!doctype html><html><body style="margin:0;background:#f7fafc;font-family:Segoe UI,Arial,sans-serif;color:#12233d">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" style="max-width:560px;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(16,29,54,.08)">
<tr><td style="background:#1a365d;color:#fff;padding:18px 24px;font-weight:700;letter-spacing:.4px">${brand.short} LEARN<span style="float:right;opacity:.7;font-weight:400">${brand.tagline}</span></td></tr>
<tr><td style="padding:26px 24px">
<h1 style="margin:0 0 10px;font-size:21px;color:#0f1b33">${title}</h1>${body}
</td></tr>
<tr><td style="padding:16px 24px;background:#0f1b33;color:#cbd5e0;font-size:12px">
${brand.name} · ${brand.address}<br>${brand.url}${footnote ? ` · ${footnote}` : ''}</td></tr></table></td></tr></table></body></html>`

const p = (s: string) => `<p style="margin:0 0 14px;line-height:1.65">${s}</p>`
const btn = (href: string, label: string) => `<p style="margin:18px 0"><a href="${href}" style="background:#d69e2e;color:#0f1b33;text-decoration:none;padding:11px 18px;border-radius:999px;font-weight:700;display:inline-block">${label}</a></p>`
const mono = (s: string) => `<div style="background:#f4f7fb;border:1px dashed #cbd5e0;border-radius:10px;padding:12px 14px;font-family:ui-monospace,Menlo,monospace;margin:0 0 14px">${s}</div>`

export type Template = (vars: Record<string, any>) => MailMessage
export const TEMPLATES: Record<string, Template> = {
  welcome: ({ name, learnUrl }) => ({
    to: '', subject: 'Welcome to CEA Learn — your first level is free',
    html: wrap('You are in, Agent.', p(`Hi ${name},<br><br>Your account is live. Every course here is a <strong>mission</strong>; every session is a <strong>level</strong>. Session 1 of all 16 courses is open to you free — no payment, no waiting.`) + btn(`${learnUrl}/dashboard`, 'Open my dashboard') + p('Finish a level to earn XP, keep a daily streak alive, and unlock badges. Payments are by bank transfer and are approved by a human at the academy within 24 hours.')),
    text: `Welcome to CEA Learn. Start here: ${learnUrl}/dashboard`,
  }),
  passwordReset: ({ name, link, minutes = 60 }) => ({
    to: '', subject: 'Reset your CEA Learn password',
    html: wrap('Password reset', p(`Hi ${name}, someone asked to reset the password for this account. If that was you, use the button below — it expires in ${minutes} minutes and works once.`) + btn(link, 'Choose a new password') + p('If it was not you, ignore this email. Your password stays as it is.')),
    text: `Reset your password: ${link}`,
  }),
  paymentReceived: ({ reference, course, amount, name }) => ({
    to: '', subject: `Proof of payment received — ${reference}`,
    html: wrap('We have your proof', p(`Hi ${name}, your transfer evidence for <strong>${course}</strong> (${amount}) is queued for approval. Reference:`) + mono(reference) + p(`An instructor checks the ${PAYMENT.bank} statement and usually approves within ${PAYMENT.slaHours} hours. You will get another email the moment your course unlocks.`)),
    text: `Proof received for ${course}. Reference ${reference}. Pending approval.`,
  }),
  paymentApproved: ({ name, course, link }) => ({
    to: '', subject: `${course} is unlocked — start now`,
    html: wrap('Access granted', p(`Hi ${name}, your payment for <strong>${course}</strong> is confirmed. Every level is open.`) + btn(link, `Start ${course}`) + p('Tip: complete Session 1 today — the streak counter starts the day you begin, not the day you pay.')),
    text: `Your ${course} course is unlocked: ${link}`,
  }),
  paymentRejected: ({ name, course, reason, link }) => ({
    to: '', subject: `We could not confirm your payment for ${course}`,
    html: wrap('Payment not confirmed', p(`Hi ${name}, we could not match your proof of payment to a credit on the ${PAYMENT.accountName} account (${PAYMENT.accountNumber}).`) + (reason ? mono(`Reason: ${reason}`) : '') + p('Nothing is lost — re-upload a clearer screenshot (amount, date and your transfer reference must be visible) and we will look again.')) + btn(link, 'Fix my payment'),
    text: `Payment for ${course} rejected: ${reason}. Open ${link} to re-upload.`,
  }),
  streakAtRisk: ({ name, streak, link }) => ({
    to: '', subject: streak > 0 ? `Your ${streak}-day streak ends tonight` : 'One level is all it takes to restart',
    html: wrap(streak > 0 ? 'Keep the flame alive' : 'Start the flame', p(`Hi ${name}, ${streak > 0 ? `you are ${streak} days in. One level tonight keeps it.` : 'A fresh streak starts with any completed level.'}`) + btn(`${link}/dashboard`, 'Do my level now')),
    text: `Open CEA Learn and finish one level to keep your streak: ${link}/dashboard`,
  }),
  weeklyDigest: ({ name, xp, streak, courses, link }) => ({
    to: '', subject: `Your week at CEA Learn: ${xp} XP · ${streak}-day streak`,
    html: wrap('This week, in review', p(`Hi ${name},<br><br>XP earned this week: <strong>${xp}</strong><br>Current streak: <strong>${streak} days</strong><br>Courses in progress: <strong>${courses}</strong>`) + btn(`${link}/leaderboard`, 'See where you stand') + p('Consistency beats intensity. Two short sessions a day finish a course; one long session a week does not.')),
    text: `Weekly digest: ${xp} XP, ${streak}-day streak. ${link}/leaderboard`,
  }),
  certificate: ({ name, course, code, link }) => ({
    to: '', subject: `Your ${course} certificate is ready`,
    html: wrap('Certificate issued', p(`${name}, you completed <strong>${course}</strong>. The certificate below is what the academy issues after your capstone is accepted — and it is verifiable, so an employer can check it.`) + mono(`Verification code: ${code}`) + btn(link, 'View & print certificate')),
    text: `Your certificate for ${course}: ${link} (code ${code})`,
  }),
  enrolmentGranted: ({ name, course, link, note }) => ({
    to: '', subject: `${course} was added to your account`,
    html: wrap('Course granted', p(`Hi ${name}, the academy has opened <strong>${course}</strong> on your account.${note ? ` Note from the academy: ${note}` : ''}`) + btn(link, 'Go to the mission')),
    text: `${course} was granted to you: ${link}`,
  }),
}

export function render(template: keyof typeof TEMPLATES | string, vars: Record<string, any>): MailMessage {
  const t = TEMPLATES[template as string] || TEMPLATES.welcome
  const m = t({ learnUrl: vars.learnUrl || brand.learnUrl, link: vars.learnUrl || brand.learnUrl, ...vars })
  return { ...m, html: m.html, text: m.text || strip(m.html) }
}

const strip = (h: string) => h.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 400)
export { formatNgn }
