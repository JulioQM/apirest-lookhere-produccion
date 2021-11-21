const { response, request } = require('express');
//VALIDAR  USUARIOS
const usuarioValidatorPost = async(req, res = response) => {
    try {
        const { body } = req;
        return res.status(200).json({ body });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        })
    }
}
module.exports = {
    usuarioValidatorPost
}