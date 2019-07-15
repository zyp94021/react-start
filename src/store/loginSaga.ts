import { takeEvery, call, put } from 'redux-saga/effects'
import { ActionTypes, loginSuccess, loginFail } from './action'
import { login } from '../api/login'
export function* watchRequestLogin() {
  console.log('zzz')
  yield takeEvery(ActionTypes.loginRequest, loginFlow)
}
function* loginFlow(action) {
  console.log(11)
  try {
    const response = yield call(login, {
      username: action.payload.username,
      password: action.payload.username,
    })
    console.log(response)
    yield put(loginSuccess(response))
  } catch (error) {
    yield put(loginFail(error))
  }
}