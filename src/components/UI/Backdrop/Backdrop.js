import classes from './Backdrop.css';
import PropTypes from 'prop-types';
import React from 'react';

const Backdrop = (props) =>
  props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null;

Backdrop.propTypes = {
  clicked: PropTypes.func.isRequired,
};

export default Backdrop;
