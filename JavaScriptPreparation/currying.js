// Normal Function
function add(a, b, c) {
  return a + b + c;
}

console.log(add(1, 2, 3));

// Curried Version

function curryAdd(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
console.log(curryAdd(1)(2)(3));
/*

Currying is simply the transormation of multi argument function to a single argument function chain
It is usually implemented with closures
Resuability
Partial Application/Usage

*/

// Practical Example for logs

function log(type) {
  return function (msg) {
    console.log(`[${type}] ${msg}`)
  }
}

const infoType = log('INFO')       // Partial Application
const errorType = log('ERROR')     // Partial Application
infoType('DB Connected')           // Resuability
infoType('Server Started')         // Resuability
errorType('Something went wrong')  // Resuability
errorType('DB connection broke')   // Resuability