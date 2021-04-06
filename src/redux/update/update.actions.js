import UpdateActiontypes from "./update.types";

//has to have imgKey, url, and boolean whether to delete
export const imagesUpdatingStart = (data) => ({
  type: UpdateActiontypes.IMAGE_UPDATE_START,
  payload: data,
});

export const imagesUpdatingSuccess = () => ({
  type: UpdateActiontypes.IMAGE_UPDATE_SUCCESS,
});

export const imageUrlUpdateStart = (url) => ({
  type: UpdateActiontypes.IMAGE_URL_UPDATE_START,
  payload: url,
});

export const imageUrlUpdateSuccess = () => ({
  type: UpdateActiontypes.IMAGE_URL_UPDATE_SUCCESS,
});

export const imagesDeleteStart = (url) => ({
  type: UpdateActiontypes.IMAGE_DELETE_START,
  payload: url,
});

export const imagesDeleteSuccess = () => ({
  type: UpdateActiontypes.IMAGE_DELETE_SUCCESS,
});

export const selectCurrent = (payload) => ({
  type: UpdateActiontypes.SELECT_CURRENT,
  payload,
});

export const bicycleUpdateStart = (values) => ({
  type: UpdateActiontypes.BICYCLE_UPDATE_START,
  payload: values,
});

export const bicycleUpdateSuccess = (successMessage) => ({
  type: UpdateActiontypes.BICYCLE_UPDATE_SUCCESS,
  payload: successMessage,
});

export const invalidUpdateForm = (errorMessage) => ({
  type: UpdateActiontypes.INVALID_UPDATE_FORM,
  payload: errorMessage,
});

export const getDefault = () => ({
  type: UpdateActiontypes.GET_DEFAULT,
});

export const toggleSnackBar = () => ({
  type: UpdateActiontypes.TOGGLE_UPDATE_SNACKBAR,
});
