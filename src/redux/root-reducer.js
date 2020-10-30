import { combineReducers } from 'redux';

import userReducer from './user/user.reducer';
import favouritesReducer from './favourites/favourites.reducer';

export default combineReducers({
	user: userReducer,  //keys(user) represent individual slices of state  
	favourites: favouritesReducer
})