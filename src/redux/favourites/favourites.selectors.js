import { createSelector } from 'reselect';

const selectFavourite = state => state.favourites //gets whole state

export const selectFavouriteItems = createSelector(//which then references selectFavourite and gets full state which passes favouriteItems
[selectFavourite],
(favourites) => favourites.favouriteItems
	)

export const selectCartItemsFlash = createSelector(	//references selectFavouriteItems ^^^
[selectFavouriteItems],
favouriteItems => favouriteItems.length !== 0
	)