---
{
  "id": "web-development/session-09",
  "course": "web-development",
  "number": 9,
  "of": 12,
  "title": "Multi-page Integration and Responsive Design",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/web-development/session-09.png",
    "page": 152,
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
  "module": "Week 3 — Module 3: Data and App",
  "duration_minutes": 105,
  "difficulty": "Intermediate beginner (this is the first \"build a real site\" session)",
  "prerequisite_knowledge": "Sessions 1–8. Learners must be able to: declare variables and functions; use arrays, objects and loops; select and change the DOM; handle the click , submit and input events; render a list of products from data; and save/load a cart in localStorage . They must also remember the Web Design basics: the <meta name=\"viewport\"> tag, flexbox/grid and media queries.",
  "connection_to_previous": "In Session 7 learners rendered products from data. In Session 8 they built a cart that survives a page refresh using localStorage . But so far everything lived on one page. A real shop has several pages, and the cart must not disappear when the customer clicks \"About\". Today we join those pieces into a small multi-page site, add the capstone's headline feature — a live product search/filter — and make sure it all works on a phone."
}
---
# Multi-page Integration and Responsive Design

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 3 — Module 3: Data and App

**Recommended duration:** 105 minutes

**Difficulty:** Intermediate beginner (this is the first "build a real site" session)

**Prerequisite knowledge:** Sessions 1–8. Learners must be able to: declare variables and functions; use arrays, objects and loops; select and change the DOM; handle the click , submit and input events; render a list of products from data; and save/load a cart in localStorage . They must also remember the Web Design basics: the <meta name="viewport"> tag, flexbox/grid and media queries.

**Connection to previous work:** In Session 7 learners rendered products from data. In Session 8 they built a cart that survives a page refresh using localStorage . But so far everything lived on one page. A real shop has several pages, and the cart must not disappear when the customer clicks "About". Today we join those pieces into a small multi-page site, add the capstone's headline feature — a live product search/filter — and make sure it all works on a phone.

