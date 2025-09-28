// ----- CLASS ----------------------------------------------------------------
/*
  - Classes in JavaScript :- 
    - A class is a blueprint for creating objects (instances) with shared structure and behavior.
    - Internally a class definition creates a constructor function and sets methods on its .prototype.
    - Class makes the prototype-based pattern easier to read and use.
    - Introduced in ES6 as syntactic sugar over prototypes.
    - Classes are not hoisted. They behave like let/const declarations: referencing them before declaration causes a ReferenceError / TDZ.
    - Purpose :- 
      - Provides a cleaner, more structured way to create and manage objects.
      - Makes inheritance more readable than raw prototype code.
*/
class Person {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log("Hi " + this.name);
  }
}
const p = new Person("Ashish");
p.greet(); // "Hi Ashish"

// ----- Class Declarations vs Expressions ------------------------------------
/*
  - Declaration: class MyClass {} (hoisted, but not initialized).
  - Expression: const MyClass = class {} (anonymous or named).
  - Purpose :- 
    - Offers flexibility in how you define and structure classes.
  - Why it’s important :-
    - Helps when you need conditional class creation or pass classes as arguments.
*/
// Declaration
class Car {}
// Expression
const Bike = class {
  ride() {
    console.log("Riding...");
  }
};
// Classes can be expressions (useful for IIFEs, conditional classes).
// Anonymous Class Expressions
const A = class {
  /* ... */
};
// Named Class Expressions
const B = class Named {
  /* inside class body name is available */
};
// ----------------------------------------------------------------------------

// ----- Constructors ---------------------------------------------------------
/*
  - The constructor method runs when you call new Class(...).
  - It is a Special method inside a class, automatically called by new.
  - If a constructor explicitly returns an object, that object becomes the result of new. If it returns a primitive, it’s ignored.
  - Initializes object state.
  - There can be only one constructor per class.
  - Calling a class without new throws (TypeError).
  - Purpose :-
    - Set up object properties during creation.
  - Why it’s important :- 
    - Allows parameterized object creation.
    - Makes code DRY (don’t repeat yourself).
*/
class User {
  constructor(username, age) {
    this.username = username;
    this.age = age;
  }
}
const u = new User("Ashish", 25);
console.log(u.username); // "Ashish"

class C {
  constructor(x) {
    this.x = x;
  }
}
new C(1); // instance
C(1); // TypeError: Class constructor C cannot be invoked without 'new'
// ----------------------------------------------------------------------------

// ----- Instance and Static - Properties & Methods ---------------------------
/*
  - Instance :- 
    - Properties: data unique to each object.
    - Methods: functions defined in the class body (shared via prototype).
    - Purpose :- 
      - Encapsulate state + behavior together.
    - Why it’s important
      - Prevents data duplication.
      - Methods are memory efficient because they’re shared.
*/
class Animal {
  constructor(type) {
    this.type = type; // property
  }
  speak() {
    // method
    console.log(`${this.type} makes a sound`);
  }
}
console.log(Person.prototype.greet); // function
console.log(p.__proto__ === Person.prototype); // true

/*
  - Static :- 
    - Belong to the class itself, not to instances.
    - Purpose :- 
      - Store constants or utility functions.
    - Why it’s important
      - Avoids duplicating functionality inside every instance.
*/
class MathUtil {
  static add(a, b) {
    return a + b;
  }
}
console.log(MathUtil.add(2, 3)); // 5

// ES2022+ supports static fields:
class Config {
  static version = "1.0";
}
console.log(Config.version);
// ----------------------------------------------------------------------------

// ----- Public and Private instance fields (class fields) --------------------
/*
  - Public :- 
    - Declared directly in class body without constructor.
    - You can declare instance fields outside the constructor (syntax sugar).
    - These fields are set on each instance (per-instance storage).
    - Purpose :- 
      - Cleaner way to define instance properties.
    - Why it’s important :- 
      - Removes boilerplate from constructors.
*/
class C {
  count = 0; // public instance field
  constructor(name) {
    this.name = name;
  }
}

