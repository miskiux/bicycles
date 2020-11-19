import memoize from 'lodash.memoize';
import { createSelector } from 'reselect';



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

// type, action, reducer => category compnent triggers updateCategoryBicycle => goes to theselector