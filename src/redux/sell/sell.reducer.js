import SellActionTypes from "./sell.types";

const INITIAL_STATE = {
  imagesLoading: false,
  isBicycleUploading: false,
  message: undefined,
  isLoading: false,
  submitSuccess: false,
  submitFailure: false,
  snackbar: false,
  openModal: false,
};

//on IMAGE_UPLOAD_ERRROR => isBicycleUploadFalse
const sellReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SellActionTypes.OPEN_SELL:
      return {
        ...state,
        openModal: !state.openModal,
      };
    case SellActionTypes.IMAGE_UPLOAD_SUCCESS:
      return {
        ...state,
        isBicycleUploading: true,
        imagesLoading: false,
      };
    case SellActionTypes.IMAGE_UPLOAD_START:
      return {
        ...state,
        imagesLoading: true,
        isLoading: true,
      };
    case SellActionTypes.UPLOAD_FINISHED:
      return {
        ...state,
        isLoading: false,
        isBicycleUploading: false,
        submitSuccess: true,
        message: action.payload,
        snackbar: true,
      };
    case SellActionTypes.SUBMIT_ERROR:
      return {
        ...state,
        isLoading: false,
        isBicycleUploading: false,
        submitFailure: true,
        message: action.payload,
        snackbar: true,
      };
    case SellActionTypes.TOGGLE_SNACK:
      return {
        ...state,
        snackbar: !state.snackbar,
      };
    case SellActionTypes.INVALID_FORM:
      return {
        ...state,
        message: action.payload,
        snackbar: true,
      };
    default:
      return state;
  }
};

export default sellReducer;