**Preparation before class:** Academy PCs on. Chrome and VS Code installed. Each learner has their webdev-practice folder and their Session 8 cart work. Instructor prepares the complete demo-week3-s9/ example (given in Section F) and has Live Server installed in VS Code. Projector shows VS Code plus Chrome. A phone (or Chrome's device toolbar) is available to demonstrate mobile widths. Capstone link The product search/filter and the consistent, cart-aware navigation built today are directly required by the capstone shop (Home/Shop, About, Contact, product filter, persisted cart, responsive).

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Structure a small multi-page website ( index.html , about.html , contact.html ) that shares one CSS file and one JavaScript
file, using relative paths.
2. Write a consistent header/nav/footer that appears on every page, and link between pages with <a href="about.html"> .
3. Explain what "relative" versus "absolute" paths are, and why relative paths are required for a site that will be deployed
later.
4. Keep the cart consistent across pages by loading the cart from localStorage and redrawing the cart badge on every page
load.
5. Build a live product filter using the input event, String.prototype.toLowerCase() and String.prototype.includes() , that
updates the rendered products as the user types.
6. Recap and apply responsive design — the viewport meta tag, CSS Grid/Flexbox layouts, and media queries — and explain
how they interact with content that JavaScript renders after the page loads.
7. Test a site at 360px, 768px and 1024px using Chrome DevTools device toolbar, and identify and fix at least three common
mobile problems (overflow, oversized images, navigation that does not collapse).

## C. Required Materials
<!-- kind:materials -->
Hardware
One computer per learner (academy desktops). Pairing is fine with the swap method from Session 1.
Instructor computer connected to a projector or large screen.
A smartphone is helpful for the testimonial moment at the end, but not required (DevTools device toolbar does the job
offline).
Software
Google Chrome (for DevTools device toolbar — the phone/tablet icon).
Visual Studio Code.
The VS Code Live Server extension (installed in Session 7). Live Server serves the site over http://127.0.0.1:5500 , which we
need so that localStorage and page navigation behave like a real hosted site.
Windows 10 or 11.
Accounts
None required this session.
Sample files
Instructor's finished demo-week3-s9/ folder (all files given in Section F).
Optional: a small images/ folder with 2–3 sample photos for the "large image" discussion. Learners without photos can use
the placeholder images generated by the demo code.
Worksheets
Worksheet 9.1 — "Map My Site" (blank boxes for the three pages; learners draw the shared header/footer).
Worksheet 9.2 — "Break It on Mobile" (a checklist of widths and problems to test).
Tools
Chrome DevTools: Console, Elements and the device toolbar ( Ctrl + Shift + M ).
W3C validator not needed today (that is Session 10).
Internet
Not required, but if available the instructor may show one real Nigerian online shop and resize it in DevTools to compare.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector, open a real online shop (any Nigerian fashion or electronics store). Set the browser window
narrow, roughly the width of a phone. Scroll and point out: the menu button, the two-column product grid, and the prices that
still fit the screen.
What the instructor says:
"Look at this shop on a narrow screen. Does it look like a website designed for a laptop squeezed into a phone? No — the
layout changed. The grid became two columns, the menu hid behind a button, the text still fits. That is called responsive
design, and you learned the tools for it in the Web Design course.
Now here is the part nobody tells beginners: this shop has an 'Add to cart' button on the product page, a basket number at
the top, and when you click 'About us', the basket number stays. How? The pages are separate files! So how does the
basket follow you?
That is today's job. We turn your one-page product app into a real multi-page site, add a search box that filters products
as you type, and make sure the whole thing survives on a phone."
Expected learner response: Learners may say "the server remembers the cart" or "they use a database". Accept all answers,
then reveal: the browser itself remembers, using localStorage , and each page redraws the badge from that saved data. This is
the key idea of the session.
Then demonstrate the hook: In DevTools, press Ctrl + Shift + M to open the device toolbar. Choose "iPhone SE" or set width
to 360px. Then drag the ruler to 768px and 1024px. Say:
"Three widths are our friends today: 360px (small phone), 768px (tablet), 1024px (small laptop). If your site looks good at all
three, it will look good almost anywhere."

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Run this as a quick oral round-robin with the questions on the projector. Call on different learners.
Question 1: "In Session 7, how did we turn data/products.json into visible product cards on the page?"
Expected answer: we fetch ed the data, converted it with .json() , then looped over the array and created/inserted
elements (or built an HTML string and set innerHTML ).
Common gap: learners forget that fetch needs Live Server (it fails on file:// ). Remind them: today we will use a plain
JavaScript array so the session works even offline, but the loop-and-render idea is exactly the same.
Question 2: "In Session 8, where did the cart live so it survived a refresh, and how did we store it?"
Expected answer: in localStorage , stored as a string using JSON.stringify(...) , and read back with
JSON.parse(localStorage.getItem(...)) .
Common gap: storing an array directly without JSON.stringify . localStorage can only store text. Remind them.
Question 3: "What does localStorage.setItem("cart", data) do differently from a normal variable?"
Expected answer: a normal variable dies when the page is closed or refreshed; localStorage keeps the value in the browser
until it is cleared.
Common gap: thinking localStorage is shared between different websites. Clarify: it is private to the site (the same origin),
and persists across pages of that site — which is exactly what we need today.
Question 4: "From Web Design — what tag tells a phone not to zoom out and shrink your whole page?"
Expected answer: <meta name="viewport" content="width=device-width, initial-scale=1.0"> .
Common gap: learners omit it entirely, then wonder why their site looks tiny with big white margins on a phone. This is the
single most common responsive bug.
Bridge to today (say this):
"You can render products, you can save a cart, and you know the tools of responsive design. Today we combine all three —
one shared CSS file, one shared cart, three pages, a search filter, and a mobile check. This is exactly the capstone."
If more than a third of the class cannot answer Question 2, spend five extra minutes re-running the small localStorage demo
from Session 8 before continuing.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 From one page to many pages
The idea. A multi-page website is a collection of separate HTML files in one folder, where each file is a full page and they link
to each other with the <a> tag. Our site will have three pages:
File Page Purpose
```text
index.html
```
Home /
Shop
The main page: hero, search box, product grid, cart summary. index.html is special — it is the
page the browser opens by default when someone visits your site folder, and later it will be
your GitHub Pages home.
```text
about.html
```
About Tells the shop's story (Adaeze's business).
```text
contact.html
```
Contact A contact form and business details.
Plain-English definition. A website is not one big file; it is a folder of files that reference each other. This is exactly like a house:
index.html is the sitting room (where visitors arrive), about.html is the family room, contact.html is the office. The front door
always opens into the sitting room.
Why we split pages. Imagine one giant page where "About" and "Contact" sat below 200 products. The customer would scroll
forever. Splitting keeps each page short and focused, and each page loads faster because it is smaller.
How pages link to each other. With the anchor tag:
```text
<a href="about.html">About Us</a>
<a href="contact.html">Contact</a>
```
```text
<a href="index.html">Home</a>
```
<a> is the anchor / link element.
href means hypertext reference — the destination.
about.html is the relative path: a file in the same folder as the page doing the linking.
Real-life comparison. Relative paths are like giving directions from where you are standing: "go to the next door on this same
street." Absolute paths are like a full postal address from outer space: C:\Users\Ada\Desktop\shop\about.html . Relative is what
professionals use because it keeps working when the folder is moved (and moving is exactly what happens when you deploy).
Worked example — the same navigation on every page. Every page starts and ends with the same header and footer.
Copying the same markup into all three files is how beginner multi-page sites are built. (More advanced tools can "include" a
shared file automatically, but that needs a build step or a server; we keep it simple and copy carefully.)
F.2 The shared header, nav and footer
The idea. A professional site repeats the same header (logo + navigation) and footer on every page so the visitor never gets lost.
We copy the identical block into each HTML file.
Why consistency matters. If the nav is different on each page, the customer gets confused and loses trust. A study of your own
experience will confirm it: when a shop's menu suddenly changes, you wonder if you are still in the same website. Consistency
is not decoration — it is usability and professionalism. It is also the reason the cart badge must appear in the header on every
page.
Full working header/nav markup (put this at the top of the <body> of every page):
```text
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="index.html">Adaeze Fashion</a>
```
```text
    <input type="checkbox" id="navToggle" class="nav-toggle">
    <label for="navToggle" class="nav-toggle-label">Menu</label>
```
```text
    <nav class="site-nav" aria-label="Main navigation">
      <a href="index.html" class="active">Shop</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
      <a href="index.html" class="cart-link">Cart <span id="cartCount" class="cart-count">0</span></a>
    </nav>
  </div>
</header>
```
Line by line:
<a class="brand" href="index.html"> — the shop name, always linking home.
<input type="checkbox" id="navToggle"> — a hidden checkbox. We use it to make a CSS-only mobile menu: on small screens
the checkbox is the switch that opens the menu, so we do not even need JavaScript for the menu itself.
<label for="navToggle"> — the visible "Menu" button. Clicking the label toggles the checkbox (this is a built-in browser
behaviour: a label controls the input it is for ). On desktop we hide both the checkbox and the "Menu" label.
<nav ... aria-label="Main navigation"> — the navigation block. The aria-label is a small accessibility help: a screen-reader
will announce "Main navigation".
Each <a> goes to a relative .html file.
class="active" marks the current page. On index.html the Shop link gets active ; on about.html the About link gets it, and
so on.
The cart link contains <span id="cartCount">0</span> — the cart badge. JavaScript will fill this number from localStorage on
every page.
The shared footer (put this just before the closing </body> , above the <script> tags):
```text
<footer class="site-footer">
  <p>© 2026 Adaeze Fashion, Port Harcourt. Built by CEA students.</p>
  <p>WhatsApp: 0803 000 0000</p>
</footer>
```
Common misconception. Beginners change the nav on one page "just for now" and forget. Rule: if you edit the header in one
file, edit it in all files immediately. A quick trick: keep the header block in a text file called _header.txt and paste from it.
Limitation. Copying markup means a change must be made in every file. That is acceptable for three pages. With twenty pages,
professionals use a server-side include or a framework; that is a topic for a later course, not today.
F.3 Keeping the cart consistent across pages
The idea. Each page is a fresh page load. When about.html loads, the product page's variables are long gone from memory.
The only thing that survives is what we put in localStorage . So the plan is:
1. On every page, read the cart from localStorage .
2. Add up the quantities.
3. Write that number into the badge <span id="cartCount"> .
Why this works. localStorage belongs to the whole origin (the same site/folder), not to one page. So index.html , about.html
and contact.html all see the same saved cart. This is the magic that makes the cart "follow" the customer.
Shared cart code ( js/cart.js ):
```text
// cart.js — shared by every page
const CART_KEY = "adaezeCart";
```
```text
// Read the cart array from localStorage (returns [] if nothing is saved).
function getCart() {
  const saved = localStorage.getItem(CART_KEY);
  if (!saved) {
    return [];
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.warn("Cart data was corrupt and has been reset.", error);
    return [];
  }
}
```
```text
// Save the cart array as text.
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
```
```text
// The total number of items (add up the qty of every line).
function cartCount() {
  return getCart().reduce(function (total, item) {
    return total + item.qty;
  }, 0);
}
```
```text
// Put the current count into the header badge on this page.
function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (!badge) {
    return;   // this page has no badge — do nothing
  }
  badge.textContent = cartCount();
}
```
```text
// Add one of a product id to the cart, then save and refresh the badge.
function addToCart(id) {
  const cart = getCart();
  const existing = cart.find(function (item) {
    return item.id === id;
  });
  if (existing) {
    existing.qty = existing.qty + 1;
  } else {
    cart.push({ id: id, qty: 1 });
  }
  saveCart(cart);
```
```text
  updateCartBadge();
}
```
Line by line the important parts:
CART_KEY is the name under which we save. It must be exactly the same on every page, or the pages will not find each
other's cart. A typo here is a classic bug (see Section K).
getCart() wraps JSON.parse in try...catch . If the saved text is corrupt, we reset to an empty array instead of crashing.
try...catch means "attempt this; if it throws an error, run the catch block."
reduce walks the array and adds up item.qty . We start from 0 .
updateCartBadge() guards against a missing badge ( if (!badge) return; ) so pages without a badge do not crash.
addToCart either increases the quantity of an existing line or pushes a new line.
The key line for today's outcome: every page's own script calls updateCartBadge() as soon as the page loads. That is what
makes the number appear everywhere.
Worked example of the flow.
1. On index.html the customer clicks "Add to cart" for the Ankara Dress. addToCart(1) runs, localStorage now holds
- {"id":1,"qty":1}] , and the badge shows 1 .
2. The customer clicks the "About" link. The browser loads about.html fresh. The badge would show 0 — unless about.html
also loads cart.js and calls updateCartBadge() .
3. Because it does, getCart() reads the same saved data and the badge shows 1 again. The cart "followed" the customer.
Misconception. "The cart is in memory, so it stays." No — memory is wiped on every navigation. Only localStorage persists.
Repeat this until it is clear.
F.4 The live product search/filter (the capstone feature)
The idea. A search box is an <input> . As the customer types, we filter the product array so only matching products are shown.
This is the single most impressive feature in the capstone and it is surprisingly short.
Plain-English definition. A filter is a rule that keeps only some items from a list. A search filters by matching text.
Why we use the input event (not click or keyup ). input fires after the value of a text field changes for any reason —
typing, pasting, cutting, even using the phone's voice input. keyup only fires on keys and misses paste-with-mouse. So input
is the correct, modern choice.
The three string tools we need:
Tool What it does Example
```text
.toLowerCase()
```
Makes text all lowercase "Ankara".toLowerCase() → "ankara"
```text
.includes(text)
```
Returns true if the text appears somewhere inside "ankara dress".includes("ankara") → true
```text
.trim()
```
Removes spaces from the start and end " shoes ".trim() → "shoes"
Why toLowerCase on both sides. Computers compare letters exactly. "Ankara" and "ankara" are different strings because A
and a are different characters. So if we compare the raw strings, a customer typing "ankara" would find nothing. We lowercase
both the search term and the product name so the comparison ignores capitalisation. This is one of the most common real
search bugs, and we deliberately plant it in Session 10's broken example.
The filter code:
```text
function applyFilter() {
  const searchBox = document.getElementById("searchBox");
  const term = searchBox.value.toLowerCase().trim();
```
```text
  const filtered = products.filter(function (product) {
    return product.name.toLowerCase().includes(term);
  });
```
```text
  renderProducts(filtered);
}
```
Line by line:
searchBox.value — the text the customer has typed.
.toLowerCase().trim() — normalise it: lowercase and no stray spaces.
products.filter(...) — Array.prototype.filter calls the function once per product and keeps only the ones where the
function returns true .
product.name.toLowerCase().includes(term) — the test: does this product's lowercased name contain the search term? If term
is empty ( "" ), every string .includes("") is true , so all products show — which is exactly the behaviour we want (empty
box = show everything).
renderProducts(filtered) — redraw the grid with only the surviving products.
Wiring it up with the input event:
```text
const searchBox = document.getElementById("searchBox");
searchBox.addEventListener("input", applyFilter);
```
Offering a nice empty state. If nothing matches, the grid would be blank and the customer might think the page is broken. We
handle it inside renderProducts :
```text
if (list.length === 0) {
  grid.innerHTML = "<p>No products match your search. Try another word.</p>";
  return;
}
```
Worked example.
Products: Ankara Dress, Aso Oke Gele, Beaded Necklace.
Customer types d . filtered keeps any name containing "d": "Ankara Dress" (has a 'd') and "Beaded Necklace" (has 'd') —
two shown.
Customer types gele . Only "Aso Oke Gele" survives — one shown.
Customer types xyz . Nothing survives — the empty-state message shows.
Misconception. "filter changes the original array." No — .filter returns a new array and leaves products untouched. That is
why, when the customer clears the box, all products come back.
Limitation. Our search matches the product name only. A real shop might also match the category or a description. As a
challenge, learners can extend the test to product.category too.
F.5 Responsive design recap — and how it interacts with JavaScript
What "responsive" means. A responsive website changes its layout to suit the screen size: one column on a phone, two on a
tablet, three on a laptop. The layout "responds" to the device.
The four tools (from Web Design):
1. The viewport meta tag — always in the <head> :
```text
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
Without it, a phone pretends to be a 980px-wide desktop and shrinks your page into a tiny strip.
2. Flexible units — use % , fr , rem and vw instead of fixed pixel widths like width: 1100px . A fixed width causes horizontal
scrolling on small screens — the number-one "overflow" bug.
3. CSS Grid and Flexbox — modern layout systems. We use Grid for the product cards and Flexbox for the header.
```text
.product-grid {
  display: grid;
  grid-template-columns: 1fr;      /* one column by default (phones) */
  gap: 1rem;
}
```
4. Media queries — rules that apply only at certain widths:
```text
@media (min-width: 600px) {
  .product-grid { grid-template-columns: repeat(2, 1fr); }   /* tablets */
}
@media (min-width: 900px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }   /* laptops */
}
```
How this interacts with JavaScript-rendered content — the important new lesson. The CSS rules do not care whether an
element was typed in the HTML by hand or created later by JavaScript. A .product-card created by document.createElement in the
browser is a normal element, and the same media queries style it.
So: as long as JavaScript gives each created element the correct class names, it will be responsive automatically. This is
why, in our render function, we always set card.className = "product-card" — that one line is what connects our JavaScript
to all the responsive CSS.
The trap: if JavaScript sets the wrong class (or forgets it), the cards render as unstyled stacked blocks and the layout looks
broken only on some widths. When a learner says "it works on my laptop but breaks on my phone", suspect a missing or
misspelled class name before suspecting the CSS.
Where mobile problems really come from (previewed; Section K goes deeper):
Overflow: a fixed-width element (or a very long unbroken word) wider than the screen pushes the page sideways.
Oversized images: a 4000px photo displayed on a 360px screen. Fix with img { max-width: 100%; height: auto; } plus
compressed image files.
Nav that does not collapse: the horizontal menu runs off the screen. Fix with our checkbox menu and a media query.
F.6 Testing responsiveness with Chrome DevTools device toolbar
What it is. The device toolbar lets you simulate phone and tablet screens inside your desktop Chrome, without owning those
devices.
How to open it: Press Ctrl + Shift + M , or click the small phone/tablet icon at the top-left of DevTools. Then choose a device
from the dropdown (e.g. "iPhone SE"), or type a custom width.
The three widths we test every time:
Width Represents What to expect
360px Small phone One-column product grid; the "Menu" button appears; text is readable with no sideways scroll.
768px Tablet Two-column product grid; horizontal nav visible.
1024px Small laptop Three-column product grid; full desktop layout.
How to check for the classic overflow bug: in the device toolbar, look at the right edge. If a horizontal scrollbar appears,
something is wider than the screen. A quick way to find the culprit: in the Console, type document.documentElement.scrollWidth —
if it is larger than the width you set, something overflows. Then in the Elements panel, hover over elements and watch the page
highlight to find the wide one. (A useful pro tip: add * { outline: 1px solid red; } temporarily to see every box.)
Why we test in the toolbar and not only by resizing the window. The toolbar also tells the page the correct device width,
mimicking the viewport meta tag's real behaviour, and it shows touch events. It is the closest thing to a real phone without
leaving your desk.
Important honesty note: the device toolbar is a simulation; it is not a real phone. It does not test real network speed or real
device fonts perfectly. Later, in Session 11, we deploy and open the real URL on an actual phone as the final proof.
F.7 Summary of the session
A multi-page site is a folder of files linked with <a href="page.html"> using relative paths.
Every page shares the same header/nav/footer and the same CSS/JS files for consistency.
The cart follows the customer because every page loads the cart from localStorage and redraws the badge.
A live search filter uses the input event, toLowerCase() , includes() and Array.filter() .
Responsive design (viewport tag, flexible units, Grid/Flexbox, media queries) styles JavaScript-created elements too — as
long as the class names are correct.
Always test at 360px, 768px and 1024px.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 What the instructor prepares
A folder demo-week3-s9/ containing: index.html , about.html , contact.html , css/style.css , js/products.js , js/cart.js ,
js/app.js (all contents in Appendix 9A).
Open the whole folder in VS Code. Start Live Server on index.html .
DevTools open; device toolbar ready ( Ctrl + Shift + M ).
A marker and the whiteboard for drawing the "shared block copied into each file" idea.
G.2 Demonstration 1 — click through the pages and watch the cart follow (5 minutes)
Say: "Watch the small number next to 'Cart' in the top corner. I will add a product, then leave this page entirely, and you tell me
what happens."
Do this on the projector:
1. On index.html , click Add to cart on one product. The badge changes from 0 to 1 .
2. Click the About link. The URL in the address bar changes to .../about.html . Point out the badge: it still shows 1 .
3. Click Contact, then back to Shop. The badge stays 1 .
Ask: "The About page never displayed a product. How did it know the cart had one item?"
Answer: about.html loads js/cart.js , calls updateCartBadge() , which reads the same localStorage the shop page wrote to.
Then show the failure deliberately: In about.html , remove the <script src="js/cart.js"></script> line, save, refresh About.
Expected result: the badge shows 0 even though the cart has an item.
Say: "There it is — the cart looks lost. Put the line back and it returns. Every page needs the shared cart script."
G.3 Demonstration 2 — the live search filter (5 minutes)
Say: "Now the capstone feature. Type with me."
Do this:
1. On index.html , click into the search box.
2. Type an . Point out the grid shrinking to matching products as you type, with no button pressed.
3. Clear the box — all products return.
4. Type gele — only the matching product remains.
5. Type zzz — the "No products match your search" message appears.
Reasoning to explain aloud: the input event fires on every keystroke; .filter makes a new array; renderProducts redraws the
grid; the empty term shows everything because every string includes "" .
Inject an error on purpose: change product.name.toLowerCase().includes(term) to product.name.includes(term) . Save, refresh, type
ankara (lowercase).
Expected result: no products show, because "Ankara Dress".includes("ankara") is false — capital A versus small a.
Say: "Silent bug! There is no red error. That is why we lowercase both sides. Never trust your eyes on capitalisation."
Fix it back.
G.4 Demonstration 3 — the mobile check (5 minutes)
Say: "A shop that only works on a laptop is only half a shop. Let's break it and fix it."
Do this:
1. Press Ctrl + Shift + M . Set width to 360px.
2. Point out the one-column grid and the Menu button.
3. Click Menu — the nav drops down (pure CSS, using the checkbox).
4. Widen to 768px — two columns, menu gone, links visible.
5. Widen to 1024px — three columns.
6. Inject the bug: in css/style.css , delete the <meta name="viewport"> line from index.html 's head (or comment it out). Save,
refresh at 360px.
Expected result: the page looks zoomed-out and tiny with big margins — as if the phone is pretending to be a desktop.
Say: "This is the number-one responsive mistake in Nigeria, because many learners copy old starter templates that lack
this line. Always include the viewport tag."
Put it back.
7. Inject a second bug: add width: 1200px; to .product-grid in the CSS. Refresh at 360px.
Expected result: a horizontal scrollbar appears; content is cut off.
Say: "Fixed width equals overflow. Use fr columns and max-width , never a hard width on a layout container." Undo
the change.
Questions to ask during the demo:
"If I add a new product to the array, do I need to touch the CSS?" (No — the grid handles any number of cards.)
"Why does the badge not update if I only change the CSS?" (The badge is data, driven by JavaScript and localStorage , not
CSS.)
"What are our three test widths?" (360, 768, 1024.)

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: With the instructor guiding each step, convert the learner's Session 8 product page into a three-page site with a
shared header/cart badge and a live search filter, then verify it at three widths.
Starting materials: The learner's webdev-practice folder, containing at least a working product page and localStorage cart from
Session 8 (or the instructor's starter given in Appendix 9A).
Procedure (instructor calls out each numbered step; learners follow on their machines; instructor walks the room):
1. Create the structure. Inside webdev-practice , create folders css and js . You should have:
```text
webdev-practice/
├── index.html
├── about.html
├── contact.html
├── css/
│   └── style.css
└── js/
    ├── products.js
    ├── cart.js
    └── app.js
