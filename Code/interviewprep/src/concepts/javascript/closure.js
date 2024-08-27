import React from "react";

const Closure = () => {
    // This is how closure works , we are returning a function and the inner functuion has access of outer value. 
    // Basically we use closures everywhere in react.
    const colourChange = (value) => {
        return function(){
            document.body.style.backgroundColor = value
        }
    }
    return(<>
    <div>
        <button id="Green" onClick={colourChange('green')}>
            Green
        </button>
        <button id="Orange" onClick={colourChange('orange')}>
            Orange
        </button>
    </div>
    </>)
}

export default Closure