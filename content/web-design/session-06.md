---
{
  "id": "web-design/session-06",
  "course": "web-design",
  "number": 6,
  "of": 12,
  "title": "CSS Responsive Design",
  "free": false,
  "diagram": {
    "src": "/assets/concepts/web-design/session-06.png",
    "page": 105,
    "transcript": [
      "RESPONSIVE DESIGN AND BREAKPOINTS",
      "MOBILE FIRST: design the phone version, then add space for bigger screens",
      "MENU",
      "headline",
      "content",
      "more",
      "360 px - PHONE",
      "1 column, stacked menu",
      "Item 1 Item 2 Item 3",
      "content",
      "content",
      "768 px - TABLET",
      "2 columns, menu in a row",
      "Home About Services Gallery Contact",
      "column 1",
      "column 2",
      "column 3",
      "1024 px - LAPTOP",
      "3 columns, full menu",
      "WHY IT",
      "MATTERS",
      "Most customers",
      "browse on phones.",
      "A site that breaks",
      "on mobile loses",
      "customers and trust.",
      "1. VIEWPORT META TAG",
      "<meta name=\"viewport\"",
      "content=\"width=device-width...\">",
      "Without it, phones show a tiny page",
      "2. MEDIA QUERY",
      "@media (min-width: 768px) {",
      ".nav { display: flex; }",
      "Breakpoints: 360px, 768px, 1024px",
      "3. UNITS AND IMAGES",
      "px = fixed. %, rem, vw = flexible",
      "Prefer flexible units for text and boxes",
      "Images: max-width: 100%",
      "3 COMMON PROBLEMS AND THEIR FIXES",
      "Horizontal scroll - something is too wide (check fixed px widths and big images)",
      "Text too small - use rem instead of px | Image overflows - add max-width: 100%",
      "NIGERIAN EXAMPLE",
      "Most customers browse on cheap data on their phones: build the 360px single column first, then",
      "switch to a 3-column grid at 1024px - test both in Chrome DevTools before you publish."
    ],
    "hotspots": [
      {
        "label": "RESPONSIVE DESIGN AND BREAKPOINTS",
        "x": 24.26,
        "y": 6.87,
        "w": 51.49,
        "h": 4.21,
        "mono": false
      },
      {
        "label": "MOBILE FIRST: design the phone version, then add space for bigger screens",
        "x": 21.44,
        "y": 16.12,
        "w": 57.04,
        "h": 2.51,
        "mono": false
      },
      {
        "label": "Item 1 Item 2 Item 3 Home About Services Gallery Contact MENU",
        "x": 29.22,
        "y": 21.82,
        "w": 42.4,
        "h": 1.7,
        "mono": false
      },
      {
        "label": "WHY IT",
        "x": 83.57,
        "y": 22.81,
        "w": 4.95,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "MATTERS",
        "x": 83.57,
        "y": 25.61,
        "w": 6.09,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "headline",
        "x": 10.29,
        "y": 28.06,
        "w": 4.26,
        "h": 1.82,
        "mono": false
      },
      {
        "label": "Most customers",
        "x": 83.57,
        "y": 29.58,
        "w": 8.22,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "browse on phones.",
        "x": 83.57,
        "y": 32.18,
        "w": 9.48,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "content content",
        "x": 30.98,
        "y": 32.99,
        "w": 12.69,
        "h": 1.85,
        "mono": false
      },
      {
        "label": "column 1 column 2 column 3",
        "x": 54.6,
        "y": 34.18,
        "w": 22.07,
        "h": 1.82,
        "mono": false
      },
      {
        "label": "content A site that breaks",
        "x": 10.6,
        "y": 35.34,
        "w": 81.64,
        "h": 1.85,
        "mono": false
      },
      {
        "label": "on mobile loses",
        "x": 83.57,
        "y": 38.3,
        "w": 7.92,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "customers and trust.",
        "x": 83.57,
        "y": 40.87,
        "w": 10.4,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "more",
        "x": 11.21,
        "y": 42.39,
        "w": 2.44,
        "h": 1.85,
        "mono": false
      },
      {
        "label": "360 px - PHONE 768 px - TABLET 1024 px - LAPTOP",
        "x": 7.03,
        "y": 48.66,
        "w": 64.4,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "1 column, stacked menu 2 columns, menu in a row 3 columns, full menu",
        "x": 6.42,
        "y": 51.46,
        "w": 64.32,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "1. VIEWPORT META TAG 2. MEDIA QUERY 3. UNITS AND IMAGES",
        "x": 6.82,
        "y": 57.34,
        "w": 75.67,
        "h": 2.24,
        "mono": false
      },
      {
        "label": "px = fixed. %, rem, vw = flexible",
        "x": 67.59,
        "y": 60.63,
        "w": 15.74,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "<meta name=\"viewport\" @media (min-width: 768px) {",
        "x": 6.82,
        "y": 60.75,
        "w": 50.91,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "content=\"width=device-width...\"> .nav { display: flex; }",
        "x": 6.82,
        "y": 63.34,
        "w": 47.86,
        "h": 2.0,
        "mono": true
      },
      {
        "label": "Prefer flexible units for text and boxes",
        "x": 67.59,
        "y": 63.43,
        "w": 18.72,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "Without it, phones show a tiny page Breakpoints: 360px, 768px, 1024px Images: max-width: 100%",
        "x": 6.82,
        "y": 66.03,
        "w": 73.7,
        "h": 1.97,
        "mono": false
      },
      {
        "label": "3 COMMON PROBLEMS AND THEIR FIXES",
        "x": 7.15,
        "y": 72.3,
        "w": 28.67,
        "h": 2.36,
        "mono": false
      },
      {
        "label": "Horizontal scroll - something is too wide (check fixed px widths and big images)",
        "x": 7.15,
        "y": 75.58,
        "w": 40.32,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "Text too small - use rem instead of px | Image overflows - add max-width: 100%",
        "x": 7.15,
        "y": 78.39,
        "w": 39.65,
        "h": 2.09,
        "mono": false
      },
      {
        "label": "NIGERIAN EXAMPLE",
        "x": 7.15,
        "y": 84.27,
        "w": 13.75,
        "h": 2.39,
        "mono": false
      }
    ],
    "width": 984,
    "height": 669
  },
  "module": "Week 2 — Module 2: CSS Foundations",
  "duration_minutes": 105,
  "difficulty": "Beginner (comfortable with Flexbox and Grid from Session 5)",
  "prerequisite_knowledge": "Sessions 1–5. The learner must be able to build a page with a Flexbox navigation bar and a Grid or Flexbox card row, and apply box-sizing: border-box . If a learner cannot make two boxes sit side by side, run the 15-minute refresher in Appendix 6A before this session.",
  "connection_to_previous": "In Session 5 learners arranged elements into rows and columns. Those layouts looked good in a wide desktop window — but on a phone they break. This session makes every layout adapt automatically to phones, tablets and desktops."
}
---
# CSS Responsive Design

## A. Session Identification
<!-- kind:identification -->
**Week / module:** Week 2 — Module 2: CSS Foundations

**Recommended duration:** 105 minutes

**Difficulty:** Beginner (comfortable with Flexbox and Grid from Session 5)

**Prerequisite knowledge:** Sessions 1–5. The learner must be able to build a page with a Flexbox navigation bar and a Grid or Flexbox card row, and apply box-sizing: border-box . If a learner cannot make two boxes sit side by side, run the 15-minute refresher in Appendix 6A before this session.

