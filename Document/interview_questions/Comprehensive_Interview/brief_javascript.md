# JavaScript Deep Dive - Brief Theory

## Arrays - Understanding Built-in Methods

**Mutating Methods** (Modify original array):
- **`push()`** - Adds element(s) to end, returns new length
- **`pop()`** - Removes last element, returns removed element
- **`shift()`** - Removes first element, returns removed element
- **`unshift()`** - Adds element(s) to beginning, returns new length
- **`splice()`** - Add/remove elements at any position, returns removed elements
- **`sort()`** - Sorts array in place (default: alphabetical)
- **`reverse()`** - Reverses array order in place

**Non-mutating Methods** (Return new array, original unchanged):
- **`slice()`** - Extracts portion of array, returns new array
- **`concat()`** - Merges arrays, returns new combined array
- **`map()`** - Transforms each element, returns new array of same length
- **`filter()`** - Selects elements matching condition, returns new array (possibly shorter)
- **`reduce()`** - Accumulates values into single result (sum, object, etc.)
- **`find()`** - Returns first element matching condition (or undefined)
- **`some()`** - Returns true if at least one element matches
- **`every()`** - Returns true only if all elements match

**Key Concepts Explained:**

**`map()`** - Transformation:
- Applies function to each element
- Always returns array of same length
- Use when: Converting data format, extracting properties
- Example use: Convert array of objects to array of names

**`filter()`** - Selection:
- Tests each element with condition
- Returns only elements that pass test
- Result can be shorter than original
- Use when: Removing unwanted items, finding matches
- Example use: Get only active users, filter by age

**`reduce()`** - Accumulation:
- Processes array left-to-right
- Combines all elements into single value
- Takes accumulator and current value
- Use when: Summing numbers, building objects, flattening arrays
- Example use: Calculate total price, group by category

**`find()`** - First Match:
- Stops at first matching element
- Returns the element itself (not index)
- Returns undefined if no match
- Use when: Looking for specific item
- Example use: Find user by ID

**`some()`** - At Least One:
- Returns true if ANY element passes test
- Stops checking once one passes
- Use when: Checking if condition exists
- Example use: "Is there at least one admin?"

**`every()`** - All Must Pass:
- Returns true only if ALL elements pass test
- Stops checking once one fails
- Use when: Validating all items
- Example use: "Are all users verified?"

## Data Types - Primitives and Objects

**Primitive Types** (Immutable, stored by value):
- **string** - Text data, immutable sequence of characters
- **number** - Integers and decimals (64-bit floating point)
- **boolean** - true or false
- **null** - Intentional absence of value (typeof returns "object" - known bug)
- **undefined** - Variable declared but not assigned
- **symbol** - Unique identifier, cannot be duplicated
- **bigint** - Integers larger than Number.MAX_SAFE_INTEGER

**null vs undefined - Critical Difference:**

**`null`** - Intentional Absence:
- Explicitly assigned by programmer
- Means "I want this to be empty"
- Used to clear a value
- Example: `let user = null;` (no user logged in)

**`undefined`** - Unintentional Absence:
- Default value for uninitialized variables
- Function returns undefined if no return statement
- Missing object property returns undefined
- Means "this hasn't been set yet"
- Example: `let x;` (x is undefined)

**Symbol - Unique Identifiers:**
- Created with `Symbol()` or `Symbol('description')`
- Every symbol is unique, even with same description
- Primary use: Create unique object property keys
- Hidden from `for...in` loops and `Object.keys()`
- Use case: Adding metadata to objects without naming conflicts

**Set - Unique Values Collection:**
- Stores only unique values (duplicates automatically removed)
- Any type of value (primitives or objects)
- Maintains insertion order
- Methods: `add()`, `delete()`, `has()`, `clear()`
- Use cases: Remove duplicates from array, check membership

**Map - Key-Value Pairs:**
- Similar to objects but keys can be ANY type (objects, functions, primitives)
- Maintains insertion order
- Size property available
- Better performance for frequent additions/deletions
- Methods: `set()`, `get()`, `has()`, `delete()`, `clear()`
- Use cases: Caching, counting occurrences, complex keys

