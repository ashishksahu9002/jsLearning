// Frequency of elements in array

const arr = ["apple", "banana", "apple", "orange", "banana", "apple"];

// Expected Output: { apple: 3, banana: 2, orange: 1 }

let output = arr.reduce((acc, curr) => {
  if (acc[curr]) {
    acc[curr] += 1;
  } else {
    acc[curr] = 1;
  }
  return acc;
}, {});
console.log(output);
output = {}

for(let x of arr) {
  if (output[x]) {
    output[x] += 1;
  } else {
    output[x] = 1;
  }
}
console.log(output);


