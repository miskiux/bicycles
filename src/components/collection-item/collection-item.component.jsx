import React, {useState, Suspense} from 'react';
import {useImage, Img} from 'react-image'


import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter, useLocation, useHistory } from 'react-router-dom'

import CustomButton from '../custom-button/custom-button.component';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {AddCircle} from '@styled-icons/ionicons-outline/AddCircle'
import { ViewShow } from '@styled-icons/zondicons/ViewShow'


import { addItem } from '../../redux/favourites/favourites.actions'

import { SpinnerContainer, SpinnerOverlay } from '../with-spinner/with-spinner.styles'
import './collection-item.styles.scss';

 //too many spinners: main and and individual spinners

const CollectionItem = ({ item, addItem, id, match }) => {

const history = useHistory();

const [index, setIndex] = useState(0);

const MyImageComponent = () => {
  const {src} = useImage({
    srcList: images[index],
  })
  return <img className='image' src={src} />
}

const images = item.url

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

const NavigateToView = () => {
	history.push({
		pathname: `/item/${id}`,
		
	})
}



	const { manufacturer, model, price } = item;
	return (
	<div className='collection-item'>
		<Suspense fallback={
			<SpinnerOverlay>
				<SpinnerContainer />
			</SpinnerOverlay>
			}>
      		<MyImageComponent />
   		</Suspense>
		<div className='collection-footer'>
			<div className='model-manufacturer'>
				<span className='name'>{manufacturer}</span>
				<span className='name'>{model}</span>
			</div>
				<span className='price'>${price}</span>
		</div>
		<AddCircle onClick={() => addItem({item, id})} 
			className="addcircle"
			/>
		<ViewShow 
			className="view-show"
			onClick={NavigateToView}	
		 >

		 </ViewShow>
			<ChevronRightIcon onClick={onClickForward} className="image-arrow-right" />
			<ChevronLeftIcon onClick={onClickBackwards} className="image-arrow-left" />
		</div>
	)}

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item)) 
})

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
	)(CollectionItem);

