import { fetchIngredientsFailed, setIngredients } from '../actions';
import { put } from 'redux-saga/effects';
import axios from '../../axios-orders';

export function* initIngredientsSaga() {
  try {
    const { data } = yield axios.get('/ingredients.json');

    yield put(setIngredients(data));
  } catch (error) {
    yield put(fetchIngredientsFailed());
  }
}
