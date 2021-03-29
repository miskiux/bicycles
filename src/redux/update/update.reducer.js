import UpdateActiontypes from "./update.types";

const INITIAL_STATE = {
  isLoading: false,
  userBicycles: null,
  isImageUpdating: false,
  isUrlUpdating: false,
  hasToDelete: false,
  currentId: "",
  success: false,
};
const updateReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UpdateActiontypes.IMAGE_DELETE_SUCCESS:
      return {
        ...state,
        hasToDelete: false,
        isUrlUpdating: true,
      };
    case UpdateActiontypes.IMAGE_UPDATE_START:
      return {
        ...state,
        isLoading: true,
        hasToDelete: action.payload.toRemove,
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
        isLoading: false,
        success: true,
      };
    case UpdateActiontypes.SELECT_CURRENT:
      return {
        ...state,
        currentId: action.payload,
      };
    default:
      return state;
  }
};
export default updateReducer;
