const { DataTypes } = require('sequelize');
const { db_sequelize } = require('../database/connection');


const Ciudad = db_sequelize.define('ciudades', {
    ciud_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    prov_id: {
        type: DataTypes.BIGINT,
        allowNull: false
    },

    ciud_nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    ciud_fecha_registro: {
        type: DataTypes.DATE,
        allowNull: false
    },

    ciud_fecha_actualizacion: {
        type: DataTypes.DATE
    },

    ciud_estado: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: 'ciud_fecha_registro',

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'ciud_fecha_actualizacion',
    db_sequelize,
});

module.exports = { Ciudad };