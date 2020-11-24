import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { fetchOrders } from '../../store/actions/index';
import Order from '../../components/Order/Order';
import React, { useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

const orders = (props) => {
  useEffect(() => props.onFetchOrders(props.idToken, props.userId), []);

  let orders = <Spinner />;

  if (!props.loading) {
    orders = props.orders.map((order) => (
      <Order key={order.id} ingredients={order.ingredients} price={order.price} />
    ));
  }

  return <div>{orders}</div>;
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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(orders, axios));