**WeakSet - Garbage-Collectable Set:**
- Only stores objects (not primitives)
- Objects can be garbage collected if no other references exist
- No iteration methods (can't loop through)
- Use case: Tracking objects without preventing cleanup

**WeakMap - Garbage-Collectable Map:**
- Keys must be objects
- Values can be any type
- Keys can be garbage collected
- Use case: Private data, caching related to objects

## Objects

**Creation Methods:**
- Object literal `{}`
- Constructor `new Object()`
- `Object.create()`
- Class syntax

**Shallow vs Deep Copy:**
- **Shallow:** Copies top level only (spread operator, `Object.assign()`)
- **Deep:** Copies all nested levels (JSON parse/stringify, structuredClone)

**Optional Chaining:** `obj?.prop?.nested` - safely access nested properties

**Property Descriptors:** Control writable, enumerable, configurable attributes

## Functions

**this Keyword:** References execution context
- Global: window/global
- Object method: the object
- Constructor: new instance
- Arrow function: lexical scope

**call/apply/bind:**
- `call()` - invoke with specific this, arguments separately
- `apply()` - invoke with specific this, arguments as array
- `bind()` - create new function with bound this

**Closures:** Function that remembers variables from outer scope

**Currying:** Transform function with multiple arguments into sequence of functions

**Memoization:** Cache function results for performance

## Promises - Handling Asynchronous Operations

**What is a Promise?**
A Promise represents a value that may not be available yet but will be resolved in the future (or rejected if it fails).

**Three States:**
1. **pending** - Initial state, operation not complete
2. **fulfilled** - Operation completed successfully, has a value
3. **rejected** - Operation failed, has an error reason

Once settled (fulfilled or rejected), a promise cannot change state.

**Promise Methods - Combining Multiple Promises:**

**`Promise.all()`** - All or Nothing:
- Waits for ALL promises to fulfill
- Returns array of results in same order
- **Fails immediately** if ANY promise rejects
- Use when: All operations must succeed (parallel database queries)
- Example: Fetch user data AND their posts AND their comments

**`Promise.allSettled()`** - Wait for All, Never Fails:
- Waits for ALL promises to settle (fulfill or reject)
- Returns array of objects: `{status: 'fulfilled', value}` or `{status: 'rejected', reason}`
- **Never rejects** - always fulfills with results
- Use when: Want results even if some fail (batch operations)
- Example: Send emails to 100 users, get results for all

**`Promise.any()`** - First Success Wins:
- Returns first promise that fulfills
- Ignores rejections unless ALL reject
- Use when: Race for first successful result (fastest server)
- Example: Fetch from multiple CDNs, use whoever responds first

**`Promise.race()`** - First to Finish Wins:
- Returns first promise that settles (fulfill OR reject)
- Can reject if first to finish is a rejection
- Use when: Timeout scenarios, fastest response
- Example: Fetch with timeout - race between fetch and timeout promise

**async/await - Syntactic Sugar:**

**Why use async/await?**
- Makes asynchronous code look synchronous
- Easier to read and understand
- Better error handling with try/catch
- Avoids "callback hell" or "promise chains"

**How it works:**
- `async` function always returns a Promise
- `await` pauses execution until Promise resolves
- Can only use `await` inside `async` functions
- Errors can be caught with try/catch blocks

**Key Differences from Promises:**
- Promises: `.then()` chains, harder to read
- async/await: Sequential, looks like synchronous code
- Error handling: Promises use `.catch()`, async/await uses try/catch

## Classes & OOP

**Four Pillars:**
1. **Encapsulation** - Bundle data and methods
2. **Inheritance** - Derive from parent class
3. **Polymorphism** - Same interface, different implementations
4. **Abstraction** - Hide complex details

**Prototype:** Object from which other objects inherit properties

**Static Methods:** Belong to class, not instances

**Private Fields:** `#fieldName` - accessible only within class

## Regular Expressions

**Flags:**
- `g` - global (all matches)
- `i` - case insensitive
- `m` - multiline

**Greedy vs Lazy:**
- Greedy: Match as much as possible `.*`
- Lazy: Match as little as possible `.*?`

## Event Loop - JavaScript's Concurrency Model

**Understanding the Components:**

**1. Call Stack:**
- Executes synchronous code
- LIFO (Last In, First Out) structure
- When function is called, it's pushed onto stack
- When function returns, it's popped off stack
- JavaScript is single-threaded - only one call stack

**2. Microtask Queue** (High Priority):
- Promises (`.then()`, `.catch()`, `.finally()`)
- `queueMicrotask()`
- `MutationObserver` callbacks
- Executed BEFORE macrotasks
- All microtasks run before moving to next macrotask

**3. Macrotask Queue** (Lower Priority):
- `setTimeout()`, `setInterval()`
- `setImmediate()` (Node.js)
- I/O operations
- UI rendering
- One macrotask per event loop cycle

**Execution Order - The Event Loop Cycle:**

1. **Execute all synchronous code** (call stack)
2. **Execute ALL microtasks** (empty microtask queue completely)
3. **Execute ONE macrotask** (from macrotask queue)
4. **Repeat** from step 2

**Why This Matters:**
- Microtasks can "starve" macrotasks if continuously added
- Promises execute before setTimeout, even if setTimeout delay is 0
- Understanding order prevents bugs in async code

**Visual Example of Execution:**
```
console.log('1'); // Call stack - runs immediately
setTimeout(() => console.log('2'), 0); // Macrotask queue
Promise.resolve().then(() => console.log('3')); // Microtask queue
console.log('4'); // Call stack - runs immediately

Output: 1, 4, 3, 2
Explanation:
- 1 and 4 run first (synchronous)
- 3 runs next (microtask)
- 2 runs last (macrotask)
```

**process.nextTick() in Node.js:**
- Highest priority - even higher than microtasks
- Executes before ANY other async code
- Use sparingly - can block event loop
- Execution order: Call Stack → nextTick → Microtasks → Macrotasks

## TypeScript

**Benefits:** Type safety, better IDE support, catch errors at compile time

**Utility Types:**
- `Partial<T>` - all properties optional
- `Required<T>` - all properties required
- `Pick<T, K>` - select specific properties
- `Omit<T, K>` - exclude specific properties
- `ReturnType<T>` - extract function return type

**Generics:** Create reusable components that work with multiple types

## Security

**CORS:** Cross-Origin Resource Sharing - controls which domains can access resources

**XSS:** Cross-Site Scripting - inject malicious scripts
- **Prevention:** Sanitize input, escape output, use Content Security Policy

**CSRF:** Cross-Site Request Forgery - trick user into unwanted actions
- **Prevention:** CSRF tokens, SameSite cookies

**SQL Injection:** Inject malicious SQL queries
- **Prevention:** Parameterized queries, input validation

**JWT:** JSON Web Token - stateless authentication
- Structure: Header.Payload.Signature
- Stored in localStorage or httpOnly cookies

**OAuth:** Authorization framework for third-party access
