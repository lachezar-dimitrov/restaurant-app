import { logoutSucceed, logout } from '../actions';
import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';

export function* logoutSaga(action) {
  yield localStorage.removeItem('idToken');

  yield localStorage.removeItem('expirationDate');

  yield localStorage.removeItem('userId');

  yield put(logoutSucceed());
}

export function* checkAuthTimeoutSaga({ expirationTime }) {
  yield delay(expirationTime * 1000);

  yield put(logout());
}
