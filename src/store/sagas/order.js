import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';
import {
  purchaseBurgerSuccess,
  purchaseBurgerStart,
  fetchOrdersSuccess,
  purchaseBurgerFail,
  fetchOrdersStart,
  fetchOrdersFail,
} from '../actions';

export function* purchaseBurgerSaga({ orderData, idToken }) {
  yield put(purchaseBurgerStart());

  try {
    const { data } = yield axios.post(`/orders.json?auth=${idToken}`, orderData);

    yield put(purchaseBurgerSuccess(data.name, orderData));
  } catch (error) {
    yield put(purchaseBurgerFail(error));
  }
}

export function* fetchOrdersSaga({ idToken, userId }) {
  yield put(fetchOrdersStart());

  const queryParams = `?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`;

  try {
    const { data } = yield axios.get(`/orders.json${queryParams}`);

    const orders = [];

    for (const key in data) {
      orders.push({
        ...data[key],

        id: key,
      });
    }

    yield put(fetchOrdersSuccess(orders));
  } catch (error) {
    put(fetchOrdersFail(error));
  }
}
