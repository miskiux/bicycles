import { createSelector } from 'reselect';
// to save some re-renders off of components
const selectSidebar = state => state.sidenav

export const selectFavouriteItems = createSelector(
[selectSidebar],
(sidenav) => sidenav.favouriteItems
	)

export const selectCartItemsFlash = createSelector(
[selectFavouriteItems],
favouriteItems => favouriteItems.length !== 0
	)