import { UserActionTypes } from './user.types';

// reducer receives an initial state and action(to transform the state)
const INITIAL_STATE = {
  currentUser: null,
};

//state gets a default parameter,in a case, to default back to INITIAL_STATE
//must return an object
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
