---
{
  "id": "web-development/session-08",
  "course": "web-development",
  "number": 8,
  "of": 12,
  "title": "Building the Shopping Cart with localStorage",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/web-development/session-08.png",
    "page": 138,
    "transcript": [
      "SHOPPING CART: DATA, FUNCTIONS AND STORAGE",
      "THE CART IS AN ARRAY OF OBJECTS - ONE OBJECT PER ITEM",
      "let cart = [ { id: 1, name: \"Meat Pie\", price: 800, qty: 2 } ];",
      "id - unique number",
      "finds this item again",
      "name - what it is",
      "shown on the list",
      "price - cost in naira",
      "multiplied by qty",
      "qty - how many",
      "goes up, never duplicates",
      "THE 3 FUNCTIONS YOU WRITE",
      "addToCart(product)",
      "Already in the cart?",
      "Then qty + 1. If not, push a",
      "new object with qty: 1",
      "removeFromCart(id)",
      "Find the item with that id",
      "and take it out of the array,",
      "then redraw the list",
      "getCartTotal()",
      "Add up price x qty for every",
      "item and return the total so",
      "it can be shown in naira",
      "SAVE AFTER EVERY CHANGE - AND RESTORE ON PAGE LOAD",
      "1. BUTTON CLICKED",
      "an event listener",
      "calls your function",
      "2. ARRAY UPDATED",
      "add, change qty",
      "or remove an item",
      "3. SAVE TO STORAGE",
      "JSON.stringify(cart)",
      "then setItem()",
      "4. REDRAW THE PAGE",
      "list + quantity + total",
      "in naira on screen",
      "ON LOAD: const saved = localStorage.getItem(\"cart\") - if it is null start with [], else JSON.parse(saved)",
      "CART BUGS: not persisting (missing stringify/parse) | duplicates (check the id) | wrong total (price x qty)",
      "NIGERIAN EXAMPLE",
      "Add 2 Meat Pies at N800 and 1 Chapman at N1,200: the total shows N2,800. Close the tab, open it",
      "again - the same cart and total are waiting, because localStorage kept the JSON text for you."
    ],
    "hotspots": [
      {
        "label": "SHOPPING CART: DATA, FUNCTIONS AND STORAGE",
        "x": 18.09,
        "y": 6.87,
        "w": 63.84,
        "h": 4.21,
        "mono": false
      },
      {
        "label": "THE CART IS AN ARRAY OF OBJECTS - ONE OBJECT PER ITEM",
        "x": 26.62,
        "y": 15.88,
        "w": 46.66,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "let cart = [ { id: 1, name: \"Meat Pie\", price: 800, qty: 2 } ];",
        "x": 7.15,
        "y": 22.48,
        "w": 48.02,
        "h": 2.27,
        "mono": true
      },
      {
        "label": "id - unique number name - what it is price - cost in naira qty - how many",
        "x": 11.74,
        "y": 26.66,
        "w": 75.13,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "finds this item again shown on the list multiplied by qty goes up, never duplicates",
        "x": 12.12,
        "y": 29.1,
        "w": 76.69,
        "h": 1.85,
        "mono": false
      },
      {
        "label": "THE 3 FUNCTIONS YOU WRITE",
        "x": 38.8,
        "y": 35.4,
        "w": 22.34,
        "h": 2.48,
        "mono": false
      },
      {
        "label": "addToCart(product) removeFromCart(id) getCartTotal()",
        "x": 7.15,
        "y": 42.0,
        "w": 71.47,
        "h": 2.24,
        "mono": true
      },
      {
        "label": "Already in the cart? Find the item with that id Add up price x qty for every",
        "x": 7.15,
        "y": 45.34,
        "w": 74.46,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "Then qty + 1. If not, push a and take it out of the array, item and return the total so",
        "x": 7.15,
        "y": 48.18,
        "w": 74.21,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "new object with qty: 1 then redraw the list it can be shown in naira",
        "x": 7.15,
        "y": 50.99,
        "w": 72.69,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "SAVE AFTER EVERY CHANGE - AND RESTORE ON PAGE LOAD",
        "x": 26.62,
        "y": 57.25,
        "w": 46.78,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "1. BUTTON CLICKED 2. ARRAY UPDATED 3. SAVE TO STORAGE 4. REDRAW THE PAGE",
        "x": 9.69,
        "y": 63.58,
        "w": 81.01,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "an event listener add, change qty list + quantity + total",
        "x": 11.68,
        "y": 66.75,
        "w": 77.59,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "JSON.stringify(cart)",
        "x": 53.75,
        "y": 66.87,
        "w": 15.19,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "calls your function or remove an item then setItem() in naira on screen",
        "x": 11.21,
        "y": 69.31,
        "w": 77.56,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "ON LOAD: const saved = localStorage.getItem(\"cart\") - if it is null start with [], else JSON.parse(saved)",
        "x": 15.05,
        "y": 74.99,
        "w": 69.91,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "CART BUGS: not persisting (missing stringify/parse) | duplicates (check the id) | wrong total (price x qty)",
        "x": 13.75,
        "y": 77.82,
        "w": 72.49,
        "h": 2.21,
        "mono": false
      },
      {
        "label": "NIGERIAN EXAMPLE",
        "x": 7.15,
        "y": 84.06,
        "w": 13.75,
        "h": 2.36,
        "mono": false
      },
      {
        "label": "Add 2 Meat Pies at N800 and 1 Chapman at N1,200: the total shows N2,800. Close the tab, open it",
        "x": 7.15,
        "y": 87.31,
        "w": 49.38,
        "h": 2.12,
        "mono": false
      },
      {
        "label": "again - the same cart and total are waiting, because localStorage kept the JSON text for you.",
        "x": 7.15,
        "y": 90.15,
        "w": 46.64,
        "h": 2.09,
        "mono": false
      }
    ],
    "width": 984,
    "height": 669
  },
  "module": "Week 3 — Module 3: Data & Real Apps",
  "duration_minutes": 105,
  "difficulty": "Intermediate (combines arrays, objects, DOM, events and storage)",
  "prerequisite_knowledge": "Sessions 1–7, especially: arrays of objects (S3), creating and appending DOM elements (S4), addEventListener and reading input (S5), localStorage + JSON.stringify / JSON.parse (S6), and fetching/rendering a product list (S7). Connection to previous session In Session 7 the page displayed products. Today each product becomes buyable: clicking \"Add to Cart\" pushes it into a cart array, the cart renders on the page with a running total, and — the key idea — the cart survives a page refresh because it is saved in localStorage .",
  "connection_to_previous": null
}
---
# Building the Shopping Cart with localStorage

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 3 — Module 3: Data & Real Apps

