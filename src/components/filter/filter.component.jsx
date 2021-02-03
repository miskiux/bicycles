import React, {useState, useEffect} from 'react';

import { useSelector } from 'react-redux';

import PriceItem from './price/price-item.component'
import ManufacturerCheckBox from './manufacturer/manufacturer-filter.component'
import LocationItem from './location/location-item.component';

import { Dropdown, Button, Icon } from 'semantic-ui-react';

import './filter.styles.css';

const Filter = () => {

const [tags, setTags] = useState([])

const price = useSelector(state => state.shop.priceRange)

useEffect(() => {

}, [])


	return (
		<div>
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
					<div>
						<Button icon={<Icon name='delete' link/>}>price</Button>

					</div>
			</div>
		)
}

export default Filter;