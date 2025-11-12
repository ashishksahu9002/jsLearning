// --------------------------- Functions ------------------------------------------------
/*
  - Function :- 
    - A function is a reusable block of code that performs a specific task.
    - Functions in JavaScript are first-class citizens, meaning :- 
      - Can be assigned to variables.
      - Can be passed as arguments.
      - Can be returned from other functions.
      - Have properties and methods (like any object).
*/
// --------------------------------------------------------------------------------------

// ----- Function Syntax ----------------------------------------------------------------
/*
  - Function declarations :- 
    -A function definition (also called a function declaration, or function statement) consists of the function keyword, followed by :- 
      - The name of the function.
      - A list of parameters to the function, enclosed in parentheses and separated by commas.
      - The JavaScript statements that define the function, enclosed in curly braces, {  …  }.
*/
function greet(name) {
  return `Hello, ${name}`;
}

// Hoisted — you can call before it’s defined.
// Creates a function with the given name in the current scope.

// --------------------------------------------------------

// ----- Function Expression ------------------------------
/*
  - Function Expression :- 
    - A Function Expression is when a function is assigned to a variable, property or passed as an argument.
    - A Function Expression is a function defined within an expression, often stored in a variable or passed as a value.
    - It gives you flexibility, encapsulation, and control — especially when you need to use functions dynamically, inline, or privately.
*/
const greet = function (name) {
  return `Hello, ${name}`;
};
// Assigned to a variable (can be anonymous or named).
// Not hoisted (available only after definition).

// ----- Types of Function Expressions -----
//  1. Anonymous Function Expression
//    - No name after function
const sayHi = function () {
  console.log("Hi!");
};
//    - Common for callbacks
setTimeout(function () {
  console.log("This runs later!");
}, 1000);
//  2. Named Function Expression
//    - A function expression with an internal name (for recursion or debugging).
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};
console.log(factorial(5)); // 120
// fact is only visible inside the function — helps recursion and stack traces.

// --------------------------------------------------------

// ----- Arrow Function -----------------------------------
/*
  - Arrow Function :- 
    - An Arrow Function is a shorter syntax for writing function expressions.
*/
// Instead of :-
const add = function (a, b) {
  return a + b;
};
// you write :-
const add = (a, b) => a + b;
// Both do the same thing — but arrow functions are more concise and have different behavior with this.
/*
  - Purpose of Arrow Functions :- 
    - Provide a compact syntax for defining functions.
    - Automatically bind this lexically (to the surrounding scope).
    - Ideal for callbacks, array methods, and short functions.
  - Why Arrow Functions Are Important :- 
    - Simplify function expressions.
    - Avoid common “this” mistakes in callbacks.
    - Improve readability in functional-style programming (map, filter, reduce).
  - Syntax Forms :- 
    - Basic :- 
      const greet = () => console.log("Hello!");
    - With parameters :- 
      const add = (a, b) => a + b;
      - With one parameter (no parentheses needed) :- 
        const square = x => x * x;
    - With multiple statements (use {} and return) :- 
      const sum = (a, b) => {
        const result = a + b;
        return result;
      };
    - Returning an object (wrap in parentheses) :- 
      const createUser = (name, age) => ({ name, age });
      - Without parentheses, {} is treated as a block, not an object literal.
  - 'this' in arrow functions :- 
    - Arrow functions don’t have their own this.
    - They capture this from the surrounding lexical scope (where they are defined).
    - That makes them perfect for callbacks inside classes or methods.
  - In simple words :- 
    - Arrow functions = shorter, cleaner, lexically scoped this.
    - Great for callbacks and inline functions.
    - But not for methods or constructors.
*/
// --------------------------------------------------------

// ----- Anonymous Function -------------------------------
/*
  - Anonymous Function :- 
    - An anonymous function is a function without a name.
  - In code:
    function() {
      console.log("I'm anonymous!");
    }
    - That’s it — there’s no identifier after function.
  - But because a function must be used somehow, anonymous functions are typically :- 
    - Assigned to a variable
    - Passed as an argument
    - Returned from another function
*/
// Assigned to a variable
const greet = function () {
  console.log("Hello there!");
};
greet(); // "Hello there!"
// Passed as a callback
setTimeout(function () {
  console.log("Timer done!");
}, 1000);
// Returned from another function
function outer() {
  return function () {
    console.log("Inner anonymous function");
  };
}
const inner = outer();
inner(); // "Inner anonymous function"
// Immediately Invoked Function Expression (IIFE)
(function () {
  console.log("Runs instantly!");
})();
/*
  - Purpose of Anonymous Functions :- 
    - Anonymous functions are used when:
      - You don’t need to reuse the function elsewhere.
      - You want to pass logic inline (e.g., a callback).
      - You want to keep scope clean (no named global functions).
  - Why Anonymous Functions Are Important :- 
    - They make code concise and flexible.
    - They’re the foundation for functional programming in JS.
    - They enable callbacks, closures, and event handlers.
    - They allow functions to behave as first-class citizens (treated like values).
*/
// --------------------------------------------------------

