import { put } from 'redux-saga/effects'
import LoginActions from '../Redux/LoginRedux'
import { Actions as NavigationActions } from 'react-native-router-flux'

// attempts to login
export function * login ({ username, password }) {
  if (password === '') {
    // dispatch failure
    yield put(LoginActions.loginFailure('WRONG'))
  } else {
    // dispatch successful logins
    yield put(LoginActions.loginSuccess(username))
    yield put(NavigationActions.launchScreen)
  }
}
