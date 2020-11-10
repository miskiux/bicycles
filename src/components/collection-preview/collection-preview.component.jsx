import React from 'react';

import CollectionItem from '../collection-item/collection-item.component'

import './collection-preview.styles.scss';


// individual section - mapping through item
const CollectionPreview = ({ item }) => {
	console.log(item)
	const { manufacturer, model, price, url } = item;
	return (
			<div className='collection-preview'>
		<h1 className='title'></h1>
		<div className = 'preview'>
				<CollectionItem key={item.id} item={item} />
		</div>
	</div>
		)
}


export default CollectionPreview;