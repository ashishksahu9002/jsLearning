// ONLY OUTPUT RELATED QUESTIONS
// == tries coercion.

/*
----- Why is [] truthy in conditions but Number([]) === 0? -----
  1. Truthiness (Boolean context)
    - When a value is used in a boolean context (like if ([]){...}), JS doesn’t convert it to a number — instead, it checks whether it’s in the set of “falsy” values.
    - Falsy values are only:
      - false, 0, -0, 0n, "", null, undefined, NaN
      - Since [] is not on that list, it’s truthy.
  2. Numeric coercion (Number([]))
    - When you force [] into a number, JavaScript tries to follow the ToNumber algorithm:
      Step 1: If it’s an object (like []), call valueOf().
        - [].valueOf() → returns itself (still an array).
      Step 2: Call toString() if valueOf() didn’t give a primitive.
        - [].toString() → "" (empty string).
      Step 3: Convert that string to a number.
        - Number("") → 0.

*/

/*
  In JS, the only arithmetic operator that has a special definition for strings is the + operator (because it also means concatenation).
  For all the other operators (-, *, /, %, **, comparison operators, etc.), JavaScript doesn’t define a “string meaning.”
  So what happens is:
    - If the operand isn’t already a number, JS will try to coerce (convert) it into a number using Number(...).
    - If conversion succeeds → it does numeric math.
    - If conversion fails → result is NaN (Not a Number).


  Unary plus (+x)
    - Tries to convert x into a number.
      - +'2'   // 2
      - +true  // 1
      - +false // 0
      - +'abc' // NaN
  Unary minus (-x)
    - Converts x into a number and negates it.
      - -'2'   // -2
      - -true  // -1
      - -'abc' // NaN


*/

Number([])          // 0
Number([''])        // 0  (because [''].toString() → "")
Number(['1'])       // 1 (because ['1'].toString() → "1")
Number(['1','2'])   // NaN (because ['1','2'].toString() → "1,2")

// char first then no
console.log('Line : 1 : ', '2' + 2)         // Line : 1 :  22
console.log('Line : 2 : ', '2' - 2)         // Line : 2 :  0
console.log('Line : 3 : ', '2' + + 2)       // Line : 3 :  22
// '2' + (+2)
// +2 → 2
// '2' + 2 → string concatenation → "22"
console.log('Line : 4 : ', '2' + - 2)       // Line : 4 :  2-2
// '2' + (-2)
// -2 → -2
// '2' + (-2) → "2" + "-2" → "2-2"
console.log('Line : 5 : ', '2' - + 2)       // Line : 5 :  0
// '2' - (+2)
// +2 → 2
// '2' becomes 2 → 2 - 2 = 0
console.log('Line : 6 : ', '2' - - 2)       // Line : 6 :  4
// '2' - (-2)
// -2 → -2
// '2' → 2
// 2 - (-2) = 2 + 2 = 4
console.log('Line : 7 : ', 'A' - 2)         // Line : 7 :  NaN
console.log('Line : 8 : ', 'A' + 2)         // Line : 8 :  A2
console.log('Line : 9 : ', 'A' + + 2)       // Line : 9 :  A2
console.log('Line : 10 : ', 'A' + - 2)      // Line : 10 :  A-2
console.log('Line : 11 : ', 'A' - + 2)      // Line : 11 :  NaN
console.log('Line : 12 : ', 'A' - - 2)      // Line : 12 :  NaN

