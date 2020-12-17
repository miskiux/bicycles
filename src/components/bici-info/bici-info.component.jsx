import React, { useState, useEffect } from 'react';

import CollectionItem from '../collection-item/collection-item.component'

import { connect } from "react-redux";

import { selectCurrentUser } from '../../redux/user/user.selectors';
import { selectBicycles } from '../../redux/shop/shop.selectors';

import './bici-info.styles.css';

const BiciInfo = ({currentUser, bicycles}) => {

const [biciInfo, setBiciInfo] = useState([]);

//receiving bicycles based on userID
useEffect(() => {
	console.log(currentUser.id)
	let userBicycles = bicycles.filter(bicycle => bicycle.userId === currentUser.id)
	setBiciInfo(userBicycles)

}, [currentUser])

// Your Bici - 

	return (
		<div className="bicycle-page">
		{console.log(biciInfo)}
			 {
			biciInfo.map(({id, ...otherCollectionProps}) =>
 				<CollectionItem key={id} {...otherCollectionProps}/>
			)}
		</div>
		)
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  bicycles: selectBicycles(state)
});

export default connect(mapStateToProps)(BiciInfo); 