import React from 'react';

import './favourite-item.styles.scss'

const FavouriteItem = ({ item: { imageUrl, price, name } }) => (
<div className='favourite-item'>
	<img src={imageUrl} alt='item' />
	<div className='item-details'>
		<span className='name'>{name}</span>
		<span className='price'>€{price}</span>
	</div>
</div>
	)

export default FavouriteItem;