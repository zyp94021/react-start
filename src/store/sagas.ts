import { takeEvery, call, put } from 'redux-saga/effects'
import { ActionTypes, loginSuccess, loginFail } from './action'
import { login } from '../api/login'
export function* watchRequestLogin() {
  yield takeEvery(ActionTypes.loginRequest, loginFlow)
}
export function* loginFlow(action) {
  try {
    console.log(11)
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
export default function* rootSaga() {
  yield [watchRequestLogin()]
}
