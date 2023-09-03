// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getApp,getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD9mEY79VayFPo60t2U01KkvxX9GFFdrRU",
  authDomain: "face-pal.firebaseapp.com",
  projectId: "face-pal",
  storageBucket: "face-pal.appspot.com",
  messagingSenderId: "98611431542",
  appId: "1:98611431542:web:f9964dd694b9c875f23757"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentication = getAuth(app);
const db = getFirestore(app);

export { authentication,db }