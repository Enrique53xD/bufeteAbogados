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
  document.getElementById('infoForm').addEventListener('submit', updateInfo);
  clienteSelect = document.getElementById('clienteInfo');
  procuradorSelect = document.getElementById('procuradorInfo');
  estadoSelect = document.getElementById('estadoInfo');
  const params = new URLSearchParams(window.location.search);

  const noExpediente = params.get('noExpediente');

  populateDetalles(noExpediente);
} else if (document.getElementById('tipo').innerText === 'Nuevo Cliente') {
  document.getElementById('clienteForm').addEventListener('submit', nuevoCliente);
} else if (document.getElementById('tipo').innerText === 'Nuevo Procurador') {
  document.getElementById('procuradorForm').addEventListener('submit', nuevoProcurador);
}

// #region Clientes

async function nuevoCliente(e) {
  e.preventDefault();

  const nombreCliente = document.getElementById('nombreC').value;
  const telefonoCliente = document.getElementById('numeroC').value;
  const nitCliente = document.getElementById('nitC').value;
  const direccionCliente = document.getElementById('direC').value;

  var already = false;
  
  clientesDB.once('value', function (snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);
    
    for (let i = 0; i < keys.length; i++) {
      if (String(data[keys[i]].nitCliente) === nitCliente) {
          already = true;
          break; 
      }
    }

    if (already) {
      console.log('tru')
      alert('Cliente con este NIT ya existe.')
      location.reload();
    } else {
      console.log('fols')
      saveCliente(nombreCliente, telefonoCliente, nitCliente, direccionCliente);
      readClientes();
      document.getElementById('clienteForm').reset();
      window.open("./index.html", "_self")
    }
  });
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


  var already = false;
  
  procuradorDB.once('value', function (snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);
    
    for (let i = 0; i < keys.length; i++) {
      if (String(data[keys[i]].colegiadoProcurador) === colegiadoProcurador) {
          already = true;
          break; 
      }
    }

   
    if (already) {
      console.log('tru')
      alert('Procurador con ese numero de colegiado ya existe.')
      location.reload();
    } else {
      console.log('fols')
      saveProcurador(nombreProcurador, telefonoProcurador, colegiadoProcurador, especializacionProcurador);
      readProcurador();
      document.getElementById('procuradorForm').reset();
      window.open("./index.html", "_self")
    }
  });


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

  const cantidadC = await cantidadesTabla(casosDB)
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

  window.open("./index.html", "_self")
}

function populateProcuradoresDropdown() {

  procuradorSelect.innerHTML = '';


  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = 'Selecciona un Procurador';
  procuradorSelect.add(defaultOption);


  procuradorDB.on('value', function (snapshot) {
    procuradorSelect.innerHTML = '';


    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Selecciona un Procurador';
    procuradorSelect.add(defaultOption);
    const data = snapshot.val();
    const keys = Object.keys(data);


    keys.forEach(key => {
      const option = document.createElement('option');
      option.value = data[key].colegiadoProcurador; 
      option.text = data[key].nombreProcurador; 
      procuradorSelect.add(option);
    });
  });
}

function populateClientesDropdown() {
  
  clienteSelect.innerHTML = '';

  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = 'Selecciona un Cliente';
  clienteSelect.add(defaultOption);


  clientesDB.on('value', function (snapshot) {
    clienteSelect.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Selecciona un Cliente';
    clienteSelect.add(defaultOption);
    const data = snapshot.val();
    const keys = Object.keys(data);

   
    keys.forEach(key => {
      const option = document.createElement('option');
      option.value = data[key].nitCliente; 
      option.text = data[key].nombreCliente; 
      clienteSelect.add(option);
    });
  });
}

function cantidadesTabla(db) {
  return new Promise((resolve, reject) => {
    db.on('value', function (snapshot) {
      const data = snapshot.val();
      if (data === null) {
        resolve(0);
      } else {
        const keys = Object.keys(data);
        resolve(keys.length);
      }
    });
  })
}

