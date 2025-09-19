firstUniqueChar("aabbccdeff");  // "d"
firstUniqueChar("aabb");        // null


function firstUniqueChar (str) {
  let obj = {}
  for (let ch of str) {
    if(ch in obj) {
      obj[ch] += 1
    } else {
      obj[ch] = 1
    }
  }
  let uniqueChar = null;
  for (let ch of str ) {
    if (obj[ch] === 1) {
      uniqueChar = ch;
      break;
    }
  }
  console.log(uniqueChar)
}

function firstUniqueChar1(str) {
  const freq = str.split("").reduce((acc, ch) => {
    acc[ch] = (acc[ch] || 0) + 1;
    return acc;
  }, {});
  return str.split("").find(ch => freq[ch] === 1) || null;
}

console.log(firstUniqueChar1("aabbccdeff"));