---
{
  "id": "web-development/session-10",
  "course": "web-development",
  "number": 10,
  "of": 12,
  "title": "Debugging, Validating and Optimising",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/web-development/session-10.png",
    "page": 179,
    "transcript": [
      "DEBUGGING, VALIDATION AND PERFORMANCE",
      "A BUG IS JUST A MYSTERY - FOLLOW THE 5-STEP DEBUGGING LOOP, NOT GUESSWORK",
      "1. REPRODUCE",
      "make the bug",
      "happen on demand",
      "2. READ THE",
      "ERROR",
      "red text first",
      "3. FIND THE",
      "LINE",
      "file:line in the",
      "stack trace",
      "4. LOG VALUES",
      "console.log each",
      "step until it breaks",
      "5. FIX + TEST",
      "change one thing,",
      "re-run the steps",
      "CONSOLE METHODS - YOUR BEST FRIEND",
      "console.log(value)",
      "console.warn(value)",
      "console.error(value)",
      "console.table(array)",
      "Read the stack trace from the TOP line - that is where it broke",
      "Click file:line to jump straight to the code in Sources",
      "3 RUNTIME ERRORS AND THEIR FIXES",
      "\"X is null\" - element not found yet",
      "\"X is not defined\" - typo or missing script tag",
      "\"X is not a function\" - wrong method name",
      "Each error names its own cause - believe it, then hunt that cause",
      "VALIDATE THE INPUT",
      "Check required fields, trim()",
      "the text, and reject empty or",
      "malformed values at the door",
      "ACCESSIBILITY CHECK",
      "Labels on every input, buttons",
      "with clear text, alt on images,",
      "keyboard can reach all controls",
      "PERFORMANCE HABITS",
      "Compress images, lazy-load",
      "heavy content, one request per",
      "file, no endless console spam",
      "FINAL TEST BEFORE SUBMISSION: walk through every page and button like a new visitor, then close",
      "DevTools and view it at 360px, 768px and 1024px. Fix what you find, then deploy.",
      "NIGERIAN EXAMPLE",
      "The \"Add to Cart\" button is dead. console.log shows the listener fires, so the bug is inside",
      "addToCart - and the stack trace points straight to the line with the typo in script.js."
    ],
    "hotspots": [
      {
        "label": "DEBUGGING, VALIDATION AND PERFORMANCE",
        "x": 21.06,
        "y": 6.87,
        "w": 57.91,
        "h": 4.21,
        "mono": false
      },
      {
        "label": "A BUG IS JUST A MYSTERY - FOLLOW THE 5-STEP DEBUGGING LOOP, NOT GUESSWORK",
        "x": 16.57,
        "y": 15.88,
        "w": 66.88,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "1. REPRODUCE 2. READ THE 3. FIND THE 4. LOG VALUES 5. FIX + TEST",
        "x": 8.89,
        "y": 22.45,
        "w": 81.46,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "ERROR LINE make the bug console.log each change one thing,",
        "x": 29.48,
        "y": 25.25,
        "w": 61.73,
        "h": 2.12,
        "mono": false
      },
      {
        "label": "happen on demand red text first file:line in the step until it breaks re-run the steps",
        "x": 8.67,
        "y": 27.94,
        "w": 81.97,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "stack trace",
        "x": 47.25,
        "y": 30.3,
        "w": 5.54,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "CONSOLE METHODS - YOUR BEST FRIEND 3 RUNTIME ERRORS AND THEIR FIXES",
        "x": 7.15,
        "y": 36.21,
        "w": 72.77,
        "h": 2.21,
        "mono": false
      },
      {
        "label": "console.log(value) console.warn(value)",
        "x": 9.89,
        "y": 40.78,
        "w": 34.52,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "\"X is null\" - element not found yet",
        "x": 54.07,
        "y": 40.87,
        "w": 18.98,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "console.error(value) console.table(array)",
        "x": 9.12,
        "y": 45.01,
        "w": 35.65,
        "h": 1.97,
        "mono": true
      },
      {
        "label": "\"X is not defined\" - typo or missing script tag",
        "x": 54.07,
        "y": 45.1,
        "w": 25.4,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "Read the stack trace from the TOP line - that is where it broke \"X is not a function\" - wrong method name",
        "x": 7.15,
        "y": 48.87,
        "w": 71.2,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "Click file:line to jump straight to the code in Sources Each error names its own cause - believe it, then hunt that cause",
        "x": 7.15,
        "y": 51.94,
        "w": 78.46,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "VALIDATE THE INPUT ACCESSIBILITY CHECK PERFORMANCE HABITS",
        "x": 7.15,
        "y": 58.54,
        "w": 77.05,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "Check required fields, trim() Labels on every input, buttons Compress images, lazy-load",
        "x": 7.15,
        "y": 61.79,
        "w": 75.43,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "the text, and reject empty or with clear text, alt on images, heavy content, one request per",
        "x": 7.15,
        "y": 64.63,
        "w": 76.08,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "malformed values at the door keyboard can reach all controls file, no endless console spam",
        "x": 7.15,
        "y": 67.43,
        "w": 75.78,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "FINAL TEST BEFORE SUBMISSION: walk through every page and button like a new visitor, then close",
        "x": 7.15,
        "y": 74.51,
        "w": 70.05,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "DevTools and view it at 360px, 768px and 1024px. Fix what you find, then deploy.",
        "x": 7.15,
        "y": 77.58,
        "w": 55.65,
        "h": 2.21,
        "mono": false
      },
      {
        "label": "NIGERIAN EXAMPLE",
        "x": 7.15,
        "y": 84.51,
        "w": 13.75,
        "h": 2.39,
        "mono": false
      },
      {
        "label": "The \"Add to Cart\" button is dead. console.log shows the listener fires, so the bug is inside",
        "x": 7.15,
        "y": 87.79,
        "w": 45.48,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "addToCart - and the stack trace points straight to the line with the typo in script.js.",
        "x": 7.15,
        "y": 90.6,
        "w": 41.02,
        "h": 2.12,
        "mono": false
      }
    ],
    "width": 984,
    "height": 669
  },
  "module": "Week 4 — Module 4: Polish and Deploy",
  "duration_minutes": 105,
  "difficulty": "Intermediate beginner",
  "prerequisite_knowledge": "Sessions 1–9. Learners must be able to: select DOM elements, render lists, handle events, use localStorage , build a three-page site and run it with Live Server. They must be comfortable opening the Console, because today we use it seriously.",
  "connection_to_previous": "In Session 9 the three-page shop worked — on your machine, when nothing went wrong. But real projects always have mistakes. Today we learn the professional habit that separates a beginner from someone employable: finding and fixing errors quickly and calmly, then validating and optimising so the site is correct, accessible and fast. This directly prepares the capstone and the Session 11 deployment."
}
---
# Debugging, Validating and Optimising

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 4 — Module 4: Polish and Deploy

**Recommended duration:** 105 minutes

**Difficulty:** Intermediate beginner

**Prerequisite knowledge:** Sessions 1–9. Learners must be able to: select DOM elements, render lists, handle events, use localStorage , build a three-page site and run it with Live Server. They must be comfortable opening the Console, because today we use it seriously.

**Connection to previous work:** In Session 9 the three-page shop worked — on your machine, when nothing went wrong. But real projects always have mistakes. Today we learn the professional habit that separates a beginner from someone employable: finding and fixing errors quickly and calmly, then validating and optimising so the site is correct, accessible and fast. This directly prepares the capstone and the Session 11 deployment.