function keysTabla(db) {
  return new Promise((resolve, reject) => {
    db.on('value', function (snapshot) {
      const data = snapshot.val();
      if (data === null) {
        resolve(0);
      } else {
        const keys = Object.keys(data);
        resolve(keys);
      }
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


    tableBody.innerHTML = '';

    for (let key of keys) {
      const row = tableBody.insertRow();

      const casoCell = row.insertCell();
      casoCell.classList.add('caso');
      casoCell.textContent = data[key].noExpediente;

      const nombreCell = row.insertCell();
      nombreCell.classList.add('nombre');


      const anchor = document.createElement('a');


      anchor.href = `info.html?noExpediente=${data[key].noExpediente}`;

      anchor.textContent = data[key].asunto;


      nombreCell.appendChild(anchor);

      const clienteCell = row.insertCell();
      clienteCell.classList.add('cliente');

      const clienteNombre = await getCliente(data[key].idCliente);
      clienteCell.textContent = clienteNombre;

      const estadoCell = row.insertCell();
      estadoCell.classList.add('estado');
      estadoCell.textContent = data[key].estado;
    };
  });

  clientesDB.on('value', async function (snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);

    const tableBody = document.getElementById('data-tableClientes').getElementsByTagName('tbody')[0];


    tableBody.innerHTML = '';

    for (let key of keys) {
      const row = tableBody.insertRow();

      const casoCell = row.insertCell();
      casoCell.classList.add('nitCIndex');
      casoCell.textContent = data[key].nitCliente;

      const nombreCell = row.insertCell();
      nombreCell.classList.add('nombreCIndex');
      nombreCell.textContent = data[key].nombreCliente;

      const clienteCell = row.insertCell();
      clienteCell.classList.add('numeroCIndex');
      clienteCell.textContent = data[key].telefonoCliente;

      const estadoCell = row.insertCell();
      estadoCell.classList.add('direCIndex');
      estadoCell.textContent = data[key].direccionCliente;

      const eliminarCell = row.insertCell();
      eliminarCell.classList.add('eliminar');
      eliminarCell.textContent = 'X';
      eliminarCell.style.color = 'red';
      eliminarCell.style.fontWeight = 'bold';
      eliminarCell.style.cursor = 'pointer'; 
      eliminarCell.addEventListener('click', function () {
        let confirmation = confirm("Estas seguro que quieres eliminar este item?");
        if (confirmation) {
            console.log("clikiao")
            removeItemFromDatabase(clientesDB, key)
        }
    });
    };
  });

  procuradorDB.on('value', async function (snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);

    const tableBody = document.getElementById('data-tableProcuradores').getElementsByTagName('tbody')[0];


    tableBody.innerHTML = '';

    for (let key of keys) {
      const row = tableBody.insertRow();

      const casoCell = row.insertCell();
      casoCell.classList.add('colegPIndex');
      casoCell.textContent = data[key].colegiadoProcurador;

      const nombreCell = row.insertCell();
      nombreCell.classList.add('nombrePIndex');
      nombreCell.textContent = data[key].nombreProcurador;

      const clienteCell = row.insertCell();
      clienteCell.classList.add('numeroPIndex');
      clienteCell.textContent = data[key].telefonoProcurador;

      const estadoCell = row.insertCell();
      estadoCell.classList.add('especializacionPIndex');
      estadoCell.textContent = data[key].especializacionProcurador;

      const eliminarCell = row.insertCell();
      eliminarCell.classList.add('eliminar');
      eliminarCell.textContent = 'X';
      eliminarCell.style.color = 'red'; 
      eliminarCell.style.fontWeight = 'bold';
      eliminarCell.style.cursor = 'pointer'; 
      eliminarCell.addEventListener('click', function () {
        let confirmation = confirm("Estas seguro que quieres eliminar este item?");
        if (confirmation) {
            console.log("clikiao")
            removeItemFromDatabase(procuradorDB, key)
        }
    });

    };
  });
}

function removeItemFromDatabase(database, key) {
  database.child(key).remove()
    .then(() => {
      console.log("Item removed successfully");
    })
    .catch((error) => {
      console.error("Failed to remove item:", error);
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

function updateInfo(e) {
  e.preventDefault();

  const params = new URLSearchParams(window.location.search);


  const noExpediente = params.get('noExpediente')

  const asunto = document.getElementById('asuntoInfo').value;
  const estado = document.getElementById('estadoInfo').value;
  const fechaFin = document.getElementById('fechaFinInfo').value;
  const idCliente = document.getElementById('clienteInfo').value;
  const idProcurador = document.getElementById('procuradorInfo').value;

  casosDB.orderByChild('noExpediente').equalTo(parseInt(noExpediente)).once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      const casoKey = childSnapshot.key;
      casosDB.child(casoKey).update({
        asunto: asunto,
        estado: estado,
        fechaFin: fechaFin,
        idCliente: idCliente,
        idProcurador: idProcurador
      });
    });
  });

  window.open("./index.html", "_self")
}




function populateDetalles(id) {

  casosDB.on('value', function (snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);


    document.getElementById('codigoInfo').innerHTML = 'Caso No. '.concat(id)
    document.getElementById('asuntoInfo').value = '---'


    for (let key of keys) {
      if (String(data[key].noExpediente) === String(id)) {
        console.log('liiiii')
        document.getElementById('asuntoInfo').value = data[key].asunto
        const fechaIn = data[key].fechaInicio
        document.getElementById('fechaInicioInfo').value = fechaIn
        const fechaFin = data[key].fechaFin
        document.getElementById('fechaFinInfo').value = fechaFin

        populateClientesInfoDropdown(data[key].idCliente);
        populateProcuradoresInfoDropdown(data[key].idProcurador);
        populateEstadoInfoDropdown(data[key].estado)

      }
    };

  });

}

function populateEstadoInfoDropdown(estado) {
 
  estadoSelect.innerHTML = '';


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

  procuradorSelect.innerHTML = '';


  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = '---';
  procuradorSelect.add(defaultOption);


  procuradorDB.on('value', function (snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);


    keys.forEach(key => {

      if (data[key].colegiadoProcurador === id) {
        procuradorSelect.innerHTML = '';


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
        option.value = data[key].colegiadoProcurador; 
        option.text = data[key].nombreProcurador; 
        procuradorSelect.add(option);
      }
    });
  });
}

function populateClientesInfoDropdown(id) {

  clienteSelect.innerHTML = '';


  const defaultOption = document.createElement('option');
  defaultOption.value = '';
  defaultOption.text = '---';
  clienteSelect.add(defaultOption);

  
  clientesDB.on('value', function (snapshot) {
    const data = snapshot.val();
    const keys = Object.keys(data);

    
    keys.forEach(key => {

      if (data[key].nitCliente === id) {
        clienteSelect.innerHTML = '';

        
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
        option.value = data[key].nitCliente; 
        option.text = data[key].nombreCliente; 
        clienteSelect.add(option);
      }
    });
  });
}

// #endregion
