const path = require('path');
const cors = require('cors');
const express = require('express');
const nodemailer = require("nodemailer");

//Funcion de mailer
async function enviarMail(json){
    let jsonParseado = JSON.parse(json);
    
    //Creacion de transporter
    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "midguet12@hotmail.com", // generated ethereal user
          pass: "*******", // generated ethereal password
        },
    });

    //Envio de email
    let info = await transporter.sendMail({
        from: 'midguet12@hotmail.com', // sender address
        to: jsonParseado.destinatario, // list of receivers
        subject: "Hello ✔", // Subject line
        //text: jsonParseado.email, // plain text body
        html:   "<p>Mensaje: " + jsonParseado.mensaje + " </p> "
    });
    //Confirmacion de envio
    console.log("Message sent: %s", info.messageId); 
}



const app = express();
const port = 3000;
//Middleware
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'front')));


//Create form
app.post('/enviarcorreo', async (req, res)  =>{
    console.log("Formulario recibido")
    var json = JSON.stringify(req.body);

    try {
       console.log(enviarMail(json));
    } catch (error) {
        console.log("No se ha podido enviar por correo")
        console.log(error)
    }
})

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/front/index.html");
});

//Launch server
app.listen(port, () => {
    console.log(`App running on port ${port}`)
});