Number([])
Number([''])
Number(['1'])
Number(['1','2'])
console.log('Line : 1 : ', '2' + 2)  
console.log('Line : 2 : ', '2' - 2)  
console.log('Line : 3 : ', '2' + + 2)
console.log('Line : 4 : ', '2' + - 2) 
console.log('Line : 5 : ', '2' - + 2) 
console.log('Line : 6 : ', '2' - - 2) 
console.log('Line : 7 : ', 'A' - 2)   
console.log('Line : 8 : ', 'A' + 2)   
console.log('Line : 9 : ', 'A' + + 2) 
console.log('Line : 10 : ', 'A' + - 2)
console.log('Line : 11 : ', 'A' - + 2)
console.log('Line : 12 : ', 'A' - - 2) 
console.log('Line : 13 : ', 2 + '2')
console.log('Line : 14 : ', 2 - '2')
console.log('Line : 15 : ', 2 + + '2') 
console.log('Line : 16 : ', 2 + - '2')
console.log('Line : 17 : ', 2 - + '2') 
console.log('Line : 18 : ', 2 - - '2') 
console.log('Line : 19 : ', 2 - 'A')  
console.log('Line : 20 : ', 2 + 'A')  
console.log('Line : 21 : ', 2 + + 'A')
console.log('Line : 22 : ', 2 + - 'A')
console.log('Line : 23 : ', 2 - + 'A')
console.log('Line : 24 : ', 2 - - 'A')
console.log('Line : 25 : ', 'Hello' + 2)
console.log('Line : 26 : ', 'Hello' - 2)
console.log('Line : 27 : ', 2 + 'Hello')
console.log('Line : 28 : ', 2 - 'Hello')
console.log(1 + '1')
console.log(1 - '1')
console.log('1' * 2)
console.log('10' / '2')
console.log(0 == false)
console.log(0 === false)
console.log([] + []) 
console.log([] + {})  
console.log({} + []) 
console.log({} + {})
console.log('5' - - '5')
console.log('5' + - '5')
console.log(null + 1)
console.log(undefined + 1)
console.log(typeof NaN)
console.log('' == 0) 
console.log('' === 0)
console.log(' \t\n' == 0)
console.log(1 < 2 < 3)
console.log(3 > 2 > 1)
console.log(+true)   
console.log(!'false')
console.log('false' == false)
console.log([] == ![]);
console.log([] == false);
console.log(![] == false);
console.log([] == 0)  
console.log([0] == 0) 
console.log([null] == 0) 
console.log([undefined] == 0)

for (var i =0; i<5; i++) {
  setTimeout(function () {
    console.log('i : ',i)
  },0)
}

for (let i =0; i<5; i++) {
  setTimeout(function () {
    console.log('i : ',i)
  },0)
}

// to fix var issue
// 1. Use an IIFE (closure)
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function () {
      console.log("i :", i);
    }, 0);
  })(i);
}
// 2. Pass i as setTimeout argument
for (var i = 0; i < 5; i++) {
  setTimeout(function(i) {
    console.log("i :", i);
  }, 0, i);
}