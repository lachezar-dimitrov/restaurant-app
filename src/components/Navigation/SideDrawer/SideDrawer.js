import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css';
import Aux from '../../../hoc/Aux/Aux';
import PropTypes from 'prop-types';
import Logo from '../../Logo/Logo';
import React from 'react';

const SideDrawer = (props) => {
  const attachedClasses = [classes.SideDrawer, classes.Close];

  if (props.open) attachedClasses[1] = classes.Open;

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />

      <div className={attachedClasses.join(' ')} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

SideDrawer.propTypes = {
  isAuth: PropTypes.bool,

  open: PropTypes.bool,

  closed: PropTypes.func,
};

export default SideDrawer;
