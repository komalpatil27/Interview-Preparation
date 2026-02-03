# Interview Questions - Comprehensive Answers

## JavaScript Fundamentals

### 1. What are Closures?

A closure is a function that has access to variables in its outer (enclosing) function's scope, even after the outer function has returned.

```javascript
function outer() {
  let count = 0;
  
  return function inner() {
    count++;
    console.log(count);
  };
}

const counter = outer();
counter(); // 1
counter(); // 2
counter(); // 3
```

**Disadvantages:**
- Memory leaks if not managed properly
- Can make debugging harder
- Overconsumption of memory

**Use Cases:**
- Data privacy
- Function factories
- Event handlers
- Callbacks


### 2. Hoisting Output Question

```javascript
for(var i = 0; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// Output: 4, 4, 4, 4
```

**Why?** `var` is function-scoped, so all setTimeout callbacks reference the same `i`, which is 4 after the loop ends.

**Solution with `let`:**
```javascript
for(let i = 0; i <= 3; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
// Output: 0, 1, 2, 3
```

**Solution with closure:**
```javascript
for(var i = 0; i <= 3; i++) {
  (function(j) {
    setTimeout(() => {
      console.log(j);
    }, 0);
  })(i);
}
// Output: 0, 1, 2, 3
```


### 3. What is Hoisting?

Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code execution.

```javascript
console.log(x); // undefined (not ReferenceError)
var x = 5;

// Interpreted as:
var x;
console.log(x); // undefined
x = 5;

// let and const are hoisted but in Temporal Dead Zone
console.log(y); // ReferenceError
let y = 10;

// Function declarations are fully hoisted
greet(); // "Hello" - works!
function greet() {
  console.log("Hello");
}

// Function expressions are not
sayHi(); // TypeError
var sayHi = function() {
  console.log("Hi");
};
```


### 4. Scope Chaining

Scope chain is the mechanism JavaScript uses to resolve variable names by looking up the scope hierarchy.

```javascript
const global = "Global";

function outer() {
  const outerVar = "Outer";
  
  function inner() {
    const innerVar = "Inner";
    console.log(innerVar);  // Inner scope
    console.log(outerVar);  // Outer scope
    console.log(global);    // Global scope
  }
  
  inner();
}

outer();
```


### 5. What is Lexical Scope?

Lexical scope means a variable's scope is determined by its position in the source code.

```javascript
function outer() {
  const name = "Alice";
  
  function inner() {
    console.log(name); // Can access 'name' due to lexical scope
  }
  
  inner();
}

outer(); // "Alice"
```

**Difference from Dynamic Scope:**
- Lexical: Scope determined at write-time
- Dynamic: Scope determined at run-time (not in JavaScript)


### 6. undefined vs null

```javascript
// undefined - variable declared but not assigned
let x;
console.log(x); // undefined
console.log(typeof x); // "undefined"

// null - intentional absence of value
let y = null;
console.log(y); // null
console.log(typeof y); // "object" (JavaScript quirk)

// Comparison
console.log(undefined == null);  // true (loose equality)
console.log(undefined === null); // false (strict equality)
```


### 7. var, let, and const Differences

```javascript
// var - function scoped, can be redeclared
var x = 1;
var x = 2; // OK
if (true) {
  var x = 3; // Same variable
}
console.log(x); // 3

// let - block scoped, cannot be redeclared
let y = 1;
// let y = 2; // Error
if (true) {
  let y = 3; // Different variable
}
console.log(y); // 1

// const - block scoped, cannot be reassigned
const z = 1;
// z = 2; // Error
// But objects can be mutated
const obj = { a: 1 };
obj.a = 2; // OK
```


### 8. What is Event Loop?

The event loop is JavaScript's mechanism for handling asynchronous operations.

