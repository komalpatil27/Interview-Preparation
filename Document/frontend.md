# Frontend Development - Complete Guide

## JavaScript Basics

### 1. Variables, Values, and Types

Variables are containers that store data values. JavaScript has several data types:

**Primitive Types:**
```javascript
// Number - for numeric values
let age = 25;
let price = 19.99;

// String - for text
let name = "John";
let message = 'Hello World';

// Boolean - true or false
let isActive = true;
let hasPermission = false;

// Undefined - variable declared but not assigned
let notAssigned;
console.log(notAssigned); // undefined

// Null - intentional absence of value
let emptyValue = null;

// Symbol - unique identifier (ES6)
let id = Symbol('id');

// BigInt - for very large numbers (ES2020)
let bigNumber = 9007199254740991n;
```

**Variable Declarations:**
```javascript
// var - function scoped, can be redeclared (old way)
var x = 10;

// let - block scoped, can be reassigned
let count = 0;
count = 5; // OK

// const - block scoped, cannot be reassigned
const PI = 3.14159;
// PI = 3.14; // Error!
```

**Object Type:**
```javascript
// Object - collection of key-value pairs
const person = {
  name: "Alice",
  age: 30,
  isStudent: false
};

// Array - ordered list of values
const colors = ["red", "green", "blue"];
const mixed = [1, "text", true, { key: "value" }];
```


### 2. Expressions, Operators, and Statements

**Expressions** - Code that evaluates to a value:
```javascript
// Arithmetic expressions
5 + 3        // 8
10 * 2       // 20
15 / 3       // 5
10 % 3       // 1 (remainder)

// String expressions
"Hello" + " " + "World"  // "Hello World"
`My age is ${age}`       // Template literal

// Logical expressions
true && false   // false
true || false   // true
!true          // false

// Comparison expressions
5 > 3          // true
10 === 10      // true (strict equality)
10 == "10"     // true (loose equality)
10 === "10"    // false (different types)
```

**Operators:**
```javascript
// Arithmetic: +, -, *, /, %, **
2 ** 3  // 8 (exponentiation)

// Assignment: =, +=, -=, *=, /=
let x = 5;
x += 3;  // x = x + 3 → 8

// Comparison: ==, ===, !=, !==, >, <, >=, <=
5 !== "5"  // true (different types)

// Logical: &&, ||, !
const canVote = age >= 18 && hasCitizenship;

// Unary: ++, --, typeof, delete
let count = 5;
count++;  // 6
typeof count;  // "number"

// Ternary (conditional): condition ? true : false
const status = age >= 18 ? "adult" : "minor";
```

**Statements** - Instructions that perform actions:
```javascript
// Expression statement
x = 5;

// Conditional statements
if (age >= 18) {
  console.log("Adult");
} else if (age >= 13) {
  console.log("Teenager");
} else {
  console.log("Child");
}

// Switch statement
switch (day) {
  case 'Monday':
    console.log("Start of week");
    break;
  case 'Friday':
    console.log("End of week");
    break;
  default:
    console.log("Midweek");
}

// Looping statements
for (let i = 0; i < 5; i++) {
  console.log(i);
}

while (count > 0) {
  console.log(count);
  count--;
}

do {
  console.log("Runs at least once");
} while (false);
```


### 3. Objects - Creating and Managing

**Creating Objects:**
```javascript
// 1. Object literal (most common)
const person = {
  name: "John",
  age: 30,
  greet: function() {
    console.log(`Hello, I'm ${this.name}`);
  }
};

// 2. Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const john = new Person("John", 30);

// 3. Object.create()
const personProto = {
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
};
const alice = Object.create(personProto);
alice.name = "Alice";

// 4. ES6 Class
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}
const dog = new Animal("Dog");
```

**Managing Properties:**
```javascript
const car = { brand: "Toyota", year: 2020 };

// Access properties
console.log(car.brand);      // Dot notation
console.log(car['year']);    // Bracket notation

// Add properties
car.color = "red";
car['model'] = "Camry";

// Update properties
car.year = 2021;

// Delete properties
delete car.color;

// Check if property exists
console.log('brand' in car);  // true
console.log(car.hasOwnProperty('year'));  // true
```

**Built-in Object Methods:**
```javascript
const user = { name: "Alice", age: 25, city: "NYC" };

// Get keys, values, entries
Object.keys(user);     // ["name", "age", "city"]
Object.values(user);   // ["Alice", 25, "NYC"]
Object.entries(user);  // [["name", "Alice"], ["age", 25], ["city", "NYC"]]

// Copy/merge objects
const copy = Object.assign({}, user);
const merged = Object.assign({}, user, { country: "USA" });
const spread = { ...user, country: "USA" };  // Spread operator

// Freeze/seal objects
Object.freeze(user);  // Cannot modify
Object.seal(user);    // Can modify values, not structure
```

**Property Descriptors:**
```javascript
const obj = {};
Object.defineProperty(obj, 'name', {
  value: 'John',
  writable: false,      // Cannot change value
  enumerable: true,     // Shows in for...in
  configurable: false   // Cannot delete or reconfigure
});

// Get descriptor
Object.getOwnPropertyDescriptor(obj, 'name');
```


### 4. Arrays - Creation and Methods

**Creating Arrays:**
```javascript
// Array literal
const fruits = ["apple", "banana", "orange"];

// Array constructor
const numbers = new Array(1, 2, 3, 4, 5);

// Array.from() - create from iterable
const str = "hello";
const chars = Array.from(str);  // ["h", "e", "l", "l", "o"]

// Array.of()
const nums = Array.of(1, 2, 3);  // [1, 2, 3]
```

**Array Methods:**
```javascript
const arr = [1, 2, 3, 4, 5];

