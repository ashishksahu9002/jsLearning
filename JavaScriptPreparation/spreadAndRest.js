/*
  ... --> Spread / Rest Symbol
  Spread :- It is basically used when values are need to be expanded
  Rest :- It is used when values are need to be collected

  They both can be used in a single program

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
