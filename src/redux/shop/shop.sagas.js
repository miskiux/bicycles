//sagas listenting to actions

// saga middleware to run sagas concurrently - to run them all together
// takeEvery () => listens for every action of a specific type we pass to it. creates a non blocking code. to continue running other sagas
// takeLatest () => issuing API call one time

// call => invokes the method
//put => dispatches an action 

import { takeLatest, call, put, all } from 'redux-saga/effects';

import { firestore, getBiciDataForShop, deleteUserBicycleImages, updateUserBicycle } from '../../firebase/firebase.utils';
import {storage} from "../../firebase/firebase.utils";

import {
	fetchBicyclesSuccess,
	fetchBicyclesFailure,
	deleteBicycleSuccess,
	hasBicycleDeleted,
	bicycleUpdateSuccess,
} from './shop.actions';

import ShopActionTypes from './shop.types';

export function* fetchBicyclesStartAsync() {
	try {
		const bicycleRef = firestore.collection("bicycle");
		const snapshot = yield bicycleRef.get();
		const bicycleMap = yield call(
			getBiciDataForShop,
			snapshot
			);
		yield put(fetchBicyclesSuccess(bicycleMap))
	} catch (error) {
		yield put(fetchBicyclesFailure(error.message))
	}
}

export function* deleteBicycle({payload:{key, id}}) {

			try {
				const bicycleRef = firestore.collection("bicycle").doc(id);
				const bicycleDelete = bicycleRef.delete();

				yield all([
				  call(deleteUserBicycleImages, key),
				  call(bicycleDelete)
				])

			} catch (error) {
				console.log(error)
			} finally {
				yield all([
				    put(deleteBicycleSuccess()),
				    put(hasBicycleDeleted()),
				]);

			}
}

export function* updateBicycle({payload: {id, data}}) {
	const update = yield call(updateUserBicycle, id, data)
	yield put(bicycleUpdateSuccess())

}

export function* fetchBicyclesStart() {
	yield takeLatest(
		ShopActionTypes.FETCH_BICYCLES_START, 
		fetchBicyclesStartAsync
	) 
}

export function* onBicycleDelete () {
	yield takeLatest(
		ShopActionTypes.DELETE_BICYCLE_START,
		deleteBicycle
		)
}

export function* onBicycleUpdate() {
	yield takeLatest(ShopActionTypes.BICYCLE_UPDATE_START, updateBicycle)
}

export function* onBicycleUpdateSuccess() {
	yield takeLatest(ShopActionTypes.BICYCLE_UPDATE_SUCCESS, fetchBicyclesStartAsync)
}

export function* shopSagas() {
	yield all([
		call(fetchBicyclesStart),
		call(onBicycleDelete),
		call(onBicycleUpdate),
		call(onBicycleUpdateSuccess)
		]);
}

