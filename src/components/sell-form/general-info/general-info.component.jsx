import React, {useState, useEffect} from 'react';

import { YearPicker } from 'react-dropdown-date';

import axios from 'axios'
import { Hint } from 'react-autocomplete-hint';

import { Grid, Form, Input, Segment, Button } from 'semantic-ui-react';
import Select from "react-select";

import bicycleList from '../../../assets/general-info.data/bicycle-list.js'
import genderList from '../../../assets/general-info.data/gender-list'

import './general-info.styles.css'


const offroadSubList = ["-","Cross Country", "Dirtjump", "Downhill", "Enduro", "Fat Bike", "Trail"];
const roadSubList = ["-","Cyclocross", "Hybrid/Commuter", "Touring", "Track", "Triathlon"]
const otherSubList = ["-","BMX", "Childrens", "Electric", "Folding", "Tandem", "Unicycle"] 


const GeneralInfo = (props) => {

	//categories
	const [selectedType, setSelectedType] = useState([])
	const [selectedGender, setSelectedGender] = useState([])
	const [selectSubType, setSubType] = useState("")

	const [hintData, setHintData] = useState([])

	const getManufacturerData = () => {
		let page = 1;
		let hintArray = [];
		let maxItter = 15

		do {
			try {
				axios.get(`https://bikeindex.org/api/v3/manufacturers?page=${page}&per_page=100`)
					.then(response => {
						let manufacturerNames = Object.values(response.data)
							.map(res => res
								.map(manufacturer => manufacturer.name))
						let unnestedNames = manufacturerNames.flat()
						hintArray.push(...unnestedNames)
						})
							page++
							maxItter--
					} catch (err) {
				console.error(`Oeps, something is wrong ${err}`)
			}
		} 
		while (maxItter > 0);
		setHintData(hintArray)
	}

	useEffect(() => {
		getManufacturerData()
	}, [])

const typeChange = (selectedType) => {
    setSelectedType(selectedType);
    props.uploadType(selectedType)
  }

const genderChange = (selectedGender) => {
  	setSelectedGender(selectedGender)
  	props.uploadGender(selectedGender)
  }

//subcategory
let type = null
let options = null

if (selectedType.key === "Off-Road") {
	type = offroadSubList;
} else if (selectedType.key === "Road Bicycle") { 
    type = roadSubList; 
  } else if (selectedType.key === "Other") { 
   	type = otherSubList; 
  } 

  if(type) {
	options = type.map((el) => <option key={el} value={el}>{el}</option>
  	)
  }

  const handleChange = event => {
  	setSubType(event.target.value)
  	props.uploadSubType(event.target.value)
  } 

	return (
		<div>
		{
			props.currentStep == 1 ?
			<div className='general-info'>	
				<Grid columns={1}>
					<Grid.Row>
						<Grid.Column>
							<Segment>
								<Form.Group widths='equal'>
								<div className='general-info-wrapper'>
									
										<h3> bicycle information</h3>

									<Form.Field>
										<label>Manufacturer</label>
											<Hint options={hintData}>
												<input 
													name='manufacturer' 
													type='text'
													autoComplete="off" 
													value={props.manufacturer} 
													onChange={props.handleChange}
													/>
											</Hint>
											</Form.Field>
											<Form.Field>
											<label>Year</label>
											<YearPicker
												name='year' 
												start={1960}
												end={2021}
												reverse 
												value={props.year}
												onChange={(year) => props.handleYear(year)}		
												/>
											</Form.Field>
											<Form.Field>
											<label>Model</label>
												<input 
													name='model' 
													type='text'
													autoComplete="off"  
													value={props.model}
													onChange={props.handleChange}								  
												/>
												</Form.Field>
												<Form.Field>
												<label>Bicycle Type</label>
												<Select
											          value={selectedType}
											          onChange={(value) => typeChange(value)}
											          options={bicycleList}
											          placeholder=""
											          />
												</Form.Field>
												{ 
													selectedType.key !== undefined 
													&& 
													["Off-Road", "Road Bicycle", "Other"].includes(selectedType.key) ? 
													<Form.Field>
															<label>Sub Category</label>
															<select
																value={selectSubType}
																onChange={handleChange}
																defaultValue=""
															> 
												            { 
												              options 
												            } 
												          </select> 
												         </Form.Field>
												         : null
														}
												<Form.Field>
												<label>Gender</label>
													<Select
											          value={selectedGender}
											          onChange={(value) => genderChange(value)}
											          options={genderList}
											          placeholder=""
											          />
													</Form.Field>
												<Form.Field>
												<label>Price</label>
											<Input 
											name='price'
											autoComplete="off"  
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
				</div>
			: ""
		}
		</div>

		)
}

export default GeneralInfo;
