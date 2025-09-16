/*

  Map :- It transform the array and return a new array whose length remains same as the old array
  Filter :- It creates a new array which contains element that pass the give condition or test. The length of the new array may be smaller than the original. So, it simply as it name suggets it filter the array
  Reduce :- It reduces the array to single value by applying a function. So it can be used to create a single [], {} or any other but a single value after the oprations

*/

const arr = [1, 4, 4, 5, 2, 4, 6, 2, 3, 6, 5, 6, 5, 3];

function double(x) {
  return x * 2;
}
let output = arr.map((x) => x * 2);
// console.log(output);
output = arr.map(double);
// console.log(output);

/*

function double (x) {
  return x*2;
  }
  
  x => x*2
  is same
  
  */

output = arr.filter((x) => x % 2 === 0);
// console.log(output);

output = arr.reduce((acc, curr) => {
  if(acc[curr]) {
    acc[curr] += 1
  } else {
    acc[curr] = 1
  }
  return acc;
}, {})

console.log(output)