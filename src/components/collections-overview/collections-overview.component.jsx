import React, {useState, useEffect, Suspense} from 'react';
import { connect } from 'react-redux';

import {useLocation} from "react-router-dom";

import CollectionItem from '../collection-item/collection-item.component'  
 
import { selectAll } from '../../redux/shop/shop.selectors';

import { priceRangeSelector } from '../../redux/shop/shop.selectors'
import { selectFilteredByPrice } from '../../redux/shop/shop.selectors';

import { manufacturerSelector } from '../../redux/shop/shop.selectors';
import { selectFilteredyByManufacturer } from '../../redux/shop/shop.selectors';

import { selectFilteredByLocation } from '../../redux/shop/shop.selectors';
import { locationSelector } from '../../redux/shop/shop.selectors';

import { selectToggleCarousel } from '../../redux/shop/shop.selectors';


import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { toggleCarousel } from '../../redux/shop/shop.actions';

import { SpinnerContainer, SpinnerOverlay } from '../with-spinner/with-spinner.styles'
import './collections-overview.styles.scss'


const CollectionsOverview = ({bicycles, history, priceFilter, manufacturerFilter, toggleHeader, toggleCarousel, locationFilter, price, manufacturer, locationId }) => {
 
	

	const [filteredBicycles, setFilteredBicycles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	

	// useEffect(() => {
	// 	let result = [...bicycles];

	// 		if (price && price.length !== 0) {
	// 			result = priceFilter
	// 		}
	// 		// if(manufacturer && manufacturer.length !== 0) {
	// 		// 	result = manufacturerFilter
	// 		// }
	// 		// if (locationId && location.length !== 0) {
	// 		// 	result = locationFilter
	// 		// }
	// 		setFilteredBicycles(result);
	// }, [bicycles, priceFilter, manufacturerFilter, locationFilter, price, manufacturer, locationId])

	//caching images
	useEffect(() => {
		const imagesArr = bicycles.map((bicycle) => bicycle.item.url)
		const arr = imagesArr.flat()
		cacheImages(arr)
	}, [])

	useEffect(() => {
		if (toggleHeader == false) {
			toggleCarousel()
		}
	}, [])

	const cacheImages = async(srcArray) => {
		const promises = await srcArray.map((src) => {
			return new Promise((resolve, reject) => {
				const img = new Image();
				img.src = src;
				img.onload = resolve();
				img.onerror = reject();
			})
		})
		await Promise.all(promises);
		setIsLoading(false)
	}
	
	if (isLoading) {
	return (
		<SpinnerOverlay>
             <SpinnerContainer />
          </SpinnerOverlay>
		)
  }

	return (
			<div className='collections-overview'>			
				<div className='preview'>
			{
			bicycles.map(({id, ...otherCollectionProps}) =>
				<LazyLoadComponent key={id}>
 					<CollectionItem key={id} id={id} {...otherCollectionProps}/>
				</LazyLoadComponent>
			)}
		</div>
	</div>	
		)
}

const mapStateToProps = (state, ownProps) => ({
	bicycles: selectAll(state),
	
	locationId: locationSelector(state),

	toggleHeader: selectToggleCarousel(state)
})

const mapDispatchToProps = dispatch => ({
	toggleCarousel: () => dispatch(toggleCarousel()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsOverview)
