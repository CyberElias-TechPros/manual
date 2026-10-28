---
{
  "id": "web-development/session-07",
  "course": "web-development",
  "number": 7,
  "of": 12,
  "title": "Fetching Data and JSON",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/web-development/session-07.png",
    "page": 124,
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
  "module": "Week 3 — Module 3: Data & Real Apps",
  "duration_minutes": 105,
  "difficulty": "Beginner–Intermediate (introduces asynchronous code)",
  "prerequisite_knowledge": "Sessions 1–6: variables, functions, if/else , arrays, objects, loops, DOM selection/creation, events and addEventListener , reading input values. Learner must be comfortable building a list with document.createElement and appendChild . Connection to previous session In Session 6 you saved small pieces of data in localStorage . That data lived only in the learner's browser. Today the page learns to ask for data from outside itself — from a separate file or a web service — and display it. This is how real shops show products that the shop owner can change without editing the page.",
  "connection_to_previous": null
}
---
# Fetching Data and JSON

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 3 — Module 3: Data & Real Apps

**Recommended duration:** 105 minutes

**Difficulty:** Beginner–Intermediate (introduces asynchronous code)

**Prerequisite knowledge:** Sessions 1–6: variables, functions, if/else , arrays, objects, loops, DOM selection/creation, events and addEventListener , reading input values. Learner must be comfortable building a list with document.createElement and appendChild . Connection to previous session In Session 6 you saved small pieces of data in localStorage . That data lived only in the learner's browser. Today the page learns to ask for data from outside itself — from a separate file or a web service — and display it. This is how real shops show products that the shop owner can change without editing the page.

