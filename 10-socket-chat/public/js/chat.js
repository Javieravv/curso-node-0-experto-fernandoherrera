// manejo al lado del cliente.

let usuario = null
let socket = null

// Referencias html
const txtUid     = document.querySelector('#txtUid')
const txtMensaje = document.querySelector('#txtMensaje')
const ulUsuarios = document.querySelector('#ulUsuarios')
const ulMensajes = document.querySelector('#ulMensajes')
const btnSalir   = document.querySelector('#btnSalir')

// Validar el token almacenado en el localStorage
const validarJWT = async () => {
    const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://cafe-api-javv.herokuapp.com/api/auth/'

    const token = localStorage.getItem( 'token') || ''
    if ( token.length <= 10 ) {
        window.location = 'index.html'
        throw new Error ('No hay token en el servidor')
    }

    const resp = await fetch (url, {
        // method: 'GET',
        headers: { 'x-token': token}
    })

    // otra forma de extraerel resultado del fetch
    const { usuario: userDb, token: tokenDb  } = await resp.json()
    localStorage.setItem('token', tokenDb)
    usuario = userDb
    document.title = usuario.nombre
    await conectarSocket()
}


const conectarSocket = async () => {
    /**Se conecta con el socket y le envía la informacion del usuario
     * que ha ingresado.
     */
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    })

    // Eventos cuando el socket se dispare
    
    socket.on ('connect', () => {
        console.log ('Sockets online')
    })

    socket.on ('disconnect', () => {
        console.log ('Sockets offline')
    })

    // mensajes para el servidor
    socket.on('recibir-mensajes', dibujarMensajes)

    // socket.on('usuarios-activos', ( payload ) => {
    //     // TODO
    //     dibujarUsuarios ( payload )
    // })
    // Esta línea equivale a las atraś comentadas.
    socket.on('usuarios-activos', dibujarUsuarios )

    socket.on('mensaje-privado', ( payload ) => {
        console.log ('Privado: ', payload)
    })
}

const dibujarUsuarios = ( usuarios = []) => {
    let usersHtml = ''
    usuarios.forEach (({ nombre, uid }) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${ nombre }</h5>
                    <span class="fs-6 text-muted">${ uid }</span>
                </p>
            </li>
        `;
    })
    ulUsuarios.innerHTML = usersHtml;
}

const dibujarMensajes = ( mensajes = []) => {
    let mensajesHtml = ''
    mensajes.forEach (({ mensaje, nombre }) => {
        mensajesHtml += `
            <li>
                <p>
                    <spam class="text-primary">${ nombre }</spam>
                    <span>${ mensaje }</span>
                </p>
            </li>
        `;
    })
    ulMensajes.innerHTML = mensajesHtml;
}

txtMensaje.addEventListener('keyup', ( { keyCode }) => {
    const mensaje = txtMensaje.value
    const uid     = txtUid.value

    if ( keyCode !== 13) { return }
    if ( mensaje.length === 0) { return }

    socket.emit ('enviar-mensaje', { mensaje, uid })
    txtMensaje.value = ''
})

const main = async ( ) => {
    // Validamos el JWT
    await validarJWT()    
}


main()
