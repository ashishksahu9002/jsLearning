// ------------------------------------- this -----------------------------------------------------
/*
  - this :- 
    - this is a special keyword that refers to the context in which a function is executed.
    - The value of this is determined at runtime, not at the time of writing the code.
    - It can change depending on how a function is called.
*/
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - Global context :- 
    - In browser global scope, this refers to the window object.
    - In Node.js global scope, this is {} (an empty object, not global).
*/
console.log(this); // window (browser), {} (Node)
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - Inside a function :- 
    - In non–strict mode: this = global object (window in browser).
    - In strict mode: this = undefined.
*/
function show() {
  console.log(this);
}
show(); // window (browser, non-strict) OR undefined (strict mode)
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - Inside an object (method call) :- 
    - If a function is called as a method of an object, this refers to the object before the dot.
*/
const obj1 = {
  name: "Ashish",
  greet: function() {
    console.log(this.name);
  }
};
obj1.greet(); // "Ashish"
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - Losing this (common pitfall) :- 
    - When you extract a method and call it standalone, this is lost.
*/
const obj2 = { name: "Ashish", greet() { console.log(this.name); } };
const fn = obj2.greet;
fn(); // undefined (or error in strict mode)
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - this in constructor functions and classes :- 
    - When using new, this refers to the newly created object.
*/
function Person(name) {
  this.name = name;
}
const p = new Person("Ashish");
console.log(p.name); // Ashish
// Same with class:
class Person {
  constructor(name) { this.name = name; }
}
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - Arrow functions and this :- 
    - Arrow functions do not have their own this.
    - They lexically capture this from their surrounding scope.
    - Use arrow functions when you want to inherit this from outer scope (like inside event handlers, promises, etc.).
*/
const obj = {
  name: "Ashish",
  arrow: () => console.log(this.name),
  normal: function() { console.log(this.name); }
};
obj.arrow();  // undefined (this = window/global)
obj.normal(); // "Ashish"
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - call, apply, and bind (manual control of this) :- 
    - func.call(thisArg, ...args) → calls immediately with this set.
    - func.apply(thisArg, [args]) → like call, but arguments as array.
    - func.bind(thisArg, ...args) → returns a new function with this fixed.
*/
function greet(age) { console.log(this.name, age); }
const person = { name: "Ashish" };
greet.call(person, 25);   // Ashish 25
greet.apply(person, [30]); // Ashish 30
const bound = greet.bind(person, 35);
bound(); // Ashish 35
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - this in event handlers :- 
    - By default, in event listeners: this = element.
    - If you use arrow functions, this is inherited from outer scope (not the element).
*/
document.querySelector("button").addEventListener("click", function() {
  console.log(this); // button element
});
document.querySelector("button").addEventListener("click", () => {
  console.log(this); // window (outer scope, not the button)
});
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - this in setTimeout / async :- 
    - Normal function: this = global object (or undefined in strict mode).
    - Arrow function: inherits this from surrounding scope.
*/
setTimeout(function() { console.log(this); }, 1000); // window / undefined
setTimeout(() => { console.log(this); }, 1000);      // inherits outer this
// --------------------------------------------------------

// --------------------------------------------------------
// this with strict mode
"use strict";
function f() { console.log(this); }
f(); // undefined (not window)
// --------------------------------------------------------

// --------------------------------------------------------
/*
  ------------------------ Summary Table ----------------------------
  |                       Context -> Value of this                  |
  |        Global scope (browser) -> window                         |
  |        Global scope (Node.js) -> {} (not global)                |
  |         Function (non-strict) -> window                         |
  |        Function (strict mode) -> undefined                      |
  |          Method inside object -> The object itself              |
  |             Constructor (new) -> Newly created instance         |
  |                Arrow function -> Inherits from enclosing scope  |
  |   Event handler (normal func) -> The element                    |
  |Event handler (arrow function) -> Lexical scope (not the element)|
  |           call / apply / bind -> Explicitly set this            |
  -------------------------------------------------------------------
*/
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - Common interview questions :- 
    - Difference between arrow function and normal function this.
    - What happens when you use this inside a class?
    - Why do we use bind?
    - Why does this change inside setTimeout?
    - What is this in global scope in strict vs non-strict mode?
    - What’s the difference between this in browser vs Node.js?
*/
// --------------------------------------------------------

// ------------------------------------------------------------------------------------------------