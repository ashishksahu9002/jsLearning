/*
  Throttling :- It makes sure a function runs at most once in a given/certain time interval no matter how many times it is called.
    - Runs immediately then ignores the extra calls until the dalay finishes
    - In other words Throttling ensures a function executes at most once every Xms
  Leading Throttling :- It is Throttling or Leading Throttling called everything is same
      
      The time interval for the throttling is 1000ms
      so if function call happens at 0ms, 200ms, 600ms, 900ms, then function call happens at 0ms then all the extra calls are ignored. Since the last function call happens at 900ms then no call happens at 1000ms as there was no function call.
      So here comes a problem that we lose the last update value.
      Here comes the need of Trailing Throttling, it is needed because Leading Throttle only runs when a call happens not automatically at the end of the delay. Without Trailing, the very last call inside the delay window can be lost

  Triling Throttling :- It basically remembers the last call's argument and context and when the delay is completed, it executes one more time with those last saved values
      
      So according to the above scenario, since the last call happened at 900ms then it remembers this and executes at 1000ms
      Function call happens at 0ms, 200ms, 600ms, 900ms, 1200ms
      Here Function executes at: 0ms (leading first call) 1000ms (trailing saved 900ms call) 2000ms (trailing saved 1200ms call)

*/

let count = 0;

const showCount = () => {
  console.log("Count : ", count++);
};

const throttle = (func, delay) => {
  let lastCall = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

const leadTrailThrottling = (func, delay) => {
  let lastCall = 0;
  let timer;
  return function (...args) {
    const now = Date.now();
    let remainingTime = delay - (now - lastCall);
    if (remainingTime <= 0) {
      clearTimeout(timer);
      lastCall = now;
      func.apply(this, args);
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastCall = Date.now();
        func.apply(this, args);
      }, remainingTime);
    }
  };
};

// const throttleCount = throttle(showCount, 1000);
const leadTrailThrottlingCount = leadTrailThrottling(showCount, 5000);

const btn = document.querySelector("#btn");
btn.addEventListener("click", leadTrailThrottlingCount);
