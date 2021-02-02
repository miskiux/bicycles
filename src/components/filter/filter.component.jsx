import React, {useState} from 'react';

import PriceItem from './price/price-item.component'
import ManufacturerCheckBox from './manufacturer/manufacturer-filter.component'
import LocationItem from './location/location-item.component';

import { Accordion, Icon } from 'semantic-ui-react'

//import { Dropdown, DropdownButton } from 'react-bootstrap';
import { Dropdown } from 'semantic-ui-react';

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
				<Dropdown className='filter-selection' placeholder='Price' 
				selectOnBlur={false} closeOnBlur={false}>
				  <Dropdown.Menu>
				  	<Dropdown.Item onClick={e => e.stopPropagation()}>
					  	<div className='filter-option'>
					  		<PriceItem />
					  	</div>
					 </Dropdown.Item>
					 </Dropdown.Menu>
				</Dropdown>
				<Dropdown className='filter-selection' placeholder='Manufacturer' 
				selectOnBlur={false} closeOnBlur={false}>
				  <Dropdown.Menu >
				  	<Dropdown.Item onClick={e => e.stopPropagation()}>
					  	<div className='filter-option'>
					  		<ManufacturerCheckBox />
					  	</div>
					 </Dropdown.Item>
					 </Dropdown.Menu>
				</Dropdown>
				<Dropdown className='filter-selection' placeholder='Location' 
				selectOnBlur={false} closeOnBlur={false}>
				  <Dropdown.Menu>
				  	<Dropdown.Item
				  	onClick={e => e.stopPropagation()}
				  	>
					  	<div className='filter-option'>
					  		<LocationItem />
					  	</div>
					 </Dropdown.Item>
					 </Dropdown.Menu>
				</Dropdown>
				</div>
			</div>

		)
}

export default Filter;