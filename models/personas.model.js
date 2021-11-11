const { DataTypes } = require('sequelize');
const { db_sequelize } = require('../database/connection');


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
        type: DataTypes.ENUM('M', 'S'),
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

    //:::::::::::::: SECCIÓN DE DATOS DE CONTACTO FAMILIAR :::::::::::::::::
    enfer_id: {
        type: DataTypes.BIGINT
    },
    //:::::::::::::: SECCIÓN DE DATOS MEDICOS :::::::::::::::::
    pers_tiene_medicacion: {
        type: DataTypes.ENUM('No', 'Si'),
        defaultValue: 'No'
    },
    pers_tiene_dosificacion: {
        type: DataTypes.ENUM('No', 'Si'),
        defaultValue: 'No'
    },
    pers_tiene_enfermedad: {
        type: DataTypes.ENUM('No', 'Si'),
        defaultValue: 'No'
    },
    pers_desc_medicacion: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Ninguno'
    },
    pers_desc_dosificacion: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Ninguno'
    },
    pers_desc_enfermedad: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Ninguno'
    },
    pers_link_qr: {
        type: DataTypes.STRING,
    },
    pers_foto: {
        type: DataTypes.STRING,
    },

    pers_fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false
    },

    pers_fecha_actualizacion: {
        type: DataTypes.DATE
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

module.exports = { Persona };