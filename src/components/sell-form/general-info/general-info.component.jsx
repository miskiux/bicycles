import React, {useEffect} from 'react';

import { Grid, Form, Input, Segment, Button } from 'semantic-ui-react';

const GeneralInfo = (props) => {
 
	return (
		<div>
		{
			props.currentStep == 1 ?
		<Form>		
				<Grid columns={2} divided>
					<Grid.Row>
						<Grid.Column>
							<Segment>
								<Form.Group widths='equal'>
								<div>
									<Form.Field>
										<label>Manufacturer</label>
										<Input 
											name='manufacturer' 
											type='text' 
											value={props.manufacturer} 
											onChange={props.handleChange}
											
											/>
											</Form.Field>
											<Form.Field>
											<label>Year</label>
											<Input 
												name='year' 
												type='text' 
												value={props.year}
												onChange={props.handleChange}
												
												/>
											</Form.Field>
											<Form.Field>
											<label>Model</label>
												<Input 
													name='model' 
													type='text' 
													value={props.model}
													onChange={props.handleChange}
													  
												/>
												</Form.Field>
												<Form.Field>
												<label>Bicycle Type</label>
												<Input 
													name='bicycleType' 
													type='text' 
													value={props.bicycleType}
													onChange={props.handleChange}
													  
												/>
												</Form.Field>
												<Form.Field>
												<label>Gender</label>
													<Input 
														name='gender' 
														type='text' 
														value={props.gender}
														onChange={props.handleChange}
													/>
												</Form.Field>
												<Form.Field>
												<label>Price</label>
											<Input 
											name='price' 
											type='text' 
											value={props.price}
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

export default GeneralInfo;