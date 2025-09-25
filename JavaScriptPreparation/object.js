/*
  - What is an Object?
    - An object is a collection of key–value pairs.
    - Keys (also called properties) are usually strings or symbols.
    - Values can be anything: number, string, array, another object, or even a function.
*/
const person = {
  name: "Ashish",
  age: 25,
  greet: function () {
    console.log("Hello, " + this.name);
  },
};
console.log(person.name); // "Ashish"
person.greet(); // "Hello, Ashish"

// ----- Creating Objects -------------------------------
// Object literal (most common)
const obj = { a: 1, b: 2 };

// Constructor function
function Person(name) {
  this.name = name;
}
const p1 = new Person("Ashish");

// new Object() constructor
const obj1 = new Object();
obj.key = "value";

// Object.create(proto)
const proto1 = {
  greet() {
    console.log("hi");
  },
};
const obj = Object.create(proto);
obj.greet(); // "hi"

// Class syntax (sugar over constructor functions)
class User {
  constructor(name) {
    this.name = name;
  }
}
const u2 = new User("Ashish");
// ------------------------------------------------------

// ----- Accessing Properties ---------------------------
const user = { name: "Ashish", age: 25 };
// Dot notation: obj.name
console.log(user.name); // dot notation

// Bracket notation: obj["name"] (useful when key is dynamic).
console.log(user["age"]); // bracket notation (useful with variables)

// Computed properties:
const key = "age";
const obj = { [key]: 25 };
// ------------------------------------------------------

// ----- Adding / Removing ------------------------------
user.city = "Delhi"; // add
delete user.age; // remove
const obj = { a: 1 };
obj.b = 2; // add
delete obj.a; // remove
console.log("b" in obj); // true
console.log(obj.hasOwnProperty("b")); // true
// ------------------------------------------------------

// ------------------------------------------------------
/*
  - What is hasOwnProperty?
    - hasOwnProperty(key) is a method from Object.prototype.
    - It checks if the property exists directly on the object itself, not up the prototype chain.
    - hasOwnProperty ignores inherited properties.
    - Why use it?
      - Useful in for...in loops to filter only own properties:
    - In one line:
      - obj.hasOwnProperty("b") returns true because "b" is a direct property of obj, not just inherited through its prototype chain.
*/
const obj = { a: 1, b: 2 };
console.log(obj.hasOwnProperty("b")); // true
console.log(obj.hasOwnProperty("c")); // false
// obj has its own property "b" → returns true.
// "c" doesn’t exist → returns false.

// Prototype chain difference
const obj = {};
console.log(obj.hasOwnProperty("toString")); // false (comes from prototype)
console.log("toString" in obj); // true (inherited from Object.prototype)
// "toString" exists on the prototype, but not directly on obj.

for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(key);
  }
}

// Object.hasOwn(obj, key) (ES2022) → check if key is own property (safe replacement for hasOwnProperty)
const obj = { a: 1 };
Object.hasOwn(obj, "a"); // true
// ------------------------------------------------------

// ----- Object methods ---------------------------------
/*
  - Object.keys(obj) :- 
    - Returns an array of property names (keys).
    - Only own enumerable properties (not inherited).
*/
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj));
// ["a", "b", "c"]
// --------------------------

/*
  - Object.values(obj) :- 
    - Returns an array of property values.
    - Keys are ignored.
*/
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.values(obj));
// [1, 2, 3]
// --------------------------

/*
  - Object.entries(obj) :- 
    - Returns an array of [key, value] pairs.
    - Useful for looping with for...of.
*/
const obj = { a: 1, b: 2 };
console.log(Object.entries(obj));
// [["a", 1], ["b", 2]]
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}
// a 1
// b 2
// --------------------------

/*
- Object.fromEntries() :- 
- takes an iterable of key–value pairs (like what Object.entries() produces, or a Map) and turns it into an object.
    - Input → [[key, value], [key, value], ...]
    - Output → { key: value, key: value, ... }
    - It can be used as :- 
      - With array of pairs
      - Inverse of Object.entries
      - With Map
      - Filtering objects easily
    */
