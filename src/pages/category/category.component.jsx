import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'

import CollectionItem from '../../components/collection-item/collection-item.component'

import { updateLink } from '../../redux/shop/shop.actions'
import { selectCategory } from '../../redux/shop/shop.selectors';

import './category.styles.scss';

const CategoryPage = ({ category, match, location, updateLink}) => {

const [bicycleCategory, setBicycleCategory] = useState([]);
 
console.log(location)
console.log(match.params.categoryId)

//active link to redux
useEffect(() => {
	if(match.params.categoryId) {
		updateLink(match.params.categoryId)
	}
}, [match.params.categoryId])
// useEffect(() => {
// 	let result = [...category]''
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

const mapDispatchToProps = dispatch => ({
	updateLink: (link) => dispatch(updateLink(link))
})


export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);