**Preparation before class:** Academy PCs on. Chrome and VS Code installed. The instructor prepares two folders: demo week4-s10/broken/ (with the deliberate bugs) and demo-week4-s10/fixed/ (the corrected version). DevTools open and ready. If the academy has internet, the W3C validator pages can be shown; if not, explain using the saved example (Section F.7). Capstone link The capstone is marked partly on "presentation / no errors" and on a working deployed app. Debugging, validation, accessibility and performance are exactly what make the difference between a project that merely runs and a project that earns full marks.

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Apply the debugging procedure — read the error, locate the line, form a hypothesis, test, repeat — to a broken page
without panicking.
2. Use the Chrome DevTools Console, Sources panel and breakpoints to pause code, inspect variables, and step over/into
lines.
3. Use the console methods console.log , console.warn , console.error , console.table and console.assert appropriately, and
explain when each is best.
4. Read a stack trace and identify the top line as the location where the error occurred ( file:line ).
5. Diagnose and fix the three most common runtime errors: "Cannot read properties of null/undefined", "is not defined",
and "is not a function".
6. Validate HTML and CSS using the W3C validators and explain why validation matters even for beginners.
7. Apply basic accessibility — alt text, <label> tied to inputs, sufficient colour contrast and keyboard-accessible buttons —
and explain why it is professional and legally relevant.
8. Apply basic performance improvements — compress images, avoid repeated DOM work inside loops, and remove
unnecessary console.log calls from finished code.

