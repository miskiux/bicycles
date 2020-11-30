import ShopActionTypes from './shop.types';

export const updateBicycle = (bicycleMap) => ({
	type:ShopActionTypes.UPDATE_BICYCLE,
	payload: bicycleMap
})

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