class Car {
  wheels = 4; // public field
}
const c = new Car();
console.log(c.wheels); // 4

/*
  - Private :- 
    - Variables/methods declared with # (prefix) are private to the class.
    - There are also private static fields: static #secret.
    - Purpose :- 
      - Enforces encapsulation — keeps data safe from outside access.
    - Why it’s important :- 
      - Prevents accidental modifications from outside code.
*/
class BankAccount {
  #balance = 0;
  deposit(amount) {
    this.#balance += amount;
  }
  getBalance() {
    return this.#balance;
  }
}
const acc = new BankAccount();
acc.deposit(100);
console.log(acc.getBalance()); // 100
// acc.#balance ❌ Error

// ----------------------------------------------------------------------------

// ----- Getters and Setters --------------------------------------------------
/*
  - Define computed properties or control access.
  - get → retrieve property like a field but runs logic.
  - set → update property with logic or validation.
  - Purpose :- 
    - Encapsulation: control access to internal properties.
  - Why it’s important :- 
    - Allows computed properties, validation, or lazy evaluation.
*/
class Circle {
  constructor(radius) {
    this._radius = radius;
  }
  get area() {
    return Math.PI * this._radius ** 2;
  }
  set radius(r) {
    if (r > 0) this._radius = r;
  }
}
const c1 = new Circle(5);
console.log(c1.area); // 78.5

class User {
  constructor(first, last) {
    this.first = first;
    this.last = last;
  }
  get fullName() {
    return `${this.first} ${this.last}`;
  }
  set fullName(name) {
    [this.first, this.last] = name.split(" ");
  }
}
// ----------------------------------------------------------------------------

// ----- Inheritance: extends and super ---------------------------------------
/*
  - Extends :- 
    - One class can derive from another.
    - Child inherits parent properties and methods.
    - extends sets up prototype chain between constructor functions: Sub.prototype.__proto__ === Super.prototype.
    - Purpose :- 
      - Reuse code, avoid duplication.
    - Why it’s important :- 
      - Supports polymorphism and specialization.
  - Super :- 
    - Used to call parent constructor or methods.
    - super() calls the parent constructor (must be called before this in subclass constructors).
    - super.method() calls a parent method inside an overridden method.
    - Purpose :- 
      - Access parent class behavior inside child class.
    - Why it’s important :- 
      - Enables method overriding while still reusing parent logic.
*/
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name);
  }
}
class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  speak() {
    super.speak();
    console.log(this.name + " barks");
  }
}
// ----------------------------------------------------------------------------

// ----- How new works (internals) --------------------------------------------
/*
  - Create a new object obj.
  - Set obj.[[Prototype]] = Constructor.prototype.
  - Call Constructor with this = obj.
  - If constructor returns an object, return it; otherwise return obj.
  - This is why prototype methods are shared and why instanceof works (it checks the prototype chain).
*/
// ----------------------------------------------------------------------------

// ----- this in class methods ------------------------------------------------
/*
  - this is set based on how the method is called (as with any function).
  - To keep this bound for callbacks, either bind in constructor or use an arrow function as an instance field (creates per-instance function).
  */
class Button {
  constructor(label) {
    this.label = label;
    // this.handle = this.handle.bind(this);   // or:
  }
  handle = () => {
    console.log(this.label);
  }; // arrow saved per-instance
}
// Note: arrow-instance fields are stored per instance (not on prototype).
// ----------------------------------------------------------------------------

// ----- Class Inheritance and Chains -----------------------------------------
/*
  - Multi-level inheritance (A → B → C).
  - Prototype chain is set up automatically.
  - Purpose :- 
    - Hierarchies of objects with increasing specialization.
  - Why it’s important :- 
    - Explains how instanceof works.
    - Helps when designing large systems.
*/
class A2 {}
class B2 extends A2 {}
class C2 extends B2 {}
const c2 = new C2();
console.log(c instanceof A); // true
// ----------------------------------------------------------------------------