**How it works:**
1. **Call Stack** - Executes synchronous code
2. **Web APIs** - Handles async operations (setTimeout, fetch, etc.)
3. **Callback Queue** - Stores callbacks from completed async operations
4. **Microtask Queue** - Stores promises (higher priority)
5. **Event Loop** - Moves tasks from queues to call stack when empty

```javascript
console.log('1');

setTimeout(() => console.log('2'), 0);

Promise.resolve().then(() => console.log('3'));

console.log('4');

// Output: 1, 4, 3, 2
// Explanation:
// - 1, 4: Synchronous (call stack)
// - 3: Microtask (promise)
// - 2: Macrotask (setTimeout)
```


### 9. Promise vs Async/Await

```javascript
// Promise
function fetchData() {
  return fetch('/api/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}

// Async/Await (cleaner syntax)
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

**Differences:**
- Async/await is syntactic sugar over promises
- Async/await is more readable
- Error handling is easier with try/catch
- Promises allow better parallel execution with `Promise.all()`


### 10. Arrow Function vs Normal Function

```javascript
// 'this' binding
const obj = {
  name: "Alice",
  
  regularFunction: function() {
    console.log(this.name); // "Alice"
  },
  
  arrowFunction: () => {
    console.log(this.name); // undefined (lexical 'this')
  }
};

// arguments object
function regular() {
  console.log(arguments); // [1, 2, 3]
}
regular(1, 2, 3);

const arrow = () => {
  console.log(arguments); // ReferenceError
};

// Constructor
function Person(name) {
  this.name = name;
}
const p = new Person("Bob"); // OK

const PersonArrow = (name) => {
  this.name = name;
};
// const p2 = new PersonArrow("Bob"); // TypeError
```


### 11. What is Callback Hell?

Callback hell (pyramid of doom) occurs when callbacks are nested within callbacks.

```javascript
// Callback Hell
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      getMoreData(c, function(d) {
        console.log(d);
      });
    });
  });
});

// Solution with Promises
getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => getMoreData(c))
  .then(d => console.log(d))
  .catch(error => console.error(error));

// Solution with Async/Await
async function fetchAllData() {
  try {
    const a = await getData();
    const b = await getMoreData(a);
    const c = await getMoreData(b);
    const d = await getMoreData(c);
    console.log(d);
  } catch (error) {
    console.error(error);
  }
}
```


### 12. ES6 Features

```javascript
// 1. let and const
let x = 1;
const y = 2;

// 2. Arrow functions
const add = (a, b) => a + b;

// 3. Template literals
const name = "Alice";
console.log(`Hello, ${name}!`);

// 4. Destructuring
const { a, b } = { a: 1, b: 2 };
const [first, second] = [1, 2];

// 5. Spread operator
const arr = [1, 2, 3];
const newArr = [...arr, 4, 5];

// 6. Rest parameters
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b);
}

// 7. Default parameters
function greet(name = "Guest") {
  console.log(`Hello, ${name}`);
}

// 8. Classes
class Person {
  constructor(name) {
    this.name = name;
  }
}

// 9. Promises
const promise = new Promise((resolve, reject) => {
  // async operation
});

// 10. Modules
export const myFunction = () => {};
import { myFunction } from './module';
```


### 13. Pure vs Impure Functions

```javascript
// Pure function - same input always gives same output, no side effects
function add(a, b) {
  return a + b;
}

// Impure function - depends on external state
let count = 0;
function increment() {
  count++; // Side effect
  return count;
}

// Impure - modifies input
function addToArray(arr, item) {
  arr.push(item); // Mutates arr
  return arr;
}

// Pure version
function addToArrayPure(arr, item) {
  return [...arr, item]; // Returns new array
}
```


### 14. Memoization

Memoization is an optimization technique that caches function results.

```javascript
// Without memoization
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// With memoization
function fibonacciMemo() {
  const cache = {};
  
  return function fib(n) {
    if (n in cache) return cache[n];
    if (n <= 1) return n;
    
    cache[n] = fib(n - 1) + fib(n - 2);
    return cache[n];
  };
}

