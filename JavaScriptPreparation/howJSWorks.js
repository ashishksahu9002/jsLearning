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

/*
JavaScript is a single-threaded, synchronous language,. This means it has one Call Stack and can only do one thing at a time. However, it handles asynchronous operations (like fetching data or timers) using the Event Loop, Web APIs (or Libuv in Node.js), and Queues,.
Here is a step-by-step flow using a concrete example, followed by a detailed explanation of every part involved.

1. The Example Scenario
Consider this code snippet. We will trace exactly how it executes from start to finish.
console.log("Start");

setTimeout(() => {
  console.log("Timeout Callback");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise Callback");
});

console.log("End");
The Output:
Start
End
Promise Callback
Timeout Callback

--------------------------------------------------------------------------------

2. Execution Flow Step-by-Step
Phase 1: Creation and Parsing
Before execution begins, the engine creates a Global Execution Context.
• Parsing: The code is parsed into an Abstract Syntax Tree (AST).
• Hoisting: Variable and function declarations are moved to the top of their scope memory. In this phase, variables are declared but not yet assigned values,.
• Memory Allocation: Variables and objects are allocated in memory (Stack for primitives, Heap for objects),.
Phase 2: Synchronous Execution (The Call Stack)
The "Thread of Execution" begins running the code line-by-line.
1. Line 1 (console.log("Start")):
    ◦ The function is pushed onto the Call Stack.
    ◦ It executes, printing "Start".
    ◦ It is popped off the stack.
2. Line 3 (setTimeout(...)):
    ◦ setTimeout is pushed onto the Call Stack.
    ◦ Key Moment: setTimeout is a Web API (in browsers) or C++ binding (in Node). The JavaScript engine offloads the timer mechanism to the runtime environment,.
    ◦ The runtime starts the timer (even though it is 0ms).
    ◦ setTimeout completes its synchronous work (registering the timer) and pops off the stack.
3. Line 7 (Promise.resolve().then(...)):
    ◦ The Promise resolution runs.
    ◦ The .then() callback is not executed immediately. It is sent to a special queue called the Microtask Queue.
4. Line 11 (console.log("End")):
    ◦ Pushed to stack, prints "End", popped off stack.
Phase 3: The Event Loop & Queues
At this point, the Call Stack is empty. The global code has finished running. Now the Event Loop activates.
1. Check Microtasks: The Event Loop checks the Microtask Queue first (it has higher priority than the Task Queue),.
    ◦ It finds the Promise callback.
    ◦ It pushes the callback onto the Call Stack.
    ◦ Output: "Promise Callback" is printed.
    ◦ The stack is empty again.
2. Check Macrotasks: The Event Loop checks the Task Queue (Macrotask Queue).
    ◦ The setTimeout timer has finished (0ms), so the Web API has moved the callback to the Task Queue.
    ◦ The Event Loop pushes this callback onto the Call Stack.
    ◦ Output: "Timeout Callback" is printed.
    ◦ The callback is popped off the stack.

--------------------------------------------------------------------------------

3. Detailed Explanation of the Parts
A. The Call Stack
This is a "Last In, First Out" (LIFO) data structure. It tracks where we are in the program.
• When you call a function, a Stack Frame (containing local variables and parameters) is pushed onto the stack.
• When the function returns, the frame is popped off.
• If the stack is busy (executing code), the browser cannot render or do anything else; this is called "blocking".
B. Memory: Heap vs. Stack
• Stack Memory: Stores primitives (numbers, booleans, references) and static data. It is fixed-size and fast.
• Heap Memory: Stores objects, arrays, and functions. This is dynamic, unstructured memory. When you create an object, the data lives in the Heap, but the reference (pointer) to that data lives in the Stack.
• Garbage Collection: The engine (e.g., V8) monitors the Heap. If an object is "unreachable" (no roots/variables reference it), the Garbage Collector removes it to free up memory,.
C. Web APIs (or C++ APIs in Node)
Since JS is single-threaded, it cannot handle operations like timers, network requests (fetch), or DOM events natively without blocking the thread.
• The runtime environment provides these capabilities.
• When you call setTimeout or fetch, you are delegating work to these APIs.
• In Node.js, a library called Libuv provides this functionality, managing the event loop and thread pool for asynchronous I/O.
D. The Queues
These hold callbacks waiting to be executed when the Call Stack is empty.
1. Microtask Queue:
    ◦ Contents: Promises (.then, .catch), queueMicrotask, MutationObserver.
    ◦ Priority: High. The Event Loop will process all microtasks until the queue is empty before moving to macrotasks. This can technically block the rendering if a microtask recursively queues more microtasks.
2. Task Queue (Macrotask Queue):
    ◦ Contents: setTimeout, setInterval, I/O operations, UI rendering,.
    ◦ Priority: Low. The Event Loop executes one macrotask, then checks if any new microtasks were generated, then updates the UI.
E. The Event Loop
The Event Loop is a continuous process that monitors the Call Stack and the Queues.
• Algorithm:
    1. Is the Call Stack empty?
    2. If YES: Check the Microtask Queue. Run all tasks there.
    3. If Microtasks are empty: Check the Task Queue. Run the oldest task there,.
    4. Repeat.
• This mechanism allows JavaScript to be non-blocking despite having only one thread.
*/