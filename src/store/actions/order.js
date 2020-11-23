import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_START,
  PURCHASE_BURGER_FAIL,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_START,
  FETCH_ORDERS_FAIL,
  PURCHASE_INIT,
  PURCHASE_BURGER,
  FETCH_ORDERS,
} from './actionTypes';

export const purchaseBurgerStart = () => ({
  type: PURCHASE_BURGER_START,
});

export const purchaseBurgerSuccess = (orderId, orderData) => ({
  type: PURCHASE_BURGER_SUCCESS,

  orderId,

  orderData,
});

export const purchaseBurgerFail = (error) => ({
  type: PURCHASE_BURGER_FAIL,

  error,
});

export const purchaseBurger = (orderData, idToken) => ({
  type: PURCHASE_BURGER,

  orderData,

  idToken,
});

export const purchaseInit = () => ({ type: PURCHASE_INIT });

export const fetchOrdersSuccess = (orders) => ({
  type: FETCH_ORDERS_SUCCESS,

  orders,
});

export const fetchOrdersFail = (error) => ({
  type: FETCH_ORDERS_FAIL,

  error,
});

export const fetchOrdersStart = () => ({
  type: FETCH_ORDERS_START,
});

export const fetchOrders = (idToken, userId) => ({
  type: FETCH_ORDERS,

  idToken,

  userId,
});
