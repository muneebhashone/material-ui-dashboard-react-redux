import { UserActionTypes } from './user.types';

export const setCurrentUser = (state) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: state
});

export const signInStart = (credentials) => ({
  type: UserActionTypes.SIGN_IN_START,
  payload: credentials
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGN_IN_SUCCESS,
  payload: user
});

export const signInFailure = (error) => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
});

export const clearCurrentUser = () => ({
  type: UserActionTypes.CLEAR_CURRENT_USER
});

export const signUpStart = (data) => ({
  type: UserActionTypes.SIGN_UP_START,
  payload: data
});

export const signUpFailure = (errorMessage) => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: errorMessage
});

export const signUpSuccess = (data) => ({
  type: UserActionTypes.SIGN_UP_SUCCESS,
  payload: data
});

export const userMutationStart = (data) => ({
  type: UserActionTypes.USER_MUTATION_START,
  payload: data
});

export const userMutationFailure = (error) => ({
  type: UserActionTypes.USER_MUTATION_FAILURE,
  payload: error
});

export const userMutationSuccess = (currentUser) => ({
  type: UserActionTypes.USER_MUTATION_FAILURE,
  payload: currentUser
});
