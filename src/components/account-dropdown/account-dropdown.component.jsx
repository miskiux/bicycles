import React, {useState} from 'react';

import FavouriteDropdown from '../favourites-dropdown/favourites-dropdown.component';
import BiciInfo from '../bici-info/bici-info.component';

import {Container, Row, Col} from 'react-bootstrap';

import './account-dropdown.styles.scss'


function AccountDropdown() {

	const [toggle, setToggle] = useState(0)

	return (
		<div className='account-dropdown'>
			<Container className='account-display'>
			  <Row>
			    <Col>
			    	{
						toggle === 1 ?
						<BiciInfo />
						: 
						<FavouriteDropdown />
					}
		
			    </Col>
			  </Row>
			</Container>
			<div className='account-selection-container'>
				<Row>
				    <Col>
				    	<div className='account-selection' onClick={() => setToggle(0)}>
				    		<h3>favourites</h3>
				    	</div>
				    </Col>
				</Row>
				<Row>
				    <Col>
				    	<div className='account-selection' onClick={() => setToggle(1)}>
				    		<h3>listings</h3>
				    	</div>
				    </Col>
				 </Row>
			</div>

		</div>
		)
}

export default AccountDropdown;