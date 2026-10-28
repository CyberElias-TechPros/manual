---
{
  "id": "cybersecurity/session-08",
  "course": "cybersecurity",
  "number": 8,
  "of": 9,
  "title": "Improvement Plan and Incident Response",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/cybersecurity/session-08.png",
    "page": 113,
    "transcript": [
      "Incident Response Steps",
      "Detect",
      "Contain",
      "Erase",
      "Recover",
      "Review",
      "Find the threat",
      "Stop the spread",
      "Remove malware",
      "Restore systems",
      "Learn & improve",
      "Follow the steps in order every time an incident occurs.",
      "CEA"
    ],
    "hotspots": [
      {
        "label": "Incident Response Steps",
        "x": 35.15,
        "y": 6.63,
        "w": 29.75,
        "h": 4.21,
        "mono": false
      },
      {
        "label": "Detect Contain Erase Recover Review",
        "x": 12.81,
        "y": 59.4,
        "w": 76.12,
        "h": 2.9,
        "mono": false
      },
      {
        "label": "Find the threat Stop the spread Remove malware Restore systems Learn & improve",
        "x": 11.96,
        "y": 63.67,
        "w": 78.19,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "Follow the steps in order every time an incident occurs.",
        "x": 29.58,
        "y": 77.25,
        "w": 40.81,
        "h": 2.63,
        "mono": false
      }
    ],
    "width": 984,
    "height": 669
  },
  "module": "Week 3 — Module 3: Assess and Improve",
  "duration_minutes": 105,
  "difficulty": "Beginner (turning findings into an action plan, plus first incident-response lesson)",
  "prerequisite_knowledge": "Session 7. Learners must already be able to produce a findings table with issue, risk level and reason. They must know the eight rooms and the permission/scope rule. If a learner cannot explain \"risk = likelihood × impact,\" re-teach Section F.6 of Session 7 before this session.",
  "connection_to_previous": "In Session 7 you found the problems and rated them. A findings list alone does not help a business; it just worries the owner. This session gives you the two documents that actually help: a prioritised improvement plan (what to fix, in what order, at what cost) and an incident response card (what to do in the first hour when something goes wrong)."
}
---
# Improvement Plan and Incident Response

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 3 — Module 3: Assess and Improve

**Recommended duration:** 105 minutes

**Difficulty:** Beginner (turning findings into an action plan, plus first incident-response lesson)

**Prerequisite knowledge:** Session 7. Learners must already be able to produce a findings table with issue, risk level and reason. They must know the eight rooms and the permission/scope rule. If a learner cannot explain "risk = likelihood × impact," re-teach Section F.6 of Session 7 before this session.

**Connection to previous work:** In Session 7 you found the problems and rated them. A findings list alone does not help a business; it just worries the owner. This session gives you the two documents that actually help: a prioritised improvement plan (what to fix, in what order, at what cost) and an incident response card (what to do in the first hour when something goes wrong).

**Preparation before class:** Academy PCs on; projector ready; whiteboard; printed incident response card template (Appendix 8A); printed tabletop drill scenario (Section I); the four vignette cards from Session 7 re-used; the running example Adaeze Fashion findings list from Session 7 on the board; a blank "effort vs impact" 2×2 grid drawn for the lecture.

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Convert a findings table into a prioritised improvement plan that separates quick wins from longer projects.
2. Write a clear recommendation using the five questions: what, why, how, who, when.
3. Give cost-aware advice to a small Nigerian business, choosing free or cheap fixes before expensive ones.
4. Describe the six basic incident-response steps — Prepare, Identify, Contain, Eradicate, Recover, Learn — in simple
words.
5. Explain the first-hour actions for a suspected breach or ransomware: disconnect from the network, do not pay blindly,
preserve evidence, change passwords from a clean device, inform the right people, and restore from a clean backup.
6. Produce a one-page incident response card that a non-technical staff member could follow.
7. Take part in a tabletop incident drill, making sensible decisions in the correct order.

