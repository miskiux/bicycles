import { takeLatest, call, put, all } from "redux-saga/effects";

import SellActionTypes from "./sell.types";

import { addBiciData } from "../../firebase/firebase.utils";
import { uploadSuccess, submitError } from "./sell.actions";

//handling errors

export function* uploadBicycle(action) {
  try {
    //yield addBiciData(action.payload);
    yield put(uploadSuccess("Your bicycle has been submitted"));
  } catch (error) {
    yield put(submitError("Something went wrong... Try again"));
  }
}

export function* onBicycleUpload() {
  yield takeLatest(SellActionTypes.BICYCLE_UPLOAD_START, uploadBicycle);
}

export function* sellSagas() {
  yield all([call(onBicycleUpload)]);
}