**Connection to previous work:** In Session 5 learners arranged elements into rows and columns. Those layouts looked good in a wide desktop window — but on a phone they break. This session makes every layout adapt automatically to phones, tablets and desktops.

**Preparation before class:** Academy PCs on and logged in; VS Code and Chrome installed; the adaeze-fashion folder from Session 5 available on each machine; the projector set to show the instructor's Chrome with the DevTools device toolbar ready; print the "Responsive Design Checklist" (one per learner). If the academy has one smartphone or tablet, keep it handy for the real-device test.

## B. Learning Outcomes
<!-- kind:outcomes -->
By the end of this session, the learner will be able to:
1. Explain in their own words what responsive design means and why it matters for a Nigerian business whose customers
mostly browse on phones.
2. Add the viewport meta tag to an HTML page and describe what changes on a phone without it.
3. Explain mobile-first thinking and describe the difference between starting with mobile styles and starting with desktop
styles.
4. Choose correctly between fixed units ( px ) and relative units ( % , rem , em , vw , vh ) for a given property, and justify
the choice.
5. Make images and containers fluid using max-width: 100% , width: 90% and max-width on wrappers.
6. Write a media query using min-width and max-width , and name the common breakpoints (360px, 768px, 1024px).
7. Build a responsive navigation bar that changes from a row on desktop to a stacked menu on a phone.
8. Build a responsive card grid that goes from three columns on desktop to one column on a phone.
9. Test a layout using the Chrome DevTools device toolbar and interpret what they see.
10. Diagnose three common responsive problems — horizontal scroll, text too small, images overflowing — and describe the
fix for each.

## C. Required Materials
<!-- kind:materials -->
Hardware
One computer per learner (academy desktops). A shared computer between two learners is acceptable; pair them so one
types and one checks the screen, then swap halfway.
Instructor computer connected to a projector or large screen.
Optional: one smartphone or tablet for the real-device test at the end.
Software
Google Chrome (any recent version). The device toolbar (also called device mode) described here is present in all modern
Chrome versions.
Visual Studio Code (VS Code). Any version from 2022 onwards works.
Windows 10 or Windows 11.
Accounts
None required. All work this session is offline.
Sample files
The adaeze-fashion folder from Session 5, containing index.html , css/style.css and an images/ folder. The instructor
prepares a copy of the Session 5 result in case a learner did not complete it.
Worksheets
Worksheet 6.1 — "Mobile or Desktop First?" (printed, 1 page).
Worksheet 6.2 — "Breakpoint Planner" (in the learner workbook, Part 3).
Tools
Chrome DevTools → device toolbar ( Ctrl + Shift + M ). This session depends on it.
Internet
Not required for this session. If the academy has internet, the instructor may optionally show one well-known responsive
site (for example a bank or e-commerce site) resized in the device toolbar, but do not depend on it.
Alternative for learners who lack a facility
Any laptop with Chrome and VS Code works. Learners with only a phone can pair with a desktop user and later test their
own work on the academy smartphone.

## D. OPENING ACTIVITY (6 minutes)
<!-- kind:opening -->
Instructor setup: On the projector, open the Adaeze's Fashion homepage from Session 5 — the one with a purple top bar and a
three-column card grid. Then slowly drag the browser window narrower, as if it were a phone screen. The top bar's menu wraps
awkwardly, the three cards squash into unreadable slivers, and a horizontal scrollbar may appear at the bottom.
What the instructor says:
"Look at this. On the big screen it was beautiful. But watch what happens when I make the window narrow — like a
phone. [Drag it narrow.] The menu breaks. The cards flatten. You cannot read it. And remember: most people in Nigeria
who visit a business website are on a phone, not a laptop. So a website that only looks good on a laptop is a website that
loses most of its customers.
Today we fix this. Today we learn responsive design — building one website that looks good on every screen, big or small."
Expected learner response: Learners will visibly see the layout breaking. Some may suggest "make two separate websites" —
accept the idea and gently explain that responsive design lets one website serve everyone, which is cheaper and easier to
update.
Then demonstrate the hook: Press Ctrl + Shift + M in Chrome to open the device toolbar, and choose "iPhone SE" (or set a
custom width of 375px). Say:
"This little button turns Chrome into a phone simulator. From now on, every page you build, you will check here — on a
phone view — before you call it finished. This is how professionals test. Let us begin."
Why this opener works: It turns an abstract idea ("responsive") into a visible, painful problem the learner can see in ten
seconds, and it immediately gives them the tool (device toolbar) they will use all session.

## E. PREREQUISITE REVIEW (7 minutes)
<!-- kind:prereq_review -->
Run this as an oral round-robin. Put the six questions on the projector.
Question 1: "What two CSS properties would I put on a container to make its children sit in a row?"
Expected answer: display: flex; (and optionally gap ). Accept Grid with display: grid; grid-template-columns: ... .
Common gap: learners write flex: 1 on the parent. Restate: display: flex goes on the parent.
Question 2: "What does justify-content: space-between do?"
Expected answer: it spaces flex items along the main axis, pushing the first item to the start and the last to the end.
Common gap: confusing it with align-items . Remind them: main axis vs cross axis.
Question 3: "Why do we put * { box-sizing: border-box; } at the top of our CSS?"
Expected answer: so that width includes padding and border, making box sizes predictable.
Common gap: "I forgot." Reassure them it is easy to add and it will matter today when sizing changes by screen.
Question 4: "What is max-width and how is it different from width ?"
Expected answer: max-width sets an upper limit — the element can be narrower but never wider. width sets a fixed size.
Common gap: thinking they do the same thing. Clarify: max-width shrinks, width does not.
Question 5: "What unit makes an element a percentage of its parent's width?"
Expected answer: the % (percentage) unit.
Common gap: writing % after a space, or forgetting that % is relative to the parent, not the screen.
Question 6: "If I want an element to be as tall as the whole browser window, what unit might I use?"
Expected answer: vh (viewport height), e.g. height: 100vh; .
Common gap: confusing vh with % . Remind them: viewport units relate to the screen; percentages relate to the parent.
Bridge to today (say this):
"Every layout we built last session used fixed ideas — a row here, three columns there — as if everyone had the same
screen. Today we make those layouts think. We tell the browser: if the screen is small, do this; if it is big, do that. That way
one website welcomes the person on a ₦20,000 phone and the person on a big office monitor."
If more than a third of the class cannot answer Question 1, spend 10 extra minutes on Appendix 6A before continuing.

