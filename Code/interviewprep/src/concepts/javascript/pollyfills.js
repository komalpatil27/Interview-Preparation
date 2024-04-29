/* eslint-disable */

const PollyFill = () => {

    const numbers = [1, 2, 3, 4, 5];

    // pollyFill for map
    Array.prototype.mapPollyFill = function (callbackFn) {
        const newArray = []
        for (let i = 0; i < this.length; i++) {
            newArray.push(callbackFn(this[i]))
        }
        return newArray;
    }
    console.log(numbers.mapPollyFill(item => item), 'mapPollyFill')


    // pollyFill for reduce
    Array.prototype.reducePollyFill = function (callbackFn, initialvalue) {
        let accumulator = ((initialvalue === undefined) ? undefined : initialvalue)
        for (let i = 0; i < this.length; i++) {
            if (accumulator !== undefined) {
                accumulator = callbackFn(accumulator, this[i], i, this);
                // callback(accumulator, currentValue, currentIndex, array).

            } else {
                accumulator = this[i]
            }
        }
        return accumulator
    }

    const sum = numbers.reducePollyFill((accumulator, currentValue) => {
        return accumulator + currentValue;
    }, 0);
    console.log(sum, 'reduce PollyFill');

    return <>PollyFills</>
}

export default PollyFill;
