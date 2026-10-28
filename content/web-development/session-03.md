---
{
  "id": "web-development/session-03",
  "course": "web-development",
  "number": 3,
  "of": 12,
  "title": "Arrays, Objects and Loops",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/web-development/session-03.png",
    "page": 37,
    "transcript": [
      "ARRAYS, OBJECTS AND LOOPS",
      "ARRAYS - AN ORDERED LIST",
      "const foods = [\"Rice\", \"Beans\", \"Plantain\"];",
      "Rice",
      "Beans",
      "Plantain",
      "index 0",
      "index 1",
      "index 2",
      "Counting starts at 0 - so the last index is length - 1",
      "foods.length | push() adds to the end | pop() removes from the end",
      "OBJECTS - ONE THING WITH LABELS",
      "const product = { name: \"Ankara Bag\",",
      "price: 4500, inStock: true };",
      "product.price (dot access)",
      "product[\"price\"] (brackets)",
      "key: value pairs - keys are names, values are the data",
      "Objects can sit inside objects (nested) - reach in with dot after dot",
      "AN ARRAY OF OBJECTS - THE SHAPE YOUR SHOP DATA WILL USE",
      "name",
      "price (N)",
      "category",
      "Meat Pie",
      "800",
      "Snacks",
      "Chapman",
      "1200",
      "Drinks",
      "const products =",
      "{ id: 1, ... }, ... ]",
      "LOOPS - PICK THE RIGHT ONE FOR THE JOB",
      "for (let i = 0; ...)",
      "When you need the index number,",
      "to skip items or run a set count",
      "for (const item of list)",
      "Best for running through every",
      "item once - clean and simple",
      "list.forEach(fn)",
      "Short style when each item runs",
      "one function - great for printing",
      "NIGERIAN EXAMPLE",
      "const market = [{ name: \"Rice 5kg\", price: 7500 }, { name: \"Oil 1L\", price: 2200 }];",
      "Loop with forEach, print each line with a reusable format function - and watch for off-by-one",
      "errors (i <= list.length) and endless loops (forgotten i++)."
    ],
    "hotspots": [
      {
        "label": "ARRAYS, OBJECTS AND LOOPS",
        "x": 30.58,
        "y": 6.87,
        "w": 38.86,
        "h": 4.21,
        "mono": false
      },
      {
        "label": "ARRAYS - AN ORDERED LIST OBJECTS - ONE THING WITH LABELS",
        "x": 16.24,
        "y": 15.88,
        "w": 70.44,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "const foods = [\"Rice\", \"Beans\", \"Plantain\"]; const product = { name: \"Ankara Bag\",",
        "x": 7.15,
        "y": 22.24,
        "w": 74.19,
        "h": 2.27,
        "mono": true
      },
      {
        "label": "price: 4500, inStock: true };",
        "x": 53.12,
        "y": 25.31,
        "w": 22.13,
        "h": 2.24,
        "mono": true
      },
      {
        "label": "Rice Beans Plantain",
        "x": 11.92,
        "y": 27.73,
        "w": 27.33,
        "h": 1.94,
        "mono": false
      },
      {
        "label": "product.price (dot access) product[\"price\"] (brackets)",
        "x": 54.07,
        "y": 30.42,
        "w": 36.12,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "index 0 index 1 index 2",
        "x": 11.17,
        "y": 31.7,
        "w": 28.0,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "key: value pairs - keys are names, values are the data",
        "x": 53.12,
        "y": 34.54,
        "w": 26.56,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "Counting starts at 0 - so the last index is length - 1",
        "x": 7.15,
        "y": 35.22,
        "w": 25.64,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "Objects can sit inside objects (nested) - reach in with dot after dot foods.length | push() adds to the end | pop() removes from the end",
        "x": 53.12,
        "y": 37.58,
        "w": 33.22,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "AN ARRAY OF OBJECTS - THE SHAPE YOUR SHOP DATA WILL USE",
        "x": 25.18,
        "y": 44.09,
        "w": 49.58,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "name price (N) category",
        "x": 15.15,
        "y": 49.46,
        "w": 51.32,
        "h": 2.12,
        "mono": false
      },
      {
        "label": "Meat Pie 800 Snacks const products =",
        "x": 15.15,
        "y": 53.46,
        "w": 82.88,
        "h": 2.12,
        "mono": false
      },
      {
        "label": "Chapman 1200 Drinks { id: 1, ... }, ... ]",
        "x": 15.15,
        "y": 57.22,
        "w": 81.36,
        "h": 2.12,
        "mono": false
      },
      {
        "label": "LOOPS - PICK THE RIGHT ONE FOR THE JOB",
        "x": 33.32,
        "y": 64.09,
        "w": 33.38,
        "h": 2.48,
        "mono": false
      },
      {
        "label": "for (let i = 0; ...) for (const item of list) list.forEach(fn)",
        "x": 7.15,
        "y": 70.21,
        "w": 72.99,
        "h": 2.24,
        "mono": true
      },
      {
        "label": "When you need the index number, Best for running through every Short style when each item runs",
        "x": 7.15,
        "y": 73.31,
        "w": 76.73,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "to skip items or run a set count item once - clean and simple one function - great for printing",
        "x": 7.15,
        "y": 76.15,
        "w": 76.51,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "NIGERIAN EXAMPLE",
        "x": 7.15,
        "y": 82.42,
        "w": 13.75,
        "h": 2.36,
        "mono": false
      },
      {
        "label": "const market = [{ name: \"Rice 5kg\", price: 7500 }, { name: \"Oil 1L\", price: 2200 }];",
        "x": 7.15,
        "y": 85.43,
        "w": 41.02,
        "h": 2.12,
        "mono": false
      },
      {
        "label": "Loop with forEach, print each line with a reusable format function - and watch for off-by-one",
        "x": 7.15,
        "y": 88.27,
        "w": 45.62,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "errors (i <= list.length) and endless loops (forgotten i++).",
        "x": 7.15,
        "y": 90.84,
        "w": 29.58,
        "h": 2.12,
        "mono": false
      }
    ],
    "width": 984,
    "height": 669
  },
  "module": "Week 1 — Module 1: JavaScript Foundations",
  "duration_minutes": 105,
  "difficulty": "Beginner (a step up from Sessions 1–2 — this is the session where data structures appear)",
  "prerequisite_knowledge": "Session 1 — variables ( let / const ), data types, console.log , template literals, arithmetic, linking a script file. Session 2 — functions (definition, parameters, return ) and if/else decisions. A learner who cannot write a function with a parameter and a return should be paired with a stronger learner for today and given the remedial drill in Section O. Connection to previous session In Session 2 a function could handle one value well (one score, one fare, one bill). But a shop does not have one product — it has many. Today we learn how to store many values in one place (arrays and objects) and how to walk through them one at a time with a loop, reusing the functions from Session 2 to format each one. This is the exact data shape used for the Adaeze Fashion capstone shop.",
  "connection_to_previous": null
}
---
# Arrays, Objects and Loops

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 1 — Module 1: JavaScript Foundations

**Recommended duration:** 105 minutes