## F. Full Lecture Notes
<!-- kind:lecture -->
F.1 What responsive design is, and why it matters
The idea. Responsive design means building one website that automatically adapts its layout to the size of the screen it is
viewed on.
Plain-English definition. Instead of making a separate "phone website" and a "laptop website", you build one website whose
layout rearranges itself: three product cards side by side on a big screen, one card per row on a small phone.
Why it exists. People browse the web on many different devices — small phones, large phones, tablets, laptops, big desktop
monitors. If a site is built for one size only, it looks broken on the others. Responsive design solves this once for everyone.
Why it matters in Nigeria specifically. For many small businesses and their customers, the phone is the main way people get
online. A customer in Port Harcourt might search for a fashion designer on a phone while on the go. If Adaeze's website is hard
to read or navigate on that phone, the customer simply leaves. Responsive design is therefore not a "nice to have" — it is how a
small business keeps the customers it already has.
What the learner recognises. A website is responsive if, when you drag the browser window narrower:
the text rewraps instead of being cut off,
the layout changes shape (columns become rows, menus stack),
images shrink instead of overflowing,
no horizontal scrollbar appears.
Analogy. Think of a locust (okro) that adjusts to the pot. The ingredient is the same, but it spreads to fill whatever pot you
cook it in. A responsive website is the same content spread to fit any screen.
Misconception. "Responsive design is only for phones." It is for all sizes — big monitors included. It is about adapting, not
about mobile only.
Limitation. Responsive design cannot fix bad content. If an image is too large a file, or the text is confusing, responsiveness only
makes those problems fit the screen neatly — it does not solve them.
F.2 The viewport meta tag — the one line that changes everything
The idea. Before any media query can work properly, the browser on a phone needs to be told to use the phone's real screen
width.
Plain-English definition. The viewport is the visible area of a webpage on a device. The viewport meta tag is a line in the
<head> that tells the phone browser: "use the actual device width as the page width, and do not zoom out."
Why it exists. Early phones tried to show full desktop pages by pretending to be about 980px wide and shrinking everything.
The result was tiny unreadable text that the user had to pinch-zoom. The viewport meta tag tells the phone to stop pretending.
The line to add (always, in the <head> ):
```text
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
What each part means:
width=device-width — make the page as wide as the device's real screen.
initial-scale=1.0 — start at 1× zoom (100%), not zoomed out.
Worked example — before and after:
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <!-- without the viewport line, phones zoom the page out and text looks tiny -->
  <title>Adaeze's Fashion</title>
</head>
<body>
  <h1>Adaeze's Fashion</h1>
  <p>Custom clothing in Port Harcourt.</p>
</body>
</html>
```
Expected browser result on a phone (or the device toolbar): The page looks like a shrunken desktop — the heading is very
small and there is empty space on the right, because the phone assumed a ~980px page and shrank it to fit.
Now add the viewport line:
```text
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
Expected result after adding it: The heading fills the screen width at a comfortable, readable size. Now media queries will fire
at the correct widths, because the page width equals the device width.
Misconception. "The viewport tag makes my site responsive by itself." It does not — it is the prerequisite. Without it, your
media queries do not behave as expected on phones. With it, your layout is ready to be made responsive.
Limitation. The viewport tag does nothing to the layout by itself. It only sets the stage. The actual adapting is done by fluid
sizing (F.4) and media queries (F.6).
F.3 Mobile-first thinking
The idea. Write the styles for the small screen first, then add styles for larger screens as the screen grows.
Plain-English definition. Mobile-first means your base CSS targets phones (or, more precisely, the smallest layout), and then
you layer on extra rules for tablets and desktops using min-width media queries.
Why it exists. If you design for desktop first, you end up writing complicated overrides to undo desktop styles for phones —
often fighting your own CSS. Starting small and adding up is simpler, and it forces you to prioritise what really matters
(content), because a phone screen has no room for clutter.
Two ways to think about it:
Approach Base styles describe… Media queries use… Tendency
Mobile-first (recommended) the phone layout (simple,
one column)
min-width — "when the screen is at least
this wide, add…"
grows
outward
Approach Base styles describe… Media queries use… Tendency
Desktop-first (older) the desktop layout (wide,
multi-column)
max-width — "when the screen is this
narrow, change…"
shrinks
inward
Say this to the class:
"Mobile-first is like packing for a small bag first: you take only what you truly need. Then, if you get a bigger bag, you add
more. If you pack for the biggest bag first and then must fit everything into a small bag, you are forced to throw things out
— that is what writing desktop-first CSS feels like."
Worked example — mobile-first in practice:
```text
/* Base = phone layout: cards stack in one column */
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
```
```text
/* Tablet and up: two columns */
@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
```
```text
/* Desktop and up: three columns */
@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
```
Expected browser result: On a phone, one card per row. Widen the window past 768px and the cards jump to two per row.
Widen past 1024px and they become three per row. The code only ever adds; it never undoes.
Misconception. "Mobile-first means the site only targets phones." No — the name describes the order in which you write CSS,
not a limit on devices. The site still looks great on desktop; you simply built up to it.
Limitation. Mobile-first works best when your design genuinely starts from content. For a course this is ideal; but be aware that
some very complex older projects are still maintained desktop-first, and you will meet both styles in the wild.
F.4 Relative units versus fixed pixels
The idea. Instead of hard-coding sizes in pixels, use units that scale with the screen, the parent, or the root font size.
Plain-English definition. A fixed unit ( px ) always means the same size. A relative unit is measured in relation to something
else — the parent, the screen, or the base font.
Why it exists. A 600px container is fine on a laptop and overflowing on a phone. Relative units let the same rule shrink
gracefully.
The units you need this week:
Unit Relative to… Example When to use it
```text
px
```
Nothing — fixed
```text
border: 2px solid;
```
Small fixed details: borders, thin lines
```text
%
```
The parent element's width
```text
width: 90%;
```
Container widths, columns
```text
rem
```
The root font size (usually 16px)
```text
font-size: 1.5rem;
```
Font sizes and spacing — predictable and accessible
```text
em
```
The parent's font size
```text
padding: 1.5em;
```
Spacing relative to the current text size
```text
vw
```
1% of the viewport (screen) width
```text
width: 100vw;
```
Full-width sections (use carefully)
Unit Relative to… Example When to use it
```text
vh
```
1% of the viewport height
```text
min-height: 100vh;
```
Full-screen hero areas
The base font size trick: the browser default root font size is 16px. So 1rem = 16px , 1.5rem = 24px , 2rem = 32px . If a user has
set a larger default font for accessibility, rem respects that — another reason rem is kinder than fixed px for text.
Worked example — the same layout, fixed versus fluid:
```text
/* Fixed — breaks on small screens */
.fixed-hero {
  width: 960px;
  padding: 40px;
  font-size: 48px;
}
```
```text
/* Fluid — adapts everywhere */
.fluid-hero {
  width: 90%;
  max-width: 960px;
  padding: 2rem;
  font-size: clamp(1.6rem, 5vw, 3rem);
}
```
Expected browser result: On a 320px phone, .fixed-hero is 960px wide and overflows the screen badly (horizontal scrollbar),
with huge text. .fluid-hero is 90% of the screen (about 288px), has comfortable padding, and its heading scales to a readable
size between roughly 26px and 48px. On a wide desktop, both end up around 960px — but only the fluid one behaves at both
extremes.
A note on clamp() . clamp(minimum, preferred, maximum) is a modern way to make a value fluid. clamp(1.6rem, 5vw, 3rem) means
"never smaller than 1.6rem, ideally 5% of the screen width, never bigger than 3rem". It is a neat one-line solution for responsive
font sizes. If it feels advanced, remember it, but you can also simply override font sizes inside media queries.
Misconception. "Percentages are always better than pixels." Not always. Borders, thin dividers and small icons are fine in px
because you do not want them changing size. The skill is choosing, not avoiding pixels.
Limitation. vw can cause overflow if you also add padding or borders, because 100vw includes the scrollbar width on some
systems and ignores padding. Prefer width: 100% for full-width elements; use viewport units mainly for heights and fluid font
sizes.
F.5 Fluid images and containers
The idea. Images are the most common cause of a broken mobile layout. One simple rule tames them.
Plain-English definition. A fluid image is one that never grows wider than its container but keeps its proportions.
Why it exists. Photos are often saved at desktop size (say 1200px wide). On a 360px phone, a 1200px photo overflows and
creates a horizontal scrollbar — the classic "broken mobile site" symptom.
The two-line fix (put it near the top of every stylesheet):
```text
img {
  max-width: 100%;
  height: auto;
}
```
What each line does:
max-width: 100% — the image may be smaller than its container but never wider. So it shrinks to fit a phone.
height: auto — keep the height proportional as the width shrinks, so the image is not stretched or squashed.
Worked example — image overflow, fixed:
```text
<div class="product">
  <img src="images/ankara-dress.jpg" alt="Ankara dress made by Adaeze's Fashion">
