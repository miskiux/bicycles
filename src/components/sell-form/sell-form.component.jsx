import React from 'react';

import { auth, firestore, storage, addBiciData } from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import ImageInput from './image-input.component';

import { selectFiles } from '../../redux/sell/sell.selectors'
import { selectCurrentUser }  from '../../redux/user/user.selectors'
import { selectImagePopUp } from '../../redux/sell/sell.selectors'

import { toggleImagePopUp } from '../../redux/sell/sell.actions'

import './sell-form.styles.css'

import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Grid, Form, Input, Segment, Button } from 'semantic-ui-react';

import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';

import 'semantic-ui-css/semantic.min.css';

class SellForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: [], 
			userId: '',
			bicycleType: '',
      		description: '',
      		gender: '',
      		manufacturer: '',
      		model: '',
      		price: '',
      		year: '',
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

//receiving imgFiles from callback
uploadChange = (imgFiles) => {
			this.setState({
				image: imgFiles
			});
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
								console.log(urlarray)
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
		const {bicycleType, description, gender, manufacturer, model, year, price, userId, url, phone, address, country, region} = this.state;
		
		try {
			console.log(this.state.url)
			await addBiciData({bicycleType, description, gender, manufacturer, model, year, price, userId, url, country, phone, address, region});
			this.setState({bicycleType: '', description: '', gender: '', manufacturer: '', model: '', year: '', price: '', country: country, phone: '', address: '', region: region})
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = event => {
		const {name, value} = event.target;
		this.setState({ [name]: value} ) //dynamically set [] name value
	}

	// for country, region
	selectCountry = (value) => {
		this.setState({country: value})
	}

	selectRegion = (value) => {
		this.setState({region: value})
	}


	//handle bind for form
	handleBind = async event => {
		event.preventDefault();
		await this.uploadImage();
		await this.addItem();
	}

	//handle bind for image
	imageHandleBind = event => {
		this.togglePopUp();
		this.uploadChange();
	}


	render() {
		const { toggleImagePopUp, imagePopUp } = this.props
		const { image } = this.state
		return(
<Form onSubmit={this.handleBind}>		
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
								value={this.state.manufacturer} 
								onChange={this.handleChange}
								
								/>
								</Form.Field>
								<Form.Field>
								<label>Year</label>
								<Input 
									name='year' 
									type='text' 
									value={this.state.year}
									onChange={this.handleChange}
									
									/>
								</Form.Field>
								<Form.Field>
								<label>Model</label>
									<input 
										name='model' 
										type='text' 
										value={this.state.model}
										onChange={this.handleChange}
										  
									/>
									</Form.Field>
									<Form.Field>
									<label>Bicycle Type</label>
									<input 
										name='bicycleType' 
										type='text' 
										value={this.state.bicycleType}
										onChange={this.handleChange}
										  
									/>
									</Form.Field>
									<Form.Field>
									<label>Gender</label>
										<input 
											name='gender' 
											type='text' 
											value={this.state.gender}
											onChange={this.handleChange}
										/>
									</Form.Field>
									<Form.Field>
									<label>Description</label>
										<input
											className="description" 
											name='description' 
											type='text' 
											value={this.state.description}
											onChange={this.handleChange}
											label='Description'
											 
										/>
									</Form.Field>
									<Form.Field>
									<label>Price</label>
										<input 
											name='price' 
											type='text' 
											value={this.state.price}
											onChange={this.handleChange}
											  
										/>
									</Form.Field>
									<Form.Field>
									<div>Your Bici</div>
									<AddCircleIcon 
										onClick={toggleImagePopUp}
										style={{fontSize: 40}} 
									/>
									{
										!imagePopUp ?
										<div className="image-input-popup">
									{
		
													 <ImageInput
													 callBack={this.uploadChange}
													/>

									}
										</div>
										: null
									}
									</Form.Field>
									</div>
								</Form.Group>
							</Segment>
						</Grid.Column>
							<Grid.Column>
								<Segment>
									<Form.Group widths='equal'>
									<div>
									<Form.Field>
									<label>Country</label>
										<CountryDropdown 
											value={this.state.country}
											onChange={(value) => this.selectCountry(value)}
											  
											/>
									</Form.Field>
									<Form.Field>
									<label>Region</label>
										<RegionDropdown
          									country={this.state.country} 
											value={this.state.region}
											onChange={(value) => this.selectRegion(value)}
											  
											/>
									</Form.Field>
									<Form.Field>
									<label>Address</label>
									<input 
										name='address' 
										type='text' 
										value={this.state.address}
										onChange={this.handleChange}
										  
									/>
									</Form.Field>
									<Form.Field>
									<label>Phone Number</label>
									<input 
										name='phone' 
										type='text' 
										value={this.state.phone}
										onChange={this.handleChange} 
									/>
									</Form.Field>
									</div>
								</Form.Group>
							</Segment>
						</Grid.Column>
					</Grid.Row>
					<Button type='submit'>Submit</Button>
				</Grid>
			</Form>
		)
	}
}

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
  files: selectFiles(state),
  imagePopUp: selectImagePopUp(state)
});

const mapDispatchToProps = dispatch => ({
	toggleImagePopUp: () => dispatch(toggleImagePopUp())
})



export default connect(mapStateToProps, mapDispatchToProps)(SellForm);

