import React, {useState} from 'react';
import PriceDropdown from './price/price-dropdown.component'

import { Dropdown } from 'semantic-ui-react'


import './filter.styles.css';

const Filter = () => {

const [open, setOpen] = useState(false)

//onClick with action
	return (
		<div className="filter-container">
			<div className="filter-options">
				<div className='filter-options-item'
					onClick={() => setOpen(!open)}
					> 
					Price
				</div>
					<div className="filter-options-content">
						{ open ?
							<div className="filter-options-area">
						<PriceDropdown />
							</div>
						: null
						}
					</div>
				<div className='filter-options-item'>
					Manufacturer
				</div> 
				<div className='filter-options-item'>
					Location
				</div>  
			</div>
		</div>

		)
}

export default Filter;