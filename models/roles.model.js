const { DataTypes, TIME } = require('sequelize');
const { db_sequelize } = require('../database/connection');


const Rol = db_sequelize.define('roles', {

    rol_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    rol_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    rol_fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false
    },

    rol_fecha_actualizacion: {
        type: DataTypes.DATE,
        allowNull: false
    },

    rol_estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1

    }

}, {
    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: 'rol_fecha_registro',

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'rol_fecha_actualizacion',
    db_sequelize,
});

module.exports = { Rol };