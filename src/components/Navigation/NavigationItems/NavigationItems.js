import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';
import PropTypes from 'prop-types';
import React from 'react';

const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link={'/'} exact>
        Burger Builder
      </NavigationItem>

      {props.isAuthenticated ? (
        <>
          <NavigationItem link={'/orders'}>Orders</NavigationItem>

          <NavigationItem link={'/logout'}>Logout</NavigationItem>
        </>
      ) : (
          <NavigationItem link={'/auth'}>Authenticate</NavigationItem>
        )}
    </ul>
  );
};

NavigationItems.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default NavigationItems;
