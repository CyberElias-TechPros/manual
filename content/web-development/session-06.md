---
{
  "id": "web-development/session-06",
  "course": "web-development",
  "number": 6,
  "of": 12,
  "title": "Form Validation and Local Storage",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/web-development/session-06.png",
    "page": 101,
    "transcript": [
      "FORM VALIDATION AND LOCAL STORAGE",
      "PART 1: VALIDATION - ONLY CLEAN DATA GOES IN (GARBAGE IN, GARBAGE OUT)",
      "1. USER TYPES",
      "name and email",
      "in the form",
      "2. BROWSER CHECKS",
      "required, type=email,",
      "minlength, pattern",
      "3. YOUR JS CHECKS",
      "empty field? valid",
      "email format?",
      "4. MESSAGE",
      "friendly error shown",
      "or the data is saved",
      "HTML5 VALIDATION ATTRIBUTES - FREE CHECKS FROM THE BROWSER",
      "required - cannot be empty",
      "type=\"email\" - needs an @",
      "minlength - minimum letters",
      "pattern - a rule of your own",
      "PART 2: localStorage - THE BROWSER'S SMALL NOTEBOOK, IT SURVIVES A REFRESH",
      "THREE METHODS",
      "localStorage.setItem(\"name\", \"Chidi\");",
      "localStorage.getItem(\"name\"); // reads",
      "localStorage.removeItem(\"name\"); // deletes",
      "Per website, small, and it stores text only",
      "OBJECTS NEED A ROUND TRIP",
      "SAVE: JSON.stringify(obj) then setItem()",
      "LOAD: getItem() then JSON.parse(text)",
      "Storage keeps text only - convert objects to text and back",
      "COMMON MISTAKES: forgetting .trim() on user text | saving a raw object without JSON.stringify |",
      "reading a key that does not exist yet (it returns null - handle it with a default value)",
      "NIGERIAN EXAMPLE",
      "A visitor types her name once. You save it with setItem(\"customer\", name) - next time she opens the",
      "page it shows \"Welcome back, Ngozi\" even after she closes and reopens the browser tab."
    ],
    "hotspots": [
      {
        "label": "FORM VALIDATION AND LOCAL STORAGE",
        "x": 24.49,
        "y": 6.87,
        "w": 51.05,
        "h": 4.21,
        "mono": false
      },
      {
        "label": "PART 1: VALIDATION - ONLY CLEAN DATA GOES IN (GARBAGE IN, GARBAGE OUT)",
        "x": 19.78,
        "y": 15.88,
        "w": 60.51,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "1. USER TYPES 2. BROWSER CHECKS 3. YOUR JS CHECKS 4. MESSAGE",
        "x": 10.6,
        "y": 22.57,
        "w": 77.64,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "name and email required, type=email, empty field? valid friendly error shown",
        "x": 11.82,
        "y": 25.82,
        "w": 77.4,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "in the form minlength, pattern email format? or the data is saved",
        "x": 13.12,
        "y": 28.42,
        "w": 75.96,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "HTML5 VALIDATION ATTRIBUTES - FREE CHECKS FROM THE BROWSER",
        "x": 7.15,
        "y": 35.49,
        "w": 49.1,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "required - cannot be empty type=\"email\" - needs an @ minlength - minimum letters pattern - a rule of your own",
        "x": 9.97,
        "y": 39.1,
        "w": 77.72,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "PART 2: localStorage - THE BROWSER'S SMALL NOTEBOOK, IT SURVIVES A REFRESH",
        "x": 17.87,
        "y": 45.52,
        "w": 64.28,
        "h": 2.48,
        "mono": false
      },
      {
        "label": "THREE METHODS OBJECTS NEED A ROUND TRIP",
        "x": 7.15,
        "y": 51.7,
        "w": 67.59,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "localStorage.setItem(\"name\", \"Chidi\");",
        "x": 8.1,
        "y": 56.42,
        "w": 28.89,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "SAVE: JSON.stringify(obj) then setItem()",
        "x": 54.4,
        "y": 56.63,
        "w": 22.78,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "localStorage.getItem(\"name\"); // reads",
        "x": 8.1,
        "y": 61.34,
        "w": 28.89,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "LOAD: getItem() then JSON.parse(text)",
        "x": 54.4,
        "y": 64.63,
        "w": 22.03,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "localStorage.removeItem(\"name\"); // deletes",
        "x": 8.1,
        "y": 66.27,
        "w": 32.71,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "Per website, small, and it stores text only Storage keeps text only - convert objects to text and back",
        "x": 7.15,
        "y": 68.87,
        "w": 74.29,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "COMMON MISTAKES: forgetting .trim() on user text | saving a raw object without JSON.stringify |",
        "x": 7.15,
        "y": 74.06,
        "w": 66.31,
        "h": 2.21,
        "mono": false
      },
      {
        "label": "reading a key that does not exist yet (it returns null - handle it with a default value)",
        "x": 7.15,
        "y": 76.87,
        "w": 57.26,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "NIGERIAN EXAMPLE",
        "x": 7.15,
        "y": 82.63,
        "w": 13.75,
        "h": 2.39,
        "mono": false
      },
      {
        "label": "A visitor types her name once. You save it with setItem(\"customer\", name) - next time she opens the",
        "x": 7.15,
        "y": 85.91,
        "w": 49.75,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "page it shows \"Welcome back, Ngozi\" even after she closes and reopens the browser tab.",
        "x": 7.15,
        "y": 88.72,
        "w": 45.28,
        "h": 2.12,
        "mono": false
      }
    ],
    "width": 984,
    "height": 669
  },
  "module": "Week 2 — Module 2: DOM and Events (storage introduction)",
  "duration_minutes": 105,
  "difficulty": "Beginner (consolidating events and forms)",
  "prerequisite_knowledge": "Session 5 — events ( addEventListener ) for click , input and submit ; reading input with .value ; converting with Number() ; event.preventDefault() ; and Sessions 1–4 (variables, functions, conditions, arrays/objects, DOM selection and textContent ). A learner must be able to read an input value inside an event function; if not, run the review in Section E before continuing. Connection to previous session In Session 5 the page reacted to user actions, but it accepted anything the user typed — even an empty name or a fake email. Today we add a checkpoint: the page inspects the input, shows a clear message if something is wrong, and only proceeds when the input is good. We also learn how the browser can remember details after the page is closed or refreshed, using localStorage.",
  "connection_to_previous": null
}
---
# Form Validation and Local Storage

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 2 — Module 2: DOM and Events (storage introduction)

**Recommended duration:** 105 minutes

**Difficulty:** Beginner (consolidating events and forms)

**Prerequisite knowledge:** Session 5 — events ( addEventListener ) for click , input and submit ; reading input with .value ; converting with Number() ; event.preventDefault() ; and Sessions 1–4 (variables, functions, conditions, arrays/objects, DOM selection and textContent ). A learner must be able to read an input value inside an event function; if not, run the review in Section E before continuing. Connection to previous session In Session 5 the page reacted to user actions, but it accepted anything the user typed — even an empty name or a fake email. Today we add a checkpoint: the page inspects the input, shows a clear message if something is wrong, and only proceeds when the input is good. We also learn how the browser can remember details after the page is closed or refreshed, using localStorage.

