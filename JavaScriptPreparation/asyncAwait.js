// ------------------ async / await -----------------------------------------------------
/*
  - async / await :- 
    - async/await is just syntactic sugar over Promises
    - No new async model.
    - No new threading.
    - Just a cleaner way to write Promise-based code.
*/

/*
  - async keyword :- 
    - What async does :- 
      - When you mark a function as async:

async function foo() {
  return 42;
}

      - JS automatically wraps the return value in a Promise.
  - Equivalent to:

function foo() {
  return Promise.resolve(42);
}

  - Important rule :- 
    - An async function ALWAYS returns a Promise
*/

const result = foo();
console.log(result); // Promise { 42 }

// ------------------------------------------------------------------

/*
  - await keyword :- 
    - What await does :- 
      - await pauses execution of the async function until the Promise settles.

const data = await fetch(url);

    - Under the hood :- 
      - JS does NOT block the thread
      - It suspends the function
      - The event loop continues
      - When the Promise resolves → function resumes
    - Key rule :- 
      - await only works inside async functions
*/

await fetch(url); // ❌ SyntaxError

// Correct:
async function load() {
  await fetch(url);
}

// ------------------------------------------------------------------

// Basic example (step-by-step)
async function loadData() {
  console.log("Start");

  const response = await fetch("/api/data");
  const json = await response.json();

  console.log("End");
  return json;
}
/*
  - Execution timeline :- 
    - "Start" logs immediately
    - fetch() starts → Promise created
    - Function pauses
    - JS continues doing other work
    - Fetch resolves
    - Function resumes
    - "End" logs
    - Promise returned by loadData() resolves
*/

// ------------------------------------------------------------------

// Error handling with try / catch :- 
// This is one of the biggest wins of async/await.

// With Promises
fetch(url)
  .then(res => res.json())
  .catch(err => console.error(err));

// With async/await
async function load() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}
/*
  - try/catch catches :- 
    - Rejected Promises
    - Thrown errors
    - JSON parsing errors
*/

// ------------------------------------------------------------------

// Sequential vs Parallel awaits (VERY IMPORTANT) :-
// Sequential (slow)
const a1 = await fetchA();
const b1 = await fetchB();
// Total time = A + B

// Parallel (fast)
const [a, b] = await Promise.all([
  fetchA(),
  fetchB()
]);
// Total time = max(A, B)

// Rule of thumb :- 
// Dependent → sequential
// Independent → parallel

// ------------------------------------------------------------------

// Async functions & return values :- 
async function getNumber() {
  return 5;
}
const value1 = await getNumber(); // 5
// But:
const value = getNumber();
console.log(value); // Promise { 5 }
// Always remember: async functions don’t return values — they return Promises that resolve to values.

// ------------------------------------------------------------------

// Mixing await and .then() (don’t do this) :- 
await fetch(url).then(res => res.json());
// This works, but :- Ugly, Confusing, Defeats the purpose

// Prefer:
const res1 = await fetch(url);
const data1 = await res1.json();

// ------------------------------------------------------------------

/*
  - Event Loop mental model (advanced but crucial) :- 
    - When JS hits await:
    - The async function is paused
    - The rest of the function is queued as a microtask
    - Call stack clears
    - Event loop continues
    - Promise resolves → microtask runs
    - That’s why:
*/
console.log("A");
async function test() {
  console.log("B");
  await Promise.resolve();
  console.log("C");
}
test();
console.log("D");
/*
Output :- 
A
B
D
C
*/

// ------------------------------------------------------------------

// Common mistakes :- 
// Forgetting await
const data2 = fetch(url);
console.log(data2.json()); // ❌

// Correct 
const res = await fetch(url);
const data = await res.json();

// Using forEach with await
items.forEach(async item => {
  await process(item); // ❌ doesn't wait
});

// Correct
for (const item of items) {
  await process(item);
}
// or parallel:
await Promise.all(items.map(process));

// ------------------------------------------------------------------

// One-line summary :- 
// async makes a function return a Promise await pauses that function until the Promise resolves JS never blocks — the event loop keeps running

// --------------------------------------------------------------------------------------