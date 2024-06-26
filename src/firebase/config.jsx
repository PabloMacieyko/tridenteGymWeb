// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDic0M1QmCYM9j0BlFqJlXYSx9jsHN09aU",
  authDomain: "trydentegym.firebaseapp.com",
  projectId: "trydentegym",
  storageBucket: "trydentegym.appspot.com",
  messagingSenderId: "380799275101",
  appId: "1:380799275101:web:38d8fb07ff2bdb38eefdb4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