// no first then char
console.log('Line : 13 : ', 2 + '2')        // Line : 13 :  22
console.log('Line : 14 : ', 2 - '2')        // Line : 14 :  0
console.log('Line : 15 : ', 2 + + '2')      // Line : 15 :  4
// 2 + (+'2')
// +'2' → 2
// 2 + 2 = 4
console.log('Line : 16 : ', 2 + - '2')      // Line : 16 :  0
// 2 + (-'2')
// -'2' → -2
// 2 + (-2) = 0
console.log('Line : 17 : ', 2 - + '2')      // Line : 17 :  0
// 2 - (+'2')
// +'2' → 2
// 2 - 2 = 0
console.log('Line : 18 : ', 2 - - '2')      // Line : 18 :  4
// 2 - (-'2')
// -'2' → -2
// 2 - (-2) = 4
console.log('Line : 19 : ', 2 - 'A')        // Line : 19 :  NaN
console.log('Line : 20 : ', 2 + 'A')        // Line : 20 :  2A
console.log('Line : 21 : ', 2 + + 'A')      // Line : 21 :  NaN
console.log('Line : 22 : ', 2 + - 'A')      // Line : 22 :  NaN
console.log('Line : 23 : ', 2 - + 'A')      // Line : 23 :  NaN
console.log('Line : 24 : ', 2 - - 'A')      // Line : 24 :  NaN


console.log('Line : 25 : ', 'Hello' + 2)     // Line : 25 :  Hello2
console.log('Line : 26 : ', 'Hello' - 2)     // Line : 26 :  NaN
console.log('Line : 27 : ', 2 + 'Hello')     // Line : 27 :  2Hello
console.log('Line : 28 : ', 2 - 'Hello')     // Line : 28 :  NaN


console.log(1 + '1')    // 11
console.log(1 - '1')    // 0
console.log('1' * 2)    // 2
console.log('10' / '2') // 5

console.log(0 == false)   // true
console.log(0 === false)  // false

console.log([] + [])      // ""
// [] → "" (empty string)
// "" + "" = ""
// → ""
console.log([] + {})      // "[object Object]"
// [] → "" 
// {} → "[object Object]"
// "" + "[object Object]" = "[object Object]"
// → "[object Object]"
console.log({} + [])      // 0
// This one is tricky!
// At the start of a line, `{}` can be parsed by JS as an empty block, not an object literal.
// So this is basically: +[]   → unary plus on [].
// +[] → +"" → 0
// → 0
console.log({} + {})      // NaN
// Same parsing issue: first `{}` = empty block, second `{}` = object
// Effectively it's: +{}  (unary plus on object)
// +{} → NaN  (because Number({}) → NaN)
// → NaN

console.log('5' - - '5')  // 10
console.log('5' + - '5')  // "5-5"

console.log(null + 1)     // 1 (null → coerced to 0 when used in numeric context)
console.log(undefined + 1)// NaN (undefined → NaN in numeric context)
console.log(typeof NaN)   // number

console.log('' == 0)      // true
console.log('' === 0)     // false
console.log(' \t\n' == 0) // true (' \t\n' is a string containing only whitespace.)

console.log(1 < 2 < 3)    // true
// JS evaluates left → right.
// (1 < 2) → true
// true → coerced to number 1 when compared with < 3
// So: 1 < 3 → true ✅
console.log(3 > 2 > 1)    // false
// (3 > 2) → true
// true → coerced to number 1 when compared with > 1
// So: 1 > 1 → false ✅

console.log(+true)        // 1
console.log(!'false')     // false
console.log('false' == false) // false
// == tries coercion.
// false → 0 (numeric conversion).
// 'false' → NaN (because Number('false') = NaN).
// So it’s NaN == 0 → false.
// ✅ Output: false

console.log([] == ![]);       // true
// ![] → false (because [] is truthy).
// So expression = [] == false.
// Now false → numeric 0.
// [] → numeric 0 (Number([]) = 0).
// 0 == 0 → true ✅
console.log([] == false);     // true (same as above)
console.log(![] == false);    // true
// ![] → false (since [] is truthy).
// So expression = false == false.
// → true ✅

console.log([] == 0)            // true
// [] → [].toString() → "" (empty string)
// Number("") → 0
// 0 == 0 → true
console.log([0] == 0)           // true
// [0].toString() → "0"
// Number("0") → 0
// 0 == 0 → true
console.log([null] == 0)        // true
// [null].toString() uses Array.prototype.join. For null (and undefined), join treats them as "" (empty string). So [null].toString() → "".
// Number("") → 0
// 0 == 0 → true
console.log([undefined] == 0)   // true (same as above)