// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaFp_dUt64jOdiDbO5RLp9Y0aKobOvTKI",
  authDomain: "kalyani-hosiery.firebaseapp.com",
  projectId: "kalyani-hosiery",
  storageBucket: "kalyani-hosiery.firebasestorage.app",
  messagingSenderId: "867295710340",
  appId: "1:867295710340:web:97ab1babaf218ec98386d1",
  measurementId: "G-3PG33GF3SM"
};

// Initialize Firebase
const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

export const auth = getAuth(app);