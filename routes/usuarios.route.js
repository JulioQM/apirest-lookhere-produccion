const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosPost, usuariosGet, usuariosIdGet, usuariosDelete, usuariosPut, loginUsuario } = require('../controllers/usuarios.controller');
const { emailExiste, idUsuarioExiste, usuarioExiste } = require('../helpers/db_validators');
const { validarCampo } = require('../middlewares/validar-campos');


const router = Router();
//manejo de rutas de edpoint
// GET
router.get('/usuario', usuariosGet);

// GET BY ID
router.get('/usuario/:usua_id', [
    check('usua_id').custom(idUsuarioExiste),
    validarCampo
], usuariosIdGet);

// POST
router.post('/usuario', [
    check('usua_alias', 'El nombre es obligatorio!').notEmpty(),
    check('usua_alias').custom(usuarioExiste),
    check('usua_email', 'El correo es obligatorio!').notEmpty(),
    check('usua_email', 'No es un correo electrónico valido').isEmail(),
    check('usua_email').custom(emailExiste),
    check('usua_clave', 'La clave es obligatorio!').notEmpty(),
    validarCampo
], usuariosPost);

// DELETE
router.delete('/usuario/:usua_id', [
    check('usua_id').custom(idUsuarioExiste),
    validarCampo
], usuariosDelete);

// PUT
router.put('/usuario/:usua_id', [
    check('usua_email', 'El correo es obligatorio!').notEmpty(),
    check('usua_clave', 'La clave es obligatorio!').notEmpty(),
    check('usua_email', 'No es un correo electrónico valido').isEmail(),
    check('usua_id').custom(idUsuarioExiste),
    check('usua_alias').custom(usuarioExiste),
    validarCampo
], usuariosPut);

module.exports = router;