**Recommended duration:** 105 minutes

**Difficulty:** Intermediate (combines arrays, objects, DOM, events and storage)

**Prerequisite knowledge:** Sessions 1–7, especially: arrays of objects (S3), creating and appending DOM elements (S4), addEventListener and reading input (S5), localStorage + JSON.stringify / JSON.parse (S6), and fetching/rendering a product list (S7). Connection to previous session In Session 7 the page displayed products. Today each product becomes buyable: clicking "Add to Cart" pushes it into a cart array, the cart renders on the page with a running total, and — the key idea — the cart survives a page refresh because it is saved in localStorage .

**Preparation before class:** A working shop page from Session 7 (products rendered). A cart.html page with an empty <div id="cart-items"> and a <span id="cart-total"> . The instructor should confirm Live Server still works.

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Design a cart data structure as an array of objects, each with id , name , price and qty .
2. Write an addToCart(product) function that adds a new item or increases the qty of an existing item (avoiding duplicates).
3. Write a removeFromCart(id) function that removes an item from the cart.
4. Write a getCartTotal() function that returns the sum of price × qty across all cart items.
5. Render the cart to the page (item list + quantity + running total in naira).
6. Persist the cart to localStorage after every change and restore it on page load using JSON.stringify and JSON.parse ,
handling the empty ( null ) case safely.
7. Connect product buttons to the cart using event listeners.
8. Diagnose common cart bugs: cart not persisting (missing JSON.parse / stringify ), duplicates appearing, totals wrong, and
a null cart crashing the page on first load.

