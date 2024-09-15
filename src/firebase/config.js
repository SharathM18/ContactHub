import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: String(import.meta.env.VITE_API_KEY),
  authDomain: String(import.meta.env.VITE_AUTH_DOMAIN),
  projectId: String(import.meta.env.VITE_PROJECT_ID),
  storageBucket: String(import.meta.env.VITE_STORAGE_BUCKET),
  messagingSenderId: String(import.meta.env.VITE_MESSAGING_SENDER_ID),
  appId: String(import.meta.env.VITE_APP_ID),
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