const entries = [
  ["a", 1],
  ["b", 2],
  ["c", 3],
];
const obj = Object.fromEntries(entries);
console.log(obj);
// { a: 1, b: 2, c: 3 }
// --------------------------

/*
  - Object.assign(target, ...sources) :- 
    - Copies enumerable properties from one or more source objects into a target object.
    - Returns the target object.
    - Performs a shallow copy.
    - 👉 Caveat: nested objects/arrays are not cloned — they’re copied by reference.
*/
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target);
// { a: 1, b: 2, c: 3 }
// --------------------------

/*
  - Object.freeze(obj) :- 
    - Makes an object immutable:
    - Can’t add, delete, or change properties.
    - Deep properties (nested objects) are not frozen (only shallow freeze).
*/
const obj = { a: 1, b: 2 };
Object.freeze(obj);
obj.a = 100; // ❌ ignored
obj.c = 300; // ❌ ignored
console.log(obj);
// { a: 1, b: 2 }
// --------------------------

/*
  - Object.seal(obj) :- 
    - Prevents adding/removing properties, but you can still modify existing values.
*/
const obj = { a: 1, b: 2 };
Object.seal(obj);
obj.a = 100; // ✅ works
obj.c = 300; // ❌ ignored
delete obj.b; // ❌ ignored
console.log(obj);
// { a: 100, b: 2 }
// --------------------------

/*
  - Object.preventExtensions(obj) :- 
    - Prevents adding new properties, but existing properties can still be changed or deleted.
*/
const obj = { a: 1, b: 2 };
Object.preventExtensions(obj);
obj.c = 300; // ❌ ignored
delete obj.b; // ✅ works
obj.a = 99; // ✅ works
console.log(obj);
// { a: 99 }
// --------------------------

/*
  Summary Table
    Method	                  Add props?	  Delete props?	  Update props?
    Object.freeze	              ❌ No	        ❌ No	        ❌ No
    Object.seal	                ❌ No	        ❌ No	        ✅ Yes
    Object.preventExtensions	  ❌ No	        ✅ Yes	        ✅ Yes
*/

/*
  - Object Mutability Controls :- 
    - Object.freeze(obj) → no add/delete/update
    - Object.isFrozen(obj) → check if frozen
    - Object.seal(obj) → no add/delete, but update allowed
    - Object.isSealed(obj) → check if sealed
    - Object.preventExtensions(obj) → disallow new props
    - Object.isExtensible(obj) → check if extensible
*/

/*
  - In one line:
    - keys / values / entries → extract object data.
    - assign → shallow copy/merge objects.
    - freeze → no add/delete/update.
    - seal → no add/delete, but can update.
    - preventExtensions → no add, but can update or delete.
*/
// ------------------------------------------------------

// ----- Iterating Over Objects -------------------------
/*
  - for...in → iterates over keys (including inherited).
  - Object.keys(obj) → array of keys.
  - Object.values(obj) → array of values.
  - Object.entries(obj) → array of [key, value].
  - Object.fromEntries(entries) → reverse of entries.
*/
// ------------------------------------------------------

// ----- Object Properties ------------------------------
/*
  - Object.getOwnPropertyNames(obj) :- 
    - all own property names (enumerable + non-enumerable)
*/
Object.getOwnPropertyNames({ a: 1 }); // ["a"]

/*
  - Object.getOwnPropertySymbols(obj) :- 
    - own Symbol keys
*/
const s = Symbol();
const obj = { [s]: 123 };
Object.getOwnPropertySymbols(obj); // [Symbol()]

/*
  - Object.getOwnPropertyDescriptors(obj) :- 
    - descriptors of all properties
*/
Object.getOwnPropertyDescriptors({ a: 1 });
// { a: { value:1, writable:true, enumerable:true, configurable:true } }

/*
  - Object.getOwnPropertyDescriptor(obj, prop) :- 
    - descriptor for one property
*/
Object.getOwnPropertyDescriptor({ a: 1 }, "a");
// ------------------------------------------------------

// ----- Prototypes -------------------------------------

// Object.getPrototypeOf(obj)
Object.getPrototypeOf([]) === Array.prototype; // true

// Object.setPrototypeOf(obj, proto)
const obj = {};
Object.setPrototypeOf(obj, Array.prototype);
console.log(obj instanceof Array); // true
// ------------------------------------------------------

