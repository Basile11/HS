// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBQbDDBf-xGkc4mqQRsx-OOwJfRlfNus0I",
  authDomain: "homeservices-e7d81.firebaseapp.com",
  databaseURL: "https://homeservices-e7d81-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "homeservices-e7d81",
  storageBucket: "homeservices-e7d81.appspot.com",
  messagingSenderId: "349001696533",
  appId: "1:349001696533:web:d37df7212000612a8c551c",
  measurementId: "G-NZ16DN2EFT"
};

// Initialize Firebase
const auth = getAuth(app);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export {auth};