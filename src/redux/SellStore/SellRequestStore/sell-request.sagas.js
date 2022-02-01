import { takeLatest, call, put, all } from "redux-saga/effects";

import SellActionTypes from "src/redux/SellStore/sell.types";

import { addBiciData } from "../../../firebase";
import { uploadSuccess, submitError } from "./sell-request.actions";

export function* uploadBicycle(action) {
  try {
    yield addBiciData(action.payload);
    yield put(uploadSuccess("Bicycle submitted"));
  } catch (error) {
    yield put(submitError("Something went wrong... Try again"));
  }
}

export function* onBicycleUpload() {
  yield takeLatest(SellActionTypes.BICYCLE_UPLOAD_START, uploadBicycle);
}

export function* sellRequestSagas() {
  yield all([call(onBicycleUpload)]);
}
