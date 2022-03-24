require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// Envio de correo electrónico al iniciar sesión
// Código de verificación
const sendMailAutentication = async(email = '', codigo = '') => {
    var verificador = {};
    var encabezado = 'CLAVE DE VERIFICACION LOOKHERE';
    try {
        await sgMail.send({
            to: email,
            from: 'jcquinchiguango@utn.edu.ec',
            subject: encabezado,
            text: 'Código de verificación!',
            html: `<p>Su código de verificación es: ${codigo} </p>`,
        });
        verificador = { 'verificar': true };
        console.log('enviado satisfactoriamente ' + verificador['verificar']);
        return verificador;

    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
};

// Envio de correo electrónico al crear una cuenta de usuario
// Mensaje de bienvenida
const sendMailRegister = async(email = '') => {
    var verificador = {};
    var encabezado = 'BIENVENIDOS A LOOKHERE';
    try {
        await sgMail.send({
            to: email,
            from: 'jcquinchiguango@utn.edu.ec',
            subject: encabezado,
            text: 'Gracias por registrarte en LookHere!',
            html: '<p>Gracias por registrarte en LookHere!</p>',
        });
        verificador = { 'verificar': true };
        console.log('enviado satisfactoriamente ' + verificador['verificar']);
        return verificador;

    } catch (error) {
        console.error(error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
};
// Modulo involucrados en el envio de correo electrónico
module.exports = {
    sendMailAutentication,
    sendMailRegister
}