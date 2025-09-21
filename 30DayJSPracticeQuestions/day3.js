// Problem 1 — Remove duplicates (preserve order)
// Task: Given an array, return a new array that contains the same items but with duplicates removed, preserving the original order of first appearance.

const arr = [1, 2, 1, 3, 2]; // → [1, 2, 3]
const arr1 = ["a", "b", "a", "c"]; // → ["a","b","c"]
const arr2 = []; // → []
const arr3 = [1, 1, 1]; // → [1]
const arr4 = ["x", "y", "x", "x", "z"]; // → ["x","y","z"]

function fromSet(arr) {
  return Array.from(new Set(arr));
}

console.log("fromSet : ", fromSet(arr));
console.log("fromSet : ", fromSet(arr1));
console.log("fromSet : ", fromSet(arr2));
console.log("fromSet : ", fromSet(arr3));
console.log("fromSet : ", fromSet(arr4));

function fromLoop(arr) {
  if (Array.isArray(arr) && arr.length === 0) {
    return [];
  }
  const obj = {};
  for (let val of arr) {
    if (val in obj) {
      continue;
    } else {
      obj[val] = 1;
    }
  }
  return Object.keys(obj);
}

console.log("fromLoop : ", fromLoop(arr));
console.log("fromLoop : ", fromLoop(arr1));
console.log("fromLoop : ", fromLoop(arr2));
console.log("fromLoop : ", fromLoop(arr3));
console.log("fromLoop : ", fromLoop(arr4));

function fromSetAndLoop(arr) {
  if (Array.isArray(arr) && arr.length === 0) {
    return [];
  }
  const set = new Set();
  for (let val of arr) {
    set.add(val);
  }
  return Array.from(set);
}

// Clear & fast, preserves types
function dedupe(arr) {
  const seen = new Set();
  const out = [];
  for (const x of arr) {
    if (!seen.has(x)) {
      seen.add(x);
      out.push(x);
    }
  }
  return out;
}

// One-liner variant (compact)
function dedupeCompact(arr) {
  const seen = new Set();
  return arr.filter(x => !seen.has(x) && seen.add(x));
}


console.log("fromSetAndLoop : ", fromSetAndLoop(arr));
console.log("fromSetAndLoop : ", fromSetAndLoop(arr1));
console.log("fromSetAndLoop : ", fromSetAndLoop(arr2));
console.log("fromSetAndLoop : ", fromSetAndLoop(arr3));
console.log("fromSetAndLoop : ", fromSetAndLoop(arr4));

function fromMapAndLoop(arr) {
  if (Array.isArray(arr) && arr.length === 0) {
    return [];
  }
  const map = new Map();
  for (let val of arr) {
    const count = map.get(val) || 0; // get current count
    map.set(val, count + 1); // update count
  }
  return [...map.keys()];
}

console.log("fromMapAndLoop : ", fromMapAndLoop(arr));
console.log("fromMapAndLoop : ", fromMapAndLoop(arr1));
console.log("fromMapAndLoop : ", fromMapAndLoop(arr2));
console.log("fromMapAndLoop : ", fromMapAndLoop(arr3));
console.log("fromMapAndLoop : ", fromMapAndLoop(arr4));

// Problem 2 — Intersection of two arrays (unique elements, preserve order of first array)

// Task: Given two arrays a and b, return a new array containing elements that appear in both arrays. The result should contain unique elements and preserve the order they first appear in array a.

let a = [1, 2, 3, 4],
  b = [3, 4, 5]; // → [3,4]
let a1 = ["a", "b", "a", "c"],
  b1 = ["c", "a"]; // → ["a","c"]
let a2 = [],
  b2 = [1, 2]; // → []
let a3 = [1, 2, 2, 3],
  b3 = [2]; // → [2]
let a4 = [1, 2, 3],
  b4 = [4, 5]; // → []
let a5 = [1, 2, 2, 3],
  b5 = [2, 2, 4]; // → [2,2]

function intersectionPreserveA(arr1, arr2) {
  const bSet = new Set(arr2);
  const seen = new Set(); // to avoid duplicates in result
  const res = [];
  for (const x of arr1) {
    if (bSet.has(x) && !seen.has(x)) {
      seen.add(x);
      res.push(x);
    }
  }
  return res;
}

function intersectionWithSet(arr1, arr2) {
  if (
    (Array.isArray(arr1) && arr1.length === 0) ||
    (Array.isArray(arr2) && arr2.length === 0)
  ) {
    return [];
  }
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);
  const temp = [];
  const temp1 = [];

  // Order as per arr1
  for (let val of set1) {
    if (set2.has(val)) {
      // console.log('val : ', val)
      temp.push(val);
    }
  }
  // Order as per arr2
  for (let val of set2) {
    if (set1.has(val)) {
      // console.log('val : ', val)
      temp1.push(val);
    }
  }
  return [[...temp], [...temp1]];
}

console.log("intersectionWithSet : ", intersectionWithSet(a, b));
console.log("intersectionWithSet : ", intersectionWithSet(a1, b1));
console.log("intersectionWithSet : ", intersectionWithSet(a2, b2));
console.log("intersectionWithSet : ", intersectionWithSet(a3, b3));
console.log("intersectionWithSet : ", intersectionWithSet(a4, b4));
console.log("intersectionWithSet : ", intersectionWithSet(a5, b5));

function defaultCompare(a, b) {
  if (typeof a === "number" && typeof b === "number") return a - b;
  const sa = String(a);
  const sb = String(b);
  return sa < sb ? -1 : sa > sb ? 1 : 0;
}

function intersectionTwoPointer(arr1, arr2) {
  if (
    (Array.isArray(arr1) && arr1.length === 0) ||
    (Array.isArray(arr2) && arr2.length === 0)
  ) {
    return [];
  }

  arr1.sort(defaultCompare);
  arr2.sort(defaultCompare);

  let i = 0,
    j = 0;
  const temp = [];
  while (i < arr1.length && j < arr2.length) {
    if (arr1[i] === arr2[j]) {
      temp.push(arr1[i]);
      i++;
      j++;
    } else if (arr1[i] < arr2[j]) {
      i++;
    } else {
      j++;
    }
  }
  return temp;
}

function intersectionWithMultiplicity(a, b) {
  const A = [...a].slice().sort(defaultCompare);
  const B = [...b].slice().sort(defaultCompare);
  const res = [];
  let i = 0, j = 0;
  while (i < A.length && j < B.length) {
    if (A[i] === B[j]) {
      res.push(A[i]);
      i++; j++;
    } else if (compare(A[i], B[j]) < 0) {
      i++;
    } else {
      j++;
    }
  }
  return res;
}

function intersectionOneLine(a, b) {
  const bSet = new Set(b);
  const seen = new Set();
  return a.filter(x => bSet.has(x) && !seen.has(x) && seen.add(x));
}

function uniqueKeysAndCounts(arr) {
  const map = new Map();
  for (const x of arr) map.set(x, (map.get(x) || 0) + 1);
  return map; // Map preserves insertion order and original types
}



console.log("intersectionTwoPointer : ", intersectionTwoPointer(a, b));
console.log("intersectionTwoPointer : ", intersectionTwoPointer(a1, b1));
console.log("intersectionTwoPointer : ", intersectionTwoPointer(a2, b2));
console.log("intersectionTwoPointer : ", intersectionTwoPointer(a3, b3));
console.log("intersectionTwoPointer : ", intersectionTwoPointer(a4, b4));
console.log("intersectionTwoPointer : ", intersectionTwoPointer(a5, b5));
