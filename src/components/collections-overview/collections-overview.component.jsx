import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../collection-item/collection-item.component'  

import { selectBicycles } from '../../redux/shop/shop.selectors' 
import {selectPriceFilter} from '../../redux/shop/shop.selectors'
import {selectManufacturerFilter} from '../../redux/shop/shop.selectors'
import { selectRegionFilter } from '../../redux/shop/shop.selectors'
import { selectCountryFilter } from '../../redux/shop/shop.selectors'
import { selectToggleCarousel } from '../../redux/shop/shop.selectors'

import { toggleCarousel } from '../../redux/shop/shop.actions';

import { withRouter } from 'react-router-dom';

import './collections-overview.styles.scss'


const CollectionsOverview = ({ bicycles, match, history, priceFilter, manufacturerFilter, countryFilter, regionFilter, toggleHeader, toggleCarousel }) => {

	const [filteredBicycles, setFilteredBicycles] = useState([]);

	//filtering section
	useEffect(() => {
		let result = [...bicycles];

			if (priceFilter) {
			result = result.filter(bicycle => bicycle.item.price
						>= priceFilter[0] && bicycle.item.price <= priceFilter[1])
			}
			if(manufacturerFilter) {
				result = result.filter(bicycle => bicycle.item.manufacturer
					.split(",")
						.some(key => manufacturerFilter.includes(key)))	
			}
			if(countryFilter) {
				result = result.filter(bicycle => bicycle.country
						.split(",")
							.some(key => countryFilter.includes(key))
					) 
			}
			if (regionFilter) {
					result = result.filter(bicycle => bicycle.region
						.split(",")
							.some(key => regionFilter.includes(key)))
				}
			setFilteredBicycles(result);

	}, [bicycles, priceFilter, manufacturerFilter, countryFilter, regionFilter])

	useEffect(() => {
		console.log(toggleHeader)
		if (toggleHeader == false) {
			toggleCarousel()
		}
	}, [toggleHeader])


	return (
			<div className='collections-overview'>
				<div className='preview'>

		{
			filteredBicycles.map(({id, ...otherCollectionProps}) =>
 				<CollectionItem id={id} key={id} {...otherCollectionProps}/>
			)}
		</div>
	</div>	
		)
}

const mapStateToProps = (state) => ({
	bicycles: selectBicycles(state),
	priceFilter: selectPriceFilter(state),
	manufacturerFilter: selectManufacturerFilter(state),
	countryFilter: selectCountryFilter(state),
	regionFilter: selectRegionFilter(state),
	toggleHeader: selectToggleCarousel(state)
})

const mapDispatchToProps = dispatch => ({
	toggleCarousel: () => dispatch(toggleCarousel())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CollectionsOverview))



