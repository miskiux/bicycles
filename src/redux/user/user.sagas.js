import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument, getCurrentUserSession } from '../../firebase/firebase.utils'

import { 
	signInSuccess, 
	signInFailure, 
	signOutSuccess, 
	signUpSuccess,
	signUpFailure,
	redirect
	 } from './user.actions'

//refactor(reusable generator functionn
export function* getSnapshotFromUserAuth(userAuth, additionalData, history) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
		const userSnapshot = yield userRef.get();
		yield put(signInSuccess({ 
			id: userSnapshot.id, 
			...userSnapshot.data()
	}))
	} catch (error) {
		yield put(signInFailure(error))
	}
}

// GOOGLE SIGN IN

export function* signInWithGoogle() {
	try {
		const { user } = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user)
		yield put(redirect('/'))
	} catch (error) {
		yield put(signInFailure(error))
	} 
}

// EMAIL SIGN IN

export function* signInWithEmail({payload: {email, password}}) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user)
		yield put(redirect('/'))
	} catch (error) {
		yield put(signInFailure(error))
	}
}

// CHECK USER SESSION

export function* isUserAuthenticated() {
	try {
		const userAuth = yield getCurrentUserSession();
		if(!userAuth) return;
		yield getSnapshotFromUserAuth(userAuth)

	} catch(error) {
		yield put(signInFailure(error))
	}
}

// SIGN OUT

export function* signOut() {
	try {
		yield auth.signOut();
		yield put(signOutSuccess())
		yield put(redirect(null))
	} catch (error) {
		yield put(signInFailure(error))
	}
}

//SIGN UP
export function* signUp({payload: {displayName, email, password}}) {
	try {
		const { user } = yield auth.createUserWithEmailAndPassword(email, password)
		yield put(signUpSuccess({user, additionalData: {displayName}}))
	} catch (error) {
		yield put(signUpFailure(error))
	}
} 

export function* signInAferSignUp({payload: {user, additionalData}}) {
	yield getSnapshotFromUserAuth(user, additionalData)
	yield put(redirect('/'))
}


//LISTENERS

export function* onSignOutStart() {
	yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut )
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* onCheckUserSession() {
	yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignUp() {
	yield takeLatest(UserActionTypes.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
	yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAferSignUp )
}

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutStart),
		call(onSignUp),
		call(onSignUpSuccess)
		]);
}

