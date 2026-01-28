// ---------- Memoization in JavaScript (Complete Deep Dive) ----------------------------
/*
  - What is Memoization?
    - Memoization is a caching technique where a function remembers the result for a given input and returns the cached result instead of recomputing it.
    - In short :- Same input → Same output → Don’t recompute

-------------------------------------------------------------------------------

  - Why Memoization Exists :-
    - Some functions are :- 
      - Expensive (CPU-heavy)
      - Called repeatedly
      - Deterministic (same input → same output)
      - Example :- 
        - f(10) → always returns 55
          - Without memoization:
            - You recompute every time
            - Waste CPU
            - Slow performance
          - With memoization:
            - Compute once
            - Reuse forever (or until invalidated)

-------------------------------------------------------------------------------

  - Memoization vs Caching (IMPORTANT) :- 

    | --------------------------------------------------- |
    |     Caching	        |      Memoization              |
    | ------------------- | ----------------------------- |
    | General concept	    |  Specific to functions        |
    | Can cache anything	|  Caches function results      |
    | Manual keys	        |  Keys derived from arguments  |
    | App-level	          |  Function-level               |
    | --------------------------------------------------- |
    - Memoization is a specialized form of caching

-------------------------------------------------------------------------------

  - The Core Requirements for Memoization :- 
    - A function should be :-
      - Pure (no side effects)
      - Deterministic
      - Expensive enough to matter
      - Bad candidate :- 
        - Math.random();
        - Date.now();
        - fetch(url);
      - Good candidate :-
        - fibonacci(n)
        - factorial(n)
        - parseBigJSON(data)
        - pathfinding(graph)
*/

// ----------------------------------------------------------------------------

// Basic Memoization Pattern (FOUNDATION)
function memoize(fn) {
  const cache = {};
  return function (arg) {
    if (cache[arg] !== undefined) {
      return cache[arg];
    }
    const result = fn(arg);
    cache[arg] = result;
    return result;
  };
}
// Usage
const square = memoize(n => n * n);

square(4); // computed
square(4); // cached
// Closures are the key. The cache survives between calls.

// ----------------------------------------------------------------------------

// Memoization with Multiple Arguments
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}
// JSON.stringify works only for : Primitive args, Stable object shapes

// ----------------------------------------------------------------------------
/*
- Using Map instead of Object (BEST PRACTICE) :- 
- Why Map?
- O(1) lookup
- Any key type
- No prototype issues
* const cache = new Map();
- Better than:
* const cache = {};
*/

// ----------------------------------------------------------------------------

// Classic Example: Fibonacci (WHY MEMOIZATION MATTERS)
// Without memoization
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
// Time Complexity: O(2^n) 😱

// With memoization
const fib = (() => {
  const cache = {};
  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
})();

// Time Complexity: O(n) --> Massive improvement

// ----------------------------------------------------------------------------
/*
- Memoization + Recursion (KEY PATTERN) :-
- Memoization works best with :-
- Recursive problems
- Overlapping subproblems
- This is Dynamic Programming (Top-down).
*/

// ----------------------------------------------------------------------------

// Memoizing Async Functions (VERY IMPORTANT)
// Common mistake
cache.set(key, await fetchData());

// This allows duplicate calls.
// Correct way: cache the Promise
function memoizeAsync(fn) {
  const cache = new Map();
  return async function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const promise = fn(...args);
    cache.set(key, promise);
    return promise;
  };
}
// Prevents :- Duplicate network requests and Race conditions

// ----------------------------------------------------------------------------
/*
- Memoization vs Lazy Loading :- 

| ----------------------------------------- |
|   Memoization	   |     Lazy Loading       |
| ---------------- | ---------------------- |
| Cache results	   |   Delay execution      |
| After first call |  Before first call     |
| CPU optimization |  Startup optimization  |
| Function-level	 |  Resource-level        |
| ----------------------------------------- |
- Often used together
*/

// ----------------------------------------------------------------------------
/*
- Memoization & Memory Leaks (DANGER ZONE) :- 
- Problem
* const memoizedFn = memoize(fn); ---> cache grows forever
- If inputs keep changing → memory leak.
- Solutions
- 1. Limit cache size (LRU)
- 2. Use TTL
- 3. Use WeakMap (for object keys)
* const cache = new WeakMap();
*/

// ----------------------------------------------------------------------------

// WeakMap-based Memoization (ADVANCED)
function memoizeByObject(fn) {
  const cache = new WeakMap();
  return function (obj) {
    if (cache.has(obj)) return cache.get(obj);
    const result = fn(obj);
    cache.set(obj, result);
    return result;
  };
}

// Automatically GC’d -- No memory leaks -- Only works with object keys

// ----------------------------------------------------------------------------
/*
  - When NOT to use Memoization
    - Cheap functions
    - Functions with side effects
    - High-entropy inputs
    - One-time calls
  - Memoization has overhead.

  - Mental Model (IMPORTANT)
    - Memoization trades memory for speed by remembering function outputs based on inputs.

  - One-Line Summary
    - Memoization is a function-level caching technique that avoids repeated computation by storing results based on function arguments.
*/