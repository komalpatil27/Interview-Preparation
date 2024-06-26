import React from "react";

const ArrayMethods = () => {

    // 1. Array.prototype.at()
    //    at method takes an integer value and returns an item of that index.
    // Syntax : at(index)
    const numberArray = [1, 2, 3, 4, 5, 6]
    console.log(numberArray.at(4), 'will print element at index 4')

    // 2. Array.prototype.copywithin()
    //    The copyWithin() method copies array elements to another position in an array.
    //    returns modified array with same length
    // Syntax : copyWithin(target, start, end)
    // Return Value : modified Array
    let stringArray = ['apple', 'mango', 'cherry', 'banana', 'watermelon']
    console.log(stringArray.copyWithin(2, 4), 'will replace 2nd position element with 4th ')
    console.log(stringArray, 'stringArray got modified first time')
    console.log(stringArray.copyWithin(0, 1, 3), 'will replace 0th position element with 1st and so on before 3rd index')
    console.log(stringArray, 'stringArray got modified second time, as it modifies array')

    
    //3.  Array.prototype.entries()
    // The entries() method of Array instances returns a new array iterator object that contains the key/value pairs for each index in the array.
    // Syntax : entries()
    // Return Value : A new iterable iterator object.
    let res = Array.from(stringArray.entries()).map(([key , value]) => ([key , value]))
    console.log(res , 'for of')
    for (const element of stringArray.entries()) {
        console.log(element, 'for of will return array of index and element')
    }
    for (const [index, element] of stringArray.entries()) {
        console.log(index, element, 'for of will return index and element')
    }

    // The Array.from() static method creates a new, 
    // shallow-copied Array instance from an iterable or array-like object.

    //3.  Array.prototype.every()
    // The every() method of Array instances tests whether all elements in the array pass the test implemented by the provided function. 
    // Syntax : every(callbackFn)
    // Return Value : Boolean value.
    console.log(numberArray.every(item => item > 0), 'will return true');

    let resultOfEvery = numberArray.every((item) => {
        return item > 0 ? true : false
    })
    console.log(resultOfEvery , 'resultOfEvery')

    //3.  Array.prototype.fill()
    // The fill() method of Array instances changes all elements within a range of indices in an array to a static value. 
    // Syntax : fill(val , start , end)
    // Return Value : Modified array.
    console.log(numberArray.fill(0, 2, 4), 'will return [1, 2, 0, 0, 5, 6]');
    console.log(numberArray, 'numberArray got modified to [1, 2, 0, 0, 5, 6]')

    //4.  Array.prototype.filter()
    // The filter() method creates a new array filled with elements that pass a test provided by a function.
    // Syntax : array.filter(function(currentValue, index, arr))
    // Return Value : New array whih has truthy value.
    let filterArray = ['Test 678' , 'Job 865' , 'Search 324']
    let a = filterArray.filter((item) => {
        if(item.includes('6')){
            return false
        }else return true
    })
    console.log(a , 'filterArray')


    // Array.prototype.find
    // returns the first element in the provided array that satisfies the provided testing function.
    // find(callbackFn)
    // Return value : new array

    // Find a prime number in the provided array
    let findArray = [4, 5, 8, 12 , 1128 , 49 , 77]
    let resultFind = findArray.find((item) => {
        for (let i = 2; i <= Math.sqrt(item); i++){
        if(item % i === 0){
            return false
        }}
        return true
    })
    console.log(resultFind , ' find')

    // Find an addition of numbers 

    const numberAdd = (array, sum) => {
    let ArrayofSum = {}; // Object to store arrays of indices of elements whose complements are seen so far
    let SumProvided = [];

    array.forEach((item, index) => {
        if(ArrayofSum[item]){
            ArrayofSum[item].push(index)
        }else{
            ArrayofSum[item] =[index]
        }
        let diff = sum - item
        ArrayofSum[diff] && ArrayofSum[diff].forEach(val => {
            SumProvided.push([val , index])
        })
       
    });
    console.log(ArrayofSum  , 'chek numberA ')
    return SumProvided;
}

    console.log(numberAdd([6, 2, 3, 1, 0,3,3,6, 1 , 5 , 4 , 6 , 3, 9] , 9) , 'numberadd')

    // Array.prototype.slice
    // slice() method is used to create subsets from an array.
    // Syntax slice(start , end)
    // Return value : new array

    let result = ['b', 'c', 'd', 'o'].slice(2, 3)
    console.log(result, 'result')


    // Array.prototype.splice
    // splice() method is used to delete , add or replace items in an array.
    // Syntax splice(start , deletecount , items)
    // Returen value : An array containing the deleted elements. Original array will be modified
    let newArray = ['b', 'c', 'd', 'o', 'ba', 'ca', 'da', 'oa']
    let result2 = newArray.splice(2, 2, 'check1', 'check2')
    console.log(result2, 'result2', newArray)


    // Array.prototype.reduce
    // The reduce() method executes a reducer function for array element.
    // Syntax: array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
    // Returen value : An array containing the deleted elements. Original array will be modified
    let listOfHeroes = [
        {
            "Name": "Anthony Edward 'Tony' Stark",
            "CurrentAlias": "Iron Man",
            "Intelligence": 6,
            "Strength": 6,
            "Speed": 5,
            "Durability": 6,
            "EnergyProjection": 6,
            "FightSkills": 4
        },
        {
            "Name": "Natalia Alianovna 'Natasha' Romanova",
            "CurrentAlias": "Black Widow",
            "Intelligence": 3,
            "Strength": 3,
            "Speed": 2,
            "Durability": 3,
            "EnergyProjection": 3,
            "FightSkills": 4
        },
        {
            "Name": "Dr. Robert Bruce Banner",
            "CurrentAlias": "Hulk",
            "Intelligence": 6,
            "Strength": 7,
            "Speed": 3,
            "Durability": 7,
            "EnergyProjection": 5,
            "FightSkills": 4
        }]

    let result3 = listOfHeroes.reduce((acc, curVal) => {
        return (acc.Speed || 0) > curVal.Speed ? acc : curVal;
    }, {})

    let result5 = listOfHeroes.reduce((acc , currval) => {
        return (currval.Speed > 2 ? [...acc , currval.Name] : acc)
    }, [])

    let result6 = listOfHeroes.reduce((acc , currval) => {
        return (!acc.find(item => item?.FightSkills === currval?.FightSkills) ? [...acc , currval] : acc)
    }, [])
    console.log(result3, result5, result6 , 'Resultsssssss')
    
    // Array.prototype.sort
    // sort method will sort original array, if e don't want to mutate original array then use toSorted()
    let array = ['Task 18' , 'Task 12' , 'Task 1000' , 'Task 30']

    let resultSort = array.sort((a , b) => {
        return parseInt(b.split(' ')[1]) - parseInt(a.split(' ')[1])
    })

    console.log(resultSort , 'sorted results')

    
    return (
        <>
            <h1>Array Method :</h1>
            <ul>
                <li>
                    Method At() : {numberArray.at(4)}
                </li>
            </ul>
        </>
    )
}

export default ArrayMethods;