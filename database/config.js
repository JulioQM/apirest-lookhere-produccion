const pgPromise = require('pg-promise');
const config = {
    /*  host: process.env.HOST,
     port: "5432",
     database: process.env.DATABASE,
     user: process.env.USER,
     password: process.env.PASSWORD,
     ssl: true */

    host: 'localhost',
    port: "5432",
    database: 'bdlookhere',
    user: 'postgres',
    password: '12345',
    //ssl: true
}
const pgp = pgPromise({});
const db = pgp(config);
//db.any("select * from roles").then(res => { console.log(res) }); //comprobar si hay conexion
//exports.db = db;  // llamarse de esta manera o como la de abajo
module.exports = { db };