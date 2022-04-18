const { response, request } = require('express');
const { Familiar } = require('../models/familiares.model');


//CONSULTAR FAMILIARES
const familiaresGet = async(req = request, res = response) => {
    try {
        const familiar = await Familiar.findAll({ where: { famil_estado: '1' }, order: ['famil_id'] });
        return res.status(200).json({ familiar });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

//CONSULTAR POR ID FAMILIARES
const familiaresIdGet = async(req = request, res = response) => {
    try {
        const idfamilia = req.params.famil_id;
        const familiar = await Familiar.findByPk(idfamilia);
        return res.status(200).json({ familiar });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}


//CONSULTAR FAMILIARES QUE PERTENECEN AL ID DE LA PERSONA
const familiaresIdPersonaGet = async(req = request, res = response) => {
    try {
        const idpers = req.params.pers_id;
        const familiar = await Familiar.findAll({ where: { pers_id: idpers }, order: ['famil_id'] });
        return res.status(200).json({ familiar });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}


//AGREGAR FAMILIARES
const familiaresPost = async(req, res = response) => {
    try {
        const { body } = req;
        const familia = new Familiar(body);
        const id = await familia.save().then(result => { return result.famil_id });
        return res.status(200).json({ id });

    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

// ACTUALIZAR FAMILIARES
const familiaresPut = async(req, res = response) => {
    try {
        const idfamilia = req.params.famil_id;
        const { body } = req;
        const familia = await Familiar.findByPk(idfamilia);
        await familia.update(body);
        return res.status(200).json({
            message: `Datos familiares ${idfamilia} actualizado exitosamente`
        });

    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

// ELIMINAR FAMILIARES
const familiaresDelete = async(req, res = response) => {
    try {
        const idfamilia = req.params.famil_id;
        const familia = await Familiar.findByPk(idfamilia);
        await familia.update({ famil_estado: 0 });
        return res.status(200).json(`Familiar eliminado con ID: ${idfamilia}`);
    } catch (error) {
        return res.json({
            message: `Error detectado: ${error}`
        });
    }
}

module.exports = {
    familiaresGet,
    familiaresIdGet,
    familiaresIdPersonaGet,
    familiaresPost,
    familiaresPut,
    familiaresDelete
}