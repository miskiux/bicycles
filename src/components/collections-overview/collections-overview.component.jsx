import React from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../collection-item/collection-item.component'  

import { selectCollections } from '../../redux/shop/shop.selectors' 

import './collections-overview.styles.scss'


const CollectionsOverview = ({ bicycles }) => {
console.log(bicycles);
	return (
		Object.keys(bicycles).map(routeName =>
			<div className='collections-overview'>
				<h1 className='title'>{routeName}</h1>
				<div className='preview'>
		{
			bicycles[routeName].map(({id, ...otherCollectionProps}) =>
 				<CollectionItem key={id} {...otherCollectionProps}/>
			)}
		</div>
	</div>

			)
		)
}

const mapStateToProps = (state) => ({
	bicycles: selectCollections(state)
})

export default connect(mapStateToProps)(CollectionsOverview)