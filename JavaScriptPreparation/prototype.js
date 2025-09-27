/*
  - Prototype :-
    - They are the engine of inheritance in JS 
    - Prototypes are objects that other objects inherit from
    - In JS, every object has a internal link [[Prototype]] pointing to another object (or null)
    - Purpose :-
      - Enables property and method sharing across objects.
      - Foundation of inheritance in JavaScript.
    - Importance :- 
      - Unlike class-based languages, JS objects inherit directly from other objects.
      - Understanding prototypes is key to mastering object-oriented JS.
    - High Level Idea :-
      - A prototype is an object that another object delegates to for properties and methods. When obj.prop is access, JS looks on obj first - if not found it walks the prototype chain until it finds it or return null.
        - Explanation :- When obj.prop is called in JS :- 
          (i) - JS first look inside the obj itself
          (ii) - If it doesn't find the prototype, it goes to the object's prototype
          (iii) - If still not found, it goes up the chain (prototype's prototype)
          (iv) - It stops at 'null', if not found anywhere -> undefined -> this is called Prototype Chain
    - A prototype is like a hidden 'backup object'. If a property isn't found directly on an object, JS automatically looks for it in the prototype chain
  - Prototype v/s __proto__ v/s .prototype
    - [[Prototype]] -> internal slot on every object
    - obj.__proto__ -> historical accessor that exposses [[Prototype]] (works in engines, not recommended for programmatic changes)
    - Object.getPrototypeOf(obj) -> standard way to read the prototype of the given obj
    - Function.prototype -> Every function object has a '.prototype' property which becomes the [[Prototype]] of instances created by that function when used with 'new'.
      - constructorFn.prototype -> object assigned as prototype for instance created by the new constructorFn()
      - obj.__proto__ (or Object.getPrototypeOf(obj)) -> prototype object that 'obj' delegates to at runtime
      - Whenever a function is created in JS, it automatically get a '.ptototype' property which is an object
*/
const obj = {};
console.log(Object.getPrototypeOf(obj) === Object.prototype); // true

function Person(name) {
  this.name = name;
}
console.log(typeof Person.prototype); // "object"
console.log(Person.prototype); // { constructor: Person }
/*
  - Here, Person.prototype is an object created by JavaScript.
  - By default, it has a single property: constructor pointing back to the function itself.
*/

// ----- What happens when 'new' keyword is used ------------------------------
const p = new Person("Alice");
/*
  - Steps :- 
    (i) - A new empty object {} is created.
    (ii) - That object’s internal [[Prototype]] (sometimes called __proto__) is set to Person.prototype.
    (iii) - The Person function is called with this bound to that new object.
    (iv) - The function initializes properties (e.g., this.name = "Alice").
    (v) - If the function doesn’t return an object, the new object is returned.
*/
console.log(p.__proto__ === Person.prototype); // true
// This is the key :-> The '.prototype' object of the function becomes the [[Prototype]] of the new instance.
// ----------------------------------------------------------------------------

// ----- Using .prototype to share methods ------------------------------------
//  - Because of this mechanism, you can put methods on '.prototype', and all instances will share them.
Person.prototype.sayHi = function () {
  console.log("Hi, I'm " + this.name);
};
const p1 = new Person("Alice");
const p2 = new Person("Bob");
p1.sayHi(); // "Hi, I'm Alice"
p2.sayHi(); // "Hi, I'm Bob"
console.log(p1.sayHi === p2.sayHi); // true (shared method)
// Every function in JS has a '.prototype' property (an object). When the 'new' keyword is used with hte function, that '.prototype' object becomes the [[Protortype]] (__proto__) of the created instance, enabling prototype based inheritance.
// ----------------------------------------------------------------------------

