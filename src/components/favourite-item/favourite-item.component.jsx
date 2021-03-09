import React, {useState} from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter, useHistory } from 'react-router-dom'

import { Icon } from 'semantic-ui-react'

import { toggleSideNav } from '../../redux/side-nav/side-nav.actions';
import {clearItemFromFavourites} from '../../redux/side-nav/side-nav.actions';

import './favourite-item.styles.scss'

//onhover clear

const FavouriteItem = ({ item, clearItemFromFavourites, id, toggleSideNav }) => {

	const  { url, price, manufacturer, model } = item

	const history = useHistory();

	const redirectToView = () => {
		history.push(`/item/${id}`)
	}

	return (
<div className='favourite-item'>
		<img className='favourite-image' src={url} alt='item' 
			onClick={() => {
					redirectToView()
					toggleSideNav()
				}} 
		/>
	<div className='item-details'>
		<div className='name'>
			<span>{manufacturer}</span>
			<span>{model}</span>
		</div>
			<div className='price'>
				<span>€{price}</span>
			</div>
	</div>
		<Icon name='remove' onClick={() => clearItemFromFavourites(id)} />
		
</div>
	)
}

const mapDispatchToProps = dispatch => ({
	clearItemFromFavourites: id => dispatch(clearItemFromFavourites(id)),
	toggleSideNav: () => dispatch(toggleSideNav())
})

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
	)(FavouriteItem);