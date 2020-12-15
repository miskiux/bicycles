import SellActionTypes from './sell.types';

export const fileUpload = payload => ({
	type:SellActionTypes.FILES_UPLOAD,
	payload
})

export const toggleImagePopUp = () => ({
	type: SellActionTypes.TOGGLE_IMAGE_POPUP
});

export const AddSpec = payload => ({
	type: SellActionTypes.ADD_SPEC,
	payload
})