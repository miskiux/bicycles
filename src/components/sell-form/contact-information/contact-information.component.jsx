import React, {useEffect} from 'react';

import { Grid, Form, Input, Segment, Button } from 'semantic-ui-react';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

const ContactInformation = (props) => {
 
	return (
		<div>
		{
			props.currentStep == 2 ?
			<Form>		
				<Grid columns={1} >
					<Grid.Row>
						<Grid.Column>
							<Segment>
								<Form.Group widths='equal'>
								<div>
									<Form.Field>
										<label>Country</label>
										<CountryDropdown 
											value={props.country}
											onChange={(value) => props.selectCountry(value)}								  
											/>
											</Form.Field>
											<Form.Field>
											<label>Region</label>
												<RegionDropdown
		          									country={props.country} 
													value={props.region}
													onChange={(value) => props.selectRegion(value)}							  
													/>
												</Form.Field>
												<Form.Field>
												<label>Address</label>
													<input 
														name='address' 
														type='text' 
														value={props.address}
														onChange={props.handleChange}							  
													/>
												</Form.Field>
												<Form.Field>
												<label>Phone Number</label>
													<input 
														name='phone' 
														type='text' 
														value={props.phone}
														onChange={props.handleChange} 
													/>
												</Form.Field>				
										</div>
								</Form.Group>
							</Segment>
						</Grid.Column>
					</Grid.Row>
				</Grid>
			</Form>
			: ""
		}
			
		</div>
	)
}

export default ContactInformation;

