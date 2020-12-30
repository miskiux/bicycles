import { all, call } from 'redux-saga/effects';

import { fetchBicyclesStart } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { favouriteSagas } from './favourites/favourites.sagas'

export default function* rootSaga() {
	yield all([
		call(fetchBicyclesStart),
		call(userSagas),
		call(favouriteSagas)
		])
}