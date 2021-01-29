import React, {useState} from 'react';
import { connect, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';
import { Button } from 'semantic-ui-react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

import './sign-in-and-sign-up.styles.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
})); 

const SignInAndSignUp = () => {

		function Alert(props) {
	  return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const classes = useStyles();

	const [open, setOpen] = useState(true);

	const [currentStep, setCurrentStep] = useState(1)

	const redirect = useSelector(state => state.user.redirectTo)
	const history = useHistory();

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

const handleClose = () => {
	history.push(redirect)
 }

 if (redirect) {
  		return (
  				<div>
	  				<div className={classes.root}>
							<Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
						        <Alert onClose={handleClose} severity="success">
						          welcome
						        </Alert>
						     </Snackbar>
						</div>
	  			 </div>
  		)
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