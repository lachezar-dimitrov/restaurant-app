import { logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga } from './auth';
import { takeEvery } from 'redux-saga/effects';
import {
  AUTH_INITIATE_LOGOUT,
  AUTH_CHECK_TIMEOUT,
  INIT_INGREDIENTS,
  AUTH_CHECK_STATE,
  AUTH_USER,
} from '../actions/actionTypes';
import { initIngredientsSaga } from './burgerBuilder';

export function* watchAuth() {
  yield takeEvery(AUTH_INITIATE_LOGOUT, logoutSaga);

  yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);

  yield takeEvery(AUTH_USER, authUserSaga);

  yield takeEvery(AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(INIT_INGREDIENTS, initIngredientsSaga);
}
