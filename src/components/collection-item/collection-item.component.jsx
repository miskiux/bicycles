import React from 'react';

import CustomButton from '../custom-button/custom-button.component';

import { connect } from 'react-redux';
import { addItem } from '../../redux/favourites/favourites.actions'

import './collection-item.styles.scss';

const CollectionItem = ({item, addItem}) => {
	const { name, price, imageUrl } = item;
	return (
	<div className='collection-item'>
		<div
			className='image'
			style={{
				backgroundImage: `url(${imageUrl})`
			}}
		/>
		<div className='collection-footer'>
			<span className='name'>{name}</span>
			<span className='price'>{price}</span>
			</div>
			<CustomButton onClick={() => addItem(item)}inverted> Add To Favourites </CustomButton>
		</div>
	)}

const mapDispatchToProps = dispatch => ({
	addItem: item => dispatch(addItem(item)) //creating new function - whenever there is addItem, it will get an item in as property, and then dispatching addItem(action)
})

export default connect(null, mapDispatchToProps)(CollectionItem);