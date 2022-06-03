/**Archivo que facilitará el llamado de los modelos.
 * Centralizándolos.
 * 
 */

const Categoria = require ('./categoria')
const Producto = require ('./producto')
const Role = require ('./role')
const Server = require ('./server')
const Usuario = require ('./usuario')


module.exports = {
    Categoria,
    Producto,
    Role,
    Server,
    Usuario
}

