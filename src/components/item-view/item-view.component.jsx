import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux';
import { compose } from 'redux';

import { useParams, withRouter } from 'react-router-dom';

import Item from '../item/item.component'


import { selectBicycles } from '../../redux/shop/shop.selectors';

 
//persist
//action(itemId) => selector

const ItemView = ({bicycles, match, location}) => {


	let { itemId } = useParams();

	const [item, setItem] = useState([])

	useEffect(() => {
		let itemview = bicycles.filter(bicycle => bicycle.id === itemId)
		setItem(itemview)

	}, [itemId, bicycles])

	return(
		<div>
			{
				item.map(({id, ...otherProps}) =>
					<Item key={id} {...otherProps} />
				 )
			}
			<h2>{itemId}</h2>
			
		</div>
		)
}

const mapStateToProps = state => ({
	bicycles: selectBicycles(state)
})


export default connect(mapStateToProps, null)(ItemView);
