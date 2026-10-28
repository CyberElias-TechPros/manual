---
{
  "id": "web-development/session-04",
  "course": "web-development",
  "number": 4,
  "of": 12,
  "title": "The DOM: Selecting and Changing the Page",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/web-development/session-04.png",
    "page": 59,
    "transcript": [
      "FETCH AND JSON: LOADING DATA FROM A FILE",
      "AN API IS LIKE A WAITER: your page asks, the kitchen answers with JSON",
      "JSON IS JUST TEXT WITH A RULE",
      "[ { \"name\": \"Meat Pie\",",
      "\"price\": 800, \"inStock\": true },",
      "{ \"name\": \"Chapman\", \"price\": 1200 } ]",
      "[ ] = array (list)",
      "{ } = object (thing)",
      "key: value pairs",
      "PROMISES IN PLAIN ENGLISH",
      "fetch() sends a request and gives you back",
      "a PROMISE - an answer that will arrive soon",
      "await = wait right here until it arrives",
      "async on the function lets you use await",
      "You do not need the deep theory yet - just use the pattern below",
      "THE FETCH PATTERN - COPY THIS SHAPE EVERY TIME",
      "1. async function",
      "loadProducts() {",
      "try {",
      "2. ask for the file",
      "await fetch(",
      "\"products.json\")",
      "3. read the data",
      "await response",
      ".json()",
      "4. loop the array",
      "data.forEach(",
      "showProduct)",
      "5. show it",
      "build DOM items",
      "on the real page",
      "ALWAYS HANDLE ERRORS",
      "catch (err) {",
      "message.textContent = \"Cannot load products\";",
      "Show a friendly message - never a blank screen",
      "THE2 MOST COMMON PROBLEMS",
      "1. Running from file:// - the browser blocks fetch",
      "Fix: open the page with Live Server",
      "2. Wrong file path - 404 error. Check name, folder, case",
      "NIGERIAN EXAMPLE",
      "Your shop list lives in products.json: { \"name\": \"Rice 5kg\", \"price\": 7500 }. The async function",
      "fetches it, loops through the array and prints each product card on the page. If the file is missing,",
      "the catch block shows \"Products could not load - please try again\" instead of an empty page."
    ],
    "hotspots": [
      {
        "label": "FETCH AND JSON: LOADING DATA FROM A FILE",
        "x": 20.83,
        "y": 6.87,
        "w": 58.36,
        "h": 4.21,
        "mono": false
      },
      {
        "label": "AN API IS LIKE A WAITER: your page asks, the kitchen answers with JSON",
        "x": 22.21,
        "y": 15.88,
        "w": 55.61,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "JSON IS JUST TEXT WITH A RULE PROMISES IN PLAIN ENGLISH",
        "x": 7.15,
        "y": 22.33,
        "w": 66.6,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "[ { \"name\": \"Meat Pie\",",
        "x": 7.15,
        "y": 26.33,
        "w": 17.52,
        "h": 2.15,
        "mono": true
      },
      {
        "label": "fetch() sends a request and gives you back",
        "x": 54.4,
        "y": 27.01,
        "w": 21.77,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "\"price\": 800, \"inStock\": true },",
        "x": 9.06,
        "y": 29.4,
        "w": 24.39,
        "h": 2.12,
        "mono": true
      },
      {
        "label": "a PROMISE - an answer that will arrive soon",
        "x": 54.4,
        "y": 29.82,
        "w": 22.74,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "{ \"name\": \"Chapman\", \"price\": 1200 } ]",
        "x": 7.15,
        "y": 32.45,
        "w": 28.93,
        "h": 2.12,
        "mono": true
      },
      {
        "label": "await = wait right here until it arrives",
        "x": 54.4,
        "y": 34.54,
        "w": 18.42,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "[ ] = array (list) { } = object (thing) key: value pairs async on the function lets you use await",
        "x": 9.66,
        "y": 36.78,
        "w": 64.42,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "You do not need the deep theory yet - just use the pattern below",
        "x": 53.12,
        "y": 40.87,
        "w": 31.47,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "THE FETCH PATTERN - COPY THIS SHAPE EVERY TIME",
        "x": 29.75,
        "y": 44.33,
        "w": 40.45,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "1. async function 2. ask for the file 3. read the data 4. loop the array 5. show it",
        "x": 8.67,
        "y": 50.9,
        "w": 80.51,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "loadProducts() { build DOM items",
        "x": 9.2,
        "y": 54.03,
        "w": 81.74,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "await fetch( await response data.forEach(",
        "x": 27.13,
        "y": 54.18,
        "w": 46.09,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "try { on the real page",
        "x": 12.39,
        "y": 56.87,
        "w": 78.39,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "\"products.json\") .json() showProduct)",
        "x": 25.6,
        "y": 56.99,
        "w": 47.24,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "ALWAYS HANDLE ERRORS THE2 MOST COMMON PROBLEMS",
        "x": 7.15,
        "y": 64.42,
        "w": 68.95,
        "h": 2.21,
        "mono": false
      },
      {
        "label": "1. Running from file:// - the browser blocks fetch",
        "x": 53.12,
        "y": 67.82,
        "w": 24.32,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "catch (err) {",
        "x": 7.15,
        "y": 67.94,
        "w": 9.91,
        "h": 2.12,
        "mono": true
      },
      {
        "label": "Fix: open the page with Live Server",
        "x": 54.4,
        "y": 70.75,
        "w": 17.46,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "message.textContent = \"Cannot load products\";",
        "x": 8.43,
        "y": 70.78,
        "w": 34.27,
        "h": 2.12,
        "mono": true
      },
      {
        "label": "2. Wrong file path - 404 error. Check name, folder, case Show a friendly message - never a blank screen",
        "x": 53.12,
        "y": 73.46,
        "w": 28.28,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "NIGERIAN EXAMPLE",
        "x": 7.15,
        "y": 79.34,
        "w": 13.75,
        "h": 2.36,
        "mono": false
      },
      {
        "label": "Your shop list lives in products.json: { \"name\": \"Rice 5kg\", \"price\": 7500 }. The async function",
        "x": 7.15,
        "y": 83.07,
        "w": 47.01,
        "h": 2.12,
        "mono": false
      },
      {
        "label": "fetches it, loops through the array and prints each product card on the page. If the file is missing,",
        "x": 7.15,
        "y": 86.15,
        "w": 48.77,
        "h": 2.09,
        "mono": false
      }
    ],
    "width": 984,
    "height": 669
  },
  "module": "Week 2 — Module 2: DOM & Events",
  "duration_minutes": 105,
  "difficulty": "Beginner (first time JavaScript changes what is on the screen)",
  "prerequisite_knowledge": "Session 1 — linking an external script at the bottom of the body, variables, console.log . Session 2 — functions, if/else . Session 3 — arrays, objects, arrays of objects, loops. A learner who cannot create an array of objects and loop through it should be paired for today and given the remedial loop drill in Section O. Connection to previous session In Session 3 everything happened in the Console — the products printed as text that only developers see. The actual web page never changed. Today we finally connect our data to the page itself: we make JavaScript find HTML elements, change their text and appearance, and create new elements so the product catalogue appears on screen for real users. This is the bridge from \"code that runs\" to \"a page that lives\".",
  "connection_to_previous": null
}
---
# The DOM: Selecting and Changing the Page

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 2 — Module 2: DOM & Events

