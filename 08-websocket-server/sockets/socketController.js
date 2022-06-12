/**Controlador para el socket */

const socketControler = (socket) => {

    console.log ('Cliente conectado', socket.id)

    socket.on('disconnect', () => {
        console.log ('Cliente desconectado', socket.id)
    })

    socket.on('enviar-mensaje', ( payload, callback ) => {
        const id = 123987456
        callback ( {id, fecha: new Date().getTime()} )
        socket.broadcast.emit ('enviar-mensaje', payload)
    })
}


module.exports = {
    socketControler
}