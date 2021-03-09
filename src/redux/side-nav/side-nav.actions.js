import SideNavActionTypes from './side-nav.types';

export const toggleSideNav = () => ({
	type: SideNavActionTypes.TOGGLE_SIDE_NAV
});

export const toggleModal = (payload) => ({
	type: SideNavActionTypes.TOGGLE_MODAL,
	payload
});

export const addItem = id => ({
	type: SideNavActionTypes.ADD_ITEM,
	payload: id
})

export const clearItemFromFavourites = id => ({
	type: SideNavActionTypes.CLEAR_ITEM_FROM_FAVOURITES,
	payload: id
})

export const clearFavourites = () => ({
	type: SideNavActionTypes.CLEAR_FAVOURITES
})