import React, {useState, useEffect, Suspense} from 'react';
import {useImage, Img} from 'react-image'
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter, useLocation, useHistory } from 'react-router-dom'

import CustomButton from '../custom-button/custom-button.component';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { ViewShow } from '@styled-icons/zondicons/ViewShow'


import { addItem } from '../../redux/side-nav/side-nav.actions'

import { LazyLoadImage } from 'react-lazy-load-image-component';

import { SpinnerContainer, SpinnerOverlay } from '../with-spinner/with-spinner.styles'

import '../item/styles.scss'

import './collection-item.styles.scss';

const CollectionItem = ({ item, addItem, id, match }) => {

const [index, setIndex] = useState(0);
const [isLoading, setIsLoading] = useState(true);
const [didLoad, setLoad] = useState(false)

const images = item.url
const { manufacturer, model, price } = item;

const imageStyle = didLoad ? { maxWidth:80 + '%', 
    height:'auto'} : {visibility: 'hidden'};

//image directions
const onClickForward = () => {
	setIndex((index + 1) % images.length);
}

const onClickBackwards = () => {
	let nextIndex = index - 1;
	if (nextIndex < 0) {
		setIndex(images.length - 1); 
    } else {
      	setIndex(nextIndex);
    }
}

//routing
const history = useHistory();

const NavigateToView = () => {
	history.push({
		pathname: `/item/${id}`,
		
	})
}


//transition

//onhover shadow

//transitions to display on render, lazy load pagination

	return (
		<div className='collection-item'>
			<Suspense fallback={
              <SpinnerOverlay>
                <SpinnerContainer />
              </SpinnerOverlay>
             }>
		    	<LazyLoadImage 
		    		alt='err' 
		    		style={imageStyle}
		    		src={images[index]} 
		    		afterLoad={() => setLoad(true)}
		    	 />
		     </Suspense>
		    {
			didLoad ?
				<div className='collection-menu'>
	   			<div className="addcircle">
					<FavoriteBorderIcon onClick={() => addItem({item, id})}/>
				</div>	
			 	<div className='navigation-arrows'>
					<ChevronLeftIcon onClick={onClickBackwards} className="image-arrow-left" />
					<ChevronRightIcon onClick={onClickForward} className="image-arrow-right" />
				</div>
				<div className='collection-footer'>
					<div className='model-manufacturer' onClick={NavigateToView}>
						<span className='manufacturer-name'>{manufacturer}</span>
						<span className='model-name'>{model}</span>
					</div>
						<span className='price'>${price}</span>
					</div>
				</div>
			: ""
		}
		</div>
	)}

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item)) 
})

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
	)(CollectionItem);