## C. Required Materials
<!-- kind:materials -->
Hardware: One computer per learner; instructor computer with projector. Software: VS Code + Live Server extension; Google
Chrome. Accounts: None. All work is local and offline. Sample files: The Session 7 products.json (reuse it), a shop.html page,
and a cart.html page. Worksheets:
Worksheet 8.1 — "Design the Cart Object" (learners sketch the array of objects for three example items).
Worksheet 8.2 — "Predict the Total" (given a cart array, compute the total by hand). Tools: Chrome DevTools — Console
and the Application tab (where localStorage can be inspected). Note: in Chrome DevTools, localStorage is found under
Application → Storage → Local Storage. Internet: Not required (Live Server runs locally). Alternative for learners lacking
Live Server: As in Session 7, run python -m http.server 8000 or observe on the projector. This session can also work with a
hard-coded product array if fetch is a problem — the cart logic is the focus.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector, open a familiar online shopping site (or an image) and add three items to the cart, then
refresh the page.
What the instructor says:
"Watch this. I add a dress, a bag and shoes to the cart. The cart shows three items and a total. Now I refresh the page...
and the cart is STILL there — three items, same total. If the cart lived only in the page, refreshing would wipe it. So where is
it being kept?
Today you build exactly this. A cart that remembers what the customer chose — even after they close the page and come
back tomorrow. The tool that lets your page remember is called localStorage , and you met it in Session 6. Today we use it
for something real."
Expected learner response: Learners may say "a database" or "the server". Clarify: big shops use servers, but many carts are
kept in the browser's localStorage , and that is what we build today — no server needed.
Then show the Application tab: Open a site, press F12 , go to Application → Local Storage, and point at the stored keys. Say:
"This little drawer in the browser is where we will keep the cart."

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Q1. "How do you save an array to localStorage ?"
Expected: localStorage.setItem("cart", JSON.stringify(cart));
Gap: forgetting JSON.stringify — localStorage only stores strings. Remind: without it you get [object Object] stored.
Q2. "How do you read it back?"
Expected: JSON.parse(localStorage.getItem("cart")) .
Gap: forgetting JSON.parse — you get a string, and .forEach fails.
Q3. "Write an event listener that runs handleClick when a button with id add-btn is clicked."
Expected: document.querySelector("#add-btn").addEventListener("click", handleClick);
Gap: calling handleClick() (with parentheses) instead of passing handleClick . Remind: pass the function, do not call it yet.
Q4. "Given [{price: 100, qty: 2}, {price: 50, qty: 3}] , what is the total by hand?"
Expected: 200 + 150 = 350 .
Gap: adding prices but ignoring qty. Remind: total = price × qty for each, then sum.
Bridge: "You already have every ingredient: arrays, DOM, events and storage. Today we combine them into something a real
shop needs — a working cart."

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 The cart as an array of objects
The idea. The cart is simply an array, and each item in it is an object describing one product the customer wants.
Plain-English definition. A cart is a list. Each line in the list says: which product, and how many.
Why represent it this way? Because a customer might add the same product twice, and we need to know the quantity. Storing
only product IDs would force us to look the product up again; storing the whole object ( name , price , qty ) makes rendering
easy.
The shape:
```text
let cart = [
  { id: 1, name: "Ankara Two-Piece Set", price: 15000, qty: 1 },
  { id: 3, name: "Beaded Slippers", price: 6500, qty: 2 }
];
```
Why qty instead of listing the same product twice? If a customer adds the same slippers twice, we prefer one line with qty:
2 rather than two lines with qty: 1 each. It is cleaner and the total is the same.
Common misconception. Learners sometimes store only {id, qty} and then struggle to show the name and price. Storing the
needed fields ( name , price ) directly in the cart is simpler for a beginner and is perfectly acceptable at this level. (Advanced
apps store IDs and look up data to avoid stale prices — a discussion for later.)
Empty cart. The starting state is let cart = []; — an empty list. The page must handle this: "Your cart is empty."
F.2 Adding to the cart — and avoiding duplicates
The idea. When "Add to Cart" is clicked, we check whether that product is already in the cart. If yes, increase its qty . If no, add
it with qty: 1 .
```text
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
```
```text
  if (existing) {
    existing.qty = existing.qty + 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
```
```text
  saveCart();
  renderCart();
}
```
Line by line:
1. cart.find(...) searches the array and returns the first item whose id matches, or undefined if none.
2. If found ( existing is truthy), increase its quantity.
3. Otherwise, push a new object with qty: 1 .
4. saveCart() writes the updated cart to localStorage .
5. renderCart() redraws the visible cart.
Why find and not another loop? find is a built-in array method that does the search for us — cleaner and less error-prone
than a manual for loop.
Analogy. Adding to a cart is like adding a line to a handwritten shopping list. If the item is already written, you just change the
"1" to "2". You do not write the item again.
common misconception. Learners compare with == or compare the whole object. Compare only the id with === .
F.3 Removing from the cart
The idea. To remove an item, we filter it out of the array by id .
```text
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}
```
Line by line:
1. filter builds a new array containing every item whose id is not the one being removed.
2. Reassign the cart to that new array.
3. Save and re-render.
Why filter ? It expresses "keep everything except this one" in a single readable line. It also returns a new array, avoiding the
pitfalls of editing an array while looping over it.
Removing vs reducing quantity: This simple version removes the whole line. A more advanced version could reduce qty by
one until it reaches zero — a Level 3 challenge.
F.4 Totalling the cart
The idea. The total is the sum of price × qty for every item.
```text
function getCartTotal() {
  let total = 0;
  cart.forEach(item => {
    total = total + (item.price * item.qty);
  });
  return total;
}
```
Line by line:
1. Start total at 0 .
2. For each item, add price × qty .
3. Return the total.
Alternative with reduce (optional, show only if the class is strong):
```text
function getCartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}
```
Why the manual loop first? For beginners, seeing total = total + ... makes the accumulation explicit, which builds
understanding. reduce is efficient but abstract.
Note on formatting: Display the total with toLocaleString() → ₦40,500 . Always show the naira sign.
F.5 Saving and loading the cart (persistence)
The idea. After every change, save the cart; on page load, restore it.
Saving:
```text
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
```
Loading (on page load):
```text
function loadCart() {
  const saved = localStorage.getItem("cart");
  if (saved) {
    cart = JSON.parse(saved);
  } else {
    cart = [];
  }
}
```
Why the if (saved) check? On the very first visit, getItem returns null . Calling JSON.parse(null) returns null , and then
cart.forEach would crash with "Cannot read properties of null". The check guards against the very first load — one of the most
common beginner bugs.
Analogy. localStorage is the browser's filing cabinet, per website. setItem is filing a document; getItem is taking it out. The
cabinet remembers even after you close the browser (until the user clears their browser data).
The string limitation (recap from Session 6). localStorage stores only strings. Objects and arrays must be turned into strings
with JSON.stringify when saving and turned back with JSON.parse when loading. Forgetting this is the number-one cart bug.
Important limitation. localStorage is specific to one browser on one device. A cart saved in Chrome on the academy PC will
not appear in the customer's phone browser. Sharing a cart across devices requires a server and user accounts — beyond this
course, but worth stating honestly.
F.6 Wiring the buttons
When rendering products (from Session 7), each product card gets an "Add to Cart" button. We attach a listener that calls
addToCart with that product.
```text
products.forEach(product => {
  const card = document.createElement("div");
  card.className = "card";
```
```text
  const title = document.createElement("h3");
  title.textContent = product.name;
  card.appendChild(title);
```
```text
  const priceEl = document.createElement("p");
  priceEl.textContent = `₦${product.price.toLocaleString()}`;
  card.appendChild(priceEl);
```
```text
  const btn = document.createElement("button");
  btn.textContent = "Add to Cart";
  btn.addEventListener("click", () => addToCart(product));
  card.appendChild(btn);
```
```text
  container.appendChild(card);
});
```
Why the arrow function () => addToCart(product) ? If we wrote addEventListener("click", addToCart(product)) , it would call
addToCart immediately (at render time) and pass its return value. Wrapping it in () => ... defers the call until the click, and
captures the correct product for each button. This is a subtle but critical point.
F.7 The full flow
1. Page loads → loadCart() restores the cart from localStorage .
2. renderCart() draws the current cart and total.
3. Products render, each with an "Add to Cart" button.
4. Click → addToCart → update array → saveCart → renderCart .
5. Remove click → removeFromCart → update array → saveCart → renderCart .
6. Refresh → step 1 restores everything. The cart persists.
F.8 Summary of the session
The cart is an array of objects ( {id, name, price, qty} ).
addToCart avoids duplicates with find ; removeFromCart uses filter .
getCartTotal sums price × qty .
Save with JSON.stringify + setItem ; load with getItem + JSON.parse , guarding against null .
Wire buttons with a closure () => addToCart(product) .
localStorage is per-browser, per-device.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 Prepare cart.html
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Adaeze Fashion — Cart</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <h1>Your Cart</h1>
  <p id="cart-status">Your cart is empty.</p>
  <div id="cart-items"></div>
  <h2>Total: <span id="cart-total">₦0</span></h2>
  <p><button id="clear-cart">Clear Cart</button></p>
