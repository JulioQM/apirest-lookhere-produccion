const axios = require('axios');
// verificar el correo electronico
const validarEmail = async(correo = '') => {
    try {
        let mensaje = 'correcta';
        var verificador = {};
        // primera forma con un modelo de instancia
        const instance = axios.create({
            baseURL: `https://neutrinoapi.net/email-validate?email=${correo}`,
            params: {
                // token de Api perteneciente al body
                'user_id': "JulioQM",
                'api_key': "euJMsOFMKtTajmCcbMIhluE62olbBYA57kX1IbpaX0e4qlTf"
            }
        });
        const { data } = await instance.post();
        const autentico = data['valid'];
        console.log({ autentico });
        if (autentico) {
            console.log('El correo ingresado: ' + correo + ' es correcto');
            mensaje = 'correcto';
            verificador = { 'verificar': true };
        }
        return verificador;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    validarEmail
}