import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';

//values for filtering;
const priceRangeSelector = state => state.shop.priceRange


const selectShop = state => state.shop;

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


// (state, props) => (state.bicycles ?	Object.keys(state.bicycles)
// 							.map(key => state.bicycles[key]) 
// 							.filter(bicycle => bicycle.item.price
// 										>= state.priceRange[0] && bicycle.item.price <= state.priceRange[1])
// 							: null)
// 	)


