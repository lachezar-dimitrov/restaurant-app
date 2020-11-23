import { put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import axios from 'axios';
import {
  checkAuthTimeout,
  logoutSucceed,
  authSuccess,
  authStart,
  authFail,
  logout,
} from '../actions';

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

export function* authUserSaga({ email, password, isSignup }) {
  yield put(authStart());

  const BASE_AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:`;

  const SIGN_UP_KEY_WORD = `signUp?key=`;

  const SIGN_IN_KEY_WORD = `signInWithPassword?key=`;

  const API_KEY = 'AIzaSyBNdxQdmYvI80d4nPxW60s4OCuwGkrgVpY';

  let URL = BASE_AUTH_URL;

  isSignup ? (URL += SIGN_UP_KEY_WORD) : (URL += SIGN_IN_KEY_WORD);

  URL += API_KEY;

  const authData = {
    email,

    password,

    returnSecureToken: true,
  };

  try {
    const { data } = yield axios.post(URL, authData);

    const expiresIn = data.expiresIn;

    const expirationDate = yield new Date(new Date().getTime() + expiresIn * 1000);

    yield localStorage.setItem('expirationDate', expirationDate);

    yield localStorage.setItem('idToken', data.idToken);

    yield localStorage.setItem('userId', data.localId);

    yield put(authSuccess(data.idToken, data.localId));

    yield put(checkAuthTimeout(expiresIn));
  } catch ({ response }) {
    yield put(authFail(response.data.error));
  }
}

export function* authCheckStateSaga() {
  const idToken = yield localStorage.getItem('idToken');

  if (!idToken) yield put(logout());
  else {
    const expirationDate = yield new Date(localStorage.getItem('expirationDate'));

    const now = yield new Date();

    if (expirationDate <= now) {
      yield put(logout());
    } else {
      const userId = yield localStorage.getItem('userId');

      yield put(authSuccess(idToken, userId));

      yield put(checkAuthTimeout((expirationDate.getTime() - now.getTime()) / 1000));
    }
  }
}
