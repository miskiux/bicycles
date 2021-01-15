import React, {useState} from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import {auth, createUserProfileDocument} from '../../firebase/firebase.utils';
import {signUpStart} from '../../redux/user/user.actions'

import './sign-up.styles.scss';

function SignUp({signUpStart}) {

	const [signUpInfo, setSignUpInfo] = useState({
			displayName: '',
			email: '',
			password: '',
			confirmPassword: ''
	})

	const { displayName, email, password, confirmPassword } = signUpInfo
	
	const handleSubmit = event => {
		event.preventDefault();

		if(password !== confirmPassword ) {
			alert("passwords don't match");
			return
		} 
			signUpStart({displayName, email, password})
	}

	const handleChange = event => {
		const {name, value} = event.target;

		setSignUpInfo({...signUpInfo, [name]: value}) 
	}

		return(
			<div className='sign-up'>
				<span>Sign up with your email and password</span>
				<form className='sign-up-form' onSubmit={handleSubmit}>
					<FormInput
					type='text'
					name='displayName'
					value={displayName}
					onChange={handleChange}
					label='Display Name'
					required
					/>
				<FormInput
					type='email'
					name='email'
					value={email}
					onChange={handleChange}
					label='Email'
					required
					/>
					<FormInput
					type='password'
					name='password'
					value={password}
					onChange={handleChange}
					label='Password'
					required
					/>
					<FormInput
					type='password'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleChange}
					label='Confirm Password'
					required
					/>
					<CustomButton type='submit'>Sign Up</CustomButton>
				</form>
			</div>	
			)
	}

	const mapDispatchToProps = dispatch => ({
		signUpStart: (userInfo) => dispatch(signUpStart(userInfo))
	})

export default connect(null, mapDispatchToProps)(SignUp);