**Difficulty:** Beginner (a step up from Sessions 1–2 — this is the session where data structures appear)

**Prerequisite knowledge:** Session 1 — variables ( let / const ), data types, console.log , template literals, arithmetic, linking a script file. Session 2 — functions (definition, parameters, return ) and if/else decisions. A learner who cannot write a function with a parameter and a return should be paired with a stronger learner for today and given the remedial drill in Section O. Connection to previous session In Session 2 a function could handle one value well (one score, one fare, one bill). But a shop does not have one product — it has many. Today we learn how to store many values in one place (arrays and objects) and how to walk through them one at a time with a loop, reusing the functions from Session 2 to format each one. This is the exact data shape used for the Adaeze Fashion capstone shop.

**Preparation before class:** Academy PCs on and logged in; Chrome and VS Code open; learner practice folders from Sessions 1–2 available; projector showing the instructor's VS Code and the Chrome Console (Console is essential today). Print Worksheet 3.1 and 3.2. Have a whiteboard or flipchart for drawing "boxes in a row" (array) and "labelled drawers" (object).

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Create an array using square brackets [ ] and explain what an array is using a real-world comparison.
2. Read and update array items using index numbers, and explain clearly why indexing starts at 0 (not 1).
3. Use .length to find how many items an array holds, and use push() and pop() to add and remove items from the end.
4. Create an object using curly braces { } with key/value pairs, and read a value using both dot access ( product.price ) and
bracket access ( product["price"] ).
5. Update an object's value and access a nested object (an object inside an object).
6. Build an array of objects — for example a list of products { name, price, category } — which is the data shape used for the
capstone shop.
7. Write and choose between a classic for loop, a for...of loop, and forEach , and say when each is the best choice.
8. Iterate over an array of objects and print a formatted product catalogue to the Console, reusing a function (from Session
2) to format and print each product.
9. Diagnose common loop and indexing errors — off-by-one errors, a loop that never ends, and using = instead of <= .

