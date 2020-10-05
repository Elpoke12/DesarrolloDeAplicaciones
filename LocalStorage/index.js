function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}

function createR() {
    
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var director = document.getElementById("Input3").value;
    var genero = document.getElementById("Input4").value;


    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var pelicula = {
            id, //matricula:id    id:id
            nombre,//nombre:nombre
            director,
            genero,
        }

        var lista_peliculas=JSON.parse(localStorage.getItem("peliculas"));

        if(lista_peliculas==null)
        { 
            var lista_peliculas = [];
        }
        
        const existe = lista_peliculas.some(element=>element.id==id); 

        if(!existe||document.getElementById("Input1").disabled==true)
        {
            
            if(document.getElementById("Input1").disabled==true)
            {
                var lista_peliculas=lista_peliculas.filter(pelicula=>pelicula.id!=id);

            }
                
            lista_peliculas.push(pelicula);
            var temporal = lista_peliculas.sort((a,b) => a.id-b.id);
            localStorage.setItem("peliculas", JSON.stringify(temporal));
            
            read();
            resetFields();
            swal("Listo!", "Agregado correctamente", "success");

        }
        else
        {
            swal("Error", "Ya existe ese id de pelicula","warning");
        }

    } 
    else 
    {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
    
}

function read(){
    document.getElementById("Table1").innerHTML='';
    

    const lista_peliculas = JSON.parse(localStorage.getItem("peliculas"));
    
     
    if(lista_peliculas)
    {
        lista_peliculas.forEach((pelicula)=>printRow(pelicula));
    }
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
    const lista_peliculas = JSON.parse(localStorage.getItem("peliculas"));
    var temporal=lista_peliculas.filter(pelicula=>pelicula.id!=id);
    localStorage.setItem("peliculas", JSON.stringify(temporal));

    if(temporal.length==0)
    { 
        localStorage.removeItem("peliculas");
    }
  
    read();
    
}

function seekR(id){

    const lista_peliculas = JSON.parse(localStorage.getItem("peliculas"));
    var pelicula=lista_peliculas.filter(pelicula=>pelicula.id==id);
    //console.log(pelicula[0]);
    updateR(pelicula[0]);
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
  
    const lista_peliculas = JSON.parse(localStorage.getItem("peliculas"));
    var peliculasC=lista_peliculas.filter(pelicula=>pelicula.genero==c);
    if(peliculasC)
    {
        peliculasC.forEach((pelicula)=>printRowQ(pelicula));
    }
    //console.log(peliculasC)

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