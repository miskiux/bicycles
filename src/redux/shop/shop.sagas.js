import { takeLatest, call, put, all } from "redux-saga/effects";

import {
  firestore,
  getBiciDataForShop,
  deleteUserBicycleImages,
} from "../../firebase/firebase.utils";

import { getBlob } from "../../utils/getBlob";
import { getPreview } from "../../utils/getPreview";

import {
  fetchBicyclesStart,
  fetchBicyclesSuccess,
  fetchBicyclesFailure,
  deleteBicycleSuccess,
} from "./shop.actions";

import ShopActionTypes from "./shop.types";
import UpdateActionTypes from "../update/update.types";
import SellActionTypes from "../sell/sell.types";

export function* fetchBicyclesStartAsync() {
  try {
    const bicycleRef = firestore.collection("bicycle");
    const snapshot = yield bicycleRef.get();
    const bicycleMap = yield call(getBiciDataForShop, snapshot);

    const previewArr = bicycleMap.map((i) => ({
      id: i.id,
      url: i.item.url,
    }));

    const blobs = yield call(getBlob, previewArr);
    const previews = yield call(getPreview, blobs);
    const newBicycleMap = bicycleMap.map((x) => ({
      ...x,
      item: {
        ...x.item,
        preview: previews
          .filter((item) => item.id === x.id)
          .map(({ id, ...rest }) => rest),
      },
    }));

    yield put(fetchBicyclesSuccess(newBicycleMap));
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

export function* fetchNewBicycles() {
  yield put(fetchBicyclesStart());
}

export function* fetchBicycles() {
  yield takeLatest(
    ShopActionTypes.FETCH_BICYCLES_START,
    fetchBicyclesStartAsync
  );
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
    call(fetchBicycles),
    call(onBicycleDelete),
    call(onBicycleUpdateSuccess),
    call(onImageUpdateFinish),
    call(onBicycleDeleteFinish),
    call(onNewBicycleAdded),
  ]);
}
