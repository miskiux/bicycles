import React, {useState, useEffect, Suspense} from 'react';
import { connect } from 'react-redux';

import CollectionItem from '../collection-item/collection-item.component'  
 
import { selectAll } from '../../redux/shop/shop.selectors' 
import { priceRangeSelector } from '../../redux/shop/shop.selectors'
import { manufacturerSelector } from '../../redux/shop/shop.selectors'
import { locationSelector } from '../../redux/shop/shop.selectors'
import { selectToggleCarousel } from '../../redux/shop/shop.selectors'
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import { toggleCarousel } from '../../redux/shop/shop.actions';

import { SpinnerContainer, SpinnerOverlay } from '../with-spinner/with-spinner.styles'
import './collections-overview.styles.scss'


const CollectionsOverview = ({ bicycles, match, history, priceFilter, manufacturerFilter, toggleHeader, toggleCarousel, locationFilter }) => {
 
	const [filteredBicycles, setFilteredBicycles] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
 
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
			if (locationFilter) {
				result = result.filter(bicycle => bicycle.id
					.split(",")
						.some(key => locationFilter.includes(key)))
			}
			
			setFilteredBicycles(result);

	}, [bicycles, priceFilter, manufacturerFilter, locationFilter])

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
			filteredBicycles.map(({id, ...otherCollectionProps}) =>
				<LazyLoadComponent>
 					<CollectionItem id={id} key={id} {...otherCollectionProps}/>
				</LazyLoadComponent>
			)}
		</div>
	</div>	
		)
}

const mapStateToProps = (state) => ({
	bicycles: selectAll(state),
	priceFilter: priceRangeSelector(state),
	manufacturerFilter: manufacturerSelector(state),
	locationFilter: locationSelector(state),
	toggleHeader: selectToggleCarousel(state)
})

const mapDispatchToProps = dispatch => ({
	toggleCarousel: () => dispatch(toggleCarousel())
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsOverview)
