/*
  ... --> Spread / Rest Symbol
  Spread :- It is basically used when values are need to be expanded
  Rest :- It is used when values are need to be collected

  They both can be used in a single program

  The rest parameter must be last in the parameter list, otherwise JS can’t parse arguments correctly.

*/

// Spread Examples :-

// in Arrays
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];
console.log(newArr); // [1, 2, 3, 4, 5]

// in Objects
const obj = { a: 1, b: 2 };
const newObj = { ...obj, c: 3 };
console.log(newObj); // { a: 1, b: 2, c: 3 }

// in Functions
const nums = [1, 2, 3];
console.log(Math.max(...nums)); // 3

// Rest Examples :-

// In Array Destructuring
const [first, ...rest] = [10, 20, 30, 40];
console.log(first); // 10
console.log(rest); // [20, 30, 40]

// In Object Destructuring
const { a, ...others } = { a: 1, b: 2, c: 3 };
console.log(a); // 1
console.log(others); // { b: 2, c: 3 }

// In Functions
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Both
function greet(greeting, ...names) {
  // Rest
  console.log(greeting + " " + names.join(", "));
}

const people = ["Ashish", "Rahul", "Neha"];
greet("Hello", ...people); // Spread
// "Hello Ashish, Rahul, Neha"

/*

  Why is this invalid?
  function f(...args, last) { } // ❌
  Rest parameters rule
    - The rest parameter (...args) must always be the last formal parameter in a function definition.
    - Why?
      - Because rest means: “collect all remaining arguments into an array”.
      - So if you write:
        - function f(a, ...args, last) {}
        - JavaScript wouldn’t know: 
          - Should last be part of args?
          - Or should it capture something after the “rest”?
          - That’s ambiguous — so the syntax is not allowed.
    
    Put the rest parameter at the end
    
*/

// Correct way of using rest in parameters
function f(a, b, ...rest) {
  console.log(a, b, rest);
}
f(1, 2, 3, 4, 5);
// a=1, b=2, rest=[3,4,5]
