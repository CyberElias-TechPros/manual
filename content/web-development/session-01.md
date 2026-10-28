---
{
  "id": "web-development/session-01",
  "course": "web-development",
  "number": 1,
  "of": 12,
  "title": "JavaScript Setup, Variables and the Console",
  "free": true,
  "diagram": {
    "src": "/assets/concepts/web-development/session-01.png",
    "page": 4,
    "transcript": [
      "JAVASCRIPT SETUP, VARIABLES AND THE CONSOLE",
      "STEP 1: LINK YOUR JAVASCRIPT FILE FROM THE HTML PAGE",
      "HTML PAGE",
      "<body>",
      "<script src=...",
      "</script></body>",
      "PUT IT LAST",
      "The script tag goes at the",
      "bottom of the body so the",
      "page exists before JS runs",
      "BROWSER LOADS IT",
      "Open the page in Chrome",
      "and press F12 to open",
      "the Console panel",
      "SEE THE OUTPUT",
      "console.log(\"Hello\")",
      "shows in the Console",
      "clear it before you test",
      "HTML - what it IS",
      "Structure: headings, text, images",
      "The rooms of the house",
      "CSS - how it LOOKS",
      "Colour, fonts, layout",
      "Paint and decoration",
      "JAVASCRIPT - what it DOES",
      "Actions, decisions, data",
      "The switches and wires",
      "VARIABLES: let or const?",
      "const shopName = \"Ada Stores\";",
      "const = the value will NOT change (most common)",
      "let price = 4500; price = 5000;",
      "let = you know it will change later",
      "Rule of thumb: start with const, use let only when needed",
      "FOUR DATA TYPES (check with typeof)",
      "string - \"Chidi\" or 'Lagos'",
      "number - 4500",
      "boolean - true or false",
      "undefined - nothing set yet",
      "Print results: console.log(\"Total: \" + price) or `Total: ${price}`",
      "Math: + - * / - predict the answer, then run it",
      "3 BEGINNER ERRORS: 1. text without quotes 2. = assigns, === compares 3. wrong or misspelled script link",
      "If nothing runs, check the Sources panel - the browser may never have found your .js file",
      "NIGERIAN EXAMPLE",
      "const shopName = \"Ada Stores\"; let price = 4500; console.log(shopName + \" price: \" + price);",
      "The Console shows: Ada Stores price: 4500 - your first line of JavaScript output."
    ],
    "hotspots": [
      {
        "label": "JAVASCRIPT SETUP, VARIABLES AND THE CONSOLE",
        "x": 17.73,
        "y": 6.87,
        "w": 64.59,
        "h": 4.21,
        "mono": false
      },
      {
        "label": "STEP 1: LINK YOUR JAVASCRIPT FILE FROM THE HTML PAGE",
        "x": 27.09,
        "y": 15.88,
        "w": 45.79,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "HTML PAGE PUT IT LAST BROWSER LOADS IT SEE THE OUTPUT",
        "x": 7.15,
        "y": 22.33,
        "w": 80.44,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "The script tag goes at the Open the page in Chrome",
        "x": 29.93,
        "y": 25.61,
        "w": 35.94,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "<body> console.log(\"Hello\")",
        "x": 7.15,
        "y": 25.73,
        "w": 83.53,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "bottom of the body so the and press F12 to open",
        "x": 29.93,
        "y": 28.42,
        "w": 34.11,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "<script src=...",
        "x": 8.43,
        "y": 28.54,
        "w": 11.37,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "shows in the Console",
        "x": 75.51,
        "y": 28.66,
        "w": 10.86,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "</script></body>",
        "x": 8.43,
        "y": 30.9,
        "w": 12.14,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "page exists before JS runs the Console panel clear it before you test",
        "x": 29.93,
        "y": 31.01,
        "w": 56.71,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "HTML - what it IS CSS - how it LOOKS JAVASCRIPT - what it DOES",
        "x": 7.15,
        "y": 38.33,
        "w": 79.19,
        "h": 2.21,
        "mono": false
      },
      {
        "label": "Structure: headings, text, images Colour, fonts, layout Actions, decisions, data",
        "x": 7.15,
        "y": 41.58,
        "w": 72.85,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "The rooms of the house Paint and decoration The switches and wires",
        "x": 7.15,
        "y": 44.42,
        "w": 72.63,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "VARIABLES: let or const? FOUR DATA TYPES (check with typeof)",
        "x": 17.52,
        "y": 51.16,
        "w": 69.63,
        "h": 2.48,
        "mono": false
      },
      {
        "label": "const shopName = \"Ada Stores\";",
        "x": 7.15,
        "y": 57.82,
        "w": 22.84,
        "h": 2.15,
        "mono": true
      },
      {
        "label": "string - \"Chidi\" or 'Lagos' number - 4500",
        "x": 53.77,
        "y": 58.63,
        "w": 28.75,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "const = the value will NOT change (most common)",
        "x": 7.15,
        "y": 60.63,
        "w": 25.69,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "boolean - true or false undefined - nothing set yet",
        "x": 53.77,
        "y": 63.1,
        "w": 35.94,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "let price = 4500; price = 5000;",
        "x": 7.15,
        "y": 64.18,
        "w": 23.61,
        "h": 2.12,
        "mono": true
      },
      {
        "label": "let = you know it will change later Print results: console.log(\"Total: \" + price) or `Total: ${price}`",
        "x": 7.15,
        "y": 66.99,
        "w": 76.95,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "Rule of thumb: start with const, use let only when needed Math: + - * / - predict the answer, then run it",
        "x": 7.15,
        "y": 70.27,
        "w": 67.75,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "3 BEGINNER ERRORS: 1. text without quotes 2. = assigns, === compares 3. wrong or misspelled script link",
        "x": 7.15,
        "y": 76.51,
        "w": 74.15,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "If nothing runs, check the Sources panel - the browser may never have found your .js file",
        "x": 7.15,
        "y": 79.19,
        "w": 44.06,
        "h": 1.97,
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
        "label": "const shopName = \"Ada Stores\"; let price = 4500; console.log(shopName + \" price: \" + price);",
        "x": 7.15,
        "y": 87.79,
        "w": 48.02,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "The Console shows: Ada Stores price: 4500 - your first line of JavaScript output.",
        "x": 7.15,
        "y": 90.6,
        "w": 40.41,
        "h": 2.12,
        "mono": false
      }
    ],
    "width": 984,
    "height": 669
  },
  "module": "Week 1 — Module 1: JavaScript Foundations",
  "duration_minutes": 105,
  "difficulty": "Beginner (first contact with programming)",
  "prerequisite_knowledge": "HTML basics (tags, elements, attributes) and CSS basics (selectors, colours, simple layout). If a learner cannot write a basic HTML page with a heading and a paragraph, give them the 20 minute refresher in Appendix 1A before this session.",
  "connection_to_previous": "In the Web Design course learners built a static page — it looked good but did nothing when clicked. This session explains why pages can react, and introduces JavaScript, the language that makes a page alive."
}
---
# JavaScript Setup, Variables and the Console

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 1 — Module 1: JavaScript Foundations

