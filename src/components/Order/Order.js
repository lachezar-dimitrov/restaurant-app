import PropTypes from 'prop-types';
import classes from './Order.css';
import React from 'react';

const Order = (props) => {
  const ingredients = [];

  for (const ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,

      amount: props.ingredients[ingredientName],
    });
  }

  const ingredientOutput = ingredients.map((ingredient) => (
    <span key={ingredient.name} className={classes.Span}>
      {ingredient.name} ({ingredient.amount})
    </span>
  ));

  return (
    <div className={classes.Order}>
      <p>Ingredients: {ingredientOutput}</p>

      <p>
        Price: <strong>{Number.parseFloat(props.price).toFixed(2)} USD</strong>
      </p>
    </div>
  );
};

Order.propTypes = {
  price: PropTypes.number.isRequired,
};

export default Order;
