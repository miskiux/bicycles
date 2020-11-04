import React from 'react';
import FavouriteItem from '../favourite-item/favourite-item.component'
import {selectFavouriteItems} from '../../redux/favourites/favourites.selectors'
import { connect } from 'react-redux';

import './favourites-dropdown.styles.scss';

const FavouriteDropdown = ({ favouriteItems }) => (
<div className='favourites-dropdown'>
	<div className='favourite-items'>
	{
		favouriteItems.map(favouriteItem => (
			<FavouriteItem key={favouriteItem.id} item={favouriteItem} />
			))}
	</div>
</div>
	)

const mapStateToProps = (state) => ({
	favouriteItems: selectFavouriteItems(state)
})

export default connect(mapStateToProps)(FavouriteDropdown);