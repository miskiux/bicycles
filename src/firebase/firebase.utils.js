import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

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

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  
  export const signInWithGoogle = () => auth.signInWithPopup(provider)

  export default firebase;