// Modification methods
arr.push(6);           // Add to end → [1,2,3,4,5,6]
arr.pop();             // Remove from end → [1,2,3,4,5]
arr.unshift(0);        // Add to start → [0,1,2,3,4,5]
arr.shift();           // Remove from start → [1,2,3,4,5]
arr.splice(2, 1, 99);  // Remove/add at index → [1,2,99,4,5]

// Non-mutating methods
arr.slice(1, 3);       // Extract portion → [2,99]
arr.concat([6, 7]);    // Merge arrays → [1,2,99,4,5,6,7]
arr.join('-');         // Join to string → "1-2-99-4-5"

// Iteration methods
arr.forEach(num => console.log(num));

// map - transform each element
const doubled = arr.map(num => num * 2);  // [2,4,198,8,10]

// filter - keep elements that pass test
const evens = arr.filter(num => num % 2 === 0);  // [2,4]

// find - first element that passes test
const found = arr.find(num => num > 3);  // 99

// findIndex - index of first match
const index = arr.findIndex(num => num > 3);  // 2

// reduce - accumulate to single value
const sum = arr.reduce((acc, num) => acc + num, 0);  // 111

// some - check if any element passes test
const hasEven = arr.some(num => num % 2 === 0);  // true

// every - check if all elements pass test
const allPositive = arr.every(num => num > 0);  // true

// Sorting and searching
arr.sort((a, b) => a - b);  // Sort ascending
arr.reverse();              // Reverse order
arr.includes(3);            // Check if contains → true
arr.indexOf(99);            // Find index → 2
```


### 5. Functions

**Function Declaration:**
```javascript
// Hoisted - can be called before declaration
function greet(name) {
  return `Hello, ${name}!`;
}
console.log(greet("Alice"));  // "Hello, Alice!"
```

**Function Expression:**
```javascript
// Not hoisted - must be declared before use
const greet = function(name) {
  return `Hello, ${name}!`;
};
```

**Arrow Functions (ES6):**
```javascript
// Concise syntax, lexical 'this'
const add = (a, b) => a + b;
const square = x => x * x;
const greet = name => `Hello, ${name}!`;

// Multiple statements need {}
const calculate = (a, b) => {
  const sum = a + b;
  return sum * 2;
};
```

**Default Parameters:**
```javascript
function greet(name = "Guest", greeting = "Hello") {
  return `${greeting}, ${name}!`;
}
greet();              // "Hello, Guest!"
greet("Alice");       // "Hello, Alice!"
greet("Bob", "Hi");   // "Hi, Bob!"
```

**Rest Parameters:**
```javascript
function sum(...numbers) {
  return numbers.reduce((acc, num) => acc + num, 0);
}
sum(1, 2, 3, 4);  // 10
```

**Spread Operator:**
```javascript
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];  // [1,2,3,4,5,6]

const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };
const merged = { ...obj1, ...obj2 };  // {a:1, b:2, c:3, d:4}
```

**Destructuring:**
```javascript
// Array destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3,4,5]

// Object destructuring
const { name, age, city = "Unknown" } = person;

// Function parameter destructuring
function printUser({ name, age }) {
  console.log(`${name} is ${age} years old`);
}
printUser({ name: "Alice", age: 25 });
```


### 6. ES2015+ Features

**Template Literals:**
```javascript
const name = "Alice";
const age = 25;
const message = `My name is ${name} and I'm ${age} years old.`;

// Multi-line strings
const html = `
  <div>
    <h1>${name}</h1>
    <p>Age: ${age}</p>
  </div>
`;
```

**for...of Loop:**
```javascript
const fruits = ["apple", "banana", "orange"];

for (const fruit of fruits) {
  console.log(fruit);
}

// Works with strings, Maps, Sets, etc.
for (const char of "hello") {
  console.log(char);
}
```


## JavaScript Intermediate

### 1. Hoisting

Hoisting is JavaScript's behavior of moving declarations to the top of their scope before code execution.

```javascript
// Variable hoisting
console.log(x);  // undefined (not ReferenceError)
var x = 5;

// Equivalent to:
var x;
console.log(x);
x = 5;

// let and const are NOT hoisted the same way
console.log(y);  // ReferenceError (Temporal Dead Zone)
let y = 10;

// Function hoisting
greet();  // Works! "Hello"
function greet() {
  console.log("Hello");
}

// Function expressions are NOT hoisted
sayHi();  // TypeError
var sayHi = function() {
  console.log("Hi");
};
```


### 2. Type Conversion and Comparison

```javascript
// Automatic type conversion (coercion)
"5" + 3      // "53" (number to string)
"5" - 3      // 2 (string to number)
"5" * "2"    // 10 (both to numbers)
true + 1     // 2 (true becomes 1)
false + 1    // 1 (false becomes 0)

// Explicit conversion
Number("123")     // 123
String(123)       // "123"
Boolean(0)        // false
Boolean("text")   // true

// Comparison
5 == "5"    // true (loose equality, type coercion)
5 === "5"   // false (strict equality, no coercion)
0 == false  // true
0 === false // false

// Falsy values: false, 0, "", null, undefined, NaN
// Everything else is truthy
```


### 3. Advanced Functions

**'this' Keyword:**
```javascript
const person = {
  name: "Alice",
  greet: function() {
    console.log(`Hello, I'm ${this.name}`);
  },
  greetArrow: () => {
    // Arrow functions don't have their own 'this'
    console.log(`Hello, I'm ${this.name}`);  // undefined
  }
};

person.greet();       // "Hello, I'm Alice"
person.greetArrow();  // "Hello, I'm undefined"
```

**call, apply, bind:**
```javascript
function introduce(greeting, punctuation) {
  console.log(`${greeting}, I'm ${this.name}${punctuation}`);
}

const person = { name: "Alice" };

// call - invoke immediately with arguments
introduce.call(person, "Hello", "!");  // "Hello, I'm Alice!"

// apply - invoke immediately with array of arguments
introduce.apply(person, ["Hi", "."]);  // "Hi, I'm Alice."

