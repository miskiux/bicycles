import UpdateActiontypes from "./update.types";

const INITIAL_STATE = {
  isLoading: false,
  userBicycles: null,
  isImageUpdating: false,
  isUrlUpdating: false,
  hasToDelete: false,
  currentId: "",
  success: false,
  isFormUpdating: false,
  snackbar: false,
  message: "",
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
        success: false,
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
        isImageUpdating: false,
        isLoading: false,
        success: true,
      };
    case UpdateActiontypes.SELECT_CURRENT:
      return {
        ...state,
        currentId: action.payload,
      };
    case UpdateActiontypes.BICYCLE_UPDATE_START:
      return {
        ...state,
        success: false,
        isFormUpdating: true,
      };
    case UpdateActiontypes.BICYCLE_UPDATE_SUCCESS:
      return {
        ...state,
        message: action.payload,
        isFormUpdating: false,
        success: true,
        snackbar: !state.snackbar,
      };
    case UpdateActiontypes.INVALID_UPDATE_FORM:
      return {
        ...state,
        message: action.payload,
        snackbar: !state.snackbar,
      };
    case UpdateActiontypes.GET_DEFAULT:
      return {
        ...state,
        success: false,
      };
    case UpdateActiontypes.TOGGLE_UPDATE_SNACKBAR:
      return {
        ...state,
        snackbar: !state.snackbar,
      };

    default:
      return state;
  }
};
export default updateReducer;
