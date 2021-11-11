const { DataTypes } = require('sequelize');
const { db_sequelize } = require('../database/connection');


const Usuario = db_sequelize.define('usuarios', {
    usua_id: {
        type: DataTypes.BIGINT,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    rol_id: {
        type: DataTypes.BIGINT
    },
    usua_alias: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usua_clave: {
        type: DataTypes.STRING,
        allowNull: false
    },
    usua_email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    usua_fecha_registro: {
        type: DataTypes.DATE,
        //allowNull: false
    },

    usua_fecha_actualizacion: {
        type: DataTypes.DATE
    },

    usua_estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 1
    }
}, {
    // don't forget to enable timestamps!
    timestamps: true,

    // I don't want createdAt
    createdAt: 'usua_fecha_registro',

    // I want updatedAt to actually be called updateTimestamp
    updatedAt: 'usua_fecha_actualizacion',
    db_sequelize,
});

module.exports = { Usuario };