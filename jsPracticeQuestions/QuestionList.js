// 1. Turn object to an array of [key, value]
const obj = { a: 1, b: 2, c: 3 };
// Expected Output: [["a", 1], ["b", 2], ["c", 3]]

// 2. Frequency of elements in array
const arr = ["apple", "banana", "apple", "orange", "banana", "apple"];
// Expected Output: { apple: 3, banana: 2, orange: 1 }

// 3. Remove duplicates
const arr3 = [1, 2, 2, 3, 4, 4, 5];
// Expected Output: [1, 2, 3, 4, 5]

// 4. Intersection of two arrays
const arr1 = [1, 2, 3, 4];
const arr2 = [3, 4, 5, 6];
// Expected Output: [3, 4]   InterSection

// 5. Flaten Array
const arr4 = [1, [2, [3, [4, 5]]]];
// Expected Output: [1, 2, 3, 4, 5]

/*
  - 6. Stack balance brackets
    - console.log(isBalanced("()"));
    - console.log(isBalanced("(())"));
    - console.log(isBalanced("(()"));
    - console.log(isBalanced("())("));
    - console.log(isBalanced(")())("));
*/

/*
  - 7. Frequency Map (First unique character)
    - firstUniqueChar("aabbccdeff");  // "d"
    - firstUniqueChar("aabb");        // null
*/

/*
  - 8. Frequency Map - Anagram
    - console.log(isAnagram("listen", "silent"));  // true
    - console.log(isAnagram("hello", "world"));    // false
    - console.log(isAnagram("aabb", "bbaa"));      // true
    - console.log(isAnagram("aabb", "bba"));       // false
*/

/*
  - 9. Longest Unique Sub String
    - console.log(longestUniqueSubstring("abcabcbb")); // "abc"
    - console.log(longestUniqueSubstring("bbbbb")); // "b"
    - console.log(longestUniqueSubstring("pwwkew")); // "wke"
    - console.log(longestUniqueSubstring("")); // ""
*/

/*
  - 10. Shortest Sub Array
    - console.log(shortestSubarray1([2, 3, 1, 2, 4, 3], 7)); // 2   (subarray [4,3])
    - console.log(shortestSubarray1([1, 4, 4], 4)); // 1   ([4])
    - console.log(shortestSubarray1([1, 1, 1, 1, 1, 1], 6)); // 6
    - console.log(shortestSubarray1([2,-1,2], 3)); // 3
    - console.log(shortestSubarray1([84, -37, 32, 40, 95], 167)); // 3
*/

/*
  - 11. maximum product of any contiguous subarray within the given array
    - console.log(maxProduct([2, 3, -2, 4])); // 6
    - console.log(maxProduct([-2, 0, -1])); // 0
    - console.log(maxProduct([-2, 3, -4])); // 24
    - console.log(maxProduct([-2])); // -2
    - console.log(maxProduct([0, 2])); // 2
    - console.log(maxProduct([-1, -2, -9, 0, -1, -2])); // 18 ( -2 * -9 )
*/

/*
- Question 12 — Trapping Rain Water
    - You are given an array of non-negative integers.
    - Each element represents the height of a bar in an elevation map.
    - The width of each bar is 1.
    - Imagine it rains and water gets trapped between the bars.
    - Your task: Find how much water in total will be trapped.

  console.log(trapRainWaterClassic([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6
  console.log(trapRainWater([4, 2, 0, 3, 2, 5]));  // 9
*/