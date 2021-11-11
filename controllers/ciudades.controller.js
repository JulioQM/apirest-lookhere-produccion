const { response, request } = require('express');
const { Ciudad } = require('../models/ciudades.model');
const { Provincia } = require('../models/provincias.model');

// PROVINCIA ESCOGIDA Y CIUDADES DESPLEGABLE AL COMBOBOX, LISTA DE PROVINCIA SELECIONADA ARROJARA LAS CIUDADES
const ciudadesIdGet = async(req = request, res = response) => {
    try {
        const idprovincia = req.params.prov_id;
        const ciudad = await Ciudad.findAll({ where: { prov_id: idprovincia } });
        for (const c in ciudad) {
            console.log(ciudad[c].ciud_nombre);
        }
        if (!ciudad) {
            return res.status(400).json({
                message: `No se encontro la ciudad con id ${idprovincia}`
            });
        }
        return res.status(200).json(ciudad);
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

// LISTA DE PROVINCIAS
const provinciasGet = async(req = request, res = response) => {
    try {
        const provincia = await Provincia.findAll();
        return res.status(200).json(provincia);
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

module.exports = {
    provinciasGet,
    ciudadesIdGet

}