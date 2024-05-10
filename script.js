console.log("Pagina Iniciada")

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



console.log("Base Iniciada")



const clientesDB = firebase.database().ref('clientes')
const procuradorDB = firebase.database().ref('procuradores')
const casosDB = firebase.database().ref('casos')
var clienteSelect
var procuradorSelect

if (document.getElementById('tipo').innerText === 'Nuevo Caso') {
  document.getElementById('casoForm').addEventListener('submit', nuevoCaso);
  clienteSelect = document.getElementById('clienteN');
  procuradorSelect = document.getElementById('procuradorN');
  populateClientesDropdown();
  populateProcuradoresDropdown();
} else if (document.getElementById('tipo').innerText === 'Detalles del Caso') {
  //document.getElementById('casoForm').addEventListener('submit', nuevoCaso);
  clienteSelect = document.getElementById('clienteInfo');
  procuradorSelect = document.getElementById('procuradorInfo');
  estadoSelect = document.getElementById('estadoInfo');
  populateDetalles(4);
} else if (document.getElementById('tipo').innerText === 'Nuevo Cliente') {
  document.getElementById('clienteForm').addEventListener('submit', nuevoCliente);
} else if (document.getElementById('tipo').innerText === 'Nuevo Procurador') {
  document.getElementById('procuradorForm').addEventListener('submit', nuevoProcurador);
}

// #region Clientes

function nuevoCliente(e) {
  e.preventDefault();

  const nombreCliente = document.getElementById('nombreC').value;
  const telefonoCliente = document.getElementById('numeroC').value;
  const nitCliente = document.getElementById('nitC').value;
  const direccionCliente = document.getElementById('direC').value;

  saveCliente(nombreCliente, telefonoCliente, nitCliente, direccionCliente);

  readClientes();

  document.getElementById('clienteForm').reset();

}

function saveCliente(nombreCliente, telefonoCliente, nitCliente, direccionCliente) {
  const newCliente = clientesDB.push();
  newCliente.set({
    nombreCliente,
    telefonoCliente,
    nitCliente,
    direccionCliente
  });
}

function readClientes() {
  clientesDB.on('value', function (snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);
    console.log(data[keys[0]].telefonoCliente);
  });
}

// #endregion

// #region Procuradores

function nuevoProcurador(e) {
  e.preventDefault();

  const nombreProcurador = document.getElementById('nombreP').value;
  const telefonoProcurador = document.getElementById('numeroP').value;
  const colegiadoProcurador = document.getElementById('colegP').value;
  const especializacionProcurador = document.getElementById('especP').value;

  saveProcurador(nombreProcurador, telefonoProcurador, colegiadoProcurador, especializacionProcurador);

  readProcurador();

  document.getElementById('procuradorForm').reset();

}

function saveProcurador(nombreProcurador, telefonoProcurador, colegiadoProcurador, especializacionProcurador) {
  const newProcurador = procuradorDB.push();
  newProcurador.set({
    nombreProcurador,
    telefonoProcurador,
    colegiadoProcurador,
    especializacionProcurador
  });
}

function readProcurador() {
  procuradorDB.on('value', function (snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);
    console.log(data[keys[0]].especializacionProcurador);
  });
}

// #endregion

// #region Casos

async function nuevoCaso(e) {
  e.preventDefault();

  const asunto = document.getElementById('nombre').value;

  const cantidadC = await cantidadCasos()
  const noExpediente = cantidadC + 1;

  const estado = "Pendiente";

  const date = new Date().toLocaleDateString().split('/');
  const fechaInicio = `${date[2]}-${date[1]}-${date[0]}`;

  const fechaFin = "";
  
  const idCliente = document.getElementById('clienteN').value;
  
  const procurador = document.getElementById('procuradorN').value;
  
  const idProcurador = procurador;

  saveCaso(asunto, noExpediente, estado, fechaInicio, fechaFin, idCliente, idProcurador);

  readCasos();

  document.getElementById('casoForm').reset();

}

