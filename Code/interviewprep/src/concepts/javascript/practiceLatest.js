//   Example 1:

import { memo } from "react"

// Input: s = "anagram", t = "nagaram"
// Output: true
// Example 2:

// Input: s = "rat", t = "car"
// Output: false

const checkAnagram = (a, b) => {
    let string1 = a.split("").sort().join("")
    let string2 = b.split("").sort().join("")
    return string1 === string2
}

console.log(checkAnagram("anagram" ,"nagaram"))

function bubbleSort(arr) {
    let swapped = false;
    do{
        swapped = false;
        for(let i=0; i< arr.length - 1; i++){
            if(arr[i] > arr[i + 1]){
                [arr[i] , arr[i +1]] = [arr[i + 1], arr[i]]; // Swap elements
                swapped = true; // Set swapped to true if a swap occurred
            }
        }
    }while(swapped)
    return arr;
  }
  console.log("c");
  // Example usage
  let array = [64, 34, 25, 12, 22, 11, 90];
  console.log("Unsorted array:", array);
  let sortedArray = bubbleSort(array);
  console.log("Sorted array:", sortedArray);


const multiply = (a) => {
    console.log(a , " checking a")
    let cache ={}
    return function(b){
        if(!cache[a*b]){
            cache[a*b] = a * b
    }}
}

console.log(multiply(2)(5)); // Computing and caching result for (2, 5) = 10 \n 10
console.log(multiply(2)(5)); // Fetching from cache for (2, 5) \n 10
console.log(multiply(3)(7)); // Computing and caching result for (3, 7) = 21 \n 21
console.log(multiply(3)(7)); // Fetching from cache for (3, 7) \n 21

// Write a function memoize:
// 1. Memoizes async or sync function's results based
// 2. Supports setting a time-to-live (TTL) in milliseconds
// 3. Automatically clears expired cache entries on access
// Works with functions having multiple arguments.
// 5. Returns a memoized version of the original function.

const addition = (a, b) => {
    return a + b;
  };
  
  const fetchrecords = async (a, b) => {
    const result = await Promise.resolve(a + b);
    return result;
  };
  
  function memoize(fun, ttl) {
    const cache = {};
    console.log(cache, 'checking cached result');
    return function (...args) {
      const key = JSON.stringify(args);
      const now = Date.now();
      console.log(now, 'checjunsg');
      if (cache[key]) {
        let { value, expiredAt } = cache[key];
        if (!expiredAt || now < expiredAt) {
          return cache[key]?.value;
        } else {
          delete cache[key];
        }
      }
      let result = { value: fun(...args), expiredAt: ttl ? now + ttl : null };
      if (result.value instanceof Promise) {
        result.value = result.value.then((val) => {
          cache[key] = {
            value: Promise.resolve(val),
            expiredAt: ttl ? Date.now() + ttl : null,
          };
          return val;
        });
      }
      cache[key] = result;
      return result.value;
    };
  }
  const memoizedAdd = memoize(addition, 5000);
  const memoizedFetchRecords = memoize(fetchrecords, 5000);
  
  console.log(memoizedAdd(1, 2));
  console.log(memoizedAdd(1, 2));
  console.log(memoizedAdd(1, 2));
  memoizedFetchRecords(1, 9).then((val) => console.log(val));
  memoizedFetchRecords(1, 9).then((val) => console.log(val));
  
  