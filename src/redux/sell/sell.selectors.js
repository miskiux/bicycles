import { createSelector } from 'reselect';

const selectSell = state => state.sell

export const selectFiles = createSelector(
[selectSell],
(sell) => sell.files
	)

export const selectImagePopUp = createSelector(
[selectSell],
(sell) => sell.hidden
	)

export const selectBicycleSpec = createSelector(
[selectSell],
sell => sell.bicycleSpec
	)