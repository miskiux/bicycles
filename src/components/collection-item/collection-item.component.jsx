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
const CollectionItem = ({ item, addItem, id, match}) => {

//routing
const history = useHistory();

console.log(match) 

const [currentPosition, setCurrentPosition] = useState(0);

let currentUrl = item.url[currentPosition]

const onClickForward = () => {
	currentPosition !== item.url.length -1 ?
	setCurrentPosition(currentPosition + 1) : setCurrentPosition(currentPosition = 0);
	currentUrl = item.url[currentPosition]
}

const onClickBackwards = () => {
	currentPosition !== 0 ?
	setCurrentPosition(currentPosition - 1) : setCurrentPosition(currentPosition = item.url.length - 1);
	currentUrl = item.url[currentPosition]
}

const NavigateToView = () => {
	history.push(`/${id}`)
}

	const { manufacturer, model, price } = item;
	return (
	<div className='collection-item'>
	<div className="selection-menu"></div>
		<div
			className='image'
			style={{
				backgroundImage: `url(${currentUrl})`
			}}
		/>
		<div className='collection-footer'>
			<div className='model-manufacturer'>
				<span className='name'>{manufacturer}</span>
				<span className='name'>{model}</span>
			</div>
				<span className='price'>${price}</span>
		</div>
		<AddCircle onClick={NavigateToView} 
			className="addcircle"
			/>
		<ViewShow 
			className="view-show"
			onClick={() => history.push(`/${id}`)}
			
		 >

		 </ViewShow>
			<ChevronRightIcon onClick={onClickForward} className="image-arrow-right" />
			<ChevronLeftIcon onClick={onClickBackwards} className="image-arrow-left" />
		</div>
	)}

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item)) //creating new function - whenever there is addItem, it will get an item in as property, and then dispatching addItem(action)
})

export default compose(
	withRouter,
	connect(null, mapDispatchToProps)
	)(CollectionItem);

