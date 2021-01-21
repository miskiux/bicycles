import React, {useState} from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import { withRouter, useLocation, useHistory } from 'react-router-dom'

import CustomButton from '../custom-button/custom-button.component';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {AddCircle} from '@styled-icons/ionicons-outline/AddCircle'
import { ViewShow } from '@styled-icons/zondicons/ViewShow'

import { addItem } from '../../redux/favourites/favourites.actions'

import './collection-item.styles.scss';


//cannot receive match params from itemId
const CollectionItem = ({ item, addItem, id, match }) => {

//routing
const history = useHistory();

const [index, setIndex] = useState(0);

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
	<div className="selection-menu"></div>
		<div
			className='image'
			style={{
				backgroundImage: `url(${images[index]})`
			}}
		/>
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

