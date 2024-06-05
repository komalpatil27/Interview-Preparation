import React, { useState, useEffect, useContext, useReducer, useLayoutEffect, useCallback, useRef } from "react";
import { useMemo } from "react";
const HooksConcept = () => {

    // useRef usage
    const [countVal, setCountVal] = useState(0)
    const refVal = useRef(null)
    const refCount = useRef(0)
    const handleClick = (val) => {
        refVal.current.focus()
        refCount.current = refCount.current + 1

        // memoising val
        setCountVal(val)
    }
    console.log(refCount, 'refcount')

    // Usememo Hook
    const memoizedVal = useMemo(() => {
        console.log('memo')
        return `${countVal} changed`
    }, [countVal])

   const cacheFunction =  useCallback(() => {
    console.log(countVal, 'jjj')
    console.log('cached a function')
   }, [countVal])
    return (<>
        Hoooks
        <input ref={refVal}></input>
        <p>Count: 📂{countVal}</p>
        <button onClick={() =>{ handleClick(countVal)}}></button>
        <button onClick={() =>{ cacheFunction();}}>UsecallBack</button>
        {memoizedVal}
    </>)
}

export default HooksConcept