/**Generar un Jwt demanera asíncrona o con promesa */
const jwt = require ('jsonwebtoken')

// El uid será lo único que se quiere almacenar en el jwt.

const generarJWT = ( uid = '' ) => {
    return new Promise ( (resolve, reject ) => {
        const payload = { uid }

        jwt.sign (payload, process.env.SECRETORPUBLICKEY, { 
            expiresIn: '4h'
        }, ( err, token ) => {
            if ( err ) {
                console.log ( err )
                reject ('No pudo generarse el Token...')
            } else {
                resolve ( token )
            }
        })
    })
}

module.exports = {
    generarJWT
}