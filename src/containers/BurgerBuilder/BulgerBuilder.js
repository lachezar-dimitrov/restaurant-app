import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import Burger from '../../components/Burger/Burger';
import Modal from '../../components/UI/Modal/Modal';
import React, { Component } from 'react';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux/Aux';
import {
  setAuthRedirectPath,
  removeIngredient,
  initIngredients,
  addIngredient,
  purchaseInit,
} from '../../store/actions/index';

export class BurgerBuilder extends Component {
  state = { purchasing: false };

  componentDidMount = () => this.props.onInitIngredients();

  updatePurchasable = (ingredients) =>
    Object.values(ingredients).reduce((sum, element) => sum + element, 0) > 0;

  purchaseHandler = () => {
    if (this.props.isAuthenticated) this.setState({ purchasing: true });
    else {
      this.props.onSetRedirectPath('/checkout');

      this.props.history.push('/auth');
    }
  };

  purchaseCancelHandler = () => this.setState({ purchasing: false });

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();

    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = { ...this.props.ingredients };

    for (const key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;

    let burger = this.props.error ? <p>Ingredients cant be loaded!</p> : <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />

          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemove={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchasable(this.props.ingredients)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthenticated}
            price={this.props.totalPrice}
          />
        </Aux>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingredients}
          price={this.props.totalPrice}
          cancel={this.purchaseCancelHandler}
          continue={this.purchaseContinueHandler}
        />
      );
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
          {orderSummary}
        </Modal>

        {burger}
      </Aux>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
