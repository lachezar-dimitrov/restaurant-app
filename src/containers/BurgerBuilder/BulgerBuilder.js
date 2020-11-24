import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import React, { useState, useEffect } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import {
  setAuthRedirectPath,
  removeIngredient,
  initIngredients,
  addIngredient,
  purchaseInit,
} from '../../store/actions/index';

export const burgerBuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => props.onInitIngredients(), []);

  const updatePurchasable = (ingredients) =>
    Object.values(ingredients).reduce((sum, element) => sum + element, 0) > 0;

  const purchaseHandler = () => {
    if (props.isAuthenticated) setPurchasing(true);
    else {
      props.onSetRedirectPath('/checkout');

      props.history.push('/auth');
    }
  };

  const purchaseCancelHandler = () => setPurchasing(false);

  const purchaseContinueHandler = () => {
    props.onInitPurchase();

    props.history.push('/checkout');
  };

  const disabledInfo = { ...props.ingredients };

  for (const key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = null;

  let burger = props.error ? <p>Ingredients cant be loaded!</p> : <Spinner />;

  if (props.ingredients) {
    burger = (
      <>
        <Burger ingredients={props.ingredients} />

        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemove={props.onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchasable(props.ingredients)}
          ordered={purchaseHandler}
          isAuth={props.isAuthenticated}
          price={props.totalPrice}
        />
      </>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ingredients}
        price={props.totalPrice}
        cancel={purchaseCancelHandler}
        continue={purchaseContinueHandler}
      />
    );
  }

  return (
    <>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>

      {burger}
    </>
  );
};

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,

  totalPrice: state.burgerBuilder.totalPrice,

  error: state.burgerBuilder.error,

  isAuthenticated: state.auth.idToken !== null,
});

const mapDispatchToProps = (dispatch) => ({
  onIngredientAdded: (ingredientName) => dispatch(addIngredient(ingredientName)),

  onIngredientRemoved: (ingredientName) => dispatch(removeIngredient(ingredientName)),

  onInitIngredients: () => dispatch(initIngredients()),

  onInitPurchase: () => dispatch(purchaseInit()),

  onSetRedirectPath: (authRedirectPath) => dispatch(setAuthRedirectPath(authRedirectPath)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(burgerBuilder, axios));
