import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import sideNavReducer from "./side-nav/side-nav.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer from "./shop/shop.reducer";
import sellReducer from "./sell/sell.reducer";
import updateReducer from "./update/update.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "shop", "sidenav"],
};

const rootReducer = combineReducers({
  user: userReducer,
  sidenav: sideNavReducer,
  directory: directoryReducer,
  shop: shopReducer,
  sell: sellReducer,
  update: updateReducer,
});

export default persistReducer(persistConfig, rootReducer);
