

 import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
	bicycles: null,
	isFetching: false,
	errorMessage: undefined,
	toggleCarousel: true
}

const shopReducer = (state = INITIAL_STATE, action) => {
	if (action.type === ShopActionTypes.FILTER_BY_PRICE) {
		console.log(action.payload)
	}
	switch (action.type) {
		case ShopActionTypes.FETCH_BICYCLES_START:
		return {
			...state,
			isFetching: true
		}
		case ShopActionTypes.FETCH_BICYCLES_SUCCESS:
		return {
			...state,
			isFetching: false,
			bicycles: action.payload
		}
		case ShopActionTypes.FETCH_BICYCLES_FAILURE:
		return {
			...state,
			isFetching: false,
			errorMessage: action.payload

		}
		case ShopActionTypes.FILTER_BY_PRICE:
		return {
			...state,
			priceRange: action.payload
		}
		case ShopActionTypes.FILTER_BY_MANUFACTURER:
		return {
			...state,
			manufacturers: action.payload
		}
		case ShopActionTypes.FILTER_BY_COUNTRY:
		return {
			...state,
			country: action.payload
		}
		case ShopActionTypes.FILTER_BY_REGION:
		return {
			...state,
			region: action.payload
		}
		case ShopActionTypes.TOGGLE_CAROUSEL:
			return {
				...state,
				toggleCarousel: !state.toggleCarousel 
			}
		default:
			return state;
	}
}
export default shopReducer;