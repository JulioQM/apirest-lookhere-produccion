const { response, request } = require('express');
const { Enfermedad } = require('../models/enfermedades.model');


//CONSULTARN ROLES
const enfermedadesGet = async(req = request, res = response) => {
    try {
        const enfermedad = await Enfermedad.findAll({ where: { enfer_estado: '1' }, order: ['enfer_id'] });
        return res.status(200).json(enfermedad);
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

//CONSULTAR POR ID ROLES
const enfermedadesIdGet = async(req = request, res = response) => {
    try {
        const idenfermedad = req.params.enfer_id;
        const enfermedad = await Enfermedad.findByPk(idenfermedad)
        return res.status(200).json(enfermedad);
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

//AGREGAR ROLES
const enfermedadesPost = async(req, res = response) => {
    try {
        const { enfer_nombre } = req.body;
        const enfermedad = new Enfermedad({ enfer_nombre });
        const id = await enfermedad.save().then(result => {
            return result.enfer_id;
        });
        return res.status(200).json({ id });

    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        })
    }
}

// ACTUALIZAR ROL
const enfermedadesPut = async(req, res = response) => {
    try {
        const idenfermedad = req.params.enfer_id;
        const { enfer_nombre } = req.body;
        const enfermedad = await Enfermedad.findByPk(idenfermedad);
        await enfermedad.update({ enfer_nombre });
        return res.status(200).json({
            message: `Enfermedades ${enfer_nombre} actualizado`
        });

    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        })
    }
}

// ELIMINAR ROL
const enfermedadesDelete = async(req, res = response) => {
    try {
        const idenfermedad = parseInt(req.params.enfer_id);
        const enfermedad = await Enfermedad.findByPk(idenfermedad);
        await enfermedad.update({ enfer_estado: 0 });
        return res.status(200).json(`Enfermedad eliminado con ID: ${idenfermedad}`);

    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`

        });
    }
}

module.exports = {
    enfermedadesGet,
    enfermedadesIdGet,
    enfermedadesPost,
    enfermedadesPut,
    enfermedadesDelete
}