import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

//values for filtering;
export const filterListSelector = state => state.shop.filterList
export const manufacturerSelector = state => state.shop.manufacturerLabel
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

//filtered bicycles

export const selectFilterList = createSelector(
[selectShop],
shop => shop.filterList ? shop.filterList : null
	)
// export const selectFilteredByPrice = createSelector(
// [selectAll, priceRangeSelector],
// (bicycles, priceRange) => bicycles.filter(bicycle =>
// 					  bicycle.item.price
// 						 >= priceRange[1] && bicycle.item.price <= priceRange[0]))

// export const selectFilteredyByManufacturer = createSelector(
// [selectAll, manufacturerSelector],
// (bicycles, manufacturers) => bicycles.filter(bicycle => bicycle.item.manufacturer
// 					.split(",")
// 						.some(key => manufacturers.includes(key)))	
// 	)

// export const selectFilteredByLocation = createSelector(
// [selectAll, locationSelector],
// (bicycles, locationId) => bicycles.filter(bicycle => bicycle.id
// 					.split(",")
// 						.some(key => locationId.includes(key)))
// 	)









