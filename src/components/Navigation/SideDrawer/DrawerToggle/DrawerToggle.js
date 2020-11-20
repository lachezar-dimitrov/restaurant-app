import React from 'react';
import PropTypes from 'prop-types';
import classes from './DrawerToggle.css';

const DrawerToggle = (props) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div></div>

      <div></div>

      <div></div>
    </div>
  );
};

DrawerToggle.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default DrawerToggle;
