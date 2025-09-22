/*
  - maximum product of any contiguous subarray within the given array
  - If want to find index or the subarray for maxProduct maintain :- 
    - Three possible candidates for max/min ending at i:
      - 1) start new at i: x (start = i)
      - 2) extend prevMax: x * prevMax (start = prevMaxStart)
      - 3) extend prevMin: x * prevMin (start = prevMinStart)
      - const candVals = [x, x * prevMax, x * prevMin];
      - const candStarts = [i, prevMaxStart, prevMinStart];
*/

function maxProduct(arr) {
  if (arr.length === 0) {
    return 0;
  }
  let prevMax = arr[0],
    prevMin = arr[0],
    best = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const currMax = Math.max(arr[i], arr[i] * prevMax, arr[i] * prevMin);
    const currMin = Math.min(arr[i], arr[i] * prevMax, arr[i] * prevMin);
    prevMax = currMax;
    prevMin = currMin;

    best = Math.max(best, prevMax);
  }
  return best;
}

// console.log(maxProduct([2, 3, -2, 4])); // 6
// console.log(maxProduct([-2, 0, -1])); // 0
// console.log(maxProduct([-2, 3, -4])); // 24
// console.log(maxProduct([-2])); // -2
// console.log(maxProduct([0, 2])); // 2
// console.log(maxProduct([-1, -2, -9, 0, -1, -2])); // 18 ( -2 * -9 )

// maximum sum of any contiguous subarray within the given array
function maxSum(arr) {
  if (arr.length === 0) {
    return 0;
  }
  let prevMax = arr[0],
    best = arr[0];

  for (let i = 1; i < arr.length; i++) {
    const currMax = Math.max(arr[i], arr[i] + prevMax, arr[i] + prevMin);
    prevMax = currMax;

    best = Math.max(best, prevMax);
  }
  return best;
}
console.log(maxSum([2, 3, -2, 4])); // 7
console.log(maxSum([-2, 0, -1])); // 0
console.log(maxSum([-2, 3, -4])); // 3
console.log(maxSum([-2])); // -2
console.log(maxSum([0, 2])); // 2
console.log(maxSum([-1, -2, -9, 0, -1, -2])); // 0
