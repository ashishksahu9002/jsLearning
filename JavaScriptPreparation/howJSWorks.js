// -------------------- How JavaScript Works --------------------------------------------
/*
  - JavaScript Engine :- 
    - JavaScript code runs inside a JavaScript Engine (like V8 in Chrome, SpiderMonkey in Firefox).
    - The engine + browser together provide these core parts:
      - Memory Heap
      - Call Stack
      - Web / Host APIs
      - Task Queues
      - Event Loop
      - Garbage Collector
---------------------------------------------------------------------
    - Memory Heap — “Where data lives” :- 
      - What it is :- 
        - A large, unstructured memory area Stores:-
          - Objects
          - Arrays
          - Functions
          - Closures

const user = { name: "Ashish" };
function greet() {}

* Both user and greet are allocated in the Heap.

      - Key rule :- Heap stores data, not execution order
---------------------------------------------------------------------
    - Call Stack — “Where code runs” :- 
      - What it is :-
        - A LIFO (Last In, First Out) stack
        - Executes JavaScript line by line
        - Stores Execution Contexts

Example
function a() {
  b();
}
function b() {
  console.log("Hello");
}
a();

Stack movement
Global
→ a()
→ b()
→ console.log()
← b()
← a()

      - Important :- 
        - JS is single-threaded
        - Only one frame runs at a time
---------------------------------------------------------------------
    - Web / Host APIs — “Async helpers (NOT JS)” :- 
      - What they are :-
        - Provided by the browser / Node, not JS itself. Includes :- 
          - setTimeout
          - fetch
          - DOM events
          - requestAnimationFrame

setTimeout(() => {
  console.log("Timer");
}, 1000);

      - Flow :-
        - JS sends timer to Web API
        - Timer runs outside Call Stack
        - JS continues executing
        - JS never waits here.
---------------------------------------------------------------------
    - Task Queues — “Waiting room for callbacks” :-
      - There are TWO queues, not one.
        - Macrotask Queue (Task Queue) :- Examples :- 
          - setTimeout
          - setInterval
          - DOM events

setTimeout(cb, 0);  --- Callback goes to Macrotask Queue
---------------------------------------
        - Microtask Queue (HIGH PRIORITY) :- Examples :-
          - Promise.then
          - async/await continuation
          - queueMicrotask

Promise.resolve().then(cb); --- Callback goes to Microtask Queue

        - Rule :- Microtasks ALWAYS run before Macrotasks
---------------------------------------------------------------------
    - Event Loop — “The brain / traffic controller” :- 
      - What it does :- Constantly checks:
        - Is Call Stack empty?
        - Are Microtasks pending?
        - Can we run a Macrotask?
        - Should the browser render?

Algorithm (simplified)

while (true) {
  if (callStack is empty) {
    run ALL microtasks
    render UI (if needed)
    run ONE macrotask
  }
}
---------------------------------------------------------------------
    - Async / Await in the Flow :- 
      - await = microtask scheduling
      - NOT blocking

async function test() {
  console.log("1");
  await Promise.resolve();
  console.log("2");
}
console.log("A");
test();
console.log("B");

      - Execution Flow :- 
        - What actually happens
        - await pauses function
        - Remaining code (console.log("2"))
        - Goes to Microtask Queue

Output
A
1
B
2
---------------------------------------------------------------------
    - Rendering (Browser-only step) :- 
      - Happens :- 
        - After microtasks finish
        - Before next macrotask
        - Rendering includes:
        - Style calculation
        - Layout (reflow)
        - Paint
        - Composite
        - Important
          - Too many microtasks = UI freeze
---------------------------------------------------------------------
    - Garbage Collector — “Automatic memory cleanup” :- 
      - Uses Mark & Sweep
      - How it works
        - Start from roots (global, stack)
        - Mark reachable objects
        - Sweep unreachable ones
      - GC runs in background
      - You can’t control it directly

let obj = { data: 123 };
obj = null; // eligible for GC
---------------------------------------------------------------------
    - Memory Leaks (When GC fails) :- 
      - Common causes
        - Globals
        - Closures holding large objects
        - Unremoved event listeners
        - Uncleared intervals
        - Detached DOM nodes

setInterval(() => {
  heavyObject.doSomething();
}, 1000); // leak if never cleared
*/
// ---------------------------------------------------------------------
/*
------ ONE FINAL SUPER-SHORT SUMMARY ------
JS runs sync code on the Call Stack, stores data in the Heap, offloads async work to Web APIs, queues callbacks as Microtasks or Macrotasks, the Event Loop decides execution order, rendering happens between tasks, and Garbage Collection cleans unused memory.
*/

// --------------------------------------------------------------------------------------

// COMPLETE CODE FLOW DIAGRAM (SIMPLE & CLEAN)
/*

|--------------------------------|
│        JavaScript Engine       │
│                                │
│  ┌───────────────┐             │
│  │ Memory Heap   │◄── Objects  │
│  └───────────────┘             │
│                                │
│  ┌───────────────┐             │
│  │ Call Stack    │◄── Sync JS  │
│  └───────────────┘             │
│           │                    │
│           ▼                    │
│  ┌────────────────────────┐    │
│  │ Web / Host APIs        │    │
│  │ (Timers, Fetch, DOM)   │    │
│  └────────────────────────┘    │
│           │                    │
│           ▼                    │
│  ┌───────────────┐             │
│  │ Task Queues   │             │
│  │ ┌───────────┐ │             │
│  │ │ Microtasks│ │ (Promises)  │
│  │ └───────────┘ │             │
│  │ ┌───────────┐ │             │
│  │ │ Macrotasks│ │ (Timers)    │
│  │ └───────────┘ │             │
│  └───────────────┘             │
│           │                    │
│           ▼                    │
│      ┌───────────┐             │
│      │ EventLoop │───────────  |
│      └───────────┘             │
│           │                    │
│           ▼                    │
│       ┌─────────┐              │
│       │ Render  │ (Browser)    │
│       └─────────┘              │
│                                │
│   ┌───────────────────────┐    │
│   │ Garbage Collector     │    │
│   └───────────────────────┘    │
|--------------------------------|

*/