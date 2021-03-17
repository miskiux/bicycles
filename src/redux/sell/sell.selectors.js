import { createSelector } from "reselect";

const selectSell = (state) => state.sell;

export const SelectHasImagesLoaded = createSelector(
  [selectSell],
  (sell) => sell.isBicycleUploading
);
export const SelectIsLoading = createSelector(
  [selectSell],
  (sell) => sell.isLoading
);
export const SelectImagesLoading = createSelector(
  [selectSell],
  (sell) => sell.imagesLoading
);
export const SelectSubmitSuccess = createSelector(
  [selectSell],
  (sell) => sell.submitSuccess
);
export const SelectSubmitFailure = createSelector(
  [selectSell],
  (sell) => sell.submitFailure
);
export const SelectMessage = createSelector(
  [selectSell],
  (sell) => sell.message
);
export const SelectSnackbar = createSelector(
  [selectSell],
  (sell) => sell.snackbar
);
