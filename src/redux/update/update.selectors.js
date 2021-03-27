import { createSelector } from "reselect";

const selectUpdate = (state) => state.update;

export const selectCurrentBicycle = createSelector(
  [selectUpdate],
  (update) => update.currentId
);
