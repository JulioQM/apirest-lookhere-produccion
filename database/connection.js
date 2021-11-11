const { Sequelize } = require('sequelize');
const db_sequelize = new Sequelize('bdlookhere', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres',
    /* logging: false, */
    omitNull: true,
    define: {
        "freezeTableName": true, // sirve para mantenerlos estaticos a los nombres de la tabla
        "timestamps": false // sirve para quitar los atributos por defecto como: createdAt:updatedAt:
    }
});

module.exports = { db_sequelize };