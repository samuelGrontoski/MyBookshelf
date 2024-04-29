import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBSK7UsFgf4PACiRIP3ndaBgXA7XL7Serw",
  authDomain: "mybookshelf-8af52.firebaseapp.com",
  projectId: "mybookshelf-8af52",
  storageBucket: "mybookshelf-8af52.appspot.com",
  messagingSenderId: "851359442563",
  appId: "1:851359442563:web:5800d0abdbd64d31b8ddb6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);