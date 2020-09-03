
Lista();

let Create = document.getElementById("Create");
Create.addEventListener("click",init);

function init(){
    let Servicio = document.getElementById("Servicio").value;
    let Precio = document.getElementById("Precio").value;
    let HDP = document.getElementById("HDS").value;

    let linea = { servicio: Servicio,precio: Precio,hojaServicioId: HDP};
    let params = {
        method: 'POST',
        body: JSON.stringify(linea),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };
    fetch('https://localhost:44338/api/Lineas', params)
        .then(response => response.json())
        .then(json => console.log("Creat"))
        .catch(error => console.log(error));
}

function Lista() {
    fetch("https://localhost:44338/api/HojaServicios")
        .then(resp => resp.json())
        .then(data => CreateLi(data))
        .catch(error => console.log(error));
}

function CreateLi(data) {
    for (hoja of data) {
        let li = document.createElement("li");
        let text = document.createTextNode(hoja.id + " - " + hoja.fecha + " - " + hoja.descripcion);
        li.appendChild(text);
        document.getElementById("ListaHojas").appendChild(li);
    }
}