// ----- Prototype chain ------------------------------------------------------
/*
  - Prototype chain :- 
    - A chain of objects formed by following the [[Prototype]] links.
    - Property lookup happens along this chain.
  - Purpose :- 
    - Allows objects to "borrow" properties/methods from parent objects.
    - Provides method reusability without copying.
  - Importance :- 
    - Explains why all arrays can use push() (they inherit from Array.prototype).
    - Crucial for understanding how this, super, and inheritance work.
  - When obj.prop is used :- 
    - Check own properties of obj.
    - If not found, check Object.getPrototypeOf(obj) (i.e., obj.__proto__).
    - Repeat upward until prototype is null.
    - If none found → undefined.
    - This chain is how methods like toString() are available on arbitrary objects — they’re defined on Object.prototype.
*/
let arr = [];
console.log(arr.__proto__ === Array.prototype); // true
console.log(arr.__proto__.__proto__ === Object.prototype); // true
// ----------------------------------------------------------------------------

// ----- Constructor Functions & new ------------------------------------------
/*
  - Constructor Functions & new :- 
    - Special functions used with the new keyword to create objects.
    - The created object’s prototype is linked to the constructor’s .prototype.
  - Purpose :- 
    - Encapsulate object creation logic.
    - Share methods across instances via prototypes.
  - Importance :- 
    - Was the standard OOP pattern before ES6 class.
    - Still used under the hood by class.
*/
function Person(name) {
  this.name = name; // instance property
}
Person.prototype.greet = function () {
  console.log("Hi " + this.name);
};
const p3 = new Person("Ashish");
p3.greet(); // "Hi Ashish"
/*
  - Roughly what new Person('Ashish') does :- 
    - Create a new empty object obj.
    - Set obj.[[Prototype]] = Person.prototype.
    - Call Person with this = obj and given args.
    - If Person returns an object, return it; otherwise return obj.
  - That’s why instance methods are typically put on the constructor’s .prototype — so all instances share the same method object.
*/
// ----------------------------------------------------------------------------

// ----- Object.create() ------------------------------------------------------
/*
  - A method to create a new object with a specified prototype.
  - Purpose :- 
    - Provides clean prototypal inheritance without constructors.
    - Useful for delegation patterns.
  - Importance :- 
    - Simpler than constructors if only inheritance is needed.
*/
// Create an object whose prototype is a specific object :-
const animal = {
  eat() {
    console.log("eat");
  },
};
const rabbit = Object.create(animal);
rabbit.jump = () => console.log("jump");
rabbit.eat(); // delegates to animal.eat
// When Object.create(null) is used, it creates a plain dictionary with no prototype (no inherited keys like toString).
// ----------------------------------------------------------------------------

// ----- Prototypal Inheritance -----------------------------------------------
/*
  - Mechanism where one object inherits properties/methods from another object through the prototype chain.
  - Purpose :- 
    - Enables code reuse.
    - Allows creating hierarchies of objects.
  - Importance :- 
    - Fundamental for OOP in JS.
    - Powers both ES5 constructor patterns and ES6+ classes.
*/
const parent = {
  greet() {
    console.log("Hello");
  },
};
const child = Object.create(parent);
child.greet(); // "Hello" (inherited)

// a) Constructor + .prototype
function User(name) {
  this.name = name;
}
User.prototype.say = function () {
  console.log(this.name);
};

// b) Object.create(proto) (delegation / OLOO)
// Preferred by some JS devs for pure prototypal inheritance:
const proto1 = {
  init(name) {
    this.name = name;
    return this;
  },
  say() {
    console.log(this.name);
  },
};
const o = Object.create(proto1).init("Ashish");
o.say();

// c) ES6 class (syntactic sugar)
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(this.name);
  }
}
// Under the hood, class sets up the same prototype links: Person.prototype.greet is where the method lives.
// ----------------------------------------------------------------------------