// bind - create new function with bound 'this'
const boundIntroduce = introduce.bind(person);
boundIntroduce("Hey", "!");  // "Hey, I'm Alice!"
```

**Arguments Object:**
```javascript
function sum() {
  let total = 0;
  for (let i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}
sum(1, 2, 3, 4);  // 10

// Modern way: rest parameters
const sumModern = (...nums) => nums.reduce((a, b) => a + b, 0);
```


### 4. Functional Patterns

**Callback Functions:**
```javascript
function fetchData(callback) {
  setTimeout(() => {
    const data = { id: 1, name: "Alice" };
    callback(data);
  }, 1000);
}

fetchData((data) => {
  console.log(data);
});
```

**Memoization:**
```javascript
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) {
      return cache[key];
    }
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

const expensiveCalculation = memoize((n) => {
  console.log("Calculating...");
  return n * n;
});

expensiveCalculation(5);  // "Calculating..." → 25
expensiveCalculation(5);  // 25 (from cache, no log)
```

**Method Chaining:**
```javascript
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }
  add(n) {
    this.value += n;
    return this;  // Return 'this' for chaining
  }
  multiply(n) {
    this.value *= n;
    return this;
  }
  getResult() {
    return this.value;
  }
}

const result = new Calculator(5)
  .add(3)
  .multiply(2)
  .add(10)
  .getResult();  // 26
```

**Currying:**
```javascript
// Transform function with multiple args into sequence of functions
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

curriedAdd(1)(2)(3);     // 6
curriedAdd(1, 2)(3);     // 6
curriedAdd(1)(2, 3);     // 6
```

**IIFE (Immediately Invoked Function Expression):**
```javascript
(function() {
  const private = "I'm private";
  console.log("Executed immediately");
})();

// With parameters
(function(name) {
  console.log(`Hello, ${name}`);
})("Alice");

// Arrow IIFE
(() => {
  console.log("Arrow IIFE");
})();
```


### 5. Closures

A closure is a function that has access to variables from an outer function, even after the outer function has finished executing.

```javascript
function createCounter() {
  let count = 0;  // Private variable
  
  return {
    increment() {
      count++;
      return count;
    },
    decrement() {
      count--;
      return count;
    },
    getCount() {
      return count;
    }
  };
}

const counter = createCounter();
counter.increment();  // 1
counter.increment();  // 2
counter.decrement();  // 1
counter.getCount();   // 1
// count is not directly accessible from outside

// Practical example: Event handler
function setupButton(buttonId) {
  let clickCount = 0;
  
  document.getElementById(buttonId).addEventListener('click', function() {
    clickCount++;
    console.log(`Button clicked ${clickCount} times`);
  });
}
```


### 6. Prototypal Inheritance

```javascript
// Constructor function
function Animal(name) {
  this.name = name;
}

// Add method to prototype
Animal.prototype.speak = function() {
  console.log(`${this.name} makes a sound`);
};

// Create instance
const dog = new Animal("Dog");
dog.speak();  // "Dog makes a sound"

// Inheritance
function Dog(name, breed) {
  Animal.call(this, name);  // Call parent constructor
  this.breed = breed;
}

// Set up prototype chain
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add Dog-specific method
Dog.prototype.bark = function() {
  console.log(`${this.name} barks!`);
};

const myDog = new Dog("Buddy", "Golden Retriever");
myDog.speak();  // "Buddy makes a sound"
myDog.bark();   // "Buddy barks!"

// Check inheritance
console.log(myDog instanceof Dog);     // true
console.log(myDog instanceof Animal);  // true
```


### 7. ES6 Classes and Inheritance

```javascript
// Class declaration
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
  
  // Static method
  static info() {
    console.log("Animals are living beings");
  }
}

// Inheritance
class Dog extends Animal {
  constructor(name, breed) {
    super(name);  // Call parent constructor
    this.breed = breed;
  }
  
  speak() {
    super.speak();  // Call parent method
    console.log(`${this.name} barks!`);
  }
  
  // Getter
  get description() {
    return `${this.name} is a ${this.breed}`;
  }
  
  // Setter
  set newBreed(breed) {
    this.breed = breed;
  }
}

const myDog = new Dog("Buddy", "Golden Retriever");
myDog.speak();
console.log(myDog.description);
Animal.info();  // Static method called on class
```


### 8. Regular Expressions

```javascript
// Creating regex
const pattern1 = /hello/i;           // Literal notation
const pattern2 = new RegExp('hello', 'i');  // Constructor

// Flags
// i - case insensitive
// g - global (find all matches)
// m - multiline

// Methods
const text = "Hello World, hello everyone";

// test() - returns true/false
/hello/i.test(text);  // true

// match() - returns array of matches
text.match(/hello/gi);  // ["Hello", "hello"]

// replace() - replace matches
text.replace(/hello/gi, "hi");  // "hi World, hi everyone"

// search() - returns index of first match
text.search(/world/i);  // 6

// Metacharacters
/\d/     // Digit [0-9]
/\w/     // Word character [a-zA-Z0-9_]
/\s/     // Whitespace
/./      // Any character except newline
/^/      // Start of string
/$/      // End of string

// Quantifiers
/a+/     // One or more 'a'
/a*/     // Zero or more 'a'
/a?/     // Zero or one 'a'
/a{3}/   // Exactly 3 'a'
/a{2,5}/ // Between 2 and 5 'a'

// Examples
const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
email.test("user@example.com");  // true

const phone = /^\d{3}-\d{3}-\d{4}$/;
phone.test("123-456-7890");  // true
```


## JavaScript Advanced

### 1. Strict Mode

```javascript
"use strict";  // Enable strict mode

// Prevents accidental globals
x = 10;  // ReferenceError (must use var/let/const)

// Prevents duplicate parameters
function sum(a, a, b) {  // SyntaxError
  return a + a + b;
}

