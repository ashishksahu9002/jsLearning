// ------------------- Closure ------------------------------------------------
/*
  - A closure is created when a function “remembers” the variables from its outer (lexical) scope — even after that outer function has finished executing.
  - A closure is a function bundled with its lexical environment — allowing it to remember and access variables from its outer scope even after that scope has finished executing.
  - In simple words :- 
    - A closure is a function that remembers where it was created.
*/
// Example:
function outer() {
  let counter = 0; // variable in outer scope
  return function inner() { // inner function
    counter++; 
    console.log(counter);
  };
}
const increment = outer();
increment(); // 1
increment(); // 2
increment(); // 3
/*
  - Here :- 
    - outer() runs once and returns inner().
    - inner() still has access to counter (from outer), even though outer() has already finished.
    - That’s closure: function + its lexical environment.
*/
// ----------------------------------------------------------------------------

// ----- How Closures Work (under the hood) -----------------------------------
/*
  - When a function is created, JavaScript internally keeps a reference to its parent scope — not a copy of variables, but the live link.
  - So if variables change later, the closure “sees” the new value.
*/
function outer() {
  let x = 10;
  return function inner() {
    console.log(x);
  };
}
const fn1 = outer();
x = 20;
fn1(); // Still prints 10 — x inside closure, not global x
// ----------------------------------------------------------------------------

// ----- Lexical Scope (the foundation) ---------------------------------------
// Closures work because of lexical scoping — which means functions are executed using the scope in which they were defined, not where they were called.
function makeFunc() {
  const name = "Ashish";
  function displayName() {
    console.log(name);
  }
  return displayName;
}
const myFunc = makeFunc();
myFunc(); // "Ashish"
// displayName remembers name from its lexical scope.
// ----------------------------------------------------------------------------

// ----- Practical Use Cases of Closures --------------------------------------
// 1. Data Privacy / Encapsulation
// Used to hide variables from outside access.
function createCounter() {
  let count = 0; // private
  return {
    increment() { count++; console.log(count); },
    decrement() { count--; console.log(count); },
    getCount() { return count; }
  };
}
const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.count); // undefined (private)
// Variables remain private inside the closure.
// ----------------------------------------------

// 2. Function Factory
// Closures let you create customized functions.
function multiplyBy(factor) {
  return function(num) {
    return num * factor;
  };
}
const double = multiplyBy(2);
const triple = multiplyBy(3);
console.log(double(5)); // 10
console.log(triple(5)); // 15
// ----------------------------------------------

// 3. Callbacks / Event Handlers
// Closures are common in async logic.
function delayedMessage(msg, delay) {
  setTimeout(() => console.log(msg), delay);
}
delayedMessage("Hello after 1s", 1000);
// Arrow function forms a closure over msg.
// ----------------------------------------------

// 4. Currying
// Breaking a function into smaller single-argument functions.
function add(a) {
  return function(b) {
    return a + b;
  };
}
console.log(add(2)(3)); // 5
// ----------------------------------------------

// 5. Memoization
// Cache results of expensive functions.
function memoizedAdd() {
  const cache = {};
  return function(num) {
    if (cache[num]) {
      console.log("Fetching from cache");
      return cache[num];
    }
    console.log("Calculating...");
    cache[num] = num + 10;
    return cache[num];
  };
}
const add = memoizedAdd();
console.log(add(10)); // Calculating... 20
console.log(add(10)); // Fetching from cache 20
// ----------------------------------------------

// 6. Debouncing / Throttling
// Used in performance optimizations for user input or scroll events.
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
// timer variable is preserved via closure.
// ----------------------------------------------------------------------------

// ----- Common Interview Examples --------------------------------------------
// Q1: What will this print?
function outer() {
  let x = 10;
  function inner() {
    console.log(x);
  }
  x = 20;
  return inner;
}
const fn = outer();
fn(); // ???
// Output → 20
// (Closure keeps reference, not a copy of x.)

// Q2: Inside a loop
for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i), 1000);
}
// Output → 4, 4, 4

// Fix using closure (or let):
for (var i = 1; i <= 3; i++) {
  ((x) => setTimeout(() => console.log(x), 1000))(i);
}
// Output → 1, 2, 3
// ----------------------------------------------------------------------------

// ----- Closures and Garbage Collection --------------------------------------
/*
  - Variables used inside closures are not garbage-collected until all references to the closure are gone.
  - Be careful with long-lived closures in large apps — they can retain memory unnecessarily.
*/
// ----------------------------------------------------------------------------

// ----- Key Interview Takeaways ----------------------------------------------
/*
  - Concept	Description
  - Lexical Scope	Functions remember their definition environment
  - Closure	Function + variables it can access
  - Variables live	As long as closure referencing them exists
  - Common Uses	Data privacy, currying, debounce, memoization
  - Common Pitfall	Loop variables with var
*/
// ----------------------------------------------------------------------------