## C. Required Materials
<!-- kind:materials -->
Hardware
One computer per learner (academy desktops), or paper if machines are limited.
Instructor computer connected to a projector.
Software
A word processor or Notepad for typing the plan and the card.
No attack tools, no scanning tools, no live systems. All scenarios are fictional and paper-based.
Printed materials
The Adaeze Fashion findings table from Session 7 (reprinted or on the board).
Worksheet 8.1 — "Improvement Plan" (columns: Recommendation | Why | How | Who | When | Cost | Priority).
Worksheet 8.2 — "Effort vs Impact grid" (2×2 blank).
Appendix 8A — "My Incident Response Card" (one-page template with the six first-hour actions, blank for the learner to fill
and personalise).
Section I — "Tabletop Drill Scenario" (read aloud by the instructor).
Pen and paper for every learner.
Accounts
None. No real incident, no real business, no live system.
Internet
Not required. The whole session is fictional and offline.
Safety note for the instructor: The incident-response content is defensive. It tells a business how to respond to an attack on
itself. It never teaches how to attack. Say this clearly: "You are learning fire-drill procedure, not how to start a fire."

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector or board, draw a house with smoke coming out of one window. Next to it, write two
headings: "Before the fire" and "When the fire starts."
What the instructor says:
"Last week we learned to walk around a shop and write down what is wrong — the findings table. That is like noticing
that a house has no smoke alarm and the fire escape is blocked. Good. But imagine the house is already on fire right
now. Does it help to calmly write a report? No! Right now you need to know: where is the exit, where is the bucket, who
calls the fire service, and do not run back inside for your phone. Today we learn both: first, how to turn last week's findings
into a fix plan so the fire never starts. Then, how to react in the first hour if it does start anyway."
Ask the class: "If your shop's POS phone is stolen right now, and your bank app is on it, what is the very first thing you do?"
Expected learner response: Learners will say things like "call the bank", "change the password", "block the SIM", "tell my
husband", "pray", "find it with GPS." Accept all. Then steer:
"All useful. But notice we need an order — what first, what second. And we need it written down before it happens,
because in a panic nobody remembers the order. That written page is called an incident response card, and by the end of
today you will each have one."
Why this opener works: It creates urgency and shows the difference between planning ahead and reacting in the moment,
which is exactly the two halves of this session.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Fast oral round-robin. Put the prompts on the board. These deliberately restate Session 7 so the improvement plan can build on
it.
Question 1: "What is the risk formula from last week?"
Expected answer: Risk = likelihood × impact, mapped to Low/Medium/High.
Common gap: learners remember "likelihood and impact" but not that they multiply. Restate: easy × bad.
Question 2: "In a findings table, what three columns must always be present?"
Expected answer: Issue, Risk Level, Reason. (Plus a priority/fix column.)
Common gap: leaving out the Reason. Remind: no reason, no rating.
Question 3: "Give me one quick win and one bigger project from Adaeze Fashion's findings."
Expected answer: Quick win — put a screen lock on the phone, switch on MFA, change the Wi-Fi password. Bigger project
— set up proper backups, train staff.
Common gap: naming a quick win as something costly. Clarify: a quick win is free or very cheap and done today.
Question 4: "What does the permission/scope rule say about who we assess?"
Expected answer: only our own systems, or systems with written permission. Fictional businesses in this course.
Common gap: none usually, but repeat it anyway.
Bridge to today (say this):
"You already have the diagnosis — the findings table. Today we write the prescription: what medicine, in what order,
and what it costs. Then we learn the emergency procedure for the day the sickness comes anyway. A doctor does both."
If more than a third of the class cannot answer Question 1, spend 8 extra minutes re-teaching the risk grid from Session 7 before
continuing.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 From findings to plan — what an improvement plan is
Plain-English definition. An improvement plan is a written, prioritised list of the changes a business should make, with enough
detail for the owner to act: what to do, why, how, who does it, when, and roughly what it costs.
Why it exists. A raw findings table overwhelms a busy shop owner. If you hand Adaeze a list of ten problems, she will feel
frightened and do nothing. If you hand her a plan that says "Today: put a screen lock on your phone, it is free and takes two
minutes" and "This month: start a backup of your customer list", she can actually start. A plan turns worry into action.
What it does.
Puts the biggest dangers at the top.
Splits work into quick wins (today) and projects (this month).
Makes each action clear enough that any staff member can carry it out.
Attaches a cost so a small business is not scared off.
Familiar analogy. A findings table is a list of symptoms from a check-up. An improvement plan is the treatment plan the
doctor writes: "Take this tablet daily; come back in two weeks; reduce salt." Same visit, different document.
Real-life Nigerian scenario. A tailor in Mile 3 gets a findings table showing five problems. The IT person writes an improvement
plan: "1. Change the phone PIN — free — today. 2. Switch on MFA for the bank app — free — today. 3. Buy a ₦4,000 USB
and copy customer measurements weekly — this week. 4. Attend the free CEA phishing class — this month." The tailor does
the free ones the same evening.
Misconception to correct. "An improvement plan should list every possible security upgrade." No. A plan that is too long gets
ignored. A good plan focuses on the few changes that reduce the most risk and fits the business's real budget.
F.2 Quick wins versus longer projects
The simplest way to organise a plan is by how much effort each fix needs.
Quick wins: free or very cheap, done in minutes or hours, no special skill. Examples: set a screen lock; switch on MFA;
change a default password; change the Wi-Fi password; remove a password from a paper on the counter; switch Windows
Defender back on; turn on automatic updates; log out of shared accounts.
Longer projects: need money, planning, training, or a few days. Examples: buying and setting up a proper backup system;
moving customer records off a shared notebook into a secure file; training all staff; replacing a very old computer that no
longer receives updates; setting up separate guest Wi-Fi.
The rule: Do all the quick wins first. They cost nothing and remove a lot of risk. Then plan the projects.
Familiar analogy. Fixing a leaky tap (quick win) is different from re-plumbing the whole house (project). Do the tap today; plan
the plumbing.
F.3 Effort versus impact — the 2×2 grid
To decide what comes next when the quick wins are done, use a simple effort vs impact grid.
Low effort High effort
High impact DO NOW (quick win with big benefit) PLAN (big benefit, but needs time/money)
Low impact DO IF EASY (nice to have) AVOID / DEFER (not worth it now)
Do Now: high impact, low effort — your best actions. Almost every fix on Adaeze's phone lives here.
Plan: high impact, high effort — backups, training, new hardware. Schedule them.
Do If Easy: low impact, low effort — tidy-ups; do them when convenient.
Avoid/Defer: low impact, high effort — skip for now.
Say this to the class:
"When you are unsure what to advise, ask two questions: How much does this reduce risk? and How much effort or money
does it cost? Everything you can fix for free that lowers a High risk goes straight to 'Do Now'."
F.4 Writing a clear recommendation — what, why, how, who, when
A recommendation that says "improve security" is useless. A good recommendation answers five questions:
Question Meaning Example
What The exact action "Switch on MFA for the bank app"
Why The risk it removes "So that a stolen password alone cannot reach the money"
How The steps, simply "Open the bank app → Settings → Security → Two-factor → turn on and follow the
prompt"
Who The person
responsible
"Adaeze (owner)"
When A deadline "Today before closing"
Example full recommendation (written as it would appear in the plan):
Recommendation 1 — Switch on Multi-Factor Authentication (MFA) for the bank app. Why: Currently a single
reused password protects the business's money; one leak would be enough. How: Open the bank app, go to Security
settings, turn on two-factor authentication, and follow the on-screen prompt. Who: Adaeze. When: Today. Cost: Free.
Say this to the class: "If a recommendation does not tell you who and when, it will never get done. Always put a name and a
date on it."
Misconception. "The owner will know what I mean." No — assume the owner is busy and does not know technical words.
Write it as if for a bright person who is not technical.
F.5 Cost-aware advice for a small Nigerian business
Money is real. A plan that costs more than the business earns will be ignored, no matter how good it is. So give advice in this
order:
1. Free fixes first. Screen locks, MFA, strong unique passwords, turning on updates and Windows Defender, changing default
router passwords, logging out of shared accounts, deleting old staff accounts. These remove a huge share of the risk for
₦0.
2. Cheap fixes second. A USB drive (a few thousand naira) for off-site backup; a phone case with a lock; a small fee for more
Google Drive storage (or free tier); printing the incident response card.
3. Sensible investments later. Proper backup drive or cloud plan; replacing a very old computer that no longer gets security
updates; paying for staff security training (like a CEA short course); a business-grade router with guest Wi-Fi.
Real-life Nigerian scenario. A provision store earns maybe ₦30,000 profit a month. Telling the owner to buy a ₦100,000 server
is useless. Telling her "Switch on MFA today (free), and buy a ₦3,500 USB this week so a copy of your records lives away from
the phone" is advice she can actually take. That is professional.
Say this to the class: "The best advice is not the fanciest. It is the advice the owner can actually afford and will actually do."
Important limitation. Free fixes reduce most common risks, but they cannot fix everything. A business with very valuable data
may need to spend money — and it is honest to say so, and to explain the trade-off.
F.6 What an incident response is
Plain-English definition. An incident is any event that harms, or could harm, the security of the business — a stolen phone, a
hacked WhatsApp, a ransomware message locking files, a suspected fake bank transfer, a lost USB with customer records.
Incident response is what you do about it, in a sensible order.
Why it exists. In a real incident, the difference between a small problem and a disaster is usually how fast and how calmly
people act. A phone stolen today with a screen lock and MFA is annoying; the same phone with an open bank app and no lock
is a catastrophe. Response is about limiting the damage.
Familiar analogy. It is the fire drill. The building has extinguishers and a printed exit plan, and everyone has practised. When real
smoke appears, nobody stands frozen. Incident response is the fire drill for computers.
What it is not. Incident response does not mean "hunt down the criminal" or "hack back." Hacking back is illegal and
dangerous. Our job is to protect the business and reduce the damage, then learn.
F.7 The six basic incident steps — explained simply
This is a widely used framework. Learn the six words in order: Prepare, Identify, Contain, Eradicate, Recover, Learn. (A
common way to remember: PICERL — but the meaning matters more than the letters.)
1. Prepare. Before anything happens, get ready. Have the incident response card printed and posted; have backups running;
know who to call (the IT person, the bank, and for a real crime, the police); keep a clean phone or email available; decide who
will speak for the business. Without Prepare, the other five steps are done in panic.
2. Identify. Notice and confirm that something is wrong. What exactly happened? Which device or account? When? How do
you know? Keep calm and gather the basic facts: "The laptop shows a message that all files are encrypted." Do not guess wildly;
write down what you actually see.
3. Contain. Stop the damage spreading. The classic first move: disconnect the affected device from the network (unplug the
cable or switch off Wi-Fi) so the problem cannot spread to other devices. Isolate, do not delete. Do not switch off and wipe —
that can destroy useful evidence.
4. Eradicate. Remove the cause. This might mean cleaning the device, removing the harmful program, or — if the device
cannot be trusted — setting it aside and rebuilding it. For a small business this is often done by the IT person. In our fictional
drills, we describe it, we do not hunt or attack.
5. Recover. Bring the business back safely. Restore from a clean backup (one made before the incident), reset passwords,
confirm the device is clean, and return to normal work carefully. Test before trusting.
6. Learn. After it is over, sit down and ask: how did this happen? What did we do well? What was slow? What should we change
so it does not happen again? Update the improvement plan. A lesson not written down is a lesson lost.
Say this to the class: "Six words: Prepare, Identify, Contain, Eradicate, Recover, Learn. If you remember only one, remember
Contain — disconnect from the network — because that is the move that stops a small fire becoming a big one."
F.8 The first hour of a suspected breach or ransomware
When something goes wrong, the first hour matters most. Here is the defensive first-hour checklist. Teach it as a simple, calm
sequence.
If files are locked with a ransom message (ransomware) or you suspect a break-in:
1. Disconnect from the network — immediately. Unplug the network cable, or turn off Wi-Fi and mobile data. This stops
the harmful program from reaching other devices or the backup. Keep the device on if you are unsure — switching off
may wipe evidence held in memory, and the IT person may need it.
2. Do NOT pay or negotiate blindly. Paying does not guarantee your files come back, and it may fund criminals and mark you
as a willing payer. Do not click links or reply in the ransom message. Report it to the right people first.
3. Preserve the evidence. Do not delete the ransom note or the strange files. Take a photo of the screen with your phone
(not the affected device). Write down the time you noticed and what you saw. The evidence may be needed by your IT
person or the police.
4. Change your important passwords — from a clean device. Use a different, unaffected phone or computer to change the
passwords for email and banking. Start with email, because email is often used to reset everything else. Turn on MFA at the
same time if it is off.
5. Tell the right people. Inform the owner/manager immediately, inform the IT support person, and if money or customer
data is involved, inform the bank and — for a real crime — report to the police or the relevant authority. Do not hide it out
of shame; hiding it makes it worse.
6. Restore from a clean backup. Once the IT person confirms the device is clean, restore from a backup that was made
before the incident. This is why the backup must be off the device and tested.
Say this to the class: "The first hour is about three things: stop the spread (disconnect), keep the evidence (do not wipe it),
and protect the accounts (change passwords from a clean device). Everything else can follow."
Misconceptions to correct:
"Switch the laptop off and on again." For ransomware this can be the wrong move — it may destroy evidence and does
not remove the problem.
"Just pay the small amount they ask." Dangerous and no guarantee; do not do it blindly.
"Don't tell anyone, it's embarrassing." Silence makes it worse. Tell the right people early.
"Delete the virus message to clean up." No — preserve it as evidence.
Important limitation. This card is for a small business's first response. Larger or more serious incidents, and any crime, need
professional help and reporting. Our role is to react correctly for the first hour and to know when to call for help.
F.9 Summary of the session
An improvement plan turns findings into action: what, why, how, who, when, cost, priority.
Quick wins first, then projects; use the effort vs impact grid.
Give cost-aware advice — free fixes first.
An incident is an event that harms security; incident response limits the damage.
Six steps: Prepare, Identify, Contain, Eradicate, Recover, Learn.
First hour: disconnect, don't pay blindly, preserve evidence, change passwords from a clean device, tell the right
people, restore from a clean backup.
Put it on a one-page card so staff can follow it under pressure.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
The instructor demonstrates turning the Adaeze Fashion findings into a plan, then walks through the first hour of a fictional
ransomware incident.
G.1 What the instructor prepares
The Adaeze Fashion findings table on the board (from Session 7).
The effort vs impact 2×2 grid drawn.
Appendix 8A incident response card (blank) projected.
A volunteer role: the instructor plays "Adaeze" and asks the class what to do.
G.2 Demonstration — building the improvement plan (about 8 minutes)
Say: "Watch me turn these findings into actions. I am not writing fancy words; I am writing what Adaeze can actually do."
Show the findings, then build the plan live:
#
Recommendation
(What)
Why How Who When Cost Priority
1 Put a screen lock/PIN
on the phone
Stops anyone who
picks it up from
opening the bank
app
Settings → Security →
Screen lock
Adaeze Today ₦0 Now
2 Switch on MFA for
bank and email
A stolen password
alone can no
App → Security →
Two-factor → turn on
Adaeze Today ₦0 Now
#
Recommendation
(What)
Why How Who When Cost Priority
longer reach the
money
3 Change weak reused
passwords to unique
strong ones
Stops one leak
opening every
account
Use different long
passwords; write them
in a password manager
(demo: Bitwarden)
Adaeze Today ₦0 Now
4 Change Wi-Fi
password and remove
card from counter
Stops strangers
joining the
network
Router page →
Wireless → new long
password
Adaeze/IT Today ₦0 Now
5 Switch Windows
Defender back on
and update laptop
Closes known
weaknesses
Windows Security →
turn on; Windows
Update → check
Adaeze/IT This
week
₦0 Now
6 Back up customer list
to Google Drive +
USB
Records survive
theft/loss
Save list as a file;
upload to Drive; copy
to USB kept at home
Adaeze This
week
~₦3,500
USB
Plan
7 Train the two staff on
fake alerts
Reduces scam risk Use CEA short
awareness session /
printed tips
Owner This
month
Low Plan
Point out: "Rows 1–5 cost nothing and are all 'Now'. Only the USB costs a little. See how a scary findings list becomes a calm
to-do list?"
Questions to ask during the demo:
"Which of these is a quick win?" (Rows 1–5.)
"Which needs money or planning?" (Backup USB, training.)
"In row 3, what did I answer for 'why'?" (Stops one leak opening every account.)
G.3 Demonstration — the first hour of ransomware (about 7 minutes)
Say: "Now the fire starts. Adaeze calls me: 'My laptop says all my files are locked and wants money in Bitcoin! What do I do?' Let
us walk the first hour together."
Walk the sequence out loud, asking the class after each step:
1. Disconnect: "First — unplug the laptop from the network and switch off Wi-Fi." Ask: "Why first?" (Stops it spreading to the
backup and other devices.)
2. Do not pay: "I will not pay or reply. Why?" (No guarantee; funds crime; may mark us as payers.)
3. Preserve evidence: "I take a photo of the screen with my own phone and write the time. Why not just delete it?" (Evidence
needed for IT/police.)
4. Change passwords from a clean device: "Adaeze uses her other phone to change her email and bank passwords and check
MFA." Ask: "Why a clean device?" (So the compromised laptop cannot capture the new passwords.)
5. Tell the right people: "She tells me, tells the bank if money is involved, and reports to the police. She does not hide it."
6. Restore from a clean backup: "If the customer list was backed up to Drive last week, we restore the copy made before the
attack."
As the instructor, fill the projected card as you go, so learners see the finished one-page card. Then say: "This card is the
whole lesson in one page. In the drill, you will make your own."

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: With the instructor guiding, learners turn the Session 7 findings (their own vignette card) into a prioritised
improvement plan, and start their incident response card.
Materials: Worksheet 8.1 (Improvement Plan), the Session 7 findings table, the effort vs impact grid, Appendix 8A (blank
incident card).
Procedure (instructor calls out each step; learners follow; instructor walks the room):
1. (2 min) Take out your Session 7 findings table. Circle every finding rated High.
2. (3 min) Pause and predict: For each High finding, decide quickly whether it is a quick win or a longer project. Write Q or P
beside it. Then compare with your neighbour.
3. (6 min) Fill Worksheet 8.1, one row per finding. Columns: Recommendation (what) | Why | How | Who | When | Cost |
Priority. Every row must have a name in "Who" and a date in "When".
4. (2 min) Pause again: Sort your rows so all the quick wins are at the top. Say out loud which row you would do first and why.
5. (3 min) Fill the first four lines of your incident response card (Appendix 8A): Disconnect, Do not pay, Preserve evidence,
Change passwords from a clean device. Keep each line short — one action per line.
6. (2 min) Read your card to your neighbour as if they were a staff member who is panicking. Ask them: "Could you follow
this under stress?" Fix any line that is too long or too technical.
Expected result (worked example for Adaeze Fashion):
Improvement plan (top rows):
Recommendation Why How Who When Cost Priority
Put screen lock on phone Stops anyone
opening the bank
app
Settings → Security →
Screen lock
Adaeze Today ₦0 Now
Switch on MFA Stolen password
alone cannot work
App → Security → Two-
factor
Adaeze Today ₦0 Now
Change weak reused passwords Stops one leak
opening all accounts
Use unique long
passwords / password
manager
Adaeze Today ₦0 Now
Incident card (first four lines):
Disconnect the device from the network (unplug / Wi-Fi off).
Do not pay or reply to any ransom message.
Preserve evidence: photo of the screen, note the time.
Change passwords (email, bank) from a clean phone.
Troubleshooting while walking the room:
Learner writes a row with no "Who" or "When" → ask: "If nobody's name is here, who will do it? If there's no date, when?"
Learner lists only expensive projects → prompt: "What is the free version of this fix?"
Learner's card lines are paragraphs → ask them to cut each line to one short action.
Learner suggests paying the ransom → correct gently using Section F.8.
Completion checklist (learner ticks each):
Every High finding has a plan row
Each row has what, why, how, who, when, cost, priority
Quick wins sorted to the top
At least one free fix and one costing fix identified
Incident card has at least the first four actions
Card read aloud and understood by a partner

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task (two parts):
1. Build a prioritised improvement plan for the Blessing Bakes findings you wrote in Session 7 (or a new short fictional set
provided below).
2. Run a mini tabletop drill in pairs on the scenario below, and write the order of actions.
Blessing Bakes — short findings (use these if you did not keep last week's):
Same password cake2019 for email, Facebook and a loan app.
Customer notebook has no backup.
Delivery boys share Blessing's banking phone.
No training on fake-order scams.
Tabletop drill scenario (read aloud):
It is a busy Saturday. Blessing's delivery boy picks up her phone and sees a strange message: "Your photos and files are
encrypted. Pay ₦50,000 in gift cards within 24 hours or everything is deleted." He panics and calls Blessing. She is at the
market buying flour. What should happen in the next hour?
Requirements:
1. Write the improvement plan for the four findings (Recommendation | Why | How | Who | When | Cost | Priority).
2. For the drill: write the first six actions in order, and next to each, in brackets, which PICERL step it is
(Prepare/Identify/Contain/Eradicate/Recover/Learn).
3. Write one sentence on why disconnect comes before change passwords.
Time allowance: 15 minutes.
Success criteria:
Plan covers all four findings, quick wins first, with names and dates.
Drill actions are in a safe order; Disconnect (Contain) is early.
The explanation correctly says: disconnect first so the problem cannot spread or capture the new passwords.
Hints available if stuck:
Hint 1: For the plan, the reused password is your number-one quick win (free, protects money).
Hint 2: For the drill, think of our three first-hour words: stop the spread, keep the evidence, protect the accounts.
Hint 3: Changing passwords while still connected to the infected phone defeats the purpose.
Instructor answer key / model (do not show learners):
Improvement plan:
Recommendation Why How Who When Cost Priority
Change cake2019 to unique strong passwords + MFA Stops one
leak
accessing
money
and
pages
Use
different
long
passwords;
turn on
two-factor
Blessing Today ₦0 Now
Stop sharing banking phone; add screen lock Delivery
boys
should
not reach
the bank
app
Screen
lock/PIN;
use a
separate
basic
phone for
deliveries
Blessing Today ₦0 Now
Back up customer notebook Records
survive
loss/theft
Type/copy
names to
Drive + a
USB kept
at home
Blessing This
week
~₦3,500 Plan
Recommendation Why How Who When Cost Priority
Train on fake-order/fake-alert scams Fewer
successful
scams
Use CEA
awareness
tips / short
session
Owner
+ staff
This
month
Low Plan
Drill — first six actions in order:
1. Disconnect the phone from mobile data/Wi-Fi and stop using it for banking. (Contain)
2. Do not pay or reply to the message; do not click anything in it. (Contain)
3. Preserve evidence: photograph the message with another phone; note the time. (Identify/preserve)
4. Tell the right people: inform Blessing (owner), her IT helper, and the bank if banking/POS is involved; report to police if it is
a real crime. (Identify/Prepare)
5. Change passwords from a clean device: use another phone to change email and bank passwords and enable MFA.
(Contain/Recover)
6. Restore from a clean backup (or, if none, start one immediately and plan for the future). (Recover)
7. (Then) Learn: meet afterwards and add the missing backup to the improvement plan. (Learn)
Disconnect-before-passwords explanation: You disconnect first so the harmful program cannot spread to other
devices/backups, and so it cannot capture the new passwords as you type them. Changing passwords while still connected to a
compromised device is unsafe.
Marking guidance (out of 10):
Plan covers all findings (2)
Quick wins prioritised, names/dates given (2)
Costs are realistic and cost-aware (1)
Drill actions in safe order (3)
PICERL steps correctly labelled (1)
Correct explanation of disconnect-first (1)

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Ngozi runs a small POS and mobile-money business in a busy Port Harcourt junction. On a Monday morning her
phone shows a message that her files are encrypted and she must pay ₦80,000 in gift cards within 24 hours. The phone holds
her transaction records and her bank app. She is panicking and about to pay.
Relevant facts.
Ngozi does not have a backup of the transaction records.
MFA is not switched on for her email or bank app.
She has a second, older phone that is not connected to the same accounts.
She does not have an IT support person; she usually asks a nearby cyber café.
Decision point. In the first hour, what should Ngozi do, in what order, and what should she not do?
Possible approaches.
1. Pay the ₦80,000 quickly to get the files back and carry on.
2. Delete everything, reset the phone, and start fresh — "clean it out."
3. Follow the first-hour sequence: do not pay; disconnect the phone from mobile data/Wi-Fi; preserve evidence (photo of the
message, note the time); use the clean older phone to change email and bank passwords and switch on MFA; tell the bank
and report to the police; then, with help, clean/rebuild the phone and start proper backups going forward.
Recommended solution (for this stage). Approach 3. Paying (1) is no guarantee and may fund crime and mark her as a payer;
deleting and resetting (2) can destroy evidence and still leaves her accounts unprotected. The calm, correct route is to contain,
preserve, protect accounts, inform the right people, then recover and put a backup in place.
Trade-offs.
Approach 1 feels fastest but gives up the most (money, no guarantee, and encouragement to attackers).
Approach 2 feels clean but loses evidence and does not close the door the attacker used.
Approach 3 takes longer and feels harder in the moment, but protects money, keeps evidence, and prevents a repeat —
which is exactly the professional response. The honest downside: with no prior backup, some transaction records may still
be lost — which is precisely why the plan should have included a backup before the incident.
Professional connection. This is the daily reality of small-business IT support. The professional value is not in "beating" the
attacker; it is in helping the owner make calm, correct decisions under pressure. That skill — knowing the order, keeping
evidence, protecting accounts first — is a hallmark of defensive security work.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
K.1 The plan lists problems, not actions
Symptoms: Rows read "Wi-Fi is weak" instead of "Change the Wi-Fi password." Likely cause: Copying the findings table instead
of translating it into actions. Corrective steps: Rewrite every row starting with a verb ("Change…", "Switch on…", "Back
up…"). How to confirm resolved: Every row starts with a clear action. Prevention: For each finding ask, "What is the doing
word?"
K.2 Recommendations with no "who" or "when"
Symptoms: Rows with blanks in Who and When; nothing gets done. Likely cause: Assuming the owner will figure it out.
Corrective steps: Add a person's name and a date to every row. Prevention: Rule of the course — no name and date, not a
recommendation.
K.3 Advice is too expensive
Symptoms: The plan is full of paid tools and new hardware for a tiny shop. Likely cause: Forgetting the budget of a small
Nigerian business. Corrective steps: Re-order so free fixes come first; mark anything costing money as a "project"; keep it
affordable. Prevention: Always ask, "Can this be done for ₦0 first?"
K.4 Confusing containment with cleaning
Symptoms: In the drill, learner wants to "delete the virus" immediately. Likely cause: Thinking cleaning comes first. Corrective
steps: Explain the order: contain (disconnect) so it stops spreading, then preserve evidence, then clean/eradicate, then recover.
Prevention: Keep the six steps on the wall. Contain before clean.
K.5 Suggesting to pay the ransom
Symptoms: Learner says "just pay so we get files back." Likely cause: Panic logic. Corrective steps: Explain: no guarantee; may
fund crime; may mark the business as a payer. Do not pay blindly; seek advice and report. Prevention: Repeat the first-hour
card line: "Do not pay or reply."
K.6 Wiping the device and destroying evidence
Symptoms: Learner resets the phone/computer straight away. Likely cause: Wanting a clean slate. Corrective steps: Preserve
evidence first (photos, notes), get advice, and only then rebuild. Do not switch off or wipe a device that may hold evidence
unless advised. Prevention: The fire-drill comparison: you do not bulldoze the house before the fire officer inspects it.
K.7 Changing passwords while still on the infected device
Symptoms: Learner changes the bank password on the compromised phone. Likely cause: Not thinking about capture.
Corrective steps: Always change passwords from a clean, unaffected device. Prevention: Add this explicitly to every incident
card.
Distinguish likely vs confirmed: Confirm before acting — e.g., confirm a device really is disconnected, and confirm a backup
really predates the incident before restoring from it.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "Improvement Plan and Incident Response Card for a Fictional Business"
Purpose: Practise writing a cost-aware, prioritised improvement plan from findings, plus a realistic one-page incident response
card.
Realistic scenario: Use the fictional business you created for the Session 7 assignment (or reuse one of the vignette cards).
Produce both a plan and a card.
Detailed instructions:
1. Take your Session 7 findings table. For each finding, write one row in your improvement plan with columns:
Recommendation | Why | How | Who | When | Cost | Priority.
2. Sort the rows so quick wins come first.
3. Make sure at least two rows are free (₦0) and clearly mark which are "quick wins" and which are "projects."
4. Create a one-page incident response card with the six first-hour actions in order (disconnect, do not pay, preserve
evidence, change passwords from a clean device, tell the right people, restore from a clean backup). Keep each line to one
short, plain instruction that a non-technical staff member could follow.
5. Add a short "Prepare" note at the top of your card listing three things the business should do before any incident (e.g.,
start backups, print this card, keep a clean phone).
Required deliverables:
Improvement plan (one row per finding, with all seven columns).
One-page incident response card.
"Prepare" note (three items). All on paper or in a document.
Submission format: Hand in on paper, or upload as a document named CEA-Sec-YourName-S8-Assignment .
Deadline: Before Session 9 (capstone day).
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
Every finding turned into an action 3 Actions start with a verb and match the findings
What/why/how/who/when/cost/priority complete 4 All columns filled; names and dates present
Quick wins prioritised first 3 Free/low-effort fixes at the top
Cost-aware advice 3 Realistic for a small Nigerian business; free first
Incident card correct and usable 4 Six actions in safe order; short, plain lines
Prepare note 2 Three sensible preparation actions
Clarity / no jargon 1 A non-technical owner could follow it
Common mistakes to avoid: listing problems instead of actions; missing who/when; over-expensive advice; wrong incident
order (cleaning before containing); suggesting to pay the ransom; changing passwords on the infected device.
Instructor reference solution (model for Adaeze Fashion):
Improvement plan (top rows):
Recommendation Why How Who When Cost Priority
Put a screen lock on the phone Stops anyone
opening the bank
app
Settings →
Security → Screen
lock
Adaeze Today ₦0 Now
Switch on MFA for bank + email A stolen password
alone can't reach
the money
App → Security
→ Two-factor
Adaeze Today ₦0 Now
Recommendation Why How Who When Cost Priority
Replace weak reused passwords Stops one leak
opening all
accounts
Unique long
passwords /
password
manager
Adaeze Today ₦0 Now
Back up customer list off the phone Records survive
theft/loss
Save list →
Google Drive +
USB at home
Adaeze This
week
~₦3,500 Plan
Train staff on fake alerts Fewer successful
scams
CEA awareness
session / printed
tips
Owner This
month
Low Plan
Prepare note: (1) Start weekly backups to Drive + USB. (2) Print and post this card. (3) Keep one clean, unshared
phone/email for emergencies.
Incident card: (1) Disconnect from network. (2) Do not pay or reply. (3) Preserve evidence (photo + time). (4) Change
email/bank passwords from a clean phone. (5) Tell owner, IT, bank, police. (6) Restore from a clean backup.

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key below.)
Q1. Short answer. What is the difference between a findings table and an improvement plan?
Q2. Multiple choice. In an improvement plan, what does "quick win" mean? a) A cheap fix that also removes a high risk. b) A fix
that takes months. c) Any expensive purchase. d) A fix nobody needs to do.
Q3. List and explain. Name the five questions a clear recommendation should answer.
Q4. Ordering. Put the six incident-response steps in the correct order: Recover, Prepare, Learn, Contain, Identify, Eradicate.
Q5. Short answer. Why should affected devices be disconnected from the network as an early step?
Q6. True or false, with reason. "If ransomware locks your files, the fastest solution is to pay and get them back."
True / False. Why?
Q7. Scenario. A staff member's laptop suddenly shows a ransom note. Write the first four actions you would take, in order.
INSTRUCTOR ANSWER KEY (Q1–Q7)
A1. A findings table describes what is wrong (issue, risk level, reason). An improvement plan describes what to do about it
(action, why, how, who, when, cost, priority). The findings table is the diagnosis; the plan is the treatment.
A2. (a) A cheap (usually free) fix that also removes a high risk.
A3. What (the action), Why (the risk it removes), How (the simple steps), Who (the person responsible), When (the deadline).
(Cost is a helpful sixth.)
A4. Prepare → Identify → Contain → Eradicate → Recover → Learn.
A5. To stop the problem spreading to other devices, backups, or the network, and to prevent it capturing new passwords typed
during the response (e.g., for ransomware, also stops encryption spreading to shared/backup drives).
A6. False. Paying does not guarantee the files return, it may fund criminals, and it may mark the business as a willing payer. The
correct first response is: disconnect, do not pay blindly, preserve evidence, protect accounts, tell the right people, and restore
from a clean backup (with reporting where appropriate).
A7. Any reasonable order starting with containment:
1. Disconnect the laptop from the network (unplug/disable Wi-Fi/mobile data). (Contain)
2. Do not pay or reply to the ransom; do not click anything in it.
3. Preserve evidence: photograph the screen with another device and note the time; do not delete or wipe.
4. Tell the right people (owner, IT support; bank/police if money or crime is involved). (Then continue: change passwords from
a clean device, then restore from a clean backup.)

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today you learned to turn a findings table into an improvement plan — a prioritised, cost-aware to-
do list that a small business can actually follow. You used quick wins versus projects and the effort vs impact grid, and
learned to write recommendations answering what, why, how, who, when. Then you learned that an incident is any event that
harms security, and you learned the six response steps — Prepare, Identify, Contain, Eradicate, Recover, Learn — plus the
first-hour actions for a suspected breach or ransomware. Finally, you built a one-page incident response card that a non-
technical staff member could follow under stress.
Five important takeaways:
1. Findings tell you what is wrong; the plan tells you what to do, in order.
2. Quick wins first — free fixes that remove High risks; then plan the projects.
3. A clear recommendation answers what, why, how, who, when (and cost).
4. Incident steps: Prepare, Identify, Contain, Eradicate, Recover, Learn.
5. First hour: disconnect, don't pay, preserve evidence, change passwords from a clean device, tell the right people,
restore from a clean backup.
Questions to help you recognise what you can now do:
Can I turn each finding into an action with a name and a date?
Can I explain the difference between containing and cleaning an incident?
Can I list the six steps in order from memory?
Would a panicking staff member be able to follow my incident card?
Connection to the next session: You now have all the pieces: a findings table, an improvement plan, and an incident response
card. In Session 9 you build the capstone — a complete defensive security assessment report for the fictional Adaeze Fashion,
including an executive summary, scope and authorisation, method, findings table, prioritised improvement plan, incident card,
and conclusion — then you present it and answer viva questions. This is your certificate project.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
Learner's plan rows start with verbs and include who and when.
Learner puts free/quick wins at the top and marks projects separately.
Learner's incident card is short, ordered and plain — usable under stress.
Learner explains contain-before-clean correctly.
Learner refuses to pay the ransom and says why.
Learner changes passwords from a clean device, not the affected one.
Common misconceptions to watch for and correct:
"The plan is the findings table with a new title." → Plan = actions, with who/when/cost.
"Buy the best tools." → Free fixes first; fit the budget.
"Clean the virus immediately." → Contain and preserve evidence first.
"Pay the ransom." → No; no guarantee, funds crime. Do not pay blindly.
"Change passwords on the infected phone." → Use a clean device.
"Don't tell anyone." → Tell the right people early.
Suggested remedial exercises for learners who struggle:
1. Verb drill: give five problem statements and ask the learner to rewrite each as an action starting with a verb.
2. Order-the-cards drill: hand out the six PICERL cards shuffled; the learner arranges them.
3. First-hour drill: read three short scenarios; the learner writes the first three actions each time.
4. Card-writing drill: ask the learner to explain their incident card to a partner acting as a panicking staff member.
Differentiation:
Level 1 (supported): provide a partly filled improvement plan (two rows done) and an incident card with the first two lines
completed; the learner finishes.
Level 2 (standard): the exercise as written.
Level 3 (challenge): add a cost column in naira with a total budget line, and split the plan into "Week 3 (this week)" and
"Month 1" schedules; add a short "who to call" list to the incident card (IT, bank, police, internet provider).
Timing guidance: The incident-response portion (Sections F.6–F.8 and the drill) is the emotional heart and must not be
skipped. If time is short, compress the improvement-plan lecture and protect the tabletop drill. If the room is fast, run a second,
different tabletop scenario (e.g., a stolen phone with an open banking app).
APPENDIX 8A — MY INCIDENT RESPONSE CARD (template)
Incident Response Card — [Business name]
Prepare (before any incident):
1.
2.
3.
If something goes wrong — first hour:
1. Disconnect the device from the network. (unplug / Wi-Fi off / mobile data off)
2. Do not pay or reply to any ransom message.
3. Preserve evidence: photograph the screen with another phone; write the time.
4. Change your email and bank passwords — from a clean, unaffected device.
5. Tell the right people: owner/manager, IT support, bank, and (for a crime) the police.
6. Restore from a clean backup made before the incident.
Who to call: IT: __________ Bank: __________ Police: __________ Internet provider: __________
END OF SESSION 8
Next: Session 9 — Capstone: Security Assessment Report and Presentation.