```
```text
  <script src="js/cart.js"></script>
</body>
</html>
```
G.2 js/cart.js — a self-contained demo with sample products
For the demo (and to keep it independent of fetch timing), the instructor uses a small hard-coded products array. This keeps
focus on the cart logic.
```text
const products = [
  { id: 1, name: "Ankara Two-Piece Set", price: 15000, category: "clothing" },
  { id: 2, name: "Leather Handbag", price: 22000, category: "bags" },
  { id: 3, name: "Beaded Slippers", price: 6500, category: "shoes" }
];
```
```text
let cart = [];
```
```text
const itemsEl = document.querySelector("#cart-items");
const totalEl = document.querySelector("#cart-total");
const statusEl = document.querySelector("#cart-status");
const listEl = document.querySelector("#product-list");
```
```text
function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}
```
```text
function loadCart() {
  const saved = localStorage.getItem("cart");
  cart = saved ? JSON.parse(saved) : [];
}
```
```text
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: product.id, name: product.name, price: product.price, qty: 1 });
  }
  saveCart();
  renderCart();
}
```
```text
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  renderCart();
}
```
```text
function getCartTotal() {
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
  });
  return total;
}
```
```text
function renderCart() {
  itemsEl.innerHTML = "";
```
```text
  if (cart.length === 0) {
    statusEl.textContent = "Your cart is empty.";
    totalEl.textContent = "₦0";
    return;
  }
```
```text
  statusEl.textContent = `${cart.length} item type(s) in your cart`;
```
```text
  cart.forEach(item => {
    const row = document.createElement("div");
    row.className = "cart-row";
    row.innerHTML = `
```
```text
      <span>${item.name} × ${item.qty} — ₦${(item.price * item.qty).toLocaleString()}</span>
    `;
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => removeFromCart(item.id));
    row.appendChild(removeBtn);
    itemsEl.appendChild(row);
  });
