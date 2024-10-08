### JavaScript Interview Questions

### 1. Understanding of JS working Engine :

![Alt text](./images/image.png)
![Alt text](./images/image-1.png)

Execution context and callstack
-  When the JavaScript engine scans a script file, it makes an environment called the Execution Context that handles the entire transformation and execution of the code.

- During the context runtime, the parser parses the source code and allocates memory for the variables and functions. The source code is generated and gets executed.
	
- To keep the track of all the contexts, including global and functional, the JavaScript engine uses a call stack. 
- A call stack is also known as an 'Execution Context Stack', 'Runtime Stack', or 'Machine Stack'.
		It uses the LIFO principle (Last-In-First-Out). 
- When the engine first starts executing the script, it creates a global context and pushes it on the stack.


### 2. Let/Const/var
![Alt text](./images/image-2.png)

### 3.  Temporal dead zone (TDZ) :
		 The area of a block where a variable is inaccessible until the moment the computer completely initializes it with a value.
		 It is a behavior in JavaScript that occurs with the use of let and const variables and their declarations. The Temporal Dead Zone is the period of time during which the variable is unusable because it has been declared but not yet initialized.
```jsx
		 console.log(x); // ReferenceError: Cannot access 'x' before initialization
			let x = 5;
 ```
		
### 4. Hoisting :
	 Hositing is a mechanism by which function or variable declartions are moved to the top of their respective scopes before code gets executed. Moved to the top does not mean javascript rearranges the sequence , it means it gives higher precedence to the declarations.

### 5.  Illegal Shadowing:
	Shadowing the variables declared with let and var in same scope is illegal. Technically both the variables have same scope so it is not correct as I mentioned that in let declaration shadowing them in same scope is illegal.
	
### 6. Scope Chaining : 
		Whenever variable is used , js intepreter traverses the scope chain until and unless it finds the variable.
		Sequence : Immediate scope then global scope.
	
### 7. Mutable/Immutable data types
- Mutable data types are reference data types. As they can have same reference if we try to modify it.
- Immutable data types are primitive data types as primitive data type will create new memory allocation every time.
	
	
### 8. Shallow and Deep copy :

	• Shallow Copy
		Copies the object and all its properties, but any nested objects or arrays will still reference the same memory location as the original object. It means that if you make changes to the nested object, it will also affect the original object, as well as the copied object.
		
			const originalObject = { a: 1, b: { c: 2 } };  
			const shallowCopy = { ...originalObject };  
			
			shallowCopy.a = 3; // Changes shallowCopy, but not originalObject  
			shallowCopy.b.c = 4; // Changes both shallowCopy and originalObject  
			
	• Deep Copy
				1. const originalObject = { a: 1, b: { c: 2 } };  
				2. const deepCopy = JSON.parse(JSON.stringify(originalObject));  
				
		
### 9. Virtual dom , shadow dom


- Dom :
	A Document Object Model represents a webpage structure in the form of a tree. It acts as an API to the web document, allowing programmatic interaction. This method enables programs to change the document style, structure, and content.
	
	- Virtual Dom : Used for solving performance issues.
		a. Virtual DOM is the virtual representation of Real DOM
		b. React update the state changes in Virtual DOM first and then it syncs with Real DOM
		c. Virtual DOM is just like a blueprint of a machine, can do changes in the blueprint but those changes will not directly apply to the machine.
		d. Virtual DOM is a programming concept where a virtual representation of a UI is kept in memory synced with “Real DOM ” by a library such as ReactDOM and this process is called reconciliation.
		
	- Shadow Dom :  Used for encapsulating and isolating elements.
	A shadow DOM is mainly used to create component-based websites and applications. 
	It does not represent the entire Document Object Model. Instead, it acts as a subtree or a separate DOM for a specific element.
		a. Focuses on encapsulating the style and behavior of web components, providing a scoped environment for CSS and JavaScript.
		b. Attachshadow method is used for encapsulating content in shadow dom.


### 10. Closure
		Closure in JavaScript is a form of lexical scoping used to preserve variables from the outer scope of a function in the inner scope of a function.
		A closure is a way for a piece of code to gave access to variables from an outer scope even after the execution of  outer scope is finished.
		
### 11. Currying

		currying is a technique in JavaScript that allows you to transform functions with multiple arguments into a sequence of functions, each taking one argument at a time. 
		  /*Function currying*/
```javascript
		    function addingValue(firstVal) {
		        return function (secondVal) {
		            return firstVal + secondVal        
			}
		    }
		    let addBytWo = addingValue(2);
		    let addbyThree = addingValue(3);
		    console.log(addBytWo(10, 2), addbyThree(12))
```

### 12. JavaScript BOM
Browser Objects
1) Window Object
2) History Object
3) Navigator Object
4) Screen Object

