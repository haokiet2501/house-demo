import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB56WjJ5_6-A-YrbaAPOiGxEw2ck3crFlQ",
  authDomain: "house-marketplace-f6d4a.firebaseapp.com",
  projectId: "house-marketplace-f6d4a",
  storageBucket: "house-marketplace-f6d4a.appspot.com",
  messagingSenderId: "734840690314",
  appId: "1:734840690314:web:cefe4df40e14d2c33abf73"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore()