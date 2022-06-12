/**Archivo para la comunicación con el websocket */

const lblOnline = document.querySelector('#lblOnline')
const lblOffline = document.querySelector('#lblOffline')
const txtMensaje = document.querySelector('#txtMensaje')
const btnEnviar = document.querySelector('#btnEnviar')

/**Conectar con el socket */
const socket = io();

/**Colocamos observables o listener */

socket.on('connect', () => {
    lblOffline.style.display = 'none'
    lblOnline.style.display = ''
})


socket.on('disconnect', () => {
    lblOffline.style.display = ''
    lblOnline.style.display = 'none'
})

socket.on('enviar-mensaje', (payload) => {
    console.log (payload)
})

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value
    const payload = {
        mensaje, 
        id: '646655',
        fecha: new Date().getTime()
    }
    // Enviamos esto al servidor a través del socket
    socket.emit('enviar-mensaje', payload, ( id ) => {
        console.log ('Desde el server se recibio el id ', id)
    })
})