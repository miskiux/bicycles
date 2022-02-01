import { call, takeLatest } from "redux-saga/effects";

import * as common from "src/redux/sagas/common";
import { collection, COLLECTION } from "src/redux/actions/shop/collection";
import { GetCollectionCommand } from "src/domain/Shop/Collection/Command/GetCollectionCommand";

const { fetchEntity } = common;

const getCollection = fetchEntity.bind(null, collection, GetCollectionCommand);

function* loadCollection({ urlParams }) {
  yield call(getCollection, urlParams);
}

export function* watchLoadCollection() {
  yield takeLatest(COLLECTION.REQUEST, loadCollection);
}