## C. Required Materials
<!-- kind:materials -->
Hardware
One computer per learner (academy desktops). Pairing is acceptable: one learner types, the other predicts the console
output and reads errors aloud; swap halfway.
Instructor computer connected to a projector or large screen.
Software
Google Chrome (any recent version) — for the Console and the DevTools.
Visual Studio Code (VS Code).
Windows 10 or Windows 11.
No new software is needed; today is a pure JavaScript session.
Accounts
None required. All work is offline.
Sample files
The instructor prepares and shares a folder demo-week1-s3/ containing index.html and js/catalogue.js (full contents in
Section G).
Learners continue in their existing webdev-practice folder with a new file js/products.js .
Worksheets
Worksheet 3.1 — "Count the Boxes" (given arrays, learners write the index of each item and the .length ; 1 page).
Worksheet 3.2 — "Label the Drawers" (given objects, learners write how to read and update each value using dot and
bracket access).
Worksheet 3.3 — "Which Loop?" (three mini-tasks; learners tick the best loop to use and write one sentence why).
These live in the learner workbook (Part 3).
Tools
Chrome DevTools Console (built into Chrome — press F12 ). Learners may also type array/Object snippets directly into the
Console to experiment, as in Session 1.
Internet
Not required. If the academy has internet, the instructor may optionally show the MDN pages for Array and Object at the
very end, but do not depend on it.
Alternative resources for learners lacking facilities
Any laptop with Chrome and VS Code works fully offline. If a learner has only a phone, pair them with a desktop user for the
session; ask them to photograph the code and the console output, then practise typing the examples later in a phone
browser's code-editor site (for example a free online HTML/CSS/JS playground). No learner should be left without a role:
phone-only learners can be the "predictor" who guesses each console line before it runs.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector, open the demo-week1-s3/index.html page with the Chrome Console already open. Keep the
code hidden at first; show only the Console.
What the instructor says:
"Quick question. At Adaeze Fashion shop, suppose I sell hair cream, and I want to print the name and price for each
product. With what you learned last week, how would I do it?"
Let learners answer. They will say: make a variable for each product, then console.log it.
Then show the pain (type this live in the Console or in a scratch file):
```text
const product1 = "Hair Cream";
const price1 = 2500;
const product2 = "Shea Butter";
const price2 = 1800;
const product3 = "Coconut Oil";
const price3 = 3200;
```
```text
console.log(`${product1} - ₦${price1}`);
console.log(`${product2} - ₦${price2}`);
console.log(`${product3} - ₦${price3}`);
```
Say:
"That worked for three products. But Adaeze has two hundred products. Am I going to write two hundred variables and two
hundred console.log lines? That is madness. What if I could keep all the products in one list, and tell the computer: 'go
through the whole list and print each one'? That single container is called an array, each product is an object, and the
instruction 'go through each one' is a loop. Today, three products or three thousand — the code is the same length."
Expected learner response: Learners usually laugh at the "two hundred lines" idea and immediately see the problem. Some
may say "use a loop" or "put them in a list" — accept that and say, "Yes! That is exactly the word — a list. In JavaScript a list is
called an array."
Why this opener works: It creates a real, felt problem (repetition does not scale) before giving the tool (arrays + loops). The
learner now wants the array, instead of being told to memorise one.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Run this as a fast oral round-robin. Put the four questions on the projector.
Question 1: "Write a function greet(name) that returns the text Hello, <name>! ."
Expected answer:
```text
function greet(name) {
  return "Hello, " + name + "!";
}
```
Common gap: using console.log instead of return . Remind them: return sends the value back so we can use it again —
and we will reuse exactly this idea today to format each product.
Common gap: forgetting quotes. name is a parameter, not text.
Question 2: "What is the difference between let and const ?"
Expected answer: let can be reassigned; const cannot be reassigned. (Important today: we will use const for most of our
data containers.)
Common gap: learners think const means the contents can never change. We will gently correct this today: a const array
can still have items added to it — it is the label that cannot be repointed.
Question 3: "What does console.log(typeof "2500") print, and why does it matter?"
Expected answer: "string" — because it has quotes. It matters because "2500" + "1800" glues text ( "25001800" ) instead of
adding. Prices must be real numbers.
Common gap: guessing number . Re-run typeof live to prove it.
Question 4: "What does 2 + 3 * 4 print, and why?"
Expected answer: 14 , because multiplication happens before addition.
Common gap: 20 . Correct using order of operations.
Bridge to today (say this):
"You can store a value, make a decision, and package an action into a function. Today, we store many values at once, and
we let the computer repeat an action for each value automatically. Think of it this way: a function is one worker doing a
job. A loop is the supervisor telling that worker, 'do this job for every item on the list.'"
If more than a third of the class cannot answer Question 1, run the 5-minute pair drill in Section O (remedial) before continuing.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 Arrays — one box that holds a row of values
The idea. An array is an ordered list of values stored in a single variable.
Plain-English definition. An array is like a counter in a market stall. It has many slots in a row, and each slot holds one item.
You can point to the first slot, the second slot, and so on. Instead of naming every item separately ( item1 , item2 , item3 ), the
whole row lives under one name, and you reach the items by their position number.
Why arrays exist. Programs constantly deal with lists: a list of products, a list of students, a list of scores, a list of WhatsApp
contacts. Repeating a variable for every item does not scale (the opening activity proved that). An array lets you keep all of them
together, count them with .length , and process them with a loop.
How to create an array — using square brackets [ ] :
```text
const products = ["Hair Cream", "Shea Butter", "Coconut Oil"];
const prices = [2500, 1800, 3200];
const isAvailable = [true, true, false];
```
Line by line:
const products = — declare a constant variable named products .
- ...] — the square brackets say "this is an array".
"Hair Cream", "Shea Butter", "Coconut Oil" — the items, separated by commas.
; — end of the instruction.
An array can hold strings, numbers, booleans — even other arrays or objects (we will do that soon). In this course we mostly
store one kind of thing per array.
Real-life comparison. An array is a numbered row of lockers. Each locker has a number. The lockers sit in a fixed order. Locker
number 0 is the first one.
F.2 Reading array items — indexing, and why it starts at 0
The idea. Each item in an array has a position number called its index. You read an item with its index in square brackets:
products[0] .
```text
const products = ["Hair Cream", "Shea Butter", "Coconut Oil"];
```
```text
console.log(products[0]);   // "Hair Cream"
console.log(products[1]);   // "Shea Butter"
console.log(products[2]);   // "Coconut Oil"
console.log(products[3]);   // undefined  ← there is no fourth item
```
Why did the first item use [0] and not [1] ? This confuses almost every beginner, so let us be very clear.
In programming, the index is not "how many items come before this one plus one" — it is how many steps from the start.
The first item is at the start, so you take zero steps to reach it. The second item is one step away, so its index is 1 . The third
is two steps away: 2 .
Another way to see it: the index counts the gap before the item, like house numbers on a street corner where the first house is
gate 0. Or think of a queue at a bank: the very first person is "0 people in front of you." That is why we say the index is a zero-
based count.
A concrete table for our products array:
Item Index
"Hair Cream" 0
"Shea Butter" 1
"Coconut Oil" 2
The undefined trap. If you ask for products[3] , the answer is undefined because there is no item at that position. There is no
error — just the word undefined . This is a very common source of confusion, and it is why counting correctly matters. A good
safety habit: the last valid index is always array.length - 1 .
Say to the class:
"If you remember one sentence from today: the first item is at 0 , and the last item is at length - 1 . Write it in your
workbook."
F.3 .length — how many items are there?
The idea. Every array knows how many items it holds. That number is stored in a property called .length .
```text
const products = ["Hair Cream", "Shea Butter", "Coconut Oil"];
```
```text
console.log(products.length);   // 3
```
Why it matters. A loop (coming in Section F.7) needs to know when to stop. Instead of hard-coding "3" — which breaks the
moment Adaeze adds a fourth product — we let the computer check .length itself. This is a habit professional developers
keep: never hard-code the count of a list; ask the list.
Common misconception. New learners sometimes write products.length() with brackets, thinking it is a function. It is a
property, not a function — no brackets. products.length is correct.
F.4 Adding and removing items — push() and pop()
The idea. An array can grow or shrink. Two everyday tools work at the end of the array:
push(item) — adds an item to the end.
pop() — removes the last item and hands it back to you.
```text
const products = ["Hair Cream", "Shea Butter"];
```
```text
products.push("Coconut Oil");
console.log(products);          // ["Hair Cream", "Shea Butter", "Coconut Oil"]
```
```text
const removed = products.pop();
console.log(removed);           // "Coconut Oil"  (pop returns what it removed)
console.log(products);          // ["Hair Cream", "Shea Butter"]
```
Important surprise for today: products was declared with const , yet push() changed it! Is that not "changing a constant"?
No. The rule is subtle and worth explaining carefully:
const locks the name to one array. It says: " products must always point to this same list." But the contents of that list can
still change — you can add or remove items freely. You simply cannot do products = ["something else"] (that would repoint
the name, and JavaScript would throw Assignment to constant variable ).
Analogy. A const array is like a specific basket you own. You can keep putting things into the basket and taking them out. You
just cannot swap your basket for a different basket. The basket stays the same basket; its contents can change.
Why push matters for the capstone: When a shopper clicks "Add to Cart", the cart array grows with push() . When they
remove an item, we use pop() (or a more specific removal we will learn later). You are already using patterns the capstone
needs.
F.5 Objects — one box with labelled drawers
The idea. An object stores related information as key/value pairs. Each value has a name (the key) so you can find it later.
Plain-English definition. If an array is a numbered row of lockers, an object is a single chest of drawers where every drawer
has a written label: one drawer labelled "name", another labelled "price", another labelled "category". You do not reach a
drawer by its position number — you reach it by its label.
Why objects exist. A product is not just a name. It has a name, a price, a category, maybe how many are in stock. These belong
together. An array holds a list of things; an object describes one thing in detail. Used together they are unstoppable: an array of
objects is a list of detailed things.
How to create an object — using curly braces { } :
```text
const product = {
  name: "Hair Cream",
  price: 2500,
  category: "Skincare",
```
```text
  inStock: true
};
```
Line by line:
const product = — declare a constant named product .
{ ... } — the curly braces say "this is an object".
name: "Hair Cream" — a key/value pair. name is the key (the label), "Hair Cream" is the value.
Note the colon : between key and value, and the comma , after each pair (but not after the last one).
Keys are usually written without quotes (though "name" with quotes is also allowed).
F.6 Reading and updating object values — dot and bracket access
The idea. There are two ways to read a value from an object.
Way 1 — Dot access (the common way):
```text
console.log(product.name);      // "Hair Cream"
console.log(product.price);     // 2500
```
product.name reads: "from the object called product , give me the value stored under the key name ."
Way 2 — Bracket access (the flexible way):
```text
console.log(product["name"]);   // "Hair Cream"
console.log(product["price"]);  // 2500
```
Notice the key is written as a string in quotes inside the brackets. product.name and product["name"] give the same answer.
When must you use brackets? When the key is held in a variable, or when the key has a space or special character. For example:
```text
const field = "price";
console.log(product[field]);          // 2500  (looks up the key stored in 'field')
```
```text
const shopItem = { "unit price": 2500 };  // key with a space
console.log(shopItem["unit price"]);      // 2500  (dot access cannot do this)
```
For everyday use, most developers prefer dot access because it is shorter and clearer. Learn both; the capstone and later fetch
lessons rely on brackets.
Updating a value. Assign a new value to the key, exactly like updating a variable:
```text
product.price = 2700;            // price is now 2700
console.log(product.price);      // 2700
```
```text
product["category"] = "Haircare";  // bracket update also works
console.log(product.category);     // "Haircare"
```
Adding a new key works the same way — assign to a key that does not exist yet, and it is created:
```text
product.discount = 10;           // adds a new key 'discount'
console.log(product);            // { name:"Hair Cream", price:2700, category:"Haircare", inStock:true, discount:10 }
```
Common misconception. Learners try product[price] (no quotes). JavaScript then looks for a variable named price , which
does not exist — it throws ReferenceError: price is not defined (or reads undefined ). Dot access uses the bare word; bracket
access needs a string in quotes, unless you deliberately want the variable lookup described above.
F.7 Nested objects — an object inside an object
The idea. A value inside an object can itself be an object. This is called a nested object, and it is how real data is usually shaped.
```text
const customer = {
  name: "Adaeze",
  phone: "0803 000 0000",
  address: {
    street: "24 Ebony Road",
    city: "Port Harcourt",
    state: "Rivers"
  }
};
```
To reach a nested value, chain the keys with dots:
```text
console.log(customer.name);            // "Adaeze"
console.log(customer.address.city);    // "Port Harcourt"
console.log(customer.address.state);   // "Rivers"
```
Real-life comparison. It is a big chest of drawers where one drawer contains a smaller chest of drawers. You open the big
drawer labelled "address", then inside it open the small drawer labelled "city".
Why this matters in real work: When we later fetch product data from the internet (Session 7), it arrives as a deeply nested
object. If you can follow the chain of dots, you can read any real data. The skill starts here.
F.8 Array of objects — the shape of real data
The idea. Put several objects inside one array. Now you have a list of detailed things — the single most common data structure
in front-end development.
```text
const products = [
  { name: "Hair Cream",  price: 2500, category: "Skincare" },
  { name: "Shea Butter", price: 1800, category: "Skincare" },
  { name: "Coconut Oil", price: 3200, category: "Haircare" },
  { name: "Herbal Soap", price: 1200, category: "Bath" }
];
```
Reading it:
products is an array (square brackets).
Each item inside is an object (curly braces).
products.length is 4 .
products[0] is the first object: { name: "Hair Cream", price: 2500, category: "Skincare" } .
products[0].name is "Hair Cream" — first pick the object by index, then pick the value by key. Read it left to right:
"products, item zero, the name."
```text
console.log(products[0].name);       // "Hair Cream"
console.log(products[2].price);      // 3200
console.log(products[3].category);   // "Bath"
```
Say to the class:
"This is the shape of the capstone. When you build the Adaeze shop, your products will look exactly like this — an array of
objects, each with a name, a price and a category. Learn this shape and the capstone becomes easy."
Common misconception. Learners write products.name (forgetting the index). An array does not have a name key — only the
objects inside it do. You must first pick the item: products[0].name .
F.9 Loops — doing a job for every item
The idea. A loop repeats a block of code. For arrays, the usual job is: "do this once for each item in the array."
There are three loops we use in this course. We will learn all three and, crucially, learn when to use each.
F.9.1 The classic for loop
```text
const products = ["Hair Cream", "Shea Butter", "Coconut Oil"];
```
```text
for (let i = 0; i < products.length; i++) {
  console.log(products[i]);
}
```
Output:
```text
Hair Cream
Shea Butter
Coconut Oil
```
Line by line — this is the most important line of the session, so slow down:
let i = 0 — start: create a counter i and set it to 0 . We start at 0 because arrays start at index 0 .
i < products.length — the condition to continue: keep looping as long as i is less than the array's length. When i
reaches 3 and length is 3 , 3 < 3 is false, so the loop stops.
i++ — the step: after each pass, add 1 to i ( i++ is shorthand for i = i + 1 ).
{ ... } — the body: the code that repeats. Here it prints products[i] , the item at the current position.
Trace it on the whiteboard with the class:
Pass
```text
i
```
i < 3 ? Prints
1 0 true "Hair Cream"
2 1 true "Shea Butter"
3 2 true "Coconut Oil"
4 3 false (loop ends)
Notice the loop ran three times but i reached 3 before stopping — and we never printed products[3] . That is correct and it
is exactly why the condition is i < length (strictly less than), not i <= length .
The off-by-one trap (the classic beginner bug):
If you write i <= products.length , the last pass uses i = 3 , and products[3] is undefined . You get a stray undefined printed
at the end. This is called an off-by-one error.
Rule: for arrays, the condition is i < array.length (not <= ).
Real-life comparison. A for loop is a teacher calling the register by seat number: "Seat 0, stand up. Seat 1, stand up. Seat
2..." The teacher knows to stop when there are no more seats ( i < length ).
F.9.2 The for...of loop
When you only need the items and do not care about the index, for...of is cleaner:
```text
for (const item of products) {
  console.log(item);
}
```
Output — exactly the same:
```text
Hair Cream
Shea Butter
Coconut Oil
```
const item of products reads naturally: "for each item in products ".
On each pass, item holds the next product. No counter, no length, no i++ — so no off-by-one error is even possible.
Use for...of when you want each value, not its position.
Prefer for...of for reading — it is shorter and safer. Use the classic for loop when you specifically need the index number
(for example, "item 1 of 3").
F.9.3 forEach — a loop built into the array
Arrays have a built-in method called forEach that runs a function once for each item. This connects directly to your Session 2
functions:
```text
products.forEach(function (item) {
  console.log(item);
});
```
Output — the same three lines. Explanation:
products.forEach(...) means "for each item in products, run this function".
The function we pass in receives one argument — here named item — which is the current product.
JavaScript calls that little function automatically for every item, behind the scenes.
You will often see the same thing written more briefly with an arrow function (a shorter function style introduced in modern
JavaScript):
```text
products.forEach((item) => {
  console.log(item);
});
```
(item) => { ... } is a compact way of writing function (item) { ... } . They mean the same thing for our purposes. Arrow
functions are extremely common in real code and in the capstone, so see them today and get comfortable.
forEach gives you the index too, if you want it — the function can take a second parameter for the position:
```text
products.forEach((item, index) => {
  console.log(`${index + 1}. ${item}`);
});
```
Output:
```text
1. Hair Cream
2. Shea Butter
3. Coconut Oil
```
We added 1 to the index for display, because a human counting a list says "1, 2, 3" — the machine still uses 0, 1, 2 internally.
This tiny example shows how the "starts at 0" idea meets the "people count from 1" reality.
F.9.4 Which loop should I use?
Loop Best when Watch out for
classic for You need the index number (position), or you need full
control of start/stop/step.
Off-by-one: use i < arr.length .
```text
for...of
```
You just want each item and no index. It gives values, not indexes.
```text
forEach
```
You want to run a function for each item; very readable;
common in modern code.
You cannot use break to stop early; it always
runs the whole list.
Say to the class: "Any of the three can print a product list. Choose by intent: need positions → classic for ; just the items →
for...of ; pass a function to each item → forEach . Professionals pick the clearest one for the job."
F.10 Putting it together with Session 2 — a function that formats one product
Here is where today meets last session. Instead of writing the print inside the loop, we write one function that formats a single
product, then call it from the loop. This is exactly the DRY principle from Session 2.
```text
function formatProduct(product) {
  return `${product.name} — ₦${product.price} [${product.category}]`;
}
```
```text
const products = [
  { name: "Hair Cream",  price: 2500, category: "Skincare" },
  { name: "Shea Butter", price: 1800, category: "Skincare" },
  { name: "Coconut Oil", price: 3200, category: "Haircare" },
  { name: "Herbal Soap", price: 1200, category: "Bath" }
];
```
```text
console.log("===== ADAEZE FASHION — PRODUCT CATALOGUE =====");
```
```text
for (const product of products) {
  console.log(formatProduct(product));
}
```
Expected Console output:
```text
===== ADAEZE FASHION — PRODUCT CATALOGUE =====
Hair Cream — ₦2500 [Skincare]
Shea Butter — ₦1800 [Skincare]
Coconut Oil — ₦3200 [Haircare]
Herbal Soap — ₦1200 [Bath]
```
Why this is the professional pattern:
formatProduct describes how one product looks. If Adaeze wants to add the stock status tomorrow, you edit one function,
not every line.
The loop describes how to go through the list. The two jobs are separated.
Add a fifth product to the array and the output grows automatically — no code change. That is the whole point of Section
D's promise.
An if inside the loop (combining Session 2 again). Real catalogues flag special items:
```text
for (const product of products) {
  if (product.price > 3000) {
```
console.log(`⭐ PREMIUM: ${formatProduct(product)}`);
```text
  } else {
    console.log(formatProduct(product));
  }
}
```
Say to the class: "Inside a loop, you can do anything you already know — call functions, make decisions. A loop is just a 'repeat'
wrapper around skills you already have."
F.11 Summary of the session
An array [ ... ] is an ordered list; read items by index, which starts at 0; the last index is length - 1 .
.length tells you how many items; push() adds to the end; pop() removes the last.
An object { key: value } describes one thing; read values with dot ( obj.key ) or bracket ( obj["key"] ) access; update by
assigning; nest objects for detailed data.
An array of objects [{...}, {...}] is the shape of real data (and the capstone shop).
Loops repeat work: the classic for (need the index), for...of (just the items), and forEach (pass a function).
Reuse a function to format each item — Session 2 and Session 3 working together.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 What the instructor prepares
A folder demo-week1-s3/ on the Desktop containing:
index.html (links js/catalogue.js at the bottom of the body)
a subfolder js/ containing catalogue.js
Both files open in VS Code; Chrome open to the page; DevTools Console open on the projector.
Whiteboard with three things pre-drawn lightly: (1) a row of three boxes numbered 0, 1, 2; (2) a chest of drawers labelled
name/price/category; (3) a loop arrow circling the boxes.
G.2 Demonstration 1 — arrays, indexing and .length (5 minutes)
Say: "Watch how one variable can hold a whole row of items."
Type into the Console directly (so learners see instant feedback), then later into the file:
```text
const products = ["Hair Cream", "Shea Butter", "Coconut Oil"];
console.log(products[0]);
console.log(products[1]);
console.log(products[2]);
console.log(products.length);
```
Do on the projector:
1. Press Enter after each line and point at each result.
2. Ask before pressing Enter on the last line: "What will products[0] print — 'Hair Cream' or 'Shea Butter'? Remember, we
start at 0." (Hair Cream.)
3. Then deliberately type products[3] and press Enter → prints undefined .
Say: "There is no item at position 3. Four items would be 0,1,2,3. The last valid index is always length - 1 — here, 3 - 1
= 2 ."
Deliberately break it: type products.length() (with brackets) → red error TypeError: products.length is not a function .
Say: " .length is a property — a plain fact the array knows about itself. No brackets. I write products.length ."
Questions to ask:
"What is the index of the middle item?" (1.)
"If I push a fourth item, what will .length become?" (4.)
G.3 Demonstration 2 — objects and array of objects (5 minutes)
Say: "Now let us describe one product properly, then a whole list of them."
Type into catalogue.js :
```text
const oneProduct = {
  name: "Hair Cream",
  price: 2500,
  category: "Skincare"
};
```
```text
console.log(oneProduct.name);        // Hair Cream
console.log(oneProduct["price"]);    // 2500
```
```text
oneProduct.price = 2700;             // update
console.log(oneProduct.price);       // 2700
```
Walk through each line on the projector:
1. { } with keys and values, colons and commas.
2. Dot access for name ; bracket access with a quoted string for price — both give the same kind of result.
3. Updating price by assignment, then reading it again shows 2700 .
Then build the array of objects:
```text
const products = [
  { name: "Hair Cream",  price: 2700, category: "Skincare" },
```
```text
  { name: "Shea Butter", price: 1800, category: "Skincare" },
  { name: "Coconut Oil", price: 3200, category: "Haircare" }
];
```
```text
console.log(products[0].name);   // Hair Cream  ← index first, then key
console.log(products[2].price);  // 3200
```
Ask: "In products[0].name , which do we do first — pick the object, or pick the key?" (Pick the object by index first, then the key.)
Error to inject: change products[0].name to products.name → prints undefined .
Say: " products is the array; it has no name key. Only the objects inside have names. I must first pick an item with an index."
G.4 Demonstration 3 — the loop and the reused function (5 minutes)
Say: "Now the magic — one short block that handles three products, or three thousand."
Type:
```text
function formatProduct(product) {
  return `${product.name} — ₦${product.price} [${product.category}]`;
}
```
```text
console.log("===== ADAEZE FASHION — PRODUCT CATALOGUE =====");
```
```text
for (const product of products) {
  console.log(formatProduct(product));
}
```
1. Pause and predict: "Before I run it — how many lines will print below the heading?" (Three — one per product.)
2. Run it; confirm the three catalogue lines.
3. Now push a fourth product and run the same loop again without touching the loop:
```text
products.push({ name: "Herbal Soap", price: 1200, category: "Bath" });
for (const product of products) {
  console.log(formatProduct(product));
}
```
Say: "I changed only the data. The loop stayed exactly the same. This is why loops matter."
Now show the classic for loop side by side:
```text
for (let i = 0; i < products.length; i++) {
  console.log(`${i + 1}. ${formatProduct(products[i])}`);
}
```
Say: "Same result, but now you also get a numbered position in front."
Error to inject (the off-by-one): change i < products.length to i <= products.length , save, view Console.
Expected: an extra final line 5. undefined... — actually undefined values appear because products[4] does not exist.
Say: "One extra = and we get a ghost line. Always use i < array.length , never <= , when walking an array."

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: With the instructor guiding step by step, learners build a small product catalogue using an array of objects, a
formatting function (from Session 2), and a loop.
Starting materials: In webdev-practice , a new page catalogue.html linking js/catalogue.js at the bottom of the body. The
instructor shows the HTML shell; learners type it.
Procedure (instructor calls each numbered step; instructor walks the room as learners follow):
1. Create catalogue.html :
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Adaeze Fashion — Catalogue</title>
</head>
<body>
  <h1>Adaeze Fashion Catalogue</h1>
  <p>Press F12 and open the Console to see the products.</p>
  <script src="js/catalogue.js"></script>
