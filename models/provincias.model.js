const { DataTypes } = require('sequelize');
const { db_sequelize } = require('../database/connection');


const Provincia = db_sequelize.define('provincias', {
    prov_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    prov_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    prov_fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false
    },

    prov_fecha_actualizacion: {
        type: DataTypes.DATE,
        allowNull: false
    },

    prov_estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: 'prov_fecha_registro',

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'prov_fecha_actualizacion',
    db_sequelize,
});

module.exports = { Provincia };