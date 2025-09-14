// For call, apply, and bind, the first argument is the value you want to use as 'this' inside the function. If you don’t care, you can pass null or undefined. But remember: arrow functions ignore it, and primitives get converted to their object wrappers.

function greet(greeting, punctuation) {
  console.log(greeting, " ", this.name, punctuation);
}

const user = {
  name: "Ashish",
};

greet.call(user, "Hello", "!!");
// in the function greet 'this' refers to the object user
// it get called immediately with the given this and arguments passed

greet.apply(user, ["Hey", "?"]);
// It is same as call
// Only difference is the second arguments is passed in an array

const greetFn = greet.bind(user, "Hi");
greetFn("??");
// It doesn't call immediately
// It return a new function which is permanently bound to the object this refers to

/*

Use case of this, call, apply, bind in normal function and arrow function

|           Case            |                  Normal Function                          |                    Arrow Function                        |
| ------------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| **Plain call**            | `this` depends on how the function is called              | `this` is **lexically inherited** from where the arrow   |
|                           | (global in non-strict, `undefined` in strict)             | function was  defined                                    |
| **obj.method()**          | `this` = the object before the dot                        | `this` = outer scope (not the object)                    |
| **call / apply**          | Changes `this` to whatever you pass                       | Ignored, `this` stays the same as lexical scope          |
| **bind**                  | Returns a new function with permanently fixed `this`      | Ignored, `this` stays lexical                            |
| **Used in event handler** | `this` = element that triggered event                     | Arrow uses outer `this` (often useful in callbacks like  |
|                           |                                                           | was  defined                                             |
*/




