import ShopActionTypes from './shop.types'

const INITIAL_STATE = {
	bicycles: null,
	isFetching: false,
	isDeleting: false,
	hasDeleted: false,
	errorMessage: undefined,
	toggleCarousel: true,
	locationId: [],
	manufacturerLabel: '',
	activeLink: 'all',
	isUpdating: false,
}

const shopReducer = (state = INITIAL_STATE, action) => {
	
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
		case ShopActionTypes.DELETE_BICYCLE_START:
		return {
			...state,
			isDeleting: true
		}
		case ShopActionTypes.DELETE_BICYCLE_SUCCESS:
		return {
			...state,
			isDeleting: false,
		}
		case ShopActionTypes.HAS_BICYCLE_DELETED:
		return {
			...state,
			hasDeleted: true,
		}
		case ShopActionTypes.GET_MANUFACTURER_LABEL:
		return {
			...state,
			manufacturerLabel: action.payload
		}
		case ShopActionTypes.FILTER_BY_LOCATION:
		return {
			...state,
			locationId: action.payload
		}
		case ShopActionTypes.TOGGLE_CAROUSEL:
			return {
				...state,
				toggleCarousel: !state.toggleCarousel 
			}
		case ShopActionTypes.UPDATE_LINK:
			return {
				...state,
				activeLink: action.payload
			}
		case ShopActionTypes.BICYCLE_UPDATE_START:
		return {
			...state,
			isUpdating: true
		}
		case ShopActionTypes.BICYCLE_UPDATE_SUCCESS:
		return {
			...state,
			isUpdating: false
		}
		default:
			return state;
	}
}
export default shopReducer;