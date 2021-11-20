/* Helper es un módulo que consiste en una forma de agrupar funciones de uso común,
 destinadas a servir de ayuda a otros procesos. Un Helper se compone de funciones 
 genéricas que se encargan de realizar  acciones complementarias, aplicables a 
 cualquier elemento de un sistema. */

const { Enfermedad } = require('../models/enfermedades.model');
const { Familiar } = require('../models/familiares.model');
const { Persona } = require('../models/personas.model');
const { Rol } = require('../models/roles.model');
const { Usuario } = require('../models/usuarios.model');
const { validarCedula } = require('./validarCedula');

//:::::::::::::::::::: USUARIOS ::::::::::::::::::::::::::::::
// Método que permite verificar si el correo existe en la BD
const emailExiste = async(correo = '') => {
    // verificar si el correo existe
    const emailExiste = await Usuario.findOne({ where: { usua_email: correo, usua_estado: '1' } });
    if (emailExiste) {
        throw new Error(`El correo electrónico ${correo} ya se encuentra registrado, ingrese otro correo!`)
    }
}

// Método que permite verificar si el alias o usuario existe en la BD
const usuarioExiste = async(alias = '') => {
    // verificar si el usuario existe
    const usuarioExiste = await Usuario.findOne({ where: { usua_alias: alias, usua_estado: '1' } });
    if (usuarioExiste) {
        throw new Error(`El usuario ${alias} ya se encuentra registrado, ingrese otro usuario!`)
    }
}

// Método que permite verificar si el ID existe en la BD
const idUsuarioExiste = async(idusuario = '') => {
    //verificar si existe el id de usuario
    const idExiste = await Usuario.findOne({ where: { usua_id: idusuario, usua_estado: '1' } });
    if (!idExiste) {
        throw new Error(`No se encuentra registrado ese usuario con id ${idusuario}, ingrese otro id! `);
    }
}

//:::::::::::::::::::: ROLES ::::::::::::::::::::::::::::::

// Método que permite verificar si el nombre del rol existe en la BD
const rolExiste = async(rol_nombre = '') => {
    const rolExiste = await Rol.findOne({ where: { rol_nombre: rol_nombre, rol_estado: '1' } });
    if (rolExiste) {
        throw new Error(`El rol ${rol_nombre} ya se encuentra registrado, ingrese otro rol!`)
    }
}

// Método que permite verificar si el ID existe en la BD
const idRolExiste = async(idrol = '') => {
    //verificar si existe el id de rol
    const idExiste = await Rol.findOne({ where: { rol_id: idrol, rol_estado: '1' } });
    if (!idExiste) {
        throw new Error(`No se encuentra registrado ese rol con id ${idrol}, ingrese otro id! `);
    }
}

//:::::::::::::::::::: ENFERMEDADES ::::::::::::::::::::::::::::::
// Método que permite verificar si el nombre de la enfermedad existe en la BD
const enfermedadExiste = async(enfer_nombre = '') => {
    const enfermedadExiste = await Enfermedad.findOne({ where: { enfer_nombre: enfer_nombre, enfer_estado: '1' } });
    if (enfermedadExiste) {
        throw new Error(`La enfermedad ${enfer_nombre} ya se encuentra registrado, ingrese otro enfermedad!`)
    }
}

// Método que permite verificar si el ID existe en la BD
const idEnfermedadExiste = async(idenfermedad = '') => {
    //verificar si existe el id enfermedades
    const idExiste = await Enfermedad.findOne({ where: { enfer_id: idenfermedad, enfer_estado: '1' } });
    if (!idExiste) {
        throw new Error(`No se encuentra registrado esa enfermedad con id ${idenfermedad}, ingrese otro id! `);
    }
}

//:::::::::::::::::::: FAMILIARES ::::::::::::::::::::::::::::::
// Método que permite verificar si el ID existe en la BD
const idFamiliarExiste = async(idfamiliar = '') => {
        //verificar si existe el id de familiar
        const idExiste = await Familiar.findOne({ where: { famil_id: idfamiliar, famil_estado: '1' } });
        if (!idExiste) {
            throw new Error(`No se encuentra registrado el familiar con id ${idfamiliar}, ingrese otro id! `);
        }
    }
    //:::::::::::::::::::: PERSONAS ::::::::::::::::::::::::::::::
const idPersonaExiste = async(idpersona = '') => {
    //verificar si existe el id de persona
    const idExiste = await Persona.findOne({ where: { pers_id: idpersona, pers_estado: '1' } });
    if (!idExiste) {
        throw new Error(`No se encuentra registrado la persona con id ${idpersona}, ingrese otro id! `);
    }
}
const cedulaPersonaExiste = async(cedula_persona = '') => {
    const cedulaExiste = await Persona.findOne({ where: { pers_identificacion: cedula_persona, pers_estado: '1' } });
    console.log(cedulaExiste + '............')
    if (cedulaExiste) {
        throw new Error(`Ya se encuentra registrado la persona con cedula ${cedula_persona}, ingrese otro cedula! `);
    }
}
const validacionCedula = async(cedula_persona = '') => {
    await validarCedula(cedula_persona).then(result => {
        if (!result.verificar) {
            throw new Error(` Cédula incorrecta `);
        } else {
            console.log('Cedula Correcta');
        }
    });
}

module.exports = {
    // usuarios
    emailExiste,
    idUsuarioExiste,
    usuarioExiste,
    // roles
    rolExiste,
    idRolExiste,
    // enfermedades
    enfermedadExiste,
    idEnfermedadExiste,
    // familiares
    idFamiliarExiste,
    // personas
    idPersonaExiste,
    cedulaPersonaExiste,
    validacionCedula

};