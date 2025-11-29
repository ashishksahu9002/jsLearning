// ------------------------------------ PROMISE -----------------------------------------
// - A Promise is an object that represents the eventual completion (or failure) of an asynchronous operation.

const promise = new Promise((resolve, reject) => {
  const success = true;
  if (success) {
    resolve("✅ Operation successful!");
  } else {
    reject("❌ Operation failed!");
  }
});
promise
  .then((result) => console.log(result))
  .catch((error) => console.log(error));
/*
  - Promise States :- 
    - A promise can be in one of three states :-
  |--------------------------------------------------------------------------|
  | State                    | Description                                   |
  | ------------------------ | --------------------------------------------- |
  | **pending**              | The initial state; operation not yet complete |
  | **fulfilled (resolved)** | The operation completed successfully          |
  | **rejected**             | The operation failed                          |
  |--------------------------------------------------------------------------|
  - Once a promise settles (fulfilled or rejected), it becomes immutable — the result can’t change.
*/
// --------------------------------------------------------

// ----- .then(), .catch(), .finally() --------------------
/*
  |-----------------------------------------------------------|
  | Method               | Purpose                            |
  | -------------------- | ---------------------------------- |
  | `.then(onFulfilled)` | Runs when resolved                 |
  | `.catch(onRejected)` | Runs when rejected                 |
  | `.finally(callback)` | Runs regardless of success/failure |
  |-----------------------------------------------------------|
*/
const myPromise = new Promise((resolve, reject) => {
  let success = true; // Change to false to see rejection
  setTimeout(() => {
    if (success) {
      resolve("Data fetched successfully! ✅");
    } else {
      reject("Error fetching data ❌");
    }
  }, 2000);
});
myPromise
  .then((result) => console.log(result)) // Runs if resolved
  .catch((error) => console.log(error)) // Runs if rejected
  .finally(() => console.log("Promise completed ✅")); // Always runs
/*
  - Output (if success = true) :-
    - Data fetched successfully! ✅
    - Promise completed ✅
  - Output (if success = false) :-
    - Error fetching data ❌
    - Promise completed ✅
*/
// --------------------------------------------------------

// ----- Promise Chaining ---------------------------------
// You can chain .then() to run asynchronous tasks in sequence.

new Promise((resolve) => {
  resolve(2);
})
  .then((num) => num * 2)
  .then((num) => num * 3)
  .then((result) => console.log(result)); // 12
// Each .then() returns a new promise.

// Real-world Example:
fetch("https://api.example.com/user")
  .then((res) => res.json())
  .then((data) => console.log("User:", data))
  .catch((err) => console.error("Error:", err));
// --------------------------------------------------------

// ----- Promise Error Handling ---------------------------
// Errors thrown in .then() are caught by the nearest .catch() in the chain.
Promise.resolve("start")
  .then(() => {
    throw new Error("Oops!");
  })
  .catch((err) => console.log("Caught:", err.message))
  .finally(() => console.log("Cleanup"));
/*
Caught: Oops!
Cleanup
*/
// --------------------------------------------------------

// ----- Promise.all([...]) -------------------------------
/*
  - Takes an array of promises and waits for all of them to resolve.
  - If any promise fails, it rejects immediately.
*/
// Ex 1 :-
const p1 = Promise.resolve("Task 1 Done");
const p2 = new Promise((resolve) =>
  setTimeout(() => resolve("Task 2 Done"), 2000)
);
const p3 = Promise.resolve("Task 3 Done");
Promise.all([p1, p2, p3])
  .then((results) => console.log(results))
  .catch((error) => console.log(error));
/*
  - Output after 2 seconds :- 
    - ["Task 1 Done", "Task 2 Done", "Task 3 Done"]
  - If one fails :- 
    - Error from the rejected promise
*/
// Ex 2 :-
Promise.all([
  Promise.resolve("A"),
  Promise.resolve("B"),
  Promise.resolve("C"),
]).then((result) => console.log(result));
// ["A", "B", "C"]
// --------------------------------------------------------

// ----- Promise.allSettled([...]) ------------------------
// Similar to Promise.all(), but waits for all promises to complete, whether they resolve or reject.
// Waits for all promises to finish (no matter success or failure).
// Ex 1 :-
Promise.allSettled([Promise.resolve("Success"), Promise.reject("Fail")]).then(
  console.log
);
/*
  - Output :- 
[
  { status: "fulfilled", value: "Success" },
  { status: "rejected", reason: "Fail" },
];
*/
// Ex 2 :-
const p11 = Promise.resolve("Success ✅");
const p21 = Promise.reject("Failed ❌");
const p31 = new Promise((resolve) =>
  setTimeout(() => resolve("Another success ✅"), 1500)
);
Promise.allSettled([p11, p21, p31]).then((results) => console.log(results));
/*
  - Output :- 
[
  { status: "fulfilled", value: "Success ✅" },
  { status: "rejected", reason: "Failed ❌" },
  { status: "fulfilled", value: "Another success ✅" }
]
*/
// --------------------------------------------------------

