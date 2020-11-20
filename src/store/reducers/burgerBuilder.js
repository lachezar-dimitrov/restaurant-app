import { updateObject } from '../../shared/utility';
import {
  ADD_INGREDIENT,
  FETCH_INGREDIENTS_FAILED,
  REMOVE_INGREDIENT,
  SET_INGREDIENTS,
} from '../actions/actionTypes';

const initialState = {
  ingredients: null,

  totalPrice: 4,

  error: false,

  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,

  bacon: 0.4,

  cheese: 1.3,

  meat: 0.7,
};

const addIngredient = (state, { ingredientName }) => {
  const updatedIngredient = { [ingredientName]: state.ingredients[ingredientName] + 1 };

  const updatedIngredients = updateObject(state.ingredients, updatedIngredient);

  const updatedState = {
    ingredients: updatedIngredients,

    totalPrice: state.totalPrice + INGREDIENT_PRICES[ingredientName],

    building: true,
  };

  return updateObject(state, updatedState);
};

const removeIngredient = (state, { ingredientName }) => {
  const removedIngredient = { [ingredientName]: state.ingredients[ingredientName] - 1 };

  const removedIngredients = updateObject(state.ingredients, removedIngredient);

  const updatedSt = {
    ingredients: removedIngredients,

    totalPrice: state.totalPrice - INGREDIENT_PRICES[ingredientName],
  };

  return updateObject(state, updatedSt);
};

const setIngredients = (state, { ingredients }) =>
  updateObject(state, {
    ingredients: ingredients,

    totalPrice: 4,

    error: false,

    building: false,
  });

const fetchIngredientsFailed = (state) => updateObject(state, { error: true });

const reducer = (state = initialState, { type, ingredientName, ingredients }) => {
  switch (type) {
    case ADD_INGREDIENT:
      return addIngredient(state, { ingredientName });

    case REMOVE_INGREDIENT:
      return removeIngredient(state, { ingredientName });

    case SET_INGREDIENTS:
      return setIngredients(state, { ingredients });

    case FETCH_INGREDIENTS_FAILED:
      return fetchIngredientsFailed(state);

    default:
      return state;
  }
};
export default reducer;
