import React from 'react';

import CollectionItem from '../collection-item/collection-item.component'

import './collection-preview.styles.scss';


// individual section - mapping through item
const CollectionPreview = ({ item, routeName }) => {
	const { manufacturer, model, price, url } = item;
	return (
			<div className='collection-preview'>
		<div className = 'preview'>
				<CollectionItem key={item.id} item={item} />
		</div>
	</div>
		)
}


export default CollectionPreview;