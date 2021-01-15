import React, {useState} from 'react';
import { connect } from 'react-redux';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

import './sign-in.styles.scss';

function SignIn({ googleSignInStart, emailSignInStart }) {

	const [userInfo, setUserInfo] = useState({
		email: '',
		password: ''
	})

	const { email, password } = userInfo;

	const handleSubmit = async event => {
		event.preventDefault();
		emailSignInStart(email, password);	
	}

	const handleChange = event => {
		const {value, name} = event.target;
		setUserInfo({...userInfo, [name]: value}) 
	}

		return(
		<div className='sign-in'>
			<span>Sign in with your email and password </span>
		<form onSubmit={handleSubmit}>
			<FormInput 
				name='email' 
				type='email' 
				value={email} 
				handleChange={handleChange}
				label='email'
				required  
				/>
			<FormInput 
				name='password' 
				type='password' 
				value={password}
				handleChange={handleChange}
				label='password'
				required  
			/>
			<div className='buttons'>
				<CustomButton type='submit'>Sign In</CustomButton>
				<CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
			</div>
		</form>
	</div>
		)
	}


const mapDispatchToProps = dispatch => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password})) //passing in as object, key goes as values
})

export default connect(null, mapDispatchToProps)(SignIn);


