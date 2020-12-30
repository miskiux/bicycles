import { all, call, takeLatest, put } from 'redux-saga/effects';

import UserActionTypes from '../user/user.types';

import { clearFavourites } from './favourites.actions'

export function* clearCartOnSignOut() {
	yield put(clearFavourites());
}


export function* onSignOutSuccess() {
	yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}

export function* favouriteSagas() {
	yield all([
		call(onSignOutSuccess)
		])
}