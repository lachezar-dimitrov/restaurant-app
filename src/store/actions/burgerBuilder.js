import {
  FETCH_INGREDIENTS_FAILED,
  REMOVE_INGREDIENT,
  INIT_INGREDIENTS,
  SET_INGREDIENTS,
  ADD_INGREDIENT,
} from './actionTypes';

export const addIngredient = (ingredientName) => ({
  type: ADD_INGREDIENT,

  ingredientName,
});

export const removeIngredient = (ingredientName) => ({
  type: REMOVE_INGREDIENT,

  ingredientName,
});

export const setIngredients = (ingredients) => ({
  type: SET_INGREDIENTS,

  ingredients,
});

export const fetchIngredientsFailed = () => ({
  type: FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => ({
  type: INIT_INGREDIENTS,
});
