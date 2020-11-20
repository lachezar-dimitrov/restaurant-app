import { updateObject } from '../../shared/utility';
import {
  PURCHASE_BURGER_SUCCESS,
  PURCHASE_BURGER_FAIL,
  PURCHASE_BURGER_START,
  PURCHASE_INIT,
  FETCH_ORDERS_START,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAIL,
} from '../actions/actionTypes';

const initialState = {
  orders: [],

  loading: false,

  purchased: false,
};

const purchaseInit = (state) => updateObject(state, { purchased: false });

const purchaseBurgerStart = (state) => updateObject(state, { loading: true });

const purchaseBurgerSuccess = (state, { orderData, orderId }) => {
  const newOrder = updateObject(orderData, { id: orderId });

  return updateObject(state, {
    loading: false,

    purchased: true,

    orders: state.orders.concat(newOrder),
  });
};

const purchaseBurgerFail = (state) => updateObject(state, { loading: false });

const fetchOrdersStart = (state) => updateObject(state, { loading: true });

const fetchOrdersSuccess = (state, { orders }) =>
  updateObject(state, {
    orders,

    loading: false,
  });

const fetchOrdersFail = (state) => updateObject(state, { loading: false });

const reducer = (state = initialState, { type, orderData, orderId, orders }) => {
  switch (type) {
    case PURCHASE_INIT:
      return purchaseInit(state);

    case PURCHASE_BURGER_START:
      return purchaseBurgerStart(state);

    case PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, { orderData, orderId });

    case PURCHASE_BURGER_FAIL:
      return purchaseBurgerFail(state);

    case FETCH_ORDERS_START:
      return fetchOrdersStart(state);

    case FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, { orders });

    case FETCH_ORDERS_FAIL:
      return fetchOrdersFail(state);

    default:
      return state;
  }
};

export default reducer;
