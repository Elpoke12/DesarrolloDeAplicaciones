var firebaseConfig = {
    apiKey: "AIzaSyAqFO9060iu0BSK1p_tTCX2laUeZVwoH_c",
    authDomain: "dbpeliculas-f0107.firebaseapp.com",
    databaseURL: "https://dbpeliculas-f0107.firebaseio.com",
    projectId: "dbpeliculas-f0107",
    storageBucket: "dbpeliculas-f0107.appspot.com",
    messagingSenderId: "460597083862",
    appId: "1:460597083862:web:2b7adf8f73313992201377",
    measurementId: "G-8KNYL1FLTZ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var director = document.getElementById("Input3").value;
    var genero = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var pelicula = {
            id, //matricula:id
            nombre,
            director,
            genero,
        }

        //console.log(pelicula);

        firebase.database().ref('peliculas/' + id).update(pelicula).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('peliculas').push().key;
    //data[`peliculas/${key}`]= pelicula;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('peliculas');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(pelicula){
    
    if(pelicula!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = pelicula.id;
        cell2.innerHTML = pelicula.nombre; 
        cell3.innerHTML = pelicula.director;
        cell4.innerHTML = pelicula.genero; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${pelicula.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+pelicula.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('peliculas/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('peliculas/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(pelicula){
    if(pelicula!=null)
    {
        document.getElementById("Input1").value=pelicula.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=pelicula.nombre;
        document.getElementById("Input3").value=pelicula.director;
        document.getElementById("Input4").value=pelicula.genero;
    }
}


//Para consulta de genero
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("peliculas");
    ref.orderByChild("genero").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(pelicula){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = pelicula.id;
    cell2.innerHTML = pelicula.nombre; 
    cell3.innerHTML = pelicula.director;
    cell4.innerHTML = pelicula.genero; 
   
}