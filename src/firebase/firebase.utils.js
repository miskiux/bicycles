import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import '@firebase/storage';

const config = {
    apiKey: "AIzaSyAPpbMBEihUbYOuO51R6f-Um88OZXo5I68",
    authDomain: "bici-3be47.firebaseapp.com",
    databaseURL: "https://bici-3be47.firebaseio.com",
    projectId: "bici-3be47",
    storageBucket: "bici-3be47.appspot.com",
    messagingSenderId: "397239191781",
    appId: "1:397239191781:web:5105e88a7099a054dcac0c",
    measurementId: "G-436ZVS1NPV"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return; // exit from the function of userAuth is null(which it is when user is signout)

    const userRef = firestore.doc(`users/${userAuth.uid}`); // getting back user reference at user location and then getting a snapshot
    const snapShot = await userRef.get();                   // and using the snapshot to determine whether or not there is data there(whether user data exists) 

    if(!snapShot.exists) {                     // if it does not exist create a piece of data there by using userRef
      const { displayName, email } = userAuth; // name, email from userAuth 
      const createdAt = new Date();      


      try {             //asynchronous request to store data
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
          console.log('error creating user', error.message);
      }
    }
    return userRef;
  }
// addingBiciData

export const addBiciData = async (uid, additionalData) => {

    const biciRef = firestore.doc(`users/${uid}`).collection("bicycle").doc(); // getting back user reference at user location and then getting a snapshot
    const snapShot = await biciRef.get();                   // and using the snapshot to determine whether or not there is data there(whether user data exists)      

      try {             //asynchronous request to store data
        await biciRef.set({
          ...additionalData
        })
      } catch (error) {
          console.log('error updating user', error.message);
      }
    return biciRef;
  }

//first to store the image in cloud storage, 
//second, to store the path to that image in Firestore to search for it 


/*
export const getBiciData = async (uid, additionalData) => {
 const biciRef = firestore.doc(`users/${uid}`).collection("bicycle").doc(); 
} 
*/

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  

  export const signInWithGoogle = () => auth.signInWithPopup(provider) // signInWithPopup takes the provider class

  export default firebase;
