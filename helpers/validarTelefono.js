const axios = require('axios');
// verificar el número telefónico
const validarTelefono = async(numeroCell = '') => {
    try {
        const codigoPais = '+593';
        const numeroTelefono = numeroCell;
        const number = codigoPais.concat(numeroTelefono);
        let mensaje = 'correcta';
        var verificador = {};
        // primera forma con un modelo de instancia
        const instance = axios.create({
            baseURL: `https://neutrinoapi.net/phone-validate`,
            params: {
                // token de Api perteneciente al body
                'user_id': "JulioQM",
                'api_key': "euJMsOFMKtTajmCcbMIhluE62olbBYA57kX1IbpaX0e4qlTf",
                // varaibles que son llamadas en la api
                'number': `${number}`
            }
        });
        const { data } = await instance.post();
        const autentico = data['valid'];
        console.log({ autentico });
        if (autentico) {
            console.log('El número ingresado: ' + numeroCell + ' es correcto');
            mensaje = 'correcto';
            verificador = { 'verificar': true };
        }
        return verificador;
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    validarTelefono
}