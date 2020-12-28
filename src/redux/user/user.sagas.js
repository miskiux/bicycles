import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument } from '../../firebase/firebase.utils'

import { signInSuccess, signInFailure } from './user.actions'

//any api can fail, good practice => try block

//refactor(reusable generator function)

export function* getSnapshotFromUserAuth(userAuth) {
	try {
		const userRef = yield call(createUserProfileDocument, userAuth);
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
		const {user} = yield auth.signInWithPopup(googleProvider);
		yield getSnapshotFromUserAuth(user)
	} catch (error) {
		yield put(signInFailure(error))
	}
}

// EMAIL SIGN IN

export function* signInWithEmail({payload: {email, password}}) {
	try {
		const { user } = yield auth.signInWithEmailAndPassword(email, password);
		yield getSnapshotFromUserAuth(user)
	} catch (error) {
		yield put(signInFailure(error))
	}
}

export function* onEmailSignInStart() {
	yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onGoogleSignInStart() {
	yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart)
		]);
}

