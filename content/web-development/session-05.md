---
{
  "id": "web-development/session-05",
  "course": "web-development",
  "number": 5,
  "of": 12,
  "title": "Events and Forms Basics",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/web-development/session-05.png",
    "page": 81,
    "transcript": [
      "EVENTS AND FORMS: THE PAGE REACTS",
      "HOW AN EVENT WORKS - AN EVENT LISTENER WAITS FOR SOMETHING TO HAPPEN",
      "1. USER ACTS",
      "clicks, types or",
      "sends a form",
      "2. LISTENER FIRES",
      "it was waiting on",
      "that exact element",
      "3. FUNCTION RUNS",
      "your code does",
      "the work",
      "4. PAGE UPDATES",
      "the screen changes",
      "with NO refresh",
      "THE addEventListener LINE",
      "btn.addEventListener(\"click\", addToCart);",
      "Named function: reuse it in several places",
      "Anonymous function: only used here, written inline",
      "Choose named when you need to remove it later",
      "READING WHAT THE USER TYPED",
      "const value = document.querySelector(\"#qty\").value;",
      "const num = Number(value); // text becomes a number",
      "event.target tells you WHICH element caused the event",
      ".value is always text - convert it before you do maths",
      "COMMON EVENTS",
      "click - tap or click",
      "input - user types",
      "submit - form sent",
      "load - page opened",
      "change - value left",
      "keydown - key pressed",
      "FORMS MUST stop the reload",
      "form.addEventListener(\"submit\", function(e) {",
      "e.preventDefault(); // page stays put",
      "Without it, the browser reloads and your work disappears",
      "4 MISTAKES TO AVOID",
      "1. Forgetting preventDefault() on submit",
      "2. Reading .value before the element exists",
      "3. Misspelling the selector 4. Adding text + number",
      "NIGERIAN EXAMPLE",
      "Build a small calculator: type two numbers, press \"Add\" - the listener reads both values, converts",
      "them with Number() and writes the total in naira onto the page. No refresh, no page reload."
    ],
    "hotspots": [
      {
        "label": "EVENTS AND FORMS: THE PAGE REACTS",
        "x": 24.49,
        "y": 6.87,
        "w": 51.05,
        "h": 4.21,
        "mono": false
      },
      {
        "label": "HOW AN EVENT WORKS - AN EVENT LISTENER WAITS FOR SOMETHING TO HAPPEN",
        "x": 18.7,
        "y": 15.88,
        "w": 62.62,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "1. USER ACTS 2. LISTENER FIRES 3. FUNCTION RUNS 4. PAGE UPDATES",
        "x": 10.98,
        "y": 22.57,
        "w": 79.09,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "clicks, types or it was waiting on your code does the screen changes",
        "x": 12.04,
        "y": 25.82,
        "w": 77.12,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "sends a form that exact element the work with NO refresh",
        "x": 12.51,
        "y": 28.66,
        "w": 75.71,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "THE addEventListener LINE READING WHAT THE USER TYPED",
        "x": 7.15,
        "y": 36.9,
        "w": 69.04,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "btn.addEventListener(\"click\", addToCart); const value = document.querySelector(\"#qty\").value;",
        "x": 7.15,
        "y": 40.69,
        "w": 84.81,
        "h": 2.12,
        "mono": true
      },
      {
        "label": "Named function: reuse it in several places",
        "x": 7.15,
        "y": 44.18,
        "w": 21.16,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "const num = Number(value); // text becomes a number",
        "x": 53.12,
        "y": 44.21,
        "w": 38.84,
        "h": 2.12,
        "mono": true
      },
      {
        "label": "Anonymous function: only used here, written inline event.target tells you WHICH element caused the event",
        "x": 7.15,
        "y": 47.22,
        "w": 73.71,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "Choose named when you need to remove it later .value is always text - convert it before you do maths",
        "x": 7.15,
        "y": 50.27,
        "w": 71.7,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "COMMON EVENTS",
        "x": 7.15,
        "y": 56.42,
        "w": 12.32,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "click - tap or click input - user types submit - form sent load - page opened change - value left keydown - key pressed",
        "x": 9.52,
        "y": 60.03,
        "w": 82.4,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "FORMS MUST stop the reload 4 MISTAKES TO AVOID",
        "x": 7.15,
        "y": 67.46,
        "w": 60.65,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "1. Forgetting preventDefault() on submit",
        "x": 53.12,
        "y": 70.99,
        "w": 20.43,
        "h": 1.94,
        "mono": false
      },
      {
        "label": "form.addEventListener(\"submit\", function(e) {",
        "x": 7.15,
        "y": 71.01,
        "w": 34.27,
        "h": 2.12,
        "mono": true
      },
      {
        "label": "2. Reading .value before the element exists",
        "x": 53.12,
        "y": 73.79,
        "w": 21.62,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "e.preventDefault(); // page stays put",
        "x": 8.43,
        "y": 73.82,
        "w": 28.18,
        "h": 2.12,
        "mono": true
      },
      {
        "label": "Without it, the browser reloads and your work disappears 3. Misspelling the selector 4. Adding text + number",
        "x": 7.15,
        "y": 76.63,
        "w": 71.8,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "NIGERIAN EXAMPLE",
        "x": 7.15,
        "y": 82.87,
        "w": 13.75,
        "h": 2.36,
        "mono": false
      },
      {
        "label": "Build a small calculator: type two numbers, press \"Add\" - the listener reads both values, converts",
        "x": 7.15,
        "y": 86.15,
        "w": 48.61,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "them with Number() and writes the total in naira onto the page. No refresh, no page reload.",
        "x": 7.15,
        "y": 88.96,
        "w": 45.73,
        "h": 2.12,
        "mono": false
      }
    ],
    "width": 984,
    "height": 669
  },
  "module": "Week 2 — Module 2: DOM and Events",
  "duration_minutes": 105,
  "difficulty": "Beginner (some prior JavaScript)",
  "prerequisite_knowledge": "Session 4 — DOM basics: selecting elements with document.querySelector() / getElementById() , reading and changing textContent , changing .style , and creating/removing elements. Also Sessions 1–3: variables, functions, conditions, arrays and loops. A learner must be able to select an element and change its text; if not, run the 15 minute DOM refresher in Section E before proceeding. Connection to previous session In Session 4 we learned to find elements and change them, but the change happened the moment the page loaded — the learner had no control over when. Today the page waits for the user to do something (click, type, submit) and only then reacts. This is the moment pages become truly interactive.",
  "connection_to_previous": null
}
---
# Events and Forms Basics

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 2 — Module 2: DOM and Events

