---
title: Frontend Architecture, Event Loop, and Rendering
subject: WebDev
category: Software Engineering
difficulty: hard
importance: high
tags:
  - webdev
  - event-loop
  - critical-rendering-path
  - virtual-dom
  - performance
---

# Frontend Architecture, Event Loop, and Rendering

Modern web browsers are multi-process, multi-threaded operating system environments. Mastering the browser execution engine separates senior frontend engineers from junior developers.

---

## 1. The JavaScript Event Loop & Task Queues

JavaScript is single-threaded. Concurrency is modeled via the **Event Loop**:

```
[Call Stack] ───(empty)───> [Microtask Queue] (Drained 100% until empty)
                                  │
[Macrotask Queue] <───────────────┘ (Picks 1 Task)
```

1. **Call Stack:** Synchronous code executes to completion.
2. **Microtask Queue:** Promise callbacks (`.then()`, `await` continuations), `queueMicrotask()`, and `MutationObserver`.
3. **Macrotask Queue:** `setTimeout`, `setInterval`, `setImmediate`, I/O, UI event handlers.

> **Rule:** When the Call Stack empties, the Event Loop drains **EVERY pending microtask** before taking a single macrotask!

---

## 2. The Critical Rendering Path

1. **DOM Tree:** HTML bytes $\to$ Characters $\to$ Tokens $\to$ Nodes $\to$ DOM.
2. **CSSOM Tree:** CSS is render-blocking. Builds style object model.
3. **Render Tree:** Combines visible DOM elements with computed CSS styles (excludes `display: none`).
4. **Layout (Reflow):** Computes geometry, coordinates, and box model dimensions for all visible nodes.
5. **Paint (Repaint):** Rasterizes colors, borders, and text into bitmap layers.
6. **Composite:** GPU blends layers onto screen (transformations on `transform` and `opacity` skip reflow and repaint!).

---

## 3. Virtual DOM and React Reconciliation

Direct DOM manipulation is slow. React uses an in-memory Virtual DOM object tree and diffs it using an $O(N)$ heuristic algorithm:
1. Different element types tear down and remount the entire subtree.
2. Sibling elements in arrays must have stable `key` props to enable minimal node reordering rather than full rebuilds.
