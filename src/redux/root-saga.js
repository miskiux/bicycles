import { all, call } from 'redux-saga/effects';

import { shopSagas } from './shop/shop.sagas';
import { userSagas } from './user/user.sagas';
import { sideNavSagas } from './side-nav/side-nav.sagas';
import { sellSagas } from './sell/sell.sagas';

export default function* rootSaga() {
	yield all([
		call(shopSagas),
		call(userSagas),
		call(sideNavSagas),
		call(sellSagas)
		])
}