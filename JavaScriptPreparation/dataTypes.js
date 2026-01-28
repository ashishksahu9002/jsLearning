// ---------- JavaScript Data Types & Type Coercion -------------------------------------
/*
  - JavaScript is Dynamically Typed
  - In JS:
    - Variables don’t have types
    - Values have types
let x = 10;       // number
x = "hello";     // string
x = true;        // boolean
JS decides types at runtime, not compile time.

-------------------------------------------------------------------------------

  - JavaScript Data Types
    - JavaScript has 8 data types, divided into Primitive and Non-Primitive.
      - Primitive Data Types (Immutable)
        - Primitive values are - Stored by value and Immutable (can’t be changed, only replaced)
        - The 7 Primitive Types
          | --------------------------------------- |
          | Type	    -->     Example               |
          | number	  -->  1, 3.14, NaN, Infinity   |
          | string	  -->  "hi", 'js', `ok`         |
          | boolean	  -->  true, false              |
          | undefined	-->  let x;                   |
          | null	    -->  let x = null;            |
          | symbol    -->  Symbol("id")             |
          | bigint	  -->  123n                     |
          | --------------------------------------- |

          - number (more than you think)
          - typeof 42          // "number"
          - typeof NaN         // "number" 🤯
          - typeof Infinity    // "number"
        - JS has only one numeric type (no int, float, double separation).
        
        - undefined vs null (VERY IMPORTANT)
          | --------------------------------------------------- |
          |    undefined	             |         null           |
          | -------------------------- | ---------------------- |
          | Default absence	           |   Intentional absence  |
          | Assigned by JS	           |  Assigned by developer |
          | Variable declared, not set |  Explicit “no value”   |
          | --------------------------------------------------- |

          - let a;
          - let b = null;
      
      - Non-Primitive (Reference) Type
        - object
          - Everything else is an object :- 
            - Objects
            - Arrays
            - Functions
            - Dates
            - Maps, Sets
            - Objects are shared references

              - typeof {}             // "object"
              - typeof []             // "object"
              - typeof function() {}  // "function" (special case)

    - Key difference: Reference vs Value :- 
      * let a = 10;
      * let b = a;
      * b = 20;
      * console.log(a); // 10
    - vs
      * let obj1 = { x: 1 };
      * let obj2 = obj1;
      * obj2.x = 5;
      * console.log(obj1.x); // 5

-------------------------------------------------------------------------------

  - Truthy & Falsy Values (Core to Coercion)
    - Falsy values (ONLY these 6)
      * false
      * 0
      * -0
      * 0n
      * ""
      * null
      * undefined
      * NaN
    - Everything else is truthy.
      * "0"     // truthy
      * []      // truthy
      * {}      // truthy

-------------------------------------------------------------------------------

  - What is Type Coercion? :- 
    - Type coercion = JS automatically converting one type into another
    - Happens when :- 
      - Using operators (+, ==, <)
      - Using conditionals (if, while)
      - Mixing types
    - Two kinds:
      - Explicit Type Coercion (you do it) (SAFE)
        - You intentionally convert types.
          * Number("42")     // 42
          * String(100)      // "100"
          * Boolean(1)       // true
        - Best practice
      - Implicit Type Coercion (DANGEROUS but powerful) (JS does it)
        - String coercion (+ operator)
            * 1 + "2"      // "12"
            * "5" + 3      // "53"
          - Rule :- If either operand is string, + becomes string concatenation
        - Numeric coercion (- * /)
            * "5" - 2      // 3
            * "6" * "2"    // 12
            * "10" / "2"   // 5
          - These operators force numbers

-------------------------------------------------------------------------------

  - == vs === (THE BIG ONE)
    - == (Loose equality)
      - Performs type coercion
      - Follows complex rules
        * 0 == "0"          // true
        * false == 0        // true
        * "" == 0           // true
        * null == undefined // true
    - === (Strict equality)
      - No coercion
      - Compares type + value
        * 0 === "0"       // false
        * null === undefined // false
    - Rule :- Always use === unless you REALLY know why not

-------------------------------------------------------------------------------

  - Abstract Equality Rules (Why == is scary)
    - Example
      - [] == ![]   // true 🤯
        - Why?
          - Step-by-step:
          - ![] → false
          - [] == false
          - [] → ""
          - false → 0
          - "" == 0 → true
    - This is pure coercion chaos.

-------------------------------------------------------------------------------

  - Boolean Coercion (Conditionals)
      * if ("hello") {}   // runs
      * if ([]) {}        // runs
      * if ({}) {}        // runs
    - JS internally does :- Boolean(value)

-------------------------------------------------------------------------------

  - Object to Primitive Conversion
    - When objects meet primitives, JS tries:
      - valueOf()
      - toString()
const obj = {
  valueOf() {
    return 10;
  }
};
obj + 5; // 15

-------------------------------------------------------------------------------

  - typeof quirks (interview traps)
      * typeof null         // "object" (legacy bug)
      * typeof NaN          // "number"
      * typeof []           // "object"
      * typeof function(){} // "function"
    - Correct way to check arrays :- Array.isArray([])

-------------------------------------------------------------------------------

  - Best Practices (REAL WORLD)
    - Always use ===
    - Explicitly convert types
    - Avoid relying on coercion
    - Be careful with +
    - Avoid == unless intentional
    - Don’t compare objects directly
      * {} === {} // false

-------------------------------------------------------------------------------

- Mental Cheat Sheet
  - To String
    * String(x)
    * x + ""

  - To Number
    * Number(x)
    * +x

  - To Boolean
    * Boolean(x)
    * !!x

-------------------------------------------------------------------------------

  - Final One-Line Summary
    - JavaScript has primitive and reference data types, and type coercion is the automatic conversion between them—powerful when controlled, dangerous when implicit.

-------------------------------------------------------------------------------

*/