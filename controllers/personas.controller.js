const { response, request } = require('express');
const { Persona } = require('../models/personas.model');


//CONSULTARAN PERSONAS
const personasGet = async(req = request, res = response) => {
    try {
        const persona = await Persona.findAll({ where: { pers_estado: '1' }, order: ['pers_id'] });
        return res.status(200).json({ persona });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

//CONSULTAR POR ID PERSONAS
const personasIdGet = async(req = request, res = response) => {
    try {
        const idpersona = req.params.pers_id;
        const persona = await Persona.findByPk(idpersona);
        return res.status(200).json({ persona });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

//AGREGAR PERSONAS
const personasPost = async(req, res = response) => {
    try {
        const { body } = req;
        const persona = new Persona(body);
        await persona.save();
        return res.status(200).json({ persona });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        })
    }
}



// ELIMINAR PERSONAS
const personasDelete = async(req, res = response) => {
    try {
        const idpersona = parseInt(req.params.pers_id);
        const persona = await Persona.findByPk(idpersona);
        await persona.update({ pers_estado: 0 });
        return res.status(200).json(`Rol eliminado con ID: ${idpersona}`);
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}


// ACTUALIZAR PERSONAS
const personasPut = async(req, res = response) => {
    try {
        const idpersona = req.params.pers_id;
        const { body } = req;
        const persona = await Persona.findByPk(idpersona);
        await persona.update(body);
        return res.status(200).json({ persona });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        })
    }
}

// ACTUALIZAR FOTO
const actualizarFotoPut = async(req, res = response) => {
    try {
        const idpersona = req.params.pers_id;
        const { pers_foto } = req.body;
        const persona = await Persona.findByPk(idpersona);
        await persona.update({ pers_foto });
        return res.status(200).json({ pers_foto });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        })
    }
}

module.exports = {
    personasGet,
    personasIdGet,
    personasPost,
    personasPut,
    personasDelete,
    actualizarFotoPut
}