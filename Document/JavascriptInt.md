JavaScript objects, covering creation, management of properties, built-in methods, hash data structures, and property descriptors:

# JavaScript Objects

JavaScript objects are versatile and essential data structures in JavaScript. They allow you to store and manage collections of data and functions. This document covers various aspects of objects including their creation, property management, built-in methods, hash data structures, and property descriptors.

## 1. Creating Objects

JavaScript provides several ways to create objects:

### Object Literals

The most common and straightforward way to create an object is using an object literal:
```javascript
const person = {
  name: 'John',
  age: 30
};
```

### Using the `Object` Constructor

You can also create objects using the `Object` constructor:
```javascript
const person = new Object();
person.name = 'John';
person.age = 30;
```

### Using `Object.create()`

Create a new object with a specified prototype object:
```javascript
const proto = { greet() { console.log('Hello'); } };
const person = Object.create(proto);
person.name = 'John';
```

### Using Constructor Functions

Constructor functions are used to create objects with the same properties and methods:
```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person = new Person('John', 30);
```

### Using ES6 Classes

ES6 classes provide a more syntactically clean way to create objects:
```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const person = new Person('John', 30);
```

## 2. Managing Properties

### Adding Properties

Add properties to an object using dot notation or bracket notation:
```javascript
const person = {};
person.name = 'John';
person['age'] = 30;
```

### Deleting Properties

Remove properties from an object using the `delete` operator:
```javascript
delete person.age;
```

### Modifying Properties

Change the value of an existing property:
```javascript
person.name = 'Jane';
```

### Checking for Properties

Determine if an object has a specific property:
```javascript
console.log('name' in person); // true
```

## 3. Built-in Methods

JavaScript provides several built-in methods for working with objects:

### `Object.keys()`

Returns an array of an object's own enumerable property names:
```javascript
const person = { name: 'John', age: 30 };
console.log(Object.keys(person)); // ['name', 'age']
```

### `Object.values()`

Returns an array of an object's own enumerable property values:
```javascript
console.log(Object.values(person)); // ['John', 30]
```

### `Object.entries()`

Returns an array of an object's own enumerable string-keyed property [key, value] pairs:
```javascript
console.log(Object.entries(person)); // [['name', 'John'], ['age', 30]]
```

### `Object.assign()`

Copies all enumerable own properties from one or more source objects to a target object:
```javascript
const target = { name: 'John' };
const source = { age: 30 };
Object.assign(target, source);
console.log(target); // { name: 'John', age: 30 }
```

### `Object.freeze()`

Freezes an object, making it completely immutable. Prevents new properties from being added, existing properties from being removed, and existing properties from being modified:
```javascript
const person = { name: 'John', age: 30 };
Object.freeze(person);
person.age = 40; // No effect - cannot modify
person.city = 'NYC'; // No effect - cannot add
delete person.age; // No effect - cannot delete
console.log(person); // { name: 'John', age: 30 }
```

### `Object.seal()`

Seals an object, preventing new properties from being added and existing properties from being deleted. However, **existing property values can still be modified**:
```javascript
const person = { name: 'John', age: 30 };
Object.seal(person);
person.age = 40; // ✓ Works - can modify existing properties
person.city = 'NYC'; // No effect - cannot add new properties
delete person.age; // No effect - cannot delete properties
console.log(person); // { name: 'John', age: 40 }
```

**Key Difference:** `Object.seal()` allows modification of existing properties, while `Object.freeze()` does not allow any modifications at all.

### `Object.preventExtensions()`

Prevents new properties from being added to an object:
```javascript
const person = { name: 'John' };
Object.preventExtensions(person);
person.age = 30; // No effect
```

## 4. Property Descriptors

Property descriptors provide detailed control over object properties. They can be either data descriptors or accessor descriptors.

### Data Descriptors

Data descriptors include `value`, `writable`, `enumerable`, and `configurable`:
```javascript
const obj = {};
Object.defineProperty(obj, 'name', {
  value: 'John',
  writable: true,
  enumerable: true,
  configurable: true
});
```

## 5. Hash Data Structure

JavaScript objects can function as hash maps or dictionaries where keys are strings or symbols and values can be any type.

### Using Objects as Hash Maps

Objects are often used to store key-value pairs:
```javascript
const hashMap = {};
hashMap['key1'] = 'value1';
hashMap['key2'] = 'value2';
```

### Using `Map` Object

The `Map` object is a more robust data structure for key-value pairs:
```javascript
const map = new Map();
map.set('key1', 'value1');
map.set('key2', 'value2');
console.log(map.get('key1')); // 'value1'
```

## Summary

JavaScript objects are a fundamental part of the language, offering powerful features for creating and managing data. Understanding the different methods for creating objects, managing properties, and using built-in methods and descriptors allows you to write more efficient and effective code. The ability to use objects as hash maps and control property behavior with descriptors enhances your capability to handle various programming scenarios.
```