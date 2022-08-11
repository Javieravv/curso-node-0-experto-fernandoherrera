import Server from './models/server'
import dotenv from 'dotenv'

dotenv.config()

const server = new Server()

console.log ('Nombre de la variable 1 es: ', process.env.VARIABLEUNO)
server.listen()
