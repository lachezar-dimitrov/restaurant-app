import { updateObject, checkValidity, formConfigure } from '../../../shared/utility';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/index';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import axios from '../../../axios-orders';
import React, { useState } from 'react';
import classes from './ContactData.css';
import { connect } from 'react-redux';

const contactData = (props) => {
  const [orderForm, setOrderFrom] = useState({
    name: formConfigure('Your name'),

    street: formConfigure('Street'),

    zipCode: formConfigure('ZIP Code', 'input', 'text', '', {
      required: true,

      minLength: 3,

      maxLength: 6,
    }),

    country: formConfigure('Country'),

    email: formConfigure('Your E-Mail', 'input', 'email'),

    deliveryMethod: {
      elementType: 'select',

      elementConfig: {
        options: [
          {
            value: 'fastest',

            displayValue: 'Fastest',
          },

          {
            value: 'cheapest',

            displayValue: 'Cheapest',
          },
        ],
      },

      value: 'cheapest',

      valid: true,
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    const formData = {};

    for (const formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: props.ingredients,

      price: props.totalPrice,

      orderData: formData,

      userId: props.userId,
    };

    props.onOrderBurger(order, props.idToken);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,

      valid: checkValidity(
        event.target.value,

        orderForm[inputIdentifier].validation
      ),

      touched: true,
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;

    for (const inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }

    setOrderFrom(updatedOrderForm);

    setFormIsValid(formIsValid);
  };

  const formElementsArray = [];

  for (const key in orderForm) {
    formElementsArray.push({
      id: key,

      config: orderForm[key],
    });
  }

  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map(({ id, config }) => (
        <Input
          key={id}
          elementType={config.elementType}
          elementConfig={config.elementConfig}
          value={config.value}
          invalid={!config.valid}
          shouldValidate={config.validation}
          touched={config.touched}
          changed={(event) => inputChangedHandler(event, id)}
        />
      ))}

      <Button buttonType='Success' clicked={orderHandler} disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (props.loading) form = <Spinner />;

  return (
    <div className={classes.ContactData}>
      <h4>Enter you Contact Data</h4>

      {form}
    </div>
  );
};

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,

  totalPrice: state.burgerBuilder.totalPrice,

  loading: state.order.loading,

  idToken: state.auth.idToken,

  userId: state.auth.userId,
});

const mapDispatchToProps = (dispatch) => ({
  onOrderBurger: (orderData, idToken) => dispatch(purchaseBurger(orderData, idToken)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(contactData, axios));
