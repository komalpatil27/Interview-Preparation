# JavaScript Deep Dive - Interview Preparation

Based on interview feedback, this guide covers all JavaScript concepts with detailed explanations and examples.

## Arrays

### Built-in Methods (L1)

**pop() - Remove last element:**
```javascript
const arr = [1, 2, 3];
const last = arr.pop(); // 3
console.log(arr); // [1, 2]
```

**push() - Add to end:**
```javascript
const arr = [1, 2];
arr.push(3, 4); // Returns new length: 4
console.log(arr); // [1, 2, 3, 4]
```

**slice() - Extract portion (doesn't mutate):**
```javascript
const arr = [1, 2, 3, 4, 5];
const sliced = arr.slice(1, 4); // [2, 3, 4]
console.log(arr); // [1, 2, 3, 4, 5] - original unchanged
```

**splice() - Add/remove elements (mutates):**
```javascript
const arr = [1, 2, 3, 4, 5];
arr.splice(2, 1, 'a', 'b'); // Remove 1 item at index 2, add 'a', 'b'
console.log(arr); // [1, 2, 'a', 'b', 4, 5]
```

**JSON.parse() / JSON.stringify():**
```javascript
const obj = { name: 'Alice', age: 25 };
const json = JSON.stringify(obj); // '{"name":"Alice","age":25}'
const parsed = JSON.parse(json); // { name: 'Alice', age: 25 }

// Deep copy using JSON
const deepCopy = JSON.parse(JSON.stringify(obj));
```

**concat() - Merge arrays:**
```javascript
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = arr1.concat(arr2); // [1, 2, 3, 4]
// Modern way:
const merged2 = [...arr1, ...arr2];
```

### Array Operations (L1)

**sort():**
```javascript
const numbers = [3, 1, 4, 1, 5];
numbers.sort((a, b) => a - b); // [1, 1, 3, 4, 5] ascending
numbers.sort((a, b) => b - a); // [5, 4, 3, 1, 1] descending

const users = [{ name: 'Bob', age: 30 }, { name: 'Alice', age: 25 }];
users.sort((a, b) => a.age - b.age); // Sort by age
```

**filter():**
```javascript
const numbers = [1, 2, 3, 4, 5];
const evens = numbers.filter(n => n % 2 === 0); // [2, 4]
```

**find():**
```javascript
const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];
const user = users.find(u => u.id === 2); // { id: 2, name: 'Bob' }
```

**map():**
```javascript
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // [2, 4, 6]
```

### Loops (L1)

**for loop:**
```javascript
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}
```

**while vs do-while:**
```javascript
// while - may not execute at all
let i = 0;
while (i < 3) {
  console.log(i++); // 0, 1, 2
}

// do-while - executes at least once
let j = 0;
do {
  console.log(j++); // 0, 1, 2
} while (j < 3);
```

### Advanced Array Methods (L3)

**shift() - Remove first element:**
```javascript
const arr = [1, 2, 3];
const first = arr.shift(); // 1
console.log(arr); // [2, 3]
```

**unshift() - Add to beginning:**
```javascript
const arr = [2, 3];
arr.unshift(1); // Returns new length: 3
console.log(arr); // [1, 2, 3]
```

**some() - Check if any element passes test:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.some(n => n % 2 === 0); // true
```

**every() - Check if all elements pass test:**
```javascript
const numbers = [2, 4, 6];
const allEven = numbers.every(n => n % 2 === 0); // true
```

**for...of - Iterate over values:**
```javascript
const arr = ['a', 'b', 'c'];
for (const value of arr) {
  console.log(value); // 'a', 'b', 'c'
}
```

**reduce() - Reduce to single value:**
```javascript
const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0); // 15

