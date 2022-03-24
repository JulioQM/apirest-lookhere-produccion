const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const { Usuario } = require('../models/usuarios.model');
const { Sequelize } = require('sequelize');
const bcrytpjs = require('bcryptjs');
const short = require('short-uuid');
const { sendMailAutentication } = require('../helpers/smsEmail');
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
        console.log(validarClave + '.........' + usua_clave + '-----------' + usuario.usua_clave);

        if (!validarClave) {
            return res.status(400).json({
                message: 'El usuario o la contraseña es incorrecta.'
            });
        }

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
        const usuario = await Usuario.findOne({
            where: Sequelize.or({ usua_alias: usua_alias, usua_estado: '1', rol_id: 2 }, { usua_email: usua_alias, usua_estado: '1', rol_id: 2 })
        });
        // verificar si existe usuario
        if (!usuario) {
            return res.status(400).json({
                message: 'El usuario o la contraseña es incorrecta.'
            });
        }
        // Des-encriptar la contraseña y verificar contraseña
        const validarClave = bcryptjs.compareSync(usua_clave, usuario.usua_clave);
        console.log(validarClave + '.........' + usua_clave + '-----------' + usuario.usua_clave);
        if (!validarClave) {
            return res.status(400).json({
                message: 'El usuario o la contraseña es incorrecta.'
            });
        }
        // desestructurar ID de usuario
        const { usua_id } = usuario;
        const usuario_actualizar = await Usuario.findByPk(usua_id);
        // generacion de codigo aleatorio de 5 digitos
        const decimalTranslator = short("0123456789");
        const codigo5digitos = decimalTranslator.generate().substring(0, 5);
        // envia de código de verificacion a correo electrónico 
        await sendMailAutentication(usuario.usua_email, codigo5digitos);
        // encriptacion de contraseña
        const salt = bcrytpjs.genSaltSync();
        // una vez pasado las verificaciones se guardara la información en la base de datos
        const codigoIncriptado = bcrytpjs.hashSync(codigo5digitos, salt);
        await usuario_actualizar.update({ usua_codigo: codigoIncriptado });
        return res.status(200).json({ usua_id });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

// Método de codigo de verificación
const validarCodigoVerificacion = async(req, res = response) => {
    try {
        const { usua_id, usua_codigo } = req.body;
        const usuario = await Usuario.findByPk(usua_id);
        // verificar si existe usuario
        if (!usuario) {
            return res.status(400).json({
                message: 'Id incorrecto'
            });
        }
        // Des-encriptar la contraseña y verificar contraseña
        const descriptarClave = bcryptjs.compareSync(usua_codigo, usuario.usua_codigo);
        console.log(descriptarClave + '.........' + usua_codigo + '-----------' + usuario.usua_codigo);
        if (!descriptarClave) {
            return res.status(400).json({
                message: 'Código de verificación incorrecto'
            });
        }
        const id = usuario.usua_id;
        return res.status(200).json({ id });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

module.exports = { loginUser, loginAdmin, validarCodigoVerificacion };