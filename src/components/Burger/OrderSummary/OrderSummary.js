import Button from '../../UI/Button/Button';
import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import PropTypes from 'prop-types';

class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((key) => (
      <li key={key}>
        <span style={{ textTransform: 'capitalize' }}>{key}</span>: {this.props.ingredients[key]}
      </li>
    ));

    return (
      <Aux>
        <h3>Your Order</h3>

        <p>A delicious burger with the following ingredients</p>

        <ul>{ingredientSummary}</ul>

        <p>
          <strong>Total Price: {this.props.price.toFixed(2)} USD</strong>
        </p>

        <p>Continue to checkout?</p>

        <Button buttonType='Danger' clicked={this.props.cancel}>
          CANCEL
        </Button>

        <Button buttonType='Success' clicked={this.props.continue}>
          CONTINUE
        </Button>
      </Aux>
    );
  }
}

OrderSummary.propTypes = {
  ingredients: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  cancel: PropTypes.func.isRequired,
  continue: PropTypes.func.isRequired,
};

export default OrderSummary;
