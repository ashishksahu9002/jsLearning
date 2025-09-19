// Remove duplicates

const arr = [1, 2, 2, 3, 4, 4, 5];

// Expected Output: [1, 2, 3, 4, 5]
let output = [];
output = arr.reduce((acc, curr) => {
  if (acc.indexOf(curr) === -1) {
    acc.push(curr);
  }
  return acc;
}, []);
console.log(output);
// ------------------------
output = [];
for (let x of arr) {
  if (output.indexOf(x) === -1) {
    output.push(x);
  }
}
console.log(output);
// ---------------------------
output = [];
output = [...new Set(arr)];
console.log(output);
// ---------------------------
output = [];
output = [...new Map(arr.map((item) => [item, true])).keys()];
console.log(output);
