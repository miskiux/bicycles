import UserActionTypes from './user.types';

// reducer receives an initial state and action(to transform the state)
const INITIAL_STATE = {
  currentUser: null,
  error: null,
  welcomePopUp: false
};

//state gets a default parameter,in a case, to default back to INITIAL_STATE
//must return an object
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      }
    case UserActionTypes.REDIRECT:
      return {
        ...state,
        redirectTo: action.payload
      }
    case UserActionTypes.SHOW_SUCCESS:
      return {
        ...state,
        welcomePopUp: action.payload
      }
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
    return {
      ...state,
      error: action.payload
    }
    default:
      return state;
  }
};

export default userReducer;
