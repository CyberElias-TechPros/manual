---
{
  "id": "cybersecurity/session-02",
  "course": "cybersecurity",
  "number": 2,
  "of": 9,
  "title": "Passwords, MFA and Password Managers",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/cybersecurity/session-02.png",
    "page": 18,
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
  "module": "Week 1 — Module 1: Hygiene (Stop–Think–Verify)",
  "duration_minutes": 105,
  "difficulty": "Beginner",
  "prerequisite_knowledge": "Session 1 (threat vocabulary and the Stop–Think–Verify mindset). Basic ability to log in to an account and open a web browser.",
  "connection_to_previous": "In Session 1 you learned who the attackers are and how they trick people. Today we block the number-one way they get in: a weak or reused password. Every threat from S1 becomes much harder to exploit once your accounts are strong and protected with MFA."
}
---
# Passwords, MFA and Password Managers

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 1 — Module 1: Hygiene (Stop–Think–Verify)

**Recommended duration:** 105 minutes

**Difficulty:** Beginner

**Prerequisite knowledge:** Session 1 (threat vocabulary and the Stop–Think–Verify mindset). Basic ability to log in to an account and open a web browser.

**Connection to previous work:** In Session 1 you learned who the attackers are and how they trick people. Today we block the number-one way they get in: a weak or reused password. Every threat from S1 becomes much harder to exploit once your accounts are strong and protected with MFA.

**Preparation before class:** Academy PCs on and logged in; Chrome open; Gmail accounts ready (create in the first 10 minutes if needed, or ask learners to bring their own); internet available for HaveIBeenPwned (own email only) and Bitwarden demo. Print Worksheet 2.1 (Password Upgrade) and Worksheet 2.2 (MFA Steps). Confirm the ethics and privacy reminders before any learner types their email anywhere. Test the projector so learners can follow screenshots live. Instructor safety note: Learners will handle their own email on a public breach-checking site today. Before that activity, read the privacy reminder aloud (Section G) and tell learners they may opt out and watch the demonstration instead. Never check anyone else's email.

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Explain why passwords fail — guessing, reuse, breaches and weak patterns — in plain language.
2. Create a strong passphrase (length, uniqueness, no personal information) that is easy to remember and hard to guess.
3. Explain why reusing one password everywhere turns a single breach into many compromises.
4. Describe what a data breach is and check whether their own email appears in a known breach, using a public breach-
checking service.
5. Set up multi-factor authentication (MFA) on their own account and explain the difference between authenticator-app MFA
and SMS-code MFA.
6. Use a free password manager (Bitwarden) to generate and store a unique password, and explain how it protects them.
7. Describe account-recovery best practice (recovery email, recovery codes, honest security questions) and why it matters.
8. Produce a personal account-safety action list: one upgraded password, one MFA-enabled account, one password-manager
entry.

