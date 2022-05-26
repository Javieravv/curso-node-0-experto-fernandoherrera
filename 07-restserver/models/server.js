/**Clase para manejar el servidor */
const express = require('express')
var cors = require('cors')
const { dbConnection } = require('../database/configDb')


class Server {
    constructor () {
        // aquí creamos la app de express
        this.app = express()
        this.port = process.env.PORT
        this.usersRoutePath = '/api/usuarios'

        // Conexión a la Bd
        this.conectarDb()

        // Middlewares
        this.middlewares()

        // Rutas de la aplicación

        this.routes()
    }

    async conectarDb () {
        // Pueden realizarse varias conexcines a las bases de datos.
        await dbConnection()
    }

    // Configuramos y corremos los middlewares
    middlewares () {
        // CORS
        this.app.use ( cors() )

        // lectura y parseo del body, para admitir jsonp
        this.app.use ( express.json())
        
        // para la carpeta pública.
       
        this.app.use(express.static('public'))
    }

    // para definir las rutas.
    routes () {
        // como están en otro archivo se hace uso de un middleware
        this.app.use (this.usersRoutePath, require('../routes/userRoutes'))
       
    }

    // iniciar servidor
    listen () {
        this.app.listen(this.port, () => {
            console.log (`Servidor corriendo en el puerto ${ this.port }...`)
        })
    }
}

module.exports = Server