
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

window.onload = function() {
  displayData();
};

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

function readData() {
  contactFormDB.on('value', function(snapshot) {
    var data = snapshot.val();
    var keys = Object.keys(data);
    console.log(data[keys[0]].emailid);
  });
}

function displayData() {
  searchValue(contactFormDB, document.getElementById('nameInput').value).then(info => {
    var nameList = document.getElementById('nameList');
    nameList.innerHTML = ''; // Clear the list

    info.forEach(data => {
      var listItem = document.createElement('li');
      listItem.textContent = data.name + ' - ' + data.emailid + ' - ' + data.key;
      nameList.appendChild(listItem);
    });
  }).catch(error => {
    console.error('Failed to get data:', error);
  });
}
function searchValue(db, id) {
  return new Promise((resolve, reject) => {
    db.on('value', function(snapshot) {
      var data = snapshot.val();
      var keys = Object.keys(data);

      var info = [];

      keys.forEach(key => {
        if (data[key].name.toLowerCase().includes(id.toLowerCase())) {
          data[key].key = key; // Add the key as a property
          info.push(data[key]);
          
        }
      });
      
      resolve(info);
    }, reject);
  });
}

function updateValue() {
  return new Promise((resolve, reject) => {
    contactFormDB.on('value', function(snapshot) {
      var data = snapshot.val();
      var keys = Object.keys(data);

      var info = [];

      keys.forEach(key => {
        if (data[key].name.toLowerCase().includes(document.getElementById('idInput').value.toLowerCase())) {
          updateValueByName(contactFormDB, key, { emailid: document.getElementById('emailInput').value });
        }
      });
      
      resolve(info);
    }, reject);
  });
}

function updateValueByName(db, name, newValue) {
  searchKeyByName(db, name).then(key => {
    var dbRef = db.ref(key);
    dbRef.update(newValue).then(() => {
      console.log('Data updated successfully');
    }).catch((error) => {
      console.error('Failed to update data:', error);
    });
  }).catch(error => {
    console.error('Failed to find name:', error);
  });
}


