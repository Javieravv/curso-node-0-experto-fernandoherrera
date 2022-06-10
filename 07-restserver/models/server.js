/**Clase para manejar el servidor */
const express = require('express')
var cors = require('cors')
const { dbConnection } = require('../database/configDb')
const fileUpload = require ('express-fileupload')


class Server {
    constructor () {
        // aquí creamos la app de express
        this.app = express()
        this.port = process.env.PORT
        
        // this.usersRoutePath = '/api/usuarios'
        // this.authPath = '/api/auth'
        // this.authPath = '/api/categorias'
        // mejor de esta manera
        this.paths = {
            auth        : '/api/auth',
            categories  : '/api/categorias',
            productos   : '/api/productos',
            search      : '/api/buscar'  ,
            users       : '/api/usuarios',
            uploads       : '/api/uploads',
        }

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

        // Manejar el fileupload o carga de archivos.
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    // para definir las rutas.
    routes () {
        // como están en otro archivo se hace uso de un middleware
        this.app.use (this.paths.auth, require('../routes/authRoutes'))
        this.app.use (this.paths.categories, require('../routes/categoriesRoutes'))
        this.app.use (this.paths.productos, require('../routes/productosRoutes'))
        this.app.use (this.paths.search, require('../routes/buscarRoutes'))
        this.app.use (this.paths.users, require('../routes/userRoutes'))
        this.app.use (this.paths.uploads, require('../routes/uploadsRoutes'))
    }

    // iniciar servidor
    listen () {
        this.app.listen(this.port, () => {
            console.log (`Servidor corriendo en el puerto ${ this.port }...`)
        })
    }
}

module.exports = Server