// 'this' is undefined in functions (not global object)
function test() {
  console.log(this);  // undefined (not window)
}

// Cannot delete variables
let x = 10;
delete x;  // SyntaxError
```


### 2. Promises

```javascript
// Creating a promise
const fetchData = new Promise((resolve, reject) => {
  setTimeout(() => {
    const success = true;
    if (success) {
      resolve({ data: "User data" });
    } else {
      reject(new Error("Failed to fetch"));
    }
  }, 1000);
});

// Using promises
fetchData
  .then(result => {
    console.log(result.data);
    return "Next step";
  })
  .then(value => {
    console.log(value);
  })
  .catch(error => {
    console.error(error.message);
  })
  .finally(() => {
    console.log("Cleanup");
  });

// Promise methods
Promise.all([promise1, promise2, promise3])
  .then(results => console.log(results));  // Wait for all

Promise.race([promise1, promise2])
  .then(result => console.log(result));  // First to complete

Promise.allSettled([promise1, promise2])
  .then(results => console.log(results));  // All settled (resolved or rejected)

// Async/await (modern syntax)
async function getData() {
  try {
    const result = await fetchData;
    console.log(result.data);
    return result;
  } catch (error) {
    console.error(error);
  }
}
```


### 3. Iterators and Generators

```javascript
// Iterator
const myIterator = {
  data: [1, 2, 3],
  index: 0,
  [Symbol.iterator]() {
    return {
      next: () => {
        if (this.index < this.data.length) {
          return { value: this.data[this.index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const value of myIterator) {
  console.log(value);  // 1, 2, 3
}

// Generator function
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next());  // { value: 1, done: false }
console.log(gen.next());  // { value: 2, done: false }
console.log(gen.next());  // { value: 3, done: false }
console.log(gen.next());  // { done: true }

// Practical generator
function* idGenerator() {
  let id = 1;
  while (true) {
    yield id++;
  }
}

const ids = idGenerator();
console.log(ids.next().value);  // 1
console.log(ids.next().value);  // 2
```


## Client-Side JavaScript

### 1. Window Object

```javascript
// Global object in browsers
window.innerWidth;   // Viewport width
window.innerHeight;  // Viewport height
window.location.href;  // Current URL
window.location.reload();  // Reload page
window.history.back();  // Go back
window.navigator.userAgent;  // Browser info
window.screen.width;  // Screen width

// Timers
const timeoutId = setTimeout(() => {
  console.log("After 1 second");
}, 1000);
clearTimeout(timeoutId);

const intervalId = setInterval(() => {
  console.log("Every 2 seconds");
}, 2000);
clearInterval(intervalId);
```


### 2. DOM Manipulation

```javascript
// Selection
document.getElementById('myId');
document.getElementsByClassName('myClass');
document.getElementsByTagName('div');
document.querySelector('.myClass');  // First match
document.querySelectorAll('.myClass');  // All matches

// Traversing
element.parentElement;
element.children;
element.firstElementChild;
element.lastElementChild;
element.nextElementSibling;
element.previousElementSibling;

// Modification
element.textContent = "New text";
element.innerHTML = "<strong>Bold text</strong>";
element.setAttribute('data-id', '123');
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('visible');
element.style.color = 'red';

// Creation and insertion
const newDiv = document.createElement('div');
newDiv.textContent = "New element";
parent.appendChild(newDiv);
parent.insertBefore(newDiv, referenceNode);
parent.removeChild(childNode);
```


### 3. Event Handling

```javascript
// Add event listener
button.addEventListener('click', function(event) {
  console.log('Button clicked');
  event.preventDefault();  // Prevent default action
  event.stopPropagation();  // Stop bubbling
});

// Event delegation
document.getElementById('parent').addEventListener('click', function(e) {
  if (e.target.matches('.child-button')) {
    console.log('Child button clicked');
  }
});

// Common events
element.addEventListener('click', handler);
element.addEventListener('dblclick', handler);
element.addEventListener('mouseenter', handler);
element.addEventListener('mouseleave', handler);
element.addEventListener('keydown', handler);
element.addEventListener('keyup', handler);
element.addEventListener('submit', handler);
element.addEventListener('change', handler);
element.addEventListener('input', handler);
element.addEventListener('focus', handler);
element.addEventListener('blur', handler);
```


### 4. Web Storage

```javascript
// localStorage - persists even after browser close
localStorage.setItem('username', 'Alice');
const user = localStorage.getItem('username');
localStorage.removeItem('username');
localStorage.clear();

// sessionStorage - cleared when tab closes
sessionStorage.setItem('token', 'abc123');
const token = sessionStorage.getItem('token');

// Store objects (must stringify)
const userData = { name: 'Alice', age: 25 };
localStorage.setItem('user', JSON.stringify(userData));
const stored = JSON.parse(localStorage.getItem('user'));
```


### 5. AJAX and Fetch

```javascript
// Fetch API (modern)
fetch('https://api.example.com/users')
  .then(response => {
    if (!response.ok) throw new Error('Network error');
    return response.json();
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));

// With async/await
async function fetchUsers() {
  try {
    const response = await fetch('https://api.example.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

// POST request
fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ name: 'Alice', age: 25 })
})
  .then(response => response.json())
  .then(data => console.log(data));
```


### 6. WebSockets

```javascript
// Create WebSocket connection
const socket = new WebSocket('ws://localhost:8080');

// Connection opened
socket.addEventListener('open', function(event) {
  socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function(event) {
  console.log('Message from server:', event.data);
});

// Connection closed
socket.addEventListener('close', function(event) {
  console.log('Connection closed');
});

// Error handling
socket.addEventListener('error', function(event) {
  console.error('WebSocket error:', event);
});
```


### 7. Security

**CSRF (Cross-Site Request Forgery):**
```javascript
// Include CSRF token in requests
fetch('/api/data', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
  },
  body: JSON.stringify(data)
});
```

**XSS (Cross-Site Scripting) Prevention:**
```javascript
// Bad - vulnerable to XSS
element.innerHTML = userInput;

// Good - escape HTML
element.textContent = userInput;

// Or sanitize HTML
const sanitized = DOMPurify.sanitize(userInput);
element.innerHTML = sanitized;
```


## JavaScript Intermediate (Continued)

### 9. Functional Inheritance and Mix-ins

**Functional Inheritance:**
```javascript
// Base constructor
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};

// Functional inheritance using constructor rent
function Employee(name, jobTitle) {
  // Rent the Person constructor
  Person.call(this, name);
  this.jobTitle = jobTitle;
}

// Set up inheritance
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.work = function() {
  console.log(`${this.name} is working as ${this.jobTitle}`);
};

const emp = new Employee("Alice", "Developer");
emp.greet();  // "Hello, I'm Alice"
emp.work();   // "Alice is working as Developer"
```

**Mix-ins Pattern:**
```javascript
// Mix-in objects
const canEat = {
  eat(food) {
    console.log(`${this.name} is eating ${food}`);
  }
};

const canWalk = {
  walk() {
    console.log(`${this.name} is walking`);
  }
};

const canSwim = {
  swim() {
    console.log(`${this.name} is swimming`);
  }
};

// Apply mix-ins to a class
class Person {
  constructor(name) {
    this.name = name;
  }
}

// Mix in abilities
Object.assign(Person.prototype, canEat, canWalk);

const person = new Person("John");
person.eat("pizza");  // "John is eating pizza"
person.walk();        // "John is walking"

// Duck can swim and walk
class Duck {
  constructor(name) {
    this.name = name;
  }
}

Object.assign(Duck.prototype, canWalk, canSwim);

const duck = new Duck("Donald");
duck.walk();  // "Donald is walking"
duck.swim();  // "Donald is swimming"
```


### 10. ES2015 Intermediate Features

**Symbol:**
```javascript
// Create unique identifiers
const id = Symbol('id');
const anotherId = Symbol('id');
console.log(id === anotherId);  // false (always unique)

// Use as object property
const user = {
  name: "Alice",
  [id]: 123  // Symbol as property key
};

console.log(user[id]);  // 123
console.log(Object.keys(user));  // ["name"] - Symbol not enumerable

// Well-known symbols
const obj = {
  [Symbol.iterator]: function*() {
    yield 1;
    yield 2;
    yield 3;
  }
};

for (const value of obj) {
  console.log(value);  // 1, 2, 3
}
```

**Set:**
```javascript
// Collection of unique values
const mySet = new Set();

mySet.add(1);
mySet.add(2);
mySet.add(2);  // Duplicate, won't be added
mySet.add("hello");

console.log(mySet.size);  // 3
console.log(mySet.has(1));  // true

mySet.delete(2);
console.log(mySet.has(2));  // false

// Iterate over Set
for (const value of mySet) {
  console.log(value);
}

// Convert array to Set (remove duplicates)
const numbers = [1, 2, 2, 3, 4, 4, 5];
const uniqueNumbers = [...new Set(numbers)];  // [1, 2, 3, 4, 5]
```

**Map:**
```javascript
// Key-value pairs with any type of key
const myMap = new Map();

myMap.set('name', 'Alice');
myMap.set(1, 'number key');
myMap.set(true, 'boolean key');

const objKey = { id: 1 };
myMap.set(objKey, 'object key');

console.log(myMap.get('name'));  // "Alice"
console.log(myMap.get(objKey));  // "object key"
console.log(myMap.size);  // 4

console.log(myMap.has('name'));  // true
myMap.delete(1);

// Iterate over Map
for (const [key, value] of myMap) {
  console.log(`${key}: ${value}`);
}

// Map methods
myMap.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});

