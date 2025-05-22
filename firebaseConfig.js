import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBQGT_dScHHR783N9HhLAPbPdJFl60TDuA",
  authDomain: "afri-gai-auth.firebaseapp.com",
  projectId: "afri-gai-auth",
  storageBucket: "afri-gai-auth.firebasestorage.app",
  messagingSenderId: "137239073272",
  appId: "1:137239073272:web:fa9a2a8f886d2a6ad0060d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };