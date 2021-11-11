const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Usuario } = require('../models/usuarios.model');
//:::::::::::::: AUTENTICACIÓN ::::::::::::::::: LISTO

const login = async(req, res = response) => {

    try {
        const { usua_alias, usua_clave } = req.body;
        const usuario = await Usuario.findOne({ where: { usua_alias: usua_alias, usua_estado: '1' } });

        if (!usuario) {
            return res.status(400).json({
                message: 'Usuario / Contraseña, Usuario incorrecto'
            });
        }
        // Des-encriptar la contraseña y verificar contraseña
        const validarClave = bcryptjs.compareSync(usua_clave, usuario.usua_clave);
        console.log(validarClave + '.........' + usua_clave + '-----------' + usua_clave)
        if (!validarClave) {
            return res.status(400).json({
                message: 'Usuario / Contraseña, Contraseña incorrecta'
            });
        }
        // Resultado final de autenticación
        return res.status(200).json({
            message: 'Crendenciales correctas'
        });

    } catch (error) {

        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

module.exports = { login };