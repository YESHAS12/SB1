import { initializeApp } from 'firebase/app';
import { getAuth, setPersistence, browserLocalPersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBaOtHb3-osOe84yBH-vAgBWWeRuac7Tdc",
  authDomain: "student-project-35dc4.firebaseapp.com",
  projectId: "student-project-35dc4",
  storageBucket: "student-project-35dc4.firebasestorage.app",
  messagingSenderId: "956977873721",
  appId: "1:956977873721:web:49b7631b5753cd8b885ee8",
  measurementId: "G-FGCC4WKR32"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Set persistence to LOCAL to keep the user logged in
setPersistence(auth, browserLocalPersistence);