import React from 'react';
import FavouriteItem from '../favourite-item/favourite-item.component'
import {selectFavouriteItems} from '../../redux/favourites/favourites.selectors'
import { connect } from 'react-redux';

import './favourites-dropdown.styles.scss';

const FavouriteDropdown = ({ favouriteItems }) => (
<div className='favourites-dropdown'>
	<div className='favourite-items'>
	{
		favouriteItems.length ? (
		favouriteItems.map(favouriteItem => (
			<FavouriteItem key={favouriteItem.id} item={favouriteItem} />
			))
	) : (
		<span className="empty-message">You have no favourites</span>
	)}
	</div>
</div>
	)

const mapStateToProps = (state) => ({
	favouriteItems: selectFavouriteItems(state) //passing whole reducer state, which then goes i have to "selectCartItemsFlash"()
})

export default connect(mapStateToProps)(FavouriteDropdown);