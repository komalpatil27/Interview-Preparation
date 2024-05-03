import React , {useState } from 'react'

const ApiConcept = () => {
    const [apiResponse , setApiResponse] = useState({})
    const handleApiCall = () => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then((data)=> {
            console.log(data , 'data')
            return data.json()
        }).then((response) => {
            console.log(response)
            setApiResponse(response);
        })
        .catch((e) => {
            console.log(e , 'error')
        })

        // Using async await

        asyncAwaitConcept();
        // POST , PUT , PATCH
        // fetch('https://jsonplaceholder.typicode.com/todos/1' , {
        //     method : 'POST' 
        //     header : '',
        //     body : JSON.stringify('')
        // }).then().catch()

        // DELETE
        // fetch('https://jsonplaceholder.typicode.com/todos/1' , {
        //     method : 'DELETE'
        //     header : ''
        // }).then().catch()
    }

    const asyncAwaitConcept = async () => {
        try{
            const result = await fetch('https://jsonplaceholder.typicode.com/');
            console.log(result,'result')
        }catch(err){
            console.log(err, 'err')
        }
    }


    return <>
    <button onClick = {() => handleApiCall()}></button>
    </>
}

export default ApiConcept;