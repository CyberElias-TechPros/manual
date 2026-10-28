---
{
  "id": "cybersecurity/session-05",
  "course": "cybersecurity",
  "number": 5,
  "of": 9,
  "title": "Device Hardening: Updates, Windows Defender and Firewall",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/cybersecurity/session-05.png",
    "page": 64,
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
  "prerequisite_knowledge": "Session 1 (threats and Stop–Think–Verify), Session 2 (strong passwords + MFA), Session 3 (safe browsing/downloads), Session 4 (phishing and social engineering). A learner must be able to use the Windows Start menu, open Settings, and read a screen.",
  "connection_to_previous": "Last session we removed the \"human door\" for attackers. This session we lock the machine: we make sure Windows is updated, antivirus protection is on, the firewall is active, and that apps cannot install or run freely. If a bad file ever gets in, a hardened device limits the damage."
}
---
# Device Hardening: Updates, Windows Defender and Firewall

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 2 — Module 2: Protecting People and Devices (theme: Harden)

**Recommended duration:** 105 minutes

**Difficulty:** Beginner (no prior security knowledge assumed)

**Prerequisite knowledge:** Session 1 (threats and Stop–Think–Verify), Session 2 (strong passwords + MFA), Session 3 (safe browsing/downloads), Session 4 (phishing and social engineering). A learner must be able to use the Windows Start menu, open Settings, and read a screen.

**Connection to previous work:** Last session we removed the "human door" for attackers. This session we lock the machine: we make sure Windows is updated, antivirus protection is on, the firewall is active, and that apps cannot install or run freely. If a bad file ever gets in, a hardened device limits the damage.

**Preparation before class:** Academy PCs on Windows 10 or 11. Instructor machine logged in as a standard user or with admin rights clearly understood. Learners work on their own or academy practice machines — never a machine they do not have permission to change. Instructor confirms Defender and Firewall features exist on the lab devices before the session. Safety / permission note (read aloud) "Changing updates, firewall settings or installing software can affect a shared machine. We only do these tasks on our own device or an academy practice machine, and only with the instructor's permission. We never change settings on someone else's computer. These are defensive actions — we are protecting our own device, not attacking anyone."

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Explain in simple terms what an operating-system update is and why leaving a device un-updated is dangerous (the
"locked-door" idea).
2. Check Windows Update status on a Windows 10/11 device and confirm whether automatic updates are on.
3. Verify that Windows Defender real-time protection is on and run a Quick scan, then read the result correctly.
4. Confirm the Windows Firewall is on for the current network profile and explain what the firewall does in plain words.
5. Explain the difference between a standard user and an administrator account, and describe what a UAC prompt is
asking.
6. Decide whether a piece of software comes from a safe source, and apply a rule for downloading and installing apps.
7. Manage startup programs so fewer unnecessary applications run automatically at boot.
8. Explain "defence in depth" — why antivirus alone is not enough and why several layers must work together.
9. Produce a short "device hardening checklist" about a device they are authorised to use.

