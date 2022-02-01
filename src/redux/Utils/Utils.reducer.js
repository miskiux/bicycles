import UtilsActionTypes from "./Utils.types";

const INITIAL_STATE = {
  manufacturerList: [],
};

const UtilsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UtilsActionTypes.ON_MANUFACTURER_LIST_SUCCESS:
      return {
        manufacturerList: action.payload,
      };

    default:
      return state;
  }
};

export default UtilsReducer;
