import React, {useState} from 'react';
 
import { v4 as uuidv4 } from 'uuid';
 
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import Spec from '../spec/spec.component';
import AdditionalInfo from '../size-condition/size-condition.component'

import { Button } from 'semantic-ui-react';
import './spec-form.styles.css'

const gridContainer = {
  display: 'flex',
  justifyContent: 'space-between'
};

const SpecForm = (props) => {

	//SPEC options
	const [options, setOptions] = useState([]);

	//dropdowns
	const [dropdowns, setDropdowns] = useState([])

	//shownSelection
	const [toggleSpec, setToggleSpec] = useState([])

	//spec inputs
	const [inputs, setInputs] = useState([]);

	const addInput = () => {
		let values = [...inputs];
		    values.push([]);
		    setInputs(values);
	}
 
	const combineDropdowns = () => {
		setDropdowns([...dropdowns, {id: uuidv4()}]);
	}

	const callOption = (id, option) => {
		let values = [...options];
			values[id] = Object.values(option)[0];
	    		setOptions(values);
	    		props.uploadOptions(values);
  };
 
  //input handle change
  const handleChange = (e, index) => {
    let values = [...inputs];
    	values[index] = e.target.value;
    		setInputs(values);
    		props.uploadSpecs(values)
  };

  //input toggling
  const handleToggle = id => {
		let ids = [...toggleSpec]
		ids.push(id)
		setToggleSpec(ids)
	}


	//REMOVE FUNCTIONS
	const removeInput = (index) => {
  		console.log('spec' + index)
			let values = inputs.filter((item, idx) => idx !== index);
		    setInputs(values);
		    props.uploadSpecs(values)
	}

	const removeOption = (index) => {
		console.log('option' + index)
		    let values = options.filter((item, idx) => idx !== index);
		    setOptions(values);
		    props.uploadOptions(values)
	}

	const removeDropdown = (id) => {
		let newList = dropdowns.filter((item) => item.id !== id);
			setDropdowns(newList)
	}	

	return (
		<div>
			{ 
				props.currentStep === 4 ?
				<div class="ui grid"
				style={gridContainer}>
					<div className='addspecs'>
							<AddIcon onClick={() => {
								addInput();
								combineDropdowns();
							}} />
							<p>Add specs</p>
						<div>
							{
							dropdowns.map((dropdown, index) => (
								<div key={dropdown.id} className="description">							
									<Spec
										id={index}
										callOption={callOption}
										handleToggle={handleToggle}
										/>
									{
								toggleSpec.includes(index) ?
								<div>
									<TextField
										id={index}
										onChange={(e) => handleChange(e, index)}  
										id="standard-basic" 
										label="Description"  
									    />
									<Button type="button" 
										onClick={() => {
											removeDropdown(dropdown.id);
											removeOption(index);
											removeInput(index);
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
					<AdditionalInfo {...props} />
				</div>			
		</div>
		: ""
		}
	</div>
	)
}


export default SpecForm;


