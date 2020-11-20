import { updateObject, checkValidity } from '../../shared/utility.js';
import { auth, setAuthRedirectPath } from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner.js';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { Redirect } from 'react-router-dom';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './Auth.css';
class Auth extends Component {
  state = {
    controls: {
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
    },

    isSignup: true,
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/')
      this.props.onSetAuthRedirectPath();
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,

        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),

        touched: true,
      }),
    });

    this.setState({ controls: updatedControls });
  };

  submitHandler = (event) => {
    event.preventDefault();

    const email = this.state.controls.email.value;

    const password = this.state.controls.password.value;

    const isSignup = this.state.isSignup;

    this.props.onAuth(email, password, isSignup);
  };

  switchAuthModeHandler = () =>
    this.setState((previousState) => ({ isSignup: !previousState.isSignup }));

  render() {
    const formElementsArray = [];

    for (const key in this.state.controls) {
      formElementsArray.push({
        id: key,

        config: this.state.controls[key],
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
        changed={(event) => this.inputChangedHandler(event, id)}
      />
    ));

    if (this.props.loading) form = <Spinner />;

    const errorMessage = this.props.error ? <p>{this.props.error.message}</p> : null;

    const authRedirect = this.props.isAuthenticated ? (
      <Redirect to={this.props.authRedirectPath} />
    ) : null;

    return (
      <div className={classes.Auth}>
        {authRedirect}

        {errorMessage}

        <form onSubmit={this.submitHandler}>
          {form}

          <Button buttonType='Success'>SUBMIT</Button>
        </form>

        <Button buttonType='Danger' clicked={this.switchAuthModeHandler}>
          SWITCH TO SIGN {this.state.isSignup ? 'IN' : 'UP'}
        </Button>
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
