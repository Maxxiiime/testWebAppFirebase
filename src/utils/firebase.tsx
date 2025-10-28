// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: "AIzaSyAS75vzFHCcmx7NcgKyraUOQjCa2etLeAU",
  authDomain: "libraryappdatabase-eb2a5.firebaseapp.com",
  projectId: "libraryappdatabase-eb2a5",
  storageBucket: "libraryappdatabase-eb2a5.firebasestorage.app",
  messagingSenderId: "651921221761",
  appId: "1:651921221761:web:3f53d875250f43d00e8580",
  measurementId: "G-TH5M51W9TR"

};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)

