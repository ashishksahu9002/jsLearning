// String Frequency Maps
/*

  (freq[ch] || 0) :- The || operator returns the first truthy value, otherwise the second.
      - So:
        - If freq[ch] is already a number (e.g. 2), use that.
        - If freq[ch] is undefined (or 0), it falls back to 0.
        - This makes sure we don’t get NaN when adding.

*/

function isAnagram(str1, str2) {
  if (str1.length !== str2.length) return false;

  let obj = {};

  // Count chars in str1
  for (let ch of str1) {
    obj[ch] = (obj[ch] || 0) + 1;
  }

  // Subtract counts for str2
  for (let ch of str2) {
    if (!obj[ch]) return false;  // char not found OR overused
    obj[ch] -= 1;
  }

  // If all counts are zero, it's an anagram
  return true;
}

console.log(isAnagram("listen", "silent"));  // true
console.log(isAnagram("hello", "world"));    // false
console.log(isAnagram("aabb", "bbaa"));      // true
console.log(isAnagram("aabb", "bba"));       // false
