
import { initializeApp } from "firebase/app";

import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import  publicRuntimeConfig  from "../reactConfig";
import { getStorage } from "firebase/storage";

const firebaseApp = initializeApp(publicRuntimeConfig.firebaseConfig);
const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const getCollection = (collectionPath: string) =>
  collection(firestore, collectionPath);



  const registerUser = (email: string, password: string, name: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(cred => {
      const userRef = doc(firestore, 'users', cred.user.uid);
      return setDoc(userRef, {
        id: cred.user.uid,
        email: email,
        name: name,
        hasVoted: false,
        points: 0,
        isOnline: true
      });
    });
  };


  const loginUser = async (email: string, password: string) => {
    try {
      const credential = await signInWithEmailAndPassword(auth, email, password);
      const userDocRef = doc(firestore, "users", credential.user.uid);
      await updateDoc(userDocRef, {
        isOnline: true,
      });
      return credential;
    } catch (error) {
      throw error;
    }
  };





const resetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};


const subscribeToAuthChanges = (handleAuthChanges: any) => {
  auth.onAuthStateChanged((user) => {
    handleAuthChanges(user);
  });
};

// const addUserToDb = async (collectionName: string, email: string, name: string) => {
//   const userInfo = {
//     id: user.id,
//     email: email,
//     name: name,
//     hasVoted: false,
//     points: 0
//   }
//     try {
//       const docRef = await addDoc(collection(firestore, collectionName), userInfo);
//       console.log('Document written with ID: ', docRef.id);
//     } catch (e) {
//       console.error('Error adding document: ', e);
//     }

  
// }



export default firebaseApp;
export {
  auth,
  firestore,
  storage,
  getCollection,
  loginUser,
  registerUser,
  resetPassword,
  subscribeToAuthChanges,
  
};