console.log([...myMap.keys()]);    // Get all keys
console.log([...myMap.values()]);  // Get all values
console.log([...myMap.entries()]); // Get all entries
```

**WeakSet:**
```javascript
// Set that holds weak references to objects
const weakSet = new WeakSet();

let obj1 = { name: "Alice" };
let obj2 = { name: "Bob" };

weakSet.add(obj1);
weakSet.add(obj2);

console.log(weakSet.has(obj1));  // true

// When obj1 is garbage collected, it's automatically removed from WeakSet
obj1 = null;  // Now eligible for garbage collection

// WeakSet only accepts objects, not primitives
// weakSet.add(1);  // TypeError
```

**WeakMap:**
```javascript
// Map with weak references to keys
const weakMap = new WeakMap();

let key1 = { id: 1 };
let key2 = { id: 2 };

weakMap.set(key1, "value 1");
weakMap.set(key2, "value 2");

console.log(weakMap.get(key1));  // "value 1"

// When key is garbage collected, entry is automatically removed
key1 = null;  // Eligible for garbage collection

// Use case: Private data
const privateData = new WeakMap();

class Person {
  constructor(name, age) {
    this.name = name;
    privateData.set(this, { age });  // Store private data
  }
  
  getAge() {
    return privateData.get(this).age;
  }
}

const person = new Person("Alice", 25);
console.log(person.getAge());  // 25
console.log(person.age);       // undefined (private)
```

**Calculated Properties:**
```javascript
// Computed property names
const propName = 'firstName';
const person = {
  [propName]: 'John',
  ['last' + 'Name']: 'Doe',
  [`age_${2024}`]: 30
};

console.log(person.firstName);  // "John"
console.log(person.lastName);   // "Doe"
console.log(person.age_2024);   // 30
```


## JavaScript Advanced (Continued)

### 4. Regular Expressions Advanced

**Greedy vs Lazy Quantifiers:**
```javascript
const text = "<div>Hello</div><div>World</div>";

// Greedy (default) - matches as much as possible
const greedy = text.match(/<div>.*<\/div>/);
console.log(greedy[0]);  // "<div>Hello</div><div>World</div>"

