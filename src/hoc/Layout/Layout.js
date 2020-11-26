import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import classes from './Layout.css';

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => setSideDrawerIsVisible(false);

  const sideDrawerToggleHandler = () => setSideDrawerIsVisible(!sideDrawerIsVisible);

  return (
    <>
      <Toolbar isAuth={props.isAuthenticated} drawerToggleClicked={sideDrawerToggleHandler} />

      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
      />

      <main className={classes.Content}>{props.children}</main>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.idToken !== null,
});

export default connect(mapStateToProps)(Layout);
