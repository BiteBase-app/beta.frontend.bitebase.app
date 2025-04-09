// Test Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoVa7LlMV9WZkS4TVgMx7SXTn_E2gjt0Q",
  authDomain: "bitebase-3d5f9.firebaseapp.com",
  projectId: "bitebase-3d5f9",
  storageBucket: "bitebase-3d5f9.firebasestorage.app",
  messagingSenderId: "869869191395",
  appId: "1:869869191395:web:0bb2821dfc368800e305d6",
  measurementId: "G-CB8TNELCRL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

console.log("Firebase initialized successfully");
console.log("Firebase app:", app);
console.log("Firebase auth:", auth);
