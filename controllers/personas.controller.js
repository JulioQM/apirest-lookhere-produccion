const { response, request } = require('express');
const { Persona } = require('../models/personas.model');
const { Usuario } = require('../models/usuarios.model');


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
    personasIdGet,
    personasPost,
    personasPut,
    personasDelete,
    actualizarFotoPut,
    personaIdGetInnerJoin,
    usuarioIdGetInnerJoin
}