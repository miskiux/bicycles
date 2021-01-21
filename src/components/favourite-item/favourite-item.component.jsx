import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter, useHistory } from 'react-router-dom'

import { toggleFavouritesHidden } from '../../redux/favourites/favourites.actions';
import {clearItemFromCart} from '../../redux/favourites/favourites.actions';

import './favourite-item.styles.scss'

const FavouriteItem = ({ item, clearItem, id, toggleFavouritesHidden }) => {
	const  { url, price, manufacturer, model } = item

	const history = useHistory();

	const redirectToView = () => {
		history.push(`/item/${id}`)
	}

	return (
<div className='favourite-item'>
	<div className='remove-button' onClick={() => clearItem(item)}>&#10005;</div>
		<img src={url} alt='item' 
		onClick={() => {
					redirectToView()
					toggleFavouritesHidden()
				}} 
		/>
	<div className='item-details'>
			<span className='name'>{manufacturer}</span>
			<span className='name'>{model}</span>
			<div>
				<span className='price'>€{price}</span>
			</div>
	</div>
</div>
	)
}



const mapDispatchToProps = dispatch => ({
	clearItem: item => dispatch(clearItemFromCart(item)),
	toggleFavouritesHidden: () => dispatch(toggleFavouritesHidden())
})

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
	)(FavouriteItem);