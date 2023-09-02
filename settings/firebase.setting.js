// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getApp,getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBG6ckslhICY9YtEXnayC48ltgQKzCMj6Y",
  authDomain: "face-p.firebaseapp.com",
  projectId: "face-p",
  storageBucket: "face-p.appspot.com",
  messagingSenderId: "974215858801",
  appId: "1:974215858801:web:c388695db021c1b3a4e9d0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);

export { authentication,db }