// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
 
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);

// Authentication
const authDb = getAuth(app);

// Firestore
const db = getFirestore(app);

// Storage
const storageDb = getStorage(app);


export { authDb, db, storageDb };