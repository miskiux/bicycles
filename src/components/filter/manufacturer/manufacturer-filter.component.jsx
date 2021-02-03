import React, {useState, useEffect} from 'react';
import {selectAll} from '../../../redux/shop/shop.selectors'

import {filterByManufacturer} from '../../../redux/shop/shop.actions'

import { connect } from "react-redux";

import { Checkbox } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';

import './manufacturer-filter.css'


const ManufacturerCheckBox = ({ manufacturers, filterByManufacturer }) => {

const [manufacturersCheckBoxOptions, setManufacturersCheckBoxOptions] = useState([]);
const [checkBoxValues, setCheckBoxValues] = useState([]);
const [searchValue, setSearchValue] = useState('');
const [filteredSelection, setFilteredSelection] = useState([])


	useEffect (() => {
	const manufacturersFilter = manufacturers.map((bicycles) => bicycles.item.manufacturer)
	setManufacturersCheckBoxOptions(manufacturersFilter);
}, [manufacturers])

	useEffect(() => {
			const newChecked = []
			if (checkBoxValues.length == 0 && manufacturersCheckBoxOptions.length != 0) {
				let values = manufacturersCheckBoxOptions.map((item) => item)
					newChecked.push(...values)
					filterByManufacturer(newChecked)
			}
	}, [checkBoxValues])

	useEffect(() => {
		let filteredManufacturer = [...manufacturersCheckBoxOptions]
		if (searchValue) {
			filteredManufacturer = filteredManufacturer.filter(man => {
				return man.toLowerCase().includes(searchValue.toLowerCase());
			})
		}
		setFilteredSelection(filteredManufacturer)
	}, [searchValue, manufacturersCheckBoxOptions])

	//currentIndex === -1, because indexOf outputs -1 when no such value exist  
	const handleToggle = (label) => {
		const currentIndex = checkBoxValues.indexOf(label);
		const newChecked = [...checkBoxValues];

		if(currentIndex === -1){
			newChecked.push(label)
		}
		else {
			newChecked.splice(currentIndex, 1)
		}
		setCheckBoxValues(newChecked)
		filterByManufacturer(newChecked)	
	}

	const onSearchChange = (event) => {
		setSearchValue(event.target.value)
	}
	
	return (
		<div className='manufacturer-wrapper'>
			<Input placeholder='Search...' onChange={onSearchChange} />
			
		{
			filteredSelection.map((label, key) => {
				return (
					<Checkbox
						className='manufacturer-checkbox' 
						key={key}
						label={label}
						onChange={() => handleToggle(label)}
						/>
					)})
		 }
		</div>
		)
	}

const mapStateToProps = (state) => ({
	manufacturers: selectAll(state)
})

const mapDispatchToProps = dispatch => ({
	filterByManufacturer: (checkBoxValues) => dispatch(filterByManufacturer(checkBoxValues))
})


export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerCheckBox);



