import FormActionTypes from "./form.types";

const INITIAL_STATE = {
  errorObj: {},
};

const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FormActionTypes.VALIDATE_FORM:
      return {
        ...state,
        errorObj: action.payload,
      };

    default:
      return state;
  }
};

export default formReducer;
