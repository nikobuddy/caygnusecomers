// src/firebaseConfig.ts

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Replace the below config with your Firebase project's config object
const firebaseConfig = {
  apiKey: "AIzaSyAQdsQIo8pkPTTceSkbFBipar0799CJgPs",
  authDomain: "buddy-s-f5634.firebaseapp.com",
  databaseURL: "https://buddy-s-f5634-default-rtdb.firebaseio.com",
  projectId: "buddy-s-f5634",
  storageBucket: "buddy-s-f5634.appspot.com",
  messagingSenderId: "103500395141",
  appId: "1:103500395141:web:987247b43aa64999b4efec",
  measurementId: "G-FKTX56H1SV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
