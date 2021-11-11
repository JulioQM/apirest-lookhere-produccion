const { Sequelize } = require('sequelize');
const db_sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres',
    /* logging: false, */
    ssl: true,
    omitNull: true,
    define: {
        "freezeTableName": true, // sirve para mantenerlos estaticos a los nombres de la tabla
        "timestamps": false // sirve para quitar los atributos por defecto como: createdAt:updatedAt:
    }
});

module.exports = { db_sequelize };