```
2. Move all styling into css/style.css . Cut the <style> block out of index.html and paste it into style.css , then link it in
every page's <head> : <link rel="stylesheet" href="css/style.css">
3. Add the shared header (from Section F.2) to the top of the <body> of all three pages.
4. Add the shared footer just before the closing </body> of all three pages.
5. Create js/cart.js and type the code from Section F.3.
6. Create js/products.js with your product array. Use your own shop's products; each product needs id , name , price and
category .
7. Create js/app.js with a renderProducts(list) function and an applyFilter() function (the code is in Appendix 9A). At the
bottom, add:
```text
document.addEventListener("DOMContentLoaded", function () {
  updateCartBadge();
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    renderProducts(products);
    searchBox.addEventListener("input", applyFilter);
  }
});
```
8. Link the scripts at the bottom of index.html (before </body> ):
```text
<script src="js/products.js"></script>
<script src="js/cart.js"></script>
<script src="js/app.js"></script>
```
Link only js/cart.js and js/app.js on about.html and contact.html (no products needed).
9. On about.html and contact.html , mark the correct nav link with class="active" and give the pages real content (an About
paragraph; a Contact form and WhatsApp number).
10. Test the cart follows you. Add two products on Shop, then visit About and Contact. The badge should read 2
everywhere.
11. Test the search. Type a , then a full product word, then nonsense. Watch the grid respond.
12. Pause and predict. Before opening the device toolbar, ask learners to write down: "How many columns will I see at 360px?
At 768px? At 1024px?" Then test and compare.
13. Responsive test. Open Live Server, then DevTools device toolbar. Check 360px, 768px and 1024px. Look for horizontal scroll.
Expected result:
All three pages share one identical header and footer.
The cart badge shows the same number on every page.
Typing in the search box filters the grid live; clearing it restores all products.
At 360px: one column + Menu button; at 768px: two columns; at 1024px: three columns; no horizontal scrollbar.
Points to pause on and predict:
After step 10: "What will the badge show on About if I added two items?" (2.)
After step 11: "If the box is empty, how many products show?" (All of them, because every name includes "" .)
After step 12: the three column counts.
Troubleshooting while walking the room:
Badge always 0 → the page is missing <script src="js/cart.js"></script> , or the CART_KEY differs from the shop page. Or
the learner is running via file:// instead of Live Server for some browsers' stricter rules.
Search does nothing → the input listener was never attached, or the id is search in HTML but searchBox in JS. Confirm
with console.log(searchBox) .
Nothing renders at all → a red error in the Console (Session 10 will teach reading it). Common cause:
renderProducts(products) runs before products.js is loaded — check the script order.
Layout does not change with width → the viewport meta tag is missing, or the media queries are in the wrong file (they
must be in style.css ).
Two columns never appear → a typo in grid-template-columns , or the media query is below a later rule that overrides it.
Completion checklist (learner ticks each):
index.html , about.html , contact.html exist and link to each other
All pages share the identical header/nav/footer
One shared css/style.css linked on all pages with relative paths
js/cart.js loaded on all pages; cart badge matches on all three
js/products.js holds at least 4 products with id , name , price , category
renderProducts draws the grid and sets class="product-card"
Search box filters live using input , toLowerCase , includes
Empty search shows all products; no matches shows the empty-state message
Tested at 360px, 768px, 1024px with no horizontal scroll
Nav collapses to a Menu button on the phone width

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Extend the shop with a category filter bar and an active-link highlight — a new task building on what you just did, not a
copy of it.
Scenario: Adaeze sells dresses, gele (head-ties) and jewellery. Customers want to click a category to see only that type. She also
wants the current page's menu link to be clearly highlighted so shoppers never feel lost.
Starting information: the three-page site you just built ( index.html , about.html , contact.html ), with the shared header, cart
badge and search box.
Requirements:
1. Add a category bar to index.html above the product grid, containing buttons: All, Dresses, Gele, Jewellery. Give the bar
the class category-bar .
2. Clicking a category button shows only products whose category matches; clicking All shows everything.
3. Highlight the active category button so the customer can see which one is selected (for example, keep a selected class on
it).
4. On all three pages, ensure the current page's nav link has the active class so it is visually underlined.
5. A comment in the HTML, for each nav block, is not required — but each page's active class must be on the correct link.
Constraints:
Use the click event and Array.filter() ; do not reload the page.
The search box must still work together with the category filter (if a category is chosen and the customer types, both rules
apply).
No page reloads; no duplicated CSS (keep styles in style.css ).
Time allowance: 15 minutes.
Success criteria:
Clicking Gele shows only gele products.
Clicking All restores every product.
The chosen category button looks selected.
Typing a search term while a category is active refines further (no crash, sensible results).
Each page's own link is highlighted in the nav.
No red errors in the Console.
Hints:
Hint 1: keep one variable, e.g. let activeCategory = "All"; . A category button sets it, then re-runs the filter.
Hint 2: make one function refreshView() that applies both the category and the search term, and call it from both the
button clicks and the search input .
Hint 3: give each category button data-category="Dresses" and read it with button.dataset.category .
Instructor answer key (do not show learners):
Update index.html to add the bar (between the search box and the grid):
```text
<div class="category-bar" id="categoryBar">
  <button class="category-btn selected" data-category="All">All</button>
  <button class="category-btn" data-category="Dresses">Dresses</button>
  <button class="category-btn" data-category="Gele">Gele</button>
  <button class="category-btn" data-category="Jewellery">Jewellery</button>
