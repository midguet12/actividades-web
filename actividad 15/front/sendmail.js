var mensaje = document.getElementById("mensaje");
var destinatario = document.getElementById("destinatario");
var enviar = document.getElementById("enviar");


enviar.onclick = function(){
    let request = new XMLHttpRequest();

    request.open("POST", "http://localhost:3000/enviarcorreo");
    request.setRequestHeader("Accept","application/json");
    request.setRequestHeader("Content-Type", "application/json");

    request.onreadystatechange = function (){
        if (xmlHttpRequest.readyState === 4) {
            console.log(xmlHttpRequest.status);
            console.log(xmlHttpRequest.responseText);
        }
    };

    let data = `{
        "mensaje":"${mensaje.value}",
        "destinatario":"${destinatario.value}"
    }`;

    try {
        request.send(data);
    } catch (error) {
        console.error(error.message);
    }
    
}