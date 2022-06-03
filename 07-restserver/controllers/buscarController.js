/**Controlador para las búsquedas. */
const { response } = require ('express')
const { Producto, Categoria, Usuario } = require('../models')
const { ObjectId } = require('mongoose').Types

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
]

const buscarUsuario = async ( termino = '', res = response) => {
    const esMongoId = ObjectId.isValid( termino )
    if ( esMongoId ) {
        // buscamos por id
        const usuario = await Usuario.findById ( termino )
        return res.json ( {
            results: (usuario) ? [ usuario ] : []
        })
    }

    // buscar una palabra: nombre o correo
    // Búsquedas insensibles. 
    const regex = new RegExp ( termino, 'i')
    const usuarios = await Usuario.find ( {
        $or:[ { nombre: regex }, { correo: regex}],
        $and: [{ estado: true }]
    } )
    res.json ( {
        results: usuarios
    })
}

const buscarCategoria = async ( termino = '', res = response) => {
    const esMongoId = ObjectId.isValid( termino )
    if ( esMongoId ) {
        // buscamos por id
        const categoria = await Categoria.findById ( termino )
        return res.json ( {
            results: (categoria) ? [ categoria ] : []
        })
    }

    // buscar una palabra: nombre
    // Búsquedas insensibles. 
    const regex = new RegExp ( termino, 'i')
    const categorias = await Categoria.find ( {nombre: regex, estado: true } )
    res.json ( {
        results: categorias
    })
}

const buscarProducto = async ( termino = '', res = response) => {
    const esMongoId = ObjectId.isValid( termino )
    if ( esMongoId ) {
        // buscamos por id
        const producto = await Producto.findById ( termino )
                                .populate ('categoria', 'nombre')
        return res.json ( {
            results: (producto) ? [ producto ] : []
        })
    }

    // buscar una palabra: nombre, descripción
    // Búsquedas insensibles. 
    const regex = new RegExp ( termino, 'i')
    const productos = await Producto.find ( {
        $or:[ { nombre: regex }, { descripcion: regex}],
        $and: [{ estado: true }]
    } )
    .populate ('categoria', 'nombre')
    res.json ( {
        results: productos
    })
}


const buscarBd = (req, res = response) => {

    const { coleccion, termino } = req.params

    if ( !coleccionesPermitidas.includes( coleccion )) {
        return res.status(400).json ({
            msg: `Búsqueda errada. Las colecciones permitidas son ${ coleccionesPermitidas} `
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario ( termino, res )
            break
        case 'categorias':
            buscarCategoria ( termino, res )
            break
        case 'productos':
            buscarProducto ( termino, res )
            break
        default:
            return res.status(500).json ({
                msg: 'No se ha implementado esa búsqueda.'
            });
    }
}

module.exports = {
    buscarBd
}