</div>
```
Add to js/app.js :
```text
let activeCategory = "All";
```
```text
// Apply BOTH the category and the search term together.
function refreshView() {
  const searchBox = document.getElementById("searchBox");
  const term = searchBox ? searchBox.value.toLowerCase().trim() : "";
```
```text
  let result = products.filter(function (product) {
    const matchesCategory =
      activeCategory === "All" || product.category === activeCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(term);
    return matchesCategory && matchesSearch;
  });
```
```text
  renderProducts(result);
}
```
```text
// Category buttons.
const categoryBar = document.getElementById("categoryBar");
if (categoryBar) {
  categoryBar.addEventListener("click", function (event) {
    const button = event.target.closest(".category-btn");
    if (!button) {
      return;
    }
    activeCategory = button.dataset.category;
```
```text
    // Move the 'selected' highlight.
    const allButtons = categoryBar.querySelectorAll(".category-btn");
    allButtons.forEach(function (b) {
      b.classList.remove("selected");
    });
    button.classList.add("selected");
```
```text
    refreshView();
  });
}
```
```text
// Search box now calls refreshView (not applyFilter).
const searchBox = document.getElementById("searchBox");
if (searchBox) {
  searchBox.addEventListener("input", refreshView);
}
```
Add to style.css :
```text
.category-bar {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  padding: 0 1rem 1rem;
  max-width: 1100px;
  margin: 0 auto;
}
.category-btn {
  border: 1px solid #8e44ad;
  background: #fff;
  color: #8e44ad;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  cursor: pointer;
}
.category-btn.selected {
  background: #8e44ad;
  color: #fff;
}
```
Active nav link (already in base CSS):
```text
.site-nav a.active {
  border-bottom: 2px solid #fff;
  font-weight: 700;
}
```
Marking guidance (out of 10): category bar present and styled (2); correct filtering logic (3); active category highlight toggles
correctly (2); search and category combine without crashing (2); correct nav active link on each of the three pages (1).

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Tunde runs an online phone-accessory shop called Tunde Gadgets in Port Harcourt. His site started as one long page:
about 60 accessories, then the About text, then the contact form, all stacked. Customers complained they could not find a
charger quickly, and some said they "lost" items because after ordering they scrolled away and could not find the cart again.
Relevant facts.
The single page was hard to use on a phone: 60 products in one column, then a wall of text.
There was no search box.
The cart was a JavaScript variable that reset on refresh, so customers who refreshed lost everything.
Tunde's page had no <meta name="viewport"> tag, so on phones it appeared tiny with big white margins.
Decision point. Should Tunde (a) hire a developer to rebuild everything, (b) keep one page but add a search box, or (c) split the
site into a proper multi-page shop with a persistent cart and responsive layout?
Possible approaches.
1. Hire a full rebuild. Expensive and slow; overkill for a small accessories shop.
2. One page + search. Cheaper, but the cart still resets and the About/Contact content still clutters the shop.
3. Multi-page integration (today's skill). index.html (shop), about.html , contact.html ; a shared responsive header with a cart
badge; a live search filter; the cart saved in localStorage .
Recommended solution. Approach 3. It uses exactly the skills from Sessions 4–9, costs Tunde nothing but time, and fixes all
four complaints at once: search finds products fast, separate pages keep each page short, the badge shows the cart on every
page, and the viewport tag makes it usable on phones.
Example solution (the essential pieces):
```text
// Shared cart that every page can read.
const CART_KEY = "tundeCart";
```
```text
function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY)) || [];
}
```
```text
function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (!badge) return;
  const count = getCart().reduce(function (n, item) { return n + item.qty; }, 0);
  badge.textContent = count;
}
```
```text
// Live search on the shop page.
function refreshView() {
  const term = document.getElementById("searchBox").value.toLowerCase().trim();
  const shown = products.filter(function (p) {
    return p.name.toLowerCase().includes(term);
  });
  renderProducts(shown);
}
```
Trade-offs.
Approach 1 gives the best result but is not affordable at this size and slows the business.
Approach 2 is quick but does not fix the lost cart or the clutter.
Approach 3 is free, matches Tunde's scale, and teaches reusable skills — but it means Tunde must keep the shared
header/footer identical across pages when he adds products (a manual discipline). That is acceptable for a small shop and is
exactly what the capstone asks for.
Professional connection. This is the daily work of a junior front-end developer: taking a growing single-page app and
integrating it into a coherent, responsive, multi-page product. The skills of shared layout, localStorage persistence, live
filtering and responsive testing are named on entry-level job adverts every day in Nigeria and abroad.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
Use this table as the live troubleshooting guide. When a learner is stuck, ask them to check the relevant row before giving the
answer.
K.1 The cart badge shows 0 on other pages
Symptoms: The badge updates on the shop but resets to 0 on About/Contact. Likely causes: (a) js/cart.js is not linked on
that page. (b) CART_KEY is spelled differently in different files. (c) updateCartBadge() is never called on that page. Investigate: In
the Console on the About page, type localStorage.getItem("adaezeCart") . If it returns the saved cart text but the badge is 0 , the
page is not reading it. Check the <script> tags and the spelling of the key. Corrective steps: Add <script src="js/cart.js">
</script> and <script src="js/app.js"></script> to the page; ensure updateCartBadge() runs on DOMContentLoaded ; make the key
identical everywhere. Confirm: Badge matches on all three pages. Prevent: Treat the header block and script tags as one unit —
copy them identically.
K.2 Navigation links go to the wrong place (or nowhere)
Symptoms: Clicking "About" opens a blank page or a file-not-found error. Likely causes: (a) A wrong relative path, e.g.
href="pages/about.html" when the file is in the main folder. (b) A misspelt file name, e.g. abut.html . (c) Case mismatch
( About.html vs about.html ). Investigate: Look at the file list in VS Code; compare spelling and folder exactly. Corrective steps:
Fix the href to match the real file name and location. Prevent: Create the file first, then write the link; use VS Code's
autocomplete inside href="..." .
K.3 The site works locally but breaks after deployment (absolute paths)
Symptoms: After uploading to GitHub Pages, images and links are broken. Likely cause: Absolute paths such as
href="C:\Users\Ada\shop\about.html" or src="/Users/Ada/img/x.jpg" . A web server never has your C:\ drive. Investigate: Search
your files for C:\ or a leading / in paths. Corrective steps: Replace every absolute path with a relative path: about.html ,
css/style.css , images/x.jpg . Prevent: Never type drive letters in HTML. (This connects to Session 11.)
K.4 The search filter returns nothing for a word you can see
Symptoms: You type a product name in lowercase and the grid empties. Likely cause: Missing .toLowerCase() on the product
name (case-sensitive comparison). Investigate: console.log(product.name, term) inside the filter to see the raw values.
Corrective steps: Lowercase both sides: product.name.toLowerCase().includes(term) . Prevent: Always normalise text before
comparing.
K.5 The whole page scrolls sideways on a phone (overflow)
Symptoms: A horizontal scrollbar; content cut off at 360px. Likely causes: (a) A fixed width: 1000px on a layout container. (b) A
large image without max-width: 100% . (c) A long unbroken word or URL. Investigate: In the Console, run
document.documentElement.scrollWidth and compare with 360. In Elements, hover boxes to find the wide one. Corrective steps:
Replace fixed widths with max-width: 100% or fr columns; add img { max-width: 100%; height: auto; } ; add overflow-wrap:
break-word; where needed. Prevent: Never use a fixed pixel width on the main layout container.
K.6 The site looks tiny on a phone with big white margins
Symptoms: On a real phone, the whole page is zoomed out into a narrow strip. Likely cause: The <meta name="viewport"> tag is
missing from the <head> . Investigate: View the page source and check the <head> . Corrective steps: Add <meta
name="viewport" content="width=device-width, initial-scale=1.0"> . Prevent: Start every new page from a template that already has
it.
K.7 The nav runs off the screen / does not collapse
Symptoms: On a phone, menu links spill off the right edge. Likely causes: (a) No media query to switch the nav to a vertical
menu. (b) The checkbox-menu CSS selector is wrong. Investigate: At 360px, inspect the <nav> and see whether .site-nav {
display:none } is being applied. Corrective steps: Add the mobile media query and ensure the label/checkbox are siblings:
.nav-toggle:checked ~ .site-nav { display: flex; } . Prevent: Test at 360px as soon as you build any nav.
Distinguish likely vs confirmed. In each case, confirm before fixing: read the Console, run a console.log , or inspect the
element. Never guess-and-change blindly.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "My Three-Page Shop — Integrated and Responsive"
Purpose: Practise building a consistent multi-page site with a shared cart, a live search filter and a responsive layout — the exact
structure of the capstone.
Realistic scenario: You are building the front end for a small Port Harcourt business (your own idea, or Adaeze Fashion). It must
have three pages, a working product search and a cart that follows the customer between pages.
Detailed instructions:
1. Create a folder assignment9/ with this structure:
```text
assignment9/
├── index.html        (Home / Shop)
├── about.html
├── contact.html
├── css/style.css     (one shared file)
└── js/
    ├── products.js   (your array, at least 6 products)
    ├── cart.js       (the shared cart helper)
    └── app.js        (render + search + badge)
