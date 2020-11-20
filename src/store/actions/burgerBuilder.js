import axios from '../../axios-orders';
import {
  FETCH_INGREDIENTS_FAILED,
  REMOVE_INGREDIENT,
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

const setIngredients = (ingredients) => ({
  type: SET_INGREDIENTS,

  ingredients,
});

const fetchIngredientsFailed = () => ({
  type: FETCH_INGREDIENTS_FAILED,
});

export const initIngredients = () => (dispatch) =>
  axios

    .get('/ingredients.json')

    .then((response) => dispatch(setIngredients(response.data)))

    .catch((error) => dispatch(fetchIngredientsFailed()));
