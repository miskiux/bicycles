import { createSelector } from 'reselect';



const selectShop = state => state.shop;

export const selectCollections = createSelector(
[selectShop],
shop => shop.bicycles
	)


export const selectCategory = (bicycleUrlParam) => createSelector(
[selectShop],
bicycles => Object.keys(bicycles).map(keys => bicycles[keys][bicycleUrlParam] )
)