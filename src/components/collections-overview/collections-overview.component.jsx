import React, {useState, useEffect, Suspense} from 'react';
import { connect } from 'react-redux';
 
import {useLocation} from "react-router-dom";


import { LazyLoadComponent } from 'react-lazy-load-image-component';
import CollectionItem from '../collection-item/collection-item.component'  
 
import { selectAll } from '../../redux/shop/shop.selectors';
import { selectFilteredByLocation } from '../../redux/shop/shop.selectors';
import { selectToggleCarousel } from '../../redux/shop/shop.selectors';

import { updateLink } from '../../redux/shop/shop.actions'
import { toggleCarousel } from '../../redux/shop/shop.actions';

import { SpinnerContainer, SpinnerOverlay } from '../with-spinner/with-spinner.styles'
import './collections-overview.styles.scss'

//filtering is not working properly

const CollectionsOverview = ({match, bicycles, toggleHeader, toggleCarousel, locationId, filterData, updateLink }) => {

	const [filteredBicycles, setFilteredBicycles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const {price_range, manufacturer, locations} = filterData

	const filterprice = price_range ? price_range.split(',') : ''
	const filtermanufacturer = manufacturer ? manufacturer.split(',') : ''
	const filterlocation = locations ? locations : ''

	useEffect(() => {
		let result = [...bicycles];

			if (filterprice) {
				result = result.filter(bicycle =>
					  bicycle.item.price
						 >= filterprice[1] && bicycle.item.price <= filterprice[0])
			}
			if(filtermanufacturer) {
				result = result.filter(bicycle => bicycle.item.manufacturer
					.split(",")
						.some(key => filtermanufacturer.includes(key)))	
			}
			if (filterlocation) {
				result = locationId
			}
			setFilteredBicycles(result);
	}, [bicycles, filterData])

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

	useEffect(() => {
	if (!Object.keys(match.params).length) {
		updateLink('all')
	}
}, [match.params])

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
			filteredBicycles.map(({id, ...otherCollectionProps}) =>
				<LazyLoadComponent key={id}>
 					<CollectionItem key={id} id={id} {...otherCollectionProps}/>
				</LazyLoadComponent>
			)}
		</div>
	</div>	
		)
}

const mapStateToProps = (state) => ({
	bicycles: selectAll(state),
	locationId: selectFilteredByLocation(state),
	toggleHeader: selectToggleCarousel(state)
})

const mapDispatchToProps = dispatch => ({
	toggleCarousel: () => dispatch(toggleCarousel()),
	updateLink: (link) => dispatch(updateLink(link))
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsOverview)
