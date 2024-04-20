import React, { useRef } from "react";
const HooksConcept = () => {

    // useRef usage
    const refVal = useRef(null)
    const handleClick = () => {
        refVal.current.focus()
    }
    console.log(refVal, 'refcount')
   
    return (<>
        useRef hook
        <input ref={refVal} onClick={handleClick}></input>
    </>)
}

export default HooksConcept