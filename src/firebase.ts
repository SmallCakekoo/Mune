// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Aqui mi apikey",
  authDomain: "mune-smallcakeko.firebaseapp.com",
  projectId: "mune-smallcakeko",
  storageBucket: "mune-smallcakeko.firebasestorage.app",
  messagingSenderId: "573318059374",
  appId: "1:573318059374:web:6ea4893f61fce90d381d7f",
  measurementId: "G-6S52B8SZWV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
