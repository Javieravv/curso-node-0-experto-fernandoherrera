/**Controladores para el auth */
const bcryptjs = require('bcryptjs')
const { response } = require('express')
const { generarJWT } = require('../helpers/generarJwt')
const Usuario = require ('../models/usuario')

const authLogin = async ( req, res = response) => {
    const { correo, password } = req.body

    try {
        // verificar existencia del email
        const usuario = await Usuario.findOne( { correo })
        if (!usuario ) {
            return res.status(400).json ({ 
                msg: 'Usuario / password no son correctos - usuario'
            })
        }

        // verificar si usuario está activo
        if (!usuario.estado ) {
            return res.status(400).json ({ 
                msg: 'Usuario / password no son correctos - estado es false'
            })
        }

        // verificar contraseña
        const validPassword = bcryptjs.compareSync (password, usuario.password)
        if (!validPassword ) {
            return res.status(400).json ({ 
                msg: 'Usuario / password no son correctos - el password está errado'
            })
        }

        // generar un JWT
        const token = await generarJWT ( usuario.id )


        res.json ({
            res: "ok",
            msg: "Login API - Ok!",
            usuario,
            token
        })

    } catch (error) {
        console.log ( error )
        return res.status(500).json ({
            msg: "Algo salió mal. Hablar con el administrador."
        })
    }

}

module.exports = {
    authLogin
}
