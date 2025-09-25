/*
  - Question 12 — Trapping Rain Water
    - You are given an array of non-negative integers.
    - Each element represents the height of a bar in an elevation map.
    - The width of each bar is 1.
    - Imagine it rains and water gets trapped between the bars.
    - Your task: Find how much water in total will be trapped.
*/

/*
  - Quick issues in my function
    - Using Math.max(...heightArr) then indexOf only finds the first highest bar; there may be equal-high bars later — logic that assumes a single peak can fail.
    - The loop logic updates leftMaxIndex and rightMaxIndex in a complicated way that is hard to prove correct and likely double-counts or computes negative water for boundary indices if not guarded.
    - You call Math.min(leftMax, rightMax) - heightArr[i] for every i without clamping to >= 0. If your left/right logic ever produces a smaller bound than heightArr[i] you can add negative values (which reduces water incorrectly).
    - The nested right-max recomputation when rightMaxIndex === i is O(n) inside a loop — worst-case O(n²) behavior for some inputs.
    - The algorithm is fragile and tricky to reason about; simpler known patterns exist that are provably correct.
*/

function trapRainWater(heightArr) {
  let water = 0,
    maxHeight = Math.max(...heightArr),
    leftMaxIndex = 0,
    rightMaxIndex = heightArr.indexOf(maxHeight);

  for (let i = 0; i < heightArr.length; i++) {
    if (heightArr[leftMaxIndex] < heightArr[rightMaxIndex]) {
      if (heightArr[leftMaxIndex] <= heightArr[i]) {
        leftMaxIndex = i;
      }
    }

    if (i === heightArr.length - 1) {
      rightMaxIndex = i;
    }
    water +=
      Math.min(heightArr[leftMaxIndex], heightArr[rightMaxIndex]) -
      heightArr[i];
    if (rightMaxIndex === i) {
      leftMaxIndex = i;
      let k = heightArr.length - 1;
      rightMaxIndex = k;
      for (let j = 0; j < k - i; j++) {
        if (heightArr[rightMaxIndex] < heightArr[k - j]) {
          rightMaxIndex = k - j;
        }
      }
    }
  }
  return water;
}

/*
  - Alternate (easy-to-follow) approach — leftMax & rightMax arrays
    - If you prefer clarity over constant space, build two arrays L[i] and R[i] then compute water per index:
    - This is O(n) time and O(n) space and is easy to reason about — excellent for correctness-first implementations.
*/
function trapRainWaterClassic(height) {
  const n = height.length;
  if (n <= 2) return 0;

  const leftMax = new Array(n).fill(0);
  const rightMax = new Array(n).fill(0);

  
  let mx = 0;
  for (let i = 0; i < n; i++) {
    mx = Math.max(mx, height[i]);
    leftMax[i] = mx;
  }
  
  mx = 0;
  for (let i = n - 1; i >= 0; i--) {
    mx = Math.max(mx, height[i]);
    rightMax[i] = mx;
  }
  
  let waterArr = [];
  let water = 0;
  for (let i = 0; i < n; i++) {
    water += Math.max(0, Math.min(leftMax[i], rightMax[i]) - height[i]);
    waterArr.push(water);
  }
  console.log('--height : ', height)
  console.log('-leftMax : ', leftMax)
  console.log('rightMax : ', rightMax)
  console.log('waterArr : ', waterArr)
  return water;
}

/*
  - Simple, correct two-pointer solution (recommended)
    - This is the standard O(n) / O(1) solution: maintain left and right pointers and leftMax / rightMax. Move the side with the smaller max inward and accumulate trapped water safely.
*/

function trapRainWaterTwoPointer(height) {
  const n = height.length;
  if (n <= 2) return 0;

  let left = 0, right = n - 1;
  let leftMax = 0, rightMax = 0;
  let water = 0;

  while (left <= right) {
    if (height[left] <= height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}

console.log(trapRainWaterClassic([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
// console.log(trapRainWater([4, 2, 0, 3, 2, 5])); // 9