**Recommended duration:** 105 minutes

**Difficulty:** Beginner (first time JavaScript changes what is on the screen)

**Prerequisite knowledge:** Session 1 — linking an external script at the bottom of the body, variables, console.log . Session 2 — functions, if/else . Session 3 — arrays, objects, arrays of objects, loops. A learner who cannot create an array of objects and loop through it should be paired for today and given the remedial loop drill in Section O. Connection to previous session In Session 3 everything happened in the Console — the products printed as text that only developers see. The actual web page never changed. Today we finally connect our data to the page itself: we make JavaScript find HTML elements, change their text and appearance, and create new elements so the product catalogue appears on screen for real users. This is the bridge from "code that runs" to "a page that lives".

**Preparation before class:** Academy PCs on and logged in; Chrome and VS Code open; learner webdev-practice folders available (from Sessions 1–3); projector showing VS Code and Chrome side by side (learners must see code change the page live). Have the learner's HTML/CSS shop page from Web Design available so the "before and after" is obvious. Print Worksheets 4.1 and 4.2. Whiteboard for drawing the DOM as a family tree.

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Explain what the DOM is in plain English, using the "family tree of elements" comparison, and explain why JavaScript can
change the page at all.
2. Select a single element using document.getElementById() and document.querySelector() .
3. Select many elements using document.querySelectorAll() , and loop over the result.
4. Read and change text using .textContent , and explain the difference and the safety warning for .innerHTML .
5. Change styles using .style , and add, remove and toggle classes with classList.add/remove/toggle .
6. Create a new element with document.createElement() and insert it into the page with appendChild() .
7. Explain why the <script> tag must be at the bottom of the <body> (recap from Session 1) now that the script touches
page elements.
8. Render an array of objects (the Session 3 products) into the real HTML page as a list, replacing the old static content.
9. Diagnose common DOM errors — Cannot read properties of null , a script running before the elements exist, and unsafe
use of innerHTML .

