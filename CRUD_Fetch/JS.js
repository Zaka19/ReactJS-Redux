import {getJSON,AllJSON} from './JsGeneral.js';

init();

function init() {
    document.getElementById("ListaLinea").innerHTML = "";
    getJSON("https://localhost:44338/api/Lineas")
        .then(data => CreateLi(data))
        .catch(error => console.log(error));
}

function Remove(id) {
    //console.log(id);

    let params = {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    };

    fetch("https://localhost:44338/api/Lineas/" + id, params)
    .then(response => response.json())
    .then(json => init())
    .catch(error => console.log(error));
}

function CreateLi(data) {
    for (linea of data) {
        let li = document.createElement("li");
        let text = document.createTextNode(linea.id + " - " + linea.servicio + " - " + linea.fecha + " - " + linea.precio + "   ");
        li.appendChild(text);
        let a = document.createElement("a");
        a.href = "ModificarLinia.html?id="+linea.id;
        a.appendChild(createButton("button","Modificar",linea.id));
        li.appendChild(a);
        li.appendChild(createButton("button","Borrar",linea.id));
        document.getElementById("ListaLinea").appendChild(li);
    }
}

function createButton(message1,message2,id){
    let Button = document.createElement(message1);
    Button.innerText = message2;
    Button.value = id;
    if(message2 == "Borrar"){
        Button.addEventListener("click", function () { Remove(Button.value) });
    }
    return Button
}
