---
{
  "id": "web-development/session-02",
  "course": "web-development",
  "number": 2,
  "of": 12,
  "title": "Making Decisions: Functions, Conditions and If/Else",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/web-development/session-02.png",
    "page": 22,
    "transcript": [
      "JAVASCRIPT FUNCTIONS AND CONDITIONALS",
      "PART 1: A FUNCTION IS A REUSABLE BLOCK OF CODE YOU DEFINE ONCE AND CALL MANY TIMES",
      "function greet(name) {",
      "return \"Welcome, \" + name;",
      "greet(\"Chidi\");",
      "KEYWORD",
      "NAME",
      "( )",
      "parameter = the input it expects",
      "return = the answer it gives back",
      "greet(\"Chidi\") = a call, with an argument",
      "return sends a value back - console.log only prints",
      "DEFINE - write the recipe",
      "function greet(name) { ... }",
      "CALL - cook the meal",
      "greet(\"Ngozi\") - call it as often as you like",
      "PART 2: COMPARISON OPERATORS - ALWAYS COMPARE WITH ===",
      "===",
      "is equal",
      "!==",
      "not equal",
      "> < >= <=",
      "bigger, smaller",
      "AND - both true",
      "OR - one is true",
      "NOT - flips it",
      "= assigns a value (not a test)",
      "Use === so you never mix them up",
      "PART 3: if / else if / else - THE CODE CHOOSES ONE PATH",
      "if (score >= 50)",
      "true or false?",
      "YES",
      "if block runs",
      "\"You passed!\"",
      "else block runs",
      "\"Try again\"",
      "CHAIN THE BRANCHES",
      "if (score >= 70) { ... }",
      "else if (score >= 50) { ... }",
      "else { ... }",
      "Only the first true branch runs - trace it on paper",
      "NIGERIAN EXAMPLE",
      "function priceAfterDiscount(p) { if (p >= 10000) return p * 0.9; return p; } - call it with a cart",
      "total in naira and it gives back the 10% discounted price for big orders."
    ],
    "hotspots": [
      {
        "label": "JAVASCRIPT FUNCTIONS AND CONDITIONALS",
        "x": 21.91,
        "y": 6.87,
        "w": 56.22,
        "h": 4.21,
        "mono": false
      },
      {
        "label": "PART 1: A FUNCTION IS A REUSABLE BLOCK OF CODE YOU DEFINE ONCE AND CALL MANY TIMES",
        "x": 13.08,
        "y": 15.88,
        "w": 73.81,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "DEFINE - write the recipe",
        "x": 70.09,
        "y": 22.09,
        "w": 17.36,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "KEYWORD NAME ( )",
        "x": 38.86,
        "y": 23.22,
        "w": 19.82,
        "h": 1.85,
        "mono": false
      },
      {
        "label": "function greet(name) {",
        "x": 7.78,
        "y": 23.82,
        "w": 23.35,
        "h": 2.66,
        "mono": true
      },
      {
        "label": "function greet(name) { ... }",
        "x": 72.08,
        "y": 25.37,
        "w": 13.34,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "parameter = the input it expects",
        "x": 37.2,
        "y": 27.25,
        "w": 15.84,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "return \"Welcome, \" + name;",
        "x": 9.71,
        "y": 28.06,
        "w": 27.61,
        "h": 2.66,
        "mono": true
      },
      {
        "label": "return = the answer it gives back",
        "x": 37.2,
        "y": 30.54,
        "w": 16.59,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "greet(\"Chidi\") = a call, with an argument CALL - cook the meal",
        "x": 37.2,
        "y": 33.82,
        "w": 48.81,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "greet(\"Chidi\");",
        "x": 7.78,
        "y": 37.04,
        "w": 11.49,
        "h": 2.27,
        "mono": true
      },
      {
        "label": "return sends a value back - console.log only prints greet(\"Ngozi\") - call it as often as you like",
        "x": 37.2,
        "y": 37.13,
        "w": 52.3,
        "h": 1.94,
        "mono": false
      },
      {
        "label": "PART 2: COMPARISON OPERATORS - ALWAYS COMPARE WITH ===",
        "x": 25.26,
        "y": 43.64,
        "w": 49.46,
        "h": 2.48,
        "mono": false
      },
      {
        "label": "= assigns a value (not a test)",
        "x": 75.68,
        "y": 49.34,
        "w": 16.08,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "=== !== > < >= <=",
        "x": 9.69,
        "y": 49.37,
        "w": 26.96,
        "h": 2.12,
        "mono": true
      },
      {
        "label": "Use === so you never mix them up is equal not equal bigger, smaller AND - both true OR - one is true NOT - flips it",
        "x": 73.99,
        "y": 51.94,
        "w": 19.47,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "PART 3: if / else if / else - THE CODE CHOOSES ONE PATH",
        "x": 28.61,
        "y": 57.97,
        "w": 42.82,
        "h": 2.48,
        "mono": false
      },
      {
        "label": "CHAIN THE BRANCHES",
        "x": 63.11,
        "y": 66.99,
        "w": 15.98,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "if block runs",
        "x": 43.7,
        "y": 68.51,
        "w": 7.11,
        "h": 2.12,
        "mono": false
      },
      {
        "label": "if (score >= 70) { ... }",
        "x": 63.11,
        "y": 70.63,
        "w": 18.23,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "\"You passed!\" if (score >= 50)",
        "x": 43.61,
        "y": 71.19,
        "w": 7.13,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "else if (score >= 50) { ... }",
        "x": 63.11,
        "y": 73.46,
        "w": 22.05,
        "h": 1.97,
        "mono": true
      },
      {
        "label": "true or false?",
        "x": 18.82,
        "y": 74.12,
        "w": 6.4,
        "h": 1.85,
        "mono": false
      },
      {
        "label": "else { ... }",
        "x": 63.11,
        "y": 76.27,
        "w": 9.1,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "else block runs",
        "x": 43.01,
        "y": 76.75,
        "w": 8.49,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "Only the first true branch runs - trace it on paper \"Try again\"",
        "x": 63.11,
        "y": 79.19,
        "w": 24.3,
        "h": 1.97,
        "mono": false
      }
    ],
    "width": 984,
    "height": 669
  },
  "module": "Week 1 — Module 1: JavaScript Foundations",
  "duration_minutes": 105,
  "difficulty": "Beginner",
  "prerequisite_knowledge": "Session 1 — variables ( let / const ), data types (string, number, boolean, undefined), console.log , template literals, arithmetic. Learner must be able to open the Console and link a script file. Connection to previous session In Session 1 programs ran straight down, doing the same thing every time. Today programs learn to decide and to repeat a named action (a function). This is the point where code starts to feel intelligent.",
  "connection_to_previous": null
}
---
# Making Decisions: Functions, Conditions and If/Else

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 1 — Module 1: JavaScript Foundations

