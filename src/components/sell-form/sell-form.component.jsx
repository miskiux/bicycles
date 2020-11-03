import React from 'react';

import { auth, firestore, storage, addBiciData } from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import './sell-form.styles.scss'


class SellForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bicycleType: '',
      		description: '',
      		gender: '',
      		manufacturer: '',
      		model: '',
      		year: '',
      		url: '',
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
					uid,
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

	uploadImage = event => {
		const {image} = this.state
		//storing image
		const uploadTask = storage.ref(`/images/${image.name}`).put(image)
	//getting the image url
		uploadTask.on(
		"state_changed",
		(snapShot) => {
			console.log(snapShot)
		},
		error => {
			console.log(error);
		},
		() => {
			storage.ref("images").child(image.name).getDownloadURL()
			.then(imgUrl => {
				this.setState(prevObject => ({...prevObject, url:imgUrl}))
				})		
		})
}
//additem getting reference through addBiciData
	addItem = async (event) => {
		const { uid, bicycleType, description, gender, manufacturer, model, year, url} = this.state;
		
		try {
			console.log(this.state.url)
			const biciRef = await addBiciData(uid, {bicycleType, description, gender, manufacturer, model, year, url });

		} catch (error) {
			console.log(error)
		}
	}

	handleChange = event => {
		const {name, value} = event.target;

		this.setState({ [name]: value} ) //dynamically set [] name value
	}

	handleBind = event => {
		event.preventDefault();
		this.uploadImage();
		this.addItem();
	}



	render() {
		return(
	<div className='sellform'>
			<h2> Sell </h2>
			<span>Sell your bike </span>
		<form className="sellinfo" onSubmit={this.handleBind}>
			<label>Manufacturer</label>
			<input 
				name='manufacturer' 
				type='text' 
				value={this.state.manufacturer} 
				onChange={this.handleChange}
				required  
				/>
		<label>Year</label>
			<input 
				name='year' 
				type='text' 
				value={this.state.year}
				onChange={this.handleChange}
				required  
			/>
		<label>Model</label>
			<input 
				name='model' 
				type='text' 
				value={this.state.model}
				onChange={this.handleChange}
				required  
			/>
			<label>Bicycle Type</label>
			<input 
				name='bicycleType' 
				type='text' 
				value={this.state.bicycleType}
				onChange={this.handleChange}
				required  
			/>
		<label>Gender</label>
			<input 
				name='gender' 
				type='text' 
				value={this.state.gender}
				onChange={this.handleChange}
			/>
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
			<label>Your Bici</label>
			<input 
			name='image'
			type='file'
			onChange={this.uploadChange}
			/>
			<div className='buttons'>
				<button type='submit'>Submit</button>
			</div>
		</form>
	</div>
		)
	}
}

const mapStateToProps = ({user: { currentUser }}) => ({
  currentUser
});



export default connect(mapStateToProps)(SellForm);

