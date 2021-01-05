import React, { useState, useEffect } from 'react';

import {connect} from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component'

import { selectCategory } from '../../redux/shop/shop.selectors';

import {selectPriceFilter} from '../../redux/shop/shop.selectors' ;
import {selectManufacturerFilter} from '../../redux/shop/shop.selectors'
import { selectRegionFilter } from '../../redux/shop/shop.selectors'
import { selectCountryFilter } from '../../redux/shop/shop.selectors'


import './category.styles.scss';

const CategoryPage = ({ category, match, priceFilter, manufacturerFilter, countryFilter, regionFilter, history }) => {

const [items, setItems] = useState([]);
const [bicycleCategory, setBicycleCategory] = useState([]);

	
useEffect(() => {
	const categoryBicycles = category.reduce((r, a) => {
			r[a.routeName] = r[a.routeName] || [];
			r[a.routeName].push(a);
			return r;
		}, Object.create(null));
	setItems(categoryBicycles[match.params.categoryId])
	console.log(categoryBicycles)
			
}, [category]);


useEffect(() => {

	let result = [...items]
	if (priceFilter) {
			result = result
						.filter(bicycle => bicycle.item.price
						>= priceFilter[0] && bicycle.item.price <= priceFilter[1])			
		}
	if(manufacturerFilter) {
				result = result.filter(bicycle => bicycle.item.manufacturer
					.split(",")
						.some(key => manufacturerFilter.includes(key)))	
			}
	if(countryFilter) {
				result = result.filter(bicycle => bicycle.country
						.split(",")
							.some(key => countryFilter.includes(key))
					) 
			}
	if (regionFilter) {
				result = result.filter(bicycle => bicycle.region
						.split(",")
							.some(key => regionFilter.includes(key)))
				}
			
		setBicycleCategory(result)

}, [items, priceFilter, manufacturerFilter, countryFilter, regionFilter])

	return (
		<div className='category'>
				<h2></h2>
				<div>
				{
					bicycleCategory.map(({id, ...otherCollectionProps}) =>
						<CollectionItem id={id} key={id} {...otherCollectionProps} match={match.params} />
						)
				}
				</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => ({
	category: selectCategory(ownProps.match.params.categoryId)(state),
	priceFilter: selectPriceFilter(state),
	manufacturerFilter: selectManufacturerFilter(state),
	countryFilter: selectCountryFilter(state),
	regionFilter: selectRegionFilter(state)

})


export default connect(mapStateToProps)(CategoryPage);
