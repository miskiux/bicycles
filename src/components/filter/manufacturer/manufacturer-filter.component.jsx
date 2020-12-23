import React, {useState, useEffect} from 'react';
import {selectBicycles} from '../../../redux/shop/shop.selectors'

import {filterByManufacturer} from '../../../redux/shop/shop.actions'

import { connect } from "react-redux";
import { Checkbox } from 'semantic-ui-react';

const ManufacturerCheckBox = ({ manufacturers, filterByManufacturer }) => {

const [manufacturersCheckBoxOptions, setManufacturersCheckBoxOptions] = useState([]);
const [checkBoxValues, setCheckBoxValues] = useState([])

	useEffect (() => {
	const manufacturersFilter = manufacturers.map((bicycles) => bicycles.item.manufacturer)
	setManufacturersCheckBoxOptions(manufacturersFilter);
}, [manufacturers])
	
	// currentIndex === -1, because indexOf outputs -1 when no such value exist  
	const handleToggle = (id) => {
		const currentIndex = checkBoxValues.indexOf(id);
		const newChecked = [...checkBoxValues];

		if(currentIndex === -1){
			newChecked.push(id)
		} else {
			newChecked.splice(currentIndex, 1)
		}
		setCheckBoxValues(newChecked)	
	} 

	return (
		<div>
		{
			manufacturersCheckBoxOptions.map((id, key) => {
				return (
					<Checkbox 
							key={key}
							label={id}
							onChange={() => handleToggle(id)}
							/>
							)})
		}
		<div className="confirm-selection">
		{
			checkBoxValues.length > 0 ?
			<button
							onClick={() => {
								filterByManufacturer(checkBoxValues)}}
							>Confirm Selection</button>
							: (
								<button disabled>Confirm Selection</button>
								) 
		}
							
						</div>
		</div>
		)
	}
// button onclick + dispatches checlboxvalues


const mapStateToProps = (state) => ({
	manufacturers: selectBicycles(state)
})

const mapDispatchToProps = dispatch => ({
	filterByManufacturer: (checkBoxValues) => dispatch(filterByManufacturer(checkBoxValues))
})


export default connect(mapStateToProps, mapDispatchToProps)(ManufacturerCheckBox);



