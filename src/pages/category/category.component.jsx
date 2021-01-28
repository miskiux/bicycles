import React, { useState, useEffect } from 'react';

import {connect} from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component'

import { selectCategory } from '../../redux/shop/shop.selectors';

import { priceRangeSelector } from '../../redux/shop/shop.selectors'
import { manufacturerSelector } from '../../redux/shop/shop.selectors'
import { locationSelector } from '../../redux/shop/shop.selectors'

import './category.styles.scss';

const CategoryPage = ({ category, match, priceFilter, manufacturerFilter, locationFilter }) => {

const [bicycleCategory, setBicycleCategory] = useState([]);
 

useEffect(() => {
	let result = [...category]
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
			
		setBicycleCategory(result)

}, [category, priceFilter, manufacturerFilter])

	return (
		<div className='category'>
				<h2></h2>
				<div>
				{
					category.map(({id, ...otherCollectionProps}) =>
						<CollectionItem id={id} key={id} {...otherCollectionProps} />
						)
				}
				</div>
		</div>
	)
}

const mapStateToProps = (state, ownProps) => ({
	category: selectCategory(ownProps.match.params.categoryId)(state),
	priceFilter: priceRangeSelector(state),
	manufacturerFilter: manufacturerSelector(state),
	locationFilter: locationSelector(state),
})


export default connect(mapStateToProps)(CategoryPage);
