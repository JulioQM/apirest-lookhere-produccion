const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Usuario } = require('../models/usuarios.model');
const { Sequelize } = require('sequelize');
//:::::::::::::: AUTENTICACIÓN ::::::::::::::::: LISTO
// Login de super usuario
const loginAdmin = async(req, res = response) => {

    try {
        const { usua_alias, usua_clave } = req.body;
        // busco y realizo validaciones con operadores logicos
        const usuario = await Usuario.findOne({
            where: Sequelize.or({ usua_alias: usua_alias, usua_estado: '1', rol_id: 1 }, { usua_email: usua_alias, usua_estado: '1', rol_id: 1 })
        });

        if (!usuario) {
            return res.status(400).json({
                message: 'El usuario o la contraseña es incorrecta.'
            });
        }
        // Des-encriptar la contraseña y verificar contraseña
        const validarClave = bcryptjs.compareSync(usua_clave, usuario.usua_clave);
        console.log(validarClave + '.........' + usua_clave + '-----------' + usua_clave)
        if (!validarClave) {
            return res.status(400).json({
                message: 'El usuario o la contraseña es incorrecta.'
            });
        }
        // Resultado final de autenticación
        // message: 'Crendenciales correctas'
        const { usua_id } = usuario;
        return res.status(200).json({ usua_id });

    } catch (error) {

        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

// Login de usuarios normales
const loginUser = async(req, res = response) => {

    try {
        const { usua_alias, usua_clave } = req.body;
        /* const usuario = await Usuario.findOne({ where: { usua_alias: usua_alias, usua_estado: '1' } }); */
        const usuario = await Usuario.findOne({
            where: Sequelize.or({ usua_alias: usua_alias, usua_estado: '1', rol_id: 2 }, { usua_email: usua_alias, usua_estado: '1', rol_id: 2 })
        });

        if (!usuario) {
            return res.status(400).json({
                message: 'El usuario o la contraseña es incorrecta.'
            });
        }
        // Des-encriptar la contraseña y verificar contraseña
        const validarClave = bcryptjs.compareSync(usua_clave, usuario.usua_clave);
        console.log(validarClave + '.........' + usua_clave + '-----------' + usua_clave)
        if (!validarClave) {
            return res.status(400).json({
                message: 'El usuario o la contraseña es incorrecta.'
            });
        }
        // Resultado final de autenticación
        // message: 'Crendenciales correctas'
        const { usua_id } = usuario;
        return res.status(200).json({ usua_id });

    } catch (error) {

        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}


module.exports = { loginUser, loginAdmin };