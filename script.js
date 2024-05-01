// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfxzpGTEUAZO4B1_ZqH-tJLb5a0-k5m8w",
  authDomain: "bufeteabogados-680b8.firebaseapp.com",
  projectId: "bufeteabogados-680b8",
  storageBucket: "bufeteabogados-680b8.appspot.com",
  messagingSenderId: "329647614547",
  appId: "1:329647614547:web:cb03406aa34f66f19bb4a6",
  measurementId: "G-VSENH4EXCX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);