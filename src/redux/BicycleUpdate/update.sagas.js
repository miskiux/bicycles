import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  updateUserBicycleImageUrl,
  deleteSpecificImage,
  updateUserBicycle,
} from "../../firebase";

import {
  imageUrlUpdateSuccess,
  imagesDeleteSuccess,
  bicycleUpdateSuccess,
} from "./update.actions";

import UpdateActionTypes from "./update.types";

export function* updateImageUrls({ payload: { id, url } }) {
  try {
    yield call(updateUserBicycleImageUrl, id, url);
    yield put(imageUrlUpdateSuccess());
  } catch (error) {
    console.log(error);
  }
}
//removed imgKey, remove it also from the action

export function* deleteImage({ payload: { url, toRemove } }) {
  if (toRemove) {
    try {
      yield call(deleteSpecificImage, url);

      yield put(imagesDeleteSuccess());
    } catch (error) {
      console.log(error);
    }
  }
}

export function* updateBicycle({ payload: { id, update } }) {
  yield call(updateUserBicycle, id, update);
  yield put(bicycleUpdateSuccess("Update Success"));
}

export function* onBicycleUpdate() {
  yield takeLatest(UpdateActionTypes.BICYCLE_UPDATE_START, updateBicycle);
}

export function* onImageUrlUpdate() {
  yield takeLatest(UpdateActionTypes.IMAGE_URL_UPDATE_START, updateImageUrls);
}
export function* onImageDeleteStart() {
  yield takeLatest(UpdateActionTypes.IMAGE_UPDATE_START, deleteImage);
}

export function* updateSagas() {
  yield all([
    call(onImageUrlUpdate),
    call(onImageDeleteStart),
    call(onBicycleUpdate),
  ]);
}
