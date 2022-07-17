// manejo al lado del cliente.

let usuario = null
let socket = null

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
    console.log ( userDb, tokenDb)
    localStorage.setItem('token', tokenDb)
    usuario = userDb
}

const main = async ( ) => {
    // Validamos el JWT
    await validarJWT()    

}

main()

// const socket = io()