// ----- IIFE ---------------------------------------------
/*
  - IIFE :- 
    - An IIFE (Immediately Invoked Function Expression) is a function that runs immediately after it’s defined — without needing to be called later.
*/
//  Basic Syntax :-
(function () {
  console.log("This runs immediately!");
})();
/*
  - Breakdown :- 
    - It’s an anonymous function expression wrapped in parentheses (...).
    - The last () invokes it right away.
*/
/*
  - Purpose of IIFE :- 
    - An IIFE’s main purposes are to :- 
      - Execute code immediately without needing to call it separately.
      - Create a private scope — variables inside the IIFE are not accessible outside.
      - Avoid polluting the global scope — helps keep code modular.
      - Initialize logic once — e.g., setting up configs or listeners at load time.
  - Why It’s Important :- 
    - Before ES6 introduced let, const, and modules, IIFEs were the only way to:
    - Create block-like scope in JavaScript.
    - Prevent variable name collisions in global scripts.
    - Write self-contained, modular code.
  - Even today, IIFEs are useful for :- 
    - Initialization code
    - Configuration setup
    - Encapsulating utilities
*/
// Basic IIFE
(function () {
  console.log("Hello from IIFE!");
})();

// IIFE with parameters
((name) => {
  console.log(`Hello, ${name}!`);
})("Ashish");

// IIFE returning an object
const user1 = (() => {
  const name = "Ashish";
  return { getName: () => name };
})();
console.log(user1.getName()); // "Ashish"
/*
  - Why function(){}(); Fails :- 
    - If a function is written as :- 
function() {
  console.log("Hi!");
}();
    - SyntaxError — “Function statements require a name”
  - Why? :- 
    - When JavaScript sees the keyword function at the start of a statement, it assumes it is a function declaration, which must have a name (like function greet()).
    - But here, a name was not given to it → so it’s invalid syntax.
  - How Parentheses Fix It :- 
    - If it is written as :- 
(function() {
  console.log("Hi!");
})();
    - Works perfectly!
  - Why? :- 
    - The key difference :- 
      - The first parenthesis ( makes JavaScript treat what’s inside as an expression, not a declaration. So the code inside () is parsed as a Function Expression, and the last () immediately invokes it.
*/
// --------------------------------------------------------

// ----- Constructor Function -----------------------------
// Used with new to create objects.
function Person(name) {
  this.name = name;
}
const p1 = new Person("Ashish");
// Creates instances with this pointing to the new object.
// Person.prototype shared across instances.

// --------------------------------------------------------

// ----- Async Function (async function) ------------------
// Simplifies working with Promises using await.
async function fetchData() {
  const res = await fetch("https://api.example.com");
  return res.json();
}
// Returns a Promise automatically.
// Inside, you can use await to pause until Promise resolves.
// --------------------------------------------------------------------------------------

// ----- Object Literal or Class --------------------------------------------------------
// Method Definition (Object Literal or Class)
const user2 = {
  greet() {
    console.log("Hello!");
  },
};
user2.greet();
// Shorthand syntax (no function keyword).
// Not hoisted, added as a method property.
// --------------------------------------------------------

// --------------------------------------------------------
// Static Method (Class Level)
class MathUtil {
  static add(a, b) {
    return a + b;
  }
}
MathUtil.add(2, 3); // 5
// Belongs to the class itself, not instances.
// --------------------------------------------------------

// --------------------------------------------------------
// Getter & Setter Functions
// Used to intercept property access.
const user = {
  first: "Ashish",
  last: "Kumar",
  get fullName() {
    return `${this.first} ${this.last}`;
  },
  set fullName(name) {
    [this.first, this.last] = name.split(" ");
  },
};
// Used for computed or controlled properties.
// --------------------------------------------------------------------------------------

// ----- Special Function Objects and Concepts ------------------------------------------
/*
  - The arguments Object :- 
    - Available in non-arrow functions.
    - Array-like, holds all passed arguments.
*/
function show() {
  console.log(arguments);
}
show(1, 2, 3); // [1,2,3]
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - Rest Parameters (...args) :- 
    - Collects all remaining arguments into an array.
*/
function sum(...nums) {
  return nums.reduce((a, b) => a + b, 0);
}
// Preferred over arguments for real arrays.
// --------------------------------------------------------

