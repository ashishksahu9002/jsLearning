// ---------------------- Event Propagation -------------------------------------------------------
/*
  - Based On Event Handling :- 
    - 1. What is Event Propagation?
    - 2. What is Event Bubbling?
    - 3. Difference between event bubbling and event propagation.
    - 4. Difference between "event.target", "event.currentTarget" and "this".
    - 5. What is event capturing or tickling?
    - 6. Why doesn’t the event handler get triggered twice when an event goes through both the capturing and bubbling phases? If an event starts in the capturing phase and then moves to the bubbling phase, why isn't it treated as a new event, causing the handler to trigger again?
    - 7. How to stop bubbling or capturing?
    - 8. What is event delegation?
    - 9. Create a modal in JavaScript that closes when clicking outside. (negative space)
*/
// ----------------------------------------------------------------------------

// ----- Event Propagation ----------------------------------------------------
/*
  - 1. What is Event Propagation?
    - Event propagation describes the way events travel through the DOM after they are triggered. It consists of three phases:
      - Capturing Phase (Capture) --> 
        - The event travels from the root of the DOM (e.g., document) down to the target element.
        - This is also called the "trickling phase."
      - Target Phase --> 
        - The event reaches the target element where the event occurred.
      - Bubbling Phase --> 
        - The event travels back up from the target element to the root of the DOM.
*/
// ----------------------------------------------------------------------------

// ----- Event Bubbling -------------------------------------------------------

/*
  - 2. What is Event Bubbling?
    - Event bubbling is a part of event propagation. It refers to the phase where the event starts from the target element and propagates upwards to its ancestors in the DOM tree.
*/
// For example :-
<div id="parent">
  <button id="child">Click Me</button>
</div>;
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent clicked!");
});

document.getElementById("child").addEventListener("click", () => {
  console.log("Child clicked!");
});
/*
  - If you click the button (#child):
    - The click event is first handled by the button.
    - Then it "bubbles up" to the parent (#parent), triggering its listener.
  - Output:
    - Child clicked!
    - Parent clicked!
*/
// ----------------------------------------------------------------------------

// ----- Event Bubbling v/s Event Propagation ---------------------------------
/*
  - 3. Difference between event bubbling and event propagation.
    - Key Differences Between Event Bubbling and Event Propagation
  --------------------------------------------------------------------------------------------------------------
  |    Aspect	   |          Event Bubbling	                |           Event Propagation                      |
  | Definition	 | A phase in event propagation where       | Describes the entire lifecycle of an event       |
  |              | events move upwards.                     | (capturing, target, bubbling).                   |
  | Direction	   | Moves up from the target to the root.    |	Can move down (capturing) or up (bubbling).      |
  | Phases	     | Part of the bubbling phase.              |	Includes capturing, target, and bubbling phases. |
  | Use Case	   | Often used in event delegation for       |	Understanding propagation helps handle events    |
  |              | dynamic elements.                        | efficiently.                                     |
  --------------------------------------------------------------------------------------------------------------
  - Here are events that do not bubble in JavaScript :- 
    - focus, blur, load, unload, resize, scroll, contextmenu, submit, change, error, select, mouseenter mouseleave, pointerenter, pointerleave.
*/
// ----------------------------------------------------------------------------

// ----- "event.target", "event.currentTarget" and "this" ---------------------
/*
  - 4. Difference between "event.target", "event.currentTarget" and "this".
    - "event.target" : Identifying which child element was clicked or interacted with.
    - "event.currentTarget" : Always points to the element where the listener is attached, regardless of where the event originated or which element triggered it.
    - "this": Refers to the context in which the function is executed. Inside an event listener, this points to the element to which the event listener was attached (the element where addEventListener was used).
*/
// ----------------------------------------------------------------------------

// ----- Event Capturing or Tickling ------------------------------------------
/*
  - 5. What is event capturing or tickling?
    - In JavaScript, event capturing (or trickling) is a way to handle events where the event moves from the outside to the inside of the webpage.
    - It works like this --> 
      - When you trigger an event (like clicking a button), the event first moves downward from the outermost part of the page to the element where you clicked (this is called "capturing").
      - After it reaches the target element, it goes back up through the elements (this is called "bubbling").
    Example - 
      - Imagine you have a div inside another div, and inside that, there’s a button:
*/
<div id="outer">
  <div id="inner">
    <button id="click-me">Click Me</button>
  </div>
