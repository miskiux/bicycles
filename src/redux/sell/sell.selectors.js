import { createSelector } from 'reselect';

const selectSell = state => state.sell;

export const SelectHasImagesLoaded = createSelector(
[selectSell],
sell => sell.isUploading
	)