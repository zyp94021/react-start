import { AnyAction, combineReducers } from 'redux'
import { ActionTypes } from './action'

export const user = (state = {}, action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.loginRequest:
    case ActionTypes.loginSuccess:
    case ActionTypes.loginFail:
      return { ...action.payload.user }
    default:
      return state
  }
}
export const token = (token: string = '', action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.loginSuccess:
      return action.payload.token as string
    case ActionTypes.loginFail:
    default:
      return token
  }
}
export const todos = (state: any[] = [], action: AnyAction) => {
  switch (action.type) {
    case ActionTypes.addTodo:
      return action.payload.length > 1
        ? [...action.payload]
        : [...state, ...action.payload]
    case ActionTypes.deleteTodo:
      return [...state.filter(item => item.id !== action.payload)]
    default:
      return state
  }
}
export const reducer = combineReducers({ user, token, todos })