const fib = fibonacciMemo();
console.log(fib(40)); // Much faster!
```


### 15. Event Delegation, stopPropagation, preventDefault

```javascript
// Event Delegation - attach listener to parent
document.getElementById('parent').addEventListener('click', (e) => {
  if (e.target.matches('.child')) {
    console.log('Child clicked');
  }
});

// stopPropagation - stops event bubbling
element.addEventListener('click', (e) => {
  e.stopPropagation(); // Event won't bubble to parent
  console.log('Clicked');
});

// preventDefault - prevents default behavior
link.addEventListener('click', (e) => {
  e.preventDefault(); // Link won't navigate
  console.log('Link clicked but not navigating');
});
```


### 16. Event Capturing vs Event Bubbling

```javascript
// Bubbling (default) - event goes from target to root
// Capturing - event goes from root to target

<div id="outer">
  <div id="inner">
    <button id="btn">Click</button>
  </div>
</div>

// Bubbling (default)
document.getElementById('btn').addEventListener('click', () => {
  console.log('Button');
});
document.getElementById('inner').addEventListener('click', () => {
  console.log('Inner');
});
document.getElementById('outer').addEventListener('click', () => {
  console.log('Outer');
});
// Output: Button → Inner → Outer

// Capturing (use third parameter true)
document.getElementById('outer').addEventListener('click', () => {
  console.log('Outer');
}, true);
// Output: Outer → Inner → Button
```


### 17. Shallow Copy vs Deep Copy

```javascript
// Shallow copy - copies only first level
const original = { a: 1, b: { c: 2 } };

const shallow1 = { ...original };
const shallow2 = Object.assign({}, original);

shallow1.b.c = 3;
console.log(original.b.c); // 3 (nested object still referenced)

// Deep copy - copies all levels
const deep1 = JSON.parse(JSON.stringify(original)); // Simple but has limitations
const deep2 = structuredClone(original); // Modern way

deep1.b.c = 4;
console.log(original.b.c); // 2 (not affected)

// Deep copy with lodash
import _ from 'lodash';
const deep3 = _.cloneDeep(original);
```


### 18. Promise vs Promise.all()

```javascript
// Promise - single async operation
const promise = fetch('/api/data');

// Promise.all() - multiple async operations in parallel
const promise1 = fetch('/api/user');
const promise2 = fetch('/api/posts');
const promise3 = fetch('/api/comments');

Promise.all([promise1, promise2, promise3])
  .then(([users, posts, comments]) => {
    console.log(users, posts, comments);
  })
  .catch(error => {
    console.error('One of the promises failed:', error);
  });

// Promise.allSettled() - waits for all, doesn't fail fast
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log(result.value);
      } else {
        console.error(result.reason);
      }
    });
  });
```


### 19. Spread Operator and Destructuring

```javascript
// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]

const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Destructuring
const { a, b } = { a: 1, b: 2, c: 3 };
console.log(a, b); // 1, 2

const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log(first, second, rest); // 1, 2, [3, 4, 5]

// With default values
const { x = 10, y = 20 } = { x: 5 };
console.log(x, y); // 5, 20

// Nested destructuring
const person = { name: 'Ravi', age: 20, address: { city: 'NYC' } };
const { name, address: { city } } = person;
console.log(name, city); // "Ravi", "NYC"
```


### 20. forEach vs for loop

```javascript
const arr = [1, 2, 3, 4, 5];

// forEach - cannot break or return
arr.forEach((item, index) => {
  console.log(item, index);
  // break; // SyntaxError
  // return; // Only exits callback, not loop
});

// for loop - can break and continue
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === 3) break; // Exits loop
  console.log(arr[i]);
}

// for...of - modern, can break
for (const item of arr) {
  if (item === 3) break;
  console.log(item);
}
```


### 21. Iterating over Objects

```javascript
const obj = { a: 1, b: 2, c: 3 };

