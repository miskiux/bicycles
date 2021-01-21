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
export const filterByPrice = payload => ({
	type:ShopActionTypes.FILTER_BY_PRICE,
	payload
})

export const filterByManufacturer = payload => ({
	type:ShopActionTypes.FILTER_BY_MANUFACTURER,
	payload
})

export const filterByCountry = payload => ({
	type: ShopActionTypes.FILTER_BY_COUNTRY,
	payload
})

export const filterByRegion = payload => ({
	type: ShopActionTypes.FILTER_BY_REGION,
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





