import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./User/user.reducer";
import sideNavReducer from "./side-nav/side-nav.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./Shop/Shop.reducer";
import sellRequestReducer from "./SellStore/SellRequestStore/sell-request.reducer";
import sellFormReducer from "./SellStore/SellFormStore/SellForm.reducer";
import updateReducer from "./BicycleUpdate/update.reducer";
import modalReducer from "./ModalStore/Modal.reducer";
import UtilsReducer from "./Utils/Utils.reducer";
import UIReducer from "./UI/UI.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "sidenav", "update", "Utils"],
};

const rootReducer = combineReducers({
  user: userReducer,
  sidenav: sideNavReducer,
  directory: directoryReducer,
  shop: shopReducer,
  sell: sellRequestReducer,
  update: updateReducer,
  sellForm: sellFormReducer,
  modal: modalReducer,
  UI: UIReducer,
  Utils: UtilsReducer,
});

export default persistReducer(persistConfig, rootReducer);
