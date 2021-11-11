const { Sequelize } = require('sequelize');
const db_sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'postgres',
    logging: true, // Esta opcion permite Sequelize registrará en la consola cada consulta SQL que realice.
    ssl: true,
    omitNull: true, // permite omitir valores nulos que se ingresan a la base de datos

    define: {
        "freezeTableName": true, // sirve para mantenerlos estaticos a los nombres de la tabla
        "timestamps": false // sirve para quitar los atributos por defecto como: createdAt:updatedAt:
    },
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false // permite desactivar la verificacion yvalidación del certificado autofirmado
        }
    }
});

module.exports = { db_sequelize };