**Preparation before class:** Learner webdev-practice folders from Session 5 available; projector showing VS Code plus Chrome; DevTools open (both the Console and the Application → Local Storage panel, so learners can see saved data); whiteboard for the validation flow diagram; instructor demo folder demo-week2-s6/ with index.html and js/validate.js (contents in Section G). Reinforce: this is the final session of Week 2 and feeds the Week 2 mini-project (a validated form).

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Explain why form validation matters using the idea of "garbage in, garbage out" and the safety of the user and the
business.
2. Use HTML5 validation attributes — required , minlength , type="email" and pattern — and describe what each one
checks.
3. Write manual JavaScript validation that checks for an empty field, checks a simple email format, and shows or hides an
error message element.
4. Prevent a form from submitting until it is valid, and give the user clear, friendly feedback.
5. Define localStorage as the browser's small, per-website, string-only storage that survives a refresh.
6. Save, read and delete values with localStorage.setItem() , .getItem() and .removeItem() .
7. Store objects and arrays by converting them with JSON.stringify() on save and JSON.parse() on load.
8. Build a page that welcomes a returning user ("Welcome back, [name]") and saves a small list, both persisting after a
refresh.
9. Diagnose and fix common mistakes: forgetting to trim() , saving data as a raw object without JSON.stringify() , and
reading a key that does not exist.