// Lazy - matches as little as possible (add ?)
const lazy = text.match(/<div>.*?<\/div>/);
console.log(lazy[0]);  // "<div>Hello</div>"

// Examples
"aaaa".match(/a+/);   // ["aaaa"] - greedy
"aaaa".match(/a+?/);  // ["a"] - lazy
```

**Ranges and Character Classes:**
```javascript
// Ranges
/[a-z]/.test('hello');     // true - lowercase letters
/[A-Z]/.test('Hello');     // true - uppercase letters
/[0-9]/.test('123');       // true - digits
/[a-zA-Z0-9]/.test('a1');  // true - alphanumeric

// Negated ranges
/[^0-9]/.test('abc');  // true - NOT a digit

// Character classes
/\d/.test('5');   // true - digit [0-9]
/\D/.test('a');   // true - NOT digit
/\w/.test('a1_'); // true - word character [a-zA-Z0-9_]
/\W/.test('@');   // true - NOT word character
/\s/.test(' ');   // true - whitespace
/\S/.test('a');   // true - NOT whitespace
```

**Grouping and Capturing:**
```javascript
// Capturing groups ()
const date = "2024-02-15";
const match = date.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(match[1]);  // "2024" - year
console.log(match[2]);  // "02" - month
console.log(match[3]);  // "15" - day

// Named capturing groups
const namedMatch = date.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
console.log(namedMatch.groups.year);   // "2024"
console.log(namedMatch.groups.month);  // "02"
console.log(namedMatch.groups.day);    // "15"

// Non-capturing groups (?:)
const text = "hello world";
text.match(/(?:hello) (world)/);  // Only captures "world"

// Backreferences
const repeated = "hello hello";
/(\w+) \1/.test(repeated);  // true - \1 refers to first group

// Replace with groups
const name = "Doe, John";
const formatted = name.replace(/(\w+), (\w+)/, "$2 $1");
console.log(formatted);  // "John Doe"
```

**Lookahead and Lookbehind:**
```javascript
// Positive lookahead (?=)
"hello123".match(/\w+(?=\d+)/);  // ["hello"] - followed by digits

// Negative lookahead (?!)
"hello".match(/\w+(?!\d)/);  // ["hello"] - NOT followed by digit

// Positive lookbehind (?<=)
"$100".match(/(?<=\$)\d+/);  // ["100"] - preceded by $

// Negative lookbehind (?<!)
"100".match(/(?<!\$)\d+/);  // ["100"] - NOT preceded by $
```


### 5. JavaScript Errors

**Try...Catch:**
```javascript
try {
  // Code that might throw an error
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  // Handle the error
  console.error("An error occurred:", error.message);
  console.error("Stack trace:", error.stack);
} finally {
  // Always executes (cleanup code)
  console.log("Cleanup");
}
```

**Throwing Errors:**
```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error("Division by zero");
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error.message);  // "Division by zero"
}
```

**Error Types:**
```javascript
// Built-in error types
try {
  // ReferenceError
  console.log(nonExistentVariable);
} catch (error) {
  console.log(error instanceof ReferenceError);  // true
}

try {
  // TypeError
  null.toString();
} catch (error) {
  console.log(error instanceof TypeError);  // true
}

try {
  // SyntaxError
  eval('var x = ;');
} catch (error) {
  console.log(error instanceof SyntaxError);  // true
}

try {
  // RangeError
  const arr = new Array(-1);
} catch (error) {
  console.log(error instanceof RangeError);  // true
}
```

**Custom Errors:**
```javascript
// Create custom error class
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class DatabaseError extends Error {
  constructor(message, code) {
    super(message);
    this.name = "DatabaseError";
    this.code = code;
  }
}

// Use custom errors
function validateUser(user) {
  if (!user.name) {
    throw new ValidationError("Name is required");
  }
  if (!user.email) {
    throw new ValidationError("Email is required");
  }
}

try {
  validateUser({ name: "John" });
} catch (error) {
  if (error instanceof ValidationError) {
    console.log("Validation failed:", error.message);
  } else {
    console.log("Unknown error:", error);
  }
}
```


## Client-Side JavaScript (Continued)

### 8. Node Modification

**Node Properties:**
```javascript
const element = document.getElementById('myDiv');

// Node properties
console.log(element.nodeType);      // 1 (Element node)
console.log(element.nodeName);      // "DIV"
console.log(element.nodeValue);     // null (for elements)
console.log(element.textContent);   // Text content
console.log(element.innerHTML);     // HTML content
console.log(element.outerHTML);     // Element + HTML content

// Text node
const textNode = document.createTextNode("Hello");
console.log(textNode.nodeType);   // 3 (Text node)
console.log(textNode.nodeValue);  // "Hello"
```

**Attributes:**
```javascript
const link = document.querySelector('a');

// Get/set attributes
link.getAttribute('href');
link.setAttribute('href', 'https://example.com');
link.removeAttribute('target');
link.hasAttribute('href');  // true

// Direct property access
link.href = 'https://example.com';
link.id = 'myLink';
link.className = 'active';

// Get all attributes
const attrs = link.attributes;
for (let attr of attrs) {
  console.log(`${attr.name}: ${attr.value}`);
}
```

**Data Attributes:**
```javascript
// HTML: <div id="user" data-id="123" data-role="admin"></div>
const user = document.getElementById('user');

// Access data attributes
console.log(user.dataset.id);     // "123"
console.log(user.dataset.role);   // "admin"

// Set data attributes
user.dataset.status = "active";
user.dataset.lastLogin = "2024-02-15";

// Remove data attribute
delete user.dataset.role;

// Convert to object
const userData = { ...user.dataset };
console.log(userData);  // { id: "123", status: "active", lastLogin: "2024-02-15" }
```

**CSS Scripting:**
```javascript
const element = document.getElementById('myDiv');