// ----- Comparison: Class vs Constructor function and Prototype ---------------
/*
  - Classes are syntactic sugar over constructor functions and prototypes.
  - Constructor + prototype: older style; classes compile to this pattern.
  - Differences :- 
    - Classes run in strict mode by default.
    - Class methods are non-enumerable by default.
    - Classes cannot be called without new.
    - Class syntax is clearer and less error-prone.
*/
// Function style
function Person(name) {
  this.name = name;
}
Person.prototype.greet = function () {
  console.log(this.name);
};

// Class style
class Person2 {
  constructor(name) {
    this.name = name;
  }
  greet() {
    console.log(this.name);
  }
}
// ----------------------------------------------------------------------------

// ----- Memory & performance considerations ----------------------------------
/*
  - Prototype methods are shared — good for many instances (memory savings).
  - Instance methods (methods created per instance, e.g., arrow fields) cost more memory but avoid manual binding.
  - Avoid mutating a class’s prototype at runtime for performance; set up prototypes at definition time.
*/
// ----------------------------------------------------------------------------

// ----- Common pitfalls ------------------------------------------------------
/*
  - Forgetting to call super() in subclass before using this.
  - Binding this incorrectly or relying on arrow functions that end up as per-instance functions.
  - Overusing inheritance — deep inheritance trees are hard to maintain. Prefer composition.
  - Mutating prototypes of built-in objects (bad practice).
  - Relying on class identity for serialization — JSON does not preserve class prototype.
*/
// ----------------------------------------------------------------------------

// ----- When to use classes (practical uses) ---------------------------------
/*
  - Modeling entities with state and behavior (e.g., domain models, UI components in some frameworks).
  - Libraries/APIs where you expose a constructor/interface (e.g., Buffer, EventEmitter style).
  - When you need inheritance-like behavior and want clear syntax.
  - When encapsulation (private fields) is useful for invariants and data hiding.
  - When to avoid :- 
    - Small utility objects (use plain objects or functions).
    - When functional programming/composition is a better fit.
*/
// ----------------------------------------------------------------------------

// ----- Interview Checklist, Real World Uses and Best Practices --------------
/*
  - Interview Checklist :- 
    - What new does internally.
    - Where methods live (prototype vs instance).
    - Difference between static and instance methods.
    - How extends and super work.
    - Private fields (#) and why they’re helpful.
    - Why classes are syntactic sugar over prototypes.
    - Hoisting differences (classes not hoisted).
  - Real-world uses & examples :- 
    - UI component classes (older React class components, custom elements/web components).
    - Domain models in apps (e.g., Order, Customer with behavior).
    - Library internals: many libraries use classes to model objects and provide prototypes for performance.
  - Best practices :- 
    - Keep classes focused (single responsibility).
    - Prefer composition to deep inheritance.
    - Put methods on prototype (not inside constructor) unless you need per-instance closures or bound methods.
    - Use private fields for encapsulation when necessary.
    - Avoid mutating built-in prototypes.
*/
// ----------------------------------------------------------------------------

// ----- Quick reference examples ---------------------------------------------
// Basic class
class Person {
  name = "guest"; // public field
  #id; // private field
  constructor(name, id) {
    this.name = name;
    this.#id = id;
  }
  greet() {
    return `Hi ${this.name}`;
  } // on prototype
  getId() {
    return this.#id;
  }
  static create(name) {
    return new Person(name, Math.random());
  }
}

// Inheritance + overriding
class Animal {
  speak() {
    console.log("...");
  }
}
class Cat extends Animal {
  speak() {
    super.speak();
    console.log("meow");
  }
}

// Private / static
class C {
  static count = 0;
  #secret;
  constructor() {
    C.count++;
    this.#secret = Symbol();
  }
}
// ----------------------------------------------------------------------------

// ----- Why Classes Matter ---------------------------------------------------
/*
  - Classes give structure and readability while still relying on prototypes under the hood.
  - They bring OOP concepts (encapsulation, inheritance, polymorphism) into JS.
  - Most modern frameworks (React, Angular, NestJS, etc.) use classes extensively.
*/
// ----------------------------------------------------------------------------
