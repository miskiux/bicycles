import React from 'react';

import { auth, firestore, addBiciData } from "../../firebase/firebase.utils";

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
      		year: ''
		}
	}

componentDidMount() {
auth.onAuthStateChanged(async (userAuth) => {
		if(userAuth) {
			firestore.collection("users").doc(userAuth.uid)
			.get()
			.then(snapshot => {
				const { uid, bicycleType, description, gender, manufacturer, model, year} = userAuth
				this.setState({
					...snapshot.data(), // snapshotData first so it doesn't override information from authUser object
					uid,
					bicycleType,
      				description,
      				gender,
      				manufacturer,
      				model,
      				year
					})
				}
			)
		}
	})
}

	addItem = async event => {
		event.preventDefault();
		const { bicycleType, description, gender, manufacturer, model, year} = this.state;
		try {
			const biciRef = await firestore.addBiciData(bicycleType, description, gender, manufacturer, model, year);
				this.setState({bicycleType: '', description: '', gender: '', manufacturer: '', model: '', year: ''});
		} catch (error) {
			console.log(error)
		}
	}

	handleChange = event => {
		const {name, value} = event.target;

		this.setState({ [name]: value} ) //dynamically set [] name value
	}

	render() {
		return(
	<div className='sellform'>
			<h2> Sell </h2>
			<span>Sell your bike </span>
		<form className="sellinfo" onSubmit={this.addItem}>
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
				OnChange={this.handleChange}
				required  
			/>
			<label>Bicycle Type</label>
			<input 
				name='bicycleType' 
				type='text' 
				value={this.state.bicycleType}
				OnChange={this.handleChange}
				required  
			/>
		<label>Gender</label>
			<input 
				name='gender' 
				type='text' 
				value={this.state.gender}
				OnChange={this.handleChange}
			/>
		<label>Description</label>
			<input
				className="description" 
				name='description' 
				type='text' 
				value={this.state.description}
				OnChange={this.handleChange}
				label='Description'
				required  
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