// ----- Prototype vs Instance Members ----------------------------------------
/*
  - Instance members :- Defined inside constructor → unique per object.
  - Prototype members :- Defined on .prototype → shared by all instances.
  - Purpose :- 
    - Separate data (instance-specific) from behavior (shared methods).
  - Importance :- 
    - Saves memory by not duplicating methods for every instance.
*/
function Car(model) {
  this.model = model; // instance
}
Car.prototype.drive = function () {
  console.log("Driving...");
};
const c1 = new Car("Tesla");
const c2 = new Car("BMW");
console.log(c1.drive === c2.drive); // true (shared)
// ----------------------------------------------------------------------------

// ----- Property shadowing, hasOwnProperty, and enumeration ------------------
/*
  - If an object has a property with the same name as a property in its prototype, the object’s own property takes priority. The prototype property is not deleted, it’s just hidden (shadowed) during lookup.
  - Use obj.hasOwnProperty('key') to check own properties (not inherited).
  - for...in iterates over enumerable own + inherited properties; Object.keys() returns only own enumerable keys.
*/
// ----------------------------------------------------------------------------

// ----- instanceof and constructor property ----------------------------------
/*
  - obj instanceof Constructor checks whether Constructor.prototype is in the prototype chain of obj.
  - obj.constructor usually points to the function that created the instance (read from obj.__proto__.constructor) — but can be altered.
*/
// ----------------------------------------------------------------------------

// ----- Inspecting and manipulating prototypes -------------------------------
/*
  - Methods for checking or changing an object’s prototype.
  - Purpose :- 
    - Allows debugging, introspection, or controlled inheritance.
  - Importance :-
    - Essential for advanced JS (frameworks, polyfills).
  - Object.getPrototypeOf(obj) — get prototype.
  - Object.setPrototypeOf(obj, proto) — set prototype (slow; avoid changing prototypes of many objects at runtime).
  - obj.__proto__ — works, but prefer Object.getPrototypeOf.
  - Performance note: Object.setPrototypeOf can be slow and deoptimizes engines; prefer setting prototype at creation time (Object.create or new).
*/
let obj2 = {};
console.log(Object.getPrototypeOf(obj2) === Object.prototype); // true
Object.setPrototypeOf(obj2, null); // removes inheritance
console.log(Object.getPrototypeOf(obj2)); // null
// ----------------------------------------------------------------------------

// ----- Property descriptors & prototypes ------------------------------------
/*
  - Properties have descriptors: { value, writable, enumerable, configurable }. Methods on prototypes are usually non-enumerable (so for...in doesn’t show them unless explicitly made enumerable). You can use Object.defineProperty to define descriptors.
  - Getters/setters can be defined on prototypes so all instances get the same accessor behavior.
*/
function Person(name) {
  this._name = name;
}
Object.defineProperty(Person.prototype, "name", {
  get() {
    return this._name;
  },
  set(v) {
    this._name = v;
  },
  enumerable: false,
});
// ----------------------------------------------------------------------------

// ----- Built-in prototypes & extending them ---------------------------------
/*
  - Standard objects (Object, Array, Function, etc.) each have a prototype defining shared methods.
  - Purpose :- 
    - Gives all instances common methods (map, filter, push, etc.).
  - Importance :- 
    - Explains why arrays, strings, etc. already have useful methods.
  - Built-ins like Array.prototype, String.prototype contain common methods.
  - Don’t modify built-in prototypes in libraries (can break other code). For polyfills you must be careful and follow spec.
*/
console.log([].__proto__ === Array.prototype); // true
console.log(Array.prototype.__proto__ === Object.prototype); // true
// ----------------------------------------------------------------------------

// ----- Overriding Prototypes ------------------------------------------------
/*
  - Changing a prototype property/method either by redefining or shadowing.
  - Purpose :- 
    - Customize behavior for your objects.
  - Importance :- 
    - Enables polyfills, method overriding, and extension.
*/
Array.prototype.first = function () {
  return this[0];
};
console.log([1, 2, 3].first()); // 1
// Be cautious: modifying built-ins may cause conflicts.
// ----------------------------------------------------------------------------