### 13. Higher order functions
```javascript
		const higherorderFunction = (fnCall , numb) => {
	        return fnCall(numb)
	    }
	    const addBy2 = (num) => {
	        return num + 2
	    }
	    const result = higherorderFunction(addBy2 , 5)
	    console.log(result)
```

### 14. Call, apply and bind

	Call is a function that helps you change the context of the invoking function. it helps you replace the value of this inside a function with whatever value you want.
	Apply is very similar to the call function. The only difference is that in apply you can pass an array as an argument list.
	Bind is a function that helps you create another function that you can execute later with the new context of this is provided
	
	func.call(thisObj,args1,args2,...)
	func.apply(thisObj,newArray(args1,args2));
	func.bind(thisObj,arg1,arg2,...,argN);


### 15. This Keyword :  
	 'this' is a special keyword that refers to the context in which a function is called. In the case of event handlers, 'this' usually refers to the HTML element that the event handler is attached to. This allows you to directly access and manipulate the element from within the event handler function
	
### 16. Debouncing / Throttling
	Throttling 	
- Throttling limits the number of times the function can be called over a certain period.
	- Ensures that the function is called at a regular interval, even if the event is triggered multiple times.
	- Useful when you want to list the Frequency of function calls.
	- Eg. You can throttle a slide change Function that is called every time the user clicks a button in a carousel.
	
	Debouncing	
	- Debouncing waits for a certain time before invoking the function again.	
	- Ensures that the function is called only once, even if the event is triggered multiple times.
	- Useful when you want to delay the invocation of a function until a certain period of inactivity has passed.	
	- Eg. You can debounce an async API request function that is called every time the user types in an input field.	


### 17. Promise :
- The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
	- Promise.all -> Whenever all promises are fullfilled it will be aggregating the results of multiple promises.
	- Promise.race -> it will return first promise which is resolved.
	- Promise.Allsettled => it will give status and value if promise is fullfilled or status and reason if it's rejected


### 18. Array and Object Methods :

<details>
	
- The at() method of Array instances takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.
	- The concat() method of Array instances is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
	- The copyWithin() method of Array instances shallow copies part of this array to another location in the same array and returns this array without modifying its length.
	- The every() method of Array instances tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
	- The fill() method of Array instances changes all elements within a range of indices in an array to a static value. It returns the modified array.
	- The filter() method of Array instances creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.
	- The find() method of Array instances returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
	- The findIndex() method of Array instances returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned
	- The findLast() method of Array instances iterates the array in reverse order and returns the value of the first element that satisfies the provided testing function. If no elements satisfy the testing function, undefined is returned.
	- The findLastIndex() method of Array instances iterates the array in reverse order and returns the index of the first element that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.
	- The flat() method of Array instances creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
	- The forEach() method of Array instances executes a provided function once for each array element.
	- The Array.from() static method creates a new, shallow-copied Array instance from an iterable or array-like object.
	- The includes() method of Array instances determines whether an array includes a certain value among its entries, returning true or false as appropriate.
	- The Array.isArray() static method determines whether the passed value is an Array.
	- The join() method of Array instances creates and returns a new string by concatenating all of the elements in this array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
	- The keys() method of Array instances returns a new array iterator object that contains the keys for each index in the array.
	- The lastIndexOf() method of Array instances returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
	- The map() method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.
	- The pop() method of Array instances removes the last element from an array and returns that element. This method changes the length of the array.
	- The push() method of Array instances adds the specified elements to the end of an array and returns the new length of the array.
	- The reverse() method of Array instances reverses an array in place and returns the reference to the same array, the first array element now becoming the last, and the last array element becoming the first. In other words, elements order in the array will be turned towards the direction opposite to that previously stated.
	- To reverse the elements in an array without mutating the original array, use toReversed()
	- The splice() method of Array instances changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
	- splice(start,deleteCount,item1,item2)
	- The slice() method of Array instances returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.
	const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

	console.log(animals.slice(2));
	// Expected output: Array ["camel", "duck", "elephant"]

	console.log(animals.slice(2, 4));
</details>

### 19. Functions

- Function declaration : To declare a function, you use the function keyword and specify a name for the function. 
- Function Expression : 
	- A function expression is very similar to, and has almost the same syntax as, a function declaration. The main difference between a function expression and a function declaration is the function name, which can be omitted in function expressions to create anonymous functions.
	- Function expressions in JavaScript are not hoisted.
- Functional Programming : 
	Functional programming is a declarative programming paradigm style where one applies pure functions in sequence to solve complex problems.
- Arrow Functions : An arrow function expression is a compact alternative to a traditional function expression, with some semantic differences and deliberate limitations in usage.
- IIFE : Immediately invoked function expression 
  ```jsx
   (function () {
  console.log("Code runs!");})();
  ```