</div>;
// Adding event listeners:
// In capturing phase (goes from outer to inner)
document.getElementById("outer").addEventListener(
  "click",
  function () {
    console.log("Outer div - Capturing");
  },
  true
); // true means capturing phase
document.getElementById("inner").addEventListener(
  "click",
  function () {
    console.log("Inner div - Capturing");
  },
  true
);
document.getElementById("click-me").addEventListener("click", function () {
  console.log("Button clicked!");
});
/*
  - Output when you click the button :-
    - Outer div - Capturing
    - Inner div - Capturing
    - Button clicked!
  - Why Use Event Capturing?
    - When you want to catch the event before it reaches the target element: This can be helpful for things like controlling certain behaviors before they reach the button or element you’re interested in.
*/
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
/*
  - 6. Why doesn’t the event handler get triggered twice when an event goes through both the capturing and bubbling phases? If an event starts in the capturing phase and then moves to the bubbling phase, why isn't it treated as a new event, causing the handler to trigger again?
    - The event is not re-triggered when it moves from the capturing phase to the bubbling phase because the event doesn't start over.
    - Instead, what happens is that --> 
      - The event starts in the capturing phase (if you use { capture: true } in the event listener).
      - After it reaches the target element, the event moves into the bubbling phase.
      - The same event object continues through both phases. It’s the same event moving through different parts of the DOM, but the listeners set for bubbling and capturing are different.
    - Example for Better Understanding --> 
      - Let’s say you have this HTML structure --> 
*/
<div id="parent">
  <div id="child">
    <button id="btn">Click Me</button>
  </div>
</div>;
// JavaScript with both capturing and bubbling:
// Capturing phase (starts from outer element, goes inward)
document.getElementById("parent").addEventListener(
  "click",
  function () {
    console.log("Parent (Capturing)");
  },
  true
); // true means capturing phase
// Bubbling phase (starts from target, goes outward)
document.getElementById("parent").addEventListener(
  "click",
  function () {
    console.log("Parent (Bubbling)");
  },
  false
); // false means bubbling phase
document.getElementById("child").addEventListener(
  "click",
  function () {
    console.log("Child (Bubbling)");
  },
  false
);
document.getElementById("btn").addEventListener("click", function () {
  console.log("Button clicked!");
});
/*
  - Output --> 
    - Parent (Capturing)
    - Child (Capturing)
    - Button clicked!
    - Child (Bubbling)
    - Parent (Bubbling)
  - Key Points --> 
    - The event doesn’t get "re-triggered" in the bubbling phase because it’s the same event object that continues moving through the DOM.
    - Capturing and bubbling are just two phases that handle the same event in different directions.
    - The listener set for the capturing phase is triggered before the bubbling phase starts, so it doesn’t re-trigger.
*/
// ----------------------------------------------------------------------------

// ----- Stop Bubbling or Capturing -------------------------------------------
/*
  - 7. How to stop bubbling or capturing?
    - 1. stopPropagation() :- 
      - Stops the event from propagating further to parent elements (i.e., it prevents bubbling or capturing from continuing).
      - Does not affect other event listeners on the same element.
    - Example:
*/
<button id="btn">Click Me</button>;
document.getElementById("btn").addEventListener("click", (event) => {
  console.log("Handler 1 executed");
  event.stopPropagation(); // Stops the event from propagating to parent elements
});
document.getElementById("btn").addEventListener("click", () => {
  console.log("Handler 2 executed");
});
document.body.addEventListener("click", () => {
  console.log("Body clicked!");
});
/*
    - Output when clicking the button (#btn) --> 
      - Handler 1 executed
      - Handler 2 executed
    - Explanation --> 
      - Both Handler 1 and Handler 2 run because they are on the same element.
      - The event doesn't propagate to the body, so "Body clicked!" is not logged.
  - 2. stopImmediatePropagation() :- 
    - Stops the event from propagating further to parent elements.
    - Prevents any remaining listeners on the same element from being executed.
    - Example --> 
*/
<button id="btn">Click Me</button>;
document.getElementById("btn").addEventListener("click", (event) => {
  console.log("Handler 1 executed");
  event.stopImmediatePropagation(); // Stops other handlers on the same element
});
document.getElementById("btn").addEventListener("click", () => {
  console.log("Handler 2 executed");
});
document.body.addEventListener("click", () => {
  console.log("Body clicked!");
});
/*
    - Output when clicking the button (#btn) --> 
      - Handler 1 executed
    - Explanation:
      - After Handler 1 executes, stopImmediatePropagation() prevents Handler 2 (on the same element) from running.
      - The event also doesn’t propagate to the body, so "Body clicked!" is not logged.
  - Key Differences :- 
  ---------------------------------------------------------------------------------------------------------------
  |              Feature                        |        stopPropagation()	  |   stopImmediatePropagation()    |
  | Stops propagation to parent elements	      |               Yes	          |               Yes               |
  | Blocks other listeners on the same element	|               No            |               Yes               |
  | Affects event propagation phases	          | Both capturing and bubbling | Both capturing and bubbling     |
  |                                             | phases                      | phases                          |
  ---------------------------------------------------------------------------------------------------------------
  */
