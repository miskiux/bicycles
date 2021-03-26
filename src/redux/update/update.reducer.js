import UpdateActiontypes from "./update.types";

const INITIAL_STATE = {
  userBicycles: null,
  isImageUpdating: false,
  isUrlUpdating: false,
};
const updateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UpdateActiontypes.IMAGE_UPDATE_START:
      return {
        ...state,
        isImageUpdating: true,
      };
    case UpdateActiontypes.IMAGE_UPDATE_SUCCESS:
      return {
        ...state,
        isImageUpdating: false,
        isUrlUpdating: true,
      };
    case UpdateActiontypes.IMAGE_URL_UPDATE_SUCCESS:
      return {
        ...state,
        isUrlUpdating: false,
      };
    default:
      return state;
  }
};

export default updateReducer;
