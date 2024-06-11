import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chat-761dd.firebaseapp.com",
  projectId: "chat-761dd",
  storageBucket: "chat-761dd.appspot.com",
  messagingSenderId: "1063683510379",
  appId: "1:1063683510379:web:fa73b6110e14fcb373a12e",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
