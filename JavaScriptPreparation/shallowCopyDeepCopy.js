// --------------------- SHALLOW COPY & DEEP COPY -------------------------------------------------
/*
  - Shallow Copy :- 
    - A shallow copy creates a new object, but only copies references for nested objects/arrays.
    - That means changes in nested objects will affect both copies.
*/
const original = {
  name: "Ashish",
  address: { city: "Delhi" }
};
// Shallow copy using spread
const shallow = { ...original };
shallow.name = "Rahul";       // changes only in shallow
shallow.address.city = "Mumbai"; // changes in BOTH
console.log(original.address.city); // "Mumbai" ❌

/*
  - 👉 Here :- 
    - name (primitive) was copied → safe.
    - address (object) was copied by reference → linked.
  - Methods that create shallow copies :- 
    - Spread ({...obj}, [...arr])
    - Object.assign({}, obj)
    - Array.slice()
    - Array.concat()
*/
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - Deep Copy :- 
    - A deep copy creates a completely new object, recursively copying all nested objects/arrays.
    - That means changes in the copy do NOT affect the original.
*/
const original1 = {
  name: "Ashish",
  address: { city: "Delhi" }
};
// Deep copy using JSON
const deep = JSON.parse(JSON.stringify(original1));
deep.address.city = "Mumbai";
console.log(original1.address.city); // "Delhi" ✅

//  Ways to make Deep Copy :- 
//    JSON method :- 
const deep = JSON.parse(JSON.stringify(obj));
/*
  - Limitations :- 
    - Removes functions, undefined, Symbol.
    - Breaks for cyclic references.
*/
//    structuredClone (modern, best) :- 
const deep = structuredClone(obj);
/*
  - Supports nested objects, arrays, dates, maps, sets.
  - Doesn’t copy functions.
  - Handles circular references.
*/
// --------------------------------------------------------

// --------------------------------------------------------
/*
  ------------------ Visual Difference ------------------------
  |     Feature	    |    Shallow Copy	   |   Deep Copy        |
  | Top-level props |	    Duplicated	   |   Duplicated       |
  | Nested objects	|   Shared (by ref)  |  Fully cloned      |
  | Safe to mutate?	|         No	       |       Yes          |
  |   Performance	  |       Faster	     | Slower (more work) |
  -------------------------------------------------------------
*/

// ------------------------------------------------------------------------------------------------