// Combined Example for Better Understanding
<div id="outer">
  <button id="btn">Click Me</button>
</div>;
// Listener on outer div (bubbling phase)
document.getElementById("outer").addEventListener("click", () => {
  console.log("Outer div clicked!");
});
// Multiple listeners on the button
document.getElementById("btn").addEventListener("click", (event) => {
  console.log("Handler 1 executed");
  event.stopPropagation(); // Stops propagation to "outer" but does not block other button listeners
});
document.getElementById("btn").addEventListener("click", () => {
  console.log("Handler 2 executed");
});
document.getElementById("btn").addEventListener("click", (event) => {
  console.log("Handler 3 executed");
  event.stopImmediatePropagation(); // Stops both propagation and other button listeners
});
document.getElementById("btn").addEventListener("click", () => {
  console.log("Handler 4 executed");
});
/*
  - Output when clicking the button (#btn) --> 
    - Handler 1 executed
    - Handler 2 executed
    - Handler 3 executed
  - Explanation --> 
    - Handler 1 executes and calls stopPropagation(), which stops the event from reaching the outer div.
    - Handler 2 and Handler 3 still execute because they are on the same element.
    - Handler 3 calls stopImmediatePropagation(), which blocks Handler 4.
*/
// ----------------------------------------------------------------------------

// ----- Event Delegation -----------------------------------------------------
/*
  - 8. What is event delegation?
    - Event delegation is a technique in JavaScript where you add an event listener to a parent element instead of adding it to multiple child elements. The parent "delegates" the event handling to its child elements using the bubbling phase of event propagation.
    - This technique is useful when --> 
      - You have a large number of child elements that need the same event handler.
      - Child elements are dynamically added or removed.
    - How Does Event Delegation Work?
      - An event on a child element bubbles up to its parent.
      - You can attach a single event listener to the parent element.
      - Inside the event handler, you check which child element triggered the event using properties like event.target.
    - Why Use Event Delegation?
      - Efficiency: Instead of adding event listeners to many child elements, you add just one listener to the parent.
      - Dynamic Elements: Works seamlessly with child elements that are created dynamically after the page loads.
*/
/*
  - Example: Without Event Delegation
    - Suppose you have a list of buttons:
*/
<div id="container">
  <button class="btn">Button 1</button>
  <button class="btn">Button 2</button>
  <button class="btn">Button 3</button>
</div>;
// If you add an event listener to each button:
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("Button clicked!");
  });
});
/*
  - This works but can be inefficient, especially if you have many buttons or dynamically added buttons.
  - Example: With Event Delegation
    - Using event delegation, you attach a single event listener to the parent (#container):
*/
const container = document.getElementById("container");
container.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn")) {
    console.log(`${event.target.textContent} clicked!`);
  }
});
/*
  - Now, whenever any button inside #container is clicked:
  - The event listener on #container is triggered.
  - event.target identifies the specific button that was clicked.
  - Output for Both Approaches
  - If you click Button 1, the output will be --> 
    - Button 1 clicked!
    - Button 3 clicked!
*/
// Benefits of Event Delegation in This Example
// 1. Dynamic Elements: If you add new buttons dynamically, you don't need to add new event listeners.
const newButton = document.createElement("button");
newButton.textContent = "Button 4";
newButton.className = "btn";
container.appendChild(newButton);
/*
    -Clicking the new button will also trigger the event listener, without any additional code.
  - 2. Fewer Listeners: Only one listener is attached to the parent instead of multiple listeners for each button.
    - When Should You Use Event Delegation?
      - When dealing with many similar elements (e.g., a list of items or buttons).
      - When elements are dynamically added or removed.
      - When you want to improve performance by reducing the number of event listeners.
*/
// ----------------------------------------------------------------------------

// -----  ----------------------------------------
/*
  - 9. Create a modal in JavaScript that closes when clicking outside. (negative space)
  - modal.html
  - How It Works :- 
    - The modal is initially hidden (display: none).
    - Clicking the "Open Modal" button sets the modal’s display to flex, making it visible.
    - When the modal is open:
    - If the user clicks outside the modal content (i.e., on the semi-transparent background), the event listener checks if the click is on the modal element itself.
    - If true, the modal is hidden again.
*/
