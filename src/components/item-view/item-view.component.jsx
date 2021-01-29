import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux';
import { compose } from 'redux';

import { useParams } from 'react-router-dom';

import Item from '../item/item.component'

import { selectAll } from '../../redux/shop/shop.selectors';

 //different data types of category and shop
//persist
//action(itemId) => selector

const ItemView = ({bicycles, match, location}) => {

	const [item, setItem] = useState([])

	const { bicycleId } = useParams();

	useEffect(() => {
		let itemview = bicycles.filter(bicycle => bicycle.id === bicycleId)
		setItem(itemview)

	}, [bicycleId, bicycles])


	return(
		<div>
			{
				item.map(({id, ...otherProps}) =>
					<Item key={id} {...otherProps} />
				 )
			}
			<h2></h2>
			
		</div>
		)
}

const mapStateToProps = state => ({
	bicycles: selectAll(state)
})


export default connect(mapStateToProps, null)(ItemView);