```
```text
  <h3>Ankara Dress</h3>
</div>
```
```text
/* Without this rule the image may overflow */
.product img {
  max-width: 100%;
  height: auto;
  display: block;
}
```
Expected browser result: On a wide screen the dress photo is large; on a narrow phone it shrinks to fit the card width, keeping
its shape. No horizontal scrollbar. The display: block; also removes the small gap that inline images leave underneath (because
they sit on the text baseline).
Fluid containers (wrappers). The same idea applies to the whole content area:
```text
.container {
  width: 90%;            /* 90% of the parent, leaves breathing space */
  max-width: 1100px;     /* but never wider than 1100px on huge screens */
  margin: 0 auto;        /* centres the container */
  padding: 0 16px;       /* small side padding on phones */
}
```
Expected browser result: On a phone, the container is 90% of the screen with 16px inner padding, so text does not touch the
edges. On a large monitor, it stops growing at 1100px and sits centred, so lines do not become uncomfortably long to read.
Misconception. " max-width: 100% makes the image blurry." It does not. It scales the same image down; blurriness comes from
scaling a small image up, which this rule never does.
Limitation. max-width: 100% fixes overflow but not file size. A 5 MB photo is still slow to load on a phone even if it fits.
Optimising image file size is covered in Session 11.
F.6 Media queries — telling the browser "when screen is this wide, do this"
The idea. A media query is a block of CSS that only applies when a condition is true — usually a condition about the screen
width.
Plain-English definition. A media query is an "if" statement for CSS. It says: if the screen is at least (or at most) a certain width,
apply these rules.
Why it exists. Some changes cannot be done with fluid units alone. For example, "when there is room, show the menu as a row;
when there is not, stack it" needs an explicit condition. Media queries provide that condition.
The syntax:
```text
@media (min-width: 768px) {
  /* rules in here apply only when the screen is 768px wide OR WIDER */
}
```
```text
@media (max-width: 767px) {
  /* rules in here apply only when the screen is 767px wide OR NARROWER */
}
```
Reading it aloud: "at media, minimum width 768 pixels" = "when the viewport is at least 768px wide". "at media, maximum
width 767 pixels" = "when the viewport is at most 767px wide".
Common breakpoints and what they represent:
Breakpoint Typical device Meaning
0 – 479px Older/small phones Narrowest layouts
480 – 767px Most modern phones (e.g. ~360–430px wide) One column, stacked menu
768 – 1023px Tablets Two columns, roomier
Breakpoint Typical device Meaning
1024px and up Laptops and desktops Three columns, horizontal menu
Why 360px, 768px and 1024px? These are widely used device sizes: many Android phones report a CSS width near 360px,
tablets near 768px, and laptops/desktops from 1024px upward. They are guidelines, not strict laws — the best breakpoint is
wherever your layout starts to look cramped.
Say this to the class:
"Do not create a media query for every phone on earth. Choose two or three breakpoints where your layout needs to
change, and use those. A phone, a tablet and a desktop is enough for our project."
Worked example — a responsive card grid (mobile-first):
```text
.cards {
  display: grid;
  grid-template-columns: 1fr;      /* phone: one column */
  gap: 16px;
}
```
```text
@media (min-width: 768px) {         /* tablet and up */
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
```
```text
@media (min-width: 1024px) {        /* desktop and up */
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
```
Expected browser result: Resize the window slowly and watch the cards reflow: one per row, then two, then three. This is the
exact behaviour of professional e-commerce sites.
Misconception. "Media queries must be in a separate file." They can be, but most beginners keep them at the bottom of the
same stylesheet, after the base styles. There they override earlier rules of equal specificity, which is exactly what we want.
Limitation. Media queries only respond to the viewport size, not to the size of a parent container. (Advanced "container queries"
exist but are beyond this course.) For our 3–5 page business site, viewport-based media queries are more than enough.
F.7 Building a responsive navigation bar
The idea. The navigation bar is the most important responsive element — if the menu is broken, the whole site feels broken.
The pattern: On desktop, show the logo and the menu links in one horizontal row. On a phone, stack the links vertically (or
centre them) so they are easy to tap with a thumb.
Worked example:
```text
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;                 /* let the menu drop below the logo if needed */
  background-color: #4b2e83;
  padding: 14px 24px;
}
.logo { color: #f4c542; font-size: 22px; font-weight: bold; text-decoration: none; }
.topbar nav {
  display: flex;
  gap: 24px;
}
.topbar nav a { color: white; text-decoration: none; padding: 6px 4px; }
```
```text
/* Phone: stack the menu, centre it, and give links room to tap */
```
```text
@media (max-width: 767px) {
  .topbar {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .topbar nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
  }
}
```
Expected browser result: On a wide desktop, the gold logo sits left and the four white links sit right. On a phone (device
toolbar at 375px), the top bar becomes a centred column: the logo on top, then the four links wrapped and centred beneath it,
each with comfortable padding so a thumb can tap them. Nothing overflows.
Why padding on the links matters on mobile: fingers are less precise than a mouse. Adding padding increases the tap area,
which is one of the simplest accessibility wins available.
A note on hamburger menus. A "hamburger menu" (the three-line icon) that opens and closes needs either JavaScript (Session
10) or a CSS-only checkbox trick (advanced). For this course, a stacked, centred menu is a perfectly professional mobile
solution and needs no JavaScript. We revisit the hamburger in Session 10.
Misconception. "If I just use Flexbox with flex-wrap , I do not need a media query." Sometimes true — but a media query gives
you deliberate control (like centring the stacked menu) rather than leaving the wrap to chance.
F.8 Testing with the Chrome DevTools device toolbar
The idea. Chrome can pretend to be a phone so you can test without owning one.
How to open it:
1. Open your page in Chrome.
2. Press F12 (or right-click → Inspect).
3. Click the Toggle device toolbar icon (a small phone/tablet icon at the top-left of the DevTools panel), or press Ctrl + Shift
+ M .
4. The page view becomes a device simulator. A dropdown at the top lets you choose a device (e.g. iPhone SE, iPhone 12 Pro,
Pixel, iPad) or Responsive (where you can drag the width freely).
5. Drag the handle on the right edge of the page to change the width, or type a width in the box.
What to look for while testing:
A horizontal scrollbar at the bottom → something is too wide (often a fixed-width element or an image without max-width:
100% ).
Text that is too small to read → likely a missing viewport meta tag or hard-coded tiny fonts.
A menu that overlaps the logo or wraps badly → navigation needs a media query.
Cards that squash into thin slivers instead of stacking → the grid needs a mobile column rule.
Worked example — the test routine (do this for every page):
1. Open the page in Chrome.
2. Ctrl + Shift + M to open device mode.
3. Set the width to 360px (a common small phone). Check: no horizontal scroll; text readable; menu stacked.
4. Set the width to 768px (tablet). Check: layout has more room; two columns if expected.
5. Set the width to 1280px (desktop). Check: three columns; horizontal menu.
6. If the academy has a real phone, open the page on it as the final confirmation.
Expected browser result: By the end, the page looks correct and intentional at 360px, 768px and 1280px, with no horizontal
scrollbar at any width.
Misconception. "If it looks good in the device toolbar, it is definitely fine on real phones." The toolbar is an excellent estimate,
but real devices differ in fonts, pixel density and browser behaviour. Use both when possible.
Limitation. The device toolbar changes the rendered viewport, not the network speed or the actual touch input. It cannot tell
you whether the site is slow to load, and it cannot truly test finger taps.
F.9 Putting it together — a fully responsive small page
Bring everything from this session into one place.
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adaeze's Fashion — Shop</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <header class="topbar">
    <a href="index.html" class="logo">Adaeze's Fashion</a>
    <nav>
      <a href="index.html">Home</a>
      <a href="shop.html">Shop</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>
```
```text
  <main class="container">
    <h1>Our Collection</h1>
    <section class="cards">
      <article class="card"><img src="images/dress1.jpg" alt="Ankara dress"><h3>Ankara Dress</h3><p>₦18,500</p></article>
      <article class="card"><img src="images/dress2.jpg" alt="Lace gown"><h3>Lace Gown</h3><p>₦32,000</p></article>
      <article class="card"><img src="images/dress3.jpg" alt="Aso ebi set"><h3>Aso Ebi Set</h3><p>₦27,500</p></article>
    </section>
  </main>
</body>
</html>
```
```text
* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; color: #222; }
```
```text
img { max-width: 100%; height: auto; display: block; }
```
```text
.container { width: 90%; max-width: 1100px; margin: 0 auto; padding: 0 16px; }
```
```text
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #4b2e83;
  padding: 14px 24px;
}
.logo { color: #f4c542; font-size: 22px; font-weight: bold; text-decoration: none; }
.topbar nav { display: flex; gap: 24px; }
.topbar nav a { color: white; text-decoration: none; padding: 6px 4px; }
```
```text
.cards {
  display: grid;
  grid-template-columns: 1fr;         /* phone default */
  gap: 16px;
  margin-bottom: 40px;
}
.card { border: 1px solid #e0d7f0; border-radius: 10px; overflow: hidden; }
.card h3 { margin: 12px 16px 4px; color: #4b2e83; }
.card p  { margin: 0 16px 16px; color: #b8860b; font-weight: bold; }
```
```text
@media (min-width: 768px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}
```
```text
@media (min-width: 1024px) {
  .cards { grid-template-columns: repeat(3, 1fr); }
}
```
```text
@media (max-width: 767px) {
  .topbar { flex-direction: column; align-items: center; gap: 12px; }
  .topbar nav { flex-wrap: wrap; justify-content: center; gap: 14px; }
  h1 { font-size: 1.6rem; }
}
```
Expected browser result:
Phone (360px): purple bar stacked (logo on top, centred menu below), heading of a comfortable size, one product card per
row, no horizontal scrollbar.
Tablet (768px): menu returns to a row, cards two per row.
Desktop (1280px): full horizontal bar, cards three per row, container centred at max 1100px.
Misconception. "I need to write everything twice, once for mobile and once for desktop." No — most rules are written once
(the base), and only the things that must change are repeated inside media queries.
F.10 Summary of the session
Responsive design = one website that adapts to every screen size.
Always add the viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1.0"> .
Mobile-first = write the small-screen styles first, then add larger-screen styles with min-width media queries.
Prefer relative units ( % , rem , em , vw , vh ) for sizes that should adapt; keep px for small fixed details.
Make images fluid with img { max-width: 100%; height: auto; } .
Media queries apply CSS conditionally: @media (min-width: 768px) { ... } .
Common breakpoints: 360px, 768px, 1024px — guidelines, not laws.
Test every page with the Chrome device toolbar ( Ctrl + Shift + M ) at 360px, 768px and 1280px.

## G. INSTRUCTOR DEMONSTRATION (15 minutes)
<!-- kind:demo -->
G.1 What the instructor prepares
A folder: demo-webdesign/week2-responsive/ with index.html , css/style.css and an images/ folder.
Chrome open to the page, DevTools closed at the start.
The projector showing Chrome.
G.2 Demonstration 1 — the viewport tag and the "tiny text" problem (5 minutes)
Say: "I will show you the single most common mobile mistake."
1. Open index.html without a viewport meta tag. Press Ctrl + Shift + M and set the width to 375px.
2. Point out that the text is tiny and the content is squeezed into the left portion, with blank space to the right — because the
phone thinks the page is ~980px.
3. Add the viewport line to the <head> :
```text
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
4. Save, and click the device-toolbar refresh. The text jumps to a normal, readable size filling the width.
Ask: "What changed?" → The page now uses the device's real width, so the layout and media queries behave correctly.
Deliberately inject an error: Change width=device-width to width=960 . Refresh in device mode. The text shrinks again. Say: "If
you get this value wrong, you are back to a tiny desktop page on a phone." Restore it.
G.3 Demonstration 2 — making the navigation responsive (5 minutes)
Say: "Now let us make the menu behave on a phone."
1. Show the Session 5 top bar on desktop (logo left, four links right).
2. Open device mode at 375px. Point out that the links may crowd or wrap badly.
3. Add the mobile media query from F.7 (stack and centre the menu).
4. Save. In device mode, the menu is now a neat centred column; switch back to desktop width and the row returns.
Ask: "Why did we add padding to the menu links?" → To make them easier to tap with a thumb.
Deliberately inject an error: Add flex-direction: column; to .topbar outside the media query (so it also affects desktop) and
refresh at desktop width. The whole bar stacks on desktop too — wrong. Ask the class how to fix it: move it inside the @media
(max-width: 767px) block. Do so.
G.4 Demonstration 3 — the responsive card grid and device testing (5 minutes)
1. Show the .cards grid with grid-template-columns: 1fr; as the base.
2. Add the two min-width media queries (768px → 2 columns, 1024px → 3 columns).
3. Save. In device mode, slowly drag the width handle from 320px up to 1300px and let the class watch the cards reflow 1 → 2
→ 3.
4. Point to the horizontal scrollbar if one appears at any width; then add img { max-width: 100%; height: auto; } to remove the
overflow, and show the scrollbar disappear.
Questions to ask during the demos:
"What unit did we use for the base card column? Why not 300px ?" → 1fr ; a fixed width would overflow on a phone.
"Which breakpoint turns the cards into three columns?" → 1024px.
"What is the fastest way to check a page on a phone size?" → Device toolbar, Ctrl + Shift + M .
G.5 Common errors to inject and correct
Injected error Expected result How to correct
Missing viewport meta tag Tiny zoomed-
out page on
phones
Add <meta name="viewport"
```text
content="width=device-width,
```
initial-scale=1.0"> .
max-width: 100% missing on an image Horizontal
scrollbar on
mobile
Add img { max-width: 100%;
height: auto; } .
Media query @media screen and (min-width 768px) (missing colon/ and ) The whole
block is
ignored
Correct syntax: @media (min-
width: 768px) .
Container width: 960px; Overflow on
phones
Replace with width: 90%; max-
width: 960px; .

## H. GUIDED PRACTICAL EXERCISE (18 minutes)
<!-- kind:guided_practical -->
Objective: With the instructor guiding step by step, learners make the Session 5 Adaeze's Fashion page responsive: add the
viewport tag, fluid images, a mobile-first card grid, and a responsive navigation bar.
Starting materials: Each learner's adaeze-fashion folder from Session 5 (with index.html and css/style.css ). The instructor
shares a Session 5 result for anyone who needs a starting point.
Procedure (instructor calls out each numbered step; learners follow; the instructor walks the room):
1. Open index.html . Confirm the <head> contains the viewport meta tag. If not, add it directly under the <meta charset="UTF-
8"> line:
```text
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```
2. In css/style.css , make sure the boxes and images are fluid. Add near the top (below the box-sizing rule):
```text
img {
  max-width: 100%;
  height: auto;
  display: block;
}
```
3. Ensure the .cards container uses a mobile-first single-column base:
```text
.cards {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}
```
4. Add the growing breakpoints at the bottom of the stylesheet:
```text
@media (min-width: 768px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
```
```text
@media (min-width: 1024px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
```
5. Add a responsive navigation rule at the bottom, after the desktop base styles:
```text
@media (max-width: 767px) {
  .topbar {
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .topbar nav {
    flex-wrap: wrap;
    justify-content: center;
    gap: 14px;
  }
}
```
6. Save ( Ctrl + S ) and refresh the browser.
7. Pause and predict: "Before I open the device toolbar — what will change at 375px compared to the full window?" Have
learners write a one-line prediction. Then test.
Expected result: At full desktop width, the page shows a horizontal top bar and three cards per row. In the device toolbar at
375px, the top bar stacks (logo on top, menu centred below), the cards appear one per row, the text is readable and there is no
horizontal scrollbar. At 768px the cards are two per row.
Points to pause on and predict:
After step 4: "At exactly 768px, how many cards per row?" → Two (the min-width: 768px query applies at 768 and above).
After step 5: "Will the desktop layout be affected by the max-width: 767px rule?" → No; it only applies below 768px.
At the end: "If a horizontal scrollbar appears, what is the first thing to check?" → An image missing max-width: 100% , or a
fixed-width element.
Troubleshooting while walking the room:
Text still tiny in device mode → viewport tag missing or misspelled.
Cards stay one per row on desktop → the min-width: 1024px query has a typo, or it is above the base rule but the base rule is
more specific.
Menu still crowded on mobile → the @media (max-width: 767px) block is missing or placed above the desktop .topbar rule
so it is overridden.
Horizontal scrollbar → add img { max-width: 100%; } , and check for any width: 960px -style fixed values.
Completion checklist (learner ticks each):
Viewport meta tag present in the <head>
img { max-width: 100%; height: auto; } present
.cards base is grid-template-columns: 1fr;
min-width: 768px query gives two columns
min-width: 1024px query gives three columns
max-width: 767px query stacks and centres the menu
Tested in the device toolbar at 360px, 768px and 1280px
No horizontal scrollbar at any of those widths

## I. INDEPENDENT CLASS EXERCISE (15 minutes)
<!-- kind:exercise -->
Task: On your own, build a responsive "About Adaeze" page with a hero banner, a short story, and a two-column "Values"
section that becomes one column on a phone.
Scenario: Adaeze wants an About page with:
A hero section containing the heading "Our Story" and a one-line tagline.
A paragraph telling her story (write 3–4 sentences yourself).
A Values section with three value cards: Quality, Affordability and Style, each with a one-line description.
The same purple top bar with a responsive menu.
Starting information (given):
Brand colours: deep purple #4b2e83 , gold #f4c542 .
Tagline: "Handmade in Port Harcourt, designed for you."
Values descriptions:
1. Quality — "Every stitch is checked before it leaves our shop."
2. Affordability — "Beautiful clothing that fits a real budget."
3. Style — "Modern designs that celebrate Nigerian fabrics."
Requirements:
1. Create about.html and link css/style.css .
2. Add the viewport meta tag.
3. Build the responsive top bar (same as the practical).
4. Build a hero section with an <h1> , a tagline <p> , comfortable padding, and a background colour.
5. Build a .values section using Grid. It must show three columns on desktop, two on tablet, and one on a phone using
mobile-first min-width media queries.
6. Make sure any images (use one placeholder or your own) are fluid with max-width: 100% .
7. Test in the device toolbar at 360px, 768px and 1280px.
Constraints:
Mobile-first: the base .values rule must be one column; add columns upward with min-width .
Use relative units for widths and font sizes where sensible; do not fix the container at 1000px .
No horizontal scrollbar at any width.
Time allowance: 15 minutes.
Success criteria:
One column at 360px, two at 768px, three at 1280px.
The menu stacks and centres on the phone view.
Text is readable at every width; no overflow.
Hints available if stuck:
Hint 1: Start with .values { grid-template-columns: 1fr; } , then a min-width: 600px query for two columns and a min-width:
1024px query for three.
Hint 2: The viewport tag goes in the <head> , not the <body> .
Hint 3: If the menu does not stack, your @media (max-width: 767px) block may be above the desktop .topbar rule — move it
to the bottom.
Instructor answer key (do not show learners):
```text
* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; color: #222; }
img { max-width: 100%; height: auto; display: block; }
```
```text
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #4b2e83;
  padding: 14px 24px;
}
.logo { color: #f4c542; font-size: 22px; font-weight: bold; text-decoration: none; }
.topbar nav { display: flex; gap: 24px; }
.topbar nav a { color: white; text-decoration: none; padding: 6px 4px; }
```
```text
.hero {
  background-color: #f3ecfb;
  padding: 3rem 1rem;
  text-align: center;
}
.hero h1 { color: #4b2e83; margin: 0 0 0.5rem; font-size: clamp(1.8rem, 5vw, 3rem); }
.hero p { margin: 0; color: #555; }
```
```text
.container { width: 90%; max-width: 1100px; margin: 0 auto; padding: 2rem 0; }
```
```text
.values {
  display: grid;
  grid-template-columns: 1fr;   /* phone default */
  gap: 20px;
}
.value-card {
  padding: 20px;
  border: 1px solid #e0d7f0;
  border-radius: 10px;
  background-color: #faf7ff;
}
.value-card h3 { color: #4b2e83; margin-top: 0; }
```
```text
@media (min-width: 600px) {
  .values { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .values { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 767px) {
  .topbar { flex-direction: column; align-items: center; gap: 12px; }
  .topbar nav { flex-wrap: wrap; justify-content: center; gap: 14px; }
}
```
```text
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adaeze's Fashion — About</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
```
```text
  <header class="topbar">
    <a href="index.html" class="logo">Adaeze's Fashion</a>
    <nav>
      <a href="index.html">Home</a>
      <a href="shop.html">Shop</a>
      <a href="about.html">About</a>
      <a href="contact.html">Contact</a>
    </nav>
  </header>
```
```text
  <section class="hero">
    <h1>Our Story</h1>
    <p>Handmade in Port Harcourt, designed for you.</p>
  </section>
```
```text
  <main class="container">
    <p>Adaeze started with one sewing machine and a big dream. Today her small
    workshop dresses customers across Rivers State. Every outfit is cut,
    sewn and finished by hand, with care for the person who will wear it.</p>
```
```text
    <section class="values">
      <div class="value-card">
        <h3>Quality</h3>
        <p>Every stitch is checked before it leaves our shop.</p>
      </div>
      <div class="value-card">
        <h3>Affordability</h3>
        <p>Beautiful clothing that fits a real budget.</p>
      </div>
      <div class="value-card">
        <h3>Style</h3>
        <p>Modern designs that celebrate Nigerian fabrics.</p>
      </div>
    </section>
  </main>
</body>
</html>
```
Marking guidance (out of 10):
Viewport meta tag present (1)
Responsive top bar works (2)
.values base is one column, mobile-first (2)
Two-column query at ≥600px, three-column at ≥1024px (2)
Fluid images / no overflow (1)
Readable hero with sensible relative sizing (1)
Tested at three widths, no horizontal scroll (1)

## J. Real-World Case Study
<!-- kind:case_study -->
Situation. Chinedu runs a small phones-and-accessories shop in Port Harcourt. He pays a developer ₦180,000 for a website. It
looks impressive on the developer's big laptop. But almost all of Chinedu's customers find him through a phone. When they
open the site on their phones, the page loads as a tiny desktop page, the "Buy" button is impossible to tap, and the product
photos spill off the side. Customers message him saying "your site is not working on phone", and sales through the site stay
near zero.
Relevant facts.
The website has correct content and looks fine on a desktop.
The customers almost always use phones.
The developer never added a viewport meta tag and used fixed width: 1000px layouts with full-size images.
Decision point. What are the highest-value fixes, in order?
Possible approaches.
1. Tell customers to use a laptop. (Not realistic.)
2. Pay for a whole new website.
3. Fix the existing site to be responsive: add the viewport tag, fluid images and a mobile-first layout with media queries.
Recommended solution (for this stage). Approach 3. The content is fine; only the layout needs to adapt. Adding the viewport
meta tag, img { max-width: 100%; } , mobile-first media queries and a stacked menu can transform the experience for phone
users, usually for a fraction of a rebuild.
Trade-offs.
Approach 1 ignores how customers actually behave.
Approach 2 is expensive and unnecessary; the content is already good.
Approach 3 takes a short, focused effort and directly targets the customers who matter most.
Professional connection. Freelance web designers in Nigeria win repeat clients by fixing exactly this problem. A designer who
can take a broken desktop-only site and make it shine on a ₦20,000 Android phone is delivering measurable business value —
more orders, fewer complaints.

## K. Common Mistakes and Troubleshooting
<!-- kind:troubleshooting -->
Use this table as the session's live troubleshooting guide. When a learner hits an issue, ask them to check the relevant row before
giving the answer.
K.1 Horizontal scrollbar appears on mobile
Symptoms: A scrollbar at the bottom of the page; content runs off the right edge. Likely causes: (a) a fixed-width element (e.g.
width: 1000px ); (b) an image without max-width: 100% ; (c) a very long unbroken word or URL; (d) a negative margin. How to
investigate: In device mode, scroll right to find which element is cut off. In DevTools → Elements, hover elements to see whose
box extends past the viewport. Safe corrective steps: Replace fixed widths with max-width + % ; add img { max-width: 100%; } ;
test again. How to confirm resolved: The scrollbar disappears at 360px. How to prevent recurrence: Prefer fluid units for
containers and always make images fluid.
K.2 Text looks tiny on a phone
Symptoms: The page appears as a shrunken desktop page; text is hard to read. Likely cause: Missing or incorrect viewport meta
tag. How to investigate: Look in the <head> for <meta name="viewport" ...> . Safe corrective steps: Add <meta name="viewport"
content="width=device-width, initial-scale=1.0"> . How to confirm resolved: Text fills the phone width at a readable size. How to
prevent recurrence: Put the viewport tag in every page's <head> from the start.
K.3 Media query seems to do nothing
Symptoms: A @media block has no visible effect. Likely causes: (a) syntax error (missing colon, missing and ); (b) the query is
placed above the rule it should override, so it loses the cascade; (c) the values inside are less specific or overridden. How to
investigate: In DevTools, check whether the rule appears (and is not greyed out) when you resize. Inspect the computed styles.
Safe corrective steps: Fix the syntax; move media queries to the bottom of the stylesheet; use consistent selectors. How to
confirm resolved: The rule visibly applies at the intended width. How to prevent recurrence: Keep all media queries together
at the end of the file.
K.4 Page overflows even though max-width: 100% is set
Symptoms: An image or box still overflows on mobile. Likely cause: A child element (or padding) is wider than the parent, or
the image is inside a fixed-width wrapper. How to investigate: In DevTools, drag the width and hover to find the offender; add
a temporary outline: 1px solid red; to suspect elements. Safe corrective steps: Make the wrapper fluid too; check for
padding that pushes past 100% (remember box-sizing: border-box helps here). How to confirm resolved: The overflow and
scrollbar are gone.
K.5 Layout is great on desktop but ugly on tablet
Symptoms: At ~768px the layout is neither the phone one nor the desktop one; it looks awkward. Likely cause: A missing tablet
breakpoint. How to investigate: Test at 768px in device mode and note what is cramped. Safe corrective steps: Add a min-
width: 768px (or 600px ) query with an intermediate layout. How to confirm resolved: The layout looks intentional at 768px.
How to prevent recurrence: Plan three widths from the start: phone, tablet, desktop.
K.6 Everything works but the menu overlaps the logo
Symptoms: Menu links sit on top of the logo on narrow screens. Likely cause: The top bar has no wrapping or stacking rule for
small screens. Safe corrective steps: Add flex-wrap: wrap; and a mobile @media (max-width: 767px) rule that sets flex-
direction: column . How to confirm resolved: On a phone the logo is on its own line with the menu beneath.
Distinguish likely vs confirmed: In every case, confirm the cause before fixing — check the actual element in DevTools (its
computed width, its position) rather than guessing.

## L. Session Assignment
<!-- kind:assignment -->
Assignment title: "My Responsive Business Page"
Purpose: Practise making a page adapt from phone to desktop using the viewport tag, relative units, fluid images and media
queries.
Realistic scenario: You are building the Adaeze's Fashion shop page. Adaeze insists that it must look correct on a phone first,
because most of her customers shop from their phones.
Detailed instructions:
1. In your adaeze-fashion folder, create shop.html and link css/style.css .
2. Add the viewport meta tag.
3. Build the responsive purple top bar (stacked and centred on phones).
4. Build a Shop section with at least six product cards (image, name and naira price). Use your own placeholder images or
simple coloured boxes if images are not ready.
5. Style the cards mobile-first:
base: one column,
min-width: 768px : two columns,
min-width: 1024px : three columns.
6. Make all images fluid with max-width: 100% .
7. Add at least one fluid font-size using rem (for example, your headings should use rem , not a fixed px ).
8. Test in the Chrome device toolbar at 360px, 768px and 1280px.
Required deliverables:
```text
adaeze-fashion/shop.html
```
Updated adaeze-fashion/css/style.css
A short testing note (3–4 sentences or a small table) recording what you saw at each of the three widths.
Submission format: Files in the class shared folder; the testing note written or photographed into the workbook.
Deadline: Before Session 7.
Marking rubric (20 marks):
Criterion Marks Description of a strong answer
Viewport meta tag 2 Correctly present in the <head>
Responsive navigation 3 Horizontal on desktop, stacked and centred on phones
Mobile-first grid 4 One column base, two at 768px, three at 1024px
Fluid images 3 max-width: 100% ; no overflow at 360px
Relative units used 3 Widths and at least one font size use % / rem
Testing note 2 Clear record of the three widths tested
Criterion Marks Description of a strong answer
No horizontal scroll 2 Clean at 360px, 768px and 1280px
Code quality 1 Indented, readable, media queries grouped at the end
Common mistakes to avoid: forgetting the viewport tag; compiling desktop-first and then fighting overrides; leaving a fixed
width on the container; forgetting to make images fluid; putting media queries above the rules they should override.
Instructor reference solution:
```text
* { box-sizing: border-box; }
body { margin: 0; font-family: Arial, sans-serif; color: #222; }
img { max-width: 100%; height: auto; display: block; }
```
```text
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background-color: #4b2e83;
  padding: 14px 24px;
}
.logo { color: #f4c542; font-size: 1.4rem; font-weight: bold; text-decoration: none; }
.topbar nav { display: flex; gap: 24px; }
.topbar nav a { color: white; text-decoration: none; padding: 6px 4px; }
```
```text
.container { width: 90%; max-width: 1100px; margin: 0 auto; padding: 0 16px; }
h1 { color: #4b2e83; font-size: 2rem; }
```
```text
.shop {
  display: grid;
  grid-template-columns: 1fr;      /* phone */
  gap: 16px;
  margin: 24px 0 40px;
}
.product { border: 1px solid #e0d7f0; border-radius: 10px; overflow: hidden; }
.product h3 { margin: 12px 16px 4px; color: #4b2e83; font-size: 1.1rem; }
.product .price { margin: 0 16px 16px; color: #b8860b; font-weight: bold; }
```
```text
@media (min-width: 768px) {
  .shop { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .shop { grid-template-columns: repeat(3, 1fr); }
}
@media (max-width: 767px) {
  .topbar { flex-direction: column; align-items: center; gap: 12px; }
  .topbar nav { flex-wrap: wrap; justify-content: center; gap: 14px; }
}
```
The testing note should look like: "At 360px — one card per row, stacked menu, no scrollbar, text readable. At 768px — two
cards per row, menu in a row. At 1280px — three cards per row, full menu, centred container."

## M. Knowledge Check
<!-- kind:knowledge_check -->
(Learner version — answers only in the Instructor Key.)
Q1. Short answer. In one sentence, what is responsive design?
Q2. Fill in the blank. The line to add to the <head> for phones is <meta name="______" content="width=device-width, initial-
scale=1.0"> .
Q3. Multiple choice. Which media query applies when the screen is 768px wide or wider? a) @media (max-width: 768px) { } b)
@media (min-width: 768px) { } c) @media (width: 768px) { } d) @media (min-device: 768px) { }
Q4. Explain in your own words. What is "mobile-first", and why can it be easier than designing desktop-first?
Q5. Practical. Write the CSS rule that makes every image shrink to fit its container while keeping its proportions.
Q6. Units. Name the unit that is relative to the root font size, and say what 1rem equals by default in most browsers.
Q7. Error detection. A learner's page shows a horizontal scrollbar on a phone. List two likely causes and the fix for each.
INSTRUCTOR ANSWER KEY (Q1–Q7)
A1. Responsive design means building one website whose layout adapts automatically to different screen sizes so it looks and
works well on phones, tablets and desktops.
A2. viewport — the full line is <meta name="viewport" content="width=device-width, initial-scale=1.0"> .
A3. (b) @media (min-width: 768px) { } .
A4. Mobile-first means writing the small-screen (phone) styles first as the base, then adding larger-screen styles with min-width
media queries. It is easier because you only ever add styles as the screen grows; desktop-first forces you to undo desktop styles
for phones, which means writing more overrides and creating more conflicts.
A5.
```text
img {
  max-width: 100%;
  height: auto;
}
```
A6. rem is relative to the root font size. By default in most browsers 1rem = 16px .
A7. Two likely causes: (a) an image without max-width: 100% → add img { max-width: 100%; height: auto; } ; (b) a fixed-width
element such as width: 1000px → replace with width: 90%; max-width: 1000px; . (Also accept: a long unbroken word/URL, or a
negative margin.)

## N. Reflection and Recap
<!-- kind:reflection -->
Plain-English summary. Today you turned a desktop-only page into one that adapts to every screen. You learned why
responsive design matters for a Nigerian business whose customers mostly use phones, added the viewport meta tag,
practised mobile-first thinking, chose between fixed and relative units, made images and containers fluid, and wrote media
queries at the common breakpoints of 360px, 768px and 1024px. You built a responsive navigation bar and a card grid, and
tested them in the Chrome device toolbar.
Five important takeaways:
1. Responsive design = one website that adapts to every screen size.
2. Always include the viewport meta tag.
3. Mobile-first: base styles for phones, then min-width queries for bigger screens.
4. img { max-width: 100%; height: auto; } prevents the classic overflow.
5. Test at 360px, 768px and 1280px — every single time.
Questions to help you recognise what you can now do:
Can I make a page go from one column on a phone to three on a desktop?
Can I explain why 1000px width is a bad idea for a container?
Can I test a page at three widths without help?
Can I fix a horizontal scrollbar on a phone?
Connection to the next session: This session ends Week 2. You can now build and lay out responsive pages. Next week we start
a real project: planning the full Adaeze's Fashion website — its purpose, pages, wireframes, content, colours and file structure —
before writing a single line of code. This is the professional planning process that saves hours later.

## O. Instructor Evaluation Notes
<!-- kind:instructor_notes -->
Observable signs of genuine competence:
The learner adds the viewport tag without being told.
The learner writes the small-screen layout first (mobile-first) rather than fighting desktop rules.
The learner uses % or max-width for containers and reserves px for small fixed details.
The learner tests at three widths and can explain what they saw.
The learner diagnoses a horizontal scrollbar and names the likely cause before fixing it.
The learner keeps media queries at the bottom of the stylesheet and explains why.
Common misconceptions to watch for and correct:
"Responsive is only for mobile." → It is for all screen sizes.
"I need a breakpoint for every device." → Two or three well-chosen breakpoints are enough.
"The viewport tag makes my site responsive." → It only sets the stage; the layout still needs fluid units and media queries.
"Percentages are always better than pixels." → Use the right unit for the job; borders and thin details are fine in px .
"If it looks fine in device mode, real phones are definitely fine." → Device mode is a strong estimate, not a guarantee; test a
real phone when possible.
Suggested remedial exercises for learners who struggle:
1. Resize-and-describe: give three pages and ask learners to test each at 360px and note the first thing that breaks.
2. Unit sorting: list ten CSS values and ask learners to sort them into "fixed" and "relative", with a reason.
3. Fix the query: give a broken media query ( @media max-width 767px ) and ask learners to correct the syntax.
Differentiation:
Level 1 (supported): provide about.html already written, with the base .values { grid-template-columns: 1fr; } and one
media query filled in; learners add the remaining query and test.
Level 2 (standard): the exercises as written.
Level 3 (challenge): implement a CSS-only "hamburger" menu using a hidden checkbox and the :checked pseudo-class,
and/or use grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)) to make the grid reflow without explicit breakpoints.
Observe and compare with the media-query approach.
Timing guidance: The device-toolbar testing is the heart of this session — protect the time for it. If the room is slow, shorten the
case study (Section J) to a 3-minute mention and reduce the practical checklist, but always leave at least 8 minutes for learners
to test at three widths themselves. If the room is fast, extend the challenge in the differentiation notes.
APPENDIX 6A — 15-MINUTE LAYOUT REFRESHER (only if needed)
If learners cannot produce a Flexbox row or a Grid, run this before Section D.
```text
<div class="row">
  <div class="box">One</div>
  <div class="box">Two</div>
  <div class="box">Three</div>
</div>
```
```text
.row {
  display: flex;      /* children sit in a row */
  gap: 16px;
}
.box {
  flex: 1;            /* each box shares the space equally */
  padding: 16px;
  background-color: #f3ecfb;
  border: 1px solid #4b2e83;
}
```
Confirm that every learner can (a) make three boxes sit in a row, and (b) explain that display: flex goes on the parent. Only
proceed once this is solid — this session builds directly on it.
END OF SESSION 6 — END OF WEEK 2 (CSS FOUNDATIONS)
Next: Session 7 — Planning a Website.
