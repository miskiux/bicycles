//sagas listenting to actions

//saga middleware to run sagas concurrently - to run them all together
// takeEvery () => listens for every action of a specific type we pass to it. creates a non blocking code. to continue running other sagas
// takeLatest () =>

// call => invokes the method
//put => dispatches an action 

import { takeEvery, call, put } from 'redux-saga/effects';

import {firestore, getBiciDataForShop} from '../../firebase/firebase.utils';

import {
	fetchBicyclesSuccess,
	fetchBicyclesFailure
} from './shop.actions';

import ShopActionTypes from './shop.types';


export function* fetchBicyclesStartAsync() {
	yield console.log('I am fired')
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

export function* fetchBicyclesStart() {
	yield takeEvery(
		ShopActionTypes.FETCH_BICYCLES_START, 
		fetchBicyclesStartAsync
	) //2nd param -> another generator function that will run in response to takeEvery listener
}


