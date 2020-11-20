import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BulgerBuilder';
import asyncComponent from './hoc/asyncComponent/asyncComponent';
import { authCheckState } from './store/actions/index';
import Logout from './containers/Auth/Logout/Logout';
import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import { connect } from 'react-redux';

const asyncCheckout = asyncComponent(() => import('./containers/Checkout/Checkout'));

const asyncOrders = asyncComponent(() => import('./containers/Orders.js/Orders'));

const asyncAuth = asyncComponent(() => import('./containers/Auth/Auth'));

export class App extends Component {
  componentDidMount = () => this.props.onTryAutoSignup();

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />

        <Route path='/' exact component={BurgerBuilder} />

        <Redirect to='/' />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />

          <Route path='/orders' exact component={asyncOrders} />

          <Route path='/logout' component={Logout} />

          <Route path='/auth' component={asyncAuth} />

          <Route path='/' exact component={BurgerBuilder} />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.idToken !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(authCheckState()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