// --------------------------------------------------------
// Default Parameters
function greet(name = "Guest") {
  console.log(`Hello, ${name}`);
}
greet(); // Hello, Guest
// --------------------------------------------------------

// --------------------------------------------------------
/*
  - Return Values :- 
    - If no return, function returns undefined.
    - return ends function execution immediately.
*/
function add(a, b) {
  return a + b;
}

// --------------------------------------------------------------------------------------

// ----- Higher-Order Function ----------------------------------------------------------
/*
  - Higher-Order Function :- 
    -A Higher-Order Function is a function that either :- 
      - Takes another function as an argument, or
      - Returns a new function as its result.
      - Or both.
  - In simple words :- 
    - A function that operates on functions — either by receiving them or producing them.
*/
// Example 1 — Takes a function as an argument
function greet(name) {
  return `Hello, ${name}`;
}
function callWithName(callback) {
  return callback("Ashish");
}
console.log(callWithName(greet));
// Output: "Hello, Ashish"
// callWithName() is a higher-order function because it takes another function (greet) as input.
// Example 2 — Returns a new function
function multiplier(factor) {
  return function (num) {
    return num * factor;
  };
}
const double = multiplier(2);
console.log(double(5)); // 10
// multiplier() is a higher-order function because it returns another function.
/*
  - Purpose of Higher-Order Functions :- 
    - Higher-order functions exist to:
    - Make code more reusable and modular
    - Enable abstraction of behavior
    - Support functional programming patterns (like map, filter, reduce)
    - Enable callbacks, closures, and composition
*/
// --------------------------------------------------------------------------------------

// ----- Functions are Objects ----------------------------------------------------------
// Functions have built-in properties :-
function demo(a, b) {}
console.log(demo.name); // "demo"
console.log(demo.length); // 2 (parameter count)
// --------------------------------------------------------------------------------------

// ----- Factory Function ---------------------------------------------------------------
/*
  - A Factory Function is a regular function that returns a new object every time it’s called.
  - A factory function is a regular function that:
    - Returns a new object every time it’s called.
    - Does not use the new keyword.
    - Does not rely on this.
    - Can create private data using closures.
*/
// Ex :- 1.
function createUser(name, age) {
  return {
    name,
    age,
    greet() {
      console.log(`Hi, I'm ${this.name}, ${this.age} years old.`);
    },
  };
}

const user11 = createUser("Ashish", 25);
const user12 = createUser("John", 30);

user11.greet(); // Hi, I'm Ashish, 25 years old.
user12.greet(); // Hi, I'm John, 30 years old.

