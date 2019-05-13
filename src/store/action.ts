import { post, get } from '../api/request'

export const ActionTypes = {
  loginRequest: 'loginRequest',
  loginSuccess: 'loginSuccess',
  loginFail: 'loginFail',
  addTodo: 'addTodo',
  deleteTodo: 'deleteTodo',
}
export const loginRequest = payload => ({
  type: ActionTypes.loginRequest,
  payload,
})
export const loginSuccess = payload => ({
  type: ActionTypes.loginSuccess,
  payload,
})
export const loginFail = payload => ({
  type: ActionTypes.loginFail,
  payload,
})
export const getTodo = () => async dispatch => {
  const result = await get('http://acgc.fun:3001/all')
  dispatch(
    addTodo(result.map(item => ({ id: item.id, message: item.message }))),
  )
}
export const postAddTodo = payload => async dispatch => {
  const { id, message } = await post('http://acgc.fun:3001/add', {
    message: payload,
  })
  dispatch(addTodo([{ id, message }]))
}
export const postDeleteTodo = payload => async dispatch => {
  const { id } = await post('http://acgc.fun:3001/delete', {
    id: payload,
  })
  dispatch(deleteTodo(id))
}
export const addTodo = payload => ({
  type: ActionTypes.addTodo,
  payload,
})
export const deleteTodo = payload => ({
  type: ActionTypes.deleteTodo,
  payload,
})
