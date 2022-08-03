/**Controladores para los sockets.  */

const { Socket } = require("socket.io")
const { comprobarJWT } = require("../helpers")
const { ChatMensajes } = require('../models')

const chatMensajes = new ChatMensajes()

// para fines de desarrollo se coloca socket = new Socket para que aparezca
// ayuda en desarrollo
const socketController = async ( socket = new Socket, io ) => {
    // console.logout ('Cliente conectado...', socket.id)
    const token = socket.handshake.headers['x-token']
    const usuario = await comprobarJWT( token )
    if ( !usuario ) {
        console.log ('No se encontró el usuario...')
        return socket.disconnect()
    }
    
    // agregar el usuario conectdo.
    // Cuando se conecta se emite a todos los conectados. Pero no incluir al cliente actual
    chatMensajes.conectarUsuario ( usuario )
    io.emit('usuarios-activos', chatMensajes.usuariosArr)
    socket.emit('recibir-mensajes', chatMensajes.ultimos10)

    // conectar al usuario a una sala especial. 
    socket.join ( usuario.id )

    // limpiar cuando alguien se desconecte
    socket.on('disconnect', () => {
        console.log ( 'Se desconectó el usuario ', usuario.nombre)
        chatMensajes.desconectarUsuario ( usuario.id )
        io.emit('usuarios-activos', chatMensajes.usuariosArr)
    })

    socket.on('enviar-mensaje', ( { uid, mensaje } ) => {
        // añadimos a chat mensaje
        if ( uid ) { 
            // es mensaje privado
            socket.to( uid ).emit('mensaje-privado', { de: usuario.nombre, mensaje })
        } else {
            // mensaje para todos
            chatMensajes.enviarMensaje(usuario.id, usuario.nombre, mensaje)
            io.emit ('recibir-mensajes', chatMensajes.ultimos10)
        }

    })

}

module.exports = {
    socketController
}