**Recommended duration:** 105 minutes

**Difficulty:** Beginner (first contact with programming)

**Prerequisite knowledge:** HTML basics (tags, elements, attributes) and CSS basics (selectors, colours, simple layout). If a learner cannot write a basic HTML page with a heading and a paragraph, give them the 20 minute refresher in Appendix 1A before this session.

**Connection to previous work:** In the Web Design course learners built a static page — it looked good but did nothing when clicked. This session explains why pages can react, and introduces JavaScript, the language that makes a page alive.

**Preparation before class:** Academy PCs on and logged in; Google Chrome installed; Visual Studio Code installed; a practice folder per learner on the Desktop named webdev-practice ; ensure the projector/screen shares the instructor's Chrome DevTools.

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Explain in their own words the difference between HTML, CSS and JavaScript using a real-world comparison.
2. Write a valid HTML page that links an external JavaScript file using the <script> tag — without copying the instructor.
3. Open the Chrome DevTools Console and read, clear and use it to view output.
4. Declare variables using let and const , and justify which one to use in a given situation.
5. Identify the four primitive types used this week — string, number, boolean and undefined — and use typeof to inspect
them.
6. Print output to the console using console.log() , including combining text and variables with both concatenation ( + ) and
template literals ( ${ } ).
7. Perform arithmetic with + - * / on number variables and predict the result before running it.
8. Diagnose three beginner errors — an unquoted string, confusing = with == , and a missing/misspelled script link — and
correct them.

