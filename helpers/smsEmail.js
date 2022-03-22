require('dotenv').config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMailAutentication = async(email = '') => {
    var verificador = {};
    var encabezado = 'CLAVE DE VERIFICACION LOOKHERE';
    try {
        await sgMail.send({
            to: email,
            from: 'jcquinchiguango@utn.edu.ec',
            subject: encabezado,
            text: 'Gracias por registrarte en LookHere!',
            html: '<p>Su código de verificación es: 22543 </p>',
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


module.exports = {
    sendMailAutentication,
    sendMailRegister
}