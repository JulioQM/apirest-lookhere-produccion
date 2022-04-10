const { response, request } = require('express');
const { Persona } = require('../models/personas.model');
const { Usuario } = require('../models/usuarios.model');
const { Enfermedad } = require('../models/enfermedades.model');
const { Familiar } = require('../models/familiares.model');


//CONSULTARAN PERSONAS
const personasGet = async(req = request, res = response) => {
    try {
        const persona = await Persona.findAll({ where: { pers_estado: '1' }, order: ['pers_id'] });
        return res.status(200).json({ persona });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}
const ubicacionGet = async(req = request, res = response) => {

    try {
        const ubicacion = [{
            id: "1",
            longitude: "-0.028",
            latitude: "0.069",
            description: "This is the description of POI#1",
            name: "POI#1"
        }];
        console.log(ubicacion);
        return res.status(200).json(ubicacion);
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

// LISTA DE ID QR
const listaIdQRGet = async(req = request, res = response) => {
    try {
        const persona = await Persona.findAll({ where: { pers_estado: '1' }, order: ['pers_id'] });
        // en este apartado extraigo valores del json
        const converJson = JSON.stringify(persona, null, 2);
        // en esta parte convierto en un json, para extraer los datos
        var parseoJson = JSON.parse(converJson);
        var areglo = [];
        // agrego los valores en el array
        for (const i in parseoJson) {
            console.log(parseoJson[i]['pers_id']);
            areglo.push(parseoJson[i]['pers_id']);
        }
        /* console.log(areglo);
        if (areglo.includes(2)) {
            console.log('TRUE')
        } else {
            console.log('FALSE')
        } */
        return res.status(200).json(areglo);
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}

//CONSULTAR POR ID PERSONAS
const personasIdGet = async(req = request, res = response) => {
        try {
            const idpersona = req.params.pers_id;
            const persona = await Persona.findByPk(idpersona);
            return res.status(200).json({ persona });
        } catch (error) {
            return res.status(500).json({
                message: `Error detectado: ${error}`
            });
        }
    }
    // consultar mediante SQL INNER JOIN
const personaIdGetInnerJoin = async(req = request, res = response) => {
        try {
            const idpersona = req.params.pers_id;
            const persona = await Persona.findByPk(idpersona, {
                include: [{
                    association: Persona.Provincia
                }, {
                    association: Persona.Ciudad
                }],
            });

            const {
                pers_identificacion,
                pers_nombres,
                pers_apellidos,
                pers_celular,
                pers_fecha_nacimiento,
                pers_sexo,
                provincia: {
                    prov_nombre
                },
                ciudade: {
                    ciud_nombre
                },
                pers_direccion,
                pers_foto
            } = persona.toJSON();
            const pers_dia_nacimiento = pers_fecha_nacimiento.toLocaleDateString()
            console.log(pers_dia_nacimiento);

            return res.status(200).json({
                persona: {
                    pers_identificacion,
                    pers_nombres,
                    pers_apellidos,
                    pers_celular,
                    pers_dia_nacimiento,
                    pers_sexo,
                    prov_nombre,
                    ciud_nombre,
                    pers_direccion,
                    pers_foto
                }
            })
        } catch (error) {
            return res.status(500).json({
                message: `Error detectado: ${error}`
            });
        }
    }
    // esto me va servir para coger el id del usuario, y luego visualizara  el id de la persona
const usuarioIdGetInnerJoin = async(req = request, res = response) => {
        try {
            const id_usuario = req.params.usua_id;
            const persona = await Persona.findOne({
                include: [{
                        association: Persona.Provincia
                    }, {
                        association: Persona.Ciudad
                    },
                    {
                        association: Persona.Usuario,
                        where: { usua_id: id_usuario },
                        required: true
                    }
                ],
            });

            const {
                pers_id,
                usua_id,
                pers_identificacion,
                pers_nombres,
                pers_apellidos,
                pers_celular,
                pers_fecha_nacimiento,
                pers_sexo,
                provincia: {
                    prov_nombre
                },
                ciudade: {
                    ciud_nombre
                },
                pers_direccion,
                pers_foto
            } = persona.toJSON();
            const pers_dia_nacimiento = pers_fecha_nacimiento.toLocaleDateString()
            console.log(pers_dia_nacimiento);

            return res.status(200).json({
                persona: {
                    pers_id,
                    usua_id,
                    pers_identificacion,
                    pers_nombres,
                    pers_apellidos,
                    pers_celular,
                    pers_dia_nacimiento,
                    pers_sexo,
                    prov_nombre,
                    ciud_nombre,
                    pers_direccion,
                    pers_foto
                }
            });
        } catch (error) {
            return res.status(500).json({
                message: `Error detectado: ${error}`
            });
        }
    }
    // Nota estos datos son extraidos por el id de la persona, y esto sucede cuando se registra la cuenta en el lado del Fronted
const datosRegistroPerfil = async(req = request, res = response) => {
    try {
        const id_pers = req.params.pers_id;
        const pers = await Persona.findOne({
            where: { pers_id: id_pers },
            include: [

                {
                    association: Persona.Usuario,

                },
                {
                    association: Persona.Provincia
                },
                {
                    association: Persona.Ciudad
                },
                {
                    model: Enfermedad,
                    required: true
                },
                {
                    model: Familiar,
                    required: true
                }
            ]

        });
        // en este apartado extraigo valores del json
        const converJson = JSON.stringify(pers, null, 2);
        // en esta parte convierto en un json, para extraer los datos
        var parseoJson = JSON.parse(converJson);
        // datos por parte de la tabla de familiares
        const famil_nombres = parseoJson['familiares'][0]['famil_nombres'];
        const famil_apellidos = parseoJson['familiares'][0]['famil_apellidos'];
        const famil_nombresCompletos = famil_nombres + " " + famil_apellidos;
        const famil_celular = parseoJson['familiares'][0]['famil_celular'];
        const famil_direccion = parseoJson['familiares'][0]['famil_direccion'];
        console.log(parseoJson['familiares']);
        console.log(parseoJson['enfermedades']);
        console.log(famil_celular);
        console.log(famil_nombresCompletos);
        // datos por parte de la tabla enfermedades
        const enfer_nombre = parseoJson['enfermedades'][0]['enfer_nombre'];
        const enfer_desc_medicacion = parseoJson['enfermedades'][0]['enfer_desc_medicacion'];
        const enfer_desc_dosificacion = parseoJson['enfermedades'][0]['enfer_desc_dosificacion'];
        const enfer_desc_enfermedad = parseoJson['enfermedades'][0]['enfer_desc_enfermedad'];

        const {
            pers_id,
            usua_id,
            pers_identificacion,
            pers_nombres,
            pers_apellidos,
            pers_celular,
            pers_fecha_nacimiento,
            pers_sexo,
            provincia: {
                prov_nombre
            },
            ciudade: {
                ciud_nombre
            },
            pers_direccion,
            pers_foto,
        } = pers;
        const pers_dia_nacimiento = pers_fecha_nacimiento.toLocaleDateString()
        return res.status(200).json({
            persona: {
                pers_id,
                usua_id,
                pers_identificacion,
                pers_nombres,
                pers_apellidos,
                pers_celular,
                pers_dia_nacimiento,
                pers_sexo,
                prov_nombre,
                ciud_nombre,
                pers_direccion,
                pers_foto,
                famil_nombresCompletos,
                famil_celular,
                famil_direccion,
                enfer_nombre,
                enfer_desc_medicacion,
                enfer_desc_dosificacion,
                enfer_desc_enfermedad
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}



// todos los datos de perfil de usuario
// valido datos extraidos de perfil
// Nota estos datos son extraidos por el id del usuario, y esto sucede cuando se autentica en el lado del Fronted
const datosPerfil = async(req = request, res = response) => {
    try {
        const id_usuario = req.params.usua_id;
        const pers = await Persona.findOne({
            include: [

                {
                    association: Persona.Usuario,
                    where: { usua_id: id_usuario },
                    required: true
                },
                {
                    association: Persona.Provincia
                },
                {
                    association: Persona.Ciudad
                },
                {
                    model: Enfermedad,
                    required: true
                },
                {
                    model: Familiar,
                    required: true
                }
            ]

        });
        // en este apartado extraigo valores del json
        const converJson = JSON.stringify(pers, null, 2);
        // en esta parte convierto en un json, para extraer los datos
        var parseoJson = JSON.parse(converJson);
        // datos por parte de la tabla de familiares
        const famil_nombres = parseoJson['familiares'][0]['famil_nombres'];
        const famil_apellidos = parseoJson['familiares'][0]['famil_apellidos'];
        const famil_nombresCompletos = famil_nombres + " " + famil_apellidos;
        const famil_celular = parseoJson['familiares'][0]['famil_celular'];
        const famil_direccion = parseoJson['familiares'][0]['famil_direccion'];
        console.log(parseoJson['familiares']);
        console.log(parseoJson['enfermedades']);
        console.log(famil_celular);
        console.log(famil_nombresCompletos);
        // datos por parte de la tabla enfermedades
        const enfer_nombre = parseoJson['enfermedades'][0]['enfer_nombre'];
        const enfer_desc_medicacion = parseoJson['enfermedades'][0]['enfer_desc_medicacion'];
        const enfer_desc_dosificacion = parseoJson['enfermedades'][0]['enfer_desc_dosificacion'];
        const enfer_desc_enfermedad = parseoJson['enfermedades'][0]['enfer_desc_enfermedad'];

        const {
            pers_id,
            usua_id,
            pers_identificacion,
            pers_nombres,
            pers_apellidos,
            pers_celular,
            pers_fecha_nacimiento,
            pers_sexo,
            provincia: {
                prov_nombre
            },
            ciudade: {
                ciud_nombre
            },
            pers_direccion,
            pers_foto,
        } = pers;
        const pers_dia_nacimiento = pers_fecha_nacimiento.toLocaleDateString()
        return res.status(200).json({
            persona: {
                pers_id,
                usua_id,
                pers_identificacion,
                pers_nombres,
                pers_apellidos,
                pers_celular,
                pers_dia_nacimiento,
                pers_sexo,
                prov_nombre,
                ciud_nombre,
                pers_direccion,
                pers_foto,
                famil_nombresCompletos,
                famil_celular,
                famil_direccion,
                enfer_nombre,
                enfer_desc_medicacion,
                enfer_desc_dosificacion,
                enfer_desc_enfermedad
            }
        });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}


//AGREGAR PERSONAS
const personasPost = async(req, res = response) => {
    try {
        const { body } = req;
        const persona = new Persona(body);
        const id = await persona.save().then(result => {
            return result.pers_id;
        });;
        return res.status(200).json({ id });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        })
    }
}



// ELIMINAR PERSONAS
const personasDelete = async(req, res = response) => {
    try {
        const idpersona = parseInt(req.params.pers_id);
        const persona = await Persona.findByPk(idpersona);
        await persona.update({ pers_estado: 0 });
        return res.status(200).json(`Rol eliminado con ID: ${idpersona}`);
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        });
    }
}


// ACTUALIZAR PERSONAS
const personasPut = async(req, res = response) => {
    try {
        const idpersona = req.params.pers_id;
        const { body } = req;
        const persona = await Persona.findByPk(idpersona);
        await persona.update(body);
        return res.status(200).json({ persona });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        })
    }
}

// ACTUALIZAR FOTO
const actualizarFotoPut = async(req, res = response) => {
    try {
        const idpersona = req.params.pers_id;
        const { pers_foto } = req.body;
        const persona = await Persona.findByPk(idpersona);
        await persona.update({ pers_foto });
        return res.status(200).json({ pers_foto });
    } catch (error) {
        return res.status(500).json({
            message: `Error detectado: ${error}`
        })
    }
}

module.exports = {
    personasGet,
    listaIdQRGet,
    personasIdGet,
    personasPost,
    personasPut,
    personasDelete,
    actualizarFotoPut,
    personaIdGetInnerJoin,
    usuarioIdGetInnerJoin,
    datosRegistroPerfil,
    datosPerfil,
    ubicacionGet
}