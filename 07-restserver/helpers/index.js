/**Indice para todos los helpers que se vayan creando */ 

const dbValidators  = require('./db-validators')
const generarJWT    = require('./generarJwt')
const googleVerify  = require('./google-verify')
const subirArchivo  = require ('./subir-archivos')

module.exports = {
    ...dbValidators,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}