## C. Required Materials
<!-- kind:materials -->
Hardware
One computer per learner (academy desktops). Pairing is fine: one learner edits the HTML/JS, the other watches the browser
and predicts what will change; swap at the halfway point.
Instructor computer connected to a projector or large screen, able to show Chrome and VS Code together.
Software
Google Chrome (any recent version) — DevTools Console and the Elements panel are both used today.
Visual Studio Code (VS Code).
Windows 10 or Windows 11.
No new software. (The optional VS Code "Live Server" extension is part of the course toolset; if it is already installed, the
instructor may use it, but double-clicking the file in Chrome works fine and is what we rely on.)
Accounts
None required. All work is offline.
Sample files
The instructor prepares and shares demo-week2-s4/ containing:
index.html (a page with a heading, a paragraph, and an empty <ul id="product-list"> )
css/style.css (basic styling, including a .highlight class and a .low-stock class — full contents in Section G)
js/render.js (the Session 3 products plus the DOM rendering code — full contents in Section G)
Learners continue in webdev-practice with shop.html , css/style.css , and js/render.js .
Worksheets
Worksheet 4.1 — "Find the Element" (given an HTML page, learners write the correct selector for each named element; 1
page).
Worksheet 4.2 — "Text or Style?" (given intended effects, learners tick whether .textContent , .style , or .classList is the
right tool).
These live in the learner workbook (Part 3).
Tools
Chrome DevTools: the Console (F12) for output and errors, and the Elements panel for inspecting the DOM live.
Internet
Not required. If the academy has internet, the instructor may optionally show the MDN pages for document.querySelector
and Element.classList at the very end, but do not depend on it.
Alternative resources for learners lacking facilities
Everything runs offline on any laptop with Chrome and VS Code. A phone-only learner can pair with a desktop user as the
"browser watcher" — their job is to say out loud what changed on the page after each save and refresh. Ask them to
photograph the before/after page and the code, and to practise tomorrow in a free phone browser code playground. The
pair-swap method from Session 1 keeps every learner active.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector, open the learner's own HTML/CSS shop page from the Web Design course (static — shows
products but nothing reacts), with Chrome DevTools already open on the Elements panel. Do not open any JavaScript yet.
What the instructor says:
"Remember this page? You built it in Web Design. It looks fine. But watch — I am going to change the heading without
touching the HTML file, and without reloading the page."
Then, live in the Elements panel, double-click the <h1> text and type LIVE EDITED . The heading on the page changes
instantly.
"How did that happen? I did not open VS Code. I edited the page while it was running. That is possible because the
browser does not use your HTML file directly while you view it. It builds its own live copy of the page in memory — a
working model of the elements. That model is called the DOM — short for Document Object Model. And here is the key
idea of today: JavaScript is allowed to edit that live model too. When JavaScript changes the DOM, the screen updates
immediately — exactly like what I just did by hand."
Then prove the model is separate from the file: press Ctrl + R to refresh.
"Now the page reloads and my edit is gone — because I changed the live model, not the file. JavaScript changes the model
for the user right now; the file on disk stays as it is. That is normal and it is how every interactive website works."
Expected learner response: Learners usually say "wow" or "so that is how buttons work". Some will think the edit was saved to
the file — clarify with the refresh demonstration. Confirm that the file is untouched.
Why this opener works: It makes the invisible visible. Learners have used websites all their lives; now they see the mechanism
(the DOM) that lets code change a page, and they see it in two minutes by hand before any syntax appears.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Run this as a fast oral round-robin. Put the four questions on the projector.
Question 1: "Write the line of HTML that links a JavaScript file called render.js from a js folder — and say where it goes."
Expected answer: <script src="js/render.js"></script> , placed at the bottom of the <body> , just before </body> .
Common gap: putting it in the <head> . Remind them today this really matters: a script in the head runs before the
elements exist, and every selector will fail. (We will prove this in the demo.)
Common gap: using <link> instead of <script> . Remind: <link> is for CSS.
Question 2: "What is an array of objects, and give the shape for one product?"
Expected answer: a list of objects, e.g. [{ name: "Hair Cream", price: 2500, category: "Skincare" }, ...] .
Common gap: describing an object alone. Clarify: the array is the list; each object is one item.
Why it matters today: this is the exact data we will render onto the page.
Question 3: "In a loop, what does products[i].name mean, step by step?"
Expected answer: take the array products , get the item at index i , then read its name key.
Common gap: reading products.name directly. Remind: index first, then key.
Question 4: "What does a function's return do, compared with console.log ?"
Expected answer: return sends the value back so it can be used elsewhere; console.log only shows it to a human.
Why it matters today: we will build small functions that return elements or strings to insert into the page.
Bridge to today (say this):
"You can store a list of products and loop through them — but only you, the developer, could see the result, in the Console.
Today we take that same list and let the browser put it on the page, where your customer can see it. To do that, JavaScript
must find the elements and change them. That is the DOM."
If more than a third of the class cannot answer Question 2, run the 5-minute loop drill in Section O before continuing.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 What the DOM actually is
The idea. When a browser loads an HTML file, it does not keep the raw text. It reads the HTML and builds a live, in-memory
model of the page — a tree of objects, one object per element. That model is the DOM (Document Object Model).
Plain-English definition. The DOM is the browser's working model of the page while it is open. Every tag in your HTML
becomes a node in this model: the <html> , the <head> , the <body> , every <h1> , every <p> , every <li> . JavaScript can look
up any of these nodes and read or change it, and the browser immediately repaints the screen to match.
Why it exists. HTML alone is fixed text. To let code react and change a page, the browser needed to expose the page as
something a program can walk through and edit. The DOM is that bridge between code and screen.
Real-life comparison — the family tree. Picture a family tree. At the top is the great-grandparent <html> . Under it are two
children, <head> and <body> . Under <body> are more children — headings, paragraphs, lists — and those can have their own
children (a <ul> has <li> children). This is why we call it a tree, and why we speak of parent and child elements. Every
element is a member of one big family, and they are all related by nesting.
Important limitation / misconception. The DOM is not your HTML file. The file is the recipe; the DOM is the dish currently on
the table. You can add salt to the dish (change the DOM) without changing the recipe (the file). Refresh the page and the
browser cooks a fresh dish from the recipe again. This explains the opening activity perfectly.
Terms defined plainly:
Node / element — one item in the tree (e.g., a <p> ).
Select — find an element in the DOM so you can work with it.
Render — put content on the page so the user can see it.
Parent / child — the element that contains another / the element contained inside.
F.2 document — the entry point
The idea. JavaScript reaches the DOM through a built-in object called document . It represents the whole page.
Every selection command starts with document , followed by a dot, followed by the method:
```text
document.getElementById("title");
document.querySelector(".price");
```
Think of document as the front door of the house. You always enter through it, then move to the room (element) you want.
Say to the class: "If you ever forget how to start a DOM command, remember: it begins with the word document . The document
is the page."
F.3 Selecting one element — getElementById() and querySelector()
The goal. Before you can change anything, you must find it. There are two common ways to find a single element.
Way 1 — document.getElementById("...")
This finds the element whose id attribute matches. IDs are unique, so this always returns at most one element.
HTML:
```text
<h1 id="title">Adaeze Fashion</h1>
```
JavaScript:
```text
const title = document.getElementById("title");
```
getElementById — "get the element by its id".
"title" — the id without the # sign. (This is the most common beginner mistake — see Section K.)
Way 2 — document.querySelector("...")
This finds the first element that matches a CSS selector — the same selectors you already learned in Web Design. This is the
most flexible and most used method today.
```text
const title = document.querySelector("#title");     // by id (with #)
const firstPrice = document.querySelector(".price"); // by class (with .)
const firstPara = document.querySelector("p");       // by tag name
```
Notice the difference in style:
getElementById("title") — id without # .
querySelector("#title") — id with # , because it takes a CSS selector.
Say to the class: "You already know CSS selectors from Web Design. querySelector lets you reuse that exact skill to find
elements. Dot for class, hash for id — same as CSS."
Why two methods? getElementById is direct and fast for ids. querySelector is more flexible: it can find by class, tag, attribute, or
any complex CSS rule, and it matches the way you already think about styling.
Common misconception. querySelector returns only one element — the first match. If there are three .price elements, you
get the first one only. To get all of them, you need querySelectorAll (next section).
F.4 Selecting many elements — querySelectorAll()
The idea. To get all matching elements, use querySelectorAll .
```text
const allPrices = document.querySelectorAll(".price");
console.log(allPrices.length);   // for example, 4
```
It returns a list of elements (called a NodeList — you can treat it like an array for our purposes).
You read its .length , and you can loop over it exactly like the arrays from Session 3:
```text
allPrices.forEach(function (priceEl) {
  console.log(priceEl.textContent);
});
```
Why this matters. This is how you will loop through many products on a page. Session 3 taught you to loop over an array of
data; today you loop over an array of elements. The loop skill transfers directly.
Common misconception. Learners try to use .style or .textContent directly on the result of querySelectorAll , e.g.
allPrices.textContent = "..." . That does not work because allPrices is a list, not a single element. You must loop and act on
each priceEl inside.
F.5 Reading and changing text — .textContent vs .innerHTML
The idea. Once you have an element, you can read or set its text.
.textContent — the safe, plain-text way
```text
const title = document.querySelector("#title");
```
```text
console.log(title.textContent);   // reads: "Adaeze Fashion"
```
```text
title.textContent = "Adaeze Fashion — Port Harcourt";
```
When you assign to .textContent , the element's text is replaced with plain text. If that text contains angle brackets, they are
shown as literal characters, not treated as HTML. This is exactly what you want for names, prices, and messages — and it is safe
by default.
.innerHTML — the "interpret as HTML" way
```text
const box = document.querySelector("#box");
```
```text
box.innerHTML = "<strong>Big sale!</strong> today";
```
Here the <strong> is interpreted as HTML, so "Big sale!" appears bold. innerHTML reads and writes the HTML inside the
element.
The safety warning (say this clearly):
" .innerHTML is powerful but dangerous when the text comes from a user — for example a name typed into a form. If a user
types something that looks like HTML, the browser may run it as real code. This is called a script injection or XSS attack.
Rule for this course: use .textContent for anything a user typed, and reserve .innerHTML for HTML you wrote yourself."
Worked example showing the difference:
```text
const el = document.querySelector("#demo");
```
```text
el.textContent = "<b>Hello</b>";
// Page shows the literal text:  <b>Hello</b>
```
```text
el.innerHTML = "<b>Hello</b>";
// Page shows bold:  Hello
```
Real-life comparison. .textContent is like reading a note out loud exactly as written — the words are just words. .innerHTML is
like a builder who builds whatever the note describes — so if the note says "make a door", a door appears. Powerful, but you
would not let a stranger's note tell your builder what to build.
When to use which:
Situation Use
Plain words, names, prices, messages .textContent (default, safe)
You need to insert HTML that you wrote .innerHTML (use carefully)
Never with unsanitised user input .innerHTML is forbidden here
F.6 Changing how things look — .style and classList
JavaScript can change appearance in two ways.
Way 1 — .style (change one property at a time)
```text
const title = document.querySelector("#title");
```
```text
title.style.color = "crimson";
title.style.fontSize = "40px";
title.style.backgroundColor = "#f0f0f0";
```
Notes:
In CSS the property is font-size (with a hyphen). In JavaScript you write it in camelCase: fontSize , backgroundColor ,
borderRadius . The hyphen is not allowed in a dot property, so we join the words and capitalise.
The value must be a string (in quotes): "40px" , not 40px .
Way 2 — classList (swap whole CSS classes) — the professional way
Instead of changing many style rules in JavaScript, keep the styles in your CSS file and just add or remove a class:
CSS:
```text
.highlight {
  background-color: yellow;
  font-weight: bold;
}
```
```text
.low-stock {
  color: red;
}
```
JavaScript:
```text
const item = document.querySelector("#first-item");
```
```text
item.classList.add("highlight");      // add the class
item.classList.remove("highlight");   // remove it
item.classList.toggle("highlight");   // if present, remove; if absent, add
```
classList.add("name") — adds a class.
classList.remove("name") — removes it.
classList.toggle("name") — flips it on or off. Perfect for a "dark mode" button or an "active" menu item.
Why prefer classList over .style ? Because your design lives in one place — the CSS file. If the academy wants to change
the highlight colour tomorrow, you edit the CSS once; you do not hunt through JavaScript. This is the same "keep it in one
place" principle you met with functions in Session 2.
Real-life comparison. .style is putting on one piece of clothing at a time. classList.add("highlight") is putting on a
complete, pre-planned outfit that the designer (your CSS) already chose.
Say to the class: "Use .style for a quick one-off tweak; use classList when the look is something your CSS should own."
F.7 Creating elements — createElement() and appendChild()
The idea. So far we changed elements that already existed in the HTML. But when a page shows a list from data (your
products), there is no list yet — JavaScript must build the elements.
The two-step pattern:
1. Create the element: document.createElement("li") makes a new <li> that is not yet on the page.
2. Insert it: parent.appendChild(newElement) puts it at the end of a parent element.
```text
// 1. Find the parent that will hold the list
const list = document.querySelector("#product-list");   // a <ul>
```
```text
// 2. Create a new list item
const newItem = document.createElement("li");
```
```text
// 3. Give it some text
newItem.textContent = "Hair Cream — ₦2500";
```
```text
// 4. Put it into the page
list.appendChild(newItem);
```
Analogy. createElement is carving a wooden spoon in the workshop. appendChild is nailing it to the shelf so people can see and
use it. Creating alone does nothing visible; you must insert it.
Why this matters: This is the moment a static page becomes a dynamic page. Until now the products only existed in the
Console. Now they exist on the screen, created from data.
F.8 The .appendChild() position — a quick note
appendChild always adds to the end of the parent's children. That is normally exactly right for a list: first product, then second,
then third. Later in the course you will meet ways to insert at a specific position, but for building lists and carts, adding at the
end is precisely what you want.
A useful habit: before appending, clear last time's items if you are re-rendering (we will see why in Section K). One common
way is list.textContent = ""; at the start of a render, which empties the parent. You will use this in the capstone when filters
change the list.
F.9 Why the script goes at the bottom of the <body> (recap, now it truly matters)
In Session 1 we put <script> at the bottom of the body as a good habit. Today it becomes essential.
Recall that the browser reads the page top to bottom, building the DOM as it goes. If your script runs before an element exists
in the DOM, then when the script tries to find that element, the search returns nothing — null . Trying to use null throws the
famous error:
```text
Uncaught TypeError: Cannot read properties of null (reading 'textContent')
```
Worked comparison. Suppose the page is:
```text
<head>
  <script src="js/render.js"></script>   <!-- WRONG place -->
</head>
<body>
  <h1 id="title">Adaeze Fashion</h1>
</body>
```
And js/render.js starts with:
```text
const title = document.querySelector("#title");
```
```text
title.textContent = "New title";   // crashes: title is null
```
When the script runs, the <h1> has not been created yet (it appears later in the page), so querySelector finds nothing, title
is null , and .textContent on null throws. Move the script to the bottom of the body and the <h1> exists by the time the
code runs — no error.
Say to the class: "The DOM is built as the browser reads down the page. If your script runs too early, the elements are not there
yet. Put the script at the bottom of the body — then the whole page already exists."
Deeper note for the curious learner (optional): an alternative is to keep the script in the <head> with the defer
attribute, <script src="js/render.js" defer></script> , which waits until the page is built. We use the bottom-of-body
approach because it is easiest to reason about.
F.10 Putting it all together — rendering the Session 3 products onto the page
Here is the full picture. We reuse the array of objects from Session 3 and use a loop to build a <li> for each product, using
createElement + appendChild , and we reuse a formatting function from Session 2.
HTML (the shopping page):
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Adaeze Fashion — Shop</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1 id="title">Adaeze Fashion Shop</h1>
  <p id="intro">Our current products are listed below.</p>