// Complex example: Group by property
const users = [
  { name: 'Alice', role: 'admin' },
  { name: 'Bob', role: 'user' },
  { name: 'Charlie', role: 'admin' }
];
const grouped = users.reduce((acc, user) => {
  acc[user.role] = acc[user.role] || [];
  acc[user.role].push(user);
  return acc;
}, {});
// { admin: [{...}, {...}], user: [{...}] }
```


## Data Types

### L2 Data Types

**NULL vs undefined:**
```javascript
let x; // undefined - declared but not assigned
let y = null; // null - intentionally empty

console.log(typeof x); // "undefined"
console.log(typeof y); // "object" (JavaScript quirk)

console.log(x == y);  // true (loose equality)
console.log(x === y); // false (strict equality)
```

**Symbol - Unique identifier:**
```javascript
const id1 = Symbol('id');
const id2 = Symbol('id');
console.log(id1 === id2); // false - always unique

// Use as object property
const user = {
  name: 'Alice',
  [id1]: 123
};
console.log(user[id1]); // 123
console.log(Object.keys(user)); // ['name'] - Symbol not enumerable
```

**Set - Collection of unique values:**
```javascript
const mySet = new Set([1, 2, 2, 3, 3, 4]);
console.log(mySet); // Set(4) { 1, 2, 3, 4 }

mySet.add(5);
mySet.has(3); // true
mySet.delete(2);
mySet.size; // 4

// Remove duplicates from array
const arr = [1, 2, 2, 3, 3];
const unique = [...new Set(arr)]; // [1, 2, 3]
```

**Map - Key-value pairs (any type as key):**
```javascript
const map = new Map();
map.set('name', 'Alice');
map.set(1, 'number key');
map.set(true, 'boolean key');

const objKey = { id: 1 };
map.set(objKey, 'object key');

console.log(map.get('name')); // 'Alice'
console.log(map.get(objKey)); // 'object key'
console.log(map.size); // 4

// Iterate
for (const [key, value] of map) {
  console.log(key, value);
}
```

### L3 Data Types

**WeakSet - Holds weak references to objects:**
```javascript
let obj1 = { name: 'Alice' };
let obj2 = { name: 'Bob' };

const weakSet = new WeakSet([obj1, obj2]);
console.log(weakSet.has(obj1)); // true

// When obj1 is garbage collected, it's removed from WeakSet
obj1 = null; // Now eligible for garbage collection

// Only accepts objects, not primitives
// weakSet.add(1); // TypeError
```

**WeakMap - Weak references for keys:**
```javascript
let key1 = { id: 1 };
const weakMap = new WeakMap();
weakMap.set(key1, 'value');

console.log(weakMap.get(key1)); // 'value'

// Use case: Private data
const privateData = new WeakMap();
class Person {
  constructor(name, age) {
    this.name = name;
    privateData.set(this, { age });
  }
  getAge() {
    return privateData.get(this).age;
  }
}
```


## Objects

### L1 - Object Basics

**Creation:**
```javascript
// Object literal
const obj1 = { name: 'Alice', age: 25 };

// Constructor
const obj2 = new Object();
obj2.name = 'Bob';

// Object.create()
const proto = { greet() { console.log('Hello'); } };
const obj3 = Object.create(proto);
```

**Object.assign() - Copy properties:**
```javascript
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
console.log(target); // { a: 1, b: 2, c: 3 }

// Clone object (shallow)
const clone = Object.assign({}, obj);
```

**Object.keys() / values():**
```javascript
const obj = { a: 1, b: 2, c: 3 };
console.log(Object.keys(obj));   // ['a', 'b', 'c']
console.log(Object.values(obj)); // [1, 2, 3]
```

### L2 - Advanced Object Operations

**Object.hasOwnProperty():**
```javascript
const obj = { name: 'Alice' };
console.log(obj.hasOwnProperty('name')); // true
console.log(obj.hasOwnProperty('toString')); // false (inherited)
```

**Object.entries():**
```javascript
const obj = { a: 1, b: 2 };
console.log(Object.entries(obj)); // [['a', 1], ['b', 2]]

