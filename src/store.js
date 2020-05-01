import {applyMiddleware, combineReducers, createStore} from "redux"
import reducer from "./reduser"
import thunk from 'redux-thunk'

const reducers = combineReducers({
todoListApp: reducer
})

const store = createStore(reducers, applyMiddleware(thunk))
window.store = store
export default store