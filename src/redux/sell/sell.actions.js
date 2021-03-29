import SellActionTypes from "./sell.types";

export const imageUploadSuccess = () => ({
  type: SellActionTypes.IMAGE_UPLOAD_SUCCESS,
});

export const bicycleUploadStart = (additionalData) => ({
  type: SellActionTypes.BICYCLE_UPLOAD_START,
  payload: additionalData,
});

export const imageUploadStart = () => ({
  type: SellActionTypes.IMAGE_UPLOAD_START,
});

export const uploadSuccess = (successMesssage) => ({
  type: SellActionTypes.UPLOAD_FINISHED,
  payload: successMesssage,
});

export const submitError = (errorMessage) => ({
  type: SellActionTypes.SUBMIT_ERROR,
  payload: errorMessage,
});

export const toggleSnackBar = () => ({
  type: SellActionTypes.TOGGLE_SNACK,
});
export const invalidForm = (errorMessage) => ({
  type: SellActionTypes.INVALID_FORM,
  payload: errorMessage,
});

export const openSell = () => ({
  type: SellActionTypes.OPEN_SELL,
});