### 20. ES6

- [Es6](https://www.javascripttutorial.net/es6/)


### 21. Critical Rendering Path

- The Critical Rendering Path refers to the sequence of steps that a web browser takes to convert HTML, CSS, and JavaScript code into a visual representation on a user's screen. 
- It involves a series of processes, such as constructing the Document Object Model (DOM), generating the CSS Object Model (CSSOM), and combining both to create the Render Tree. The Render Tree is then used to calculate the layout and paint the pixels on the user's screen. 
![Alt text](./images/image-3.png)


### 22. Callbacks & Callback Hell

- A callback : is a function that is passed as an argument to another function that executes the callback based on the result. They are basically functions that are executed only after a result is produced
- Callback Hell : Callback Hell is essentially nested callbacks stacked below one another forming a pyramid structure. Every callback depends/waits for the previous callback, thereby making a pyramid structure that affects the readability and maintainability of the code. 

### 23. Event Propagation
1. Bubbling : 
- Bubbling means that the event propagates from the target element (i.e. the button the user clicked) up through its ancestor tree, starting from the nearest one. By default, all events bubble.
- use event.stopPropagation to handle bubbling events.
- Due to event bubbling, event triggered on the child elements will bubble up to the parent element.
2. Capturing : Capturing is the exact opposite of bubbling, meaning that the outer event handlers are fired before the most specific handler (i.e. the one on the button). Note that all capturing event handlers are run first, then all the bubbling event handlers.
3. Event Delegation : Event delegation refers to the idea of delegating event listening to parent elements instead of adding event listeners directly to the event targets. Using this technique, the parent can catch and handle the bubbling events as necessary.
 ![Alt text](./images/eventBubble.png)

 ### 24. Function Basics

 - Function statement/Function declaration : Hoisting takes place
	```javascript 
	function a(){
		console.log("acheck");
		a()
	}
	```

- Function expression : Hoisting does not work
	```javascript 
	const b = function(){
		console.log("bcheck");
	}
	b()
	```
- Anonymous function : when functiona used as values (assign it to variable)
	```javascript 
	function(){
			console.log("bcheck");
		}
	```
- Named function Expression: 
	```javascript 
	const a = function b(){
		console.log(b); //can access here
	}
	b() //Cannot access function in outside scope
	
	```
- First class functions :
	In JavaScript, functions are first-class citizens or first-class objects. This means that functions in JavaScript can be treated like any other variable or object, and can be:

	  -	Assigned to variables
	  -	Passed as arguments to other functions
	  -	Returned from other functions
	  -	Stored in data structures like arrays and objects

### 25. Prototype and Prototype chaining
 - Prototype : Prototype is nothing but an object which consists of built-in properties and methods. Whenever we create object/ function/ methods/ array , these all are attached to some hidden properties, which we call prototype.

'Almost everything in javascript is a object'
Why is that?

Try accessing an Array.__proto__ : It points to Object prototype , Try Array.__proto__.__proto__ : Refers to null.

 - Prototype Chaining: prototype object has a prototype of its own, and so on until an object is reached with null as its prototype,  this is called prototype chaining


### Deep Clone

 - JSON.parse(JSON.stringify(val)) : Does not handle functions, undefined, Date, RegExp, Map, Set, Infinity, or circular references.
 - structuredClone(val) : Handles Date, RegExp, Map, Set, and circular references. Does not handle functions.


 ### SOLID Principles

 1. Single Responsibility Principle (SRP)
Definition: A class should have only one reason to change, meaning it should have only one responsibility or job.

Explanation: Each class or module should only handle one aspect of the functionality. This makes the class easier to understand and modify because changes to one responsibility do not affect other parts of the system.

2. Open/Closed Principle (OCP)
Definition: Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.

Explanation: You should be able to add new functionality to a module or class without changing its existing code. This is typically achieved using abstract classes or interfaces.

3. Liskov Substitution Principle (LSP)
Definition: Objects of a superclass should be replaceable with objects of a subclass without affecting the correctness of the program.

Explanation: Subclasses should extend the base class without changing its behavior. This means that a subclass should be able to replace its superclass without altering the desirable properties of the program (e.g., correctness, task performed).

4. Interface Segregation Principle (ISP)
Definition: Clients should not be forced to depend on interfaces they do not use.

Explanation: Create smaller, more specific interfaces rather than a large, general-purpose interface. This prevents clients from being burdened with methods they don’t need.

5. Dependency Inversion Principle (DIP)c
Definition: High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details. Details should depend on abstractions.

Explanation: High-level components should be designed to depend on abstractions (interfaces) rather than concrete implementations. This promotes flexibility and allows the high-level module to work with any implementation of the abstraction.