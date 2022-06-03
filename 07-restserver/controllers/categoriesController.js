/**Controladores para las rutas de categorías.  */
const { response } = require('express')
const res = require('express/lib/response')
const { Categoria } = require('../models')

// Obtenemos listado de categorías paginada, con total y con populate
const obtenerCategorias = async (req, res = response) => {
        // recuperamos los params. También se puede desestructurar
    // const query  = req.query

    const { limite = 5, desde = 0 } = req.query

    const [ total, categorias] = await Promise.all([
        Categoria.countDocuments({ estado: true}),
        Categoria.find({ estado: true})
                .populate('usuario','nombre')
                .skip ( Number (desde))
                .limit (Number (limite))
    ])

    res.json({
        ok: true,
        message: "Controlador - Petición GET a Categorías",
        total,
        categorias
    })
}

// Obtenemos una categoría determinada
const obtenerCategoria = async (req, res = response) => {

    const { id } = req.params
    const categoria = await Categoria.findById(id)
                            .populate ( 'usuario', 'nombre')

    res.json({
        ok: true,
        message: "Obtenemos una categoría determinada",
        id,
        categoria,
    })

}


// Creamos una categoria
const crearCategoria = async (req, res = response) => {
    const nombre = req.body.nombre.toUpperCase()
    const categoriaDB = await Categoria.findOne({ nombre })
   
    if ( categoriaDB ) {
        return res.status(400).json ({ 
            msg: `La categoría ${ categoriaDB.nombre} ya existe.`
        })
    }

    // generar la data que se va a guardar.
    const data = {
        nombre,
        usuario: req.usuarioAutenticado._id
    }

    // hacer la grabación física.
    const categoria = new Categoria ( data )
    await categoria.save()

    res.status(201).json({
        msg: 'Categoria creada',
        categoria
    })

}

// actualizamos una categoría.
const actualizarCategoria = async (req, res = response) => {
    // El id a actualizar viene como parámetro
    const { id } = req.params
    const { nombre } = req.body

    // Actualizamos registro y el usuario que lo modificó.
    const data = {
        nombre: nombre.toUpperCase(),
        usuario: req.usuarioAutenticado._id
    }
    const categoria = await Categoria.findByIdAndUpdate ( id, data, { new: true} )

    res.json({
        ok: true,
        message: "Categoría actualizada",
        categoria
    })
}

// borramos una categoría
const borrarCategoria = async (req, res = response) => {
    // El id a actualizar viene como parámetro
    const { id } = req.params

    // Actualizamos registro
    const categoria = await Categoria.findByIdAndUpdate ( id, { estado: false }, { new: true}  )

    res.json({
        ok: true,
        message: "Categoría eliminada de manera lógica",
        categoria
    })
}

module.exports = {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}