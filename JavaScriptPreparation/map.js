// ---------- Map — Key–Value pairs (SUPERIOR to objects) -------------------------------
/*
  - What is a Map? :- 
    - A Map is :- 
      - Key → value store
      - Keys can be ANY type
      - Maintains insertion order
      - Fast lookup (O(1))
*/
const map = new Map();

// ----------------------------------------------------------------------------

// Creating & using a Map
const map1 = new Map();
map1.set("name", "Ashish");
map1.set(1, "number key");
map1.set({}, "object key");
console.log(map1.get("name")); // Ashish

// Objects can be keys — this is HUGE.

// ----------------------------------------------------------------------------
/*
  - Map vs Object (CRITICAL COMPARISON)
    | ------------------------------------------------------------- | 
    |   Feature	      |        Object	          |        Map        |
    | --------------- | ----------------------- | ----------------- |
    |  Key types	    |    String / Symbol	    |        Any        |
    |  Order	        | Not guaranteed (old JS)	|     Guaranteed    |
    |  Size	          |        Manual	          |       map.size    |
    |  Iteration	    |       Indirect	        |       Direct      |
    |  Performance	  |        Slower	          |       Faster      |
    |  Prototype keys	|     Yes (danger)	      |         No        |
    | ------------------------------------------------------------- |
*/

// ----------------------------------------------------------------------------

// Map methods
map.set(key, value)
map.get(key)
map.has(key)
map.delete(key)
map.clear()
map.size

// Iteration:
map.forEach((value, key) => {});
for (const [key, value] of map) {}

// ----------------------------------------------------------------------------

// Real-world Map use cases
// Caching
const cache = new Map();
function fetchData(id) {
  if (cache.has(id)) return cache.get(id);
  const data = heavyFetch(id);
  cache.set(id, data);
  return data;
}

// Object metadata
const meta = new Map();
meta.set(user, { lastSeen: Date.now() });
// No mutation of original object.

// Frequency counters
const freq = new Map();
for (const char of "hello") {
  freq.set(char, (freq.get(char) || 0) + 1);
}

// ----------------------------------------------------------------------------
/*
  - WeakMap (VERY IMPORTANT) :- 
    - Keys must be objects
    - Weak references
    - Not iterable
    - Garbage collected automatically\
    - Used for :- 
      - Private data
      - Memory-safe caches
*/
const wm = new WeakMap();
wm.set(obj, "private data");

// ----------------------------------------------------------------------------
/*
  - Performance & Big-O
    | ---------------------------- |
    | Operation	 |  Set	  |  Map   |
    | ---------- | ------ | ------ |
    | Add	       |  O(1)	|  O(1)  |
    | Delete	   |  O(1)	|  O(1)  |
    | Lookup	   |  O(1)	|  O(1)  |
    | Iteration	 |  O(n)	|  O(n)  |
    | ---------------------------- |
*/

// ----------------------------------------------------------------------------

// Common mistakes
// Using object as key in object
const obj = {};
const data = {};
data[obj] = "x";
console.log(data); // "[object Object]"

// Use Map
const map3 = new Map();
map3.set(obj, "x");

// Expecting deep equality in Set/Map
new Set([{a:1}, {a:1}]).size // 2

// Objects are compared by reference.

// ----------------------------------------------------------------------------
/*
  - When to use WHAT :- 
    - Use Set when :- 
      - You need unique values
      - You need fast membership checks
      - Order matters
    - Use Map when :- 
      - Keys aren’t strings
      - You need reliable iteration order
      - You need frequent adds/removes
    - Use Object when :- 
      - Simple JSON-like data
      - Known static keys
      - Serialization needed

  - One-Line Summary :- 
    - Set stores unique values, Map stores flexible key–value pairs — both are faster, safer, and more predictable than arrays and objects for many use cases.
*/