## C. Required Materials
<!-- kind:materials -->
Hardware
One computer per learner (academy desktops). A shared computer between two learners is acceptable; pair them so one
types and one reads errors aloud, then swap halfway.
Instructor computer connected to a projector or large screen.
Software
Google Chrome (any recent version). The Console and DevTools described here exist in all modern versions; the wording of
the tabs is stable.
Visual Studio Code (VS Code). Any version from 2022 onwards works.
Windows 10 or Windows 11.
Accounts
None required. All work this session is offline.
Sample files
The instructor prepares and shares a file starter/index.html and an empty starter/js/app.js (contents given in Section G).
Learners may also type these from scratch — recommended for muscle memory.
Worksheets
Worksheet 1.1 — "Name the Layer" (printed, 1 page).
Worksheet 1.2 — "My First Variables" (in the learner workbook, Part 3).
Tools
Chrome DevTools (built into Chrome — press F12 ).
Internet
Not required for this session. If the academy has internet, the instructor may optionally show the MDN page for
console.log at the very end, but do not depend on it.
Alternative for learners who lack a facility
Any laptop with Chrome and VS Code works. If a learner has only a phone, pair them with a desktop user for the session and
ask them to take photos of the code and practise typing the examples into a free online editor (e.g., a phone browser tab)
afterwards.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector, open a simple product page the class already recognises from Web Design — for example a
page showing "Hair Cream — ₦2,500" with a styled "Add to Cart" button. Do not open any code yet; show only the browser.
What the instructor says:
"Look at this page. It has a heading, a price and a nice button. If I click the button right now, what happens? … Nothing.
The page just sits there. But when you shop on Jumia or pay with your bank app, you click a button and the number
changes, a message appears, money moves. So what is the difference between this page and a page that reacts?
The difference is: this page was built with HTML for the content and CSS for the look. But it has no brain. Today we add the
brain. Its name is JavaScript."
Expected learner response: Learners may say "we need a backend", "the server does it", or stay silent. Accept all answers.
Confirm that some reactions do involve a server, but many happen right in the browser — and that is what they will do today.
Then demonstrate the hook: In the projector browser, press F12 , click the Console tab, type the following and press Enter:
```text
2 + 3
```
The console prints 5 . Say:
"This black panel is the Console. It is where JavaScript talks to us. In a moment, you will each type your own instructions
here and watch the computer obey. That is the beginning of programming."
Why this opener works: It creates a gap between what learners already built (static pages) and what they now want to build
(interactive pages), and it instantly gives them a taste of running code, so the session starts with doing, not listening.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Run this quickly as an oral round-robin. Put the three questions on the projector.
Question 1: "In HTML, what is the tag for the largest heading?"
Expected answer: <h1> .
Common gap: learners remember the concept but write <H1> or forget to close it. Remind them HTML tags are usually
lowercase in this course and must be closed.
Question 2: "In CSS, what do we call .price { color: red; } — what is .price ?"
Expected answer: a selector (a class selector). It picks the element(s) with class="price" and applies the colour red.
Common gap: confusing class selector . with id selector # . Re-state: dot = class, hash = id.
Question 3: "Where does the browser get the text the user sees — from the HTML file or the CSS file?"
Expected answer: HTML. CSS only styles it.
Common gap: some learners think CSS "holds" the text. Clarify with the analogy below.
Bridge to today (say this):
"Think of building a house. HTML is the blocks and walls — the structure and the things inside. CSS is the paint, tiles and
curtains — the appearance. JavaScript is the electricity and plumbing — the things that do something when you turn them
on. A house with only walls and paint is a static house: beautiful but dead. Today we switch on the electricity."
If more than a third of the class cannot answer Question 1, spend 10 extra minutes on the Appendix 1A HTML refresher before
continuing.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 What JavaScript actually is
The idea. A website is read by a piece of software called a browser (Chrome, Firefox, Edge, Safari). The browser understands
three languages:
1. HTML — the structure and content. What is on the page.
2. CSS — the presentation. How it looks.
3. JavaScript — the behaviour. How it responds.
Plain-English definition. JavaScript is a programming language that runs inside the browser and lets a web page do things:
react to clicks, check what a user typed, change text, remember choices, load data from the internet and show it on the page.
Why it exists. HTML and CSS cannot decide. They cannot say "if the password is wrong, show a warning" or "add this item's
price to a running total". A language capable of making decisions and calculations was needed, and it had to run in the browser
so the page could react immediately without waiting for a server. JavaScript is that language.
What it does. It stores information (variables), makes decisions (conditions), repeats work (loops), reacts to events (clicks,
typing), and changes the page (the DOM — later in this course).
Real-life comparison. Think of a printing press versus a computer. A printed flyer (HTML + CSS) shows exactly one version of
the information; it cannot change. A computer screen (HTML + CSS + JavaScript) can show different things depending on what
you type, click or ask for. JavaScript is what turns the printed flyer into an interactive screen.
Important limitation / misconception. "JavaScript" and "Java" are not the same language. The names are similar by historical
marketing accident. They are as different as car and carpet. Do not mix them up in a job interview.
How a learner recognises it. In any page's source code, JavaScript appears inside <script> ... </script> tags, or is linked via
<script src="..."></script> , or is written in code blocks that use words like let , function , if , const and console.log .
F.2 How JavaScript gets onto a page — the <script> tag
The browser only runs JavaScript it has been told about. We connect a JavaScript file to an HTML page using the <script> tag.
Two ways to include JavaScript:
Way 1 — internally (inside the HTML file):
```text
<script>
  console.log("Hello from inside the HTML file");
</script>
```
Way 2 — externally (separate .js file — the professional way, and the way we use in this course):
```text
<script src="js/app.js"></script>
```
Why we use the external file (the professional way):
It keeps HTML about structure and JavaScript about behaviour — each file does one job.
The same .js file can be reused by many pages.
The browser can cache (save) the .js file, so pages load faster on repeat visits.
Where to put the <script> tag — and why. Put it at the bottom of the <body> , just before </body> .
Reason: the browser reads a page from top to bottom. If the script is in the <head> and tries to find an element that appears
later in the page, that element does not exist yet, and the script fails with errors like "Cannot read properties of null". Placing the
script at the bottom means all the HTML elements already exist when the script runs.
Deeper note for the curious learner (optional): A more advanced option is to keep the script in the <head> and add the
word defer , e.g. <script src="js/app.js" defer></script> . The defer attribute tells the browser: "download this file now,
but wait until the whole page is built before running it." Both approaches are correct. In this course we use the bottom-of-
body approach because it is the easiest to reason about as a beginner.
Worked example — a complete, correct starting page:
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>CEA Web Dev Practice</title>
</head>
<body>
  <h1>My First JavaScript Page</h1>
  <p>Open the Console (press F12) to see the output.</p>
```
```text
  <script src="js/app.js"></script>
