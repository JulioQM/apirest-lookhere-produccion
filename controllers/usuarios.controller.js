const { response, request } = require('express');
const { Usuario } = require('../models/usuarios.model');
const bcrytpjs = require('bcryptjs');
const { sendMailRegister } = require('../helpers/smsEmail');


//CONSULTARN USUARIOS :::: LISTO
const usuariosGet = async(req = request, res = response) => {
    try {
        const usuario = await Usuario.findAll({ where: { usua_estado: '1' }, order: ['usua_id'] });
        return res.status(200).json({ usuario });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

//CONSULTAR POR ID USUARIOS
const usuariosIdGet = async(req = request, res = response) => {
    try {
        const idusuario = req.params.usua_id;
        const usuario = await Usuario.findByPk(idusuario);

        return res.status(200).json(usuario);
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

//AGREGAR USUARIOS
const usuariosPost = async(req, res = response) => {
    try {
        const { rol_id, usua_alias, usua_clave, usua_email } = req.body;
        const usuario = new Usuario({ rol_id, usua_alias, usua_clave, usua_email });
        // encriptacion de contraseña
        // variable salt se refiere a las vueltas de encriptacion, entre mas vuelta mas seguro
        const salt = bcrytpjs.genSaltSync();
        // una vez pasado las verificaciones se guardara la información en la base de datos
        usuario.usua_clave = bcrytpjs.hashSync(usua_clave, salt);
        const id = await usuario.save().then(result => { return result.usua_id });
        // en esta parte voy a enviar el correo eléctronico
        await sendMailRegister(usua_email);
        // imprimo
        console.log(usua_email);
        return res.status(200).json({ id });

    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        })
    }
}

// ACTUALIZAR USUARIOS
const usuariosPut = async(req, res = response) => {
    try {
        const idusuario = req.params.usua_id;
        // Parametros listo para proceso de actualizacion
        const { rol_id, usua_alias, usua_clave, usua_email } = req.body;
        const usuario = await Usuario.findByPk(idusuario);
        // encriptacion de contraseña
        // variable salt se refiere a las vueltas de encriptacion, entre mas vuelta mas seguro
        const salt = bcrytpjs.genSaltSync();
        // una vez pasado las verificaciones se guardara la información en la base de datos
        usuario.usua_clave = bcrytpjs.hashSync(usua_clave, salt);

        await usuario.update({ rol_id, usua_alias, usua_clave: usuario.usua_clave, usua_email });
        return res.status(200).json({
            message: `Usuario ${idusuario} actualizado exitosamente`
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

// ELIMINAR USUARIOS
const usuariosDelete = async(req, res = response) => {
    try {
        const idusuario = req.params.usua_id;
        const usuario = await Usuario.findByPk(idusuario);
        await usuario.update({ usua_estado: 0 });
        return res.status(200).json(`Usuario eliminado con ID: ${idusuario}`);
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

module.exports = {
    usuariosGet,
    usuariosIdGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
}