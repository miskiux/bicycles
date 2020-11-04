import React from 'react';
import { ReactComponent as FavouriteIcon } from '../../assets/Bike.svg';
import {selectCartItemsFlash} from '../../redux/favourites/favourites.selectors'

import { connect } from 'react-redux';
import { toggleFavouritesHidden } from '../../redux/favourites/favourites.actions';
import './favourites.styles.scss';

const Favourites = ({toggleFavouritesHidden, itemCount}) => (
<div className='favourites-icon' onClick={toggleFavouritesHidden}>
	<FavouriteIcon className='icon' />
	{
		itemCount ?
		<span className='item-count'></span>
		: 
		null
	}

</div>
	)


const mapDispatchToProps = dispatch => ({
	toggleFavouritesHidden: () => dispatch(toggleFavouritesHidden())
})

const mapStateToProps = (state) => ({
	itemCount: selectCartItemsFlash(state) //passing whole reducer state, which then goes i have to "selectCartItemsFlash"
})

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);