## C. Required Materials
<!-- kind:materials -->
Hardware
One computer per learner (academy desktops). Pairing is fine with the swap method.
Instructor computer connected to a projector or large screen.
Software
Google Chrome (Console, Sources panel, breakpoints, device toolbar).
Visual Studio Code with the Live Server extension (used since Session 7).
Accounts
None required. The W3C validators ( validator.w3.org and jigsaw.w3.org/css-validator ) are free and need no login, but they
do need internet. If there is no internet, the instructor demonstrates the concept using the saved example in Section F.7.
Sample files
Instructor's two prepared folders: demo-week4-s10/broken/ and demo-week4-s10/fixed/ (all code in Appendix 10A). These
contain four deliberate bugs used throughout the session.
Worksheets
Worksheet 10.1 — "Find the Bug" (the broken code printed with space in the margin to write the diagnosis for each bug).
Worksheet 10.2 — "Accessibility Audit" (a checklist: every image has alt ? every input has a <label> ? contrast good?
buttons are real buttons?).
Tools
Chrome DevTools: Console, Sources, breakpoints, console.table , device toolbar.
W3C HTML validator and W3C CSS validator.
Internet
Needed only for the validators. Everything else works offline.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector, open the broken/index.html page from the prepared folder with Live Server. Open DevTools
( F12 ). The page will be nearly blank and the Console will show a red error.
What the instructor says:
"Last session, everything worked. Today I am going to show you failure — on purpose. This shop page is broken. Look at the
screen: almost nothing. Look at the Console: red text. And here is the truth nobody says out loud: every developer, every
day, sees screens like this. The difference between a professional and a beginner is not that professionals never get errors.
It is that they know how to find the error and stay calm.
Today you will learn a procedure — a recipe — for finding bugs, so you never stare at a red screen not knowing where to
start. By the end, you will take this broken page and fix every bug in it with me."
Expected learner response: Learners will feel relieved that errors are normal, and curious about the red text. Some may already
guess "the id is wrong" from Session 9.
Then demonstrate the hook: Point to the red error in the Console and read it aloud, slowly:
" Uncaught TypeError: Cannot read properties of null (reading 'innerHTML') at shop.js:11 . We are going to learn exactly what
every word of that means. By the end of this session, that sentence will not scare you — it will be a map to the fix."

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Run this quickly as an oral round-robin with the questions on the projector.
Question 1: "In Session 9, why does the cart badge show the same number on About and Contact as on the Shop?"
Expected answer: because every page reads the cart from localStorage and calls updateCartBadge() on load.
Common gap: learners forget that localStorage is the only thing that survives navigation. Remind them: today, if the badge
ever shows 0 wrongly, one of the first things to check is whether cart.js is loaded.
Question 2: "What file did we put the shared cart code in, and how many pages link it?"
Expected answer: js/cart.js , linked on all pages.
Common gap: learners link it on some pages only. Remind them a missing script tag produces a runtime error like "is not
defined".
Question 3: "From Session 9, why must the search box compare lowercased text on both sides?"
Expected answer: because "Ankara" and "ankara" are different to the computer; lowercasing both makes the comparison
case-insensitive.
Common gap: exactly this bug is planted in today's broken page. Tell them to watch for it.
Question 4: "Where do we put the <script> tag, and why?"
Expected answer: at the bottom of the <body> , so the HTML elements exist before the script tries to find them. (Or in the
head with defer .)
Common gap: this is directly related to today's "Cannot read properties of null" error — if the script runs too early,
getElementById returns null . Connect the two.
Bridge to today (say this):
"Reading the error, knowing where to look, and staying calm — that is the skill of debugging. Today it becomes a procedure
you can repeat for the rest of your career."
If more than a third of the class cannot answer Question 4, spend five extra minutes re-running the "script at the bottom"
demonstration before continuing.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 The debugging mindset — a procedure, not a talent
The idea. Debugging is the work of finding and fixing mistakes ("bugs") in code. It is not luck and it is not magic. It is a
procedure you can follow every single time.
Why it matters. Beginners often panic, change many lines at once, then cannot tell which change fixed or broke what.
Professionals change one thing at a time and test after each change. This is the single most important habit in this session.
The five-step procedure (write this on the board and repeat it all session):
1. Read the error first. Do not guess. The browser usually tells you what went wrong and where.
2. Find the line. The error names a file and a line number (for example shop.js:11 ). Go to that line.
3. Form a hypothesis. Say the cause out loud as a sentence: "I think grid is null because the id is misspelled."
4. Test the hypothesis. Change one thing that would confirm or disprove it, then refresh and read the error again.
5. Repeat until the error is gone, then test the feature manually (click, type, resize).
Plain-English definition. The error message is like a doctor's note. It tells you the symptom and the body part. Your job is to go
and look at that body part, not to take every medicine in the cupboard.
Analogy. Debugging is like tracing water from a leaking pipe. You do not rip out the whole wall. You follow the wet trail to the
exact spot, fix that spot, and check again.
Real-life comparison. A mechanic listening to an engine: a professional does not replace the whole engine. They listen, form a
theory ("that knock is a loose belt"), test it, and fix only that. Good debugging is professional listening.
Common misconception. "I should change many things at once so it gets fixed faster." Actually, changing many things at once
makes it impossible to know what fixed it — and risks adding new bugs. One change, then test.
Limitation. Not every bug shows an error. Some bugs are silent — the page looks fine but the result is wrong (for example, a
search that finds nothing because of capitalisation). For silent bugs you need console.log , console.table and console.assert to
see what your variables actually contain (Section F.3).
F.2 Chrome DevTools deep-dive
The idea. DevTools (Developer Tools) is the set of tools built into Chrome for inspecting and fixing a web page. We open it with
F12 . Three panels are essential today.
1. The Console. Already familiar from Session 1. It shows:
errors in red,
warnings in yellow,
and lets you type commands directly.
2. The Elements panel. Shows the live HTML (the DOM) after JavaScript has run. Right-click any element on the page →
Inspect to jump to it. Very useful to confirm an element's real id or class when a selector "cannot find" it.
3. The Sources panel — and breakpoints. This is new and powerful.
What a breakpoint is. A breakpoint is a marker you place on a line of code that tells Chrome: "pause the program here before
running this line." When paused, the whole program freezes and you can inspect every variable at that exact moment.
Why breakpoints exist. console.log shows you a value at the moment it runs, but it clutters the code and only shows what you
thought to print. A breakpoint lets you look at everything and step through the code line by line.
How to set a breakpoint (the steps):
1. Open DevTools → Sources tab.
2. On the left, open your file (for example shop.js ). If you cannot see it, open the Page section (it lists the files the page
loaded).
3. Click the line number in the left margin next to a line you want to pause on. A blue marker appears.
4. Refresh the page. Chrome stops at that line and the panel highlights it.
The controls once paused:
Step over — run the current line and stop at the next line (does not go into functions). The most used button.
Step into — if the current line calls a function, go inside that function.
Step out — finish the current function and return to where it was called.
Resume — continue running normally until the next breakpoint.
Watching a variable. While paused, the Scope pane (or hovering over a variable in the code) shows its current value. To keep an
eye on one specific variable as you step, use the Watch pane: click "+", type the variable name (for example term ), and its value
updates after every step. This is how professionals find the exact line where a value becomes wrong.
Say to the class: "A breakpoint is a pause button for your code. When you pause a footballer on video, you can see where every
leg is. A breakpoint lets you see where every variable is."
Important tip. Breakpoints only appear and pause if the correct file is loaded. If your JavaScript is inside the HTML ( <script>
block) rather than a separate file, look under the page's HTML document in the Page list.
F.3 The console methods — five tools, five jobs
console.log is only one tool. Professional code uses the right tool for the job.
1. console.log — general information.
```text
console.log("Products loaded:", products.length);
```
2. console.warn — a warning, not a crash, shown in yellow.
```text
console.warn("Cart is empty — nothing to total.");
```
Use it when something is unusual but not fatal.
3. console.error — a real problem, shown in red.
```text
console.error("Product grid not found. Check the id in index.html.");
```
Use it when the code cannot do its job. It also gives a stack trace (Section F.4).
4. console.table — the best way to look at an array of objects (like products). This is the star of today.
```text
const products = [
  { id: 1, name: "Ankara Dress", price: 18000, category: "Dresses" },
  { id: 2, name: "Aso Oke Gele", price: 7500, category: "Gele" },
```
```text
  { id: 3, name: "Beaded Necklace", price: 4500, category: "Jewellery" }
];
console.table(products);
```
The Console prints a neat table with one row per product and one column per property — instantly readable. When a filter
behaves strangely, console.table(products) lets you see the exact data.
5. console.assert — check an assumption and only shout if it is wrong.
```text
console.assert(products.length === 3, "Expected 3 products but found " + products.length);
```
console.assert(condition, message) does nothing if the condition is true ; if it is false , it prints an error with your message. It is
a quiet guard for assumptions.
Which to use when:
Method Colour Use it for
```text
console.log
```
normal General values and progress messages while developing
```text
console.warn
```
yellow Something odd but not fatal
```text
console.error
```
red Something that stops the code working
```text
console.table
```
normal Looking at arrays of objects (products, cart items)
```text
console.assert
```
red on failure Checking an assumption without cluttering success
A serious warning about leaving logs in. console.log is a development tool. Before you deploy (Session 11), remove the
debugging logs. They are not visible to normal users, but: (a) they make your Console noisy so real errors get lost, (b) printing a
large array in a loop is genuinely slow, and (c) on a real site, careless logs can leak information you did not mean to share. We
return to this in F.9.
F.4 Reading a stack trace
The idea. When an error happens, the Console prints not just one line but a stack trace — a list of the function calls that led to
the error, from the outermost call down to the exact failing line.
A real example:
```text
Uncaught TypeError: Cannot read properties of null (reading 'innerHTML')
    at render (shop.js:11)
    at shop.js:16
```
How to read it:
The first line tells you the type of error ( TypeError ) and the message ( Cannot read properties of null ).
The first at ... line is the most important: it is the exact place the error happened — file shop.js , line 11 , inside the
function render .
The lines below show who called that function — here, line 16 of shop.js called render .
Rule to remember: top line = where it broke. Always start at the top at line, not the bottom.
Plain-English definition. A stack trace is a breadcrumb trail. It shows you the path the program took, ending at the spot where it
fell over.
How to use it in the debugging procedure. Step 2 of our procedure ("find the line") is almost always answered by the top line
of the stack trace. Click it in Chrome and it opens the file at that line automatically.
Common misconception. "The bottom line is the problem." No — the bottom is where execution started; the top is where it
stopped. Read from the top.
F.5 The three most common runtime errors
A runtime error is an error that happens while the program is running (as opposed to a syntax error, which stops the file from
loading at all). These three cause the vast majority of beginner JavaScript pain.
Error 1 — Cannot read properties of null (reading '...') (or "of undefined").
What it means: your code tried to use a value that is null (nothing) or undefined (no value yet). Most often,
getElementById found no element.
The three usual causes:
1. Typo in the selector/id — the HTML has id="productGrid" but the JS asks for "product-grid" .
2. The element does not exist — you are on the About page but your script tries to find the shop's grid.
3. The script runs too early — the script is in the <head> (or the element is created later) so the element is not there yet.
Fix: match the id exactly (check the Elements panel), guard with if (!element) return; , and put the script at the bottom of
the body (or wrap in DOMContentLoaded / use defer ).
Error 2 — ReferenceError: produts is not defined .
What it means: you used a name that JavaScript does not know. Almost always a spelling mistake or a scope problem (the
variable was declared inside a function and used outside).
Fix: check the spelling letter by letter; confirm where the variable was declared; make sure it is declared before it is used.
Analogy: calling a person by a name they do not have. The compiler says "I do not know anyone called that."
Error 3 — TypeError: products.foreach is not a function .
What it means: you tried to call something as a function, but that thing is not a function. Usually a typo in a method name
( foreach instead of forEach ) or a wrong type (for example calling .toUpperCase() on a number).
Fix: spelling ( forEach , toString , filter are case-sensitive); check the value's type with typeof or console.log before
calling a method on it.
Say to the class: "Learn these three sentences by heart. If you can recognise them, you can fix maybe eight out of ten beginner
bugs."
F.6 Validating HTML and CSS
The idea. Validation is checking your code against the official rules of the language. For HTML the rules come from the W3C
(World Wide Web Consortium). For CSS there is a separate validator. A validator is a free online tool that reads your code and
lists anything the rules do not allow.
The two validators:
HTML: validator.w3.org ("Markup Validation Service").
CSS: jigsaw.w3.org/css-validator .
How to use the HTML validator:
1. Open validator.w3.org .
2. Choose the "Validate by Direct Input" tab.
3. Paste your whole HTML file, then click Check.
4. Read the results: Errors (must fix) and Warnings (should consider).
What it commonly catches:
Unclosed elements — you opened <div> and never closed it. The browser often guesses and your layout looks almost
right, which is why this is dangerous: it can break differently in different browsers.
A missing alt on an image — flagged for accessibility.
Nesting mistakes — a <section> closed while a <div> inside it is still open.
A missing charset — the validator reminds you to declare the character encoding.
Why validation matters even for beginners (the honest reasons):
1. The browser is forgiving; the next browser may not be. Browsers "fix" broken HTML silently in their own way. Your page
may look fine in Chrome and wrong in Safari or on a phone. Validation removes the guesswork.
2. Broken markup hurts accessibility. Screen readers rely on correct structure. An unclosed element can confuse them.
3. It is the professional baseline. "Does it validate?" is a standard, easy quality check a client or employer can ask. Passing it
shows discipline.
4. It often reveals a bug you have not seen yet. An unclosed <div> is frequently the cause of a mysterious layout problem.
Important limitation. Validation checks whether your code follows the rules — it does not check whether your design is good,
your JavaScript works, or your content is correct. A page can validate perfectly and still be an ugly, broken app. Validation is
necessary, not sufficient.
Say to the class: "Validation is like an inspector checking that your building obeys the building code. It does not tell you if the
building is beautiful, but it tells you it will not collapse."
F.7 Basic accessibility — building for everyone
The idea. Accessibility (often shortened to "a11y") means building so that people with disabilities — visual, motor, hearing,
cognitive — can still use your site. It is both a professional standard and, increasingly, a legal requirement.
Why it matters (professional and legal).
A blind user navigates with a screen reader that reads the page aloud. That reader depends on your markup.
A user with a motor disability may use only a keyboard, not a mouse.
A user with low vision needs enough contrast.
Legal relevance: many countries require accessible public services and commercial sites. In Nigeria, the Discrimination
Against Persons with Disabilities (Prohibition) Act 2018 establishes the rights of persons with disabilities — building a site
that excludes them is against the spirit and letter of that law. Globally, businesses have faced legal action over inaccessible
sites. Accessibility is not a favour; it is part of doing business honestly.
The four beginner essentials:
1. alt text on every image.
```text
<img src="images/ankara-dress.jpg" alt="Green and gold Ankara print dress on a mannequin">
```
What it is: a short text description of the image.
Why: a screen reader reads the alt aloud; if the image fails to load, sighted users see the text.
Rule: describe the purpose of the image briefly. Decorative images (pure decoration) can use alt="" (empty), which tells
the screen reader to skip them.
2. A <label> tied to every input.
```text
<label for="searchBox">Search products</label>
<input id="searchBox" type="text">
```
The for attribute on the label must match the id of the input. Then clicking the label focuses the input, and the screen
reader announces the label with the field.
Never rely on a placeholder alone as a label — placeholders disappear when the user types and are poorly announced.
3. Sufficient colour contrast.
Contrast is how different the text colour is from the background. Light grey text on white is hard or impossible to read.
The widely used accessibility guideline (WCAG) sets a minimum contrast ratio of 4.5:1 for normal-sized text and 3:1 for
large text. You do not need to memorise the maths; the practical rule is: dark text on light background, or light text on
dark background, and test it. We already use white on a dark purple header, which has good contrast.
Common failure: pink or light-grey text on white. Fix by darkening the text.
4. Keyboard-accessible buttons — use a real <button> .
```text
<!-- Good: a real button -->
<button class="add" data-id="1">Add to cart</button>
```
```text
<!-- Bad: a clickable div pretending to be a button -->
<div class="add" onclick="addToCart(1)">Add to cart</div>
```
A real <button> can be reached with the Tab key, activated with Enter/Space, and is announced as a button by screen
readers — all for free.
A clickable <div> gets none of this unless you manually add tabindex , role and keyboard handlers. So: use a real
button. Our product cards already do.
Bonus: focus visibility. When a keyboard user tabs onto a link or button, you must be able to see where the focus is. Never write
outline: none on interactive elements without providing a visible replacement.
Say to the class: "Accessibility is not extra work on top of the site. It is part of building the site correctly. A button that only
works with a mouse is an unfinished button."
F.8 Basic performance — make it fast
Performance means how quickly a page loads and responds. Slow sites lose customers. Three beginner-level wins:
1. Compress images.
A photo straight from a phone camera can be 4–8 MB. On a slow Nigerian mobile network that is many seconds of waiting.
Fix: resize images to the largest size you will actually display (often 1200px wide is plenty) and compress them. Free online
tools such as TinyPNG reduce the file size dramatically with almost no visible loss. Save images as JPEG for photos and
PNG/SVG for logos and icons.
In the code, always allow them to shrink: img { max-width: 100%; height: auto; } .
Optional advanced: add loading="lazy" to <img> tags below the fold, so the browser only loads them when the user scrolls
near them.
2. Avoid repeating DOM work inside loops.
Every time you touch the DOM (change innerHTML , append a child), the browser does work. Doing it once is fast; doing it
inside a loop over 60 products is slow.
The slow way (repeated DOM writes):
```text
list.forEach(function (p) {
  grid.innerHTML += "<p>" + p.name + "</p>";   // rewrites the WHOLE grid each time — slow
});
```
The fast way (build the string, write once):
```text
const html = list.map(function (p) {
  return "<p>" + p.name + "</p>";
}).join("");
grid.innerHTML = html;                          // one single DOM write
```
The .map(...).join("") builds one complete string in memory; we touch the DOM once. On a small list the difference is
invisible, but the habit is what professionals use, and on large lists it is the difference between smooth and janky.
3. Remove unnecessary console.log calls.
Logging is fast for one line, but a console.log inside a loop that runs thousands of times — or logging a large array
repeatedly — adds real work and clutters your error view. When you finish debugging, delete the debugging logs.
Bonus: trust the browser's cache and keep files small. Splitting CSS and JS once (as we did) lets the browser cache them for
return visits. Minifying (removing spaces from) final files is a later, automated step.
Say to the class: "A shop that loads in three seconds sells more than a shop that loads in ten. Performance is not vanity — it is
money."
F.9 Summary of the session
Debug with a procedure: read the error, find the line, hypothesise, test one change, repeat.
DevTools: Console (messages/errors), Elements (live HTML), Sources + breakpoints (pause and inspect).
Console methods: log , warn , error , table , assert — each with a purpose.
The stack trace's top line is where it broke ( file:line ).
The big three errors: null/undefined, is not defined, is not a function.
Validate HTML/CSS with the W3C tools; it is the professional baseline.
Accessibility: alt , tied <label> , contrast, real <button> — professional and legally relevant.
Performance: compress images, write to the DOM once, remove stray logs.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 What the instructor prepares
demo-week4-s10/broken/ containing index.html and js/shop.js (from Appendix 10A — the buggy version).
demo-week4-s10/fixed/ containing the corrected index.html and js/shop.js .
Live Server running on the broken folder. DevTools open.
A marker to write the five-step debugging procedure on the board (keep it visible all session).
G.2 Demonstration 1 — fix bug 1 (null error) and read the stack trace (5 minutes)
Say: "Let's follow the procedure, out loud, together. Step one: read the error."
Do this:
1. Refresh broken/index.html . The Console shows: Uncaught TypeError: Cannot read properties of null (reading 'innerHTML') at
render (shop.js:11) .
2. Read it aloud. Point to "TypeError" (the type), "Cannot read properties of null" (the message), and "shop.js:11" (the
location).
3. Click the top at render (shop.js:11) line in the Console — Chrome opens shop.js at line 11.
4. Hypothesis: " grid is null , so getElementById found nothing. I think the id in the HTML does not match." Open the
Elements panel, find the shop grid, and read its real id: productGrid .
5. Compare with the JS: it asks for "product-grid" . Confirmed cause.
6. Fix: change getElementById("product-grid") to getElementById("productGrid") . Save, refresh.
Expected result: the products now render; the red error disappears.
Ask: "Which line of the stack trace did we start from, and why?" (The top at line — that is where it broke.)
G.3 Demonstration 2 — fix bug 2 (is not defined) (3 minutes)
Say: "The page loads now — but the Console still has a red error. Read it."
1. Console shows: ReferenceError: produts is not defined at shop.js:16 .
2. Hypothesis: a spelling mistake. Look at line 16: console.log("Total products:", produts.length); .
3. Compare with the declaration at the top: const products = [...] . Confirmed: produts vs products .
4. Fix the spelling. Save, refresh.
Expected result: Total products: 3 prints with no error.
Ask: "What are the two usual causes of 'is not defined'?" (A spelling mistake, or using a variable outside the scope where it was
declared.)
G.4 Demonstration 3 — fix bug 3 (is not a function) with a breakpoint (4 minutes)
Say: "The page works, but only until I use the search. Watch what happens when I type."
1. Type a in the search box. Console shows: TypeError: products.foreach is not a function at shop.js:21 .
2. Explain: forEach is spelled with a capital E. foreach (all lowercase) does not exist, so JavaScript says "that is not a function."
3. Show a breakpoint: in Sources → shop.js , click the line number next to const filtered = products.foreach(...) . Refresh and
type. Chrome pauses. Hover over products in the Watch pane — it shows the array. Step over — the error occurs exactly on
that line.
4. Fix: change .foreach to .filter (correcting both the spelling and the logic — filter is what keeps matching items).
Save, refresh, type a .
Expected result: two products show (names containing "a"). No error.
Ask: "Why did filter work where foreach did not?" ( foreach is not a real method; filter is the array method that returns
matching items.)
G.5 Demonstration 4 — find bug 4 (silent logic bug) using breakpoints and console.table (3 minutes)
Say: "No red error now. But is the search correct? Type a product name in lowercase."
1. Type ankara (lowercase). The grid goes empty — but "Ankara Dress" should match! No error message. This is a silent bug.
2. This is when we need console.table and breakpoints. Open the Console and type:
```text
console.table(products);
```
Point at the table — the names have capital letters.
3. Hypothesis: the comparison is case-sensitive. "Ankara Dress".includes("ankara") is false because of the capital A.
4. Set a breakpoint on the return p.name.includes(term); line, refresh, type a letter. When paused, hover p.name (shows "Ankara
Dress" ) and term (shows "ankara" ). Confirmed.
5. Fix: change to p.name.toLowerCase().includes(term) . Save, refresh, type ankara .
Expected result: "Ankara Dress" now shows.
Ask: "Was there any red error for bug 4? How did we find it?" (No error; we found it by testing the feature and using
console.table plus a breakpoint to inspect values.)
G.6 Demonstration 5 — validate and audit (wrap-up, on the fixed page)
1. Paste the broken index.html into validator.w3.org (Direct Input). Point out the reported errors: an unclosed <div> , and
"An img element must have an alt attribute", plus the missing charset suggestion.
2. Paste the fixed index.html and click Check: "Document checking completed. No errors or warnings to show." (or at
most a benign warning).
3. Point at the fixed file: <label for="search"> , <img ... alt="..."> , real <button> s. Say: "These are the accessibility fixes, and
they cost us nothing."

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: In pairs, fix a fresh broken page using the five-step debugging procedure and DevTools, then validate and audit it.
Starting materials: the instructor copies a second broken page (Worksheet 10.1) to each pair. This one has the same types of
bugs but different names, so learners cannot simply copy the demo answers. The second broken page is given in Appendix 10B
(instructor-only until the review).
Procedure (instructor calls each step; learners work in pairs and write their diagnosis on the worksheet before changing
any code):
1. Open the broken page with Live Server and press F12 .
2. Do not change anything yet. Read the Console error aloud to your partner and write, on the worksheet, the error type and
the file:line.
3. Following the procedure (read → find line → hypothesise → test one change → repeat), fix bug A (the null error). Confirm the
fix by refreshing and seeing the products appear.
4. Fix bug B (the "is not defined" error). Confirm by refreshing with no red error.
5. Trigger the search; fix bug C (the "is not a function" error). Confirm by typing a letter.
6. Find bug D (the silent logic bug) by testing the search with a lowercase word, then use console.table() or a breakpoint to
prove the cause. Fix it.
7. Pause and predict before each fix: "What do I think will change when I make this one edit?" Write it down, then test.
8. Run the page through validator.w3.org and fix at least one validation error (likely the unclosed tag and the missing alt ).
9. Do a quick accessibility audit with Worksheet 10.2: is every input labelled? does the image have alt ? are the buttons real
<button> s?
Expected result:
All four bugs fixed; the page renders products, the search works case-insensitively, and there are no red Console errors.
At least one validation error fixed; the page re-validates cleanly (or with only benign warnings).
Points to pause on and predict:
Before fixing bug A: "Will the page reload and still show an error, or not? Why?" (The next error, bug B, will surface.)
Before fixing bug C: "What will the search do after this fix?" (It will run, but may still return wrong results because of the
silent bug.)
Before fixing bug D: "Why does typing Ankara work but ankara fail?" (Capitalisation.)
Troubleshooting while walking the room:
Learner changes three lines at once → stop them; insist on one change per test.
Learner cannot find the error line → show them how to click the top at line in the Console to jump to the source.
Learner fixes the spelling but not the logic ( .foreach → .filter needed, not just case) → ask them what filter returns
that forEach does not.
Learner cannot find a silent bug → direct them to console.table(products) and a breakpoint.
Completion checklist (learner ticks each):
Bug A (null) fixed; products render
Bug B (is not defined) fixed; no red error
Bug C (is not a function) fixed; typing works
Bug D (silent case bug) fixed; lowercase search matches
Used Console, and at least once used console.table or a breakpoint
Ran the W3C validator and fixed one HTML error
Completed the accessibility audit (Worksheet 10.2)
No red errors remain in the Console

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Take a small broken "Todo" app and fix a single reported TypeError , then improve it.
Scenario: Emeka built a quick to-do list for his cyber café to track repair jobs. He says: "When I click Add, nothing happens, and
the Console shows a red error. Also I want it to look professional." Your job is to fix it and polish it.
Starting information: the broken file below (also provided as todo-broken/index.html ):
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emeka's Jobs</title>
</head>
<body>
  <h1>Repair Jobs</h1>
  <input id="jobInput" type="text" placeholder="Describe the job">
  <button id="addBtn">Add</button>
  <ul id="jobList"></ul>
```
```text
  <script>
    const jobs = [];
```
```text
    document.getElementById("addBtn").addEventListener("click", function () {
      const input = document.getElementById("jobInput");
      const text = input.value.trim();
      if (text === "") return;
      jobs.push(text);
      renderJobs();
      input.value = "";
    });
```
```text
    function renderJobs() {
      const list = document.getElementById("joblist");
      list.innerHTML = jobs.map(function (job) {
        return "<li>" + job + "</li>";
      }).join("");
    }
  </script>
</body>
</html>
```
Requirements:
1. Find and fix the single runtime bug so that clicking Add adds a job to the list.
2. Write down, in your own words, the error type and the exact cause.
3. Add accessibility: a <label for="jobInput"> and make sure the button is a real <button> (it already is — confirm).
4. Run the fixed file through the W3C HTML validator and confirm no errors.
5. Optional (Level 3): make the input case-cleaned (trim is already there) and give each job a "Remove" button.
Constraints: change one thing at a time and re-test; do not rewrite the whole file; keep the code readable.
Time allowance: 15 minutes.
Success criteria:
Clicking Add with text adds an item to the list.
The Console shows no red errors.
The cause is written down in the learner's own words.
The page has a <label> tied to the input.
The file validates with no errors.
Hints:
Hint 1: read the top at ... line of the error and go to that line.
Hint 2: getElementById is case-sensitive. Compare the id in the HTML with the id in the JavaScript, character by character.
Hint 3: document.getElementById("jobList") versus document.getElementById("joblist") — look carefully.
Instructor answer key (do not show learners):
Bug: renderJobs() calls document.getElementById("joblist") , but the <ul> in the HTML has id="jobList" (capital L).
getElementById is case-sensitive, so it returns null , and the next line list.innerHTML = ... throws:
```text
Uncaught TypeError: Cannot read properties of null (reading 'innerHTML')
    at renderJobs (todo.html:22)
```
Fix:
```text
const list = document.getElementById("jobList");   // capital L, matching the HTML
```
Accessibility fix:
```text
<label for="jobInput">New job</label>
<input id="jobInput" type="text" placeholder="Describe the job">
<button id="addBtn">Add</button>
```
Optional Level 3 (remove + safe markup):
```text
function renderJobs() {
  const list = document.getElementById("jobList");
  list.innerHTML = jobs.map(function (job, index) {
    return '<li>' + job + ' <button class="remove" data-index="' + index + '">Remove</button></li>';
  }).join("");
}
// add a delegated listener on the list:
document.getElementById("jobList").addEventListener("click", function (event) {
  if (event.target.classList.contains("remove")) {
```
```text
    jobs.splice(Number(event.target.dataset.index), 1);
    renderJobs();
  }
});
```
Marking guidance (out of 10): correct id fix (4); error correctly explained (2); <label> tied to input (1); validation clean (1); no
red errors and Add works (2).

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Chinaza runs Chinaza Couture, a fashion label with an online shop. She is ready to launch. On the morning of
launch, she clicks "Buy" on her own site and nothing happens. Her developer is travelling and offline. She has a radio interview
in two hours and a link she promised to share on Instagram.
Relevant facts.
The page loads and looks perfect.
Clicking "Buy" does nothing.
She can open the site in Chrome and is willing to look at the Console if someone tells her what to do.
The site's JavaScript is in one file, js/cart.js .
Decision point. Should she (a) cancel the launch, (b) tell customers to order by WhatsApp and lose the online sales, or (c) try to
find and fix the bug quickly using DevTools?
Possible approaches.
1. Cancel/fallback. Safe but costly; the whole point of the launch was the online shop.
2. Open the Console and read the error. Follow the five-step procedure, form a hypothesis, test one change, and — if it
works — keep the launch.
3. Guess and randomly change code. Dangerous: risks breaking more than it fixes, just before a public launch.
Recommended solution. Approach 2. The Console will almost certainly name the file and line. In a typical launch-day bug, the
"Buy" handler is trying to read from an element that does not exist (a renamed id after a last-minute edit), producing a Cannot
read properties of null error. Reading the top line of the stack trace, checking the id in the Elements panel, and matching it fixes
it in minutes.
Example solution (the kind of fix this procedure finds):
```text
// BEFORE (bug): the button id was renamed in HTML but not in JS
const buyButton = document.getElementById("buyButton");   // returns null after rename
buyButton.addEventListener("click", addToCart);           // <-- error here
```
```text
// AFTER (fixed): match the real id shown in the Elements panel
const buyButton = document.getElementById("addToCart");
if (!buyButton) {
  console.error("Buy button not found — check the id in the HTML.");
} else {
  buyButton.addEventListener("click", addToCart);
}
```
Trade-offs.
Approach 1 is safe but abandons the launch goal and the effort already spent.
Approach 2 risks nothing extra: reading errors is free, and testing one change at a time cannot make things worse than they
already are. It turns a crisis into a five-minute fix.
Approach 3 is the worst option: changing many lines blindly before a launch is how small bugs become outages.
Professional connection. "Production is broken, find it fast" is one of the most valued skills in software teams. Senior
developers are not people who never see errors — they are people who can read an error, form a hypothesis, and test calmly
under pressure. That is precisely the procedure you learned today.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
Use this table as the live troubleshooting guide. When a learner is stuck, ask them to check the relevant row before giving the
answer, and always insist on one change at a time.
K.1 Red error: Cannot read properties of null (reading '...')
Symptoms: A red error mentioning null or undefined ; a feature does nothing. Likely causes: (a) A typo or case mismatch in
an id in getElementById . (b) The element does not exist on this page. (c) The script runs before the element exists (script in the
head, or above the element). Investigate: Click the top at line to jump to the code. In the Elements panel, confirm the real id.
In the Console type document.getElementById("yourId") and see if it returns null . Check typeof element . Corrective steps:
Match the id exactly (case-sensitive); guard with if (!element) return; ; move the script to the bottom of the body or use
DOMContentLoaded / defer . Confirm: The error disappears and the feature works. Prevent: Copy-paste ids between HTML and JS;
test each feature as you build it.
K.2 ReferenceError: something is not defined
Symptoms: Red error naming a word. Likely causes: (a) Spelling mistake in a variable/function name. (b) The variable was
declared inside a function but used outside (scope). (c) The declaration never ran because an earlier line threw. Investigate:
Look at the named word; search your file for where it was declared; check the Console for an earlier error. Corrective steps: Fix
the spelling; move the declaration to the right scope; fix any earlier error (errors cascade — the first is usually the real one).
Confirm: Error gone. Prevent: Consistent camelCase naming; declare variables before use.
K.3 TypeError: x.y is not a function
Symptoms: Red error when a method is called. Likely causes: (a) A typo/case error in a method name ( foreach , tolowercase ).
(b) Calling a method on the wrong type (e.g. .toUpperCase() on a number). Investigate: console.log(typeof x) to confirm the
type; compare the method name with the correct spelling. Corrective steps: Spell the method correctly ( forEach ,
toLowerCase ); convert the type first ( String(x) , Number(x) ). Confirm: Error gone. Prevent: Method names are case-sensitive;
check the type before calling.
K.4 The layout breaks on one browser or device but not another
Symptoms: Looks fine in Chrome on the laptop; wrong in Safari or on a phone. Likely cause: Invalid HTML — often an
unclosed element that the browser "guesses" how to fix differently. Investigate: Run the page through validator.w3.org .
Corrective steps: Fix the reported errors (usually unclosed tags); re-validate. Confirm: The validator reports no errors and the
layout is stable. Prevent: Validate before you consider a page finished.
K.5 A silent bug — right code, wrong result
Symptoms: No red error, but the result is wrong (empty search, wrong total). Likely causes: Logical mistakes: missing
.toLowerCase() , wrong comparison operator, off-by-one, comparing string to number. Investigate: console.table(products) or
a breakpoint with the Watch pane to inspect the actual values at the moment of the comparison. Corrective steps: Fix the logic
(e.g. lowercase both sides; use === ; convert types). Confirm: The feature gives the expected result. Prevent: Test features with
tricky input (mixed case, empty, boundaries).
K.6 The Console is full of old messages and you cannot find the error
Symptoms: Hundreds of console.log lines hide the one red error. Likely cause: Debugging logs left in the code, especially
inside loops. Investigate: Scroll to the very top; errors usually appear first. Use the Console's filter box and the "Errors only"
toggle (the default-level dropdown). Corrective steps: Use the clear button (🚫) on the Console toolbar; use the level filter;
remove debugging logs from the code. Confirm: The Console shows only real errors. Prevent: Delete logs when a feature is
finished; never log inside a tight loop.
K.7 Images make the page slow / huge
Symptoms: The page takes many seconds to load on a phone. Likely cause: Multi-megabyte images straight from a camera,
displayed small. Investigate: DevTools → Network tab → refresh → look at the image file sizes. Corrective steps: Compress
with a tool such as TinyPNG, resize to the needed dimensions, and add loading="lazy" for below-the-fold images. Confirm:
Image sizes drop sharply and the page loads faster. Prevent: Compress before adding any image to the project.
Distinguish likely vs confirmed. In every case, confirm before fixing: read the exact red error, run console.table or set a
breakpoint, or run the validator. Never change code on a hunch.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "Debug, Validate and Optimise Report"
Purpose: Prove you can take a broken page, fix it with a documented procedure, validate it, and improve its accessibility and
performance — the professional quality pass before deployment.
Realistic scenario: A client sends you a page that "does not work". You must find and fix the bugs, validate the code, and deliver
a short written report explaining each fix (clients love to see that you understand why, not just what).
Detailed instructions:
1. Use the broken page provided by your instructor (or the one in Appendix 10B, if released by your instructor).
2. Produce the fixed index.html and js/app.js (or shop.js ).
3. Write a debugging report with one row per bug:
# Error shown (type + message) File:line Cause Fix How I confirmed it
1
2
3
4
4. Run the fixed HTML through validator.w3.org and paste the result line ("No errors or warnings" or the list).
5. Complete the accessibility audit (Worksheet 10.2) and note any fixes you made ( alt , <label> , contrast, real buttons).
6. Note two performance improvements you made (for example, DOM written once, images compressed, logs removed).
Required deliverables:
The fixed HTML and JS files.
The completed debugging report table.
The validator result (screenshot or copied text).
The completed accessibility audit.
Submission format: Files plus the report in the class folder (or zipped). Deadline: Before Session 11.
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
Bugs correctly identified 5 All four bugs found, with accurate error type and file:line
Bugs correctly fixed 5 One-change-at-a-time approach; page works; no red errors
Debugging report clarity 3 Cause and fix explained in the learner's own words
Validation passed 3 HTML validates with no errors
Accessibility fixes 2 alt , tied <label> , real buttons, adequate contrast
Performance note 2 At least two sensible optimisations identified
Common mistakes to avoid: changing many lines at once; fixing the symptom by deleting the feature; leaving debugging logs
in; forgetting alt /labels; reporting "it works now" without explaining the cause.
Instructor reference solution: Appendix 10A (the fixed/ folder) is the reference for bugs A–D; the report should identify each
bug as shown in Section G. A strong report names the error type, the file:line from the stack trace, the cause in plain English, and
the single-line fix.

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key.)
Q1. Short answer. List the five steps of the debugging procedure in order.
Q2. Multiple choice. In a stack trace, which line tells you where the error happened? a) The bottom-most line b) The first line
after "Uncaught" c) The top-most at ... line d) The last line of the trace
Q3. Explain in your own words. What does the error Cannot read properties of null (reading 'innerHTML') usually mean, and
name two common causes.
Q4. Practical identification. Which console method would you use for each job? a) Print an array of product objects as a neat
table b) Print a warning in yellow about an empty cart c) Check an assumption and only shout if it is false d) Print a red, real
problem
Q5. Error detection. Find and explain the bug:
```text
const title = document.getElementById("titel");
title.textContent = "Welcome";
```
Q6. Scenario. A learner's search works when they type Ankara but finds nothing when they type ankara . There is no red error.
What is the bug, how would you prove it with DevTools, and what is the fix?
INSTRUCTOR ANSWER KEY (Q1–Q6)
A1. (1) Read the error first. (2) Find the line (from the stack trace). (3) Form a hypothesis. (4) Test one change. (5) Repeat until
fixed, then test the feature.
A2. (c) The top-most at ... line.
A3. The code tried to use a value that is null (nothing) — usually because getElementById found no element. Two common
causes: (a) a typo/case mismatch between the HTML id and the id used in JavaScript; (b) the script runs before the element
exists (script in the head, or above the element, without DOMContentLoaded / defer ).
A4. a) console.table ; b) console.warn ; c) console.assert ; d) console.error .
A5. The id in the HTML is likely title (or some other spelling), but the JS asks for "titel" — a typo. getElementById returns
null , so title.textContent = ... throws Cannot read properties of null (reading 'textContent') . Fix: match the id exactly. (Also
guard with an if .)
A6. The bug is a missing .toLowerCase() on the product name, so the comparison is case-sensitive ("Ankara Dress" does not
include "ankara"). Prove it by setting a breakpoint on the comparison line (or console.log ) to see that p.name is "Ankara Dress"
while term is "ankara" ; console.table(products) also shows the capital letters. Fix: return p.name.toLowerCase().includes(term); .

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today you learned that errors are normal and that debugging is a procedure, not a talent: read the
error, find the line, form a hypothesis, test one change, repeat. You went deep into DevTools — the Console, the Elements panel,
and the Sources panel with breakpoints, where you can pause code, inspect variables and step through it line by line (step over,
step into, step out). You learned the five console methods and when to use each, how to read a stack trace (top line = where it
broke), and how to recognise the big three errors: null/undefined, "is not defined", and "is not a function". You validated your
HTML/CSS with the W3C tools, made your pages accessible ( alt , tied <label> , contrast, real <button> ), and improved
performance (compressed images, one DOM write, no stray logs).
Five important takeaways:
1. Debug with a procedure: read the error, find the line, hypothesise, test one change, repeat.
2. The top line of a stack trace is where it broke ( file:line ).
3. Learn the big three errors by name: null/undefined, is not defined, is not a function.
4. Validate your HTML/CSS, and build accessible pages (alt, labels, contrast, real buttons).
5. Write to the DOM once, compress images, and remove debugging logs before deploying.
Questions to help you recognise what you can now do:
Can I read an error and go straight to the failing line?
Can I set a breakpoint and inspect a variable while paused?
Can I tell the difference between a silent logic bug and a runtime error?
Can I validate a page and fix a validation error?
Can I name two accessibility fixes and two performance fixes I actually made?
Connection to the next session: Your site now works, is valid, accessible and faster — and you can fix it when it breaks. It is
polished. The only thing left is to put it on the internet so the whole world (and your client) can see it. Next session: Session 11
— Deploying to GitHub Pages and Writing Documentation. You will create a GitHub account, upload your site, turn on
GitHub Pages, and share a real public link.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
Learner reads the Console error before touching any code.
Learner makes one change per test and refreshes to check.
Learner can interpret a stack trace's top line and jump to the source.
Learner uses console.table (not dozens of console.log s) to inspect arrays.
Learner distinguishes a silent logic bug from a runtime error and knows it needs inspection tools.
Learner runs the validator and corrects the reported errors.
Common misconceptions to watch for and correct:
"Errors mean I am bad at this." → Errors are normal; the skill is the procedure.
"Change many things at once to fix it faster." → One change per test, always.
"The bottom of the stack trace is the problem." → The top at line is.
"If there is no red error, the code is correct." → Silent logic bugs exist; test features with awkward input.
"Accessibility is extra." → It is part of building correctly and is legally relevant (Disability Act 2018).
"Validation makes my site good." → It makes it rule-compliant; it does not fix bad design or broken logic.
Suggested remedial exercises for learners who struggle:
1. Error naming drill: give ten one-line errors and ask learners to name each type and the first place to look.
2. Breakpoint drill: a small script with a wrong total; learner sets one breakpoint and uses the Watch pane to find the bad
variable.
3. Validator drill: hand out a file with two unclosed tags and one missing alt ; learner fixes and re-validates.
Differentiation:
Level 1 (supported): provide the broken page with the four bug locations marked in comments (but not the fixes); learner
fixes one at a time with the procedure sheet.
Level 2 (standard): the guided exercise and independent exercise as written.
Level 3 (challenge): add a fifth bug (a wrong comparison operator causing a silent wrong total), and require a written
debugging report; also require loading="lazy" and a compressed-image note.
Timing guidance: The live demo (Section G) and the guided bug hunt (Section H) are the heart of the session — protect them. If
the class is slow, compress the validation walkthrough (G.6) and the performance discussion (F.8) into short talks, but do not
skip: (a) reading the stack trace, (b) the breakpoint demonstration, and (c) the silent bug found with console.table . Those three
are the transferable skills of the session.
APPENDIX 10A — BROKEN AND FIXED SHOP PAGE
BROKEN VERSION: broken/index.html
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Adaeze Fashion — Shop (Broken)</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1>Adaeze Fashion Shop</h1>
  <section>
    <input id="search" type="text" placeholder="Search products">
    <div class="product-grid" id="productGrid">
  </section>
  <img src="images/ankara-dress.jpg">
  <script src="js/shop.js"></script>
</body>
</html>
```
Validation problems: unclosed <div> (error), <img> missing alt (error), missing <meta charset> (reminder).
BROKEN VERSION: broken/js/shop.js
```text
const products = [
  { id: 1, name: "Ankara Dress", price: 18000 },
  { id: 2, name: "Aso Oke Gele", price: 7500 },
  { id: 3, name: "Beaded Necklace", price: 4500 }
];
```
```text
const searchBox = document.getElementById("search");
```
```text
function render(list) {
  const grid = document.getElementById("product-grid");   // BUG 1: wrong id
  grid.innerHTML = "";                                     // throws: grid is null
  list.forEach(function (p) {
    grid.innerHTML += "<p>" + p.name + " — ₦" + p.price + "</p>";
  });
}
```
```text
render(products);
```
```text
console.log("Total products:", produts.length);            // BUG 2: typo (not defined)
```
```text
searchBox.addEventListener("input", function () {
  const term = searchBox.value.toLowerCase();
  const filtered = products.foreach(function (p) {         // BUG 3: foreach (not a function)
    return p.name.includes(term);                          // BUG 4: missing toLowerCase (silent)
  });
  render(filtered);
});
```
FIXED VERSION: fixed/index.html
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adaeze Fashion — Shop</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1>Adaeze Fashion Shop</h1>
  <section>
    <label for="search">Search products</label>
    <input id="search" type="text" placeholder="e.g. Ankara">
    <div class="product-grid" id="productGrid"></div>
  </section>
  <img src="images/ankara-dress.jpg" alt="Green and gold Ankara print dress on a mannequin" width="600" height="400">
  <script src="js/shop.js"></script>
```
```text
</body>
</html>
```
FIXED VERSION: fixed/js/shop.js
```text
const products = [
  { id: 1, name: "Ankara Dress", price: 18000 },
  { id: 2, name: "Aso Oke Gele", price: 7500 },
  { id: 3, name: "Beaded Necklace", price: 4500 }
];
```
```text
console.table(products);
console.assert(products.length === 3, "Expected 3 products but found " + products.length);
```
```text
const searchBox = document.getElementById("search");
```
```text
function render(list) {
  const grid = document.getElementById("productGrid");     // FIX 1: correct id
  if (!grid) {
    console.error("Product grid not found. Check the id in index.html.");
    return;
  }
  if (list.length === 0) {
    grid.innerHTML = "<p>No products match your search.</p>";
    return;
  }
  const html = list.map(function (p) {                     // one DOM write (performance)
    return "<p>" + p.name + " — ₦" + p.price.toLocaleString("en-NG") + "</p>";
  }).join("");
  grid.innerHTML = html;
}
```
```text
render(products);
```
```text
console.log("Total products:", products.length);           // FIX 2: correct name
```
```text
searchBox.addEventListener("input", function () {
  const term = searchBox.value.toLowerCase().trim();
  const filtered = products.filter(function (p) {          // FIX 3: correct method
    return p.name.toLowerCase().includes(term);            // FIX 4: lowercase both sides
  });
  render(filtered);
});
```
Note: once this page is validated and audited, the debugging console.log , console.table and console.assert lines should be
removed before deploying in Session 11 (keeping console.error in the guard is optional and harmless).
APPENDIX 10B — SECOND BROKEN PAGE (GUIDED EXERCISE, ANSWER KEY)
Instructor-only. Distribute to learners as guided/index.html .
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Emeka's Mini Shop</title>
</head>
<body>
  <h1>Emeka's Mini Shop</h1>
  <input id="find" type="text" placeholder="Find a product">
  <div id="items"></div>
  <img src="images/phone.jpg">
  <script>
    const item = [
      { id: 1, name: "Phone Charger", price: 1800 },
      { id: 2, name: "Power Bank", price: 12000 },
```
```text
      { id: 3, name: "Earbuds", price: 6500 }
    ];
```
```text
    function show(list) {
      const box = document.getElementById("itemList");   // Bug A: wrong id (real id is "items")
      box.innerHTML = "";
      list.forEach(function (x) {
        box.innerHTML += "<p>" + x.name + " — ₦" + x.price + "</p>";
      });
    }
```
```text
    show(items);
```
```text
    console.log("Count:", items.length);                  // Bug B: "items" is not defined (array is "item")
```
```text
    const findBox = document.getElementById("find");
    findBox.addEventListener("input", function () {
      const term = findBox.value.toLowerCase();
      const result = item.map(function (x) {               // Bug C: uses map (returns all, unchanged) instead of filter
        return x.name.includes(term);                      // Bug D: missing toLowerCase on x.name (silent)
      });
      show(result);
    });
  </script>
</body>
</html>
```
Answer key for Appendix 10B:
Bug A (null): getElementById("itemList") but the real id is items . → Uncaught TypeError: Cannot read properties of null
(reading 'innerHTML') at show . Fix: getElementById("items") .
Bug B (is not defined): show(items) and items.length reference items , but the array is named item . → ReferenceError:
items is not defined . Fix: rename consistently (prefer renaming the array to items , which reads better).
Bug C (wrong method / silent logic): item.map(...) returns an array of booleans, not the matching products, so show
receives booleans and prints undefined names. Fix: item.filter(...) .
Bug D (silent): missing .toLowerCase() on x.name . Fix: x.name.toLowerCase().includes(term) .
Validation: missing <meta charset="UTF-8"> is not present here, so the validator's main complaint will be the <img> missing
alt and a recommendation; also note the <input> has no <label> (accessibility, not a validator error).
END OF SESSION 10
Next: Session 11 — Deploying to GitHub Pages and Writing Documentation.
