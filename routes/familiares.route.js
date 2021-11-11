const { Router } = require('express');
const { check } = require('express-validator');
const { familiaresGet, familiaresIdGet, familiaresPost, familiaresDelete, familiaresPut } = require('../controllers/familiares.controller');
const { idFamiliarExiste } = require('../helpers/db_validators');
const { validarCampo } = require('../middlewares/validar-campos');

const router = Router();

// GET
router.get('/familiar', familiaresGet);
// GET BY ID
router.get('/familiar/:famil_id', [
    check('famil_id').custom(idFamiliarExiste),
    validarCampo
], familiaresIdGet);
// POST
router.post('/familiar', [
    check('famil_nombres', 'El nombre es obligatorio!').notEmpty(),
    check('famil_apellidos', 'El apellido es obligatorio!').notEmpty(),
    check('famil_celular', 'El número celular es obligatorio!').notEmpty(),
    check('famil_celular', 'El número celular debe contener 10 digitos!').isLength({ min: 10, max: 10 }),
    check('famil_celular', 'El número celular debe contener solo numeros!').isNumeric(),
    check('famil_direccion', 'La dirección es obligatorio!').notEmpty(),
    validarCampo
], familiaresPost);
// DELETE
router.delete('/familiar/:famil_id', [
    check('famil_id').custom(idFamiliarExiste),
    validarCampo
], familiaresDelete);
// PUT
router.put('/familiar/:famil_id', [
    check('famil_nombres', 'El nombre es obligatorio!').notEmpty(),
    check('famil_apellidos', 'El apellido es obligatorio!').notEmpty(),
    check('famil_celular', 'El número celular es obligatorio!').notEmpty(),
    check('famil_celular', 'El número celular debe contener 10 digitos!').isLength({ min: 10, max: 10 }),
    check('famil_celular', 'El número celular debe contener solo numeros!').isNumeric(),
    check('famil_direccion', 'La dirección es obligatorio!').notEmpty(),
    check('famil_id').custom(idFamiliarExiste),
    validarCampo
], familiaresPut);

module.exports = router;