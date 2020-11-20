import { updateObject } from '../../shared/utility';
import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT_PATH,
} from '../actions/actionTypes';

const initialState = {
  idToken: null,

  userId: null,

  error: null,

  loading: false,

  authRedirectPath: '/',
};

const authStart = (state) => updateObject(state, { error: null, loading: true });

const authSuccess = (state, { idToken, userId }) =>
  updateObject(state, { idToken, userId, error: null, loading: false });

const authFail = (state, { error }) => updateObject(state, { error, loading: false });

const authLogout = (state) => updateObject(state, { idToken: null, userId: null });

const setAuthRedirectPath = (state, { authRedirectPath }) =>
  updateObject(state, { authRedirectPath });

const reducer = (state = initialState, { type, idToken, userId, error, authRedirectPath }) => {
  switch (type) {
    case AUTH_START:
      return authStart(state);

    case AUTH_SUCCESS:
      return authSuccess(state, { idToken, userId });

    case AUTH_FAIL:
      return authFail(state, { error });

    case AUTH_LOGOUT:
      return authLogout(state);

    case SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, { authRedirectPath });

    default:
      return state;
  }
};

export default reducer;
