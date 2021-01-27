import React, {useState} from 'react';
import { connect, useSelector } from 'react-redux';
import { Redirect } from "react-router";

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

import './sign-in.styles.scss';

function SignIn({ googleSignInStart, emailSignInStart, currentStep }) {


	const [userInfo, setUserInfo] = useState({
		email: '',
		password: ''
	})

	const { email, password } = userInfo;

	const redirect = useSelector(state => state.user.redirectTo)

	const handleSubmit = async event => {
		event.preventDefault();
		emailSignInStart(email, password);	
	}

	const handleChange = event => {
		const {value, name} = event.target;
		setUserInfo({...userInfo, [name]: value}) 
	}

	if (redirect) {
  		return <Redirect to={redirect} />;
	}

		return(
			<div className='user-sign-options'>
				{
					currentStep === 1 ?
						<div className='sign-in'>
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
					: ""
				}
			</div>
		)
	}


const mapDispatchToProps = dispatch => ({
	googleSignInStart: () => dispatch(googleSignInStart()),
	emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password})) //passing in as object, key goes as values
})

export default connect(null, mapDispatchToProps)(SignIn);


