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

    return (<>
        <PureComp
            value='Test'
        />
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