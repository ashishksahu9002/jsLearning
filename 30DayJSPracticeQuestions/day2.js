// Task: Given an array of numbers, return an object that maps each number → its frequency.

const arr = [1, 4, 4, 5, 2, 4, 6, 2, 3, 6, 5, 6, 5, 3];
// { '1': 1, '2': 2, '3': 2, '4': 3, '5': 3, '6': 3 }
const str = "banana";
// { 'b': 1, 'a': 3, 'n': 2 }

// 1. Simple, works for arrays (numbers/strings) and strings
function frequency(input) {
  if (input == null) return {};
  const iter = Array.isArray(input) ? input : String(input).split('');
  const acc = {};
  for (const x of iter) {
    acc[x] = (acc[x] || 0) + 1;
  }
  return acc;
}

// 2. Same but using reduce (good functional style)
function frequencyReduce(input) {
  if (input == null) return {};
  const arr = Array.isArray(input) ? input : String(input).split('');
  return arr.reduce((acc, curr) => {
    acc[curr] = (acc[curr] || 0) + 1;
    return acc;
  }, {});
}

// 3. Map-based (returns a Map; useful if keys are not strings)
function frequencyMap(input) {
  if (input == null) return new Map();
  const arr = Array.isArray(input) ? input : String(input).split('');
  const m = new Map();
  for (const x of arr) {
    m.set(x, (m.get(x) || 0) + 1);
  }
  return m;
}

console.log(frequency(arr))
console.log(frequency(str))
console.log(frequencyReduce(arr))
console.log(frequencyReduce(str))
console.log(frequencyMap(arr))
console.log(frequencyMap(str))

// Top-K most frequent (common follow-up)
function topKFromFreq(freqObj, k = 1) {
  return Object.entries(freqObj)
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([val, count]) => ({ val, count }));
}

// helper that combines both steps
function topK(input, k = 1) {
  const freq = frequency(input);
  return topKFromFreq(freq, k);
}

console.log(topK(str, 1)); // [{ val: 'a', count: 3 }]
console.log(topK(arr, 2)); // top 2 values with counts
