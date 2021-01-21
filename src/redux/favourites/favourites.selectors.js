import { createSelector } from 'reselect';
// to save some re-renders off of components
const selectFavourite = state => state.favourites

export const selectFavouriteItems = createSelector(
[selectFavourite],
(favourites) => favourites.favouriteItems
	)

export const selectFavouriteHidden = createSelector(
[selectFavourite],
(favourites) => favourites.hidden
	)

export const selectCartItemsFlash = createSelector(
[selectFavouriteItems],
favouriteItems => favouriteItems.length !== 0
	)