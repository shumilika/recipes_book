
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEx8bDYB1fanHMrZy9ZAbWw2oeXIzg46E",
  authDomain: "recipes-app-f9d47.firebaseapp.com",
  projectId: "recipes-app-f9d47",
  storageBucket: "recipes-app-f9d47.firebasestorage.app",
  messagingSenderId: "132014800134",
  appId: "1:132014800134:web:1014055f0befe1e91ff287",
  measurementId: "G-8S3XFN4JBK"
};



const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };


