import ShopActionTypes from './shop.types';

export const updateBicycle = (bicycleMap) => ({
	type:ShopActionTypes.UPDATE_BICYCLE,
	payload: bicycleMap
})

export const filterByPrice = payload => ({
	type:ShopActionTypes.FILTER_BY_PRICE,
	payload
})
