// Flaten Array

const arr = [1, [2, [3, [4, 5]]]];

// Expected Output: [1, 2, 3, 4, 5]

function flatenRecursive(arr) {
  let res = [];
  for (let item of arr) {
    if (Array.isArray(item)) {
      res = res.concat(flatenRecursive(item));
    } else {
      res.push(item);
    }
  }
  return res;
}

console.log(flatenRecursive(arr));

function flatenIterative(arr) {
  let stack = [...arr];
  let res = [];
  while (stack.length) {
    let item = stack.pop();
    if (Array.isArray(item)) {
      stack.push(...item);
    } else {
      res.push(item);
    }
  }
  return res.reverse();
}

console.log(flatenIterative(arr));

const out = arr.flat(Infinity);
console.log(out);

const flattenReduce = (a) =>
  a.reduce((acc, v) => acc.concat(Array.isArray(v) ? flattenReduce(v) : v), []);

console.log(flattenReduce(arr));
