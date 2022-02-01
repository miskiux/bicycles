import { takeLatest, call, put, all } from "redux-saga/effects";

import { firestore, deleteUserBicycleImages } from "src/firebase";

import { ShopListConverter } from "src/domain/Shop/Bicycles/Converter/ShopListConverter";
import { GetShopListCommand } from "src/domain/Shop/Collection/Command/GetCollectionCommand";

import {
  fetchBicyclesSuccess,
  fetchBicyclesFailure,
  deleteBicycleSuccess,
} from "./Shop.actions";

import ShopActionTypes from "./Shop.types";
import UpdateActionTypes from "../BicycleUpdate/update.types";
import SellActionTypes from "src/redux/SellStore/sell.types";

export function* getShopListAsync({ payload }) {
  const { shopType } = payload;

  try {
    const listRef = yield call(GetShopListCommand, payload);
    const listItems = yield call(ShopListConverter, listRef, shopType);

    const lastVisible = listRef.docs[listRef.docs.length - 1];

    yield put(
      fetchBicyclesSuccess({
        list: listItems,
        lastVisible: lastVisible ?? null,
      })
    );
  } catch (error) {
    yield put(fetchBicyclesFailure(error.message));
  }
}

export function* deleteBicycle({ payload: { imgKey, id } }) {
  try {
    const bicycleRef = firestore.collection("bicycle").doc(id);
    bicycleRef.delete();

    yield call(deleteUserBicycleImages, imgKey);
    yield put(deleteBicycleSuccess());
  } catch (error) {
    console.log(error);
  }
}

///
/// WATCHERS
///

export function* fetchNewBicycles() {
  yield put(getShopList());
}

export function* getShopList() {
  yield takeLatest(ShopActionTypes.GET_LIST, getShopListAsync);
}

export function* onBicycleDelete() {
  yield takeLatest(ShopActionTypes.DELETE_BICYCLE_START, deleteBicycle);
}

export function* onBicycleUpdateSuccess() {
  yield takeLatest(UpdateActionTypes.BICYCLE_UPDATE_SUCCESS, fetchNewBicycles);
}

export function* onImageUpdateFinish() {
  yield takeLatest(
    UpdateActionTypes.IMAGE_URL_UPDATE_SUCCESS,
    fetchNewBicycles
  );
}

export function* onNewBicycleAdded() {
  yield takeLatest(SellActionTypes.SUBMIT_SUCCESS, fetchNewBicycles);
}

export function* onBicycleDeleteFinish() {
  yield takeLatest(ShopActionTypes.GET_DELETE_DEFAULT, fetchNewBicycles);
}

export function* shopSagas() {
  yield all([
    call(getShopList),
    call(onBicycleDelete),
    call(onBicycleUpdateSuccess),
    call(onImageUpdateFinish),
    call(onBicycleDeleteFinish),
    call(onNewBicycleAdded),
  ]);
}
