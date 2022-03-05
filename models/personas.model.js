const { DataTypes } = require('sequelize');
const { db_sequelize } = require('../database/connection');
const { Provincia } = require('../models/provincias.model');
const { Ciudad } = require('../models/ciudades.model');
const { Usuario } = require('./usuarios.model');
const { Enfermedad } = require('./enfermedades.model');
const { Familiar } = require('./familiares.model');

const Persona = db_sequelize.define('personas', {

    //:::::::::::::: id de persona :::::::::::::::::
    pers_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    //:::::::::::::: SECCIÓN AUTENTICACION id usuario :::::::::::::::::
    usua_id: {
        type: DataTypes.BIGINT
    },
    //:::::::::::::: SECCIÓN DE DATOS PERSONALES :::::::::::::::::

    pers_identificacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pers_nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pers_apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pers_celular: {
        type: DataTypes.STRING,
        allowNull: false
    },
    pers_fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false
    },
    pers_sexo: {
        type: DataTypes.ENUM('M', 'F'),
        allowNull: false,
        defaultValue: 'M'
    },

    //:::::::::::::: SECCIÓN DE DATOS DE RESIDENCIA :::::::::::::::::
    prov_id: {
        type: DataTypes.BIGINT
    },
    ciud_id: {
        type: DataTypes.BIGINT
    },
    pers_direccion: {
        type: DataTypes.BIGINT
    },

    //:::::::::::::: SECCIÓN DE DATOS QR Y FOTO :::::::::::::::::


    pers_link_qr: {
        type: DataTypes.STRING,
    },
    pers_foto: {
        type: DataTypes.STRING,
        // agregar foto por defecto, link de la foto cargado desde cloudinary
        defaultValue: 'https://res.cloudinary.com/imagen-people/image/upload/v1646456393/Foto-porDefecto/avatar_perfil_wtf8vq.png'
    },

    pers_fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false
    },

    pers_fecha_actualizacion: {
        type: DataTypes.DATE,
        allowNull: false
    },

    pers_estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1
    }
}, {
    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: 'pers_fecha_registro',

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'pers_fecha_actualizacion',
    db_sequelize,
});

// Agrego relaciones
Persona.Provincia = Persona.belongsTo(Provincia, { foreignKey: 'prov_id' });
Persona.Ciudad = Persona.belongsTo(Ciudad, { foreignKey: 'ciud_id' });
Persona.Usuario = Persona.belongsTo(Usuario, { foreignKey: 'usua_id' });
// Son relaciones que sirven para la relacion con la tabla padre
Persona.hasMany(Familiar, { foreignKey: 'pers_id' });
Persona.hasMany(Enfermedad, { foreignKey: 'pers_id' });
Familiar.belongsTo(Persona, { foreignKey: 'pers_id' });
Enfermedad.belongsTo(Persona, { foreignKey: 'pers_id' });

module.exports = { Persona };