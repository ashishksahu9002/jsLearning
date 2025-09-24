/*
  - In JS Strings are primitive values but JS wraps them in a String object when its method are used.
  - All comparision operations, compare string case-sensitivity
  - Strings are immutable → methods return new strings.
  - Mutating vs non-mutating: unlike arrays, string methods never mutate.
  - Slice vs Substring vs Substr:
    - slice supports negatives.
    - substring doesn’t.
    - substr is deprecated.
*/

// 1.
const str = String([1, 2, 3, 4, 5, 6]); // Constructor
console.log(str);

// 2.
const str1 = (123).toString();
console.log(str1);

// 3.
const str2 = str.valueOf();
console.log(str2);

// Character Access
// 4.
/*
  - charAt()
    - Purpose: Get character at index.
    - Syntax: str.charAt(index)
    - Example:
*/
"hello".charAt(1); // "e"

// 5.
/*
  - charCodeAt()
    - Purpose: UTF-16 code at index.
    - Syntax: str.charCodeAt(index)
    - Example:
*/
"A".charCodeAt(0); // 65

// 6.
/*
  - codePointAt()
    - Purpose: Get full Unicode code point.
    - Syntax: str.codePointAt(index)
    - Example:
*/
"😃".codePointAt(0); // 128515

// 7.
/*
  - at() (ES2022)
    - Purpose: Get char at index (supports negatives).
    - Syntax: str.at(index)
    - Example:
*/
"hello".at(-1); // "o"

// Searching
// 8.
/*
  - indexOf()
    - Purpose: First occurrence index.
    - Syntax: str.indexOf(substr, start)
    - Example:
*/
"hello".indexOf("l"); // 2

// 9.
/*
  - lastIndexOf()
    - Purpose: Last occurrence index.
    - Syntax: str.lastIndexOf(substr, start)
    - Example:
*/
"hello".lastIndexOf("l"); // 3

// 10.
/*
  - includes()
    - Purpose: Check if substring exists.
    - Syntax: str.includes(substr, start)
    - Example:
*/
"hello".includes("he"); // true

// 11.
/*
  - startsWith()
    - Purpose: Check if string starts with substring.
    - Syntax: str.startsWith(substr, start)
    - Example:
*/
"hello".startsWith("he"); // true

// 12.
/*
  - endsWith()
    - Purpose: Check if string ends with substring.
    - Syntax: str.endsWith(substr, length)
    - Example:
*/
"hello".endsWith("lo"); // true

// Extracting Substrings
// 13.
/*
  - slice()
    - Purpose: Extract part of string (supports negatives).
    - Syntax: str.slice(start, end)
    - Example:
*/
"hello".slice(1, 4); // "ell"

// 14.
/*
  - substring()
    - Purpose: Extract part of string (no negatives).
    - Syntax: str.substring(start, end)
    - Example:
*/
"hello".substring(1, 4); // "ell"

// 15.
/*
  - substr() (deprecated)
    - Purpose: Extract with length.
    - Syntax: str.substr(start, length)
    - Example:
*/
"hello".substr(1, 3); // "ell"

// Modifying Strings
// 16.
/*
  - toUpperCase()
    - Purpose: Convert to uppercase.
    - Syntax: str.toUpperCase()
    - Example:
*/
"hi".toUpperCase(); // "HI"

// 17.
/*
  - toLowerCase()
    - Purpose: Convert to lowercase.
    - Syntax: str.toLowerCase()
    - Example:
*/
"HI".toLowerCase(); // "hi"

// 18.
/*
  - trim()
    - Purpose: Remove spaces from both ends.
    - Syntax: str.trim()
    - Example:
*/
"  hi  ".trim(); // "hi"

// 19.
/*
  - trimStart() / trimEnd()
    - Purpose: Remove spaces from start or end.
    - Syntax: str.trimStart(), str.trimEnd()
    - Example:
*/
"  hi".trimStart(); // "hi"
"hi  ".trimEnd(); // "hi"

// 20.
/*
  - padStart()
    - Purpose: Pad from start.
    - Syntax: str.padStart(len, padStr)
    - Example:
*/
"5".padStart(3, "0"); // "005"

// 21.
/*
  - padEnd()
    - Purpose: Pad from end.
    - Syntax: str.padEnd(len, padStr)
    - Example:
*/
"5".padEnd(3, "0"); // "500"

// 22.
/*
  - repeat()
    - Purpose: Repeat string.
    - Syntax: str.repeat(count)
    - Example:
*/
"ha".repeat(3); // "hahaha"

// Replace
// 23.
/*
  - replace()
    - Purpose: Replace first match.
    - Syntax: str.replace(search, replace)
    - Example:
*/
"hi hi".replace("hi", "yo"); // "yo hi"

// 24.
/*
  - replaceAll() (ES2021)
    - Purpose: Replace all matches.
    - Syntax: str.replaceAll(search, replace)
    - Example:
*/
"hi hi".replaceAll("hi", "yo"); // "yo yo"

// Splitting & Joining
// 25.
/*
  - split()
    - Purpose: Split string into array.
    - Syntax: str.split(separator, limit)
    - Example:
*/
"a,b,c".split(","); // ["a","b","c"]

// 26.
/*
  - concat()
    - Purpose: Join strings.
    - Syntax: str.concat(str2, str3, …)
    - Example:
*/
"a".concat("b"); // "ab"

// 👉 Note: Usually + is simpler: "a" + "b" // "ab"

// Regex Matching
// 27.
/*
  - match()
    - Purpose: Match regex (returns array/null).
    - Syntax: str.match(regex)
    - Example:
*/
"abc".match(/b/); // ["b"]

// 28.
/*
  - matchAll()
    - Purpose: Get all matches (iterator).
    - Syntax: str.matchAll(regex)
    - Example:
*/
[..."ab1 ab2".matchAll(/\d/g)]; // ["1","2"]

// 29.
/*
  - search()
    - Purpose: Index of match.
    - Syntax: str.search(regex)
    - Example:
*/
"abc".search(/b/); // 1
