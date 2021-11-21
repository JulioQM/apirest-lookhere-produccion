const { DataTypes } = require('sequelize');
const { db_sequelize } = require('../database/connection');

const Enfermedad = db_sequelize.define('enfermedades', {
    enfer_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pers_id: {
        type: DataTypes.BIGINT
    },

    enfer_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    enfer_desc_medicacion: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Ninguno'
    },
    enfer_desc_dosificacion: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Ninguno'
    },
    enfer_desc_enfermedad: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'Ninguno'
    },

    enfer_fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false
    },

    enfer_fecha_actualizacion: {
        type: DataTypes.DATE,
        allowNull: false
    },

    enfer_estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1
    }
}, {
    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: 'enfer_fecha_registro',

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'enfer_fecha_actualizacion',
    db_sequelize,
});

module.exports = { Enfermedad };