</body>
</html>
```
And in js/app.js :
```text
console.log("JavaScript is connected and running!");
```
What the learner sees: a normal web page with a heading and a sentence. In the Console, the line JavaScript is connected and
running! .
Consequence of getting it wrong: If the path in src is misspelled or points to the wrong folder, the page still shows, but the
Console stays empty and the Console tab shows a red error such as app.js:1 Failed to load resource: net::ERR_FILE_NOT_FOUND . We
troubleshoot this in Section K.
F.3 The Console — your programming window
The idea. The Console is a panel in the browser where JavaScript can print messages, and where you can type JavaScript directly
to test it.
Why it matters. As a beginner, you cannot "see" variables on the screen yet. The Console is how you look inside your program.
It is your number one debugging tool for the whole course.
How to open it: Press F12 in Chrome (or right-click the page → Inspect → Console tab). On some keyboards, Ctrl + Shift + J
opens it directly.
What it does:
Shows output from console.log(...) in your code.
Shows errors in red — very important.
Lets you type commands and press Enter to run them immediately, like a calculator and a scratchpad combined.
The command: console.log()
console is the browser's message window.
.log() means "write this message".
Everything inside the parentheses is the message.
```text
console.log("Hello, Ada");
console.log(2 + 2);
console.log("The year is", 2026);
```
Real-life comparison. console.log is like a loudspeaker announcement. You are not changing anything on the page yet; you
are simply announcing "here is the value right now" so you can hear (see) it.
Common misconception. Learners think that if they do not see output, their code "is not working". Often the code ran fine, but
the Console is filtered or closed, or the script is not connected. Section K covers the checks.
Try it live (instructor on projector): type in the Console directly:
```text
console.log("I can type commands here too");
```
F.4 Variables — naming and storing information
The idea. A variable is a named box that holds a value so you can use it again later.
Plain-English definition. Instead of writing the price 2500 five times in a program, you store it in a box labelled price and use
price everywhere. If the price changes, you change it in one place.
Why they exist. Programs need to remember information: a user's name, a total, whether someone is logged in. Variables are
how a program remembers.
Analogy. A variable is like a labelled jar in a kitchen. The jar is labelled "sugar". You can put sugar in it, take sugar out, or replace
the sugar with something else. The label stays the same; the contents can change (or be fixed — see const below).
Declaring a variable. "Declaring" means creating the box and giving it a value.
```text
let name = "Adaeze";
let age = 22;
const school = "Cyber Elias Academy";
```
Line by line:
let — "create a box that may change later".
name — the label of the box.
= — "put the value on the right into the box".
"Adaeze" — the value, in quotes because it is text.
; — the end of the instruction (a full stop for JavaScript).
let versus const :
Keyword Meaning Use it when
```text
let
```
A box whose contents can change. The value will be updated later, e.g. a shopping cart total.
```text
const
```
A box whose contents must not change after it is set. The value stays fixed, e.g. the shop name, the tax rate.
Rule of thumb for beginners: Use const by default. Only use let when you know the value must change. This prevents
accidental mistakes.
```text
let total = 0;            // will change as items are added
total = total + 2500;     // now 2500
total = total + 1200;     // now 3700, fine — it is a let
```
```text
const shopName = "Adaeze Fashion";  // will never change
```
What happens if you break a const :
```text
const shopName = "Adaeze Fashion";
```
```text
shopName = "Ada Collections";   // ERROR
```
The Console shows: Uncaught TypeError: Assignment to constant variable. This is JavaScript protecting you.
Naming rules and good habits:
Start with a letter, _ or $ . Not a number.
No spaces. Use camelCase: firstName , cartTotal , isLoggedIn .
Names are case-sensitive: total and Total are different boxes.
Use meaningful names: price is better than p ; studentName is better than x .
Do not use reserved words like let , const , if , function as names.
Common misconception. Learners write let name = Ada; without quotes. JavaScript then thinks Ada is a variable named Ada
(which does not exist) and throws ReferenceError: Ada is not defined . Text needs quotes. This is one of the three errors we
diagnose later.
F.5 Data types — what kind of value is in the box?
JavaScript cares about the kind of value. The four we use this week:
Type Meaning Examples Notes
string Text "Adaeze" , "₦2,500" , "hello world" Always in quotes.
number A numeric value 22 , 2500 , -8 , 3.14 No quotes. Used for maths.
boolean True or false only true , false Exactly two possible values.
undefined A box declared but not yet given a value let x; → x is undefined Means "no value yet".
typeof — asking JavaScript what type something is:
```text
let name = "Adaeze";
let age = 22;
let isOpen = true;
let emptyBox;
```
```text
console.log(typeof name);     // "string"
console.log(typeof age);      // "number"
console.log(typeof isOpen);   // "boolean"
console.log(typeof emptyBox); // "undefined"
```
Why typeof matters. In real work, a common bug is storing a number as text. "2500" (string) plus "1200" (string) gives
"25001200" — the computer glued the text together instead of adding! typeof helps you catch this.
Worked example — the text-versus-number trap:
```text
let a = 2500;      // number
let b = 1200;      // number
console.log(a + b);            // 3700  (maths — correct)
```
```text
let c = "2500";    // string (note the quotes)
let d = "1200";    // string
console.log(c + d);           // "25001200" (text joined — usually a bug!)
```
Say this to the class:
"A number in quotes is not a number to the computer; it is a word made of digits. '2500' is just as much text to JavaScript as
'Ada' is. This is one of the most common real-world bugs, so always check the type."
F.6 Working with strings — concatenation and template literals
The idea. We often need to join text and variables to form a sentence, e.g. "Hello Adaeze, your total is ₦3,700." JavaScript gives
us two ways.
Way 1 — Concatenation (the old way) with + :
```text
let name = "Adaeze";
let total = 3700;
console.log("Hello " + name + ", your total is ₦" + total);
// Hello Adaeze, your total is ₦3700
```
Note the spaces: "Hello " has a space at the end so the words do not run together. Beginners often forget it and get
HelloAdaeze .
Way 2 — Template literals (the modern, preferred way):
```text
let name = "Adaeze";
let total = 3700;
console.log(`Hello ${name}, your total is ₦${total}`);
// Hello Adaeze, your total is ₦3700
```
Three things to notice:
1. The text is wrapped in backticks ( ` ), not normal quotes. On most Nigerian keyboards the backtick is the key above Tab ,
often to the left of the 1 key. If unsure, the instructor will show it physically.
2. To insert a variable you write ${variableName} .
3. No messy spaces or + signs — the sentence reads naturally.
Why we prefer template literals: they are easier to read, harder to get wrong, and let you insert several variables cleanly.
Worked example — a receipt line:
```text
const item = "Hair Cream";
const qty = 2;
const price = 2500;
const total = qty * price;
```
```text
console.log(`${qty} x ${item} @ ₦${price} = ₦${total}`);
// 2 x Hair Cream @ ₦2500 = ₦2500... wait:
```
Careful — 2 * 2500 is 5000 , so the correct output is:
```text
2 x Hair Cream @ ₦2500 = ₦5000
```
Let the class catch this by predicting the result before you run it. If the projector shows 5000 , praise the learners who predicted
correctly.
F.7 Arithmetic — making the computer calculate
JavaScript does maths with familiar symbols:
Symbol Meaning Example Result
```text
+
```
Add
```text
10 + 5
15
```
```text
-
```
Subtract
```text
10 - 5
5
```
```text
*
```
Multiply
```text
10 * 5
50
```
```text
/
```
Divide
```text
10 / 5
2
```
```text
%
```
Remainder (modulo)
```text
10 % 3
1
```
The % operator explained simply: it gives the remainder after division. 10 % 3 is 1 because 3 goes into 10 three times (9)
with 1 left over. It is useful later for things like "is this number even?" ( number % 2 === 0 ).
Order of operations. JavaScript follows normal maths rules: multiplication and division before addition and subtraction. Use
brackets to be clear.
```text
console.log(2 + 3 * 4);    // 14, because 3*4=12 first, then +2
console.log((2 + 3) * 4);  // 20, because brackets first
```
Comments — notes for humans that the computer ignores:
```text
// This is a single-line comment. JavaScript ignores it.
let price = 2500; // comment can go at the end of a line too
```
```text
/*
  This is a multi-line comment.
  Use it to explain larger blocks later.
*/
```
Why comments matter in real work: In three months, you will not remember why you wrote a line. A short comment saves
future-you (and your teammates) a lot of time. But do not over-comment obvious lines.
F.8 Summary of the session
HTML = structure, CSS = appearance, JavaScript = behaviour.
Connect JavaScript with <script src="js/app.js"></script> at the bottom of the body.
The Console ( F12 ) shows output and errors — your main tool.
Variables store values: const for fixed values, let for values that change.
Types: string, number, boolean, undefined. Use typeof to check.
Join text with template literals `Hello ${name}` (preferred) or + .
Do maths with + - * / % .

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 What the instructor prepares
A folder on the Desktop: demo-webdev/week1/ containing:
```text
index.html
```
a subfolder js/ containing app.js
Both files open in VS Code.
Chrome open to the page, DevTools Console open.
G.2 Demonstration 1 — connecting the script (5 minutes)
Say: "Watch how the HTML page and the JavaScript file talk to each other."
Type (or paste) into index.html :
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tip Calculator Demo</title>
</head>
<body>
  <h1>Mama Ngozi's Restaurant — Tip Calculator</h1>
  <p>Open the Console with F12 to see the calculation.</p>
  <script src="js/app.js"></script>
