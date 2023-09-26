// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-8a37c.firebaseapp.com",
  projectId: "mern-auth-8a37c",
  storageBucket: "mern-auth-8a37c.appspot.com",
  messagingSenderId: "92824162650",
  appId: "1:92824162650:web:ba476e7d05929dafd5a363"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);