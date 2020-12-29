import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import { auth, googleProvider, createUserProfileDocument, getCurrentUserSession } from '../../firebase/firebase.utils'

import { signInSuccess, signInFailure, signOutSuccess, signOutFailure } from './user.actions'

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
	} catch (error) {
		yield put(signInFailure(error))
	}
}

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

export function* userSagas() {
	yield all([
		call(onGoogleSignInStart),
		call(onEmailSignInStart),
		call(onCheckUserSession),
		call(onSignOutStart)
		]);
}

