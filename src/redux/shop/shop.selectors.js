import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

//values for filtering;
const priceRangeSelector = state => state.shop.priceRange
const manufacturerSelector = state => state.shop.manufacturers
const countrySelector = state => state.shop.country
const regionSelector = state => state.shop.region
//memoized selector for checkboxes of manufacturer options


const selectShop = state => state.shop;

export const selectIsBicyclesFetching = createSelector(
[selectShop],
shop => shop.isFetching
	)

export const selectIsBicyclesLoaded = createSelector(
[selectShop],
shop => !!shop.bicycles
	)

export const select = createSelector(
[selectShop],
shop => shop.bicycles
	)

export const selectBicycles = createSelector(
[select],
bicycles => bicycles ? Object.keys(bicycles).map(id => bicycles[id]) : []
	)


export const selectCategory = memoize((bicycleUrlParam) => createSelector(
[select],
bicycles => (bicycles ?	Object.keys(bicycles).map(routeName => bicycles[routeName]) : null)
))

export const selectPriceFilter = createSelector(
[priceRangeSelector],
(priceRange) => priceRange
)

export const selectManufacturerFilter = createSelector(
[manufacturerSelector],
(manufacturers) => manufacturers
	)

export const selectCountryFilter = createSelector(
[countrySelector],
(country) => country
	)

export const selectRegionFilter = createSelector(
[regionSelector],
(region) => region

	)

export const selectToggleCarousel = createSelector(
[selectShop],
(shop) => shop.toggleCarousel
)