// Convert to Map
const map = new Map(Object.entries(obj));
```

**for...in vs for...of:**
```javascript
const obj = { a: 1, b: 2, c: 3 };

// for...in - iterates over keys
for (const key in obj) {
  console.log(key, obj[key]); // 'a' 1, 'b' 2, 'c' 3
}

// for...of - iterates over values (needs Object.entries)
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);
}
```

**Shallow vs Deep Copy:**
```javascript
const original = { a: 1, b: { c: 2 } };

// Shallow copy
const shallow = { ...original };
shallow.b.c = 3;
console.log(original.b.c); // 3 (affected!)

// Deep copy
const deep = JSON.parse(JSON.stringify(original));
deep.b.c = 4;
console.log(original.b.c); // 3 (not affected)

// Modern deep copy
const deep2 = structuredClone(original);
```

**Property Attributes:**
```javascript
const obj = {};
Object.defineProperty(obj, 'name', {
  value: 'Alice',
  writable: false,     // Cannot change value
  enumerable: true,    // Shows in for...in
  configurable: false  // Cannot delete or reconfigure
});

obj.name = 'Bob'; // Fails silently (strict mode throws error)
console.log(obj.name); // 'Alice'
```

### L3 - Advanced Features

**Optional Chaining:**
```javascript
const user = {
  name: 'Alice',
  address: {
    city: 'NYC'
  }
};

console.log(user?.address?.city); // 'NYC'
console.log(user?.contact?.phone); // undefined (no error)

// With arrays
const arr = [1, 2, 3];
console.log(arr?.[0]); // 1

// With functions
const obj = { greet: () => 'Hello' };
console.log(obj.greet?.()); // 'Hello'
```

**Property Descriptors:**
```javascript
const obj = { name: 'Alice' };
const descriptor = Object.getOwnPropertyDescriptor(obj, 'name');
console.log(descriptor);
// { value: 'Alice', writable: true, enumerable: true, configurable: true }
```

**Getters/Setters:**
```javascript
const person = {
  firstName: 'John',
  lastName: 'Doe',
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  
  set fullName(value) {
    [this.firstName, this.lastName] = value.split(' ');
  }
};

console.log(person.fullName); // 'John Doe'
person.fullName = 'Jane Smith';
console.log(person.firstName); // 'Jane'
```


## Functions

### L1 - Function Fundamentals

**Context and 'this':**
```javascript
const obj = {
  name: 'Alice',
  greet: function() {
    console.log(this.name); // 'Alice'
  }
};

// Arrow function - lexical 'this'
const obj2 = {
  name: 'Bob',
  greet: () => {
    console.log(this.name); // undefined (global 'this')
  }
};
```

**call(), bind(), apply():**
```javascript
function greet(greeting, punctuation) {
  console.log(`${greeting}, ${this.name}${punctuation}`);
}

const person = { name: 'Alice' };

// call - invoke immediately with arguments
greet.call(person, 'Hello', '!'); // "Hello, Alice!"

// apply - invoke immediately with array
greet.apply(person, ['Hi', '?']); // "Hi, Alice?"

// bind - return new function with bound 'this'
const boundGreet = greet.bind(person, 'Hey');
boundGreet('!!!'); // "Hey, Alice!!!"
```

**Closures:**
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

**Global Scope:**
```javascript
var globalVar = 'I am global';

function test() {
  console.log(globalVar); // Accessible
}

// Avoid polluting global scope
(function() {
  var localVar = 'I am local';
})();
```

**Callbacks:**
```javascript
function fetchData(callback) {
  setTimeout(() => {
    callback({ data: 'Hello' });
  }, 1000);
}

fetchData((result) => {
  console.log(result.data); // 'Hello'
});
```

**Recursion:**
```javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120
```

### L2 - Advanced Function Concepts

**Parameters: Pass by Value vs Reference:**
```javascript
// Primitives - pass by value
function changeValue(x) {
  x = 10;
}
let num = 5;
changeValue(num);
console.log(num); // 5 (unchanged)

