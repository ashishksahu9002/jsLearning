// ---------- Set — Collection of unique values -----------------------------------------
/*
  - What is a Set?
    - A Set is a collection where:
      - Every value is unique
      - Order of insertion is preserved
      - Values can be any type
      * const set = new Set();
*/

// ----------------------------------------------------------------------------

// Creating & using a Set
const set = new Set();
set.add(1);
set.add(1);   // ignored
set.add("1");
set.add({});
console.log(set.size); // 3
// Duplicates are automatically ignored

// ----------------------------------------------------------------------------
/*
  - How Set checks uniqueness
    - Set uses SameValueZero comparison :-
      | ------------------------------------------------- |
      |     Comparison  |         Result                  |
      | --------------- | ------------------------------- |
      |       1 vs 1	  |         equal                   |
      |     "1" vs 1	  |       not equal                 |
      |     {} vs {}	  | not equal (different reference) |
      |     NaN vs NaN	|           equal                 |
      | ------------------------------------------------- |
*/
new Set([NaN, NaN]).size; // 1

// ----------------------------------------------------------------------------

// Common Set methods
set.add(value)
set.delete(value)
set.has(value)
set.clear()
set.size
// Iteration:
for (const value of set) {
  console.log(value);
}

// ----------------------------------------------------------------------------

// Real use cases for Set
// Remove duplicates
const arr = [1, 2, 2, 3];
const unique = [...new Set(arr)];

// Fast lookup (better than array)
const ids = new Set([1, 2, 3]);
ids.has(2); // O(1)

// Track visited items (graphs, games)
visited.add(nodeId);

// ----------------------------------------------------------------------------
/*
  - WeakSet (quick but important) :- 
    - Only objects allowed
    - Weak references
    - Not iterable
    - Auto garbage collected
    - Used for :-
      - Tracking object state
      - Avoiding memory leaks
*/
const ws = new WeakSet();
ws.add({}); // OK

// ----------------------------------------------------------------------------
