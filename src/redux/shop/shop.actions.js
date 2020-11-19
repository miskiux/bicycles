import ShopActionTypes from './shop.types';

export const updateBicycle = (bicycleMap) => ({
	type:ShopActionTypes.UPDATE_BICYCLE,
	payload: bicycleMap
})
