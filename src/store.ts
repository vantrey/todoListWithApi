import {applyMiddleware, combineReducers, createStore} from "redux"
import reducer from "./reduser"
import thunk from 'redux-thunk'

const reducers = combineReducers({
todoListApp: reducer
})
 type ReducerType = typeof reducers
export type AppStateType = ReturnType<ReducerType>

const store = createStore(reducers, applyMiddleware(thunk))

// @ts-ignore
window.store  = store
export default store