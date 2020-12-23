import React, {useState, useEffect} from 'react';
 
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux';

import { selectBicycleSpec } from "../../../../redux/sell/sell.selectors";

import Spec from '../spec/spec.component';
import SpecInput from '../spec-input/spec-input.component'

import './spec-form.styles.css'


//combining data


const SpecForm = (props) => {

	//spec dropdown
	const [options, setOptions] = useState([]);
	const [dropdowns, setDropdowns] = useState([])

	//spec inputs
	const [specs, setSpecs] = useState([]);

	const addSpec = () => {
		const values = [...dropdowns];
		    values.push([]);
		    	setDropdowns(values);
	}

	//callback to receive data by id
	const callOption = (id, option) => {
		const values = [...options];
			values[id] = option;
	    	setOptions(values);
	    	props.uploadOptions(values)
  };

  //combining input values
  const combineValues = () => {
    const values = [...specs];
    	values.push([]);
    		setSpecs(values);

  };
  //input handle change
  const handleChange = (e, index) => {
    const values = [...specs];
    	values[index] = e.target.value;
    		setSpecs(values);
    		props.uploadSpecs(values)
  };


  //combining options and specs
  // {options}
  // Object.assign the specs array to options

  
	
	return (
	<div>
	{ 
	props.currentStep == 4 ?
		<div className='addspecs'>
				<AddIcon onClick={() => {
					addSpec();
					combineValues();
				}} />
				<p>Add specs</p>
			<div>
				{
					specs.map((spec, index) => (
					<div className="description">
						<Spec 
							id={index}
							callOption={callOption}
							/>
						<TextField id="standard-basic" label="Description"
							      key={index} 
							      onChange={(e) => handleChange(e, index)} 
							       />
						</div>      
					))
				}			   
			</div>
		</div>
		: ""
		}
	</div>
	)
}

const mapStateToProps = state => ({
	Specification: selectBicycleSpec(state)
})

export default connect(mapStateToProps)(SpecForm);


