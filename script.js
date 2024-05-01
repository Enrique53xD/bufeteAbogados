
const firebaseConfig = {
  apiKey: "AIzaSyBNTQjo2wd7_sNU8b_W2TS-bV-bfwKV8Nw",
  authDomain: "bufete-77390.firebaseapp.com",
  databaseURL: "https://bufete-77390-default-rtdb.firebaseio.com",
  projectId: "bufete-77390",
  storageBucket: "bufete-77390.appspot.com",
  messagingSenderId: "486486486302",
  appId: "1:486486486302:web:f913f5fc365c6b07ea2d0f"
};

firebase.initializeApp(firebaseConfig);

const contactFormDB = firebase.database().ref('contactForm')

document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal('name');
  var emailid = getElementVal('emailid');
  var msgContent = getElementVal('msgContent');

  console.log(name, emailid, msgContent);

}

const getElementVal = (id) => { 
  document.getElementById(id).value; 
}