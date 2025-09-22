// My solving after understanding
function longestUniqueSubstring(str) {
  if (str.length === 0) {
    return str;
  }

  let start = 0,
    bestStart = 0,
    bestLen = 0,
    lastIndex = {},
    len = 0,
    ch = "";

  for (let end = 0; end < str.length; end++) {
    ch = str[end];

    if (lastIndex.hasOwnProperty(ch) && lastIndex[ch] >= start) {
      start = lastIndex[ch] + 1;
    }

    lastIndex[ch] = end;
    len = end - start + 1;
    if (len > bestLen) {
      bestLen = len;
      bestStart = start;
    }
  }
  return str.slice(bestStart, bestStart + bestLen)
}

function longestUniqueSubstringGPT(s) {
  let start = 0;                 // window start
  let bestStart = 0;             // start index of best substring found
  let bestLen = 0;               // length of best substring found
  const lastIndex = {};          // map: char -> last index seen

  for (let end = 0; end < s.length; end++) {
    const ch = s[end];

    // if ch seen inside current window, move start just after its last index
    if (lastIndex.hasOwnProperty(ch) && lastIndex[ch] >= start) {
      start = lastIndex[ch] + 1;
    }

    // update last seen index for ch
    lastIndex[ch] = end;

    // update best window if current window is bigger
    const windowLen = end - start + 1;
    if (windowLen > bestLen) {
      bestLen = windowLen;
      bestStart = start;
    }
  }

  return s.slice(bestStart, bestStart + bestLen);
}


console.log(longestUniqueSubstring("abcabcbb")); // "abc"
console.log(longestUniqueSubstring("bbbbb")); // "b"
console.log(longestUniqueSubstring("pwwkew")); // "wke"
console.log(longestUniqueSubstring("")); // ""
