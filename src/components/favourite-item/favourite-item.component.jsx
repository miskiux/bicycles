import React from 'react';
import { connect } from 'react-redux';

import {clearItemFromCart} from '../../redux/favourites/favourites.actions'
import './favourite-item.styles.scss'

const FavouriteItem = ({ item, clearItem }) => {
	const  { imageUrl, price, name } = item
	return (
<div className='favourite-item'>
	<div className='remove-button' onClick={() => clearItem(item)}>&#10005;</div>
	<img src={imageUrl} alt='item' />
	<div className='item-details'>
		<span className='name'>{name}</span>
		<span className='price'>€{price}</span>
	</div>
</div>
	)}

const mapDispatchToProps = dispatch => ({
	clearItem: item => dispatch(clearItemFromCart(item))
})

export default connect(null, mapDispatchToProps)(FavouriteItem);