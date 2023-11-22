// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCYOXo0VNelaSQ3AHNsJMpHbJrBxlumw64",
  authDomain: "multimart-b84eb.firebaseapp.com",
  projectId: "multimart-b84eb",
  storageBucket: "multimart-b84eb.appspot.com",
  messagingSenderId: "848790054807",
  appId: "1:848790054807:web:d28f2fe807d1fdfd61c6d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
