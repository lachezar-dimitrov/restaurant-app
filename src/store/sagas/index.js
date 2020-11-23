import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { takeEvery } from 'redux-saga/effects';
import {
  AUTH_CHECK_STATE,
  AUTH_CHECK_TIMEOUT,
  AUTH_INITIATE_LOGOUT,
  AUTH_USER,
} from '../actions/actionTypes';

export function* watchAuth() {
  yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);

  yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);

  yield takeEvery(AUTH_USER, authUserSaga);

  yield takeEvery(AUTH_CHECK_STATE, authCheckStateSaga);
}
