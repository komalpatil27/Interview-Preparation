import React, { useState, useEffect, useContext, useReducer, useLayoutEffect, useRef } from "react";
import { useMemo } from "react";
const HooksConcept = () => {
    // useRef usage
    const [countVal, setCountVal] = useState(0)
    const refVal = useRef(null)
    const refCount = useRef(0)
    const handleClick = () => {
        refVal.current.focus()
        refCount.current = refCount.current + 1

        // memoising val
        setCountVal(countVal + 1)
    }
    console.log(refCount, 'refcount')

    // Usememo Hook

    const memoizedVal = useMemo(() => {
        console.log('memo')
        return `${countVal} changed`
    }, [countVal])
    return (<>
        Hoooks
        <input ref={refVal}></input>
        <button onClick={handleClick}></button>
        {memoizedVal}
    </>)
}

export default HooksConcept