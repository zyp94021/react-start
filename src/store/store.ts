import { createStore, applyMiddleware } from 'redux'
import { reducer } from './reducer'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas'

import state from './state'
const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(thunkMiddleware, sagaMiddleware)
const store = createStore(reducer, state, enhancer)
sagaMiddleware.run(rootSaga)
export default store