</body>
</html>
```
2. Create js/catalogue.js . Start with the products array:
```text
const products = [
  { name: "Hair Cream",  price: 2500, category: "Skincare" },
  { name: "Shea Butter", price: 1800, category: "Skincare" },
  { name: "Coconut Oil", price: 3200, category: "Haircare" },
  { name: "Herbal Soap", price: 1200, category: "Bath" },
  { name: "Black Soap",  price: 900,  category: "Bath" }
];
```
3. Add the formatting function from Session 2:
```text
function formatProduct(product) {
  return `${product.name} — ₦${product.price} [${product.category}]`;
}
```
4. Add a heading line and a loop:
```text
console.log("===== ADAEZE FASHION — PRODUCT CATALOGUE =====");
```
```text
for (const product of products) {
  console.log(formatProduct(product));
}
```
5. Save both files ( Ctrl + S ). Open catalogue.html in Chrome and press F12 , then the Console tab.
Pause-and-predict points:
After step 2: "How many products are in the array? What will products.length print?" (5.)
After step 4, before running: "How many lines will print under the heading, and what is the first line?" (Five lines; first is
Hair Cream — ₦2500 [Skincare] .)
Midway: "What is the index of 'Herbal Soap'?" (3.)
Expected result in the Console:
```text
===== ADAEZE FASHION — PRODUCT CATALOGUE =====
Hair Cream — ₦2500 [Skincare]
Shea Butter — ₦1800 [Skincare]
Coconut Oil — ₦3200 [Haircare]
Herbal Soap — ₦1200 [Bath]
Black Soap — ₦900 [Bath]
```
6. Extension (if the class is fast): add a decision inside the loop so that products over ₦3000 are flagged:
```text
for (const product of products) {
  if (product.price > 3000) {
```
console.log(`⭐ PREMIUM — ${formatProduct(product)}`);
```text
  } else {
    console.log(formatProduct(product));
  }
}
```
Expected: Coconut Oil's line starts with ⭐ PREMIUM — .
Troubleshooting while walking the room:
undefined printed for a product's name → the object is missing a key, or the key is misspelled ( nane vs name ). Check the
object.
Only one line prints → braces { } of the loop are missing, so the loop body is just one line. Re-check the braces.
Nothing prints → the script is not saved or not linked (Session 1, K.1), or the loop was never written.
products is not defined → the file was saved in the wrong folder, or the <script src> path is wrong.
Naira shows as ? → file encoding. Save as UTF-8 with <meta charset="UTF-8"> .
Completion checklist (learner ticks each):
catalogue.html links js/catalogue.js at the bottom of the body
products is an array of at least five objects
Each object has name , price , category
formatProduct(product) returns a formatted string (uses return )
A loop prints every product (one line each)
All prices are numbers, not strings
No red errors in the Console

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Build a class register and print it on your own — a new task, not a copy of the catalogue.
Scenario: You are the secretary of your church's youth fellowship in Port Harcourt. You keep a register of members. Each
member has a name, an age, and whether they have paid their dues this month ( true or false ). You want a clean printed list,
and a flag next to anyone who has not paid.
Starting information: Create the data yourself, using these members:
Chidi, 19, paid
Ngozi, 22, not paid
Emeka, 25, paid
Amaka, 18, not paid
Tunde, 21, paid
Requirements:
1. Create a new page register.html and a js/register.js file linked at the bottom of the body.
2. Store the members as an array of objects. Each object must have the keys name , age , and paid (a boolean).
3. Write a function formatMember(member) that returns a string, for example: Chidi (19) — Dues paid or Ngozi (22) — NOT PAID .
4. Use a loop to go through the array and console.log the formatted line for each member.
5. Print a heading line ===== YOUTH FELLOWSHIP REGISTER ===== before the list, and a total line after it: Total members: 5 .
Constraints:
Use bracket access at least once somewhere in your code (to prove you know both access styles).
Use paid inside the formatMember function with an if/else (Session 2 skill).
Do not copy the instructor's catalogue text word-for-word — design your own output wording.
All ages as numbers.
Time allowance: 15 minutes.
Success criteria:
Five member lines print, one per member.
Ngozi and Amaka’s lines say "NOT PAID"; the other three say "Dues paid".
The heading and Total members: 5 both appear.
No red errors.
Hints available if stuck:
Hint 1: The array looks like [{ name: "Chidi", age: 19, paid: true }, ...] .
Hint 2: Inside formatMember , use if (member.paid) { return ...; } else { return ...; } .
Hint 3: A for...of loop is the simplest: for (const member of members) { console.log(formatMember(member)); } .
Hint 4: members.length gives the total for the last line.
Instructor answer key (do not show learners):
```text
const members = [
  { name: "Chidi", age: 19, paid: true },
  { name: "Ngozi", age: 22, paid: false },
  { name: "Emeka", age: 25, paid: true },
  { name: "Amaka", age: 18, paid: false },
  { name: "Tunde", age: 21, paid: true }
];
```
```text
function formatMember(member) {
  if (member["paid"]) {                       // bracket access demonstrated
    return `${member.name} (${member.age}) — Dues paid`;
  } else {
    return `${member.name} (${member.age}) — NOT PAID`;
  }
}
```
```text
console.log("===== YOUTH FELLOWSHIP REGISTER =====");
```
```text
for (const member of members) {
  console.log(formatMember(member));
}
```
```text
console.log(`Total members: ${members.length}`);
```
Expected Console output:
```text
===== YOUTH FELLOWSHIP REGISTER =====
Chidi (19) — Dues paid
Ngozi (22) — NOT PAID
Emeka (25) — Dues paid
Amaka (18) — NOT PAID
Tunde (21) — Dues paid
Total members: 5
```
Marking guidance (out of 10):
Array of objects, correct keys (2)
formatMember returns a string (not logs) (2)
if/else on paid produces correct wording (2)
Loop prints all five, one per line (2)
Heading and total line correct (1)
Bracket access used; no console errors (1)

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Grace runs a fruit-and-vegetable stall at Mile 3 Market in Port Harcourt. Every morning she writes her prices on a card
so customers can see them, and every evening she rubs them out and writes new ones. When the market price of tomatoes
jumps, she often forgets to update the card, or updates it late, and customers complain that the price on the card is not the
price she charges.
Relevant facts.
Grace sells about 12 items each day — for example tomatoes, pepper, onions, okra, plantain.
The prices change almost daily with the market.
She already has a small webpage for the stall (from the Web Design course).
She cannot retype the whole card every time one price changes.
Decision point. How can Grace keep a single "source of truth" for her prices and have the page list them automatically?
Possible approaches.
1. Keep writing the card by hand each day.
2. Store her items in a JavaScript array of objects and use a loop to print the price list, so she updates a price in exactly one
place and the whole list refreshes.
3. Ask a developer to build a whole online shop with a database.
Recommended solution (for this stage). Approach 2. Grace keeps her stock in one array; each item is an object { item, price,
unit } ; a loop prints the whole list. To change the tomato price, she edits one number. This is exactly today's skill.
Example solution:
```text
const marketList = [
  { item: "Tomatoes", price: 1200, unit: "basket" },
  { item: "Pepper",   price: 800,  unit: "paint bucket" },
  { item: "Onions",   price: 1500, unit: "bag" },
  { item: "Okra",     price: 300,  unit: "small bowl" },
  { item: "Plantain", price: 1000, unit: "bunch" }
];
```
```text
function formatItem(entry) {
  return `${entry.item}: ₦${entry.price} per ${entry.unit}`;
}
```
```text
console.log("===== GRACE FRESH MARKET — TODAY'S PRICES =====");
```
```text
for (const entry of marketList) {
  console.log(formatItem(entry));
}
```
```text
console.log(`Items listed: ${marketList.length}`);
```
Expected output:
```text
===== GRACE FRESH MARKET — TODAY'S PRICES =====
Tomatoes: ₦1200 per basket
Pepper: ₦800 per paint bucket
Onions: ₦1500 per bag
Okra: ₦300 per small bowl
Plantain: ₦1000 per bunch
Items listed: 5
```
Trade-offs.
Approach 1 is free and familiar, but it relies on Grace's memory and is error-prone when prices change fast — which is
exactly when mistakes cost her customers.
Approach 2 takes about 30 minutes once, then makes daily updates a 5-second edit to a single number. It scales: adding
okra to the list is one extra object.
Approach 3 is a real business project (database, hosting, payments) and is far beyond a one-person stall right now. It may
make sense later if Grace starts delivering online.
Professional connection. Developers constantly build "data-driven lists": product pages, price checkers, contact lists, booking
schedules. The pattern is always the same — store the data as an array of objects, format each item with a function, and render
them with a loop. Knowing this pattern is the core of front-end work, and it is exactly what the capstone shop needs.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
Use this table as the live troubleshooting guide. When a learner hits an issue, ask them to find the matching row and check
before guessing a fix.
K.1 Off-by-one — a stray undefined at the end
Symptoms: A loop prints all items, then one extra undefined line. Likely cause: The loop condition uses i <= products.length
instead of i < products.length ; the final pass reads an index that does not exist. How to investigate: Look at the for line. If it
says <= , that is the likely cause. Confirm by printing i inside the loop and watching it reach 3 when the length is 3 .
Corrective steps: Change <= to < . How to confirm resolved: The trailing undefined disappears. How to prevent
recurrence: Memorise the rule: for arrays, i < array.length ; the last index is length - 1 .
K.2 Asking for an index that does not exist
Symptoms: A value prints as undefined with no error. Likely cause: The index is out of range — e.g., products[5] when the
array has five items (valid indexes 0–4). This is a likely cause; confirm by checking .length . How to investigate: Run
console.log(products.length) and compare with the index you used. Corrective steps: Use a valid index, or use a loop so you
never hard-code indexes. How to prevent: When in doubt, loop instead of indexing by hand.
K.3 Reading an object key that does not exist / is misspelled
Symptoms: product.nmae (typo) prints undefined ; the whole name is missing from the output. Likely cause: A spelling mistake
in the key, or the key is not quoted correctly in bracket access. How to investigate: console.log(Object.keys(product)); prints all
the real keys — compare them with what you typed. Corrective steps: Fix the spelling; remember object["key"] needs quotes
around the key. How to prevent: Be consistent; use dot access for known keys and check Object.keys() when unsure.
K.4 The loop prints only one line
Symptoms: You have five products but only the first (or last) prints. Likely cause: Missing braces { } around the loop body, so
only the single line directly under the loop repeats — or the print is outside the loop. How to investigate: Check indentation
and braces. Everything that should repeat must be inside { ... } . Corrective steps: Wrap the repeating line(s) in braces
directly after the for (...) . How to prevent: Always use braces, even for a one-line loop body.
K.5 A number stored as a string ruins the price
Symptoms: A "total" glues digits together ( "2500" + "1800" → "25001800" ). Likely cause: A price in the object was written with
quotes: price: "2500" . How to investigate: console.log(typeof product.price) ; if it says "string" , that is confirmed. Corrective
steps: Remove the quotes so the price is a real number. How to prevent: Prices, ages and quantities are numbers — never
quoted.
K.6 The loop never ends (the page freezes)
Symptoms: The browser tab hangs; the Console floods with repeated lines. Likely cause: The counter is never updated or the
condition is always true — e.g., you wrote i + 1 in the step instead of i++ , or you forgot the step entirely, or the condition is
i >= 0 with a decreasing counter. How to investigate: Look at the third part of the for (...) — is i actually changing and
moving toward the stop condition? Corrective steps: Use i++ as the step; make sure the condition eventually becomes false.
(If the tab already hung, close the tab.) How to prevent: Read the for header aloud: start, stop, step — all three must be
present and correct.
K.7 products.forEach is not a function
Symptoms: Red TypeError mentioning forEach . Likely cause: products is not an array — perhaps it is an object, undefined , or
you misspelled the variable name. How to investigate: console.log(typeof products, products); and check it is an array.
Corrective steps: Correct the variable name, or make sure the data is genuinely an array. How to prevent: Name arrays with
plural nouns ( products , members ) as a reminder.
Distinguish likely vs confirmed. In every case, the listed cause is only likely until you check it — see the exact red error text, run
typeof , or print Object.keys() . Teach learners to confirm the cause before fixing, exactly as in Sessions 1 and 2.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "Build a Store Price List"
Purpose: Practise arrays, objects, array-of-objects, loops and functions together, in a context the learner owns — the shape they
will reuse in the capstone.
Realistic scenario: You own a small provisions store in your area. You want a page that prints today's stock and price list
automatically, so you only ever update the data, never the layout.
Detailed instructions:
1. Create a folder assignment3 with index.html and js/stock.js .
2. In stock.js , create an array called stock holding at least six product objects. Each object must have the keys:
name (string)
price (number, in naira)
quantity (number, how many you have)
category (string, e.g., "Drinks", "Food", "Toiletries")
3. Write a function formatStock(item) that returns a line of text, for example: Milo Tin — ₦4500 x 12 [Food]
4. Print a heading ===== <YOUR STORE NAME> — STOCK LIST ===== .
5. Loop through stock and print every item using formatStock .
6. After the list, print a summary line with the total number of different items (use stock.length ).
7. Add at least one product whose quantity is 0 , and inside the loop flag it: if quantity is 0, print — OUT OF STOCK at the end
of that line (use if/else , Session 2).
Constraints:
Prices and quantities must be numbers, not strings.
Use a function with a return to format each line (do not format inside the loop).
Do not copy the register example; design your own wording.
Use at least one const for the array.
Required deliverables:
```text
assignment3/index.html
```
```text
assignment3/js/stock.js
```
The Console output pasted (or photographed) into your workbook.
Submission format: Files in the class folder; Console output pasted/photographed in the workbook.
Deadline: Before Session 4.
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
File structure & linking 2 index.html links js/stock.js at bottom of body; no errors
Array of ≥6 objects, correct keys 4 Every object has name, price, quantity, category
Correct types 2 Prices/quantities are numbers; names/categories are strings
formatStock returns (not logs) 3 Function returns a formatted string
Loop prints all items 4 One line per item, no off-by-one errors
Summary total via .length 2 Correct count printed
Out-of-stock flag 2 if/else correctly flags quantity 0
Presentation / no errors 1 Clean output, no red errors
Common mistakes to avoid: quoting numbers; printing inside the loop instead of using the function; <= in the loop
condition; forgetting the return ; misspelling object keys.
Instructor reference solution:
```text
const storeName = "Blessed Provisions Store";
```
```text
const stock = [
  { name: "Milo Tin",    price: 4500, quantity: 12, category: "Food" },
  { name: "Peak Milk",   price: 1200, quantity: 20, category: "Food" },
```
```text
  { name: "Coke (50cl)", price: 300,  quantity: 0,  category: "Drinks" },
  { name: "Bournvita",   price: 3800, quantity: 8,  category: "Food" },
  { name: "Colgate",     price: 1500, quantity: 5,  category: "Toiletries" },
  { name: "Dettol",      price: 2200, quantity: 0,  category: "Toiletries" }
];
```
```text
function formatStock(item) {
  let line = `${item.name} — ₦${item.price} x ${item.quantity} [${item.category}]`;
  if (item.quantity === 0) {
    line = line + " — OUT OF STOCK";
  }
  return line;
}
```
```text
console.log(`===== ${storeName} — STOCK LIST =====`);
```
```text
for (const item of stock) {
  console.log(formatStock(item));
}
```
```text
console.log(`Total different items: ${stock.length}`);
```
Expected Console output:
```text
===== Blessed Provisions Store — STOCK LIST =====
Milo Tin — ₦4500 x 12 [Food]
Peak Milk — ₦1200 x 20 [Food]
Coke (50cl) — ₦300 x 0 [Drinks] — OUT OF STOCK
Bournvita — ₦3800 x 8 [Food]
Colgate — ₦1500 x 5 [Toiletries]
Dettol — ₦2200 x 0 [Toiletries] — OUT OF STOCK
Total different items: 6
```

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key.)
Q1. Short answer. In one sentence each, what is the difference between an array and an object?
Q2. Multiple choice. What does products[2] give you? a) The second item in the array b) The third item in the array c) An error,
because indexes start at 1 d) The number 2
Q3. Explain in your own words. Why does array indexing start at 0 instead of 1 ?
Q4. Practical identification. Given:
```text
const product = { name: "Shea Butter", price: 1800, category: "Skincare" };
```
Write the code to print the price using (a) dot access and (b) bracket access.
Q5. Error detection. Find and fix the bug:
```text
const items = ["Rice", "Beans", "Garri"];
for (let i = 0; i <= items.length; i++) {
  console.log(items[i]);
}
```
Q6. Scenario. You have an array scores of numbers. Write a loop that prints each score, and prints PASS next to scores of 50 or
above and FAIL otherwise. (Hint: combine today's loop with Session 2's if/else .)
INSTRUCTOR ANSWER KEY (Q1–Q6)
A1. An array is an ordered list of items accessed by position number (index); an object is a single collection of key/value pairs
accessed by key name. (Accept: array = list by number; object = one thing with labelled parts.) A2. (b) the third item — indexes
are 0, 1, 2. A3. The index counts the number of steps from the start / the gap before an item. The first item is at the start, so it is
0 steps away. (Accept any correct explanation of zero-based counting.) A4. (a) console.log(product.price); (b)
console.log(product["price"]); A5. The bug is i <= items.length : it uses <= so the loop runs a fourth time and prints items[3] ,
which is undefined . Fix: change <= to < :
```text
for (let i = 0; i < items.length; i++) {
  console.log(items[i]);
}
```
A6.
```text
for (const score of scores) {
  if (score >= 50) {
    console.log(`${score} — PASS`);
  } else {
    console.log(`${score} — FAIL`);
  }
}
```

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today you learned to hold many values in one place. An array is an ordered list you read by index —
and the first index is 0 , because the index counts steps from the start. .length tells you how many items there are; push adds
and pop removes from the end. An object describes one thing using labelled key/value pairs, read with dot or bracket access.
Put objects inside an array and you get an array of objects — the shape of the shop data in your capstone. Finally, loops repeat
a job for every item: the classic for (when you need the index), for...of (just the items), and forEach (pass a function). You
reused your Session 2 function to format each item once, cleanly.
Five important takeaways:
1. Arrays use [ ] and are read by index; indexing starts at 0, and the last index is length - 1 .
2. .length counts items; push() adds to the end; pop() removes the last.
3. Objects use { key: value } ; read with obj.key or obj["key"] ; update by assignment.
4. An array of objects is the real-world data shape — and the capstone shape.
5. Loops ( for , for...of , forEach ) repeat work; pair them with a function to format each item once.
Questions to help you recognise what you can now do:
Can I create an array and safely read its last item without knowing its length in advance?
Can I build one product object and read a value two different ways?
Can I explain to a friend why products[0] is the first product?
Can I print a whole list with a loop, adding no code when the list grows?
Can I reuse a function to format every item in the list?
Connection to the next session: Everything today happened in the Console. The page itself still shows the same static HTML
from Web Design. Next session we take this product array and make it appear on the actual page — using the DOM to find
HTML elements, change their text and styles, and even create new elements from our data. In other words: you will finally see
the catalogue on the screen, not just in the Console.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
Learner reaches the last array item using length - 1 , not by guessing.
Learner chooses dot access for a known key and can explain that bracket access needs a quoted string.
Learner writes a loop that prints exactly the items — no trailing undefined .
Learner keeps prices as numbers and spots a quoted number as a likely bug.
Learner refactors a formatting line into formatProduct(product) and calls it from the loop, mirroring Session 2.
Learner predicts how many lines a loop will print before running it.
Common misconceptions to watch for and correct:
"Arrays start at 1." → Re-draw the numbered row starting at 0; ask for the last index ( length - 1 ).
" const means the array can never change." → Demonstrate push on a const array; clarify it is the name that is locked, not
the contents.
" products.name should give the name." → Only the objects inside have keys; you must index first ( products[0].name ).
" .length() is a method." → It is a property; no brackets.
" for...of and a classic for are identical." → The classic gives the index; for...of gives only the item.
"A loop printing once means the data is wrong." → Usually missing braces around the loop body.
Suggested remedial exercises for learners who struggle:
1. Index drill: give a five-item array and three index questions ("what is at 0?", "what is the last index?", "what is at 5?"), answer
on paper, then verify in the Console.
2. Access drill: give one object and ask for each value twice — once dot, once bracket.
3. Loop trace: hand out a for loop and a table (pass, i , prints) and ask learners to complete the trace by hand before
running it.
4. Mirror exercise: rewrite the fruit market list for a different shop (a phone-repair kiosk), same structure, new data.
Differentiation:
Level 1 (supported): provide the array of objects already written, plus a formatProduct skeleton with a return line partially
filled; learners complete the loop only.
Level 2 (standard): the independent exercise as written.
Level 3 (challenge): require (a) a total value of stock (sum of price * quantity ) printed at the end using a loop and an
accumulator variable — for example let total = 0; before the loop and total = total + item.price * item.quantity; inside;
and (b) use forEach with (item, index) to number the lines.
Timing guidance. The loop and the array-of-objects pattern are the heart of the session and the backbone of the capstone. If
the room is slow: shorten the case study (Section J) to a 2-minute talk, keep the guided practical (H) and the independent
exercise (I) intact. The opening "two hundred products" demonstration is cheap to run and very motivating — do not cut it.
END OF SESSION 3
Next: Session 4 — The DOM: Selecting and Changing the Page.