// ----- JSON -------------------------------------------
/*
  - Objects are often used with JSON (JavaScript Object Notation).
    - JSON.stringify(obj) → convert to JSON string.
    - JSON.parse(str) → convert JSON string back to object.
*/
// ------------------------------------------------------

// ----- Equality ---------------------------------------
// Object.is(value1, value2) → like === but handles NaN and -0 properly
Object.is(NaN, NaN); // true
Object.is(0, -0); // false
// ------------------------------------------------------

// ----- Prototype Methods on Object.prototype ----------
/*
  - These are available on all objects (unless you create with Object.create(null)).
    - obj.hasOwnProperty(key) → true if key is own property (⚠️ not safe if obj overrides it).
    - obj.isPrototypeOf(obj2) → check if object exists in prototype chain.
    - obj.propertyIsEnumerable(key) → true if property is enumerable.
    - obj.toString() → returns "[object Type]".
    - obj.valueOf() → returns primitive value (default = object itself).
    - obj.toLocaleString() → localized string form.
*/

// ----- Quick Summary Table ----------------------------
/*
  |         Category	          |                    Methods                                                  |
  |   Keys/Values/Entries	      |    keys, values, entries, fromEntries                                       |
  |   Property Descriptors	    |    getOwnPropertyNames, getOwnPropertySymbols, getOwnPropertyDescriptor     |
  |                             |    getOwnPropertyDescriptors                                                |
  |   Prototypes	              |    getPrototypeOf, setPrototypeOf                                           |
  |   Mutability	              |    freeze, isFrozen, seal, isSealed, preventExtensions, isExtensible        |
  |   Creation/Copying	        |    create, assign, hasOwn                                                   |
  |   Equality	                |    is                                                                       |
  |   Prototype methods	        |    hasOwnProperty, isPrototypeOf, propertyIsEnumerable, toString, valueOf,  | 
  |                             |    toLocaleString                                                           |
*/
// ------------------------------------------------------

// ----- Property Descriptor ----------------------------
/*
  - Every property in a JS object has hidden metadata — called a descriptor — that defines how the property behaves.
  |       Flag       |            Meaning                   | Default (if defined with `defineProperty`) |
  | ---------------- | ------------------------------------ | ------------------------------------------ |
  |       value      | The actual stored value.             |                 undefined                  |
  | ---------------- | ------------------------------------ | ------------------------------------------ |
  |     writable     | If `false`, value cannot be changed. |                   false                    |
  | ---------------- | ------------------------------------ | ------------------------------------------ |
  |   enumerable     | If `false`, property won’t show in   |                   false                    |
  |                  |`for...in`, `Object.keys`, `entries`. |                                            |
  | ---------------- | ------------------------------------ | ------------------------------------------ |
  |   configurable   | If `false`: cannot delete property,  |                   false                    |
  |                  |cannot change descriptor.             |                                            |
  | ---------------- | ------------------------------------ | ------------------------------------------ |


  - If a property is defined by a Object.defineProperty() all flags are 'false' unless they are set
*/
/*
  - Defining a property with custom descriptor
    - Use Object.defineProperty(obj, key, descriptor):
*/
const user = {};
Object.defineProperty(user, "id", {
  value: 101,
  writable: false, // cannot change
  enumerable: false, // won't show in loops
  configurable: false, // cannot delete or redefine
});
console.log(user.id); // 101
user.id = 202; // ❌ ignored (writable:false)
console.log(user.id); // still 101
console.log(Object.keys(user)); // [] (enumerable:false)
delete user.id; // ❌ ignored (configurable:false)
console.log(user.id); // still 101

/*
  - Defaults
    - By default, if a property is defined with Object.defineProperty, all flags are false unless you set them.
    - That’s why beginners often get surprised when they can’t update/delete such properties.
*/
const obj = {};
Object.defineProperty(obj, "x", { value: 42 });
console.log(Object.getOwnPropertyDescriptor(obj, "x"));
/*
{
  value: 42,
  writable: false,
  enumerable: false,
  configurable: false
}
*/
// ------------------------------------------------------------------------------------------------------------------

