const { Router } = require('express');
const { actualizarImagenCloudinary } = require('../controllers/uploads.controller');

const router = Router();

// ruta para la subida de imagenes de tipo PUT
router.put('/foto/:id',
    actualizarImagenCloudinary)

module.exports = router;