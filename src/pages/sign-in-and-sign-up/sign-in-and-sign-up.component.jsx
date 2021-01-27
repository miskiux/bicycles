import React, {useState} from 'react';
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import { Button } from 'semantic-ui-react';


import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUp = () => {

	const [currentStep, setCurrentStep] = useState(1)

	const optionsToSignIn = () => {
 	if(currentStep === 1) {
 		return (
 			<Button 
 			type="button"
 			onClick={() => setCurrentStep(2)}>Sign Up</Button>
 			)
 	} else {
 		return (
 			<Button 
 			type="button"
 			onClick={() => setCurrentStep(1)}>Sign In</Button>
 			)
 	}
 	return null;
 }

return(
		<div className='sign-in-and-sign-up'>
			<SignIn currentStep={currentStep} />
			<SignUp currentStep={currentStep} />
			<div className='sign-options'>
			{optionsToSignIn()}
			</div>
		</div>
	);
}
export default SignInAndSignUp; 