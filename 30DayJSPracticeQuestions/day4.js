// Problem 1 — Reverse an array manually
// Task: Given an array, return a new array reversed. Don’t use .reverse() — implement manually.

const arr = [1, 2, 3, 4]; // [4, 3, 2, 1]
const arr1 = []; // → []
const arr2 = [1]; // → [1]
const str = "hello"; // "olleh"
const str1 = "" // → ""
const str2 = "a" // → "a"
const str3 = "hello world"; // "olleh dlrow"

function reverseOrderLoop(arr) {
  if (arr.length === 0 || arr.length === 1) {
    return arr;
  }
  let temp = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    temp.push(arr[i]);
  }
  return temp;
}
// console.log("reverseOrderLoop : ", reverseOrderLoop(arr));
// console.log("reverseOrderLoop : ", reverseOrderLoop(arr1));
// console.log("reverseOrderLoop : ", reverseOrderLoop(arr2));

function reverseOrderTwoPointer(arr) {
  if (arr.length === 0 || arr.length === 1) {
    return arr;
  }
  let temp1 = [...arr]
  let i = 0,
    j = temp1.length - 1,
    temp;
  while (i <= j) {
    temp = temp1[i];
    temp1[i] = temp1[j];
    temp1[j] = temp;
    i++;
    j--;
  }
  return temp1;
}
// console.log("reverseOrderTwoPointer : ", reverseOrderTwoPointer(arr));
// console.log("reverseOrderTwoPointer : ", reverseOrderTwoPointer(arr1));
// console.log("reverseOrderTwoPointer : ", reverseOrderTwoPointer(arr2));

function reverseOrderPopPush(arr) {
  if (arr.length === 0 || arr.length === 1) {
    return arr;
  }
  let temp1 = [...arr]
  let i,
    temp = [];
  while (temp1.length > 0) {
    i = temp1.pop();
    temp.push(i);
  }
  return temp;
}
// console.log("reverseOrderPopPush : ", reverseOrderPopPush(arr));
// console.log("reverseOrderPopPush : ", reverseOrderPopPush(arr1));
// console.log("reverseOrderPopPush : ", reverseOrderPopPush(arr2));

function reverseOrderShiftUnshift(arr) {
  if (arr.length === 0 || arr.length === 1) {
    return arr;
  }
  let temp1 = [...arr]
  let i,
    temp = [];
  while (temp1.length > 0) {
    i = temp1.shift();
    temp.unshift(i);
  }
  return temp;
}
// console.log("reverseOrderShiftUnshift : ", reverseOrderShiftUnshift(arr));
// console.log("reverseOrderShiftUnshift : ", reverseOrderShiftUnshift(arr1));
// console.log("reverseOrderShiftUnshift : ", reverseOrderShiftUnshift(arr2));

function reverseString(str) {
  return reverseOrderPopPush(str.split('')).join('');
}
console.log("reverseString : ", reverseString(str));
console.log("reverseString : ", reverseString(str1));
console.log("reverseString : ", reverseString(str2));


function reverseEachWordInSentence(str) {
  return str.split(' ').map(x => reverseOrderPopPush(x.split('')).join('')).join(' ')
}

// If there are multiple spaces present b/w two words
function reverseEachWordInSentence1(str) {
  return str.split(/(\s+)/).map(x => reverseOrderPopPush(x.split('')).join('')).join(' ')
}
console.log("reverseEachWordInSentence : ", reverseEachWordInSentence(str3));
console.log("reverseEachWordInSentence : ", reverseEachWordInSentence("hi   all"));
console.log("reverseEachWordInSentence : ", reverseEachWordInSentence1("hi   all"));