import ShopActionTypes from './shop.types';

import { firestore, getBiciDataForShop } from '../../firebase/firebase.utils';

//fetch actions
export const fetchBicyclesStart = () => ({
	type:ShopActionTypes.FETCH_BICYCLES_START,
})

export const fetchBicyclesSuccess = bicycleMap => ({
	type: ShopActionTypes.FETCH_BICYCLES_SUCCESS,
	payload: bicycleMap
})

export const fetchBicyclesFailure = (errorMessage) => ({
	type: ShopActionTypes.FETCH_BICYCLES_FAILURE,
	payload: errorMessage
})

//filter actions
export const getManufacturerLabel = payload => ({
	type:ShopActionTypes.GET_MANUFACTURER_LABEL,
	payload
})

export const filterByLocation = payload => ({
	type: ShopActionTypes.FILTER_BY_LOCATION,
	payload
})

//item-view toggle
export const toggleCarousel = () => ({
	type: ShopActionTypes.TOGGLE_CAROUSEL,
})

//delete actions

export const deleteBicycleStart = (payload) => ({
	type: ShopActionTypes.DELETE_BICYCLE_START,
	payload
})

export const deleteBicycleSuccess = () => ({
	type: ShopActionTypes.DELETE_BICYCLE_SUCCESS
})

export const hasBicycleDeleted = () => ({
	type: ShopActionTypes.HAS_BICYCLE_DELETED
})

//category link update

export const updateLink = (link) => ({
	type: ShopActionTypes.UPDATE_LINK,
	payload: link
})

//update

export const bicycleUpdateStart = (values) => ({
	type: ShopActionTypes.BICYCLE_UPDATE_START,
	payload: values
})

export const bicycleUpdateSuccess = () => ({
	type:ShopActionTypes.BICYCLE_UPDATE_SUCCESS
})





