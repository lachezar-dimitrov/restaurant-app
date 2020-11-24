import { updateObject, checkValidity } from '../../shared/utility.js';
import { auth, setAuthRedirectPath } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classes from './Auth.css';

const auth = ({
  onSetAuthRedirectPath,
  authRedirectPath,
  isAuthenticated,
  buildingBurger,
  loading,
  onAuth,
  error,
}) => {
  const [isSignup, setIsSignup] = useState(false);

  const [authForm, setAuthForm] = useState({
    email: {
      elementType: 'input',

      elementConfig: {
        type: 'email',

        placeholder: 'Mail Address',
      },

      value: '',

      validation: {
        required: true,

        isEmail: true,
      },

      valid: false,

      touched: false,
    },

    password: {
      elementType: 'input',

      elementConfig: {
        type: 'password',

        placeholder: 'Password',
      },

      value: '',

      validation: {
        required: true,

        minLength: 6,
      },

      valid: false,

      touched: false,
    },
  });

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') onSetAuthRedirectPath();
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(authForm, {
      [controlName]: updateObject(authForm[controlName], {
        value: event.target.value,

        valid: checkValidity(event.target.value, authForm[controlName].validation),

        touched: true,
      }),
    });

    setAuthForm(updatedControls);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const email = authForm.email.value;

    const password = authForm.password.value;

    const isSignup = isSignup;

    onAuth(email, password, isSignup);
  };

  const switchAuthModeHandler = () => setIsSignup(!isSignup);

  const formElementsArray = [];

  for (const key in authForm) {
    formElementsArray.push({
      id: key,

      config: authForm[key],
    });
  }

  let form = formElementsArray.map(({ id, config }) => (
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
  ));

  if (loading) form = <Spinner />;

  const errorMessage = error ? <p>{error.message}</p> : null;

  const authRedirect = isAuthenticated ? <Redirect to={authRedirectPath} /> : null;

  return (
    <div className={classes.Auth}>
      {authRedirect}

      {errorMessage}

      <form onSubmit={submitHandler}>
        {form}

        <Button buttonType='Success'>SUBMIT</Button>
      </form>

      <Button buttonType='Danger' clicked={switchAuthModeHandler}>
        SWITCH TO SIGN {isSignup ? 'IN' : 'UP'}
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,

  error: state.auth.error,

  isAuthenticated: state.auth.idToken !== null,

  buildingBurger: state.burgerBuilder.building,

  authRedirectPath: state.auth.authRedirectPath,
});

const mapDispatchToProps = (dispatch) => ({
  onAuth: (email, password, isSignup) => dispatch(auth(email, password, isSignup)),

  onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(auth);