// for...in
for (const key in obj) {
  console.log(key, obj[key]);
}

// Object.keys()
Object.keys(obj).forEach(key => {
  console.log(key, obj[key]);
});

// Object.entries()
Object.entries(obj).forEach(([key, value]) => {
  console.log(key, value);
});

// Object.values()
Object.values(obj).forEach(value => {
  console.log(value);
});
```


### 22. Higher Order Functions

Functions that take functions as arguments or return functions.

```javascript
// Takes function as argument
function map(arr, fn) {
  const result = [];
  for (let item of arr) {
    result.push(fn(item));
  }
  return result;
}

const doubled = map([1, 2, 3], x => x * 2); // [2, 4, 6]

// Returns function
function multiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = multiplier(2);
console.log(double(5)); // 10
```


### 23. Array find() vs filter()

```javascript
const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

// find() - returns first match (single item)
const user = users.find(u => u.id === 2);
console.log(user); // { id: 2, name: 'Bob' }

// filter() - returns all matches (array)
const filtered = users.filter(u => u.id > 1);
console.log(filtered); // [{ id: 2, name: 'Bob' }, { id: 3, name: 'Charlie' }]
```


### 24. Object.freeze()

```javascript
const obj = { a: 1, b: 2 };

Object.freeze(obj);

obj.a = 10; // Fails silently (strict mode throws error)
obj.c = 3;  // Cannot add properties
delete obj.b; // Cannot delete properties

console.log(obj); // { a: 1, b: 2 }

// Shallow freeze - nested objects not frozen
const nested = { a: 1, b: { c: 2 } };
Object.freeze(nested);
nested.b.c = 3; // Works! Nested object not frozen
```


### 25. Remove Duplicates from Array

```javascript
const arr = [1, 2, 2, 3, 4, 4, 5];

// Method 1: Set
const unique1 = [...new Set(arr)];

// Method 2: filter
const unique2 = arr.filter((item, index) => arr.indexOf(item) === index);

// Method 3: reduce
const unique3 = arr.reduce((acc, item) => {
  if (!acc.includes(item)) acc.push(item);
  return acc;
}, []);

console.log(unique1); // [1, 2, 3, 4, 5]
```


### 26. Sort Array

```javascript
const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

// Ascending
numbers.sort((a, b) => a - b); // [1, 1, 2, 3, 4, 5, 6, 9]

// Descending
numbers.sort((a, b) => b - a); // [9, 6, 5, 4, 3, 2, 1, 1]

// Sort objects
const users = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
];

users.sort((a, b) => a.age - b.age); // Sort by age
users.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name
```


### 27. First Non-Repeated Character

```javascript
function firstNonRepeated(str) {
  const charCount = {};
  
  // Count occurrences
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  // Find first with count 1
  for (const char of str) {
    if (charCount[char] === 1) {
      return char;
    }
  }
  
  return null;
}

console.log(firstNonRepeated("aabbcde")); // "c"
```


### 28. Polyfill for Promise.all()

```javascript
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    const results = [];
    let completed = 0;
    
    if (promises.length === 0) {
      resolve(results);
      return;
    }
    
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          completed++;
          
          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
};

// Usage
Promise.myAll([Promise.resolve(1), Promise.resolve(2)])
  .then(results => console.log(results)); // [1, 2]
```


### 29. Lexical Scope Binding in setTimeout without Arrow Function

```javascript
// Problem
for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // 3, 3, 3
  }, 1000);
}

// Solution 1: IIFE
for (var i = 0; i < 3; i++) {
  (function(j) {
    setTimeout(function() {
      console.log(j); // 0, 1, 2
    }, 1000);
  })(i);
}

// Solution 2: bind
for (var i = 0; i < 3; i++) {
  setTimeout(function(j) {
    console.log(j); // 0, 1, 2
  }.bind(null, i), 1000);
}
```

