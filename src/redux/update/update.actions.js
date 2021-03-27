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
