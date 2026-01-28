// ---------- CACHING -------------------------------------------------------------------
/*
  - What is Caching?
    - Caching = storing the result of an expensive operation so you don’t repeat it
    - Instead of doing :- Compute → Return → Forget
    - You do :- Compute → Store → Reuse
    - Expensive operations include :- 
      - API calls
      - Heavy calculations
      - Asset loading
      - DOM measurements
      - Image / texture loading (Pixi context)

-------------------------------------------------------------------------------

  - Why Caching is critical :- 
    - Without caching :- 
      - Repeated work
      - Slower apps
      - Higher CPU usage
      - Network overuse
    - With caching :-
      - Faster responses
      - Less computation
      - Better UX
      - Lower memory churn

-------------------------------------------------------------------------------

  - Types of Caching (Big Picture) :- 
    | ----------------------------------------------- |
    |      Level	    |        Example                |
    | --------------- | ----------------------------- |
    |   In-memory	    |    JS objects, Map            |
    |   Browser	      |    HTTP cache, Service Worker |
    |   App-level	    |    Memoization                |
    |   Storage	      |    LocalStorage, IndexedDB    |
    |   CDN	          |    Edge caching               |
    | ----------------------------------------------- |

    - We’ll focus on JS + app-level caching.
*/
// ----------------------------------------------------------------------------

// In-Memory Caching (Most Common) :- 
// Simple cache with Map

const cache1 = new Map();
function getUser(id) {
  if (cache1.has(id)) {
    return cache1.get(id);
  }
  
  const user = fetchUserFromServer(id);
  cache1.set(id, user);
  return user;
}

// Why Map? -- O(1) lookup -- Any key type -- No prototype pollution

// ----------------------------------------------------------------------------
/*
  - Memoization (Function-Level Caching)
    - Memoization = caching function results based on input
    - Basic memoization
*/
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
// Usage:
const slowAdd = (a, b) => {
  for (let i = 0; i < 1e9; i++) {}
  return a + b;
};
const fastAdd = memoize(slowAdd);
fastAdd(2, 3); // slow
fastAdd(2, 3); // instant

// ----------------------------------------------------------------------------

// Caching Async Results (IMPORTANT)
const cache2 = new Map();
async function fetchData(id) {
  if (cache2.has(id)) {
    return cache2.get(id);
  }
  const promise = fetch(`/api/${id}`).then(r => r.json());
  cache2.set(id, promise);
  return promise;
}
// Cache the Promise, not the resolved value
// Prevents duplicate network requests

// ----------------------------------------------------------------------------
/*
  - Cache Invalidation (HARDEST PART)
    - “Caching is easy. Invalidation is hard.”
    - Strategies
      - 1. Time-based (TTL)
        - setTimeout(() => cache.delete(key), 5000);
      - 2. Manual invalidation
        - cache.clear();
      - 3. Version-based
        - cache.set(`${version}:${id}`, data);
*/

// ----------------------------------------------------------------------------
/*
  - Memory Leaks & Caching :- 
    - Common mistake :- 
      * const cache = {};
      - Never cleared
      - Grows forever
    - Better options :- 
      - LRU cache
      - WeakMap
      - TTL eviction
*/

// ----------------------------------------------------------------------------

// WeakMap for Safe Caching
const cache = new WeakMap();

function process(obj) {
  if (cache.has(obj)) return cache.get(obj);
  
  const result = heavyWork(obj);
  cache.set(obj, result);
  return result;
}

// Automatically GC’d when obj is gone
// No memory leaks

// ----------------------------------------------------------------------------