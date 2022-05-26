/**Para crear servidores desde node.
 * Es más fácil con express, pero aquí vamos aprendiendo.
 */

const http = require ('http')

http.createServer ( (req, res) => {
    res.write ('Hola mundo')
    res.end()
} )
.listen ( 8080 )

console.log (' Escuchando el puerto ',8080)

