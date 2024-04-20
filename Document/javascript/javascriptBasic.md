## JavaScript Interview Questions

1. Understanding of JS working Engine :

	Execution context and callstack
		○ When the JavaScript engine scans a script file, it makes an environment called the Execution Context that handles the entire transformation and execution of the code.

	During the context runtime, the parser parses the source code and allocates memory for the variables and functions. The source code is generated and gets executed.
	
	
		○ To keep the track of all the contexts, including global and functional, the JavaScript engine uses a call stack. A call stack is also known as an 'Execution Context Stack', 'Runtime Stack', or 'Machine Stack'.
		It uses the LIFO principle (Last-In-First-Out). When the engine first starts executing the script, it creates a global context and pushes it on the stack.
	

	2. Let/Const/var
	KEYWORD	SCOPE	REDECLARATION & 	HOISTING
			REASSIGNMENT
	var	Global, Local	yes & yes	yes, with default value
	let	Global, Local, Block	no & yes	yes, without default value
	const	Global, Local, Block	no & no	yes, without default value

  
	5.  Temporal dead zone (TDZ) :
		 The area of a block where a variable is inaccessible until the moment the computer completely initializes it with a value.
		
	6. Hoisting :
		 Hositing is a mechanism by which function or variable declartions are moved to the top of their respective scopes before code gets executed. Moved to the top does not mean javascript rearranges the sequence , it means it gives higher precedence to the declarations.

	7.  
	Illegal Shadowing:
	Shadowing the variables declared with let and var in same scope is illegal. Technically both the variables have same scope so it is not correct as I mentioned that in let declaration shadowing them in same scope is illegal.
	
	8. Scope Chaining : 
		Whenever variable is used , js intepreter traverses the scope chain until and unless it finds the variable.
		Sequence : Immediate scope then global scope.
	
	Mutable/Immutable data types
		Mutable data types are reference data types. As they can have same reference if we try to modify it.
		Immutable data types are primitive data types as primitive data type will create new memory allocation every time.
	
	
   9. Shallow and Deep copy :
	• Shallow Copy
		A shallowt copies the object and all its properties, but any nested objects or arrays will still reference the same memory location as the original object. It means that if you make changes to the nested object, it will also affect the original object, as well as the copied object.
		
			const originalObject = { a: 1, b: { c: 2 } };  
			const shallowCopy = { ...originalObject };  
			
			shallowCopy.a = 3; // Changes shallowCopy, but not originalObject  
			shallowCopy.b.c = 4; // Changes both shallowCopy and originalObject  
			
	• Deep Copy
				1. const originalObject = { a: 1, b: { c: 2 } };  
				2. const deepCopy = JSON.parse(JSON.stringify(originalObject));  
				
		
  10. Virtual dom , shadow dom
	• Dom :
	A Document Object Model represents a webpage structure in the form of a tree. It acts as an API to the web document, allowing programmatic interaction. This method enables programs to change the document style, structure, and content.
	
	• Virtual Dom : Used for solving performance issues.
		a. Virtual DOM is the virtual representation of Real DOM
		b. React update the state changes in Virtual DOM first and then it syncs with Real DOM
		c. Virtual DOM is just like a blueprint of a machine, can do changes in the blueprint but those changes will not directly apply to the machine.
		d. Virtual DOM is a programming concept where a virtual representation of a UI is kept in memory synced with “Real DOM ” by a library such as ReactDOM and this process is called reconciliation.
		
	• Shadow Dom :  Used for encapsulating and isolating elements.
	A shadow DOM is mainly used to create component-based websites and applications. 
	It does not represent the entire Document Object Model. Instead, it acts as a subtree or a separate DOM for a specific element.
		a. Focuses on encapsulating the style and behavior of web components, providing a scoped environment for CSS and JavaScript.
		b. Attachshadow method is used for encapsulating content in shadow dom.
	
	11. Closure
		Closure in JavaScript is a form of lexical scoping used to preserve variables from the outer scope of a function in the inner scope of a function.
	12. Currying
		currying is a technique in JavaScript that allows you to transform functions with multiple arguments into a sequence of functions, each taking one argument at a time. 
		  /*Function currying*/
		    function addingValue(firstVal) {
		        return function (secondVal) {
		            return firstVal + secondVal        
			}
		    }
		    let addBytWo = addingValue(2);
		    let addbyThree = addingValue(3);
		    console.log(addBytWo(10, 2), addbyThree(12))
		
	13. HOC :
	Higher-order components or HOC is the advanced method of reusing the component functionality logic. It simply takes the original component and returns the enhanced component.
	Const App = (props) => {
	Return (<>{props.name}</>)
	export default EnhancedComponent(App);
	
	const EnhancedComponent = (OriginalComponent) => { 
	    class NewComponent extends React.Component { 
	  
	        // Logic here 
	  
	        render() { 
	            // Pass the callable props to Original component 
	            return <OriginalComponent name="GeeksforGeeks"  />  
	        } 
	    } 
	    // Returns the new component 
	    return NewComponent 
	} 
	  
	export default EnhancedComponent;
	
	14. Higher order functions
		const higherorderFunction = (fnCall , numb) => {
	        return fnCall(numb)
	    }
	    const addBy2 = (num) => {
	        return num + 2
	    }
	    const result = higherorderFunction(addBy2 , 5)
	    console.log(result)
	
	15. Call, apply and bind
	Call is a function that helps you change the context of the invoking function. it helps you replace the value of this inside a function with whatever value you want.
	Apply is very similar to the call function. The only difference is that in apply you can pass an array as an argument list.
	Bind is a function that helps you create another function that you can execute later with the new context of this is provided
	
	func.call(thisObj,args1,args2,...)
	func.apply(thisObj,newArray(args1,args2));
	func.bind(thisObj,arg1,arg2,...,argN);
	
	16. This Keyword :  
	 'this' is a special keyword that refers to the context in which a function is called. In the case of event handlers, 'this' usually refers to the HTML element that the event handler is attached to. This allows you to directly access and manipulate the element from within the event handler function
	
	17. Debouncing / Throttling
	Debouncing	Throttling 
	Debouncing waits for a certain time before invoking the function again.	Throttling limits the number of times the function can be called over a certain period.
	Ensures that the function is called only once, even if the event is triggered multiple times.	Ensures that the function is called at a regular interval, even if the event is triggered multiple times.
	Useful when you want to delay the invocation of a function until a certain period of inactivity has passed.	Useful when you want to list the Frequency of function calls.
	Eg. You can debounce an async API request function that is called every time the user types in an input field.	Eg. You can throttle a slide change Function that is called every time the user clicks a button in a carousel.
	
	18. Promise :
		The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
		Promise.all -> Whenever all promises are fullfilled it will be aggregating the results of multiple promises.
		Promise.race -> it will return first promise which is resolved.
		Promise.Allsettled => it will give status and value if promise is fullfilled or status and reason if it's rejected

    3. Array and Object Methods :

	• The at() method of Array instances takes an integer value and returns the item at that index, allowing for positive and negative integers. Negative integers count back from the last item in the array.
	• The concat() method of Array instances is used to merge two or more arrays. This method does not change the existing arrays, but instead returns a new array.
	• The copyWithin() method of Array instances shallow copies part of this array to another location in the same array and returns this array without modifying its length.
	• The every() method of Array instances tests whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value.
	• The fill() method of Array instances changes all elements within a range of indices in an array to a static value. It returns the modified array.
	• The filter() method of Array instances creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function.
	• The find() method of Array instances returns the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned.
	• The findIndex() method of Array instances returns the index of the first element in an array that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned
	• The findLast() method of Array instances iterates the array in reverse order and returns the value of the first element that satisfies the provided testing function. If no elements satisfy the testing function, undefined is returned.
	• The findLastIndex() method of Array instances iterates the array in reverse order and returns the index of the first element that satisfies the provided testing function. If no elements satisfy the testing function, -1 is returned.
	• The flat() method of Array instances creates a new array with all sub-array elements concatenated into it recursively up to the specified depth.
	• The forEach() method of Array instances executes a provided function once for each array element.
	• The Array.from() static method creates a new, shallow-copied Array instance from an iterable or array-like object.
	• The includes() method of Array instances determines whether an array includes a certain value among its entries, returning true or false as appropriate.
	• The Array.isArray() static method determines whether the passed value is an Array.
	• The join() method of Array instances creates and returns a new string by concatenating all of the elements in this array, separated by commas or a specified separator string. If the array has only one item, then that item will be returned without using the separator.
	• The keys() method of Array instances returns a new array iterator object that contains the keys for each index in the array.
	• The lastIndexOf() method of Array instances returns the last index at which a given element can be found in the array, or -1 if it is not present. The array is searched backwards, starting at fromIndex.
	• The map() method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.
	• The pop() method of Array instances removes the last element from an array and returns that element. This method changes the length of the array.
	• The push() method of Array instances adds the specified elements to the end of an array and returns the new length of the array.
	• The reverse() method of Array instances reverses an array in place and returns the reference to the same array, the first array element now becoming the last, and the last array element becoming the first. In other words, elements order in the array will be turned towards the direction opposite to that previously stated.
	• To reverse the elements in an array without mutating the original array, use toReversed()
	• The splice() method of Array instances changes the contents of an array by removing or replacing existing elements and/or adding new elements in place.
	• splice(start,deleteCount,item1,item2)
	• The slice() method of Array instances returns a shallow copy of a portion of an array into a new array object selected from start to end (end not included) where start and end represent the index of items in that array. The original array will not be modified.
	const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

	console.log(animals.slice(2));
	// Expected output: Array ["camel", "duck", "elephant"]

	console.log(animals.slice(2, 4));
	