import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducer'
import thunkMiddleware from 'redux-thunk'
import state from './state'
const store = createStore(reducer, state, applyMiddleware(thunkMiddleware))

export { store }
