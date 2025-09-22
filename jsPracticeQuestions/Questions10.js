// Shortest Sub Array
// expand + shrink sliding window pattern

/*
  In My version code what mistake I did (Working fine):- 
    - wrong way in updating the bestLen
    - Should use let bestLen = Infinity
    - During whlie loop use Math.min(bestLen, end-start+1)
    - return should be like  return bestLen === Infinity ? 0 : bestLen;
*/
function shortestSubarray(arr, target) {
  if (arr.length === 0) {
    return 0;
  }

  let start = 0,
    sum = 0,
    len = 0,
    bestLen = arr.length,
    val = 0,
    flag = false;

  for (let end = 0; end < arr.length; end++) {
    val = arr[end];
    sum += val;

    while (sum >= target) {
      len = end - start + 1;
      sum -= arr[start];
      start++;
    }

    if (sum + arr[start - 1] >= target && len <= bestLen) {
      bestLen = len;
      flag = true;
    }
  }
  return flag ? bestLen : 0;
}

// Best Approach
function shortestSubarray1(arr, target) {
  let start = 0;
  let sum = 0;
  let bestLen = Infinity;

  for (let end = 0; end < arr.length; end++) {
    sum += arr[end]; // expand window

    // shrink while valid
    while (sum >= target) {
      bestLen = Math.min(bestLen, end - start + 1);
      sum -= arr[start];
      start++;
    }
  }

  return bestLen === Infinity ? 0 : bestLen;
}


console.log(shortestSubarray([2, 3, 1, 2, 4, 3], 7)); // 2   (subarray [4,3])
console.log(shortestSubarray([1, 4, 4], 4)); // 1   ([4])
console.log(shortestSubarray([1, 1, 1, 1, 1, 1], 6)); // 0
