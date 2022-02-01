import SellFormTypes from "./SellForm.types";
import UserActionTypes from "../../User/user.types";
import { v4 as uuidv4 } from "uuid";
import { handleInputChange } from "./SellForm.utils";
import { rules } from "src/services/Validation/ValidationsRules";
import { validate } from "./SellForm.utils";

//uzmest `${uuidv4()}` ant imgKey
const INITIAL_STATE = {
  form: {
    imgKey: "",
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
    images: [],
    email: "",
    coordinates: null,
    url: [],
  },
  step: 1,
  manufacturerOptions: [],
  marker: false,
  initalLoad: true,
  isFormSubmitting: false,
  violations: [],
  rules: {
    manufacturer: [rules.required],
    model: [rules.required],
  },
};

const sellFormReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SellFormTypes.INPUT_CHANGE:
      const { target } = action.payload;

      return {
        ...state,
        form: handleInputChange(state.form, target),
      };
    case SellFormTypes.SET_STEP:
      return {
        ...state,
        step: action.step,
      };
    case UserActionTypes.GET_USER_DATA:
      return {
        ...state,
        form: {
          ...state.form,
          email: action.payload.email,
          userId: action.payload.id,
        },
      };
    case SellFormTypes.SET_MAP_MARKER:
      return {
        ...state,
        marker: true,
      };

    case SellFormTypes.GET_MANUFACTURER_LIST_FINISH:
      return {
        ...state,
        initalLoad: false,
        manufacturerOptions: action.list,
      };

    case SellFormTypes.VALIDATE_ALL_FIELDS:
      return {
        ...state,
        violations: validate(state.rules, state.form),
      };

    case SellFormTypes.CLEAN_UP:
      return {
        INITIAL_STATE,
      };

    default:
      return state;
  }
};

export default sellFormReducer;