function populateProcuradoresDropdown() {
  // Clear the dropdown
  procuradorSelect.innerHTML = '';

  // Add a default option
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = 'Selecciona un Procurador';
  procuradorSelect.add(defaultOption);

  // Read from the database
  procuradorDB.on('value', function(snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);

    // Loop through the data and add an option for each client
    keys.forEach(key => {
      const option = document.createElement('option');
      option.value = data[key].colegiadoProcurador; // Assuming nitCliente is a unique identifier for the client
      option.text = data[key].nombreProcurador; // Display the client's name in the dropdown
      procuradorSelect.add(option);
    });
  });
}

function populateClientesDropdown() {
  // Clear the dropdown
  clienteSelect.innerHTML = '';

  // Add a default option
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = 'Selecciona un Cliente';
  clienteSelect.add(defaultOption);

  // Read from the database
  clientesDB.on('value', function(snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);

    // Loop through the data and add an option for each client
    keys.forEach(key => {
      const option = document.createElement('option');
      option.value = data[key].nitCliente; // Assuming nitCliente is a unique identifier for the client
      option.text = data[key].nombreCliente; // Display the client's name in the dropdown
      clienteSelect.add(option);
    });
  });
}

function cantidadCasos() {
  return new Promise((resolve, reject) => {
    casosDB.on('value', function (snapshot) {
      const data = snapshot.val();
      const keys = Object.keys(data);
      resolve(keys.length);
    });
  })
}

function saveCaso(asunto, noExpediente, estado, fechaInicio, fechaFin, idCliente, idProcurador) {
  const newCaso = casosDB.push();
  newCaso.set({
    asunto,
    noExpediente,
    estado,
    fechaInicio,
    fechaFin,
    idCliente,
    idProcurador
  });
}

function readCasos() {
  casosDB.on('value', function (snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);
    console.log(data[keys[0]].estado);
  });
}

// #endregion

// #region Index


if (document.getElementById('tipo').innerText === 'Listado de Casos') {
  displayMain()
}

async function displayMain() {

  casosDB.on('value', async function (snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);

    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];

    // Clear the table body
    tableBody.innerHTML = '';

    for (let key of keys) {
      const row = tableBody.insertRow();

      const casoCell = row.insertCell();
      casoCell.classList.add('caso');
      casoCell.textContent = data[key].noExpediente;

      const nombreCell = row.insertCell();
      nombreCell.classList.add('nombre');
      nombreCell.textContent = data[key].asunto;

      const clienteCell = row.insertCell();
      clienteCell.classList.add('cliente');

      const clienteNombre = await getCliente(data[key].idCliente);
      clienteCell.textContent = clienteNombre;

      const estadoCell = row.insertCell();
      estadoCell.classList.add('estado');
      estadoCell.textContent = data[key].estado;
    };
  });
}

function getCliente(id) {
  return new Promise((resolve, reject) => {
    clientesDB.on('value', function (snapshot) {
      const data = snapshot.val();
      const keys = Object.keys(data);

      var nombre = "No Encontrado"

      keys.some(function (key) {

        if (data[key].nitCliente === String(id)) {
          nombre = data[key].nombreCliente;
          return true;
        }
      });

      resolve(nombre);

    });


  });
}

// #endregion

// #region Detalles

function populateDetalles(id) {
 
  casosDB.on('value', function(snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);

    
    document.getElementById('codigoInfo').innerHTML = 'Caso No. '.concat(id)
    document.getElementById('asuntoInfo').value = 'Cargando...'

    for (let key of keys) {
      if (data[key].noExpediente === id) {
        document.getElementById('asuntoInfo').value = data[key].asunto
        const fechaIn = data[key].fechaInicio
        document.getElementById('fechaInicioInfo').value = fechaIn

        populateClientesInfoDropdown(data[key].idCliente);
        populateProcuradoresInfoDropdown(data[key].idProcurador);
        populateEstadoInfoDropdown(data[key].estado)

        console.log(fechaIn)
      }
    };
    
  });

  

}

