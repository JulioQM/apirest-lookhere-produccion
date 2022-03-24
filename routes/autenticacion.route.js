const { Router } = require('express');
const { check } = require('express-validator');
const { loginAdmin, loginUser, validarCodigoVerificacion } = require('../controllers/autenticacion.controller');
const { validarCampo } = require('../middlewares/validar-campos');

const router = Router();
// RUTA LOGIN DE USUARIO
// Para la parte de administración
router.post("/loginAdmin", [
    check('usua_alias', 'Ingrese su usuario!').notEmpty(),
    check('usua_clave', 'Ingrese su contraseña!').notEmpty(),
    validarCampo
], loginAdmin);
// Para la parte de usuarios normales
router.post("/loginUser", [
    check('usua_alias', 'Ingrese su usuario!').notEmpty(),
    check('usua_clave', 'Ingrese su contraseña!').notEmpty(),
    validarCampo
], loginUser);
// Validar código de verificación
// Para la parte de usuarios normales
router.post("/verificar", [
    check('usua_id', 'Ingrese su id de usuario!').notEmpty(),
    check('usua_codigo', 'Ingrese su código de verificación!').notEmpty(),
    validarCampo
], validarCodigoVerificacion);


module.exports = router;