// ----- Promise.race() -----------------------------------
/*
  - Returns the result of the first settled promise (resolved or rejected).
  - Think of a race between multiple promises :-
    - As soon as one finishes (resolve or reject), the race ends.
    - The others are ignored (their results don’t matter).
  - Internally :- 
    - JS starts all promises at once.
    - It “watches” for the first one to settle (resolve/reject).
    - As soon as one settles → Promise.race() resolves/rejects with that outcome.
  - Use Cases of Promise.race() :- 
    - Timeout for Slow Operations :- 
      - If a network call takes too long, you can “race” it against a timeout promise.
      - Whichever finishes first (the fetch or timeout) determines the outcome.
    - Fastest Response Wins :- 
      - Useful when you fetch from multiple sources and want whichever responds first.
      - You can use this to handle redundant API calls for reliability.
    - Abort Long-running Async Tasks :- 
      - You can combine with AbortController or a timeout race to cancel slow tasks.
      - Very common pattern in modern async code (like React, Node APIs, etc.).
  - Common Mistakes :- 
    - Assuming it waits for all promises (it doesn’t).
    - Thinking it only resolves (it can also reject).
    - Forgetting other promises still execute in background (they’re not canceled).
  - Best used for :- 
    - Timeout control
    - Fetching from multiple sources
    - Early exits in async workflows

  |------------------------------------------------------------------------------------------|
  | Behavior                | Description                                                    |
  | ----------------------- | -------------------------------------------------------------- |
  | **Resolves or rejects** | As soon as the *first promise* settles (resolve or reject).    |
  | **Ignores others**      | Remaining promises still run in background but are ignored.    |
  | **Returned value**      | The value or error of the first settled promise.               |
  | **Empty iterable**      | `Promise.race([])` → returns a promise that **never settles**. |
  | **Non-promise values**  | They’re wrapped as resolved promises.                          |
  |------------------------------------------------------------------------------------------|
*/
// Ex 1 :-
Promise.race([
  new Promise((res) => setTimeout(() => res("Fast"), 100)),
  new Promise((res) => setTimeout(() => res("Slow"), 1000)),
]).then(console.log); // "Fast"
// Output: "Fast ✅" (since p1 resolves first)
// --------------------------------------------------------

// ----- Promise.any([...]) -------------------------------
// Returns the first fulfilled promise (ignores rejections).
// If all reject → returns an AggregateError.
Promise.any([
  Promise.reject("Fail 1"),
  Promise.resolve("Win!"),
  Promise.reject("Fail 2"),
]).then(console.log); // "Win!"
// --------------------------------------------------------
// ----- Difference: Promise.race() vs Promise.any() vs Promise.all() vs Promise.allSettled()
/*
  |-----------------------------------------------------------------------------------------------------------------|
  | Method                   | Resolves When                                  | Rejects When        | Ignores       |
  | ------------------------ | ---------------------------------------------- | ------------------- | ------------- |
  | **`Promise.all`**        | All promises resolve                           | Any promise rejects | None          |
  | **`Promise.allSettled`** | All settle (resolve/reject)                    | Never rejects       | None          |
  | **`Promise.any`**        | First *resolved* promise                       | All reject          | Rejected ones |
  | **`Promise.race`**       | First *settled* (resolved or rejected) promise | First rejection     | Remaining ones|
  |-----------------------------------------------------------------------------------------------------------------|
*/
// --------------------------------------------------------

// ----- Summary ------------------------------------------
/*
|-----------------------------------------------------------------------------|
| Concept        | Description                  | Example                     |
| -------------- | ---------------------------- | --------------------------- |
| Create Promise | `new Promise((res,rej)=>{})` | async tasks                 |
| Resolve        | `resolve(value)`             | success                     |
| Reject         | `reject(error)`              | failure                     |
| then()         | Success callback             | `.then(v=>{})`              |
| catch()        | Error callback               | `.catch(e=>{})`             |
| finally()      | Always runs                  | `.finally(()=>{})`          |
| all()          | Waits all success            | `Promise.all([...])`        |
| race()         | First settled wins           | `Promise.race([...])`       |
| any()          | First fulfilled wins         | `Promise.any([...])`        |
| allSettled()   | Waits all settled            | `Promise.allSettled([...])` |
|-----------------------------------------------------------------------------|
*/
// --------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------

// ----- List of Promise-Based Functions in JavaScript -----

// JavaScript has many built-in and third-party Promise-based functions that handle asynchronous tasks like fetching data, file reading, timers, and more. Here’s a list of common Promise-based functions along with explanations:

// --------------------------------------------------------
// ----- 1️⃣ fetch() – HTTP Requests ----------------------
// Used to make network requests (GET, POST, etc.) and retrieve data from APIs.

