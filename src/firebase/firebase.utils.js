
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import userActionTypes from '../redux/user/user.types';

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

  export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) => {
      const collectionRef = firestore.collection(collectionKey);
      console.log(collectionRef);
      const batch = firestore.batch();
      objectsToAdd.forEach(obj=>{
          const newDocRef = collectionRef.doc();
          batch.set(newDocRef,obj);
      });
      return await batch.commit();
  }

  export const convertCollectionSnapshotToMap = (collections) => {
      const transformedCollection = collections.docs.map( doc =>{
          const {title,items} = doc.data();
          return{
              routeName:encodeURI(title.toLowerCase()),
              id:doc.id,
              title,
              items
          }
      });
      console.log(transformedCollection);
      return transformedCollection.reduce((accumulator,collection)=>{
          accumulator[collection.title.toLowerCase()] = collection;
          return accumulator;
      },{});
  };

  export const getCurrentUser = () => {
      return new Promise((resolve,reject) => {
          const unsubscribe  =auth.onAuthStateChanged(userAuth=>{
              unsubscribe();
              resolve(userAuth);
          },reject)
      })
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  googleProvider.setCustomParameters({prompt:'select_account'});
  export const signInwithGoogle = () =>auth.signInWithPopup(googleProvider);

  export default firebase;