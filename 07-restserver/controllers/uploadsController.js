const path = require ('path')
const fs = require ('fs')
const cloudinary = require ('cloudinary').v2
cloudinary.config ( process.env.CLOUDINARY_URL )

const { response } = require ('express');
const { subirArchivo } = require('../helpers');
const { Usuario, Producto } = require('../models')

const cargarArchivo = async ( req, res = response ) => {

    try {
        const nombreArchivo = await subirArchivo ( req.files, ['png', 'jpg', 'jpeg', 'gif'], 'imgs' )
        res.json ( { 
            nombreArchivo: nombreArchivo
        })
    } catch ( msg) {
        res.status(400).json ( { msg })
    }

}

const actualizarImagen = async (req, res = response ) => {
    const { id, coleccion } = req.params
    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById( id )
            if ( !modelo ) {
                return res.status(400).json ({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById( id )
            if ( !modelo ) {
                return res.status(400).json ({
                    msg: `No existe unproducto con el id ${ id }`
                })
            }
            break;
    
        default:
            return res.status(500).json ({ msg: 'No se validó esta parte.'});
    }

    // Limpiar imágenes previas.
    try {
        if ( modelo.img ) { 
            // borrar la imagen del servidor
            const pathImagen = path.join ( __dirname, '../uploads', coleccion, modelo.img)
            if ( fs.existsSync ( pathImagen ) ) {
                fs.unlinkSync ( pathImagen )
            }
        }
    } catch (err) {
        console.log ( err )
        return res.json({ 
            msg: 'Se ha presentado un error',
            err
        })
    }

    // Es la misma propiedad img para producto y para usuario
    // Se subirá en el directorio de la colección
    const nombreArchivo = await subirArchivo ( req.files, ['png', 'jpg', 'jpeg', 'gif'], coleccion )

    modelo.img = nombreArchivo

    await modelo.save()

    res.json ( { 
        modelo
    })
}

const actualizarImagenCloudinary = async (req, res = response ) => {
    const { id, coleccion } = req.params
    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById( id )
            if ( !modelo ) {
                return res.status(400).json ({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById( id )
            if ( !modelo ) {
                return res.status(400).json ({
                    msg: `No existe unproducto con el id ${ id }`
                })
            }
            break;
    
        default:
            return res.status(500).json ({ msg: 'No se validó esta parte.'});
    }

    // Limpiar imágenes previas.
    try {
        if ( modelo.img ) { 
            // borrar la imagen de cloudinary
            const nombreArr = modelo.img.split ('/')
            const nombre    = nombreArr[nombreArr.length - 1]
            const [ public_id ]       = nombre.split('.')
            cloudinary.uploader.destroy ( public_id )
        }
    } catch (err) {
        console.log ( err )
        return res.json({ 
            msg: 'Se ha presentado un error',
            err
        })
    }

    const { tempFilePath } = req.files.archivo
    const { secure_url } = await cloudinary.uploader.upload ( tempFilePath )
    modelo.img = secure_url
    await modelo.save()

    res.json ( modelo )
    
}

const mostrarImagen = async ( req, res = response) => {
    const { id, coleccion} = req.params
    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById( id )
            if ( !modelo ) {
                return res.status(400).json ({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById( id )
            if ( !modelo ) {
                return res.status(400).json ({
                    msg: `No existe unproducto con el id ${ id }`
                })
            }
            break;
    
        default:
            return res.status(500).json ({ msg: 'No se validó esta parte.'});
    }

    // Limpiar imágenes previas.
    try {
        if ( modelo.img ) { 
            // borrar la imagen del servidor
            const pathImagen = path.join ( __dirname, '../uploads', coleccion, modelo.img)
            if ( fs.existsSync ( pathImagen ) ) {
                return res.sendFile( pathImagen )
            }
        }
    } catch (err) {
        console.log ( err )
        return res.json({ 
            msg: 'Se ha presentado un error',
            err
        })
    }
    // Hasta aquí la imagen no existe
    const pathImagen = path.join ( __dirname, '../assets', 'no-image.jpg')
    return res.sendFile ( pathImagen )
}

const mostrarImagenCloudinary = async ( req, res = response) => {
    const { id, coleccion} = req.params
    let modelo

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById( id )
            if ( !modelo ) {
                return res.status(400).json ({
                    msg: `No existe un usuario con el id ${ id }`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById( id )
            if ( !modelo ) {
                return res.status(400).json ({
                    msg: `No existe unproducto con el id ${ id }`
                })
            }
            break;
    
        default:
            return res.status(500).json ({ msg: 'No se validó esta parte.'});
    }

    // Limpiar imágenes previas.
    try {
        if ( modelo.img ) { 
            const pathImagen = modelo.img
            return res.json ({ pathImagen })
        }
    } catch (err) {
        console.log ( err )
        return res.json({ 
            msg: 'Se ha presentado un error',
            err
        })
    }
    // Hasta aquí la imagen no existe
    const pathImagen = path.join ( __dirname, '../assets', 'no-image.jpg')
    return res.sendFile ( pathImagen )
}

module.exports = {
    cargarArchivo,
    actualizarImagen, 
    mostrarImagen,
    actualizarImagenCloudinary,
    mostrarImagenCloudinary
}