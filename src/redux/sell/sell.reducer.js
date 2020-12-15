import SellActionTypes from './sell.types';

const INITIAL_STATE = {
	files: null,
	hidden: true
};

const sellReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SellActionTypes.FILE_UPLOAD:
			return {
				...state,
				files: action.payload 
			}
		case SellActionTypes.TOGGLE_IMAGE_POPUP:
			return {
				...state,
				hidden: !state.hidden
			}
		case SellActionTypes.ADD_SPEC:
			return {
				...state,
				bicycleSpec: action.payload
			}
			default:
				return state;
	}
}

export default sellReducer;