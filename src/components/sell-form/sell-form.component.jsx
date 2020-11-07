import React from 'react';

import { auth, firestore, storage, addBiciData } from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import './sell-form.styles.css'

import { Grid, Form, Input, Segment, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'


class SellForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			url: '',
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
      		image: null
		}
	}

componentDidMount() {
auth.onAuthStateChanged(async (userAuth) => {
		if(userAuth) {
			firestore.collection("users").doc(userAuth.uid)
			.get()
			.then(snapshot => {
				const { uid } = userAuth
				this.setState({
					...snapshot.data(), // snapshotData first so it doesn't override information from authUser object
					userId:uid,
					})
				}
			)
		}
	})
}

	uploadChange = event => {
		if (event.target.files[0]) {
			this.setState({image: event.target.files[0]});
		}
	}

	uploadImage =  event => {
		return new Promise ((resolve, reject) => {
			const {image} = this.state
				//storing image
				const uploadTask = storage.ref(`/images/${image.name}`).put(image)
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
					storage.ref("images").child(image.name).getDownloadURL()
					.then(imgUrl => {
						this.setState({url:imgUrl})
						console.log(this.state.url)
						resolve();
						})		
					})
				})
}

//additem getting reference through addBiciData
	addItem = async (event) => {
		const {bicycleType, description, gender, manufacturer, model, year, price, userId, url, phone, address, country} = this.state;
		
		try {
			console.log(this.state.url)
			const biciRef = await addBiciData({bicycleType, description, gender, manufacturer, model, year, price, userId, url, country, phone, address});
			this.setState({bicycleType: '', description: '', gender: '', manufacturer: '', model: '', year: '', price: '', country: '', phone: '', address: ''})
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = event => {
		const {name, value} = event.target;

		this.setState({ [name]: value} ) //dynamically set [] name value
	}


	handleBind = async event => {
		event.preventDefault();
		await this.uploadImage();
		await this.addItem();
	}

	render() {
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
							<input 
								name='manufacturer' 
								type='text' 
								value={this.state.manufacturer} 
								onChange={this.handleChange}
								required  
								/>
								</Form.Field>
								<Form.Field>
								<label>Year</label>
								<input 
									name='year' 
									type='text' 
									value={this.state.year}
									onChange={this.handleChange}
									required  
									/>
								</Form.Field>
								<Form.Field>
								<label>Model</label>
									<input 
										name='model' 
										type='text' 
										value={this.state.model}
										onChange={this.handleChange}
										required  
									/>
									</Form.Field>
									<Form.Field>
									<label>Bicycle Type</label>
									<input 
										name='bicycleType' 
										type='text' 
										value={this.state.bicycleType}
										onChange={this.handleChange}
										required  
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
											required  
										/>
									</Form.Field>
									<Form.Field>
									<label>Price</label>
										<input 
											name='price' 
											type='text' 
											value={this.state.price}
											onChange={this.handleChange}
											required  
										/>
									</Form.Field>
									<Form.Field>
										<label>Your Bici</label>
										<input 
										name='image'
										type='file'
										onChange={this.uploadChange}
										/>
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
										<input 
											name='country' 
											type='text' 
											value={this.state.country}
											onChange={this.handleChange}
											required  
											/>
									</Form.Field>
									<Form.Field>
									<label>Address</label>
									<input 
										name='address' 
										type='text' 
										value={this.state.address}
										onChange={this.handleChange}
										required  
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

const mapStateToProps = ({user: { currentUser }}) => ({
  currentUser
});



export default connect(mapStateToProps)(SellForm);