fetch("https://jsonplaceholder.typicode.com/posts/1")
  .then((response) => response.json()) // Convert response to JSON
  .then((data) => console.log("Post:", data))
  .catch((error) => console.error("Error:", error));
/*
  - Key Points :- 
    - Returns a Promise that resolves with a Response object.
    - Requires .json(), .text(), etc., to extract actual data.
    - Rejects only on network errors (not HTTP errors like 404).
*/
// --------------------------------------------------------

// ----- 2️⃣ navigator.geolocation.getCurrentPosition() – Get User Location
// Fetches the user’s current GPS location.
function getLocation() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}
getLocation()
  .then((position) => console.log("Coordinates:", position.coords))
  .catch((error) => console.error("Error getting location:", error));
/*
  - Key Points :- 
    - Native browser API.
    - Needs user permission to access location.
    - Can fail if location services are disabled.
*/
// --------------------------------------------------------

// ----- 3️⃣ setTimeout() – Delay Execution ---------------
// Wraps setTimeout in a Promise to create a delay function.
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function run() {
  console.log("Waiting...");
  await delay(2000);
  console.log("Done! 🎉");
}
run();
/*
  - Key Points :- 
    - Used to pause execution in async/await functions.
    - Helps in debouncing, loading effects, and simulated delays.
*/
// --------------------------------------------------------

// ----- 4️⃣ setInterval() – Run Code Repeatedly ----------
// Wraps setInterval inside a Promise.
function waitForInterval(ms, count) {
  return new Promise((resolve) => {
    let counter = 0;
    let interval = setInterval(() => {
      counter++;
      console.log("Tick", counter);
      if (counter >= count) {
        clearInterval(interval);
        resolve("Interval Completed!");
      }
    }, ms);
  });
}
waitForInterval(1000, 5).then((message) => console.log(message));
/*
  - Key Points :- 
    - Repeats code execution every X milliseconds.
    - Needs clearInterval() to stop execution.
*/
// --------------------------------------------------------

// ----- 5️⃣ FileReader.readAsText() – Read Local Files ---
// Reads the content of a file asynchronously.
function readFile(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
document.querySelector("#fileInput").addEventListener("change", (event) => {
  let file = event.target.files[0];
  readFile(file)
    .then((content) => console.log("File Content:", content))
    .catch((error) => console.error("Error reading file:", error));
});
/*
  - Key Points :- 
    - Works in the browser.
    - Reads files as text, binary, or data URLs.
    - Uses event-based API converted to a Promise.
*/
// --------------------------------------------------------

// ----- 6️⃣ Clipboard API – Copy & Paste -----------------
// Used to copy text to the clipboard asynchronously.
navigator.clipboard
  .writeText("Hello World!")
  .then(() => console.log("Text copied! ✅"))
  .catch((error) => console.error("Failed to copy:", error));
/*
  - Key Points :- 
    - Works only in secure HTTPS pages.
    - Needs user interaction (e.g., button click).
    - Supports both reading and writing.
*/
// --------------------------------------------------------

// ----- 7️⃣ Notification.requestPermission() – Browser Notifications
// Requests permission to show system notifications.
async function askNotificationPermission() {
  let permission = await Notification.requestPermission();
  if (permission === "granted") {
    new Notification("Hello! 🎉", { body: "You enabled notifications!" });
  } else {
    console.log("Notifications blocked.");
  }
}
askNotificationPermission();
/*
  - Key Points :-
    - Requires user permission.
    - Useful for chat apps, reminders, and alerts.
*/
// --------------------------------------------------------

// ----- 8️⃣ Bluetooth API – Connect to Bluetooth Devices -
// Allows connecting to nearby Bluetooth devices.
navigator.bluetooth
  .requestDevice({ acceptAllDevices: true })
  .then((device) => console.log("Connected to:", device.name))
  .catch((error) => console.error("Bluetooth error:", error));
/*
  - Key Points :- 
    - Works in Chromium-based browsers (Chrome, Edge).
    - Requires user interaction.
*/
// --------------------------------------------------------

// ----- 9️⃣ WebSockets – Real-Time Data ------------------
// Handles real-time communication over a network.
let socket = new WebSocket("wss://echo.websocket.org");
socket.onopen = () => {
  console.log("Connected to WebSocket");
  socket.send("Hello Server!");
};
socket.onmessage = (event) => console.log("Message from server:", event.data);
socket.onerror = (error) => console.error("WebSocket Error:", error);
/*
  - Key Points :-
    - Keeps a persistent connection.
    - Used for chat apps, stock prices, and live updates.
*/
// --------------------------------------------------------

// ----- 🔟 IndexedDB – Store Data Locally -----------------
// A Promise-based browser database for storing large data.
let db;
let request = indexedDB.open("MyDatabase", 1);
request.onsuccess = (event) => {
  db = event.target.result;
  console.log("Database opened successfully");
};
request.onerror = (error) => console.error("Error opening database:", error);
/*
  - Key Points :-
    - Stores structured data in the browser.
    - Used for offline storage.
*/
