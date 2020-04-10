import {createStore} from "redux"
import reducer from "./reduser"

const store = createStore(reducer)
window.store = store
export default store