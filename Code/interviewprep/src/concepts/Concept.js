import React, { useEffect, useState } from "react";
import ArrayMethods from "./javascript/arrayMethods";
import PromisePractice from "./javascript/promises";
import JavascriptConcepts from "./javascript/javascriptConcept";
import HooksConcept from "./react/hooks";
import ReduxConcept from "./react-redux/reduxConcept";
import { Provider } from "react-redux";
import store from "./react-redux/store";
import ApiConcept from "./javascript/apiConcept";
import PollyFill from "./javascript/pollyfills";
import Practice from './javascript/practice'
import Closure from "./javascript/closure";
function Concepts() {

    return (
        <>
            {/* <ArrayMethods /> */}
            {/* <PromisePractice /> */}
            {/* <JavascriptConcepts /> */}
            <HooksConcept />
            {/* <Provider store={store}><ReduxConcept /></Provider> */}
            {/* <ApiConcept/> */}
            {/* {<PollyFill/>} */}
            {/* <Practice/> */}
            <Closure/>
        </>)
}
export default Concepts;