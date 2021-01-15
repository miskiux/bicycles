import React, {useState, useEffect, useCallback} from 'react';

import { auth, firestore, storage, addBiciData } from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import ImageInput from './image-input/image-input.component';

import { selectCurrentUser }  from '../../redux/user/user.selectors';
import { useStorage } from "../../hooks/useStorage.js";

import GeneralInfo from './general-info/general-info.component'
import ContactInformation from './contact-information/contact-information.component'
import SpecForm from './spec-info/spec-form/spec-form.component';

import './sell-form.styles.css'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Grid, Form, Input, Segment, Button } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

// losing spec form state(options, inputs) on re-render

// 1. container - using with-spinner higher order components

//STEPS : 1. DISPATCHING UPLOAD_START - opens withSpinner; 2. listen to success => UPLOAD_SUCCESS => closes withSpinner, brings SUCCESS COMPONENT

	//getting document id

function SellForm({currentUser}) {

	const [data, setData] = useState({
			currentStep: 1, 
			userId: '',
			bicycleType: '',
			subCategory: '',
			options:[],
      		description: [],
      		size: "",
      		condition: "",
      		gender: '',
      		manufacturer: '',
      		model: '',
      		price: '',
      		year: null,
      		country: '',
      		phone: '',
      		address: '',
      		region: '',
      		image: [],
		})

	const [ isLoading, setIsLoading ] = useState(false)

	const {
		currentStep,  
		userId,
		bicycleType,
		subCategory,
		options,
		description,
		size,
		condition,
		gender,
		manufacturer,
		model,
		price,
		year,
		country,
		phone,
		address,
		region,
		image } = data

useEffect(() => {
	setData( {...data, userId: currentUser.id} )
}, [currentUser])


// if  not work, addItem dispatch action: isLoading: true
const { url } = useStorage(image, isLoading);

const startLoading = () => {
	setIsLoading(true)
}

const addItem = async (event) => {
	try {
		await addBiciData({bicycleType, description, gender, manufacturer, model, year, price, userId, url, phone, address, subCategory, size, condition, options});
			setData((prevData) => ({...data, manufacturer: '', model: '', price: '', phone: '', address: '', size: ''}))
	} catch (error) {
		console.log(error)
	}
}

	const handleChange = event => {
		const {name, value} = event.target;
		setData({...data, [name]: value })
	}

	//handle bind for form submit
	const handleBind = async event => {
		event.preventDefault();
			await startLoading();
			await addItem();
	}
	//receiving imageFiles from callback
const uploadImages = (imageFiles) => {
		setData({...data, image: imageFiles})
	}
 
//specs through callback
const uploadSpecs = (specs) => {
	setData({...data, description: specs})
}

//callback from description
const uploadOptions = (option) => {
	setData({...data, options: option})
}

const uploadGender = (gender) => {
	let value = Object.values(gender)[0];
	setData({...data, gender: gender})
}

const uploadType = (type) => {
	let value = Object.values(type)[0];
	setData({...data, bicycleType:value})
}

const uploadSubType = (sub) => {
	setData({...data, subCategory: sub})
}

const uploadAddress = (location) => {
	setData({...data, address: location})
}

const onRadioChange = (event) => {
	setData({...data, condition: event.target.value})
  }

const handleYear = year => {
		setData({...data, year: year})
	}


//NAVIGATING: CURRENT STEP

const next = () => {
		setData({...data, currentStep: currentStep + 1})
		}

const prev = () => {
   	setData({...data, currentStep: currentStep - 1})
}

		//NAVIGATING: NAVIGATION BUTTONS

  const previousButton = () => {
 	if(currentStep !==1) {
 		return (
 			<Button 
 			type="button"
 			onClick={prev}>Back</Button>
 			)
 	}
 	return null;
 }


 // next button onClick to 

  const nextButton = () => {
 	if(currentStep < 4){
    return (
      <Button onClick={next}
      type="button"
      >
      Next
      </Button>   
      )
	}
	return null
 } 

		return(
			<div className="sell-form">	
				<Form onSubmit={handleBind}>
				{console.log(url)}
					<GeneralInfo
						currentStep={currentStep} 
						handleChange={handleChange}
						manufacturer={manufacturer}
						year={year}
						model={model}
						bicycleType={bicycleType}
						gender={gender}
						price={price}
						handleYear={handleYear}
						uploadGender={uploadGender}
						uploadType={uploadType}
						uploadSubType={uploadSubType}
						/>

					<ContactInformation
						currentStep={currentStep}
						handleChange={handleChange}
						phone={phone}
						uploadAddress={uploadAddress}
					/>

					<ImageInput
						currentStep={currentStep}
						uploadImages={uploadImages}
					/>

					<SpecForm
						uploadSpecs={uploadSpecs}
						uploadOptions={uploadOptions}
						currentStep={currentStep} 
						description={description}
						size={size}
						condition={condition}
						handleChange={handleChange}
						onRadioChange={onRadioChange}
					/>
					<div>
					 {previousButton()}
      				 {nextButton()}
      				</div>
      				 
      				 {
      				 	currentStep === 4 ?
      				 		<Button type='submit'>Submit</Button>
      				 	: ""
      				 }
				</Form>
			</div>
		)}
		

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state)
});


export default connect(mapStateToProps)(SellForm);

