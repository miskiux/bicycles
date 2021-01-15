import { takeLatest, call, put, all } from 'redux-saga/effects';

import SellActionTypes from './sell.types';

import {addBiciData} from '../../firebase/firebase.utils';
	//success, error

export function* uploadBicycle(additionalData) {
	try {
		yield addBiciData({additionalData})   
	} catch (error) {
		console.log(error)
	}
}

export function* onBicycleUpload() {
	yield takeLatest(SellActionTypes.BICYCLE_UPLOAD_START, uploadBicycle)
}


export function* sellSagas() {
	yield all([
		call(onBicycleUpload)
		]);
}

