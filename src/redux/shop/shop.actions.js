import ShopActionTypes from './shop.types';

export const updateBicycle = (groupBicycle) => ({
	type:ShopActionTypes.UPDATE_BICYCLE,
	payload: groupBicycle
})