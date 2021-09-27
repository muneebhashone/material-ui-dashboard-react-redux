import { UserActionTypes } from './user.types';

const INITIAL_STATE = {
  currentUser: null,
  error: '',
  isFetching: false
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
    case UserActionTypes.SIGN_IN_SUCCESS:
    case UserActionTypes.USER_MUTATION_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: '',
        isFetching: false
      };

    case UserActionTypes.SIGN_IN_START:
    case UserActionTypes.USER_MUTATION_START:
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        error: '',
        isFetching: true
      };

    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    case UserActionTypes.USER_MUTATION_FAILURE:
      return {
        ...state,
        error: action.payload,
        isFetching: false
      };

    case UserActionTypes.CLEAR_CURRENT_USER:
      return {
        ...state,
        currentUser: null,
        error: null
      };

    default:
      return {
        ...state
      };
  }
};

export default userReducer;
