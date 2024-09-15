import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

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
