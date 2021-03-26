import { takeLatest, call, put } from "redux-saga/effects";

import { updateUserBicycleImageUrl } from "../../firebase/firebase.utils";

import { imageUrlUpdateSuccess } from "./update.actions";

import UpdateActionTypes from "./update.types";

export function* updateImageUrls({ payload: { id, url } }) {
  try {
    yield call(updateUserBicycleImageUrl, id, url);
    yield put(imageUrlUpdateSuccess());
  } catch (error) {
    console.log(error);
  }
}

export function* onImageFetchStart() {
  yield takeLatest(UpdateActionTypes.IMAGE_URL_UPDATE_START, updateImageUrls);
}

export function* updateSagas() {
  yield call(onImageFetchStart);
}
