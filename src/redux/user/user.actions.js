import UserActionTypes from './user.types';

//Google Sign In
export const googleSignInStart = () => ({
	type: UserActionTypes.GOOGLE_SIGN_IN_START
})
//Email Sign In
export const emailSignInStart = (emailAndPassword) => ({
	type: UserActionTypes.EMAIL_SIGN_IN_START,
	payload: emailAndPassword
})

export const signInSuccess = user => ({
	type: UserActionTypes.SIGN_IN_SUCCESS,
	payload: user
})

export const signInFailure = error => ({
	type: UserActionTypes.SIGN_IN_FAILURE,
	payload: error
})

