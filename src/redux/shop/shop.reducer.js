

 import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
	bicycles: null
}

const shopReducer = (state = INITIAL_STATE, action) => {
	if (action.type === ShopActionTypes.FILTER_BY_PRICE) {
		console.log(action.payload)
	}
	switch (action.type) {
		case ShopActionTypes.UPDATE_BICYCLE:
		return {
			...state,
			bicycles: action.payload
		}
		case ShopActionTypes.FILTER_BY_PRICE:
		return {
			...state,
			priceRange: action.payload
		}
		default:
			return state;
	}
}
export default shopReducer;