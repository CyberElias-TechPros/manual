---
{
  "id": "cybersecurity/session-04",
  "course": "cybersecurity",
  "number": 4,
  "of": 9,
  "title": "Email Security, Phishing and Social Engineering",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/cybersecurity/session-04.png",
    "page": 48,
    "transcript": [
      "Anatomy of a Phishing Email",
      "Inbox",
      "From:",
      "bank-security@mail-ru.com",
      "Subject:",
      "URGENT: Your account w ill be CLOSED!",
      "Body:",
      "Click here to verify:",
      "http://bit.ly/xyz",
      "Attachment:",
      "invoice.html",
      "Fake sender",
      "Urgency",
      "Suspicious link",
      "Dangerous attachm",
      "CEA"
    ],
    "hotspots": [
      {
        "label": "Anatomy of a Phishing Email",
        "x": 33.02,
        "y": 6.63,
        "w": 34.07,
        "h": 4.21,
        "mono": false
      },
      {
        "label": "Inbox",
        "x": 10.82,
        "y": 20.36,
        "w": 4.55,
        "h": 2.63,
        "mono": false
      },
      {
        "label": "From: bank-security@mail-ru.com",
        "x": 10.82,
        "y": 29.07,
        "w": 26.62,
        "h": 2.63,
        "mono": false
      },
      {
        "label": "Fake sender",
        "x": 83.19,
        "y": 29.76,
        "w": 10.36,
        "h": 2.63,
        "mono": false
      },
      {
        "label": "Subject: URGENT: Your account w ill be CLOSED!",
        "x": 10.82,
        "y": 37.28,
        "w": 37.22,
        "h": 2.63,
        "mono": false
      },
      {
        "label": "Urgency",
        "x": 83.19,
        "y": 38.0,
        "w": 6.82,
        "h": 2.63,
        "mono": false
      },
      {
        "label": "Body:",
        "x": 10.82,
        "y": 49.04,
        "w": 4.24,
        "h": 2.63,
        "mono": false
      },
      {
        "label": "Click here to verify:",
        "x": 10.82,
        "y": 53.73,
        "w": 14.15,
        "h": 2.63,
        "mono": false
      },
      {
        "label": "Suspicious link",
        "x": 83.19,
        "y": 57.4,
        "w": 12.61,
        "h": 2.63,
        "mono": false
      },
      {
        "label": "http://bit.ly/xyz",
        "x": 10.82,
        "y": 58.45,
        "w": 10.54,
        "h": 2.63,
        "mono": false
      },
      {
        "label": "Dangerous attachm Attachment: invoice.html",
        "x": 83.19,
        "y": 70.09,
        "w": 16.04,
        "h": 2.63,
        "mono": false
      }
    ],
    "width": 984,
    "height": 669
  },
  "module": "Week 2 — Module 2: Protecting People and Devices (theme: Harden)",
  "duration_minutes": 105,
  "difficulty": "Beginner (no prior security knowledge assumed)",
  "prerequisite_knowledge": "Session 1 (threat landscape and Stop–Think–Verify mindset), Session 2 (strong passwords and MFA), Session 3 (safe browsing, HTTPS, safe downloads). A learner must be able to open a browser, read an email and find an address.",
  "connection_to_previous": "In Session 2 we locked the front door (passwords + MFA). In Session 3 we taught careful browsing and downloads. This session covers the attack that most often slips past both: a person being tricked into clicking or replying. Email and social engineering target the human, not the machine."
}
---
# Email Security, Phishing and Social Engineering

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 2 — Module 2: Protecting People and Devices (theme: Harden)

**Recommended duration:** 105 minutes

**Difficulty:** Beginner (no prior security knowledge assumed)

**Prerequisite knowledge:** Session 1 (threat landscape and Stop–Think–Verify mindset), Session 2 (strong passwords and MFA), Session 3 (safe browsing, HTTPS, safe downloads). A learner must be able to open a browser, read an email and find an address.

**Connection to previous work:** In Session 2 we locked the front door (passwords + MFA). In Session 3 we taught careful browsing and downloads. This session covers the attack that most often slips past both: a person being tricked into clicking or replying. Email and social engineering target the human, not the machine.

**Preparation before class:** Academy PCs on and logged in. Instructor email account ready (own account only, or a demo account). Five fictional phishing samples prepared (printed or on-screen) — see Section C. Projector ready. No real customer data, no real bank emails, and no live suspicious email should ever be opened in class. Safety note (read aloud at the start) "Everything today is defensive. We study fake and fictional examples only. We never open links in real suspicious emails, never reply to a scammer, and never touch anybody's account without written permission. We are learning to recognise and avoid, not to attack."

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Describe in simple terms how an email travels from a sender to a recipient, naming the sender, the visible display name
and the destination link as three things an attacker can fake.
2. Explain what phishing is and why it works, using the Stop–Think–Verify habit from Session 1.
3. Identify at least six red flags in a suspicious email, including look-alike domains, urgency, threats, unusual requests,
generic greetings, spelling/grammar errors and mismatched link text versus destination.
4. Demonstrate "hover before you click" by moving the mouse over a link and reading the real destination without clicking
it.
5. Check the true sender address rather than trusting the display name, and explain why the two can differ.
6. Distinguish phishing from spear-phishing and pretexting, and describe CEO fraud and fake-invoice scams in their own
words.
7. Follow the correct response steps for a suspicious email: do not click, do not reply, report it, verify by a separate known
channel, then delete/report as spam.
8. Connect email account protection to the work done in Session 2 — a unique strong password plus multi-factor
authentication (MFA).
9. Assess five fictional phishing emails, correctly marking the red flags and the safe action for each.

