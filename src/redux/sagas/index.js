import { all, call } from "redux-saga/effects";
import { watchLoadCollection } from "src/redux/sagas/shop/collection";

export default function* rootSaga() {
  yield all([call(watchLoadCollection)]);
}
