import React, {useState, useEffect} from 'react';
 
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import Spec from '../spec/spec.component';
import AdditionalInfo from '../size-condition/size-condition.component'

import { Grid, Input, Segment, Form, Button } from 'semantic-ui-react';
import './spec-form.styles.css'

const gridContainer = {
  display: 'flex',
  justifyContent: 'space-between'
};

// remove function - deletes the last one


const SpecForm = (props) => {

	//SPEC options
	const [options, setOptions] = useState([]);

	//shownSelection
	const [toggleSpec, setToggleSpec] = useState([])

	//spec inputs
	const [specs, setSpecs] = useState([]);

	const addSpec = () => {
		let values = [...specs];
		    values.push([]);
		    setSpecs(values);
	}

	//remove "description" onClick
  	const removeSpec = (index) => {
	    let values = [...specs]
		    values.splice(index, 1);
		    setSpecs(values);
		    props.uploadSpecs(values)
	}

	const removeOption = (index) => {
	    let values = [...options]
		    values.splice(index, 1);
		    setSpecs(values);
		    props.uploadOptions(values)
	}	


	const callOption = (id, option) => {
		let values = [...options];
			values[id] = Object.values(option)[0];
	    	setOptions(values);
	    	props.uploadOptions(values);
  };
 
  //input handle change
  const handleChange = (e, index) => {
    let values = [...specs];
    	values[index] = e.target.value;
    		setSpecs(values);
    		props.uploadSpecs(values)
  };



  //input toggling
  const handleToggle = id => {
		let ids = [...toggleSpec]
		ids.push(id)
		setToggleSpec(ids)
	}

	return (
	<div>
	{ 
	props.currentStep == 4 ?
	<div class="ui grid"
	style={gridContainer}>
					<div className='addspecs'>
							<AddIcon onClick={() => {
								addSpec();
							}} />
							<p>Add specs</p>
						<div>
							{
							specs.map((spec, index) => (
								<div className="description">
									<Spec 
										id={index}
										key={index}
										callOption={callOption}
										handleToggle={handleToggle}
										/>
									{
								toggleSpec.includes(index) ?
								<div>
									<TextField
										key={index}
										onChange={(e) => handleChange(e, index)}  
										id="standard-basic" 
										label="Description"  
									    />
									<Button type="button" 
									onClick={() => {
										removeOption(index);
										removeSpec(index);
									}}
									> X </Button>
								</div>
									    : ""
							}
								</div>      
							))
							}			   
						</div>
					</div>
				<div>
					<AdditionalInfo />
				</div>			
		</div>
		: ""
		}
	</div>
	)
}


export default SpecForm;


