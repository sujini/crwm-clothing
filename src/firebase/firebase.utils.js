
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config= {
    apiKey: "AIzaSyBzCy6EhdZfiumjKCqLqa9B3SdQkrZXMg8",
    authDomain: "crwn-db-a54ac.firebaseapp.com",
    databaseURL: "https://crwn-db-a54ac.firebaseio.com",
    projectId: "crwn-db-a54ac",
    storageBucket: "crwn-db-a54ac.appspot.com",
    messagingSenderId: "206578225637",
    appId: "1:206578225637:web:ab1e1ad169d29801b21f0c",
    measurementId: "G-ZF7CL0GZQE"
  };

  export const createUserProfileDocument = async (userAuth,additionalData) => {
      if(!userAuth) return;
      const userRef = firestore.doc(`users/${userAuth.uid}`);
      const snapShot = await userRef.get();
      if(!snapShot.exists){
          const {displayName,email} =userAuth;
          const createdAt = new Date();
          try{
              await userRef.set({
                  displayName,
                  email,
                  createdAt,
                  ...additionalData
              })

          }catch(error){
              console.log('error creating user',error.message)

          }
      }
      return userRef;

  }
  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt:'select_account'});
  export const signInwithGoogle = () =>auth.signInWithPopup(provider);

  export default firebase;