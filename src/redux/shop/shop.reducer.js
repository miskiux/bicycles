 import SHOP_DATA from './shop.data';

 import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
	bicycles: []
}

const shopReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ShopActionTypes.UPDATE_BICYCLE:
		return {
			...state,
			bicycles: action.payload
		}
		default:
			return state;
	}
}
export default shopReducer;