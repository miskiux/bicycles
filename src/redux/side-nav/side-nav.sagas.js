import { all, call, takeLatest, put } from "redux-saga/effects";

import UserActionTypes from "../User/user.types";

import { clearFavourites } from "./side-nav.actions";

export function* clearCartOnSignOut() {
  yield put(clearFavourites());
}

export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

export function* sideNavSagas() {
  yield all([call(onSignOutSuccess)]);
}
