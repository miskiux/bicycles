import React, {useState} from 'react';

import { Route } from "react-router-dom";

import FavouriteItem from '../favourite-item/favourite-item.component';

import BiciInfo from '../bici-info/bici-info.component';

import {selectFavouriteItems} from '../../redux/favourites/favourites.selectors'
import { connect } from 'react-redux';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import './favourites-dropdown.styles.scss';

const FavouriteDropdown = ({ favouriteItems }) => {

return (
	<div className='favourites-dropdown'>
		<div className='favourite-items'>
		{
			favouriteItems.length ? (
			favouriteItems.map(favouriteItem => (
				<FavouriteItem key={favouriteItem.id} id={favouriteItem.id} item={favouriteItem.item} />
				))
		) : (
			<span className="empty-message">You have no favourites</span>
		)}
		</div>
	</div>
		)}

const mapStateToProps = (state) => ({
	favouriteItems: selectFavouriteItems(state) 
})

export default connect(mapStateToProps)(FavouriteDropdown);

