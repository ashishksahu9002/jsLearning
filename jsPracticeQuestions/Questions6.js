console.log(isBalanced("()"));
console.log(isBalanced("(())"));
console.log(isBalanced("(()"));
console.log(isBalanced("())("));
console.log(isBalanced(")())("));

function isBalanced(str) {
  let arr = [];
  for (let c of str) {
    if (c === "(") {
      arr.push(c);
    } else if (c === ")") {
      if (arr.length === 0) return false;
      arr.pop();
    }
  }
  return arr.length === 0;
}

function isBalancedStack(s) {
  const map = { ")": "(", "]": "[", "}": "{" };
  const stack = [];
  for (const ch of s) {
    if (ch === "(" || ch === "[" || ch === "{") stack.push(ch);
    else if (ch === ")" || ch === "]" || ch === "}") {
      if (stack.pop() !== map[ch]) return false;
    }
    // ignore other characters or treat them as error based on need
  }
  return stack.length === 0;
}

function isBalancedCounter(s) {
  let count = 0;
  for (const ch of s) {
    if (ch === "(") count++;
    else if (ch === ")") {
      if (count === 0) return false; // closing without opening
      count--;
    }
  }
  return count === 0;
}
