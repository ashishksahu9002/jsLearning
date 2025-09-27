/*
  - Prototype :-
    - They are the engine of inheritance in JS 
    - Prototypes are objects that other objects inherit from
    - In JS, every object has a internal link [[Prototype]] pointing to another object (or null)
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

function Person(name) {
  this.name = name;
}
console.log(typeof Person.prototype); // "object"
console.log(Person.prototype);        // { constructor: Person }
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
Person.prototype.sayHi = function() {
  console.log("Hi, I'm " + this.name);
};
const p1 = new Person("Alice");
const p2 = new Person("Bob");
p1.sayHi(); // "Hi, I'm Alice"
p2.sayHi(); // "Hi, I'm Bob"
console.log(p1.sayHi === p2.sayHi); // true (shared method)
// Every function in JS has a '.prototype' property (an object). When the 'new' keyword is used with hte function, that '.prototype' object becomes the [[Protortype]] (__proto__) of the created instance, enabling prototype based inheritance.
// ----------------------------------------------------------------------------