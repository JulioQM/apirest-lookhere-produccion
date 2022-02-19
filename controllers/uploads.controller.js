const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const { response } = require('express');
const { Persona } = require('../models/personas.model');
// api rest que permite la carga de fotografias
const actualizarImagenCloudinary = async(req, res = response) => {
    // en esta parte se busca a la persona por el id, si lo encuentra le agrega la foto
    const { id } = req.params;
    let modelo;
    modelo = await Persona.findByPk(id);
    if (!modelo) {
        return res.status(400).json({
            msg: `No existe un usuario con el id ${ id }`
        });
    }

    // Limpiar imágenes previas
    if (modelo.pers_foto) {
        // En esta parte separo el valor  de la muestra de la imagen
        const nombreArr = modelo.pers_foto.split('/');
        // en esta parte se escoge los ultimos datos de la cadena
        const nombre = nombreArr[nombreArr.length - 1];
        // se agrega a la variable solo en nombre
        const [public_id] = nombre.split('.');
        // en esta parte me permite remover una foto ya subida
        /* cloudinary.uploader.destroy(public_id); */
        cloudinary.uploader.destroy(`Fotografia-Identidad/${public_id}`);
    }
    // configuración de valores nulos
    if (!req.files || Object.keys(req.files).length === 0)
        return res.status(400).json({ message: 'No hay imagen para subir' });

    // agrego parametro para la entrada de la fotografia
    const archivo = req.files.archivo;

    // validación que admite solo fotografia en formato png y jpg
    if (archivo.mimetype !== 'image/jpeg' && archivo.mimetype !== 'image/png') {
        return res.status(400).json({ msg: "El formato de archivo es incorrecto." })
    }
    // des-estructuración de la ruta de la imagen, y organización en la carpeta
    const { secure_url } = await cloudinary.uploader.upload(archivo.tempFilePath, {
        folder: "Fotografia-Identidad",
        transformation: [
            /* { width: 200, height: 200, radius: "max", crop: "fill" } */
            { width: 2448, height: 3264, gravity: "faces", crop: "thumb" },
            { radius: 80 }
        ],
        format: "png"
    });
    // agrego a mi variable de foto la ruta de la imagen
    modelo.pers_foto = secure_url;
    // sincronizo y guardo en la base de datos de la tabla persona
    await modelo.save();
    // imprimo mis datos con la ruta creada
    /* res.json({ url: modelo.pers_foto }); */
    res.json({ modelo });
}

module.exports = {
    actualizarImagenCloudinary
}