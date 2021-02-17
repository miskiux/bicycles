import React, {useState, useEffect} from 'react';

import { useHistory, useLocation } from 'react-router-dom';
import { connect } from "react-redux";

import {selectAll} from '../../../redux/shop/shop.selectors';
import { manufacturerSelector } from '../../../redux/shop/shop.selectors'

import {getManufacturerLabel} from '../../../redux/shop/shop.actions';

import * as QueryString from "query-string"

import { Checkbox } from 'semantic-ui-react';
import { Input } from 'semantic-ui-react';

import './manufacturer-filter.css'

const ManufacturerCheckBox = ({ manufacturers, getManufacturerLabel, queryManufacturer, updateQuery }) => {

const [manufacturersCheckBoxOptions, setManufacturersCheckBoxOptions] = useState([]);
const [checkBoxValues, setCheckBoxValues] = useState([]);
const [searchValue, setSearchValue] = useState('');
const [filteredSelection, setFilteredSelection] = useState([])

//EXISTING URL QUERY
const [manQuery, setManQuery] = useState([])

//NEW QUERY
const [newQuery, setNewQuery] = useState([])

//ALL QUERIES VALUES
const [queryValues, setQueryValues] = useState([])

const {search} = useLocation()
const history = useHistory();

	useEffect (() => {
	const manufacturersFilter = manufacturers.map((bicycles) => bicycles.item.manufacturer)
	setManufacturersCheckBoxOptions(manufacturersFilter);
}, [manufacturers])

	useEffect(() => {
		if (search) {
			const value = QueryString.parse(search)
			let existingQuery = value.manufacturer
			setManQuery(existingQuery)
		 }
	}, [search])

	// Setting newQuery
	useEffect(() => {
		if(checkBoxValues.length) {
			let newQuerryArr = checkBoxValues.filter((el) => queryManufacturer.includes(el))
			setNewQuery(newQuerryArr)
		}
	}, [queryManufacturer, checkBoxValues])


	// on 0 - recharge on button remove

	// useEffect(() => {
	// 		const newChecked = []
	// 		if (checkBoxValues.length == 0 && manufacturersCheckBoxOptions.length != 0) {
	// 			let values = manufacturersCheckBoxOptions.map((item) => item)
	// 				newChecked.push(...values)
	// 				filterByManufacturer(newChecked)
	// 		}
	// }, [checkBoxValues])

	useEffect(() => {
		let filteredManufacturer = [...manufacturersCheckBoxOptions]
		if (searchValue) {
			filteredManufacturer = filteredManufacturer.filter(man => {
				return man.toLowerCase().includes(searchValue.toLowerCase());
			})
		}
		setFilteredSelection(filteredManufacturer)
	}, [searchValue, manufacturersCheckBoxOptions])

	useEffect(() => {
		let result = checkBoxValues
		if (!manQuery) {
			result = result.map((el) => el)
			} 
		if (manQuery && newQuery.length) {
			result = checkBoxValues
			}
		setQueryValues(result)
	}, [manQuery, newQuery])

	//currentIndex === -1, because indexOf outputs -1 when no such value exist  
	const handleToggle = (label) => {
		const currentIndex = checkBoxValues.indexOf(label);
		const newChecked = [...checkBoxValues];

		if (currentIndex === -1){
			newChecked.push(label)
		}
		else {
			newChecked.splice(currentIndex, 1)
		}
		setCheckBoxValues(newChecked)
		getManufacturerLabel(label)	
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
		 	<button disabled={!checkBoxValues.length} className='confirm' onClick={() => updateQuery(search, 'manufacturer', queryValues)} > confirm </button>
		</div>
		)
	}

const mapStateToProps = (state) => ({
	manufacturers: selectAll(state),
	queryManufacturer: manufacturerSelector(state),
})

const mapDispatchToProps = dispatch => ({
	getManufacturerLabel: (checkBoxValues) => dispatch(getManufacturerLabel(checkBoxValues))
})


export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerCheckBox);



