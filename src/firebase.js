// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyCjEGotNS86UE8xJyaLkWw91oRaMD_uoXU",
  authDomain: "projectchatbootstrap.firebaseapp.com",
  projectId: "projectchatbootstrap",
  storageBucket: "projectchatbootstrap.appspot.com",
  messagingSenderId: "846461379061",
  appId: "1:846461379061:web:ba31f75f652611032440bc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
