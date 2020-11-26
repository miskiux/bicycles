import React, {useState} from 'react';

import { Route } from "react-router-dom";

import FavouriteItem from '../favourite-item/favourite-item.component';

import BiciInfo from '../bici-info/bici-info.component';

import {selectFavouriteItems} from '../../redux/favourites/favourites.selectors'
import { connect } from 'react-redux';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import './favourites-dropdown.styles.scss';

const FavouriteDropdown = ({ favouriteItems }) => {

const[open, setOpen] = useState(false);
const[close, setClose] = useState(true);

return (
	<div className='favourites-dropdown'>
	{ close ?
		<div className='favourite-items'>
		{
			favouriteItems.length && close ? (
			favouriteItems.map(favouriteItem => (
				<FavouriteItem key={favouriteItem.id} item={favouriteItem} />
				))
		) : (
			<span className="empty-message">You have no favourites</span>
		)}
		</div>
	: null 	
	}
		<ArrowRightIcon onClick={() => {setOpen(!open); setClose(!close)}} className="ArrowRightIcon" style={{ fontSize: 60 }} color="primary"></ArrowRightIcon>
		<div className="bicycle-dropdown">
						{ open ?
							<div>
						<BiciInfo />
							</div>
						: null
						}
				</div>
	</div>
		)}

const mapStateToProps = (state) => ({
	favouriteItems: selectFavouriteItems(state) //passing whole reducer state, which then goes i have to "selectCartItemsFlash"()
})

export default connect(mapStateToProps)(FavouriteDropdown);