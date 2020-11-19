import React, { useState, useEffect } from 'react';

import {connect} from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component'

import { selectCategory } from '../../redux/shop/shop.selectors'; 

import './category.styles.scss';

const CategoryPage = ({ category, match }) => {

const [items, setItems] = useState([]);
const [title, setTitle] = useState([]);

	
useEffect(() => {
	console.log(match)
	const categoryBicycles = category.reduce((r, a) => {
			r[a.routeName] = r[a.routeName] || [];
			r[a.routeName].push(a);
			return r;
		}, Object.create(null));
	setItems(categoryBicycles[match.params.categoryId])
	console.log(categoryBicycles[match.params.categoryId])
			
}, [category]);

// to categories bicycles

	return (
		<div className='category'>
				<h2></h2>
				<div>
				{
					items.map(({id, ...otherCollectionProps}) =>
						<CollectionItem key={id} {...otherCollectionProps} />
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
