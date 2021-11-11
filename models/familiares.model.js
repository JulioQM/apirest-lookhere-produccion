const { DataTypes } = require('sequelize');
const { db_sequelize } = require('../database/connection');


const Familiar = db_sequelize.define('familiares', {
    famil_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    pers_id: {
        type: DataTypes.BIGINT
    },
    famil_nombres: {
        type: DataTypes.STRING,
        allowNull: false
    },
    famil_apellidos: {
        type: DataTypes.STRING,
        allowNull: false
    },
    famil_celular: {
        type: DataTypes.STRING,
        allowNull: false
    },
    famil_convencional: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Ninguno'
    },
    famil_direccion: {
        type: DataTypes.STRING,
        allowNull: false
    },

    famil_fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false
    },

    famil_fecha_actualizacion: {
        type: DataTypes.DATE
    },

    famil_estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1
    }
}, {
    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: 'famil_fecha_registro',

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'famil_fecha_actualizacion',
    db_sequelize,
});

module.exports = { Familiar };