**Preparation before class:** Instructor must install and confirm the VS Code Live Server extension works (see G.0 for why this session cannot be run from file:// ). Prepare a products.json file and a shop.html . Each learner should also have the Live Server extension installed (instructor may need 8 minutes at the start of the week to help).

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Explain in plain English what an API is and why web pages use them, using a real-world comparison.
2. Describe what JSON is and identify its structure (objects, arrays, keys, values) in a sample file.
3. Explain what a fetch call and a Promise are, in beginner terms, without needing to master the theory.
4. Write an async function that uses await fetch(...) and await response.json() to load data from a local products.json file.
5. Render fetched data to the page by looping the array and building DOM elements (reusing Session 4 skills).
6. Handle errors with try / catch , and display a friendly message when data cannot be loaded.
7. Diagnose the two most common fetch problems — running from file:// (blocked) and a wrong file path (404) — and fix
them.

## C. Required Materials
<!-- kind:materials -->
Hardware: One computer per learner; instructor computer with projector. Software: VS Code with the Live Server extension
installed; Google Chrome. No paid tools. Accounts: None. This session uses local files only; no internet API required (so it works
even if the academy network is down). Sample files:
products.json — a catalogue of 10 products (contents given in Section G.1).
shop.html — a page with a <div id="product-list"> container and the script linked.
js/shop.js — the JavaScript file learners build. Worksheets:
Worksheet 7.1 — "Read the JSON" (a printed JSON snippet; learners list the keys and one value).
Worksheet 7.2 — "Trace the Await" (order-of-execution questions). Tools: Chrome DevTools (Console + Network tab).
Internet: A live server (Live Server) runs locally, so no internet is needed for the lesson. If the academy has internet, the
instructor may optionally demonstrate a public API at the very end as a bonus. Alternative for learners lacking Live
Server: The instructor can run a simple local server. On Windows, if Python is installed: open a terminal in the project folder
and run python -m http.server 8000 , then open http://localhost:8000/shop.html . If neither is available, the instructor
demonstrates on the projector and learners observe, then install Live Server next session.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector, open a well-known Nigerian e-commerce page (or an image of one) showing many
products — clothing, phones, shoes. Do not open code.
What the instructor says:
"Look at this shop. It shows hundreds of products. Now think about how the shop owner works. When they add a new shoe
to the shop, do they go into the website's code and type a new <div> for the shoe? If they did, they would need a
programmer for every single product change. That is not how it works.
Instead, all the products live in one data file — or on the shop's server. The web page asks for the list, receives it, and
builds the product cards itself, automatically. Today your shop learns to do exactly that: ask for a list of products and
display whatever comes back."
Then demonstrate the hook: On the projector Console, type a tiny live example against a public API (only if internet is
available) OR show a saved screenshot of the Network tab. For example (internet optional):
```text
fetch("https://fakestoreapi.com/products/1")
  .then(response => response.json())
  .then(data => console.log(data.title));
```
Say: "The page asked a server far away for product number 1, and the server replied with a title. That reply came as text in a
format called JSON. Today you learn to ask and to read that reply."
Expected learner response: Learners often ask "so the products are not typed into the page?" Confirm: correct — the page is a
template; the data arrives separately. This is the central idea of the session.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Q1. "Write the line that creates a new element and the line that adds it to a container."
Expected: const p = document.createElement("p"); container.appendChild(p);
Gap: missing appendChild — the element exists but is invisible. Remind: creating is not adding.
Q2. "What does document.querySelector(".price") return if no element has class="price" ?"
Expected: null .
Gap: learners say "an empty string" or "undefined". Clarify: null ; and touching a property of null gives "Cannot read
properties of null" (this error will appear again with fetch).
Q3. "What is a loop used for, and which loop did we use to render a list of products?"
Expected: to repeat an action for each item; we used for...of or forEach .
Gap: confusing for syntax. Do a 30-second reminder.
Bridge: "You can already build a list from an array that is typed into your code. Today the array will arrive from a file after the
page loads. That timing is the new idea."

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 What is an API?
The idea. An API (Application Programming Interface) is a way for one program to request data or an action from another
program in an agreed format.
Plain-English definition. An API is a messenger between two systems. Your web page sends a request in a standard way; the
other system sends back a reply.
Analogy. Think of a restaurant. You (the web page) do not walk into the kitchen (the server/database) and start cooking. You
tell the waiter (the API) what you want. The waiter carries your order to the kitchen, and brings back your food (the data). You
and the kitchen do not need to know each other's internal workings — you just follow the waiter's standard menu and format.
Why APIs exist. They let websites show fresh data without hard-coding it. A weather page does not know tomorrow's weather
when it is built; it asks a weather API at the moment the user opens the page. A shop's product list can be updated by the owner
on the server, and every visitor sees the new list automatically.
What it does. Your code calls a URL (the API "menu item"), often with the fetch function, and receives JSON (the "food")
back.
Real-life comparison tie-in. When you use a banking app and it shows your balance, the app did not store your balance on
your phone. It asked the bank's API, "what is this customer's balance?", and the API replied. That reply is displayed.
Important limitation. Not every API is public, and many require a key or login. This course uses a local data file to keep things
safe, offline and free.
F.2 What is JSON?
The idea. JSON (JavaScript Object Notation) is a text format for structured data. It looks very much like JavaScript objects and
arrays, but it is stored as plain text.
Plain-English definition. JSON is a way of writing down data so that any program can read it. It uses { } for objects and [ ]
for arrays, with keys (names) and values.
Why it exists. Two different systems — maybe a page written by you and a server written in another language — both need to
understand the same data. JSON is a simple, universal language for that exchange.
Example JSON — one product:
```text
{
  "id": 1,
  "name": "Ankara Two-Piece Set",
  "price": 15000,
  "category": "clothing",
  "image": "images/ankara-set.jpg"
}
```
Example JSON — a list of products (an array of objects):
```text
[
  { "id": 1, "name": "Ankara Two-Piece Set", "price": 15000, "category": "clothing", "image": "images/ankara.jpg" },
  { "id": 2, "name": "Leather Handbag", "price": 22000, "category": "bags", "image": "images/handbag.jpg" }
]
```
Key rules of JSON (important, and different from JavaScript objects):
Keys must be in double quotes: "name" , not name .
Strings use double quotes only — no single quotes.
No trailing commas after the last item.
No comments allowed inside JSON.
Values may be: string, number, boolean, null , object, or array.
Common misconception. Learners think JSON is JavaScript. It is not. JSON is a text format. When you receive JSON text, you
must convert it into real JavaScript objects before you can use .name etc. That conversion is done by .json() from fetch, or
JSON.parse() when reading from localStorage (a skill from Session 6).
How a learner recognises it. A .json file, or a reply that uses { } , [ ] , : , and , with quoted keys. Open products.json in
VS Code to see it plainly.
F.3 Asynchronous code and Promises — the timing idea
The idea. fetch does not return the data immediately. It has to travel somewhere to get it. So the function returns a Promise —
an IOU for a value that will arrive soon.
Plain-English definition. A Promise is an object that represents a value that is not ready yet but will be (or will fail). You attach
instructions for "what to do when it arrives".
Analogy. A Promise is like buying a "PENDING" transfer or ordering food for delivery. You do not have the food in your hand
the instant the rider is dispatched. You have a promise it is coming. You then wait for the rider to arrive (await), and then you eat
(use the data).
Why it exists. Loading data over a network takes time. If JavaScript froze the whole page while waiting, the page would appear
broken. Instead, JavaScript says: "I will not block; here is a Promise. Call me when it is ready." This is called asynchronous code.
The two ways to handle a Promise:
Way 1 — .then() chaining (the older style):
```text
fetch("products.json")
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error("Something went wrong:", error);
  });
```
Way 2 — async / await (the modern, preferred style — what we use):
```text
async function loadProducts() {
  const response = await fetch("products.json");
  const data = await response.json();
  console.log(data);
}
```
async marks a function that will do something asynchronous.
await means "pause this function here until the result arrives" — without freezing the whole page.
response.json() also returns a Promise, so we await it too.
Say to the class: " await is the word 'wait for it'. Without await , you would try to use the data before it arrived — like eating
food that has not been delivered."
Common misconception. Learners forget await before response.json() , then get undefined or a Promise object in the
Console. Teach: every step that comes back from the network needs await .
F.4 Putting it together — fetch, parse, render
The full pattern for this session:
```text
const container = document.querySelector("#product-list");
```
```text
async function loadProducts() {
  try {
    const response = await fetch("products.json");
    const products = await response.json();
```
```text
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p class="cat">${product.category}</p>
        <p class="price">₦${product.price.toLocaleString()}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    container.textContent = "Sorry, we could not load products right now.";
    console.error("Failed to load products:", error);
  }
}
```
```text
loadProducts();
```
Line by line:
1. Grab the container element where the cards will go.
3. try — attempt the risky network work.
4. await fetch(...) — ask for the file; wait for the reply.
5. await response.json() — convert the JSON text into real JavaScript data.
6. forEach over the products; for each one, build a card and append it.
7. catch — if anything failed, show a friendly message and log the real error.
8. loadProducts(); — call the function to start it.
Note on toLocaleString() : 15000 .toLocaleString() gives "15,000" — a nicer naira display. It is optional but professional.
F.5 Why file:// breaks fetch — and the Live Server fix
The problem. When you double-click an HTML file, the browser opens it with a file:/// address. Modern browsers block
fetch requests from file:// pages for security reasons. The Console shows an error like:
```text
Access to fetch at 'file:///.../products.json' from origin 'null' has been blocked by CORS policy
```
or
```text
Failed to fetch
```
Plain-English reason. The browser treats pages opened from your own disk as "not from a trusted website", so it refuses to let
them fetch other files. This is a safety rule to stop malicious files on your computer from reading your private files.
The fix: serve the folder over a local server. The VS Code Live Server extension turns your folder into a tiny web server at an
address like http://127.0.0.1:5500/shop.html . Because the page is now served "as a website", fetch is allowed.
How to use Live Server:
1. Install the Live Server extension in VS Code (Extensions panel, search "Live Server", Install).
2. Open your project folder in VS Code.
3. Right-click shop.html → Open with Live Server.
4. The browser opens http://127.0.0.1:5500/shop.html . Fetch now works.
Say to the class: "This is a real-world lesson. Developers rarely open pages by double-clicking; they run a local server. You are
now doing it the professional way."
F.6 Handling errors with try/catch
The idea. Sometimes the network fails, the file is missing, or the JSON is broken. try / catch lets you attempt risky code and
gracefully handle failure instead of showing a broken page.
```text
try {
  // risky code (fetch, parse)
} catch (error) {
  // what to do if it fails
  console.error(error);
}
```
Why it matters. A professional site never shows a blank white page when data fails. It shows "Unable to load, please try again"
— or a fallback. The catch block is where you decide that.
What the learner sees on failure: the friendly message from the catch block on the page, and the real technical error in the
Console for the developer.
F.7 Summary of the session
An API is a messenger between systems; fetch is how JavaScript calls one.
JSON is a text format for structured data ( { } objects, [ ] arrays, quoted keys).
fetch returns a Promise; we handle it with async / await .
Convert JSON text into data with await response.json() .
Render the data by looping and building DOM elements.
try / catch keeps the page friendly when loading fails.
Run fetch pages from a local server (Live Server), not file:// .

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.0 Before the demo — confirm Live Server works
Open the project folder in VS Code, right-click an HTML file, choose Open with Live Server, and confirm the browser address
bar shows http://127.0.0.1:5500/... . If it does not, fix the extension before the demo. Doing this live in front of the class also
teaches the habit.
G.1 The sample products.json (create this file first)
```text
[
  { "id": 1, "name": "Ankara Two-Piece Set", "price": 15000, "category": "clothing", "image": "images/ankara.jpg" },
  { "id": 2, "name": "Leather Handbag", "price": 22000, "category": "bags", "image": "images/handbag.jpg" },
  { "id": 3, "name": "Beaded Slippers", "price": 6500, "category": "shoes", "image": "images/slippers.jpg" },
  { "id": 4, "name": "Gele Head Wrap", "price": 4000, "category": "accessories", "image": "images/gele.jpg" },
  { "id": 5, "name": "Men's Kaftan", "price": 18000, "category": "clothing", "image": "images/kaftan.jpg" },
  { "id": 6, "name": "Aso-Oke Clutch", "price": 9000, "category": "bags", "image": "images/clutch.jpg" },
  { "id": 7, "name": "Coral Beads Set", "price": 12000, "category": "accessories", "image": "images/coral.jpg" },
  { "id": 8, "name": "Ladies High Heels", "price": 14000, "category": "shoes", "image": "images/heels.jpg" },
  { "id": 9, "name": "Adire Shirt", "price": 8000, "category": "clothing", "image": "images/adire.jpg" },
  { "id": 10, "name": "Jute Tote Bag", "price": 7000, "category": "bags", "image": "images/tote.jpg" }
]
```
The images do not need to exist for this session; the rendered cards focus on name, category and price. (Instructors may add
placeholder images or omit the <img> tag.)
G.2 Demonstration steps
shop.html :
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Adaeze Fashion — Shop</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1>Adaeze Fashion</h1>
  <p id="status">Loading products...</p>
  <div id="product-list"></div>
```
```text
  <script src="js/shop.js"></script>
</body>
</html>
```
js/shop.js :
```text
const container = document.querySelector("#product-list");
const status = document.querySelector("#status");
```
```text
async function loadProducts() {
  try {
    const response = await fetch("products.json");
    const products = await response.json();
```
```text
    status.textContent = `${products.length} products found`;
```
```text
    products.forEach(product => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <h3>${product.name}</h3>
        <p class="cat">${product.category}</p>
        <p class="price">₦${product.price.toLocaleString()}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    status.textContent = "Sorry, we could not load products right now.";
    console.error("Failed to load products:", error);
  }
}
```
```text
loadProducts();
```
On the projector:
1. Save all files.
2. Right-click shop.html → Open with Live Server.
3. Point at "10 products found" and the ten rendered cards.
4. Open DevTools → Network tab → refresh → point at the products.json request returning 200. Say: "This is the request and
this is the reply — the waiter bringing the food."
Pause and predict: Before refreshing, ask "What will the status line say if there are ten products?" ( 10 products found .)
G.3 Errors to inject and correct (the teaching gold)
Error A — wrong path. Change fetch("products.json") to fetch("product.json") (missing 's'). Save, refresh.
Expected: page shows the friendly message; Console shows a 404 red error; Network tab shows the failed request.
Fix: correct the file name. Lesson: the catch protected the user from a blank page.
Error B — missing await . Change const products = await response.json(); to const products = response.json(); . Save, refresh.
Expected: products.forEach is not a function (because products is a Promise, not an array), and the cards do not render.
Fix: add await back. Lesson: every network step needs await .
Error C — opening with file:// . Close the Live Server tab and double-click shop.html instead.
Expected: Failed to fetch / CORS error; no products.
Fix: return to Live Server. Lesson: always serve fetch pages locally.
Questions to ask: "Which error message told us the file was missing?" (the 404 in Network/Console). "Why did the page still
look tidy when it failed?" (the catch block).

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: Load a list of services from a JSON file and render them to the page.
Starting materials: A new services.json (instructor provides, below), plus services.html with <div id="service-list"> .
Instructor-provided services.json :
```text
[
  { "id": 1, "name": "Tailoring", "price": 5000, "duration": "3 days" },
  { "id": 2, "name": "Bead Making Class", "price": 3000, "duration": "2 hours" },
  { "id": 3, "name": "Hair Styling", "price": 2500, "duration": "1 hour" },
  { "id": 4, "name": "Makeup", "price": 7000, "duration": "2 hours" }
]
```
Procedure:
1. Create the folder structure week3/services/ with services.html and js/services.js .
2. In services.js , select the container #service-list .
3. Write an async function loadServices() .
4. Inside, await fetch("services.json") and await response.json() .
5. Use forEach to build a card for each service: name, ₦price (formatted with toLocaleString() ), and duration.
6. Append each card to the container.
7. Wrap in try/catch ; in catch , show "Services unavailable, please try again."
8. Pause and predict: "How many cards will appear?" (4). "What will Hair Styling display?" ( ₦2,500 … 1 hour ).
9. Run via Live Server and compare.
Expected result: Four service cards on the page, each with a name, a naira price and a duration.
Troubleshooting while walking the room:
CORS / Failed to fetch → not using Live Server.
forEach is not a function → missing await before response.json() .
Empty page, no error → the container selector is wrong ( null ), or cards not appended.
Prices show as NaN → price was quoted as a string; keep numbers unquoted in JSON.
Completion checklist:
Fetch uses Live Server URL
await used twice
4 cards rendered
Prices formatted with toLocaleString()
try/catch present
No red errors in Console

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Build a "Church Events" loader.
Scenario: Grace Chapel wants a small page that lists upcoming events. All event data lives in events.json . You must load it and
render it.
Instructor-provided events.json :
```text
[
  { "id": 1, "title": "Youth Vigil", "date": "2026-11-14", "venue": "Main Hall" },
  { "id": 2, "title": "Harvest Thanksgiving", "date": "2026-11-22", "venue": "Church Grounds" },
  { "id": 3, "title": "Choir Practice", "date": "2026-11-08", "venue": "Upper Room" },
  { "id": 4, "title": "Community Outreach", "date": "2026-11-30", "venue": "Mile 3 Market" },
  { "id": 5, "title": "Baptism Service", "date": "2026-12-06", "venue": "Riverside" }
]
```
Requirements:
1. Create events.html and js/events.js .
2. Load events.json with async/await .
3. Render each event as a card showing title, date and venue.
4. Show a status line at the top: "X events scheduled" (X = the count).
5. Wrap the loading in try/catch ; on failure show "Events could not be loaded."
Constraints: Cards must be created with document.createElement + appendChild . Do not hard-code any event text in the HTML.
Run from Live Server.
Time allowance: 15 minutes.
Success criteria:
Status shows "5 events scheduled".
Five cards render with correct title/date/venue.
Removing the events.json file and refreshing shows the friendly error message (test this deliberately).
Hints:
Hint 1: the count is events.length .
Hint 2: to display the date as-is, just insert ${event.date} .
Hint 3: the catch block message goes into the same status element.
Instructor answer key:
```text
const container = document.querySelector("#event-list");
const status = document.querySelector("#status");
```
```text
async function loadEvents() {
  try {
    const response = await fetch("events.json");
    const events = await response.json();
```
```text
    status.textContent = `${events.length} events scheduled`;
```
```text
    events.forEach(event => {
      const card = document.createElement("div");
      card.className = "event-card";
      card.innerHTML = `
        <h3>${event.title}</h3>
        <p class="date">Date: ${event.date}</p>
        <p class="venue">Venue: ${event.venue}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    status.textContent = "Events could not be loaded.";
    console.error(error);
  }
}
```
```text
loadEvents();
```
Marking guidance (out of 10): correct fetch + await (2); status count correct (2); five cards render correctly (3); try/catch
present and friendly message (2); runs via Live Server with no errors (1).

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Chidi's Provisions is a small shop in Port Harcourt. Chidi sells rice, beans, oil and other staples. He wants a simple
website so customers can see current prices. His problem: prices change almost every week because of the market. If prices
were typed into the page, Chidi would need to call a web developer every time — too slow and too expensive.
Relevant facts.
Chidi has about 30 products.
Prices change weekly; product list changes rarely.
Chidi can edit a text file if it is simple (just names and numbers).
He has no budget for a database or paid hosting.
Decision point. How can Chidi update prices himself without touching the page's design code?
Possible approaches.
1. Hard-code prices in the HTML (bad — needs a developer each time).
2. Store products in a products.json file; the page fetches and renders them. Chidi edits only the JSON.
3. Build a full admin dashboard with a database (overkill now).
Recommended solution. Approach 2. Chidi edits one clearly-structured JSON file. The page always fetches the latest version.
This is exactly what the class learned today.
Example (excerpt of Chidi's JSON):
```text
[
  { "id": 1, "name": "Long Grain Rice (50kg)", "price": 78000, "category": "grains" },
  { "id": 2, "name": "Beans (Paint Bucket)", "price": 12500, "category": "grains" },
  { "id": 3, "name": "Groundnut Oil (5L)", "price": 9800, "category": "oils" },
  { "id": 4, "name": "Peak Milk Tin", "price": 3500, "category": "dairy" }
]
```
Trade-offs.
Approach 1 is simplest to build but creates ongoing dependency on a developer — a real business cost.
Approach 2 gives Chidi independence and costs nothing extra; the only risk is Chidi making a typo in the JSON and
breaking it, so a JSON validator (or careful editing) is advised.
Approach 3 is the long-term answer if Chidi grows to hundreds of products and multiple staff, but it is far beyond this
course and unnecessary now.
Professional connection. This "data from outside, rendered by the page" pattern is the foundation of almost every modern
website. Junior front-end developers spend much of their time fetching data and rendering it — exactly this skill.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
K.1 Failed to fetch / CORS error, nothing renders
Symptoms: Console shows CORS or Failed to fetch ; no products. Likely cause: The page was opened with file:// (double-
clicked) instead of a local server. (Confirmed by checking the address bar: it starts with file:/// .) Investigate: Look at the
browser address bar. Fix: Open the page with Live Server (or http://localhost:8000/... ). Confirm: Cards appear and the Network
tab shows a 200 for products.json . Prevent: Always use Live Server for fetch sessions.
K.2 products.forEach is not a function
Symptoms: A red TypeError about forEach (or map , filter ). Likely cause: A missing await before response.json() , so
products is a Promise, not an array. (Confirmed by console.log(products) showing a Promise.) Fix: Add await before
response.json() . Confirm: console.log(products) shows an array in the Console. Prevent: Every network step needs await .
K.3 Status says "Loading..." forever / nothing appears, no error
Symptoms: Page stays on the loading text; no error. Likely causes: (a) The loadProducts() function was never called. (b) The
container selector returned null . (c) The container id in HTML does not match the selector. Investigate: Add
console.log(container) — if it prints null , the selector is wrong. Add console.log("calling now") before the call to confirm it
runs. Fix: Correct the selector or add the missing call. Confirm: Cards render. Prevent: Double-check id spelling on both
sides.
K.4 SyntaxError: Unexpected token when parsing JSON
Symptoms: Error in the await response.json() step. Likely cause: The JSON file is malformed — a missing comma, a trailing
comma after the last item, or keys not in double quotes. (Confirmed by opening products.json and validating it.) Fix: Correct
the JSON. Tools like a JSON validator or VS Code's error underlining help. Confirm: The syntax error disappears and data renders.
Prevent: Follow JSON rules strictly (Section F.2).
K.5 Prices display as NaN
Symptoms: Cards show ₦NaN . Likely cause: The price value in JSON is a string (e.g., "15000" ), or a typo like prices .
(Confirmed with console.log(typeof product.price) .) Fix: Store numbers unquoted in JSON. Prevent: Numbers without quotes;
strings with quotes.
K.6 Data loads but the page flickers / duplicate cards on re-run
Symptoms: Cards appear twice. Likely cause: The load function is called more than once without clearing the container. Fix:
Clear the container first: container.innerHTML = ""; before the loop. Prevent: Render functions should build into a fresh
container.
Distinguish likely vs confirmed: The CORS error text, the exact TypeError, and console.log output are the evidence that turns a
guess into a confirmed cause. Teach learners to read them before changing code.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "Load a Real Menu"
Purpose: Practise the full fetch → parse → render → handle-error cycle independently, in a business context.
Realistic scenario: Mama Ngozi's Kitchen needs a menu page. The menu changes occasionally, so it must come from a
menu.json file the kitchen can edit.
Detailed instructions:
1. Create a menu.json with at least 6 dishes, each having: name , price , category (e.g., "rice", "swallow", "drinks"). Design the
JSON yourself.
2. Create menu.html and js/menu.js .
3. Load and render the dishes as cards (name, ₦price , category).
4. Add a status line showing the number of dishes.
5. Use try/catch ; on failure, show "Menu is unavailable right now."
6. Deliberately test failure: temporarily rename menu.json , refresh, and record what happens; then rename it back.
Required deliverables: menu.json , menu.html , js/menu.js , and a short note (in the workbook) describing what the page
showed when the file was missing.
Submission format: Files in the class folder; note in the workbook.
Deadline: Before Session 8.
Marking rubric (20 marks):
Criterion Marks Strong answer
Valid JSON with 6+ items and 3 fields 4 Correct JSON syntax, sensible data
Fetch with async/await 4 Both awaits present
Rendering with createElement/appendChild 4 Cards correct and readable
Status count 2 Shows correct number
try/catch + friendly message 4 Graceful failure proven by the test note
Runs via Live Server, no errors 2 Clean Console
Common mistakes to avoid: trailing comma in JSON; missing await ; opening via file:// ; hard-coding menu items in HTML.
Instructor reference solution:
```text
const container = document.querySelector("#menu-list");
const status = document.querySelector("#status");
```
```text
async function loadMenu() {
  try {
    const response = await fetch("menu.json");
    const menu = await response.json();
```
```text
    status.textContent = `${menu.length} dishes on the menu`;
```
```text
    menu.forEach(dish => {
      const card = document.createElement("div");
      card.className = "dish";
      card.innerHTML = `
        <h3>${dish.name}</h3>
        <p>${dish.category}</p>
        <p>₦${dish.price.toLocaleString()}</p>
      `;
```
```text
      container.appendChild(card);
    });
  } catch (error) {
    status.textContent = "Menu is unavailable right now.";
    console.error(error);
  }
}
```
```text
loadMenu();
```

## M. Knowledge Check
<!-- kind:knowledge_check -->
Q1. Short answer. What is an API, in your own words, and what is the waiter analogy?
Q2. Multiple choice. Which line correctly converts a fetch response into usable data? a) const data = response.json(); b) const
data = await response.json(); c) const data = JSON.fetch(response); d) const data = response.JSON();
Q3. Explain in your own words. Why can you not open a fetch page by double-clicking the HTML file?
Q4. Practical identification. Given const data = await response.json(); , what type is data if the JSON file begins with [ ? What
about { ?
Q5. Error detection. This code fails: const products = response.json(); products.forEach(p => console.log(p.name)); — what is the
bug and the fix?
Q6. Scenario. Your fetch works with Live Server but shows the friendly "unavailable" message when you deploy to GitHub Pages
because the path to products.json is wrong. How would you find the real problem using DevTools?
INSTRUCTOR ANSWER KEY (Q1–Q6)
A1. An API is a messenger that lets one program request data or actions from another in an agreed format. The waiter analogy:
your page (customer) orders from the API (waiter) who fetches from the server (kitchen) and returns the data (food). A2. (b)
await response.json() . Q3. Because the file:// protocol is treated as untrusted; browsers block fetch from it for security
(CORS). You need a local server so the page is served over http:// . A4. If it begins with [ , data is an array; with { , an
object. A5. Missing await , so products is a Promise, not an array; forEach fails. Fix: const products = await response.json(); .
A6. Open DevTools → Network tab, reload, find the products.json request; a 404 (red) confirms the path is wrong. Also check
the Console error. Fix the path (case-sensitive on GitHub Pages).

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today your page learned to ask for data instead of having it typed in. You met APIs (the messenger),
JSON (the data format), Promises and async/await (how to wait for data without freezing the page), and you used fetch to
load a local products.json and render cards. You also learned to wrap it in try/catch so the page fails gracefully, and why fetch
pages must be served with Live Server.
Five important takeaways:
1. An API lets your page request data from outside itself.
2. JSON is text that looks like JavaScript objects and arrays.
3. fetch returns a Promise; use async/await .
4. Convert with await response.json() , then loop and render.
5. Use try/catch and always run fetch pages from Live Server.
Questions to help you recognise what you can now do:
Can I write an async function that fetches a JSON file and renders it?
Can I explain the difference between JSON text and a JavaScript object?
Can I make the page show a friendly message when loading fails?
Can I find a failed request in the Network tab?
Connection to the next session: Now that you can load products and render them, next session you will make them buyable.
You will build a shopping cart — add items, remove items, calculate a total — and keep it alive across page refreshes with
localStorage . This is the core of your capstone shop.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
Learner uses Live Server automatically, without being reminded.
Learner writes both await s unprompted.
Learner reads the Console error text and identifies the cause rather than guessing.
Learner wraps fetch in try/catch and can explain what the catch does.
Learner's rendered cards match the JSON data (names/prices correct).
Common misconceptions:
"JSON is JavaScript." → It is a text format; parse it first.
" fetch gives the data immediately." → It gives a Promise; await it.
"The page must be double-clicked to open." → Only for static pages; fetch needs a server.
" console.log of the response shows the data." → Log after .json() / await to see real data.
Suggested remedial exercises:
1. Order-of-execution drill: give a snippet with console.log before and after an await and ask learners to predict the order.
2. JSON-fixing drill: hand out a broken products.json (missing commas, single quotes) and ask learners to fix it until the page
renders.
3. Error-reading drill: show three Console errors and ask which is CORS, which is a missing await , and which is malformed
JSON.
Differentiation:
Level 1 (supported): provide shop.js with the fetch lines written and blanks for the render loop.
Level 2 (standard): the exercises as written.
Level 3 (challenge): after rendering, add a button that re-fetches the data ("Refresh products"), and (if internet exists) fetch
from a public API and render the result.
Timing guidance: The install/Live Server setup can eat time. If needed, pre-install Live Server on all machines before the week,
or budget 8 minutes at the start. Protect the guided and independent exercises.
END OF SESSION 7
Next: Session 8 — Building the Shopping Cart with localStorage.
