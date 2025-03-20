import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./firebase.config";

const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = initializeAuth(FirebaseApp);
export const db = getFirestore(FirebaseApp);
