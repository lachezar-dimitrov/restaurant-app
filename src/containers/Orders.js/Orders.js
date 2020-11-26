import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOrders } from '../../store/actions/index';
import Order from '../../components/Order/Order';
import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

const Orders = ({ idToken, userId, loading, orders, onFetchOrders }) => {
  useEffect(() => onFetchOrders(idToken, userId), [onFetchOrders, idToken, userId]);

  let ordersComponent = <Spinner />;

  if (!loading) {
    ordersComponent = orders.map((order) => (
      <Order key={order.id} ingredients={order.ingredients} price={order.price} />
    ));
  }

  return <div>{ordersComponent}</div>;
};

const mapStateToProps = (state) => ({
  orders: state.order.orders,

  loading: state.order.loading,

  idToken: state.auth.idToken,

  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onFetchOrders: (idToken, userId) => dispatch(fetchOrders(idToken, userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
