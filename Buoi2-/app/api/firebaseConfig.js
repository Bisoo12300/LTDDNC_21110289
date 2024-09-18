// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAseaImB-jVEo2Ct1q5ftW_-jrebVdh1k",
  authDomain: "btt2-67904.firebaseapp.com",
  databaseURL: "https://btt2-67904-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "btt2-67904",
  storageBucket: "btt2-67904.appspot.com",
  messagingSenderId: "667942470660",
  appId: "1:667942470660:web:ea69c09acbd007f63c2151"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);

export const FIREBASE_DATABASE = getDatabase(FIREBASE_APP);
