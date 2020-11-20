import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';

const Button = (props) => (
  <button
    disabled={props.disabled}
    className={[classes.Button, classes[props.buttonType]].join(' ')}
    onClick={props.clicked}
  >
    {props.children}
  </button>
);

Button.propTypes = {
  disabled: PropTypes.bool,

  buttonType: PropTypes.string,

  clicked: PropTypes.func,
};

export default Button;
