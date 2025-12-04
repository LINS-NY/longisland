// src/firebaseconfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyA_73QW_B_Sm9ENLk-gJsD4pTdiOB6GvJo",
  authDomain: "lins-ddba5.firebaseapp.com",
  projectId: "lins-ddba5",
  storageBucket: "lins-ddba5.appspot.com",
  messagingSenderId: "288142248218",
  appId: "1:288142248218:web:dea9c972b136dbee4f84a3",
  measurementId: "G-7GZG5STFRF"
};

const app = initializeApp(firebaseConfig);

// Auth and Firestore (safe to use on server and client)
export const auth = getAuth(app);
export const db = getFirestore(app);

// Storage (used by client to upload verification files)
export const storage = getStorage(app);

// Analytics only in browser environment
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (err) {
    // analytics may fail in some environments (SSR); ignore silently
    console.warn('Firebase analytics not initialized:', err?.message || err);
  }
}
export { analytics, app };
