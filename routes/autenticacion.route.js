const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/autenticacion.controller');
const { validarCampo } = require('../middlewares/validar-campos');

const router = Router();
// RUTA LOGIN DE USUARIO
router.post("/login", [
    check('usua_alias', 'Ingrese su usuario!').notEmpty(),
    check('usua_clave', 'Ingrese su contraseña!').notEmpty(),
    validarCampo
], login);

module.exports = router;