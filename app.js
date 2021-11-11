require('dotenv').config(); //sirve para las variables de entorno
const Server = require('./models/server');
// creo mi objeto del servidor
const server = new Server();
server.listen();