```
```text
  <ul id="product-list">
    <!-- OLD static items (we will let JavaScript replace these) -->
    <li>Old product 1</li>
    <li>Old product 2</li>
  </ul>
```
```text
  <script src="js/render.js"></script>
</body>
</html>
```
JavaScript ( js/render.js ):
```text
// The same product data shape from Session 3
const products = [
  { name: "Hair Cream",  price: 2500, category: "Skincare" },
  { name: "Shea Butter", price: 1800, category: "Skincare" },
  { name: "Coconut Oil", price: 3200, category: "Haircare" },
  { name: "Herbal Soap", price: 1200, category: "Bath" }
];
```
```text
// A function to format ONE product into a text line (Session 2 + 3)
function formatProduct(product) {
  return `${product.name} — ₦${product.price} [${product.category}]`;
}
```
```text
// 1. Find the list on the page
const list = document.querySelector("#product-list");
```
```text
// 2. Clear the old static items
list.textContent = "";
```
```text
// 3. Loop over the data and build a list item for each product
for (const product of products) {
  const li = document.createElement("li");
  li.textContent = formatProduct(product);
```
```text
  // 4. Flag expensive items with a CSS class
  if (product.price > 3000) {
    li.classList.add("highlight");
  }
```
```text
  // 5. Insert it into the page
  list.appendChild(li);
}
```
```text
// 6. Update the heading and intro using the DOM
document.querySelector("#title").textContent = "Adaeze Fashion Shop — Fresh Stock";
document.querySelector("#intro").textContent =
  `We have ${products.length} products in stock today.`;
