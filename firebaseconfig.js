// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_73QW_B_Sm9ENLk-gJsD4pTdiOB6GvJo",
  authDomain: "linsny.org",
  projectId: "lins-ddba5",
  storageBucket: "lins-ddba5.appspot.com",
  messagingSenderId: "288142248218",
  appId: "1:288142248218:web:dea9c972b136dbee4f84a3",
  measurementId: "G-7GZG5STFRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()

export {auth};