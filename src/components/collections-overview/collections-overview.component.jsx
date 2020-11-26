import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../collection-item/collection-item.component'  

import { selectBicycles } from '../../redux/shop/shop.selectors' 
import {selectPriceFilter} from '../../redux/shop/shop.selectors'

import { withRouter } from 'react-router-dom';

import './collections-overview.styles.scss'

//displaying items as a list ? of 5 ?

const CollectionsOverview = ({ bicycles, match, history, priceFilter }) => {

	const [BicyclesByPrice, setBicyclesByPrice] = useState([]);

	useEffect(() => {
		let filteredProducts = bicycles;
		if (priceFilter) {
			filteredProducts = 
			filteredProducts
				.filter(bicycle => bicycle.item.price
					>= priceFilter[0] && bicycle.item.price <= priceFilter[1])			
		}
		setBicyclesByPrice(filteredProducts)

	}, [priceFilter])

	return (
			<div className='collections-overview'>
				<div className='preview'>
		{
			BicyclesByPrice.map(({id, ...otherCollectionProps}) =>
 				<CollectionItem key={id} {...otherCollectionProps}/>
			)}
		</div>
	</div>	
		)
}

const mapStateToProps = (state) => ({
	bicycles: selectBicycles(state),
	priceFilter: selectPriceFilter(state)
})

export default withRouter(connect(mapStateToProps)(CollectionsOverview))



