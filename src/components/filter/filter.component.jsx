import React, {useState} from 'react';

import PriceItem from './price/price-item.component'
import ManufacturerCheckBox from './manufacturer/manufacturer-filter.component'
import LocationItem from './location/location-item.component';

import { Accordion, Icon } from 'semantic-ui-react'

import { Dropdown, DropdownButton } from 'react-bootstrap';

import './filter.styles.css';

const Filter = () => {

const [open, setOpen] = useState(false);
const [activeIndex, setActiveIndex] = useState(null);

const handleClick = (e, titleProps) => {
	const { index } = titleProps
	const newIndex = activeIndex === index ? -1 : index
	setActiveIndex(newIndex);
}

	return (
		<div className="filter-container">
			<div className="filter-options">
				<DropdownButton className='filter-selection' title="Price">
				  <Dropdown.Item disabled={true}>
				  	
				  		<PriceItem />

				  </Dropdown.Item>
				</DropdownButton>
				</div>
			</div>

		)
}

export default Filter;