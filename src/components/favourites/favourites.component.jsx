import React from 'react';
import { ReactComponent as FavouriteIcon } from '../../assets/Bike.svg';

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

const mapStateToProps = ({favourites: {favouriteItems}}) => ({
	itemCount: favouriteItems.length !== 0
})

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);