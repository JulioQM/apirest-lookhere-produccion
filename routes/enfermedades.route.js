const { Router } = require('express');
const { check } = require('express-validator');
const { enfermedadesGet, enfermedadesIdGet, enfermedadesPost, enfermedadesDelete, enfermedadesPut } = require('../controllers/enfermedades.controller');
const { idEnfermedadExiste, enfermedadExiste } = require('../helpers/db_validators');
const { validarCampo } = require('../middlewares/validar-campos');

const router = Router();

// GET
router.get('/enfermedad', enfermedadesGet);
// GET BY ID
router.get('/enfermedad/:enfer_id', [
    check('enfer_id').custom(idEnfermedadExiste),
    validarCampo
], enfermedadesIdGet);
// POST
router.post('/enfermedad', [
    check('enfer_nombre', 'El nombre es obligatorio!').notEmpty(),
    //check('enfer_nombre').custom(enfermedadExiste),
    validarCampo
], enfermedadesPost);
// DELETE
router.delete('/enfermedad/:enfer_id', [
    check('enfer_id').custom(idEnfermedadExiste),
    validarCampo
], enfermedadesDelete);
// PUT
router.put('/enfermedad/:enfer_id', [
    check('enfer_nombre', 'El nombre es obligatorio!').notEmpty(),
    check('enfer_nombre').custom(enfermedadExiste),
    check('enfer_id').custom(idEnfermedadExiste),
    validarCampo
], enfermedadesPut);

module.exports = router;