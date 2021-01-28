import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

//values for filtering;
export const priceRangeSelector = state => state.shop.priceRange
export const manufacturerSelector = state => state.shop.manufacturers
export const locationSelector = state => state.shop.locationId
 
const selectShop = state => state.shop;

export const selectIsBicyclesFetching = createSelector(
[selectShop],
shop => shop.isFetching
	)

export const selectIsBicyclesLoaded = createSelector(
[selectShop],
shop => !!shop.bicycles
	)

export const selectBicycles = createSelector(
[selectShop],
shop => shop.bicycles
	)

export const selectAll = createSelector(
[selectBicycles],
bicycles => bicycles ? Object.values(bicycles): []
	)


export const selectCategory = memoize((bicycleUrlParam) => createSelector(
[selectBicycles],
bicycles => bicycles ? Object.values(bicycles).filter(i => bicycleUrlParam.includes(i.routeName))
		: []
	))

export const selectLocationBicycles = createSelector(
[selectAll],

bicycles => bicycles.map(o => ['id', 'coordinates'].reduce((acc, current) => {
	acc[current] = o[current];
	return acc
	}, {})))

export const selectToggleCarousel = createSelector(
[selectShop],
(shop) => shop.toggleCarousel
)


