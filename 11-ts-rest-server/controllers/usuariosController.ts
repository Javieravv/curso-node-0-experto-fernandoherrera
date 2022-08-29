/**Controladores para usuarios 
 * Son simples funciones
*/

import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async ( req: Request, res: Response) => {
    const usuarios = await Usuario.findAll()
    res.json (
        { usuarios }
    )
}


export const getUsuario = async ( req: Request, res: Response) => {
    const { id } = req.params
    const usuario = await Usuario.findByPk ( id )
    if ( usuario ) {
        res.json ( usuario )
    } else {
        res.status(404).json({ 
            msg: `No existe un usuario con el id ${ id }`
        })
    }
}

export const postUsuario = async ( req: Request, res: Response) => {
    const { body } = req
    try {
        // crear un usuario
        const usuario = new Usuario ( body )

        const existeEmail = await Usuario.findOne({
            where: {
                email: body.email
            }
        })

        if ( existeEmail) {
            return res.status(400).json({ 
                msg: 'Ya existe un usuario con el correo electrónico' + body.email
            })
        }

        await usuario.save()
        res.json ( usuario )
    } catch (error) {
        console.log ( error )
        res.status(500).json({
            msg: 'Dialogue con el administrador sobre este error'
        })
    }
}

export const putUsuario = async ( req: Request, res: Response) => {
    const { id } = req.params
    const { body } = req

    try {
        // actualizar un usuario
        const usuario = await Usuario.findByPk ( id )

        if ( !usuario ) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${ id }`
            })
        }

        await usuario.update ( body )
        res.json( usuario )
        
    } catch (error) {
        console.log ( error )
        res.status(500).json({
            msg: 'Dialogue con el administrador sobre este error'
        })
    }
}


export const deleteUsuario = async ( req: Request, res: Response) => {
    const { id } = req.params
    // hacemos una eliminación lógica. NO hacer una física.
    try {
        const usuario = await Usuario.findByPk ( id )

        if ( !usuario ) {
            return res.status(404).json({
                msg: `No existe un usuario con el id ${ id }`
            })
        }

        // eliminación física.
        // await usuario.destroy()

        await usuario.update ({
            estado: false
        })
        
        res.json( usuario )

    } catch (error) {
        console.log( error )
        res.status(500).json({
            msg: 'Dialogue con el administrador sobre este error de eliminación'
        })
    }
    
    res.json ({
        msg: 'delete Usuario',
        id
    })
}