**Recommended duration:** 105 minutes

**Difficulty:** Beginner

**Prerequisite knowledge:** Session 1 — variables ( let / const ), data types (string, number, boolean, undefined), console.log , template literals, arithmetic. Learner must be able to open the Console and link a script file. Connection to previous session In Session 1 programs ran straight down, doing the same thing every time. Today programs learn to decide and to repeat a named action (a function). This is the point where code starts to feel intelligent.

**Preparation before class:** Learner practice folders from Session 1 available; projector showing VS Code + Chrome Console; a whiteboard or flipchart for drawing decision branches.

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Define a function using the function keyword and call it, explaining the difference between defining and calling.
2. Pass arguments into a function and return a value, and explain why return is different from console.log .
3. Write comparison expressions using === , !== , > , < , >= , <= and explain why === is preferred over == .
4. Combine conditions with && (AND), || (OR) and ! (NOT).
5. Write if , else if and else branches that choose different actions based on a value.
6. Trace the execution of a multi-branch program on paper and predict which branch runs.
7. Diagnose and fix common errors: = vs === , missing parentheses/braces, and a function that runs but returns nothing
( undefined ).

## C. Required Materials
<!-- kind:materials -->
Hardware: One computer per learner; instructor computer with projector. Software: VS Code; Google Chrome. No new
software needed. Accounts: None. Sample files: Continue in the learner's webdev-practice folder. Instructor prepares demo-
week1-s2/ with index.html and js/decide.js . Worksheets:
Worksheet 2.1 — "Trace the Branch" (given a program with several branches, learners circle which line runs).
Worksheet 2.2 — "Turn a Rule into Code" (English rules → if/else ). Tools: Chrome DevTools Console. Internet: Not
required. Alternative for limited facilities: Everything runs offline; a shared machine works with the pair-swap method
from Session 1.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector Console, type the following and ask the class to predict the result before pressing Enter:
```text
let age = 20;
console.log(age >= 18);
```
Instructor asks: "Before I press Enter — will this print true or false ? Think about what >= means."
Press Enter → prints true .
Then say:
"Yesterday our programs did the same thing every single time. They could not think. But look — the computer just
answered a question: 'Is age greater than or equal to 18?' and answered true . Answering yes/no questions is the first half
of thinking. The second half is acting on the answer: if the person is 18 or older, show the adult content; else, show a
warning. Today we build programs that make decisions — and we package actions into reusable blocks called functions, so
we do not repeat ourselves."
Expected learner response: Learners will predict true/false and may argue. Accept both; the point is that the machine
evaluates the question.
Then hook with a real rule: Ask, "At your church's youth event, who is allowed to register for the adult session — anyone aged
18 and above, right? That is a rule. Rules become if statements in code." This sets up the day's work with a familiar Nigerian
institution.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Q1. "What is the difference between let and const ?"
Expected: let can be changed; const cannot.
Gap: learners forget and reassign a const , producing Assignment to constant variable . Remind them.
Q2. "What data type does console.log(typeof 42) print?"
Expected: number .
Gap: some say "integer" — accept but clarify JavaScript just says number for all numbers.
Q3. "Write the template literal that prints Total is ₦5000 using a variable total ."
Expected: console.log(`Total is ₦${total}`);
Gap: using normal quotes. Remind that ${ } only works inside backticks.
Q4. "What does 2 + 3 * 4 print, and why?"
Expected: 14 , because multiplication happens before addition.
Gap: 20 (left-to-right). Correct using the order-of-operations review.
Bridge: "Good — you can store and calculate. Now we ask questions ( if ) and reuse actions (functions)."
If the class is shaky, give a 5-minute pair activity: each pair writes three console.log lines using variables and types, then swaps
with another pair to check.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 Functions — packaging an action
The idea. A function is a named block of code that performs a task. You write it once and call it (run it) as many times as you
like.
Plain-English definition. A function is like a recipe with a name. You write the recipe once — "how to make jollof rice" — and
then whenever you want jollof rice you just say "make jollof rice" instead of repeating every step.
Why functions exist. Without functions, if you needed the same calculation in five places and later a price changed, you would
edit five copies and might miss one. A function keeps one copy. This is called DRY — Don't Repeat Yourself — a principle real
developers live by.
Anatomy of a function:
```text
function greet() {
  console.log("Hello and welcome!");
}
```
```text
greet();   // calling the function
```
Line by line:
function — the keyword that says "I am defining a function".
greet — the name (use a verb: greet , calculateTotal , showMenu ).
() — the parentheses, where inputs would go (empty here).
{ } — the body: the instructions that run when called.
greet(); — calling the function; this actually runs the body.
Fact to emphasise: Defining a function does not run it. Many beginners write a function and see nothing in the Console
because they forgot to call it. Definition = cooking the recipe on paper. Calling = actually cooking.
Analogy. A function is a wrapped gift. Writing the function is wrapping the gift. Calling the function is giving and opening it.
F.2 Parameters and arguments — giving a function information
A function becomes far more useful when you can hand it information.
```text
function greetUser(name) {
  console.log("Hello, " + name + "!");
}
```
```text
greetUser("Adaeze");   // Hello, Adaeze!
greetUser("Chinedu");  // Hello, Chinedu!
```
name inside the parentheses is a parameter — a placeholder.
"Adaeze" passed in when calling is the argument — the real value.
Analogy: the parameter is an empty cup; the argument is the tea you pour in.
Multiple parameters:
```text
function showPrice(item, price) {
  console.log(`${item} costs ₦${price}`);
}
```
```text
showPrice("Power Bank", 12000);
showPrice("Charger", 1800);
```
Common misconception: Learners swap the order. If a function expects (item, price) and you call showPrice(12000, "Power
Bank") , the output is nonsense. Order matters.
F.3 return — sending a value back
console.log shows a value to a human. return sends a value back to wherever the function was called, so the program can
keep using it.
```text
function add(a, b) {
  return a + b;
}
```
```text
let sum = add(2, 3);   // sum is now 5
console.log(sum);      // 5
console.log(add(10, 20) * 2);  // 30 * 2 = 60
```
Why return matters: Without return , the function's result is trapped inside and cannot be used elsewhere.
```text
function addWrong(a, b) {
  console.log(a + b);   // prints 5
}
```
```text
let result = addWrong(2, 3);
console.log(result);    // undefined  ← the value did not come back!
```
Say to the class: " console.log is a person shouting a number across the room. return is a person handing the number to you.
If you need the number later, you need it handed to you — that is return ."
Rule of thumb: A function that just reports may use console.log . A function that calculates something to be used elsewhere
must return .
Key fact: return also stops the function immediately. Any code after a return in the same block does not run.
F.4 Comparison operators — asking yes/no questions
Every decision starts with a question that has a true / false answer.
Operator Meaning Example Result
```text
===
```
equal to (strict)
```text
5 === 5
true
```
```text
!==
```
not equal to
```text
5 !== 3
true
```
```text
>
```
greater than
```text
10 > 5
true
```
```text
<
```
less than
```text
10 < 5
false
```
```text
>=
```
greater than or equal
```text
5 >= 5
true
```
```text
<=
```
less than or equal
```text
4 <= 5
true
```
The critical = vs === lesson:
= means assign: "put this value in the box." let x = 5;
=== means compare: "are these the same?" x === 5
Using = inside an if is a classic bug.
Why === and not == ? JavaScript has both. == is loose and tries to convert types, which causes surprises: "5" == 5 is true
with == but "5" === 5 is false . Professionals use === (strict) almost always to avoid these traps. Rule for this course: always
use === and !== .
Analogy for === : === is like a strict passport officer — everything must match exactly, including type. == is a lenient officer
who might let things slide and cause problems later.
F.5 Logical operators — combining questions
Real rules are often compound: "18 or older AND resident in Nigeria."
Operator Name Meaning Example
```text
&&
```
AND Both must be true
```text
age >= 18 && hasID === true
```
```text
||
```
OR At least one must be true
```text
isStudent || isTeacher
```
```text
!
```
NOT Reverses the value !isClosed (true if not closed)
Truth table for AND ( && ):
Left Right Result
true true true
true false false
false true false
false false false
Truth table for OR ( || ):
Left Right Result
true true true
Left Right Result
true false true
false true true
false false false
Worked example:
```text
let age = 20;
let hasVoterCard = true;
```
```text
console.log(age >= 18 && hasVoterCard);   // true: both satisfied
console.log(age >= 18 || hasVoterCard);   // true: at least one
console.log(!hasVoterCard);               // false
```
F.6 if , else if , else — choosing a path
The idea. An if statement runs a block of code only when a condition is true.
```text
let balance = 5000;
```
```text
if (balance > 0) {
  console.log("You have money available.");
}
```
If the condition is false, the block is skipped entirely.
Adding else — the "otherwise" path:
```text
let balance = 0;
```
```text
if (balance > 0) {
  console.log("You have money available.");
} else {
  console.log("Your balance is empty. Please top up.");
}
```
Adding else if — several possibilities:
```text
let score = 72;
```
```text
if (score >= 70) {
  console.log("Grade: A");
} else if (score >= 60) {
  console.log("Grade: B");
} else if (score >= 50) {
  console.log("Grade: C");
} else if (score >= 40) {
  console.log("Grade: D");
} else {
  console.log("Grade: F");
}
```
How the computer reads it — top to bottom, first match wins:
1. Is 72 >= 70? Yes → print "Grade: A" → stop; skip the rest.
2. (Never reached.)
Critical rule: order matters. If you put score >= 50 first, a score of 72 would print "Grade: C" — wrong. Always list the strictest
(largest threshold first, for pass marks) or the most specific condition first.
Say to the class: "The computer is lazy but honest — it stops at the first door that opens. So put the most demanding door
first."
Braces { } : They group the instructions belonging to each branch. Missing braces are a very common beginner bug.
Analogy. if/else if/else is like a security post with rules: "If you are staff, enter here. Else if you are a visitor, sign the book.
Else, please step aside."
F.7 Putting it together — functions plus decisions
The two ideas combine powerfully: a function decides what to do.
```text
function gradeStudent(score) {
  if (score >= 70) {
    return "A";
  } else if (score >= 60) {
    return "B";
  } else if (score >= 50) {
    return "C";
  } else if (score >= 40) {
    return "D";
  } else {
    return "F";
  }
}
```
```text
console.log(`Adaeze scored 72 → ${gradeStudent(72)}`);
console.log(`Chinedu scored 45 → ${gradeStudent(45)}`);
```
Output:
```text
Adaeze scored 72 → A
Chinedu scored 45 → D
```
Why this pattern is professional: The grading rule lives in exactly one place ( gradeStudent ). If the school changes the pass
mark, you edit one function, not fifty scattered lines.
F.8 Summary of the session
A function packages a reusable action; define it once, call it to run.
Parameters receive arguments; return sends a value back (different from console.log ).
Comparisons ( === , !== , > , < , >= , <= ) give true / false ; prefer === .
Combine conditions with && , || , ! .
if / else if / else choose the first matching path; order matters.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 What the instructor prepares
demo-week1-s2/index.html linking js/decide.js at the bottom of the body.
Whiteboard with a drawn branching diagram (three doors).
G.2 Demonstration 1 — a function that decides pass/fail (7 minutes)
Say: "Let's build a function that tells a student whether they passed a test."
Type into js/decide.js :
```text
function checkResult(score) {
  if (score >= 50) {
    return "PASS";
  } else {
    return "FAIL";
  }
```
```text
}
```
```text
console.log("Ada:", checkResult(72));
console.log("Ngozi:", checkResult(45));
```
Do on the projector:
1. Save, open the page, press F12 .
2. Point at PASS and FAIL .
3. Pause and ask: "Before I refresh — what will Ngozi print?" (FAIL.)
4. Then change checkResult(45) to checkResult(50) and ask: "Pass or fail now, and why?" (PASS — because >= includes 50.)
Reasoning to explain aloud: We return a value so console.log can display it; the decision uses if/else ; the boundary case
>= is a deliberate choice ("50 and above passes").
Common error to inject: Change if (score >= 50) to if (score = 50) . Save, refresh.
The Console may show PASS for both, or behave unpredictably, and there is no error shown for the = — this is why it is
dangerous.
Say: " = assigns; === / >= compare. A single = here is a silent bug. Always check your comparison operators."
G.3 Demonstration 2 — multi-branch grading with combined conditions (8 minutes)
Type:
```text
function grade(score) {
  if (score < 0 || score > 100) {
    return "INVALID SCORE";
  } else if (score >= 70) {
    return "A";
  } else if (score >= 60) {
    return "B";
  } else if (score >= 50) {
    return "C";
  } else if (score >= 40) {
    return "D";
  } else {
    return "F";
  }
}
```
```text
console.log(grade(85));   // A
console.log(grade(65));   // B
console.log(grade(50));   // C
console.log(grade(120));  // INVALID SCORE
console.log(grade(-5));   // INVALID SCORE
```
Draw the branches on the whiteboard as doors, and trace grade(120) together: first door "score < 0 OR score > 100" → true →
INVALID, stop.
Ask: "Why did we put the INVALID check first?" (Because it is the most specific/edge case and 120 should not fall into "A".)
Learners should observe: the first matching branch wins, and || lets us catch two bad ranges in one line.

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: Build a "Transport Fare" advisor that decides the fare based on distance and whether the passenger is a student.
Starting materials: New file js/fare.js linked to a page fare.html .
Procedure:
1. Create fare.html linking js/fare.js .
2. In fare.js , write a function:
```text
function transportFare(distanceKm, isStudent) {
  let fare;
```
```text
  if (distanceKm <= 5) {
    fare = 300;
  } else if (distanceKm <= 15) {
    fare = 600;
  } else {
    fare = 1000;
  }
```
```text
  if (isStudent) {
    fare = fare - (fare * 0.2);   // 20% student discount
  }
```
```text
  return fare;
}
```
3. Test it:
```text
console.log(transportFare(3, false));   // 300
console.log(transportFare(10, true));   // 600 - 20% = 480
console.log(transportFare(25, false));  // 1000
console.log(transportFare(25, true));   // 1000 - 20% = 800
```
4. Pause and predict before running: "What is transportFare(10, true) ?" (480.)
5. Run and compare.
Expected result: 300, 480, 1000, 800.
Points to pause and predict: After the distance branches; after the discount branch.
Troubleshooting while walking the room:
undefined printed → the function is missing return fare; .
Wrong fare → likely > vs >= or branch order.
Syntax error → missing brace } .
Completion checklist:
Function accepts two parameters
Three distance branches
Student discount applied
Returns (not just logs) the fare
All four tests match expected values

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: Build a "Movie Ticket Price" calculator for a cinema.
Scenario: Genesis Cinema in Port Harcourt charges by age group, and gives a discount on weekday mornings.
Children under 12: ₦1,000
Ages 12 to 17: ₦1,500
Adults 18 and above: ₦2,500
If it is a weekday morning ( isWeekdayMorning === true ), subtract ₦300 from any price.
If the age is below 0 or above 120, return "INVALID AGE" .
Starting information:
A variable age (number)
A variable isWeekdayMorning (boolean)
Requirements:
1. A function ticketPrice(age, isWeekdayMorning) that returns the final price as a number, or "INVALID AGE" .
2. Use if / else if / else .
3. Validate the age first.
4. Print three test cases: a 9-year-old on a weekday morning, a 15-year-old in the evening, and an adult (₦2,500) on a weekday
morning.
Constraints: All prices as numbers; use && / || or nested if for the discount; do not copy the transport example structure
word-for-word (design your own branch order).
Time allowance: 15 minutes.
Success criteria:
ticketPrice(9, true) → 700
ticketPrice(15, false) → 1500
ticketPrice(30, true) → 2200
ticketPrice(200, false) → "INVALID AGE"
No red errors.
Hints:
Hint 1: check if (age < 0 || age > 120) return "INVALID AGE"; first.
Hint 2: use let price then adjust for the morning discount before returning.
Hint 3: the discount only applies if isWeekdayMorning is true .
Instructor answer key:
```text
function ticketPrice(age, isWeekdayMorning) {
  if (age < 0 || age > 120) {
    return "INVALID AGE";
  }
```
```text
  let price;
  if (age < 12) {
    price = 1000;
  } else if (age < 18) {
    price = 1500;
  } else {
    price = 2500;
  }
```
```text
  if (isWeekdayMorning) {
    price = price - 300;
  }
```
```text
  return price;
}
```
```text
console.log(ticketPrice(9, true));    // 700
console.log(ticketPrice(15, false));  // 1500
console.log(ticketPrice(30, true));   // 2200
console.log(ticketPrice(200, false)); // INVALID AGE
```
Marking guidance (out of 10): validation first (2); correct three age branches (3); weekday discount (2); returns number/string
correctly (1); all tests correct (2).

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Mr. Emeka runs a cooperative savings group in his church. Members contribute monthly. At the end of the year, the
group shares the profit based on each member's total contribution. Mr. Emeka has been calculating the share on paper, and last
year there were complaints about mistakes.
Relevant facts.
Total profit to share: ₦600,000.
Total contributions of all members combined: ₦3,000,000.
A member's share = (their contribution ÷ total contribution) × total profit.
Members who paid all 12 months on time get a 5% loyalty bonus on their share.
Decision point. How can a function make the yearly calculation trustworthy and repeatable?
Possible approaches.
1. Continue by hand and double-check with a calculator.
2. Build a function memberShare(contribution, totalContribution, profit, paidAllYear) that returns the share, added to a loyalty
bonus where earned.
Recommended solution. Approach 2. The formula and the bonus rule live in one place; every member is treated identically; the
result can be printed for the meeting.
Example solution:
```text
function memberShare(contribution, totalContribution, profit, paidAllYear) {
  if (contribution <= 0) {
    return 0;
  }
  let share = (contribution / totalContribution) * profit;
  if (paidAllYear) {
    share = share * 1.05;   // +5% loyalty
  }
  return share;
}
```
```text
console.log(memberShare(150000, 3000000, 600000, true));   // 30000 * 1.05 = 31500
console.log(memberShare(150000, 3000000, 600000, false));  // 30000
```
Trade-offs.
Approach 1 relies on the same person who is also handling money — a conflict and an error risk.
Approach 2 takes one hour to build and removes the dispute risk; the church cooperative can re-run it any year. It uses
exactly the skills taught today.
Professional connection. Cooperative and small-business accounting tools are built exactly like this — a rule expressed once as
a function, applied consistently. Junior developers are often asked to "automate this spreadsheet formula" — this is that task.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
K.1 The function prints nothing
Symptoms: Page loads, Console empty. Likely causes: (a) The function was defined but never called. (b) The script file is not
linked (see Session 1, K.1). Investigate: Search your code for the function name followed by () . If it only appears once (at the
definition), it was never called. Fix: Add a call, e.g. checkResult(70); . Confirm: Output appears. Prevent: Always write at least
one test call.
K.2 undefined instead of a value
Symptoms: console.log(myFunction(5)) prints undefined . Likely cause: The function has no return , or return is on a path that
was not taken. (Confirmed by reading the function.) Fix: Ensure every branch returns a value. A common bug is a console.log
where a return was needed. Prevent: Decide whether a function reports (log) or produces a value (return).
K.3 The wrong branch runs
Symptoms: Score 72 prints "C" instead of "A". Likely cause: Branch order — a looser condition appears before a stricter one.
Fix: Reorder so the strictest condition is first. Prevent: When using ranges, go from highest/lowest threshold inward and test
boundary values.
K.4 = used instead of === in a condition
Symptoms: Wrong result with no error message (the most dangerous kind). Likely cause: if (x = 5) assigns instead of
compares. Fix: Change to === (or the intended comparison). Prevent: Read conditions aloud as a question: "is x equal to five?"
→ === .
K.5 else without if / unexpected token
Symptoms: Red syntax error near else or } . Likely cause: Missing or extra brace { } ; or else detached from its if by a
stray semicolon. Fix: Count braces; ensure else follows if / else if directly. Prevent: Indent consistently so nesting is
visible.
K.6 "5" === 5 is false but the learner expected true
Symptoms: A comparison gives unexpected false / true . Likely cause: Type mismatch — a string compared with a number.
Investigate: console.log(typeof x) . Fix: Convert with Number("5") or use the correct type from the start. Prevent: Be deliberate:
are you comparing text or numbers?

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "Electricity Bill Estimator"
Purpose: Apply functions, conditions and comparison operators to a realistic recurring household task.
Scenario: A local estate calculates monthly electricity charges on a tiered system. Write a function that returns a customer's bill
based on units consumed.
Rules:
First 100 units: ₦50 per unit.
Next 100 units (101–200): ₦70 per unit.
Above 200 units: ₦100 per unit.
If units are negative, return "INVALID READING" .
Detailed instructions:
1. Write a function electricityBill(units) that calculates and returns the total in naira.
2. Test with four cases: 80 units, 150 units, 260 units, and -10 units.
3. Print each result with a clear label.
Required deliverables: assignment2/index.html , assignment2/js/bill.js , and the Console output recorded in the workbook.
Submission format: Files in the class folder; Console output pasted/photographed.
Deadline: Before Session 3.
Marking rubric (20 marks):
Criterion Marks Strong answer
Validation (negative) 3 Returns "INVALID READING" first
Tier 1 calculation 4 80 units → 4000
Tier 2 calculation 4 150 units → 100×50 + 50×70 = 8500
Tier 3 calculation 4 260 units → 100×50 + 100×70 + 60×100 = 18000
Function returns value 3 Uses return , not just log
Clean output / no errors 2 Clear labels, no red errors
Common mistakes to avoid: charging the whole bill at one tier instead of splitting units across tiers; forgetting the invalid
check; returning nothing.
Instructor reference solution:
```text
function electricityBill(units) {
  if (units < 0) {
    return "INVALID READING";
  }
```
```text
  let bill = 0;
  if (units <= 100) {
    bill = units * 50;
  } else if (units <= 200) {
    bill = (100 * 50) + ((units - 100) * 70);
  } else {
    bill = (100 * 50) + (100 * 70) + ((units - 200) * 100);
  }
  return bill;
}
```
```text
console.log(`80 units: ₦${electricityBill(80)}`);     // 4000
console.log(`150 units: ₦${electricityBill(150)}`);   // 8500
console.log(`260 units: ₦${electricityBill(260)}`);   // 18000
console.log(`-10 units: ${electricityBill(-10)}`);    // INVALID READING
```

## M. Knowledge Check
<!-- kind:knowledge_check -->
Q1. Short answer. What is the difference between defining a function and calling it?
Q2. Multiple choice. Which function correctly returns the larger of two numbers? a) function max(a,b){ console.log(a>b?a:b); }
b) function max(a,b){ return a>b?a:b; } c) function max(a,b){ return a>b; } d) function max(a,b){ a>b?a:b; }
Q3. Explain in your own words. Why is === preferred over == in professional JavaScript?
Q4. Practical identification. What does each print? a) console.log(10 > 5 && 3 > 7); b) console.log(10 > 5 || 3 > 7); c)
```text
console.log(!(10 > 5));
```
Q5. Error detection. Find and fix the bug:
```text
function applyDiscount(price, percent) {
  discount = (price * percent) / 100;
  console.log(price - discount);
}
let finalPrice = applyDiscount(5000, 10);
console.log(finalPrice);
```
Q6. Scenario. A data bundle plan: first 2GB free; each additional GB costs ₦250; if the total bill would exceed ₦2,000, cap it at
₦2,000. Write the if/else logic (or full function) that returns the cost given extraGb .
INSTRUCTOR ANSWER KEY (Q1–Q6)
A1. Defining writes the recipe and does not run it; calling executes the body. A defined-but-uncalled function does nothing. A2.
(b) — it return s the value; (a) only logs, (c) returns a boolean, (d) returns undefined . A3. == converts types and causes
surprises (e.g. "5" == 5 is true); === checks value and type, so bugs are caught instead of hidden. A4. a) false (3>7 is false),
b) true , c) false . A5. The function uses console.log instead of return , so finalPrice is undefined . Fix:
```text
function applyDiscount(price, percent) {
  const discount = (price * percent) / 100;
  return price - discount;
}
console.log(applyDiscount(5000, 10));   // 4500
```
A6.
```text
function dataCost(extraGb) {
  if (extraGb <= 0) return 0;
  let cost = extraGb * 250;
  if (cost > 2000) {
```
```text
    cost = 2000;
  }
  return cost;
}
```

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today you learned to give your programs a brain. Functions let you write an action once and reuse it,
with parameters as inputs and return to send a result back. Comparison operators turn questions into true / false , and
logical operators ( && , || , ! ) combine questions. if / else if / else let a program take different paths, and the first
matching branch wins.
Five important takeaways:
1. Define a function once; call it as often as you like.
2. return sends a value out; console.log only shows it.
3. Use === to compare; = assigns.
4. && needs both; || needs one; ! flips.
5. In if/else if , the first true branch runs — order matters.
Questions to help you recognise what you can now do:
Can I write a function with two parameters and a return ?
Can I combine two conditions with && ?
Can I explain why "5" === 5 is false?
Can I trace which branch runs for a given input?
Connection to the next session: We can now store values and make single decisions. Next session we handle many values at
once — arrays and objects — and use loops to process lists like a shopping cart or a class register.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
Learner writes a function and calls it without prompting.
Learner uses return where a value is needed, and can explain the difference from console.log .
Learner reorders branches to fix an incorrect result.
Learner checks a boundary case (e.g., exactly 50) without being asked.
Common misconceptions:
"Defining = running." Reinforce with the uncalled-function demo.
" console.log and return are the same." Show the undefined proof.
" = and === are interchangeable." Show the silent-bug demo from G.2.
"Branches are checked independently." Clarify first-match-wins.
Suggested remedial exercises:
1. Give five if/else snippets and ask learners to write the output on paper.
2. Give a function with console.log where return is required and ask them to fix and test.
3. Boundary drills: test >= vs > at the exact threshold.
Remedial exercise (mirror): Ask learners to rewrite the transport-fare function for a different city with different prices — same
structure, new numbers.
Differentiation:
Level 1: provide the function skeleton with branches stubbed and one test pre-filled.
Level 2: the exercise as written.
Level 3: add a third parameter (e.g., isNight ) with its own surcharge, and validate multiple invalid inputs.
Timing guidance: The independent exercise is the heart of the session. If time is short, reduce the case study to a 2-minute talk
and keep the practical intact.
END OF SESSION 2
Next: Session 3 — Arrays, Objects and Loops.
