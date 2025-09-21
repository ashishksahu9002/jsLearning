/*

  Array is a object in JS used to store a collection of values
  Values can be of any type


*/

const arr = [1, 2, 3, 4, 5, 6];
const arr1 = new Array(5);
const arr2 = new Array(1, 2, 3, 4);
const arr3 = Array.from("abc123");
const arr4 = Array.of(9, 1, 2, 3, 7, 4, 4, 5, 2, 11, 23);
const arr5 = Array.of("dkcnldfn");

arr1.push(2);
console.log("arr1 : ", arr1);
arr1.unshift(3);
console.log("arr1 : ", arr1);
arr1.pop();
console.log("arr1 : ", arr1);
arr1.shift();
console.log("arr1 : ", arr1);

console.log("arr : ", arr);
console.log("arr1 : ", arr1);
console.log("arr2 : ", arr2);
console.log("arr3 : ", arr3);
console.log("arr4 : ", arr4);
console.log("arr5 : ", arr5);

console.log(arr.length);
console.log(arr1.length);
console.log(arr2.length);
console.log(arr3.length);
console.log(arr4.length);
console.log(arr5.length);

// Iteration
/*
  forEach():- 
    - It is used for side effects (e.g., logging, modifying external data) not transformation.
    - It always return undefined, regardless of what you return inside the callback
*/

let temp = arr4.forEach((x) => console.log("x : ", x));

temp = arr4.map((x) => x * 2); // returns a new array
console.log("temp : ", temp);

temp = arr4.filter((x) => x % 2 === 0); // returns a new subset array of given array
console.log("temp : ", temp);

let sum = arr4.reduce((acc, curr) => {
  // it reduces the value of the array to give a single value in any form
  acc += curr;
  return acc;
}, 0);
console.log("sum : ", sum);

console.log(arr4.some((x) => x > 50)); // true if any value pass the condition
console.log(arr4.every((x) => x > 50)); // true if all the elements pass the condition

// Searching
console.log("includes : ", arr4.includes(5));
console.log("indexOf : ", arr4.indexOf(5));
console.log("lastIndexOf : ", arr4.lastIndexOf(5));
console.log(
  "find : ",
  arr4.find((x) => x > 2)
);
console.log(
  "findIndex : ",
  arr4.findIndex((x) => x > 2)
);
console.log(
  "findLast : ",
  arr4.findLast((x) => x > 2)
);
console.log(
  "findLastIndex : ",
  arr4.findLastIndex((x) => x > 2)
);
/*
  Sort :- 
    - By default, sort() converts elements to strings and compares their UTF-16 code units (like dictionary order).
    - So sorting is lexicographic, not numeric.
    
  Both sort and reverse changes the original array
*/
temp = arr4.sort();
console.log("sort default : ", temp);

temp = arr4.sort((a, b) => a - b); // a-b for ascending order
console.log("sort ascending : ", temp);
temp = arr4.sort((a, b) => b - a); // b-a for decending order
console.log("sort decending : ", temp);
console.log("reverse : ", temp.reverse());

temp = arr4.slice(3,6) // retuns a new subset of array with the given start(include) and end(exclude) index
// syntax :- <arrName>.slice(start, end)
console.log("slice before : ", arr4);
console.log("slice : ", temp);

/*

  Splice:-
    - Mutates the original array.
    - Can remove, replace, or insert elements.
    - Returns an array of the removed elements.
  syntax :- <arrName>.splice(start, deleteCount, ...items)

*/

// Remove Elements
temp = [...arr4] 
let removedEle = temp.splice(2,4)
console.log("splice before : ", arr4);
console.log("splice : ", temp);
console.log("splice removed: ", removedEle);

// Insert Elements
temp = [...arr4]
removedEle = temp.splice(3,0,3,4,56,6,7,8 )
console.log("splice before : ", arr4);
console.log("splice : ", temp);
console.log("splice removed: ", removedEle);

// Replace Elements
temp = [...arr4]
removedEle = temp.splice(3,4,'a','b','c','e' )
console.log("splice before : ", arr4);
console.log("splice : ", temp);
console.log("splice removed: ", removedEle);

// Negative Start
temp = [...arr4]
removedEle = temp.splice(-3,4 )
console.log("splice before : ", arr4);
console.log("splice : ", temp);
console.log("splice removed: ", removedEle);

/*

  concat:- combine two elements
    - Returns a new array
  syntax:- <arr1>.concat(<arr2>)

*/
console.log("concat : ", arr2.concat(arr3));
console.log('flat : ', [1,[3,5,[1,4,[7,4,9]]]].flat(Infinity))
