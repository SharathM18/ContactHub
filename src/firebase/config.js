import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: String(import.meta.env.VITE_FIREBASE_API_KEY),
//   authDomain: String(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
//   projectId: String(import.meta.env.VITE_FIREBASE_PROJECT_ID),
//   storageBucket: String(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
//   messagingSenderId: String(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
//   appId: String(import.meta.env.VITE_FIREBASE_APP_ID),
// };

const firebaseConfig = {
  apiKey: "AIzaSyD8OyM_JvHAu28pyU5BY3hBt98xVg-zTqw",
  authDomain: "contacthub-787df.firebaseapp.com",
  projectId: "contacthub-787df",
  storageBucket: "contacthub-787df.appspot.com",
  messagingSenderId: "147467627312",
  appId: "1:147467627312:web:e10c0bd95501558ab5f6f5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
