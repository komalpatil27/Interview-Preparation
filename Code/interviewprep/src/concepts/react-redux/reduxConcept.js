import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
const ReduxConcept = () => {
    const dispatch = useDispatch()
    const userData = useSelector((val) => val?.reducer.userData)
    console.log(userData, 'userData')
    const dummyApi = async () => {
        const apicall = await fetch('http://users')
        console.log('Ít wont work', apicall)
        // setTimeout(() => {
        //     console.log('Setting timeout')
        // }, 3000)
        return apicall
    }
    return (
        <>
            See Following details:

            <ui>
                <li>
                    {userData?.city}
                </li>
                <li>
                    {userData?.name}
                </li>
            </ui >

            <button type='button' onClick={() => {
                dispatch({ type: 'Addition', payload: { city: 'Pune', name: 'komal' } });
                dispatch({ type: 'apicall', payload: dummyApi() });
                // This api call will get executed because we are not dispatching any function call directly to the store
                // dispatch(dummyApi()); This api call won't get executed as we are trying to dispatch api call which might take time to complete but actions will be dispatched synchronously without waiting for result.
                // ERROR : Actions must be plain objects. Use custom middleware for async actions. So we cannot dispatch 
            }
            }>
                Add User Details
            </button>
        </>
    )
}

export default ReduxConcept