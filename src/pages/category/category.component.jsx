import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'

import CollectionItem from '../../components/collection-item/collection-item.component'

import { selectCategory } from '../../redux/shop/shop.selectors';

import './category.styles.scss';

const CategoryPage = ({ category, match}) => {

const [bicycleCategory, setBicycleCategory] = useState([]);
 

// useEffect(() => {
// 	let result = [...category]
// 	if (priceFilter) {
// 			result = result
// 						.filter(bicycle => bicycle.item.price
// 						>= priceFilter[0] && bicycle.item.price <= priceFilter[1])			
// 		}
// 	if(manufacturerFilter) {
// 				result = result.filter(bicycle => bicycle.item.manufacturer
// 					.split(",")
// 						.some(key => manufacturerFilter.includes(key)))	
// 			}
			
// 		setBicycleCategory(result)

// }, [category, priceFilter, manufacturerFilter])

	return (
		<div className='category'>

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
})


export default connect(mapStateToProps)(CategoryPage);
