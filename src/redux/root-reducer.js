import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer';
import favouritesReducer from './favourites/favourites.reducer';
import directoryReducer from './directory/directory.reducer';
import shopReducer from './shop/shop.reducer';
import sellReducer from './sell/sell.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['favourites', 'user']
}

const rootReducer = combineReducers({
	user: userReducer, 
	favourites: favouritesReducer,
	directory: directoryReducer,
	shop: shopReducer,
	sell: sellReducer,

})

export default persistReducer(persistConfig, rootReducer)