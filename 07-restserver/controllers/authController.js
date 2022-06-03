/**Controladores para el auth */
const bcryptjs = require('bcryptjs')
const { response } = require('express')
const { generarJWT } = require('../helpers/generarJwt')
const { googleVerify } = require('../helpers/google-verify')
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

const authLoginGoogle = async ( req, res = response) => {
    const {  id_token } = req.body
    try {
        // const googleUser = await googleVerify( id_token )
        const { correo, nombre, img } = await googleVerify( id_token )

        // verificar correo, password
        let usuario = await Usuario.findOne( { correo })

        if ( !usuario ) {
            // se crea el usuario
            const data = {
                nombre,
                correo, 
                password: ':P',
                img,
                google: true,
                rol: 'USER_ROLE'
            }
            usuario = new Usuario ( data )
            await usuario.save()
        }

        // // Si el usuario en BD tiene su estado en false: se niega su autenticación en la aplicació
        if ( !usuario.estado ) {
            return res.status(401).json ({ 
                msg: 'Usuario bloqueado. Hable con el administrador. '
            })
        }

        // Generar el JWT para el usaurio.
        const token = await generarJWT ( usuario.id )

        res.json ({
            msg: 'Todo Ok.',
            usuario,
            token
        })
    } catch (error) {
        console.log ( error )
        res.status(400).json({ 
            ok: false,
            msg: 'Las credenciales de Google no se pudieron verificar'
        })
    }

}

module.exports = {
    authLogin,
    authLoginGoogle
}