// Inline styles
element.style.color = 'red';
element.style.backgroundColor = 'blue';
element.style.fontSize = '20px';

// Multiple styles
Object.assign(element.style, {
  color: 'white',
  padding: '10px',
  margin: '5px'
});

// Get computed styles
const styles = window.getComputedStyle(element);
console.log(styles.color);
console.log(styles.fontSize);

// CSS classes
element.classList.add('active');
element.classList.remove('hidden');
element.classList.toggle('visible');
element.classList.contains('active');  // true

// Replace all classes
element.className = 'new-class another-class';
```


### 9. Advanced Timers

**setImmediate (Node.js):**
```javascript
// Execute after current event loop (Node.js only)
setImmediate(() => {
  console.log('Executed immediately after I/O events');
});

console.log('This runs first');
```

**requestAnimationFrame:**
```javascript
// Optimized for animations (60fps)
function animate() {
  // Update animation
  element.style.left = (parseInt(element.style.left) || 0) + 1 + 'px';
  
  // Continue animation
  if (parseInt(element.style.left) < 500) {
    requestAnimationFrame(animate);
  }
}

// Start animation
requestAnimationFrame(animate);

// Cancel animation
const animationId = requestAnimationFrame(animate);
cancelAnimationFrame(animationId);
```

**Comparison:**
```javascript
// setTimeout - minimum delay, not guaranteed
setTimeout(() => console.log('setTimeout'), 0);

// setImmediate - after I/O (Node.js)
setImmediate(() => console.log('setImmediate'));

// requestAnimationFrame - before next repaint (browser)
requestAnimationFrame(() => console.log('rAF'));

// Promise - microtask queue
Promise.resolve().then(() => console.log('Promise'));

// Execution order: Promise → setTimeout → rAF → setImmediate
```


### 10. Cross-Domain Communication

**IFrame Communication:**
```javascript
// Parent page
const iframe = document.getElementById('myIframe');

// Send message to iframe
iframe.contentWindow.postMessage('Hello from parent', 'https://example.com');

// Receive message from iframe
window.addEventListener('message', (event) => {
  // Verify origin for security
  if (event.origin !== 'https://example.com') return;
  
  console.log('Message from iframe:', event.data);
});

// Inside iframe
// Send message to parent
window.parent.postMessage('Hello from iframe', 'https://parent.com');

// Receive message from parent
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://parent.com') return;
  console.log('Message from parent:', event.data);
});
```

**CORS (Cross-Origin Resource Sharing):**
```javascript
// Server must set headers
// Access-Control-Allow-Origin: https://example.com
// Access-Control-Allow-Methods: GET, POST
// Access-Control-Allow-Headers: Content-Type

// Client request
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'include'  // Include cookies
})
  .then(response => response.json())
  .then(data => console.log(data));
```

**JSONP (Legacy):**
```javascript
// JSONP - workaround for CORS (legacy, avoid if possible)
function handleResponse(data) {
  console.log(data);
}

const script = document.createElement('script');
script.src = 'https://api.example.com/data?callback=handleResponse';
document.body.appendChild(script);

// Server responds with: handleResponse({data: "value"})
```


### 11. JavaScript Modules

**CommonJS (Node.js):**
```javascript
// math.js
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

module.exports = { add, subtract };

// app.js
const math = require('./math');
console.log(math.add(5, 3));  // 8
```

**ES2015 Modules:**
```javascript
// math.js
export function add(a, b) {
  return a + b;
}

export function subtract(a, b) {
  return a - b;
}

export default function multiply(a, b) {
  return a * b;
}

// app.js
import multiply, { add, subtract } from './math.js';
console.log(add(5, 3));       // 8
console.log(multiply(5, 3));  // 15

// Import all
import * as math from './math.js';
console.log(math.add(5, 3));
```

**AMD (Asynchronous Module Definition):**
```javascript
// Using RequireJS
define(['jquery', 'underscore'], function($, _) {
  function doSomething() {
    // Use $ and _
  }
  
  return {
    doSomething: doSomething
  };
});

// Load module
require(['myModule'], function(myModule) {
  myModule.doSomething();
});
```


### 12. Page Lifecycle

**Parsing and Rendering:**
```javascript
// DOMContentLoaded - DOM ready, resources may still be loading
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM is ready');
  // Safe to manipulate DOM
});

// load - everything loaded (images, styles, etc.)
window.addEventListener('load', () => {
  console.log('Page fully loaded');
});

// beforeunload - user leaving page
window.addEventListener('beforeunload', (event) => {
  event.preventDefault();
  event.returnValue = '';  // Show confirmation dialog
});

// unload - page is unloading
window.addEventListener('unload', () => {
  // Cleanup, send analytics
  navigator.sendBeacon('/analytics', data);
});
```

**Reflow and Repaint:**
```javascript
// Reflow (expensive) - changes layout
element.style.width = '100px';
element.style.height = '100px';
element.offsetHeight;  // Forces reflow

// Repaint (less expensive) - changes appearance only
element.style.color = 'red';
element.style.backgroundColor = 'blue';

// Optimization: Batch DOM changes
// Bad - multiple reflows
element.style.width = '100px';
element.style.height = '100px';
element.style.margin = '10px';

// Good - single reflow
element.style.cssText = 'width: 100px; height: 100px; margin: 10px;';

// Or use classes
element.className = 'optimized-class';

// Document fragment for multiple insertions
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const div = document.createElement('div');
  fragment.appendChild(div);
}
document.body.appendChild(fragment);  // Single reflow
```

**Performance Optimizations:**
```javascript
// Debounce - delay execution until after events stop
function debounce(func, delay) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

window.addEventListener('resize', debounce(() => {
  console.log('Resized');
}, 250));

// Throttle - limit execution frequency
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

window.addEventListener('scroll', throttle(() => {
  console.log('Scrolled');
}, 100));
```


## Bonus Topics

### 1. Canvas

**Basic Canvas:**
```javascript
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

