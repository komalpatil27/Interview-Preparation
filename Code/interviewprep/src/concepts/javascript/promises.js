

import React from "react"

function PromisePractice() {
    const promise1 = Promise.resolve('komal')
    const promise2 = Promise.reject('reject')
    Promise.race([ promise1 ,promise2 ]).then((resolve, reject) => {
        // console.log(resolve, reject, 'decide')
        if (reject) {
            console.log('reference Error')
        } else { console.log('resolved one' , resolve); }
    })
    return <>Promise</>
}

export default PromisePractice