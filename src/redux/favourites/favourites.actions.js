import FavouritesActionTypes from './favourites.types';

export const toggleFavouritesHidden = () => ({
	type: FavouritesActionTypes.TOGGLE_FAVOURITES_HIDDEN
});

export const addItem = item => ({		//returning new action type opbject
	type: FavouritesActionTypes.ADD_ITEM,
	payload: item
})