## C. Required Materials
<!-- kind:materials -->
Hardware
One Windows 10 or Windows 11 computer per learner (academy desktops, or the learner's own laptop with permission).
Instructor computer connected to a projector or large screen.
Software
Windows 10 or Windows 11 with the built-in Windows Security (Windows Defender) and Windows Firewall. These are
built into Windows — no purchase needed.
A web browser to look at (not download from) the official Windows support pages if internet is available. Optional.
Accounts
The learner works in their own Windows account. Some tasks (like changing some update settings) may require an
administrator login; if the academy machine is administered centrally, the instructor performs the admin steps on the
projector and learners observe and record. Never use an admin account the learner is not authorised to use.
Worksheets
Worksheet 5.1 — "Device Hardening Checklist" (learner fills in on their authorised device).
Worksheet 5.2 — "Defence in Depth Layers" diagram to label (learner workbook, Part 3).
Tools
Windows Security (Defender), Windows Update, Windows Firewall, Task Manager / Startup apps settings. All built into
Windows.
Internet
Ideally available so updates can actually check and download. If no internet, learners still complete the checks and record
the status; the instructor explains that the checks are the skill, and updates apply later when connected.
Important accuracy note for the instructor: Menu names and wording in Windows change between versions and updates. In
Windows 10, security tools are collected under Windows Security (also called Windows Defender Security Center in older
builds). In Windows 11 the same tool exists and is usually found via Settings → Privacy & security → Windows Security, or by
searching "Windows Security". Always tell learners: "The wording may differ slightly by version — look for the meaning, not
the exact words." Do not claim a specific screenshot; walk the actual menus on the real machine.
Alternative for learners who lack a facility
If a learner has no Windows machine, they pair with a desktop user, follow along, and complete the checklist by observing
and reading aloud. A phone user cannot complete the Windows tasks but can still learn the concepts and pass the
knowledge check.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector, show a familiar picture — a house with a front door. Then show a second picture: the same
house with a broken window and a note "we never fixed it".
What the instructor says:
"Look at this house. Strong door, strong lock — we did that in Sessions 2 and 4. But look again: the window has been
broken for months and nobody repaired it. Is the house safe? No. A thief does not fight the strong door; he climbs through
the window you forgot.
A computer is the same. You can have the best password and never click a phishing link — but if you never install your
Windows updates, you are leaving a broken window open. Attackers know exactly which windows are broken. Today we fix
the window. We will update Windows, make sure your antivirus and firewall — your security guards — are awake, and
control what is allowed to run on your machine."
Expected learner response: Learners may say "I always click 'Later' on updates", or "I have never updated my phone/laptop".
Some will ask if updates really matter. Accept all; note honestly that updates can be inconvenient (they restart the machine) but
the protection is worth it.
Then demonstrate the hook: On the projector, open Windows Update and show the current status. If an update is pending,
point at it.
"See this? Windows is telling us a window needs repair. Notice how it says 'Restart to install'. Most people keep pressing
Later. Today you will learn why 'Later' is exactly what the attacker hopes you will say."
Why this opener works: It connects the abstract idea of updates to a concrete, visual danger (a broken window) that every
learner understands, and it frames the whole session as fixing something broken rather than learning settings for their own sake.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Run as an oral round-robin. Put the questions on the projector.
Question 1: "From Session 3, why is it safer to download software from the official website or an official app store rather than
from a random link?"
Expected answer: Random links may deliver malware disguised as software; official sources are far more likely to give you
the real, unmodified program.
Common gap: learners think "free cracked" versions are just cheaper, not more dangerous. Re-state: cracked/pirated apps
are a very common way malware gets in.
Question 2: "From Session 4, name two of the red flags of a phishing email."
Expected answer: e.g., look-alike domain, urgency, generic greeting, mismatched link, request for OTP.
Common gap: learners remember "scam" but not specifically why. Prompt them to name the actual clue.
Question 3: "What is MFA, and why does it matter if a password is stolen?"
Expected answer: a second proof of identity; even if the password leaks, the attacker still cannot log in without the second
factor.
Common gap: confusion between password and second factor; re-clarify.
Bridge to today (say this):
"We have protected the accounts and trained the person. But the device itself — the actual laptop — can still be
attacked. Malware does not care how strong your password is. So today we harden the machine with four layers: keep it
updated, keep the antivirus awake, keep the firewall on, and keep control of what runs. This is called defence in depth —
many locks, not one."
If more than a third of the class cannot answer Question 1, spend 3 extra minutes re-teaching safe download sources before
continuing.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 What device hardening means
Plain-English definition. Device hardening means changing the settings and habits on your computer so that it is harder for an
attacker or a harmful program to get in, spread, or do damage — without making the device unpleasant to use.
Why the word "harden". Think of a snail's shell. The snail is soft, but the shell is hard, so a small knock does not hurt it.
Hardening a device is building that shell around your data.
Why it exists. Attackers look for the easiest way in. If your Windows is fully updated, your antivirus is on, your firewall is active,
and random apps cannot install, the attacker moves to an easier target. You do not need to be impossible to attack; you need to
be harder than the alternative. This is called reducing your "attack surface" — fewer open doors means fewer ways in.
The four layers we harden today (defence in depth):
1. Updates — repair the broken windows (fix known holes).
2. Antivirus / Defender — a guard dog inside the house.
3. Firewall — a gate keeper on the boundary.
4. App control and user accounts — decide who is allowed to bring things inside.
Realistic Nigerian scenario. A cyber-café in Port Harcourt keeps its machines updated and locked down. A customer plugs in
a flash drive with an infected file. The antivirus catches it, the account is a standard user so nothing installs silently, and the
café stays running. The shop down the road with no updates and admin accounts for everyone loses all its machines in one
afternoon.
Limitation / misconception. "My antivirus will protect me from everything." No — antivirus is one layer. New and clever
malware can slip past antivirus, which is exactly why updates, the firewall and safe habits also matter.
F.2 Windows Update — repairing the broken windows
Plain-English definition. An operating-system update is a package from Microsoft that fixes problems and security holes in
Windows, and sometimes adds features.
Why updates matter — first principles. All software has mistakes in it (called bugs). Some bugs can be used by attackers to
break in; these are called vulnerabilities. When Microsoft finds a security vulnerability, it writes a patch (a fix) and sends it in an
update. If you do not install the update, your machine keeps the known hole open — a broken window that the whole world of
attackers can see and use.
The analogy. A vaccine for your computer. One person catching a disease is bad; a whole community protected is good.
Updates immunise your device against known attacks, and installing them protects others too, because an infected machine
can spread to the network.
Why automatic updates matter. Most people forget, or keep pressing "Later". Automatic updates mean the protection arrives
without you remembering. It is like a guard who does his rounds whether or not you are watching.
How to check Windows Update (Windows 10 and 11):
Open Settings (press Windows key + I ).
Windows 11: Windows Update appears directly on the left menu; or Settings → Windows Update.
Windows 10: Settings → Update & Security → Windows Update.
Look for:
"You're up to date", or pending updates and a Check for updates button.
Restart required / Restart now — this means a fix is waiting and needs a restart to finish.
Learner action: click Check for updates, then restart if asked (with permission, and warn about saving work first).
Worked example. A learner sees "Updates available" and a Restart button. They save all files, click Restart, and the machine
applies the patch. On returning, status reads "You're up to date". That is one window fixed.
Misconceptions.
"Updates only add features / change my screen." Many updates are security updates that repair holes — the most
important kind.
"I can update once a year." Some attacks work within days of a vulnerability being known, so regular, automatic updates are
safest.
"A restart is not needed, I will leave it." Often the fix does not take effect until you restart.
Limitation. Updates fix known problems. They cannot fix a brand-new "zero-day" attack — that is why the other layers matter
too.
F.3 Windows Defender — the guard dog (antivirus and real-time protection)
Plain-English definition. Microsoft Defender Antivirus (part of Windows Security) is the built-in antivirus in Windows. It
looks for harmful software (malware) and stops it.
Why it exists. Microsoft builds antivirus into Windows so that every machine has at least basic protection without buying
anything. On a modern Windows 10/11 machine, Defender is usually on by default and is a genuinely capable antivirus.
What it does:
Real-time protection — watches files as they open, download and run, and blocks suspicious activity immediately (the
guard dog that stays awake).
Scans — checks the whole device or specific areas for malware (Quick scan, Full scan, Custom scan).
Definitions / updates — frequent updates that teach Defender about new malware (the guard dog learning new smells).
Firewall and other protections appear in the same Windows Security app.
The analogy. Defender is a security guard inside your shop. Real-time protection is the guard standing awake at the door
checking every visitor. If you switch real-time protection off, the guard is asleep — the door is open.
How to check Defender and run a Quick scan (Windows 10 and 11):
Open the Start menu and search Windows Security (in older Windows this may be called Windows Defender Security
Center).
Open it. On the left/centre you see areas such as Virus & threat protection, Firewall & network protection, App &
browser control, etc.
Click Virus & threat protection:
Look for "No current threats" and, under Virus & threat protection settings, check that Real-time protection is On.
Click Quick scan and wait for it to finish.
Read the result: usually "No current threats" or a list of anything found, with Actions if needed.
If you see a red or yellow warning, that is a sign to fix something — read the text carefully.
Worked example. A learner opens Virus & threat protection, sees green ticks, confirms real-time protection is On, runs a Quick
scan, and reads "No current threats found". Defender is awake.
Misconceptions.
"I have to buy antivirus; Windows has none." Modern Windows has Defender built in and on by default.
"I can turn off real-time protection to make my PC faster." That leaves the door open; only do this if a trusted technician
asks, and re-enable afterwards.
"If Defender flags software I trust, it is broken." Sometimes Defender is right to be cautious; check the file's source before
overriding.
Limitation. Defender cannot catch everything, and no antivirus can. It works with updates, the firewall and safe habits —
defence in depth.
F.4 Windows Firewall — the gate keeper
Plain-English definition. A firewall is a filter that watches the network traffic going in and out of your computer and blocks
connections that are not allowed.
Why it exists. Computers are connected to networks (home Wi-Fi, café Wi-Fi, the internet). Without a gate keeper, a stranger
on the network could try to connect to your machine directly. The firewall decides who may come in and who may go out.
What it does:
Blocks unsolicited incoming connections by default (someone outside cannot just barge in).
Allows outbound connections from your own trusted apps.
Lets you allow or block a specific program when needed.
The analogy. The firewall is the gate keeper at the compound gate. He has a list. Unknown visitors at the gate are turned back;
recognised deliveries are allowed through. (Updates are the broken window, Defender is the guard inside, and the firewall is the
gate keeper.)
Network profiles. Windows has different firewall profiles for Domain, Private and Public networks:
Private — for your home/trusted network.
Public — for café, airport, hotel Wi-Fi (stricter, hides your machine more).
Domain — managed by an office domain.
How to check the Firewall (Windows 10 and 11):
Open Windows Security → Firewall & network protection.
You will see the active network and whether the firewall is On (green) or off.
Confirm the firewall is On for the network you are currently using.
If it is off and you are allowed to change it, switch it On. On a managed machine, the instructor handles admin steps.
Misconceptions.
"The firewall slows my internet." A properly configured firewall has almost no visible effect for normal use.
"The firewall is the same as antivirus." No — the firewall filters network connections; antivirus looks for malicious files. They
do different jobs.
"I should allow everything so nothing is blocked." That defeats the gate keeper; only allow what you recognise and need.
Limitation. A firewall does not stop you from yourself clicking a bad link and running a bad program — which is why Defender
and safe habits matter.
F.5 Controlling what apps can run and install — standard vs admin accounts and UAC
Plain-English definition. On Windows, a standard user account can use the computer but cannot make big system changes; an
administrator account can install software, change settings and manage other accounts.
Why this matters. Most malware needs administrator permission to install itself deeply into the system. If you use a standard
account day to day, the malware cannot install silently — it must ask for permission through a prompt, and you can say No.
This is a big, cheap, powerful protection.
The analogy. A standard user is a guest in a hotel — comfortable, but cannot change the building's wiring. An administrator
holds the master key to the plant room. You only need the master key when genuine building work is done.
What is UAC? User Account Control (UAC) is the prompt that appears when something wants administrator rights: a box
saying "Do you want to allow this app to make changes to your device?" with Yes/No.
How to read a UAC prompt — teach the three questions:
1. What is asking? Read the app name — is it something you chose to run, or something unexpected?
2. Why is it asking now? Did you just open a program, or did a prompt appear out of nowhere (a red flag)?
3. Who published it? A genuine installer shows a trusted publisher name; "Unknown publisher" deserves caution.
Rule: If a UAC prompt appears when you did not start anything, do not click Yes. In Session 4 we saw that malware often arrives
through a fake update or a "click here" link; a sudden UAC prompt can be the payload trying to install.
How to check your account type (Windows 10/11):
Settings → Accounts → Your info (the wording varies). It shows Administrator or Standard user.
For advice on daily use: use a standard account for everyday work, and keep an administrator account for when real
changes are needed.
Misconceptions.
"Admin is always better." More power means more damage if something goes wrong. Day to day, standard is safer.
"UAC is annoying, I always turn it off." UAC is a seat belt — do not disable it to avoid the click.
"Clicking Yes is fine, it is just Windows." Read the prompt; a stranger asking for admin should alarm you.
Limitation. On a shared or single-user home PC, many people use an admin account for convenience. Even then, reading the
UAC prompt before clicking Yes gives most of the benefit.
F.6 Safe software sources and managing startup programs
Safe software sources — the rule. Only get software from:
1. The official website of the company that makes it (typed by you, not clicked from a random link), or
2. The official app store built into Windows (Microsoft Store), or
3. A trusted, official package source your organisation has approved.
Avoid: links from emails/WhatsApp, "download" ads, free cracked/pirated software, and "keygen" tools. Cracked software is a
classic way to get malware, and pirated apps often come bundled with harmful extras.
The analogy. Candies handed out by a random stranger on the street versus candies bought from a real supermarket. Same
wrapper, very different trust.
Managing startup programs. Startup programs are apps that launch automatically when Windows starts. Too many start-up
apps make the machine slow and, more importantly, keep unnecessary programs running (more code running = more possible
weaknesses).
How to check (Windows 10 and 11):
Settings → Apps → Startup (Windows 11) or Settings → Apps → Startup (Windows 10 has this too); or
Task Manager ( Ctrl + Shift + Esc ) → Startup apps tab.
You see a list with an enabled/disabled status and a Startup impact rating (Low/Medium/High).
For programs you do not need at boot, set them to Disabled (you can re-enable any time).
Caution: do not disable security tools, drivers, or things you do not recognise. When in doubt, leave it and ask.
Misconceptions.
"More startup apps means my PC is more ready." It usually just means slower and busier.
"Disabling a startup app deletes it." No — it only stops it auto-starting; the app is still installed.
Limitation. Managing startup apps is a performance and tidiness habit more than a firewall; it reduces risk a little but does not
replace the other layers.
F.7 Why antivirus alone is not enough — defence in depth
Plain-English definition. Defence in depth means using several layers of protection together, so that if one fails, the others
still protect you.
The idea with a Nigerian picture. Think of protecting a market stall at night:
A strong door lock (password + MFA),
A gate keeper at the compound (firewall),
A guard dog inside (antivirus),
Repairing the fence (updates),
Telling the family the safe routine (safe habits).
Any one alone can fail. Together, the stall is very hard to rob.
Why needed. Every layer has limits we noted:
Updates cannot fix brand-new attacks.
Antivirus cannot catch everything.
The firewall cannot stop you from running a bad program yourself.
Even a careful person can be tricked once.
Stacking them means an attacker must beat all of them, not just one.
Misconception. "I have antivirus, so I am safe." If that were true, there would be no malware infections. Layers are why
professionals use many controls together.
F.8 Summary of the session
Hardening = making your device harder to break into, without making it painful to use.
Updates fix known holes (broken windows) — turn on automatic updates and restart when asked.
Windows Defender is the built-in antivirus; confirm real-time protection is On and run a Quick scan.
Windows Firewall is the gate keeper; confirm it is On for your network.
Use a standard account for daily work; read every UAC prompt before clicking Yes.
Get software only from official sources; avoid cracked apps.
Review startup programs; disable what you do not need.
Defence in depth — many layers — because antivirus alone is not enough.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 What the instructor prepares
The instructor machine (or an academy practice machine) logged in.
Windows Security, Windows Update, Firewall, and Task Manager ready to open.
Worksheet 5.2 (defence-in-depth diagram) printed for learners.
Confirmation that the learner tasks require only standard-user actions; admin steps are done by the instructor on the
projector.
G.2 Demonstration 1 — Windows Update (4 minutes)
Say: "Watch me repair the broken window. Do not do anything yet — just watch and note the steps."
1. Press Windows key + I to open Settings.
2. Go to Windows Update (Windows 11: directly on the left; Windows 10: Update & Security → Windows Update).
3. Show the status line. If updates are pending, point at Check for updates and press it (with internet).
4. If a Restart required appears, explain: "The fix is downloaded but needs a restart to take effect." Do not restart without
warning; announce: "Save work, then restart."
5. Show the Update history and the Advanced options and point at the automatic-update setting.
Expected result: Status shows "You're up to date" or a list of pending updates and a restart button. What to watch: Do not let
learners press Restart mid-task; warn about unsaved work. Questions: "Why does a fix need a restart?" → the core system files
are in use while Windows runs. "Why automatic?" → so you never forget.
G.3 Demonstration 2 — Defender checks and Quick scan (5 minutes)
Say: "Now let us wake up the guard dog and see if it is awake."
1. Open Start, search Windows Security, open it.
2. Click Virus & threat protection.
3. Show "No current threats" (or whatever the real status is).
4. Under Virus & threat protection settings, click to show Real-time protection: On. Explain: "This is the guard standing
awake at the door."
5. Click Quick scan. While it runs, explain what it is checking (common locations where malware hides).
6. When finished, show the result: "No current threats found" (or the found items and their Actions).
Expected result: A completed Quick scan with a clear result line. What to watch: If a threat appears, do not panic — show
how to read the item name and the Action (Quarantine/Remove) and note that the instructor handles the action on lab
machines. Questions: "What is the difference between real-time protection and a scan?" → one watches continuously, the
other checks on demand. "Does Defender replace the firewall?" → no, different jobs.
G.4 Demonstration 3 — Firewall and UAC (4 minutes)
Say: "Now the gate keeper, and a look at the seat belt."
1. In Windows Security, click Firewall & network protection.
2. Show whether the firewall is On for the current network, and show the three profiles (Domain/Private/Public).
3. Explain the current profile: "If I am on café Wi-Fi, Windows treats it as Public and is stricter."
4. UAC: open an app or setting that triggers a UAC prompt (e.g., opening a system tool). When the prompt appears, do not
click Yes immediately. Walk the three questions: What is asking? Why now? Who published it? Then choose the correct
answer (usually Yes for a tool you deliberately opened).
Expected result: The learner sees the firewall status and a real UAC prompt. What to watch: Do not actually change firewall
settings on a managed machine unless authorised; demonstrate reading, not breaking. Questions: "What does the firewall
stop?" → unsolicited incoming connections. "What would a sudden UAC prompt mean?" → something unexpected is trying to
install — a red flag.
G.5 Demonstration 4 — Startup apps (2 minutes)
1. Open Task Manager ( Ctrl + Shift + Esc ) → Startup apps (or Settings → Apps → Startup).
2. Show the Startup impact column.
3. Point at one low-impact, non-security app and show where the Disable option is (but only disable if this is a demonstration
machine and it is safe).
4. Warn: "Never disable something you do not recognise — it could be your security or a driver."
Expected result: Learner sees how to review and disable a startup app safely. Questions: "Does disabling delete the program?"
→ no, it only stops auto-start.

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: On the learner's own or authorised practice Windows machine, check update status, confirm Defender real-time
protection is on, run a Quick scan, and verify the firewall is on — with the instructor guiding step by step.
Starting materials: One authorised Windows 10/11 machine per learner or pair. Worksheet 5.1. The instructor manages any
admin steps.
Permission and safety reminder (say before starting): "Only work on your own machine or an academy practice
machine. Do not change settings on a shared machine without permission. We are reading status and making our own
device safer — nothing more."
Procedure (instructor calls each step; learners follow; instructor walks the room):
1. Check Windows Update. Press Windows key + I → Windows Update. Read the status. Click Check for updates if internet
is available. On Worksheet 5.1, write the status: "Up to date" or "X updates pending".
2. Decide about restarting. If it says Restart required, note it. Save all your work first. Restart only with the instructor's go-
ahead.
3. Pause and predict: "If there is a pending security update and I keep pressing Later, what is happening to my machine?"
(Answer: it keeps the known hole open.)
4. Open Defender. Start → search Windows Security → open it.
5. Confirm real-time protection. Go to Virus & threat protection → check Real-time protection: On. Record it on the
worksheet.
6. Run a Quick scan. Click Quick scan; wait for it to finish; record the result ("No current threats" or the items found).
7. Pause and predict: "What is the difference between the scan we just ran and the real-time protection that is always on?"
(Answer: on-demand vs continuous.)
8. Check the Firewall. In Windows Security, open Firewall & network protection; note the current network profile and
whether the firewall is On. Record it.
9. Check your account type. Settings → Accounts → Your info (wording may vary); note whether your daily account is
Administrator or Standard user.
10. Review startup apps. Ctrl + Shift + Esc → Startup apps; note any high-impact apps you could safely disable later (do
not disable anything you do not recognise).
Expected result: Worksheet 5.1 filled in with: update status, restart-needed (yes/no), Defender real-time protection On, Quick
scan result, firewall On, account type, and one startup observation.
Points to pause and predict:
After Step 1: "Why do we not just ignore updates?" → known holes stay open.
After Step 6: "If the scan finds nothing, does that mean we are 100% safe?" → no; defence in depth and safe habits still
matter.
Troubleshooting while walking the room:
"Windows Security" not found → it may be called Windows Defender Security Center on older builds; search "Defender"
too.
Some settings greyed out → a managed/admin policy controls it; that is normal on academy machines — record what
you see.
Quick scan takes long → let it run; if time is short, note it is running and continue.
No internet → updates cannot check; record "unable to check — offline" and note the skill is the same once online.
Completion checklist (learner ticks each):
Windows Update status checked and recorded
Restart-needed noted (and work saved)
Defender opened
Real-time protection confirmed On
Quick scan run and result recorded
Firewall confirmed On
Account type identified
One startup program reviewed

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Apply the hardening checklist to the fictional small business scenario below, producing a prioritised hardening plan and
a filled checklist you would give the owner — without touching any real system.
Scenario: Ada's Fashion & Fabrics is a small shop in Port Harcourt with one shop computer running Windows 11. The owner,
Ada, uses it for:
checking the business email (supplier invoices),
browsing and online banking,
keeping a simple customer list in a spreadsheet,
the POS software.
Ada tells you: "Sometimes it's slow. I keep clicking 'Later' when the update box comes. I don't know if any security is on. My
nephew installed some free download accelerator a while ago. Everyone uses the same account, and it's an admin account."
Given facts:
Windows 11, single shared computer.
Updates repeatedly postponed.
Unknown antivirus/Defender status.
Some free software installed from a random link.
One shared administrator account.
Your tasks (produce on paper or a document):
1. List the hardening problems you can identify from Ada's description (at least five).
2. For each, write what to check and what to fix, in plain words Ada can understand.
3. Give each fix a priority (High / Medium / Low) and one sentence saying why.
4. Fill in a hardening checklist with checkboxes that Ada could follow on the computer.
5. Add a short "safe habits" note (2–3 lines) so the fixes are not undone by behaviour.
Time allowance: 15 minutes.
Success criteria:
At least five correctly identified problems.
Fixes match the correct Windows feature (Update / Defender / Firewall / accounts / software source / startup).
Priorities are sensible (updates and antivirus/firewall are High).
The checklist is genuinely usable by a non-technical owner.
Hints available if stuck:
Hint 1: Think of the four layers: updates, antivirus, firewall, app control/accounts.
Hint 2: "Free download accelerator from a random link" points at unsafe software sources.
Hint 3: "Everyone uses the same admin account" points at standard vs admin accounts.
Instructor answer key (do not show learners):
Problems (model list):
1. Updates repeatedly postponed → known vulnerabilities left open (High).
2. Defender/antivirus status unknown → could be off or out of date (High).
3. Firewall status unknown → gate keeper may be off (High).
4. Free software from a random link ("download accelerator") → likely unwanted/malicious software (High; scan and remove,
then re-check source).
5. Single shared administrator account → any mistake or malware has full power (High/Medium; create a standard daily
account).
6. (Bonus) Machine is slow → too many startup apps or unwanted software; review Startup apps (Medium).
Fixes & priorities (model):
Problem Check Fix Priority Why
Updates postponed Windows Update
status
Enable automatic updates;
apply and restart
High closes known attack
holes
Problem Check Fix Priority Why
Defender unknown Virus & threat
protection
Confirm real-time protection
On; run scan
High stops malware
Firewall unknown Firewall &
network
protection
Turn firewall On High blocks unsolicited
connections
Unsafe free software Installed apps /
scan result
Scan, remove if unwanted;
reinstall only from official
source
High likely malware
Shared admin account
Accounts → Your
info
Create a standard account for
daily use
High/Medium limits damage
Slow PC Startup apps Disable unneeded startup apps Medium tidiness/performance
Hardening checklist (model):
Windows Update set to automatic and "You're up to date"
Defender real-time protection On; Quick scan clean
Firewall On
Only software from official sources installed; no cracked apps
Daily account is a Standard user
Startup apps reviewed
Safe habits note: "Save work before restarting updates; read every UAC prompt; do not install 'free' tools from random links;
only the owner uses the admin account for real changes."
Marking guidance (out of 10):
Five-plus problems correctly identified (3)
Correct fixes matched to Windows features (3)
Sensible priorities with reasons (2)
Usable checklist (1)
Safe-habits note (1)

## J. Real-World Case Study
<!-- kind:case_study -->
Situation (fictional, non-identifying). A small private school in Rivers State — call it Bright Futures Academy — runs its fee
records, results and staff email on five Windows computers in the admin office. There is no IT officer; the bursar "manages"
the computers between other duties.
What happened. Over a term, staff noticed machines getting slower. One morning, three computers showed a message
demanding payment in a cryptocurrency to unlock encrypted files (a ransomware attack). The fee records for the term were
encrypted and unreadable. The bursar admitted the machines had not been updated for over a year ("the update box was
always in the way"), the same admin account was used by all five staff, and a staff member had recently installed a "free typing
tutor" from a link in an email.
Relevant facts.
No updates for a year → many known vulnerabilities left open.
Shared administrator account → malware had full power.
Software from an unofficial link → probable entry point.
No clear antivirus/firewall check habit; no backups known to be tested (backups are Session 6's topic, but note the link).
Decision point. The attack has already happened. But the school now asks: what device-hardening changes would prevent this
next time? (The immediate incident response — isolate, report, restore — is covered in Session 8; here we focus on hardening.)
Possible approaches.
1. Reinstall Windows, change nothing else, and hope it does not happen again.
2. Buy expensive third-party security software and do nothing else.
3. Apply the four layers: turn on and apply automatic updates, confirm Defender real-time protection + regular scans,
confirm the firewall is on, move daily work to a standard account, allow software only from official sources, and review
startup programs.
Recommended solution. Approach 3. It uses the protections already built into Windows, costs nothing extra, and addresses the
actual causes: unpatched holes, full-power accounts, and unsafe software. Combined with the backups taught next session
(tested restores), it makes a repeat far harder and the damage far smaller.
Trade-offs.
Approach 1 is quick but leaves every cause in place — high chance of repeat.
Approach 2 may help, but buying more software while leaving updates off and everyone on admin is like buying a guard
dog and leaving all the doors open.
Approach 3 needs some setup time, a small change in habit (standard accounts, restarts), and one person responsible —
but it fixes the root causes and uses free built-in tools. Its cost is discipline, not money.
Professional connection. This is exactly what an entry-level IT/security support person does: check patch status, confirm
antivirus and firewall, apply least privilege (standard accounts), and control software sources. These are core junior cyber-
support tasks and appear directly in the Week 3 assessment checklist. It also shows why backups (next session) are the safety net
when prevention fails.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
Use as the live troubleshooting guide. Ask the learner to check the relevant row before giving the answer.
K.1 "I keep clicking 'Later' on updates"
Symptoms: Device shows pending updates for weeks; restart reminders ignored. Likely cause: Inconvenience — not wanting
the interruption. (Confirmed once you see the pending list and repeated postponements.) How to investigate: Windows
Update → check history and pending list. Safe corrective steps: Save work, apply updates, restart; enable automatic updates
so it happens without reminders. How to confirm resolved: Status shows "You're up to date". How to prevent recurrence:
Schedule a regular low-use time for updates (e.g., end of day).
K.2 "Real-time protection is off"
Symptoms: Defender shows real-time protection Off (often with a warning). Likely cause: Someone disabled it (sometimes to
install software, or malware did it). How to investigate: Windows Security → Virus & threat protection → settings. Check for
any admin policy. Safe corrective steps: Turn it back On (admin may be needed); run a scan; if malware is found, act on the
result. How to confirm resolved: Real-time protection shows On; a scan is clean. Prevention: Do not disable it; if a trusted
technician asks, re-enable straight after.
K.3 "The firewall is off for my Wi-Fi"
Symptoms: Firewall & network protection shows the active profile Off. Likely cause: Changed manually, or by another
program, or a network profile change. How to investigate: Check which profile (Domain/Private/Public) is active and its status.
Corrective steps: Turn it On; if greyed out, an admin policy controls it — escalate. How to confirm resolved: Active profile
shows On. Prevention: Never turn the firewall off to "fix" a connection; ask what is actually blocked.
K.4 "A UAC prompt appeared and I clicked Yes without reading"
Symptoms: Unexpected admin prompt accepted; possibly new software or changed settings. Likely cause: An unexpected
program (possibly malware) requested admin rights. How to investigate: Review recently installed programs and running
processes; run a Defender scan; check startup apps. Safe corrective steps: Remove anything you did not install; run a scan; if
unsure, escalate to the instructor/IT. How to confirm resolved: No unknown programs; scan clean. Prevention: Always read
the prompt's three questions (What? Why now? Who?).
K.5 "My PC is slow, so I installed a 'cleaner'"
Symptoms: Slowness; a random "optimizer" or "accelerator" installed from a link. Likely cause: Untrusted software (often
bundled with unwanted extras or malware). How to investigate: Check installed apps and startup apps; run a scan. Safe
corrective steps: Uninstall unknown tools; scan; disable unneeded startup apps. How to confirm resolved: Startup list is tidy;
scan clean; machine faster. Prevention: Only install from official sources; avoid "free cleaner" links.
K.6 "Windows Security will not open or is showing red"
Symptoms: Windows Security app fails to open, or shows red warnings. Likely cause: A third-party antivirus is managing
protection, or malware is interfering, or a system issue. How to investigate: Check whether another antivirus is installed; try
again after a restart; check for admin policy. Safe corrective steps: If another AV is present, that may be intended — confirm
with the owner/IT. If malware is suspected, run an offline scan (Defender's Microsoft Defender Offline scan) with permission.
How to confirm resolved: Windows Security opens and shows green/expected state. Prevention: Keep one antivirus; keep
updates current.
Distinguish likely vs confirmed: Each "likely cause" becomes "confirmed" only after checking — e.g., seeing the actual toggle
state, the installed-app list, or the scan result. Teach learners to verify before concluding.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "Home Device Hardening Report"
Purpose: Practise applying the four hardening layers (updates, antivirus, firewall, accounts/software) to a real device the learner
is authorised to use, and communicate the findings and fixes in plain language — the same skill needed for the capstone report
in Week 3.
Realistic scenario: You have been asked to check a family or personal Windows computer (one you have permission to use)
and write a short hardening report for the owner.
Detailed instructions:
1. On a Windows 10/11 machine you are authorised to use, complete the following checks and record the actual result:
Windows Update status (up to date? pending? restart needed?).
Defender real-time protection (On/Off) and a Quick scan result.
Firewall status for the active network.
The account type used daily (Administrator / Standard user).
One observation about startup programs.
2. Identify at least three hardening improvements and write a plain-language fix for each.
3. Give each improvement a priority (High/Medium/Low) with a one-line reason.
4. Write a 5-step "What to do" checklist the owner can follow.
5. Add a privacy note: do not record any passwords, personal files, or other people's data; describe only the security settings.
Required deliverables:
session5-assignment/hardening-report.md (or a typed page/photo).
session5-assignment/hardening-checklist.md .
Submission format: In the class folder, or a photo of a handwritten report in your workbook.
Deadline: Before Session 6.
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
Accurate checks recorded 5 Real update/Defender/firewall/account results
Correct problem identification 4 At least three genuine hardening gaps
Correct fixes & priorities 4 Fix matches feature; sensible priority + reason
Usable owner checklist 3 Clear steps a non-technical person can follow
Criterion Marks Description of a strong answer
Plain-language clarity 2 No unexplained jargon
Professionalism & privacy 2 No personal data recorded; authorised device only
Common mistakes to avoid: recording guesses instead of actual status; turning off real-time protection to "speed things up";
mixing up firewall (network) with antivirus (files); forgetting to restart after an update; including personal data.
Instructor reference solution (model):
Sample findings: Update status "3 updates pending, restart required" → High (known holes open). Defender real-time
protection "On", Quick scan "No threats" → good, note as OK. Firewall "On (Public)" → OK. Daily account "Administrator" →
Medium (create a standard account). Startup: "6 apps enabled, 2 high impact" → Low/Medium (disable unneeded).
Sample checklist: 1) Open Settings → Windows Update, click Check for updates, restart when prompted after saving work. 2)
Open Windows Security → Virus & threat protection, confirm Real-time protection is On, run Quick scan. 3) Open Firewall &
network protection, confirm firewall On. 4) Create and use a Standard account for daily work. 5) Review Startup apps and disable
ones you do not need.
Privacy note (model): "I did not record passwords or any personal files; I only listed security settings and app names."

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key.)
Q1. Multiple choice. What is the main reason to install Windows updates regularly? a) To change the wallpaper. b) To fix known
security holes (vulnerabilities). c) To make the internet faster. d) To increase the hard disk size.
Q2. Short answer. What is the difference between real-time protection and running a scan in Windows Defender?
Q3. Explain in your own words. What does the firewall do, and how is it different from antivirus?
Q4. True or false, with a reason. "Using a standard (non-administrator) account for everyday work is safer than using an
administrator account."
Q5. Practical identification. A box appears saying "Do you want to allow this app to make changes to your device?" You did not
open any app. What should you do, and why?
Q6. Fill in the blanks. Four layers of defence in depth are: keep the OS ____; keep ____ (antivirus) awake; keep the ____ on; and
control what ____ and who has ____ rights.
Q7. Scenario. A friend's PC is slow and they want to install a "free PC cleaner" from a random website. Using today's lesson,
what do you advise, and what should they check instead?
INSTRUCTOR ANSWER KEY (Q1–Q7)
A1. (b) To fix known security holes (vulnerabilities). A2. Real-time protection watches files continuously, as they
open/download/run, and blocks threats immediately; a scan is an on-demand check of the device (e.g., Quick or Full scan) that
you start yourself. A3. The firewall is a gate keeper that filters network connections going in and out of the computer,
blocking unsolicited incoming connections. Antivirus looks for malicious files and programs. They do different jobs and work
together. A4. True. A standard account cannot install software or make deep system changes without an admin prompt, so
malware and mistakes are limited. The admin account should be used only when real changes are needed. A5. Do not click Yes.
An unexpected admin prompt when you started nothing is a red flag — something (possibly malware) is trying to make
changes. Read the prompt (What? Why now? Who?), and if it is not something you chose, click No and investigate/scan. A6.
keep the OS updated; keep Windows Defender (antivirus) awake; keep the firewall on; control what apps run/install and who
has administrator rights. (Accept equivalent wording.) A7. Advise against installing the "free cleaner" from a random site —
such tools are often unwanted or malicious. Instead, check: Windows Update status, run a Defender scan, review Startup apps
and disable unneeded ones, and remove any unknown installed software. Only install software from official sources.

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today we hardened the device itself. An un-updated computer is like a house with a broken window —
attackers know exactly where the holes are, so we apply Windows updates (and turn on automatic updates, restarting when
asked). Windows Defender is the built-in antivirus; we confirmed real-time protection is On and ran a Quick scan. The
Windows Firewall is the gate keeper that filters network connections, and we confirmed it is On. We learned that a standard
account limits the damage a mistake or malware can do, and that we must read every UAC prompt. We also learned to use
only official software sources, to review startup programs, and why all of this together is called defence in depth — because
antivirus alone is not enough.
Five important takeaways:
1. Updates fix known holes — turn on automatic updates; restart when asked.
2. Defender real-time protection is the guard dog — confirm it is On and scan regularly.
3. The firewall is the gate keeper for network connections.
4. Use a standard account daily and read every UAC prompt.
5. Install software only from official sources; defence in depth beats any single tool.
Questions to help you recognise what you can now do:
Can I check Windows Update and explain why a restart matters?
Can I confirm Defender real-time protection is on and run a Quick scan on my own?
Can I check the firewall status and explain what it does?
Can I explain in plain words why antivirus alone is not enough?
Connection to the next session: We have hardened the computer, but what about the network it connects to and the phone in
your pocket — and what happens if prevention still fails? Next session, Wi-Fi Security, Mobile Safety and Backups, we secure
the router, protect the mobile device, and build the safety net — backups — so that even if a device is lost, stolen or infected,
your important files survive. Remember: a backup you have never restored is not a backup.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
The learner navigates to Windows Update, Defender and Firewall unaided (or with minimal prompting) and reads the real
status.
The learner explains why updates matter in terms of known vulnerabilities, not just "it's good".
The learner distinguishes real-time protection from an on-demand scan.
The learner distinguishes firewall (network) from antivirus (files).
The learner reads a UAC prompt before deciding, and can state the three questions.
The learner can name the four layers of defence in depth.
Common misconceptions to watch for and correct:
"Updates are optional/annoying." → They close known holes; automatic updates remove the burden.
"Antivirus is enough." → Defence in depth; layers matter.
"Firewall and antivirus are the same." → Network gate keeper vs file scanner.
"Admin is always better." → Least privilege: standard for daily use.
"Clicking Yes on a UAC prompt is always fine." → Read it; a surprise prompt is a red flag.
Suggested remedial exercises for learners who struggle:
1. Location drill: give five tasks ("check firewall", "run a scan"…) and have the learner write the exact path from the Start
menu for each.
2. Layer sorting: provide ten controls (e.g., "restart after update", "block incoming connection") and have learners sort each
under Updates / Antivirus / Firewall / Accounts.
3. UAC role-play: present three UAC scenarios (a tool you opened; a sudden prompt; a game installer from a random site) and
ask the learner what to click and why.
4. Plain-English drill: the learner explains "defence in depth" to a partner pretending to be a non-technical shop owner.
Differentiation:
Level 1 (supported): Provide a pre-filled report template with tick-boxes and sentence starters; the learner only fills in the
actual status values.
Level 2 (standard): The exercises as written.
Level 3 (challenge): Have the learner analyse a machine with a third-party antivirus installed and explain how Windows
Security behaves when another antivirus manages protection; also design a simple update-and-scan schedule for a small
shop and justify it.
Timing guidance: If the room is slow, shorten the case study (Section J) to a 3-minute mention and protect the guided practical
(Section H) — the hands-on checks are the priority. Warn learners early that a restart may be needed, so they save work. If the
room is fast, extend the independent exercise with a second scenario (a phone-only learner describing how they would apply
the same principles on Android/iOS, previewing Session 6).
END OF SESSION 5
Next: Session 6 — Wi-Fi Security, Mobile Safety and Backups.
