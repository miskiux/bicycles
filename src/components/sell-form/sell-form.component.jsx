import React, {useState, useEffect} from 'react';

import { connect } from "react-redux";
import { withRouter, useHistory } from 'react-router-dom'

import ImageInput from './image-input/image-input.component';

import { selectCurrentUser }  from '../../redux/user/user.selectors';
import { SelectHasImagesLoaded } from '../../redux/sell/sell.selectors';
import { SelectIsLoaded } from '../../redux/sell/sell.selectors';
import { SelectSubmitSuccess } from '../../redux/sell/sell.selectors'

import { bicycleUploadStart } from '../../redux/sell/sell.actions';
import { imageUploadStart } from '../../redux/sell/sell.actions';
import { submitSuccess } from '../../redux/sell/sell.actions';
 
import { useStorage } from "../../hooks/useStorage.jsx";

import GeneralInfo from './general-info/general-info.component'
import ContactInformation from './contact-information/contact-information.component'
import SpecForm from './spec-info/spec-form/spec-form.component';

import './sell-form.styles.css'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Form, Button } from 'semantic-ui-react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { SpinnerContainer, SpinnerOverlay } from '../with-spinner/with-spinner.styles'

import { makeStyles } from '@material-ui/core/styles';
import 'semantic-ui-css/semantic.min.css';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function SellForm({submitDone, currentUser, hasImagesLoaded, bicycleUploadStart, imageUploadStart, isLoaded, submitSuccess}) {

	const [data, setData] = useState({
			currentStep: 1, 
			userId: '',
			bicycleType: '',
			subCategory: '',
			options:[],
      		description: [],
      		info: "",
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
      		email: '',
      		coordinates: []
		})
	const classes = useStyles();
	const [open, setOpen] = useState(true);

	const {
		currentStep,  
		userId,
		bicycleType,
		subCategory,
		options,
		description,
		size,
		info,
		condition,
		gender,
		manufacturer,
		model,
		price,
		year,
		email,
		phone,
		address,
		coordinates,
		image } = data

useEffect(() => {
	setData( {...data, userId: currentUser.id, email: currentUser.email} )
}, [currentUser])


const { url, key } = useStorage(image);

useEffect(() => {
	if (hasImagesLoaded === true) {
		bicycleUploadStart({bicycleType, email, key, description, gender, manufacturer, model, year, price, userId, url, phone, address, subCategory, size, condition, options, info})
		setData((prevData) => ({...data, manufacturer: '', model: '', price: '', phone: '', address: '', size: '', info: ''}))
	}
}, [hasImagesLoaded])

	const handleChange = event => {
		const {name, value} = event.target;
		setData({...data, [name]: value })
	}

	//receiving imageFiles from callback
	const uploadImages = (imageFiles) => {
		setData((prevData) => ({...data, image: imageFiles}))
	}
 
//specs through callback
const uploadSpecs = (specs) => {
	setData((prevData) => ({...data, description: specs}))
}

//callback from description
const uploadOptions = (option) => {
	setData((prevData) => ({...data, options: option}))
}

const uploadGender = (gender) => {
	let value = Object.values(gender)[0];
	setData((prevData) => ({...data, gender: value}))
}

const uploadType = (type) => {
	let value = Object.values(type)[0];
	setData((prevData) => ({...data, bicycleType:value}))
}

const uploadSubType = (sub) => {
	setData((prevData) => ({...data, subCategory: sub}))
}

const uploadAddress = (location) => {
	setData((prevData) => ({...data, address: location}))
}

const uploadCoordinates = (coords) => {
	setData(() => ({...data, coordinates: coords })) 
}

const onRadioChange = (event) => {
	setData({...data, condition: event.target.value})
  }

const handleYear = year => {
		setData((prevData) => ({...data, year: year}))
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

 // submit success actions
const history = useHistory();

 const handleClose = () => {
	submitSuccess();
	history.push(`/shop`)
 }

		return(
			<div className="sell-form">
			{console.log(coordinates)}	
				{ isLoaded ? 
					<SpinnerOverlay>
						<SpinnerContainer />
					</SpinnerOverlay>
					: submitDone ?
					<div className={classes.root}>
						<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
					        <Alert onClose={handleClose} severity="success">
					          Your bicycle has been submitted !
					        </Alert>
					     </Snackbar>
					</div>
				     :
					<Form onSubmit={() => imageUploadStart() }>

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
										uploadCoordinates={uploadCoordinates}
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
										info={info}
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
							}
			</div>
		)}
		

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  hasImagesLoaded: SelectHasImagesLoaded(state),
  isLoaded: SelectIsLoaded(state),
  submitDone: SelectSubmitSuccess(state)
});

const mapDispatchToProps = dispatch => ({
	bicycleUploadStart:(additionalData) => dispatch(bicycleUploadStart(additionalData)),
	imageUploadStart: () => dispatch(imageUploadStart()),
	submitSuccess: () => dispatch(submitSuccess())
})


export default connect(mapStateToProps, mapDispatchToProps)(SellForm);

