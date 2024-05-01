import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database"; // Import the necessary functions for database operations

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG1Gw4TMZFiPUCjw2Fdifpz9PYt65iNGQ",
  authDomain: "abogados-d3805.firebaseapp.com",
  projectId: "abogados-d3805",
  storageBucket: "abogados-d3805.appspot.com",
  messagingSenderId: "761918186682",
  appId: "1:761918186682:web:53503914902036a07cce83",
  measurementId: "G-P1D4CW0P4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Get a reference to the database service
const db = getDatabase(app);

// Create a reference to the location you want to write to
const dbRef = ref(db, 'default/clientes/0');

// Write the data
set(dbRef, {name: 'value'}).then(() => {
  console.log('Data written successfully');
}).catch((error) => {
  console.error('Failed to write data:', error);
});