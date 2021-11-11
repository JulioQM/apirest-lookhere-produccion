const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampo } = require('../middlewares/validar-campos');
const { rolesGet, rolesPost, rolesDelete, rolesPut, rolesIdGet } = require('../controllers/roles.controller');
const { idRolExiste, rolExiste } = require('../helpers/db_validators');

const router = Router();
//manejo de rutas de edpoint
// GET
router.get('/rol', rolesGet);
// GET BY ID
router.get('/rol/:rol_id', [
    check('rol_id').custom(idRolExiste),
    validarCampo
], rolesIdGet);
// POST
router.post('/rol', [
    check('rol_nombre', 'El nombre es obligatorio!').notEmpty(),
    check('rol_nombre').custom(rolExiste),
    validarCampo
], rolesPost);
// DELETE
router.delete('/rol/:rol_id', [
    check('rol_id').custom(idRolExiste),
    validarCampo
], rolesDelete);
// PUT
router.put('/rol/:rol_id', [
    check('rol_nombre', 'El nombre es obligatorio!').notEmpty(),
    check('rol_id').custom(idRolExiste),
    validarCampo
], rolesPut);



module.exports = router;