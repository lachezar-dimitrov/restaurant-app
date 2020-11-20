import reducer from './auth';
import { AUTH_SUCCESS } from '../actions/actionTypes';

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      idToken: null,

      userId: null,

      error: null,

      loading: false,

      authRedirectPath: '/',
    });
  });

  it('should store the token upon login', () => {
    expect(
      reducer(
        {
          idToken: null,

          userId: null,

          error: null,

          loading: false,

          authRedirectPath: '/',
        },
        { type: AUTH_SUCCESS, idToken: 'mock-token', userId: 'mock-user-id' }
      )
    ).toEqual({
      idToken: 'mock-token',

      userId: 'mock-user-id',

      error: null,

      loading: false,

      authRedirectPath: '/',
    });
  });
});
