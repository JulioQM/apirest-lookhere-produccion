const { validationResult } = require("express-validator")

const validarCampo = (req, res, next) => {
    // expresiones de validaciones middleware de express-validator
    const errors = validationResult(req);
    // si el check de las routas tiene errores, eso quiere decir esta llena o vacia de errores
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
}

module.exports = { validarCampo }