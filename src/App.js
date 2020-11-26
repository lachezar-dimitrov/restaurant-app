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

const App = ({ onTryAutoSignup, isAuthenticated }) => {
  useEffect(() => onTryAutoSignup(), [onTryAutoSignup]);

  let routes = (
    <Switch>

      <Route path={'/auth'} render={(props) => <Auth {...props} />} />

      <Route path={'/'} exact component={BurgerBuilder} />

      <Redirect to={'/'} />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>

        <Route path={'/checkout'} render={(props) => <Checkout {...props} />} />

        <Route path={'/orders'} exact render={(props) => <Orders {...props} />} />

        <Route path={'/logout'} component={Logout} />

        <Route path={'/auth'} render={(props) => <Auth {...props} />} />

        <Route path={'/'} exact component={BurgerBuilder} />
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
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
