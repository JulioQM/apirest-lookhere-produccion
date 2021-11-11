const express = require('express');
const cors = require('cors');
const { db_sequelize } = require("../database/connection");

class Server {

    constructor() {
            // inicializo express
            this.app = express();

            // puerto la que va correr el aplicativo
            this.port = process.env.PORT;
            // sirve para quitar o desautorizar el mensaje que se necesita un CERTIFICADO SSL
            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

            // ruta del edpoint
            this.usuarioPath = '/api/lookhere';
            this.loginPath = '/api/autenticacion'


            // conectar a base de datos
            //this.conectarDB();
            this.dbConexion();

            //middleware direccionamiento a pagina estatica
            this.middlewares();

            //llamado a rutas
            this.routes();

        }
        // creo el metodo para llamar mi configuracion de la base de datos con SEQUALIZE
    async dbConexion() {
        try {
            await db_sequelize.authenticate();
            console.log('base de datos onlione');

        } catch (error) {
            throw new Error(error);
        }

    }

    middlewares() {
        // uso de cors
        this.app.use(cors());
        // lectura(texto) y parsea del body a un archivo json
        this.app.use(express.json());
        // direccionamiento a la página principal
        this.app.use(express.static('public'));
    }

    // Método para atraer el contenido de rutas
    routes() {
        // rutas de CRUD
        this.app.use(this.usuarioPath, require('../routes/roles.route'));
        this.app.use(this.usuarioPath, require('../routes/usuarios.route'));
        this.app.use(this.usuarioPath, require('../routes/familiares.route'));
        this.app.use(this.usuarioPath, require('../routes/ciudades.route'));
        this.app.use(this.usuarioPath, require('../routes/personas.route'));
        this.app.use(this.usuarioPath, require('../routes/enfermedades.route'));

        // rutas de acceso
        this.app.use(this.loginPath, require('../routes/autenticacion.route'));

    }

    // Metodo escuaha para que escuhe el servidor por el puerto 8081
    listen() {
        //this.app.listen(this.port, () => console.log(`escuchando en el puerto ${this.port}`));
        this.app.listen(this.port, () => console.log(`Server running in http://localhost:${this.port}`));

    }
}

module.exports = Server;