import React from 'react';
import { ReactComponent as FavouriteIcon } from '../../assets/Bike.svg';
import { connect } from 'react-redux';
import { toggleFavouritesHidden } from '../../redux/favourites/favourites.actions';
import './favourites.styles.scss';

const Favourites = ({toggleFavouritesHidden}) => (
<div className='favourites-icon' onClick={toggleFavouritesHidden}>
	<FavouriteIcon className='icon' />
	<span className='item-count'>0</span>
</div>
	)


const mapDispatchToProps = dispatch => ({
	toggleFavouritesHidden: () => dispatch(toggleFavouritesHidden())
})

export default connect(null, mapDispatchToProps)(Favourites);