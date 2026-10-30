---
{
  "id": "computer-repairs/session-06",
  "course": "computer-repairs",
  "number": 6,
  "of": 12,
  "title": "Software Diagnostics",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/computer-repairs/session-06.png",
    "page": 96,
    "transcript": [
      "SOFTWARE DIAGNOSTICS — TOOLS INSIDE WINDOWS",
      "Hardware f aults are phy sical. Sof tware f aults are inv isible — y ou need f ree Windows tools to see them.",
      "INVESTIGATE FIRST — never format blindly. Formatting destroys the customer data!",
      "1. TASK MANAGER",
      "(Ctrl+Shift+Esc)",
      "- See which program eats CPU / RAM / disk",
      "- End a frozen task safely",
      "- Check startup apps that slow boot",
      "2. EVENT VIEWER",
      "- Windows keeps a diary of errors",
      "- Find red Error events",
      "- Note the error code for your report",
      "3. sfc /scannow",
      "- Run in Administrator Command Prompt",
      "- Checks Windows system files",
      "- Repairs broken files automatically",
      "4. DISK CLEANUP",
      "- Deletes junk files safely",
      "- Empties Recycle Bin and temp files",
      "- Frees space when drive is full",
      "5. WINDOWS DEFENDER",
      "- Built-in antivirus (free)",
      "- Run a full scan for malware",
      "- Never disable a customer antivirus",
      "6. SYSTEM RESTORE",
      "- Rolls Windows back to a saved",
      "restore point (working state)",
      "- Fixes bad changes without losing files",
      "DECIDE: software fault or hardware fault? Software = slow / pop-ups / boot errors with NO physical damage",
      "NIGERIAN EXAMPLE",
      "A customer PC in GRA is slow with pop-ups. Task Manager shows 5 programs eating CPU at startup.",
      "You disable the junk startup apps, run Disk Cleanup and a Def ender scan — no f ormatting needed."
    ],
    "hotspots": [
      {
        "label": "SOFTWARE DIAGNOSTICS — TOOLS INSIDE WINDOWS",
        "x": 16.04,
        "y": 6.87,
        "w": 67.94,
        "h": 4.21,
        "mono": false
      },
      {
        "label": "Hardware f aults are phy sical. Sof tware f aults are inv isible — y ou need f ree Windows tools to see them.",
        "x": 16.79,
        "y": 14.33,
        "w": 66.34,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "INVESTIGATE FIRST — never format blindly. Formatting destroys the customer data!",
        "x": 21.14,
        "y": 20.24,
        "w": 57.75,
        "h": 2.36,
        "mono": false
      },
      {
        "label": "1. TASK MANAGER 2. EVENT VIEWER 3. sfc /scannow",
        "x": 7.63,
        "y": 29.52,
        "w": 71.64,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "(Ctrl+Shift+Esc)",
        "x": 7.63,
        "y": 32.99,
        "w": 7.82,
        "h": 1.85,
        "mono": false
      },
      {
        "label": "- Windows keeps a diary of errors - Run in Administrator Command Prompt",
        "x": 37.6,
        "y": 33.7,
        "w": 50.72,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "- See which program eats CPU / RAM / disk - Find red Error events - Checks Windows system files",
        "x": 7.63,
        "y": 36.06,
        "w": 75.64,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "- End a frozen task safely",
        "x": 7.63,
        "y": 38.78,
        "w": 12.77,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "- Note the error code for your report - Repairs broken files automatically",
        "x": 37.6,
        "y": 39.58,
        "w": 47.94,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "- Check startup apps that slow boot",
        "x": 7.63,
        "y": 41.46,
        "w": 17.69,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "4. DISK CLEANUP 5. WINDOWS DEFENDER 6. SYSTEM RESTORE",
        "x": 7.63,
        "y": 49.49,
        "w": 75.9,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "- Deletes junk files safely - Built-in antivirus (free) - Rolls Windows back to a saved",
        "x": 7.63,
        "y": 53.7,
        "w": 76.31,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "restore point (working state) - Empties Recycle Bin and temp files - Run a full scan for malware",
        "x": 67.59,
        "y": 56.39,
        "w": 14.25,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "- Frees space when drive is full - Never disable a customer antivirus - Fixes bad changes without losing files",
        "x": 7.63,
        "y": 59.58,
        "w": 80.04,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "DECIDE: software fault or hardware fault? Software = slow / pop-ups / boot errors with NO physical damage",
        "x": 12.77,
        "y": 71.1,
        "w": 74.46,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "NIGERIAN EXAMPLE",
        "x": 10.03,
        "y": 80.18,
        "w": 15.84,
        "h": 2.63,
        "mono": false
      },
      {
        "label": "A customer PC in GRA is slow with pop-ups. Task Manager shows 5 programs eating CPU at startup.",
        "x": 10.03,
        "y": 84.63,
        "w": 64.18,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "You disable the junk startup apps, run Disk Cleanup and a Def ender scan — no f ormatting needed.",
        "x": 10.03,
        "y": 87.91,
        "w": 63.11,
        "h": 2.24,
        "mono": false
      }
    ],
    "width": 984,
    "height": 669
  },
  "module": "Week 2 — Module: Diagnostics",
  "duration_minutes": 105,
  "difficulty": "Beginner",
  "prerequisite_knowledge": "Sessions 1–5: components, safety and tools, disassembly/reassembly, the five-step diagnostic workflow, and hardware diagnostics (RAM, storage, PSU, heat, display). If a learner cannot explain the difference between a hardware and a software fault, do the 5-minute recap in Appendix 6A before this session.",
  "connection_to_previous": "Session 5 proved faults in the hardware using physical tools. This session diagnoses the software — slow computers, viruses, boot problems and driver faults — using Windows' own built-in tools. Together the two sessions let you decide whether a fault is hardware or software."
}
---
# Software Diagnostics

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 2 — Module: Diagnostics

**Recommended duration:** 105 minutes

**Difficulty:** Beginner

**Prerequisite knowledge:** Sessions 1–5: components, safety and tools, disassembly/reassembly, the five-step diagnostic workflow, and hardware diagnostics (RAM, storage, PSU, heat, display). If a learner cannot explain the difference between a hardware and a software fault, do the 5-minute recap in Appendix 6A before this session.

**Connection to previous work:** Session 5 proved faults in the hardware using physical tools. This session diagnoses the software — slow computers, viruses, boot problems and driver faults — using Windows' own built-in tools. Together the two sessions let you decide whether a fault is hardware or software.

**Preparation before class:** Practice computers with Windows 10/11 ready; at least one machine pre-loaded with a safe simulated software fault (e.g., several unnecessary startup programs enabled, a full Recycle Bin, a large unnecessary file, or a deliberately misconfigured/disabled device driver — do not use real malware); Windows Defender active and updated; Command Prompt access tested; Event Viewer accessible; a restore point created before the simulation so it can be undone. Keep a second, clean machine untouched for comparison. Important safety and ethics note. In this session we simulate software faults safely for teaching. We do not intentionally download viruses, and we never disable a customer's antivirus. Where the course talks about malware, it teaches recognition and safe removal, not creation. All work is on academy machines with permission.

