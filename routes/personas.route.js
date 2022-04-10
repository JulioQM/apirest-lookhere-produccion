const { Router } = require('express');
const { check } = require('express-validator');
const { personasGet, personasIdGet, personasPost, actualizarFotoPut, personasDelete, personasPut, personaIdGetInnerJoin, usuarioIdGetInnerJoin, datosPerfil, datosRegistroPerfil, listaIdQRGet, ubicacionGet } = require('../controllers/personas.controller');
const { idPersonaExiste, cedulaPersonaExiste, validacionCedula, telefonoVerificador } = require('../helpers/db_validators');
const { validarCampo } = require('../middlewares/validar-campos');
const { entidadValidatorPost } = require('../validator/identidad.validator');


const router = Router();
//manejo de rutas de edpoint
// GET
router.get('/persona', personasGet);
// lista de codigo QR
// GET 
router.get('/personaIdQR', listaIdQRGet);

// GET BY ID
router.get('/persona/:pers_id', [
    check('pers_id').custom(idPersonaExiste),
    validarCampo
], personasIdGet);
//inner join
router.get('/personaJoin/:pers_id',
    personaIdGetInnerJoin);
// inner join , consumido por busqueda del usuario
router.get('/usuarioIdJoin/:usua_id', usuarioIdGetInnerJoin);
// consultar todos los datos referentes al perfil
// nota esto sucede en el fronted a lo que se autentica
router.get('/datosPerfil/:usua_id', datosPerfil);
// consultar todos los datos referentes al perfil
// nota esto sucede en el fronted a lo que registra una cuenta
router.get('/datosRegistroPerfil/:pers_id', datosRegistroPerfil);
// POST
router.post('/persona'
    /* , [
        check('pers_identificacion', 'La cédula es obligatorio!').notEmpty(),
        check('pers_identificacion', 'La cédula debe tener 10 dígitos!').isLength({ min: 10, max: 10 }),
        check('pers_identificacion', 'La cédula debe tener solo numeros!').isNumeric(),
        check('pers_nombres', 'El nombre es obligatorio!').notEmpty(),
        check('pers_apellidos', 'El apellido es obligatorio!').notEmpty(),
        check('pers_celular', 'El número celular es obligatorio!').notEmpty(),
        check('pers_celular', 'El número celular debe tener 10 dígitos!').isLength({ min: 10, max: 10 }),
        check('pers_celular', 'El número celular debe tener solo numeros!').isNumeric(),
        check('pers_sexo', 'Este campo es obligatorio!').notEmpty(),
        check('pers_fecha_nacimiento', 'La fecha de nacimiento es obligatorio!').notEmpty(),
        check('pers_direccion', 'La dirección es obligatorio!').notEmpty(),
        check('pers_identificacion').custom(cedulaPersonaExiste),
        check('pers_identificacion').custom(validacionCedula),
        validarCampo
    ] */
    , personasPost);

// Validador Entidad
router.post('/validarPersona', [
    check('pers_identificacion').custom(cedulaPersonaExiste),
    check('pers_identificacion').custom(validacionCedula),
    check('pers_celular').custom(telefonoVerificador),
    validarCampo
], entidadValidatorPost);

// otra mitad entidad
router.post('/personaIdentidad', entidadValidatorPost);

// PUT

router.put('/persona/:pers_id', [
    check('pers_nombres', 'El nombre es obligatorio!').notEmpty(),
    check('pers_apellidos', 'El apellido es obligatorio!').notEmpty(),
    check('pers_celular', 'El número celular es obligatorio!').notEmpty(),
    check('pers_celular', 'El número celular debe tener 10 dígitos!').isLength({ min: 10, max: 10 }),
    check('pers_celular', 'El número celular debe tener solo numeros!').isNumeric(),
    check('pers_sexo', 'Este campo es obligatorio!').notEmpty(),
    check('pers_fecha_nacimiento', 'La fecha de nacimiento es obligatorio!').notEmpty(),
    check('pers_direccion', 'La dirección es obligatorio!').notEmpty(),
    check('pers_id').custom(idPersonaExiste),
    validarCampo
], personasPut);

// ACTUALIZAR LA FOTO
router.put('/persona/foto/:pers_id', [
    check('pers_foto', 'La foto es obligatorio!').notEmpty(),
    check('pers_id').custom(idPersonaExiste),
    validarCampo
], actualizarFotoPut);

// DELETE
router.delete('/persona/:pers_id', [
    check('pers_id').custom(idPersonaExiste),
    validarCampo
], personasDelete);

router.get("/ubicacion", ubicacionGet);

module.exports = router;