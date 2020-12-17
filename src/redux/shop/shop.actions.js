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

export const fetchBicyclesStartAsync = () => {
	return dispatch => {
		const bicycleRef = firestore.collection("bicycle");
		dispatch(fetchBicyclesStart());

		bicycleRef.get()
		.then(snapshot => {
			const bicycleMap = getBiciDataForShop(snapshot)
			dispatch(fetchBicyclesSuccess(bicycleMap));
		}).catch(error => dispatch(fetchBicyclesFailure(error.message)) )
	}
}

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





