import SellActionTypes from './sell.types';

const INITIAL_STATE = {
	imagesLoading: false,
	isBicycleUploading: false,
	isLoading: false,
}

const sellReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SellActionTypes.IMAGE_UPLOAD_SUCCESS:
		return {
			...state,
			isBicycleUploading: true
		}
		case SellActionTypes.IMAGE_UPLOAD_START:
		return {
			...state,
			imagesLoading: true,
			isLoading: true
		}
		case SellActionTypes.UPLOAD_FINISHED:
		return {
			...state,
			isLoading: false
		}
		default:
			return state;
	}
}

export default sellReducer;
