
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

  var name = document.getElementById('name').value;
  var emailid = document.getElementById('emailid').value;
  var msgContent = document.getElementById('msgContent').value;

  saveMessages(name, emailid, msgContent);

  document.querySelector('.alert').style.display = 'block';
  document.getElementById('contactForm').reset();

  setTimeout(function() {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);
}

const saveMessages = (name, emailid, msgContent) => {
  var newContactForm = contactFormDB.push();
  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent
  })
};
