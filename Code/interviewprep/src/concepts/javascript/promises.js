

import React from "react"

function PromisePractice() {
    const promise1 = Promise.resolve('komal')
    const promise2 = Promise.reject('reject')
    Promise.all([promise1, promise2]).then((resolve, reject) => {
        // console.log(resolve, reject, 'decide')
        if (reject) {
            console.log('reference Error')
        } else { console.log('resolved'); }
    })
    return <>Promise</>
}

export default PromisePractice