import ShopActionTypes from './shop.types';

export const updateBicycle = (bicycleArr) => ({
	type:ShopActionTypes.UPDATE_BICYCLE,
	payload: bicycleArr
})