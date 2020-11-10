import React from 'react';
import { connect } from 'react-redux';

import CollectionPreview from '../collection-preview/collection-preview.component'  

import { selectCollections } from '../../redux/shop/shop.selectors' 

import './collections-overview.styles.scss'


//get the bicycleArr through selector ({id, ...item})

const CollectionsOverview = ({ bicycles }) => {
console.log(bicycles);
	return (
		<div className='collections-overview'>
		{
			bicycles.map(({key, ...otherCollectionProps}) =>
 				<CollectionPreview key={key} {...otherCollectionProps} />
			)}
	</div>

		)
}


const mapStateToProps = (state) => ({
	bicycles: selectCollections(state)
})

export default connect(mapStateToProps)(CollectionsOverview)