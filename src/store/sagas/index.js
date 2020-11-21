import { AUTH_INITIATE_LOGOUT } from '../actions/actionTypes';
import { takeEvery } from 'redux-saga/effects';
import { logoutSaga } from './auth';

export function* watchAuth() {
  yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);
}
