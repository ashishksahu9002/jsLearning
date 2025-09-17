const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];

// Expected Output: [3, 4]   InterSection

arr1.sort((a, b) => a - b); // O{nlogn +mlogm}
arr2.sort((a, b) => a - b);
let output = [];
let i = 0,
  j = 0;
while (i < arr1.length && j < arr2.length) {
  if (arr1[i] === arr2[j]) {
    output.push(arr1[i]);
    i++;
    j++;
  } else if (arr1[i] < arr2[j]) {
    i++;
  } else {
    j++;
  }
}
console.log(output);

output = [];
output = arr1.filter((x) => arr2.includes(x)); // O(n*m)
console.log(output);

output = [];
const set2 = new Set(arr2);
output = arr1.filter((x) => set2.has(x)); // O(n+m)
console.log(output);
