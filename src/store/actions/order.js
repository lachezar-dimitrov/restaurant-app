import axios from '../../axios-orders';
import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_FAIL,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_START,
  FETCH_ORDERS_FAIL,
  PURCHASE_INIT,
} from './actionTypes';

const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: PURCHASE_BURGER_SUCCESS,

  orderId,

  orderData,
});

const purchaseBurgerFail = (error) => ({
  type: PURCHASE_BURGER_FAIL,

  error,
});

const purchaseBurgerStart = () => ({ type: PURCHASE_BURGER_START });

export const purchaseBurger = (orderData, idToken) => (dispatch) => {
  dispatch(purchaseBurgerStart());

  axios

    .post(`/orders.json?auth=${idToken}`, orderData)

    .then((response) => dispatch(purchaseBurgerSuccess(response.data.name, orderData)))

    .catch((error) => dispatch(purchaseBurgerFail(error)));
};

export const purchaseInit = () => ({ type: PURCHASE_INIT });

const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,

  orders,
});

const fetchOrdersFail = (error) => ({
  type: FETCH_ORDERS_FAIL,

  error,
});

const fetchOrdersStart = () => ({
  type: FETCH_ORDERS_START,
});

export const fetchOrders = (idToken, userId) => (dispatch) => {
  dispatch(fetchOrdersStart());

  const queryParams = `?auth=${idToken}&orderBy="userId"&equalTo="${userId}"`;

  axios

    .get(`/orders.json${queryParams}`)

    .then((response) => {
      const orders = [];

      for (const key in response.data) {
        orders.push({
          ...response.data[key],

          id: key,
        });
      }

      dispatch(fetchOrdersSuccess(orders));
    })

    .catch((error) => dispatch(fetchOrdersFail(error)));
};
