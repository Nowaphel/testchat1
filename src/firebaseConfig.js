// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK2obFhgXllncImWfn6mCtXWFlqCA9YjU",
  authDomain: "whome1-d91eb.firebaseapp.com",
  databaseURL: "https://whome1-d91eb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "whome1-d91eb",
  storageBucket: "whome1-d91eb.appspot.com",
  messagingSenderId: "983906595743",
  appId: "1:983906595743:web:f2db13b24cb6bcb25683aa",
  measurementId: "G-2LBESC2VN9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firestore
const db = getFirestore(app);

// Export Firestore database
export { db, analytics };
