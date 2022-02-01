import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { shopReducer } from "src/redux/reducers/data/shop";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  shop: shopReducer,
});

export default persistReducer(persistConfig, rootReducer);