Institution

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Explain the difference between a software fault and a hardware fault, and give an example of each.
2. List the common software faults — slow performance, malware infection, boot failure, driver issues, full disk — and
match each to its usual symptoms.
3. Use Task Manager to identify programs using too much CPU, memory or disk, and safely end a misbehaving task.
4. Use Event Viewer to find error events and note their codes.
5. Run sfc /scannow in an Administrator Command Prompt to check and repair system files.
6. Run Disk Cleanup to free storage space safely.
7. Describe the safe approach to malware removal, including when to use a full scan and when a second-opinion scanner is
appropriate.
8. Use System Restore / recovery options to return a machine to a previous working state when appropriate.
9. Decide whether a fault is more likely software or hardware, and explain the reasoning.

## C. Required Materials
<!-- kind:materials -->
Hardware (provided by CEA)
At least one practice desktop or laptop running Windows 10 or Windows 11 for each pair of learners.
One machine pre-loaded with the simulated software faults described in Section A.
One clean machine for comparison.
A powered network is not required, but if available it helps update Defender's definitions.
Software (all built into Windows unless noted)
Task Manager (Ctrl+Shift+Esc).
Event Viewer.
Command Prompt (run as Administrator) for sfc /scannow and chkdsk .
Disk Cleanup.
System Restore / Recovery options.
Device Manager (for driver issues).
Windows Defender (built-in antivirus) or the academy's approved antivirus.
Optional second-opinion scanner (e.g., Malwarebytes) — instructor only, pre-installed and updated, used for
demonstration.
msconfig / Startup Apps settings.
Printed materials
Software Diagnostic Report Form (one per learner).
Windows Tools quick-reference card (one per learner).
Safety equipment
None special for software, but keep drinks away from machines and never disable antivirus.
Internet
Optional. Needed only if the instructor chooses to show a driver download from a manufacturer's site at the end. Do not
depend on it.
Alternative for learners who lack a facility
Any Windows computer works for Task Manager, Disk Cleanup and Event Viewer; sfc needs Administrator rights. Learners
without a personal machine share a bench machine and swap roles.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector, open the pre-prepared simulated faulty machine. Have several browser-like pop-up
windows already sitting on the desktop (harmless images or text files the instructor arranged), and open Task Manager to show
a high CPU figure. Keep it controlled and safe.
What the instructor says:
"Good morning. Look at this computer. The screen is crowded with pop-ups. It is crawling — everything takes forever.
Programs close on their own. The owner is panicking.
Last week we learned to test hardware with tools. But tell me something: if I open this case right now, will I find a broken
part? No. The RAM is fine, the drive is fine, the power supply is fine. And yet the computer is very sick.
This computer is sick in its software. Software problems are just as common as hardware problems — and do you know
what makes them harder? You cannot see them. There is no clicking noise, no beep, no hot part you can feel. Today you
learn to see software problems using Windows' own tools — the tools that are already inside every computer, free."
Expected learner response: Learners may shout "virus!", "it needs formatting", or "delete everything". Accept all answers. Write
them on the board. Say:
"Maybe. But a good technician does not format first and ask questions later — that destroys the customer's data. We
investigate first. That is what today is about."
Why this opener works: It creates a clear contrast with Session 5 (hardware is physical and testable; software is invisible), it
captures a very common real-world situation for Nigerian computer users, and it immediately challenges the destructive "just
format it" habit by promising a safer, investigative approach.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Run as a fast oral round-robin. Put the questions on the projector.
Question 1: "Name the five steps of the diagnostic workflow."
Expected answer: Observe → Ask → Hypothesise → Test → Resolve (then document).
Common gap: forgetting to document. Remind learners: not documented = not done.
Question 2: "What hardware fault causes a computer to run slowly and make a soft clicking sound?"
Expected answer: a failing hard drive. Note that this is a hardware cause of a symptom people usually blame on software.
Question 3: "What does it mean if CrystalDiskInfo shows 'Caution'?"
Expected answer: the drive is showing wear; back up now and plan to replace it.
Question 4: "Why do we never open the PSU?"
Expected answer: lethal stored charge in the capacitors, even when unplugged.
Question 5: "A computer beeps repeatedly and shows no picture. Is that more likely hardware or software — and why?"
Expected answer: hardware — software has not even loaded yet when POST runs. This bridges neatly into today.
Bridge to today (say this):
"Session 5 was about a sick body. Today is about a sick mind. A computer can have perfect parts and still behave badly —
because the instructions it is following are wrong, infected or broken. Your job today is to use the tools that let you look
inside the mind."
Gap handling: If learners cannot clearly separate a hardware from a software example (Question 5), spend up to three extra
minutes with the Appendix 6A recap, because this distinction is the backbone of today's session.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 What a software fault is — and why it is different
The idea. A computer is hardware plus the instructions that run on it. Those instructions and data are the software. When the
instructions or data go wrong, the machine misbehaves even though every physical part is fine.
Plain-English definition. A software fault is anything wrong with the programs, the operating system, the drivers, or the files
— as opposed to the physical parts. Examples: a virus, a corrupted Windows file, an out-of-date or wrong driver, a full disk, or
too many programs starting automatically.
Why the distinction exists. Hardware faults are fixed by repairing or replacing a part. Software faults are fixed by cleaning,
correcting, updating, restoring or reinstalling the software. The two need completely different tools and skills, so step one of
any diagnosis is to decide which type you are facing.
Analogy. Think of a football team. The players are the hardware. The coach's instructions are the software. If a player breaks a
leg (hardware), no new instructions will help — you need a new player or rest. If all the players are strong but the coach gave
the wrong formation (software), replacing players will not help — you must fix the instructions. Same team, same "hardware";
the problem is elsewhere.
Realistic Port Harcourt scenario. A student in Elelenwo buys a "free" cracked version of a design program from a friend's USB
flash drive. Two weeks later her laptop is slow, opens strange pages in her browser, and shows adverts on the desktop. The parts
are all fine; the machine is infected. A technician who understands software faults knows to scan, remove, and teach the student
about trusted sources — not to replace her hard drive.
Important misconception. "Software problems are the easy ones — just restart." Sometimes a restart clears a temporary glitch,
but many software faults (viruses, corruption, failing drivers) persist and get worse. Do not rely on restarts as a fix.
Key limitation. Software faults often look like hardware faults. A corrupted system file can cause a blue screen; a failing drive
can corrupt system files. So a good technician still runs the hardware checks (Session 5) when symptoms are severe, to make
sure a hidden hardware problem is not the root cause.
F.2 Slow performance — the most common complaint
The idea. "My computer is slow" is the number one thing customers say. It has several possible causes, and the skill is to find
which one.
Plain-English definition. Slow performance means the computer takes much longer than expected to start, open programs, or
respond.
The main causes of a slow computer (each with its own symptom pattern):
Cause Type Typical sign
Too many startup programs
Software
Slow only at start-up; settles after a few minutes
Full or nearly full disk
Software/storage
Slow saves; "low disk space" warnings; slow everywhere
Malware
Software
Slow plus pop-ups, redirects, strange behaviour
Failing drive
Hardware
Slow plus clicking/errors; check S.M.A.R.T. (Session 5)
Too little RAM
Hardware
Slow with many programs open; disk light constantly busy
Overheating
Hardware
Slow plus loud fans, hot case, random shutdowns
Fragmented HDD / old hardware Both Generally slow but healthy; an SSD upgrade helps
How we investigate:
Task Manager (Ctrl+Shift+Esc) → Processes tab shows what is using CPU, memory and disk right now.
Startup Apps tab (or msconfig ) shows what runs automatically at start-up.
Disk space check (This PC) shows how full the drive is.
CrystalDiskInfo (Session 5) rules out a failing drive.
HWMonitor (Session 5) rules out overheating.
Analogy. A slow computer is like a bus in Port Harcourt traffic. Sometimes the bus is fine but too many passengers (programs)
are crammed in. Sometimes the engine (drive) is old. Sometimes the road (disk space) is blocked. To fix the delay you must
know which it is.
Important misconception. "Slow means I need a new computer." Often a cleanup, more RAM, or moving Windows onto an
SSD makes an old machine feel new again — far cheaper than replacing it (Session 7).
Limitation. Task Manager shows the present moment. A program that spikes the CPU only sometimes may look innocent when
you glance. Watch it for a while, and use Event Viewer for the history.
F.3 Malware — viruses, spyware and ransomware
The idea. Malware is any software written to harm you or to take your money or data. A "virus" is only one type.
Plain-English definitions (keep these simple for beginners):
Virus: malicious code that spreads by attaching itself to files and programs.
Spyware: software that secretly watches what you do (passwords, banking, browsing).
Ransomware: software that locks your files and demands money (a "ransom") to unlock them.
Adware / unwanted pop-ups: programs that flood you with adverts, often bundled with "free" software.
Trojan: a harmful program disguised as something useful (e.g., a "free game" that is really spyware).
Why it exists and how computers get infected:
Downloaded from untrusted websites, especially "cracked" or "free" versions of paid software.
From an infected USB flash drive shared between computers.
From email attachments or links that look real (called phishing).
From clicking fake pop-ups that pretend to be "your antivirus found 5 viruses — click here".
Common symptoms of infection:
Pop-ups and adverts appearing even when the browser is closed.
The browser sending you to strange websites (redirects).
The computer suddenly slow, with high CPU/disk even at idle.
Strange programs opening, or unfamiliar icons/programs appearing.
Files, folders or settings changing on their own.
Antivirus switching itself off and refusing to turn back on.
For ransomware: files suddenly renamed or encrypted and a "pay us" note.
The safe removal approach (step by step):
1. Do not panic and do not format yet. First preserve the customer's data.
2. Disconnect from the internet (unplug the network cable / turn off Wi-Fi) to stop the malware communicating or
spreading.
3. Run a full scan with the updated antivirus (Windows Defender or the academy's approved tool). A Full Scan checks the
whole system; a Quick Scan checks only common locations.
4. Review the results, then quarantine or remove detected threats. Quarantine moves the threat to a safe place rather than
deleting it immediately.
5. Restart if prompted, and scan again to confirm nothing remains.
6. Second-opinion scan (optional): if symptoms continue but the first scan found nothing, run a trusted second scanner (e.g.,
a reputable free malware-removal tool). Different tools catch different things.
7. Change important passwords afterwards if spyware was suspected (banking, email), because they may have been
captured.
8. Educate the customer: explain how the infection happened (usually an untrusted download) and how to avoid it next time.
Analogy. Malware is like rats in a store-room. Poisoning (scanning) is not enough if you leave the door (the unsafe download
habit) open. You must remove the rats and close the door.
Important misconception. "One antivirus is enough, forever." Antivirus definitions (the list of known threats) must be kept
updated. An out-of-date antivirus is like a watchman with an old list of faces — new intruders walk straight past.
Limitation. No antivirus catches every threat, especially brand-new ones. Also, some "vaccines" people download are
themselves malware ("fake antivirus"). Only install antivirus from the built-in Windows Defender or a well-known, trusted brand.
Never pay a random pop-up that claims to clean your PC.
F.4 Boot problems — when Windows will not start
The idea. Sometimes the computer powers on (so hardware and POST are fine) but Windows does not finish loading. That is a
boot problem.
Plain-English definition. A boot problem is a fault in starting Windows. The machine passes POST, but Windows does not
reach the desktop — either it hangs, shows an error, restarts, or offers a repair screen.
Common symptoms:
A black screen with a spinning dots animation that never finishes.
An error such as "Boot device not found" (often hardware — check S.M.A.R.T. first).
"Your PC ran into a problem and needs to restart" (a blue screen).
An automatic "Automatic Repair" / "Recovery" screen.
A boot loop: Windows starts to load, then restarts, over and over.
Why it happens: a corrupted system file, a bad update, a wrong or corrupted driver, a power cut during an update, or an
underlying failing drive.
Recovery options (what each one does):
Start-up Repair: Windows tries to repair common start-up problems automatically.
Safe Mode: Windows starts with only the basic drivers and services. It is how you get in to fix a problem when normal mode
fails. (Safe Mode is defined properly in F.5.)
System Restore: returns system files and settings to an earlier point without touching the customer's personal files (see
F.7).
Reset / reinstall: the last resort. Always back up first.
Analogy. A boot problem is like a car that starts (engine turns) but the gear will not engage. The engine is fine; the path from
engine to wheels is broken. You do not replace the engine — you find and fix the broken link.
Important misconception. "If Windows will not start, the computer is finished — format it." Not true, and formatting too
quickly loses data. "Boot device not found" is often a hardware problem (or a loose cable), and a blue screen is often a driver or
file problem. Investigate before you wipe.
Limitation. Some boot faults are actually hardware — a failing drive or bad RAM. That is why every boot problem starts with
the Session 5 checks.
F.5 Safe Mode — the rescue room
The idea. When normal Windows will not start, Safe Mode gives you a stripped-down Windows so you can still get in and fix
the problem.
Plain-English definition. Safe Mode starts Windows with only the essential drivers and services. Extra programs and fancy
drivers are left out, so the system is more likely to start even when something is wrong.
Why it exists. If a bad driver or a program that starts automatically is crashing Windows, Safe Mode does not load it, so the
system comes up and you can remove or disable the culprit.
Analogy. Safe Mode is like a hospital's emergency room. Everything non-essential is switched off so the doctors can focus on
the problem. Normal mode is the whole hospital running at once — noisier, busier, harder to work in when something is
broken.
When to use it:
To remove stubborn malware that will not delete in normal mode.
To uninstall a program or roll back a driver that broke Windows.
To create a System Restore point or run recovery tools.
How to reach it (Windows 10/11): If Windows will not start, it often offers a Recovery environment after failing to boot two
or three times. From the recovery screen choose Troubleshoot → Advanced options → Startup Settings → Restart, then
select Enable Safe Mode. (Exact wording is stable but the paths depend on the Windows version; the instructor demonstrates
on the practice machine.)
Important misconception. "I can work normally in Safe Mode forever." No — Safe Mode is temporary and limited. It is a tool
for getting in and fixing the cause, not a place to stay.
Limitation. Some problems (a failing drive, bad RAM) are not fixed by Safe Mode. Safe Mode proves the fault is software — a
useful clue in itself.
F.6 Driver issues — the translator problem
The idea. A driver is a small piece of software that tells Windows how to talk to a specific piece of hardware.
Plain-English definition. A driver is the translator between Windows and a hardware device (printer, graphics card, Wi-Fi
adapter, sound chip). Each device needs the right driver to work properly.
Why drivers exist. Windows cannot contain instructions for every device ever made. Instead, each device's maker writes a
driver, and Windows loads it. New hardware needs a driver; that is why after a fresh Windows install "some things may not work
until drivers are installed."
Common symptoms of a driver problem:
A device does not work at all (no sound, no Wi-Fi, printer not found).
A yellow triangle with an exclamation mark next to a device in Device Manager.
Poor performance (especially graphics: the GPU works but slowly, or with wrong resolution).
Crashes or blue screens after installing or updating a driver.
Tool: Device Manager. Open it by pressing the Windows key and typing Device Manager. It lists every device. A problem
device shows a yellow warning triangle.
To update a driver: right-click the device → Update driver → search automatically, or download the correct driver from
the manufacturer's official website and install it. (Manufacturer's website is preferred for graphics, sound and Wi-Fi.)
To roll back a driver: if a problem started after an update, right-click the device → Properties → Driver tab → Roll Back
Driver. This returns to the previous version.
To identify an unknown device: right-click → Properties → Details → note the hardware ID and look it up (or search it
online) to find the correct driver.
Analogy. A driver is like a person who speaks both languages. Windows speaks "Windows"; the printer speaks "printer". Without
a translator, neither understands the other, and nothing prints. Updating the driver is getting a better translator.
Important misconception. "Always get drivers from any site that offers a free 'driver updater'." Avoid random driver-updater
websites and tools; they often bundle unwanted software. Get drivers from Windows Update or the device manufacturer's
official site.
Limitation. Not every old device has a driver that works on the latest Windows; sometimes the honest answer is "this device is
too old for this version of Windows." Also, the newest driver is not always the best — if the machine was stable before an
update and broke after, rolling back is the right move.
F.7 The Windows diagnostic tools
These tools are already inside Windows. Learn what each does before you use it.
1. Task Manager (Ctrl+Shift+Esc).
Shows Processes: every running program and how much CPU, memory, disk and network it is using.
The Startup Apps tab shows what launches automatically at start-up (see F.8).
Use it to spot the culprit: a program using 80–100% CPU or disk while you do nothing is suspicious.
To stop a frozen or suspect program: select it → End task. Safety: end tasks only for programs you recognise as
misbehaving; ending a Windows system process can unbalance the machine.
2. Event Viewer.
A log of everything Windows has recorded: information, warnings and errors.
Look under Windows Logs → System and Windows Logs → Application.
Errors show a red circle with an "X". Note the error code and the source and search the exact code online for its meaning.
Use it to find what happened when a crash occurred, even after the machine restarted.
3. System File Checker ( sfc /scannow ).
A built-in tool that scans Windows' own system files and repairs any that are corrupted, using a cached good copy.
Run it in a Command Prompt opened as Administrator: press Windows key → type cmd → right-click Command Prompt
→ Run as administrator → type sfc /scannow → Enter.
It takes roughly 10–20 minutes. When finished it reports one of: no problems found; problems found and repaired; or
problems found that could not be repaired (then you may need to check DISM , an advanced repair — instructor
demonstration only).
Safety: never run it on a failing drive without backing up first — repairs write to the disk.
4. Chkdsk ( chkdsk ).
Checks a disk for file-system errors and bad sectors. chkdsk C: /f fixes errors on drive C.
Advanced, writes to the disk; back up first and use under supervision.
5. Disk Cleanup.
Press Windows key → type Disk Cleanup → choose the drive → tick categories (Temporary files, Recycle Bin, Windows
Update leftovers, etc.) → OK to delete.
Frees storage space safely. Larger cleanup ("Clean up system files") can also remove old Windows update files.
6. System Restore.
Press Windows key → type Create a restore point → in the window, click System Restore.
Choose a restore point from before the problem began → follow the prompts.
Restores system files, drivers and settings to that earlier time. It does not delete the customer's personal documents —
but warn the customer that programs installed after the restore point may need reinstalling.
7. Startup Apps / msconfig .
Startup Apps (in Task Manager) lists programs that start automatically. Disabling unnecessary ones speeds up boot time.
msconfig (System Configuration) is an older, more powerful tool; use it under supervision. Disabling critical services can
break Windows.
Important misconception. " sfc /scannow fixes everything." It repairs system files only. It does not remove viruses, it does not fix
a failing drive, and it does not replace missing drivers. It is one tool among many.
Limitation. These tools work only if Windows can start at least in Safe Mode. If Windows cannot start at all, you use the recovery
environment (F.4) first.
F.8 Startup programs and disk space
Startup programs. Many programs (chat apps, updaters, "helper" tools) add themselves to the start-up list. Each one slows
boot and uses memory. Review the Startup Apps tab in Task Manager and disable anything the user does not need at start-up.
To disable: select the app → Disable. Safety: do not disable items you do not recognise if they appear related to security, audio,
or trackpad — ask first.
Disk space. Windows needs free space to work. When a drive is nearly full, everything slows. Check free space in This PC. Free it
with Disk Cleanup, emptying the Recycle Bin, uninstalling unused programs, and moving personal files to an external drive or
cloud. A common real-world cause of a "slow" office PC is a drive that is 98% full.
Analogy. Startup programs are like guests who arrive at your shop every morning and occupy chairs before you open. A few are
helpful; dozens block the shop. Disk space is the shop floor: if it is packed to the ceiling with boxes, you cannot work.
Important misconception. "Deleting files always frees space permanently." Files in the Recycle Bin still occupy space until the
bin is emptied.
F.9 Software fault or hardware fault? — deciding
The idea. The most valuable skill in Week 2 is choosing the correct category before you act.
Quick decision guide:
Symptom Lean towards First check
Beeps, no picture, no power
Hardware
POST, PSU, RAM (Session 5)
Slow + clicking + "not found"
Hardware
CrystalDiskInfo S.M.A.R.T.
Slow + hot + loud fans
Hardware
HWMonitor; dust/fans
Pop-ups, redirects, strange behaviour
Software
Antivirus full scan
Blue screen after installing a program/driver
Software
Safe Mode; roll back driver
Device not working (sound/Wi-Fi/printer)
Software
Device Manager
"Low disk space", slow saves
Software
Disk Cleanup
Random restarts even in Safe Mode
Hardware
RAM, PSU, heat
Why this matters. If you format a machine whose real problem is a failing drive, the fault returns and you have destroyed data.
If you replace a drive whose real problem is a virus, you have wasted the customer's money. Deciding correctly saves both.
Analogy. A doctor first decides whether the problem is a broken bone or an infection, because the treatments are completely
different. Decide "hardware or software" first, every time.
Important misconception. "If it started after I installed something, it must be software." Usually true — but installing a heavy
program can also reveal a hardware weakness (e.g., more RAM pressure causing crashes). Keep testing.
Limitation. Mixed faults exist. A failing drive can cause software symptoms; a virus can cause hardware-like crashes. When in
doubt, test the hardware foundation first.
F.10 Summary of the session
A software fault is a problem with instructions or data, fixed by cleaning/correcting/restoring — not by replacing parts.
Slow performance has many causes: startup programs, full disk, malware, or failing hardware. Investigate with Task
Manager.
Malware symptoms: pop-ups, redirects, slowness, strange programs. Safe approach: disconnect, full scan, quarantine,
restart, re-scan, update passwords, educate.
Boot problems: use recovery options, Safe Mode, and System Restore. "Boot device not found" is often hardware.
Drivers: use Device Manager to update (from the maker) or roll back a bad update.
Windows tools: Task Manager, Event Viewer, sfc /scannow , chkdsk, Disk Cleanup, System Restore, Startup Apps.
Always decide software vs hardware first, and always back up before destructive steps.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 What the instructor prepares
The pre-prepared simulated faulty machine (extra startup programs enabled, a full Recycle Bin, a large unnecessary file,
and one device driver deliberately disabled or mis-set — no real malware).
The clean machine for comparison.
A restore point created earlier so the simulation can be undone.
Command Prompt (Administrator) tested; Event Viewer accessible.
The Software Diagnostic Report Form on the projector.
G.2 Demonstration 1 — Task Manager and startup programs (5 minutes)
Say: "Watch me find out what is making this computer slow — without guessing."
Steps:
1. Press Ctrl+Shift+Esc to open Task Manager.
2. On the Processes tab, click the CPU column header to sort by CPU use. Point at the top process.
3. Say: "This is the culprit right now — it is using a huge share of the CPU. On a healthy idle machine, the top numbers
should be small."
4. Go to the Startup Apps tab. Point at the long list.
5. Say: "Every one of these starts automatically every time the computer boots. The customer does not need most of them.
Watch: I disable the ones marked 'High' impact, but I leave security and audio alone."
6. Disable two or three clearly unnecessary startup apps.
7. Say: "Notice I did not delete anything. Disabling start-up does not uninstall the program; it just stops it launching by itself.
That is a safe fix."
Expected results: the startup list shortens; the class can see the "Impact" column (High/Medium/Low) that Windows provides.
Reasoning to say aloud: "We are finding the cause, not just making the number look smaller."
Common errors to show and correct:
Ending a critical system process and destabilising the machine. Show the warning that a program might lose data.
Disabling a start-up item that the user actually needs.
Questions to ask: "If the CPU is high but settles down after five minutes, is that a fault?" (Not necessarily — start-up work is
normal; it becomes a fault if it never settles or stays extreme.)
G.3 Demonstration 2 — Event Viewer and sfc /scannow (5 minutes)
Say: "Now let us find errors that already happened."
Steps:
1. Open Event Viewer. Expand Windows Logs → System.
2. Say: "Red = Error, Yellow = Warning. I look at the errors around the time of the crash."
3. Open one error, point to the Source and the Event ID (error code). Say: "I copy this code and search it exactly, so I learn
what it means."
4. Open Command Prompt as Administrator (show right-click → Run as administrator). Type sfc /scannow and press Enter.
5. Say: "This scans every Windows system file and repairs any that are corrupted. It takes about 10 to 20 minutes. While it runs,
let us do another task."
6. (Optional) Open Disk Cleanup and show the categories and the "Total amount of disk space you gain" figure.
Expected results: Event Viewer shows red error entries with Event IDs; sfc /scannow begins scanning and reports a result; Disk
Cleanup shows reclaimable space.
Reasoning to say aloud: "Event Viewer is the history; Task Manager is the present. sfc repairs system files. Each tool answers one
question."
Common errors to show and correct:
Running sfc in a normal (non-Admin) Command Prompt → it may fail or do nothing. Show the difference.
Panicking at any red error — some errors are harmless and old. Read the time and source.
Questions to ask: "Does sfc /scannow remove viruses?" (No — that is the antivirus's job.)
G.4 Demonstration 3 — Simulated malware check and Second opinion (3 minutes)
Say: "Here is how we handle a suspected infection safely."
Steps:
1. On the simulated machine, open Windows Defender (or the academy antivirus) → Virus & threat protection.
2. Choose Scan options → Full scan → Scan now. Explain that this checks the whole system, not just common spots.
3. While it runs, say: "If it finds something, we quarantine it — that moves it to a safe locker. Then we restart and scan again.
If symptoms continue but the scan is clean, we use a second-opinion scanner, because no single tool catches everything."
4. Point out the importance of keeping definitions updated (there is usually an "up to date" indicator).
Expected results: Defender runs a scan; the class sees the quarantine/review screens.
Common errors to show and correct:
Clicking fake "you have 5 viruses" web pop-ups. Say: "Real antivirus does not pop up in your browser demanding a click.
That is a trick."
Disabling the antivirus "just for a minute" to download something. Say: "Never — that is exactly when you get infected."
Questions to ask: "Why disconnect from the internet first?" (To stop the malware communicating or spreading.)

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: With the instructor guiding, learners use Windows' built-in tools on a practice machine and record findings on the
Software Diagnostic Report Form.
Safety and ethics first — read aloud before starting:
Only work on the practice machines; do not experiment on a stranger's or school's live computer.
Never disable the antivirus.
Back up or confirm a backup before running any tool that writes to disk (chkdsk, restore).
Do not click unknown pop-ups or links.
If in doubt about a step, ask the instructor before doing it.
Procedure (instructor calls each step; learners follow; instructor walks the room):
1. Task Manager. Open Task Manager (Ctrl+Shift+Esc). On the Processes tab, sort by CPU, then by Memory, then by Disk.
Record the top process in each column and its percentage.
2. Startup Apps. Go to the Startup Apps tab. Record how many apps are enabled and which are marked High impact. Disable
one clearly unnecessary app. Record what you disabled.
3. Disk space. Open This PC and record the free space on the C: drive and whether Windows warns of low space.
4. Pause and predict. "If I disable five startup programs, will the computer get more RAM or just boot faster?" Write your
prediction. (Answer: it frees up some memory and CPU and speeds boot; it does not add physical RAM.)
5. Disk Cleanup. Open Disk Cleanup for C:. Record the "Total amount of disk space you gain". Do not click OK until the
instructor confirms; then clean the temporary files and Recycle Bin only.
6. Event Viewer. Open Event Viewer → Windows Logs → System. Find three red Error entries. Record the Event ID and
Source of each.
7. System File Checker. Open Command Prompt as Administrator. Run sfc /scannow . Record the final message (no
problems / problems repaired / could not repair). This may take some minutes — start it and continue other checks.
8. Driver check. Open Device Manager. Look for any device with a yellow warning triangle. Record the device name if
found.
9. Antivirus check. Open the antivirus. Confirm definitions are up to date, then start a Quick Scan (a Full Scan is too slow for
class time; the instructor may run a Full Scan on the demo machine). Record the result.
10. Complete the Software Diagnostic Report Form.
Expected results:
Task Manager shows running processes and resource percentages.
At least one startup app disabled.
Free disk space recorded; Disk Cleanup shows reclaimable space.
Three Event Viewer errors recorded with IDs.
sfc /scannow completes with a message.
Device Manager checked; any yellow-triangle device noted.
Antivirus scan completed with a result.
A completed report form.
Points to pause on and predict:
After step 1: "If the Disk column is pinned at 100% while nothing is happening, what should you suspect?" (A failing drive
— check S.M.A.R.T. — or a heavy background task.)
After step 4: "Will disabling start-up items change the installed programs?" (No — the programs remain installed; they just
do not auto-launch.)
After step 8: "A device has a yellow triangle. Is that hardware or software?" (Software — it needs a driver or has a conflict.)
Troubleshooting while walking the room:
Command Prompt will not run sfc → confirm it says "Administrator" in the title; right-click and choose Run as
administrator.
Event Viewer is empty → expand the correct log; some machines log few errors. Use another log (Application) if System is
quiet.
Disk Cleanup shows 0 bytes → this machine may already be clean; note that honestly.
Antivirus scan hangs → it may be waiting for updates; skip and record it as "not completed".
Learner wants to "just format it" → stop them; remind them of the data-first rule.
Completion checklist (learner ticks each):
Task Manager opened; top CPU, memory and disk processes recorded
Startup Apps reviewed; one unnecessary app disabled and noted
Disk free space recorded
Disk Cleanup run (temp files and Recycle Bin only)
Three Event Viewer errors recorded with Event IDs
sfc /scannow run and its result recorded
Device Manager checked for yellow-triangle devices
Antivirus scan run and result recorded
Software Diagnostic Report Form completed
All safety and ethics steps followed (no disabling antivirus, no unknown pop-ups)

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Diagnose a slow/faulty software scenario on your own, using the correct Windows tools, and write a short diagnosis. Do
not copy the instructor's demonstration.
Scenario. Mr. Bassey, who runs a small printing business in Mile 3, Port Harcourt, brings you a Windows desktop. He reports:
The computer takes over five minutes to reach the desktop in the morning.
Once running, it is slow to open files.
He sees adverts popping up even when his browser is closed.
Yesterday a message said "Low disk space on C:".
Last week, his sound stopped working after a Windows update.
Requirements:
1. List the three most likely software causes for the slowness, and say which Windows tool you would use to confirm each.
2. Explain what the pop-up adverts most likely indicate, and describe the safe removal approach in numbered steps.
3. Explain how "Low disk space" makes the computer slow and name one Windows tool that can help.
4. The sound stopped after an update. Which tool do you open, and what action might fix it?
5. Decide: are these problems all software, or should any of them prompt a hardware check? Justify your answer.
Time allowance: 15 minutes.
Constraints:
Use only the Windows tools from today's session.
Do not disable the antivirus.
Write in plain language a customer could follow.
Success criteria:
The three slowness causes are plausible and each is matched to a suitable tool.
The malware approach is safe (disconnect → full scan → quarantine → restart → re-scan → passwords → educate).
The disk-space explanation is correct and names a real tool.
The sound issue is correctly identified as a driver problem.
At least one hardware check is justified (the disk-space + slow pattern should prompt a S.M.A.R.T. check).
Hints available if stuck:
Hint 1: The slow morning start-up points at one particular tab in Task Manager.
Hint 2: "Low disk space" + slow file opening is a storage issue — but is a full drive the same as a failing drive? Think about
it.
Hint 3: Sound stopping right after an update screams "the translator between Windows and the sound chip".
INSTRUCTOR ANSWER KEY — Independent Class Exercise (do not show learners)
1. Likely causes of slowness + tools:
Too many startup programs → confirm in Task Manager → Startup Apps (High-impact entries).
Malware (supported by the pop-ups) → confirm with a full antivirus scan.
Low disk space / full drive → confirm by checking free space in This PC and using Disk Cleanup. (Also acceptable: a
failing drive, since "slow + full + adverts" can hide hardware — confirmed by CrystalDiskInfo S.M.A.R.T.)
2. Pop-up adverts: most likely malware/adware. Safe removal approach:
1. Disconnect from the internet.
2. Run a full antivirus scan (definitions updated).
3. Review results; quarantine/remove detected threats.
4. Restart if prompted.
5. Scan again to confirm.
6. If symptoms persist, run a trusted second-opinion scanner.
7. Warn the customer to change important passwords (spyware may have captured them).
8. Educate the customer: only download from trusted sources.
3. Low disk space: Windows needs free space for temporary files, updates and paging (using disk as extra memory). When the
drive is nearly full, these operations slow down, so the whole computer feels slow. Disk Cleanup (and emptying the Recycle Bin
/ uninstalling unused programs) helps.
4. Sound after an update: It is a driver problem. Open Device Manager, find the sound device (look for a yellow warning
triangle), then either Update driver (from the manufacturer's official site is best) or Roll Back Driver if the update caused it.
5. Software or hardware? These are mostly software problems. However, because the machine is slow and the drive was
reported full, the technician should also run a hardware check — CrystalDiskInfo S.M.A.R.T. — to rule out a failing drive (the
same "slow" symptom can be a dying HDD). This is the key insight of the exercise: never assume "software" without a quick
hardware sanity check.
Marking guidance (out of 15):
Three plausible slowness causes + matching tools (3)
Safe malware approach, in sensible order (4)
Correct disk-space explanation + real tool (2)
Correct driver identification + update/rollback (3)
Correctly notes a hardware check is warranted and why (3)
Accept any answer showing correct reasoning, even if wording differs. Penalise unsafe steps (formatting first, disabling
antivirus, clicking pop-ups).

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Chidinma is a final-year student at a school in Port Harcourt. She needs a "free" copy of a design program for her
project. A friend gives her a downloaded installer on a USB flash drive. She installs it. Within days, her laptop slows down badly,
her browser opens strange pages by itself, and pop-ups appear on the desktop. She is afraid she has "spoiled the laptop" and is
about to pay a shop to "reset everything" — which would wipe her project files.
Relevant facts.
The slowness and pop-ups began right after she installed the "free" program.
Her project files are stored on the same drive, with no backup.
The machine still boots and works, just slowly.
The decision point. Should the shop format the laptop and lose her project, or is there a safer path?
Possible approaches.
1. Format and reinstall Windows immediately (fast, but her project files would be at risk if not backed up).
2. Disconnect from the internet, back up her project files, run a full antivirus scan, quarantine the threats, restart, re-scan, and
remove the "free" program politely.
3. Ignore the pop-ups and keep using the laptop.
Recommended solution (for this stage). Approach 2. First back up her project files (this is not optional). Then disconnect the
internet and run a full scan, quarantine anything found, restart, and scan again to confirm. Remove the "free" program. Explain
how she got infected and why "free cracked software" from a USB is one of the most common infection routes in Nigeria.
Trade-offs.
Approach 1 is the "nuclear option": it certainly removes the malware but risks her data and wastes time. It should be the last
resort, after backup — not the first reaction.
Approach 2 is safer, cheaper, faster, and preserves her work; but it depends on removing the cause (the habit) or the
infection will return.
Approach 3 lets the infection and the risk grow — spyware could steal her passwords.
Professional connection. A technician earns a customer's trust by refusing to destroy data for convenience. The CEA graduate
is trained to preserve the customer's files, remove the threat safely, and educate the customer — exactly the "honest
assessment and recommendations" the certificate stands for.
Transfer exercise (ask the class): "Chidinma asks, 'How do I know which downloads are safe?' What three rules would you give
her?"
Suggested answer: (1) Only download software from the official website of the maker, or from a trusted store — never
"cracked"/"free premium" versions. (2) Scan any USB drive from someone else before opening its files. (3) Keep antivirus
updated and never click pop-ups that claim to "clean your PC".

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
Use this table as the session's live troubleshooting guide. When a learner has a problem, direct them to the relevant row.
K.1 The computer is slow but Task Manager looks normal
Symptoms: user complains of slowness; CPU/memory/disk look modest.
Likely causes: failing drive (slow reads); intermittent background task; too little RAM despite low average use; overheating
causing throttling.
How to investigate: look at the Disk column over time; run CrystalDiskInfo (S.M.A.R.T.); check temperatures with
HWMonitor; review Event Viewer for disk warnings.
Safe corrective steps: back up; replace/upgrade the drive if failing; clean cooling if hot; add RAM if memory pressure is
confirmed.
How to confirm resolved: normal speed returns and the S.M.A.R.T./temperature readings are healthy.
Prevention: regular health checks and cleaning (Session 8).
K.2 Pop-ups and browser redirects
Symptoms: adverts appear; browser opens strange sites; new toolbars.
Likely cause: malware/adware, usually from an untrusted download or an infected USB.
How to investigate: check recently installed programs and browser extensions; run a full scan; check Startup Apps for
unknown entries.
Safe corrective steps: disconnect internet → full scan → quarantine → restart → re-scan → remove the unwanted
program/extension → change passwords → educate.
How to confirm resolved: pop-ups and redirects stop after a restart and a clean re-scan.
Prevention: trusted downloads, scan USB drives, keep antivirus updated.
K.3 "Low disk space" and slow saving
Symptoms: warning messages; slow saves; small free space on C:.
Likely cause: the drive is nearly full (temp files, downloads, Recycle Bin, unused programs).
How to investigate: check free space in This PC; run Disk Cleanup to see reclaimable space.
Safe corrective steps: empty Recycle Bin; Disk Cleanup; uninstall unused programs; move personal files to external
storage/cloud. Do not delete system files or the Windows folder.
How to confirm resolved: free space rises and saving is fast again.
Prevention: monthly Disk Cleanup; keep at least ~15% of the drive free.
K.4 Blue screen after a driver or program install
Symptoms: blue screen ("Your PC ran into a problem"); recent install/update.
Likely cause: a faulty driver or an incompatible program (sometimes faulty RAM — always rule it out).
How to investigate: note the stop code; start Safe Mode; check Device Manager; check Event Viewer around the crash
time.
Safe corrective steps: in Safe Mode, roll back the recent driver or uninstall the recent program; if unstable, use System
Restore to an earlier point; run a memory test to rule out RAM.
How to confirm resolved: the machine runs normally for a full session without a blue screen.
Prevention: get drivers from the maker; avoid untrusted software; keep System Restore points.
K.5 A device stopped working after a Windows update
Symptoms: no sound / no Wi-Fi / printer not found, right after an update.
Likely cause: a driver mismatch caused by the update.
How to investigate: open Device Manager; look for a yellow warning triangle; read the device's error in Properties.
Safe corrective steps: Roll Back Driver; or Update driver from the manufacturer's official site; then restart.
How to confirm resolved: the device works again.
Prevention: install manufacturer drivers deliberately; create restore points before big updates.
K.6 Distinguishing likely from confirmed
As in Session 5, a likely cause becomes confirmed only after evidence: an Event Viewer error with a code, a scan result, a sfc
message, a driver roll-back that fixes the device, or a hardware reading. Teach learners to write "likely" until a test proves it. Say
clearly: "I have not confirmed this yet."

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "Software Diagnostic Report on a Real Machine"
Purpose: To practise using Windows' built-in diagnostic tools, to diagnose common software faults safely, and to write findings
plainly for a customer.
Realistic scenario: A customer brings you a Windows computer and says: "It is very slow to start, sometimes shows adverts, and
the sound stopped working last week." Produce a professional software diagnostic report before any destructive action.
Detailed instructions:
1. Use a real Windows computer you have permission to work on (a CEA practice machine, a family machine, or a machine at
your workplace). Do not work on a computer without permission.
2. Observe and record the reported symptoms in your own words.
3. Task Manager: record the top CPU, memory and disk processes and the number of startup apps enabled.
4. Startup Apps: disable one unnecessary app and record what you disabled. (Re-enable it afterwards if the machine is not
yours.)
5. Disk space & Disk Cleanup: record free space; run Disk Cleanup on temporary files and the Recycle Bin only; record space
reclaimed.
6. Event Viewer: record three error Events (Event ID + Source).
7. sfc /scannow : run it as Administrator and record the final message.
8. Device Manager: list any device with a yellow warning triangle.
9. Antivirus: confirm definitions are up to date; run a Quick Scan and record the result. (Do not run a Full Scan on a machine
you do not own without permission — it is slow.)
10. Conclusion: state the most likely software cause(s) and your recommended action, in plain language for the customer.
Required deliverables:
One completed Software Diagnostic Report Form with all readings and results.
A one-paragraph plain-language summary for the "customer".
Submission format: Written report on the CEA template (paper or class folder).
Deadline: Before Session 7.
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
Observation & symptom record 2 Clear, specific symptoms recorded
Task Manager & Startup findings 3 Top processes and startup app count recorded; one safely disabled
Disk space & Disk Cleanup 3 Free space and reclaimed space recorded; safe cleanup only
Event Viewer findings 3 Three errors with Event ID and Source
sfc /scannow result 3 Run as Administrator; final message recorded
Device Manager & antivirus 3 Yellow-triangle device noted (if any); scan result recorded
Conclusion & recommendation 2 Logical, safe, honest conclusion in plain language
Report completeness & safety 1 No unsafe actions; form fully filled
Common mistakes to avoid: running sfc without Administrator rights; deleting system files; disabling the antivirus;
formatting before backup; writing "confirmed" without a test; ignoring a possible hardware cause.
Instructor reference solution (abbreviated example):
Symptoms: slow start-up; occasional adverts; sound stopped after last week's update. Task Manager: top process "Update
Helper" at 45% CPU and 70% disk; 9 startup apps enabled, 3 marked High impact. Startup Apps: disabled "Photo Startup
Tool" (unnecessary). Disk: only 4 GB free of a 500 GB drive — very low. Disk Cleanup reclaimed 6.1 GB (temp files +
Recycle Bin). Event Viewer: Error — Event ID 7000 (Service Control) source Service Control Manager; Error — Event ID
7009; Error — Event ID *1001 (Windows Error Reporting). sfc /scannow : "Windows Resource Protection did not find any
integrity violations." Device Manager: yellow triangle on Realtek High Definition Audio. Antivirus: definitions up to
date; Quick Scan — no threats. Conclusion — likely causes: (1) too many startup programs + a very full disk → slow
start-up and slow file opening; (2) the sound device has a driver problem after the recent update. Recommendation:
keep three unnecessary startup apps disabled; empty the drive further and set up monthly Disk Cleanup; roll back the
audio driver or install the correct one from the laptop maker's site; restart and re-test the sound. Also run a S.M.A.R.T. check
(Session 5) because the drive is nearly full and slow reads can mask a failing drive. Plain-language summary: "Your
computer is starting too many programs at once and the storage disk is almost full, which is why it is slow. The sound
stopped because of a driver problem after an update. We can fix all three without losing your files."

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key below.)
Q1. Short answer. In one sentence each, what is a software fault and what is a hardware fault? Q2. Multiple choice. Which
Windows tool lets you see which programs are using the most CPU right now? a) Disk Cleanup b) Event Viewer c) Task Manager
d) System Restore Q3. Explain in your own words. Why is it dangerous to "just format" a computer first when the owner
complains of slowness? Q4. Practical instruction. What exact command checks and repairs corrupted Windows system files,
and how must the window be opened to run it properly? Q5. Matching. Match each symptom to the most likely cause:
1. Pop-ups and browser redirects
2. Sound stopped right after a Windows update
3. "Low disk space on C:"
4. Device shows a yellow triangle in Device Manager A. Driver problem B. Malware C. Full drive D. Missing/incorrect hardware
driver Q6. Scenario. A computer is slow and makes a soft clicking sound. Is this more likely software or hardware, and what
should you check first?
INSTRUCTOR ANSWER KEY (Q1–Q6)
A1. A software fault is a problem with programs, drivers, the operating system or data; a hardware fault is a problem with a
physical part. Software faults are fixed by cleaning/correcting/restoring the software; hardware faults are fixed by repairing or
replacing a part.
A2. (c) Task Manager.
A3. Because formatting erases everything, including the customer's personal files, and it may not even fix the problem — the
real cause could be a failing hard drive, in which case the fault returns and the data is gone. Always back up and diagnose first;
format only as a last resort.
A4. sfc /scannow . It must be run in a Command Prompt opened as Administrator (right-click Command Prompt → Run as
administrator).
A5. 1–B (malware), 2–A (driver problem), 3–C (full drive), 4–D (missing/incorrect driver). (Note both 2 and 4 are driver
issues; 2 is a driver problem triggered by an update, 4 is a general missing/wrong driver.)
A6. More likely hardware — a soft clicking sound plus slowness is the classic sign of a failing hard drive. Check
CrystalDiskInfo S.M.A.R.T. first, and back up the data immediately before anything else. (A memory/CPU fault is possible but
the click strongly points to the drive.)
Marking: award for correct concept. For Q5, accept 2–D and 4–A if the learner explains the driver reasoning clearly.

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today you learned that a computer can have perfect parts and still be very sick — because the problem
is in its software. You learned the common software faults (slow performance, malware, boot problems, driver issues, full disk)
and the Windows tools that find them: Task Manager (what is using CPU, memory and disk right now), Startup Apps (what
launches automatically), Event Viewer (the history of errors), sfc /scannow (repairing corrupted system files), chkdsk, Disk
Cleanup, System Restore, Safe Mode, and Device Manager (drivers). You also learned the safe approach to malware —
disconnect, full scan, quarantine, restart, re-scan, change passwords, educate — and, most importantly, how to decide whether
a fault is software or hardware before you act.
Five important takeaways:
1. A software fault is fixed by cleaning/correcting/restoring — never by replacing parts blindly.
2. Back up first. Never format before you have a backup and a diagnosis.
3. Task Manager shows the present; Event Viewer shows the past; sfc repairs system files.
4. Safe malware removal: disconnect → full scan → quarantine → restart → re-scan → passwords → educate.
5. Decide software or hardware first; a slow machine with clicking may be a failing drive.
Questions to help you recognise what you can now do:
Can I open Task Manager and name the biggest culprit?
Can I run sfc /scannow correctly as Administrator?
Can I explain the safe malware-removal steps in order?
Can I use Device Manager to fix a device that stopped working?
Can I tell whether a fault is software or hardware and say why?
Safety self-check (tick honestly):
I never disabled the antivirus.
I backed up before any destructive step.
I did not click unknown pop-ups or links.
I worked only on machines I had permission to use.
I asked the instructor when unsure.
Connection to the next session. You can now find faults — hardware and software. But finding a fault is only half the job.
Next session, Session 7 — Component Replacement, you will learn to choose compatible parts and physically replace them
— RAM, storage (including upgrading an old hard drive to a fast SSD), power supplies and GPUs — and verify the machine
afterwards. Diagnosis told you what is wrong; replacement makes it right.

