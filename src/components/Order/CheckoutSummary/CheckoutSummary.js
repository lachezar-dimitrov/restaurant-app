import React from 'react';

import classes from './CheckoutSummary.css';
import Button from '../../UI/Button/Button';
import Burger from '../../Burger/Burger';
import PropTypes from 'prop-types';

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>

      <div style={{ width: '100%', margin: 'auto' }}>
        <Burger ingredients={props.ingredients} />
      </div>

      <Button buttonType='Danger' clicked={props.checkoutCancelled}>
        CANCEL
      </Button>

      <Button buttonType='Success' clicked={props.checkoutContinued}>
        CONTINUE
      </Button>
    </div>
  );
};

CheckoutSummary.propTypes = {
  ingredients: PropTypes.object,

  checkoutCancelled: PropTypes.func.isRequired,

  checkoutContinued: PropTypes.func.isRequired,
};

export default CheckoutSummary;