## C. Required Materials
<!-- kind:materials -->
Hardware
One computer per learner (academy desktops). Shared machines acceptable; pair learners and swap halfway.
Instructor computer connected to a projector or large screen.
Software
Google Chrome (any recent version).
Visual Studio Code (VS Code).
Windows 10 or Windows 11.
Accounts
None required. All work is offline.
Sample files
Instructor demo folder demo-week2-s6/ with index.html and js/validate.js (given in Section G).
A partially completed starter/contact-form-partial/ folder (HTML + error spans done, JavaScript stubbed) for Level 1
learners.
Worksheets
Worksheet 6.1 — "Spot the Bad Input" (given five pieces of user input, tick whether each is valid and name the rule; 1 page).
Worksheet 6.2 — "Save or Parse?" (given five lines, decide whether JSON.stringify or JSON.parse is needed; in the learner
workbook, Part 3).
Tools
Chrome DevTools: the Console and the Application → Local Storage panel (used to watch data being saved in real time).
Internet
Not required. If available, the instructor may optionally show the MDN page for localStorage at the end, but the session
does not depend on it.
Alternative for learners who lack a facility
Everything runs offline. A learner with only a phone can pair with a desktop learner and photograph the code, then practise
in a phone browser tab afterwards. The localStorage examples work in any modern mobile browser too.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector, open a simple contact form (name, email, message, a "Send" button). Demonstrate two bad
submissions using only the browser and the Console — no code yet.
What the instructor says:
"Imagine you are the person receiving orders for Adaeze Fashion. A customer fills your new contact form and presses Send.
What if the name box is empty? What if the 'email' is just the word hello ? What if the message is blank? At the moment,
in the form we built last week, the page happily accepts all of that. It says 'Thank you!' — for an order it cannot even reply
to."
Type nothing into the fields and submit; then type hello in the email field and submit. Both times the page thanks you.
"That is called garbage in, garbage out. If the page accepts junk going in, the shop has junk coming out — wrong orders,
missed customers, wasted time. Today we put a checkpoint at the door of the form: nothing gets through until it is good."
Second half of the hook — memory. Now say:
"And here is a second problem. Every time this customer refreshes the page, the form forgets them completely. Would it not
be better if the shop's page remembered their name and greeted them, 'Welcome back, Chinedu'? The browser can
actually remember — right here on this computer — even after the page is closed. That is the second thing we learn
today."
On the projector, open the Console, type the following and press Enter, then refresh the page and type it again:
```text
localStorage.setItem("demoName", "Chinedu");
localStorage.getItem("demoName");
```
The second time (after refresh) it still prints "Chinedu" .
"It remembered, even through a refresh. That is localStorage."
Expected learner response: Learners will recognise the empty-form problem from their own experience with websites that
reject submissions. Some will ask, "Is this a database?" Explain: no — it is only on this computer, in this browser, for this website.
Why this opener works: It creates two concrete problems — bad data and forgotten details — that the two halves of today's
lesson solve, and it gives learners an immediate, visible proof that the browser can remember.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Run this quickly as an oral round-robin. Put the questions on the projector.
Question 1: "In Session 5, which event do we listen for on a form, and what is the first line inside the handler?"
Expected answer: the submit event; the first line is event.preventDefault(); .
Common gap: learners attach to the button or forget preventDefault . Re-state: always listen on the form and prevent the
default reload.
Question 2: "How do you read what the user typed in <input id="email"> ?"
Expected answer: const email = document.querySelector("#email").value; — a string.
Common gap: reading at load time instead of inside the handler. Remind them to read it when reacting to the event.
Question 3: "What does Number("2500") return, and what does Number("abc") return?"
Expected answer: 2500 ; and NaN (Not a Number).
Common gap: learners think "abc" becomes 0 . Clarify: it becomes NaN .
Question 4: "What is the difference between === and = ?"
Expected answer: === compares; = assigns.
Common gap: using = in an if . Reinforce the difference from Session 2.
Bridge to today (say this):
"You can react to a submit and read the values. Today we add two new powers: checking those values before we trust
them, and remembering them after the page is gone. Think of a bank teller: they must check your ID before paying out
cash (validation), and the bank keeps a record of your account (storage)."
If more than a third of the class cannot answer Question 1 or 2, spend an extra 10 minutes redoing the form example from
Session 5 before continuing.
Quick refresher (only if needed):
```text
<form id="f">
  <input id="email">
  <button type="submit">Send</button>
</form>
<script>
  const f = document.querySelector("#f");
  f.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(document.querySelector("#email").value);
  });
</script>
```

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 Why validation matters
The idea. Validation means checking that the information a user typed is correct and complete before we accept or use it.
Plain-English definition. Validation is the form's security guard. Before the form is allowed to "go through", the guard checks: Is
the name present? Is the email in a sensible shape? Did the user actually write a message?
Why it exists. Two big reasons:
1. Garbage in, garbage out. If a shop's order form accepts an empty name or a fake email, the shop cannot contact the buyer,
and the order is wasted. Bad input guarantees bad output.
2. Protecting the user and the business. Clear validation stops honest mistakes (a forgotten field or a mistyped email) and
discourages nonsense or harmful input. It saves time, money and reputation.
Real-life analogy. Think of a bank teller. Before paying out money, the teller checks your ID and your account details. A bank
that paid anyone who walked in, with any name, would collapse. A form is the same: it must check before it acts.
Two layers of validation — and why we use both:
HTML5 validation — built-in browser checks (attributes like required and type="email" ). Fast and free, but limited and
easy to bypass.
JavaScript validation — our own checks. More control, custom messages, and logic the browser cannot do alone (like
comparing two fields).
The professional approach is: use HTML5 for simple checks and add JavaScript for anything important. Never rely on the
browser alone.
Important limitation / misconception. "If the browser checks it, my data is safe." False. HTML validation can be bypassed (a
user can edit the page, or a script can post directly). Real-world apps must re-check everything on the server too — that is a
later topic. For now, our client-side validation protects the user experience; note that server validation is the eventual safety net.
How a learner recognises good validation: the form refuses to proceed with an empty or malformed field and shows a clear,
specific message next to the offending field.
F.2 HTML5 built-in validation attributes (brief and practical)
Before writing any JavaScript, the browser can already do some checking through special attributes on the input element.
required — the field must not be empty:
```text
<input type="text" id="name" required>
```
If the user leaves it empty and submits, the browser blocks the submit and shows a small bubble: "Please fill out this field."
minlength — the text must be at least this many characters:
```text
<input type="text" id="name" minlength="2" required>
```
A single letter is rejected. This stops accidental one-character names.
type="email" — the browser expects something shaped like an email (it must contain @ and a domain):
```text
<input type="email" id="email" required>
```
If the user types hello , the browser blocks it and says "Please include an '@' in the email address."
pattern — a custom rule using a regular expression (a pattern language):
```text
<input type="text" id="phone" pattern="[0-9]{11}" title="Enter an 11-digit phone number">
```
- 0-9]{11} means "eleven characters, each a digit from 0 to 9". The title attribute is the message shown when the pattern
fails. This is useful for Nigerian phone numbers (11 digits, e.g. 08012345678 ).
What HTML5 validation gives you automatically:
It blocks the submit when a rule fails.
It shows a small built-in message.
It styles the field as invalid ( :invalid in CSS, if you wish).
Limitations of HTML5 validation:
The messages are short and cannot be fully customised in a consistent way across browsers.
It cannot compare two fields (e.g. "confirm password").
A determined user can bypass it.
Say to the class: "HTML5 attributes are the first guard — quick and free. We use them, but we do not depend on them.
JavaScript is our second, smarter guard."
Common misconception. Learners think putting required on the input is enough to stop an empty name. It stops the browser's
default submit, but if our JavaScript runs first or the browser's validation is disabled, the value can still be empty. That is why we
also check in JavaScript.
F.3 Manual JavaScript validation — checking and reporting
Now we do it ourselves so we control the logic and the messages.
The pattern: check the value, then show or hide an error.
```text
<form id="contactForm" novalidate>
  <label for="name">Your name</label>
  <input type="text" id="name">
  <small id="nameError" class="error"></small>
```
```text
  <label for="email">Your email</label>
  <input type="text" id="email">
  <small id="emailError" class="error"></small>
```
```text
  <button type="submit">Send</button>
</form>
<p id="success"></p>
```
```text
const form = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const success = document.querySelector("#success");
```
```text
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = true;
```
```text
  // Clear old messages
  nameError.textContent = "";
  emailError.textContent = "";
  success.textContent = "";
```
```text
  // 1. Check the name is not empty
  if (nameInput.value.trim() === "") {
    nameError.textContent = "Please enter your name.";
    isValid = false;
  }
```
```text
  // 2. Check the email looks like an email
  const email = emailInput.value.trim();
  if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }
```
```text
  // 3. Only proceed when everything is valid
  if (isValid) {
    success.textContent = "Thank you, " + nameInput.value.trim() + "! Your message was sent.";
    form.reset();
  }
});
```
Line by line:
novalidate on the form tells the browser not to use its own HTML5 bubbles, so our custom messages are the only ones the
user sees. (We keep required etc. as a backup, but we control the presentation.)
The three querySelector lines grab the fields and their error elements.
Inside the submit handler: event.preventDefault() stops the reload (Session 5).
let isValid = true; is a flag — a variable that tracks whether everything passed. We start optimistic and set it to false the
moment any check fails.
We clear old messages first, so a resubmission does not show stale errors.
Check 1: nameInput.value.trim() === "" — .trim() removes spaces from the start and end, so a name of only spaces is
treated as empty. If empty, we put a message in nameError and set isValid = false .
Check 2: we take the trimmed email and test it. The simple check is: does it contain @ and a . ? The ! means "if it does
not contain". If either is missing, we show an error. (This is a simple check, not a perfect one — see the misconception
below.)
Check 3: only if isValid is still true do we show the success message and reset the form.
Why show the error in a separate <small> element? Keeping the message in its own element (styled red) is clean, accessible,
and easy to clear. It sits right next to the field it refers to.
The email check — honest about its limits: our check is "contains @ and . ". It will accept a@b.c (technically valid enough)
and reject hello . It will not catch every odd email, but it stops the obvious mistakes. A more precise check uses a regular
expression (pattern), which we saw with the pattern attribute. For beginners, the simple contains-check is a good, honest
starting point.
Real-life analogy. A flag ( isValid ) is like a checklist at an airport gate. The gate starts "clear". Each check that fails raises a red
flag. Only if no red flags remain is the passenger allowed through.
Common misconception. Learners write separate if blocks that show an error but forget to set isValid = false , so the form
proceeds even with errors. Always set the flag.
F.4 Giving clear feedback — the UX of validation
Good validation is not just about blocking bad input; it is about telling the user kindly what to do.
Principles:
1. Be specific. "Please enter your name" is better than "Invalid."
2. Be close. Put the message next to the field it concerns.
3. Be kind. The user is not an enemy; help them fix it.
4. Clear old errors when the user tries again.
5. Show success clearly when everything passes.
Styling the error (optional but recommended):
```text
.error {
  color: #c0392b;
  font-size: 0.9rem;
  display: block;
  min-height: 1em;
}
```
min-height: 1em reserves a little space so the layout does not jump when a message appears.
Optional live feedback: you can also re-check a field on input , clearing the error as soon as the user fixes it:
```text
nameInput.addEventListener("input", function () {
  if (nameInput.value.trim() !== "") {
    nameError.textContent = "";
  }
});
```
This gives the user the feeling that the form is listening and forgiving.
Common misconception. Learners hide errors by only appending a message each time, so the user sees three copies after three
attempts. Always clear first, then set.
F.5 What is localStorage?
The idea. localStorage is a small storage area that the browser gives to each website, living on the user's computer. It keeps
information even after the page is refreshed or closed and reopened.
Plain-English definition. Think of localStorage as the browser's small filing cabinet, one drawer per website. A website can
put labelled notes in its own drawer, read them later, and remove them. No other website can open that drawer.
Key facts — memorise these:
1. Per website (per origin). Each website gets its own separate storage. Data saved on adaezefashion.com is not visible to
another site.
2. Persists. It survives page refresh, closing the tab, and restarting the browser. It is not deleted when you close the tab. (Only
clearing browser data or our own removeItem deletes it.)
3. String-only. It can only store text (strings). This is the crucial limitation — numbers, objects and arrays must be converted
to text first (Section F.7).
4. Small. Usually about 5 MB per website — plenty for a name or a small list, not for photos or large data.
5. On this computer only. Data saved on this laptop is not on another laptop, and not on any server.
Why it exists. Websites often want to remember simple things between visits: your chosen theme, your name, a shopping cart,
a language setting. A database on a server is overkill for a tiny preference, and it may not exist yet. localStorage is the
lightweight, instant option that needs no internet.
Real-life analogy. localStorage is a sticky note stuck to the fridge in your own kitchen. Anyone in your house can read it
later, but the neighbours cannot see it, and it stays there until someone peels it off.
Common misconception. "localStorage is a database / is shared across users / is secure." All false. It is local to one browser on
one machine, unencrypted, and visible to anyone using that computer. Never store passwords, card numbers, or secrets in
localStorage.
How a learner sees it: open DevTools → Application tab → Local Storage → click the site. The saved key/value pairs appear and
update live as you save.
F.6 The three essential localStorage commands
Saving a value — setItem(key, value) :
```text
localStorage.setItem("name", "Adaeze");
```
"name" is the key (the label on the sticky note).
"Adaeze" is the value (what we write on it).
Both must be strings.
Reading a value — getItem(key) :
```text
const savedName = localStorage.getItem("name");
console.log(savedName);   // "Adaeze"
```
If the key was never saved, getItem returns null .
```text
const missing = localStorage.getItem("somethingNeverSaved");
console.log(missing);   // null
```
Removing a value — removeItem(key) :
```text
localStorage.removeItem("name");
```
You can also clear everything for this site with localStorage.clear(); , but use that carefully — it deletes all your keys.
Worked example — save, read, remove:
```text
// 1. Save
localStorage.setItem("greeting", "Good morning");
```
```text
// 2. Read (on the same page or after a refresh)
console.log(localStorage.getItem("greeting"));   // "Good morning"
```
```text
// 3. Remove
localStorage.removeItem("greeting");
console.log(localStorage.getItem("greeting"));   // null
```
Say to the class: " setItem writes the note; getItem reads the note; removeItem peels it off. Three commands — that is the
whole filing cabinet."
Common misconception. Learners expect getItem to give the value back as it was saved. It always gives a string or null . If
they saved a number 25 , getItem returns the string "25" , and "25" + 5 gives "255" . Convert back with Number() if you need
maths.
F.7 The string limitation — JSON.stringify() and JSON.parse()
localStorage can only hold strings. But real data is often a number, an object, or an array. To store those, we convert them to a
string on the way in, and convert them back on the way out.
What is JSON? JSON (JavaScript Object Notation) is a text format for representing objects and arrays as a string. It looks almost
exactly like JavaScript object syntax, but it is a string. Example: the object
```text
const user = { name: "Chinedu", age: 22 };
```
becomes the JSON string:
```text
'{"name":"Chinedu","age":22}'
```
Converting to a string — JSON.stringify() :
```text
const user = { name: "Chinedu", age: 22 };
localStorage.setItem("user", JSON.stringify(user));
// stored as the string: {"name":"Chinedu","age":22}
```
Converting back to an object — JSON.parse() :
```text
const raw = localStorage.getItem("user");   // a string (or null)
const userObject = JSON.parse(raw);          // back to an object
console.log(userObject.name);                // "Chinedu"
```
An array example — a saved list:
```text
const interests = ["tailoring", "marketing", "design"];
localStorage.setItem("interests", JSON.stringify(interests));
```
```text
// later…
const savedInterests = JSON.parse(localStorage.getItem("interests"));
console.log(savedInterests[0]);   // "tailoring"
```
Remember it this way:
JSON.stringify = "make this object into a string to save".
JSON.parse = "turn this saved string back into an object".
stringify → String → to be gift-wrapped for storage.
parse → to parse (unpack) it back.
The null trap — a very common beginner bug. If you save nothing, getItem returns null , and JSON.parse(null) does not
throw but returns null , while JSON.parse("") throws a red error. Always check before parsing:
```text
const raw = localStorage.getItem("interests");
const interests = raw ? JSON.parse(raw) : [];
```
The raw ? ... : ... is a short form of "if raw is not null/empty, parse it; otherwise use an empty array." This prevents crashes
on a first visit.
Common misconceptions:
"localStorage can store an object directly." No — setItem("user", user) would save the string "[object Object]" , which is
useless. Always JSON.stringify .
" JSON.parse never fails." It throws on invalid text, so guard with the null check.
"I can store numbers and they stay numbers." They come back as strings; convert if needed.
F.8 The running example — "Welcome back" and a saved list
Part A — Welcome back. We save the user's name and greet them on their next visit.
HTML ( index.html ):
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Adaeze Fashion — Welcome</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 460px; margin: 40px auto; }
    h1 { color: #8a2b6b; }
    input, button { padding: 8px; margin-top: 8px; }
    #greeting { font-size: 20px; font-weight: bold; margin-top: 16px; }
    #list { margin-top: 10px; }
  </style>
</head>
<body>
  <h1>Adaeze Fashion</h1>
```
```text
  <div id="greeting">Welcome!</div>
```
```text
  <label for="nameInput">What is your name?</label>
  <input type="text" id="nameInput" placeholder="e.g. Chinedu">
  <button id="saveName">Save my name</button>
  <button id="forgetName">Forget me</button>
```
```text
  <hr>
```
```text
  <h2>My Interests</h2>
  <input type="text" id="interestInput" placeholder="e.g. tailoring">
  <button id="addInterest">Add interest</button>
  <ul id="list"></ul>
```
```text
  <script src="js/validate.js"></script>
</body>
</html>
```
JavaScript ( js/validate.js ):
```text
// ---------- Part A: Welcome back ----------
const greeting = document.querySelector("#greeting");
const nameInput = document.querySelector("#nameInput");
const saveName = document.querySelector("#saveName");
const forgetName = document.querySelector("#forgetName");
```
```text
function showGreeting() {
  const saved = localStorage.getItem("userName");
  greeting.textContent = saved ? "Welcome back, " + saved + "!" : "Welcome!";
}
```
```text
saveName.addEventListener("click", function () {
  const name = nameInput.value.trim();
  if (name === "") {
    greeting.textContent = "Please type a name first.";
    return;
  }
  localStorage.setItem("userName", name);
  showGreeting();
  nameInput.value = "";
});
```
```text
forgetName.addEventListener("click", function () {
  localStorage.removeItem("userName");
  showGreeting();
});
```
```text
// Run once when the page loads
showGreeting();
```
```text
// ---------- Part B: Interests list ----------
const interestInput = document.querySelector("#interestInput");
const addInterest = document.querySelector("#addInterest");
const list = document.querySelector("#list");
```
```text
function loadInterests() {
  const raw = localStorage.getItem("interests");
  const interests = raw ? JSON.parse(raw) : [];
```
```text
  list.textContent = "";                        // clear the <ul> first
  interests.forEach(function (item) {           // rebuild one <li> per item
    const li = document.createElement("li");
    li.textContent = item;
    list.appendChild(li);
  });
}
```
```text
addInterest.addEventListener("click", function () {
  const item = interestInput.value.trim();
  if (item === "") {
    return;
  }
  const raw = localStorage.getItem("interests");
  const interests = raw ? JSON.parse(raw) : [];   // read existing list
  interests.push(item);                           // add the new one
  localStorage.setItem("interests", JSON.stringify(interests));  // save it back
  interestInput.value = "";                       // clear the box
  loadInterests();                                // redraw the list
});
```
```text
loadInterests();   // draw any saved list on load
```
How it behaves — step by step:
1. First visit: the greeting says Welcome! . Type Chinedu , click Save my name. The greeting becomes Welcome back, Chinedu! ,
and the name is stored.
2. Refresh the page. The greeting still says Welcome back, Chinedu! because showGreeting() runs on load and reads from
localStorage.
3. On another computer, the greeting would say Welcome! — the data is local to this machine.
4. Add interests ( tailoring , then marketing ). Each is added to the array, saved as JSON, and the <ul> is redrawn. Refresh —
the list is still there.
5. Click Forget me to remove the name, then refresh — the greeting resets to Welcome! .
Line-by-line highlights:
showGreeting() : reads userName ; the saved ? ... : ... shows the personal or generic greeting depending on whether a
value exists.
saveName handler: trims the name, refuses an empty one, saves with setItem , updates the greeting.
forgetName handler: removeItem deletes the stored name, then re-renders.
showGreeting(); at the bottom runs once on load so a returning user is greeted immediately.
loadInterests() : reads interests , parses JSON safely with the null check, clears the <ul> , and rebuilds it with a <li> per
item — reusing the DOM skills from Session 4.
addInterest handler: reads the existing array, pushes the new item, saves the whole array back as JSON, then redraws.
loadInterests(); at the bottom draws the saved list on load.
Expected on-page behaviour after refresh: the name and interests are still displayed, proving persistence. DevTools →
Application → Local Storage shows userName and interests (the latter as a JSON string).
F.9 Summary of the session
Validation stops bad input before it causes bad outcomes ("garbage in, garbage out").
HTML5 attributes ( required , minlength , type="email" , pattern ) give quick, free checks.
JavaScript validation checks .value (with .trim() ), shows/hides an error element, uses an isValid flag, and only
proceeds when everything passes.
localStorage is the browser's small, per-site, persistent, string-only store.
setItem , getItem , removeItem save, read and delete; getItem returns a string or null .
JSON.stringify to save objects/arrays; JSON.parse to read them back, guarded with a null check.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 What the instructor prepares
demo-week2-s6/index.html and js/validate.js (the contact form and the welcome/list example combined).
Both files open in VS Code.
Chrome open to the page, with DevTools open. Keep Console and Application → Local Storage visible on the projector
(Application may be in a second DevTools dock).
Whiteboard with the validation flow: submit → preventDefault → clear errors → check each field → set isValid → if valid,
success.
G.2 Demonstration 1 — the contact form validator (8 minutes)
Say: "Watch how the form refuses to send until the customer gets it right."
Do on the projector:
1. Show the contact form HTML with the two <small> error elements and novalidate on the form.
2. Type in the JavaScript from Section F.3.
3. Save, refresh, press F12 .
4. Click Send with everything empty. Expected: two red messages appear — "Please enter your name." and "Please enter a
valid email address." The page does not reload, and no success message shows.
5. Type a name but a bad email ( hello ). Send again. Expected: only the email error shows, because the name now passes.
6. Type a valid email ( chinedu@example.com ). Send. Expected: the success paragraph appears and the boxes clear.
Pause and predict before step 5: "If I type a name but leave the email as hello , will we see one error or two?" (One — only the
email.)
Inject a classic error: change nameInput.value.trim() === "" to nameInput.value == "" (removing .trim() ), save, refresh.
Type a name of just a few spaces and send. Expected: with .trim() , spaces count as empty and the error shows; without it,
spaces are treated as a valid name and it slips through. Show the bug, then put .trim() back.
Say: "Always trim. A name made of spaces is not a name."
Reasoning to explain aloud: the isValid flag starts true and is flipped to false by any failed check; we clear old errors first; only
a clean pass shows success.
G.3 Demonstration 2 — localStorage persistence (7 minutes)
Say: "Now watch the browser remember."
Do on the projector:
1. In the Console, type localStorage.setItem("userName", "Adaeze"); and press Enter.
2. Open DevTools → Application → Local Storage and point at the new userName entry.
3. Refresh the page. In the Console, type localStorage.getItem("userName"); → "Adaeze" . Say: "It survived the refresh."
4. Now demonstrate the object problem: save an object the wrong way:
```text
const user = { name: "Chinedu", age: 22 };
localStorage.setItem("user", user);       // WRONG
localStorage.getItem("user");             // "[object Object]"
```
Say: "See [object Object] ? That is useless. We must convert first." Fix it:
```text
localStorage.setItem("user", JSON.stringify(user));   // RIGHT
JSON.parse(localStorage.getItem("user")).name;        // "Chinedu"
```
5. Show the null trap:
```text
JSON.parse(localStorage.getItem("nothingHere"));   // null, no crash
JSON.parse("");                                     // red error
```
Say: "Guard your parse with a null check, as in our example."
6. Finally, click Forget me on the page, refresh, and show the greeting has reset — proving removeItem works.
Questions to ask during the demo:
"Will the saved name appear on another learner's computer?" (No — localStorage is per browser, per machine.)
"What type does getItem return for a saved number?" (A string.)
"Why do we JSON.stringify before saving an array?" (Because localStorage only stores strings.)

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: With the instructor guiding step by step, build a "Signup Validator with Saved Draft" — a small form that validates
a name and an email, shows errors, greets the user on success, and remembers the last name typed even if the page is refreshed
before submitting.
Starting materials: A new folder webdev-practice/s6/ with an empty index.html and an empty js/signup.js .
Procedure (instructor calls out each numbered step; learners follow; instructor walks the room):
1. Create index.html with the form and error elements:
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Signup</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 460px; margin: 40px auto; }
    label { display: block; margin-top: 12px; }
    input { padding: 8px; width: 100%; box-sizing: border-box; }
    button { margin-top: 14px; padding: 10px 18px; }
    .error { color: #c0392b; display: block; min-height: 1em; }
    #success { color: #1e7e34; font-weight: bold; margin-top: 12px; }
  </style>
</head>
<body>
  <h1>Create your account</h1>
```
```text
  <form id="signupForm" novalidate>
    <label for="name">Full name</label>
    <input type="text" id="name" required>
```
```text
    <small id="nameError" class="error"></small>
```
```text
    <label for="email">Email address</label>
    <input type="text" id="email" required>
    <small id="emailError" class="error"></small>
```
```text
    <button type="submit">Sign up</button>
  </form>
  <p id="success"></p>
```
```text
  <script src="js/signup.js"></script>
</body>
</html>
```
2. Create js/signup.js and select the elements:
```text
const form = document.querySelector("#signupForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const success = document.querySelector("#success");
```
3. Add the validation on submit:
```text
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let isValid = true;
```
```text
  nameError.textContent = "";
  emailError.textContent = "";
  success.textContent = "";
```
```text
  if (nameInput.value.trim().length < 2) {
    nameError.textContent = "Please enter your full name (at least 2 letters).";
    isValid = false;
  }
```
```text
  const email = emailInput.value.trim();
  if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }
```
```text
  if (isValid) {
    const name = nameInput.value.trim();
    success.textContent = "Welcome, " + name + "! Your account is ready.";
    localStorage.setItem("lastSignup", name);
    form.reset();
  }
});
```
4. Pause and predict: "If I leave both fields empty, how many errors appear?" (Two.) Then "If I fix the name but the email is still
abc , how many?" (One.)
5. Add the saved draft feature — remember the name as the user types, and restore it on load:
```text
// Save the draft name while the user types
nameInput.addEventListener("input", function () {
  localStorage.setItem("draftName", nameInput.value);
});
```
```text
// On page load, restore any saved draft name
const draft = localStorage.getItem("draftName");
if (draft) {
  nameInput.value = draft;
}
```
6. Save, refresh, and test:
Type a name but do NOT submit. Refresh the page. The name is still in the box (the draft was restored).
Submit with everything valid. The success message shows and the form clears.
Check DevTools → Application → Local Storage to see lastSignup and draftName .
Expected result:
Empty submit → two red errors, no success, no reload.
Bad email only → one red error.
Valid inputs → green success message "Welcome, [name]! Your account is ready."
Refreshing after typing (but before submitting) keeps the typed name in the box.
localStorage panel shows draftName and (after a valid submit) lastSignup .
Points to pause on and predict:
After step 3: "What if I type an email of ada@ ?" (No . → error. ada@x.com → passes.)
After step 5: "Does the draft save only on submit, or while typing?" (While typing, because we listen for input .)
Troubleshooting while walking the room:
Page reloads on submit → missing event.preventDefault() , or listener on the button.
Success message shows even with errors → forgot isValid = false in a failed check.
Error never clears → forgot the clear-lines at the top of the handler.
Draft not restored → script in the head (runs before the input exists) or the key name differs between save and read.
- object Object] in storage → tried to save something that is not a string.
Completion checklist (learner ticks each):
submit listener on the form with preventDefault()
Empty name is rejected with a clear message
Invalid email is rejected with a clear message
Success only shows when both are valid
A name is saved to localStorage and restored after refresh
.trim() used when checking input
No red errors in the Console

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Build a "Nigerian Phone Number Checker" that validates an 11-digit phone number and remembers the last valid
number entered.
Scenario: Chidi's Provisions wants to collect customers' phone numbers for delivery. A valid Nigerian phone number is exactly
11 digits and starts with 0 (for example 08012345678 ). The form must reject anything else and show a clear message. When a
valid number is entered, it should be saved to localStorage and shown on the next visit.
Starting information (given):
A form with one text input ( id="phone" ), an error element ( id="phoneError" ), and a result paragraph ( id="phoneResult" ).
A submit button.
Requirements:
1. Create phone.html and js/phone.js , linked at the bottom of the body.
2. On submit: call event.preventDefault() , clear old messages.
3. Read the phone number and .trim() it.
4. Check three things:
it is not empty,
it is exactly 11 digits (hint: use .length ),
it starts with 0 (hint: use .startsWith("0") or check the first character).
5. If any check fails, show a specific message in the error element and do not proceed.
6. If all checks pass, show "Saved: [number]" and store the number under the key "lastPhone" .
7. On page load, if "lastPhone" exists, display "Last number: [number]" in the result paragraph.
Constraints:
Use the isValid flag pattern.
.trim() the input.
Do not store anything unless the number is valid.
Do not copy the signup example line-for-line.
Time allowance: 15 minutes.
Success criteria:
08012345678 → accepted and saved; Saved: 08012345678 .
8012345678 (10 digits, no leading zero) → rejected (wrong length and missing zero).
08012345abc → rejected (not all digits — treat letters as invalid).
080123456 (9 digits) → rejected (wrong length).
After a valid save, refreshing the page shows Last number: 08012345678 .
No red errors.
Hints:
Hint 1: check length with phone.length === 11 .
Hint 2: check the first character with phone.charAt(0) === "0" or phone.startsWith("0") .
Hint 3: to ensure every character is a digit, a simple approach is Number(phone) — if it is NaN , there were letters. (Use this
after the length and first-character checks.)
Hint 4: save with localStorage.setItem("lastPhone", phone); and read with localStorage.getItem("lastPhone"); .
Instructor answer key (do not show learners):
```text
// phone.js — Nigerian Phone Number Checker
const form = document.querySelector("#phoneForm");
const phoneInput = document.querySelector("#phone");
const phoneError = document.querySelector("#phoneError");
const phoneResult = document.querySelector("#phoneResult");
```
```text
form.addEventListener("submit", function (event) {
  event.preventDefault();
  phoneError.textContent = "";
  phoneResult.textContent = "";
```
```text
  const phone = phoneInput.value.trim();
  let isValid = true;
```
```text
  if (phone === "") {
    phoneError.textContent = "Please enter your phone number.";
    isValid = false;
  } else if (phone.length !== 11) {
    phoneError.textContent = "A phone number must be exactly 11 digits.";
    isValid = false;
  } else if (phone.charAt(0) !== "0") {
    phoneError.textContent = "A Nigerian phone number must start with 0.";
    isValid = false;
  } else if (isNaN(Number(phone))) {
    phoneError.textContent = "A phone number must contain digits only.";
    isValid = false;
  }
```
```text
  if (isValid) {
    phoneResult.textContent = "Saved: " + phone;
    localStorage.setItem("lastPhone", phone);
    form.reset();
  }
});
```
```text
// Show the last saved number on load
const lastPhone = localStorage.getItem("lastPhone");
if (lastPhone) {
```
```text
  phoneResult.textContent = "Last number: " + lastPhone;
}
```
Marking guidance (out of 10):
submit listener with preventDefault() (2)
.trim() and empty check (2)
Length check (2)
Leading-zero check (1)
Digit-only check (1)
Save only when valid + display on load (2)

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Adaeze Fashion started taking orders through a contact form on her website. Last month, three orders went wrong:
one had an empty name, so Adaeze could not address the customer; one had the email myemail (no @ ), so the confirmation
bounced; one customer typed their delivery address into the "name" box. Adaeze spent hours chasing these customers instead
of sewing.
Relevant facts.
The form has fields for name, email and message.
Adaeze receives the orders by email and by reading the saved data.
Most customers are honest but make simple typing mistakes.
The site is built with HTML, CSS and JavaScript; there is no server yet.
Decision point. How should the form be improved so bad orders stop reaching Adaeze?
Possible approaches.
1. Leave the form as it is and rely on careful customers.
2. Add HTML5 attributes and JavaScript validation with clear error messages, plus save the last entered details so returning
customers do not retype everything.
3. Rebuild the whole site with a server, accounts and a real order database.
Recommended solution (for this stage). Approach 2. It stops the three real problems with tools learned today:
required and a name minlength catch the empty or one-letter name.
A JavaScript email check ( @ and . ) catches myemail .
Clear inline messages guide customers to the right field.
Saving the customer's name and email in localStorage means a returning customer sees their details pre-filled.
Example solution (condensed):
```text
const name = document.querySelector("#name");
const email = document.querySelector("#email");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const form = document.querySelector("#orderForm");
```
```text
// Pre-fill from last visit
const savedName = localStorage.getItem("customerName");
if (savedName) name.value = savedName;
```
```text
form.addEventListener("submit", function (event) {
  event.preventDefault();
  nameError.textContent = "";
  emailError.textContent = "";
  let ok = true;
```
```text
  if (name.value.trim().length < 2) {
    nameError.textContent = "Please enter your full name.";
    ok = false;
  }
```
```text
  const e = email.value.trim();
  if (!e.includes("@") || !e.includes(".")) {
    emailError.textContent = "Please enter a valid email.";
    ok = false;
  }
```
```text
  if (ok) {
    localStorage.setItem("customerName", name.value.trim());
    // ... proceed with the order
  }
});
```
Trade-offs.
Approach 1 is free but guarantees repeated mistakes — exactly what already cost Adaeze hours.
Approach 2 takes under an hour and removes the common errors, plus improves returning-customer experience. It is the
right step for now.
Approach 3 is the long-term answer (proper orders need a server that also validates), but it is far beyond Week 2 and
expensive at this stage.
Professional connection. Every serious signup, checkout or contact form validates its inputs and remembers useful details. A
junior developer is constantly asked to "add validation so we stop getting junk orders" and "pre-fill the form for returning
users." Today's skills are exactly those tasks. Note the important professional caveat: client-side validation improves the
experience, but sensitive data still needs server-side validation and must never be trusted from the browser alone.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
Use this as the live troubleshooting guide. When a learner is stuck, ask them to check the relevant row rather than giving the
answer.
K.1 The form submits even though fields are invalid
Symptoms: Clicking Send proceeds (or reloads) despite empty or malformed fields. Likely causes: Missing
event.preventDefault() ; listener attached to the button not the form; a failed check does not set isValid = false . Investigate:
Add console.log(isValid) just before the final if (isValid) . Also confirm the listener is on the form. Fix: Add preventDefault() ;
move the listener to the form; set isValid = false in every failing branch. Confirm: Invalid submissions no longer proceed.
Prevent: Use one isValid flag and check it once at the end.
K.2 A name that is only spaces is accepted
Symptoms: Typing spaces (or leading/trailing spaces) passes validation. Likely cause: .trim() was not used before checking.
Investigate: console.log(JSON.stringify(nameInput.value)) — the quotes reveal the hidden spaces. Fix: Use .trim() before every
emptiness/length check and when saving. Prevent: Always trim text inputs (names, emails, messages).
K.3 [object Object] appears in localStorage
Symptoms: The saved value in the Application panel reads [object Object] . Likely cause: Saving an object/array without
JSON.stringify . Investigate: Look at the value shown in DevTools → Application → Local Storage. Fix: Wrap the object/array:
localStorage.setItem("user", JSON.stringify(user)); . Prevent: Remember: localStorage stores strings only; convert first.
K.4 Red error Unexpected token ... in JSON at position 0
Symptoms: A crash when reading saved data. Likely cause: JSON.parse received invalid text (often an empty string, or a value
saved without stringify earlier). Investigate: console.log(localStorage.getItem("yourKey")) to see what is actually stored, then
clear the bad key. Fix: Guard the parse: const raw = localStorage.getItem("key"); const data = raw ? JSON.parse(raw) : []; . If old
bad data exists, localStorage.removeItem("key") . Prevent: Always pair stringify (save) with parse (read), and null-check before
parsing.
K.5 A saved number comes back as text
Symptoms: "25" + 5 gives "255" after reading from localStorage. Likely cause: localStorage returns strings only. Investigate:
console.log(typeof localStorage.getItem("myNumber")) → "string" . Fix: Convert on read: const n =
Number(localStorage.getItem("myNumber")); . Prevent: Convert every number you read back from storage.
K.6 Nothing is remembered after refresh
Symptoms: The greeting or list resets on every refresh. Likely causes: Data was saved under a different key than it is read;
getItem was read before setItem ran; or the script runs before the elements exist. Investigate: Check the key spelling in both
places; check the Application panel for the saved key; check the Console for null . Fix: Use exactly the same key string; ensure
the script is at the bottom of the body. Prevent: Define your key names once and reuse them; keep scripts at the bottom.
K.7 Error messages pile up instead of replacing
Symptoms: Three error messages appear after three attempts. Likely cause: The handler appends without clearing first. Fix: Set
each error element's textContent = "" at the top of the handler before checking. Prevent: Clear, then validate, then display.
Distinguish likely vs confirmed: In every case, the likely cause becomes confirmed only after you check it (look in the
Application panel, run JSON.stringify on the value, or typeof the stored value). Teach learners to inspect before fixing.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "My Validated Contact Form with Memory"
Purpose: Combine validation and localStorage in one realistic page — the Week 2 mini-project scaffolding.
Realistic scenario: A local business (choose one: a tailor, a bakery, a phone repair shop) needs a contact form on its website.
The form must collect a name, an email and a message, reject bad input with clear messages, and remember the customer's
name and email so they are pre-filled on the next visit.
Detailed instructions:
1. Create a folder assignment6 with index.html and js/contact.js .
2. In the HTML, build a <form id="contactForm" novalidate> with:
a text input id="name" ,
a text input id="email" ,
a <textarea id="message"> ,
a <small class="error"> element next to each field with ids nameError , emailError , messageError ,
a submit button,
a success paragraph id="success" .
3. In contact.js :
On submit: preventDefault() , clear all errors and the success text.
Validate: name has at least 2 non-space characters; email contains @ and . ; message has at least 5 non-space
characters.
Use one isValid flag.
If valid: show a friendly success message, save the name and email to localStorage ( customerName , customerEmail ), and
reset the form.
4. On page load: if customerName exists, pre-fill the name field; if customerEmail exists, pre-fill the email field.
5. Add required and a suitable minlength to the HTML inputs as a second layer.
Required deliverables:
```text
assignment6/index.html
```
```text
assignment6/js/contact.js
```
A screenshot of the form showing (a) errors with bad input and (b) the pre-filled fields after a refresh.
Submission format: Files in the class folder (or zipped); screenshots in the workbook.
Deadline: Before Session 7.
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
Structure & linking 3 All fields, error elements, success paragraph; external script at the bottom of the body
submit + preventDefault() 3 Listener on the form; page never reloads
Name & message validation 4 .trim() used; correct minimum lengths; clear messages
Email validation 3 Rejects myemail ; accepts a@b.com
isValid flag & success 3 Only proceeds when all checks pass; friendly success message
localStorage save & pre-fill 4 Name and email saved; pre-filled after refresh; no [object Object]
Common mistakes to avoid: forgetting preventDefault() ; forgetting .trim() ; not setting isValid = false ; saving a raw object;
using a different key name for save and read.
Instructor reference solution:
```text
// contact.js — Validated Contact Form with Memory
const form = document.querySelector("#contactForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const messageInput = document.querySelector("#message");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const messageError = document.querySelector("#messageError");
const success = document.querySelector("#success");
```
```text
// Pre-fill from last visit
const savedName = localStorage.getItem("customerName");
const savedEmail = localStorage.getItem("customerEmail");
if (savedName) nameInput.value = savedName;
if (savedEmail) emailInput.value = savedEmail;
```
```text
form.addEventListener("submit", function (event) {
  event.preventDefault();
```
```text
  nameError.textContent = "";
  emailError.textContent = "";
  messageError.textContent = "";
  success.textContent = "";
```
```text
  let isValid = true;
```
```text
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();
```
```text
  if (name.length < 2) {
    nameError.textContent = "Please enter your name (at least 2 letters).";
    isValid = false;
  }
  if (!email.includes("@") || !email.includes(".")) {
    emailError.textContent = "Please enter a valid email address.";
    isValid = false;
  }
  if (message.length < 5) {
    messageError.textContent = "Please write a message of at least 5 characters.";
    isValid = false;
  }
```
```text
  if (isValid) {
    success.textContent = "Thank you, " + name + "! We will reply to " + email + " soon.";
    localStorage.setItem("customerName", name);
    localStorage.setItem("customerEmail", email);
    form.reset();
    // Re-fill from storage immediately after reset so the user sees their details
    nameInput.value = name;
    emailInput.value = email;
```
```text
  }
});
```

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key.)
Q1. Short answer. In one sentence, why do we validate a form before accepting its data?
Q2. Multiple choice. Which attribute makes a browser refuse to submit an empty field? a) empty b) required c) mandatory d)
```text
validate
```
Q3. Explain in your own words. Why must we use JSON.stringify() before saving an object to localStorage, and JSON.parse()
after reading it?
Q4. Practical identification. What does each print? a) localStorage.getItem("unknownKey") b)
JSON.parse(localStorage.getItem("unknownKey")) (assume no null guard) c) typeof localStorage.getItem("savedNumber") after saving
```text
25
```
Q5. Error detection. Find and fix the bugs:
```text
const name = document.querySelector("#name");
form.addEventListener("submit", function () {
  if (name.value == "") {
    document.querySelector("#nameError").textContent = "Name required";
  }
  localStorage.setItem("user", { name: name.value });
});
```
Q6. Scenario. A page greets returning users. Describe the two things the page must do: one when the user submits their name,
and one when the page loads — and name the localStorage methods involved.
INSTRUCTOR ANSWER KEY (Q1–Q6)
A1. Because bad input produces bad results ("garbage in, garbage out") and validation protects both the user (clear feedback,
fewer mistakes) and the business (usable contact details and orders).
A2. (b) required .
A3. Because localStorage can only store strings; an object stored directly becomes the useless string "[object Object]" .
JSON.stringify converts the object into a text form that can be saved, and JSON.parse converts that text back into a real object
when reading.
A4. a) null ; b) null (parsing the string "null" returns null ; note that parsing the empty string "" would throw an error); c)
"string" .
A5. Bugs: (1) no event.preventDefault() , so the page reloads and loses everything; (2) the event parameter is missing, so it
cannot be prevented; (3) no isValid flag / no trim() , so a name of spaces passes, and the form does not truly block; (4) the
object is saved without JSON.stringify , so it becomes [object Object] . Corrected:
```text
const name = document.querySelector("#name");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const nameError = document.querySelector("#nameError");
  nameError.textContent = "";
  const value = name.value.trim();
  if (value === "") {
    nameError.textContent = "Name required";
    return;
  }
  localStorage.setItem("user", JSON.stringify({ name: value }));
});
```
A6. On submit: read the trimmed name, save it with localStorage.setItem("userName", name) , and show the greeting. On page
load: call localStorage.getItem("userName") ; if it is not null, show "Welcome back, [name]" ; otherwise show a generic greeting. (To
remove, use removeItem .)

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today your forms learned to think before they act. Validation stops bad input — the empty names, the
broken emails — before they cause problems. The browser gives us quick checks through HTML5 attributes ( required ,
minlength , type="email" , pattern ), and JavaScript gives us full control: read the value, .trim() it, test it, show or hide an error
element, and use an isValid flag to decide whether to proceed. Then we met localStorage, the browser's small, per-website,
persistent, string-only filing cabinet. setItem , getItem and removeItem save, read and delete; because it stores only strings, we
use JSON.stringify to save objects and arrays, and JSON.parse (guarded against null ) to read them back. Our page now greets
returning users and remembers their list.
Five important takeaways:
1. Validate before you trust: garbage in, garbage out.
2. HTML5 attributes are the first guard; JavaScript validation is the smarter second guard with clear messages.
3. Use .trim() and an isValid flag; clear old errors, then only proceed when everything passes.
4. localStorage is per-site, persistent, and string-only.
5. JSON.stringify to save objects/arrays; JSON.parse (with a null check) to read them back. Never store passwords or secrets.
Questions to help you recognise what you can now do:
Can I stop a form from submitting until the fields are valid?
Can I explain the difference between required and a JavaScript check?
Can I save a name in localStorage and show it again after a refresh?
Can I explain why JSON.stringify and JSON.parse are needed?
Connection to the next session: Our pages can now react, validate and remember — but all the data is typed by hand or hard-
coded. Next session we learn to fetch data from a file or the internet and display it automatically — the fetch command and
JSON working together. That is how a shop's product list can live in one file and appear on the page without anyone typing
each item. That begins Week 3.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
Learner uses one isValid flag and sets it to false on every failed check without prompting.
Learner uses .trim() on text inputs and can explain why a name of spaces should fail.
Learner gives specific, kind error messages ("Please enter a valid email address") rather than "Invalid".
Learner saves with JSON.stringify and reads with JSON.parse , and guards against null .
Learner checks the Application panel to confirm the data was saved.
Common misconceptions to watch for and correct:
"HTML required is enough." → It can be bypassed; JavaScript is our second guard, and real apps also validate on the server.
"localStorage can store objects directly." → Show [object Object] and explain stringify .
"localStorage is shared / a database / secure." → It is local, per-browser, unencrypted; never store passwords.
" getItem returns the number I saved." → It returns a string; convert with Number() if needed.
Suggested remedial exercises for learners who struggle:
1. Trim drill: give five values (with leading/trailing spaces, all spaces, empty) and ask which should pass a "not empty" check.
2. Stringify/parse sorting: give ten lines and ask learners to mark each as "save" ( stringify ) or "read" ( parse ).
3. Fix-the-validator drill: hand out a validator missing preventDefault , missing isValid = false , and saving a raw object; ask
learners to find and fix all three.
Differentiation:
Level 1 (supported): provide contact-form-partial/ with the HTML and error elements done, and the JavaScript shell with
selectors and clear comment markers where each check goes.
Level 2 (standard): the guided and independent exercises as written.
Level 3 (challenge): add a password and confirm password field; require the password to be at least 6 characters and the
two to match (using === ); save only the username (never the password) and pre-fill the username on return.
Timing guidance: Validation (Sections F.1–F.4) and localStorage (F.5–F.7) are both essential; do not let one consume the other. If
the room is slow, run the localStorage demo but reduce the guided exercise to the validator only (drop the draft feature) and
keep the independent exercise. If very fast, extend with the Level 3 challenge and have learners inspect each other's storage in
the Application panel.
END OF SESSION 6
Next: Session 7 — Fetching and Displaying Data (fetch and JSON).