```
2. Every page must share the same header (with cart badge), the same nav and the same footer.
3. index.html shows: a product grid rendered by JavaScript, a search box that filters live, and an "Add to cart" button on each
product.
4. about.html tells the business story; contact.html shows a form (name, email, message) and a WhatsApp number. Both
pages must show the live cart badge.
5. Use only relative paths.
6. Test at 360px, 768px and 1024px; the grid must go 1 → 2 → 3 columns and the nav must collapse to a Menu button on the
phone width.
Required deliverables:
The full assignment9/ folder (all three pages + css/js).
At least two screenshots: one at 360px and one at 1024px (paste into your workbook or submit as image files).
A short note (3–5 lines) in your workbook describing one problem you hit and how you fixed it.
Submission format: Zip the folder or place it in the class shared folder; screenshots in the workbook. Deadline: Before Session
10.
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
Three pages, correct structure 3 All files present; index.html is the shop; relative paths only
Consistent shared header/nav/footer 3 Visually identical on all pages; correct active link per page
Cart persists across pages 4 Badge shows the same count on Shop, About and Contact
Live search filter 4 Filters on input ; case-insensitive; empty state handled; empty box shows all
Criterion Marks Description of a strong answer
Responsive layout 4 1/2/3 columns at 360/768/1024; viewport tag present; no horizontal scroll
Presentation / no errors 2 Clean look; no red Console errors
Common mistakes to avoid: absolute paths; missing cart.js on a page; forgetting .toLowerCase() ; forgetting the viewport
tag; a fixed-width container causing overflow.
Instructor reference solution: the complete code in Appendix 9A below is the reference (all files). A strong learner answer will
match its structure, though the products and styling will differ.

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key.)
Q1. Short answer. What is the difference between a relative path and an absolute path, and which must we use for a deployed
site?
Q2. Multiple choice. Which event should a search box use to filter as the user types, including when the user pastes with the
mouse? a) click b) keyup c) input d) change
Q3. Explain in your own words. Why does the cart badge stay the same number when you move from index.html to
about.html ?
Q4. Practical identification. What does each piece of code do? a) "Ankara".toLowerCase() b) "ankara dress".includes("ankara") c)
products.filter(p => p.price > 5000) d) <meta name="viewport" content="width=device-width, initial-scale=1.0">
Q5. Error detection. A learner's search only works when typing an exact match with capital letters. What single character-
gobbling mistake is the most likely cause, and how do you fix it? Give the fixed line.
Q6. Scenario. In app.js , a learner writes the search listener, but the page throws Cannot read properties of null (reading
'addEventListener') . Name two likely causes and the quickest way to confirm which one it is.
INSTRUCTOR ANSWER KEY (Q1–Q6)
A1. A relative path points to a file based on the current page's folder (e.g. about.html , css/style.css ); an absolute path gives a
full location from the drive or server root (e.g. C:\Users\Ada\site\about.html ). We must use relative paths, because a web server
does not have your local drive; relative paths keep working when the site is moved to GitHub Pages.
A2. (c) input — it fires for typing and pasting. keyup misses paste-via-mouse; change fires only when the field loses focus.
A3. Because every page reads the cart from the same localStorage key ( adaezeCart ) and calls updateCartBadge() on load.
localStorage belongs to the whole site (origin), not to a single page, so the value survives navigation; the badge is simply
redrawn on each page.
A4. a) Returns the lowercase string "ankara" . b) Returns true because "ankara" appears inside the name. c) Returns a new
array of only products priced above ₦5,000. d) Tells the phone browser to use the device's actual width and not to zoom out —
the foundation of responsive design.
A5. The product name is compared without lowercasing, so "Ankara Dress".includes("ankara") is false (capital A). Fix by
lowercasing both sides:
```text
return product.name.toLowerCase().includes(term);
```
A6. Two likely causes: (1) the element's id in the HTML is different from the one used in getElementById (typo or wrong id), or
(2) the <script> is placed in the <head> / above the element, so the element does not exist yet when the code runs. Quickest
confirmation: in the Console type document.getElementById("searchBox") — if it returns null , the selector is wrong or runs too
early; check the exact id in the Elements panel. (Fix by matching the id, or by putting the script at the bottom of the body /
using DOMContentLoaded .)

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today your one-page app grew into a real three-page site. You learned that a website is a folder of files
linked with relative paths, that every page shares one CSS file and one JavaScript file for consistency, and that the cart follows
the customer because each page reloads it from localStorage and redraws the badge. You built the capstone's headline feature
— a live search filter using the input event, toLowerCase() and includes() — and you revisited responsive design: the
viewport tag, flexible units, Grid/Flexbox and media queries. Crucially, you learned that JS-created elements are styled by the
same responsive CSS, as long as the class names are right. Finally, you tested at 360px, 768px and 1024px.
Five important takeaways:
1. A website is a folder of files linked with relative paths; index.html is the front door.
2. Every page repeats the same header/nav/footer and links the same CSS/JS.
3. The cart persists across pages only because localStorage is read and the badge redrawn on every page.
4. A live search filter = input event + Array.filter + toLowerCase() + includes() .
5. Responsive design styles JavaScript-created elements too — test at 360, 768 and 1024.
Questions to help you recognise what you can now do:
Can I create a second page and link to it correctly with a relative path?
Can I make the cart badge show the same number on three different pages?
Can I write a search filter from memory?
Can I explain why a phone shows my page tiny if the viewport tag is missing?
Can I check my layout at three widths and fix an overflow?
Connection to the next session: Our site now works, but does it work correctly? When something breaks, how do we find out
quickly? Next week we move into Module 4: Polish and Deploy, starting with Session 10 — Debugging, Validating and
Optimising. You will learn to read error messages in the Console, pause code with breakpoints, validate your HTML/CSS, and
make your pages accessible and fast.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
Learner builds the second and third page without prompting and links them with correct relative paths.
Learner adds cart.js to every page and can explain why the badge must be redrawn per page.
Learner writes the filter using input (not keyup ) and lowercases both sides without being told.
Learner tests 360/768/1024 without being reminded and spots overflow themselves.
Learner keeps the shared header identical across files.
Common misconceptions to watch for and correct:
"The cart is remembered in memory." → It is wiped on navigation; only localStorage persists.
"A relative path and an absolute path are the same on my computer." → They differ the moment you deploy; insist on
relative.
"CSS is only for HTML I typed." → JS-created elements are styled by the same CSS if class names match.
"filter changes the original array." → It returns a new array.
"Responsive design is only about the browser window." → The viewport tag and device behaviour matter; always test in the
device toolbar.
Suggested remedial exercises for learners who struggle:
1. Two-page drill: create just index.html and about.html with identical headers and a working link, then view both in the
device toolbar at 360px.
2. Filter drill: given an array and a fixed search box, write only the applyFilter function and test it with three typed words.
3. Path drill: hand out five links, some relative and some absolute, and ask the learner to correct the bad ones.
Differentiation:
Level 1 (supported): provide the complete three-file starter from Appendix 9A with one page and the search left blank; the
learner completes the search and the About page and copies the header.
Level 2 (standard): the guided exercise plus the independent category filter.
Level 3 (challenge): also filter by category and price range together; add a "sort by price" dropdown; add a small "(x
results)" count that updates live; and make the nav a proper hamburger with an animated icon.
Timing guidance: The guided exercise and the search feature are the core of the session. If the class is slow, reduce the case
study (Section J) to a two-minute talk and shorten Section G.3, but protect time for the guided exercise steps 8–13 (linking
scripts and the search/filter) and the independent exercise. The mobile test must not be skipped — it is the "Responsive" half of
the session title.
APPENDIX 9A — COMPLETE RUNNABLE EXAMPLE
The following files together form the working demo. Save them in one folder, open the folder in VS Code, and use Live Server
on index.html .
```text
css/style.css
```
```text
:root {
  --brand: #8e44ad;
  --ink: #222222;
  --muted: #666666;
  --bg: #faf7fb;
}
```
```text
* {
  box-sizing: border-box;
}
```
```text
body {
  margin: 0;
  font-family: system-ui, Arial, sans-serif;
  color: var(--ink);
  background: var(--bg);
  line-height: 1.5;
}
```
```text
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```
```text
/* ---------- Header / nav ---------- */
.site-header {
  background: var(--brand);
  color: #ffffff;
}
```
```text
.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
```
```text
.brand {
  color: #ffffff;
  font-weight: 700;
  text-decoration: none;
  font-size: 1.2rem;
}
```
```text
.site-nav {
```
```text
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
```
```text
.site-nav a {
  color: #ffffff;
  text-decoration: none;
  padding: 0.25rem 0;
  border-bottom: 2px solid transparent;
}
```
```text
.site-nav a.active {
  border-bottom-color: #ffffff;
  font-weight: 700;
}
```
```text
.cart-count {
  background: #ffffff;
  color: var(--brand);
  border-radius: 999px;
  padding: 0 0.5rem;
  font-weight: 700;
}
```
```text
/* Hidden on desktop: the checkbox and its label */
.nav-toggle {
  display: none;
}
.nav-toggle-label {
  display: none;
}
```
```text
/* ---------- Content ---------- */
.hero {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1.5rem 1rem 0.5rem;
}
```
```text
.search-wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
}
```
```text
#searchBox {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #cccccc;
  border-radius: 8px;
}
```
```text
.product-grid {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1rem 2rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
```
```text
.product-card {
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
```
```text
.product-img {
  width: 100%;
```
```text
  aspect-ratio: 4 / 3;
  object-fit: cover;
}
```
```text
.product-body {
  padding: 0.75rem 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
```
```text
.product-name {
  font-weight: 700;
  margin: 0;
}
```
```text
.product-price {
  color: var(--brand);
  font-weight: 700;
  margin: 0;
}
```
```text
button.add {
  background: var(--brand);
  color: #ffffff;
  border: 0;
  padding: 0.6rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
}
```
```text
button.add:hover {
  opacity: 0.9;
}
```
```text
.cart-summary {
  max-width: 1100px;
  margin: 0 auto 2rem;
  padding: 0 1rem;
}
```
```text
.site-footer {
  background: #2c2c34;
  color: #dddddd;
  text-align: center;
  padding: 1rem;
  margin-top: 2rem;
}
```
```text
/* ---------- Responsive breakpoints ---------- */
@media (min-width: 600px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```
```text
@media (min-width: 900px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```
```text
@media (max-width: 640px) {
  .nav-toggle-label {
    display: block;
    cursor: pointer;
    color: #ffffff;
    font-weight: 700;
    border: 1px solid #ffffff;
    border-radius: 6px;
    padding: 0.25rem 0.6rem;
  }
  .site-nav {
```
```text
    display: none;
    width: 100%;
    flex-direction: column;
    padding-top: 0.5rem;
  }
  .nav-toggle:checked ~ .site-nav {
    display: flex;
  }
}
```
```text
js/products.js
```
```text
// products.js — the shop's data.
```
```text
// Generates a coloured placeholder image so the demo runs with no image files.
// In a real shop you would replace this with real <img src="images/..."> files.
function placeholderImage(label, color) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300">' +
    '<rect width="400" height="300" fill="' + color + '"/>' +
    '<text x="200" y="165" font-family="Arial" font-size="32" fill="#ffffff" text-anchor="middle">' +
    label +
    '</text>' +
    '</svg>';
  return "data:image/svg+xml," + encodeURIComponent(svg);
}
```
```text
const products = [
  { id: 1, name: "Ankara Dress", price: 18000, category: "Dresses", image: placeholderImage("Ankara", "#8e44ad"), alt: "Ankara print
  { id: 2, name: "Lace Gown", price: 35000, category: "Dresses", image: placeholderImage("Lace", "#c0392b"), alt: "Navy lace evening
  { id: 3, name: "Aso Oke Gele", price: 7500, category: "Gele", image: placeholderImage("Gele", "#16a085"), alt: "Aso oke head-tie"
  { id: 4, name: "Silk Gele", price: 5500, category: "Gele", image: placeholderImage("Silk", "#2980b9"), alt: "Silk head-tie" },
  { id: 5, name: "Beaded Necklace", price: 4500, category: "Jewellery", image: placeholderImage("Beads", "#d35400"), alt: "Handmade
  { id: 6, name: "Gold Earrings", price: 9000, category: "Jewellery", image: placeholderImage("Gold", "#b8860b"), alt: "Gold drop ea
  { id: 7, name: "Kente Wrap", price: 22000, category: "Dresses", image: placeholderImage("Kente", "#27ae60"), alt: "Kente cloth wra
  { id: 8, name: "Coral Beads Set", price: 15000, category: "Jewellery", image: placeholderImage("Coral", "#e74c3c"), alt: "Coral be
];
```
```text
js/cart.js
```
```text
// cart.js — shared by every page.
const CART_KEY = "adaezeCart";
```
```text
function getCart() {
  const saved = localStorage.getItem(CART_KEY);
  if (!saved) {
    return [];
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    console.warn("Cart data was corrupt and has been reset.", error);
    return [];
  }
}
```
```text
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}
```
```text
function cartCount() {
  return getCart().reduce(function (total, item) {
    return total + item.qty;
  }, 0);
}
```
```text
function updateCartBadge() {
  const badge = document.getElementById("cartCount");
  if (!badge) {
    return;
  }
```
```text
  badge.textContent = cartCount();
}
```
```text
function addToCart(id) {
  const cart = getCart();
  const existing = cart.find(function (item) {
    return item.id === id;
  });
  if (existing) {
    existing.qty = existing.qty + 1;
  } else {
    cart.push({ id: id, qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
}
```
```text
js/app.js
```
```text
// app.js — shared by every page.
```
```text
function renderProducts(list) {
  const grid = document.getElementById("productGrid");
  if (!grid) {
    return;
  }
```
```text
  if (list.length === 0) {
    grid.innerHTML = "<p>No products match your search. Try another word.</p>";
    return;
  }
```
```text
  const html = list
    .map(function (product) {
      return (
        '<article class="product-card">' +
        '<img class="product-img" src="' + product.image + '" alt="' + product.alt + '">' +
        '<div class="product-body">' +
        '<h3 class="product-name">' + product.name + "</h3>" +
        '<p class="product-price">₦' + product.price.toLocaleString("en-NG") + "</p>" +
        '<button class="add" data-id="' + product.id + '">Add to cart</button>' +
        "</div>" +
        "</article>"
      );
    })
    .join("");
```
```text
  grid.innerHTML = html;
}
```
```text
function applyFilter() {
  const searchBox = document.getElementById("searchBox");
  const term = searchBox.value.toLowerCase().trim();
  const filtered = products.filter(function (product) {
    return product.name.toLowerCase().includes(term);
  });
  renderProducts(filtered);
}
```
```text
function renderCartSummary() {
  const box = document.getElementById("cartSummary");
  if (!box) {
    return;
  }
  const cart = getCart();
  if (cart.length === 0) {
    box.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }
  let total = 0;
  let html = "<ul>";
  cart.forEach(function (item) {
    const product = products.find(function (p) {
```
```text
      return p.id === item.id;
    });
    if (!product) {
      return;
    }
    const line = product.price * item.qty;
    total += line;
    html += "<li>" + product.name + " × " + item.qty + " — ₦" + line.toLocaleString("en-NG") + "</li>";
  });
  html += "</ul><p><strong>Total: ₦" + total.toLocaleString("en-NG") + "</strong></p>";
  box.innerHTML = html;
}
```
```text
document.addEventListener("DOMContentLoaded", function () {
  updateCartBadge();
```
```text
  const searchBox = document.getElementById("searchBox");
  if (searchBox) {
    renderProducts(products);
    searchBox.addEventListener("input", applyFilter);
  }
```
```text
  const grid = document.getElementById("productGrid");
  if (grid) {
    grid.addEventListener("click", function (event) {
      if (event.target.classList.contains("add")) {
        const id = Number(event.target.dataset.id);
        addToCart(id);
        renderCartSummary();
      }
    });
    renderCartSummary();
  }
});
```
```text
index.html
```
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
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Adaeze Fashion</a>
```
```text
      <input type="checkbox" id="navToggle" class="nav-toggle">
      <label for="navToggle" class="nav-toggle-label">Menu</label>
```
```text
      <nav class="site-nav" aria-label="Main navigation">
        <a href="index.html" class="active">Shop</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="index.html" class="cart-link">Cart <span id="cartCount" class="cart-count">0</span></a>
      </nav>
    </div>
  </header>
```
```text
  <main>
    <section class="hero">
      <h1>Welcome to Adaeze Fashion</h1>
      <p>Beautiful Nigerian fashion, delivered from Port Harcourt.</p>
    </section>
```
```text
    <div class="search-wrap">
      <label for="searchBox">Search products</label>
      <input id="searchBox" type="text" placeholder="e.g. Ankara, Gele, Beads">
    </div>
```
```text
    <div class="product-grid" id="productGrid"></div>
```
```text
    <section class="cart-summary" id="cartSummary"></section>
  </main>
```
```text
  <footer class="site-footer">
    <p>© 2026 Adaeze Fashion, Port Harcourt. Built by CEA students.</p>
    <p>WhatsApp: 0803 000 0000</p>
  </footer>
```
```text
  <script src="js/products.js"></script>
  <script src="js/cart.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```
```text
about.html
```
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About — Adaeze Fashion</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Adaeze Fashion</a>
```
```text
      <input type="checkbox" id="navToggle" class="nav-toggle">
      <label for="navToggle" class="nav-toggle-label">Menu</label>
```
```text
      <nav class="site-nav" aria-label="Main navigation">
        <a href="index.html">Shop</a>
        <a href="about.html" class="active">About</a>
        <a href="contact.html">Contact</a>
        <a href="index.html" class="cart-link">Cart <span id="cartCount" class="cart-count">0</span></a>
      </nav>
    </div>
  </header>
```
```text
  <main class="hero">
    <h1>About Adaeze Fashion</h1>
    <p>Adaeze started sewing in 2019 from a small shop on Ebony Road, Port Harcourt.
       Today she styles brides, graduates and professionals across Rivers State.</p>
    <p>Every piece is made to order and delivered with care.</p>
  </main>
```
```text
  <footer class="site-footer">
    <p>© 2026 Adaeze Fashion, Port Harcourt. Built by CEA students.</p>
    <p>WhatsApp: 0803 000 0000</p>
  </footer>
```
```text
  <script src="js/cart.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```
```text
contact.html
```
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contact — Adaeze Fashion</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
```
```text
  <header class="site-header">
    <div class="header-inner">
      <a class="brand" href="index.html">Adaeze Fashion</a>
```
```text
      <input type="checkbox" id="navToggle" class="nav-toggle">
      <label for="navToggle" class="nav-toggle-label">Menu</label>
```
```text
      <nav class="site-nav" aria-label="Main navigation">
        <a href="index.html">Shop</a>
        <a href="about.html">About</a>
        <a href="contact.html" class="active">Contact</a>
        <a href="index.html" class="cart-link">Cart <span id="cartCount" class="cart-count">0</span></a>
      </nav>
    </div>
  </header>
```
```text
  <main class="hero">
    <h1>Contact Us</h1>
    <p>Call or WhatsApp: 0803 000 0000. Visit us at 24/26 Ebony Road, Port Harcourt.</p>
```
```text
    <form>
      <p>
        <label for="contactName">Your name</label><br>
        <input id="contactName" type="text" name="name">
      </p>
      <p>
        <label for="contactEmail">Email</label><br>
        <input id="contactEmail" type="email" name="email">
      </p>
      <p>
        <label for="contactMessage">Message</label><br>
        <textarea id="contactMessage" name="message" rows="4"></textarea>
      </p>
      <button type="submit">Send message</button>
    </form>
  </main>
```
```text
  <footer class="site-footer">
    <p>© 2026 Adaeze Fashion, Port Harcourt. Built by CEA students.</p>
    <p>WhatsApp: 0803 000 0000</p>
  </footer>
```
```text
  <script src="js/cart.js"></script>
  <script src="js/app.js"></script>
</body>
</html>
```
END OF SESSION 9
Next: Session 10 — Debugging, Validating and Optimising.
