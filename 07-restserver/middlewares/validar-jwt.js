/**Para validar un jwt */
const { response } = require('express')
const jwt = require ('jsonwebtoken')
const Usuario = require ('../models/usuario')

const validarJWT = async ( req, res = response, next) => {

    const token = req.header ('x-token')
    console.log ( token )

    if ( !token ) { 
        return res.status(401).json({
            msg: 'No hay una credencial - JWTG válido.'
        })
    }

    try {
        const { uid } = jwt.verify ( token, process.env.SECRETORPUBLICKEY )
        // leer el usuario que corresponde al uid y se almacena en la request
        // con el uid podemos obtener información de ese usuario y agregarlo a la request 
        const usuarioAutenticado = await Usuario.findById ( uid )
        // verificar que sí exista usurio 
        if ( !usuarioAutenticado ) {
            return res.status(401).json ({
                msg: 'Usuario no existe en la base de datos.'
            })
        }

        // verificar si uid no está marcado como inactivo
        if ( !usuarioAutenticado.estado ) {
            return res.status(401).json ({
                msg: 'Token no válido - Usuario no existe'
            })
        }
        


        req.usuarioAutenticado = usuarioAutenticado
        next ()
    } catch (error) {
        console.log ( error)
        res.status(401).json ({
            msg: 'Credenciales - Token no válidas'
        })
    }

}

module.exports = {
    validarJWT
}