import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,

  apiKey: "AIzaSyCHnSbgY267aYuAEhRuUvl5pRRUeMutVoI",
  authDomain: "user-search-b9d87.firebaseapp.com",
  projectId: "user-search-b9d87",
  storageBucket: "user-search-b9d87",
  messagingSenderId: "489817954217",
  appId: "1:489817954217:web:aaf7348d9b9a35f38956b8",
};

console.log(firebaseConfig.appId, "appId");
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
console.log("Firebase initialized successfully");

export { app, db };
