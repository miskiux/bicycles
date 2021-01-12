import React from 'react';

import { auth, firestore, storage, addBiciData } from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import ImageInput from './image-input/image-input.component';

import { selectFiles } from '../../redux/sell/sell.selectors'
import { selectCurrentUser }  from '../../redux/user/user.selectors'
import { selectImagePopUp } from '../../redux/sell/sell.selectors'

import { toggleImagePopUp } from '../../redux/sell/sell.actions'

import GeneralInfo from './general-info/general-info.component'
import ContactInformation from './contact-information/contact-information.component'
import SpecForm from './spec-info/spec-form/spec-form.component';

import './sell-form.styles.css'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Grid, Form, Input, Segment, Button } from 'semantic-ui-react';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import 'semantic-ui-css/semantic.min.css';

//how to avoid tons of callbacks

class SellForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentStep: 1,
			url: [], 
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
		}
	}

componentDidMount() {
	const {currentUser} = this.props;
	this.setState({userId: currentUser.id})
}

//receiving imageFiles from callback
uploadImages = (imageFiles) => {
			this.setState({
				image: imageFiles
			});
	}
 
//specs through callback
uploadSpecs = (specs) => {
	this.setState({
		description: specs
	})
}

//callback from description
uploadOptions = (option) => {
	this.setState({
		options: option
	})
}
uploadGender = (gender) => {
	this.setState({gender: gender})
}

uploadType = (type) => {
	this.setState({bicycleType:type})
}

uploadSubType = (sub) => {
	this.setState({subCategory: sub})
}

uploadAddress = (location) => {
	this.setState({address: location})
}

onRadioChange = (event) => {
    this.setState({condition: event.target.value});
  }

//image upload
//* Promise.all expects an array of promises | return Promise inside the map callback
// if there is no return value, will return an array with undefined values
uploadImage = async (event) => {

		const {image, userId, url } = this.state
		const urlarray = []

	let result = await Promise.all(
		image.map((image) => {
			return new Promise ((resolve, reject) => {
			//storing image
			const uploadTask = storage.ref(`/images/${userId}/${image.name}`).put(image)
			//getting the image url
				uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log(progress)
				},
				error => {
					console.log(error);
				},
				 () => {
					storage.ref(`/images/${userId}`).child(image.name).getDownloadURL()
							.then(imgUrl => {
								imgUrl.split(',');
								urlarray.push(imgUrl)
								this.setState({url:urlarray})
								resolve(urlarray)
									})
								})
					})
				})
			)	
}
//additem getting reference through addBiciData
	addItem = async (event) => {
		const {bicycleType, description, gender, manufacturer, model, year, price, userId, url, phone, address, country, region, subCategory, size, condition} = this.state;
		
		try {
			await addBiciData({bicycleType, description, gender, manufacturer, model, year, price, userId, url, country, phone, address, region, subCategory, size, condition});
			this.setState({manufacturer: '', model: '', price: '', phone: '', address: '', size: ''})
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = event => {
		const {name, value} = event.target;
		this.setState({ [name]: value })
	}

	handleYear = year => {
		this.setState({year: year})
	}

	//handle bind for form
	handleBind = async event => {
		event.preventDefault();
		await this.uploadImage();
		await this.addItem();
	}

//NAVIGATING: CURRENT STEP

next = (event) => {
	let currentStep = this.state.currentStep
	currentStep = currentStep >= 3 ? 
	4: currentStep + 1
	this.setState({
		currentStep: currentStep
	})
}

prev = (event) => {
	let currentStep = this.state.currentStep
	currentStep = currentStep <= 1 ? 
	1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
}

		//NAVIGATING: NAVIGATION BUTTONS

  previousButton = () => {
 	let currentStep = this.state.currentStep

 	if(currentStep !==1) {
 		return (
 			<Button 
 			type="button"
 			onClick={this.prev}>Back</Button>
 			)
 	}
 	return null;
 }


 // next button onClick to 

  nextButton = () => {
 	let currentStep = this.state.currentStep
 	if(currentStep < 4){
    return (
      <Button onClick={this.next}
      type="button"
      >
      Next
      </Button>   
      )
	}
	return null
 } 


	render() {
		return(
			<div className="sell-form">	
				<Form onSubmit={this.handleBind}>
					<GeneralInfo
						currentStep={this.state.currentStep} 
						handleChange={this.handleChange}
						manufacturer={this.state.manufacturer}
						year={this.state.year}
						model={this.state.model}
						bicycleType={this.state.bicycleType}
						gender={this.state.gender}
						price={this.state.price}
						handleYear={this.handleYear}
						uploadGender={this.uploadGender}
						uploadType={this.uploadType}
						uploadSubType={this.uploadSubType}
						/>

					<ContactInformation
						currentStep={this.state.currentStep}
						handleChange={this.handleChange}
						phone={this.state.phone}
						uploadAddress={this.uploadAddress}
					/>

					<ImageInput
						currentStep={this.state.currentStep}
						uploadImages={this.uploadImages}
					/>

					<SpecForm
						uploadSpecs={this.uploadSpecs}
						uploadOptions={this.uploadOptions}
						currentStep={this.state.currentStep} 
						description={this.description}
						size={this.state.size}
						condition={this.state.condition}
						handleChange={this.handleChange}
						onRadioChange={this.onRadioChange}
					/>
					<div>
					 {this.previousButton()}
      				 {this.nextButton()}
      				</div>
      				 
      				 {
      				 	this.state.currentStep === 4 ?
      				 		<Button type='submit'>Submit</Button>
      				 			: ""
      				 }
				</Form>
			</div>
						)
					}
				}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  files: selectFiles(state),
  imagePopUp: selectImagePopUp(state)
});


export default connect(mapStateToProps)(SellForm);

