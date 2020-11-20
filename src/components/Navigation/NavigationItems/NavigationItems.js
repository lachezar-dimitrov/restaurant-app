import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import PropTypes from 'prop-types';
import React from 'react';
import Aux from '../../../hoc/Aux/Aux';

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/' exact>
        Burger Builder
      </NavigationItem>

      {props.isAuthenticated ? (
        <Aux>
          <NavigationItem link='/orders'>Orders</NavigationItem>

          <NavigationItem link='/logout'>Logout</NavigationItem>
        </Aux>
      ) : (
        <NavigationItem link='/auth'>Authenticate</NavigationItem>
      )}
    </ul>
  );
};

NavigationItems.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default NavigationItems;
