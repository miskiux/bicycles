import React, {useState} from 'react';
import {connect} from 'react-redux'

import SpecForm from '../spec-info/spec-form/spec-form.component';
import ImageInput from '../image-input/image-input.component'

import { toggleImagePopUp } from '../../../redux/sell/sell.actions'

//calbacks 

// image input 
//spec form 


const YourBici = ({toggleImagePopUp}) => {

const [currentStep, setCurrentStep] = useState(1)

//setting up navigation of the pop up

const next = () => {
	let currentStep = currentStep >= 1 ? 2: currentStep + 1;
	setCurrentStep(currentStep);
}

const previous = () => {
	let currentStep = currentStep <= 1 ? 1: currentStep - 1;
	setCurrentStep(currentStep) 
}



return(
	<div>

	</div>

	)

}

const mapDispatchToProps = dispatch => ({
	toggleImagePopUp: () => dispatch(toggleImagePopUp())
})

export default connect(null, mapDisptachToProps)(YourBici);

