const obj = { a: 1, b: 2, c: 3 };

// Expected Output: [["a", 1], ["b", 2], ["c", 3]]

let arr = Object.keys(obj).map(x => [x, obj[x]]) // Object.keys(obj) -> returns an array of keys -> map -> return an array whose length is 3 in the form of ['a', 1]

let arr1 = Object.entries(obj) // object.entries is a build in function of object to convert the object's key value pair in a single array and make a nested array of it

let arr2 = Object.keys(obj).reduce((acc, curr) => {
  acc.push([curr, obj[curr]])
  return acc;
}, [])

let arr3 = []

for (let key in obj) {
  arr3.push([key, obj[key]])
}

console.log(arr3)