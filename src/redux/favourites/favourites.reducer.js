import FavouritesActionTypes from './favourites.types';
import {addItemToFavourite} from './favourite.utils';

const INITIAL_STATE = {
	hidden: true,
	favouriteItems: []
};

const favouritesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FavouritesActionTypes.TOGGLE_FAVOURITES_HIDDEN:
			return {
				...state,
				hidden: !state.hidden 
			}
			case FavouritesActionTypes.ADD_ITEM:
				return {
					...state,
					favouriteItems: addItemToFavourite(state.favouriteItems, action.payload)
				}
			default:
				return state;
	}
}

export default favouritesReducer