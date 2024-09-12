## Implement a function called chunkArray that takes an array and a chunk size as arguments. The function should split the array into smaller arrays of the specified size, with any remaining elements placed in a final chunk. Use modern JavaScript features where appropriate. Also, explain the time and space complexity of your solution.

// Example usage:
console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3));
// Output: [[1, 2, 3], [4, 5, 6], [7, 8]]

```javascript 
const chunkArray = (array1, chunk) => {
let result = []
let i = 0
  while(i < array1.length){
	result.push(array1.slice(i , i + chunk))
  i += chunk
  }
	return result
}
```

## QWrite a function called flattenDeep that takes a nested array of arbitrary depth and returns a new flat array with all elements. Your solution should work for any level of nesting. Use a recursive approach and explain how it works.

```javascript 
// Example usage:
const nestedArray = [1, [2, [3, [4]], 5]];
console.log(flattenDeep(nestedArray));
// Output: [1, 2, 3, 4, 5]

const flattenDeep = (nestedArr) => {
	let result = []
	for(let i = 0 ; i < nestedArr.length; i++){
  	if(Array.isArray(nestedArr[i])){
		result.push(...flattenDeep(nestedArr[i]))
    }
    else{
    	result.push(nestedArr[i])
    }
  }
  return result
}
```


```javascript 
let x  = 1;
let y = (x++ , x)
console.log(y , x)
let z = (2,3,4)
console.log(z , 'op')

let a = null
let b;
let c = 0
let d = ""

console.log(a == b) true
console.log(b == c) false
console.log(c == d) true
console.log(a == d) false

```



```javascript
const asyncAdd = (arrayOfPromise) => {
  let result = 0
  let count = 0
  console.log(result , 'result vvvvvvvvvvvvvv')
  return new Promise((resolve, reject) => {
      arrayOfPromise.map(promise => {
          promise.then(val => {
              result = result + val
              count = count + 1
              console.log(val , 'val' , result , count , arrayOfPromise.length)
              if(arrayOfPromise.length === count){
                console.log('resolve')
                  resolve(result)
              }
          }).catch(err => {
               resolve(result)
          })
      })
  })
}

asyncAdd([Promise.resolve(1), Promise.resolve(2), Promise.resolve(3)]).then(
(x) => {
  console.log(x , 'gggggggggggggg'); // 6
}
);

asyncAdd([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(
(x) => {
  console.log(x , 'checking'); // 4
}
);
```