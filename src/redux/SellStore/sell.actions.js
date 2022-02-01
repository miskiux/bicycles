import SellActionTypes from './sell.types';

export const imageUploadSuccess = () => ({
	type: SellActionTypes.IMAGE_UPLOAD_SUCCESS,
})

export const bicycleUploadStart = (additionalData) => ({
	type: SellActionTypes.BICYCLE_UPLOAD_START,
	payload: additionalData
})
 