```
```text
  totalEl.textContent = `₦${getCartTotal().toLocaleString()}`;
}
```
```text
// --- Load cart on start ---
loadCart();
renderCart();
```
G.3 Demonstration steps
1. Save, open cart.html via Live Server.
2. In the Console (for the demo, since there are no product buttons on this page) run addToCart(products[0]) and watch the
cart line and total appear.
3. Add the slippers twice ( addToCart(products[2]) twice) → one line with × 2 .
4. Pause and predict: "What is the total after one ankara set and two slippers?" ( 15000 + 13000 = 28000 .)
5. Point at the total: ₦28,000 .
6. Refresh the page. The cart is still there. Say: "That is localStorage doing its job."
7. Open DevTools → Application → Local Storage and show the cart key holding the JSON string.
8. Click Remove on one item → it disappears, total updates, save happens.
9. Click Clear Cart → cart empties (see the listener below in cart.html ).
Add this near the end of cart.js for the clear button:
```text
document.querySelector("#clear-cart").addEventListener("click", () => {
  cart = [];
  saveCart();
  renderCart();
});
```
G.4 Errors to inject and correct
Error A — no JSON.parse . Change cart = saved ? JSON.parse(saved) : []; to cart = saved ? saved : []; . Refresh.
Expected: cart.forEach is not a function (the cart is a string).
Fix: restore JSON.parse . Lesson: storage holds strings; parse to use.
Error B — no null guard. Change loadCart to just cart = JSON.parse(localStorage.getItem("cart")); on a fresh browser (clear
storage first).
Expected: Cannot read properties of null at renderCart . Lesson: guard the first-load null .
Error C — immediate call bug. Change the product button listener to addEventListener("click", addToCart(product)) (in the full
shop).
Expected: the item is added immediately on render, before any click. Lesson: wrap in () => addToCart(product) .

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: Build the cart on the shop page from Session 7, with "Add to Cart" buttons connected to products loaded from
products.json .
Starting materials: Session 7's shop.html , js/shop.js , and products.json . Add a cart area to shop.html .
Procedure:
1. Add to shop.html (above the product list):
```text
<p id="cart-status">Your cart is empty.</p>
<div id="cart-items"></div>
<h2>Total: <span id="cart-total">₦0</span></h2>
```
2. Copy the cart functions ( saveCart , loadCart , addToCart , removeFromCart , getCartTotal , renderCart ) into shop.js .
3. In the product render loop, add an "Add to Cart" button to each card with () => addToCart(product) .
4. Call loadCart() and renderCart() at the start.
5. Save, run via Live Server.
6. Pause and predict: "Add two different products. What will the total be?" Compute by hand before clicking.
7. Refresh the page → cart persists.
8. Remove one item → total reduces.
Expected result: A shop page where products have Add to Cart buttons; the cart area updates live; the total is correct;
refreshing keeps the cart.
Troubleshooting while walking the room:
Items appear twice → missing find duplicate check.
forEach is not a function → cart loaded as a string (missing JSON.parse ).
Add button adds on page load → forgot to wrap the call in an arrow function.
Total shows NaN → price stored as string; ensure numbers.
Completion checklist:
Products render with Add to Cart buttons
Adding a product updates the cart and total
Adding the same product twice increases qty (no duplicate line)
Remove works
Cart persists after refresh
Empty cart shows "Your cart is empty."

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Build a "Simple Shopping List" app (a personal version of the cart idea).
Scenario: A student wants a small list to track items to buy at the market, that stays saved.
Requirements:
1. A page list.html with a text input #item-name , a number input #item-price , an "Add Item" button, a container #list , and
a total #total .
2. Items are stored as an array of objects { name, price } in localStorage under the key "marketList" .
3. Add an item → append to the array → save → render. (Duplicates are allowed here; no qty needed.)
4. Each rendered item has a "Bought" (remove) button.
5. Show the running total in naira.
6. On load, restore the list from localStorage .
Constraints: Use JSON.stringify / JSON.parse ; guard against null on first load; run from Live Server.
Time allowance: 15 minutes.
Success criteria:
Adding "Rice 5000" and "Beans 3000" shows total ₦8,000 .
Refreshing keeps the list and total.
Removing an item updates the total.
Empty list shows a friendly message.
Hints:
Hint 1: read the input with document.querySelector("#item-price").value and convert with Number(...) .
Hint 2: save under "marketList" , not "cart" , to avoid clashing with the demo.
Hint 3: clear the input after adding so the user is not confused.
Instructor answer key:
```text
let list = [];
const listEl = document.querySelector("#list");
const totalEl = document.querySelector("#total");
const nameInput = document.querySelector("#item-name");
const priceInput = document.querySelector("#item-price");
```
```text
function save() {
  localStorage.setItem("marketList", JSON.stringify(list));
}
function load() {
  const saved = localStorage.getItem("marketList");
  list = saved ? JSON.parse(saved) : [];
}
function render() {
  listEl.innerHTML = "";
  if (list.length === 0) {
    listEl.textContent = "Your list is empty. Add an item above.";
    totalEl.textContent = "₦0";
    return;
  }
  let total = 0;
  list.forEach((item, index) => {
    total += item.price;
    const row = document.createElement("div");
    row.innerHTML = `${item.name} — ₦${item.price.toLocaleString()} `;
    const btn = document.createElement("button");
    btn.textContent = "Bought";
    btn.addEventListener("click", () => {
      list.splice(index, 1);
      save();
      render();
    });
    row.appendChild(btn);
    listEl.appendChild(row);
  });
  totalEl.textContent = `₦${total.toLocaleString()}`;
}
document.querySelector("#add-item").addEventListener("click", () => {
  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  if (!name || !price || price <= 0) {
    alert("Please enter a valid item name and price.");
    return;
  }
  list.push({ name, price });
  nameInput.value = "";
  priceInput.value = "";
  save();
  render();
});
```
```text
load();
render();
```
Marking guidance (out of 10): correct add + input reading (3); correct remove via splice (2); running total correct (2);
persistence with stringify/parse + null guard (2); clean UI, no errors (1).

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Ada's Cosmetics sells skincare products online. Customers browse, add items to a cart, then continue browsing other
pages before checking out. Early on, Ada's site had a problem: when a customer clicked to another page, the cart emptied.
Customers got frustrated and abandoned orders.
Relevant facts.
The site has multiple pages (Shop, About, Contact).
The cart was held in a plain JavaScript variable — which resets every time a new page loads.
The shop has no server-side accounts; it just needs the cart to survive page changes and refreshes.
Decision point. How should the cart be stored so it survives navigation between pages?
Possible approaches.
1. Keep the cart in a variable (breaks on navigation).
2. Save the cart in localStorage , and load it on every page.
3. Store the cart on a server with a customer account (requires backend and login).
Recommended solution. Approach 2 for this stage. On every page, the script runs loadCart() from localStorage and
renderCart() . The cart appears consistently across Shop, About and Contact. Checkout can later move the data to a server.
Trade-offs.
Approach 1 is the easiest to write but fails the moment the customer leaves the page — a real business loss.
Approach 2 fixes persistence with a few lines and no backend cost; the limitation is that the cart is per-device and per-
browser (a customer who switches from phone to laptop loses it).
Approach 3 is the professional long-term answer (carts tied to accounts) but requires a server, a database and login — far
beyond this course.
Professional connection. The "load state on every page" pattern is standard in real front-end work. Junior developers are
frequently asked to make a widget (cart, filters, preferences) remember its state — and localStorage is the first tool they reach
for in small projects.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
K.1 Cart does not persist after refresh
Symptoms: Cart empties on refresh. Likely causes: (a) saveCart() never called after changes. (b) JSON.stringify missing on
save. (c) loadCart() not called on load. (Confirmed by inspecting the cart key in DevTools → Application → Local Storage.)
Investigate: Open Application tab; is there a cart key? Is its value valid JSON? Fix: Ensure every change calls saveCart() , and
the page start calls loadCart() + renderCart() . Confirm: Cart survives refresh; key is present. Prevent: A single choke-point
function that saves and renders after every mutation.
K.2 cart.forEach is not a function
Symptoms: Red TypeError. Likely cause: The cart was loaded as a string (missing JSON.parse ). (Confirmed by console.log(typeof
cart) → "string" .) Fix: cart = saved ? JSON.parse(saved) : []; . Prevent: Always parse on load, stringify on save.
K.3 Duplicate lines for the same product
Symptoms: Adding the slippers twice shows two separate lines. Likely cause: addToCart always push es; it never checks with
find . Fix: Add the find duplicate check and increment qty . Prevent: Design addToCart with the find-or-create pattern from
the start.
K.4 Total is wrong or NaN
Symptoms: Total shows NaN or too much/too little. Likely causes: (a) price stored as a string. (b) Multiplying by a missing
qty . (c) Using == / + inconsistently. Investigate: console.log(cart) and typeof item.price . Fix: Ensure numbers; ensure qty
always set. Prevent: Create cart items with a numeric price and a qty of at least 1.
K.5 Cannot read properties of null
Symptoms: Page crashes on first ever load. Likely cause: getItem returned null and code tried to iterate it. (Confirmed on a
fresh browser with empty storage.) Fix: Guard with if (saved) before parsing. Prevent: Always handle the empty-storage case.
K.6 Item added immediately on page load
Symptoms: Every product jumps into the cart as soon as the page renders. Likely cause: addEventListener("click",
addToCart(product)) — the product is called at render time. Fix: addEventListener("click", () => addToCart(product)) . Prevent:
Never call the handler while attaching it.
Distinguish likely vs confirmed: The Application tab (is cart present and valid JSON?), the typeof of the cart, and the
Console error are the evidence that confirms the cause. Never guess—inspect.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "A Working Mini-Shop Cart"
Purpose: Combine rendering, events, arrays/objects and persistence into one realistic feature.
Realistic scenario: A small online store needs a cart that persists across refreshes, allows removing items, prevents duplicates
and shows a running total.
Detailed instructions:
1. Start from your Session 7 shop page (products fetched from products.json ).
2. Add the cart area (status, items container, total) and the cart functions.
3. Each product card must have an "Add to Cart" button.
4. Requirements:
Adding the same product twice increases its quantity (one line).
A "Remove" button next to each cart line.
A "Clear Cart" button.
The cart persists after refresh.
The total is shown in naira with toLocaleString() .
5. Test the full cycle: add, add again, remove, refresh, clear.
Required deliverables: shop.html , js/shop.js , products.json , and a short test log in the workbook (what you did, what you
saw, whether persistence worked).
Submission format: Files in the class folder; test log in the workbook.
Deadline: Before Session 9.
Marking rubric (20 marks):
Criterion Marks Strong answer
Cart data structure correct 3 Array of objects with id/name/price/qty
Add with duplicate handling 3 Increasing qty, not duplicating
Remove works 3 Line removed, total updates
Total correct in naira 3 price × qty summed, formatted
Persistence (stringify/parse + null guard) 4 Survives refresh; no crash on first load
Buttons wired correctly (closure) 2 No add-on-load bug
Clean UI and no console errors 2 Friendly empty message
Common mistakes to avoid: missing JSON.parse ; missing null guard; calling the handler immediately; storing prices as strings.
Instructor reference solution: Use the cart.js from Section G.2, adapted so products come from the fetch in Session 7 and
the cart area is added to the shop page. The cart functions are identical; only the product source changes.

## M. Knowledge Check
<!-- kind:knowledge_check -->
Q1. Short answer. Why do we store the cart as an array of objects rather than a single number or string?
Q2. Multiple choice. Which correctly saves the cart array? a) localStorage.setItem("cart", cart); b) localStorage.setItem("cart",
JSON.stringify(cart)); c) localStorage.save("cart", cart); d) localStorage.setItem(JSON.stringify(cart), "cart");
Q3. Explain in your own words. Why is the if (saved) check important in loadCart ?
Q4. Practical identification. Given cart = [{id:1, price:5000, qty:2}, {id:2, price:3000, qty:1}] , what is getCartTotal() ?
Q5. Error detection. This button adds on page load: btn.addEventListener("click", addToCart(product)); . Fix it and explain.
Q6. Scenario. A customer adds items in Chrome on the shop's laptop and then opens the site on their phone — the cart is
empty. Explain why, and what would be required to share the cart across devices.
INSTRUCTOR ANSWER KEY (Q1–Q6)
A1. Because we need to remember multiple products and the quantity of each; a single value cannot represent that. A2. (b). A3.
On the first visit getItem returns null ; parsing null gives null , and iterating it would crash. The check lets us substitute an
empty array. A4. 5000*2 + 3000*1 = 13000 → ₦13,000 . A5. Fix: btn.addEventListener("click", () => addToCart(product)); . Without
the arrow wrapper, addToCart(product) runs immediately during rendering and passes its result as the handler. A6. localStorage
is per-browser and per-device. To share a cart across devices you would need a server to store the cart against a customer
account (login).

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today products became buyable. You built a cart as an array of objects with quantities, added an
addToCart that avoids duplicates, a removeFromCart using filter , and a getCartTotal that sums price × qty . You wired "Add
to Cart" buttons with closures, and — the big idea — you persisted the cart to localStorage so it survives a refresh, guarding
against the empty first load.
Five important takeaways:
1. The cart is an array of objects with a qty .
2. find prevents duplicates; filter removes items.
3. Total = sum of price × qty .
4. Save with JSON.stringify ; load with JSON.parse ; guard against null .
5. Wire buttons with () => addToCart(product) .
Questions to help you recognise what you can now do:
Can I build a cart that survives a refresh?
Can I explain why JSON.stringify is needed for storage?
Can I fix the add-on-load bug?
Can I calculate and display a running total?
Connection to the next session: You now have products, a filter-to-come and a working cart. Next session ties it all together
into a multi-page, responsive shop — a search/filter feature, a consistent navigation bar, and a layout that works on a phone.
This is the dress rehearsal for your capstone.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
Learner's cart persists correctly across refreshes, on the first serious attempt.
Learner inspects localStorage in the Application tab to verify saving.
Learner handles the empty-cart case without being told.
Learner explains the difference between find and filter .
Learner's total is always correct, including for multiple quantities.
Common misconceptions:
" localStorage is shared between users/devices." → It is local to one browser/device.
"I can store the array directly." → Only strings; use JSON.stringify .
"The first load will just work." → Must guard against null .
"Attaching the handler and passing the product is fine." → Needs the arrow closure.
Suggested remedial exercises:
1. Persistence drill: given a broken loadCart without JSON.parse , ask learners to find and fix it and prove it with the
Application tab.
2. Manual-total drill: five cart arrays on paper; compute the totals by hand, then check with code.
3. Duplicate drill: give an addToCart that always pushes; ask learners to add the duplicate check.
Differentiation:
Level 1 (supported): provide the cart functions with the find and filter lines pre-written; learners wire the buttons and
rendering.
Level 2 (standard): the exercise as written.
Level 3 (challenge): implement quantity controls (+ / −) that reduce qty before removing, and add a small product search
box on the shop page.
Timing guidance: The duplicate-check and the null guard are the two hardest concepts; slow down there. If the class is fast,
introduce reduce for the total and a simple checkout summary.
END OF SESSION 8
Next: Session 9 — Multi-page Integration and Responsive Design.
