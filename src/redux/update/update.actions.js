import UpdateActiontypes from "./update.types";

export const imagesUpdatingStart = () => ({
  type: UpdateActiontypes.IMAGE_UPDATE_START,
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
