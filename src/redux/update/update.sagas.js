import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  updateUserBicycleImageUrl,
  deleteSpecificImage,
} from "../../firebase/firebase.utils";

import { imageUrlUpdateSuccess, imagesDeleteSuccess } from "./update.actions";

import UpdateActionTypes from "./update.types";

export function* updateImageUrls({ payload: { id, url } }) {
  try {
    yield call(updateUserBicycleImageUrl, id, url);
    yield put(imageUrlUpdateSuccess());
  } catch (error) {
    console.log(error);
  }
}

//image_update_start runs this even if uneccessary, add extra control
export function* deleteImage({ payload: { imgKey, url, toRemove } }) {
  if (toRemove) {
    try {
      yield call(deleteSpecificImage, imgKey, url);
      // run this to start uploading images if needed
      yield put(imagesDeleteSuccess());
    } catch (error) {
      console.log(error);
    }
  }
}

export function* onImageUrlUpdate() {
  yield takeLatest(UpdateActionTypes.IMAGE_URL_UPDATE_START, updateImageUrls);
}
export function* onImageDeleteStart() {
  yield takeLatest(UpdateActionTypes.IMAGE_UPDATE_START, deleteImage);
}

export function* updateSagas() {
  yield all([call(onImageUrlUpdate), call(onImageDeleteStart)]);
}
