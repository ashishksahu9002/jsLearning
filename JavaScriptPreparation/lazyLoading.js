// ---------- LAZY LOADING --------------------------------------------------------------
/*
  - What is Lazy Loading? :- 
    - Lazy Loading = loading something only when it’s actually needed
    - Opposite of :-
      - Eager loading (load everything upfront)
    - Why Lazy Loading matters
      - Faster startup
      - Less memory usage
      - Better initial UX
      - Lower network cost
      - Especially important for:
        - Large apps
        - Games
        - Dashboards
        - Media-heavy pages
*/

// ----------------------------------------------------------------------------

// Lazy Loading in JavaScript (General)
// Lazy initialize an object
let heavyObject;
function getHeavyObject() {
  if (!heavyObject) {
    heavyObject = createHeavyObject();
  }
  return heavyObject;
}

// ----------------------------------------------------------------------------

// Lazy Loading with Functions (Closure pattern)
const getConfig = (() => {
  let config;
  return () => {
    if (!config) {
      config = loadConfig();
    }
    return config;
  };
})();
// Initialized only once -- Loaded on first access

// ----------------------------------------------------------------------------

// Lazy Loading Modules (Dynamic Import)
button.addEventListener("click", async () => {
  const module = await import("./heavyModule.js");
  module.run();
});

// Code-splitting -- Loaded only when required -- Huge bundle-size win

// ----------------------------------------------------------------------------

// Lazy Loading Images (Browser)
<img src="image.jpg" loading="lazy" />
// Or via Intersection Observer:
observer.observe(img);

// ----------------------------------------------------------------------------

// Lazy Loading + Caching (POWER COMBO)
let cachedModule;
async function loadModule() {
  if (!cachedModule) {
    cachedModule = import("./module.js");
  }
  return cachedModule;
}

// Loaded once -- Reused everywhere -- Zero duplicate loads

// ----------------------------------------------------------------------------

// Lazy Loading in Game / Pixi Context
async function loadBonusGame() {
  if (!bonusAssetsLoaded) {
    await loadAssets("bonus");
    bonusAssetsLoaded = true;
  }
}
// Load only when player enters bonus round -- Saves memory & startup time

// ----------------------------------------------------------------------------
/*
  - Lazy Evaluation vs Lazy Loading
    | ------------------------------------------------------- |
    |     Lazy Evaluation	   |      Lazy Loading              |
    | ---------------------- | ------------------------------ |
    |   Delay computation	   |  Delay resource loading        |
    |   CPU optimization	   |  Memory & network optimization |
    |   Memoization	         |  Dynamic imports               |
    | ------------------------------------------------------- |

-------------------------------------------------------------------------------

  - Common Mistakes :- 
    - Caching without eviction
    - Lazy loading inside hot loops
    - Over-caching small values
    - Lazy loading critical UI paths
    - Blocking render with lazy logic

-------------------------------------------------------------------------------

  - Mental Models (REMEMBER THESE) :- 
    - Caching
      - “Don’t recompute what you already know.”
    - Lazy Loading
      - “Don’t load what you don’t need yet.”

-------------------------------------------------------------------------------

  - Final One-Line Summary
    - Caching avoids repeated work by storing results, while lazy loading delays work until it’s actually needed — together they dramatically improve performance and memory usage.
*/