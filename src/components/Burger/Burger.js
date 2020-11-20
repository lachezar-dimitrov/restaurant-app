import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import PropTypes from 'prop-types';
import classes from './Burger.css';
import React from 'react';

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((ingredient) => {
      return [...Array(props.ingredients[ingredient])].map((_, index) => {
        return <BurgerIngredient key={ingredient + index} type={ingredient} />;
      });
    })
    .flat(1);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please start adding ingredients</p>;
  }

  return (
    <div className={classes.Burger}>
      <BurgerIngredient type={'bread-top'} />
      {transformedIngredients}
      <BurgerIngredient type={'bread-bottom'} />
    </div>
  );
};

burger.propTypes = {
  ingredients: PropTypes.object,
};

export default burger;
