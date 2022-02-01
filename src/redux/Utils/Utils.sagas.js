import { takeLatest, call, put, all } from "redux-saga/effects";

import UtilsActionTypes from "./Utils.types";
import { ManufacturerListSuccess } from "src/redux/Utils/Utils.actions";
import { ManufacturerListConverter } from "src/domain/Utils/Converter/ManufacturerListConverter.js";
import { apiProvider } from "src/services/Api/Provider";

export function* getManufacturerList() {
  const manufacturerListRequests = Array.from({ length: 15 }, (_, i) => i + 1);

  const responses = yield all(
    manufacturerListRequests.map((_, i) => {
      return call(apiProvider.getManufacturerList, i);
    })
  );

  const list = yield call(ManufacturerListConverter, responses);

  yield put(ManufacturerListSuccess(list));
}

export function* onManufacturerListGet() {
  yield takeLatest(UtilsActionTypes.GET_MANUFACTURER_LIST, getManufacturerList);
}

export function* UtilsSagas() {
  yield all([call(onManufacturerListGet)]);
}
