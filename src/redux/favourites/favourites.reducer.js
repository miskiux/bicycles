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
		case FavouritesActionTypes.CLEAR_ITEM_FROM_FAVOURITES:
			return {
				...state,
				favouriteItems: state.favouriteItems.filter(favouriteItem => favouriteItem.id !== action.payload.id) //actionpayload the item we want to remove
			}	// if true keeps it, if favItem.id does match the item id that we try to remove from payload then filter it out. then gives new array
		case FavouritesActionTypes.CLEAR_FAVOURITES:
			return {
				...state,
				favouriteItems: []
			}
			default:
				return state;
	}
}

export default favouritesReducer