function populateEstadoInfoDropdown(estado) {
  // Clear the dropdown
  estadoSelect.innerHTML = '';

  // Add a default option
  const option1 = document.createElement('option');
  option1.value = estado;
  option1.text = estado;
  estadoSelect.add(option1);

  console.log(estado)
  if (estado != 'En Proceso') { 
    const option2 = document.createElement('option');
    option2.value = 'En Proceso';
    option2.text = 'En Proceso';
    estadoSelect.add(option2);
  }

  if (estado != 'Finalizado') { 
    const option3 = document.createElement('option');
    option3.value = 'Finalizado';
    option3.text = 'Finalizado';
    estadoSelect.add(option3);
  }
  
  if (estado != 'Pausado') { 
    const option4 = document.createElement('option');
    option4.value = 'Pausado';
    option4.text = 'Pausado';
    estadoSelect.add(option4);
  }

  if (estado != 'Anulado') { 
    const option5 = document.createElement('option');
    option5.value = 'Anulado';
    option5.text = 'Anulado';
    estadoSelect.add(option5);
  }

}

function populateProcuradoresInfoDropdown(id) {
  // Clear the dropdown
  procuradorSelect.innerHTML = '';

  // Add a default option
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = 'Cargando...';
  procuradorSelect.add(defaultOption);

  // Read from the database
  procuradorDB.on('value', function(snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);

    // Loop through the data and add an option for each client
    keys.forEach(key => {

      if (data[key].colegiadoProcurador === id) {
        procuradorSelect.innerHTML = '';

        // Add a default option
        const defaultOption = document.createElement('option');
        defaultOption.value = data[key].colegiadoProcurador;
        defaultOption.text = data[key].nombreProcurador;
        procuradorSelect.add(defaultOption);
      }

    });

    keys.forEach(key => {

      if (data[key].colegiadoProcurador === id) {
        
      } else {

      const option = document.createElement('option');
      option.value = data[key].colegiadoProcurador; // Assuming nitCliente is a unique identifier for the client
      option.text = data[key].nombreProcurador; // Display the client's name in the dropdown
      procuradorSelect.add(option);
      }
    });
  });
}

function populateClientesInfoDropdown(id) {
  // Clear the dropdown
  clienteSelect.innerHTML = '';

  // Add a default option
  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = 'Cargando...';
  clienteSelect.add(defaultOption);

  // Read from the database
  clientesDB.on('value', function(snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);

    // Loop through the data and add an option for each client
    keys.forEach(key => {

      if (data[key].nitCliente === id) {
        clienteSelect.innerHTML = '';

        // Add a default option
        const defaultOption = document.createElement('option');
        defaultOption.value = data[key].nitCliente;
        defaultOption.text = data[key].nombreCliente;
        clienteSelect.add(defaultOption);
      }

    });

    keys.forEach(key => {

      if (data[key].nitCliente === id) {
        
      } else {

      const option = document.createElement('option');
      option.value = data[key].nitCliente; // Assuming nitCliente is a unique identifier for the client
      option.text = data[key].nombreCliente; // Display the client's name in the dropdown
      clienteSelect.add(option);
      }
    });
  });
}

// #endregion
/*
function displayData() {
  const nameInput = document.getElementById('nameInput').value;
  searchValue(contactFormDB, nameInput).then(info => {
    const nameList = document.getElementById('nameList');
    nameList.innerHTML = ''; // Clear the list

    info.forEach(data => {
      const listItem = document.createElement('li');
      listItem.textContent = `${data.name} - ${data.emailid} - ${data.key}`;
      nameList.appendChild(listItem);
    });
  }).catch(error => {
    console.error('Failed to get data:', error);
  });
}

function searchValue(db, id) {
  return new Promise((resolve, reject) => {
    db.on('value', function(snapshot) {
      const data = snapshot.val();
      const keys = Object.keys(data);

      const info = [];

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
      const data = snapshot.val();
      const keys = Object.keys(data);

      const info = [];

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
    const dbRef = db.ref(key);
    dbRef.update(newValue).then(() => {
      console.log('Data updated successfully');
    }).catch((error) => {
      console.error('Failed to update data:', error);
    });
  }).catch(error => {
    console.error('Failed to find name:', error);
  });
}
*/