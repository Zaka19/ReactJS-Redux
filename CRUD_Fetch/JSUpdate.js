
let ServicioF = "";
let PrecioF = "";
let HDSF = "";

let id = getParameterByName("id");
document.getElementById("Modificar").addEventListener("click",Update);
init();

function init(){
    document.getElementById("Id").value = id;
}

async function Update(){
    let Servicio = document.getElementById("Servicio").value;
    let Precio = document.getElementById("Precio").value;

   await fetch("https://localhost:44338/api/Lineas/"+id)
    .then(resp => resp.json())
    .then(data => valores(data))
    .catch(error => console.log(error));

    if(Servicio == ""){
        Servicio = ServicioF;
    }
    if(Precio == ""){
        Precio = PrecioF;
    }
    if(HDSF == ""){
        Precio = PrecioF;
    }

    console.log(Servicio,Precio,HDSF);

    let linia = { id: id, servicio: Servicio, precio: Precio};
    params = {
        method: 'PUT',
        body: JSON.stringify(linia),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };
    fetch('https://localhost:44338/api/Lineas/'+id, params)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(error => console.log(error));

}

function valores(data){
    ServicioF = data.servicio;
    PrecioF = data.precio;
    HDSF = data.hojaServicioId; 
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}