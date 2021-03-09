import React from 'react';
import { ReactComponent as FavouriteIcon } from '../../assets/Bike.svg';

import { connect } from 'react-redux';
import { toggleSideNav } from '../../redux/side-nav/side-nav.actions';
import './favourites.styles.scss';

const Favourites = ({toggleSideNav, itemCount}) => (
<div className='favourites-icon' onClick={toggleSideNav}>
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
	toggleSideNav: () => dispatch(toggleSideNav())
})

const mapStateToProps = ({sidenav: {favouriteItems}}) => ({
	itemCount: favouriteItems.length !== 0
})

export default connect(mapStateToProps, mapDispatchToProps)(Favourites);