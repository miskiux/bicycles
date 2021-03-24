import FormActionTypes from "./form.types";

const INITIAL_STATE = {
  userId: "",
  bicycleType: "",
  subCategory: "",
  description: [],
  info: "",
  size: "",
  condition: "",
  gender: "",
  manufacturer: "",
  model: "",
  price: "",
  year: "",
  phone: "",
  address: "",
  image: [],
  email: "",
  coordinates: null,
};

const formReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FormActionTypes.UPDATE_FORM:
      return {
        ...state,
        [Object.keys(action.payload)]: Object.values(action.payload),
      };

    default:
      return state;
  }
};

export default formReducer;
