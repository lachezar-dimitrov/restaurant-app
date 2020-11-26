import Button from '../../UI/Button/Button';
import PropTypes from 'prop-types';
import React from 'react';

const orderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((key) => (
    <li key={key}>
      <span style={{ textTransform: 'capitalize' }}>{key}</span>: {props.ingredients[key]}
    </li>
  ));

  return (
    <>
      <h3>Your Order</h3>

      <p>A delicious burger with the following ingredients</p>

      <ul>{ingredientSummary}</ul>

      <p>
        <strong>Total Price: {props.price.toFixed(2)} USD</strong>
      </p>

      <p>Continue to checkout?</p>

      <Button buttonType={'Danger'} clicked={props.cancel}>
        CANCEL
      </Button>

      <Button buttonType={'Success'} clicked={props.continue}>
        CONTINUE
      </Button>
    </>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,

  price: PropTypes.number.isRequired,

  cancel: PropTypes.func.isRequired,

  continue: PropTypes.func.isRequired,
};

export default orderSummary;