**Recommended duration:** 105 minutes

**Difficulty:** Beginner (some prior JavaScript)

**Prerequisite knowledge:** Session 4 — DOM basics: selecting elements with document.querySelector() / getElementById() , reading and changing textContent , changing .style , and creating/removing elements. Also Sessions 1–3: variables, functions, conditions, arrays and loops. A learner must be able to select an element and change its text; if not, run the 15 minute DOM refresher in Section E before proceeding. Connection to previous session In Session 4 we learned to find elements and change them, but the change happened the moment the page loaded — the learner had no control over when. Today the page waits for the user to do something (click, type, submit) and only then reacts. This is the moment pages become truly interactive.

**Preparation before class:** Learner webdev-practice folders from Session 4 available; projector showing VS Code plus Chrome; DevTools Console open; a whiteboard for drawing the "button → listener → function → page updates" flow; instructor demo folder demo-week2-s5/ prepared with index.html and js/calculator.js (contents in Section G).

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Define an event in plain English and list at least four common events ( click , input , submit , load ).
2. Attach an event listener with element.addEventListener("click", someFunction) and explain what a listener is waiting for.
3. Distinguish a named function from an anonymous (inline) function in a listener, and say when each is suitable.
4. Use the event object event.target to find out which element triggered the event.
5. Read what a user typed using document.querySelector("input").value , and convert it to a number with Number() .
6. Build a live calculator/counter where a button click reads input and updates the page without a refresh.
7. Handle a form's submit event and explain why event.preventDefault() stops the page from reloading.
8. Diagnose and fix four common mistakes: forgetting preventDefault() , reading .value too early, misspelling a selector,
and adding a number to a string.