## O. INSTRUCTOR EVALUATION NOTES (instructor-only)
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
The learner opens Task Manager first when investigating slowness, and reads the actual percentages.
The learner checks for a hardware cause (S.M.A.R.T., temperature) even when the problem "looks like software".
The learner runs sfc /scannow in an Administrator window without being reminded.
The learner follows the safe malware sequence in order and refuses to disable antivirus.
The learner backs up before any destructive action and says so out loud.
The learner explains the difference between "likely" and "confirmed".
Common misconceptions to watch for and correct:
"Slow always means virus." → Could be startup programs, a full/failing disk, too little RAM, or heat.
"Formatting is the fastest fix." → It destroys data and may not fix a hardware cause.
" sfc /scannow removes viruses." → No; it repairs system files only.
"Any free driver-updater website is fine." → Use Windows Update or the manufacturer's official site.
"Safe Mode is a permanent way to use the PC." → It is a temporary rescue tool.
Suggested remedial exercises for learners who struggle:
1. Tool-naming drill: show five symptoms and have the learner name the right tool for each, repeatedly, until fluent.
2. Order-the-steps drill: shuffle the malware-removal steps on cards and have the learner arrange them correctly.
3. Present-vs-past drill: give scenarios and ask "which tool — Task Manager or Event Viewer — tells me this?"
Differentiation:
Level 1 (supported): provide a step-by-step tool card with the exact clicks, and a partially completed report form; pair with
a stronger learner.
Level 2 (standard): the exercise as written.
Level 3 (challenge): present a mixed fault (e.g., a full disk and a suspicious process and a yellow-triangle device) and
require the learner to prioritise the fixes and justify the order, including a hardware sanity check.
Timing guidance: sfc /scannow and antivirus full scans are slow. Start sfc early in the practical and let it run while learners do
other checks; do not let a scan consume the whole session. Protect the guided practical (Section H). If short on time, convert
the case study to a two-minute discussion and keep the independent exercise, which is where the real diagnosis skill is practised.
APPENDIX 6A — 5-MINUTE HARDWARE-vs-SOFTWARE RECAP (only if needed)
If learners cannot distinguish hardware from software faults, do this before Section D.
1. Write on the board: Hardware = physical part. Software = instructions and data.
2. Say: "Hardware faults are fixed by repairing or replacing a part. Software faults are fixed by cleaning, correcting, updating,
restoring or reinstalling."
3. Quick drill — call out and have the class answer "H or S":
"Hard drive making a clicking sound." (H)
"Pop-ups on the desktop." (S)
"No power at all." (H)
"Sound stopped after a Windows update." (S)
"CPU at 95 °C." (H)
"USB flash drive infected from a friend." (S) Confirm each learner can answer before continuing.
END OF SESSION 6 — End of Week 2 (Diagnostics)
Next: Session 7 — Component Replacement.
