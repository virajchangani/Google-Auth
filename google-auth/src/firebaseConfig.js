// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3YoRfkYdCGzh2LaTo41dhWEcKfBY6C5I",
  authDomain: "auth-702df.firebaseapp.com",
  projectId: "auth-702df",
  storageBucket: "auth-702df.appspot.com",
  messagingSenderId: "803871945210",
  appId: "1:803871945210:web:2245e0bfb968f29ae17443"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Firebase Auth service
const db = getFirestore(app);
const provider = new GoogleAuthProvider;

export { auth,db,provider };