## C. Required Materials
<!-- kind:materials -->
Hardware
One computer per learner (academy desktops). A shared computer is acceptable; pair learners so one types and one reads
the on-screen prompts aloud, then swap.
Instructor computer connected to a projector.
Learners may bring their own phone for the authenticator-app demonstration (optional but recommended).
Software
Google Chrome (any recent version).
A free password manager: Bitwarden — either the web vault at a browser, the browser extension, or the desktop app. The
instructor demonstrates; learners create a free account or watch.
A free authenticator app for MFA demonstration (e.g., Google Authenticator or any reputable TOTP app). Mentioning one is
enough; the academy does not endorse a single product — all TOTP apps follow the same standard.
Accounts
Learner's own Gmail account (required). If a learner does not have one, help them create it at the start, or pair them with a
learner who does for demonstration purposes. Learners never log into someone else's account.
Free Bitwarden account (optional for learners; created for the demonstration).
Sample files
Worksheet 2.1 — Password Upgrade (printed, 1 page).
Worksheet 2.2 — Turn On MFA Step Tracker (printed, 1 page).
A slide with three sample weak passwords and three sample passphrases (fictional, e.g., Password123 , Adaeze2010 ,
Correct-Horse-Battery-Staple ) for class discussion.
Tools
Chrome with the Bitwarden extension (instructor machine).
A TOTP authenticator app (instructor machine and learner phones where available).
HaveIBeenPwned website (own email only, with consent).
Internet
Required for HaveIBeenPwned and Bitwarden. If internet fails, the instructor demonstrates on the projector with a demo
account and learners complete the offline worksheets.
Alternative for learners who lack a facility
Any device with Chrome works. Phone-only learners can follow along for the MFA and Bitwarden parts, and use the offline
worksheets if they cannot sign in on a desktop.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: Write three passwords on the board:
password123 · Adaeze2010 · Chinedu4real
What the instructor says:
"Look at these three. Which is the strongest? … Many of you said the third, or the second, because it has a name and a
number. Let me tell you a secret: to a computer, all three fall in the same few seconds.
password123 is on every 'most-used passwords' list in the world. Adaeze2010 uses a name and a year — a computer can
guess names and years almost instantly. And Chinedu4real — a name, a number, and a common word.
Here is the truth: passwords are not protected by cleverness. They are protected by length and uniqueness. Today you will
learn to build passwords that a computer cannot guess, protect them with a second lock called MFA, and store them safely
in a free password manager."
Expected learner response: Learners usually believe a name-plus-year is strong. Some will say "I use my birthday." Accept
answers without judgement and use the moment to reset the belief.
Then hook with this question: "How many of you use the same password — or a small set — for your Gmail, your bank app,
and your Facebook?" Many hands go up. Say:
"By the end of today, that will change. One reused password is like using the same key for your house, your car, your shop
and your safe. If a thief copies that one key, everything opens."
Why this opener works: It directly challenges a widespread misconception, uses familiar Nigerian names, and lands on the
concept (length + uniqueness) that the whole session rests on.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Run this as a quick oral round-robin. Put the questions on the projector.
Question 1: "What are the three words of our security mindset from last session?"
Expected answer: Stop – Think – Verify.
Common gap: learners remember "look and check" but not the exact habit. Re-state it and ask for one example of "verify."
Question 2: "Which type of malware locks your files and demands money?"
Expected answer: ransomware.
Common gap: confusing ransomware with spyware. Re-state: ransomware kidnaps files; spyware watches secretly.
Question 3: "What is phishing, in one sentence?"
Expected answer: a fake message pretending to be from someone trusted, to steal a password, code or money.
Common gap: saying phishing is a virus. Clarify again: phishing tricks the person; malware is software.
Question 4: "Why do scammers love 'urgency'?"
Expected answer: because it stops people pausing and checking.
Common gap: learners think they personally are too careful. Remind: urgency beats carefulness when you are tired.
Bridge to today (say this):
"Last time we learned to spot the trick. Today we make the prize worthless to the thief. Even if a scammer tricks you into
giving away your password, we are going to add a second lock that stops them — and we make sure no single stolen
password ruins all your accounts."
If more than a third cannot answer Question 1, spend 3 extra minutes re-reading the S1 recap before continuing.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 Why passwords fail
The idea. Passwords are the front door to your digital life. When they are weak, it does not matter how good the rest of your
security is.
Plain-English definition. A password is a secret word or phrase that proves you are you. A password "fails" when someone else
can guess it, discover it, or use it.
Passwords fail in four common ways:
Way it fails What it means Familiar example
Guessing The password is short or predictable. 123456 , password , qwerty
Weak patterns Names, birthdays, phone numbers, "add a 1 at the end." Adaeze2010 , 0803xxxx , blessing123
Reuse The same password used on many accounts. One password for Gmail, bank and
Facebook
Breaches A website you used was hacked and your password
leaked.
A shopping site leaks all user passwords
Why computers make guessing deadly. A human guesses slowly. A computer tries millions of guesses per second. So short
passwords (or homepage patterns) are not "hard to guess" — they are easy for a machine.
Real-life comparison. A password is like the combination lock on a safe. 1234 takes seconds. A long, random combination
takes centuries. The lock is only as strong as how many possibilities someone must try.
Important limitation / misconception: "It is hard for a human to guess, so it is safe." Wrong. Attackers use machines. Judge
your password by how a computer would see it, not by how clever it feels.
F.2 What makes a strong password — and the magic of length
The idea. Two things make a password strong: length and uniqueness. Anything else is secondary.
Plain-English definition. A strong password is long enough that guessing is hopeless, and unique to one account, so a breach
elsewhere cannot hurt other accounts.
Length wins. Every extra character multiplies the number of possible combinations. This is why security professionals say:
length beats complexity. A long, ordinary-looking phrase is often stronger and easier to remember than a short, messy jumble.
Passwords versus passphrases.
A password is usually short and often hard to remember — so people write it down or reuse it.
A passphrase is a sentence-like string of several words. Example: Purple-Market-Goat-Sunday-72 . It is long, has no personal
meaning, and is far easier to remember.
Real-life comparison. A 3-letter padlock code has 1,000 possibilities. A 12-character passphrase has so many that a machine
would spend an absurdly long time. You have effectively turned a bicycle lock into a bank vault.
The rules of thumb for this course (memorise these four):
1. Make it long — at least 12–16 characters, longer is better.
2. Make it unique — a different password for every important account.
3. Avoid personal information — no names of family, birthdays, phone numbers, or state/city names.
4. Let a tool remember it — a human should not have to memorise twenty passwords. That is what the password manager
(F.5) is for.
Worked example — weak versus strong:
Example Why
```text
chinedu123
```
Short, name + sequence — weak
```text
Ch1nedu@2026!
```
Long-ish and mixed, but based on a name and year — still risky
```text
Market-Goat-Purple-Sunday-72
```
Long, random words, no personal info — strong passphrase
```text
v8K#2pL!q9Xw
```
Random-looking, good if generated by a manager — strong password
Misconception to correct: "Adding a symbol makes it strong." Symbols help a little, but a short password with symbols is still
short. Length does the heavy lifting.
F.3 Password reuse — the domino effect
The idea. Using one password across many sites means one breach topples all your accounts.
Plain-English definition. Password reuse is using the same password (or a tiny variation) on more than one account.
Why it is so dangerous. Attackers do not need to break into your bank directly. They break into the weakest site you used (a
small forum, an old shopping site), steal the password list, then try the same email-and-password on Gmail, Facebook, bank
apps and more. This automated trick is called credential stuffing — using stolen username/password pairs on other services.
Real-life comparison. It is like using one key for your house, your car, your shop safe and your church store. If that single key
is copied once, every door opens. Unique passwords mean each door has its own lock, so one stolen key opens only one door.
Say this to the class:
"A reused password is a single point of failure. When one site is breached, you do not lose one account — you lose
everything that shares that password. Uniqueness is what stops the dominoes from falling."
Misconception to correct: "I change one letter, so it is unique." Adaeze2010 and Adaeze2011 are almost the same to a
computer. True uniqueness means genuinely different passwords, which is why we use a manager to generate and store them.
F.4 What a data breach is — and checking your own email safely
The idea. A data breach is when a company's data — including user emails and passwords — is stolen or leaked.
Plain-English definition. A breach is a break-in at a company where your information was stored. You did nothing wrong; the
company's security failed.
Why it matters to you. If your email and password appear in a breach, attackers will try them elsewhere (credential stuffing).
Knowing your email has been breached is a warning to change that password everywhere you used it and turn on MFA.
HaveIBeenPwned (own email only). There is a free public website that lets you check whether an email address has appeared
in known breaches. It does not ask for your password — only the email address. The result tells you which breaches included
that address.
How to use it safely: type only your own email; remember that entering your email is your own choice; you may opt out and
just watch the demonstration instead. The service tells you your email was in a breach — it does not mean your account is now
broken into, and it does not reveal your current password.
Privacy reminder (read aloud before the activity): "You will check your own email only. Never check a friend's, a family
member's, or a customer's email. If you prefer not to, watch the projector. This is your choice."
Misconception to correct: "If my email shows up, my account is hacked." Not necessarily — it means the address appeared in
a breach. Treat it as a strong nudge to change passwords and enable MFA.
F.5 Multi-factor authentication (MFA) — the second lock
The idea. Multi-factor authentication (MFA) means logging in needs more than just a password. It is the single biggest
improvement most people can make to their account safety.
Plain-English definition. MFA asks for something you know (password) plus something you have (your phone or a code) or
something you are (fingerprint/face). Two different kinds of proof are far stronger than one.
Why it works. Even if a scammer steals your password, they usually still cannot log in, because they do not have your second
factor. MFA breaks the "stolen password = stolen account" chain.
Common second factors:
Type What it is Strength Notes
Authenticator app (TOTP) An app that generates a new 6-
digit code every 30 seconds
Strong Codes work even without network;
not tied to your phone number
SMS code A code sent by text message Weaker but
still useful
Can be intercepted or SIM-swapped;
better than nothing
Security key / passkey A physical USB key or device
biometric
Very strong Advanced; mention only
Email code A code sent to your email Weakest factor
type
Useful as a fallback
Authenticator app versus SMS — why app-based MFA is stronger. A text-message code travels over the mobile network and
can be intercepted or stolen through SIM-swap fraud, where a criminal convinces your network to move your number to their
SIM. An authenticator app on your own device generates codes locally and is not tied to your phone number, so it is not
vulnerable to SIM swap. Use app-based MFA whenever a service offers it.
Real-life comparison. MFA is like needing both a key and a PIN to enter a strongroom. Even if someone copies your key, they
still cannot get in without the PIN.
Misconception to correct: "MFA means I can use weak passwords." No — MFA is a second layer. Strong passwords and MFA
together are best. Also, do not approve an MFA prompt you did not start — if your phone suddenly asks "Approve sign-in?",
someone may have your password; press deny and change it.
F.6 Password managers — the honest way to be secure
The idea. A password manager is a secure app that generates strong, unique passwords and remembers them for you,
protected by one master password.
Plain-English definition. Instead of memorising many passwords, you memorise one strong master passphrase, and the
manager stores the rest in an encrypted vault.
Why it exists. The advice "use a different strong password for every account" is impossible to follow by memory. The manager
makes good security practical.
What it does:
Generates long, random, unique passwords.
Fills them in automatically on websites.
Stores them in an encrypted vault protected by your master password.
Syncs across your devices (in the paid/optional tiers; the free tier also syncs across devices).
Bitwarden. We use Bitwarden as a free, reputable example. It is one option among several; the lesson is the behaviour, not the
brand. You create a free account, choose a strong master passphrase, and it keeps the vault. The master passphrase is the one
thing you must remember well.
Real-life comparison. A password manager is like a locked filing cabinet with a single strong key. All your account keys are
inside, organised; you carry only the master key.
Important limitations and honest caveats:
The master passphrase must be strong and unique — it is the key to everything.
Enable MFA on the password manager itself.
If you lose the master passphrase and have no recovery, you can lose the vault. Keep recovery codes safe (F.7).
A password manager is not invincible but it is far safer than reusing one password. Reputable managers use strong
encryption.
Misconception to correct: "Writing any password down is always wrong." Writing passwords on paper anywhere others can
find them is risky, and typing them into an untrusted file or your notebook is also risky. But a reputable password manager
storing them in an encrypted vault is safer than reuse. The old advice was to never write anything down; the modern, honest
advice is: use a manager, and protect the master passphrase.
F.7 Account recovery — plan for the "I forgot" day
The idea. Account recovery is how you regain access if you forget a password or lose your phone. Attackers use it too, so it
must be protected.
Best practice:
Set a recovery email and phone you control and can access.
Save recovery codes (one-time backup codes services give you) somewhere safe and offline — not in the same place as
the account.
Choose security questions honestly. Do not use answers anyone can find on social media (your mother's maiden name,
your school, your pet). Better: treat them like passwords — a made-up but consistent answer stored in your password
manager.
Turn on MFA so a stolen recovery email alone is not enough to take over the account.
Revoke old sessions/devices from the account settings if you suspect anything is wrong.
Real-life comparison. Recovery is the spare key you leave with a trusted neighbour. If the wrong person finds it, they can walk
in — so you must protect the spare key too.
Say this to the class:
"Attackers do not only guess passwords. They attack the recovery path. Your recovery codes and recovery email are as
valuable as your password. Protect them."
F.8 Summary of the lecture
Passwords fail by guessing, weak patterns, reuse and breaches.
Strength comes from length and uniqueness; a long passphrase beats a short clever password.
Reuse is a domino effect — use a unique password for every important account.
A breach means a company leaked data; check your own email on HaveIBeenPwned as a warning, not a diagnosis.
MFA adds a second lock; an authenticator app is stronger than SMS.
A password manager (e.g., Bitwarden) generates and stores unique passwords behind one strong master passphrase.
Protect your account recovery path — recovery codes and recovery email are keys too.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
Goal: Show, on the projector, the whole safety upgrade in action: (1) improving a weak password, (2) checking an email on
HaveIBeenPwned, (3) enabling MFA, (4) using Bitwarden to generate and store a password. All on your own accounts, with
fictional examples where possible. Learners then do the same on their own accounts in Section H.
Setup: Chrome open. Bitwarden extension installed on the instructor machine. A TOTP authenticator app ready. A demo Gmail
account owned by the academy (not a learner's). Read the privacy reminder aloud before the breach check.
G.1 Demonstration 1 — Weak password to strong passphrase (4 minutes)
Say: "Watch how I turn a weak password into something a computer cannot guess — while keeping it easy to remember."
On screen, transform:
Weak: adaeze123
Step 1 (longer): adaeze-123-fashion — still has a name and number; not good enough.
Step 2 (random words, no personal info): Market-Goat-Purple-Sunday-72
Type it into a password-strength checker (or the Bitwarden generator preview) and show the strength bar jump. Ask the
class: "Why is the last one stronger even though it looks like nonsense?" Expected: because it is long and has no personal
information.
G.2 Demonstration 2 — Checking an email on HaveIBeenPwned (4 minutes)
Read the privacy reminder:
"I am using the academy's own demo email, not your personal one and not anyone else's. Later, you may check your own
email, or simply watch. You decide."
Steps on the projector:
1. Open the HaveIBeenPwned site.
2. Type the academy demo email (or, deliberately, a well-known example address so no real person is exposed).
3. Show the results page: which breaches the address appeared in.
4. Read the guidance: "The email was present in a breach. This means a site you used was compromised. Your first action is to
change that password on the affected site and anywhere you reused it, then enable MFA."
5. Point out clearly: "Notice it never asked for my password. A legitimate breach checker only needs the email address."
Questions to ask during the demo:
"Does finding my email here mean my account is hacked right now?" (No — it means my address appeared in a breach;
treat it as a warning to change passwords and enable MFA.)
"Whose email may you check?" (Your own only.)
G.3 Demonstration 3 — Turning on MFA (4 minutes)
On the projector, using the demo account:
1. Open Account settings → Security → Two-step verification / 2-Step Verification.
2. Choose Authenticator app (not SMS, if offered).
3. Show the QR code appearing. Do not show any real secret if the projector is public — for a demo account it is
acceptable, but say aloud: "In real life, never show this QR code to anyone."
4. Scan with the authenticator app (show on your phone or a screen capture), enter the 6-digit code, confirm.
5. Show the account now asking for the code at login.
6. Show the recovery codes screen and say: "These are backup keys. I would save these somewhere safe, offline, away from
the account." Store them in the password manager or print them.
Point out: "The scammer can have my password and still be locked out — because they do not have my phone's app."
G.4 Demonstration 4 — Bitwarden generates and stores a password (3 minutes)
On the projector:
1. Open Bitwarden (browser extension or web vault).
2. Create/show the demo account with a strong master passphrase.
3. Click Add item → Add a login.
4. Use Generate password to produce a long random password.
5. Save the item with the account name (e.g., "Demo shop account").
6. Show how Bitwarden fills the login automatically on the demo site.
7. Demonstrate enabling MFA on Bitwarden itself (briefly).
Say: "Now I only remember one strong master passphrase. Every other password is long, random, unique and safely stored. This
is the honest way to be secure."
Common errors to show and mention:
Weak master passphrase → the whole vault is only as strong as that one phrase.
Not saving recovery codes → risk of being locked out.
Approving an unexpected MFA prompt → always press deny.

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: With the instructor guiding step by step, each learner completes three safe tasks on their own machine/accounts: (1)
upgrade a weak password to a strong passphrase on paper and in a real (or practice) account, (2) check their own email on
HaveIBeenPwned (optional) and interpret the result, and (3) set up MFA on one own account, plus store a password in
Bitwarden.
Starting materials: Worksheet 2.1 (Password Upgrade) and Worksheet 2.2 (MFA Steps) per learner; Chrome; internet; own Gmail
account; a phone (optional, for the authenticator app).
Safety and privacy first — say aloud:
"You will work only on your own accounts. Never type another person's email or password into anything. Anything you
find on the breach checker is private — do not share it or shout it out."
Procedure (instructor calls out each numbered step; learners follow; instructor walks the room):
Part 1 — Build a strong passphrase (5 min)
1. On Worksheet 2.1, write one weak password you have used before. Do not write any real current password for a real
account anywhere.
2. List the red flags in it (name? year? short? reused? that is the analysis).
3. Now build a passphrase: choose 3–4 random, unrelated words plus a number or symbol. Example pattern: Word-Word-
Word-Number .
4. Pause and predict: "Could someone who knows me guess these words? Does it contain my name, birthday or phone
number?" If yes, change the words.
5. Write your new passphrase on the worksheet. This is a learning passphrase; keep the sheet private or destroy it after class
— never leave a list of passwords lying around.
Part 2 — Check your own email (4 min, optional/consent) 6. If you consent, open HaveIBeenPwned and type your own
email only. 7. Read your result. On Worksheet 2.1 write down: Was my email found? Yes/No. If yes, what will I do? (Usually:
change that password and enable MFA.) 8. If you do not consent, watch the projector and write "Watched demonstration."
Part 3 — Turn on MFA on one own account (6 min) 9. Open your own Gmail (or another own account you choose). 10. Go to
Security → 2-Step Verification. 11. Choose Authenticator app if available (phone), or SMS if that is all you have. 12. Follow
the on-screen QR/steps. If you do not have a phone, watch the instructor and write the steps on Worksheet 2.2. Do not proceed
if you cannot complete it now — you may finish at home, and that is fine. 13. Save your recovery codes somewhere safe.
Write on the worksheet where you saved them (not the codes themselves).
Part 4 — Store a password in Bitwarden (3 min) 14. Open Bitwarden. Create a free account with a strong master passphrase
(reuse your Part 1 pattern if you like — but a different phrase). 15. Add one login: account name + username + a generated
password. 16. Pause and predict: "What is the one password I must now remember well?" → the master passphrase.
Expected result: Each learner has a model passphrase on paper, an interpreted breach result (or "watched"), MFA enabled on
one own account (or the steps recorded), and one stored login in Bitwarden.
Points to pause on and predict:
After step 5: "Why is this passphrase strong?" → long, unrelated words, no personal info.
After step 7: "Does 'no result' mean I am totally safe?" → No; it means this service has no record; still use unique passwords
and MFA.
After step 12: "Why app over SMS?" → app codes are not tied to your phone number, so SIM swap cannot steal them.
Troubleshooting while walking the room:
Learner cannot create MFA because the account already has it → Good; help them verify it works, then choose a different
own account, or record the steps.
Learner has no phone → Use a desktop authenticator option if offered, or record the steps; never handle their account for
them.
Learner worries about typing their email → Reassure; on-site result; optional; they may watch.
Learner locks themselves out → This is why we save recovery codes. Walk them through the recovery flow calmly.
Completion checklist (learner ticks each):
I identified why a weak password is weak
I created a strong passphrase (long, unique, no personal info)
I checked my own email (or watched) and interpreted the result
I enabled MFA on one own account, or recorded the exact steps
I saved my recovery codes safely (I know where)
I stored at least one generated password in Bitwarden

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: You are the volunteer "security helper" for a small church in Port Harcourt. The church uses one shared Gmail account
for announcements, a WhatsApp account, and a laptop that many people touch. You must write a one-page Password &
Account Safety Plan for them.
Scenario: The church's shared Gmail account has the password church2020 . Several members know it. The pastor is worried.
You must advise, using only what you learned today.
Requirements:
1. Explain in 2–3 sentences why church2020 is unsafe (name + year + shared + likely reused).
2. Recommend a plan covering:
A stronger way to share the account safely (e.g., a strong unique passphrase stored in a password manager, not written
on a wall).
MFA on the account (app-based, not SMS, and why).
What to do about the laptop (who logs in, lock screen, do not save passwords in the browser on a shared PC).
Recovery: set a recovery email/phone and save recovery codes.
3. Keep it to one page, in plain language the pastor can act on.
4. Do not invent facts about real products or statistics.
Constraints:
No real passwords of any real account — use placeholders like [strong-passphrase] .
Do not recommend sharing passwords over WhatsApp or writing them publicly.
Must be honest about limitations (e.g., MFA still needs care against SMS interception).
Time allowance: 15 minutes.
Success criteria:
Correctly explains the weaknesses of church2020 .
Gives a practical, safe sharing method.
Recommends app-based MFA with a reason.
Includes recovery protection.
Readable by a non-expert; no real data.
Hints available if stuck:
Hint 1: Start with the four failure modes: guessing, weak patterns, reuse, breach.
Hint 2: For sharing, a single vault entry in a password manager is safer than a poster on the wall — and each trusted user
has their own manager access only if the manager supports it.
Hint 3: Recovery codes belong offline, away from the account.
Instructor answer key / model (do not show learners until after):
Password & Account Safety Plan — [Church Name]
Why church2020 is unsafe: It uses the word "church" plus a year — both easy for a computer to guess. It is shared by
many people, so it cannot be truly secret, and it may be reused on other accounts, meaning one breach could open
everything.
The plan:
1. Change to a strong unique passphrase, e.g. a set of random words the pastor chooses and no one can guess. Store it
in a free password manager, not on a wall or in a WhatsApp message.
2. Turn on MFA (authenticator app, not SMS). App codes are not tied to a phone number, so SIM-swap fraud cannot
steal them. Even if someone learns the passphrase, they cannot log in without the phone's code.
3. The laptop: set a lock screen and a short auto-lock time. On a shared PC, never let the browser "remember" the
password. Each user logs out after use.
4. Recovery: set a recovery email and phone you control, and save the recovery codes offline. Protect the recovery path as
carefully as the password.
Remember: Stop – Think – Verify.
Marking guidance (out of 10):
Correct critique of church2020 (2)
Safe sharing method (2)
App-based MFA with reason (2)
Laptop/shared-device advice (2)
Recovery protection (1)
Plain language, no real data, honest limits (1)

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. (A realistic, non-identifying account typical of small-business password problems. Names and details are illustrative.)
A small boutique in Port Harcourt ran its online sales through a Facebook page, an Instagram account and a Gmail address. To
make life easy, the two owners and one staff member all used the same password — the shop's name plus the year — across
all three accounts. One weekend, an old shopping site the staff member had used years ago was breached and its password list
leaked.
Relevant facts.
The leaked password matched the shop's account password exactly.
Attackers used it to log into the Gmail and then reset the Instagram and Facebook passwords.
Because MFA was not enabled, the stolen password was enough.
Decision point. After the theft, what should the owner do first — and what should have prevented it?
Possible approaches.
1. Pay the attacker who now demanded money to return the accounts.
2. Do nothing and create new accounts, losing followers and history.
3. Recover and secure: use the provider's account recovery, change passwords to unique strong ones, enable app-based
MFA, remove unknown sessions, and warn customers.
Recommended solution. Approach 3, plus the prevention that should have been in place from day one: unique passwords per
account, stored in a password manager, with app-based MFA. Paying an attacker (Approach 1) funds crime and rarely returns
the account; abandoning the accounts (Approach 2) loses the business's audience and trust.
Trade-offs.
Approach 1: fast hope, but no guarantee, and it rewards crime — never recommended.
Approach 2: safe from this attacker but costly to the business; recovery is almost always better.
Approach 3: takes effort in the moment, but restores control and prevents a repeat.
Professional connection. This is a textbook credential-stuffing incident caused by password reuse. Real support and security
staff see it constantly, and the fix is exactly what learners practised today: unique passwords, a manager, and MFA.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
Use this table as the session's live troubleshooting guide.
K.1 "My password has a symbol and a capital, so it is strong"
Symptoms: Learner keeps a short password with a capital and ! . Likely cause: Believing complexity beats length. How to
investigate: Compare a 7-character mixed-case password with a 16-character passphrase using a strength checker. Safe
corrective steps: Explain length is the main driver; help them build a longer passphrase. How to confirm resolved: Learner
explains why length matters and produces a long passphrase. How to prevent recurrence: Repeat "length wins" every time
passwords come up.
K.2 Learner still reuses one password across accounts
Symptoms: Learner says "it is easier to remember one." Likely cause: Convenience; not yet using a manager. How to
investigate: Ask how many accounts would fall if that one site were breached. Safe corrective steps: Show the password
manager storing unique passwords so memory is not the problem. How to confirm resolved: Learner stores at least two
unique passwords in the manager. How to prevent recurrence: Assign the manager setup as homework.
K.3 MFA prompt arrives unexpectedly
Symptoms: Learner's phone asks "Approve sign-in?" when they did not try to log in. Likely cause: Someone has the password
and is trying to log in — an MFA "fatigue" attack. How to investigate: Do not approve. Ask: "Did you start this login?" Safe
corrective steps: Deny the request, immediately change the password, review active sessions/devices, and keep MFA on. How
to confirm resolved: Password changed; unknown sessions removed; no more prompts. How to prevent recurrence: Never
approve an unexpected prompt; use app-based MFA and a unique password.
K.4 Locked out after enabling MFA (lost or changed phone)
Symptoms: Learner cannot log in because the authenticator is on a device they no longer have. Likely cause: Recovery codes
were not saved. How to investigate: Look for the recovery-codes screen or account recovery flow. Safe corrective steps: Use
saved recovery codes; if none, follow the provider's account recovery; then re-enrol MFA and save the codes this time. How to
confirm resolved: Learner logs in and has new recovery codes stored safely. How to prevent recurrence: Always save
recovery codes offline at setup.
K.5 Fear of using a password manager
Symptoms: Learner distrusts "putting all my passwords in one place." Likely cause: Reasonable worry; lack of understanding of
encryption. How to investigate: Compare the alternative (reuse or a plaintext note). Safe corrective steps: Explain a reputable
manager encrypts the vault; the master passphrase plus MFA protects it. This is safer than reuse. How to confirm resolved:
Learner sets up the manager with a strong master passphrase and MFA. How to prevent recurrence: Reinforce honest trade-
offs — a manager is strong, not magic.
Distinguish likely vs confirmed: A learner's "weak password" is a likely weakness; it becomes confirmed only when checked
(e.g., it appears in a breach list, or the strength checker shows it is weak). Teach learners to verify before concluding.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "My Account Safety Audit"
Purpose: Turn today's lesson into real change across the learner's own accounts, safely and honestly.
Realistic scenario: You are auditing your own digital life the way a professional would — improving the weakest points first.
Detailed instructions:
1. Choose three of your own accounts (e.g., Gmail, a social media account, a shopping account). Do not include your bank's
internet-banking password in this assignment.
2. For each, do a private review (do not write the actual passwords):
Was the password short, personal, or reused? (Yes/No)
Did you change it to a unique strong passphrase? (Yes/No)
Is MFA now on? (Yes/No, or "in progress")
Do you have recovery set (email/phone and codes saved)? (Yes/No)
3. Install or open a password manager and store at least two generated passwords.
4. Write a short reflection (4–6 sentences): What was your weakest habit? What did you change? What will you still do?
5. Never write actual passwords anywhere in this assignment. Use placeholders and Yes/No answers.
Required deliverables:
A completed audit table for three accounts (Yes/No format) — no real passwords.
Evidence that a manager is set up (a screenshot of an empty/new vault is fine; do not screenshot real passwords).
A reflection paragraph.
Submission format: Workbook or typed sheet, submitted at the start of Session 3.
Deadline: Before Session 3.
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
Three accounts reviewed 3 Clear, honest self-review
Weakness analysis 4 Correctly identifies weak/reused/short passwords
Corrective action 4 Real upgrades; MFA considered with reason
Password manager used 4 At least two generated passwords stored
Recovery addressed 2 Recovery email/phone/codes considered
Reflection quality 2 Thoughtful, honest, in own words
Safety and privacy 1 No real passwords or personal data exposed
Common mistakes to avoid: writing real passwords; including banking details; claiming MFA when it is not set; reusing a "new"
password that is just the old one plus a symbol.
Instructor reference solution (fictional/model reflection):
"My weakest habit was using my name and birth year on almost everything — I had three accounts with nearly the same
password. I changed all three to different long passphrases and stored them in a password manager. I turned on app-
based MFA for my Gmail, which was the most important one. I saved my recovery codes in a safe offline place. What I will
still do: enable MFA on my other two accounts and stop using my name in any password."

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key.)
Q1. Short answer. Why is a long passphrase usually stronger than a short password with symbols?
Q2. Multiple choice. Which is the safest way to handle passwords for many accounts? a) Use one strong password everywhere
b) Write them all in a clearly labelled notebook you carry c) Use a password manager with a strong master passphrase and MFA
d) Add a 1 to the end of the same password each time
Q3. Explain in your own words. What is a data breach, and what should you do if your email appears in one?
Q4. Practical identification. Your phone shows "Approve sign-in?" for an account you did not try to log into. What does this
suggest, and what should you do?
Q5. Short answer. Give one reason an authenticator app is stronger than an SMS code.
Q6. Scenario. A friend says, "I use Blessing2015 for everything because it is easy to remember and has a year in it." Give two
specific reasons this is unsafe and one concrete improvement.
INSTRUCTOR ANSWER KEY (Q1–Q6)
A1. Because strength grows with the number of possible combinations, and length adds far more combinations than a couple
of symbols do. A long passphrase is both hard for a computer to guess and easy for a human to remember. (Accept any answer
emphasising length and uniqueness.)
A2. (c).
A3. A data breach is when a company's stored data — including user emails and passwords — is stolen or leaked. If your email
appears, change that password on the affected site and anywhere you reused it, and enable MFA. It does not necessarily mean
you are hacked now.
A4. It suggests someone may already have your password and is trying to log in (an MFA push/fatigue attack). Do not approve.
Deny the request, immediately change your password, review active sessions/devices, and keep MFA on.
A5. An authenticator app generates codes on your own device and is not tied to your phone number, so it is not vulnerable to
SIM-swap fraud or SMS interception. (Accept any one correct reason.)
A6. Reasons: (1) It has a name and a year — both easy for a computer to guess; (2) using it for everything means one breach
exposes all accounts (reuse). Improvement: create a long unique passphrase per account and store them in a password manager
with MFA enabled. (Accept any two reasons plus a concrete improvement.)

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today you learned why passwords fail — guessing, weak patterns, reuse and breaches — and that
length and uniqueness are what make a password strong. You built a stronger passphrase, learned how password reuse creates
a domino effect, and checked your own email on a breach-checking service. You learned what multi-factor authentication is
and why an authenticator app beats SMS. You set up (or recorded the steps for) MFA on your own account, stored generated
passwords in a free password manager (Bitwarden), and learned to protect your account recovery path.
Five important takeaways:
1. Passwords fail by guessing, weak patterns, reuse and breaches.
2. Length wins — a long, unique passphrase beats a short clever password.
3. Never reuse an important password; a breach on one site must not open the others.
4. MFA is the biggest single upgrade; prefer app-based MFA over SMS.
5. A password manager plus a strong master passphrase makes good security practical — and protect your recovery codes.
Questions to help you recognise what you can now do:
Can I build a strong passphrase without using my name or birthday?
Can I explain why reusing a password is dangerous?
Can I check my own email on a breach checker and interpret the result?
Can I enable MFA on my own account, and do I know where my recovery codes are?
Connection to the next session: Your accounts are now much stronger. But most attacks do not happen at your keyboard —
they arrive as a link. Next session we learn to look at a web address and tell within seconds whether it is safe to click, what the
padlock really means, and how to download software without letting in malware.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
Learner builds a passphrase that is long and genuinely free of personal information, and can justify it.
Learner can explain reuse as a "domino/one-key" risk.
Learner interprets a breach result correctly (warning, not a diagnosis) and knows the next action.
Learner enables MFA and knows why app beats SMS.
Learner stores generated passwords in the manager and knows the master passphrase is the key.
Learner handles recovery codes sensibly.
Common misconceptions to watch for and correct:
"Symbols alone make it strong." → Length and uniqueness matter most.
"Adding 1 at the end makes it a new password." → Not unique meaningfully; use a manager.
"If my email shows in a breach, I am hacked." → It is a warning; change and enable MFA.
"MFA means I can keep a weak password." → MFA is a second layer, not a replacement.
"Password managers are unsafe." → Reputable managers encrypt the vault; they are safer than reuse.
Suggested remedial exercises for learners who struggle:
1. Length drill: give five passwords and ask the learner to rank them by likely strength, then explain each.
2. Reuse map: have the learner list which accounts share a password and mark the "dominoes."
3. MFA walkthrough: step-by-step, on a non-critical account, with the learner doing each click themselves.
Differentiation:
Level 1 (supported): provide a fill-in-the-blank passphrase builder (choose from a word list; add a number) and a printed
MFA click-path.
Level 2 (standard): the exercise as written.
Level 3 (challenge): ask the learner to design a family password policy for a household of five devices — shared vs
personal accounts, MFA everywhere, recovery, and how to onboard a new member safely.
Timing guidance: The MFA setup can overrun for learners without phones or with slow internet. Protect the guided practical
Part 1 (passphrase) and Part 3 (MFA steps); the breach check and Bitwarden can be finished at home. If the room is fast, extend
the case study and let learners present their plans.
END OF SESSION 2
Next: Session 3 — Safe Browsing, Downloads and Recognising Scams.
