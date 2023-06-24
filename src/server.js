// Importar las dependencias
const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');
require('dotenv').config(); // Cargar las variables de entorno desde el archivo .env

// Definir la clase del servidor
class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    // Inicializar la conexión a la base de datos
    this.connectToDatabase();

    // Configurar los middleware
    this.middlewares();

    // Configurar las rutas
    this.routes();

    // Inicializar el servidor HTTP
    this.server = this.app.listen(this.port, () => {
      console.log(`Servidor corriendo en el puerto ${this.port}`);
    });

    // Inicializar el servidor de Socket.io
    this.io = socketIO(this.server);
  }

  connectToDatabase() {
    const { MONGODB_URI } = process.env;

    // Conectar a la base de datos
    mongoose
      .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log('Conexión exitosa a la base de datos');
      })
      .catch((error) => {
        console.error('Error al conectar a la base de datos:', error);
      });
  }

  middlewares() {
    // Configurar los middleware de Express
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(cors());
    // Configurar el middleware para servir archivos estáticos
    this.app.use(express.static('public'));
  }

  routes() {
    // Definir las rutas de Express
    this.app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'public', 'index.html'));
    });
    // Importar las clases de las rutas
    const UserRoutes = require('./routes/userRoutes');

    // Crear instancias de las clases de las rutas
    const userRoutes = new UserRoutes();

    // Definir las rutas utilizando las clases
    this.app.use('/users', userRoutes.router);
  }

  start() {
    // Inicializar la lógica del servidor Socket.io
    this.io.on('connection', (socket) => {
      console.log('Nuevo cliente conectado');

      socket.on('disconnect', () => {
        console.log('Cliente desconectado');
      });
    });
  }
}

// Crear una instancia del servidor
const server = new Server();

// Iniciar el servidor
server.start();
