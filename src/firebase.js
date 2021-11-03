// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore'
import {getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signOut,signInWithEmailAndPassword} from'firebase/auth'
import { useEffect, useState } from "react";



// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY ,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Initialize Firebase
const Firebase = initializeApp(firebaseConfig);
const db = getFirestore(Firebase);
const auth = getAuth(Firebase);
export default db;


export function logOut(){
    return signOut(auth);
}

export function signup(email, password) {
  return  createUserWithEmailAndPassword(auth, email, password);
}
export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}
export function useAuth() {
    const [currentUser,setCurrentUser] = useState()
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth, (user)=>setCurrentUser(user))
        return unSubscribe;
    },[])
    return currentUser ;
}
