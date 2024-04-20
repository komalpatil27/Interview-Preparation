import { combineReducers, createStore } from 'redux'

let initialState = {
    userData: { city: '', name: '' }
}
// Reducer function is a pure function
const reducer = (state = initialState, action) => {
    console.log(action, 'action')
    switch (action.type) {
        case 'Addition':
            return { ...state, userData: action.payload }
        default:
            return state
    }
}
const rootReducer = combineReducers({
    reducer
})

export default rootReducer
