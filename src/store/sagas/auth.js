import { AUTH_LOGOUT } from '../actions/actionTypes';
import { put } from 'redux-saga/effects';

export function* logoutSaga(action) {
  yield localStorage.removeItem('idToken');

  yield localStorage.removeItem('expirationDate');

  yield localStorage.removeItem('userId');

  yield put({
    type: AUTH_LOGOUT,
  });
}
