/**Controladores para los sockets.  */

const { Socket } = require("socket.io")

// para fines de desarrollo se coloca socket = new Socket para que aparezca
// ayuda en desarrollo
const socketController = ( socket = new Socket ) => {
    // console.log ('Cliente conectado...', socket.id)
    
}

module.exports = {
    socketController
}