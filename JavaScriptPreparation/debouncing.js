let counter=0;

function getData() {
  // operations
  console.log('Counter : ',counter++)
}

function abc (func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this, args)
    },delay)
  }
}

function abc (func, delay) {
  let timer;
  return (...args) => {
    const ctx = this;
    clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(ctx, args)
    },delay)
  }
}
const xyz = abc(getData, 500)

/*

In normal function
  - 'this' is determined dynamically at call time
  - if called by event handler this = <dom element>
  - plain call this = global object

In arrow function
  - it do not bind its own this
  - it captures the 'this' from its lexical scope

*/
/*
----- SetTimeout with arrow function -----
function abc (func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this, args)
    },delay)
  }
}

----- SetTimeout with normal function -----
function abc (func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout( function (){
      func.apply(this, args)
    },delay)
  }
}

setTimeout with arrow function works but not with normal function
  - In arrow the 'this' is lexically inherited means from where the returned function is called the 'this' will point to that object. If it is event driven by some dom element then 'this' points to that dom element and if it called normally (like functionName() ) then 'this' refers to window in non-strict and undefined in strict
  - In normal function, the function inside the setTimeout is called by the timer system (browser/nodejs runtime) as a plain function and not as a methode of the element

  How to fix in normal function ie inside the setTimeout
    - so when the returned function is called by the object, it has 'this' which refers to that object. capture/store the 'this' in some variable and use that variable
    eg:- 
      function abc (func, delay) {
        let timer;
        return function(...args) {
          const ctx = this;     capture the outer this
          clearTimeout(timer)
          timer = setTimeout( function (){
            func.apply(ctx, args)   use the captured this
          },delay)
        }
      }
    - the browser calls it like element.onkeyup().
    - so this = <input> inside the returned function.
    - You store that in const ctx = this.
    - Later, inside the setTimeout callback, you no longer have access to the event handler’s this (because the timer system calls your callback as a plain function).
    - But thanks to the closure, the ctx variable is still alive.
    - So func.apply(ctx, args) runs with this = <input>.

----- Outer Function as normal function -----
function abc (func, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this, args)
    },delay)
  }
}

----- Outer Function as arrow function -----
function abc (func, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(()=>{
      func.apply(this, args)
    },delay)
  }
}

Outer Function as normal function works and not the arrow function because how they behave with 'this'
Outer Function as arrow function takes the 'this' present in its lexical scope ie abc()

*/

