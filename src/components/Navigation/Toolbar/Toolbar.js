import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './Toolbar.css';
import PropTypes from 'prop-types';
import Logo from '../../Logo/Logo';
import React from 'react';

const Toolbar = (props) => {
  return (
    <header className={classes.Toolbar}>
      <DrawerToggle clicked={props.drawerToggleClicked} />

      <div className={classes.Logo}>
        <Logo />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={props.isAuth} />
      </nav>
    </header>
  );
};

Toolbar.propTypes = {
  isAuth: PropTypes.bool,

  drawerToggleClicked: PropTypes.func.isRequired,
};

export default Toolbar;
