import memoize from "lodash.memoize";
import { createSelector } from "reselect";

//values for filtering;
export const filterListSelector = (state) => state.shop.filterList;
export const manufacturerSelector = (state) => state.shop.manufacturerLabel;
export const locationSelector = (state) => state.shop.locationId;
export const linkSelector = (state) => state.shop.activeLink;

const selectShop = (state) => state.shop;

export const selectIsBicyclesFetching = createSelector(
  [selectShop],
  (shop) => shop.isFetching
);

export const selectIsBicyclesLoaded = createSelector(
  [selectShop],
  (shop) => !!shop.bicycles
);

export const selectBicycles = createSelector(
  [selectShop],
  (shop) => shop.bicycles
);

export const selectAll = createSelector([selectBicycles], (bicycles) =>
  bicycles ? Object.values(bicycles) : []
);

export const selectCategory = memoize((bicycleUrlParam) =>
  createSelector([selectBicycles], (bicycles) =>
    bicycles
      ? Object.values(bicycles).filter((i) =>
          bicycleUrlParam.includes(i.routeName)
        )
      : []
  )
);

export const selectLocationBicycles = createSelector([selectAll], (bicycles) =>
  bicycles.map((o) =>
    ["id", "coordinates"].reduce((acc, current) => {
      acc[current] = o[current];
      return acc;
    }, {})
  )
);

export const selectToggleCarousel = createSelector(
  [selectShop],
  (shop) => shop.toggleCarousel
);

//filtered bicycles

export const selectFilteredByLocation = createSelector(
  [selectAll, locationSelector],
  (bicycles, locationId) =>
    bicycles.filter((bicycle) =>
      bicycle.id.split(",").some((key) => locationId.includes(key))
    )
);

export const selectActiveLink = createSelector(
  [selectShop],
  (shop) => shop.activeLink
);

export const selectRedirect = createSelector(
  [selectShop],
  (shop) => shop.redirect
);

export const selectList = (state) =>
  state.shop.list ? Object.values(state.shop.list) : [];
