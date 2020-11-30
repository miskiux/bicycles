import React, {useState} from 'react';

import PriceDropdown from './price/price-dropdown.component'
import ManufacturerCheckBox from './manufacturer/manufacturer-filter.component'
import LocationItem from './location/location-item.component';

import { Dropdown } from 'semantic-ui-react';
import { Accordion, Icon } from 'semantic-ui-react'

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

					<Accordion styled>
						<Accordion.Title
							active={activeIndex === 0}
				          	index={0}
				          	onClick={handleClick}
				          	>
								<Icon name='dropdown' />
									Price
						</Accordion.Title>
						<Accordion.Content active={activeIndex === 0}>
							<PriceDropdown />
						</Accordion.Content>

						<Accordion.Title
							active={activeIndex === 1}
				          	index={1}
				          	onClick={handleClick}
				          	>
								<Icon name='dropdown' />
									Manufacturer
					</Accordion.Title>
						<Accordion.Content active={activeIndex === 1}>
							<ManufacturerCheckBox />
						</Accordion.Content>

						<Accordion.Title
							active={activeIndex === 2}
				          	index={2}
				          	onClick={handleClick}
				          	>
								<Icon name='dropdown' />
									Location
							</Accordion.Title>
						<Accordion.Content active={activeIndex === 2}>
							<LocationItem />
						</Accordion.Content>
					</Accordion>
				</div>
			</div>

		)
}

export default Filter;