import { createSelector } from 'reselect';
 
const selectSell = state => state.sell;

export const SelectHasImagesLoaded = createSelector(
[selectSell],
sell => sell.isBicycleUploading
	)

export const SelectIsLoaded = createSelector(
[selectSell],
sell => sell.isLoading
)

export const SelectImagesLoading = createSelector(
[selectSell],
sell => sell.imagesLoading
	)

export const SelectSubmitSuccess = createSelector(
[selectSell],
sell => sell.submitSuccess
	)