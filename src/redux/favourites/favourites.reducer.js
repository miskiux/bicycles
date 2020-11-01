import FavouritesActionTypes from './favourites.types'

const INITIAL_STATE = {
	hidden: true,
	favouriteItems: []
};

const favouritesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FavouritesActionTypes.TOGGLE_FAVOURITES_HIDDEN:
			return {
				...state,
				hidden: !state.hidden 
			}
			case FavouritesActionTypes.ADD_ITEM:
				return {
					...state,
					favouriteItems: [...state.favouriteItems, action.payload] // spread in exisiting favouriteItems that are on the state, adding item(payload value) on the action
				}
			default:
				return state;
	}
}

export default favouritesReducer