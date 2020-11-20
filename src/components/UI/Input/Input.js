import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.css';

const Input = (props) => {
  let inputElement = null;

  const inputClassesArray = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched)
    inputClassesArray.push(classes.Invalid);

  const inputClasses = inputClassesArray.join(' ');

  switch (props.elementType) {
    case 'input':
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );

      break;

    case 'textarea':
      inputElement = (
        <textarea
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );

      break;

    case 'select':
      inputElement = (
        <select className={inputClasses} value={props.value} onChange={props.changed}>
          {props.elementConfig.options.map(({ value, displayValue }) => (
            <option key={value} value={value}>
              {displayValue}
            </option>
          ))}
        </select>
      );

      break;

    default:
      inputElement = (
        <input
          className={inputClasses}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>

      {inputElement}
    </div>
  );
};

Input.propTypes = {
  elementType: PropTypes.string,

  elementConfig: PropTypes.object.isRequired,

  value: PropTypes.string,

  invalid: PropTypes.bool,

  shouldValidate: PropTypes.object,

  touched: PropTypes.bool,

  changed: PropTypes.func.isRequired,
};

export default Input;