## C. Required Materials
<!-- kind:materials -->
Hardware
One computer per learner (academy desktops). Pairing is acceptable: one learner reads aloud, the other annotates, then
swap.
Instructor computer connected to a projector or large screen.
Software
A modern browser (Chrome/Edge/Firefox). A webmail account (Gmail or similar) for the instructor's own demonstration
only.
No hacking tools, no "spoofing" tools, no live scam links. Ever.
Accounts
The instructor may use their own email account to show the Report/Spam buttons and where to read full headers. Learners
do not need to log into personal email for the practical; printed/laptop-viewed fictional samples are sufficient. If a learner
wishes to practise in their own inbox, they must use only their own account and never open suspicious links.
Sample files (instructor-prepared, fictional)
Phishing Sample Pack (5 items) — all invented. Each is a screenshot or a text document that mimics an email. No live
links. Names used are fictional (e.g., "Zenith-alert.example", "GTBank-secure.example" — note the .example domain,
which is reserved for teaching and cannot be a real attack site). Suggested five:
1. Fake bank alert claiming "your account will be blocked in 24 hours".
2. Fake employer HR email asking to "confirm your bank details for salary".
3. Fake invoice from a "supplier" with an attached "receipt".
4. Fake delivery/courier "you missed your parcel, pay a small fee".
5. A look-alike domain email pretending to be a colleague (spear-phishing) with a request to buy gift cards.
Worksheets
Worksheet 4.1 — "Spot the Six Red Flags" (one page, three emails to annotate).
Worksheet 4.2 — "Safe Action Chooser" (learner workbook, Part 3).
Tools
Browser hover tooltip (built in). Optionally, a printed "header anatomy" diagram prepared by the instructor.
Internet
Not strictly required. If internet is available, the instructor may show the concept of full email headers on their own account,
but the session must work fully offline.
Alternative for learners who lack a facility
Any laptop or phone browser works for viewing the fictional samples. A phone learner can still practise "hover/long-press to
preview a link" (on many phones, a long-press shows the destination). Pair them with a desktop learner.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: Put one fictional email on the projector — the "bank alert" sample — and read it aloud at normal speed,
once.
"Dear Customer, Your account has been temporarily limited. To restore access, please confirm your details within 24 hours
by clicking the link below. Failure to do so will lead to permanent suspension. Click here: [secure-zenith-alert dot example]"
What the instructor says:
"Show of hands — who felt a small jump in the chest? Who felt like you should quickly click so your money is safe? ... Good.
That feeling — that small panic — is exactly what the attacker is counting on.
Look closer at the greeting. It says 'Dear Customer'. Does your real bank call you 'Customer'? No — your bank knows your
name. Now look at the link. The words say one thing. Where it actually goes is a different thing. Today you will learn to
slow down, look at the truth behind the words, and never click in a panic."
Expected learner response: Learners will likely say things like "the bank will never send that", "the greeting is generic", "there is
a link", "they want my details". Some may admit they have received such messages. Accept all. Reinforce that receiving these is
normal — the skill is recognising them without fear.
Then demonstrate the hook: Hover the mouse over the fake link without clicking, and let the browser show the real destination
on the projector.
"See this? The words say 'Zenith secure'. But the real address is a strange domain ending in .example . The text lied; the
destination told the truth. Hover before you click. That one habit will save you many times."
Why this opener works: It creates an emotional "near-miss" moment safely, proving that phishing targets emotion first, and it
ends with one concrete, repeatable action (hover before click) that the learner can use immediately.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Run as an oral round-robin. Put the questions on the projector.
Question 1: "In Session 3, what does HTTPS and the padlock tell you about a website?"
Expected answer: that the connection between your browser and the site is encrypted (private) and that the address is the
one you typed. It does not prove the site is honest — a scam site can also have HTTPS.
Common gap: learners think a padlock means "safe site". Re-state clearly: the padlock means private connection, not
trustworthy owner. This matters today because phishing links increasingly use HTTPS too.
Question 2: "What is MFA, and name one type?"
Expected answer: Multi-Factor Authentication — a second proof of who you are beyond the password, e.g., a code from an
app/SMS, a fingerprint, or a hardware key.
Common gap: confusing the password with the second factor. Remind them: MFA means "something you know PLUS
something you have/are". Even if a phisher steals the password, MFA blocks the login.
Question 3: "Say the Stop–Think–Verify steps from Week 1."
Expected answer: Stop (do not rush); Think (does this make sense? who really sent it?); Verify (check through a separate,
known channel).
Common gap: learners skip straight to Verify without Stopping. Emphasise that the pause is what breaks the attacker's trick.
Bridge to today (say this):
"Last session we made sure the website was who it claimed to be. But most attacks do not come through a website you
chose — they come to you, in your inbox, in your WhatsApp, in a phone call. They ask you to do something: click, pay,
confirm, forward. They are not hacking the computer; they are hacking the person. That is called social engineering, and
today we learn to see it coming."
If more than a third of the class cannot describe Stop–Think–Verify, spend 3 extra minutes re-teaching it before continuing.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 How email works — the simple truth
The idea. Email is a message that travels from a sender's mail service to a recipient's mail service over the internet, and then sits
in a mailbox until you open it.
Plain-English definition. Think of email like the postal service. You write a letter, put an address on the envelope, and hand it to
a post office. It is carried and delivered to another post office, then placed in a mailbox. Email does exactly this, but instantly.
The parts of an email you should care about as a defender:
What it is Why it matters
Display name The friendly name shown, e.g.,
"GTBank Alert"
Anyone can type any display name. It is just a label. Never trust
it.
Real sender address The actual address, e.g.,
```text
alerts@gtbank.com
```
This is the true origin. Learn to read it carefully.
Subject The title line Attackers use it to create urgency ("URGENT: Account blocked").
Body The message text Contains the trick, the request and the link.
Links Text that, when clicked, opens a
web address
The visible text and the real destination can differ.
Attachments Files attached to the mail A common way to deliver malware (covered fully in Session 5).
What it is Why it matters
Headers The hidden technical details of
the message
These show the true route and can expose fakes, but are hard to
read — we only need to know they exist.
Why it exists / why the fakes are possible. Email was designed for convenience and openness, long before fraud was a
concern. The system allows a sender to write almost any display name, and the visible link text is just words — the real
destination is hidden behind it. These two facts are the attacker's main tools.
A familiar Nigerian scenario. You get an SMS or email: "Dear customer, your transfer of ₦150,000 is on hold. Call this number."
The sender's name in your phone may even read "GTBank" because SMS sender IDs can be spoofed. The message is fake, but
the name looks real. The same trick works by email.
Misconception to kill early. "If the email came from my bank's name, it is from my bank." Wrong. The name is a label, like
writing "FROM THE PRESIDENT" on an envelope. It proves nothing.
Limitation. Email itself cannot fully stop phishing; it is a delivery channel. Protection comes from your habits plus your mail
provider's filters (which help but are never perfect).
F.2 What phishing is, and why it works
Plain-English definition. Phishing is a fake message that pretends to come from a trusted person or organisation in order to
trick you into giving information, clicking a link, paying money, or opening a harmful file.
The word itself. "Phishing" is like fishing: the attacker throws out many baits (fake emails) hoping to catch some people (the
fish). Most people ignore the bait; the attacker only needs a few to bite.
Why it works — the psychology. Attackers do not need to fool everyone. They use emotions that make us act fast without
thinking:
Fear / urgency — "Your account will be closed today!"
Authority — pretending to be a bank, an employer, or the government.
Greed / reward — "You have won ₦500,000."
Curiosity — "See what this person said about you."
Helpfulness — "Please assist me, I am in a meeting, buy this urgently."
The familiar analogy. Phishing is like a stranger at the market gate wearing a shop uniform, calling you by a friendly greeting
and saying "Come, there is a special discount inside — just give me your bag first." The uniform is fake; the friendliness is the
bait; the goal is your bag.
A realistic Nigerian scenario. An email arrives with the subject "FINAL NOTICE: Your POS terminal will be deactivated." It says
your POS provider needs you to "reconfirm your settlement account" by clicking a link. A busy shop owner, worried about
losing POS income on a Saturday, clicks and types his banking details. The details go straight to the attacker.
Misconceptions.
"Phishing is always badly written." Sometimes, but good attackers write clean, correct English. Do not rely on spelling alone.
"Only foolish people fall for phishing." False — busy, tired, pressured and polite people fall for it. It is designed for human
nature, not stupidity.
"My email filter catches everything." Filters help a lot but miss some. You are the last line of defence.
Limitation. No single check is enough. That is why the answer is a combination: check sender, hover the link, be suspicious of
urgency, and verify by another channel.
F.3 The red flags — how to recognise a phishing email
Teach these as a checklist. The learner should be able to name at least six.
1. Look-alike domain (the strongest clue). The real address is slightly wrong. Examples:
gtbank.com (real-ish style) versus gtbank-secure.example or gtb-ng.example .
paypal.com versus paypa1.com (the letter l replaced by the number 1).
Extra words, extra hyphens, or a different ending ( .net , .xyz , .top , or a country you do not expect). Rule: read the
address right to left, from the last dot backwards. The part just before the final dot is the real organisation name.
2. Urgency and deadlines. "Within 24 hours", "Immediately", "Your account will be blocked", "Act now". Real organisations
rarely demand instant action by email.
3. Threats. "Permanent suspension", "Legal action", "Your money will be lost". Fear pushes you to click without thinking.
4. Unusual or sensitive requests. Asking for a password, PIN, card number, OTP code, or to "confirm your details". No
legitimate bank will ever ask for your full password or OTP by email. The OTP is the second factor from Session 2 — it must
never be shared.
5. Generic greeting. "Dear Customer", "Dear User", "Dear Sir/Madam". A real company that holds your account usually knows
your name.
6. Spelling, grammar and strange formatting. Odd spacing, wrong logos, "Kindly do the needful", inconsistent fonts. A clue,
but not proof on its own.
7. Mismatched link text versus destination. This is the one we demonstrate. The words say www.gtbank.com but hovering
shows something completely different. Always hover before clicking.
8. The "from" address does not match the signature. The signature says "First Bank" but the sender address is firstbank-
help@randommail.example .
9. Attachments you did not expect. Especially .zip , .exe , .scr , or a "receipt" you never asked for. (Full malware treatment
is in Session 5, but flag it here.)
10. Reply-to differs from the sender. A scammer may set replies to go to a different address they control. (Advanced; mention
only.)
Worked example (say this): "Subject: URGENT — verify your account. From: 'Access Bank' access.secure@mail-alert.example.
Body: 'Dear Customer, your account is at risk...' " Let learners call out the flags: urgency, display-name mismatch, wrong
domain, generic greeting, fear. That is five flags in one small message.
F.4 "Hover before you click" and checking the real sender
Hover before you click. Move the mouse pointer over a link (but do not press the button). After a short moment, the browser
shows the real destination address in a small bar at the bottom-left of the window. On a phone, a long-press often reveals the
link.
If the destination does not match what the words claim — do not click.
If the destination is a strange domain, a short-link service (like bit.ly ), or an IP number — treat it as suspicious and do
not click.
Reading the real sender address. In many mail apps, clicking the sender's name reveals the full address, e.g.,
alerts@gtbank.com . Read it carefully:
Look at the domain (the part after the @).
Compare it exactly with the official domain you know.
Watch for swapped letters ( rn looking like m ), added hyphens, or added words.
Why the display name lies. The display name is free text, like the "From" line on a paper letter. An attacker writes "GTBank"
there and it appears in your inbox. The real address behind it is what matters.
The analogy. Hovering is like checking a person's ID card before letting them in, instead of trusting the uniform.
Important defensive rule: We only hover and read in this session. We never click a link in a suspicious message — not
even "just to see". Clicking can launch a fake login page, download malware, or tell the attacker your address is live.
F.5 Social engineering: spear-phishing, pretexting, CEO fraud, fake invoices
Social engineering, defined. Social engineering is any trick that manipulates a person into breaking normal safety rules —
giving information, clicking, paying, or granting access. Phishing is the email form of social engineering; the same tricks come
by phone (vishing), SMS (smishing), and WhatsApp.
Spear-phishing. A targeted phishing message, written for one specific person or small group, using details gathered about
them (their boss's name, the project they work on, a recent event). Where ordinary phishing is a wide net, spear-phishing is a
spear aimed at one fish.
Scenario: A staff member at a Port Harcourt school receives an email addressed to her by name, mentioning the exact event
she organised last term, "from the principal", asking her to "quickly share the parent contact list".
Pretexting. Inventing a story (pretext) to justify a request. The attacker plays a role — IT support, a new supplier, a stranded
relative — to make the request seem reasonable.
Scenario: "Hello, I am from your bank's fraud desk. We detected a suspicious transfer; to cancel it I need the OTP we just
sent you." The story is the pretext.
CEO fraud (business email compromise). The attacker impersonates a senior person — the owner, MD, or CEO — and
pressures a junior staff member to make an urgent payment or share data, often adding "keep this confidential" so the victim
does not check.
Scenario: A shop's accountant gets an email from "the MD" (spoofed display name) saying: "I am in a meeting, pay this new
supplier ₦450,000 today, do not discuss with anyone." The accountant, wanting to be helpful and not embarrass the boss,
pays.
Fake invoice scams. A message pretending to be a supplier or service provider sends an "invoice" or "receipt" and asks for
payment to new bank details, or attaches a harmful file. Small businesses are prime targets because invoice payments are
normal.
Scenario: A market trader receives an email "from" a known supplier with an outstanding invoice but a changed account
number — "we have switched banks".
Impersonation of family/employer/bank. On WhatsApp, a scammer may clone a relative's photo and name and message "It's
me, I'm in trouble, send money fast." Voice can even be faked now, so verify by calling the person on a number you already
know.
Misconceptions.
"If they know my name, it must be genuine." Personal details leak in many breaches; knowing your name proves nothing.
"It is rude to check." Checking is professional, not rude. A genuine boss will thank you for verifying.
Limitation. You cannot always tell if a voice or message is fake. Therefore the golden rule is out-of-band verification: never act
using the contact details inside the suspicious message — use a channel you already trust.
F.6 What to do when you get a suspicious email
Teach this as a fixed sequence. This is the most important part of the session.
1. Do NOT click any link, button, or attachment in the message.
2. Do NOT reply, and do not forward it to friends and family to "check" — forwarding can spread the scam.
3. Report it using your mail app's Report phishing / Report spam button. If it claims to be your bank, your employer, or a
known company, also report it to that organisation through their official website or app (a number or address you look up,
not one from the email).
4. Verify by a separate, known channel. If the email claims to be your bank, open your bank app or call the official number
on your card. If it claims to be your boss, walk to their office or call their known number. Never use the contact details
inside the suspicious message.
5. Delete the message (if your mail app does not delete it automatically when you report it) and mark the sender as
spam/blocked.
6. If you already clicked or typed details: change that account's password immediately, turn on/confirm MFA, tell the
organisation, and watch your bank/app alerts. Speed matters.
The analogy. A suspicious email is like a letter that smells of smoke. You do not take it into your house to examine — you
handle it safely, flag it, and confirm with the real sender through a channel you already trust.
F.7 Protecting the email account itself
Email is the master key to your digital life: password-reset links for almost every service go to your email. If an attacker gets into
your email, they can reset your bank, your WhatsApp, your social media. So protect it like the key to your house.
A unique, strong password. Use one you have never used anywhere else (Session 2). Email passwords are the most valuable
to attackers, so they must be the strongest and most unique.
Turn on MFA. Prefer an authenticator app or a hardware key over SMS if available. Even the best password can be stolen;
MFA is the second lock.
Never share OTP/verification codes with anyone, ever — not "bank staff", not "support", not family over the phone. No
genuine organisation asks for your OTP.
Review active sessions/devices in your mail settings and sign out anything you do not recognise.
Watch the login alerts your provider sends and verify unusual sign-ins.
Do not reuse your email password on shopping or entertainment sites.
Nigerian scenario. A trader's email password was the same as a football-betting site password. That site leaked, the password
appeared on a breach list, and attackers logged into his email, reset his bank password, and moved money. One unique
password would have stopped the chain. (HaveIBeenPwned was demonstrated with your own email in Session 2 — this is the
real-world reason.)
Limitation. Even with all this, a clever spear-phish can still trick you. That is why habits (stop–think–verify, hover, verify out-
of-band) remain essential and are not replaced by technology.
F.8 Summary of the session
Email is like post: the display name is a label anyone can write; the real address is the truth.
Phishing is a fake message that uses fear, urgency, authority or reward to make you act.
Red flags: look-alike domains, urgency, threats, unusual requests, generic greeting, bad spelling, mismatched link text
vs destination.
Hover before you click — read the destination, do not trust the words.
Spear-phishing, pretexting, CEO fraud and fake invoices are targeted forms of social engineering.
Response: do not click → report → verify by a separate known channel → delete/block.
Protect the email account with a unique strong password + MFA, and never share OTPs.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 What the instructor prepares
The projector with an open browser.
The five fictional phishing samples (printed or on-screen). No live scam links — all links are text and point only to non-
existent .example addresses or to a safe blank page.
The instructor's own email account logged in (optional) to show the Report/Spam buttons.
Worksheet 4.1 printed for every learner.
G.2 Demonstration 1 — an anatomy walk-through (6 minutes)
Say: "I am going to read one fake email slowly and out loud, and we will hunt for the traps together."
Put the "bank alert" sample on the projector. Read line by line and ask the class to shout "flag!" when they hear a trap.
<display name: Zenith Bank Security> → "Is this the real name? No, it is a label."
From: security@zenith-alert.example → point at the domain: "The last two parts before the final dot are zenith-alert , not
zenithbank . Look-alike."
Subject: URGENT → urgency flag.
Dear Customer → generic greeting flag.
...within 24 hours or your account will be suspended → threat flag.
Click here to verify your details → request for sensitive information flag.
Hover the link: the destination appears, e.g. https://zenith-verify.example/login . The text said "Zenith Bank" but the
destination is a completely different domain. Mismatch flag.
Count the flags out loud: "Urgency, generic greeting, threat, wrong domain, mismatched link. Five traps in one short email."
Questions to ask:
"If the link text says your bank's name but the destination is different, which do you trust?" → the destination, and even
then only the real domain.
"Does the padlock save us here?" → No; a fake site can also show a padlock.
G.3 Demonstration 2 — the safe response, live (5 minutes)
Say: "Now watch what a professional does with this email. Watch my hands — I never click the link."
1. Hover the link again; show the destination.
2. Click Report phishing (or Report spam) in the mail app — show where the button is.
3. Say: "Now I verify — but NOT using anything in this email." Open the bank's official app or the number on a card (use a
fictional demonstration or describe it), and show that there is no such alert.
4. Show Delete and Block sender.
5. Recap aloud: "Don't click. Report. Verify a different way. Delete."
What to watch for: Learners may want to click "just to see". Firmly explain that clicking can confirm your address to the
attacker, open a fake login page, or download malware — and that in a real situation we never do it.
G.4 Demonstration 3 — the email account settings (4 minutes)
Say: "Now let us protect the master key — the email account itself."
On the instructor's own account (projector):
Open Security settings.
Show where two-step verification / MFA is enabled (do not reveal any real secret codes).
Show the list of signed-in devices/sessions and explain: "If you see a device you do not know, sign it out and change your
password."
Point out where login alerts appear.
Questions to ask:
"Why is email the most dangerous account to lose?" → it can reset your other passwords.
"Would you share an OTP with 'support'?" → never.

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: With the instructor guiding, learners examine five fictional phishing emails, annotate the red flags, and decide the
safe action for each — using only fictional samples and their own observations.
Starting materials: The five fictional samples (printed or on-screen), Worksheet 4.1, and a pen. No live links, no clicking.
Procedure (instructor calls each step; learners work at their seats; instructor walks the room):
1. Hand out the Phishing Sample Pack (5 items) and Worksheet 4.1. Confirm every sample has a fictional address ending in
.example .
2. Explain the task: "For each email, find the red flags and write the safe action in the box. Use only your eyes — do not click
anything."
3. Read Sample 1 together as a class, then let learners fill it in as a worked example:
Flags: urgency + look-alike domain + generic greeting.
Safe action: do not click; report; verify via the official bank app; delete.
4. Pause and predict (Sample 1): "Before you look at Sample 2 — what kind of trap do you expect next?" Let them guess
(e.g., a delivery fee, an invoice, a WhatsApp-style relative). This trains pattern recognition.
5. Learners work through Samples 2–5 individually (about 10 minutes). For each, they record:
At least three red flags.
Whether they would click (answer must be no).
The correct safe action.
6. For the mismatched-link samples, learners must hover (or long-press) and write the real destination next to the visible text.
7. Where is the real sender? For each sample, learners circle the true sender address and underline the domain.
8. Instructor calls time; a quick share-out: two learners read one flag each.
Expected result: Each email fully annotated with red flags and the safe action. Sample findings should include: (1) bank alert
— urgency, look-alike domain, generic greeting; (2) HR salary email — unexpected request for bank details, authority, generic
greeting; (3) fake invoice — changed bank account, attachment not expected, plausible supplier story; (4) delivery fee — small
payment request, short link; (5) spear-phish colleague — personalised, gift-card request, "keep it quiet".
Points to pause and predict:
After Sample 3: "Would a real supplier email you new bank details out of the blue?" → No; verify by phone with a known
number.
After Sample 5: "Is it rude to refuse the boss?" → No; verifying is professional.
Troubleshooting while walking the room:
Learner cannot find the real address → show that the display name must be expanded/clicked to reveal the address.
Learner says "the English is correct, so it is safe" → remind them good phishing can be well written.
Learner says "I will click to check" → firmly stop; clicking is never the safe move.
Completion checklist (learner ticks each):
All five emails examined
At least three flags per email
Real sender address identified and domain circled for each
Hovered the links and wrote the true destination
Safe action written for each
Never clicked any link

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Build a one-page "Shopping / Online-Banking Safety Card" that a beginner could keep by the computer, and test it on
two new fictional emails provided at the start of the exercise.
Scenario: Your church's youth group asks you (the class) to produce a simple, printable safety card for members who use online
banking and online shopping. It must help a person who knows nothing about phishing decide, in under 30 seconds, what to
do with a suspicious message.
Starting information (given):
Two new fictional emails (Email A: a fake "you overpaid, please send back the difference" message; Email B: a fake "your
WhatsApp will be deleted, verify now" message).
The six-to-ten red flags from Section F.
The response sequence from Section F.6.
Requirements:
1. On the card, list the red flags in plain words (no technical jargon) — at least seven.
2. Add a clear "STOP — DO THIS" sequence for receiving a suspicious message (do not click, report, verify by a separate
channel, delete).
3. Add a rule about OTP and passwords: "Never share, ever."
4. Apply the card to Email A and Email B: for each, list the flags you find and the action you would take.
5. Keep it to one page, readable by a market trader with basic English.
Time allowance: 15 minutes.
Success criteria:
At least seven clear red flags in everyday language.
A correct and complete "STOP — DO THIS" sequence.
Both sample emails correctly assessed.
The card is genuinely simple enough for a non-technical user.
Hints available if stuck:
Hint 1: Start each red flag with "If you see… then be careful."
Hint 2: Use the sequence: don't click → report → verify differently → delete.
Hint 3: For Email A, ask "why would a stranger send me money and ask me to send it back?" For Email B, ask "would
WhatsApp really delete me by email?"
Instructor answer key (do not show learners):
Red flags (model list, plain language):
1. It rushes you ("urgent", "within 24 hours").
2. It threatens you ("account will be blocked", "deleted").
3. It calls you "Customer" instead of your name.
4. The sender's address looks almost right but not quite.
5. The words of a link say one thing; the real link is different.
6. It asks for your password, PIN, card number or OTP.
7. There is an attachment you did not ask for.
8. The money offer is too good or the request is strange.
"STOP — DO THIS" sequence:
1. Stop. Do not click, do not reply.
2. Report it (Report phishing/spam) and tell the real organisation using a channel you look up yourself.
3. Verify by a separate known channel (bank app, official number on your card, boss's known number).
4. Delete and block the sender.
5. If you already clicked or shared details: change the password now, confirm MFA, alert the organisation, watch your bank
alerts.
Email A (overpayment): Flags — unexpected money, request to send money back, urgency, generic greeting. Action — do not
reply; this is a classic overpayment/advance-fee scam; report, verify with your bank through its official app, delete. Never send
money back based on an email.
Email B (WhatsApp deletion): Flags — threat of deletion, urgency, "verify now", look-alike domain, generic greeting. Action —
WhatsApp does not delete accounts by email; do not click; verify in the app itself; report and delete.
Marking guidance (out of 10):
Seven-plus correct red flags (3)
Complete and correct STOP sequence (3)
Email A correctly assessed (2)
Email B correctly assessed (2)

## J. Real-World Case Study
<!-- kind:case_study -->
Situation (fictional, non-identifying). A small money-transfer and POS business in a busy part of Port Harcourt — we will call
it Rivers QuickCash — has one owner, Mrs. Amaka, and two young staff who handle the counter and the business email. The
business uses email to communicate with its POS terminal supplier and its bank.
What happened. One Friday, close to month-end, the "supplier's accounts officer" sent an email titled "UPDATED
SETTLEMENT ACCOUNT — ACTION REQUIRED TODAY". The email used the supplier's logo and a display name identical to
the supplier's. It said the supplier had changed banks and that the monthly terminal service fee of ₦180,000 should now be
paid to a new account, "before 5pm or service will be suspended". The message was signed "Accounts Dept" and added: "Do
not copy other staff, this is confidential."
A junior staff member, wanting to be diligent before the weekend and not to embarrass anyone, began the transfer. At the point
of final confirmation, he paused — the new account was in a personal-sounding name, and the email address ended in
.example when he hovered, not the supplier's known domain.
Relevant facts.
The request was urgent and came just before a deadline and the weekend.
The sender's display name matched the real supplier, but the address did not.
The new bank details were a change from the usual account.
The message asked for secrecy.
The staff member had the authority to make routine payments — a risk.
Decision point. The transfer is ready for final confirmation. Does he send the money to the new account, or stop and verify?
Possible approaches.
1. Send the payment quickly to avoid "service suspension".
2. Reply to the email asking "are you sure?".
3. Stop, then verify the new account by phoning the supplier's known, existing number (from previous genuine invoices, not
the email).
4. Ask the bank to check the beneficiary name first.
Recommended solution. Approach 3, supported by 4. He stops, calls the supplier's real accounts officer on the number already
on file, and asks directly. The supplier confirms it sent no such email. He reports the message, blocks the sender, deletes it, and
alerts the two other staff and the owner so nobody else pays.
Trade-offs.
Approach 1 is fast but could lose ₦180,000 that is almost never recovered.
Approach 2 is dangerous: replying confirms to the attacker that the address is live and lets them keep the lie going.
Approach 3 costs a few minutes and a phone call, and is the only approach that uses a trusted channel. Minor cost: if it had
been genuine, the payment is a little late — a small inconvenience versus losing the money.
Approach 4 adds bank verification, which is good practice for changed account details, but is not a substitute for calling the
supplier.
Professional connection. This is exactly what "business email compromise" defence looks like in real entry-level office work:
verify any change of bank details by phone using a number you already have; never by replying to the email; and treat
urgency plus secrecy as a warning, not a reason to hurry. The same rule applies to a one-person shop and a bank.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
Use this as the live troubleshooting guide. Where a learner hits an issue, ask them to check the relevant row rather than giving
the answer immediately.
K.1 "I clicked the link before I thought"
Symptoms: Learner realises after clicking; may see a fake login page or a blank page. Likely cause: The urgency trick worked.
(Confirmed once they admit they clicked.) How to investigate: Ask what the page asked for. Did they type anything? Did
anything download? Safe corrective steps: Close the page. Do not log in. If any details were typed, change that account's
password immediately, confirm MFA, and tell the organisation. Run a scan (Session 5). Delete the email and report it. How to
confirm resolved: Account password changed; no unusual login alerts; reported. How to prevent recurrence: Practise the
physical pause — hover first, always.
K.2 "But the sender's name was the bank's name, so it's real"
Symptoms: Learner trusts the display name. Likely cause: Not knowing a display name is free text. How to investigate: Expand
the sender to reveal the real address; compare with the official domain. Safe corrective steps: Teach reading right-to-left
through the domain. How to confirm resolved: Learner can state the real domain and whether it matches. Prevention: Always
check the address, never the label.
K.3 "The website had a padlock, so it must be safe"
Symptoms: Learner uses the padlock as proof of honesty. Likely cause: Confusing encryption with trust (Session 3 gap). How
to investigate: Check the domain, not the padlock. Corrective steps: Re-explain: padlock = private connection, not a good
owner. Prevention: Judge the domain, hover the link.
K.4 "I wanted to check, so I replied to ask if it was real"
Symptoms: Learner replies to a suspicious email. Likely cause: Not knowing that replying confirms your address and keeps the
attacker talking. How to investigate: Determine what was said in the reply and whether any details leaked. Safe corrective
steps: Stop replying; report and block; if any details were shared, secure the account. Prevention: Verify only by a channel you
choose — never inside the suspicious message.
K.5 "I forwarded it to my friend to ask if it was a scam"
Symptoms: Learner forwards suspicious email to others. Likely cause: Thinking a second opinion online is safe. How to
investigate: Did the forward include the live link? Warn the friend not to click. Corrective steps: Tell the friend to ignore/delete;
don't forward further. Prevention: Report through the proper button; verify with the real organisation.
K.6 "Someone asked for my OTP and sounded like the bank"
Symptoms: Learner nearly shared a code. Likely cause: Pretexting — a convincing story. How to investigate: Ask if any code
was shared; if so, treat the account as compromised. Corrective steps: If shared — call the bank on the official number,
change the password, confirm MFA, watch alerts. Prevention: Rule: no genuine organisation ever asks for your OTP or full
password.
K.7 "The English was perfect, so I trusted it"
Symptoms: Learner uses writing quality as the only test. Likely cause: Believing the myth that phishing is always badly written.
Corrective steps: Re-teach: good attackers write well; judge the domain, the request and the urgency, not the grammar.
Prevention: Never rely on one single clue; use the whole checklist.
Distinguish likely vs confirmed: Every "likely cause" becomes "confirmed" only after checking — e.g., expanding the sender
address, hovering the link, or seeing the actual charge/login alert. Teach learners to confirm before they conclude.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "Phishing Red-Flag Report and Family Safety Brief"
Purpose: Practise applying the red-flag checklist and the safe-response sequence to realistic fictional messages, then explain it
clearly in plain English — the same skill needed for the capstone report in Week 3.
Realistic scenario: You are the informal "tech person" in your family or church. A relative forwards you two suspicious emails
and asks, "Is this real?" You must write a short report answering them safely, and prepare a simple brief you could share so the
family does not get scammed.
Detailed instructions:
1. Write a short report (about one page) covering two fictional emails supplied by the instructor (or, if you wish, two
messages you invent yourself — but keep them fictional and safe).
2. For each email, include:
The real sender address and whether its domain is genuine.
At least four red flags, named in plain words.
The safe action to take, step by step.
What to do if the person already clicked or shared details.
3. Write a five-line "Family Safety Brief" in simple English that a non-technical relative could follow.
4. State the OTP/password rule clearly.
5. Do not include any real scam link, any real person's details, or any data belonging to someone else.
Required deliverables:
session4-assignment/red-flag-report.md (or a typed page/photo).
session4-assignment/family-safety-brief.md .
A note confirming that all examples are fictional and that you did not click anything.
Submission format: In the class folder as files, or a photo of a handwritten report in your workbook.
Deadline: Before Session 5.
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
Correct identification of real sender/domain 3 Reads the address, not the display name
Red flags named in plain language 5 At least four accurate flags per email
Safe action steps correct and complete 4 No click, report, verify separate channel, delete
"Already clicked" recovery steps 3 Change password, MFA, alert org, watch alerts
Family Safety Brief clarity 3 Simple enough for a non-technical reader
Professionalism / all fictional & safe 2 No real links or data; clear note
Common mistakes to avoid: trusting the display name; forgetting the "already clicked" recovery; giving advice that involves
clicking to check; using jargon the family cannot understand.
Instructor reference solution (model answer):
Email 1 — "Bank alert": Real address alerts@zenith-secure.example ; domain zenith-secure.example is not the bank's real domain
(look-alike + wrong ending). Flags: urgency ("24 hours"), threat ("suspended"), generic greeting ("Dear Customer"), link text
says the bank but hover shows a different domain. Safe action: don't click; Report phishing; open the bank app to confirm no
alert; delete and block. If already clicked/shared: change the bank password, confirm MFA, call the bank on the number on your
card, watch alerts.
Email 2 — "Supplier changed bank account": Real address is a free mail domain, not the supplier's. Flags: request to change
payment details, urgency, secrecy ("do not copy others"), plausible story (pretexting), unexpected attachment. Safe action: don't
pay; phone the supplier's known number to confirm; report; delete. If already paid: call your bank immediately to try to recall
the transfer, report to the police.
Family Safety Brief (model): "1. If a message is urgent, stop — that is the trick. 2. Never click a link in a message you did not
expect; hover first to see where it goes. 3. Never share your password or the code sent to your phone — not with anyone. 4. If
your 'bank' or 'boss' asks for money or details, call them on the number you already have. 5. Suspicious? Report it, delete it, and
tell someone you trust."

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key.)
Q1. Multiple choice. What does the display name of an email prove about who sent it? a) That the sender is genuine. b) That
the sender's company verified the email. c) Nothing — anyone can type any display name. d) That it passed the padlock test.
Q2. Short answer. Name four red flags of a phishing email.
Q3. Explain in your own words. What is the difference between the link text and the link destination, and what should you do
about it?
Q4. True or false, with a reason. "If an email uses correct English, it cannot be phishing."
Q5. Practical identification. An email says it is from "First Bank" but the sender address is firstbank-alerts@secure-mail.example .
What is the red flag, and why?
Q6. Scenario. A message "from your MD" asks you to urgently pay a new supplier and to keep it secret. List the red flags and
say exactly what you would do.
Q7. Fill in the blanks. The safe response sequence for a suspicious email is: do not ____; ____ it to the proper place; ____ it
through a separate known channel; then ____ and block it.
Q8. Fill in the blanks. No genuine organisation will ever ask you for your full ____ or your ____ (one-time code) by email, SMS or
phone.
INSTRUCTOR ANSWER KEY (Q1–Q8)
A1. (c) Nothing — anyone can type any display name. A2. Any four of: look-alike/wrong domain; urgency; threats; request for
sensitive information (password/OTP/details); generic greeting; spelling/grammar errors; link text not matching destination;
unexpected attachment; display name not matching the real address; request for secrecy. (Accept any four correctly described.)
A3. The link text is just words the attacker wrote (what you see); the link destination is the real web address the click would
open (what the browser shows when you hover). If they do not match, or the destination is a strange domain or short link, do
not click — treat it as suspicious. A4. False. Good attackers can write clean, correct English, sometimes better than the real
company. Grammar is only one clue; check the domain, the request and the urgency. A5. The domain secure-mail.example is
not First Bank's real domain — this is a look-alike / wrong domain flag. The display name says "First Bank" but the real address
goes elsewhere, so the message is likely fraudulent. A6. Red flags: authority (the MD), urgency, unusual request (new
supplier/payment), secrecy ("do not discuss"), change of bank details. Action: do not pay; verify by calling the MD on their
known number or walking to their office; if genuine, follow the organisation's normal payment process for changed account
details; report the email; never use the contact details inside the message. A7. do not click; report it; verify it; then delete and
block. A8. full password (or PIN/card number); your OTP (one-time password / verification code).

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today you learned that most attacks do not hack the computer first — they hack the person. Email is
like post, where the sender's display name is only a label anyone can write, and the real address is the truth. Phishing uses fear,
urgency, authority and reward to make you act before you think. You learned to spot the red flags, to hover before you click,
to check the real sender, to recognise spear-phishing, pretexting, CEO fraud and fake invoices, and to respond the professional
way: don't click, report, verify through a separate known channel, then delete. You also connected this to protecting the email
account itself with a unique strong password and MFA.
Five important takeaways:
1. The display name lies; the real address and the hover destination tell the truth.
2. Phishing exploits emotion — stop the panic and you stop the trick.
3. Hover before you click, and never click "just to check".
4. Response order: don't click → report → verify a separate way → delete/block.
5. Email is the master key: unique strong password + MFA, and never share an OTP.
Questions to help you recognise what you can now do:
Can I read a real sender address and tell whether the domain is genuine?
Can I hover a link and explain the difference between the text and the destination?
Can I name six red flags without looking at my notes?
Can I explain to a relative, in plain words, what to do with a suspicious message?
Connection to the next session: Phishing often leads to a second danger — malware hidden in links and attachments, and
unsafe devices. Next session, Device Hardening, we turn to the machine itself: Windows Updates, Windows Defender, the
firewall, and controlling which apps can run and install. If a bad file ever gets through, your hardened device is your next line of
defence.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
The learner expands the sender and reads the real address, not the display name, without prompting.
The learner hovers a link and correctly compares text versus destination.
The learner names red flags in plain language (not just "it's a scam").
The learner states the response sequence in the correct order.
The learner understands that a padlock and correct English are not proof of honesty.
The learner can explain why OTPs must never be shared, linking back to MFA from Session 2.
Common misconceptions to watch for and correct:
"The name in my inbox is the real sender." → Expand and check the address.
"Phishing is always badly written." → Good phishers write well.
"Replying to ask is a safe way to check." → Replying confirms your address; verify out-of-band.
"A padlock means the site is safe." → Padlock = private connection, not trust.
"Only gullible people fall for it." → It targets human nature under pressure, not intelligence.
Suggested remedial exercises for learners who struggle:
1. Domain drill: give ten sender addresses, mix real and look-alike; learners mark genuine or fake and explain.
2. Hover drill: provide a page of safe dummy links whose text differs from the destination; learners write the true destination
beside each.
3. Sequence drill: hand learners the four response steps jumbled; they re-order them and justify the order.
4. Plain-English drill: learner explains one red flag to a partner pretending to be a market trader with no computer knowledge.
Differentiation:
Level 1 (supported): Provide a partly filled worksheet with the flags already listed for two emails; the learner only decides
the safe action.
Level 2 (standard): The exercises as written.
Level 3 (challenge): Give an email that uses correct English, a genuine-looking domain with one swapped letter, and a
plausible pretext; the learner must find the single subtle clue and explain why all the "obvious" tests fail.
Timing guidance: If the room is slow, trim the case study (Section J) to a 3-minute mention and protect the guided and
independent practicals — the doing is the priority. If the room is fast, extend the independent exercise by having learners pair
up and verbally walk a partner through one email, then add a third sample.
END OF SESSION 4
Next: Session 5 — Device Hardening: Updates, Windows Defender and Firewall.
