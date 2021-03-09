import SellActionTypes from './sell.types';

export const imageUploadSuccess = () => ({
	type: SellActionTypes.IMAGE_UPLOAD_SUCCESS,
})

export const bicycleUploadStart = (additionalData) => ({
	type: SellActionTypes.BICYCLE_UPLOAD_START,
	payload: additionalData
})

export const imageUploadStart = () => ({
	type: SellActionTypes.IMAGE_UPLOAD_START,
})

export const uploadSuccess = () => ({
	type: SellActionTypes.UPLOAD_FINISHED
})

export const submitSuccess = () => ({
	type: SellActionTypes.SUBMIT_SUCCESS
})

 
