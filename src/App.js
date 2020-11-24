import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import BurgerBuilder from './containers/BurgerBuilder/BulgerBuilder';
import { authCheckState } from './store/actions/index';
import Spinner from './components/UI/Spinner/Spinner';
import Logout from './containers/Auth/Logout/Logout';
import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import { connect } from 'react-redux';

const Checkout = React.lazy(() => import('./containers/Checkout/Checkout'));

const Orders = React.lazy(() => import('./containers/Orders.js/Orders'));

const Auth = React.lazy(() => import('./containers/Auth/Auth'));

const app = (props) => {
  useEffect(() => props.onTryAutoSignup(), []);

  let routes = (
    <Switch>
      {/* <Route path='/auth' component={Auth} /> */}
      <Route path='/auth' render={() => <Auth />} />

      <Route path='/' exact component={BurgerBuilder} />

      <Redirect to='/' />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        {/* <Route path='/checkout' component={Checkout} /> */}
        <Route path='/checkout' render={() => <Checkout />} />

        {/* <Route path='/orders' exact component={Orders} /> */}
        <Route path='/orders' exact render={() => <Orders />} />

        <Route path='/logout' component={Logout} />

        {/* <Route path='/auth' component={Auth} /> */}
        <Route path='/auth' render={() => <Auth />} />

        <Route path='/' exact component={BurgerBuilder} />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<Spinner />}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.idToken !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onTryAutoSignup: () => dispatch(authCheckState()),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
