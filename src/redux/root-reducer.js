import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'

import userReducer from './user/user.reducer';
import favouritesReducer from './favourites/favourites.reducer';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['favourites']
}

const rootReducer = combineReducers({
	user: userReducer,  //keys(user) represent individual slices of state  
	favourites: favouritesReducer

})

export default persistReducer(persistConfig, rootReducer)