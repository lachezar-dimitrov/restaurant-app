import {
  SET_AUTH_REDIRECT_PATH,
  AUTH_INITIATE_LOGOUT,
  AUTH_CHECK_TIMEOUT,
  AUTH_SUCCESS,
  AUTH_LOGOUT,
  AUTH_START,
  AUTH_FAIL,
  AUTH_USER,
} from './actionTypes';

const authStart = () => ({
  type: AUTH_START,
});

export const authSuccess = (idToken, userId) => ({
  type: AUTH_SUCCESS,

  idToken,

  userId,
});

export const authFail = (error) => ({
  type: AUTH_FAIL,

  error,
});

export const logout = () => ({
  type: AUTH_INITIATE_LOGOUT,
});

export const logoutSucceed = () => ({
  type: AUTH_LOGOUT,
});

export const checkAuthTimeout = (expirationTime) => ({
  type: AUTH_CHECK_TIMEOUT,

  expirationTime,
});

export const auth = (email, password, isSignup) => ({
  type: AUTH_USER,

  email,

  password,

  isSignup,
});

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
