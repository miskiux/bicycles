import { takeLatest, call, put, all } from 'redux-saga/effects';

import SellActionTypes from './sell.types';

import { addBiciData } from '../../firebase/firebase.utils';
import { uploadSuccess, submitSuccess } from './sell.actions'

//handling errors

export function* uploadBicycle(action) {
	try {
		yield addBiciData(action.payload)   
	} catch (error) {
		console.log(error)
	} finally {
		yield all([
			    put(uploadSuccess()),
			    put(submitSuccess()),
			]);
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