</body>
</html>
```
Type into js/app.js :
```text
console.log("App started");
```
Do this on the projector:
1. Save both files ( Ctrl + S ).
2. Open index.html in Chrome (double-click it).
3. Press F12 , click Console.
4. Point at the printed line App started .
5. Ask the class: "How did the HTML page know to run this file?" → Because of the <script src="js/app.js"></script> line.
Then deliberately break it: change src to js/wrong.js , save, refresh.
Expected result: nothing printed, and a red error in the Console: Failed to load resource: net::ERR_FILE_NOT_FOUND .
Say: "This is the single most common beginner mistake — a wrong file name or folder. Now you know what it looks like."
Fix it back to js/app.js , save, refresh. Output returns.
Questions to ask during the demo:
"What would happen if I put the <script> line in the <head> instead?" (It would run before the HTML below exists — a real
problem once we start changing the page.)
"Why do we not write the JavaScript inside the HTML?" (Separation of concerns, reuse, caching.)
G.3 Demonstration 2 — variables and a running total (10 minutes)
Say: "Now let's do something useful — a restaurant bill with a tip."
Type into js/app.js :
```text
// Mama Ngozi's tip calculator — demo version
```
```text
const restaurant = "Mama Ngozi's Kitchen";
let foodPrice = 4500;   // naira
let tipPercent = 10;    // percent
```
```text
let tipAmount = (foodPrice * tipPercent) / 100;
let billTotal = foodPrice + tipAmount;
```
```text
console.log("Restaurant:", restaurant);
console.log("Food price: ₦" + foodPrice);
console.log("Tip (" + tipPercent + "%): ₦" + tipAmount);
```
```text
// Modern template-literal version:
console.log(`Total to pay: ₦${billTotal}`);
```
Walk through it line by line on the projector:
1. const restaurant — the name will not change, so const .
2. let foodPrice = 4500 — this could change tomorrow, so let .
3. tipAmount — the formula: price × percent ÷ 100. Explain why divide by 100: a percentage is "out of 100".
4. billTotal — food plus tip.
5. The last console.log uses backticks and ${ } .
Expected output in the Console:
```text
Restaurant: Mama Ngozi's Kitchen
Food price: ₦4500
Tip (10%): ₦450
Total to pay: ₦4950
```
Ask learners to predict tipAmount before you run it. (450.)
Now demonstrate the type trap live: change foodPrice to "4500" (in quotes), save, refresh.
Output becomes: Food price: ₦4500 (looks fine!) but Total to pay: ₦4500450 — wrong!
Say: "See how a number in quotes breaks the maths. This is why typeof exists." Run console.log(typeof foodPrice) to show
string .
Change it back to a real number (no quotes).
Common errors to show and correct during the demo:
Omitting a semicolon — usually still runs, but teach consistency.
Using = instead of == inside a comparison — not in this session, but mention it is coming.
A missing backtick for the template literal → red syntax error.

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: With the instructor guiding step by step, learners create their own working page with an external JavaScript file,
declare variables and print a personal introduction.
Starting materials: A new folder on each learner's Desktop called webdev-practice , containing an empty index.html and an
empty js/app.js (or learners create them; instructor shows both).
Procedure (instructor calls out each numbered step; learners follow on their machines; instructor walks the room):
1. Inside webdev-practice , create a folder named js .
2. Open VS Code. Open the webdev-practice folder (File → Open Folder).
3. Create index.html in the main folder with this content:
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Intro</title>
</head>
<body>
  <h1>About Me</h1>
  <p>Press F12 and open the Console.</p>
  <script src="js/app.js"></script>
</body>
</html>
```
4. Create js/app.js . Type:
```text
const fullName = "Blessing Okoro";   // use YOUR own name
let age = 21;                        // use YOUR own age
let city = "Port Harcourt";
let isStudent = true;
```
5. Add three lines to print:
```text
console.log("My name is " + fullName);
console.log(`I am ${age} years old and I live in ${city}.`);
console.log("Am I a student?", isStudent);
```
6. Save both files ( Ctrl + S ).
7. Open index.html in Chrome. Press F12 , Console tab.
8. Pause and predict: "What will the three lines look like before you run?" Have learners write their prediction on paper. Then
refresh and compare.
Expected result:
```text
My name is Blessing Okoro
I am 21 years old and I live in Port Harcourt.
Am I a student? true
```
Points to pause on and predict:
After step 4: "What type is isStudent ?" → boolean.
After step 5: "Will the second line print the number 21 or the text '21'?" → With ${age} the number is inserted as text in the
sentence, but typeOf age is still number.
Troubleshooting while walking the room:
Console empty → check the src path and that both files are saved.
ReferenceError: Blessing is not defined → the name was typed without quotes. Add quotes.
Strange characters (₦ shown as ? ) → file encoding. Instructor: save the file as UTF-8. (Explained in Section K.)
Completion checklist (learner ticks each):
index.html links js/app.js
app.js declares at least 4 variables
At least one const and one let used
Three console.log lines print
Template literal ` used at least once
Full name, age, city and boolean all appear in the Console

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Build a small "shop receipt" calculator on your own, without copying the instructor's restaurant example.
Scenario: You work at Chinedu Electronics in Port Harcourt. A customer buys 3 phone chargers at ₦1,800 each and a power
bank at ₦12,000. The shop adds a 7.5% VAT to the total.
Starting information (given):
Charger unit price: 1800
Charger quantity: 3
Power bank price: 12000
VAT percent: 7.5
Requirements:
1. Create a new page receipt.html and a js/receipt.js file linked at the bottom of the body.
2. Store the five values above in sensibly named variables. Use const where the value will not change.
3. Calculate:
chargerTotal = unit price × quantity
subtotal = chargerTotal + power bank price
vat = subtotal × VAT ÷ 100
grandTotal = subtotal + vat
4. Print a receipt to the Console using template literals, similar to:
```text
===== CHINEDU ELECTRONICS =====
3 x Charger @ ₦1800 = ₦5400
1 x Power Bank @ ₦12000 = ₦12000
Subtotal: ₦17400
VAT (7.5%): ₦1305
TOTAL TO PAY: ₦18705
```
Constraints:
All prices as numbers, not strings.
At least one const and one let .
No copying the restaurant code text — write it yourself.
Time allowance: 15 minutes.
Success criteria:
The Console shows the exact five calculated figures.
subtotal = 17400, vat = 1305, grandTotal = 18705.
The script is linked correctly and there are no red errors.
Hints available if stuck:
Hint 1: To multiply, use * . So chargerTotal = chargerPrice * quantity .
Hint 2: VAT of 7.5% means subtotal * 7.5 / 100 .
Hint 3: For the receipt lines, use a template literal, e.g. console.log(`Subtotal: ₦${subtotal}`); .
Instructor answer key (do not show learners):
```text
// receipt.js — Chinedu Electronics
const shopName = "CHINEDU ELECTRONICS";
const chargerPrice = 1800;
const chargerQty = 3;
const powerBankPrice = 12000;
const vatPercent = 7.5;
```
```text
let chargerTotal = chargerPrice * chargerQty;   // 5400
let subtotal = chargerTotal + powerBankPrice;   // 17400
let vat = (subtotal * vatPercent) / 100;        // 1305
let grandTotal = subtotal + vat;                // 18705
```
```text
console.log(`===== ${shopName} =====`);
console.log(`${chargerQty} x Charger @ ₦${chargerPrice} = ₦${chargerTotal}`);
console.log(`1 x Power Bank @ ₦${powerBankPrice} = ₦${powerBankPrice}`);
console.log(`Subtotal: ₦${subtotal}`);
console.log(`VAT (${vatPercent}%): ₦${vat}`);
console.log(`TOTAL TO PAY: ₦${grandTotal}`);
```
Marking guidance (out of 10):
Correct variables and types (2)
Correct subtotal (2)
Correct VAT (2)
Correct grand total (2)
Clean template-literal receipt output (1)
No console errors / correct linking (1)

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Blessing runs a small cake business from home, Blessing Bakes. She takes orders on WhatsApp and always calculates
prices by hand. Two weeks ago she quoted a customer ₦18,000 for a cake that actually cost her ₦21,000 to make — because she
forgot to add the cost of the cake board and candles. She lost money on the order.
Relevant facts.
Blessing's base cake price formula is: (flavour cost + decoration cost) + delivery .
She keeps adding extra items (candles, board, delivery) and forgets some.
She is not a programmer, but she has just learned variables.
Decision point. How can a tiny calculator reduce her mistakes?
Possible approaches.
1. Keep calculating by hand but write a paper checklist.
2. Build a simple JavaScript calculator that takes the costs as variables and prints the total, including all extras.
3. Pay someone to build a full app.
Recommended solution (for this stage). Approach 2. Blessing creates a page where each cost is a clearly named variable, and
the program prints a full breakdown and the total every time. This is exactly the skill learned today.
Example solution:
```text
const cakeFlavourCost = 9000;
const decorationCost = 6000;
const board = 1500;
const candles = 800;
const delivery = 2500;
```
```text
let total = cakeFlavourCost + decorationCost + board + candles + delivery;
```
```text
console.log("===== BLESSING BAKES QUOTE =====");
console.log(`Flavour: ₦${cakeFlavourCost}`);
console.log(`Decoration: ₦${decorationCost}`);
console.log(`Board: ₦${board}`);
console.log(`Candles: ₦${candles}`);
console.log(`Delivery: ₦${delivery}`);
console.log(`TOTAL QUOTE: ₦${total}`);
```
Output: TOTAL QUOTE: ₦19800 .
Trade-offs.
Approach 1 is free and immediate but still relies on memory — the very thing that failed.
Approach 2 takes 20 minutes to build but removes the forgetfulness permanently, and each line is named so a missing cost
is visible.
Approach 3 is overkill and expensive at this stage; it may be worthwhile later once Blessing adds online ordering.
Professional connection. This is exactly why junior developers write small "internal tools" — short programs that remove
human errors in repetitive tasks. The skill of naming variables clearly ( cakeFlavourCost ) and printing a readable breakdown is
directly used in real entry-level work.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
Use this table as the session's live troubleshooting guide. When a learner hits an issue, do not give the answer immediately —
ask them to check the relevant row.
K.1 Nothing appears in the Console
Symptoms: Page loads, but the Console is empty; no console.log output. Likely causes: (a) The script file is not linked. (b) The
src path is wrong. (c) The file was not saved. How to investigate: Press F12 → Console. Look for a red error mentioning the
file name. Also check the Sources tab to confirm the file is loaded. Ensure the src matches the real folder and file name
exactly. Safe corrective steps: Fix the path; save the file; refresh with Ctrl + F5 (hard refresh). How to confirm resolved: Your
console.log line now appears. How to prevent recurrence: Put the script at the bottom of the body; keep the .js inside a
js/ folder and copy the exact path.
K.2 ReferenceError: Ada is not defined
Symptoms: Red error naming a word you wrote. Likely cause: You wrote text without quotes, so JavaScript treated it as a
variable name (confirmed cause once you see no quotes in your code). How to investigate: Look at the line number in the
error; find that line; check whether text is in quotes. Safe corrective steps: Add quotes around text values: let name = "Ada"; .
How to confirm resolved: The error disappears and the value prints. Prevention: Whenever the value is a word, not a number,
wrap it in quotes.
K.3 The maths is wrong — numbers joined instead of added
Symptoms: 2500 + 1200 shows 25001200 instead of 3700 . Likely cause: The values are strings (they have quotes). How to
investigate: Run console.log(typeof yourVariable) . Corrective steps: Remove the quotes if you meant numbers, or convert with
Number("2500") . Prevention: Keep prices and quantities as numbers; only quote text.
K.4 Uncaught TypeError: Assignment to constant variable
Symptoms: Red error when reassigning. Likely cause: You used const but then changed the value. Corrective steps: Change
const to let if the value truly changes; otherwise do not reassign. Prevention: Default to const , switch to let only when
needed.
K.5 Template literal not working / "Unexpected token"
Symptoms: Red syntax error near a backtick or ${ } . Likely cause: You used normal quotes " or ' instead of backticks
around a ${ } expression, or a missing closing backtick. Corrective steps: Replace the outer quotes with backticks ` and
ensure they are matched. Prevention: Practise finding the backtick key (above Tab).
K.6 Strange symbols like ? instead of ₦
Symptoms: Naira sign shows as ? or a box. Likely cause: File saved in a non-UTF-8 encoding. Corrective steps: In VS Code
bottom-right, click the encoding, choose Save with Encoding → UTF-8, and include <meta charset="UTF-8"> in the HTML head.
Prevention: Always keep the <meta charset="UTF-8"> line.
Distinguish likely vs confirmed: In every case above, the likely cause becomes a confirmed cause only after you check it (e.g.,
see the exact red error text, or run typeof ). Teach learners to confirm before fixing.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "My Personal Tip Calculator"
Purpose: Practise variables, types, arithmetic and console output in a context the learner owns.
Realistic scenario: You are a waiter at a small restaurant in your area. Customers ask you to add a tip to their bill. You will build a
tiny calculator that takes a food price and a tip percentage and prints the tip and the total.
Detailed instructions:
1. Create a folder assignment1 with index.html and js/app.js .
2. In app.js , declare:
const restaurantName — your restaurant's name (invent one).
let foodPrice — choose any realistic amount (number, not string).
let tipPercent — choose 5, 10 or 15.
3. Calculate tipAmount and totalToPay .
4. Print a receipt with template literals, including the restaurant name, food price, tip percent, tip amount and total.
5. Add a second scenario by changing foodPrice and tipPercent and printing a second receipt below the first. (Tip: you may
reassign the let variables and print again.)
Required deliverables:
```text
assignment1/index.html
```
```text
assignment1/js/app.js
```
The Console output pasted (or photographed) into your workbook.
Submission format: Files zipped or shared in the class folder; screenshot/photo of the Console in the workbook.
Deadline: Before Session 2.
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
Correct file structure & linking 3 External app.js linked at bottom of body; no errors
Variables & types 4 Sensible names; prices as numbers; const / let used correctly
Correct calculations 5 Tip and total correct in both scenarios
Template literals used 3 Receipt reads cleanly with ${ }
Two scenarios shown 3 Two different receipts printed
Presentation / no errors 2 Clear output, no red errors
Common mistakes to avoid: quoting numbers; forgetting to reassign with let ; missing backticks; wrong file path.
Instructor reference solution:
```text
const restaurantName = "Taste of Naija Kitchen";
```
```text
let foodPrice = 5000;
let tipPercent = 10;
let tipAmount = (foodPrice * tipPercent) / 100;
let totalToPay = foodPrice + tipAmount;
```
```text
console.log(`===== ${restaurantName} =====`);
console.log(`Food: ₦${foodPrice}`);
console.log(`Tip (${tipPercent}%): ₦${tipAmount}`);
console.log(`TOTAL: ₦${totalToPay}`);
```
```text
// Second scenario
foodPrice = 8200;
tipPercent = 15;
tipAmount = (foodPrice * tipPercent) / 100;
totalToPay = foodPrice + tipAmount;
```
```text
console.log(`===== ${restaurantName} =====`);
console.log(`Food: ₦${foodPrice}`);
console.log(`Tip (${tipPercent}%): ₦${tipAmount}`);
console.log(`TOTAL: ₦${totalToPay}`);
```

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key.)
Q1. Short answer. In one sentence each, what does HTML, CSS and JavaScript do on a web page?
Q2. Multiple choice. Which is the correct way to link an external JavaScript file called app.js inside a js folder? a) <link
rel="js" href="js/app.js"> b) <script src="js/app.js"></script> c) <script href="js/app.js"> d) <js src="app.js">
Q3. Explain in your own words. Why do we usually place the <script> tag at the bottom of the <body> instead of in the
<head> ?
Q4. Practical identification. What data type is each value? Write string, number, boolean or undefined. a) "Port Harcourt" b)
2500 c) false d) let x; (x)
Q5. Error detection. Find and fix the mistake: let price = 2500; price = "two thousand"; then console.log(price * 2);
Q6. Scenario. A shop sells a bag for ₦7,500 and gives a 5% discount. Write (or describe) the two lines of JavaScript that compute
the discount amount and the final price.
INSTRUCTOR ANSWER KEY (Q1–Q6)
A1. HTML gives structure/content; CSS gives appearance/styling; JavaScript adds behaviour/interactivity. A2. (b) <script
src="js/app.js"></script> . A3. Because the browser reads top to bottom; if the script runs before the HTML elements exist, it
cannot find them and errors. Placing it at the bottom ensures all elements exist first. (Also accept the defer explanation.) A4. a)
string, b) number, c) boolean, d) undefined. A5. The bug is that price ends up as the string "two thousand" (if that was only
meant to be a comment) — price * 2 gives NaN (Not a Number) because you cannot multiply text. Fix: keep the numeric
value for calculations ( let price = 2500; let doubled = price * 2; ). If the string was accidental, remove the quotes. (Accept any
answer identifying the string/number mismatch and its consequence.) A6.
```text
let bag = 7500;
let discount = (bag * 5) / 100;   // 375
let finalPrice = bag - discount;  // 7125
```

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today you met JavaScript, the language that gives a web page a brain. You connected a .js file to an
HTML page with the <script> tag, opened the browser Console to see output, stored information in variables ( const and
let ), checked the type of a value with typeof , joined text and variables with template literals, and did arithmetic. You also
learned to spot real bugs such as numbers written as text and a mis-linked script file.
Five important takeaways:
1. HTML = structure, CSS = look, JavaScript = behaviour.
2. Link JavaScript with <script src="js/app.js"></script> at the bottom of the body.
3. const for fixed values, let for values that change.
4. Text needs quotes; numbers do not. Use typeof when unsure.
5. The Console ( F12 ) is where you see output and errors.
Questions to help you recognise what you can now do:
Can I create a page and link a JavaScript file without help?
Can I open the Console and read an error message?
Can I explain why "2500" + "1200" gives text and not 3700 ?
Can I write one template literal from memory?
Connection to the next session: Right now our programs run straight down, line by line, doing the same thing every time. Next
session we teach the program to make decisions — if this, then that — using conditions and if/else . That is the beginning
of programs that respond intelligently.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
Learner links the script correctly on the first or second try without being told the path.
Learner opens the Console unaided and reads the exact error text rather than guessing.
Learner chooses const vs let with a reason ("this total will change").
Learner predicts the output of simple arithmetic before running it.
Learner uses a template literal and can point to the backtick key.
Common misconceptions to watch for and correct:
"If I don't see output, my code is broken." → Often the script is not linked or not saved. Always check the Console's red
errors.
"JavaScript and Java are the same." → Correct immediately; they are unrelated.
"All numbers are numbers, even "500" ." → Run typeof to prove a quoted number is a string.
"Quotes are optional." → Explain why text needs them.
Suggested remedial exercises for learners who struggle:
1. Trace-the-output drills: give five console.log lines including typeof and ask learners to write the expected output on paper,
then run to check.
2. "Fix the broken page" drill: hand out a page where src is misspelled and a string is unquoted; ask the learner to find and fix
both.
3. Const/let sorting: give ten one-line examples and ask which keyword belongs.
Differentiation:
Level 1 (supported): provide a partially filled app.js with variable names already chosen and one console.log completed.
Level 2 (standard): the exercise as written.
Level 3 (challenge): add a discountPercent and compute the final total after both VAT and discount; also print how much
VAT and discount separately in naira.
Timing guidance: If the room is slow, drop the case study (Section J) to a 3-minute mention and protect the independent
exercise time — the practical is the priority.
APPENDIX 1A — 20-MINUTE HTML REFRESHER (only if needed)
If learners cannot produce a basic page, run this before Section D.
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Refresher</title>
</head>
<body>
  <h1>Largest heading</h1>
  <p>A paragraph of text.</p>
  <button>Click me</button>
</body>
</html>
```
Key points: every tag opens <tag> and closes </tag> ; the page lives inside <html> ; visible content goes in <body> ; class and
id attributes let CSS target elements. Confirm each learner can save and open this page before proceeding.
END OF SESSION 1
Next: Session 2 — Making Decisions: Functions, Conditions and If/Else.
