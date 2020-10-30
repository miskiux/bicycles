import FavouritesActionTypes from './favourites.types'

const INITIAL_STATE = {
	hidden: true
};

const favouritesReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case FavouritesActionTypes.TOGGLE_FAVOURITES_HIDDEN:
			return {
				...state,
				hidden: !state.hidden 
			}
			default:
				return state;
	}
}

export default favouritesReducer