// ----- Prototype pollution & security ---------------------------------------
/*
  - Assigning arbitrary properties to Object.prototype (or using unsafe merge/assign) can lead to prototype pollution vulnerabilities (attacker can inject __proto__ keys to change behavior). Be cautious when merging user-supplied objects.
*/
// ----------------------------------------------------------------------------

// ----- When to use prototype features (practical uses) ----------------------
/*
  - Share methods across instances (prototype or class methods).
  - Delegation: create objects that delegate to other objects (OLOO pattern).
  - Polymorphism: subclasses override prototype methods.
  - Memory efficiency: avoid recreating functions per instance.
  - Implementing frameworks / libraries: many libs rely on prototypal delegation for performance.
*/
// ----------------------------------------------------------------------------

// ----- Common pitfalls & gotchas --------------------------------------------
/*
  - Confusing .prototype (on functions) with [[Prototype]] / __proto__ (on objects).
  - Using arrow functions for prototype methods that rely on this — arrow functions capture lexical this, not the instance.
  - Arrow functions don’t have prototype.
  - Replacing .prototype removes default constructor.
  - Modifying prototypes of built-in objects (global side effects).
  - Using for...in without hasOwnProperty — will iterate inherited enumerable props.
  - Setting prototype using Object.setPrototypeOf repeatedly is slow.
  - Objects created with Object.create(null) have no prototype → useful for dictionaries.
  - __proto__ is deprecated; use Object.getPrototypeOf.
*/
// ----------------------------------------------------------------------------

// ----- Examples: patterns and debugging -------------------------------------
// Example — prototype lookup and shadowing
const proto = { x: 10 };
const obj1 = Object.create(proto);
console.log(obj1.x); // 10  (from proto)
obj1.x = 20;
console.log(obj1.x); // 20  (own property shadows proto)
console.log(proto.x); // 10

// Example — instanceof
function A() {}
const a = new A();
console.log(a instanceof A); // true
console.log(a instanceof Object); // true

// Example — Object.create(null) for pure dictionary
const dict = Object.create(null);
dict.foo = 1;
console.log(dict.toString); // undefined (no inherited methods)
// ----------------------------------------------------------------------------

// ----- Prototype and ES6 classes — short mapping ----------------------------
/*
  - class is syntactic sugar over prototype-based inheritance.
  - Purpose :- 
    - More familiar syntax for developers coming from OOP languages.
  - class C { m(){} } → C.prototype.m = function m(){}.
  - extends sets Sub.prototype.__proto__ = Super.prototype and Sub.__proto__ = Super.
  - super() in constructor calls the parent constructor.
  - Understanding prototypes explains how classes, extends, and super actually work.
*/
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log("Hi " + this.name);
  }
}
// ----------------------------------------------------------------------------

// ----- Quick summary --------------------------------------------------------
/*
  - JavaScript uses prototypal inheritance — objects delegate to prototypes.
  - Constructor functions and ES6 classes are conveniences that set prototypes for you.
  - Use prototypes to share behavior, save memory, and implement inheritance/delegation.
  - Prefer Object.create / class for building prototype links; avoid mutating built-in prototypes and avoid Object.setPrototypeOf in hot code paths.
  - JS is fundamentally prototype-based (not class-based like Java/C#).
  - Frameworks (React, Vue, Node internals) rely heavily on prototype chains.
  - Knowing this helps you :- 
    - Debug property lookups.
    - Write memory-efficient code.
    - Build inheritance patterns correctly.
    - Understand ES6 class under the hood.
*/
// ----------------------------------------------------------------------------

// ----- Interview checklist (topics to be ready to explain) ------------------
/*
  - What is prototype and prototype chain?
  - __proto__ vs .prototype vs Object.getPrototypeOf.
  - What does new do internally?
  - How and why to put methods on prototype vs on instance.
  - instanceof, constructor, hasOwnProperty.
  - Object.create vs constructor functions vs class.
  - Property shadowing and enumeration.
  - Performance implications of Object.setPrototypeOf.
  - Prototype pollution and safe merging.
*/
// ----------------------------------------------------------------------------
