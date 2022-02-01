import { all, call } from "redux-saga/effects";

import { shopSagas } from "./Shop/Shop.sagas";
import { userSagas } from "./User/user.sagas";
import { sideNavSagas } from "./side-nav/side-nav.sagas";
import { sellRequestSagas } from "./SellStore/SellRequestStore/sell-request.sagas";
import { updateSagas } from "./BicycleUpdate/update.sagas";
import { sellFormSagas } from "src/redux/SellStore/SellFormStore/SellForm.sagas";
import { UtilsSagas } from "./Utils/Utils.sagas";

export default function* rootSaga() {
  yield all([
    call(shopSagas),
    call(userSagas),
    call(sideNavSagas),
    call(sellRequestSagas),
    call(sellFormSagas),
    call(updateSagas),
    call(UtilsSagas),
  ]);
}
