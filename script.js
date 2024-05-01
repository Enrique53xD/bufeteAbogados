import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set } from "firebase/database"; // Import the necessary functions for database operations

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCG1Gw4TMZFiPUCjw2Fdifpz9PYt65iNGQ",
    authDomain: "abogados-d3805.firebaseapp.com",
    projectId: "abogados-d3805",
    storageBucket: "abogados-d3805.appspot.com",
    messagingSenderId: "761918186682",
    appId: "1:761918186682:web:53503914902036a07cce83",
    measurementId: "G-P1D4CW0P4R"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

function writeToDatabase() {
  document.getElementById('statusText').textContent = 'Failed to write data';

  // Get a reference to the database service
  var db = firebase.database();

  // Create a reference to the location you want to write to
  var dbRef = db.ref('Clientes/0');

  // Write the data
  dbRef.set({name: 'value'}).then(() => {
    console.log('Data written successfully');

    // Change the text of an HTML element
    document.getElementById('myText').textContent = 'Data written successfully';
  }).catch((error) => {
    console.error('Failed to write data:', error);

    // Change the text of an HTML element

  });
}

function changeColor() {
  document.getElementById("my-div").style.backgroundColor = "#00FF00";
}