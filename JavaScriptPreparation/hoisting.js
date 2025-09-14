/*
Hoisting is JavaScript’s default behavior of moving declarations (variables and functions) to the top of their scope during the memory creation phase, before code execution begins.

👉 This means you can use variables/functions before they are written in the code, but how they behave depends on whether you used var, let, const, or function.

Hoisting of variables and functions can only happen inside their lexical scope

✅ In short:
    Hoisting = “Declarations are remembered before execution”
    But initialization behavior differs:
      var → hoisted as undefined
      let/const → hoisted but in TDZ
      function → hoisted fully

  Hoisting always happens inside the lexical scope where the variable/function is written.
    Global → available everywhere.
    Function → only inside that function.
    Block (let, const) → only inside that block.


*/

// console.log(b) --> b is not hoisted as it is out of its lexical scope --- it gives reference error
function add() {
  console.log("b : ", b); // b is hoisted and is value is undefined
  console.log("c : ", c); // var is functionally scoped
  var b = 10;
  {
    var c = 5;
    let d = 15;
    const e = 20;
  }
  add2(); // Function declarations are fully hoisted in their lexical scope, so they can be invoked before their definition appears in the code.
  function add2() {
    // console.log('f : ', f, ' g : ', g) let/const variables are hoisted but stay in TDZ until their execution starts, if used gives reference error
    let f = 15;
    const g = 20;
    console.log(b + c + f + g);
  }
  // console.log('d : ', d, ' e : ', e) let/const are block scoped
}

add();
// add2(); Functions are hoisted to the top of their lexical scope. If used outside their lexical scope they give ReferenceError