// Objects - pass by reference
function changeObject(obj) {
  obj.name = 'Changed';
}
const person = { name: 'Alice' };
changeObject(person);
console.log(person.name); // 'Changed'
```

**Function Chaining:**
```javascript
class Calculator {
  constructor(value = 0) {
    this.value = value;
  }
  
  add(n) {
    this.value += n;
    return this; // Return 'this' for chaining
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
  .getResult(); // 16
```

**Currying:**
```javascript
// Regular function
function add(a, b, c) {
  return a + b + c;
}

// Curried version
function curriedAdd(a) {
  return function(b) {
    return function(c) {
      return a + b + c;
    };
  };
}

console.log(curriedAdd(1)(2)(3)); // 6

// Modern syntax
const curriedAdd2 = a => b => c => a + b + c;
```

**Arguments Binding:**
```javascript
function sum() {
  // arguments is array-like object
  const args = Array.from(arguments);
  return args.reduce((a, b) => a + b, 0);
}

console.log(sum(1, 2, 3, 4)); // 10

// Modern way with rest parameters
function sum2(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
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

const fibonacci = memoize(function(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Much faster!
```


## JavaScript Errors

### L1 - Error Handling

**try...catch...finally:**
```javascript
try {
  const result = riskyOperation();
  console.log(result);
} catch (error) {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
} finally {
  console.log('Cleanup - always runs');
}
```

**Throwing Errors:**
```javascript
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero');
  }
  return a / b;
}

try {
  divide(10, 0);
} catch (error) {
  console.error(error.message); // 'Division by zero'
}
```

**Custom Errors:**
```javascript
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

class DatabaseError extends Error {
  constructor(message, code) {
    super(message);
    this.name = 'DatabaseError';
    this.code = code;
  }
}

function validateUser(user) {
  if (!user.email) {
    throw new ValidationError('Email is required');
  }
}

try {
  validateUser({});
} catch (error) {
  if (error instanceof ValidationError) {
    console.log('Validation failed:', error.message);
  }
}
```


## Promises

### L1 - Promise Basics

**Promise Chaining:**
```javascript
fetch('/api/user')
  .then(response => response.json())
  .then(user => fetch(`/api/posts/${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

**Callback Hell vs Promises:**
```javascript
// Callback Hell
getData(function(a) {
  getMoreData(a, function(b) {
    getMoreData(b, function(c) {
      console.log(c);
    });
  });
});

// Promises
getData()
  .then(a => getMoreData(a))
  .then(b => getMoreData(b))
  .then(c => console.log(c))
  .catch(error => console.error(error));
```

**Error Handling:**
```javascript
Promise.resolve()
  .then(() => {
    throw new Error('Oops!');
  })
  .catch(error => {
    console.error('Caught:', error.message);
    return 'recovered'; // Can recover and continue chain
  })
  .then(result => console.log(result)); // 'recovered'
```

**Async/Await:**
```javascript
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Error:', error);
  }
}
```

**Loops with Promises:**
```javascript
// Sequential
async function processSequential(items) {
  for (const item of items) {
    await processItem(item);
  }
}

// Parallel
async function processParallel(items) {
  await Promise.all(items.map(item => processItem(item)));
}
```

### L2 - Advanced Promise Methods

**Promise.all() - Wait for all (fails fast):**
```javascript
const promise1 = fetch('/api/users');
const promise2 = fetch('/api/posts');
const promise3 = fetch('/api/comments');

Promise.all([promise1, promise2, promise3])
  .then(([users, posts, comments]) => {
    console.log('All done:', users, posts, comments);
  })
  .catch(error => {
    console.error('One failed:', error);
  });
```

**Promise.allSettled() - Wait for all (doesn't fail):**
```javascript
Promise.allSettled([promise1, promise2, promise3])
  .then(results => {
    results.forEach(result => {
      if (result.status === 'fulfilled') {
        console.log('Success:', result.value);
      } else {
        console.error('Failed:', result.reason);
      }
    });
  });
```

**Promise.any() - First to succeed:**
```javascript
Promise.any([promise1, promise2, promise3])
  .then(first => console.log('First success:', first))
  .catch(error => console.error('All failed'));
```

### L3 - Advanced Concepts

**Promise.race() - First to settle:**
```javascript
const timeout = new Promise((_, reject) => 
  setTimeout(() => reject(new Error('Timeout')), 5000)
);

Promise.race([fetch('/api/data'), timeout])
  .then(result => console.log('Success:', result))
  .catch(error => console.error('Failed or timeout:', error));
```

**Wrapping Callbacks in Promises:**
```javascript
// Old callback-based function
function oldAsyncFunction(callback) {
  setTimeout(() => callback(null, 'result'), 1000);
}

// Promisified version
function promisifiedFunction() {
  return new Promise((resolve, reject) => {
    oldAsyncFunction((error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

// Usage
promisifiedFunction()
  .then(result => console.log(result))
  .catch(error => console.error(error));

// Util.promisify (Node.js)
const util = require('util');
const promisified = util.promisify(oldAsyncFunction);
```


## Classes and OOP

### L1 - Class Basics

**OOP Principles:**
```javascript
// Encapsulation, Inheritance, Polymorphism, Abstraction
```

**Classes:**
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    console.log(`Hello, I'm ${this.name}`);
  }
}

const person = new Person('Alice', 25);
person.greet(); // "Hello, I'm Alice"
```

**Prototype:**
```javascript
function Person(name) {
  this.name = name;
}

Person.prototype.greet = function() {
  console.log(`Hello, I'm ${this.name}`);
};

const person = new Person('Bob');
person.greet();
```

**Constructor:**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Call parent constructor
    this.breed = breed;
  }
}
```

**Inheritance:**
```javascript
class Animal {
  eat() {
    console.log('Eating...');
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof!');
  }
}

const dog = new Dog();
dog.eat();  // Inherited
dog.bark(); // Own method
```

### L2 - Advanced Class Features

**Getters/Setters:**
```javascript
class Person {
  constructor(firstName, lastName) {
    this._firstName = firstName;
    this._lastName = lastName;
  }
  
  get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }
  
  set fullName(value) {
    [this._firstName, this._lastName] = value.split(' ');
  }
}

const person = new Person('John', 'Doe');
console.log(person.fullName); // 'John Doe'
person.fullName = 'Jane Smith';
```

**Public, Static, Private:**
```javascript
class BankAccount {
  // Public field
  accountNumber = '123456';
  
  // Private field (ES2022)
  #balance = 0;
  
  // Static field
  static bankName = 'MyBank';
  
  // Static method
  static getBankInfo() {
    return `Welcome to ${this.bankName}`;
  }
  
  // Private method
  #calculateInterest() {
    return this.#balance * 0.05;
  }
  
  deposit(amount) {
    this.#balance += amount;
  }
  
  getBalance() {
    return this.#balance;
  }
}

console.log(BankAccount.getBankInfo()); // 'Welcome to MyBank'
const account = new BankAccount();
account.deposit(100);
// account.#balance; // Error - private
```

**Prototypal Inheritance:**
```javascript
const animal = {
  eat() {
    console.log('Eating...');
  }
};

const dog = Object.create(animal);
dog.bark = function() {
  console.log('Woof!');
};

dog.eat();  // Inherited from animal
dog.bark(); // Own method
```

**Super Keyword:**
```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  speak() {
    super.speak(); // Call parent method
    console.log(`${this.name} barks`);
  }
}
```

### L3 - Design Patterns

**Singleton Pattern:**
```javascript
class Singleton {
  static instance = null;
  
  constructor() {
    if (Singleton.instance) {
      return Singleton.instance;
    }
    Singleton.instance = this;
    this.data = [];
  }
  
  static getInstance() {
    if (!Singleton.instance) {
      Singleton.instance = new Singleton();
    }
    return Singleton.instance;
  }
}

const s1 = new Singleton();
const s2 = new Singleton();
console.log(s1 === s2); // true
```

**instanceof Operator:**
```javascript
class Animal {}
class Dog extends Animal {}

const dog = new Dog();
console.log(dog instanceof Dog);    // true
console.log(dog instanceof Animal); // true
console.log(dog instanceof Object); // true
```


## Regular Expressions

### L2 - RegExp Basics

**String Methods and Flags:**
```javascript
const text = "Hello World";

// match() - find matches
const matches = text.match(/o/g); // ['o', 'o']

// matchAll() - iterator of all matches
const regex = /o/g;
for (const match of text.matchAll(regex)) {
  console.log(match);
}

// test() - boolean check
console.log(/world/i.test(text)); // true (i = case insensitive)

// Flags:
// g - global (all matches)
// i - case insensitive
// m - multiline
```

**Replacements:**
```javascript
const text = "Hello World";
const replaced = text.replace(/o/g, 'a'); // "Hella Warld"

// With function
const capitalized = text.replace(/\b\w/g, char => char.toUpperCase());
```

### L3 - Advanced RegExp

**Ranges:**
```javascript
/[a-z]/.test('hello');     // true - lowercase
/[A-Z]/.test('Hello');     // true - uppercase
/[0-9]/.test('123');       // true - digits
/[a-zA-Z0-9]/.test('a1');  // true - alphanumeric
```

**Grouping:**
```javascript
const date = "2024-02-15";
const match = date.match(/(\d{4})-(\d{2})-(\d{2})/);
console.log(match[1]); // '2024' - year
console.log(match[2]); // '02' - month
console.log(match[3]); // '15' - day

// Named groups
const namedMatch = date.match(/(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/);
console.log(namedMatch.groups.year); // '2024'
```

**Greedy vs Lazy:**
```javascript
const html = "<div>Hello</div><div>World</div>";

// Greedy (default)
html.match(/<div>.*<\/div>/);  // "<div>Hello</div><div>World</div>"

// Lazy (add ?)
html.match(/<div>.*?<\/div>/); // "<div>Hello</div>"
```


## Iterators and Generators

### L2 - Iterators

**Iterator Protocol:**
```javascript
const myIterable = {
  data: [1, 2, 3],
  [Symbol.iterator]() {
    let index = 0;
    const data = this.data;
    
    return {
      next() {
        if (index < data.length) {
          return { value: data[index++], done: false };
        }
        return { done: true };
      }
    };
  }
};

for (const value of myIterable) {
  console.log(value); // 1, 2, 3
}
```

**yield Keyword:**
```javascript
function* numberGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = numberGenerator();
console.log(gen.next()); // { value: 1, done: false }
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { done: true }
```

### L3 - Generators

**Generator Functions:**
```javascript
function* fibonacci() {
  let [a, b] = [0, 1];
  while (true) {
    yield a;
    [a, b] = [b, a + b];
  }
}

const fib = fibonacci();
console.log(fib.next().value); // 0
console.log(fib.next().value); // 1
console.log(fib.next().value); // 1
console.log(fib.next().value); // 2
console.log(fib.next().value); // 3
```

**Delegating Generators:**
```javascript
function* gen1() {
  yield 1;
  yield 2;
}

function* gen2() {
  yield* gen1(); // Delegate to gen1
  yield 3;
}

console.log([...gen2()]); // [1, 2, 3]
```


## Event Loop and Async

### L2 - Event Loop Basics

**Event Loop Components:**
```javascript
console.log('1'); // Call Stack

setTimeout(() => console.log('2'), 0); // Macrotask Queue

Promise.resolve().then(() => console.log('3')); // Microtask Queue

console.log('4'); // Call Stack

// Output: 1, 4, 3, 2
```

**Microtask vs Macrotask Queues:**
```javascript
// Microtask Queue (higher priority):
// - Promise.then/catch/finally
// - queueMicrotask()
// - MutationObserver
// - process.nextTick() (Node.js)

// Macrotask Queue (lower priority):
// - setTimeout
// - setInterval
// - setImmediate (Node.js)
// - I/O operations
```

**Module Systems:**
```javascript
// CommonJS (Node.js)
const module = require('./module');
module.exports = { func };

// ES Modules
import { func } from './module.js';
export { func };
```

### L3 - Advanced Event Loop

**Queue Priority:**
```javascript
console.log('Start');

setTimeout(() => console.log('Timeout'), 0);

Promise.resolve()
  .then(() => console.log('Promise 1'))
  .then(() => console.log('Promise 2'));

queueMicrotask(() => console.log('Microtask'));

console.log('End');

// Output:
// Start
// End
// Promise 1
// Microtask
// Promise 2
// Timeout
```


## Client-Side JavaScript

### L1 - DOM and BOM

**Window Object:**
```javascript
// Location
console.log(window.location.href);
window.location.href = '/new-page';

// Document
document.getElementById('myId');
document.querySelector('.myClass');

// Cookies
document.cookie = 'name=value; expires=...';
```

**DOM Manipulation:**
```javascript
// Selection
const el = document.getElementById('myId');
const els = document.querySelectorAll('.class');

// Traversing
el.parentElement;
el.children;
el.nextElementSibling;

// Modification
el.textContent = 'New text';
el.innerHTML = '<span>HTML</span>';
el.classList.add('active');
```

**Node Modification:**
```javascript
// Attributes
el.getAttribute('data-id');
el.setAttribute('data-id', '123');
el.dataset.id = '123'; // data-id

// Styling
el.style.color = 'red';
el.style.backgroundColor = 'blue';
```

**Event Handling:**
```javascript
el.addEventListener('click', (event) => {
  console.log('Clicked!');
  event.preventDefault();
  event.stopPropagation();
});

// Event delegation
parent.addEventListener('click', (e) => {
  if (e.target.matches('.child')) {
    console.log('Child clicked');
  }
});
```

**AJAX with Fetch:**
```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Async/await
async function fetchData() {
  const response = await fetch('/api/data');
  const data = await response.json();
  return data;
}
```


## TypeScript

### L1 - TypeScript Basics

**Type Annotations:**
```typescript
let name: string = 'Alice';
let age: number = 25;
let isActive: boolean = true;
let numbers: number[] = [1, 2, 3];
let tuple: [string, number] = ['Alice', 25];
```

**Interfaces:**
```typescript
interface User {
  name: string;
  age: number;
  email?: string; // Optional
  readonly id: number; // Read-only
}

const user: User = {
  id: 1,
  name: 'Alice',
  age: 25
};
```

**Generics:**
```typescript
function identity<T>(arg: T): T {
  return arg;
}

const result = identity<string>('hello');

// Generic interface
interface Box<T> {
  value: T;
}

const box: Box<number> = { value: 123 };
```

**Utility Types:**
```typescript
interface User {
  name: string;
  age: number;
  email: string;
}

// Partial - all properties optional
type PartialUser = Partial<User>;

// Omit - exclude properties
type UserWithoutEmail = Omit<User, 'email'>;

// Pick - select properties
type UserNameAge = Pick<User, 'name' | 'age'>;

// ReturnType - extract return type
function getUser() {
  return { name: 'Alice', age: 25 };
}
type UserType = ReturnType<typeof getUser>;
```

### L2 - Advanced TypeScript

**Infer:**
```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function getUser() {
  return { name: 'Alice' };
}

type User = ReturnType<typeof getUser>; // { name: string }
```

**Decorators:**
```typescript
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function(...args: any[]) {
    console.log(`Calling ${key} with`, args);
    return original.apply(this, args);
  };
}

class Calculator {
  @log
  add(a: number, b: number) {
    return a + b;
  }
}
```

**tsconfig.json:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

### L4 - Advanced OOP in TypeScript

**Inheritance:**
```typescript
class Animal {
  constructor(public name: string) {}
  
  move() {
    console.log(`${this.name} is moving`);
  }
}

class Dog extends Animal {
  bark() {
    console.log('Woof!');
  }
}
```

**Abstract Classes:**
```typescript
abstract class Shape {
  abstract area(): number;
  
  describe() {
    console.log(`Area: ${this.area()}`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  
  area() {
    return Math.PI * this.radius ** 2;
  }
}
```

**Generic Classes:**
```typescript
class Box<T> {
  private value: T;
  
  constructor(value: T) {
    this.value = value;
  }
  
  getValue(): T {
    return this.value;
  }
}

const numberBox = new Box<number>(123);
const stringBox = new Box<string>('hello');
```

**Access Modifiers:**
```typescript
class BankAccount {
  public accountNumber: string;
  private balance: number;
  protected owner: string;
  
  constructor(accountNumber: string, owner: string) {
    this.accountNumber = accountNumber;
    this.balance = 0;
    this.owner = owner;
  }
  
  private calculateInterest() {
    return this.balance * 0.05;
  }
}
```

### Advanced Types

**Type Guards:**
```typescript
function isString(value: any): value is string {
  return typeof value === 'string';
}

function process(value: string | number) {
  if (isString(value)) {
    console.log(value.toUpperCase()); // TypeScript knows it's string
  }
}
```

**Conditional Types:**
```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false
```

**Mapped Types:**
```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface User {
  name: string;
  age: number;
}

type ReadonlyUser = Readonly<User>;
```


## Web Security

### L2 - Common Security Threats

**CORS (Cross-Origin Resource Sharing):**
```javascript
// Server-side (Express)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://example.com');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

// Client-side
fetch('https://api.example.com/data', {
  method: 'POST',
  credentials: 'include', // Send cookies
  headers: {
    'Content-Type': 'application/json'
  }
});
```

**XSS (Cross-Site Scripting):**
```javascript
// Vulnerable code
element.innerHTML = userInput; // DON'T DO THIS!

// Safe approach
element.textContent = userInput; // Escapes HTML

// Or sanitize
import DOMPurify from 'dompurify';
element.innerHTML = DOMPurify.sanitize(userInput);
```

**XSRF/CSRF (Cross-Site Request Forgery):**
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

**Protection Strategies:**
```javascript
// 1. Input validation
function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

// 2. Output encoding
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// 3. Use Content Security Policy
// <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

### L3 - Advanced Security

**SQL Injection Prevention:**
```javascript
// Vulnerable (DON'T)
const query = `SELECT * FROM users WHERE id = ${userId}`;

// Safe - use parameterized queries
const query = 'SELECT * FROM users WHERE id = ?';
db.query(query, [userId]);
```

**Authentication (JWT, OAuth):**
```javascript
// JWT
const jwt = require('jsonwebtoken');

// Create token
const token = jwt.sign(
  { userId: 123 },
  process.env.JWT_SECRET,
  { expiresIn: '1h' }
);

// Verify token
jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) return res.status(401).json({ error: 'Invalid token' });
  req.userId = decoded.userId;
  next();
});

// OAuth flow (simplified)
// 1. Redirect to provider
// 2. User authorizes
// 3. Provider redirects back with code
// 4. Exchange code for access token
```

### L4 - Content Security Policy

**CSP Headers:**
```javascript
// Express middleware
app.use((req, res, next) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://trusted.com; style-src 'self' 'unsafe-inline'"
  );
  next();
});

// HTML meta tag
// <meta http-equiv="Content-Security-Policy" content="default-src 'self'">
```

This comprehensive guide covers all the topics from your interview feedback with detailed explanations and practical examples!

