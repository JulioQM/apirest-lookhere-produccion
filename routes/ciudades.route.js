const { Router } = require('express');
const { provinciasGet, ciudadesIdGet } = require('../controllers/ciudades.controller');

const router = Router();

// LISTA DE PROVINCIAS
router.get('/provincia', provinciasGet);

// GET LISTA DE CIUDADES FILTRADAS POR ID DE LAPROVINCIA
router.get('/ciudad/:prov_id', ciudadesIdGet);


module.exports = router;