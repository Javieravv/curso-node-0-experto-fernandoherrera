/**Clase para manejar el servidor */
const express = require('express')
var cors = require('cors');
const { socketControler } = require('../sockets/socketController');


class Server {
    constructor () {
        // aquí creamos la app de express
        this.app    = express()
        this.port   = process.env.PORT
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server);

        // this.usersRoutePath = '/api/usuarios'
        // this.authPath = '/api/auth'
        // this.authPath = '/api/categorias'
        // mejor de esta manera
        this.paths = {}

        // Conexión a la Bd

        // Middlewares
        this.middlewares()

        // Rutas de la aplicación
        this.routes()

        // Configuración de sockets.
        this.sockets()
    }

    // Configuramos y corremos los middlewares
    middlewares () {
        // CORS
        this.app.use ( cors() )
       
        // para la carpeta pública.
        this.app.use(express.static('public'))

        
    }

    // para definir las rutas.
    routes () {
        // como están en otro archivo se hace uso de un middleware
        // this.app.use (this.paths.auth, require('../routes/authRoutes'))
    }

    sockets() {
        this.io.on('connection', socketControler)
    }

    // iniciar servidor
    listen () {
        this.server.listen(this.port, () => {
            console.log (`Servidor Socket corriendo en el puerto ${ this.port }...`)
        })
    }
}

module.exports = Server