```
Expected on-page result: the <ul> no longer shows the two "Old product" lines. Instead it shows four lines:
```text
Hair Cream — ₦2500 [Skincare]
Shea Butter — ₦1800 [Skincare]
Coconut Oil — ₦3200 [Haircare]     ← highlighted background (price > 3000)
Herbal Soap — ₦1200 [Bath]
```
The heading now reads "Adaeze Fashion Shop — Fresh Stock", and the paragraph reads "We have 4 products in stock
today."
Say to the class: "Look carefully. The HTML still has the old static list in the file. But the user sees the fresh list, because
JavaScript replaced the DOM. This is the whole point of the DOM: the file is the starting point; the live model is what the user
experiences, and our code controls it."
F.11 Summary of the session
The DOM is the browser's live tree/model of the page; JavaScript edits it and the screen updates.
Select: document.getElementById("id") (no # ), document.querySelector("css") (first match, uses CSS selectors),
document.querySelectorAll("css") (all matches, loop over them).
Text: .textContent for plain text (safe); .innerHTML interprets HTML — avoid with user input (XSS).
Look: .style.color for one-off tweaks; classList.add/remove/toggle to swap whole CSS classes (preferred).
Build: document.createElement("li") then parent.appendChild(li) .
Keep the <script> at the bottom of the body so elements exist before the script runs.
Render data by looping an array of objects and creating elements for each.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 What the instructor prepares
demo-week2-s4/index.html , css/style.css , js/render.js open in VS Code; Chrome open to the page; DevTools Console ready
and the Elements panel reachable.
Whiteboard with a small DOM tree drawn: html → body → (h1, p, ul → li, li) .
G.2 Demonstration 1 — select and change text/style (5 minutes)
Say: "First, let us find an element and change it — the simplest DOM action."
Type into render.js :
```text
const title = document.querySelector("#title");
console.log(title);                 // shows the <h1> element
```
```text
title.textContent = "Welcome to Adaeze Fashion!";
title.style.color = "crimson";
```
Do on the projector:
1. Save ( Ctrl + S ). Refresh the page ( Ctrl + R ).
2. Point at the heading: the text changed and it is now red.
3. Open Console: console.log(title) shows the <h1> element (hovering highlights it in the page).
4. Pause and ask: "If I put this script in the <head> instead, what would happen?" Then actually move it to the head, save,
refresh → red error Cannot read properties of null . Move it back.
Say: "This is why the script lives at the bottom of the body. The element must exist before we search for it."
Error to inject: change querySelector("#title") to querySelector("#titel") (typo) → title is null → red error Cannot read
properties of null (reading 'textContent') .
Say: "The # means id, and the id must match the HTML exactly. A single wrong letter gives null . Check the spelling and
the # ."
Questions to ask:
"Why #title and not .title ?" (Because in the HTML it is id="title" , and # selects by id.)
"Why is the value '40px' in quotes?" (Style values are strings.)
G.3 Demonstration 2 — querySelectorAll and looping (4 minutes)
Say: "Now let us find many elements at once."
First, temporarily add some prices to the HTML so there is something to select:
```text
<span class="price">₦2500</span>
<span class="price">₦1800</span>
<span class="price">₦3200</span>
```
Type in render.js :
```text
const prices = document.querySelectorAll(".price");
console.log(prices.length);          // 3
```
```text
prices.forEach(function (priceEl) {
  priceEl.style.color = "green";
});
```
Save, refresh → all three price spans turn green, and the Console prints 3 .
Ask: "Why did I use querySelectorAll and not querySelector ?" (Because I want all three; querySelector gives only the first.)
Error to inject: try prices.style.color = "green"; (no loop) → nothing turns green and often an error. Say: "A list does not
have a single style — you must loop and act on each element."
G.4 Demonstration 3 — render the products (6 minutes)
Say: "This is the big one — turning your Session 3 data into a real list on the page."
Type (or paste) the full render.js from Section F.10, and make sure the HTML has an empty <ul id="product-list"> .
Walk through the code aloud, one block at a time:
1. The products array — "exactly what you built in Session 3."
2. formatProduct — "a function that returns one line of text; we reuse it here."
3. document.querySelector("#product-list") — "find the empty list."
4. list.textContent = ""; — "clear anything already in it, so we do not duplicate."
5. The loop with createElement("li") , textContent , classList.add , appendChild — "create a row, write its text, maybe add a
class, then attach it to the list."
Pause and predict before the first run: "How many list items will appear, and which one is highlighted?" (Four items; Coconut
Oil, because its price is over ₦3000.)
Expected on-page result: four products listed; Coconut Oil highlighted. The heading and intro paragraphs also update.
Then demonstrate a real-world interaction manually (preview of next session): in the Console, type:
```text
products.push({ name: "New Balm", price: 1500, category: "Skincare" });
```
and re-run the loop by refreshing. Point out that the extra product appears — because the page is built from the data.
Common errors to show and correct:
Forgetting appendChild → the created <li> never appears (create ≠ insert).
Using .textContent on the querySelectorAll result directly → error; must loop.
Script still in the <head> → null errors.
Using innerHTML with user text → mention the safety rule; keep .textContent today.

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: With the instructor guiding step by step, learners take a static HTML page and use the DOM to (1) change existing
text and style, and (2) build a list from an array of objects.
Starting materials: In webdev-practice , a page shop.html , a css/style.css , and an empty js/render.js . The instructor shows
each file's content.
Procedure (instructor calls each numbered step; learners follow; walk the room):
1. Create shop.html :
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Shop</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1 id="title">My Shop</h1>
  <p id="intro">Loading products...</p>
  <ul id="product-list"></ul>
  <script src="js/render.js"></script>
</body>
</html>
```
2. Create css/style.css :
```text
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}
```
```text
.highlight {
  background-color: #fff3b0;
  font-weight: bold;
}
```
```text
.low-stock {
  color: red;
}
```
3. Create js/render.js . Start with the data and a formatting function:
```text
const products = [
  { name: "Hair Cream",  price: 2500, category: "Skincare", stock: 8 },
  { name: "Shea Butter", price: 1800, category: "Skincare", stock: 0 },
  { name: "Coconut Oil", price: 3200, category: "Haircare", stock: 4 },
  { name: "Herbal Soap", price: 1200, category: "Bath",     stock: 12 }
];
```
```text
function formatProduct(product) {
```
```text
  return `${product.name} — ₦${product.price} [${product.category}]`;
}
```
4. Change the heading text and style:
```text
const title = document.querySelector("#title");
title.textContent = "Adaeze Fashion — Today's Products";
title.style.color = "darkgreen";
```
5. Build the list:
```text
const list = document.querySelector("#product-list");
list.textContent = "";   // clear in case we re-run
```
```text
for (const product of products) {
  const li = document.createElement("li");
  li.textContent = formatProduct(product);
```
```text
  if (product.stock === 0) {
    li.classList.add("low-stock");
  } else if (product.price > 3000) {
    li.classList.add("highlight");
  }
```
```text
  list.appendChild(li);
}
```
6. Update the intro with the number of products:
```text
document.querySelector("#intro").textContent =
  `We have ${products.length} products today.`;
```
7. Save all three files. Open shop.html in Chrome. Watch the page (no need for the Console this time — the change is on the
page).
Pause-and-predict points:
After step 5, before saving: "Which product's line will be red? Which will be highlighted? How many lines total?" (Shea
Butter red — stock 0; Coconut Oil highlighted — price > 3000; four lines total.)
After step 6: "What will the paragraph say?" (We have 4 products today.)
Expected on-page result: an <h1> reading "Adaeze Fashion — Today's Products" in dark green; an intro paragraph reading
"We have 4 products today."; and a four-item list:
```text
Hair Cream — ₦2500 [Skincare]
Shea Butter — ₦1800 [Skincare]        (red text)
Coconut Oil — ₦3200 [Haircare]        (yellow highlighted background)
Herbal Soap — ₦1200 [Bath]
```
Troubleshooting while walking the room:
Nothing appears / list empty → the script is not at the bottom of the body, or appendChild is missing, or the file was not
saved.
Cannot read properties of null → a selector id/class does not match the HTML. Check #title , #intro , #product-list .
Old items duplicate on refresh → the list.textContent = ""; clear step is missing.
Colours not showing → the class name in classList.add(...) does not match the class in style.css , or the CSS file is not
linked in the <head> .
Naira shows as ? → save the file as UTF-8; keep <meta charset="UTF-8"> .
Completion checklist (learner ticks each):
shop.html links css/style.css in the head and js/render.js at the bottom of the body
Heading text and colour changed via the DOM
Intro paragraph updated with the product count
Four list items appear, built with createElement + appendChild
A loop builds the list from the data (not typed by hand)
.highlight and .low-stock classes applied correctly
No red errors in the Console

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Build a "Student Results Board" on your own — a new DOM task, not a copy of the product shop.
Scenario: You teach a small computer class at a community centre in Port Harcourt. You keep each student's name and score,
and you want a webpage that shows the class results automatically, with a colour flag for those who failed (below 50).
Starting information: Use these students:
Adaeze — 78
Chidi — 45
Ngozi — 91
Emeka — 52
Amaka — 38
Requirements:
1. Create results.html , css/results.css , and js/results.js .
2. results.html must have:
an <h1 id="heading"> (start with any text)
a <ul id="results-list"> (empty)
the CSS linked in the head and the JS linked at the bottom of the body.
3. In results.js , store the students as an array of objects, each with name and score (numbers).
4. Write a function formatStudent(student) that returns a string such as Adaeze — 78 (PASS) or Chidi — 45 (FAIL) (reuse your
Session 2 if/else ).
5. Use document.querySelector("#heading").textContent = ... to set the heading to "Community Centre — Results" .
6. Loop over the students, create an <li> for each with createElement + appendChild , and set its text with formatStudent .
7. Add a CSS class .fail (red background or red text) and apply it with classList.add("fail") to any student who scored
below 50.
Constraints:
Build the list from the data with a loop — do not type the <li> items by hand in the HTML.
Use .textContent (not .innerHTML ) for the student text — remember the safety rule.
All scores must be numbers.
Do not copy the products example word-for-word; design your own output wording.
Time allowance: 15 minutes.
Success criteria:
The heading reads "Community Centre — Results".
Five list items appear, one per student.
Chidi and Amaka (48 and 38 — below 50) show the .fail style; the others do not.
The list is built by JavaScript, and the HTML <ul> starts empty.
No red errors.
Hints available if stuck:
Hint 1: In formatStudent , use if (student.score >= 50) { return ...PASS... } else { return ...FAIL... } .
Hint 2: Create each item with const li = document.createElement("li"); li.textContent = formatStudent(student); .
Hint 3: Apply the class inside the same loop: if (student.score < 50) { li.classList.add("fail"); } .
Hint 4: Remember to document.querySelector("#results-list").appendChild(li); — creating alone is not enough.
Instructor answer key (do not show learners):
```text
const students = [
  { name: "Adaeze", score: 78 },
  { name: "Chidi",  score: 45 },
  { name: "Ngozi",  score: 91 },
  { name: "Emeka",  score: 52 },
  { name: "Amaka",  score: 38 }
];
```
```text
function formatStudent(student) {
  if (student.score >= 50) {
    return `${student.name} — ${student.score} (PASS)`;
  } else {
    return `${student.name} — ${student.score} (FAIL)`;
  }
}
```
```text
document.querySelector("#heading").textContent = "Community Centre — Results";
```
```text
const list = document.querySelector("#results-list");
list.textContent = "";
```
```text
for (const student of students) {
  const li = document.createElement("li");
  li.textContent = formatStudent(student);
```
```text
  if (student.score < 50) {
    li.classList.add("fail");
  }
```
```text
  list.appendChild(li);
}
```
Corresponding css/results.css (minimum):
```text
.fail {
  color: white;
  background-color: #d9534f;
  padding: 4px;
}
```
Expected on-page result: heading "Community Centre — Results"; five items, with Chidi's and Amaka's lines shown in the
.fail style.
Marking guidance (out of 10):
Correct files and correct script placement (2)
Array of objects with name/score numbers (2)
formatStudent returns PASS/FAIL correctly (2)
List built with a loop + createElement / appendChild (2)
.fail class applied only to scores below 50 (1)
Heading set via .textContent ; no console errors (1)

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Chief Nwosu runs a small private school in Port Harcourt. On result day, he prints a notice board showing each of the
60 pupils' scores and whether they passed. Last term the person typing the board made three typing mistakes, and two parents
complained that the board did not match their child's report sheet. Chief Nwosu wants one reliable source of the results, with
the board generated from it — and a clear colour flag for anyone who did not pass.
Relevant facts.
Each pupil has a name and a score.
The pass mark is 50.
The school already has a basic webpage for announcements (built with HTML/CSS).
The scores change only twice a term, but the board must always match the master list exactly.
Decision point. How can the school make the notice board derive from one list of scores, so a typo in the board generator
cannot happen?
Possible approaches.
1. Keep typing the board by hand each term.
2. Store the pupils as an array of objects in JavaScript and use the DOM to render the board automatically: heading, one list
item per pupil, and a .fail class for anyone below 50.
3. Hire a developer to build a full results-management system with a database.
Recommended solution (for this stage). Approach 2. One array is the "single source of truth". The page is built by the DOM, so
the board can never disagree with the data, and passing vs failing is decided by code ( >= 50 ), not by a tired typist.
Example solution:
```text
const schoolName = "Chief Nwosu Memorial School";
```
```text
const pupils = [
  { name: "Adaeze O.",  score: 78 },
  { name: "Chidi N.",   score: 45 },
  { name: "Ngozi E.",   score: 91 },
  { name: "Emeka A.",   score: 52 },
  { name: "Amaka U.",   score: 38 },
  { name: "Tunde B.",   score: 67 }
];
```
```text
function formatPupil(pupil) {
  const status = pupil.score >= 50 ? "PASS" : "FAIL";
  return `${pupil.name} — ${pupil.score} (${status})`;
}
```
```text
document.querySelector("#school").textContent = schoolName;
document.querySelector("#board-title").textContent = "End of Term Results";
```
```text
const board = document.querySelector("#board");
board.textContent = "";
```
```text
for (const pupil of pupils) {
  const li = document.createElement("li");
  li.textContent = formatPupil(pupil);
```
```text
  if (pupil.score < 50) {
    li.classList.add("fail");
  }
```
```text
  board.appendChild(li);
}
```
```text
document.querySelector("#summary").textContent =
  `Total pupils: ${pupils.length}`;
```
Trade-offs.
Approach 1 costs nothing but keeps the typo risk — exactly the problem Chief Nwosu is trying to remove.
Approach 2 is a 45-minute build; after that, updating results means editing numbers in one array. The board and the master
list cannot drift apart, because the board is the master list, rendered.
Approach 3 (a full system with a database and logins) is a genuine business project and overkill for a 60-pupil notice board.
It may make sense if the school grows and needs parents to log in online.
Professional connection. "Data in, page out" is the core loop of modern front-end work. News sites, bank statements, e-
commerce listings, dashboards — all render a list of objects to the DOM with a loop. The skill you practised today is exactly
what junior developers are paid to do: turn data into a visible, accurate interface. It is also the exact technique the capstone shop
uses to show its products.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
Use this table as the live troubleshooting guide. When a learner hits a problem, ask them to find the matching row and confirm
the cause before fixing.
K.1 Cannot read properties of null (reading '...')
Symptoms: A red TypeError mentioning null ; the page does not update. Likely causes: (a) The selector does not match any
element (wrong id/class/tag, or a typo, or missing # / . ). (b) The script is running before the element exists (script in the
head, or placed above the element). How to investigate: Check the selector against the HTML character by character. Check
the script is at the bottom of the body. In the Console, run document.querySelector("#yourid") — if it prints null , the selector is
wrong (confirmed). Corrective steps: Fix the id/class spelling; use # for ids and . for classes; move the script to the bottom
of the body. How to confirm resolved: Run the query again — it prints the element, not null . How to prevent recurrence:
Copy the id from the HTML; keep the script at the bottom of the body.
K.2 The new element never appears
Symptoms: You called createElement but nothing shows on the page. Likely cause: You created the element but never inserted
it (missing appendChild ). Creating alone is invisible. How to investigate: Look for .appendChild( after createElement( . If it is
absent, that is confirmed. Corrective steps: Add parent.appendChild(newElement); . How to confirm resolved: The element
appears on the page. How to prevent: Always remember the two-step pattern: create, then attach.
K.3 List items duplicate every time you re-run / refresh
Symptoms: The list grows: 4 items, then 8, then 12. Likely cause: You append new items on top of old ones without clearing the
parent first. How to investigate: Check whether the render starts by emptying the parent. Corrective steps: Add
list.textContent = ""; at the start of the render (before the loop). How to confirm resolved: The list stays at the correct count
on repeated runs. How to prevent: Make "clear, then build" a habit for any re-render.
K.4 .forEach is not a function on a selection
Symptoms: Red TypeError when you call .forEach on something from the DOM. Likely cause: You used querySelector (single
element) but tried to loop, or you called .forEach on a non-list. (Confirmed by checking which selector you used.) How to
investigate: console.log(theThing) — is it one element or a list? If it is one element, forEach is wrong. Corrective steps: Use
querySelectorAll to get all matches, then loop. How to prevent: Ask yourself: "Do I want one element or many?" One →
querySelector ; many → querySelectorAll + loop.
K.5 Text shows HTML tags as literal text, or (worse) a script runs
Symptoms: You wanted bold but saw <b>...</b> ; or a name typed by a user ran as code. Likely cause: The opposite of what
you need — using .textContent when you wanted HTML, or using .innerHTML with user input. How to investigate: Check
which property you assigned. If the text came from a user, .innerHTML is the dangerous culprit. Corrective steps: Use
.textContent for plain text and any user input. Use .innerHTML only for HTML you wrote yourself. How to confirm resolved:
The text displays exactly as intended, and no unexpected HTML is created. How to prevent: Default to .textContent ; treat
.innerHTML as a sharp tool.
K.6 Style change does nothing
Symptoms: You set element.style.color = "red" but nothing changes. Likely causes: (a) The selector found the wrong element
or null . (b) The CSS you wrote is being overridden by a stronger rule. (c) For classList , the class name does not match the
CSS file. How to investigate: console.log(element) and hover it in the page. Check the Elements panel → Styles to see which
rule wins. Confirm the class name spelling matches the CSS. Corrective steps: Fix the selector; fix the class name; or strengthen
the CSS rule. Remember camelCase in .style ( backgroundColor , not background-color ). How to prevent: Prefer classList with
classes defined in the stylesheet; verify the class name is identical in both files.
K.7 Setting .style.fontSize = 40 (missing unit) does nothing
Symptoms: Font size does not change. Likely cause: Values that need a unit must include it, as a string: "40px" . 40 alone is
invalid. How to investigate: Check whether the value is quoted and includes px , % , em , etc. Corrective steps: Write
element.style.fontSize = "40px"; . How to prevent: Remember: style values are strings, units included.
Distinguish likely vs confirmed. As in earlier sessions, the listed cause is only likely until you check it — run
document.querySelector(...) to see null , inspect the Elements panel, or hover the logged element. Confirm first, then fix.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "My Shop Page — Rendered from Data"
Purpose: Combine arrays of objects, loops, functions and the DOM to turn a static page into one that builds itself from data —
the exact pattern the capstone uses.
Realistic scenario: You run a small online stall (choose any products — fashion, food, phone accessories). You want a page that
lists your products automatically from one data array, and flags any item that is out of stock.
Detailed instructions:
1. Create a folder assignment4 containing:
```text
index.html
```
```text
css/style.css
```
```text
js/products.js
```
2. index.html must have:
a <link> to css/style.css in the head
an <h1 id="shop-name">
a <p id="summary"></p>
a <ul id="product-list"></ul> (empty)
a <script src="js/products.js"></script> at the bottom of the body
3. In js/products.js :
Create an array products of at least five objects. Each object must have: name (string), price (number), category
(string), inStock (boolean).
Write a function formatProduct(product) that returns a line of text, for example: Hair Cream — ₦2500 [Skincare] .
Set the shop name with document.querySelector("#shop-name").textContent = ... .
Set #summary to something like We have 5 products in our store. using .length .
Loop over the products; for each, createElement("li") , set its .textContent with formatProduct , and appendChild it to
#product-list .
If inStock is false , add a class .out-of-stock with classList.add .
4. In css/style.css , define at least .out-of-stock (e.g., grey text with a strikethrough) and one more style of your choice.
Constraints:
Build the list with a loop — do not hard-code <li> items in the HTML.
Use .textContent for all text (do not use .innerHTML with any user-entered text).
Prices are numbers, not strings.
The script must be at the bottom of the body (or use defer ).
Required deliverables:
```text
assignment4/index.html
```
```text
assignment4/css/style.css
```
```text
assignment4/js/products.js
```
A photo/screenshot of the finished page in your workbook, and the Console output noting any errors (or "no errors").
Submission format: Files in the class folder; a photo of the rendered page in the workbook.
Deadline: Before Session 5.
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
Files & linking correct 3 CSS in head, JS at bottom of body, all three files present
Array of ≥5 objects, correct keys/types 4 name/price/category/inStock with correct types
#shop-name and #summary set via DOM 3 Heading and count update on the page
List built by loop with createElement/appendChild 5 No hard-coded <li> ; correct count of items
.out-of-stock class applied when false 3 Styling appears only for out-of-stock items
Clean result / no console errors 2 Page renders correctly, Console clear
Common mistakes to avoid: forgetting appendChild ; script in the head causing null errors; hard-coding list items instead of
looping; using .innerHTML with data; misspelling a selector id/class.
Instructor reference solution:
```text
const shopName = "Adaeze Fashion Online";
```
```text
const products = [
  { name: "Hair Cream",   price: 2500, category: "Skincare", inStock: true },
  { name: "Shea Butter",  price: 1800, category: "Skincare", inStock: false },
  { name: "Coconut Oil",  price: 3200, category: "Haircare", inStock: true },
  { name: "Herbal Soap",  price: 1200, category: "Bath",     inStock: true },
  { name: "Black Soap",   price: 900,  category: "Bath",     inStock: false }
];
```
```text
function formatProduct(product) {
  return `${product.name} — ₦${product.price} [${product.category}]`;
}
```
```text
document.querySelector("#shop-name").textContent = shopName;
document.querySelector("#summary").textContent =
  `We have ${products.length} products in our store.`;
```
```text
const list = document.querySelector("#product-list");
list.textContent = "";
```
```text
for (const product of products) {
  const li = document.createElement("li");
  li.textContent = formatProduct(product);
```
```text
  if (!product.inStock) {
    li.classList.add("out-of-stock");
  }
```
```text
  list.appendChild(li);
}
```
Corresponding css/style.css (minimum):
```text
body {
  font-family: Arial, sans-serif;
  margin: 20px;
}
```
```text
.out-of-stock {
  color: grey;
  text-decoration: line-through;
}
```
Expected on-page result: heading "Adaeze Fashion Online"; summary "We have 5 products in our store."; five list items, with
Shea Butter and Black Soap shown in grey with a strikethrough.

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key.)
Q1. Short answer. In one sentence, what is the DOM?
Q2. Multiple choice. Which line finds the element <h1 id="title"> ? a) document.querySelector("title") b)
document.querySelector("#title") c) document.getElementById(".title") d) document.getElement("title")
Q3. Explain in your own words. What is the difference between .textContent and .innerHTML , and when is .innerHTML
dangerous?
Q4. Practical identification. Given an element stored in a variable card , write the code to (a) change its text to "Sold out" , and
(b) add the CSS class "sold-out" to it.
Q5. Error detection. Find and fix the bug:
```text
<head>
  <script src="js/app.js"></script>
</head>
<body>
  <h1 id="title">Hello</h1>
</body>
```
```text
document.querySelector("#title").textContent = "New heading";
```
Q6. Scenario. You have an array students of objects with name and score . Write the code that creates a list item for each
student and adds it to a <ul id="list"> . (You may assume a function formatStudent(student) already exists and returns a string.)
INSTRUCTOR ANSWER KEY (Q1–Q6)
A1. The DOM is the browser's live, in-memory tree/model of the HTML page, which JavaScript can read and change; when it
changes, the page updates on screen. (Accept any equivalent wording.) A2. (b) document.querySelector("#title") — # selects
by id. (a) is missing # ; (c) has the . in the wrong place for getElementById ; (d) is not a real method. A3. .textContent
reads/writes plain text (tags are shown as literal characters) and is safe; .innerHTML reads/writes HTML, so tags are interpreted.
.innerHTML is dangerous when the text comes from a user, because a user could enter HTML/script that runs — a security risk
(XSS). Use .textContent for user input. A4.
```text
card.textContent = "Sold out";
card.classList.add("sold-out");
```
A5. The script is in the head, so it runs before the <h1 id="title"> exists; querySelector returns null and .textContent throws
Cannot read properties of null . Fix: move the script to the bottom of the body (or add defer ):
```text
<body>
  <h1 id="title">Hello</h1>
  <script src="js/app.js"></script>
</body>
```
A6.
```text
const list = document.querySelector("#list");
list.textContent = "";
```
```text
for (const student of students) {
  const li = document.createElement("li");
  li.textContent = formatStudent(student);
  list.appendChild(li);
}
```

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today you connected your code to the page. The browser turns your HTML into a live model called the
DOM, and JavaScript is allowed to edit that model. You learned to select elements with getElementById , querySelector (one
element) and querySelectorAll (many), and to loop over many. You changed text with .textContent (and learned why
.innerHTML is risky with user input), changed appearance with .style and, better, with classList . You created elements with
createElement and inserted them with appendChild . Most importantly, you took the array of objects from Session 3 and
rendered it into the real page — turning your static Web Design page into one that builds itself from data. Finally, you saw why
the script must sit at the bottom of the body: the elements must exist before your code looks for them.
Five important takeaways:
1. The DOM is the browser's live model of the page; change it and the screen updates.
2. querySelector("#id") finds one; querySelectorAll(".class") finds many (loop over them).
3. Use .textContent for plain text (safe); .innerHTML only for HTML you wrote yourself.
4. Prefer classList.add/remove/toggle over .style — keep your design in CSS.
5. Build a list from data with a loop: createElement → set text → appendChild .
Questions to help you recognise what you can now do:
Can I change a heading's text and colour from JavaScript without editing the HTML by hand?
Can I explain the difference between querySelector and querySelectorAll ?
Can I build a list on the page from an array of objects, with no hard-coded <li> ?
Can I explain why a script in the <head> causes a null error?
Can I explain why .innerHTML should not be fed a user's typed text?
Connection to the next session: Right now the page changes once, when it loads. Nothing yet responds to the user. Next
session we add events — listening for a click on a button, or text being typed into a field — and running our DOM code in
response. That is when the page stops being a poster and becomes something a customer can actually use: buttons that add to
a cart, forms that react as you type. You now have the DOM as your paintbrush; next we give you a hand that moves it — the
user's hand.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
Learner selects an element, changes its text, and the page updates on refresh without being shown which selector to use.
Learner distinguishes querySelector (one) from querySelectorAll (many) and loops when needed.
Learner builds a list from data using createElement + appendChild , not by typing <li> in the HTML.
Learner explains, in their own words, why the script belongs at the bottom of the body.
Learner reaches for classList rather than piling up .style changes.
Learner uses .textContent by default and can say why .innerHTML is risky.
Common misconceptions to watch for and correct:
"The DOM is my HTML file." → Show that a refresh discards in-page edits; the DOM is a live model built from the file.
"The script can go anywhere." → Demonstrate the null error from the head placement.
" createElement puts the element on the page." → Clarify: create then append.
" querySelectorAll returns one element I can style directly." → It is a list; loop over it.
" .innerHTML and .textContent do the same thing." → Show the literal-tags versus rendered-HTML difference, and the safety
rule.
" .length on a selection is an error because it is a NodeList." → It is fine; NodeLists have .length .
Suggested remedial exercises for learners who struggle:
1. Selector drill: give a page with several ids and classes; ask learners to write the correct selector for each named element on
paper, then verify in the Console with document.querySelector(...) .
2. Create-and-attach drill: give a three-line skeleton and ask the learner to add the missing appendChild so a single <li>
appears.
3. Trace-the-render: hand out a small render script and ask learners to write, on paper, the final list the page will show before
running it.
4. Mirror exercise: rebuild the product list for a different shop (a phone-accessories kiosk) — same structure, new data and
class names.
Differentiation:
Level 1 (supported): provide index.html and style.css complete, plus a products.js where the array and formatProduct
are written and only the loop body has blanks to fill.
Level 2 (standard): the independent exercise as written.
Level 3 (challenge): add (a) a small search: an input box and a filter so that only products whose name contains the typed
text are rendered — you can use product.name.toLowerCase().includes(query) (mention or demonstrate the idea; the full
search UI arrives later in the course); and (b) number each list item using querySelectorAll after building, or a counter
variable in the loop.
Timing guidance. The independent exercise is the heart of the session and builds directly toward the capstone. If the room is
slow: turn the case study (Section J) into a 2-minute mention, and cut Demonstration 2 ( querySelectorAll loop) to a quick look
— but protect the guided practical (H) and the independent exercise (I), because rendering a list to the DOM is the single most
reused skill in the entire course. If the room is fast, let learners attempt the Level 3 search as a stretch task.
END OF SESSION 4
Next: Session 5 — Events and Forms: Making the Page Respond to the User.
