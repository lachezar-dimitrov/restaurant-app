import React from 'react';
import PropTypes from 'prop-types';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Cheese', type: 'cheese' },
  { label: 'Meat', type: 'meat' },
];

const BuildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.price.toFixed(2)} USD</strong>
      </p>

      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.ingredientAdded(ctrl.type)}
          removed={() => props.ingredientRemove(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}

      <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordered}>
        {props.isAuth ? 'ORDER NOW' : 'SIGN IN TO ORDER'}
      </button>
    </div>
  );
};

BuildControls.propTypes = {
  price: PropTypes.number.isRequired,

  disabled: PropTypes.object.isRequired,

  purchasable: PropTypes.bool.isRequired,

  ingredientAdded: PropTypes.func.isRequired,

  ingredientRemove: PropTypes.func.isRequired,

  isAuth: PropTypes.bool,
};

export default BuildControls;
