const obj = { a: 1, b: 2, c: 3 };
// [["a", 1], ["b", 2], ["c", 3]]

let output = [];
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    output.push([key, obj[key]]);
  }
}
console.log(output);
// ------------------------

output = [];
output = Object.keys(obj).reduce((acc, curr) => {
  acc.push([curr, obj[curr]]);
  return acc;
}, []);
console.log(output);
// ------------------------

output = [];
output = Object.keys(obj).map((x) => [x, obj[x]]);
console.log(output);
// ------------------------

output = [];
output = Object.entries(obj);
console.log(output);
// ------------------------
// ------------------------

const arr = [
  ["x", 10],
  ["y", 20],
  ["z", 30],
];
// { x: 10, y: 20, z: 30 }

let objOutput = Object.fromEntries(arr);
console.log(objOutput)
// ------------------------

objOutput = arr.reduce((acc, [key, value]) => {
  acc[key] = value;
  return acc;
}, {})
console.log(objOutput)
// ------------------------

objOutput = []
for(let [key, value] of arr) {
  objOutput[key] = value
}
console.log(objOutput)
