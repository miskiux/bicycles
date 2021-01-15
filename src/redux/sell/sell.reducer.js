import SellActionTypes from './sell.types';

const INITIAL_STATE = {
	isUploading: false
}

const sellReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SellActionTypes.IMAGE_UPLOAD_SUCCESS:
		return {
			...state,
			isUploading: true
		}
		default:
			return state;
	}
}

export default sellReducer;
