import React, { useState, useEffect } from 'react';

import {connect} from 'react-redux';

import CollectionItem from '../../components/collection-item/collection-item.component'

import {selectCategory} from '../../redux/shop/shop.selectors'; 

import './category.styles.scss';

const CategoryPage = ({ category }) => {

const [items, setItems] = useState([]);
const [title, setTitle] = useState([]);
	
useEffect(() => {
	setItems(category)
	category.map((key) => {
		if(key) {
			key.map((item) => {
				let routeRef = Object.values(item)[2];
				setTitle(routeRef);
			})
		}
	})
}, [category]);

	return (
	items.map((key) =>
		<div className='category'>
		{console.log(key)}
				<h2>{title}</h2>
				<div>
				{
				key ?
					key.map(({id, ...otherCollectionProps}) => 
					<CollectionItem key={id} {...otherCollectionProps} />
					)
					: "bici loading"
					}

				</div>
		</div>
		)
	)
}

const mapStateToProps = (state, ownProps) => ({
	category: selectCategory(ownProps.match.params.categoryId)(state)
})

export default connect(mapStateToProps)(CategoryPage);