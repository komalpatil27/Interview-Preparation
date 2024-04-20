import React from 'react'
import { memo } from 'react'

const PureComp = memo(function PureComp() {
    console.log('renddered');
    return (<>Pure Componet</>)
})

const JavascriptConcepts = () => {

    // Function currying Example
    /*Function currying*/
    function addingValue(firstVal) {
        return function (secondVal, thirdval = 0) {
            return firstVal + secondVal + thirdval
        }
    }
    let addBytWo = addingValue(2);
    let addbyThree = addingValue(3);
    console.log(addBytWo(10, 2), addbyThree(12))


    // Hoisting 
    // Hoisting doesn't work on function expressions
    // a();
    // const a = () => {
    //     console.log('a')
    // }
    a();
    function a() {
        console.log('a')
    }

    // Throttling
    function throttle(func, delay) { 
        let lastCall = 0; 
        return function (...args) { 
            const now = new Date().getTime(); 
            if (now - lastCall < delay) { 
                return; 
            } 
            lastCall = now; 
            func(...args); 
        }; 
    } 
      
    function logMessage(message) { 
        console.log(message); 
    } 
      
    const throttledLogMessage = throttle(logMessage, 1000); 
      
    // Logs 'Hello' 
    throttledLogMessage('Hello'); 
      
    // Doesn't log anything 
    throttledLogMessage('World'); 
      
      // Throttle the fetchData function with a delay of 5000 ms
    
    // Debouncing
    const debounceMsg = () => {
        console.log('debouncing`')
    }
    function debounce(func, delay) {
        let timer;

        return (...args) => {
            console.log(args , 'args')
            clearTimeout(timer)
            timer =  setTimeout(() => {
                func.apply(this , args)
            }, delay)
        }

    }
    const newDebounce = debounce(debounceMsg , 2000)
    newDebounce('check')

    // Higher order Functions
    
    const higherorderFunction = (fnCall , numb) => {
        return fnCall(numb)
    }

    const addBy2 = (num) => {
        return num + 2
    }
    const result = higherorderFunction(addBy2 , 5)
    console.log(result)

    return (<>
        <PureComp
            value='Test'
        />
        <div onClick={() => throttledLogMessage('World5')}>Check</div>
    </>)
}
// Pure Components
// Pure components are components which returns the same output for same state and props
// Example for class and functional component

// class PureComp extends React.PureComponent {
//     render() {
//         return (<></>)
//     }
// }

export default JavascriptConcepts;