// Draw rectangle
ctx.fillStyle = 'red';
ctx.fillRect(10, 10, 100, 50);

// Draw circle
ctx.beginPath();
ctx.arc(200, 100, 50, 0, Math.PI * 2);
ctx.fillStyle = 'blue';
ctx.fill();

// Draw line
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 200);
ctx.strokeStyle = 'green';
ctx.lineWidth = 5;
ctx.stroke();

// Draw text
ctx.font = '30px Arial';
ctx.fillStyle = 'black';
ctx.fillText('Hello Canvas', 50, 250);

// Draw image
const img = new Image();
img.onload = () => {
  ctx.drawImage(img, 0, 0, 200, 200);
};
img.src = 'image.jpg';
```

**Animation:**
```javascript
let x = 0;

function animate() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Draw moving rectangle
  ctx.fillStyle = 'red';
  ctx.fillRect(x, 100, 50, 50);
  
  x += 2;
  if (x > canvas.width) x = 0;
  
  requestAnimationFrame(animate);
}

animate();
```


### 2. HTML5 APIs

**Fullscreen API:**
```javascript
const element = document.getElementById('myDiv');

// Enter fullscreen
element.requestFullscreen();

// Exit fullscreen
document.exitFullscreen();

// Check if fullscreen
if (document.fullscreenElement) {
  console.log('In fullscreen mode');
}

// Fullscreen change event
document.addEventListener('fullscreenchange', () => {
  if (document.fullscreenElement) {
    console.log('Entered fullscreen');
  } else {
    console.log('Exited fullscreen');
  }
});
```

**File API:**
```javascript
// File input
const input = document.getElementById('fileInput');

input.addEventListener('change', (event) => {
  const file = event.target.files[0];
  
  console.log('Name:', file.name);
  console.log('Size:', file.size);
  console.log('Type:', file.type);
  
  // Read file
  const reader = new FileReader();
  
  reader.onload = (e) => {
    console.log('File content:', e.target.result);
  };
  
  reader.readAsText(file);  // or readAsDataURL, readAsArrayBuffer
});

// Drag and drop
const dropZone = document.getElementById('dropZone');

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = e.dataTransfer.files;
  console.log(files);
});
```

**Notifications API:**
```javascript
// Request permission
Notification.requestPermission().then(permission => {
  if (permission === 'granted') {
    // Show notification
    new Notification('Hello!', {
      body: 'This is a notification',
      icon: 'icon.png',
      tag: 'unique-tag'
    });
  }
});

// With options
const notification = new Notification('New Message', {
  body: 'You have a new message',
  icon: 'message-icon.png',
  badge: 'badge.png',
  vibrate: [200, 100, 200],
  data: { id: 123 }
});

notification.onclick = () => {
  console.log('Notification clicked');
  window.focus();
};
```

**getUserMedia API:**
```javascript
// Access camera/microphone
navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  .then(stream => {
    const video = document.getElementById('video');
    video.srcObject = stream;
    video.play();
  })
  .catch(error => {
    console.error('Error accessing media:', error);
  });

// Take photo from video
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

function takePhoto() {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL('image/png');
  console.log(imageData);
}
```

**Speech Recognition API:**
```javascript
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

recognition.lang = 'en-US';
recognition.continuous = false;
recognition.interimResults = false;

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  console.log('You said:', transcript);
};

recognition.onerror = (event) => {
  console.error('Speech recognition error:', event.error);
};

// Start recognition
recognition.start();

// Speech Synthesis (Text-to-Speech)
const utterance = new SpeechSynthesisUtterance('Hello, how are you?');
utterance.lang = 'en-US';
utterance.rate = 1;
utterance.pitch = 1;

speechSynthesis.speak(utterance);
```


### 3. Multimedia Elements

**Video Control:**
```javascript
const video = document.getElementById('myVideo');

// Play/pause
video.play();
video.pause();

// Volume (0.0 to 1.0)
video.volume = 0.5;
video.muted = true;

// Playback rate
video.playbackRate = 1.5;  // 1.5x speed

// Seek
video.currentTime = 30;  // Jump to 30 seconds

// Properties
console.log(video.duration);      // Total duration
console.log(video.currentTime);   // Current position
console.log(video.paused);        // Is paused?
console.log(video.ended);         // Has ended?
console.log(video.readyState);    // Loading state
```

**Audio Control:**
```javascript
const audio = new Audio('song.mp3');

audio.play();
audio.pause();
audio.volume = 0.8;

// Loop
audio.loop = true;

// Preload
audio.preload = 'auto';  // 'none', 'metadata', 'auto'
```

**Media Events:**
```javascript
const video = document.getElementById('myVideo');

// Loading events
video.addEventListener('loadstart', () => {
  console.log('Started loading');
});

video.addEventListener('loadedmetadata', () => {
  console.log('Metadata loaded');
  console.log('Duration:', video.duration);
});

video.addEventListener('loadeddata', () => {
  console.log('First frame loaded');
});

video.addEventListener('canplay', () => {
  console.log('Can start playing');
});

video.addEventListener('canplaythrough', () => {
  console.log('Can play without buffering');
});

// Playback events
video.addEventListener('play', () => {
  console.log('Started playing');
});

video.addEventListener('pause', () => {
  console.log('Paused');
});

video.addEventListener('ended', () => {
  console.log('Playback ended');
});

video.addEventListener('timeupdate', () => {
  console.log('Current time:', video.currentTime);
  // Update progress bar
  const progress = (video.currentTime / video.duration) * 100;
  progressBar.style.width = progress + '%';
});

video.addEventListener('volumechange', () => {
  console.log('Volume changed:', video.volume);
});

video.addEventListener('error', (e) => {
  console.error('Video error:', e);
});
```

This comprehensive guide now covers **ALL** essential frontend development concepts with clear explanations and practical examples!

