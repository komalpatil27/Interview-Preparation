// PolyFill for map
//  eslint-disable-next-line
Array.prototype.map = function (callbackFn) {
    const newArray = []
    for (let i = 0; i < this.length; i++) {
        newArray.push(callbackFn(this[i]))
    }
    return newArray;
}