const { response, request } = require('express');
const { Rol } = require('../models/roles.model');

//CONSULTARN ROLES ::: LISTO
const rolesGet = async(req = request, res = response) => {
    try {
        const roles = await Rol.findAll({ where: { rol_estado: '1' }, order: ['rol_id'] });
        return res.status(200).json({ roles });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

//CONSULTAR POR ID ROLES
const rolesIdGet = async(req = request, res = response) => {
    try {
        const { rol_id } = req.params;
        const roles = await Rol.findByPk(rol_id);
        return res.status(200).json(roles);
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

//AGREGAR ROLES
const rolesPost = async(req, res = response) => {
    try {
        const { body } = req;
        const roles = new Rol(body);
        const id_rol = await roles.save().then(result => { return result.rol_id });
        return res.status(200).json({ id_rol });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        })
    }
}

// ACTUALIZAR ROL
const rolesPut = async(req, res = response) => {
    try {
        const { rol_id } = req.params;
        const { body } = req;
        const rol = await Rol.findByPk(rol_id);
        await rol.update(body);
        return res.status(200).json({ rol });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

// ELIMINAR ROL
const rolesDelete = async(req, res = response) => {
    try {
        const idrol = parseInt(req.params.rol_id);
        const usuario = await Rol.findByPk(idrol);

        /// await usuario.destroy(); // elimina fisicamente de la base
        await usuario.update({ rol_estado: 0 });
        res.status(200).json(`Rol eliminado con ID: ${idrol}`);

    } catch (error) {
        res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

module.exports = {
    rolesGet,
    rolesIdGet,
    rolesPost,
    rolesPut,
    rolesDelete
}