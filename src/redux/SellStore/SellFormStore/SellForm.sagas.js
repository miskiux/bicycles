import { takeLatest, call, put, all } from "redux-saga/effects";

import SellFormTypes from "./SellForm.types";
import { getManufacturerListFinish } from "./SellForm.actions";
import { apiProvider } from "src/services/Api/Provider";

export function* getManufacturerList() {
  const list = [];

  const manufacturerListRequests = Array.from({ length: 15 }, (_, i) => i + 1);

  const responses = yield all(
    manufacturerListRequests.map((_, i) => {
      return call(apiProvider.getManufacturerList, i);
    })
  );

  list.push(...responses);

  yield put(getManufacturerListFinish(list.flat()));
}

export function* onManufacturerListGet() {
  yield takeLatest(
    SellFormTypes.GET_MANUFACTURER_LIST_START,
    getManufacturerList
  );
}

export function* sellFormSagas() {
  yield all([call(onManufacturerListGet)]);
}
