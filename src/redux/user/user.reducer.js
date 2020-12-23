import UserActionTypes from './user.types';

// reducer receives an initial state and action(to transform the state)
const INITIAL_STATE = {
  currentUser: null,
  error: null
};

//state gets a default parameter,in a case, to default back to INITIAL_STATE
//must return an object
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
    case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
    case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
    return {
      ...state,
      error: action.payload
    }
    default:
      return state;
  }
};

export default userReducer;