// Ex :- 2.
function createCounter() {
  let count = 0; // private variable
  return {
    increment() {
      count++;
      console.log(count);
    },
    decrement() {
      count--;
      console.log(count);
    },
    getCount() {
      return count;
    },
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
console.log(counter.count); // undefined
// --------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------------------
/*
| Type                     | Syntax                           | Hoisted | `this`        | Use Case                 |
| ------------------------ | -------------------------------- | ------- | ------------- | ------------------------ |
| **Function Declaration** | `function name(){}`              |  Yes    | Dynamic       | Reusable named functions |
| **Function Expression**  | `const f = function(){}`         |  No     | Dynamic       | Callbacks, closures      |
| **Arrow Function**       | `const f = () => {}`             |  No     | Lexical       | Short callbacks          |
| **Anonymous Function**   | `function(){}`                   |  No     | Dynamic       | Inline logic             |
| **IIFE**                 | `(function(){})()`               |  No     | Private scope | Init/setup code          |
| **Constructor Function** | `function Name(){ this... }`     |  No     | `new` binding | Object creation          |
| **Generator**            | `function*(){}`                  |  No     | Dynamic       | Lazy iteration           |
| **Async Function**       | `async function(){}`             |  No     | Dynamic       | Promise-based async code |
| **Callback**             | Passed to another                |  No     | Varies        | Event handling, async    |
| **Higher-Order**         | Function taking/returning fn     |  No     | Varies        | Abstraction              |
| **Recursive**            | Calls itself                     | ✅/❌  | Varies        | Repetitive tasks         |
| **Nested**               | Function inside function         |  No     | Closure       | Scoped helpers           |
| **Pure Function**        | No side effects                  |  Yes    | Deterministic | Predictable results      |
*/
// ----------------------------------------------------------------------------------------------------------------
/*
Types of Functions in JavaScript
🧩 1. Function Declaration
🔹 Definition

A function declaration defines a named function using the function keyword.

function greet() {
  console.log("Hello!");
}
greet(); // "Hello!"

🔹 Characteristics

Must have a name.

Hoisted → can be called before definition.

Good for reusable named functions.

🔹 Example (Hoisting):
sayHi(); // Works
function sayHi() {
  console.log("Hi!");
}

🧩 2. Function Expression
🔹 Definition

A function expression defines a function inside an expression, optionally assigning it to a variable.

const greet = function() {
  console.log("Hello from expression!");
};
greet();

🔹 Characteristics

Can be anonymous or named.

Not hoisted (unlike declarations).

Used for callbacks or closures.

🔹 Example (Named Expression)
const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};

🧩 3. Arrow Function (ES6)
🔹 Definition

A shorter syntax for writing function expressions.

const add = (a, b) => a + b;
console.log(add(2, 3)); // 5

🔹 Characteristics

Compact syntax.

Lexical this → inherits this from parent scope.

Cannot be used as a constructor.

No arguments object or prototype.

🔹 Example
const double = x => x * 2;
[1, 2, 3].map(x => x * 2);

🧩 4. Anonymous Function
🔹 Definition

A function without a name.

Usually used as callbacks or inside expressions.

setTimeout(function() {
  console.log("Anonymous function executed!");
}, 1000);

🔹 Characteristics

Doesn’t have a name.

Not reusable by name.

Often used in short, one-time operations.

🧩 5. Named Function Expression
🔹 Definition

A function expression with a name (useful for recursion or debugging).

const factorial = function fact(n) {
  return n <= 1 ? 1 : n * fact(n - 1);
};


✅ fact is available only inside the function — not outside.

🧩 6. Immediately Invoked Function Expression (IIFE)
🔹 Definition

A function that runs immediately after being defined.

(function() {
  console.log("IIFE executed!");
})();

🔹 Characteristics

Executes instantly.

Creates a private scope.

Used for initialization or encapsulation.

🧩 7. Constructor Function
🔹 Definition

A function designed to be called with the new keyword — used to create objects.

function Person(name) {
  this.name = name;
}
const p1 = new Person("Ashish");
console.log(p1.name); // "Ashish"

🔹 Characteristics

Uses this to assign properties.

Called with new.

Prototype-based inheritance.

Acts as a class blueprint (pre-ES6 classes).

🧩 8. Generator Function
🔹 Definition

A special function that can pause and resume its execution using yield.

function* counter() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = counter();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

🔹 Characteristics

Declared with function*.

Returns an iterator object.

Useful for lazy evaluation, async flows, or infinite sequences.

🧩 9. Async Function (ES8)
🔹 Definition

An asynchronous function that always returns a Promise.

async function fetchData() {
  const response = await fetch("/data");
  return response.json();
}

🔹 Characteristics

Use async keyword.

await pauses execution until a promise resolves.

Cleaner syntax for asynchronous code.

🧩 10. Callback Function
🔹 Definition

A function passed as an argument to another function and executed later.

function processUserInput(callback) {
  const name = "Ashish";
  callback(name);
}
processUserInput(function(name) {
  console.log("Hello, " + name);
});

🔹 Characteristics

Passed as parameter.

Executed later (synchronously or asynchronously).

Core to async operations (e.g., setTimeout, event listeners).

🧩 11. Higher-Order Function
🔹 Definition

A function that takes another function as argument or returns another function.

function repeat(fn, times) {
  for (let i = 0; i < times; i++) fn();
}

repeat(() => console.log("Hi!"), 3);


✅ repeat is higher-order — takes a function as input.

🧩 12. Recursive Function
🔹 Definition

A function that calls itself to solve smaller subproblems.

function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

🔹 Characteristics

Must have a base condition to stop recursion.

Used for problems like factorial, Fibonacci, tree traversal, etc.

🧩 13. Nested Function (Inner Function)
🔹 Definition

A function defined inside another function.

function outer() {
  function inner() {
    console.log("Inner function");
  }
  inner();
}
outer();


✅ Inner functions can access outer function variables → closure.

🧩 14. Pure Function
🔹 Definition

A function that:

Always returns the same output for the same input.

Has no side effects.

function add(a, b) {
  return a + b; // ✅ Pure
}


✅ Predictable, testable, reusable → foundation of functional programming.

🧩 15. Impure Function
🔹 Definition

A function that changes external state or depends on it.

let count = 0;
function increment() {
  count++; // ❌ modifies external variable
  return count;
}


⚠️ Not predictable → result depends on external changes.

🧩 16. Arrow + Async (Hybrid Example)

You can combine types:

const fetchUser = async () => {
  const res = await fetch("/user");
  return res.json();
};


✅ Async + Arrow + Anonymous all in one.
*/
