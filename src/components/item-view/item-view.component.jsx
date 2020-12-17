import React, {useState, useEffect} from 'react'

import {connect} from 'react-redux';

import { useParams } from 'react-router-dom';

import Item from '../item/item.component'


import { selectBicycles } from '../../redux/shop/shop.selectors';

 
//persist
//action(itemId) => selector

const ItemView = ({bicycles}) => {
	
	let { itemId } = useParams();
	console.log(itemId)

	const [item, setItem] = useState([])

	useEffect(() => {
		console.log(bicycles)
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
			
		</div>
		)
}

const mapStateToProps = state => ({
	bicycles: selectBicycles(state)
})

export default connect(mapStateToProps, null)(ItemView);