## C. Required Materials
<!-- kind:materials -->
Hardware
One computer per learner (academy desktops). Shared machines are acceptable; pair learners so one types and one
predicts, then swap halfway.
Instructor computer connected to a projector or large screen.
Software
Google Chrome (any recent version). The Console behaviour described here is stable across modern versions.
Visual Studio Code (VS Code).
Windows 10 or Windows 11.
Accounts
None required. All work is offline.
Sample files
Instructor demo folder demo-week2-s5/ with index.html and js/calculator.js (given in Section G).
A partially completed starter/calculator-partial/ folder (HTML done, JavaScript stubbed) for Level 1 learners.
Worksheets
Worksheet 5.1 — "Name the Event" (match a real-life action to a JavaScript event; 1 page).
Worksheet 5.2 — "Predict the Page" (given a small listener block, write what the page does; in the learner workbook, Part 3).
Tools
Chrome DevTools (press F12 ). The Elements tab is used to confirm the page really changed.
Internet
Not required. If available, the instructor may optionally show the MDN page for addEventListener at the very end, but the
session does not depend on it.
Alternative for learners who lack a facility
Any laptop with Chrome and VS Code works. A learner with only a phone can pair with a desktop learner and photograph
the code, then practise later in a phone browser tab. The exercise is short enough to complete on a shared machine.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector, open a product page with a "Buy Now" button and a small form (a name box and a submit
button). Do not open any code yet — show only the browser.
What the instructor says:
"In the last session we made the page change by itself the moment it loaded. That is nice, but a real shop cannot guess
what the customer wants — the customer has to act first. Look at this page. Watch what happens when I type my name
and press the button on this form."
Slowly type a name into the form and click the button. The page flashes and goes blank, or the text disappears and the URL
grows a ?name=... at the end. (This is the default browser behaviour: the form tries to send data to a server and reloads the
page.)
"Notice the page reloaded. My typing was thrown away. That is the browser's default. Today you will learn to stop that
from happening, read exactly what the user typed, and make the number or message on the page update live — without
losing anything."
Second half of the hook — the counter: On the projector, open the Console and paste this single line, then ask learners to
watch the page:
```text
let n = 0; document.body.innerHTML = '<button id="b">Clicked 0 times</button>'; document.querySelector("#b").addEventListener("click
```
Click the button several times. The text counts up while the page never reloads.
"The page is now listening. It waits. When you click, it counts. That is an event, and that is today's whole lesson."
Expected learner response: Learners will be surprised the page reacts without reloading. Some will ask, "So the page doesn't
go anywhere?" Confirm: yes — the browser can react entirely on its own, before any server is involved.
Why this opener works: It creates a concrete, visible gap (the reload problem) and immediately gives a taste of live interaction,
so the session starts with a puzzle the learners want solved.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Run this quickly as an oral round-robin. Put the questions on the projector.
Question 1: "What does document.querySelector(".price") return?"
Expected answer: the first element on the page with class="price" (or null if none exists).
Common gap: learners mix up .price (class) with #price (id). Re-state: dot = class, hash = id.
Question 2: "How do you change the visible text of a heading element called titleEl ?"
Expected answer: titleEl.textContent = "New text"; .
Common gap: learners write titleEl.text = ... (works sometimes but inconsistent) or forget the = . Reinforce
textContent .
Question 3: "Why do we place the <script> at the bottom of the <body> ?"
Expected answer: so all the HTML elements exist before the script tries to select them; otherwise querySelector returns
null .
Common gap: learners forget and get Cannot read properties of null . Remind them.
Question 4: "What does typeof "2500" print?"
Expected answer: "string" .
Common gap: confidence. Remind them a quoted number is text, and today we will convert it with Number() .
Bridge to today (say this):
"You can find an element and change it. But right now your code changes it immediately. Think of a radio: right now you
have wired the speaker, but there is no switch. An event listener is the switch. Today we install switches — click, type,
submit — so the page changes only when the user touches it."
If more than a third of the class cannot answer Question 1 or 3, spend an extra 10 minutes on the DOM refresher below before
continuing.
DOM refresher (only if needed):
```text
<h1 id="title">Old title</h1>
<script>
  const t = document.querySelector("#title");
  t.textContent = "New title";
</script>
```
Key points: querySelector returns one element; textContent reads or writes the text; the script must run after the element exists.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 What an event is
The idea. An event is something that happens in the browser that JavaScript is allowed to react to. It can be caused by the user
(a click, a key press, typing, scrolling, submitting a form) or by the browser itself (the page finishing loading, an image
finishing downloading, the window being resized).
Plain-English definition. An event is simply "a thing that happened." When it happens, the browser makes an announcement:
"a click just occurred on this button!" Our job is to tell the browser what to do when it hears that announcement.
Why events exist. Without events, a page can only run its script once, top to bottom, and then sit frozen. Real software must
respond to people: a shop reacts when you choose a quantity, a bank app reacts when you press "Send", a form reacts when
you press "Submit". Events are how the browser says "the user did something — now react."
Real-life analogy. Think of a security guard at a gate. The guard does not chase every car; the guard waits at the post. When a
car arrives (the event), the guard acts (checks the car). If no car ever comes, the guard stays calm and does nothing. An event
listener is the guard; the event is the car arriving.
Common events we use in this course:
Event name Fires when… Typical element
```text
click
```
The user clicks (or taps) an element button, link, image
```text
input
```
The user types or changes a text box (fires on every keystroke) input, textarea
Event name Fires when… Typical element
```text
change
```
The user finishes changing a value (e.g. leaves a select box) select, input
```text
submit
```
The user submits a form (button or Enter key) form
```text
load
```
The page (or an image) has finished loading window, image
Important limitation / misconception. "Interactive" does not always mean "connected to a server". A counter, a live total, a
colour change — these happen entirely in the browser, with no internet. Server work (like saving an order to a database) is a
different topic, covered later in the course.
How a learner recognises an event in code: whenever they see .addEventListener("…") , the word inside the quotes is the event
being watched.
F.2 Attaching a listener — addEventListener
The idea. We tell an element to watch for a specific event, and to run a specific function when it happens. That is called
attaching an event listener.
The pattern:
```text
element.addEventListener("click", functionName);
```
Three parts, read left to right:
1. element — the element we selected (the switch we are wiring).
2. .addEventListener(...) — the instruction "start listening".
3. "click", functionName — what to listen for ( "click" ), and what to do (run functionName ).
Named function version:
```text
const btn = document.querySelector("#calcBtn");
```
```text
function sayHello() {
  console.log("Button was clicked!");
}
```
```text
btn.addEventListener("click", sayHello);
```
Read this as: "Button, please start listening for a click. When a click happens, run the function called sayHello ."
Critical detail — no parentheses after the function name. We write sayHello , not sayHello() . Writing sayHello() would call
the function immediately and pass its result to the listener — which is wrong. The listener needs the name of the function so the
browser can call it later, at the right moment.
Say to the class: " sayHello is like giving the guard the name of a dance move. sayHello() is like performing the whole dance
now, in front of the guard, and then asking him to copy it later. Give him the name, not the performance."
Anonymous (inline) function version:
```text
btn.addEventListener("click", function () {
  console.log("Button was clicked!");
});
```
Here we write the function directly inside the listener with no name. This is called an anonymous function (it has no name). It is
convenient for short, one-off actions.
Named vs anonymous — when to use each:
Style Use it when
Named The action is longer, or you want to run/remove it in more than one place, or you want a clear name for
debugging.
Style Use it when
Anonymous The action is very short and used only once, right here.
Arrow function (a modern shorthand, optional this session):
```text
btn.addEventListener("click", () => {
  console.log("Clicked!");
});
```
() => { ... } is a shorter way to write function () { ... } . Both work identically here. The course accepts either; for beginners,
the function () { } form is easier to read at first.
Common misconception. Learners attach the listener but nothing happens. The usual cause: the element was never found
( querySelector returned null ), so the error appears in the Console as Cannot read properties of null (reading
'addEventListener') . Always check the selector and that the HTML element exists.
F.3 The event object and event.target
The idea. When an event fires, the browser hands the listening function a small package of information about what just
happened. That package is called the event object.
How it arrives. The listening function can receive it as a parameter:
```text
btn.addEventListener("click", function (event) {
  console.log(event);
});
```
Here event is the parameter — the browser fills it in automatically. The name can be anything ( event , e , evt ), but the
course uses event so it reads clearly.
event.target — who did it?
event.target is the actual element that triggered the event. This matters when many buttons share one listener.
```text
<button class="buy" data-item="Hair Cream">Buy Hair Cream</button>
<button class="buy" data-item="Body Lotion">Buy Body Lotion</button>
```
```text
const buttons = document.querySelectorAll(".buy");
```
```text
buttons.forEach(function (button) {
  button.addEventListener("click", function (event) {
    console.log("You clicked: " + event.target.textContent);
  });
});
```
Click the first button → Console prints You clicked: Buy Hair Cream . Click the second → You clicked: Buy Body Lotion . One piece
of code, and event.target tells it which button was clicked.
Real-life analogy. event.target is the name tag of the person who asked the question. If ten people are in a room and one
shouts "I need help!", event.target tells you exactly who shouted.
Other useful pieces of the event object (brief mention):
event.type — the name of the event, e.g. "click" .
event.preventDefault() — a method to cancel the browser's default behaviour (used in Section F.6).
Common misconception. Learners think target is always the element the listener was attached to. It is not: it is the element the
user actually interacted with (which may be a child element inside the one you attached to). For now, the two are usually the
same; just know they can differ.
F.4 Reading what the user typed — .value
The idea. A text box or number box holds what the user typed. We read it with the .value property.
```text
const nameInput = document.querySelector("#name");
const typed = nameInput.value;
console.log(typed);
```
Key facts about .value :
1. It is always a string, even if the box is type="number" . If the user typed 3 , .value is "3" (text), not 3 (number).
2. .value is read the moment you ask for it. If you read it before the user types, you get an empty string "" .
3. To set the box's contents, you assign: nameInput.value = "Adaeze"; .
Converting text to a number with Number() :
```text
const qtyInput = document.querySelector("#qty");
const qty = Number(qtyInput.value);   // "3" becomes 3
```
Why this matters — the string trap from Session 1: if we forget Number() , the code treats the value as text, and "3" * "2500"
gives 7500 by luck (the * operator forces a conversion), but "3" + "2500" would give "32500" — text glued together. Using
Number() makes the intention clear and the maths reliable.
Worked example:
```text
const qtyInput = document.querySelector("#qty");   // user typed 3
const priceInput = document.querySelector("#price"); // user typed 2500
```
```text
console.log(qtyInput.value + priceInput.value);          // "32500"  ← text joined (bug!)
console.log(Number(qtyInput.value) + Number(priceInput.value)); // 2503  ← numbers added
```
Say to the class: "Anything that comes out of a form field is text — even digits. If you are going to do arithmetic, wrap it in
Number() ."
Trimming whitespace (mentioned, used in Session 6): sometimes a user types spaces by accident. .value.trim() removes
spaces from the start and end. We do not need it for number inputs, but it is essential for names and emails (Session 6).
Common misconception. "Because the input is type="number" , .value is a number." False — it is still a string. typeof will
prove it.
F.5 Putting it together — a live calculator
Here is the whole idea in one small widget: a button that, when clicked, reads two inputs, calculates a total, and writes the result
onto the page.
```text
<p>
  <input type="number" id="qty" value="2">
  <input type="number" id="price" value="2500">
  <button id="calcBtn">Calculate Total</button>
</p>
<p id="result">Total: ₦0</p>
```
```text
const qtyInput = document.querySelector("#qty");
const priceInput = document.querySelector("#price");
const calcBtn = document.querySelector("#calcBtn");
const result = document.querySelector("#result");
```
```text
function calculateTotal() {
  const qty = Number(qtyInput.value);
  const price = Number(priceInput.value);
  const total = qty * price;
  result.textContent = "Total: ₦" + total;
}
```
```text
calcBtn.addEventListener("click", calculateTotal);
```
Line by line:
1. Four querySelector lines grab the four elements (two inputs, the button, the result paragraph) so we can use them later.
2. function calculateTotal() defines the action — but does not run it yet.
3. Inside, Number(...) converts each typed value from text to a real number.
4. total = qty * price does the maths.
5. result.textContent = ... updates the paragraph on the page.
6. The last line wires the button: "when clicked, run calculateTotal ."
Expected behaviour: Type 3 and 1800 , click the button → the paragraph reads Total: ₦5400 . Nothing reloads. Nothing
appears in the Console unless we add a console.log .
Why we do NOT run calculateTotal() directly: if we wrote calculateTotal(); instead of passing it to the listener, it would run
once at load time (reading empty/default values) and never again when the button is clicked.
F.6 Forms and the submit event — and why preventDefault()
The idea. A <form> is the element that groups input fields for sending data somewhere. When a form is submitted, the
browser's default behaviour is to send the data to a server and reload the page. For now we do not have a server, and
reloading throws away our JavaScript state. So we must stop the default with event.preventDefault() .
The form element:
```text
<form id="orderForm">
  <label for="customer">Your name</label>
  <input type="text" id="customer">
```
```text
  <label for="qty">Quantity</label>
  <input type="number" id="qty" value="1">
```
```text
  <button type="submit">Place Order</button>
</form>
<p id="message"></p>
```
Listening for the submit:
```text
const orderForm = document.querySelector("#orderForm");
```
```text
orderForm.addEventListener("submit", function (event) {
  event.preventDefault();
  console.log("Form submitted without reloading!");
});
```
What event.preventDefault() does: it tells the browser "do not carry out your normal action for this event." For a form submit,
the normal action is "reload the page and send the data". Cancelling it keeps us on the same page.
Important detail — listen on the <form> , not the button. The submit event belongs to the form. If you attach a click
listener to the submit button instead, pressing Enter inside a field would still submit and reload. Listening for submit on the
form catches both the button click and the Enter key.
Real-life analogy. The form is like a courier envelope ready to be sealed and posted. preventDefault() is like catching the
courier at the door and saying, "Wait — I still need to add something." Without it, the envelope leaves immediately and you get
a fresh, empty page back.
Common misconception. Learners call event.preventDefault() but it does nothing. Usually the listener was attached to the
wrong element (the button, not the form) or the parameter event was not declared in the function, so event is undefined.
Always write function (event) { ... } .
F.7 The running example — Adaeze Fashion's live calculator
Scenario. Adaeze runs Adaeze Fashion in Port Harcourt. Her page lists an item at a unit price; the customer chooses a quantity
and the page should show the total live, without the page jumping or reloading. This is exactly the "quantity × price = total"
widget.
Full runnable HTML — index.html :
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Adaeze Fashion — Price Calculator</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 420px; margin: 40px auto; }
    h1 { color: #8a2b6b; }
    label { display: block; margin-top: 12px; font-weight: bold; }
    input { padding: 8px; width: 100%; box-sizing: border-box; }
    button { margin-top: 15px; padding: 10px 18px; cursor: pointer; }
    #result { margin-top: 18px; font-size: 22px; font-weight: bold; }
  </style>
</head>
<body>
  <h1>Adaeze Fashion</h1>
  <p>Enter the quantity and the unit price, then click Calculate.</p>
```
```text
  <label for="qty">Quantity</label>
  <input type="number" id="qty" value="1" min="1">
```
```text
  <label for="price">Unit price (₦)</label>
  <input type="number" id="price" value="2500" min="0">
```
```text
  <button id="calcBtn">Calculate Total</button>
```
```text
  <p id="result">Total: ₦0</p>
```
```text
  <script src="js/calculator.js"></script>
</body>
</html>
```
Full runnable JavaScript — js/calculator.js :
```text
// Adaeze Fashion — live price calculator
```
```text
// 1. Grab (select) all the elements we need
const qtyInput = document.querySelector("#qty");
const priceInput = document.querySelector("#price");
const calcBtn = document.querySelector("#calcBtn");
const result = document.querySelector("#result");
```
```text
// 2. Define the action
function calculateTotal() {
  // Read the typed values (they are strings) and convert to numbers
  const qty = Number(qtyInput.value);
  const price = Number(priceInput.value);
```
```text
  // Guard against empty or silly input
  if (isNaN(qty) || isNaN(price)) {
    result.textContent = "Please enter numbers in both boxes.";
    return;
  }
```
```text
  // Do the maths
  const total = qty * price;
```
```text
  // Update the page
  result.textContent = "Total: ₦" + total;
}
```
```text
// 3. Wire the button to the action.
//    Note: pass the NAME (calculateTotal), not calculateTotal().
calcBtn.addEventListener("click", calculateTotal);
```
Line-by-line explanation of the JavaScript:
Lines 4–7: select the two inputs, the button and the result paragraph. If any selector is misspelled, that variable is null and
we will see an error on the next use.
Line 10: function calculateTotal() — defines the action; nothing runs yet.
Line 12–13: .value reads what is in each box (text), and Number() converts it to a real number.
Line 16–19: isNaN means "is Not a Number". If the user cleared a box or typed letters, we show a friendly message and
return (stop the function early) so we never show a nonsense total.
Line 22: total = qty * price .
Line 25: write the total into the page with textContent .
Line 30: attach the listener. Every future click runs calculateTotal again with the current values.
Expected on-page behaviour:
1. Page opens showing Total: ₦0 .
2. Change quantity to 3 , price to 1800 , click Calculate Total → Total: ₦5400 .
3. Change quantity to 2 , price to 12000 , click again → Total: ₦24000 .
4. Clear the price box and click → Please enter numbers in both boxes.
5. At no point does the page reload; the typed values are never lost.
Possible extension (optional, show if time allows): react while typing instead of only on click, by listening for input on both
boxes:
```text
qtyInput.addEventListener("input", calculateTotal);
priceInput.addEventListener("input", calculateTotal);
```
Now the total updates on every keystroke. This is a great "wow" moment and shows that the same function can serve several
listeners.
F.8 Summary of the session
An event is something that happens in the browser (click, input, submit, load); we react to it.
element.addEventListener("click", functionName) wires a switch. Pass the function name without () .
Use a named function for reuse; an anonymous function for short one-off actions.
The event object carries details; event.target is the element that was actually interacted with.
Read user input with .value (always text); convert with Number() for maths.
For forms, listen for submit on the <form> and call event.preventDefault() to stop the reload.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 What the instructor prepares
demo-week2-s5/index.html (the Adaeze Fashion page from Section F.7) and js/calculator.js .
Both files open in VS Code.
Chrome open to the page, DevTools Console open.
Whiteboard with the flow drawn: Button → click → listener → calculateTotal → update page.
G.2 Demonstration 1 — the click listener (6 minutes)
Say: "Watch how a page can wait for a click and then act."
Do this on the projector:
1. Show index.html linking js/calculator.js at the bottom of the body.
2. In js/calculator.js , type the basic version (variables + calculateTotal + one listener).
3. Save both files, open the page, press F12 .
4. Type quantity 3 , price 1800 , click the button.
5. Pause and ask before clicking: "What will the total line show?" (₦5400.)
6. Point at the page updating. Then change the price to 1000 and click again — total becomes ₦3000.
Then inject the classic error — remove the parentheses rule by writing:
```text
calcBtn.addEventListener("click", calculateTotal());
```
Save, refresh. Expected result: the total is calculated immediately on load and the button does nothing when clicked (or
an error appears because the function ran with no user input).
Say: "See the () ? That called the function now and passed nothing to the listener. Remove the parentheses and the button
works again."
Change it back to calculateTotal (no parentheses), save, refresh. Button works.
Questions to ask:
"Why did the total change after I typed a new price?" (Because .value reads the box at the moment of the click, not at
load.)
"What would happen if the script were in the <head> ?" (The elements would not exist yet; the selectors would be null .)
G.3 Demonstration 2 — form submit and preventDefault() (9 minutes)
Say: "Now the form problem from our opening. Watch the page reload — and then watch me stop it."
Set up a form on the page:
```text
<form id="newsletter">
  <label for="email">Your email</label>
  <input type="email" id="email" placeholder="you@example.com">
  <button type="submit">Subscribe</button>
</form>
<p id="thanks"></p>
```
First, show the problem — attach a click listener to the button only:
```text
document.querySelector("#newsletter button").addEventListener("click", function () {
  alert("Subscribed!");
});
```
Fill in an email, press Enter instead of clicking. Expected: the page reloads (the click listener never fired for the Enter key)
and the email is lost.
Say: "That is the danger — the form's real event is submit , not the button's click."
Now fix it — listen for submit on the form and prevent the default:
```text
const form = document.querySelector("#newsletter");
const email = document.querySelector("#email");
const thanks = document.querySelector("#thanks");
```
```text
form.addEventListener("submit", function (event) {
  event.preventDefault();                 // stop the page reload
  const typed = email.value.trim();       // read what was typed
  thanks.textContent = "Thank you! We will contact " + typed;
  form.reset();                           // clear the boxes
});
```
Save, refresh. Type an email, press Enter. Expected: no reload; the paragraph shows Thank you! We will contact
you@example.com ; the box clears.
Press Enter with an empty box to show it still "works" (we will properly validate in Session 6).
Then deliberately break it: remove the event.preventDefault(); line, save, refresh, press Enter. Expected: the page reloads, the
email disappears, and the URL grows ?... . Say: "This is the single most common form bug. If your page keeps jumping, you
forgot preventDefault() ." Put it back.
Reasoning to explain aloud: the browser has a default action for submit (send and reload); preventDefault cancels just that
action without breaking the rest of our code; reading .value gives us the text; textContent writes it back to the page.
Questions to ask during the demo:
"Why do we attach to the form rather than the button?" (To catch Enter as well as clicks.)
"What does event.target refer to here?" (The <form> , because we attached to the form.)
"What type is email.value ?" (A string — we trim it and could convert it if it were a number.)

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: With the instructor guiding step by step, build a "Counter and Tip" mini-app — a click counter and a simple tip
calculator on one page, both driven by events.
Starting materials: A new folder webdev-practice/s5/ with an empty index.html and an empty js/tip.js (or learners create
them; instructor shows both).
Procedure (instructor calls out each numbered step; learners follow; instructor walks the room):
1. Create index.html with the following structure:
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Counter and Tip</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 420px; margin: 40px auto; }
    label { display: block; margin-top: 12px; }
    input, button { padding: 8px; margin-top: 6px; }
    #count { font-size: 24px; font-weight: bold; }
    #tipResult { margin-top: 14px; font-weight: bold; }
  </style>
</head>
<body>
  <h1>Counter &amp; Tip</h1>
```
```text
  <h2>Counter</h2>
  <p id="count">0 clicks</p>
  <button id="countBtn">Click me</button>
```
```text
  <h2>Tip Calculator</h2>
  <label for="bill">Bill amount (₦)</label>
  <input type="number" id="bill" value="5000">
  <label for="tipPercent">Tip percent (%)</label>
  <input type="number" id="tipPercent" value="10">
  <button id="tipBtn">Calculate Tip</button>
  <p id="tipResult">Tip: ₦0</p>
```
```text
  <script src="js/tip.js"></script>
</body>
</html>
```
2. Create js/tip.js and start with the counter:
```text
// ---- Counter ----
const countBtn = document.querySelector("#countBtn");
const countLabel = document.querySelector("#count");
let clicks = 0;
```
```text
function addClick() {
  clicks = clicks + 1;
  countLabel.textContent = clicks + " clicks";
}
```
```text
countBtn.addEventListener("click", addClick);
```
3. Save and test: click the button several times. The counter should rise: 1 clicks , 2 clicks , 3 clicks .
4. Add the tip calculator below the counter in the same file:
```text
// ---- Tip Calculator ----
const billInput = document.querySelector("#bill");
const tipInput = document.querySelector("#tipPercent");
const tipBtn = document.querySelector("#tipBtn");
const tipResult = document.querySelector("#tipResult");
```
```text
function calculateTip() {
  const bill = Number(billInput.value);
  const percent = Number(tipInput.value);
  const tip = (bill * percent) / 100;
  tipResult.textContent = "Tip: ₦" + tip;
}
```
```text
tipBtn.addEventListener("click", calculateTip);
```
5. Save, refresh, test: bill 5000 , tip 10 → Tip: ₦500 . Change tip to 15 → Tip: ₦750 .
6. Pause and predict: "Before I click with bill 8000 and tip 7.5, what will the tip be?" (₦600, because 8000 × 7.5 ÷ 100 = 600.)
Expected result:
Counter increases by one on each click, no page reload.
Tip updates on each calculation from the current box values.
Console shows no red errors.
Points to pause on and predict:
After step 3: "Where is the number clicks stored — on the page or in a variable?" (In the variable; the page just displays it.)
After step 5: "If I read billInput.value on page load instead of on click, what would I get?" ( "5000" , the default HTML value
— but it would never update when the user changes it.)
Troubleshooting while walking the room:
Button does nothing → the function name in the listener has () after it, or the selector is misspelled ( null ).
Counter jumps by a lot → the listener was attached more than once (e.g. pasted twice).
Tip shows NaN → a box was empty; add the isNaN guard from Section F.7.
Everything prints Total: ₦50005000 → forgot Number() ; the values were joined as text.
Completion checklist (learner ticks each):
Counter increases correctly and never reloads the page
Counter is stored in a variable ( let clicks )
Tip calculator reads both inputs on each click
Both inputs converted with Number()
At least one named function and one listener used
No red errors in the Console

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Build a "POS Change Calculator" on your own, without copying the tip example.
Scenario: You work at Chidi's Provisions in Port Harcourt. The cashier enters the total price of a customer's goods and the
amount of cash the customer handed over. The page should show the change due, live, when a button is clicked. If the cash
handed over is less than the price, show a warning instead of a negative change.
Starting information (given):
A number input for the goods price.
A number input for the cash paid.
A button labelled Calculate Change.
A paragraph for the result.
Requirements:
1. Create change.html and js/change.js , linked at the bottom of the body.
2. Select the two inputs, the button and the result paragraph.
3. Write a named function calculateChange() .
4. Inside, convert both values with Number() .
5. If the cash paid is less than the price, set the result to "Not enough money — customer still owes ₦X" where X is the difference.
6. Otherwise set the result to "Change: ₦X" .
7. Attach the function to the button's click event.
8. Add an input listener on the cash box so the change also updates while the cashier types.
Constraints:
All arithmetic must use numbers, not strings (use Number() ).
No page reload at any point.
Do not copy the tip example line-for-line — write your own structure.
Time allowance: 15 minutes.
Success criteria:
Price 4500 , cash 5000 → Change: ₦500 .
Price 4500 , cash 4000 → Not enough money — customer still owes ₦500 .
Typing in the cash box updates the result without clicking (after requirement 8).
No red errors.
Hints:
Hint 1: const price = Number(priceInput.value);
Hint 2: for the warning, if (cash < price) { ... } else { ... } .
Hint 3: the shortfall is price - cash .
Instructor answer key (do not show learners):
```text
// change.js — Chidi's Provisions POS Change Calculator
const priceInput = document.querySelector("#price");
const cashInput = document.querySelector("#cash");
const calcBtn = document.querySelector("#calcBtn");
const result = document.querySelector("#result");
```
```text
function calculateChange() {
  const price = Number(priceInput.value);
  const cash = Number(cashInput.value);
```
```text
  if (isNaN(price) || isNaN(cash)) {
    result.textContent = "Please enter both amounts.";
    return;
  }
```
```text
  if (cash < price) {
    result.textContent = "Not enough money — customer still owes ₦" + (price - cash);
  } else {
    result.textContent = "Change: ₦" + (cash - price);
  }
}
```
```text
calcBtn.addEventListener("click", calculateChange);
cashInput.addEventListener("input", calculateChange);
```
Marking guidance (out of 10):
Correct file structure and linking (2)
Named function and click listener (2)
Number() conversion used correctly (2)
Correct change when cash is enough (2)
Warning with correct shortfall when cash is short (1)
Live update on input (1)

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Adaeze Fashion has a product page. Customers who want to buy several items of the same product currently have to
message Adaeze on WhatsApp to ask, "How much for four?" Adaeze answers the same question dozens of times a day. She
wants the page to answer it instantly.
Relevant facts.
Each product has a fixed unit price (for example, the Hair Cream at ₦2,500).
Customers choose a quantity and want to see the total immediately.
Adaeze is not a programmer; her page was built in the Web Design course and now has a JavaScript file.
Decision point. How should the page let a customer see the total without messaging anyone?
Possible approaches.
1. Add the price of the item as plain text and let the customer multiply it themselves.
2. Build an event-driven calculator on the page: a quantity box, a button, and a live total paragraph.
3. Integrate a full online payment system with a server and a database.
Recommended solution (for this stage). Approach 2. It removes the repeated WhatsApp questions, uses only the skills from
this session, and works offline in the browser.
Example solution (condensed):
```text
const qtyInput = document.querySelector("#qty");
const totalLabel = document.querySelector("#total");
const unitPrice = 2500;
```
```text
function updateTotal() {
  const qty = Number(qtyInput.value);
  totalLabel.textContent = "Total: ₦" + (qty * unitPrice);
}
```
```text
qtyInput.addEventListener("input", updateTotal);
```
Here the unit price is a const (it is fixed on the page), and the total updates on every keystroke — the customer sees Total:
₦10000 the instant they type 4 .
Trade-offs.
Approach 1 is free but still burdens the customer and invites arithmetic mistakes (garbage in, garbage out).
Approach 2 takes about 30 minutes to build and permanently removes the repeated question; it is the professional first step.
Approach 3 is the eventual goal (it needs a server, payment gateway and security) and is far beyond this week. It is worth
doing only once the shop sells online for real.
Professional connection. This exact pattern — a small input, a live total, no reload — appears on almost every e-commerce site
(Jumia, Konga, and small shops alike). A junior front-end developer is very often asked to "make this total update when the
customer changes the quantity." This exercise is that real task.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
Use this as the live troubleshooting guide. When a learner is stuck, ask them to check the relevant row rather than giving the
answer.
K.1 The page reloads / jumps and loses the typed data
Symptoms: After submitting a form, the page refreshes, the boxes clear, and the URL grows ?... . Likely cause: The default
form behaviour was not cancelled — missing event.preventDefault() , or the listener was attached to the button instead of the
form. Investigate: Check that addEventListener("submit", function (event) { ... }) is on the <form> , and that
event.preventDefault(); is the first line inside. Fix: Move the listener to the form and add event.preventDefault(); . Confirm:
Submitting no longer reloads; the info stays on the page. Prevent: Always pair a submit listener with preventDefault() .
K.2 Button click does nothing
Symptoms: Clicking the button produces no change and no error. Likely causes: (a) The listener was never attached. (b) The
function name has () in the listener. (c) The querySelector selector does not match the HTML ( null ). Investigate: Add
console.log("listener attached"); just after the addEventListener line, and console.log("clicked"); inside the function. Reload
and click. Fix: Remove () from the function name; correct the selector; make sure the element id in HTML matches. Prevent:
Use ids consistently; place the script at the bottom of the body.
K.3 Cannot read properties of null (reading 'addEventListener')
Symptoms: Red error mentioning null . Likely cause: querySelector found no element — a typo in the selector, or the script
ran before the element existed. Investigate: In the Console, run the same selector, e.g. document.querySelector("#calcBtn") . If it
prints null , the selector is wrong. Fix: Correct the spelling/case ( #calcBtn ≠ #calcbtn ) or move the script to the bottom of the
body. Prevent: Match ids exactly and keep scripts at the bottom.
K.4 The total shows text glued together (e.g. ₦50005000 )
Symptoms: Numbers appear joined instead of added/multiplied. Likely cause: .value returns a string and Number() was not
used. Investigate: console.log(typeof billInput.value) . Fix: Wrap the value in Number(...) before arithmetic. Prevent: Treat
every .value as text until converted.
K.5 The total shows NaN
Symptoms: The result reads Total: ₦NaN . Likely cause: A box was empty or contained non-numeric text, so Number("") is 0
but a cleared required field or letters give NaN . Investigate: console.log(qtyInput.value) before calculating. Fix: Add an isNaN
guard and a friendly message (see Section F.7). Prevent: Validate before calculating; do not assume the user typed a number.
K.6 Reading .value gives an empty string
Symptoms: Console logs "" even though the page shows text. Likely cause: You read .value at load time (before the user
typed), or you selected the wrong element (e.g. the <label> instead of the <input> ). Investigate: Confirm the selector points
at the <input> , and that the read happens inside the event function, not at the top level. Fix: Move the read inside the
click/submit handler. Prevent: Read values only when reacting to an event.
Distinguish likely vs confirmed: In every case, the likely cause becomes confirmed only after you check it (e.g. run the selector
in the Console, or typeof the value). Teach learners to confirm before fixing.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "My Interactive Order Form"
Purpose: Practise events, reading input, conversion and preventDefault() in a form context the learner controls.
Realistic scenario: A small food business takes orders over a simple form. You will build a page where a customer types their
name, chooses a quantity of a product, and sees a live order summary — all without the page reloading.
Detailed instructions:
1. Create a folder assignment5 with index.html and js/order.js .
2. In the HTML, include a <form id="orderForm"> containing:
a text input for the customer's name ( id="name" ),
a number input for quantity ( id="qty" , default 1 ),
a fixed display of the unit price (for example, "Jollof Rice — ₦3,000 each"),
a submit button,
a paragraph id="summary" for the output.
3. In order.js :
Select the form, both inputs and the summary paragraph.
Add a submit listener that calls event.preventDefault() first.
Read the name and quantity, convert quantity with Number() .
Calculate total = qty * 3000 .
Set the summary to a sentence such as: "Adaeze, your 2 plates of Jollof Rice cost ₦6000."
Clear the form with form.reset() after showing the summary.
4. Add a live preview using an input listener on the quantity box, so the total also appears while typing.
Required deliverables:
```text
assignment5/index.html
```
```text
assignment5/js/order.js
```
A photo/screenshot of the page showing a completed order summary.
Submission format: Files in the class folder (or zipped); screenshot in the workbook.
Deadline: Before Session 6.
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
Correct structure & linking 3 External order.js linked at the bottom of the body
submit listener on the form 4 Attached to the form, not the button
event.preventDefault() used 4 Page never reloads on submit
Reads inputs & converts with Number() 3 Name as text, quantity as number
Correct total & clear summary 4 Total correct; sentence reads naturally
Live preview + clean output 2 input listener updates as the user types; no red errors
Common mistakes to avoid: forgetting preventDefault() ; attaching to the button; forgetting Number() ; misspelling a selector;
leaving the script in the head.
Instructor reference solution:
```text
// order.js — My Interactive Order Form
const orderForm = document.querySelector("#orderForm");
const nameInput = document.querySelector("#name");
const qtyInput = document.querySelector("#qty");
const summary = document.querySelector("#summary");
const unitPrice = 3000;
```
```text
function showSummary() {
  const name = nameInput.value.trim() || "Customer";
  const qty = Number(qtyInput.value);
  const total = qty * unitPrice;
  summary.textContent = `${name}, your ${qty} plates of Jollof Rice cost ₦${total}.`;
}
```
```text
orderForm.addEventListener("submit", function (event) {
  event.preventDefault();     // stop the reload
  showSummary();
  orderForm.reset();          // clear the boxes after showing
});
```
```text
qtyInput.addEventListener("input", showSummary);   // live preview
```

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key.)
Q1. Short answer. In one sentence, what is an event in a web page?
Q2. Multiple choice. Which line correctly makes myBtn run doThing when clicked? a) myBtn.addEventListener("click",
doThing()); b) myBtn.addEventListener("click", doThing); c) myBtn.onClick = doThing; d) myBtn.addEventListener(doThing, "click");
Q3. Explain in your own words. Why do we call event.preventDefault() inside a form's submit listener?
Q4. Practical identification. Given <input type="number" id="age" value="20"> , what does each print? a)
document.querySelector("#age").value b) typeof document.querySelector("#age").value c) Number(document.querySelector("#age").value)
```text
+ 5
```
Q5. Error detection. Find and fix the bug:
```text
const qty = document.querySelector("#qty");
const total = qty.value * 2500;   // user typed 4
console.log(total);               // sometimes wrong / unexpected
qty.addEventListener("click", function () { console.log("clicked"); });
```
Q6. Scenario. A shop's "Buy" button should show the item name in a message paragraph when clicked, using event.target .
Describe (or write) the listener that does this for a button <button class="buy">Sunglasses</button> .
INSTRUCTOR ANSWER KEY (Q1–Q6)
A1. An event is something that happens in the browser — usually caused by the user (a click, typing, submitting) or by the page
loading — that JavaScript can react to.
A2. (b) myBtn.addEventListener("click", doThing); . Option (a) calls the function immediately; (c) is not the standard method (and
case is wrong); (d) swaps the arguments.
A3. A form's default behaviour is to send the data and reload the page. preventDefault() cancels that default so the page stays
put, keeping our data and letting our JavaScript handle the information.
A4. a) "20" (a string), b) "string" , c) 25 (because Number converts "20" to 20, then +5).
A5. Two issues: (1) qty.value is a string placed at the top level, read once at load (before the user necessarily typed) and not
converted, so the maths may be wrong or NaN . (2) The learner tried to detect a click on an input, but the intended action is
unclear. Corrected version:
```text
const qty = document.querySelector("#qty");
function showTotal() {
  const total = Number(qty.value) * 2500;
  console.log(total);
}
qty.addEventListener("input", showTotal);
```
A6.
```text
const button = document.querySelector(".buy");
const message = document.querySelector("#message");
button.addEventListener("click", function (event) {
  message.textContent = "You selected: " + event.target.textContent;
});
```
event.target is the <button> , so event.target.textContent reads "Sunglasses" .

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today your pages learned to listen. An event is something that happens in the browser — a click,
typing, a form submit, a page load. You wired switches with element.addEventListener("click", functionName) , passing the
function's name (never calling it with () ), and learned the difference between named and anonymous functions. The event
object and event.target tell you what happened and which element triggered it. You read user input with .value (always text)
and converted it with Number() for maths, then updated the page live. Finally, you handled forms: listen for submit on the
<form> and call event.preventDefault() so the page does not reload and lose the data.
Five important takeaways:
1. An event is "a thing that happened"; a listener is "what to do when it happens".
2. addEventListener("click", myFunction) — pass the name, not myFunction() .
3. .value gives what the user typed, always as text; use Number() for maths.
4. event.target tells you which element was interacted with.
5. Forms: listen for submit on the form and always call event.preventDefault() .
Questions to help you recognise what you can now do:
Can I attach a click listener and update the page without reloading?
Can I read a number from an input and calculate with it?
Can I explain the difference between doThing and doThing() in a listener?
Can I stop a form from reloading the page, and say why that matters?
Connection to the next session: Right now the page accepts whatever the user types — even empty boxes or a fake email. Next
session we make the page check the input first, show clear error messages, and only proceed when everything is valid. We will
also learn to remember the user's details with localStorage, so their name is still there when they come back tomorrow.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
Learner attaches a listener and passes the function name without parentheses, unprompted.
Learner reads a value inside the event function (not at load) and converts it with Number() .
Learner attaches the submit listener to the form and adds preventDefault() as the first line.
Learner uses event.target or can explain what it would contain.
Learner tests boundary cases (e.g. empty box, cash less than price) without being told.
Common misconceptions to watch for and correct:
" addEventListener("click", doThing()) is fine." → No; the () runs it immediately. Demonstrate the bug from Section G.2.
" .value is a number because the input is type="number" ." → Prove it with typeof .
"The submit button's click is the form event." → It is not; pressing Enter bypasses a click listener. Use submit .
"Events need the internet." → Counters and live totals run entirely offline.
Suggested remedial exercises for learners who struggle:
1. Switch drill: give five one-line snippets where the function is called with () and ask learners to fix each so it runs only on
click.
2. Trace the flow: hand out the Adaeze calculator with the numbers filled in and ask learners to write, step by step, what
happens from click to updated total.
3. Number-conversion drill: give values from .value and ask learners to write the correct Number(...) line and expected
result.
Differentiation:
Level 1 (supported): provide calculator-partial/ with the HTML done and the JavaScript stubbed (selectors and function
shell written, body empty). Learner fills in the conversion, maths and listener.
Level 2 (standard): the guided exercise as written.
Level 3 (challenge): add a discount input and a VAT input to the calculator, apply both to the subtotal, and display
subtotal, discount amount, VAT amount and grand total — all updating live on input .
Timing guidance: The independent exercise is the heart of the session. If the room is slow, compress the case study to a 2-
minute mention and protect the practical time. If very fast, extend with the "live update on input " enhancement in Section F.7.
END OF SESSION 5
Next: Session 6 — Form Validation and Local Storage.
