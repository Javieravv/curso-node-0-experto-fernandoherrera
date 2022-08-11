/**Creación del servidor con typescript */
import express, { Application} from 'express'
import userRoutes from '../routes/routeUsuario'
import cors from "cors";
import db from '../db/connections';

class Server {
    private app: Application
    private port: string
    private apiPaths = {
        usuarios: '/api/usuarios'
    }

    constructor() {
        this.app = express()
        this.port = process.env.PORT || '8000'
        // métodos iniciales
        this.dbConnection()
        this.middlewares()
        this.routes()
    }

    // TODO: Conectar base de datos.
    async dbConnection () {
        try {
            await db.authenticate()
            console.log('Base de datos OnLine...')
        } catch (err) {
            console.log ( 'EL ERROR OCURRIDO ES ', err )
            // throw new Error ()

        }
    }

    middlewares() {
        // cors
        this.app.use ( cors() )
        // lectura del body
        this.app.use ( express.json())
        // carpeta pública para servir contenido estático.
        this.app.use ( express.static('public'))
    }

    routes() {
        this.app.use ( this.apiPaths.usuarios, userRoutes)
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log (`Servidor corriendo en el puerto ${ this.port} de manera correcta...`)
        })
    }
}

export default Server