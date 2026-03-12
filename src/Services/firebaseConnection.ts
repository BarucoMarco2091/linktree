import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDVxtsPxifSg9A1DDh5R0kaaF-z3FIaueM",
  authDomain: "reactlinks-3490d.firebaseapp.com",
  projectId: "reactlinks-3490d",
  storageBucket: "reactlinks-3490d.firebasestorage.app",
  messagingSenderId: "546444678823",
  appId: "1:546444678823:web:787e3c67771c4afa3cad82"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }