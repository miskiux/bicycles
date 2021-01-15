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

export const addBiciData = async (additionalData) => {

    const biciRef = firestore.collection("bicycle").doc(); // getting back user reference at user location and then getting a snapshot
    const batch = firestore.batch();
          
const { bicycleType, description, gender, manufacturer, model, year, price, userId, url, phone, address, subCategory, options, size, condition } = additionalData;
const createdAt = new Date();

      try {
        await batch.set(biciRef, {
          address,
          phone,
          userId,
          bicycleType,
          subCategory,
          createdAt,
          item: {
            manufacturer,
            model,
            year,
            price,
            gender,
            description,
            url,
            options,
            description,
            size,
            condition
        }})
      } catch (error) {
          console.log('error updating user', error.message);
      }
    return await batch.commit();

  }

//getting bicycle data

export const getBiciDataForShop = (bicycle) => {
  const bicycleObj = bicycle.docs.map(doc => {
    const { bicycleType, item, address, phone, userId } = doc.data()
    //returning an object
    return {
      // routeName: encodeURI(bicycleType.toLowerCase()).replace(/%20/g, " "), //for routing
      id: doc.id,
      bicycleType,
      item,
      address,
      phone,
      userId
    }
  })
  return bicycleObj.reduce((accumulator, item) => {
    accumulator[item.id] = item;
    return accumulator;
  } , {})
}

//sagas like async/await work of the promises
export const getCurrentUserSession = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe();
      resolve(userAuth)
    }, reject)
  })
}


  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  export const storage = firebase.storage();


  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt: 'select_account'});
  
  export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

  export default firebase;









