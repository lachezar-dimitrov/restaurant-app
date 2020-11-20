import axios from 'axios';
import {
  SET_AUTH_REDIRECT_PATH,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_FAIL,
} from './actionTypes';

const authStart = () => ({
  type: AUTH_START,
});

const authSuccess = (idToken, userId) => ({
  type: AUTH_SUCCESS,

  idToken,

  userId,
});

const authFail = (error) => ({
  type: AUTH_FAIL,

  error,
});

export const logout = () => {
  localStorage.removeItem('idToken');

  localStorage.removeItem('expirationDate');

  localStorage.removeItem('userId');

  return { type: AUTH_LOGOUT };
};

const checkAuthTimeout = (expirationTime) => (dispatch) =>
  setTimeout(() => dispatch(logout()), expirationTime * 1000);

export const auth = (email, password, isSignup) => (dispatch) => {
  dispatch(authStart());

  const BASE_AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:`;

  const SIGN_UP_KEY_WORD = `signUp?key=`;

  const SIGN_IN_KEY_WORD = `signInWithPassword?key=`;

  const API_KEY = 'AIzaSyBNdxQdmYvI80d4nPxW60s4OCuwGkrgVpY';

  let URL = BASE_AUTH_URL;

  isSignup ? (URL += SIGN_UP_KEY_WORD) : (URL += SIGN_IN_KEY_WORD);

  URL += API_KEY;

  const authData = {
    email,

    password,

    returnSecureToken: true,
  };

  axios

    .post(URL, authData)

    .then(({ data }) => {
      const expiresIn = data.expiresIn;

      const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

      localStorage.setItem('expirationDate', expirationDate);

      localStorage.setItem('idToken', data.idToken);

      localStorage.setItem('userId', data.localId);

      dispatch(authSuccess(data.idToken, data.localId));

      dispatch(checkAuthTimeout(expiresIn));
    })

    .catch(({ response }) => dispatch(authFail(response.data.error)));
};

export const setAuthRedirectPath = (authRedirectPath) => ({
  type: SET_AUTH_REDIRECT_PATH,

  authRedirectPath,
});

export const authCheckState = () => (dispatch) => {
  const idToken = localStorage.getItem('idToken');

  if (!idToken) dispatch(logout());
  else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));

    const now = new Date();

    if (expirationDate <= now) {
      dispatch(logout());
    } else {
      const userId = localStorage.getItem('userId');

      dispatch(authSuccess(idToken, userId));

      dispatch(checkAuthTimeout((expirationDate.getTime() - now.getTime()) / 1000));
    }
  }
};
