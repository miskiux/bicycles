import { createSelector } from 'reselect';
// to save some re-renders off of components
const selectFavourite = state => state.favourites //gets whole state

export const selectFavouriteItems = createSelector(//which then references selectFavourite and gets full state which passes favouriteItems
[selectFavourite],
(favourites) => favourites.favouriteItems
	)

export const selectFavouriteHidden = createSelector(
[selectFavourite],
(favourites) => favourites.hidden
	)

export const selectCartItemsFlash = createSelector(	//references selectFavouriteItems ^^^
[selectFavouriteItems],
favouriteItems => favouriteItems.length !== 0
	)